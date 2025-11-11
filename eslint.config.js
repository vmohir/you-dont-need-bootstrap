import youDontNeedBootstrap from "./packages/eslint-plugin/dist/index.mjs";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {},
  },
  // TypeScript files with strict type checking
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: tseslint.configs.strictTypeChecked,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Demo the you-dont-need-bootstrap plugin on examples
  {
    files: ["examples/**/*.{js,jsx}"],
    ...youDontNeedBootstrap.configs.recommended,
  },
);
