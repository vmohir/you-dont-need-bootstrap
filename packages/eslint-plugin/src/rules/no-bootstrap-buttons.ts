import { createBootstrapComponentRule } from '../utils';

const BUTTON_PATTERNS = [
  /^btn$/,
  /^btn-(primary|secondary|success|danger|warning|info|light|dark|link)$/,
  /^btn-outline-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^btn-(sm|lg)$/,
  /^btn-block$/,
  /^btn-group(-vertical|-sm|-lg)?$/,
  /^btn-toolbar$/,
];

export default createBootstrapComponentRule({
  name: 'button',
  patterns: BUTTON_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#buttons',
});
