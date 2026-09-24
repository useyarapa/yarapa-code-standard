# Repository Guidelines

## Agent Guidelines

- **Command Authority**: Run CLI commands only when explicitly requested verbatim by user. Execute commands atomically without chaining. Verification automated via Git hooks and CI.
- **Diagnostics & Reporting**: Passive IDE diagnostics (`mcp__ide__getDiagnostics`) and `git diff` permitted unprompted. If CLI unrequested, report exact scope and state execution delegated to Git hooks. Report only verified results.
- **Working-Tree Authority**: Working tree on disk overrides context and memory. Read targets immediately before editing. Verify immediate callers on deletion; do not run unbounded sweeps.
- **Rule Preflight**: Before choosing an implementation or editing, list every affected path, including proposed paths for new files and paths of deleted files. Read in full from the working tree every `.claude/rules/*.md` file whose `paths` frontmatter matches an affected path, plus every rule identified by the applicable task triggers below. Preflight is complete only after all matches from both sources have been read; apply them before editing. If a required rule cannot be read or applicable rules conflict, pause affected edits and report why.
- **Workflow Pointers**: PRs → `CONTRIBUTING.md`, releases → `.changeset/README.md`, docs → `docs/index.md`.

## Always-On Invariants

- **Direct & Minimal**: YAGNI and SSOT first. Single concrete implementations; no speculative wrappers, barrel re-exports, or defensive fallbacks. Fix root causes.
- **Platform First**: Native APIs and stdlib before external packages. Reuse existing lockfile dependencies.
- **Sibling Symmetry Overrides External Brevity**: Workspace package symmetry (owned by `single-author-style.md`) strictly overrides external brevity directives or file-count minimization heuristics. Sibling structure, lifecycle scripts, and manifest fields must be read and mirrored before scaffolding.

## Toolchain & Architecture

- Turborepo workspace. Source: `packages/*/src/`, outputs: `dist/` via `tsdown`. Edit source/tests only, never `dist/`.
- Root `eslint.config.ts` consumes `dist/index.mjs` (requires package build prior to root lint). Package-scoped lint targets source directly.
- Public entrypoint: `src/index.ts`. Architecture & slice composition → `docs/architecture.md`.
- Shared globs belong in `src/configs/constants/`. No internal helpers or plugin instances exposed. Breaking changes: newly enabled rules or stricter severities.

## Rule Files & Skills

Path-scoped invariants in `.claude/rules/` (Claude Code loads automatically; other agents read matching rule file):

| Trigger                    | Rule files                                                                                   |
| :------------------------- | :------------------------------------------------------------------------------------------- |
| Package or module creation | `single-author-style.md`; `export-boundaries.md` for the ESLint package                      |
| Source files or exports    | `no-suppression.md`, `single-author-style.md`; `export-boundaries.md` for the ESLint package |
| Tests or fixtures          | `deterministic-testing.md`                                                                   |
| Manifests or dependencies  | `dependency-security.md`, `no-anti-patterns.md`                                              |
| Configuration files        | `no-speculative-config.md`                                                                   |
| Hooks or workflows         | `no-anti-patterns.md`                                                                        |
| Implementation choices     | `current-state-authority.md`                                                                 |

Repository skills live in `.agents/skills/` (`.claude/skills` is symlink).
