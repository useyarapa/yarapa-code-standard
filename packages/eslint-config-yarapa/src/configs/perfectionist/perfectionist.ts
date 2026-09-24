import perfectionistPlugin from "eslint-plugin-perfectionist";
import type {Linter} from "eslint";

import {JAVASCRIPT_AND_TYPESCRIPT_FILES} from "../constants";

const naturalAscendingRule: Linter.RuleEntry = ["error", {order: "asc", type: "natural"}];

const perfectionistRules: Linter.RulesRecord = {
  "perfectionist/sort-array-includes": naturalAscendingRule,
  "perfectionist/sort-arrays": [
    "error",
    {
      order: "asc",
      type: "natural",
      useConfigurationIf: {
        matchesAstSelector: "VariableDeclarator[id.name=/^(SORTED_|sorted)/] > ArrayExpression",
      },
    },
  ],
  "perfectionist/sort-classes": naturalAscendingRule,
  "perfectionist/sort-decorators": naturalAscendingRule,
  "perfectionist/sort-enums": naturalAscendingRule,
  "perfectionist/sort-export-attributes": naturalAscendingRule,
  "perfectionist/sort-exports": naturalAscendingRule,
  "perfectionist/sort-heritage-clauses": naturalAscendingRule,
  "perfectionist/sort-import-attributes": naturalAscendingRule,
  "perfectionist/sort-imports": [
    "error",
    {
      groups: [
        ["value-builtin", "value-external"],
        {newlinesBetween: 0},
        "type-import",
        "value-internal",
        {newlinesBetween: 0},
        "type-internal",
        "value-parent",
        {newlinesBetween: 0},
        "type-parent",
        "value-sibling",
        {newlinesBetween: 0},
        "type-sibling",
        "value-index",
        {newlinesBetween: 0},
        "type-index",
        "unknown",
      ],
      newlinesBetween: 1,
      order: "asc",
      sortBy: "specifier",
      type: "natural",
    },
  ],
  "perfectionist/sort-interfaces": naturalAscendingRule,
  "perfectionist/sort-intersection-types": naturalAscendingRule,
  "perfectionist/sort-jsx-props": naturalAscendingRule,
  "perfectionist/sort-maps": naturalAscendingRule,
  "perfectionist/sort-modules": naturalAscendingRule,
  "perfectionist/sort-named-exports": naturalAscendingRule,
  "perfectionist/sort-named-imports": naturalAscendingRule,
  "perfectionist/sort-object-types": naturalAscendingRule,
  "perfectionist/sort-objects": naturalAscendingRule,
  "perfectionist/sort-sets": naturalAscendingRule,
  "perfectionist/sort-switch-case": naturalAscendingRule,
  "perfectionist/sort-union-types": naturalAscendingRule,
  "perfectionist/sort-variable-declarations": naturalAscendingRule,
};

export const perfectionist: Linter.Config[] = [
  {
    files: JAVASCRIPT_AND_TYPESCRIPT_FILES,
    name: "yarapa/perfectionist",
    plugins: {perfectionist: perfectionistPlugin},
    rules: perfectionistRules,
  },
];
