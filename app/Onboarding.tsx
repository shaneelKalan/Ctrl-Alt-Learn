"use client";

import { FormEvent, useState } from "react";

export type LearnerProfile = {
  name: string;
  email: string;
  department: string;
  role: string;
  skillLevel: "Beginner" | "Comfortable" | "Advanced";
  goals: string[];
  trustAnswer: string;
};

const goals = ["Use AI safely at work", "Write better prompts", "Check AI answers", "Understand policy", "Move faster without shortcuts"];

export function Onboarding({ onComplete, onAdmin }: { onComplete: (profile: LearnerProfile) => void; onAdmin: () => void }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<LearnerProfile>({ name: "", email: "", department: "Sourcing", role: "", skillLevel: "Beginner", goals: [], trustAnswer: "" });

  function next(event?: FormEvent) {
    event?.preventDefault();
    setStep((value) => Math.min(3, value + 1));
  }

  function toggleGoal(goal: string) {
    setProfile((current) => ({ ...current, goals: current.goals.includes(goal) ? current.goals.filter((item) => item !== goal) : [...current.goals, goal] }));
  }

  return (
    <main className="onboarding-shell">
      <header className="onboarding-header">
        <div className="brand-lockup onboarding-brand"><span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span><span><strong>Ctrl+Alt+Learn</strong><small>Human-first AI training</small></span></div>
        <button className="admin-entry" type="button" onClick={onAdmin}>Admin control room <span>→</span></button>
      </header>
      <div className="onboarding-progress" aria-label={`Onboarding step ${step + 1} of 4`}><span style={{ width: `${(step + 1) * 25}%` }} /></div>

      {step === 0 && <section className="onboarding-hero page-enter">
        <div className="onboarding-copy"><span className="episode-kicker"><span>WELCOME ABOARD</span><i /> INTRO 101 PILOT</span><h1>AI training you<br /><em>actually get to play.</em></h1><p>Join Maya and Jordan for a fast workplace challenge. Make the call, see what happens, and leave with one habit you can use today.</p><div className="onboarding-facts"><span><b>10 min</b><small>pilot time</small></span><span><b>4 calls</b><small>you decide</small></span><span><b>100 XP</b><small>up for grabs</small></span></div><button className="primary-button onboarding-start" type="button" onClick={() => next()}>Join the crew <span>→</span></button><small className="onboarding-note">Wrong answers are coaching moments—not game overs.</small></div>
        <div className="onboarding-stage" role="img" aria-label="Two DASI coworkers in an aviation parts and logistics training studio"><div className="welcome-caption">DASI AI ACADEMY · NEW EPISODE</div><div className="welcome-bubble">“Ready to source smarter without giving away the manifest?”</div><div className="welcome-board"><span>SAFETY</span><span>JUDGMENT</span><span>VERIFY</span><span>PROMPT</span></div><div className="welcome-cast"><i /><i /></div><div className="welcome-desk" /></div>
      </section>}

      {step === 1 && <form className="onboarding-card comic-box page-enter" onSubmit={next}><div className="onboarding-card-heading"><span>STEP 1 · YOUR BADGE</span><h1>Who’s joining the crew?</h1><p>This information personalizes your course and completion certificate.</p></div><div className="onboarding-fields"><label><span>Full name</span><input required autoFocus value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder="Your name" /></label><label><span>Work email</span><input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} placeholder="you@dasi.com" /></label><label><span>Team or department</span><input value={profile.department} onChange={(event) => setProfile({ ...profile, department: event.target.value })} placeholder="Sourcing, Sales, Logistics…" /></label><label><span>Role</span><input required value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value })} placeholder="AOG sourcing coordinator" /></label></div><div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(0)}>← Back</button><button className="primary-button" type="submit">Next step <span>→</span></button></div></form>}

      {step === 2 && <section className="onboarding-card comic-box page-enter"><div className="onboarding-card-heading"><span>STEP 2 · YOUR FLIGHT PLAN</span><h1>Meet you at your level.</h1><p>The core safety rules stay consistent; examples and coaching can adapt to your experience.</p></div><fieldset className="level-picker"><legend>How comfortable are you with AI chatbots?</legend>{(["Beginner", "Comfortable", "Advanced"] as const).map((level) => <button aria-pressed={profile.skillLevel === level} key={level} type="button" onClick={() => setProfile({ ...profile, skillLevel: level })}><span>{level === "Beginner" ? "01" : level === "Comfortable" ? "02" : "03"}</span><b>{level}</b><small>{level === "Beginner" ? "I’m learning the basics." : level === "Comfortable" ? "I use chatbots occasionally." : "I use AI in regular workflows."}</small></button>)}</fieldset><fieldset className="goal-picker"><legend>What matters most? <small>Choose any</small></legend>{goals.map((goal) => <button aria-pressed={profile.goals.includes(goal)} key={goal} type="button" onClick={() => toggleGoal(goal)}><span>{profile.goals.includes(goal) ? "✓" : "+"}</span>{goal}</button>)}</fieldset><div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(1)}>← Back</button><button className="primary-button" type="button" onClick={() => next()}>One quick check <span>→</span></button></div></section>}

      {step === 3 && <section className="onboarding-card diagnostic-card comic-box page-enter"><div className="onboarding-card-heading"><span>STEP 3 · TRUST CHECK</span><h1>A chatbot gives you a polished answer. What now?</h1><p>There is no penalty—this helps establish your starting point.</p></div><div className="diagnostic-options">{[
        ["trust", "Use it", "It sounds confident, so it is probably correct."],
        ["verify", "Check it", "Compare important claims with a trusted source."],
        ["avoid", "Never use AI", "Chatbots are too risky for any workplace task."],
      ].map(([id, title, copy], index) => <button aria-pressed={profile.trustAnswer === id} key={id} type="button" onClick={() => setProfile({ ...profile, trustAnswer: id })}><span>{String.fromCharCode(65 + index)}</span><b>{title}</b><small>{copy}</small></button>)}</div>{profile.trustAnswer && <div className={`diagnostic-feedback ${profile.trustAnswer === "verify" ? "correct" : ""}`}><span>{profile.trustAnswer === "verify" ? "✓" : "✦"}</span><p><strong>{profile.trustAnswer === "verify" ? "Good instinct." : "That’s exactly why we practice."}</strong>{profile.trustAnswer === "verify" ? " Verification should match the impact of the answer." : " AI can be useful, but confidence is not proof. The course will show you when and how to verify."}</p></div>}<div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(2)}>← Back</button><button className="primary-button" disabled={!profile.trustAnswer} type="button" onClick={() => onComplete(profile)}>Enter the course <span>→</span></button></div></section>}

      <footer className="onboarding-footer"><span>DASI Pilot · Aviation Parts, Sourcing & Logistics</span><span>Progress is saved after onboarding.</span></footer>
    </main>
  );
}
