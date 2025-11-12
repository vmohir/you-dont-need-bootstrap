import { createBootstrapComponentRule } from '../utils';

const TABLE_PATTERNS = [
  /^table$/,
  /^table-(sm|bordered|borderless|striped|hover|active)$/,
  /^table-(primary|secondary|success|danger|warning|info|light|dark)$/,
  /^table-responsive(-sm|-md|-lg|-xl|-xxl)?$/,
  /^caption-top$/,
];

export default createBootstrapComponentRule({
  name: 'table',
  patterns: TABLE_PATTERNS,
  url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#tables',
});
