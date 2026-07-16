"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminPortal } from "./AdminPortal";
import { LearnerProfile, Onboarding } from "./Onboarding";

type View = "dashboard" | "mission" | "results";
type AppMode = "loading" | "onboarding" | "learner" | "admin";

type Choice = {
  id: string;
  label: string;
  detail: string;
  correct: boolean;
  coach: string;
};

const missions = [
  { id: 1, title: "The Data Safety Checkpoint", state: "current" },
  { id: 2, title: "Meet Your AI Teammate", state: "next" },
  { id: 3, title: "What AI Does Well", state: "locked" },
  { id: 4, title: "Spot the Confident Guess", state: "locked" },
  { id: 5, title: "Prompt Repair Shop", state: "locked" },
  { id: 6, title: "Verify Before You Fly", state: "locked" },
  { id: 7, title: "Human in the Loop", state: "locked" },
  { id: 8, title: "Final Shift Challenge", state: "locked" },
];

const firstChoices: Choice[] = [
  {
    id: "paste",
    label: "Paste the entire report",
    detail: "The chatbot can summarize it fastest if it sees everything.",
    correct: false,
    coach:
      "Fast is not automatically safe. The report contains personal and internal information, and the tool has not been approved.",
  },
  {
    id: "pause",
    label: "Pause, classify, then minimize",
    detail: "Use an approved tool and include only the data needed for the task.",
    correct: true,
    coach:
      "Exactly. Tool approval and data minimization come before prompt quality.",
  },
  {
    id: "personal",
    label: "Send it to a personal account",
    detail: "Work on the summary later from a different chatbot.",
    correct: false,
    coach:
      "Moving work data to a personal account adds risk and bypasses company safeguards. Keep work information in approved systems.",
  },
];

const dataItems = [
  { id: "name", text: "Customer: Elena Ruiz", sensitive: true, tag: "Personal" },
  { id: "booking", text: "Booking ref: K7M2Q9", sensitive: true, tag: "Identifier" },
  { id: "route", text: "Route: BOS → DCA", sensitive: false, tag: "Operational" },
  {
    id: "reason",
    text: "Delay: crew scheduling issue",
    sensitive: false,
    tag: "Operational",
  },
  { id: "phone", text: "Phone: (617) 555-0142", sensitive: true, tag: "Personal" },
];

const promptChoices: Choice[] = [
  {
    id: "vague",
    label: "Summarize this.",
    detail: "Short and simple.",
    correct: false,
    coach:
      "The data is safer, but the task is still vague. Add the goal, output format, and a rule against inventing missing details.",
  },
  {
    id: "safe",
    label: "Create a customer-safe operations summary",
    detail:
      "Use the redacted note. Return three bullets, separate facts from assumptions, and flag missing information.",
    correct: true,
    coach:
      "Strong prompt. It defines the audience, format, source boundary, and uncertainty check without exposing unnecessary data.",
  },
  {
    id: "creative",
    label: "Make the delay sound harmless",
    detail: "Fill in any missing details so the message feels complete.",
    correct: false,
    coach:
      "AI should not soften safety-relevant facts or invent missing details. Accuracy and appropriate review matter more than polish.",
  },
];

const verifyChoices: Choice[] = [
  {
    id: "send",
    label: "Send the polished draft immediately",
    detail: "It reads confidently and contains no names.",
    correct: false,
    coach:
      "A confident tone is not evidence. Compare the summary with the source and follow the normal approval path before sharing it.",
  },
  {
    id: "review",
    label: "Check the source and route it for review",
    detail:
      "Confirm every claim against the redacted report, then use the normal operational approval process.",
    correct: true,
    coach:
      "That keeps a person accountable. Verification should match the impact of the output.",
  },
  {
    id: "ask-ai",
    label: "Ask the chatbot if it is correct",
    detail: "Let the same system double-check its answer.",
    correct: false,
    coach:
      "Self-checking can help, but it is not independent verification. Use the source record and a qualified reviewer.",
  },
];

const stageLabels = ["Choose", "Classify", "Prompt", "Verify"];

function OfficeScene({ stage }: { stage: number }) {
  const bubble = [
    "The chatbot could summarize this delay report in seconds. Can I paste the whole incident log?",
    "Which details should leave the prompt before it goes anywhere?",
    "The data is clean. Now, how do we ask for a useful result?",
    "The draft looks polished. Are we cleared to send it?",
  ][stage];

  return (
    <div className="scene" role="img" aria-label="Maya and Jordan at an aviation operations help desk">
      <div className="scene-header">
        <span><i className="record-dot" /> HELP DESK STUDIO · SCENE {String(stage + 1).padStart(2, "0")}</span>
        <span>OPS SUPPORT · TUESDAY, 9:42 AM</span>
      </div>
      <div className="scene-grid" aria-hidden="true" />
      <div className="speech-bubble">
        <span>MAYA · OPERATIONS COORDINATOR</span>
        <strong>“{bubble}”</strong>
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
      <div className="scene-caption">Your move: protect the data without grounding the work.</div>
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

function MissionRail({ active = 1 }: { active?: number }) {
  return (
    <aside className="mission-rail" aria-label="Intro 101 missions">
      <div className="brand-lockup">
        <span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
        <span><strong>Ctrl+Alt+Learn</strong><small>A human-first AI academy</small></span>
      </div>
      <div className="course-label"><span>COURSE 01</span><strong>AI Chatbots: Intro 101</strong></div>
      <nav>
        {missions.map((mission) => (
          <div className={`mission-link ${mission.id === active ? "active" : ""}`} key={mission.id}>
            <span>{mission.state === "done" ? "✓" : String(mission.id).padStart(2, "0")}</span>
            <p>{mission.title}<small>{mission.state === "done" ? "Complete" : mission.id === active ? "Now playing" : "Up next"}</small></p>
          </div>
        ))}
      </nav>
      <div className="rail-progress">
        <span><b>Pilot progress</b><b>0/1</b></span>
        <i><b /></i>
        <small>One playable mission · seven in production</small>
      </div>
    </aside>
  );
}

export default function Home() {
  const [mode, setMode] = useState<AppMode>("loading");
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [stage, setStage] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [redactions, setRedactions] = useState<string[]>([]);
  const [learnerName, setLearnerName] = useState("");
  const [certificateId, setCertificateId] = useState("");

  const score = Math.max(80, 100 - mistakes * 5);

  useEffect(() => {
    const savedProfile = window.localStorage.getItem("cal-learner-profile-v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as LearnerProfile;
        setProfile(parsed);
        setLearnerName(parsed.name);
        setMode("learner");
      } catch {
        window.localStorage.removeItem("cal-learner-profile-v1");
        setMode("onboarding");
      }
    } else {
      setMode("onboarding");
    }

    const saved = window.localStorage.getItem("ctrl-alt-learn-progress");
    if (!saved) return;
    try {
      const progress = JSON.parse(saved) as { completed?: boolean; name?: string; certificateId?: string };
      if (progress.name) setLearnerName(progress.name);
      if (progress.certificateId) setCertificateId(progress.certificateId);
    } catch {
      window.localStorage.removeItem("ctrl-alt-learn-progress");
    }
  }, []);

  const mastery = useMemo(
    () => [
      { name: "Safety", value: stage > 0 ? 84 : 72, color: "teal" },
      { name: "Judgment", value: stage > 1 ? 76 : 61, color: "yellow" },
      { name: "Verification", value: stage > 2 ? 78 : 52, color: "blue" },
      { name: "Prompt craft", value: stage > 2 ? 73 : 46, color: "purple" },
    ],
    [stage],
  );

  function answer(choice: Choice) {
    setSelected(choice.id);
    setFeedback({ correct: choice.correct, text: choice.coach });
    if (!choice.correct) setMistakes((count) => count + 1);
  }

  function nextStage() {
    if (!feedback?.correct) return;
    if (stage === 3) {
      const id = certificateId || `CAL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setCertificateId(id);
      window.localStorage.setItem(
        "ctrl-alt-learn-progress",
        JSON.stringify({ completed: true, name: learnerName, certificateId: id }),
      );
      if (profile) {
        void fetch("/api/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...profile, score, certificateId: id }),
        });
      }
      setView("results");
      return;
    }
    setStage((value) => value + 1);
    setSelected(null);
    setFeedback(null);
  }

  function submitRedactions() {
    const expected = dataItems.filter((item) => item.sensitive).map((item) => item.id).sort();
    const actual = [...redactions].sort();
    const correct = expected.length === actual.length && expected.every((id, index) => id === actual[index]);
    setFeedback({
      correct,
      text: correct
        ? "Clean handoff. You removed direct identifiers while keeping the operational facts needed for the task."
        : "Not quite. Remove direct personal details and unique booking identifiers, but keep the operational facts needed for the summary.",
    });
    if (!correct) setMistakes((count) => count + 1);
  }

  function resetCourse() {
    setView("dashboard");
    setStage(0);
    setMistakes(0);
    setSelected(null);
    setFeedback(null);
    setRedactions([]);
  }

  function completeOnboarding(nextProfile: LearnerProfile) {
    window.localStorage.setItem("cal-learner-profile-v1", JSON.stringify(nextProfile));
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

  return (
    <main className="app-shell">
      <MissionRail />
      <section className="workspace">
        <header className="topbar">
          <div><span className="edition-chip">AVIATION OPERATIONS EDITION</span><span className="status-chip"><i /> Progress connected</span></div>
          <div className="learner-controls"><button className="topbar-admin" type="button" onClick={() => setMode("admin")}>Admin</button><button className="topbar-switch" type="button" onClick={() => { window.localStorage.removeItem("cal-learner-profile-v1"); setProfile(null); setMode("onboarding"); }}>Switch learner</button><div className="profile"><span>{initials}</span><p><strong>{profile?.name}</strong><small>{profile?.role || "Learner"} · {profile?.skillLevel}</small></p></div></div>
        </header>

        {view === "dashboard" && (
          <div className="dashboard page-enter">
            <div className="episode-kicker"><span>EPISODE 01</span><i /> DATA SAFETY PILOT</div>
            <div className="dashboard-heading">
              <div><h1>The Data Safety<br />Checkpoint</h1><p>Help the crew use AI without sending sensitive information somewhere it does not belong.</p></div>
              <div className="time-card"><small>ESTIMATED TIME</small><strong>6 min</strong><span>Interactive scenario</span></div>
            </div>
            <div className="dashboard-grid">
              <div>
                <OfficeScene stage={0} />
                <div className="mission-brief comic-box">
                  <div><span className="caption-label">TODAY’S CALL</span><h2>Can a chatbot see this incident report?</h2><p>Choose a safe tool, remove unnecessary data, build a useful prompt, and verify the result.</p></div>
                  <button className="primary-button" type="button" onClick={() => setView("mission")}>Start mission <span>→</span></button>
                </div>
              </div>
              <aside className="mastery-panel comic-box">
                <div className="panel-title"><div><span>MASTERY RADAR</span><h2>Skills that update as you play</h2></div><b>LIVE</b></div>
                {mastery.map((item) => (
                  <div className="mastery-row" key={item.name}>
                    <span><b>{item.name}</b><b>{item.value}%</b></span>
                    <i><b className={item.color} style={{ width: `${item.value}%` }} /></i>
                  </div>
                ))}
                <div className="desk-note"><span>DESK NOTE</span><strong>Pause → classify → minimize → verify.</strong><p>The safest prompt starts before you type.</p></div>
                <div className="certificate-teaser"><span>☆</span><p><strong>Certificate unlocked at the finish</strong><small>Complete the final coached challenge to export your record.</small></p></div>
              </aside>
            </div>
          </div>
        )}

        {view === "mission" && (
          <div className="lesson page-enter">
            <div className="lesson-progress" aria-label={`Mission step ${stage + 1} of 4`}>
              {stageLabels.map((label, index) => (
                <div className={index < stage ? "done" : index === stage ? "active" : ""} key={label}><span>{index < stage ? "✓" : index + 1}</span><b>{label}</b></div>
              ))}
            </div>
            <OfficeScene stage={stage} />
            <section className="challenge comic-box">
              <div className="challenge-heading">
                <span className="caption-label">CHALLENGE {stage + 1} OF 4</span>
                <h1>{[
                  "What should Maya do first?",
                  "Tap every detail that should be removed.",
                  "Choose the prompt that creates a safe, useful result.",
                  "What happens before this draft is shared?",
                ][stage]}</h1>
                <p>{[
                  "The report is internal and the public chatbot has not been approved for company data.",
                  "The task needs operational context—not a customer’s identity.",
                  "A strong prompt defines the task, audience, format, and limits.",
                  "The chatbot produced a clean three-bullet summary with a confident tone.",
                ][stage]}</p>
              </div>

              {stage === 0 && <ChoiceCards choices={firstChoices} selected={selected} onChoose={answer} />}
              {stage === 1 && (
                <div className="redaction-board">
                  <div className="report-header"><span>INCIDENT NOTE · INTERNAL</span><b>Select details to redact</b></div>
                  <div className="data-chips">
                    {dataItems.map((item) => {
                      const checked = redactions.includes(item.id);
                      return (
                        <button
                          aria-pressed={checked}
                          className={checked ? "redacted" : ""}
                          key={item.id}
                          onClick={() => {
                            setRedactions((values) => checked ? values.filter((id) => id !== item.id) : [...values, item.id]);
                            setFeedback(null);
                          }}
                          type="button"
                        >
                          <span>{item.text}</span><small>{checked ? "REDACTED" : item.tag}</small>
                        </button>
                      );
                    })}
                  </div>
                  <button className="secondary-button" type="button" onClick={submitRedactions}>Check my redactions</button>
                </div>
              )}
              {stage === 2 && <ChoiceCards choices={promptChoices} selected={selected} onChoose={answer} />}
              {stage === 3 && <ChoiceCards choices={verifyChoices} selected={selected} onChoose={answer} />}

              {feedback && (
                <div className={`feedback ${feedback.correct ? "correct" : "coach"}`} role="status">
                  <span>{feedback.correct ? "✓" : "!"}</span>
                  <p><strong>{feedback.correct ? "Cleared for the next step" : "Coaching moment"}</strong>{feedback.text}</p>
                  {feedback.correct && <button type="button" onClick={nextStage}>{stage === 3 ? "See my results" : "Next scene"} →</button>}
                </div>
              )}
            </section>
          </div>
        )}

        {view === "results" && (
          <div className="results page-enter">
            <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
            <span className="episode-kicker">MISSION COMPLETE</span>
            <h1>Nice call, crew member.</h1>
            <p>You protected the data, repaired the prompt, and kept a qualified person in control of the final decision.</p>
            <div className="result-grid">
              <section className="score-card comic-box">
                <span className="score-ring"><b>{score}</b><small>mastery</small></span>
                <div><span>YOUR RESULT</span><h2>Data Safety: Cleared</h2><p>{mistakes === 0 ? "Perfect first-pass judgment." : `${mistakes} coaching ${mistakes === 1 ? "moment" : "moments"} turned into safer choices.`}</p></div>
              </section>
              <section className="takeaway-card comic-box"><span>KEEP THIS RULE</span><h2>Pause. Classify. Minimize. Verify.</h2><p>Use only approved tools, share only the data needed, and review important outputs against a trusted source.</p></section>
            </div>
            <section className="certificate-form comic-box">
              <div><span className="caption-label">COMPLETION RECORD</span><h2>Make the certificate yours</h2><p>Enter the learner name exactly as it should appear on the printable certificate.</p></div>
              <label><span>Learner name</span><input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="Enter full name" /></label>
              <button className="primary-button" disabled={!learnerName.trim()} type="button" onClick={() => {
                window.localStorage.setItem("ctrl-alt-learn-progress", JSON.stringify({ completed: true, name: learnerName, certificateId }));
                window.print();
              }}>Export certificate <span>↗</span></button>
            </section>
            <div className="result-actions"><button className="text-button" type="button" onClick={resetCourse}>Replay this mission</button><button className="secondary-button" type="button" onClick={() => setView("dashboard")}>Return to course map</button></div>
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
          <h2>AI Chatbots: Intro 101 — Pilot Mission</h2>
          <h3>Data Safety Checkpoint · Aviation Operations Edition</h3>
          <div className="certificate-meta"><span><small>COMPLETED</small>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())}</span><span><small>MASTERY</small>{score}%</span><span><small>CERTIFICATE ID</small>{certificateId}</span></div>
          <div className="certificate-rule">Pause · Classify · Minimize · Verify</div>
        </div>
      </section>
    </main>
  );
}
