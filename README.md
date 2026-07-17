# Ctrl+Alt+Learn

An interactive, workplace-sitcom-style AI literacy pilot. The current vertical slice includes four-step learner onboarding, a six-minute aviation data-safety mission, printable certificates, and an administrator control room for rosters, assignments, settings, and completion reports.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `ADMIN_PASSWORD` in `.env.local` to access the control room.

Without a Redis connection the app uses process-local preview storage. That is useful for interface testing but can reset whenever the development server or a Vercel Function restarts.

## Deploy a test environment to Vercel

1. Import this repository into Vercel. It is a standard Next.js app; no build override is required.
2. Add `ADMIN_PASSWORD` and `AUTH_SECRET` to the Vercel project's environment variables. Use separate long, random values.
3. In the Vercel Marketplace, connect an Upstash Redis integration to the project.
4. Confirm the integration provides `KV_REST_API_URL` and `KV_REST_API_TOKEN`. The commonly provided `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` names also work.
5. Redeploy after adding the variables.
6. Complete the learner mission, then open **Admin → Reports** and confirm the completion appears.

The admin dashboard displays a warning when durable storage is not connected. Do not use real employee-sensitive information in this prototype; shared-password access and the completion endpoint are intended only for controlled usability testing.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes for admin | Temporary pilot control-room password. |
| `AUTH_SECRET` | Yes on Vercel | Signs the admin session token. |
| `KV_REST_API_URL` | For durable data | Upstash Redis REST endpoint. |
| `KV_REST_API_TOKEN` | For durable data | Upstash Redis REST token. |

The equivalent `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` variables are supported as fallbacks.

## Commands

- `npm run dev` — start Next.js development mode.
- `npm run build` — create the Vercel-compatible production build.
- `npm run lint` — run ESLint.
- `npm test` — build and run repository checks.

## Current pilot boundary

One mission is playable and seven additional Intro 101 missions remain planned. See [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) for curriculum direction and the production-readiness guardrails.
