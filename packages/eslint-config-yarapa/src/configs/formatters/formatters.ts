import formatPlugin from "eslint-plugin-format";
import type {Linter} from "eslint";

import {CSS_FILES, HTML_FILES, LESS_FILES, SCSS_FILES} from "../constants";

const prettierOptions = {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: false,
  endOfLine: "auto",
  jsxSingleQuote: false,
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
} as const;

export const formatters: Linter.Config[] = [
  {
    name: "yarapa/formatters/setup",
    plugins: {
      format: formatPlugin,
    },
  },
  {
    files: HTML_FILES,
    languageOptions: {
      parser: formatPlugin.parserPlain,
    },
    name: "yarapa/formatters/html",
    rules: {
      "format/prettier": ["error", {...prettierOptions, parser: "html"}],
    },
  },
  {
    files: CSS_FILES,
    languageOptions: {
      parser: formatPlugin.parserPlain,
    },
    name: "yarapa/formatters/css",
    rules: {
      "format/prettier": ["error", {...prettierOptions, parser: "css"}],
    },
  },
  {
    files: SCSS_FILES,
    languageOptions: {
      parser: formatPlugin.parserPlain,
    },
    name: "yarapa/formatters/scss",
    rules: {
      "format/prettier": ["error", {...prettierOptions, parser: "scss"}],
    },
  },
  {
    files: LESS_FILES,
    languageOptions: {
      parser: formatPlugin.parserPlain,
    },
    name: "yarapa/formatters/less",
    rules: {
      "format/prettier": ["error", {...prettierOptions, parser: "less"}],
    },
  },
];
