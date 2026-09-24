import {assert, describe, expect, it} from "vitest";
import path from "node:path";

import {packageRoot} from "../helpers";

import {eslint} from "./behavior.helper";

const INVALID_STYLESHEET = "a{color:red}\n";
const VALID_STYLESHEET = "a {\n  color: red;\n}\n";

const formatterCases = [
  {
    extension: ".html",
    invalid: "<div>   <span>hello</span></div>\n",
    valid: "<div><span>hello</span></div>\n",
  },
  {
    extension: ".css",
    invalid: INVALID_STYLESHEET,
    valid: VALID_STYLESHEET,
  },
  {
    extension: ".postcss",
    invalid: INVALID_STYLESHEET,
    valid: VALID_STYLESHEET,
  },
  {
    extension: ".scss",
    invalid: INVALID_STYLESHEET,
    valid: VALID_STYLESHEET,
  },
  {
    extension: ".less",
    invalid: INVALID_STYLESHEET,
    valid: VALID_STYLESHEET,
  },
] as const;

describe("formatter behavior", () => {
  it.each(formatterCases)(
    "reports formatting violations for $extension",
    async ({extension, invalid}) => {
      const [result] = await eslint.lintText(invalid, {
        filePath: path.resolve(packageRoot, `fixtures/sample${extension}`),
      });

      assert(result);
      expect(result.messages.map(message => message.ruleId)).toContain("format/prettier");
    },
  );

  it.each(formatterCases)("accepts formatted $extension files", async ({extension, valid}) => {
    const [result] = await eslint.lintText(valid, {
      filePath: path.resolve(packageRoot, `fixtures/sample${extension}`),
    });

    assert(result);
    expect(result.messages).toEqual([]);
  });
});
