"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminPortal } from "./AdminPortal";
import { LearnerProfile, Onboarding } from "./Onboarding";
import { course, courseMinutes, dimensionLabels, fieldGuide, missionScore, type Dimension, type Mission } from "./course";
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
};

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

function missionState(progress: CourseProgress, mission: Mission): "done" | "current" | "locked" {
  if (progress.missions[mission.id]) return "done";
  const index = course.indexOf(mission);
  if (index === 0) return "current";
  return progress.missions[course[index - 1].id] ? "current" : "locked";
}

function nextMission(progress: CourseProgress): Mission | null {
  return course.find((mission) => !progress.missions[mission.id]) ?? null;
}

function overallScore(progress: CourseProgress) {
  const records = Object.values(progress.missions);
  if (!records.length) return 0;
  return Math.round(records.reduce((sum, record) => sum + record.score, 0) / records.length);
}

function MissionRail({
  progress,
  activeId,
  guideActive,
  onSelect,
  onGuide,
}: {
  progress: CourseProgress;
  activeId: string | null;
  guideActive: boolean;
  onSelect: (mission: Mission) => void;
  onGuide: () => void;
}) {
  const completedCount = Object.keys(progress.missions).filter((id) => course.some((m) => m.id === id)).length;
  return (
    <aside className="mission-rail" aria-label="Intro 101 missions">
      <div className="brand-lockup">
        <span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
        <span><strong>Ctrl+Alt+Learn</strong><small>A human-first AI academy</small></span>
      </div>
      <div className="course-label"><span>COURSE 01</span><strong>AI Chatbots: Intro 101</strong></div>
      <nav>
        {course.map((mission) => {
          const state = missionState(progress, mission);
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
                <small>{state === "done" ? `Complete · ${progress.missions[mission.id].score}%` : state === "current" ? "Ready to play" : "Locked"}</small>
              </p>
            </button>
          );
        })}
      </nav>
      <button className={`mission-link guide-link ${guideActive ? "active" : ""}`} type="button" onClick={onGuide}>
        <span>📒</span>
        <p>Field Guide<small>Cheat sheets · always open</small></p>
      </button>
      <div className="rail-progress">
        <span><b>Course progress</b><b>{completedCount}/{course.length}</b></span>
        <i><b style={{ width: `${(completedCount / course.length) * 100}%` }} /></i>
        <small>{completedCount === course.length ? "Course complete — certificate unlocked" : `${courseMinutes} minutes of playable training`}</small>
      </div>
    </aside>
  );
}

function MasteryPanel({ progress }: { progress: CourseProgress }) {
  const colors: Record<Dimension, string> = { safety: "teal", judgment: "yellow", verification: "blue", promptCraft: "purple" };
  return (
    <aside className="mastery-panel comic-box">
      <div className="panel-title"><div><span>MASTERY RADAR</span><h2>Skills that update as you play</h2></div><b>LIVE</b></div>
      {(Object.keys(dimensionLabels) as Dimension[]).map((dim) => {
        const { attempts, firstTryCorrect } = progress.dims[dim];
        const value = attempts ? Math.round((firstTryCorrect / attempts) * 100) : 0;
        return (
          <div className="mastery-row" key={dim}>
            <span><b>{dimensionLabels[dim]}</b><b>{attempts ? `${value}%` : "—"}</b></span>
            <i><b className={colors[dim]} style={{ width: `${attempts ? Math.max(value, 6) : 0}%` }} /></i>
          </div>
        );
      })}
      <div className="desk-note"><span>DESK NOTE</span><strong>Pause → classify → minimize → verify.</strong><p>The safest prompt starts before you type.</p></div>
      <div className="certificate-teaser"><span>☆</span><p><strong>Certificate unlocked at the finish</strong><small>Complete all {course.length} missions to export your record.</small></p></div>
    </aside>
  );
}

function CourseMap({
  progress,
  onSelect,
}: {
  progress: CourseProgress;
  onSelect: (mission: Mission) => void;
}) {
  return (
    <section className="course-map">
      <div className="course-map-heading"><span className="caption-label">FULL COURSE MAP</span><h2>Eight missions. One sharp AI teammate: you.</h2></div>
      <div className="course-map-grid">
        {course.map((mission) => {
          const state = missionState(progress, mission);
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
                <span className="map-status">{state === "done" ? `${record.score}%` : state === "current" ? "PLAY" : "LOCKED"}</span>
              </div>
              <strong>{mission.title}</strong>
              <small>{mission.description}</small>
              <div className="map-card-meta"><span>{mission.minutes} min</span><span>{mission.kicker}</span></div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const [mode, setMode] = useState<AppMode>("loading");
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [progress, setProgress] = useState<CourseProgress>(freshProgress);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [lastResult, setLastResult] = useState<{ mission: Mission; score: number; mistakes: number } | null>(null);
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    const savedProfile = window.localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as LearnerProfile;
        setProfile(parsed);
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

  const upNext = useMemo(() => nextMission(progress), [progress]);
  const courseComplete = !upNext;
  const score = overallScore(progress);

  function startMission(mission: Mission) {
    setActiveMission(mission);
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
    const updated: CourseProgress = {
      ...progress,
      missions: { ...progress.missions, [activeMission.id]: record },
      dims: mergeStats(progress.dims, result.stats),
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

    setProgress(updated);
    saveProgress(updated);
    setLastResult({ mission: activeMission, score: record.score, mistakes: result.mistakes });
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
  const spotlightState = missionState(progress, spotlight);

  return (
    <main className="app-shell">
      <MissionRail
        activeId={view === "mission" && activeMission ? activeMission.id : null}
        guideActive={view === "guide"}
        progress={progress}
        onSelect={(mission) => startMission(mission)}
        onGuide={() => setView("guide")}
      />
      <section className="workspace">
        <header className="topbar">
          <div><span className="edition-chip">AVIATION OPERATIONS EDITION</span><span className="status-chip"><i /> Progress connected</span></div>
          <div className="learner-controls"><button className="topbar-admin" type="button" onClick={() => setMode("admin")}>Admin</button><button className="topbar-switch" type="button" onClick={() => { window.localStorage.removeItem(PROFILE_KEY); setProfile(null); setMode("onboarding"); }}>Switch learner</button><div className="profile"><span>{initials}</span><p><strong>{profile?.name}</strong><small>{profile?.role || "Learner"} · {profile?.skillLevel}</small></p></div></div>
        </header>

        {view === "dashboard" && (
          <div className="dashboard page-enter">
            <div className="episode-kicker"><span>{courseComplete ? "COURSE COMPLETE" : `MISSION ${String(spotlight.number).padStart(2, "0")}`}</span><i /> {spotlight.kicker}</div>
            <div className="dashboard-heading">
              <div>
                <h1>{courseComplete ? <>Certificate<br />earned.</> : <>{spotlight.title}</>}</h1>
                <p>{courseComplete ? "You finished every mission in Intro 101. Review your results or replay any mission to sharpen a skill." : spotlight.description}</p>
              </div>
              <div className="time-card"><small>{courseComplete ? "FINAL SCORE" : "ESTIMATED TIME"}</small><strong>{courseComplete ? `${score}%` : `${spotlight.minutes} min`}</strong><span>{courseComplete ? "Course mastery" : "Interactive scenario"}</span></div>
            </div>
            <div className="dashboard-grid">
              <div>
                <div className="scene" role="img" aria-label="Maya and Jordan at an aviation operations help desk">
                  <div className="scene-header">
                    <span><i className="record-dot" /> {spotlight.steps[0].scene.location} · UP NEXT</span>
                    <span>OPS SUPPORT · TUESDAY, 9:42 AM</span>
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
                  <div><span className="caption-label">{courseComplete ? "VICTORY LAP" : "TODAY'S CALL"}</span><h2>{courseComplete ? "See your final results and certificate" : spotlight.steps[0].title}</h2><p>{courseComplete ? `Overall mastery ${score}% across ${course.length} missions. Your certificate is ready to export.` : spotlight.ruleDetail}</p></div>
                  {courseComplete ? (
                    <button className="primary-button" type="button" onClick={() => setView("results")}>View results <span>→</span></button>
                  ) : (
                    <button className="primary-button" type="button" onClick={() => startMission(spotlight)}>
                      {spotlightState === "done" ? "Replay mission" : "Start mission"} <span>→</span>
                    </button>
                  )}
                </div>
              </div>
              <MasteryPanel progress={progress} />
            </div>
            <CourseMap progress={progress} onSelect={startMission} />
          </div>
        )}

        {view === "mission" && activeMission && (
          <MissionPlayer
            key={activeMission.id}
            mission={activeMission}
            onComplete={completeMission}
            onExit={() => { setActiveMission(null); setView("dashboard"); }}
          />
        )}

        {view === "debrief" && lastResult && (
          <div className="results page-enter">
            <span className="episode-kicker">MISSION {String(lastResult.mission.number).padStart(2, "0")} COMPLETE</span>
            <h1>{lastResult.mistakes === 0 ? "Flawless run, crew member." : "Mission cleared."}</h1>
            <p>{lastResult.mistakes === 0 ? "Perfect first-pass judgment on every challenge." : `${lastResult.mistakes} coaching ${lastResult.mistakes === 1 ? "moment" : "moments"} turned into safer instincts.`}</p>
            <div className="result-grid">
              <section className="score-card comic-box">
                <span className="score-ring"><b>{lastResult.score}</b><small>mastery</small></span>
                <div><span>MISSION RESULT</span><h2>{lastResult.mission.title}</h2><p>{Object.keys(progress.missions).length} of {course.length} missions complete · overall {score}%</p></div>
              </section>
              <section className="takeaway-card comic-box"><span>KEEP THIS RULE</span><h2>{lastResult.mission.rule}</h2><p>{lastResult.mission.ruleDetail}</p></section>
            </div>
            <div className="result-actions">
              {courseComplete ? (
                <button className="primary-button" type="button" onClick={() => setView("results")}>See final results & certificate <span>→</span></button>
              ) : (
                upNext && <button className="primary-button" type="button" onClick={() => startMission(upNext)}>Next mission: {upNext.shortTitle} <span>→</span></button>
              )}
              <button className="secondary-button" type="button" onClick={() => { setActiveMission(null); setView("dashboard"); }}>Return to course map</button>
            </div>
          </div>
        )}

        {view === "guide" && (
          <div className="guide page-enter">
            <div className="episode-kicker"><span>FIELD GUIDE</span><i /> REFERENCE, NOT HOMEWORK</div>
            <div className="guide-heading">
              <h1>Steal these.<br />That's what they're for.</h1>
              <p>Every formula, rule, and red-flag list from the course on one page. Nothing to memorize — just come back whenever you need it.</p>
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
            <div className="result-actions"><button className="secondary-button" type="button" onClick={() => setView("dashboard")}>Back to course map</button></div>
          </div>
        )}

        {view === "results" && (
          <div className="results page-enter">
            <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
            <span className="episode-kicker">COURSE COMPLETE</span>
            <h1>Nice work, crew member.</h1>
            <p>You finished all {course.length} missions of AI Chatbots: Intro 101 — tool choice, data safety, prompting, verification, and knowing when a human takes over.</p>
            <div className="result-grid">
              <section className="score-card comic-box">
                <span className="score-ring"><b>{score}</b><small>mastery</small></span>
                <div><span>YOUR RESULT</span><h2>Intro 101: Cleared</h2><p>{course.length} missions · {courseMinutes} minutes of scenario training completed.</p></div>
              </section>
              <section className="takeaway-card comic-box"><span>KEEP THIS RULE</span><h2>Pause. Classify. Minimize. Verify.</h2><p>Use only approved tools, share only the data needed, verify in proportion to impact, and escalate to a person when the stakes demand one.</p></section>
            </div>
            <section className="certificate-form comic-box">
              <div><span className="caption-label">COMPLETION RECORD</span><h2>Make the certificate yours</h2><p>Enter the learner name exactly as it should appear on the printable certificate.</p></div>
              <label><span>Learner name</span><input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="Enter full name" /></label>
              <button className="primary-button" disabled={!learnerName.trim() || !courseComplete} type="button" onClick={() => window.print()}>Export certificate <span>↗</span></button>
            </section>
            <div className="result-actions"><button className="text-button" type="button" onClick={() => setView("dashboard")}>Back to course map</button></div>
          </div>
        )}

        <footer className="app-footer">
          <span>Prototype curriculum informed by current US risk-management and aviation safety guidance.</span>
          <span><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST AI RMF</a><a href="https://www.faa.gov/aircraft/air_cert/step/roadmap_for_AI_safety_assurance" target="_blank" rel="noreferrer">FAA AI Safety Assurance</a></span>
        </footer>
      </section>

      <section className="print-certificate" aria-hidden="true">
        <div className="certificate-border">
          <div className="certificate-brand">Ctrl+Alt+Learn</div>
          <span>CERTIFICATE OF COMPLETION</span>
          <p>This certifies that</p>
          <h1>{learnerName || "Learner Name"}</h1>
          <p>successfully completed</p>
          <h2>AI Chatbots: Intro 101</h2>
          <h3>{course.length}-Mission Interactive Course · Aviation Operations Edition</h3>
          <div className="certificate-meta"><span><small>COMPLETED</small>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(progress.courseCompletedAt ? new Date(progress.courseCompletedAt) : new Date())}</span><span><small>MASTERY</small>{score}%</span><span><small>CERTIFICATE ID</small>{progress.certificateId || "—"}</span></div>
          <div className="certificate-rule">Pause · Classify · Minimize · Verify</div>
        </div>
      </section>
    </main>
  );
}
