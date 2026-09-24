const JSON_EXTENSION = ".json";
const JSON5_EXTENSION = ".json5";
const JAVASCRIPT_EXTENSIONS = [".js", ".jsx", ".mjs", ".cjs"];
const JSON_EXTENSIONS = [JSON_EXTENSION, JSON5_EXTENSION, ".jsonc"];

export const TYPESCRIPT_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts"];

export const JAVASCRIPT_AND_TYPESCRIPT_EXTENSIONS = [
  ...JAVASCRIPT_EXTENSIONS,
  ...TYPESCRIPT_EXTENSIONS,
];

export const JAVASCRIPT_FILES = JAVASCRIPT_EXTENSIONS.map(extension => `**/*${extension}`);
export const PLAIN_JAVASCRIPT_FILES = [".js", ".jsx"].map(extension => `**/*${extension}`);

export const INDEX_FILES = JAVASCRIPT_AND_TYPESCRIPT_EXTENSIONS.map(
  extension => `**/index${extension}`,
);

export const REACT_FILES = ["**/*.jsx", "**/*.tsx"];
export const CSS_FILES = ["**/*.css", "**/*.pcss", "**/*.postcss"];
export const HTML_FILES = ["**/*.html", "**/*.htm"];
export const LESS_FILES = ["**/*.less"];
export const MARKDOWN_FILES = ["**/*.md"];
export const SCSS_FILES = ["**/*.scss"];
export const TOML_FILES = ["**/*.toml"];
export const YAML_FILES = ["**/*.yaml", "**/*.yml"];
export const JSON5_FILES = [`**/*${JSON5_EXTENSION}`];
export const JSONC_FILES = ["**/*.jsonc"];
export const JSON_FILES = JSON_EXTENSIONS.map(extension => `**/*${extension}`);
export const PACKAGE_JSON_FILES = ["**/package.json"];

export const NODE_RESOLUTION_EXTENSIONS = [
  ...JAVASCRIPT_AND_TYPESCRIPT_EXTENSIONS,
  JSON_EXTENSION,
  ".node",
];

export const NODE_MAIN_FILES = JAVASCRIPT_AND_TYPESCRIPT_EXTENSIONS.map(
  extension => `index${extension}`,
);

export const TYPESCRIPT_DECLARATION_FILES = [".d.ts", ".d.mts", ".d.cts"].map(
  extension => `**/*${extension}`,
);

export const TYPESCRIPT_FILES = TYPESCRIPT_EXTENSIONS.map(extension => `**/*${extension}`);

export const TYPESCRIPT_TEST_FILES = TYPESCRIPT_EXTENSIONS.flatMap(extension => [
  `**/*.test${extension}`,
  `**/*.spec${extension}`,
]);

export const TYPESCRIPT_COLOCATION_IGNORES = [
  "**/*.constant.*",
  "**/*.helper.*",
  "**/*.type.*",
  "**/*.util.*",
  "**/*.test.*",
  "**/*.spec.*",
  "**/*.d.*",
  "**/constants/**",
  "**/helpers/**",
  "**/utils/**",
  "**/types/**",
  "**/fixtures/**",
  ...INDEX_FILES,
];

export const JAVASCRIPT_AND_TYPESCRIPT_FILES = [...JAVASCRIPT_FILES, ...TYPESCRIPT_FILES];
