# @yarapa/eslint-config-yarapa

[![npm version](https://img.shields.io/npm/v/%40yarapa%2Feslint-config-yarapa.svg?color=cb3837)](https://www.npmjs.com/package/@yarapa/eslint-config-yarapa)
[![npm downloads](https://img.shields.io/npm/dm/%40yarapa%2Feslint-config-yarapa.svg)](https://www.npmjs.com/package/@yarapa/eslint-config-yarapa)
[![codecov](https://codecov.io/gh/useyarapa/yarapa-code-standard/graph/badge.svg)](https://codecov.io/gh/useyarapa/yarapa-code-standard)
[![node version](https://img.shields.io/badge/node-%3E%3D24.15.0%20%3C25-brightgreen.svg)](https://nodejs.org)
[![license](https://img.shields.io/github/license/useyarapa/yarapa-code-standard.svg)](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE)

A single ESLint Flat Config array that lints JavaScript, TypeScript, Node.js, browser, tests, JSON, YAML, TOML, and package manifests, and formats HTML and stylesheet files through Prettier. Install it, re-export it, done — there is no baseline to assemble and no options to configure.

The package is ESM-only. It exports a static array, so the same config produces the same diagnostics on your machine, in a container, and in CI.

---

## Install

```sh
# pnpm
pnpm add -D eslint @yarapa/eslint-config-yarapa typescript

# npm
npm install --save-dev eslint @yarapa/eslint-config-yarapa typescript

# yarn
yarn add -D eslint @yarapa/eslint-config-yarapa typescript

# bun
bun add -d eslint @yarapa/eslint-config-yarapa typescript
```

Required runtime and peer tools:

| Tool       | Supported range  | Why it is required                                            |
| :--------- | :--------------- | :------------------------------------------------------------ |
| Node.js    | `>=24.15.0 <25`  | Enforced through `engines.node` (current LTS line)            |
| ESLint     | `^10.4.0`        | The config targets Flat Config only; no legacy `.eslintrc`    |
| TypeScript | `>=5.0.0 <6.1.0` | Type-aware rules need your source and `tsconfig.json` present |

These ranges are the complete support contract. CI verifies the specific Node.js and ESLint combinations in its compatibility matrix; it does not test every version combination in these ranges. The matrix does not test the TypeScript lower bound (`5.0.0`). Versions outside the declared ranges are unsupported until verified in CI — see [Support policy](#support-policy).

---

## Quick start

Create `eslint.config.mjs` (or `eslint.config.ts`) in your project root:

```js
// eslint.config.mjs
import yarapa from "@yarapa/eslint-config-yarapa";

export default yarapa;
```

```ts
// eslint.config.ts
import yarapa from "@yarapa/eslint-config-yarapa";

export default yarapa;
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings=0",
    "lint:fix": "eslint . --fix"
  }
}
```

Run linting across your project:

```sh
# pnpm
pnpm lint

# npm
npm run lint

# yarn
yarn lint

# bun
bun run lint
```

That is the whole setup. The rest of this document covers what the preset enforces, how to add your own rules, and what counts as a breaking change.

---

## What the preset covers

Each capability applies to its own file patterns and is owned by dedicated plugins, all enabled by default:

| Capability                    | Target file patterns                | Owning plugins                                                                          |
| :---------------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------- |
| **JavaScript**                | `**/*.{js,jsx,mjs,cjs}`             | ESLint core, `eslint-plugin-unicorn`                                                    |
| **TypeScript**                | `**/*.{ts,tsx,mts,cts}`             | `typescript-eslint` with `projectService` (type-aware)                                  |
| **Node.js**                   | JS and TS files                     | `eslint-plugin-n`, Node.js globals                                                      |
| **Browser**                   | JS and TS files                     | Browser globals                                                                         |
| **Tests**                     | `**/*.{test,spec}.{ts,tsx,mts,cts}` | `@vitest/eslint-plugin`                                                                 |
| **Code quality and security** | JS and TS files                     | `eslint-plugin-sonarjs`, `eslint-plugin-promise`, `eslint-plugin-regexp`                |
| **Imports and ordering**      | JS and TS files                     | `eslint-plugin-import-x`, `eslint-plugin-unused-imports`, `eslint-plugin-perfectionist` |
| **Documentation**             | JS and TS files                     | `eslint-plugin-jsdoc`                                                                   |
| **Directive governance**      | JS and TS files                     | `@eslint-community/eslint-plugin-eslint-comments`                                       |
| **Data files**                | `**/*.{json,json5,jsonc}`           | `eslint-plugin-jsonc`, `jsonc-eslint-parser`                                            |
| **YAML**                      | `**/*.{yaml,yml}`                   | `eslint-plugin-yml`, `yaml-eslint-parser`                                               |
| **TOML**                      | `**/*.toml`                         | `eslint-plugin-toml`, `toml-eslint-parser`                                              |
| **Package manifests**         | `**/package.json`                   | `eslint-plugin-package-json`                                                            |
| **Code layout**               | JS and TS files                     | `@stylistic/eslint-plugin`                                                              |
| **HTML formatting**           | `**/*.{html,htm}`                   | `eslint-plugin-format` with Prettier                                                    |
| **Stylesheet formatting**     | `**/*.{css,pcss,postcss,scss,less}` | `eslint-plugin-format` with Prettier                                                    |

Two behaviors are worth knowing before your first run:

- **Inline ESLint suppressions are governed.** Targeted `eslint-disable` directives are allowed, but they must stay scoped and carry a description.
- **Directive comments are reported as unused.** If a leftover directive stops matching anything, linting fails instead of leaving dead suppression behind. TypeScript suppression comments are governed separately by the TypeScript rules.

### Code layout and Prettier

`@stylistic/eslint-plugin` owns JavaScript and TypeScript layout: statement padding, spacing between class members, comment spacing, and JSX newlines. These autofix with `eslint . --fix`.

For JavaScript and TypeScript, indentation, quote style, and semicolons are deliberately **not** enforced by ESLint rules. YAML and TOML use dedicated lint rules, while HTML and stylesheet files are formatted through `eslint-plugin-format` with Prettier. Markdown remains outside the preset.

If Prettier also runs across your files, use [`@yarapa/prettier-config-yarapa`](../prettier-config-yarapa) so the two formatters agree instead of fighting over the same files:

```json
"@yarapa/prettier-config-yarapa"
```

---

## Adding your own rules

The package exports an ordinary array, so you extend it with ordinary JavaScript. Appended entries win over earlier ones.

### Excluding paths

```js
import yarapa from "@yarapa/eslint-config-yarapa";

export default [
  ...yarapa,
  {
    ignores: ["dist/", "build/", "coverage/", "*.generated.ts"],
  },
];
```

Use an `ignores` entry for generated, vendor, or other path-wide exclusions so the scope decision stays reviewable in one place. For a narrow source-level exception, a targeted and described `eslint-disable` directive is available.

### Appending rules

```js
import yarapa from "@yarapa/eslint-config-yarapa";

export default [
  ...yarapa,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-console": ["error", {allow: ["warn", "error"]}],
    },
  },
];
```

Be aware that adding rules can turn into a breaking change later if you come to depend on them; the preset's own severity changes are governed by the [versioning policy](#versioning-policy) below.

---

## Editor setup

### VS Code

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), then add `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "json",
    "jsonc"
  ],
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  }
}
```

This routes code files to the ESLint formatter. Leave Prettier as the default formatter for every other file type.

### JetBrains IDEs

1. Open **Settings / Preferences** (`Cmd+,` or `Ctrl+Alt+S`).
2. Go to **Languages & Frameworks** → **JavaScript** → **Code Quality Tools** → **ESLint**.
3. Select **Manual ESLint configuration**.
4. Point the ESLint package path at your local `node_modules/eslint`.
5. Enable **Run eslint --fix on save**.

### Neovim

With `nvim-lspconfig` and the `eslint` language server:

```lua
local lspconfig = require("lspconfig")

lspconfig.eslint.setup({
  on_attach = function(client, bufnr)
    vim.api.nvim_create_autocmd("BufWritePre", {
      buffer = bufnr,
      command = "EslintFixAll",
    })
  end,
})
```

---

## Inspecting the active rules

To browse every rule, severity, and plugin config in the browser:

```sh
pnpm dlx @eslint/config-inspector
```

---

## Troubleshooting

### TypeScript cannot locate your `tsconfig.json`

**Symptom**: ESLint reports that a file was not found in any project.

**Fix**: Run ESLint from the directory holding the controlling `tsconfig.json` — usually the repository root:

```sh
pnpm exec eslint .
```

If your `tsconfig.json` uses a non-standard name or a nested layout, make sure the file you are linting is matched by its `include` or `files` globs.

### A generated file or vendor directory keeps reporting diagnostics

**Symptom**: A path you cannot fix at the source produces lint errors.

**Fix**: Add the path to `ignores`, as shown in [Excluding paths](#excluding-paths).

**Why this is the supported route**: generated or vendor content is a path-level concern, so `ignores` keeps the exemption centralized instead of scattering file-local directives across code you do not own.

---

## Support policy

- **Only declared ranges are supported.** CI runs the specific Node.js and ESLint combinations listed in its compatibility matrix. Passing those entries does not mean CI tests every version combination in the ranges above; the TypeScript lower bound (`5.0.0`) is not currently in that matrix.
- **Removing support is a breaking change.** Dropping a version from inside an already-supported range requires a major bump under the versioning policy below.
- **Ranges are not widened speculatively.** The ranges define the package support contract; the compatibility matrix documents the combinations CI exercises.

---

## Versioning policy

What the preset reports to your build is the consumer contract, so it is versioned deliberately. The package follows [Semantic Versioning 2.0.0](https://semver.org/), with lint-policy changes classified as follows.

### Major — anything that can produce new diagnostics

- **New diagnostics**: enabling a rule that was previously off may flag existing code.
- **Severity escalation**: raising a rule from `off` to `error`, or `warn` to `error`.
- **Stricter options**: reconfiguring an existing rule to accept less.
- **Expanded scope**: widening file patterns, or removing an `ignores` entry so previously unlinted files are now checked.
- **Export changes**: removing, renaming, or incompatibly altering a public export.
- **Dropped support**: removing an already-supported Node.js, ESLint, or TypeScript version.

### Minor — changes that permit more, not less

- Disabling or loosening a rule, so code that previously failed now passes.
- Adding optional profiles, new non-breaking exports, or feature extensions.
- Adding verified support for a newer runtime or peer version without dropping an existing one.

### Patch — fixes with no new requirements

- Correcting a rule defect or working around an upstream false positive.
- Documentation, README, or specification corrections.
- Internal refactoring with identical observable behavior.
- Test, fixture, or CI changes that do not alter the published package.

Release notes state affected rule names, severity changes, and file patterns explicitly, and include migration guidance for every breaking change. They are written to stand alone, without reference to internal trackers or Git history.

---

## License

[MIT](https://github.com/useyarapa/yarapa-code-standard/blob/main/LICENSE) © YARAPA
