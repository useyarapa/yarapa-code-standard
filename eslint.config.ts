import {defineConfig, globalIgnores} from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintConfigYarapa from "@yarapa/eslint-config-yarapa";

export default defineConfig(
  globalIgnores([".agents/**", ".claude/**", ".turbo/**", "**/dist/**", "**/fixtures/**"]),
  eslintConfigYarapa,
  eslintConfigPrettier,
);
