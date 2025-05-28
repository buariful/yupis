// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    // files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: { ...globals.browser, process: "readonly" } },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ["dist", "node_modules"],
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
  },
];
