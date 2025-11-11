import { createBootstrapComponentRule } from '../utils';

const FORM_PATTERNS = [
  /^form-control(-sm|-lg|-plaintext)?$/,
  /^form-select(-sm|-lg)?$/,
  /^form-check(-input|-label|-inline)?$/,
  /^form-switch$/,
  /^form-(label|text)$/,
  /^form-floating$/,
  /^input-group(-text|-sm|-lg)?$/,
  /^form-range$/,
];

export default createBootstrapComponentRule({
  name: 'form',
  patterns: FORM_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#forms',
});
