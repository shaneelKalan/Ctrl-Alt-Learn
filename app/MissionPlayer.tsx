"use client";

import { useState } from "react";
import type { Choice, Dimension, Mission, Step } from "./course";
import { XP_FIRST_TRY, XP_RETRY } from "./game";
import { fmt, uiStrings, type Lang } from "./i18n";

export type DimensionStats = Record<Dimension, { attempts: number; firstTryCorrect: number }>;

export function emptyDimensionStats(): DimensionStats {
  return {
    safety: { attempts: 0, firstTryCorrect: 0 },
    judgment: { attempts: 0, firstTryCorrect: 0 },
    verification: { attempts: 0, firstTryCorrect: 0 },
    promptCraft: { attempts: 0, firstTryCorrect: 0 },
  };
}

type Feedback = { correct: boolean; text: string };

function SceneCard({ lang, mission, step }: { lang: Lang; mission: Mission; step: Step }) {
  const t = uiStrings[lang].player;
  const stepIndex = mission.steps.indexOf(step);
  return (
    <div className="scene" role="img" aria-label={`${step.scene.speaker} — ${step.scene.location.toLowerCase()}`}>
      <div className="scene-header">
        <span><i className="record-dot" /> {step.scene.location} · {t.sceneWord} {String(stepIndex + 1).padStart(2, "0")}</span>
        <span>{t.missionTag} {String(mission.number).padStart(2, "0")} · {mission.kicker}</span>
      </div>
      <div className="scene-grid" aria-hidden="true" />
      <div className="speech-bubble">
        <span>{step.scene.speaker} · {step.scene.role}</span>
        <strong>“{step.scene.bubble}”</strong>
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
      <div className="scene-caption">{step.scene.caption}</div>
    </div>
  );
}

function ChoiceCards({
  choices,
  selected,
  onChoose,
}: {
  choices: Choice[];
  selected: string | null;
  onChoose: (choice: Choice) => void;
}) {
  return (
    <div className="choice-grid">
      {choices.map((choice, index) => (
        <button
          className={`choice-card ${selected === choice.id ? "is-selected" : ""}`}
          key={choice.id}
          onClick={() => onChoose(choice)}
          type="button"
        >
          <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
          <span><strong>{choice.label}</strong><small>{choice.detail}</small></span>
        </button>
      ))}
    </div>
  );
}

export function MissionPlayer({
  lang,
  mission,
  onComplete,
  onExit,
}: {
  lang: Lang;
  mission: Mission;
  onComplete: (result: { mistakes: number; stats: DimensionStats }) => void;
  onExit: () => void;
}) {
  const t = uiStrings[lang].player;
  const [stepIndex, setStepIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [stats, setStats] = useState<DimensionStats>(emptyDimensionStats());
  const [attempted, setAttempted] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [multiPicks, setMultiPicks] = useState<string[]>([]);
  const [sortPicks, setSortPicks] = useState<Record<string, string>>({});
  const [sortChecked, setSortChecked] = useState(false);
  const [beatIndex, setBeatIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [combo, setCombo] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [fxKey, setFxKey] = useState(0);

  const step = mission.steps[stepIndex];
  const isLast = stepIndex === mission.steps.length - 1;

  function recordAttempt(dimension: Dimension, correct: boolean) {
    const firstAttempt = !attempted.has(step.id);
    if (firstAttempt) {
      setAttempted((current) => new Set(current).add(step.id));
      setStats((current) => ({
        ...current,
        [dimension]: {
          attempts: current[dimension].attempts + 1,
          firstTryCorrect: current[dimension].firstTryCorrect + (correct ? 1 : 0),
        },
      }));
    }
    if (correct) {
      setXpGain(firstAttempt ? XP_FIRST_TRY : XP_RETRY);
      if (firstAttempt) setCombo((value) => value + 1);
    } else {
      setCombo(0);
      setMistakes((count) => count + 1);
    }
    setFxKey((value) => value + 1);
  }

  function advance() {
    if (isLast) {
      onComplete({ mistakes, stats });
      return;
    }
    setStepIndex((value) => value + 1);
    setSelected(null);
    setMultiPicks([]);
    setSortPicks({});
    setSortChecked(false);
    setBeatIndex(0);
    setFeedback(null);
  }

  function answerChoice(choice: Choice) {
    if (step.kind !== "choice") return;
    setSelected(choice.id);
    setFeedback({ correct: choice.correct, text: choice.coach });
    recordAttempt(step.dimension, choice.correct);
  }

  function toggleMulti(id: string) {
    setMultiPicks((values) => (values.includes(id) ? values.filter((value) => value !== id) : [...values, id]));
    setFeedback(null);
  }

  function checkMulti() {
    if (step.kind !== "multi") return;
    const expected = step.items.filter((item) => item.shouldSelect).map((item) => item.id).sort();
    const actual = [...multiPicks].sort();
    const correct = expected.length === actual.length && expected.every((id, index) => id === actual[index]);
    setFeedback({ correct, text: correct ? step.correctFeedback : step.incorrectFeedback });
    recordAttempt(step.dimension, correct);
  }

  function placeSortItem(itemId: string, bucket: string) {
    setSortPicks((current) => ({ ...current, [itemId]: bucket }));
    setSortChecked(false);
    setFeedback(null);
  }

  function checkSort() {
    if (step.kind !== "sort") return;
    const allPlaced = step.items.every((item) => sortPicks[item.id]);
    if (!allPlaced) {
      setFeedback({ correct: false, text: t.placeAll });
      return;
    }
    const correct = step.items.every((item) => sortPicks[item.id] === item.bucket);
    setSortChecked(true);
    setFeedback({ correct, text: correct ? step.correctFeedback : step.incorrectFeedback });
    recordAttempt(step.dimension, correct);
  }

  function checkBuilder() {
    if (step.kind !== "builder") return;
    const expected = step.parts.filter((part) => part.good).map((part) => part.id).sort();
    const actual = [...multiPicks].sort();
    const correct = expected.length === actual.length && expected.every((id, index) => id === actual[index]);
    setFeedback({ correct, text: correct ? step.correctFeedback : step.incorrectFeedback });
    recordAttempt(step.dimension, correct);
  }

  return (
    <div className="lesson page-enter">
      <div className="lesson-topline">
        <button className="text-button lesson-exit" type="button" onClick={onExit}>{t.courseMap}</button>
        <span className="lesson-mission-tag">{t.missionTag} {String(mission.number).padStart(2, "0")} · {mission.title}</span>
      </div>
      <div className="lesson-progress" aria-label={fmt(t.stepOf, { i: stepIndex + 1, n: mission.steps.length })}>
        {mission.steps.map((item, index) => (
          <div className={index < stepIndex ? "done" : index === stepIndex ? "active" : ""} key={item.id}>
            <span>{index < stepIndex ? "✓" : index + 1}</span><b>{item.label}</b>
          </div>
        ))}
      </div>
      <SceneCard lang={lang} mission={mission} step={step} />
      <section className="challenge comic-box">
        <div className="challenge-heading">
          <span className="caption-label">
            {step.kind === "lesson" ? t.fieldBriefing : fmt(t.challenge, { i: stepIndex + 1, n: mission.steps.length })}
          </span>
          <h1>{step.title}</h1>
          <p>{step.intro}</p>
        </div>

        {step.kind === "lesson" && (() => {
          const beat = step.beats[beatIndex];
          const lastBeat = beatIndex === step.beats.length - 1;
          return (
            <div className="lesson-beats">
              <div className="beat-card page-enter" key={beat.title}>
                <span className="beat-icon" aria-hidden="true">{beat.icon}</span>
                <h2>{beat.title}</h2>
                <p>{beat.copy}</p>
              </div>
              <div className="beat-controls">
                <button
                  className="text-button beat-back"
                  disabled={beatIndex === 0}
                  type="button"
                  onClick={() => setBeatIndex((value) => Math.max(0, value - 1))}
                >
                  {t.back}
                </button>
                <div className="beat-dots" aria-label={fmt(t.idea, { i: beatIndex + 1, n: step.beats.length })}>
                  {step.beats.map((item, index) => (
                    <i className={index === beatIndex ? "active" : index < beatIndex ? "done" : ""} key={item.title} />
                  ))}
                </div>
                <button
                  className="primary-button beat-next"
                  type="button"
                  onClick={() => (lastBeat ? advance() : setBeatIndex((value) => value + 1))}
                >
                  {lastBeat ? (isLast ? t.finishMission : t.gotIt) : t.nextIdea} <span>→</span>
                </button>
              </div>
            </div>
          );
        })()}

        {step.kind === "choice" && <ChoiceCards choices={step.choices} selected={selected} onChoose={answerChoice} />}

        {step.kind === "multi" && (
          <div className="redaction-board">
            <div className="report-header"><span>{step.boardLabel}</span><b>{step.boardTitle}</b></div>
            <div className="data-chips">
              {step.items.map((item) => {
                const checked = multiPicks.includes(item.id);
                return (
                  <button
                    aria-pressed={checked}
                    className={checked ? "redacted" : ""}
                    key={item.id}
                    onClick={() => toggleMulti(item.id)}
                    type="button"
                  >
                    <span>{item.text}</span><small>{checked ? step.selectedTag : item.tag}</small>
                  </button>
                );
              })}
            </div>
            <button className="secondary-button" type="button" onClick={checkMulti}>{step.checkLabel}</button>
          </div>
        )}

        {step.kind === "sort" && (
          <div className="sort-board">
            {step.items.map((item) => (
              <div className={`sort-item ${sortChecked ? (sortPicks[item.id] === item.bucket ? "sorted-right" : "sorted-wrong") : ""}`} key={item.id}>
                <div className="sort-item-text">
                  <span>{item.text}</span>
                  {sortChecked && sortPicks[item.id] === item.bucket && <small className="sort-why">{item.why}</small>}
                </div>
                <div className="sort-buckets" role="group" aria-label={`Choose a lane for: ${item.text}`}>
                  {step.buckets.map((bucket) => (
                    <button
                      aria-pressed={sortPicks[item.id] === bucket}
                      className={sortPicks[item.id] === bucket ? "picked" : ""}
                      key={bucket}
                      onClick={() => placeSortItem(item.id, bucket)}
                      type="button"
                    >
                      {bucket}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="secondary-button" type="button" onClick={checkSort}>{t.checkSorting}</button>
          </div>
        )}

        {step.kind === "builder" && (
          <div className="builder-board">
            <div className="builder-parts">
              {step.parts.map((part) => {
                const picked = multiPicks.includes(part.id);
                return (
                  <button
                    aria-pressed={picked}
                    className={`builder-part ${picked ? "picked" : ""}`}
                    key={part.id}
                    onClick={() => toggleMulti(part.id)}
                    type="button"
                  >
                    <span className="builder-part-label">{picked ? "✓ IN THE PROMPT" : "+ ADD"} · {part.label}</span>
                    <strong>{part.text}</strong>
                  </button>
                );
              })}
            </div>
            <div className="builder-preview">
              <span>{t.promptPreview}</span>
              {multiPicks.length ? (
                <p>
                  {step.parts.filter((part) => multiPicks.includes(part.id)).map((part) => part.text).join(" ")}
                </p>
              ) : (
                <p className="builder-empty">{t.builderEmpty}</p>
              )}
            </div>
            <button className="secondary-button" type="button" onClick={checkBuilder}>{t.testPrompt}</button>
          </div>
        )}

        {feedback && step.kind !== "lesson" && (
          <div className={`feedback ${feedback.correct ? "correct" : "coach shake"}`} key={fxKey} role="status">
            <span className="feedback-icon">
              {feedback.correct ? "✓" : "!"}
              {feedback.correct && <b className="burst" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></b>}
            </span>
            <p>
              <strong>
                {feedback.correct ? t.cleared : t.coaching}
                {feedback.correct && xpGain > 0 && <em className="xp-pop">+{xpGain} {uiStrings[lang].game.xp}</em>}
                {feedback.correct && combo >= 2 && <em className="combo-chip">🔥 {uiStrings[lang].game.combo} ×{combo}</em>}
              </strong>
              {feedback.text}
            </p>
            {feedback.correct && (
              <button type="button" onClick={advance}>{isLast ? t.finishMission : t.nextScene} →</button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
