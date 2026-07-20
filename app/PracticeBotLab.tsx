"use client";

import { FormEvent, useState } from "react";
import type { Lang } from "./i18n";

type BotMode = "unknown" | "live" | "simulated";
type BotKind = "safe" | "coach" | "blocked" | "pending";
type PromptChecks = { hasGoal: boolean; hasFormat: boolean; hasCheck: boolean };
type BotMessage = { role: "bot" | "user"; text: string; kind?: BotKind; mode?: BotMode };

const starter: Record<Lang, BotMessage> = {
  en: { role: "bot", mode: "unknown", text: "Welcome to the DASI AI Lab. Give me a fictional, low-risk task and the format you want. If the live AI coach is configured, I’ll respond with a model; otherwise I’ll use simulator mode." },
  es: { role: "bot", mode: "unknown", text: "Bienvenido al laboratorio de IA de DASI. Dame una tarea ficticia de bajo riesgo y el formato que quieres. Si el coach de IA en vivo está configurado, responderé con un modelo; si no, usaré modo simulador." },
};

const copy = {
  en: {
    kicker: "LIVE AI LAB",
    tag: "SAFE PRACTICE",
    title: "Try the training bot.",
    intro: "Use fictional info only. The app screens sensitive-looking text before any live AI call and falls back to simulator mode when OpenAI is not configured.",
    back: "Back to course map",
    bot: "DASI PRACTICE BOT",
    ready: "READY",
    live: "LIVE AI",
    sim: "SIMULATOR",
    you: "YOU",
    botLabel: "BOT",
    liveBot: "LIVE BOT",
    starters: "TRY A STARTER",
    prompts: [
      "Help me with an RFQ",
      "Draft three bullets from fictional part and logistics facts. Flag missing information and do not invent details.",
      "Summarize Northstar RFQ DASI-84729 and supplier pricing",
    ],
    label: "Your fictional practice prompt",
    placeholder: "Draft three bullets using only these fictional facts…",
    warning: "Never enter real customer, supplier, pricing, trace, personal, or controlled data.",
    send: "Send prompt",
    busy: "Coaching…",
    thinking: "Thinking through the safety gates…",
    hiccup: "Network hiccup—using simulator mode.",
    coach: "PROMPT COACH",
    coachTitle: "Build a reviewable request",
    goal: "Clear goal",
    goalHelp: "Say what the bot should do.",
    format: "Useful format",
    formatHelp: "Bullets, table, email, or another structure.",
    check: "Uncertainty rule",
    checkHelp: "Flag gaps; never invent missing facts.",
    boundaryTitle: "Practice boundary",
    boundary: "This lab is for learning prompt habits, not doing real DASI work. Keep examples fictional and verify important claims outside the chat.",
  },
  es: {
    kicker: "LAB DE IA EN VIVO",
    tag: "PRÁCTICA SEGURA",
    title: "Prueba el bot de entrenamiento.",
    intro: "Usa solo información ficticia. La app revisa texto sensible antes de cualquier llamada de IA en vivo y usa modo simulador si OpenAI no está configurado.",
    back: "Volver al mapa del curso",
    bot: "BOT DE PRÁCTICA DASI",
    ready: "LISTO",
    live: "IA EN VIVO",
    sim: "SIMULADOR",
    you: "TÚ",
    botLabel: "BOT",
    liveBot: "BOT EN VIVO",
    starters: "PRUEBA UN EJEMPLO",
    prompts: [
      "Ayúdame con una RFQ",
      "Redacta tres viñetas con datos ficticios de parte y logística. Marca información faltante y no inventes detalles.",
      "Resume Northstar RFQ DASI-84729 y precios de proveedor",
    ],
    label: "Tu prompt ficticio de práctica",
    placeholder: "Redacta tres viñetas usando solo estos datos ficticios…",
    warning: "Nunca ingreses datos reales de clientes, proveedores, precios, trazabilidad, personales o controlados.",
    send: "Enviar prompt",
    busy: "Coaching…",
    thinking: "Revisando las compuertas de seguridad…",
    hiccup: "Problema de red: usando modo simulador.",
    coach: "COACH DE PROMPTS",
    coachTitle: "Construye una solicitud revisable",
    goal: "Meta clara",
    goalHelp: "Di qué debe hacer el bot.",
    format: "Formato útil",
    formatHelp: "Viñetas, tabla, correo u otra estructura.",
    check: "Regla de incertidumbre",
    checkHelp: "Marca vacíos; nunca inventes datos faltantes.",
    boundaryTitle: "Límite de práctica",
    boundary: "Este laboratorio es para aprender hábitos de prompts, no para hacer trabajo real de DASI. Mantén ejemplos ficticios y verifica afirmaciones importantes fuera del chat.",
  },
};

function inspectPracticePrompt(prompt: string) {
  const normalized = prompt.toLowerCase();
  const sensitive = /northstar|dasi-\d|\(305\)|supplier pricing|precios de proveedor|buyer mobile|confidential|confidencial|export.controlled|controlad|\$\d/.test(normalized);
  const hasGoal = /draft|create|write|summarize|compare|explain|redacta|crea|escribe|resume|compara|explica/.test(normalized);
  const hasFormat = /bullet|table|email|list|three|3 |format|viñeta|tabla|correo|lista|tres|formato/.test(normalized);
  const hasCheck = /missing|uncertain|assumption|do not invent|only use|flag|verify|faltante|inciert|suposici|no inventes|solo usa|marca|verifica/.test(normalized);
  const checks = { hasGoal, hasFormat, hasCheck };
  if (sensitive) return { kind: "blocked" as const, text: "Data gate triggered. This looks like customer, quote, pricing, contact, or controlled information. Replace it with fictional placeholders before practicing.", checks };
  if (!hasGoal) return { kind: "coach" as const, text: "Start with the job: Draft, summarize, compare, or explain. Then name the audience and purpose.", checks };
  if (!hasFormat || !hasCheck) return { kind: "coach" as const, text: `Good start. Add ${!hasFormat ? "a requested format" : "a rule for missing information and uncertainty"}.`, checks };
  return { kind: "safe" as const, text: "FICTIONAL PRACTICE DRAFT\n• Requirement: fictional part request; availability is not verified.\n• Logistics concept: use the approved lane after confirmation.\n• Open items: stock, trace, price, and lead time require source verification.", checks };
}

export function PracticeBotLab({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const t = copy[lang];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BotMessage[]>([starter[lang]]);
  const [checks, setChecks] = useState<PromptChecks>({ hasGoal: false, hasFormat: false, hasCheck: false });
  const [mode, setMode] = useState<BotMode>("unknown");
  const [busy, setBusy] = useState(false);

  async function sendPrompt(event: FormEvent) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;
    setBusy(true);
    setInput("");
    setMessages((current) => [...current, { role: "user", text: prompt }, { role: "bot", text: t.thinking, kind: "pending", mode }]);
    try {
      const response = await fetch("/api/practice-bot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, lang }) });
      const result = (await response.json()) as { kind?: "safe" | "coach" | "blocked"; mode?: BotMode; text?: string; checks?: PromptChecks; error?: string };
      const fallback = !response.ok || !result.text ? { ...inspectPracticePrompt(prompt), mode: "simulated" as BotMode } : null;
      const reply = fallback ?? { kind: result.kind ?? "coach", mode: result.mode ?? "simulated", text: result.text ?? t.hiccup, checks: result.checks ?? inspectPracticePrompt(prompt).checks };
      setMode(reply.mode);
      setChecks(reply.checks);
      setMessages((current) => [...current.slice(0, -1), { role: "bot", text: response.ok ? reply.text : result.error ?? reply.text, kind: reply.kind, mode: reply.mode }]);
    } catch {
      const reply = inspectPracticePrompt(prompt);
      setMode("simulated");
      setChecks(reply.checks);
      setMessages((current) => [...current.slice(0, -1), { role: "bot", text: `${t.hiccup}\n\n${reply.text}`, kind: reply.kind, mode: "simulated" }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bot-lab page-enter">
      <header className="bot-lab-header"><div><span className="episode-kicker"><span>{t.kicker}</span><i /> {t.tag}</span><h1>{t.title}</h1><p>{t.intro}</p></div><button className="text-button" type="button" onClick={onExit}>{t.back}</button></header>
      <div className="bot-lab-grid">
        <section className="practice-chat comic-box" aria-label={t.bot}>
          <div className="practice-chat-title"><span><i /> {t.bot}</span><b className={mode === "live" ? "live" : ""}>{mode === "live" ? t.live : mode === "simulated" ? t.sim : t.ready}</b></div>
          <div className="practice-messages" aria-live="polite">{messages.map((message, index) => <div className={`practice-message ${message.role} ${message.kind ?? ""}`} key={`${message.role}-${index}`}><span>{message.role === "bot" ? (message.mode === "live" ? t.liveBot : t.botLabel) : t.you}</span><p>{message.text}</p></div>)}</div>
          <div className="practice-suggestions"><span>{t.starters}</span>{t.prompts.map((prompt) => <button key={prompt} onClick={() => setInput(prompt)} type="button">{prompt}</button>)}</div>
          <form className="practice-composer" onSubmit={(event) => void sendPrompt(event)}><label htmlFor="practice-prompt">{t.label}</label><textarea id="practice-prompt" onChange={(event) => setInput(event.target.value)} placeholder={t.placeholder} rows={4} value={input} /><div><small>{t.warning}</small><button className="primary-button compact" disabled={!input.trim() || busy} type="submit">{busy ? t.busy : t.send} <span>↑</span></button></div></form>
        </section>
        <aside className="prompt-coach comic-box"><span>{t.coach}</span><h2>{t.coachTitle}</h2><div className={checks.hasGoal ? "done" : ""}><i>{checks.hasGoal ? "✓" : "1"}</i><p><b>{t.goal}</b><small>{t.goalHelp}</small></p></div><div className={checks.hasFormat ? "done" : ""}><i>{checks.hasFormat ? "✓" : "2"}</i><p><b>{t.format}</b><small>{t.formatHelp}</small></p></div><div className={checks.hasCheck ? "done" : ""}><i>{checks.hasCheck ? "✓" : "3"}</i><p><b>{t.check}</b><small>{t.checkHelp}</small></p></div><section><b>{t.boundaryTitle}</b><p>{t.boundary}</p></section></aside>
      </div>
    </div>
  );
}
