import { createBootstrapComponentRule } from '../utils';

const BADGE_PATTERNS = [
  /^badge$/,
  /^badge-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^badge-pill$/,
];

export default createBootstrapComponentRule({
  name: 'badge',
  patterns: BADGE_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#badges',
});
