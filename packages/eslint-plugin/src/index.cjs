const noBootstrapGrid = require('./rules/no-bootstrap-grid.cjs');
const noBootstrapUtilities = require('./rules/no-bootstrap-utilities.cjs');
const recommended = require('./configs/recommended.cjs');
const strict = require('./configs/strict.cjs');
const recommendedLegacy = require('./configs/recommended-legacy.cjs');
const strictLegacy = require('./configs/strict-legacy.cjs');

const plugin = {
  meta: {
    name: 'eslint-plugin-you-dont-need-bootstrap',
    version: '0.1.1',
  },
  rules: {
    'no-bootstrap-grid': noBootstrapGrid,
    'no-bootstrap-utilities': noBootstrapUtilities,
  },
  configs: {
    // Flat config (ESLint >= 9.0.0)
    recommended,
    strict,
    // Legacy config (.eslintrc format)
    'recommended-legacy': recommendedLegacy,
    'strict-legacy': strictLegacy,
  },
};

// Export for CommonJS
module.exports = plugin;

// Also export individual properties for compatibility
module.exports.rules = plugin.rules;
module.exports.configs = plugin.configs;
module.exports.meta = plugin.meta;
