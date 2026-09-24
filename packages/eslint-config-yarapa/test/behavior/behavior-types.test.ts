import {assert, describe, expect, it} from "vitest";
import path from "node:path";

import {packageRoot} from "../helpers";

import {eslint, projectRoot} from "./behavior.helper";

const RESTRICTED_SYNTAX = "no-restricted-syntax";
const CONTRACT_TYPE = "export type Contract = { name: string };\n";
const VALID_TS = "src/valid.ts";
const CONSISTENT_TYPE_ASSERTIONS_RULE = "@typescript-eslint/consistent-type-assertions";

describe("type-aware and test restriction behavior", () => {
  it("accepts a typed project source file", async () => {
    const [result] = await eslint.lintFiles(path.resolve(projectRoot, VALID_TS));

    assert(result);
    expect(result.messages).toEqual([]);
  });

  it("allows as-style type assertions", async () => {
    const [result] = await eslint.lintText(
      "declare const input: unknown;\nexport const value = input as string;\n",
      {filePath: path.resolve(projectRoot, VALID_TS)},
    );

    assert(result);

    expect(result.messages.map(message => message.ruleId)).not.toContain(
      CONSISTENT_TYPE_ASSERTIONS_RULE,
    );
  });

  it("reports angle-bracket type assertions", async () => {
    const [result] = await eslint.lintText(
      "declare const input: unknown;\nexport const value = <string>input;\n",
      {filePath: path.resolve(projectRoot, VALID_TS)},
    );

    assert(result);

    expect(result.messages.map(message => message.ruleId)).toContain(
      CONSISTENT_TYPE_ASSERTIONS_RULE,
    );
  });

  it("reports a floating promise with type information", async () => {
    const [result] = await eslint.lintFiles(path.resolve(projectRoot, "src/invalid.ts"));

    assert(result);

    expect(result.messages.map(message => message.ruleId)).toContain(
      "@typescript-eslint/no-floating-promises",
    );
  });

  it("permits empty interfaces in declaration files but reports in source", async () => {
    const declarationSource = "export interface Marker {}\n";

    const [dtsResult] = await eslint.lintText(declarationSource, {
      filePath: path.resolve(projectRoot, "src/types.d.ts"),
    });

    assert(dtsResult);

    const dtsRuleIds = dtsResult.messages.map(message => message.ruleId);

    expect(dtsRuleIds).not.toContain("@typescript-eslint/no-empty-object-type");

    const source = "export interface Marker {}\n";

    const [tsResult] = await eslint.lintText(source, {
      filePath: path.resolve(projectRoot, VALID_TS),
    });

    assert(tsResult);

    expect(tsResult.messages.map(message => message.ruleId)).toContain(
      "@typescript-eslint/no-empty-object-type",
    );
  });

  it.each([
    {
      name: "type aliases",
      source: CONTRACT_TYPE,
    },
    {
      name: "interfaces",
      source: "export interface Contract { name: string }\n",
    },
  ])("moves $name out of test files", async ({source}) => {
    const [result] = await eslint.lintText(source, {
      filePath: path.resolve(packageRoot, "test/public-api/public-api-contract.test.ts"),
    });

    assert(result);

    const restricted = result.messages.find(message => message.ruleId === RESTRICTED_SYNTAX);

    expect(restricted?.message).toContain("sibling .type.ts file");
  });

  it("moves helper functions out of test files", async () => {
    const [result] = await eslint.lintText(
      "function helper(): boolean { return true; }\nvoid helper();\n",
      {
        filePath: path.resolve(packageRoot, "test/behavior/behavior-test-policy.test.ts"),
      },
    );

    assert(result);

    const restricted = result.messages.find(message => message.ruleId === RESTRICTED_SYNTAX);

    expect(restricted?.message).toContain("sibling .helper.ts file");
  });
});
