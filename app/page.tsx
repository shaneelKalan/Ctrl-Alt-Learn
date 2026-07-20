"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AdminPortal } from "./AdminPortal";
import { LearnerProfile, Onboarding } from "./Onboarding";
import { courseMinutes, missionScore, type Dimension, type Mission } from "./course";
import { badges as badgeDefs, evaluateBadges, missionXp, nextRank, rankForXp, updateStreak, type StreakState } from "./game";
import { fmt, getCourse, getFieldGuide, uiStrings, type Lang } from "./i18n";
import { DimensionStats, emptyDimensionStats, MissionPlayer } from "./MissionPlayer";

type View = "dashboard" | "mission" | "debrief" | "results" | "guide";
type AppMode = "loading" | "onboarding" | "learner" | "admin";

type MissionRecord = { score: number; mistakes: number; completedAt: string };

type CourseProgress = {
  version: 2;
  missions: Record<string, MissionRecord>;
  dims: DimensionStats;
  certificateId?: string;
  courseCompletedAt?: string;
  xp?: number;
  streak?: StreakState;
  badges?: Record<string, string>;
};

type DebriefResult = {
  missionId: string;
  score: number;
  mistakes: number;
  xpAnswers: number;
  xpMissionBonus: number;
  xpFlawlessBonus: number;
  xpTotal: number;
  newBadges: string[];
};

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, durationMs]);
  return value;
}

const PROGRESS_KEY = "cal-course-progress-v2";
const LEGACY_PROGRESS_KEY = "ctrl-alt-learn-progress";
const PROFILE_KEY = "cal-learner-profile-v1";

function freshProgress(): CourseProgress {
  return { version: 2, missions: {}, dims: emptyDimensionStats() };
}

function loadProgress(): CourseProgress {
  try {
    const saved = window.localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as CourseProgress;
      if (parsed.version === 2) return { ...freshProgress(), ...parsed, dims: { ...emptyDimensionStats(), ...parsed.dims } };
    }
  } catch {
    window.localStorage.removeItem(PROGRESS_KEY);
  }

  const progress = freshProgress();
  try {
    const legacy = window.localStorage.getItem(LEGACY_PROGRESS_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as { completed?: boolean; certificateId?: string };
      if (parsed.completed) {
        progress.missions["data-safety"] = { score: 90, mistakes: 0, completedAt: new Date().toISOString() };
        if (parsed.certificateId) progress.certificateId = parsed.certificateId;
      }
    }
  } catch {
    window.localStorage.removeItem(LEGACY_PROGRESS_KEY);
  }
  return progress;
}

function saveProgress(progress: CourseProgress) {
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function mergeStats(base: DimensionStats, extra: DimensionStats): DimensionStats {
  const merged = emptyDimensionStats();
  (Object.keys(merged) as Dimension[]).forEach((dim) => {
    merged[dim] = {
      attempts: base[dim].attempts + extra[dim].attempts,
      firstTryCorrect: base[dim].firstTryCorrect + extra[dim].firstTryCorrect,
    };
  });
  return merged;
}

function missionState(course: Mission[], progress: CourseProgress, mission: Mission): "done" | "current" | "locked" {
  if (progress.missions[mission.id]) return "done";
  const index = course.indexOf(mission);
  if (index === 0) return "current";
  return progress.missions[course[index - 1].id] ? "current" : "locked";
}

function nextMission(course: Mission[], progress: CourseProgress): Mission | null {
  return course.find((mission) => !progress.missions[mission.id]) ?? null;
}

function overallScore(progress: CourseProgress) {
  const records = Object.values(progress.missions);
  if (!records.length) return 0;
  return Math.round(records.reduce((sum, record) => sum + record.score, 0) / records.length);
}

function MissionRail({
  course,
  lang,
  progress,
  activeId,
  guideActive,
  onSelect,
  onGuide,
}: {
  course: Mission[];
  lang: Lang;
  progress: CourseProgress;
  activeId: string | null;
  guideActive: boolean;
  onSelect: (mission: Mission) => void;
  onGuide: () => void;
}) {
  const t = uiStrings[lang].rail;
  const completedCount = Object.keys(progress.missions).filter((id) => course.some((m) => m.id === id)).length;
  return (
    <aside className="mission-rail" aria-label={t.courseTitle}>
      <div className="brand-lockup">
        <span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
        <span><strong>Ctrl+Alt+Learn</strong><small>{t.academy}</small></span>
      </div>
      <div className="course-label"><span>{t.courseLabel}</span><strong>{t.courseTitle}</strong></div>
      <nav>
        {course.map((mission) => {
          const state = missionState(course, progress, mission);
          const isActive = mission.id === activeId;
          return (
            <button
              className={`mission-link ${isActive ? "active" : ""} ${state === "locked" ? "locked" : ""}`}
              disabled={state === "locked"}
              key={mission.id}
              onClick={() => onSelect(mission)}
              type="button"
            >
              <span>{state === "done" ? "✓" : String(mission.number).padStart(2, "0")}</span>
              <p>
                {mission.shortTitle}
                <small>{state === "done" ? `${t.complete} · ${progress.missions[mission.id].score}%` : state === "current" ? t.ready : t.locked}</small>
              </p>
            </button>
          );
        })}
      </nav>
      <button className={`mission-link guide-link ${guideActive ? "active" : ""}`} type="button" onClick={onGuide}>
        <span>📒</span>
        <p>{t.fieldGuide}<small>{t.fieldGuideTag}</small></p>
      </button>
      <div className="rail-progress">
        <span><b>{t.progress}</b><b>{completedCount}/{course.length}</b></span>
        <i><b style={{ width: `${(completedCount / course.length) * 100}%` }} /></i>
        <small>{completedCount === course.length ? t.progressDone : `${courseMinutes} ${t.progressNote}`}</small>
      </div>
    </aside>
  );
}

function MasteryPanel({ lang, progress, missionCount }: { lang: Lang; progress: CourseProgress; missionCount: number }) {
  const t = uiStrings[lang];
  const colors: Record<Dimension, string> = { safety: "teal", judgment: "yellow", verification: "blue", promptCraft: "purple" };
  return (
    <aside className="mastery-panel comic-box">
      <div className="panel-title"><div><span>{t.dashboard.masteryRadar}</span><h2>{t.dashboard.masteryTitle}</h2></div><b>{t.dashboard.live}</b></div>
      {(Object.keys(t.dimensions) as Dimension[]).map((dim) => {
        const { attempts, firstTryCorrect } = progress.dims[dim];
        const value = attempts ? Math.round((firstTryCorrect / attempts) * 100) : 0;
        return (
          <div className="mastery-row" key={dim}>
            <span><b>{t.dimensions[dim]}</b><b>{attempts ? `${value}%` : "—"}</b></span>
            <i><b className={colors[dim]} style={{ width: `${attempts ? Math.max(value, 6) : 0}%` }} /></i>
          </div>
        );
      })}
      <div className="trophy-case">
        <span className="caption-label">{t.game.trophyCase}</span>
        <div className="trophy-grid">
          {badgeDefs.map((badge) => {
            const earned = Boolean(progress.badges?.[badge.id]);
            const meta = t.game.badges[badge.id];
            return (
              <span className={`trophy ${earned ? "earned" : "locked"}`} key={badge.id} title={`${meta.name} — ${meta.desc}`}>
                {badge.icon}
              </span>
            );
          })}
        </div>
      </div>
      <div className="desk-note"><span>{t.dashboard.deskNote}</span><strong>{t.dashboard.deskNoteTitle}</strong><p>{t.dashboard.deskNoteCopy}</p></div>
      <div className="certificate-teaser"><span>☆</span><p><strong>{t.dashboard.certTeaser}</strong><small>{fmt(t.dashboard.certTeaserCopy, { n: missionCount })}</small></p></div>
    </aside>
  );
}

function CourseMap({
  course,
  lang,
  progress,
  onSelect,
}: {
  course: Mission[];
  lang: Lang;
  progress: CourseProgress;
  onSelect: (mission: Mission) => void;
}) {
  const t = uiStrings[lang].dashboard;
  return (
    <section className="course-map">
      <div className="course-map-heading"><span className="caption-label">{t.mapKicker}</span><h2>{t.mapTitle}</h2></div>
      <div className="course-map-grid">
        {course.map((mission) => {
          const state = missionState(course, progress, mission);
          const record = progress.missions[mission.id];
          return (
            <button
              className={`map-card ${state}`}
              disabled={state === "locked"}
              key={mission.id}
              onClick={() => onSelect(mission)}
              type="button"
            >
              <div className="map-card-top">
                <span className="map-number">{state === "done" ? "✓" : String(mission.number).padStart(2, "0")}</span>
                <span className={`map-status ${state === "done" && record.score === 100 ? "perfect" : ""}`}>
                  {state === "done" ? (record.score === 100 ? `🏅 ${uiStrings[lang].game.perfect}` : `${record.score}%`) : state === "current" ? t.play : t.lockedTag}
                </span>
              </div>
              <strong>{mission.title}</strong>
              <small>{mission.description}</small>
              <div className="map-card-meta"><span>{mission.minutes} {t.min}</span><span>{mission.kicker}</span></div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MissionDebrief({
  courseComplete,
  courseLength,
  doneCount,
  lang,
  mission,
  overall,
  result,
  upNext,
  onNext,
  onResults,
  onReturn,
}: {
  courseComplete: boolean;
  courseLength: number;
  doneCount: number;
  lang: Lang;
  mission: Mission;
  overall: number;
  result: DebriefResult;
  upNext: Mission | null;
  onNext: (mission: Mission) => void;
  onResults: () => void;
  onReturn: () => void;
}) {
  const t = uiStrings[lang];
  const animatedScore = useCountUp(result.score);
  const animatedXp = useCountUp(result.xpTotal, 1100);
  return (
    <div className="results page-enter">
      {result.mistakes === 0 && <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>}
      <span className="episode-kicker">{fmt(t.debrief.missionComplete, { n: String(mission.number).padStart(2, "0") })}</span>
      <h1>{result.mistakes === 0 ? t.debrief.flawless : t.debrief.cleared}</h1>
      <p>{result.mistakes === 0 ? t.debrief.flawlessCopy : `${result.mistakes} ${result.mistakes === 1 ? t.debrief.coachingMoment : t.debrief.coachingMoments} ${t.debrief.coachingCopy}`}</p>
      <div className="result-grid">
        <section className="score-card comic-box">
          <span className="score-ring"><b>{animatedScore}</b><small>{t.debrief.masteryWord}</small></span>
          <div><span>{t.debrief.missionResult}</span><h2>{mission.title}</h2><p>{fmt(t.debrief.progressLine, { done: doneCount, total: courseLength, score: overall })}</p></div>
        </section>
        <section className="takeaway-card comic-box"><span>{t.debrief.keepRule}</span><h2>{mission.rule}</h2><p>{mission.ruleDetail}</p></section>
      </div>
      <div className="debrief-reward-grid">
        <section className="xp-card comic-box">
          <div className="xp-card-head"><span className="caption-label">{t.game.xpEarned}</span><b className="xp-total">⚡ +{animatedXp}</b></div>
          <div className="xp-rows">
            <div className="xp-row" style={{ animationDelay: ".15s" }}><span>{t.game.correctAnswers}</span><b>+{result.xpAnswers}</b></div>
            <div className="xp-row" style={{ animationDelay: ".3s" }}><span>{t.game.missionCleared}</span><b>+{result.xpMissionBonus}</b></div>
            {result.xpFlawlessBonus > 0 && (
              <div className="xp-row flawless" style={{ animationDelay: ".45s" }}><span>✨ {t.game.flawlessBonus}</span><b>+{result.xpFlawlessBonus}</b></div>
            )}
          </div>
        </section>
        {result.newBadges.length > 0 && (
          <section className="badge-unlocks">
            {result.newBadges.map((id, index) => {
              const def = badgeDefs.find((badge) => badge.id === id);
              const meta = t.game.badges[id];
              return (
                <div className="badge-unlock comic-box" key={id} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                  <span className="badge-unlock-icon">{def?.icon}</span>
                  <div><span className="caption-label">{t.game.badgeUnlocked}</span><strong>{meta.name}</strong><small>{meta.desc}</small></div>
                </div>
              );
            })}
          </section>
        )}
      </div>
      <div className="result-actions">
        {courseComplete ? (
          <button className="primary-button" type="button" onClick={onResults}>{t.debrief.finalResults} <span>→</span></button>
        ) : (
          upNext && <button className="primary-button" type="button" onClick={() => onNext(upNext)}>{t.debrief.nextMission} {upNext.shortTitle} <span>→</span></button>
        )}
        <button className="secondary-button" type="button" onClick={onReturn}>{t.debrief.returnMap}</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<AppMode>("loading");
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [progress, setProgress] = useState<CourseProgress>(freshProgress);
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<DebriefResult | null>(null);
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    const savedProfile = window.localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as Omit<LearnerProfile, "language"> & { language?: LearnerProfile["language"] };
        setProfile({ ...parsed, language: parsed.language ?? "en" });
        setLearnerName(parsed.name);
        setMode("learner");
      } catch {
        window.localStorage.removeItem(PROFILE_KEY);
        setMode("onboarding");
      }
    } else {
      setMode("onboarding");
    }
    setProgress(loadProgress());
  }, []);

  const lang: Lang = profile?.language === "es" ? "es" : "en";
  const t = uiStrings[lang];
  const course = useMemo(() => getCourse(lang), [lang]);
  const fieldGuide = useMemo(() => getFieldGuide(lang), [lang]);

  const upNext = useMemo(() => nextMission(course, progress), [course, progress]);
  const courseComplete = !upNext;
  const score = overallScore(progress);
  const activeMission = activeMissionId ? course.find((mission) => mission.id === activeMissionId) ?? null : null;
  const lastMission = lastResult ? course.find((mission) => mission.id === lastResult.missionId) ?? null : null;

  function setLanguage(next: Lang) {
    if (!profile) return;
    const updated = { ...profile, language: next };
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    setProfile(updated);
  }

  function startMission(mission: Mission) {
    setActiveMissionId(mission.id);
    setView("mission");
  }

  function completeMission(result: { mistakes: number; stats: DimensionStats }) {
    if (!activeMission) return;
    const scoreForMission = missionScore(result.mistakes);
    const existing = progress.missions[activeMission.id];
    const record: MissionRecord = {
      score: existing ? Math.max(existing.score, scoreForMission) : scoreForMission,
      mistakes: result.mistakes,
      completedAt: new Date().toISOString(),
    };

    const flawless = result.mistakes === 0;
    const firstTryTotal = (Object.values(result.stats) as { attempts: number; firstTryCorrect: number }[])
      .reduce((sum, dim) => sum + dim.firstTryCorrect, 0);
    const attemptsTotal = (Object.values(result.stats) as { attempts: number; firstTryCorrect: number }[])
      .reduce((sum, dim) => sum + dim.attempts, 0);
    const xp = missionXp(firstTryTotal, attemptsTotal - firstTryTotal, flawless);

    const updated: CourseProgress = {
      ...progress,
      missions: { ...progress.missions, [activeMission.id]: record },
      dims: mergeStats(progress.dims, result.stats),
      xp: (progress.xp ?? 0) + xp.total,
      streak: updateStreak(progress.streak),
      badges: { ...progress.badges },
    };

    const nowComplete = course.every((mission) => updated.missions[mission.id]);
    if (nowComplete && !updated.courseCompletedAt) {
      updated.courseCompletedAt = new Date().toISOString();
      updated.certificateId =
        updated.certificateId || `CAL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      if (profile) {
        void fetch("/api/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...profile, score: overallScore(updated), certificateId: updated.certificateId }),
        });
      }
    }

    const records = Object.values(updated.missions);
    const newBadges = evaluateBadges(
      {
        completedMissions: Object.keys(updated.missions).length,
        totalMissions: course.length,
        flawlessMissions: records.filter((item) => item.mistakes === 0).length,
        perfectMissions: records.filter((item) => item.score === 100).length,
        courseComplete: nowComplete,
        streak: updated.streak?.count ?? 0,
        lastMissionMistakes: result.mistakes,
        dims: updated.dims,
      },
      updated.badges ?? {},
    );
    const now = new Date().toISOString();
    for (const id of newBadges) updated.badges![id] = now;

    setProgress(updated);
    saveProgress(updated);
    setLastResult({
      missionId: activeMission.id,
      score: record.score,
      mistakes: result.mistakes,
      xpAnswers: xp.answers,
      xpMissionBonus: xp.missionBonus,
      xpFlawlessBonus: xp.flawlessBonus,
      xpTotal: xp.total,
      newBadges,
    });
    setView("debrief");
  }

  function completeOnboarding(nextProfile: LearnerProfile) {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    setProfile(nextProfile);
    setLearnerName(nextProfile.name);
    setMode("learner");
    setView("dashboard");
  }

  if (mode === "loading") {
    return <div className="launch-loader" role="status"><span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span><strong>Preparing your training…</strong></div>;
  }

  if (mode === "onboarding") {
    return <Onboarding onComplete={completeOnboarding} onAdmin={() => setMode("admin")} />;
  }

  if (mode === "admin") {
    return <AdminPortal onExit={() => setMode(profile ? "learner" : "onboarding")} />;
  }

  const initials = (profile?.name || "Learner").split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const spotlight = upNext ?? course[course.length - 1];
  const spotlightState = missionState(course, progress, spotlight);

  return (
    <main className="app-shell">
      <MissionRail
        activeId={view === "mission" && activeMission ? activeMission.id : null}
        course={course}
        guideActive={view === "guide"}
        lang={lang}
        progress={progress}
        onSelect={(mission) => startMission(mission)}
        onGuide={() => setView("guide")}
      />
      <section className="workspace">
        <header className="topbar">
          <div><span className="edition-chip">{t.topbar.edition}</span><span className="status-chip"><i /> {t.topbar.connected}</span></div>
          <div className="learner-controls">
            <div className="game-chips">
              {(progress.streak?.count ?? 0) > 0 && (
                <span className="streak-chip" title={t.game.streakAria}><i>🔥</i>{progress.streak!.count}</span>
              )}
              <span className="xp-chip" title={t.game.xp}><i>⚡</i>{progress.xp ?? 0} {t.game.xp}</span>
              <span className="rank-chip" title={(() => { const next = nextRank(progress.xp ?? 0); return next ? fmt(t.game.toNextRank, { n: next.minXp - (progress.xp ?? 0), rank: t.game.ranks[next.id] }) : t.game.topRank; })()}>
                <i>{rankForXp(progress.xp ?? 0).icon}</i>{t.game.ranks[rankForXp(progress.xp ?? 0).id]}
              </span>
            </div>
            <div className="lang-toggle compact" role="group" aria-label="Language">
              {(["en", "es"] as const).map((code) => (
                <button aria-pressed={lang === code} className={lang === code ? "active" : ""} key={code} type="button" onClick={() => setLanguage(code)}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="topbar-admin" type="button" onClick={() => setMode("admin")}>{t.topbar.admin}</button>
            <button className="topbar-switch" type="button" onClick={() => { window.localStorage.removeItem(PROFILE_KEY); setProfile(null); setMode("onboarding"); }}>{t.topbar.switchLearner}</button>
            <div className="profile"><span>{initials}</span><p><strong>{profile?.name}</strong><small>{profile?.role || t.topbar.learner} · {profile ? uiStrings[lang].onboarding.levels[profile.skillLevel]?.name ?? profile.skillLevel : ""}</small></p></div>
          </div>
        </header>

        {view === "dashboard" && (
          <div className="dashboard page-enter">
            <div className="episode-kicker"><span>{courseComplete ? t.dashboard.courseComplete : `${t.dashboard.mission} ${String(spotlight.number).padStart(2, "0")}`}</span><i /> {spotlight.kicker}</div>
            <div className="dashboard-heading">
              <div>
                <h1>{courseComplete ? <>{t.dashboard.completeTitle1}<br />{t.dashboard.completeTitle2}</> : <>{spotlight.title}</>}</h1>
                <p>{courseComplete ? t.dashboard.completeCopy : spotlight.description}</p>
              </div>
              <div className="time-card"><small>{courseComplete ? t.dashboard.finalScore : t.dashboard.estimatedTime}</small><strong>{courseComplete ? `${score}%` : `${spotlight.minutes} ${t.dashboard.min}`}</strong><span>{courseComplete ? t.dashboard.mastery : t.dashboard.interactive}</span></div>
            </div>
            <div className="dashboard-grid">
              <div>
                <div className="scene" role="img" aria-label={spotlight.steps[0].scene.speaker}>
                  <div className="scene-header">
                    <span><i className="record-dot" /> {spotlight.steps[0].scene.location} · {t.dashboard.upNext}</span>
                    <span>OPS · 9:42 AM</span>
                  </div>
                  <div className="scene-grid" aria-hidden="true" />
                  <div className="speech-bubble">
                    <span>{spotlight.steps[0].scene.speaker} · {spotlight.steps[0].scene.role}</span>
                    <strong>“{spotlight.steps[0].scene.bubble}”</strong>
                  </div>
                  <div className="ops-board" aria-hidden="true">
                    <b>OPS STATUS</b>
                    <span>CA 184 · BOS <em>ON TIME</em></span>
                    <span>CA 219 · DCA <em className="delay">DELAY</em></span>
                    <span>CA 440 · MIA <em>ON TIME</em></span>
                  </div>
                  <div className="cast" aria-hidden="true">
                    <div className="person person-one"><i /><b /><span>MAYA</span></div>
                    <div className="person person-two"><i /><b /><span>JORDAN</span></div>
                  </div>
                  <div className="desk" aria-hidden="true">
                    <div className="monitor"><i /><i /><i /></div>
                    <div className="mug" />
                  </div>
                  <div className="scene-caption">{spotlight.steps[0].scene.caption}</div>
                </div>
                <div className="mission-brief comic-box">
                  <div><span className="caption-label">{courseComplete ? t.dashboard.victoryLap : t.dashboard.todaysCall}</span><h2>{courseComplete ? t.dashboard.seeResults : spotlight.steps[0].title}</h2><p>{courseComplete ? `${t.dashboard.resultsCopy1} ${score}% · ${course.length} ${t.dashboard.resultsCopy2}` : spotlight.ruleDetail}</p></div>
                  {courseComplete ? (
                    <button className="primary-button" type="button" onClick={() => setView("results")}>{t.dashboard.viewResults} <span>→</span></button>
                  ) : (
                    <button className="primary-button" type="button" onClick={() => startMission(spotlight)}>
                      {spotlightState === "done" ? t.dashboard.replayMission : t.dashboard.startMission} <span>→</span>
                    </button>
                  )}
                </div>
              </div>
              <MasteryPanel lang={lang} missionCount={course.length} progress={progress} />
            </div>
            <CourseMap course={course} lang={lang} progress={progress} onSelect={startMission} />
          </div>
        )}

        {view === "mission" && activeMission && (
          <MissionPlayer
            key={`${activeMission.id}-${lang}`}
            lang={lang}
            mission={activeMission}
            onComplete={completeMission}
            onExit={() => { setActiveMissionId(null); setView("dashboard"); }}
          />
        )}

        {view === "debrief" && lastResult && lastMission && (
          <MissionDebrief
            courseComplete={courseComplete}
            courseLength={course.length}
            doneCount={Object.keys(progress.missions).length}
            lang={lang}
            mission={lastMission}
            overall={score}
            result={lastResult}
            upNext={upNext}
            onNext={(mission) => startMission(mission)}
            onResults={() => setView("results")}
            onReturn={() => { setActiveMissionId(null); setView("dashboard"); }}
          />
        )}

        {view === "guide" && (
          <div className="guide page-enter">
            <div className="episode-kicker"><span>{t.guide.kicker}</span><i /> {t.guide.kickerTag}</div>
            <div className="guide-heading">
              <h1>{t.guide.title1}<br />{t.guide.title2}</h1>
              <p>{t.guide.copy}</p>
            </div>
            <div className="guide-grid">
              {fieldGuide.map((card) => (
                <article className="guide-card comic-box" key={card.id}>
                  <div className="guide-card-top"><span aria-hidden="true">{card.icon}</span><div><strong>{card.title}</strong><small>{card.subtitle}</small></div></div>
                  <ul>
                    {card.lines.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <div className="result-actions"><button className="secondary-button" type="button" onClick={() => setView("dashboard")}>{t.guide.back}</button></div>
          </div>
        )}

        {view === "results" && (
          <div className="results page-enter">
            <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
            <span className="episode-kicker">{t.results.kicker}</span>
            <h1>{t.results.title}</h1>
            <p>{fmt(t.results.copy, { n: course.length })}</p>
            <div className="result-grid">
              <section className="score-card comic-box">
                <span className="score-ring"><b>{score}</b><small>{t.debrief.masteryWord}</small></span>
                <div><span>{t.results.yourResult}</span><h2>{t.results.cleared}</h2><p>{fmt(t.results.clearedCopy, { n: course.length, m: courseMinutes })}</p></div>
              </section>
              <section className="takeaway-card comic-box"><span>{t.results.keepRule}</span><h2>{t.results.ruleTitle}</h2><p>{t.results.ruleCopy}</p></section>
            </div>
            <section className="certificate-form comic-box">
              <div><span className="caption-label">{t.results.record}</span><h2>{t.results.makeYours}</h2><p>{t.results.makeYoursCopy}</p></div>
              <label><span>{t.results.learnerName}</span><input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder={t.results.namePlaceholder} /></label>
              <button className="primary-button" disabled={!learnerName.trim() || !courseComplete} type="button" onClick={() => window.print()}>{t.results.export} <span>↗</span></button>
            </section>
            <div className="result-actions"><button className="text-button" type="button" onClick={() => setView("dashboard")}>{t.results.backMap}</button></div>
          </div>
        )}

        <footer className="app-footer">
          <span>{t.footer.note}</span>
          <span><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST AI RMF</a><a href="https://www.faa.gov/aircraft/air_cert/step/roadmap_for_AI_safety_assurance" target="_blank" rel="noreferrer">FAA AI Safety Assurance</a></span>
        </footer>
      </section>

      <section className="print-certificate" aria-hidden="true">
        <div className="certificate-border">
          <div className="certificate-brand">Ctrl+Alt+Learn</div>
          <span>{t.certificate.title}</span>
          <p>{t.certificate.certifies}</p>
          <h1>{learnerName || t.certificate.namePlaceholder}</h1>
          <p>{t.certificate.completed}</p>
          <h2>{t.certificate.courseName}</h2>
          <h3>{fmt(t.certificate.subtitle, { n: course.length })}</h3>
          <div className="certificate-meta"><span><small>{t.certificate.dateLabel}</small>{new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US", { dateStyle: "long" }).format(progress.courseCompletedAt ? new Date(progress.courseCompletedAt) : new Date())}</span><span><small>{t.certificate.masteryLabel}</small>{score}%</span><span><small>{t.certificate.idLabel}</small>{progress.certificateId || "—"}</span></div>
          <div className="certificate-rule">{t.certificate.rule}</div>
        </div>
      </section>
    </main>
  );
}
