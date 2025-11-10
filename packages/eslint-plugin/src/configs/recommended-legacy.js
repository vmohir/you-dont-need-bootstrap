/**
 * Recommended configuration for eslint-plugin-you-dont-need-bootstrap
 * Legacy format for .eslintrc
 * Warns about Bootstrap usage without blocking development
 */
export default {
  plugins: ['you-dont-need-bootstrap'],
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
