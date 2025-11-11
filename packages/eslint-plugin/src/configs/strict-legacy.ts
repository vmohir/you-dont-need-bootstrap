import { Linter } from 'eslint';

/**
 * Strict configuration for eslint-plugin-you-dont-need-bootstrap
 * Legacy format for .eslintrc
 * Treats Bootstrap usage as errors to enforce migration
 */
const config: Linter.LegacyConfig = {
  plugins: ['you-dont-need-bootstrap'],
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'error',
    'you-dont-need-bootstrap/no-bootstrap-utilities': ['error'],
  },
};

export default config;
