---
paths:
  - "**/package.json"
  - "**/pnpm-lock.yaml"
---

# Dependency Security Rules

Enforce supply-chain review, dependency vetting, lifecycle management, and deterministic lockfile integrity for the banking baseline.

## Dependency Screening and Lifecycle

- Evaluate maintenance status, release cadence, license, and security advisory history before introducing a dependency.
- Prefer native platform capabilities and existing lockfile dependencies over new external packages.
- Add a dependency only when active code, tests, build tooling, or a documented public contract uses it.
- Remove a dependency when its last consumer is removed.
- Keep runtime dependencies, development dependencies, optional dependencies, and peer dependencies in the manifest section that matches their actual role.
- Use reputable, actively maintained ESLint plugins with compatible upstream support.
- Reject dependencies with unmaintained transitive trees, unresolved peer dependency warnings, or unverified binary postinstall scripts.

## Lockfile and Versions

- Pin exact versions for build tooling and linting utilities when deterministic execution requires them.
- Maintain `pnpm-lock.yaml` as the authoritative resolution record.
- Bound peer dependencies with ranges validated against supported runtimes.
- Keep package manifests free of speculative, unused, and duplicate dependencies.

## Vulnerability Policy

- Keep `pnpm audit` available for explicitly requested local investigation; it is not an implicit agent requirement.

## Verification

- Inspect manifest and lockfile diffs for unauthorized packages, broad version ranges, or unconsumed dependencies.
- Treat findings from requested audits and Knip as defects to resolve rather than suppress.
