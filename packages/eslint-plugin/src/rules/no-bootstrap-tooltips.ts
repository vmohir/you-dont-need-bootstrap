import { createBootstrapComponentRule } from '../utils';

const TOOLTIP_PATTERNS = [
  /^tooltip$/,
  /^tooltip-inner$/,
  /^tooltip-arrow$/,
  /^bs-tooltip-(auto|top|bottom|start|end)$/,
  /^popover$/,
  /^popover-header$/,
  /^popover-body$/,
  /^popover-arrow$/,
  /^bs-popover-(auto|top|bottom|start|end)$/,
];

export default createBootstrapComponentRule({
  name: 'tooltip/popover',
  patterns: TOOLTIP_PATTERNS,
  dataAttributes: ['tooltip', 'popover'],
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#tooltips',
});
