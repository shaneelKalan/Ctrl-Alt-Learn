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

test("includes durable training records and a generated migration", async () => {
  const [schema, migration, hosting] = await Promise.all([
    source("db/schema.ts"),
    source("drizzle/0000_plain_war_machine.sql"),
    source(".openai/hosting.json"),
  ]);

  assert.match(schema, /learners/);
  assert.match(schema, /assignments/);
  assert.match(schema, /completions/);
  assert.match(migration, /CREATE TABLE `organization_settings`/);
  assert.match(hosting, /"d1": "DB"/);
});
