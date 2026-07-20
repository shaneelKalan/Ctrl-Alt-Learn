"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fmt, uiStrings, type Lang } from "./i18n";
import type { VideoLesson } from "./videos";

function VideoStage({ visual, playing }: { visual: string; playing: boolean }) {
  const cls = `vid-art vs-${visual} ${playing ? "is-playing" : "is-paused"}`;

  switch (visual) {
    case "title":
      return (
        <div className={cls} aria-hidden="true">
          <span className="vs-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
          <strong>Intro to AI</strong>
          <em>Ctrl+Alt+Learn</em>
          <div className="vs-sparkles"><i /><i /><i /><i /><i /></div>
        </div>
      );
    case "question":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-person"><i /><b /><span /></div>
          <div className="vs-qmarks"><b>?</b><b>?</b><b>?</b></div>
          <div className="vs-thought"><i /><i /><i /></div>
        </div>
      );
    case "predict":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-brain">🧠</div>
          <div className="vs-words">
            <span>The</span><span>cat</span><span>sat</span><span>on</span><span>the</span>
            <span className="vs-next">mat</span>
          </div>
          <div className="vs-nextlabel">predicting…</div>
        </div>
      );
    case "autocomplete":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-phone">
            <div className="vs-phone-line">I'll be there in five<i className="vs-caret" /></div>
            <div className="vs-suggest"><span>minutes</span><span>hours</span><span>days</span></div>
          </div>
        </div>
      );
    case "chatbot":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-chat">
            <div className="vs-chat-head"><i /> CHATBOT</div>
            <div className="vs-bubble user">How do I write this email?</div>
            <div className="vs-bubble bot"><i /><i /><i /></div>
          </div>
        </div>
      );
    case "generative":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-spark">✦</div>
          <div className="vs-gen-cards"><span>Answer A</span><span>Answer B</span></div>
          <div className="vs-gen-label">same question → new every time</div>
        </div>
      );
    case "superpowers":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-power"><span>📝</span><b>Summarize</b></div>
          <div className="vs-power"><span>✍️</span><b>Draft</b></div>
          <div className="vs-power"><span>💡</span><b>Explain</b></div>
        </div>
      );
    case "hallucination":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-doc">
            <i /><i /><i className="vs-fake">“FAA Report 2024-117”</i><i /><i className="short" />
          </div>
          <div className="vs-glitch">⚠</div>
        </div>
      );
    case "confidence":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-gauge true"><b>100%</b><span>✓ true</span></div>
          <div className="vs-gauge false"><b>100%</b><span>✗ false</span></div>
          <div className="vs-gen-label">same confident tone</div>
        </div>
      );
    case "context":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-orb">AI<span className="vs-blindfold" /></div>
          <div className="vs-ring" />
          <div className="vs-folder">🔒 Your company</div>
        </div>
      );
    case "goldenrule":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-draft">AI draft</div>
          <div className="vs-arrow">→</div>
          <div className="vs-human"><span>🧑‍✈️</span><b className="vs-stamp">APPROVED</b></div>
        </div>
      );
    case "recap":
      return (
        <div className={cls} aria-hidden="true">
          <ul className="vs-recap-list">
            <li><i>✓</i> Predicts — can be confidently wrong</li>
            <li><i>✓</i> Doesn't know your world</li>
            <li><i>✓</i> Never decides alone</li>
          </ul>
          <div className="vs-wave"><span>👋</span><span>👋</span></div>
        </div>
      );
    default:
      return <div className={cls} aria-hidden="true" />;
  }
}

export function VideoPlayer({
  lang,
  video,
  onExit,
  onStartMission,
}: {
  lang: Lang;
  video: VideoLesson;
  onExit: () => void;
  onStartMission?: (missionId: string) => void;
}) {
  const t = uiStrings[lang].videos;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  const keepAlive = useRef<ReturnType<typeof setInterval> | null>(null);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = video.scenes[sceneIndex];
  const total = video.scenes.length;

  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!speechSupported) return;
    const sync = () => setVoicesReady(window.speechSynthesis.getVoices().length > 0);
    sync();
    window.speechSynthesis.addEventListener("voiceschanged", sync);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", sync);
  }, [speechSupported]);

  const pickVoice = useCallback(() => {
    if (!speechSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    const want = lang === "es" ? "es" : "en";
    const matches = voices.filter((v) => v.lang.toLowerCase().startsWith(want));
    const preferred = matches.find((v) => /google|natural|samantha|premium|enhanced/i.test(v.name));
    return preferred ?? matches[0] ?? null;
  }, [lang, speechSupported]);

  const clearTimers = useCallback(() => {
    if (keepAlive.current) { clearInterval(keepAlive.current); keepAlive.current = null; }
    if (watchdog.current) { clearTimeout(watchdog.current); watchdog.current = null; }
  }, []);

  const goTo = useCallback((index: number) => {
    setEnded(false);
    setSceneIndex(index);
  }, []);

  const advance = useCallback(() => {
    setSceneIndex((current) => {
      if (current >= total - 1) {
        setPlaying(false);
        setEnded(true);
        return current;
      }
      return current + 1;
    });
  }, [total]);

  // Drive narration + timing for the active scene.
  useEffect(() => {
    if (!started || !playing || ended) return;
    const active = video.scenes[sceneIndex];
    const useSpeech = !muted && speechSupported && voicesReady;
    clearTimers();

    if (useSpeech) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(active.narration);
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = lang === "es" ? "es-ES" : "en-US";
      utterance.rate = 0.98;
      utterance.pitch = 1.02;
      utterance.onend = () => advance();
      // Chrome cuts off long utterances (~15s); pause/resume keeps them alive.
      keepAlive.current = setInterval(() => {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }, 9000);
      window.speechSynthesis.speak(utterance);
      // Safety net if onend never fires.
      watchdog.current = setTimeout(() => advance(), (active.seconds + 10) * 1000);
    } else {
      watchdog.current = setTimeout(() => advance(), active.seconds * 1000);
    }

    return () => {
      clearTimers();
      if (speechSupported) window.speechSynthesis.cancel();
    };
  }, [started, playing, ended, sceneIndex, muted, voicesReady, speechSupported, video.scenes, lang, pickVoice, advance, clearTimers]);

  useEffect(() => () => { if (speechSupported) window.speechSynthesis.cancel(); }, [speechSupported]);

  function start() {
    setStarted(true);
    setPlaying(true);
    setEnded(false);
    setSceneIndex(0);
  }

  function togglePlay() {
    if (ended) { start(); return; }
    setPlaying((value) => !value);
  }

  const progressPct = ((sceneIndex + (ended ? 1 : 0)) / total) * 100;

  return (
    <div className="video-view page-enter">
      <div className="video-topline">
        <button className="text-button lesson-exit" type="button" onClick={onExit}>{t.exit}</button>
        <span className="lesson-mission-tag">{t.nowPlaying} · {video.title}</span>
      </div>

      <div className="video-frame comic-box">
        <div className="video-stage-wrap">
          <VideoStage visual={scene.visual} playing={playing && started && !ended} />

          <div className="video-hud">
            <span className="video-badge"><i className="record-dot" /> {t.episode} {String(video.number).padStart(2, "0")}</span>
            <span className="video-cc">{t.captionsOn}</span>
          </div>

          {!started && (
            <button className="video-bigplay" type="button" onClick={start}>
              <span className="video-bigplay-icon">▶</span>
              <strong>{t.bigPlay}</strong>
              <small>{t.tapToStart}</small>
            </button>
          )}

          {ended && (
            <div className="video-endcard">
              <span className="video-endcheck">✓</span>
              <h2>{t.finishedTitle}</h2>
              <p>{t.finishedCopy}</p>
              <div className="video-endactions">
                {video.linkMissionId && onStartMission && (
                  <button className="primary-button" type="button" onClick={() => onStartMission(video.linkMissionId!)}>
                    {t.startMission} <span>→</span>
                  </button>
                )}
                <button className="secondary-button" type="button" onClick={start}>↺ {t.replayVideo}</button>
              </div>
            </div>
          )}

          {started && !ended && (
            <div className="video-caption" role="status" aria-live="polite">
              <span className="video-caption-cc">CC</span>
              <p key={sceneIndex}>{scene.caption}</p>
            </div>
          )}
        </div>

        <div className="video-progress"><i style={{ width: `${progressPct}%` }} /></div>

        <div className="video-controls">
          <button className="video-ctrl primary" type="button" onClick={togglePlay} aria-label={playing ? t.pause : t.play}>
            {ended ? "↺" : playing ? "❙❙" : "▶"}
          </button>
          <button className="video-ctrl" type="button" disabled={sceneIndex === 0 || !started} onClick={() => goTo(Math.max(0, sceneIndex - 1))} aria-label={t.prev}>⏮</button>
          <div className="video-chapters" role="group" aria-label="Chapters">
            {video.scenes.map((item, index) => (
              <button
                aria-label={fmt(t.sceneOf, { i: index + 1, n: total })}
                aria-pressed={index === sceneIndex && started}
                className={`video-chip ${index < sceneIndex || ended ? "done" : index === sceneIndex && started ? "active" : ""}`}
                key={item.id}
                type="button"
                onClick={() => { setStarted(true); setPlaying(true); goTo(index); }}
              />
            ))}
          </div>
          <button className="video-ctrl" type="button" disabled={!started} onClick={advance} aria-label={t.next}>⏭</button>
          <button className={`video-ctrl ${muted ? "off" : ""}`} type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? t.soundOff : t.soundOn}>
            {muted ? "🔇" : "🔊"}
          </button>
          <span className="video-counter">{fmt(t.sceneOf, { i: Math.min(sceneIndex + 1, total), n: total })}</span>
        </div>
      </div>
    </div>
  );
}
