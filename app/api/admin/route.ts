import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { assignments, completions, learners, organizationSettings } from "../../../db/schema";
import { isAdminRequest } from "./_auth";

const defaultSettings = {
  organizationName: "Ctrl+Alt+Learn Pilot Team",
  industry: "Aviation",
  passingScore: "80",
  certificatesEnabled: "true",
  coursePublished: "true",
  reminderDays: "7",
  policyNote: "Use only company-approved AI tools. Do not enter confidential, personal, regulated, or safety-sensitive information unless the workflow is explicitly approved.",
};

async function unauthorized(request: Request) {
  return !(await isAdminRequest(request))
    ? Response.json({ error: "Admin session required" }, { status: 401 })
    : null;
}

export async function GET(request: Request) {
  const denied = await unauthorized(request);
  if (denied) return denied;

  const db = getDb();
  const [people, assigned, completed, storedSettings] = await Promise.all([
    db.select().from(learners).orderBy(asc(learners.name)),
    db
      .select({
        id: assignments.id,
        learnerId: assignments.learnerId,
        learnerName: learners.name,
        learnerEmail: learners.email,
        courseId: assignments.courseId,
        dueDate: assignments.dueDate,
        status: assignments.status,
        createdAt: assignments.createdAt,
      })
      .from(assignments)
      .innerJoin(learners, eq(assignments.learnerId, learners.id))
      .orderBy(desc(assignments.createdAt)),
    db
      .select({
        id: completions.id,
        learnerName: learners.name,
        learnerEmail: learners.email,
        courseId: completions.courseId,
        score: completions.score,
        certificateId: completions.certificateId,
        completedAt: completions.completedAt,
      })
      .from(completions)
      .innerJoin(learners, eq(completions.learnerId, learners.id))
      .orderBy(desc(completions.completedAt)),
    db.select().from(organizationSettings),
  ]);

  const settings = { ...defaultSettings } as Record<string, string>;
  for (const row of storedSettings) settings[row.key] = row.value;

  return Response.json({ learners: people, assignments: assigned, completions: completed, settings });
}

export async function POST(request: Request) {
  const denied = await unauthorized(request);
  if (denied) return denied;

  const payload = (await request.json()) as Record<string, unknown>;
  const action = String(payload.action ?? "");
  const db = getDb();

  if (action === "createLearner") {
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim().toLowerCase();
    const department = String(payload.department ?? "General").trim();
    const skillLevel = String(payload.skillLevel ?? "Beginner").trim();
    if (!name || !email) return Response.json({ error: "Name and email are required" }, { status: 400 });
    const id = crypto.randomUUID();
    await db.insert(learners).values({ id, name, email, department, skillLevel, createdAt: new Date() });
    return Response.json({ id }, { status: 201 });
  }

  if (action === "createAssignment") {
    const learnerId = String(payload.learnerId ?? "");
    if (!learnerId) return Response.json({ error: "Choose a learner" }, { status: 400 });
    const courseId = String(payload.courseId ?? "intro-101");
    const existing = await db
      .select({ id: assignments.id })
      .from(assignments)
      .where(and(eq(assignments.learnerId, learnerId), eq(assignments.courseId, courseId)))
      .limit(1);
    if (existing.length) return Response.json({ error: "This course is already assigned" }, { status: 409 });
    const id = crypto.randomUUID();
    await db.insert(assignments).values({
      id,
      learnerId,
      courseId,
      dueDate: String(payload.dueDate ?? "") || null,
      createdAt: new Date(),
    });
    return Response.json({ id }, { status: 201 });
  }

  if (action === "saveSettings") {
    const values = (payload.settings ?? {}) as Record<string, unknown>;
    for (const [key, value] of Object.entries(values)) {
      await db
        .insert(organizationSettings)
        .values({ key, value: String(value), updatedAt: new Date() })
        .onConflictDoUpdate({ target: organizationSettings.key, set: { value: String(value), updatedAt: new Date() } });
    }
    return Response.json({ saved: true });
  }

  if (action === "updateAssignment") {
    await db
      .update(assignments)
      .set({ status: String(payload.status ?? "assigned") })
      .where(eq(assignments.id, String(payload.id ?? "")));
    return Response.json({ updated: true });
  }

  if (action === "deleteLearner") {
    const learnerId = String(payload.id ?? "");
    await db.delete(assignments).where(eq(assignments.learnerId, learnerId));
    await db.delete(completions).where(eq(completions.learnerId, learnerId));
    await db.delete(learners).where(eq(learners.id, learnerId));
    return Response.json({ deleted: true });
  }

  return Response.json({ error: "Unknown admin action" }, { status: 400 });
}
