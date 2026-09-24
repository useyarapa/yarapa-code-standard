import {assert, describe, expect, it} from "vitest";
import path from "node:path";

import {packageRoot} from "../helpers";

import {eslint} from "./behavior.helper";

describe("data format behavior", () => {
  it("reports duplicate keys in JSON files", async () => {
    const source = '{\n  "name": "one",\n  "name": "two"\n}\n';

    const [result] = await eslint.lintText(source, {
      filePath: path.resolve(packageRoot, "fixtures/sample.json"),
    });

    assert(result);
    expect(result.messages.map(message => message.ruleId)).toContain("jsonc/no-dupe-keys");
  });

  it("reports comments in standard JSON files", async () => {
    const source = '{\n  // comment\n  "name": "one"\n}\n';

    const [result] = await eslint.lintText(source, {
      filePath: path.resolve(packageRoot, "fixtures/sample.json"),
    });

    assert(result);
    expect(result.messages.map(message => message.ruleId)).toContain("jsonc/no-comments");
  });

  it("accepts valid YAML files", async () => {
    const [result] = await eslint.lintText("name: yarapa\nitems:\n  - one\n", {
      filePath: path.resolve(packageRoot, "fixtures/sample.yaml"),
    });

    assert(result);
    expect(result.messages).toEqual([]);
  });

  it("reports empty YAML keys", async () => {
    const [result] = await eslint.lintText(": value\n", {
      filePath: path.resolve(packageRoot, "fixtures/sample.yaml"),
    });

    assert(result);
    expect(result.messages.map(message => message.ruleId)).toContain("yaml/no-empty-key");
  });

  it("accepts valid TOML files", async () => {
    const [result] = await eslint.lintText('name = "yarapa"\n', {
      filePath: path.resolve(packageRoot, "fixtures/sample.toml"),
    });

    assert(result);
    expect(result.messages).toEqual([]);
  });

  it("reports spaced TOML dotted keys", async () => {
    const [result] = await eslint.lintText("foo . bar = 1\n", {
      filePath: path.resolve(packageRoot, "fixtures/sample.toml"),
    });

    assert(result);
    expect(result.messages.map(message => message.ruleId)).toContain("toml/no-space-dots");
  });

  it("reports package manifest property order", async () => {
    const source = `${JSON.stringify(
      Object.fromEntries([
        ["version", "1.0.0"],
        ["name", "example"],
      ]),
    )}\n`;

    const [result] = await eslint.lintText(source, {
      filePath: path.resolve(packageRoot, "fixtures/package.json"),
    });

    assert(result);

    expect(result.messages.map(message => message.ruleId)).toContain(
      "package-json/order-properties",
    );
  });
});
