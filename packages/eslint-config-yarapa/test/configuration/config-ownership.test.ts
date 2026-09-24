import {describe, expect, it} from "vitest";
import path from "node:path";

import {packageRoot} from "../helpers";

import {reportedRules} from "./config.helper";

const untypedFixture = path.resolve(packageRoot, "fixtures/projects/untyped/index.js");

describe("rule ownership and runtime boundaries", () => {
  it("keeps unused code concerns on the unused-imports canonical owner", async () => {
    const rules = await reportedRules("const unused = 1;\n", untypedFixture);

    expect(rules).toContain("unused-imports/no-unused-vars");
    expect(rules).not.toContain("no-unused-vars");
    expect(rules).not.toContain("@typescript-eslint/no-unused-vars");
  });

  it("keeps modern JavaScript concerns off the sonarjs owner", async () => {
    const rules = await reportedRules("export const items = new Array(1, 2);\n", untypedFixture);

    expect(rules).toContain("no-array-constructor");
    expect(rules).not.toContain("sonarjs/array-constructor");
  });

  it("provides both Node and browser runtime globals through the unified config", async () => {
    const unknownRules = await reportedRules(
      "export const missing = unknownRuntime;\n",
      untypedFixture,
    );

    expect(unknownRules).toContain("no-undef");

    const nodeRules = await reportedRules(
      'export const encoded = Buffer.from("value").toString("base64");\n',
      untypedFixture,
    );

    expect(nodeRules).not.toContain("no-undef");

    const browserRules = await reportedRules(
      'export const found = document.querySelector("main");\n',
      untypedFixture,
    );

    expect(browserRules).not.toContain("no-undef");
  });
});
