import {assert, describe, expect, it} from "vitest";
import path from "node:path";

import {eslint, projectRoot} from "./behavior.helper";

const CLOSE_COMPONENT = ");";
const CLOSE_DIV = "  </div>";
const CLOSE_NESTED_DIV = "    />";
const COMPONENT_DECLARATION = "export const Component = () => (";
const JSX_NEWLINE_RULE = "@stylistic/jsx-newline";
const OPEN_DIV = "  <div>";
const OPEN_NESTED_DIV = "    <div";
const SPAN_ELEMENT = "    <span />";
const jsxFixture = path.resolve(projectRoot, "src/component.tsx");

describe("jsx newline behavior", () => {
  it.each([
    {
      badSource: [
        COMPONENT_DECLARATION,
        OPEN_DIV,
        SPAN_ELEMENT,
        "",
        SPAN_ELEMENT,
        CLOSE_DIV,
        CLOSE_COMPONENT,
        "",
      ].join("\n"),
      goodSource: [
        COMPONENT_DECLARATION,
        OPEN_DIV,
        SPAN_ELEMENT,
        SPAN_ELEMENT,
        CLOSE_DIV,
        CLOSE_COMPONENT,
        "",
      ].join("\n"),
      name: "prevents blank lines between adjacent single-line jsx elements",
    },
    {
      badSource: [
        COMPONENT_DECLARATION,
        OPEN_DIV,
        OPEN_NESTED_DIV,
        '      className="first"',
        CLOSE_NESTED_DIV,
        OPEN_NESTED_DIV,
        '      className="second"',
        CLOSE_NESTED_DIV,
        CLOSE_DIV,
        CLOSE_COMPONENT,
        "",
      ].join("\n"),
      goodSource: [
        COMPONENT_DECLARATION,
        OPEN_DIV,
        OPEN_NESTED_DIV,
        '      className="first"',
        CLOSE_NESTED_DIV,
        "",
        OPEN_NESTED_DIV,
        '      className="second"',
        CLOSE_NESTED_DIV,
        CLOSE_DIV,
        CLOSE_COMPONENT,
        "",
      ].join("\n"),
      name: "requires blank line between adjacent multiline jsx elements",
    },
  ])("$name", async ({badSource, goodSource}) => {
    const [badResult] = await eslint.lintText(badSource, {
      filePath: jsxFixture,
    });

    const [goodResult] = await eslint.lintText(goodSource, {
      filePath: jsxFixture,
    });

    assert(badResult);
    assert(goodResult);

    const badRules = badResult.messages.map(message => message.ruleId);
    const goodRules = goodResult.messages.map(message => message.ruleId);

    expect(badRules).toContain(JSX_NEWLINE_RULE);
    expect(goodRules).not.toContain(JSX_NEWLINE_RULE);
  });
});
