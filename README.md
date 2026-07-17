# Ctrl+Alt+Learn

Interactive, scenario-based AI literacy training for modern teams. A comic-styled
Next.js app that teaches everyday employees how to use AI chatbots safely and
effectively — through playable missions, not slideware.

## The course

**AI Chatbots: Intro 101** — eight missions, ~29 minutes:

1. **Meet Your AI Teammate** — what AI/LLMs/chatbots actually are
2. **Superpowers & Limits** — strengths, hallucinations, spotting red flags
3. **The Data Safety Checkpoint** — classify, minimize, and protect data
4. **Work Mode** — green/yellow/red-light uses and accountability
5. **Life Mode** — everyday wins, caution zones, AI-powered scams
6. **Prompt Repair Shop** — prompt anatomy and iteration
7. **Verify Before You Fly** — verification proportional to impact
8. **The Final Shift Challenge** — capstone combining every skill

Five activity types (teaching briefings, scenario choices, redaction boards,
classification lanes, and a guided prompt builder), sequential unlocks, a
mastery radar across four scoring dimensions, per-mission debriefs, and a
printable completion certificate.

## Quick start

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev
```

- Learner experience: `http://localhost:3000`
- Admin control room: click **Admin** (password = `ADMIN_PASSWORD`)

## Configuration

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Prototype admin login for the control room |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Optional Vercel KV / Upstash Redis REST store for durable learner, assignment, and completion records |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash-native equivalents of the above |

Without a KV store configured, server records fall back to per-instance memory —
fine for local development and demos, not for a real pilot.

## Project layout

- `app/course.ts` — the full course content model (missions, steps, coaching copy)
- `app/MissionPlayer.tsx` — generic player for all activity types
- `app/page.tsx` — learner dashboard, course map, debriefs, results, certificate
- `app/AdminPortal.tsx` — admin control room (people, assignments, courses, reports, settings)
- `app/api/` — admin auth/session, admin data actions, completion recording
- `db/index.ts` — JSON pilot store (KV-backed when configured, in-memory otherwise)
- `docs/PRODUCT_BRIEF.md` — product vision, curriculum outline, and roadmap

## Useful commands

- `npm run dev` — start local development
- `npm run build` — production build
- `npm test` — build plus source-contract tests
- `npm run lint` — ESLint

## Deployment

Deploys as a standard Next.js app (Vercel-ready). Set `ADMIN_PASSWORD` and,
for durable records, the KV variables in your project environment.

Production hardening still required before organizational rollout: real
identity/SSO, roles, rate limiting, and audit logging (see the product brief).
