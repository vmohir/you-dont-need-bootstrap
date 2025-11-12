import { createBootstrapComponentRule } from '../utils';

const TOAST_PATTERNS = [
  /^toast$/,
  /^toast-container$/,
  /^toast-header$/,
  /^toast-body$/,
];

export default createBootstrapComponentRule({
  name: 'toast',
  patterns: TOAST_PATTERNS,
  dataAttributes: ['toast'],
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#toasts',
});
