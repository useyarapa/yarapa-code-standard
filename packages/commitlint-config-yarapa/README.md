# @yarapa/commitlint-config-yarapa

[![npm version](https://img.shields.io/npm/v/%40yarapa%2Fcommitlint-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/commitlint-config-yarapa)
[![npm downloads](https://img.shields.io/npm/dm/%40yarapa%2Fcommitlint-config-yarapa.svg)](https://www.npmjs.com/package/@yarapa/commitlint-config-yarapa)
[![codecov](https://codecov.io/gh/useyarapa/yarapa-code-standard/graph/badge.svg)](https://codecov.io/gh/useyarapa/yarapa-code-standard)
[![node version](https://img.shields.io/badge/node-%3E%3D24.15.0%20%3C25-brightgreen.svg)](https://nodejs.org)
[![license](https://img.shields.io/github/license/useyarapa/yarapa-code-standard.svg)](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE)

Deterministic Commitlint configuration for YARAPA projects.

The package is ESM-only. It exports a static configuration enforcing Conventional Commits with mandatory lower-case scopes, 50-character subject ceilings, and body/footer bans.

---

## Install

```sh
# pnpm
pnpm add -D @commitlint/cli @yarapa/commitlint-config-yarapa

# npm
npm install --save-dev @commitlint/cli @yarapa/commitlint-config-yarapa

# yarn
yarn add -D @commitlint/cli @yarapa/commitlint-config-yarapa

# bun
bun add -d @commitlint/cli @yarapa/commitlint-config-yarapa
```

### Runtime and Peer Requirements

| Tool            | Supported range | Why it is required              |
| :-------------- | :-------------- | :------------------------------ |
| Node.js         | `>=24.15.0 <25` | Enforced through `engines.node` |
| @commitlint/cli | `>=19.0.0`      | Runs commit-msg hook validation |

---

## Use

### In `.commitlintrc.json` (recommended)

Add the `extends` field directly in your `.commitlintrc.json`:

```json
{
  "extends": ["@yarapa/commitlint-config-yarapa"]
}
```

### In `commitlint.config.mjs`

Re-export the configuration object:

```js
import yarapaCommitlint from "@yarapa/commitlint-config-yarapa";

export default yarapaCommitlint;
```

---

## Scripts

Add commit validation scripts to `package.json`:

```json
{
  "scripts": {
    "commitlint": "commitlint --edit"
  }
}
```

---

## Enforced Rules

The exported configuration defines these rules matching YARAPA engineering standards:

| Rule                       | Severity | Value                                                                                            | Description                                              |
| :------------------------- | :------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `body-empty`               | `error`  | `always`                                                                                         | Prohibits commit message body                            |
| `footer-empty`             | `error`  | `always`                                                                                         | Prohibits commit message footer                          |
| `scope-case`               | `error`  | `lower-case`                                                                                     | Scope must be lowercase                                  |
| `scope-empty`              | `error`  | `never`                                                                                          | Scope is strictly mandatory                              |
| `subject-empty`            | `error`  | `never`                                                                                          | Subject line cannot be empty                             |
| `subject-exclamation-mark` | `error`  | `never`                                                                                          | Exclamation mark (`!`) breaking change syntax prohibited |
| `subject-max-length`       | `error`  | `50`                                                                                             | Subject ceiling capped at 50 characters                  |
| `type-case`                | `error`  | `lower-case`                                                                                     | Type must be lowercase                                   |
| `type-empty`               | `error`  | `never`                                                                                          | Type cannot be empty                                     |
| `type-enum`                | `error`  | `["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]` | Allowed commit types                                     |

---

## Versioning

The package follows [Semantic Versioning 2.0.0](https://semver.org/).

- **Major**: Any rule addition or severity change that makes commit acceptance stricter.
- **Minor**: Non-breaking rule relaxation or metadata extensions.
- **Patch**: Documentation and packaging fixes.

---

## License

[MIT](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE) © YARAPA
