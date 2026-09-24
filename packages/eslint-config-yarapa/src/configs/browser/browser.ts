import globals from "globals";
import type {Linter} from "eslint";

import {JAVASCRIPT_AND_TYPESCRIPT_FILES} from "../constants";

export const browser: Linter.Config[] = [
  {
    files: JAVASCRIPT_AND_TYPESCRIPT_FILES,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    name: "yarapa/browser/globals",
  },
];
