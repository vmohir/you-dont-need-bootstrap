import { createBootstrapComponentRule } from '../utils';

const PAGINATION_PATTERNS = [
  /^pagination$/,
  /^pagination-(sm|lg)$/,
  /^page-item$/,
  /^page-link$/,
];

export default createBootstrapComponentRule({
  name: 'pagination',
  patterns: PAGINATION_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#pagination',
});
