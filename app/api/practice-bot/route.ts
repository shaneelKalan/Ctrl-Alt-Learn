export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lang = "en" | "es";
type PromptChecks = { hasGoal: boolean; hasFormat: boolean; hasCheck: boolean };

type PracticeBotResponse = {
  kind: "safe" | "coach" | "blocked";
  mode: "live" | "simulated";
  text: string;
  checks: PromptChecks;
};

const sensitivePattern = /northstar|dasi-\d|\(305\)|supplier pricing|precios de proveedor|buyer mobile|confidential|confidencial|export.controlled|controlad|\$\d|customer name|phone number|quote total/i;
const goalPattern = /draft|create|write|summarize|compare|explain|rewrite|format|redacta|crea|escribe|resume|compara|explica/i;
const formatPattern = /bullet|table|email|list|three|3 |format|paragraph|viñeta|tabla|correo|lista|tres|formato/i;
const checkPattern = /missing|uncertain|assumption|do not invent|only use|flag|verify|source|faltante|inciert|suposici|no inventes|solo usa|marca|verifica|fuente/i;

function inspectPrompt(prompt: string): PromptChecks {
  return {
    hasGoal: goalPattern.test(prompt),
    hasFormat: formatPattern.test(prompt),
    hasCheck: checkPattern.test(prompt),
  };
}

function localCoach(prompt: string, lang: Lang): PracticeBotResponse {
  const checks = inspectPrompt(prompt);
  const es = lang === "es";
  if (sensitivePattern.test(prompt)) {
    return {
      kind: "blocked",
      mode: "simulated",
      text: es
        ? "Compuerta de datos activada. Esto parece información de cliente, cotización, precio, contacto o dato controlado. Reemplázalo con marcadores ficticios antes de practicar."
        : "Data gate triggered. This looks like customer, quote, pricing, contact, or controlled information. Replace it with fictional placeholders before practicing.",
      checks,
    };
  }
  if (!checks.hasGoal) {
    return {
      kind: "coach",
      mode: "simulated",
      text: es
        ? "Empieza con el trabajo: redacta, resume, compara o explica. Luego nombra la audiencia y el propósito."
        : "Start with the job: draft, summarize, compare, or explain. Then name the audience and purpose.",
      checks,
    };
  }
  if (!checks.hasFormat || !checks.hasCheck) {
    return {
      kind: "coach",
      mode: "simulated",
      text: es
        ? `Buen inicio. Agrega ${!checks.hasFormat ? "un formato solicitado" : "una regla para información faltante e incertidumbre"}.`
        : `Good start. Add ${!checks.hasFormat ? "a requested format" : "a rule for missing information and uncertainty"}.`,
      checks,
    };
  }
  return {
    kind: "safe",
    mode: "simulated",
    text: es
      ? "BORRADOR FICTICIO DE PRÁCTICA\n• Requisito: solicitud ficticia de parte; disponibilidad no verificada.\n• Concepto logístico: usar la ruta aprobada después de confirmar.\n• Pendientes: stock, trazabilidad, precio y plazo requieren verificación de fuente."
      : "FICTIONAL PRACTICE DRAFT\n• Requirement: fictional part request; availability is not verified.\n• Logistics concept: use the approved lane after confirmation.\n• Open items: stock, trace, price, and lead time require source verification.",
    checks,
  };
}

function extractOutputText(payload: unknown) {
  const response = payload as { output_text?: string; output?: { content?: { text?: string }[] }[] };
  if (response.output_text) return response.output_text;
  return response.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("\n").trim() ?? "";
}

async function liveCoach(prompt: string, lang: Lang, checks: PromptChecks): Promise<PracticeBotResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return localCoach(prompt, lang);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: `You are the DASI AI Practice Bot inside an AI literacy course for an aviation parts supplier, sourcer, and logistics company. Reply in ${lang === "es" ? "Spanish" : "English"}. Only respond to fictional, low-risk practice prompts. Coach the learner on safe workplace AI usage. Do not ask for real customer, supplier, pricing, trace, personal, export-controlled, contractual, or safety-sensitive data. Keep responses under 140 words. Separate facts from assumptions, flag missing information, and remind the learner to verify important claims against approved source records.`,
      input: `Learner practice prompt:\n${prompt}`,
      temperature: 0.4,
      max_output_tokens: 220,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`OpenAI practice bot returned ${response.status}`);
  const text = extractOutputText(await response.json()) || localCoach(prompt, lang).text;
  return { kind: checks.hasGoal && checks.hasFormat && checks.hasCheck ? "safe" : "coach", mode: "live", text, checks };
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { prompt?: string; lang?: Lang };
  const prompt = payload.prompt?.trim() ?? "";
  const lang: Lang = payload.lang === "es" ? "es" : "en";
  if (!prompt) return Response.json({ error: lang === "es" ? "El prompt es obligatorio" : "Prompt is required" }, { status: 400 });
  if (prompt.length > 1200) return Response.json({ error: lang === "es" ? "Mantén los prompts de práctica por debajo de 1,200 caracteres." : "Keep practice prompts under 1,200 characters." }, { status: 400 });

  const checks = inspectPrompt(prompt);
  if (sensitivePattern.test(prompt)) return Response.json(localCoach(prompt, lang));

  try {
    return Response.json(await liveCoach(prompt, lang, checks));
  } catch {
    const local = localCoach(prompt, lang);
    return Response.json({ ...local, text: (lang === "es" ? "El coach de IA en vivo no está disponible, así que cambié a modo simulador.\n\n" : "The live AI coach is unavailable, so I switched to simulator mode.\n\n") + local.text });
  }
}
