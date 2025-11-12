import { createBootstrapComponentRule } from '../utils';

const OFFCANVAS_PATTERNS = [
  /^offcanvas$/,
  /^offcanvas-(start|end|top|bottom)$/,
  /^offcanvas-header$/,
  /^offcanvas-title$/,
  /^offcanvas-body$/,
  /^offcanvas-backdrop$/,
];

export default createBootstrapComponentRule({
  name: 'offcanvas',
  patterns: OFFCANVAS_PATTERNS,
  dataAttributes: ['offcanvas'],
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#offcanvas',
});
