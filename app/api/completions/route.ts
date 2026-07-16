import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { assignments, completions, learners } from "../../../db/schema";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    name?: string;
    email?: string;
    department?: string;
    skillLevel?: string;
    score?: number;
    certificateId?: string;
  };
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim().toLowerCase() ?? "";
  const certificateId = payload.certificateId?.trim() ?? "";
  if (!name || !email || !certificateId) {
    return Response.json({ error: "Learner, email, and certificate are required" }, { status: 400 });
  }

  const db = getDb();
  let [learner] = await db.select().from(learners).where(eq(learners.email, email)).limit(1);
  if (!learner) {
    const id = crypto.randomUUID();
    await db.insert(learners).values({
      id,
      name,
      email,
      department: payload.department ?? "General",
      skillLevel: payload.skillLevel ?? "Beginner",
      createdAt: new Date(),
    });
    [learner] = await db.select().from(learners).where(eq(learners.id, id)).limit(1);
  }

  const existing = await db.select().from(completions).where(eq(completions.certificateId, certificateId)).limit(1);
  if (!existing.length) {
    await db.insert(completions).values({
      id: crypto.randomUUID(),
      learnerId: learner.id,
      courseId: "intro-101",
      score: Math.max(0, Math.min(100, Number(payload.score ?? 0))),
      certificateId,
      completedAt: new Date(),
    });
  }
  await db.update(assignments).set({ status: "completed" }).where(eq(assignments.learnerId, learner.id));
  return Response.json({ recorded: true });
}
