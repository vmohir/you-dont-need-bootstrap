import { Linter } from 'eslint';

/**
 * Recommended configuration for eslint-plugin-you-dont-need-bootstrap
 * Legacy format for .eslintrc
 * Warns about Bootstrap usage without blocking development
 */
const config: Linter.LegacyConfig = {
  plugins: ['you-dont-need-bootstrap'],
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-utilities': ['warn'],
    'you-dont-need-bootstrap/no-reactstrap-components': 'warn',
  },
};

export default config;
