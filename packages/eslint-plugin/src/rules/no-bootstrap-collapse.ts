import { createBootstrapComponentRule } from '../utils';

const COLLAPSE_PATTERNS = [
  /^collapse$/,
  /^collapsing$/,
];

export default createBootstrapComponentRule({
  name: 'collapse',
  patterns: COLLAPSE_PATTERNS,
  dataAttributes: ['collapse'],
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#collapse',
});
