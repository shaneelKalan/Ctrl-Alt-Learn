import { hasDurableStore, readStore, writeStore } from "../../../db";
import { isAdminRequest } from "./_auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const defaultSettings = {
  organizationName: "Ctrl+Alt+Learn Pilot Team", industry: "Aviation", passingScore: "80",
  certificatesEnabled: "true", coursePublished: "true", reminderDays: "7",
  policyNote: "Use only company-approved AI tools. Do not enter confidential, personal, regulated, or safety-sensitive information unless the workflow is explicitly approved.",
};

async function unauthorized(request: Request) {
  return !(await isAdminRequest(request)) ? Response.json({ error: "Admin session required" }, { status: 401 }) : null;
}

export async function GET(request: Request) {
  const denied = await unauthorized(request); if (denied) return denied;
  const store = await readStore();
  const learnersById = new Map(store.learners.map((learner) => [learner.id, learner]));
  const assignments = store.assignments.map((item) => ({ ...item, learnerName: learnersById.get(item.learnerId)?.name ?? "Unknown learner", learnerEmail: learnersById.get(item.learnerId)?.email ?? "" }));
  const completions = store.completions.map((item) => ({ ...item, learnerName: learnersById.get(item.learnerId)?.name ?? "Unknown learner", learnerEmail: learnersById.get(item.learnerId)?.email ?? "" }));
  return Response.json({ learners: store.learners, assignments, completions, settings: { ...defaultSettings, ...store.settings }, durableStorage: hasDurableStore() });
}

export async function POST(request: Request) {
  const denied = await unauthorized(request); if (denied) return denied;
  const payload = (await request.json()) as Record<string, unknown>;
  const action = String(payload.action ?? "");
  const store = await readStore();

  if (action === "createLearner") {
    const name = String(payload.name ?? "").trim(); const email = String(payload.email ?? "").trim().toLowerCase();
    if (!name || !email) return Response.json({ error: "Name and email are required" }, { status: 400 });
    if (store.learners.some((item) => item.email === email)) return Response.json({ error: "That email is already in the roster" }, { status: 409 });
    const id = crypto.randomUUID();
    store.learners.push({ id, name, email, department: String(payload.department ?? "General").trim(), skillLevel: String(payload.skillLevel ?? "Beginner").trim(), status: "active", createdAt: new Date().toISOString() });
    await writeStore(store); return Response.json({ id }, { status: 201 });
  }
  if (action === "createAssignment") {
    const learnerId = String(payload.learnerId ?? ""); const courseId = String(payload.courseId ?? "intro-101");
    if (!store.learners.some((item) => item.id === learnerId)) return Response.json({ error: "Choose a valid learner" }, { status: 400 });
    if (store.assignments.some((item) => item.learnerId === learnerId && item.courseId === courseId)) return Response.json({ error: "This course is already assigned" }, { status: 409 });
    const id = crypto.randomUUID(); store.assignments.push({ id, learnerId, courseId, dueDate: String(payload.dueDate ?? "") || null, status: "assigned", createdAt: new Date().toISOString() });
    await writeStore(store); return Response.json({ id }, { status: 201 });
  }
  if (action === "saveSettings") {
    for (const [key, value] of Object.entries((payload.settings ?? {}) as Record<string, unknown>)) store.settings[key] = String(value);
    await writeStore(store); return Response.json({ saved: true });
  }
  if (action === "updateAssignment") {
    const item = store.assignments.find((assignment) => assignment.id === String(payload.id ?? ""));
    if (!item) return Response.json({ error: "Assignment not found" }, { status: 404 });
    item.status = String(payload.status ?? "assigned"); await writeStore(store); return Response.json({ updated: true });
  }
  if (action === "deleteLearner") {
    const id = String(payload.id ?? ""); store.learners = store.learners.filter((item) => item.id !== id); store.assignments = store.assignments.filter((item) => item.learnerId !== id); store.completions = store.completions.filter((item) => item.learnerId !== id);
    await writeStore(store); return Response.json({ deleted: true });
  }
  return Response.json({ error: "Unknown admin action" }, { status: 400 });
}
