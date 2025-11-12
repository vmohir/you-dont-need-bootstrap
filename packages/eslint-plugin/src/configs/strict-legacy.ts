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
    'you-dont-need-bootstrap/no-bootstrap-utilities': 'error',
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
    'you-dont-need-bootstrap/no-bootstrap-list-group': 'error',
    'you-dont-need-bootstrap/no-bootstrap-breadcrumbs': 'error',
    'you-dont-need-bootstrap/no-bootstrap-pagination': 'error',
    'you-dont-need-bootstrap/no-bootstrap-progress': 'error',
    'you-dont-need-bootstrap/no-bootstrap-toasts': 'error',
    'you-dont-need-bootstrap/no-bootstrap-tables': 'error',
    'you-dont-need-bootstrap/no-bootstrap-offcanvas': 'error',
    'you-dont-need-bootstrap/no-bootstrap-carousel': 'error',
    'you-dont-need-bootstrap/no-bootstrap-tooltips': 'error',
    'you-dont-need-bootstrap/no-bootstrap-collapse': 'error',
    'you-dont-need-bootstrap/no-bootstrap-tabs': 'error',
    'you-dont-need-bootstrap/no-bootstrap-setup': 'error',
  },
};

export default config;
