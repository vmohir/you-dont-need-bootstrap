import { createBootstrapComponentRule } from '../utils';

const CARD_PATTERNS = [
  /^card$/,
  /^card-(body|header|footer)$/,
  /^card-(title|subtitle|text|link)$/,
  /^card-img(-top|-bottom|-overlay)?$/,
  /^card-(group|deck|columns)$/,
];

export default createBootstrapComponentRule({
  name: 'card',
  patterns: CARD_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#cards',
});
