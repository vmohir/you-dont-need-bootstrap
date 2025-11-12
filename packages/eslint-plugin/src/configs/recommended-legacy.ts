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
    'you-dont-need-bootstrap/no-bootstrap-utilities': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-alerts': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-badges': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-cards': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-modals': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-navs': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-dropdowns': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-forms': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-accordion': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-spinners': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-list-group': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-breadcrumbs': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-pagination': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-progress': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-toasts': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-tables': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-offcanvas': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-carousel': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-tooltips': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-collapse': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-tabs': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-setup': 'warn',
  },
};

export default config;
