---
paths:
  - "**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"
---

# No Suppression Rules

Resolve compiler and linter diagnostics at their root cause without modifying configuration files, adding bypass annotations, or concealing runtime failures.

## Type Resolution

- Narrow types using standard TypeScript guards (`typeof`, `instanceof`, `in`, discriminated unions).
- For missing third-party types, declare ambient module types under `src/types/` using `declare module`.
- Report conflicting ambient types or unfixable third-party declarations to the user before proposing modifications.

## Linter Resolution

- Refactor source code to satisfy linter rule invariants directly at their source.
- Resolve implementation defects in code; keep `eslint.config.ts` clean of bypass overrides and disabling directives.
- Report unresolved rule conflicts or configuration defects to the user before proposing modifications.

## Error Semantics and Diagnostics

- Preserve runtime failure visibility: let errors surface directly to the caller or process boundary with complete diagnostic context.
- Handle exceptions only when adding diagnostic context, recovering definitively, or transforming at an architectural boundary; eliminate empty catches and concealing fallback values.
- Retain root causes across abstraction layers rather than wrapping failures in generic catch-all errors.

## Verification

- Confirm diagnostics on touched files resolve cleanly via language server diagnostics without modifying linter or TypeScript configuration.
- Verify error handling preserves root cause diagnostics and surfaces errors without silent suppression.
