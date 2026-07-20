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
  assert.match(page, /Now see it at work/);
  assert.match(page, /DIRECTOR’S NOTE/);
  assert.match(page, /Make the call/);
  assert.match(page, /AI PREFLIGHT/);
  assert.match(page, /Fluent is not the same as factual/);
  assert.match(page, /DASI · AVIATION PARTS & LOGISTICS/);
  assert.match(page, /AOG SOURCING COORDINATOR/);
  assert.match(page, /CONFABULATION/);
  assert.match(page, /PROMPT BLUEPRINT/);
  assert.match(page, /FINAL PREFLIGHT/);
  assert.match(page, /academy-choices/);
  assert.match(page, /EPISODE SKILL CHECK/);
  assert.match(page, /Not assessed yet/);
  assert.match(page, /These are episode results/);
  assert.match(page, /stageMistakes/);
  assert.match(page, /DASI PRACTICE BOT/);
  assert.match(page, /LIVE AI LAB/);
  assert.match(page, /fetch\("\/api\/practice-bot"/);
  assert.match(page, /Data gate triggered/);
  assert.match(page, /Practice cleared/);
});

test("documents authoritative curriculum sources and DASI review boundaries", async () => {
  const sources = await source("docs/CONTENT_SOURCES.md");
  assert.match(sources, /NIST AI Risk Management Framework/);
  assert.match(sources, /CISA Artificial Intelligence/);
  assert.match(sources, /OECD AI Principles/);
  assert.match(sources, /FAA Roadmap/);
  assert.match(sources, /must be reviewed against actual DASI policies/);
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

test("adds a guarded live AI practice bot route", async () => {
  const [route, readme, env] = await Promise.all([
    source("app/api/practice-bot/route.ts"),
    source("README.md"),
    source(".env.example"),
  ]);

  assert.match(route, /OPENAI_API_KEY/);
  assert.match(route, /https:\/\/api.openai.com\/v1\/responses/);
  assert.match(route, /sensitivePattern/);
  assert.match(route, /mode: "simulated"/);
  assert.match(readme, /live AI practice bot/);
  assert.match(env, /OPENAI_MODEL/);
});
