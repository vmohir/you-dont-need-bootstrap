import { Linter } from 'eslint';

/**
 * Strict configuration for eslint-plugin-you-dont-need-bootstrap
 * Treats Bootstrap usage as errors to enforce migration
 */
const config: Linter.Config = {
  plugins: ['you-dont-need-bootstrap'],
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'error',
    'you-dont-need-bootstrap/no-bootstrap-utilities': [
      'error',
      {
        categories: ['spacing', 'display', 'flexbox', 'colors', 'typography'],
      },
    ],
  },
};

export default config;
