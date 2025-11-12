import { createBootstrapComponentRule } from '../utils';

const CAROUSEL_PATTERNS = [
  /^carousel(-(inner|item|control-(prev|next)(-icon)?|indicators|caption|dark|fade)?)?$/,
];

export default createBootstrapComponentRule({
  name: 'carousel',
  patterns: CAROUSEL_PATTERNS,
  dataAttributes: ['prev', 'next'],
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#carousel',
});
