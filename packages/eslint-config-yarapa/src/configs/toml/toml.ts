import {parseForESLint as parseTomlForESLint, meta as tomlMeta} from "toml-eslint-parser";
import tomlPlugin from "eslint-plugin-toml";
import type {Linter} from "eslint";

import {TOML_FILES} from "../constants";

const tomlParser = {meta: tomlMeta, parseForESLint: parseTomlForESLint};

const tomlRules: Linter.RulesRecord = {
  "toml/array-bracket-newline": "error",
  "toml/array-bracket-spacing": "error",
  "toml/array-element-newline": "error",
  "toml/comma-style": "error",
  "toml/indent": ["error", 2],
  "toml/inline-table-curly-spacing": "error",
  "toml/key-spacing": "error",
  "toml/keys-order": "error",
  "toml/no-space-dots": "error",
  "toml/no-unreadable-number-separator": "error",
  "toml/padding-line-between-pairs": "error",
  "toml/padding-line-between-tables": "error",
  "toml/precision-of-fractional-seconds": "error",
  "toml/precision-of-integer": "error",
  "toml/quoted-keys": "error",
  "toml/spaced-comment": "error",
  "toml/table-bracket-spacing": "error",
  "toml/tables-order": "error",
};

export const toml: Linter.Config[] = [
  {
    files: TOML_FILES,
    languageOptions: {
      parser: tomlParser,
    },
    name: "yarapa/toml",
    plugins: {
      toml: tomlPlugin,
    },
    rules: tomlRules,
  },
];
