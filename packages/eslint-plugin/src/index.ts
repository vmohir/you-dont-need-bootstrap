import type { ESLint, Linter } from 'eslint';
import noBootstrapGrid from './rules/no-bootstrap-grid';
import noBootstrapUtilities from './rules/no-bootstrap-utilities';
import noReactstrapComponents from './rules/no-reactstrap-components';
import noBootstrapButtons from './rules/no-bootstrap-buttons';
import noBootstrapAlerts from './rules/no-bootstrap-alerts';
import noBootstrapBadges from './rules/no-bootstrap-badges';
import noBootstrapCards from './rules/no-bootstrap-cards';
import noBootstrapModals from './rules/no-bootstrap-modals';
import noBootstrapNavs from './rules/no-bootstrap-navs';
import noBootstrapDropdowns from './rules/no-bootstrap-dropdowns';
import noBootstrapForms from './rules/no-bootstrap-forms';
import noBootstrapAccordion from './rules/no-bootstrap-accordion';
import noBootstrapSpinners from './rules/no-bootstrap-spinners';
import recommended from './configs/recommended';
import strict from './configs/strict';
import recommendedLegacy from './configs/recommended-legacy';
import strictLegacy from './configs/strict-legacy';
import packageJson from '../package.json' with { type: 'json' };
import { Rule } from 'eslint';

const plugin: ESLint.Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    'no-bootstrap-grid': noBootstrapGrid,
    'no-bootstrap-utilities': noBootstrapUtilities,
    'no-reactstrap-components': noReactstrapComponents,
    'no-bootstrap-buttons': noBootstrapButtons,
    'no-bootstrap-alerts': noBootstrapAlerts,
    'no-bootstrap-badges': noBootstrapBadges,
    'no-bootstrap-cards': noBootstrapCards,
    'no-bootstrap-modals': noBootstrapModals,
    'no-bootstrap-navs': noBootstrapNavs,
    'no-bootstrap-dropdowns': noBootstrapDropdowns,
    'no-bootstrap-forms': noBootstrapForms,
    'no-bootstrap-accordion': noBootstrapAccordion,
    'no-bootstrap-spinners': noBootstrapSpinners,
  },
  configs: {
    // Legacy config (.eslintrc format)
    'recommended-legacy': recommendedLegacy,
    'strict-legacy': strictLegacy,
  },
};

recommended.plugins = { 'you-dont-need-bootstrap': plugin };
strict.plugins = { 'you-dont-need-bootstrap': plugin };

plugin.configs = plugin.configs || {};
  plugin.configs.recommended = recommended;
  plugin.configs.strict = strict;

// Export as default for flat config
export default plugin;

// Also export as named export and direct exports for CommonJS/legacy compatibility
export const rules: Record<string, Rule.RuleModule> | undefined = plugin.rules;
export const configs:
  | Record<string, Linter.LegacyConfig | Linter.Config | Linter.Config[]>
  | undefined = plugin.configs;
export const meta: { name?: string | undefined; version?: string | undefined } | undefined =
  plugin.meta;
