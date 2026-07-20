"use client";

import { FormEvent, useState } from "react";
import { courseMinutes } from "./course";
import { getCourse, uiStrings, type Lang } from "./i18n";

export type LearnerProfile = {
  name: string;
  email: string;
  department: string;
  role: string;
  skillLevel: "Beginner" | "Comfortable" | "Advanced";
  goals: string[];
  trustAnswer: string;
  language: Lang;
};

export function Onboarding({ onComplete, onAdmin }: { onComplete: (profile: LearnerProfile) => void; onAdmin: () => void }) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const [profile, setProfile] = useState<Omit<LearnerProfile, "language">>({
    name: "",
    email: "",
    department: "",
    role: "",
    skillLevel: "Beginner",
    goals: [],
    trustAnswer: "",
  });

  const t = uiStrings[lang].onboarding;
  const missionCount = getCourse(lang).length;

  function next(event?: FormEvent) {
    event?.preventDefault();
    setStep((value) => Math.min(3, value + 1));
  }

  function toggleGoal(goal: string) {
    setProfile((current) => ({
      ...current,
      goals: current.goals.includes(goal) ? current.goals.filter((item) => item !== goal) : [...current.goals, goal],
    }));
  }

  return (
    <main className="onboarding-shell">
      <header className="onboarding-header">
        <div className="brand-lockup onboarding-brand"><span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span><span><strong>Ctrl+Alt+Learn</strong><small>{t.brandTag}</small></span></div>
        <div className="onboarding-header-actions">
          <div className="lang-toggle" role="group" aria-label={t.languageLabel}>
            {(["en", "es"] as const).map((code) => (
              <button aria-pressed={lang === code} className={lang === code ? "active" : ""} key={code} type="button" onClick={() => setLang(code)}>
                {code === "en" ? "🇺🇸 English" : "🇲🇽 Español"}
              </button>
            ))}
          </div>
          <button className="admin-entry" type="button" onClick={onAdmin}>{t.adminEntry} <span>→</span></button>
        </div>
      </header>
      <div className="onboarding-progress" aria-label={`Step ${step + 1} / 4`}><span style={{ width: `${(step + 1) * 25}%` }} /></div>

      {step === 0 && <section className="onboarding-hero page-enter">
        <div className="onboarding-copy"><span className="episode-kicker"><span>{t.kicker}</span><i /> {t.kickerTag}</span><h1>{t.heroTitle1}<br /><em>{t.heroTitle2}</em></h1><p>{t.heroCopy}</p><div className="onboarding-facts"><span><b>{courseMinutes} min</b><small>{t.factMinutes}</small></span><span><b>{missionCount}</b><small>{t.factMissions}</small></span><span><b>1</b><small>{t.factCertificate}</small></span></div><button className="primary-button onboarding-start" type="button" onClick={() => next()}>{t.start} <span>→</span></button><small className="onboarding-note">{t.startNote}</small></div>
        <div className="onboarding-stage" role="img" aria-label="Two coworkers in an aviation operations training studio"><div className="welcome-caption">{lang === "es" ? "NUEVO EPISODIO: CONOCE A TU COMPAÑERO DE IA" : "NEW EPISODE: MEET YOUR AI TEAMMATE"}</div><div className="welcome-bubble">{lang === "es" ? "“¿Listo para aprender qué puede — y qué no puede — hacer la IA?”" : "“Ready to learn what AI can—and cannot—do?”"}</div><div className="welcome-board"><span>{lang === "es" ? "SEGURIDAD" : "SAFETY"}</span><span>{lang === "es" ? "CRITERIO" : "JUDGMENT"}</span><span>{lang === "es" ? "VERIFICA" : "VERIFY"}</span><span>PROMPT</span></div><div className="welcome-cast"><i /><i /></div><div className="welcome-desk" /></div>
      </section>}

      {step === 1 && <form className="onboarding-card comic-box page-enter" onSubmit={next}><div className="onboarding-card-heading"><span>{t.step1Kicker}</span><h1>{t.step1Title}</h1><p>{t.step1Copy}</p></div><div className="onboarding-fields"><label><span>{t.fullName}</span><input required autoFocus value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder={t.namePlaceholder} /></label><label><span>{t.workEmail}</span><input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} placeholder="you@company.com" /></label><label><span>{t.team}</span><input value={profile.department} onChange={(event) => setProfile({ ...profile, department: event.target.value })} placeholder={t.teamPlaceholder} /></label><label><span>{t.role}</span><input required value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value })} placeholder={t.rolePlaceholder} /></label></div><div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(0)}>{t.back}</button><button className="primary-button" type="submit">{t.nextStep} <span>→</span></button></div></form>}

      {step === 2 && <section className="onboarding-card comic-box page-enter"><div className="onboarding-card-heading"><span>{t.step2Kicker}</span><h1>{t.step2Title}</h1><p>{t.step2Copy}</p></div><fieldset className="level-picker"><legend>{t.levelLegend}</legend>{(["Beginner", "Comfortable", "Advanced"] as const).map((level, index) => <button aria-pressed={profile.skillLevel === level} key={level} type="button" onClick={() => setProfile({ ...profile, skillLevel: level })}><span>{String(index + 1).padStart(2, "0")}</span><b>{t.levels[level].name}</b><small>{t.levels[level].copy}</small></button>)}</fieldset><fieldset className="goal-picker"><legend>{t.goalsLegend} <small>{t.goalsAny}</small></legend>{t.goals.map((goal) => <button aria-pressed={profile.goals.includes(goal)} key={goal} type="button" onClick={() => toggleGoal(goal)}><span>{profile.goals.includes(goal) ? "✓" : "+"}</span>{goal}</button>)}</fieldset><div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(1)}>{t.back}</button><button className="primary-button" type="button" onClick={() => next()}>{t.oneQuickCheck} <span>→</span></button></div></section>}

      {step === 3 && <section className="onboarding-card diagnostic-card comic-box page-enter"><div className="onboarding-card-heading"><span>{t.step3Kicker}</span><h1>{t.step3Title}</h1><p>{t.step3Copy}</p></div><div className="diagnostic-options">{t.trustOptions.map((option, index) => <button aria-pressed={profile.trustAnswer === option.id} key={option.id} type="button" onClick={() => setProfile({ ...profile, trustAnswer: option.id })}><span>{String.fromCharCode(65 + index)}</span><b>{option.title}</b><small>{option.copy}</small></button>)}</div>{profile.trustAnswer && <div className={`diagnostic-feedback ${profile.trustAnswer === "verify" ? "correct" : ""}`}><span>{profile.trustAnswer === "verify" ? "✓" : "✦"}</span><p><strong>{profile.trustAnswer === "verify" ? t.trustGood : t.trustOther}</strong>{profile.trustAnswer === "verify" ? t.trustGoodCopy : t.trustOtherCopy}</p></div>}<div className="onboarding-actions"><button className="back-button" type="button" onClick={() => setStep(2)}>{t.back}</button><button className="primary-button" disabled={!profile.trustAnswer} type="button" onClick={() => onComplete({ ...profile, language: lang })}>{t.enterCourse} <span>→</span></button></div></section>}

      <footer className="onboarding-footer"><span>{t.footerLeft} · {missionCount} {t.factMissions} · {courseMinutes} min</span><span>{t.footerRight}</span></footer>
    </main>
  );
}
