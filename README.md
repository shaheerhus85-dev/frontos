# FrontOS

FrontOS is a production-oriented Next.js SaaS codebase. Phase 2.3A established the project foundation; Phase 2.3B adds Aurora Prism shared UI primitives and the responsive dashboard application shell. It intentionally contains no dashboard metrics, charts, authentication, data fetching, or business logic.

## Setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`. Foundation routes are `/`, `/onboarding`, and `/overview`. Supabase variables may remain empty until a later integration phase. The local smoke project uses the installed Chromium-based Microsoft Edge channel; CI runners without Edge can switch the Playwright channel to their provisioned Chromium browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run strict TypeScript checks
- `npm run format` / `npm run format:check` — write or verify Prettier formatting
- `npm run test:e2e` — run the Chromium Playwright smoke test

## Structure

```text
src/
├── app/                 # App Router route groups
├── components/          # Aurora UI primitives, shared identity, and dashboard shell
├── config/              # site, navigation, constants, and typed environment access
├── hooks/               # reusable React hooks
├── lib/                 # framework-agnostic utilities and service clients
├── styles/              # Aurora Prism tokens and global styles
└── types/               # shared TypeScript contracts
```

Server Components are the default. Browser-only boundaries are explicit, environment values are validated with Zod, and Supabase factories fail with a clear message only when invoked without credentials.

## Phase boundary

Phase 2.3B stops at reusable primitives and application-shell readiness. Do not add Overview KPIs, charts, activity feeds, integrations, onboarding steps, marketing sections, authentication, or real data until their approved implementation phase. The exact next phase is **Phase 2.3C — Overview Dashboard Screen**.
