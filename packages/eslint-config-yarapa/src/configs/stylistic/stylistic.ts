import stylisticPlugin from "@stylistic/eslint-plugin";
import type {Linter} from "eslint";

import {JAVASCRIPT_AND_TYPESCRIPT_FILES} from "../constants";

import {PADDING_LINE_BETWEEN_STATEMENTS} from "./stylistic.constant";

const stylisticRules: Linter.RulesRecord = {
  "@stylistic/jsx-curly-brace-presence": ["error", {propElementValues: "always"}],
  "@stylistic/jsx-function-call-newline": ["error", "multiline"],
  "@stylistic/jsx-newline": ["error", {allowMultilines: true, prevent: true}],
  "@stylistic/lines-between-class-members": ["error", "always", {exceptAfterSingleLine: true}],
  "@stylistic/padding-line-between-statements": ["error", ...PADDING_LINE_BETWEEN_STATEMENTS],
  "@stylistic/spaced-comment": [
    "error",
    "always",
    {
      block: {balanced: true, exceptions: ["*"], markers: ["!"]},
      line: {exceptions: ["/", "#"], markers: ["/"]},
    },
  ],
};

export const stylistic: Linter.Config[] = [
  {
    files: JAVASCRIPT_AND_TYPESCRIPT_FILES,
    name: "yarapa/stylistic",
    plugins: {"@stylistic": stylisticPlugin},
    rules: stylisticRules,
  },
];
