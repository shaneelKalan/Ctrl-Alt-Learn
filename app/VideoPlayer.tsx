"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fmt, uiStrings, type Lang } from "./i18n";
import type { VideoLesson, VideoScene } from "./videos";

function VideoStage({ scene, title, playing }: { scene: VideoScene; title: string; playing: boolean }) {
  const visual = scene.visual;
  const cls = `vid-art vs-${visual} ${playing ? "is-playing" : "is-paused"}`;

  switch (visual) {
    case "title":
      return (
        <div className={cls} aria-hidden="true">
          <span className="vs-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
          <strong>{title}</strong>
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
    case "copilot":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-shield"><span className="vs-shield-mark">✦</span><b>Copilot</b><i className="vs-shield-check">✓</i></div>
          <div className="vs-approved">DASI-approved</div>
        </div>
      );
    case "guardrails":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-guard-ring">
            <span className="vs-guard-tag">DASI</span>
            <span className="vs-guard-data">🔒 Your work data</span>
          </div>
          <div className="vs-gen-label">inside the protections</div>
        </div>
      );
    case "two-chats":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-chatcard ok"><b>Copilot</b><small>at work</small><i>✓ approved</i></div>
          <div className="vs-chatcard no"><b>Other AI</b><small>personal / free</small><i>✕ not for work</i></div>
        </div>
      );
    case "two-accounts":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-acct work"><span>🪪</span><b>Work account</b><small>DASI login</small></div>
          <div className="vs-acct home"><span>🏠</span><b>Personal account</b><small>your own email</small></div>
        </div>
      );
    case "personal-safe":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-home"><span>🍳</span><span>✈️</span><span>📚</span></div>
          <div className="vs-gen-label">personal accounts: great for life</div>
        </div>
      );
    case "crossstreams":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-cross">
            <span className="vs-cross-from">🔒 Work data</span>
            <i className="vs-cross-arrow">→</i>
            <span className="vs-cross-to">🏠 Personal</span>
            <b className="vs-cross-no">✕</b>
          </div>
          <div className="vs-gen-label">don't cross the streams</div>
        </div>
      );
    case "traffic":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-lights"><i className="g" /><i className="y" /><i className="r" /></div>
          <div className="vs-lights-labels"><span>Go</span><span>Review</span><span>Stop</span></div>
        </div>
      );
    case "stop":
      return (
        <div className={cls} aria-hidden="true">
          <div className="vs-stopsign">✋</div>
          <div className="vs-stop-label">Stop &amp; ask first</div>
        </div>
      );
    case "recap":
      return (
        <div className={cls} aria-hidden="true">
          <ul className="vs-recap-list">
            {(scene.recapItems ?? ["", "", ""]).map((item, index) => (
              <li key={index}><i>✓</i> {item}</li>
            ))}
          </ul>
          <div className="vs-wave"><span>👋</span><span>👋</span></div>
        </div>
      );
    default:
      return <div className={cls} aria-hidden="true" />;
  }
}

// Speech engines read all-caps "DASI" letter-by-letter. Respell it phonetically
// for the spoken track only, so narration says it as one word ("DAH-see").
// On-screen captions, titles, and UI keep the real "DASI" spelling.
const DASI_PHONETIC = "Dahsee";
function toSpeech(text: string) {
  return text.replace(/\bDASI\b/g, DASI_PHONETIC);
}

export function VideoPlayer({
  lang,
  video,
  onExit,
  onStartMission,
  onNextVideo,
  nextVideoTitle,
}: {
  lang: Lang;
  video: VideoLesson;
  onExit: () => void;
  onStartMission?: (missionId: string) => void;
  onNextVideo?: () => void;
  nextVideoTitle?: string;
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
      const utterance = new SpeechSynthesisUtterance(toSpeech(active.narration));
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
  const hasMissionCta = Boolean(video.linkMissionId && onStartMission);

  return (
    <div className="video-view page-enter">
      <div className="video-topline">
        <button className="text-button lesson-exit" type="button" onClick={onExit}>{t.exit}</button>
        <span className="lesson-mission-tag">{t.nowPlaying} · {video.title}</span>
      </div>

      <div className="video-frame comic-box">
        <div className="video-stage-wrap">
          <VideoStage scene={scene} title={video.title} playing={playing && started && !ended} />

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
                {hasMissionCta && (
                  <button className="primary-button" type="button" onClick={() => onStartMission!(video.linkMissionId!)}>
                    {t.startMission} <span>→</span>
                  </button>
                )}
                {onNextVideo && (
                  <button className={hasMissionCta ? "secondary-button" : "primary-button"} type="button" onClick={onNextVideo}>
                    {t.nextEpisode}: {nextVideoTitle} <span>→</span>
                  </button>
                )}
                <button className="secondary-button" type="button" onClick={start}>↺ {t.replayVideo}</button>
              </div>
              <button className="text-button video-endback" type="button" onClick={onExit}>{t.backToLibrary}</button>
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
                key={item.id + index}
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
