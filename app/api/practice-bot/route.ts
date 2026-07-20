export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PromptChecks = { hasGoal: boolean; hasFormat: boolean; hasCheck: boolean };

type PracticeBotResponse = {
  kind: "safe" | "coach" | "blocked";
  mode: "live" | "simulated";
  text: string;
  checks: PromptChecks;
};

const sensitivePattern = /northstar|dasi-\d|\(305\)|supplier pricing|buyer mobile|confidential|export.controlled|\$\d|customer name|phone number|quote total/i;
const goalPattern = /draft|create|write|summarize|compare|explain|rewrite|format/i;
const formatPattern = /bullet|table|email|list|three|3 |format|paragraph/i;
const checkPattern = /missing|uncertain|assumption|do not invent|only use|flag|verify|source/i;

function inspectPrompt(prompt: string): PromptChecks {
  return {
    hasGoal: goalPattern.test(prompt),
    hasFormat: formatPattern.test(prompt),
    hasCheck: checkPattern.test(prompt),
  };
}

function localCoach(prompt: string): PracticeBotResponse {
  const checks = inspectPrompt(prompt);
  if (sensitivePattern.test(prompt)) {
    return {
      kind: "blocked",
      mode: "simulated",
      text: "Data gate triggered. This looks like customer, quote, pricing, contact, or controlled information. Do not use real DASI data in this practice bot. Replace it with fictional placeholders and include only what the task needs.",
      checks,
    };
  }
  if (!checks.hasGoal) {
    return {
      kind: "coach",
      mode: "simulated",
      text: "I need a job to do. Start with an action such as ‘Draft,’ ‘Summarize,’ or ‘Create,’ then name the audience and purpose.",
      checks,
    };
  }
  if (!checks.hasFormat || !checks.hasCheck) {
    return {
      kind: "coach",
      mode: "simulated",
      text: `Good start. Add ${!checks.hasFormat ? "a requested format" : "a rule for missing information and uncertainty"}. A useful prompt tells me what success looks like instead of making me guess.`,
      checks,
    };
  }
  return {
    kind: "safe",
    mode: "simulated",
    text: "FICTIONAL PRACTICE DRAFT\n• Part requirement: fuel control unit; availability is not yet verified.\n• Logistics concept: use the approved lane after confirmation.\n• Open items: supplier stock, trace, price, and lead time require source verification.\n\nHuman check: compare every claim with approved source records before use.",
    checks,
  };
}

function extractOutputText(payload: unknown) {
  const response = payload as { output_text?: string; output?: { content?: { text?: string }[] }[] };
  if (response.output_text) return response.output_text;
  return response.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("\n").trim() ?? "";
}

async function liveCoach(prompt: string, checks: PromptChecks): Promise<PracticeBotResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return localCoach(prompt);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: "You are the DASI AI Practice Bot inside an AI literacy course for an aviation parts supplier, sourcer, and logistics company. Only respond to fictional, low-risk practice prompts. Coach the learner on safe workplace AI usage. Do not ask for real customer, supplier, pricing, trace, personal, export-controlled, contractual, or safety-sensitive data. Keep responses under 140 words. Separate facts from assumptions, flag missing information, and remind the learner to verify important claims against approved source records.",
      input: `Learner practice prompt:\n${prompt}`,
      temperature: 0.4,
      max_output_tokens: 220,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`OpenAI practice bot returned ${response.status}`);
  const text = extractOutputText(await response.json()) || localCoach(prompt).text;
  return { kind: checks.hasGoal && checks.hasFormat && checks.hasCheck ? "safe" : "coach", mode: "live", text, checks };
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { prompt?: string };
  const prompt = payload.prompt?.trim() ?? "";
  if (!prompt) return Response.json({ error: "Prompt is required" }, { status: 400 });
  if (prompt.length > 1200) return Response.json({ error: "Keep practice prompts under 1,200 characters." }, { status: 400 });

  const checks = inspectPrompt(prompt);
  if (sensitivePattern.test(prompt)) return Response.json(localCoach(prompt), { status: 200 });

  try {
    return Response.json(await liveCoach(prompt, checks));
  } catch {
    return Response.json({ ...localCoach(prompt), text: "The live AI coach is unavailable, so I switched to simulator mode.\n\n" + localCoach(prompt).text });
  }
}
