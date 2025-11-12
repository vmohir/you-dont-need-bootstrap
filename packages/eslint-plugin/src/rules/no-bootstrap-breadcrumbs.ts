import { createBootstrapComponentRule } from '../utils';

const BREADCRUMB_PATTERNS = [
  /^breadcrumb(-(item|divider))?$/,
];

export default createBootstrapComponentRule({
  name: 'breadcrumb',
  patterns: BREADCRUMB_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#breadcrumbs',
});
