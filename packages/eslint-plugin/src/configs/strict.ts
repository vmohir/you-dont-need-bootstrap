import { Linter } from 'eslint';

/**
 * Strict configuration for eslint-plugin-you-dont-need-bootstrap
 * Treats Bootstrap usage as errors to enforce migration
 */
const config: Linter.Config = {
  plugins: {},
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'error',
    'you-dont-need-bootstrap/no-bootstrap-utilities': ['error'],
    'you-dont-need-bootstrap/no-reactstrap-components': 'error',
    'you-dont-need-bootstrap/no-bootstrap-buttons': 'error',
    'you-dont-need-bootstrap/no-bootstrap-alerts': 'error',
    'you-dont-need-bootstrap/no-bootstrap-badges': 'error',
    'you-dont-need-bootstrap/no-bootstrap-cards': 'error',
    'you-dont-need-bootstrap/no-bootstrap-modals': 'error',
    'you-dont-need-bootstrap/no-bootstrap-navs': 'error',
    'you-dont-need-bootstrap/no-bootstrap-dropdowns': 'error',
    'you-dont-need-bootstrap/no-bootstrap-forms': 'error',
    'you-dont-need-bootstrap/no-bootstrap-accordion': 'error',
    'you-dont-need-bootstrap/no-bootstrap-spinners': 'error',
  },
};

export default config;
