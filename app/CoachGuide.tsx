"use client";

import type { Lang } from "./i18n";

const content = {
  en: {
    kicker: "TEAM ENABLEMENT",
    tag: "FACILITATOR GUIDE",
    title: "Turn the course into a team habit.",
    copy: "Use this after learners finish missions: run short huddles, role-play realistic DASI moments, and coach observable behaviors instead of only quiz scores.",
    back: "Back to course map",
    cards: [
      {
        id: "rollout",
        icon: "🗓️",
        title: "30-day rollout",
        subtitle: "Make training stick",
        lines: [
          "Week 1: assign Intro 101 and ask every learner to complete Missions 1–3 before the team huddle.",
          "Week 2: discuss one real workflow where AI could help — then name the data that must stay out.",
          "Week 3: practice prompt repair in pairs using only fictional examples.",
          "Week 4: review completions, celebrate badges, and choose one approved team use case to standardize.",
        ],
      },
      {
        id: "huddle",
        icon: "🎬",
        title: "15-minute team huddle",
        subtitle: "A repeatable meeting script",
        lines: [
          "Open: “Where could AI save us time this week without taking over judgment?”",
          "Role-play: one person is the requester, one is the AI coach, one is the verifier.",
          "Debrief: what data was minimized, what assumptions were flagged, and who owned the final decision?",
          "Close: each person writes one work-safe AI habit they will try before Friday.",
        ],
      },
      {
        id: "scenarios",
        icon: "🧩",
        title: "DASI role-play scenes",
        subtitle: "Practice before the real pressure",
        lines: [
          "AOG sourcing update: draft customer-safe bullets from fictional part/logistics facts.",
          "Supplier quote summary: separate confirmed facts from assumptions and missing evidence.",
          "Customer email rewrite: improve tone without changing commitments, price, trace, or lead time.",
          "Escalation note: summarize the issue, owner, deadline, and verification source in a reviewable format.",
        ],
      },
      {
        id: "rubric",
        icon: "📏",
        title: "Manager observation rubric",
        subtitle: "Coach behaviors you can see",
        lines: [
          "Tool choice: uses only approved systems for work data.",
          "Data minimization: removes customer, supplier, pricing, personal, trace, and controlled details unless explicitly approved.",
          "Prompt quality: includes task, audience, context, format, and uncertainty rules.",
          "Verification: checks important claims against source records before sharing or deciding.",
        ],
      },
      {
        id: "reinforce",
        icon: "🔁",
        title: "Reinforcement loop",
        subtitle: "Keep it alive after launch",
        lines: [
          "Post a weekly “prompt makeover” using fictional data in the team channel.",
          "Ask for one screenshot-free story: where did AI help, and what did the human verify?",
          "Refresh the Field Guide when policy changes; never rely on tribal memory for AI rules.",
          "Treat mistakes as coaching signals unless someone bypasses a clear data or safety rule.",
        ],
      },
      {
        id: "evidence",
        icon: "✅",
        title: "Pilot evidence to collect",
        subtitle: "What makes this LMS useful",
        lines: [
          "Completion rate by team and due date.",
          "First-try scores by dimension: safety, judgment, verification, prompt craft.",
          "Top coaching moments from huddles and manager observations.",
          "One approved use case per team with owner, review step, and data boundary documented.",
        ],
      },
    ],
  },
  es: {
    kicker: "HABILITACIÓN DEL EQUIPO",
    tag: "GUÍA DEL FACILITADOR",
    title: "Convierte el curso en un hábito de equipo.",
    copy: "Úsalo después de que los estudiantes terminen misiones: reuniones cortas, escenas realistas de DASI y coaching de comportamientos observables, no solo puntajes.",
    back: "Volver al mapa del curso",
    cards: [
      {
        id: "rollout",
        icon: "🗓️",
        title: "Plan de 30 días",
        subtitle: "Haz que el aprendizaje dure",
        lines: [
          "Semana 1: asigna Intro 101 y pide completar Misiones 1–3 antes de la reunión del equipo.",
          "Semana 2: conversa sobre un flujo real donde la IA podría ayudar — y nombra los datos que no deben entrar.",
          "Semana 3: practica reparación de prompts en parejas usando solo ejemplos ficticios.",
          "Semana 4: revisa avances, celebra insignias y elige un caso de uso aprobado para estandarizar.",
        ],
      },
      {
        id: "huddle",
        icon: "🎬",
        title: "Reunión de 15 minutos",
        subtitle: "Guion repetible",
        lines: [
          "Apertura: “¿Dónde podría ahorrar tiempo la IA esta semana sin tomar el criterio humano?”",
          "Escena: una persona pide, otra actúa como coach de IA y otra verifica.",
          "Debrief: ¿qué datos se minimizaron, qué suposiciones se marcaron y quién decidió al final?",
          "Cierre: cada persona escribe un hábito seguro con IA para probar antes del viernes.",
        ],
      },
      {
        id: "scenarios",
        icon: "🧩",
        title: "Escenas de rol DASI",
        subtitle: "Practicar antes de la presión real",
        lines: [
          "Actualización AOG: redactar viñetas seguras para cliente con datos ficticios de parte/logística.",
          "Resumen de cotización: separar hechos confirmados de suposiciones y evidencia faltante.",
          "Correo a cliente: mejorar tono sin cambiar compromisos, precio, trazabilidad o plazo.",
          "Nota de escalamiento: resumir problema, responsable, fecha y fuente de verificación.",
        ],
      },
      {
        id: "rubric",
        icon: "📏",
        title: "Rúbrica de observación",
        subtitle: "Coaching de conductas visibles",
        lines: [
          "Elección de herramienta: usa solo sistemas aprobados para datos de trabajo.",
          "Minimización: quita cliente, proveedor, precios, datos personales, trazabilidad y datos controlados salvo aprobación explícita.",
          "Calidad del prompt: incluye tarea, audiencia, contexto, formato y reglas de incertidumbre.",
          "Verificación: comprueba afirmaciones importantes contra registros fuente antes de compartir o decidir.",
        ],
      },
      {
        id: "reinforce",
        icon: "🔁",
        title: "Bucle de refuerzo",
        subtitle: "Mantenerlo vivo",
        lines: [
          "Publica una mejora de prompt semanal con datos ficticios en el canal del equipo.",
          "Pide una historia sin capturas: dónde ayudó la IA y qué verificó la persona.",
          "Actualiza la guía cuando cambie la política; no dependas de memoria informal para reglas de IA.",
          "Trata errores como señales de coaching salvo que alguien omita una regla clara de datos o seguridad.",
        ],
      },
      {
        id: "evidence",
        icon: "✅",
        title: "Evidencia del piloto",
        subtitle: "Qué hace útil al LMS",
        lines: [
          "Tasa de finalización por equipo y fecha límite.",
          "Puntajes de primer intento por dimensión: seguridad, criterio, verificación y prompts.",
          "Momentos de coaching principales de reuniones y observaciones de managers.",
          "Un caso de uso aprobado por equipo con responsable, revisión y límite de datos documentados.",
        ],
      },
    ],
  },
};

export function CoachGuide({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const t = content[lang];
  return (
    <div className="coach-guide page-enter">
      <div className="coach-guide-hero comic-box">
        <div><span className="episode-kicker"><span>{t.kicker}</span><i /> {t.tag}</span><h1>{t.title}</h1><p>{t.copy}</p></div>
        <button className="secondary-button" type="button" onClick={onExit}>{t.back}</button>
      </div>
      <div className="coach-guide-grid">
        {t.cards.map((card) => (
          <article className="coach-card comic-box" key={card.id}>
            <div className="coach-card-top"><span aria-hidden="true">{card.icon}</span><div><strong>{card.title}</strong><small>{card.subtitle}</small></div></div>
            <ul>{card.lines.map((line) => <li key={line}>{line}</li>)}</ul>
          </article>
        ))}
      </div>
    </div>
  );
}
