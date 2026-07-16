# FrontOS

FrontOS is a production-oriented Next.js SaaS codebase. Phase 2.3A establishes the project, Aurora Prism design tokens, route boundaries, typed environment handling, Supabase client boundaries, formatting, and smoke testing. It intentionally contains no product UI, authentication, data fetching, or business logic.

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
├── components/          # ui, shared, and feature component boundaries
├── config/              # site, navigation, constants, and typed environment access
├── hooks/               # reusable React hooks
├── lib/                 # framework-agnostic utilities and service clients
├── styles/              # Aurora Prism tokens and global styles
└── types/               # shared TypeScript contracts
```

Server Components are the default. Browser-only boundaries are explicit, environment values are validated with Zod, and Supabase factories fail with a clear message only when invoked without credentials.

## Phase boundary

Phase 2.3A stops at foundation readiness. Do not add dashboard chrome, onboarding steps, marketing sections, animation behavior, authentication, charts, or real data until their approved implementation phase. The recommended next phase is **Phase 2.3B: Shared UI Primitives and Application Shell**, using the approved mockup/specification as its source of truth.
