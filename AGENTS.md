<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server. Turbopack is the default; keep it that way (see Stack quirks).
- `npm run lint` — ESLint 9 flat config. `next build` does NOT lint, so run this explicitly. All current lint problems come from `references/pantallas/support.js` (read-only mockup helper) — don't fix them; lint is clean as long as no problems point outside `references/`.
- `npm run build` — includes TypeScript checking; this is the only typecheck step (no test script exists).
- Package manager is npm (`package-lock.json`) — not pnpm/yarn/bun.

## Stack quirks

- Next.js 16.4.2 + React 19.3 + Tailwind v4. There is NO `postcss.config.*` or `tailwind.config.*`: Tailwind is loaded via `turbopack.rules` in `next.config.ts`. Do not create those config files, and do not switch dev/build to webpack.
- `cacheComponents` and `partialPrefetching` are enabled in `next.config.ts`.
- Path alias `@/*` maps to the repo root (`./*`) — e.g. `@/app/page.tsx`, not `src/*`.
- App Router lives in `app/` (no `src/` directory).

## Design references

- Screens to build are specified by mockups in `references/pantallas/*.dc.html` — start at `index.dc.html` for the screen map; screenshots in `references/screenshots/`.
- Spanish-language daycare app: UI copy goes in Spanish.
- `references/` is read-only input for the app — never edit it or import from it.

## Spec workflow

- Features are spec-driven via the `/spec` and `/spec-impl` skills (`.agents/skills/`, tracked in `skills-lock.json`).
- Specs live at `specs/NN-slug.md`. `/spec-impl` only proceeds when the spec state means "Approved" (e.g. `Aprobado`), then creates/switches to branch `spec-NN-slug` (controllable via `AutoCreateBranch` in `specs/.spec-config.yml`, default `true`).

## Agents

- `spec-verifier` (`.opencode/agent/spec-verifier.md`): verifies the "Criterios de aceptación" of a spec against the real implementation. Reads the spec, runs `npm run lint` and `npm run build`, drives Playwright for visual/interaction checks, corrects small deviations, and marks checkboxes only after proving them in-session. Use it when asked to verify, validate, or "marcar los checks" of a spec.

## MCPs

- Playwright: screenshots y cualquier archivo relacionado con Playwright van en la carpeta `.playwright-mcp/` (ya está en `.gitignore`).

- Context7: usar este MCP para traer la documentación actualizada del framework (obligatorio para Next.js — ver el bloque de reglas de arriba).

## Reglas de codigo
- Usar codigo limpio, nombres, funciones, variables, etc en ingles.