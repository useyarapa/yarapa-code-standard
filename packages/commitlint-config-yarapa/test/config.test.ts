import {describe, expect, it} from "vitest";
import lint from "@commitlint/lint";
import type {QualifiedRules} from "@commitlint/types";

import config from "../src/index.ts";

describe("commitlint-config-yarapa", () => {
  const rules = config.rules as QualifiedRules;

  it("passes for a valid conventional commit with scope and short subject", async () => {
    const result = await lint("feat(api): add auth endpoint", rules);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it.each([
    {
      commit: "feat: add auth endpoint",
      description: "fails when scope is empty",
      expectedRule: "scope-empty",
    },
    {
      commit: "feat(API): add auth endpoint",
      description: "fails when scope is upper-case",
      expectedRule: "scope-case",
    },
    {
      commit: "unknown(api): add auth endpoint",
      description: "fails when type is unknown",
      expectedRule: "type-enum",
    },
    {
      commit: `feat(api): ${"a".repeat(51)}`,
      description: "fails when subject length exceeds 50 characters",
      expectedRule: "subject-max-length",
    },
    {
      commit: "feat(api): add auth endpoint\n\nThis is a body",
      description: "fails when commit has a non-empty body",
      expectedRule: "body-empty",
    },
    {
      commit: "feat(api): add auth endpoint\n\nBREAKING CHANGE: details",
      description: "fails when commit has a non-empty footer",
      expectedRule: "footer-empty",
    },
  ])("$description", async ({commit, expectedRule}) => {
    const result = await lint(commit, rules);

    expect(result.valid).toBe(false);
    expect(result.errors.some(error => error.name === expectedRule)).toBe(true);
  });
});
