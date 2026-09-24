import {describe, expect, it} from "vitest";

describe("public API", () => {
  it("exports only the canonical default configuration", async () => {
    const module = await import("../../src/index.ts");

    expect(Object.keys(module)).toEqual(["default"]);
    expect(module.default).toEqual(expect.any(Array));
  });
});
