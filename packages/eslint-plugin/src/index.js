import noBootstrapGrid from './rules/no-bootstrap-grid.js';
import noBootstrapUtilities from './rules/no-bootstrap-utilities.js';
import recommended from './configs/recommended.js';
import strict from './configs/strict.js';

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
    recommended,
    strict,
  },
};

export default plugin;
