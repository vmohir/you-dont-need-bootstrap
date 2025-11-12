import { createBootstrapComponentRule } from '../utils';

const MODAL_PATTERNS = [
  /^modal$/,
  /^modal-dialog(-centered|-scrollable)?$/,
  /^modal-(content|header|body|footer|title)$/,
  /^modal-(sm|lg|xl|fullscreen)$/,
  /^modal-(backdrop|static)$/,
];

export default createBootstrapComponentRule({
  name: 'modal',
  patterns: MODAL_PATTERNS,
  dataAttributes: ['modal'],
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#modals',
});
