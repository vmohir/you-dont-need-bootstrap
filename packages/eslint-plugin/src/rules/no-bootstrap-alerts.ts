import { createBootstrapComponentRule } from '../utils';

const ALERT_PATTERNS = [
  /^alert$/,
  /^alert-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^alert-(dismissible|link|heading)$/,
];

export default createBootstrapComponentRule({
  name: 'alert',
  patterns: ALERT_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#alerts',
});
