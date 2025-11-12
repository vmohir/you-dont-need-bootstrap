import { createBootstrapComponentRule } from '../utils';

const BUTTON_PATTERNS = [
  /^btn(-(sm|lg))?$/,
  /^btn-(primary|secondary|success|danger|warning|info|light|dark|link)$/,
  /^btn-outline-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^btn-(block|toolbar)$/,
  /^btn-group(-vertical|-sm|-lg)?$/,
  /^btn-close(-white)?$/,
];

export default createBootstrapComponentRule({
  name: 'button',
  patterns: BUTTON_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#buttons',
});
