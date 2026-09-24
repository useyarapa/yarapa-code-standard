import type {Linter} from "eslint";

import {base} from "../base";
import {browser} from "../browser";
import {eslintComments} from "../eslint-comments";
import {formatters} from "../formatters";
import {ignores} from "../ignores";
import {importX} from "../import-x";
import {jsdoc} from "../jsdoc";
import {json} from "../json";
import {markdown} from "../markdown";
import {node} from "../node";
import {packageJson} from "../package-json";
import {perfectionist} from "../perfectionist";
import {promise} from "../promise";
import {regexp} from "../regexp";
import {sonarjs} from "../sonarjs";
import {stylistic} from "../stylistic";
import {toml} from "../toml";
import {typeChecked} from "../type-checked";
import {typescript} from "../typescript";
import {unicorn} from "../unicorn";
import {unusedImports} from "../unused-imports";
import {vitest} from "../vitest";
import {yaml} from "../yaml";

export const yarapa: Linter.Config[] = [
  ...ignores,
  ...base,
  ...eslintComments,
  ...promise,
  ...regexp,
  ...unusedImports,
  ...node,
  ...browser,
  ...typescript,
  ...typeChecked,
  ...importX,
  ...sonarjs,
  ...jsdoc,
  ...json,
  ...markdown,
  ...packageJson,
  ...yaml,
  ...toml,
  ...formatters,
  ...stylistic,
  ...unicorn,
  ...perfectionist,
  ...vitest,
];
