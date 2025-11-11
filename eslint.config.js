import youDontNeedBootstrap from './packages/eslint-plugin/dist/index.mjs';
import recommended from './packages/eslint-plugin/src/configs/recommended.ts';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {},
  },
  // Demo the you-dont-need-bootstrap plugin on examples
  {
    files: ['examples/**/*.{js,jsx}'],
    plugins: {
      'you-dont-need-bootstrap': youDontNeedBootstrap,
    },
    rules: {
      ...youDontNeedBootstrap.configs.recommended.rules,
    },
  },
];
