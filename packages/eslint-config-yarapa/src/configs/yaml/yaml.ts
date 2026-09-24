import {parseForESLint as parseYamlForESLint, meta as yamlMeta} from "yaml-eslint-parser";
import yamlPlugin from "eslint-plugin-yml";
import type {Linter} from "eslint";

import {YAML_FILES} from "../constants";

const yamlParser = {meta: yamlMeta, parseForESLint: parseYamlForESLint};

const yamlRules: Linter.RulesRecord = {
  "yaml/block-mapping": "error",
  "yaml/block-mapping-question-indicator-newline": "error",
  "yaml/block-sequence": "error",
  "yaml/block-sequence-hyphen-indicator-newline": "error",
  "yaml/flow-mapping-curly-newline": "error",
  "yaml/flow-mapping-curly-spacing": "error",
  "yaml/flow-sequence-bracket-newline": "error",
  "yaml/flow-sequence-bracket-spacing": "error",
  "yaml/indent": ["error", 2],
  "yaml/key-spacing": "error",
  "yaml/no-empty-key": "error",
  "yaml/no-empty-sequence-entry": "error",
  "yaml/no-irregular-whitespace": "error",
  "yaml/no-multiple-empty-lines": ["error", {max: 1, maxBOF: 0, maxEOF: 0}],
  "yaml/no-tab-indent": "error",
  "yaml/plain-scalar": "error",
  "yaml/quotes": ["error", {avoidEscape: true, prefer: "double"}],
  "yaml/spaced-comment": "error",
};

export const yaml: Linter.Config[] = [
  {
    files: YAML_FILES,
    languageOptions: {
      parser: yamlParser,
    },
    name: "yarapa/yaml",
    plugins: {
      yaml: yamlPlugin,
    },
    rules: yamlRules,
  },
];
