import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("ships guided learner onboarding", async () => {
  const [page, onboarding, i18n] = await Promise.all([
    source("app/page.tsx"),
    source("app/Onboarding.tsx"),
    source("app/i18n.ts"),
  ]);

  assert.match(page, /cal-learner-profile-v1/);
  assert.match(page, /<Onboarding/);
  assert.match(i18n, /WELCOME ABOARD/);
  assert.match(i18n, /YOUR BADGE/);
  assert.match(i18n, /YOUR FLIGHT PLAN/);
  assert.match(i18n, /TRUST CHECK/);
  assert.match(onboarding, /lang-toggle/);
  assert.match(onboarding, /language: lang/);
});

test("ships narrated videos, DASI/Copilot policy, in both languages", async () => {
  const [videosEn, videosEs, player, page] = await Promise.all([
    source("app/videos.ts"),
    source("app/videos.es.ts"),
    source("app/VideoPlayer.tsx"),
    source("app/page.tsx"),
  ]);

  // All four episodes exist in both languages.
  for (const id of ["intro-to-ai", "copilot-safe-tool", "work-vs-personal", "dasi-playbook"]) {
    assert.match(videosEn, new RegExp(`id: "${id}"`));
    assert.match(videosEs, new RegExp(`id: "${id}"`));
  }

  // Both language tracks share the same scene ids in the same order.
  const sceneIds = (src) => [...src.matchAll(/id: "([\w-]+)",\s*\n\s*visual:/g)].map((m) => m[1]);
  const en = sceneIds(videosEn);
  assert.ok(en.length >= 35, `expected >= 35 scenes across episodes, got ${en.length}`);
  assert.deepEqual(sceneIds(videosEs), en);

  // DASI's approved-tool policy is taught, in both languages.
  assert.match(videosEn, /Microsoft Copilot/);
  assert.match(videosEn, /approved/i);
  assert.match(videosEs, /Microsoft Copilot/);
  assert.match(videosEs, /aprobad/i);

  // Player speaks narration and degrades gracefully without voices.
  assert.match(player, /SpeechSynthesisUtterance/);
  assert.match(player, /voiceschanged/);
  assert.match(player, /setTimeout/); // timer fallback when speech is unavailable
  assert.match(page, /VideoPlayer/);
});

test("offers English and Spanish end to end", async () => {
  const [i18n, courseEn, courseEs] = await Promise.all([
    source("app/i18n.ts"),
    source("app/course.ts"),
    source("app/course.es.ts"),
  ]);

  assert.match(i18n, /"en"/);
  assert.match(i18n, /"es"/);
  assert.match(i18n, /BIENVENIDO A BORDO/);
  assert.match(i18n, /PRUEBA DE CONFIANZA/);

  // The Spanish course must mirror the English course structurally:
  // identical mission/step/choice id sequences and step kinds.
  const ids = (src) => [...src.matchAll(/\bid: "([\w-]+)"/g)].map((m) => m[1]);
  const kinds = (src) => [...src.matchAll(/kind: "(\w+)",/g)].map((m) => m[1]);
  assert.deepEqual(ids(courseEs), ids(courseEn));
  assert.deepEqual(kinds(courseEs), kinds(courseEn));
  const correct = (src) => [...src.matchAll(/correct: (true|false)/g)].map((m) => m[1]);
  assert.deepEqual(correct(courseEs), correct(courseEn));
  const selects = (src) => [...src.matchAll(/shouldSelect: (true|false)/g)].map((m) => m[1]);
  assert.deepEqual(selects(courseEs), selects(courseEn));
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

test("ships the gamification layer in both languages", async () => {
  const [game, i18n, page] = await Promise.all([
    source("app/game.ts"),
    source("app/i18n.ts"),
    source("app/page.tsx"),
  ]);

  for (const id of ["first-flight", "flawless", "comeback", "halfway", "prompt-pro", "on-fire", "graduate", "perfectionist"]) {
    assert.match(game, new RegExp(`"${id}"`));
    assert.match(i18n, new RegExp(`"${id}"|${id}:`));
  }
  for (const rank of ["trainee", "cadet", "first-officer", "captain", "legend"]) assert.match(game, new RegExp(`"${rank}"`));
  assert.match(game, /updateStreak/);
  assert.match(game, /missionXp/);
  assert.match(i18n, /Leyenda del Vuelo/);
  assert.match(page, /evaluateBadges/);
  assert.match(page, /updateStreak/);
});

test("ships the full eight-mission course", async () => {
  const [course, player, page] = await Promise.all([
    source("app/course.ts"),
    source("app/MissionPlayer.tsx"),
    source("app/page.tsx"),
  ]);

  const missionIds = ["meet-ai", "superpowers-limits", "data-safety", "work-mode", "life-mode", "prompt-repair", "trust-verify", "final-shift"];
  for (const id of missionIds) assert.match(course, new RegExp(`id: "${id}"`));
  for (const kind of ["lesson", "choice", "multi", "sort", "builder"]) assert.match(player, new RegExp(`kind === "${kind}"`));
  assert.match(course, /fieldGuide/);
  assert.match(page, /cal-course-progress-v2/);
  assert.match(page, /MissionPlayer/);
});
