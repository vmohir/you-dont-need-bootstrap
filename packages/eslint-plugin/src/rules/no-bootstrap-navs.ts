import { createBootstrapComponentRule } from '../utils';

const NAV_PATTERNS = [
  /^nav$/,
  /^nav-(link|item)$/,
  /^nav-(tabs|pills|fill|justified)$/,
  /^navbar$/,
  /^navbar-(brand|toggler|collapse|nav|text)$/,
  /^navbar-expand(-sm|-md|-lg|-xl|-xxl)?$/,
  /^navbar-(light|dark)$/,
];

export default createBootstrapComponentRule({
  name: 'nav',
  patterns: NAV_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#navs',
});
