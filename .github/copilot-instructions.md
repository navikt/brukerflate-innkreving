# Copilot Instructions

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs `vite build && tsc --noEmit`)
- **Lint:** `pnpm eslint .`
- **Format:** `pnpm prettier --write .`
- **Generate API types:** `pnpm generate:api` (Orval from OpenAPI spec)

There are no tests in this project.

## Architecture

This is an internal NAV (Norwegian Labour and Welfare Administration) tool for viewing debt collection claims ("innkrevingskrav"). It's a full-stack TypeScript app using **TanStack Start** with SSR, deployed to NAIS (NAV's Kubernetes platform).

### Client-server boundary

- **Server functions** (`src/server/`) use `createServerFn` from TanStack Start. These run server-side and call the backend API (`tilbakekreving`) with OBO (on-behalf-of) tokens.
- **Middleware chain:** `authorizationHeaderMiddleware` → `texasMiddleware` (token exchange) or `brukerMiddleware` (user info from JWT). Server functions compose these via `.middleware([])`.
- **Queries** (`src/queries/`) wrap server functions with `useServerFn` + TanStack Query (`useQuery`/`useMutation`).

### Routing

File-based routing via TanStack Router. Route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually. Routes are in `src/routes/` following the TanStack Router file convention.

### API types and validation

Types and Zod schemas are **generated** from the backend OpenAPI spec via Orval into `src/generated/`. Do not edit files in `src/generated/` — regenerate with `pnpm generate:api`. Generated Zod schemas are used both for input validation in server functions and for parsing API responses.

### Dev server mocking

Three custom Vite plugins (`src/vite-plugins/`) handle local development without a running backend:
- `injectAuthHeaderPlugin` — injects a mock JWT Authorization header
- `texasTokenExchangePlugin` — mocks the NAIS Texas token exchange endpoint
- `mockKravPlugin` — returns mock data for kravoversikt/kravdetaljer API endpoints

These plugins only apply during `vite dev` (via `apply: "serve"`).

### Production build

Vite builds with Nitro for the server runtime. The production output goes to `.output/` and runs as a standalone Node.js server (`node .output/server/index.mjs`).

## Conventions

- **Language:** UI text and code identifiers (variable names, types) are in Norwegian. Comments may be in Norwegian.
- **Design system:** Uses `@navikt/ds-react` (Aksel) for all UI components and `@navikt/ds-tailwind` with Tailwind CSS v4 for styling.
- **Package manager:** pnpm (defined in `packageManager` field). Use `pnpm` for all package operations.
- **Formatting:** Prettier with 4-space tabs and `prettier-plugin-tailwindcss`. Experimental ternaries enabled.
