# Contributing to Yarapa Code Standard

Thank you for contributing to Yarapa Code Standard.

This pnpm workspace publishes `@yarapa/eslint-config-yarapa` under `packages/eslint-config-yarapa/`, `@yarapa/prettier-config-yarapa` under `packages/prettier-config-yarapa/`, and `@yarapa/commitlint-config-yarapa` under `packages/commitlint-config-yarapa/`.

## Code of Conduct

Review and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Prerequisites

- Node.js matching `.nvmrc` (active LTS: `>=24.15.0 <25`)
- pnpm matching root `package.json#packageManager` via Corepack
- TypeScript: Roles differ across root tooling (`7.0.2`), package compiler (`6.0.3`), and consumer peer contracts (`>=5.0.0 <6.1.0`); see [TypeScript Version Roles](docs/architecture.md#6-typescript-version-roles-and-ownership).

Install dependencies from the repository root:

```sh
pnpm install
```

## Quality Standards

- Resolve lint, type, test, and formatting failures at their root cause rather than adding inline suppression directives.
- Keep exports, dependencies, and implementation live; remove dead code instead of retaining placeholders.
- Edit source under `packages/*/src/`, tests in each package's existing `test/` directory, and ESLint fixtures under `packages/eslint-config-yarapa/fixtures/`.
- Treat `packages/*/dist/` as generated output.

## Configured Checks

Human contributors can use these repository commands when needed:

- Repository lint: `pnpm lint`
- Package lint: `pnpm --filter @yarapa/eslint-config-yarapa lint`
- Type check: `pnpm typecheck`
- Unit and behavior tests: `pnpm test`
- Dead-code and dependency analysis: `pnpm knip`

Select checks that match the changed contract:

- Preset rules or options require configuration and observable diagnostic coverage.
- Documentation changes require reference, link, and formatting inspection.

Agent sessions follow the command authority in [`AGENTS.md`](AGENTS.md). Git hooks and CI own unrequested verification.

## Release Intent

Follow [`.changeset/README.md`](.changeset/README.md) for package release intent and no-release-impact changes.

## Pull Requests

- Keep each pull request focused on one change or cohesive feature.
- Describe the change and record checks that actually ran, including their results.
- Leave checks owned by Git hooks or CI unreported as local successes.
