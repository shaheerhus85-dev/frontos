# FrontOS

FrontOS is a production-oriented Next.js SaaS codebase. Phase 2.3A established the project foundation, Phase 2.3B added the Aurora Prism UI layer and responsive application shell, and Phase 2.3C implements the static Overview dashboard. No authentication, backend integration, or real business data is connected.

## Setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`; the dashboard preview is `/overview`. Supabase variables may remain empty until a later integration phase. The local smoke project uses the installed Chromium-based Microsoft Edge channel.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run typecheck` - run strict TypeScript checks
- `npm run format` / `npm run format:check` - write or verify Prettier formatting
- `npm run test:e2e` - run the Chromium Playwright suite

## Structure

```text
src/
|-- app/                 # App Router route groups
|-- components/          # UI primitives, application shell, and dashboard widgets
|-- config/              # Site, navigation, constants, and typed environment access
|-- data/                # Typed static demo data
|-- hooks/               # Reusable React hooks
|-- lib/                 # Framework-agnostic utilities and service clients
|-- styles/              # Aurora Prism tokens and global styles
`-- types/               # Shared TypeScript contracts
```

Server Components are the default. Client boundaries are limited to interactive primitives and Recharts visualizations. Environment values are validated with Zod, and Supabase factories fail with a clear message only when invoked without credentials.

## Phase boundary

Phase 2.3C stops at the static Overview dashboard. Do not connect APIs or add Calls, Bookings, Leads, Customers, AI Agents, Knowledge Base, Reports, onboarding, authentication, or real data until their approved implementation phases.
