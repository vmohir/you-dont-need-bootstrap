import { createBootstrapComponentRule } from '../utils';

const DROPDOWN_PATTERNS = [
  /^drop(down|up|end|start)$/,
  /^dropdown-(toggle|menu|item|divider|header)$/,
  /^dropdown-menu-(end|right)$/,
];

export default createBootstrapComponentRule({
  name: 'dropdown',
  patterns: DROPDOWN_PATTERNS,
  dataAttributes: ['dropdown'],
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#dropdowns',
});
