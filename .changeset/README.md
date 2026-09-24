# Changesets

A changeset records the package to release, the semver bump, and the changelog message.

For a package change, create `.changeset/<unique-name>.md` directly on disk without running the interactive CLI. The example below changes the ESLint package:

```md
---
"@yarapa/eslint-config-yarapa": major
---

Enable additional core JavaScript rules.

Migration: run `pnpm lint --fix`, then address the remaining reports in source.
```

1. Name the package and the semver bump in the frontmatter, selecting `patch`, `minor`, or `major` according to that package's policy: [ESLint](../packages/eslint-config-yarapa/README.md#versioning-policy), [Prettier](../packages/prettier-config-yarapa/README.md#versioning), or [Commitlint](../packages/commitlint-config-yarapa/README.md#versioning).
2. Describe what changed, why it changed, and how consumers should update.
3. For ESLint changes, state affected rule names, severity changes, and targeted file patterns. For other packages, describe the externally visible configuration or validation behavior that changed.
4. Commit the `.changeset/*.md` file.

For a change with no package release impact, run:

```sh
pnpm changeset --empty
```

See the package-specific versioning policy linked above and the [official Changesets guide](https://changesets.dev/faq#how-do-i-add-a-changeset).
