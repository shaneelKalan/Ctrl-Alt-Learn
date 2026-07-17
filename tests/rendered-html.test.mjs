import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("ships guided learner onboarding", async () => {
  const [page, onboarding] = await Promise.all([
    source("app/page.tsx"),
    source("app/Onboarding.tsx"),
  ]);

  assert.match(page, /cal-learner-profile-v1/);
  assert.match(page, /<Onboarding/);
  assert.match(onboarding, /WELCOME ABOARD/);
  assert.match(onboarding, /YOUR BADGE/);
  assert.match(onboarding, /YOUR FLIGHT PLAN/);
  assert.match(onboarding, /TRUST CHECK/);
});

test("protects admin routes with an HTTP-only session cookie", async () => {
  const [auth, login, admin] = await Promise.all([
    source("app/api/admin/_auth.ts"),
    source("app/api/admin/login/route.ts"),
    source("app/api/admin/route.ts"),
  ]);

  assert.match(auth, /HttpOnly; Secure; SameSite=Strict/);
  assert.match(auth, /ADMIN_PASSWORD/);
  assert.match(login, /Incorrect password/);
  assert.match(admin, /Admin session required/);
  assert.match(admin, /createLearner/);
  assert.match(admin, /createAssignment/);
  assert.match(admin, /saveSettings/);
});

test("includes a durable-capable training record store", async () => {
  const [store, completions] = await Promise.all([
    source("db/index.ts"),
    source("app/api/completions/route.ts"),
  ]);

  assert.match(store, /learners/);
  assert.match(store, /assignments/);
  assert.match(store, /completions/);
  assert.match(store, /KV_REST_API_URL/);
  assert.match(store, /UPSTASH_REDIS_REST_URL/);
  assert.match(completions, /readStore/);
  assert.match(completions, /writeStore/);
});

test("ships the full eight-mission course", async () => {
  const [course, player, page] = await Promise.all([
    source("app/course.ts"),
    source("app/MissionPlayer.tsx"),
    source("app/page.tsx"),
  ]);

  const missionIds = ["meet-ai", "superpowers-limits", "data-safety", "work-mode", "life-mode", "prompt-repair", "trust-verify", "final-shift"];
  for (const id of missionIds) assert.match(course, new RegExp(`id: "${id}"`));
  for (const kind of ["info", "choice", "multi", "sort", "builder"]) assert.match(player, new RegExp(`kind === "${kind}"`));
  assert.match(page, /cal-course-progress-v2/);
  assert.match(page, /MissionPlayer/);
});
