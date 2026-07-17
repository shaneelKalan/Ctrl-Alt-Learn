import { hasDurableStore, readStore, writeStore } from "../../../db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as { name?: string; email?: string; department?: string; skillLevel?: string; score?: number; certificateId?: string };
  const name = payload.name?.trim() ?? ""; const email = payload.email?.trim().toLowerCase() ?? ""; const certificateId = payload.certificateId?.trim() ?? "";
  if (!name || !email || !certificateId) return Response.json({ error: "Learner, email, and certificate are required" }, { status: 400 });
  const store = await readStore();
  let learner = store.learners.find((item) => item.email === email);
  if (!learner) {
    learner = { id: crypto.randomUUID(), name, email, department: payload.department ?? "General", skillLevel: payload.skillLevel ?? "Beginner", status: "active", createdAt: new Date().toISOString() };
    store.learners.push(learner);
  }
  if (!store.completions.some((item) => item.certificateId === certificateId)) store.completions.push({ id: crypto.randomUUID(), learnerId: learner.id, courseId: "intro-101", score: Math.max(0, Math.min(100, Number(payload.score ?? 0))), certificateId, completedAt: new Date().toISOString() });
  for (const assignment of store.assignments) if (assignment.learnerId === learner.id) assignment.status = "completed";
  await writeStore(store);
  return Response.json({ recorded: true, durable: hasDurableStore() });
}
