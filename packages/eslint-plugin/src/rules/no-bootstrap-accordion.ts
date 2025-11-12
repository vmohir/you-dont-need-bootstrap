import { createBootstrapComponentRule } from '../utils';

const ACCORDION_PATTERNS = [
  /^accordion(-flush)?$/,
  /^accordion-(item|header|button|body|collapse)$/,
];

export default createBootstrapComponentRule({
  name: 'accordion',
  patterns: ACCORDION_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#accordion',
});
