import { createBootstrapComponentRule } from '../utils';

const PROGRESS_PATTERNS = [
  /^progress$/,
  /^progress-bar$/,
  /^progress-bar-striped$/,
  /^progress-bar-animated$/,
];

export default createBootstrapComponentRule({
  name: 'progress',
  patterns: PROGRESS_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#progress',
});
