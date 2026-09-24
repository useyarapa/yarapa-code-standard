import jsoncPlugin from "eslint-plugin-jsonc";
import type {Linter} from "eslint";

import {JSON5_FILES, JSON_FILES, JSONC_FILES} from "../constants";

const jsoncCompatibilityRules: Linter.RulesRecord = {
  "no-unused-expressions": "off",
  "no-unused-vars": "off",
  strict: "off",
};

const jsoncRules: Linter.RulesRecord = {
  "jsonc/array-bracket-spacing": ["error", "never"],
  "jsonc/comma-dangle": ["error", "never"],
  "jsonc/indent": ["error", 2],
  "jsonc/key-spacing": ["error", {afterColon: true, beforeColon: false}],
  "jsonc/no-bigint-literals": "error",
  "jsonc/no-binary-expression": "error",
  "jsonc/no-binary-numeric-literals": "error",
  "jsonc/no-comments": "error",
  "jsonc/no-dupe-keys": "error",
  "jsonc/no-escape-sequence-in-identifier": "error",
  "jsonc/no-floating-decimal": "error",
  "jsonc/no-hexadecimal-numeric-literals": "error",
  "jsonc/no-infinity": "error",
  "jsonc/no-irregular-whitespace": "error",
  "jsonc/no-multi-str": "error",
  "jsonc/no-nan": "error",
  "jsonc/no-number-props": "error",
  "jsonc/no-numeric-separators": "error",
  "jsonc/no-octal": "error",
  "jsonc/no-octal-numeric-literals": "error",
  "jsonc/no-parenthesized": "error",
  "jsonc/no-plus-sign": "error",
  "jsonc/no-regexp-literals": "error",
  "jsonc/no-sparse-arrays": "error",
  "jsonc/no-template-literals": "error",
  "jsonc/no-undefined-value": "error",
  "jsonc/no-unicode-codepoint-escapes": "error",
  "jsonc/no-useless-escape": "error",
  "jsonc/object-curly-spacing": ["error", "always"],
  "jsonc/quote-props": "error",
  "jsonc/quotes": "error",
  "jsonc/space-unary-ops": "error",
  "jsonc/valid-json-number": "error",
  "jsonc/vue-custom-block/no-parsing-error": "error",
};

const jsoncCommentsRules: Linter.RulesRecord = {
  "jsonc/no-comments": "off",
};

const json5Rules: Linter.RulesRecord = {
  "jsonc/comma-dangle": ["error", "always-multiline"],
  "jsonc/no-comments": "off",
};

export const json: Linter.Config[] = [
  {
    files: JSON_FILES,
    language: "jsonc/x",
    name: "yarapa/json",
    plugins: {jsonc: jsoncPlugin},
    rules: {
      ...jsoncCompatibilityRules,
      ...jsoncRules,
    },
  },
  {
    files: JSONC_FILES,
    name: "yarapa/json/jsonc-comments",
    rules: jsoncCommentsRules,
  },
  {
    files: JSON5_FILES,
    name: "yarapa/json/json5",
    rules: json5Rules,
  },
];
