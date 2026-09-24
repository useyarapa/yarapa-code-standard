---
paths:
  - "**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"
---

# Single Author Style Rules

Write code as if one careful engineer owns the entire repository. Sibling code must share structure, naming, ordering, idioms, and abstraction level unless verified technical requirements dictate otherwise.

## Sibling Precedent

- Match the dominant local pattern of representative sibling files in the same category before deciding layout, naming, exports, helper placement, composition, error handling, or abstraction level.
- Default to standard ecosystem idioms when no local dominant pattern exists.
- Stop and confirm before introducing a new convention when existing implementations conflict.

## New Package and Sibling Pre-Flight

Before creating any new package under `packages/*`:

1. Read existing sibling directories and manifests (`package.json`, `tsconfig.json`, `tsdown.config.ts`, `src/`) first.
2. Mirror file architecture and composition patterns verbatim (e.g., config definitions in `src/config.ts` re-exported via `src/index.ts`).
3. Mirror all shared lifecycle scripts in `package.json` (`build`, `clean*`, `test*`, `lint*`, `typecheck`).
4. Update all monorepo surfaces in the same pass:
   - Root `package.json#devDependencies`
   - CI and release workflows (`ci.yml`, `preview.yml`, `release.yml`)
   - Documentation (`README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `docs/*`)
   - PR labeler (`.github/labeler.yml`)

## Structural Symmetry and Cohesion

- Follow predictable file skeletons: arrange constants, types, helpers, implementations, and exports in a uniform section order across sibling files.
- Keep execution flow collocated and direct; introduce separate files or helpers only when multiple callers share them.

## Declarative Naming and Types

- Use one term for one concept across filenames, symbols, configs, tests, and documentation.
- Name parallel symbols with matching grammatical structure describing domain contract rather than mechanical implementation.
- Keep TypeScript types declarative, concrete, and readable: prefer discriminated unions and descriptive options objects over conditional type puzzles or boolean-blind signatures.
- Write comments only to capture non-obvious domain intent, technical constraints, or upstream workarounds; let identifiers explain mechanics.

## Scoped Changes

- Confine edits strictly to requested files.
- Rely on configured linters and formatters as the source of truth for code styling.
- Treat pattern changes as separate repository-wide decisions rather than incidental edits during unrelated tasks.

## Verification

- Inspect representative siblings to verify the changed file matches dominant structure, naming, export, and abstraction conventions.
- Confirm types remain declarative and direct without speculative abstractions or wrappers.
- Verify changes remain confined to requested files without incidental refactoring.
