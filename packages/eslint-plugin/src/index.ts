import type { ESLint, Linter } from 'eslint';
import noBootstrapGrid from './rules/no-bootstrap-grid';
import noBootstrapUtilities from './rules/no-bootstrap-utilities';
import recommended from './configs/recommended';
import strict from './configs/strict';
import recommendedLegacy from './configs/recommended-legacy';
import strictLegacy from './configs/strict-legacy';

interface Plugin extends ESLint.Plugin {
  configs: {
    recommended: any;
    strict: any;
    'recommended-legacy': any;
    'strict-legacy': any;
  };
}

const plugin: Plugin = {
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

// Export as default for flat config
export default plugin;

// Also export individual properties for legacy config compatibility
export const rules = plugin.rules;
export const configs = plugin.configs;
export const meta = plugin.meta;
