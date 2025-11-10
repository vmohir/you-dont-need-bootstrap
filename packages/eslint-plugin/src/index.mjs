import noBootstrapGrid from './rules/no-bootstrap-grid.js';
import noBootstrapUtilities from './rules/no-bootstrap-utilities.js';
import recommended from './configs/recommended.js';
import strict from './configs/strict.js';
import recommendedLegacy from './configs/recommended-legacy.js';
import strictLegacy from './configs/strict-legacy.js';

const plugin = {
  meta: {
    name: 'eslint-plugin-you-dont-need-bootstrap',
    version: '0.1.0',
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

// Export as default for flat config
export default plugin;

// Also export individual properties for legacy config compatibility
export const rules = plugin.rules;
export const configs = plugin.configs;
export const meta = plugin.meta;
