import youDontNeedBootstrap from './packages/eslint-plugin/dist/index.mjs';

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
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
    },
  },
  // Demo the you-dont-need-bootstrap plugin on examples
  {
    files: ['examples/**/*.{js,jsx}'],
    plugins: {
      'you-dont-need-bootstrap': youDontNeedBootstrap,
    },
    rules: {
      'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
      'you-dont-need-bootstrap/no-bootstrap-utilities': 'warn',
    },
  },
];
