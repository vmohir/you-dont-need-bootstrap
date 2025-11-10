import { Linter } from 'eslint';

/**
 * Recommended configuration for eslint-plugin-you-dont-need-bootstrap
 * Warns about Bootstrap usage without blocking development
 */
const config: Linter.Config = {
  plugins: {},
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-utilities': [
      'warn',
      {
        categories: ['spacing', 'display', 'flexbox', 'colors', 'typography'],
      },
    ],
  },
};

export default config;
