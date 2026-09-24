---
paths:
  - "**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"
---

# Current State Authority Rules

Implementation decisions derive from the current specification. Git history serves investigation, not implementation.

## Decision Inputs

- Read the current requirements, tests and contracts, working tree, and upstream documentation before deciding how to implement.
- Treat deleted or replaced implementation as gone; implement the current requirement instead.
- Reason forward from the specification when refactoring or rewriting.

## Git Inspection Boundary

- Inspect Git history when the task requires it: bisecting a regression, attributing a change, or recovering a deleted artifact.
- Treat `HEAD` as a moving target; a read after a commit returns that commit's state, not the revision the task meant to compare against.
- Pair every historical finding with the current working tree, and name the revision consulted.

## Verification

- Confirm every implementation decision traces to a requirement, test, contract, working-tree state, or upstream document.
- Confirm any Git inspection was required by the task, and its revision was stated.
