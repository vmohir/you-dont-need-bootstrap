import type { ESLint } from 'eslint';
import noBootstrapGrid from './rules/no-bootstrap-grid';
import noBootstrapUtilities from './rules/no-bootstrap-utilities';
import recommended from './configs/recommended';
import strict from './configs/strict';
import recommendedLegacy from './configs/recommended-legacy';
import strictLegacy from './configs/strict-legacy';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-you-dont-need-bootstrap',
    version: '0.3.0',
  },
  rules: {
    'no-bootstrap-grid': noBootstrapGrid,
    'no-bootstrap-utilities': noBootstrapUtilities,
  },
  configs: {
    // Flat config (ESLint >= 9.0.0)
    recommended: recommended,
    strict: strict,
    // Legacy config (.eslintrc format)
    'recommended-legacy': recommendedLegacy,
    'strict-legacy': strictLegacy,
  },
};

// Export as default for flat config
export default plugin;
