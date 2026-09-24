---
paths:
  - "**/src/configs/**"
  - "**/*.config.*"
  - "**/.*rc*"
  - "**/tsconfig*.json"
  - "**/turbo.json"
  - "**/knip.json"
  - "**/pnpm-workspace.yaml"
---

# No Speculative Configuration Rules

Keep configuration demand-driven, observable, and aligned with verified repository and consumer requirements.

## Demand-Driven Configuration

- Add or modify rules, plugins, parser options, environment flags, scripts, and workflow settings only for an active requirement.
- Prefer the smallest configuration that satisfies the current contract.
- Extract repeated rule option objects and identical configuration entries into slice-local constants; do not duplicate identical rule definitions inline.
- Remove configuration that has no current consumer, test, or documented public purpose.
- Do not add options, fallback branches, compatibility modes, or feature flags for hypothetical future needs.

## Match Patterns and Boundaries

- Make repository-internal paths, extensions, and ignore patterns match actual files and supported boundaries.
- Consume cross-cutting file globs and extension lists from `src/configs/constants/` as the single source of truth; never inline raw file-pattern string literals in configuration slices.
- Derive composite file lists from established baseline constants rather than mapping individual extension subsets in parallel.
- Use consumer-facing patterns only when they are part of a documented contract and covered by tests.
- Keep generated artifacts and external tool boundaries explicit rather than hiding them in broad patterns.

## Verification

- Confirm that each configuration option or rule override has a matching test case or diagnostic verification.
- Inspect target globs to ensure all slice file patterns import from `src/configs/constants/`.
- Verify that repeated rule configurations within a slice are factored into local constants rather than duplicated inline.
- Inspect the diff for unneeded packages or options; requested checks, Git hooks, and CI own linter, type, dependency, and export verification.
