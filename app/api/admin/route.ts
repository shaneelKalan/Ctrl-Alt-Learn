import { readStore, writeStore, type PilotStore } from "../../../db";
import { isAdminRequest } from "./_auth";

export const runtime = "nodejs";

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

function learnerById(store: PilotStore, id: string) {
  return store.learners.find((learner) => learner.id === id);
}

export async function GET(request: Request) {
  const denied = await unauthorized(request);
  if (denied) return denied;

  const store = await readStore();
  const learners = [...store.learners].sort((a, b) => a.name.localeCompare(b.name));
  const assignments = [...store.assignments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((item) => {
      const learner = learnerById(store, item.learnerId);
      return {
        ...item,
        learnerName: learner?.name ?? "Removed learner",
        learnerEmail: learner?.email ?? "",
      };
    });
  const completions = [...store.completions]
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .map((item) => {
      const learner = learnerById(store, item.learnerId);
      return {
        id: item.id,
        learnerName: learner?.name ?? "Removed learner",
        learnerEmail: learner?.email ?? "",
        courseId: item.courseId,
        score: item.score,
        certificateId: item.certificateId,
        completedAt: item.completedAt,
      };
    });

  return Response.json({
    learners,
    assignments,
    completions,
    settings: { ...defaultSettings, ...store.settings },
  });
}

export async function POST(request: Request) {
  const denied = await unauthorized(request);
  if (denied) return denied;

  const payload = (await request.json()) as Record<string, unknown>;
  const action = String(payload.action ?? "");
  const store = await readStore();

  if (action === "createLearner") {
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim().toLowerCase();
    const department = String(payload.department ?? "General").trim();
    const skillLevel = String(payload.skillLevel ?? "Beginner").trim();
    if (!name || !email) return Response.json({ error: "Name and email are required" }, { status: 400 });
    if (store.learners.some((learner) => learner.email === email)) {
      return Response.json({ error: "A learner with this email already exists" }, { status: 409 });
    }
    const id = crypto.randomUUID();
    store.learners.push({ id, name, email, department, skillLevel, status: "active", createdAt: new Date().toISOString() });
    await writeStore(store);
    return Response.json({ id }, { status: 201 });
  }

  if (action === "createAssignment") {
    const learnerId = String(payload.learnerId ?? "");
    if (!learnerId || !learnerById(store, learnerId)) return Response.json({ error: "Choose a learner" }, { status: 400 });
    const courseId = String(payload.courseId ?? "intro-101");
    if (store.assignments.some((item) => item.learnerId === learnerId && item.courseId === courseId)) {
      return Response.json({ error: "This course is already assigned" }, { status: 409 });
    }
    const id = crypto.randomUUID();
    store.assignments.push({
      id,
      learnerId,
      courseId,
      dueDate: String(payload.dueDate ?? "") || null,
      status: "assigned",
      createdAt: new Date().toISOString(),
    });
    await writeStore(store);
    return Response.json({ id }, { status: 201 });
  }

  if (action === "saveSettings") {
    const values = (payload.settings ?? {}) as Record<string, unknown>;
    for (const [key, value] of Object.entries(values)) store.settings[key] = String(value);
    await writeStore(store);
    return Response.json({ saved: true });
  }

  if (action === "updateAssignment") {
    const id = String(payload.id ?? "");
    const assignment = store.assignments.find((item) => item.id === id);
    if (assignment) assignment.status = String(payload.status ?? "assigned");
    await writeStore(store);
    return Response.json({ updated: true });
  }

  if (action === "deleteLearner") {
    const learnerId = String(payload.id ?? "");
    store.assignments = store.assignments.filter((item) => item.learnerId !== learnerId);
    store.completions = store.completions.filter((item) => item.learnerId !== learnerId);
    store.learners = store.learners.filter((item) => item.id !== learnerId);
    await writeStore(store);
    return Response.json({ deleted: true });
  }

  return Response.json({ error: "Unknown admin action" }, { status: 400 });
}
