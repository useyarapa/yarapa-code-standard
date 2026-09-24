import {assert, describe, expect, it} from "vitest";
import path from "node:path";

import {packageRoot} from "../helpers";

import {eslint} from "./behavior.helper";

const RESTRICTED_SYNTAX = "no-restricted-syntax";

describe("syntax and colocation behavior", () => {
  it("reports implementation declarations in barrel index files", async () => {
    const [result] = await eslint.lintText("export const helper = (): number => 42;\n", {
      filePath: path.resolve(packageRoot, "src/index.ts"),
    });

    assert(result);

    const restricted = result.messages.find(message => message.ruleId === RESTRICTED_SYNTAX);

    expect(restricted?.message).toContain("Barrel index files");
  });

  it("accepts pure re-exports in barrel index files", async () => {
    const [result] = await eslint.lintText('export { valid } from "./valid";\n', {
      filePath: path.resolve(packageRoot, "src/index.ts"),
    });

    assert(result);
    expect(result.messages.map(message => message.ruleId)).not.toContain(RESTRICTED_SYNTAX);
  });

  it("reports plain JavaScript files outside fixtures", async () => {
    const [result] = await eslint.lintText("export const value = 1;\n", {
      filePath: path.resolve(packageRoot, "src/plain.js"),
    });

    assert(result);

    const restricted = result.messages.find(message => message.ruleId === RESTRICTED_SYNTAX);

    expect(restricted?.message).toContain("Plain JavaScript files");
  });

  it.each([
    {
      name: "type declarations",
      source: "export type Contract = { name: string };\n",
    },
    {
      name: "standalone helper functions",
      source: "function helper(): boolean { return true; }\nvoid helper();\n",
    },
  ])("reports inline $name in implementation files", async ({source}) => {
    const [result] = await eslint.lintText(source, {
      filePath: path.resolve(packageRoot, "src/configs/base/base.ts"),
    });

    assert(result);

    const restricted = result.messages.find(message => message.ruleId === RESTRICTED_SYNTAX);

    expect(restricted).toBeDefined();
  });

  it("permits colocation in sibling type and helper files", async () => {
    const [typeResult] = await eslint.lintText("export type Contract = { name: string };\n", {
      filePath: path.resolve(packageRoot, "test/behavior/behavior.type.ts"),
    });

    expect(typeResult?.messages.map(message => message.ruleId)).not.toContain(RESTRICTED_SYNTAX);

    const [helperResult] = await eslint.lintText(
      "export function helper(): boolean { return true; }\n",
      {
        filePath: path.resolve(packageRoot, "test/behavior/behavior.helper.ts"),
      },
    );

    const helperRuleIds = helperResult?.messages.map(message => message.ruleId);

    expect(helperRuleIds).not.toContain(RESTRICTED_SYNTAX);
  });
});
