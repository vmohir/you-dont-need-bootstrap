import { createBootstrapComponentRule } from '../utils';

const TAB_PATTERNS = [
  /^nav-tabs$/,
  /^nav-pills$/,
  /^tab-content$/,
  /^tab-pane$/,
];

export default createBootstrapComponentRule({
  name: 'tab',
  patterns: TAB_PATTERNS,
  dataAttributes: ['tab', 'pill'],
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#tabs',
});
