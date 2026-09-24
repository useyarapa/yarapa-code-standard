---
paths:
  - ".husky/**"
  - ".github/workflows/**"
  - "**/package.json"
  - "**/scripts/**"
---

# No Anti-Patterns Rules

Prohibit recurring engineering anti-patterns across Git hooks, CI workflows, toolchain orchestration, and repository automation.

## Hook and Execution Order

- Run mutating formatters and auto-fixes in deterministic order: formatters (`prettier`) execute after linters (`eslint --fix`).
- Keep local Git hooks strictly offline-first: never bind remote network calls, package registry queries, or vulnerability audits (`pnpm audit`) to pre-commit or pre-push gates; delegate remote checks to CI.
- Use portable POSIX shell (`#!/usr/bin/env sh`) for repository hooks unless advanced shell features are explicitly required and documented.

## Toolchain and Runner Parity

- Preserve toolchain consistency: invoke local binaries through the workspace package manager (`pnpm exec <cmd>`) rather than foreign runners (`npx`, `yarn`, `bun`).
- Maintain direct scripts in `package.json`: target commands and binaries directly; eliminate redundant wrapper scripts that merely proxy to another task.

## System and Algorithm Assumptions

- Write hash-agnostic git inspect logic: match non-zero objects using character pattern checks (`case "$oid" in *[!0]*)`) rather than hardcoded 40-character SHA-1 strings.

## Verification

- Inspect hook and CI diffs to ensure no network calls were introduced into local commit/push cycles.
- Verify runner parity across scripts and manifests (no `npx` or foreign package runners in a pnpm workspace).
- Confirm tool execution order: linters fix first, formatters format second, scanners verify last.
