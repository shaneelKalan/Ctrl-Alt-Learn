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
  assert.match(onboarding, /Wrong answers are coaching moments/);
  assert.match(page, /CREW XP/);
  assert.match(page, /What changed\?/);
  assert.match(page, /Data Shield/);
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

test("includes Vercel-compatible durable pilot storage", async () => {
  const [store, completion, readme] = await Promise.all([
    source("db/index.ts"),
    source("app/api/completions/route.ts"),
    source("README.md"),
  ]);

  assert.match(store, /KV_REST_API_URL/);
  assert.match(store, /UPSTASH_REDIS_REST_URL/);
  assert.match(completion, /writeStore/);
  assert.match(readme, /Deploy a test environment to Vercel/);
});
