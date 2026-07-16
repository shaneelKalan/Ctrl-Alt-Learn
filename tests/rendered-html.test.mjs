import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Ctrl+Alt+Learn prototype", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ctrl\+Alt\+Learn/);
  assert.match(html, /The Data Safety/);
  assert.match(html, /Start mission/);
  assert.match(html, /AVIATION OPERATIONS EDITION/);
  assert.match(html, /Certificate unlocked/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("includes accessible interactive controls and source context", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<button[^>]*>Start mission/);
  assert.match(html, /aria-label="Intro 101 missions"/);
  assert.match(html, /NIST AI RMF/);
  assert.match(html, /FAA AI Safety Assurance/);
});
