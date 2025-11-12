import { createBootstrapComponentRule } from '../utils';

const LIST_GROUP_PATTERNS = [
  /^list-group$/,
  /^list-group-item$/,
  /^list-group-item-action$/,
  /^list-group-item-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^list-group-flush$/,
  /^list-group-horizontal(-sm|-md|-lg|-xl|-xxl)?$/,
  /^list-group-numbered$/,
];

export default createBootstrapComponentRule({
  name: 'list-group',
  patterns: LIST_GROUP_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#list-group',
});
