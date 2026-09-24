# Yarapa Code Standard Documentation

Navigation index for the `docs/` branch of the documentation surface.

---

## Branch Triggers

Consult the document matching the active task branch.

| Branch trigger                                                              | Document                             | Scope                                                                                                                                                   |
| :-------------------------------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose, audience, product scope, design rationale, differentiators**     | [`overview.md`](overview.md)         | What this repository, `@yarapa/eslint-config-yarapa`, `@yarapa/prettier-config-yarapa`, and `@yarapa/commitlint-config-yarapa` are, and why they exist. |
| **Monorepo topology, config composition, evaluation order, build pipeline** | [`architecture.md`](architecture.md) | System structure, module boundaries, distribution integrity gates.                                                                                      |

---

## Adjacent Owners

Material outside `docs/` that answers a different branch. Read the owner rather than a copy.

| Branch trigger                                                     | Owner                                                                                                                                                                                                                                                                                 |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Consumer install, composition recipes, IDE setup**               | [`packages/eslint-config-yarapa/README.md`](../packages/eslint-config-yarapa/README.md), [`packages/prettier-config-yarapa/README.md`](../packages/prettier-config-yarapa/README.md), [`packages/commitlint-config-yarapa/README.md`](../packages/commitlint-config-yarapa/README.md) |
| **Repository invariants (suppression, dead code, exports, tests)** | [`.claude/rules/`](../.claude/rules/) — indexed in [`AGENTS.md`](../AGENTS.md)                                                                                                                                                                                                        |
| **Commands, toolchain, agent authority**                           | [`AGENTS.md`](../AGENTS.md)                                                                                                                                                                                                                                                           |
| **Contributor workflow, pull requests, release intent**            | [`CONTRIBUTING.md`](../CONTRIBUTING.md), [`.changeset/README.md`](../.changeset/README.md)                                                                                                                                                                                            |
| **Governance, security policy, conduct**                           | [`SECURITY.md`](../SECURITY.md), [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md)                                                                                                                                                                                                        |
