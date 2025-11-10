import type { ESLint } from 'eslint';
import noBootstrapGrid from './rules/no-bootstrap-grid';
import noBootstrapUtilities from './rules/no-bootstrap-utilities';
import recommended from './configs/recommended';
import strict from './configs/strict';
import recommendedLegacy from './configs/recommended-legacy';
import strictLegacy from './configs/strict-legacy';
import packageJson from '../package.json'  with { type: 'json' };

const plugin: ESLint.Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    'no-bootstrap-grid': noBootstrapGrid,
    'no-bootstrap-utilities': noBootstrapUtilities,
  },
  configs: {
    // Legacy config (.eslintrc format)
    'recommended-legacy': recommendedLegacy,
    'strict-legacy': strictLegacy,
  },
};

recommended.plugins = { 'you-dont-need-bootstrap': plugin };
strict.plugins = { 'you-dont-need-bootstrap': plugin };

plugin.configs!.recommended = recommended;
plugin.configs!.strict = strict;

// Export as default for flat config
export default plugin;
