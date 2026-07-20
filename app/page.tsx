"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminPortal } from "./AdminPortal";
import { LearnerProfile, Onboarding } from "./Onboarding";

type View = "dashboard" | "academy" | "lab" | "story" | "mission" | "results";
type AppMode = "loading" | "onboarding" | "learner" | "admin";

type Choice = {
  id: string;
  label: string;
  detail: string;
  correct: boolean;
  coach: string;
};

const missions = [
  { id: 1, title: "The AOG Data Checkpoint", state: "current" },
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
    label: "Paste the entire RFQ and quotes",
    detail: "The chatbot can compare them fastest if it sees everything.",
    correct: false,
    coach:
      "Fast is not automatically safe. The RFQ and quotes contain customer, supplier, pricing, and internal information, and the tool has not been approved.",
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
  { id: "name", text: "Customer: Northstar Aviation", sensitive: true, tag: "Customer" },
  { id: "booking", text: "RFQ ref: DASI-84729", sensitive: true, tag: "Identifier" },
  { id: "route", text: "Logistics lane: MIA → DFW", sensitive: false, tag: "Logistics" },
  {
    id: "reason",
    text: "Part needed: fuel control unit",
    sensitive: false,
    tag: "Operational",
  },
  { id: "phone", text: "Buyer mobile: (305) 555-0142", sensitive: true, tag: "Personal" },
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
    label: "Create a customer-safe sourcing update",
    detail:
      "Use the redacted note. Return three bullets, separate facts from assumptions, and flag missing information.",
    correct: true,
    coach:
      "Strong prompt. It defines the audience, format, source boundary, and uncertainty check without exposing unnecessary data.",
  },
  {
    id: "creative",
    label: "Make the sourcing update sound confirmed",
    detail: "Fill in missing availability and lead-time details so the message feels complete.",
    correct: false,
    coach:
      "AI should not invent stock, trace, price, or lead-time details. Accuracy and appropriate review matter more than polish.",
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
      "Confirm every claim against the approved source material, then use the normal DASI review process.",
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

const stageDetails = [
  { eyebrow: "TOOL CHECK", reward: "+25 XP", consequence: "The AOG request stays inside DASI-approved systems." },
  { eyebrow: "DATA SHIELD", reward: "+25 XP", consequence: "Maya keeps the useful sourcing facts without exposing a customer." },
  { eyebrow: "PROMPT POWER", reward: "+25 XP", consequence: "The chatbot gets a clear job—and no permission to invent." },
  { eyebrow: "HUMAN CONTROL", reward: "+25 XP", consequence: "A qualified reviewer stays accountable for what leaves the desk." },
];

type AcademySlide = {
  icon: string; chapter: string; label: string; title: string; copy: string; callout: string; tone: string;
  choices?: { id: string; label: string; correct: boolean; coach: string }[];
};

const academySlides: AcademySlide[] = [
  { icon: "✦", chapter: "FOUNDATIONS", label: "AI IN PLAIN ENGLISH", title: "A prediction engine, not a teammate with judgment.", copy: "Generative AI produces new text, images, or code by predicting patterns from its training and the context you provide. It can imitate expertise without possessing experience, intent, or accountability.", callout: "Fluent is not the same as factual.", tone: "blue" },
  { icon: "▤", chapter: "FOUNDATIONS", label: "CONTEXT WINDOW", title: "It only sees the world you give it.", copy: "A chatbot uses your prompt, the conversation, and any connected material as context. Missing context produces guesses; excessive context can expose data or bury the important instruction.", callout: "Relevant context beats maximum context.", tone: "purple" },
  { icon: "⚡", chapter: "USE", label: "GREEN-LIGHT WORK", title: "Give it reversible, reviewable work.", copy: "Good starting uses include brainstorming, restructuring approved text, drafting low-risk messages, explaining concepts, and formatting information. The safer pattern is easy to review and easy to undo.", callout: "Draft faster. Decide like a human.", tone: "teal" },
  { icon: "?", chapter: "CHECKPOINT", label: "YOU MAKE THE CALL", title: "Which task is the best AI starting point?", copy: "Choose the task with low impact, approved information, and a result a person can quickly review.", callout: "Risk rises with impact, sensitive data, and difficult verification.", tone: "yellow", choices: [
    { id: "draft", label: "Draft a meeting agenda from approved bullet points", correct: true, coach: "Exactly. It is low impact, uses approved inputs, and is easy to review." },
    { id: "approve", label: "Approve an airworthiness document without technical review", correct: false, coach: "That requires qualified human review and cannot be delegated to a chatbot." },
    { id: "rank", label: "Rank suppliers using confidential pricing in a public tool", correct: false, coach: "The data, decision impact, and unapproved tool make this unsafe." },
  ] },
  { icon: "!", chapter: "RISK", label: "CONFABULATION", title: "A polished answer can be invented.", copy: "Generative AI can fabricate citations, part details, calculations, or explanations. It may also omit a condition that changes the answer. NIST calls this risk confabulation; many people call it hallucination.", callout: "Treat output as a draft until evidence earns trust.", tone: "coral" },
  { icon: "⌁", chapter: "RISK", label: "THE DATA GATE", title: "Pause before you paste.", copy: "Customer details, supplier pricing, RFQs, trace documents, contracts, export-controlled information, personal data, and internal records belong only in specifically approved tools and workflows.", callout: "Approved tool. Minimum data. Clear purpose.", tone: "yellow" },
  { icon: "✎", chapter: "PRACTICE", label: "PROMPT BLUEPRINT", title: "Brief the tool like a new contractor.", copy: "State the goal, audience, relevant context, constraints, output format, and what to do when information is missing. Never ask it to hide uncertainty or manufacture completeness.", callout: "Goal + context + limits + format + checks.", tone: "blue" },
  { icon: "✓", chapter: "CHECKPOINT", label: "FINAL PREFLIGHT", title: "A chatbot returns a confident lead time. What now?", copy: "Choose the action that makes trust proportional to the business and safety impact.", callout: "Pause → classify → minimize → verify.", tone: "purple", choices: [
    { id: "source", label: "Verify it against the supplier response and DASI workflow", correct: true, coach: "Cleared. Independent evidence and the responsible workflow come before use." },
    { id: "ask", label: "Ask the same chatbot if it is sure", correct: false, coach: "A self-check may help revise a draft, but it is not independent evidence." },
    { id: "send", label: "Send it because the wording sounds precise", correct: false, coach: "Precision of tone does not prove accuracy." },
  ] },
];

function AcademyBriefing({ step, answer, onAnswer }: { step: number; answer: string | null; onAnswer: (id: string) => void }) {
  const slide = academySlides[step];
  return <section className={`academy-card academy-${slide.tone}`}>
    <div className="academy-visual" aria-hidden="true"><span>{slide.icon}</span><div className="ai-terminal"><b>AI COPILOT</b><i /><i /><i /><em>{step === 0 ? "predicts patterns" : step === 1 ? "creates a draft" : step === 2 ? "may sound certain" : step === 3 ? "waits at the gate" : "needs your review"}</em></div><div className="human-badge">HUMAN<br />IN CONTROL</div></div>
    <div className="academy-copy"><span>{slide.chapter} · {slide.label}</span><h2>{slide.title}</h2><p>{slide.copy}</p>{slide.choices ? <div className="academy-choices">{slide.choices.map((choice) => <button aria-pressed={answer === choice.id} className={answer === choice.id ? (choice.correct ? "correct" : "incorrect") : ""} key={choice.id} onClick={() => onAnswer(choice.id)} type="button"><b>{choice.label}</b>{answer === choice.id && <small>{choice.coach}</small>}</button>)}</div> : <blockquote>{slide.callout}</blockquote>}</div>
  </section>;
}

type BotMode = "unknown" | "live" | "simulated";
type BotMessage = { role: "bot" | "user"; text: string; kind?: "safe" | "coach" | "blocked" | "pending"; mode?: BotMode };
const starterBotMessage: BotMessage = { role: "bot", mode: "unknown", text: "I’m the DASI Practice Bot. Give me a fictional, low-risk task and tell me the format you want. If the live AI lab is configured, I’ll coach you with a real model; otherwise I’ll use simulator mode." };

function inspectPracticePrompt(prompt: string) {
  const normalized = prompt.toLowerCase();
  const sensitive = /northstar|dasi-\d|\(305\)|supplier pricing|buyer mobile|confidential|export.controlled|\$\d/.test(normalized);
  const hasGoal = /draft|create|write|summarize|compare|explain/.test(normalized);
  const hasFormat = /bullet|table|email|list|three|3 |format/.test(normalized);
  const hasCheck = /missing|uncertain|assumption|do not invent|only use|flag/.test(normalized);
  const checks = { hasGoal, hasFormat, hasCheck };
  if (sensitive) return { kind: "blocked" as const, text: "Data gate triggered. This looks like customer, quote, pricing, contact, or controlled information. Do not use real DASI data in this practice bot. Replace it with fictional placeholders and include only what the task needs.", checks };
  if (!hasGoal) return { kind: "coach" as const, text: "I need a job to do. Start with an action such as ‘Draft,’ ‘Summarize,’ or ‘Create,’ then name the audience and purpose.", checks };
  if (!hasFormat || !hasCheck) return { kind: "coach" as const, text: `Good start. Add ${!hasFormat ? "a requested format" : "a rule for missing information and uncertainty"}. A useful prompt tells me what success looks like instead of making me guess.`, checks };
  return { kind: "safe" as const, text: "FICTIONAL PRACTICE DRAFT\n• Part requirement: fuel control unit; availability is not yet verified.\n• Logistics concept: use the approved lane after confirmation.\n• Open items: supplier stock, trace, price, and lead time require source verification.\n\nHuman check: compare every claim with approved source records before use.", checks };
}

const storyBeats = [
  {
    speaker: "JORDAN",
    role: "AI ENABLEMENT LEAD",
    line: "Morning, Maya. Why does the AOG desk look like it has already lived three Tuesdays?",
    direction: "Jordan arrives with coffee. Maya has an urgent customer RFQ open beside a public chatbot.",
    lesson: "The pressure is realistic: a useful task, a short deadline, and an easy-looking shortcut.",
    mood: "arrival",
  },
  {
    speaker: "MAYA",
    role: "AOG SOURCING COORDINATOR",
    line: "A customer needs a fuel control unit. I have three supplier responses and need a clean sourcing update before the 10 a.m. handoff.",
    direction: "Maya points to the RFQ. Customer details, direct contacts, quote references, and supplier pricing are visible.",
    lesson: "AI may be appropriate for drafting, but the source material changes the risk.",
    mood: "pressure",
  },
  {
    speaker: "JORDAN",
    role: "AI ENABLEMENT LEAD",
    line: "A summary sounds useful. Is that chatbot approved for customer RFQs and supplier quotes?",
    direction: "The cursor stops above the upload button.",
    lesson: "Start with tool approval and data classification—not with prompt wording.",
    mood: "pause",
  },
  {
    speaker: "MAYA",
    role: "AOG SOURCING COORDINATOR",
    line: "Good catch. I was focused on speed. Help me keep what the summary needs and remove what it doesn’t.",
    direction: "Maya moves the RFQ away from the upload area and opens the approved workflow guide.",
    lesson: "Good AI use is not 'use it' or 'ban it.' It is choosing a safe workflow for the task.",
    mood: "resolve",
  },
];

function StoryScene({ beat }: { beat: number }) {
  const current = storyBeats[beat];
  return (
    <section className={`story-stage story-${current.mood}`} aria-labelledby="story-dialogue">
      <div className="story-slate"><span>DASI LEARNING STUDIOS</span><b>EP. 01 · THE AOG DATA CHECKPOINT</b><em>SCENE {beat + 1} / {storyBeats.length}</em></div>
      <div className="story-set" aria-hidden="true">
        <div className="story-window"><i /><i /><i /></div><div className="story-status"><b>AOG REQUEST</b><span>HANDOFF · 10:00</span><em>18 MIN LEFT</em></div>
        <div className="story-actor maya"><i /><b /></div><div className="story-actor jordan"><i /><b /></div><div className="story-console"><span>SUPPLIER RESPONSES</span><i /><i /><i /></div>
      </div>
      <div className="story-dialogue" id="story-dialogue">
        <span>{current.speaker} · {current.role}</span><blockquote>“{current.line}”</blockquote><small>STAGE DIRECTION · {current.direction}</small>
      </div>
      <aside className="director-note"><span>DIRECTOR’S NOTE</span><p>{current.lesson}</p></aside>
    </section>
  );
}

function OfficeScene({ stage, cleared = false }: { stage: number; cleared?: boolean }) {
  const bubble = [
    "The chatbot could compare these supplier responses in seconds. Can I paste the whole AOG request?",
    "Which details should leave the prompt before it goes anywhere?",
    "The data is clean. Now, how do we ask for a useful result?",
    "The draft looks polished. Are we cleared to send it?",
  ][stage];

  return (
    <div className={`scene ${cleared ? "scene-cleared" : ""}`} role="img" aria-label="Maya and Jordan at the DASI aviation parts sourcing desk">
      <div className="scene-header">
        <span><i className="record-dot" /> AOG SOURCING DESK · SCENE {String(stage + 1).padStart(2, "0")}</span>
        <span>PARTS & LOGISTICS · TUESDAY, 9:42 AM</span>
      </div>
      <div className="scene-grid" aria-hidden="true" />
      <div className="speech-bubble">
        <span>MAYA · AOG SOURCING COORDINATOR</span>
        <strong>“{bubble}”</strong>
      </div>
      <div className="ops-board" aria-hidden="true">
        <b>AOG BOARD</b>
        <span>RFQ 827 · ACTUATOR <em>SOURCING</em></span>
        <span>RFQ 844 · FCU <em className="delay">URGENT</em></span>
        <span>RFQ 851 · SENSOR <em>QUOTED</em></span>
      </div>
      <div className="cast" aria-hidden="true">
        <div className="person person-one"><i /><b /><span>MAYA</span></div>
        <div className="person person-two"><i /><b /><span>JORDAN</span></div>
      </div>
      <div className="desk" aria-hidden="true">
        <div className="monitor"><i /><i /><i /></div>
        <div className="mug" />
      </div>
      <div className="scene-caption">Your move: protect the relationship without slowing the sourcing work.</div>
      {cleared && <div className="scene-stamp" aria-hidden="true">SMART CALL! ✓</div>}
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
  const [storyBeat, setStoryBeat] = useState(0);
  const [academyStep, setAcademyStep] = useState(0);
  const [academyAnswer, setAcademyAnswer] = useState<string | null>(null);
  const [botInput, setBotInput] = useState("");
  const [botMessages, setBotMessages] = useState<BotMessage[]>([starterBotMessage]);
  const [labCleared, setLabCleared] = useState(false);
  const [botBusy, setBotBusy] = useState(false);
  const [botMode, setBotMode] = useState<BotMode>("unknown");
  const [promptChecks, setPromptChecks] = useState({ hasGoal: false, hasFormat: false, hasCheck: false });
  const [stage, setStage] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [stageMistakes, setStageMistakes] = useState([0, 0, 0, 0]);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [redactions, setRedactions] = useState<string[]>([]);
  const [learnerName, setLearnerName] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "local">("idle");

  const score = Math.max(80, 100 - mistakes * 5);
  const xp = stage * 25 + (view === "results" ? 25 : 0);

  useEffect(() => {
    const savedProfile = window.localStorage.getItem("cal-learner-profile-v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as LearnerProfile;
        // Browser-owned progress is intentionally synchronized after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const mastery = useMemo(() => {
    const completedThrough = view === "results" ? 4 : stage + (feedback?.correct ? 1 : 0);
    const measured = (minimum: number) => completedThrough >= minimum;
    const value = (...steps: number[]) => Math.max(70, 100 - steps.reduce((total, index) => total + stageMistakes[index] * 10, 0));
    return [
      { name: "Safety", value: measured(2) ? value(0, 1) : null, color: "teal", evidence: "Tool + data choices" },
      { name: "Judgment", value: measured(1) ? value(0) : null, color: "yellow", evidence: "Workflow decision" },
      { name: "Prompt craft", value: measured(3) ? value(2) : null, color: "purple", evidence: "Prompt repair" },
      { name: "Verification", value: measured(4) ? value(3) : null, color: "blue", evidence: "Source check" },
    ];
  }, [feedback?.correct, stage, stageMistakes, view]);

  function answer(choice: Choice) {
    setSelected(choice.id);
    setFeedback({ correct: choice.correct, text: choice.coach });
    if (!choice.correct && selected !== choice.id) {
      setMistakes((count) => count + 1);
      setStageMistakes((values) => values.map((count, index) => index === stage ? count + 1 : count));
    }
  }

  async function sendPracticePrompt() {
    const prompt = botInput.trim();
    if (!prompt || botBusy) return;
    setBotBusy(true);
    setBotInput("");
    setBotMessages((messages) => [...messages, { role: "user", text: prompt }, { role: "bot", text: "Thinking through the safety gates…", kind: "pending", mode: botMode }]);
    try {
      const response = await fetch("/api/practice-bot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const result = (await response.json()) as { kind?: "safe" | "coach" | "blocked"; mode?: BotMode; text?: string; checks?: { hasGoal: boolean; hasFormat: boolean; hasCheck: boolean }; error?: string };
      const fallback = !response.ok || !result.text ? { ...inspectPracticePrompt(prompt), mode: "simulated" as BotMode } : null;
      const reply = fallback ?? { kind: result.kind ?? "coach", mode: result.mode ?? "simulated", text: result.text ?? "The practice bot did not return a response.", checks: result.checks ?? inspectPracticePrompt(prompt).checks };
      setBotMode(reply.mode);
      setPromptChecks(reply.checks);
      if (reply.kind === "safe") setLabCleared(true);
      setBotMessages((messages) => [...messages.slice(0, -1), { role: "bot", text: response.ok ? reply.text : result.error ?? reply.text, kind: reply.kind, mode: reply.mode }]);
    } catch {
      const result = inspectPracticePrompt(prompt);
      setBotMode("simulated");
      setPromptChecks(result.checks);
      if (result.kind === "safe") setLabCleared(true);
      setBotMessages((messages) => [...messages.slice(0, -1), { role: "bot", text: "Network hiccup—using simulator mode.\n\n" + result.text, kind: result.kind, mode: "simulated" }]);
    } finally {
      setBotBusy(false);
    }
  }

  async function nextStage() {
    if (!feedback?.correct) return;
    if (stage === 3) {
      const id = certificateId || `CAL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setCertificateId(id);
      window.localStorage.setItem(
        "ctrl-alt-learn-progress",
        JSON.stringify({ completed: true, name: learnerName, certificateId: id }),
      );
      if (profile) {
        setSaveStatus("saving");
        try {
          const response = await fetch("/api/completions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...profile, score, certificateId: id }) });
          if (!response.ok) throw new Error("Completion could not be recorded");
          const result = (await response.json()) as { durable?: boolean };
          setSaveStatus(result.durable ? "saved" : "local");
        } catch { setSaveStatus("local"); }
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
        ? "Clean handoff. You removed customer and direct identifiers while keeping the sourcing and logistics facts needed for the task."
        : "Not quite. Remove the customer, buyer contact, and unique RFQ reference, but keep the part need and logistics facts required for the update.",
    });
    if (!correct) {
      setMistakes((count) => count + 1);
      setStageMistakes((values) => values.map((count, index) => index === 1 ? count + 1 : count));
    }
  }

  function resetCourse() {
    setView("dashboard");
    setStage(0);
    setMistakes(0);
    setStageMistakes([0, 0, 0, 0]);
    setSelected(null);
    setFeedback(null);
    setRedactions([]);
    setStoryBeat(0);
    setAcademyStep(0);
    setAcademyAnswer(null);
    setBotInput("");
    setBotMessages([starterBotMessage]);
    setLabCleared(false);
    setBotBusy(false);
    setBotMode("unknown");
    setPromptChecks({ hasGoal: false, hasFormat: false, hasCheck: false });
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
          <div><span className="edition-chip">DASI · AVIATION PARTS & LOGISTICS</span><span className="status-chip"><i /> Progress connected</span></div>
          <div className="learner-controls"><button className="topbar-admin" type="button" onClick={() => setMode("admin")}>Admin</button><button className="topbar-switch" type="button" onClick={() => { window.localStorage.removeItem("cal-learner-profile-v1"); setProfile(null); setMode("onboarding"); }}>Switch learner</button><div className="profile"><span>{initials}</span><p><strong>{profile?.name}</strong><small>{profile?.role || "Learner"} · {profile?.skillLevel}</small></p></div></div>
        </header>

        {view === "dashboard" && (
          <div className="dashboard page-enter">
            <div className="episode-kicker"><span>EPISODE 01</span><i /> DASI AI SAFETY PILOT</div>
            <div className="dashboard-heading">
              <div><h1>The AOG Data<br />Checkpoint</h1><p>Help the DASI team use AI without exposing customer, supplier, pricing, or sourcing information.</p></div>
              <div className="time-card"><small>ESTIMATED TIME</small><strong>18 min</strong><span>Briefing + scenario</span></div>
            </div>
            <div className="dashboard-grid">
              <div>
                <OfficeScene stage={0} />
                <div className="mission-brief comic-box">
                  <div><span className="caption-label">TODAY’S CALL</span><h2>Can a chatbot see this urgent sourcing request?</h2><p>Take a fast AI preflight, watch the AOG desk scene, then choose a safe tool, minimize data, build a useful prompt, and verify the result.</p></div>
                  <button className="primary-button" type="button" onClick={() => { setAcademyStep(0); setAcademyAnswer(null); setView("academy"); }}>Begin training <span>▶</span></button>
                </div>
                <div className="mission-objectives" aria-label="Mission objectives">
                  <article><span>01</span><p><strong>Protect the relationship</strong><small>Spot customer and supplier details that do not belong in a prompt.</small></p></article>
                  <article><span>02</span><p><strong>Coach the chatbot</strong><small>Turn a vague request into a useful instruction.</small></p></article>
                  <article><span>03</span><p><strong>Keep a human accountable</strong><small>Verify before a polished sourcing update leaves the desk.</small></p></article>
                </div>
              </div>
              <aside className="mastery-panel comic-box">
                <div className="panel-title"><div><span>EPISODE SKILL CHECK</span><h2>Evidence from your choices</h2></div><b>SESSION</b></div>
                {mastery.map((item) => (
                  <div className={`mastery-row ${item.value === null ? "pending" : ""}`} key={item.name}>
                    <span><b>{item.name}</b><b>{item.value === null ? "—" : `${item.value}%`}</b></span>
                    <i><b className={item.color} style={{ width: `${item.value ?? 0}%` }} /></i>
                    <small>{item.value === null ? "Not assessed yet" : item.evidence}</small>
                  </div>
                ))}
                <div className="mastery-explainer"><b>How this works</b><p>Each skill unlocks only after its related decision. Coaching attempts affect the session score; unplayed skills stay blank.</p></div>
                <div className="desk-note"><span>DESK NOTE</span><strong>Pause → classify → minimize → verify.</strong><p>These are episode results—not a permanent rating of you.</p></div>
                <div className="certificate-teaser"><span>☆</span><p><strong>Certificate unlocked at the finish</strong><small>Complete the final coached challenge to export your record.</small></p></div>
              </aside>
            </div>
          </div>
        )}

        {view === "academy" && (
          <div className="academy-player page-enter">
            <header className="academy-header"><div><span className="episode-kicker"><span>AI PREFLIGHT</span><i /> LEARN + PRACTICE</span><h1>First, build your AI instincts.</h1><p>Eight short cards based on recognized AI risk-management and literacy guidance—translated into DASI work.</p></div><div className="academy-count"><strong>{String(academyStep + 1).padStart(2, "0")}</strong><span>/ {String(academySlides.length).padStart(2, "0")}</span></div></header>
            <div className="academy-progress" style={{ gridTemplateColumns: `repeat(${academySlides.length}, 1fr)` }} aria-label={`AI preflight card ${academyStep + 1} of ${academySlides.length}`}>{academySlides.map((slide, index) => <i className={index <= academyStep ? "active" : ""} key={slide.label} />)}</div>
            <AcademyBriefing step={academyStep} answer={academyAnswer} onAnswer={setAcademyAnswer} />
            <div className="academy-controls"><button className="back-button" disabled={academyStep === 0} type="button" onClick={() => { setAcademyAnswer(null); setAcademyStep((value) => Math.max(0, value - 1)); }}>← Back</button><span>{academySlides[academyStep].chapter} · Card {academyStep + 1} of {academySlides.length}</span>{academyStep < academySlides.length - 1 ? <button className="primary-button compact" disabled={Boolean(academySlides[academyStep].choices) && !academySlides[academyStep].choices?.find((choice) => choice.id === academyAnswer)?.correct} type="button" onClick={() => { setAcademyAnswer(null); setAcademyStep((value) => value + 1); }}>{academySlides[academyStep].choices ? "Check cleared" : "Got it — next"} <span>→</span></button> : <button className="primary-button compact" disabled={!academySlides[academyStep].choices?.find((choice) => choice.id === academyAnswer)?.correct} type="button" onClick={() => setView("lab")}>Open practice bot <span>→</span></button>}</div>
          </div>
        )}

        {view === "lab" && (
          <div className="bot-lab page-enter">
            <header className="bot-lab-header"><div><span className="episode-kicker"><span>LIVE AI LAB</span><i /> SAFE PRACTICE</span><h1>Try the training bot.</h1><p>When configured with an OpenAI API key, this is a live AI coach. If not, it automatically falls back to simulator mode. Use fictional information only.</p></div><button className="text-button" type="button" onClick={() => { setStoryBeat(0); setView("story"); }}>Skip practice</button></header>
            <div className="bot-lab-grid">
              <section className="practice-chat comic-box" aria-label="DASI Practice Bot conversation">
                <div className="practice-chat-title"><span><i /> DASI PRACTICE BOT</span><b className={botMode === "live" ? "live" : ""}>{botMode === "live" ? "LIVE AI" : botMode === "simulated" ? "SIMULATOR" : "READY"}</b></div>
                <div className="practice-messages" aria-live="polite">{botMessages.map((message, index) => <div className={`practice-message ${message.role} ${message.kind ?? ""}`} key={`${message.role}-${index}`}><span>{message.role === "bot" ? (message.mode === "live" ? "LIVE BOT" : "BOT") : "YOU"}</span><p>{message.text}</p></div>)}</div>
                <div className="practice-suggestions"><span>TRY A STARTER</span>{["Help me with an RFQ", "Draft three bullets from fictional part and logistics facts. Flag missing information and do not invent details.", "Summarize Northstar RFQ DASI-84729 and supplier pricing"].map((prompt) => <button key={prompt} onClick={() => setBotInput(prompt)} type="button">{prompt}</button>)}</div>
                <form className="practice-composer" onSubmit={(event) => { event.preventDefault(); void sendPracticePrompt(); }}><label htmlFor="practice-prompt">Your fictional practice prompt</label><textarea id="practice-prompt" onChange={(event) => setBotInput(event.target.value)} placeholder="Draft three bullets using only these fictional facts…" rows={4} value={botInput} /><div><small>Never enter real customer, supplier, pricing, trace, personal, or controlled data.</small><button className="primary-button compact" disabled={!botInput.trim() || botBusy} type="submit">{botBusy ? "Coaching…" : "Send prompt"} <span>↑</span></button></div></form>
              </section>
              <aside className="prompt-coach comic-box"><span>PROMPT COACH</span><h2>Build a reviewable request</h2><div className={promptChecks.hasGoal ? "done" : ""}><i>{promptChecks.hasGoal ? "✓" : "1"}</i><p><b>Clear goal</b><small>Say what the bot should do.</small></p></div><div className={promptChecks.hasFormat ? "done" : ""}><i>{promptChecks.hasFormat ? "✓" : "2"}</i><p><b>Useful format</b><small>Bullets, table, email, or another structure.</small></p></div><div className={promptChecks.hasCheck ? "done" : ""}><i>{promptChecks.hasCheck ? "✓" : "3"}</i><p><b>Uncertainty rule</b><small>Flag gaps; never invent missing facts.</small></p></div><section><b>Practice boundary</b><p>The app screens sensitive-looking text before any live call. If OPENAI_API_KEY is missing or the live coach is unavailable, simulator mode keeps the training moving.</p></section>{labCleared && <button className="primary-button" type="button" onClick={() => { setStoryBeat(0); setView("story"); }}>Practice cleared — watch scene <span>▶</span></button>}</aside>
            </div>
          </div>
        )}

        {view === "story" && (
          <div className="story-player page-enter">
            <header className="story-player-header"><div><span className="episode-kicker"><span>DASI AOG DESK</span><i /> WATCH THE SCENE</span><h1>Now see it at work.</h1><p>Meet the sourcing crew, see the pressure they are under, and notice where the AI risk begins.</p></div><button className="text-button" type="button" onClick={() => setView("mission")}>Skip to decision</button></header>
            <div className="story-timeline" aria-label={`Scene ${storyBeat + 1} of ${storyBeats.length}`}>{storyBeats.map((_, index) => <i className={index <= storyBeat ? "active" : ""} key={index}><span /></i>)}</div>
            <StoryScene beat={storyBeat} />
            <div className="story-controls">
              <button className="back-button" disabled={storyBeat === 0} type="button" onClick={() => setStoryBeat((value) => Math.max(0, value - 1))}>← Previous line</button>
              <span><kbd>Tip</kbd> Read it like a scene. The details become your evidence.</span>
              {storyBeat < storyBeats.length - 1
                ? <button className="primary-button compact" type="button" onClick={() => setStoryBeat((value) => value + 1)}>Continue scene <span>→</span></button>
                : <button className="primary-button compact" type="button" onClick={() => setView("mission")}>Make the call <span>→</span></button>}
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
            <div className="mission-hud"><span><b>CREW XP</b><strong>{xp}/100</strong></span><i><b style={{ width: `${xp}%` }} /></i><em>{stageDetails[stage].reward} ready</em></div>
            <div className="live-skill-strip" aria-label="Live episode skill evidence">{mastery.map((item) => <span className={item.value === null ? "pending" : "measured"} key={item.name}><b>{item.name}</b><em>{item.value === null ? "Waiting" : `${item.value}%`}</em></span>)}</div>
            <OfficeScene stage={stage} cleared={Boolean(feedback?.correct)} />
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
                  "The RFQ and supplier responses are internal, and the public chatbot is not approved for DASI data.",
                  "The task needs sourcing and logistics context—not the customer’s identity.",
                  "A strong prompt defines the task, audience, format, and limits.",
                  "The chatbot produced a clean three-bullet summary with a confident tone.",
                ][stage]}</p>
              </div>

              {stage === 0 && <ChoiceCards choices={firstChoices} selected={selected} onChoose={answer} />}
              {stage === 1 && (
                <div className="redaction-board">
                  <div className="report-header"><span>AOG SOURCING BRIEF · INTERNAL</span><b>Select details to redact</b></div>
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
                  {feedback.correct && <button type="button" disabled={saveStatus === "saving"} onClick={() => void nextStage()}>{saveStatus === "saving" ? "Saving…" : stage === 3 ? "See my results" : "Next scene"} →</button>}
                </div>
              )}
              {feedback?.correct && <div className="consequence-card"><span>{stageDetails[stage].eyebrow}</span><p><strong>What changed?</strong>{stageDetails[stage].consequence}</p><b>{stageDetails[stage].reward}</b></div>}
            </section>
          </div>
        )}

        {view === "results" && (
          <div className="results page-enter">
            <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
            <span className="episode-kicker">MISSION COMPLETE</span>
            <h1>Nice call, crew member.</h1>
            <p>You protected the data, repaired the prompt, and kept a qualified person in control of the final decision.</p>
            {saveStatus === "saved" && <div className="feedback correct" role="status"><span>✓</span><p><strong>Completion connected</strong>Your result is available in the admin report.</p></div>}
            {saveStatus === "local" && <div className="feedback coach" role="status"><span>!</span><p><strong>Saved on this device</strong>Connect pilot storage in Vercel to make completion records durable.</p></div>}
            <div className="result-grid">
              <section className="score-card comic-box">
                <span className="score-ring"><b>{score}</b><small>mastery</small></span>
                <div><span>YOUR RESULT</span><h2>Data Safety: Cleared</h2><p>{mistakes === 0 ? "Perfect first-pass judgment." : `${mistakes} coaching ${mistakes === 1 ? "moment" : "moments"} turned into safer choices.`}</p></div>
              </section>
              <section className="takeaway-card comic-box"><span>KEEP THIS RULE</span><h2>Pause. Classify. Minimize. Verify.</h2><p>Use only approved tools, share only the data needed, and review important outputs against a trusted source.</p></section>
            </div>
            <section className="badge-shelf comic-box" aria-label="Mission rewards">
              <div><span className="badge-icon">◈</span><p><small>BADGE EARNED</small><strong>Data Shield</strong></p></div>
              <div><span className="badge-icon verify">✓</span><p><small>HABIT UNLOCKED</small><strong>Trust, then verify</strong></p></div>
              <div><span className="badge-icon xp">100</span><p><small>CREW XP</small><strong>Full mission credit</strong></p></div>
            </section>
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
          <h3>AOG Data Checkpoint · DASI Aviation Parts & Logistics</h3>
          <div className="certificate-meta"><span><small>COMPLETED</small>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())}</span><span><small>MASTERY</small>{score}%</span><span><small>CERTIFICATE ID</small>{certificateId}</span></div>
          <div className="certificate-rule">Pause · Classify · Minimize · Verify</div>
        </div>
      </section>
    </main>
  );
}
