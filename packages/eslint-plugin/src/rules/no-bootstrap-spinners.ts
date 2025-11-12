import { createBootstrapComponentRule } from '../utils';

const SPINNER_PATTERNS = [
  /^spinner-border(-sm)?$/,
  /^spinner-grow(-sm)?$/,
];

export default createBootstrapComponentRule({
  name: 'spinner',
  patterns: SPINNER_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#spinners',
});
