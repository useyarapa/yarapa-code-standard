# @yarapa/prettier-config-yarapa

[![npm version](https://img.shields.io/npm/v/%40yarapa%2Fprettier-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/prettier-config-yarapa)
[![npm downloads](https://img.shields.io/npm/dm/%40yarapa%2Fprettier-config-yarapa.svg)](https://www.npmjs.com/package/@yarapa/prettier-config-yarapa)
[![node version](https://img.shields.io/badge/node-%3E%3D24.15.0%20%3C25-brightgreen.svg)](https://nodejs.org)
[![license](https://img.shields.io/github/license/useyarapa/yarapa-code-standard.svg)](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE)

Deterministic Prettier configuration for YARAPA projects.

The package is ESM-only. It exports a static configuration object matching the layout rules of `@yarapa/eslint-config-yarapa`.

---

## Install

```sh
# pnpm
pnpm add -D prettier @yarapa/prettier-config-yarapa

# npm
npm install --save-dev prettier @yarapa/prettier-config-yarapa

# yarn
yarn add -D prettier @yarapa/prettier-config-yarapa

# bun
bun add -d prettier @yarapa/prettier-config-yarapa
```

### Runtime and Peer Requirements

| Tool     | Supported range  | Why it is required                |
| :------- | :--------------- | :-------------------------------- |
| Node.js  | `>=24.15.0 <25`  | Enforced through `engines.node`   |
| Prettier | `>=3.0.0 <4.0.0` | Targets Prettier v3 configuration |

---

## Use

### In `package.json` (recommended)

Add the `prettier` field directly in your `package.json`:

```json
{
  "prettier": "@yarapa/prettier-config-yarapa"
}
```

### In `.prettierrc.json`

Reference the package name as a bare string:

```json
"@yarapa/prettier-config-yarapa"
```

### In `prettier.config.mjs`

Re-export the configuration object:

```js
import yarapaPrettier from "@yarapa/prettier-config-yarapa";

export default yarapaPrettier;
```

---

## Scripts

Add format scripts to `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write --cache .",
    "format:check": "prettier --check --cache ."
  }
}
```

Run formatting:

```sh
# pnpm
pnpm format

# npm
npm run format

# yarn
yarn format

# bun
bun run format
```

---

## Alignment with ESLint

This configuration is designed to work seamlessly alongside [`@yarapa/eslint-config-yarapa`](../eslint-config-yarapa).

`@yarapa/eslint-config-yarapa` deliberately avoids enforcing indentation, quote style, or semicolons in ESLint core rules to prevent conflicts with formatters, while enforcing statement padding and AST hygiene via `@stylistic`. Prettier owns layout formatting:

- **Indent**: 2 spaces (`useTabs: false`, `tabWidth: 2`)
- **Quotes**: Double quotes for JS/TS and JSX (`singleQuote: false`, `jsxSingleQuote: false`)
- **Semicolons**: Always required (`semi: true`)
- **Trailing commas**: Everywhere valid (`trailingComma: "all"`)
- **Print width**: 100 characters (`printWidth: 100`)
- **Bracket spacing**: No interior spaces (`bracketSpacing: false`)

Because both configurations share identical invariants, running `eslint --fix` followed by `prettier --write` is completely idempotent.

---

## Editor setup

### VS Code

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), then configure `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

When using alongside `@yarapa/eslint-config-yarapa`, ESLint handles JS/TS linting and structural fixes, while Prettier formats all other repository assets (Markdown, JSON, YAML, CSS, HTML).

---

## Options

The exported configuration defines these 11 options:

| Option            | Value     | Description                                           |
| :---------------- | :-------- | :---------------------------------------------------- |
| `arrowParens`     | `"avoid"` | Avoid parentheses around sole arrow-function argument |
| `bracketSameLine` | `false`   | Put `>` of multi-line elements on a new line          |
| `bracketSpacing`  | `false`   | No spaces inside object literal brackets              |
| `endOfLine`       | `"auto"`  | Preserve existing line endings                        |
| `jsxSingleQuote`  | `false`   | Double quotes in JSX attributes                       |
| `printWidth`      | `100`     | Line wrap width limit                                 |
| `semi`            | `true`    | Print semicolons at the ends of statements            |
| `singleQuote`     | `false`   | Double quotes for string literals                     |
| `tabWidth`        | `2`       | Number of spaces per indentation level                |
| `trailingComma`   | `"all"`   | Trailing commas wherever valid (including functions)  |
| `useTabs`         | `false`   | Indent lines with spaces                              |

---

## Versioning

The package follows [Semantic Versioning 2.0.0](https://semver.org/).

- **Major**: Any formatting option change that alters code output.
- **Minor**: Non-breaking additions or metadata extensions.
- **Patch**: Documentation and packaging fixes.

---

## License

[MIT](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE) © YARAPA
