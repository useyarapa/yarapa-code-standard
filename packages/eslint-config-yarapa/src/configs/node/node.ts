import globals from "globals";
import nPlugin from "eslint-plugin-n";
import type {Linter} from "eslint";

import {JAVASCRIPT_AND_TYPESCRIPT_FILES} from "../constants";

import {NODE_SETTINGS} from "./node.constant";

const nodeRules: Linter.RulesRecord = {
  "n/hashbang": "error",
  "n/no-deprecated-api": "error",
  "n/no-exports-assign": "error",
  "n/no-extraneous-import": "error",
  "n/no-extraneous-require": "error",
  "n/no-missing-import": "error",
  "n/no-missing-require": "error",
  "n/no-new-require": "error",
  "n/no-path-concat": "error",
  "n/no-process-exit": "error",
  "n/no-unpublished-import": "error",
  "n/no-unpublished-require": "error",
  "n/no-unsupported-features/es-builtins": "error",
  "n/no-unsupported-features/es-syntax": [
    "error",
    {
      ignores: ["modules"],
    },
  ],
  "n/no-unsupported-features/node-builtins": "error",
  "n/process-exit-as-throw": "error",
};

export const node: Linter.Config[] = [
  {
    files: JAVASCRIPT_AND_TYPESCRIPT_FILES,
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    name: "yarapa/node",
    plugins: {n: nPlugin},
    rules: nodeRules,
    settings: NODE_SETTINGS,
  },
];
