# Yarapa Code Standard: Overview

Purpose, audience, and design stance of the Yarapa Code Standard repository.

---

## 1. What This Repository Is

`yarapa-code-standard` is a private pnpm workspace that publishes three artifacts: [`@yarapa/eslint-config-yarapa`](../packages/eslint-config-yarapa/README.md), a strict and deterministic ESLint 10 Flat Config preset, [`@yarapa/prettier-config-yarapa`](../packages/prettier-config-yarapa/README.md), a deterministic Prettier configuration, and [`@yarapa/commitlint-config-yarapa`](../packages/commitlint-config-yarapa/README.md), a deterministic Commitlint configuration.

The repository exists so that lint policy is **authored once and consumed many times**. Consumer projects do not assemble their own rule baseline; they install the package, re-export its config array, and inherit every rule, severity, and file-scope decision made here.

Two surfaces share this repository:

| Surface                        | Consumed by                          | Entry point                                                                                                                                                                                                                                                                                             |
| :----------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The published packages         | Any JavaScript or TypeScript project | [`packages/eslint-config-yarapa/src/index.ts`](../packages/eslint-config-yarapa/src/index.ts), [`packages/prettier-config-yarapa/src/index.ts`](../packages/prettier-config-yarapa/src/index.ts), [`packages/commitlint-config-yarapa/src/index.ts`](../packages/commitlint-config-yarapa/src/index.ts) |
| The repository's own toolchain | Contributors to this repository      | [`AGENTS.md`](../AGENTS.md), [`.claude/rules/`](../.claude/rules/)                                                                                                                                                                                                                                      |

The repository lints itself with the package it publishes. Root [`eslint.config.ts`](../eslint.config.ts) imports the built `dist/index.mjs`, so a policy change lands on contributors before it lands on consumers.

---

## 2. Who Consumes It

- **Application repositories** that need one baseline spanning JavaScript, TypeScript, Node.js, browser, and test files without per-project rule negotiation.
- **Regulated and mission-critical codebases**, where a changed diagnostic is an auditable event rather than a developer preference.
- **This repository**, which dogfoods the preset and therefore cannot ship a policy it violates.

Consumer-facing installation, composition recipes, and editor setup live in the [package README](../packages/eslint-config-yarapa/README.md). This document covers the repository; that one covers adoption.

---

## 3. Design Stance

Five commitments shape every decision. Where a commitment is enforceable as a rule, [`.claude/rules/`](../.claude/rules/) owns that enforcement and [`AGENTS.md`](../AGENTS.md) indexes the files by the paths each governs:

| Commitment                   | Consequence for consumers                                                                |
| :--------------------------- | :--------------------------------------------------------------------------------------- |
| **Static and deterministic** | The same array evaluates identically on a laptop, a container, and CI.                   |
| **Type-aware first**         | Diagnostics use real TypeScript semantics via `projectService`, not heuristics.          |
| **Governed suppression**     | Targeted ESLint suppressions require justification, while stale directives fail linting. |
| **Strict export boundaries** | One public entrypoint. Internals are not addressable and cannot become de-facto API.     |
| **Modular encapsulation**    | Each capability owns its plugin, rules, and globs in one slice.                          |

These are invariants, not guidelines. A commitment that is inconvenient is still binding; the rule file names what it forbids and how compliance is verified.

---

## 4. What Makes It Different

Most shared ESLint configs are a list of rule names with severities. This preset additionally fixes three things that are usually left to each project:

- **Formatting ownership.** `.prettierrc.json` consumes [`@yarapa/prettier-config-yarapa`](../packages/prettier-config-yarapa/README.md), mirroring the `@stylistic/eslint-plugin` layout options — 2-space indent, double quotes, semicolons, trailing commas, 100-column lines, `arrowParens: "avoid"` — so the two formatters agree instead of contesting the same files. Editor defaults route code files to the ESLint formatter and Markdown/JSON to Prettier. Consumer-side Prettier setup is owned by the [package README](../packages/eslint-config-yarapa/README.md).
- **Sort order determinism.** `eslint-plugin-perfectionist` sorts imports, object keys, types, and interfaces, so ordering never appears in a diff and never becomes review discussion.

---

## 5. Requirements

Runtime and ESLint peer boundaries are declared once, in [`packages/eslint-config-yarapa/package.json`](../packages/eslint-config-yarapa/package.json), and are the single source of truth:

| Tool       | Range            | Owner              |
| :--------- | :--------------- | :----------------- |
| Node.js    | `>=24.15.0 <25`  | `engines.node`     |
| ESLint     | `^10.4.0`        | `peerDependencies` |
| TypeScript | `>=5.0.0 <6.1.0` | `peerDependencies` |

Repository development pins the Node engine in [`.nvmrc`](../.nvmrc) and the pnpm version in root `package.json#packageManager`.

---

## 6. Where to Go Next

| Question                                                          | Document                                                     |
| :---------------------------------------------------------------- | :----------------------------------------------------------- |
| How is the repository laid out, and why does config order matter? | [`architecture.md`](architecture.md)                         |
| How do I install and compose the preset in my project?            | [Package README](../packages/eslint-config-yarapa/README.md) |
| What invariant applies to the file I am editing?                  | [`AGENTS.md`](../AGENTS.md) rule table                       |
| What commands exist, and which may an agent run?                  | [`AGENTS.md`](../AGENTS.md)                                  |
| How do I contribute or open a pull request?                       | [`CONTRIBUTING.md`](../CONTRIBUTING.md)                      |
