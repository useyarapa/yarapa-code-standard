import type {Config} from "prettier";

export const prettierConfig = {
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
} satisfies Config;
