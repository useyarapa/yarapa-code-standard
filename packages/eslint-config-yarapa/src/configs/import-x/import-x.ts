import importXPlugin from "eslint-plugin-import-x";
import type {Linter} from "eslint";

import {JAVASCRIPT_AND_TYPESCRIPT_FILES, TYPESCRIPT_FILES} from "../constants";

import {IMPORT_X_SETTINGS} from "./import-x.constant";

const importXRules: Linter.RulesRecord = {
  "import-x/default": "error",
  "import-x/export": "error",
  "import-x/first": "error",
  "import-x/named": "error",
  "import-x/namespace": "error",
  "import-x/no-absolute-path": "error",
  "import-x/no-cycle": "error",
  "import-x/no-duplicates": "error",
  "import-x/no-mutable-exports": "error",
  "import-x/no-named-as-default": "error",
  "import-x/no-named-as-default-member": "error",
  "import-x/no-self-import": "error",
  "import-x/no-unresolved": "error",
  "import-x/no-useless-path-segments": "error",
  "import-x/no-webpack-loader-syntax": "error",
};

export const importX: Linter.Config[] = [
  {
    files: JAVASCRIPT_AND_TYPESCRIPT_FILES,
    name: "yarapa/import-x",
    plugins: {"import-x": importXPlugin},
    rules: importXRules,
    settings: IMPORT_X_SETTINGS,
  },
  {
    files: TYPESCRIPT_FILES,
    name: "yarapa/import-x/typescript",
    rules: {
      "import-x/named": "off",
    },
  },
];
