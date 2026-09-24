# Yarapa Code Standard

[![Verify workflow status](https://github.com/useyarapa/yarapa-code-standard/actions/workflows/ci.yml/badge.svg)](https://github.com/useyarapa/yarapa-code-standard/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/useyarapa/yarapa-code-standard/graph/badge.svg)](https://codecov.io/gh/useyarapa/yarapa-code-standard)
[![ESLint config version](https://img.shields.io/npm/v/%40yarapa%2Feslint-config-yarapa.svg?color=cb3837&label=eslint-config)](https://www.npmjs.com/package/@yarapa/eslint-config-yarapa)
[![Prettier config version](https://img.shields.io/npm/v/%40yarapa%2Fprettier-config-yarapa.svg?color=cb3837&label=prettier-config)](https://www.npmjs.com/package/@yarapa/prettier-config-yarapa)
[![Commitlint config version](https://img.shields.io/npm/v/%40yarapa%2Fcommitlint-config-yarapa.svg?color=cb3837&label=commitlint-config)](https://www.npmjs.com/package/@yarapa/commitlint-config-yarapa)
[![node version](https://img.shields.io/badge/node-%3E%3D24.15.0%20%3C25-brightgreen.svg)](https://nodejs.org)
[![license](https://img.shields.io/github/license/useyarapa/yarapa-code-standard.svg)](LICENSE)

Three shared configuration packages standardize code linting, formatting, and commit messages across Yarapa projects. Policy is authored here once and inherited everywhere else, so a change is one reviewable diff instead of a negotiation per repository.

This repository is also a pnpm workspace that lints itself with the packages it publishes, which means it cannot ship a policy it violates.

---

## Packages

| Package                                                                 | Version                                                                                                                                                      | Description                                                                  |
| :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| [`@yarapa/eslint-config-yarapa`](packages/eslint-config-yarapa)         | [![npm](https://img.shields.io/npm/v/%40yarapa%2Feslint-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/eslint-config-yarapa)         | Strict, type-aware ESLint Flat Config for JS, TS, Node.js, and data formats. |
| [`@yarapa/prettier-config-yarapa`](packages/prettier-config-yarapa)     | [![npm](https://img.shields.io/npm/v/%40yarapa%2Fprettier-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/prettier-config-yarapa)     | Deterministic Prettier configuration matching the standard layout rules.     |
| [`@yarapa/commitlint-config-yarapa`](packages/commitlint-config-yarapa) | [![npm](https://img.shields.io/npm/v/%40yarapa%2Fcommitlint-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/commitlint-config-yarapa) | Deterministic Commitlint configuration for conventional commits.             |

---

## Quick start

### Full setup (ESLint + Prettier)

Install dependencies:

```sh
# pnpm
pnpm add -D eslint prettier typescript @yarapa/eslint-config-yarapa @yarapa/prettier-config-yarapa

# npm
npm install --save-dev eslint prettier typescript @yarapa/eslint-config-yarapa @yarapa/prettier-config-yarapa

# yarn
yarn add -D eslint prettier typescript @yarapa/eslint-config-yarapa @yarapa/prettier-config-yarapa

# bun
bun add -d eslint prettier typescript @yarapa/eslint-config-yarapa @yarapa/prettier-config-yarapa
```

Configure `eslint.config.mjs` (or `eslint.config.ts`):

```js
import yarapa from "@yarapa/eslint-config-yarapa";

export default yarapa;
```

Configure Prettier in `package.json` (or as a bare string in `.prettierrc.json`):

```json
{
  "prettier": "@yarapa/prettier-config-yarapa"
}
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings=0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write --cache .",
    "format:check": "prettier --check --cache ."
  }
}
```

Full adoption guides — composition recipes, editor setup, troubleshooting — are in the [ESLint package README](packages/eslint-config-yarapa/README.md) and [Prettier package README](packages/prettier-config-yarapa/README.md).

---

## What the standard enforces

Four decisions are the reason this exists, and each one is visible in your first lint run:

- **Same result everywhere.** The config exports a plain array of static objects. No environment detection, no conditional rules, no per-machine drift between a laptop, a container, and CI.
- **Real type information.** Rules run through TypeScript's `projectService`, so they reason about your actual types instead of guessing from syntax.
- **Governed suppressions.** Targeted `eslint-disable` directives are allowed when they are justified and described; stale directives are errors. TypeScript suppression directives are governed separately.
- **One profile, not a menu.** JavaScript, TypeScript, Node.js, browser, and test files are all covered out of the box. You do not assemble a baseline from optional plugins.

Which plugin covers which file type is listed in the [package README](packages/eslint-config-yarapa/README.md#what-the-preset-covers).

---

## Repository layout

```text
packages/eslint-config-yarapa/    The ESLint Flat Config package
  src/                            All behavior lives here
  test/                           Unit, fixture, and behavior tests
  dist/                           Generated by tsdown. Never edited.
packages/prettier-config-yarapa/  The Prettier config package
  src/                            Prettier options live here
  dist/                           Generated by tsdown. Never edited.
packages/commitlint-config-yarapa/ The Commitlint config package
  src/                            Commitlint configuration lives here
  test/                           Behavior tests
  dist/                           Generated by tsdown. Never edited.
eslint.config.ts                  Root lint config; consumes the built package
docs/                             Architecture and governance documentation
.claude/rules/                    Repository invariants, scoped by file path
```

Working on this repository rather than consuming it? Start with the [Contributing Guidelines](CONTRIBUTING.md) for prerequisites and pull request requirements. Verification runs through Git hooks (`.husky/pre-commit`, `.husky/pre-push`) and CI; you do not need to run those checks by hand.

---

## Documentation

The [documentation index](docs/index.md) routes each question to the document that owns it. In short:

| Question                                          | Read                                                                                                                                   |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| What is this, and why does it exist?              | [`docs/overview.md`](docs/overview.md)                                                                                                 |
| How is it built and why does config order matter? | [`docs/architecture.md`](docs/architecture.md)                                                                                         |
| How do I use it in my project?                    | [ESLint Package README](packages/eslint-config-yarapa/README.md), [Prettier Package README](packages/prettier-config-yarapa/README.md) |
| How do I contribute?                              | [CONTRIBUTING.md](CONTRIBUTING.md)                                                                                                     |
| What rules apply to the file I am editing?        | [AGENTS.md](AGENTS.md)                                                                                                                 |

---

## Governance & Security

- [Code of Conduct](CODE_OF_CONDUCT.md) — Contributor Covenant v2.1.
- [Security Policy](SECURITY.md) — how to report a vulnerability and what response to expect.

---

## License

[MIT](LICENSE) © Yarapa
