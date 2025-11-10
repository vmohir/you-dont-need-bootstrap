/**
 * Strict configuration for eslint-plugin-you-dont-need-bootstrap
 * Legacy format for .eslintrc
 * Treats Bootstrap usage as errors to enforce migration
 */
module.exports = {
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
