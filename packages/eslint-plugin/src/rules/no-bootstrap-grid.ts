import { createBootstrapComponentRule } from '../utils';

// Bootstrap grid patterns (optimized by merging similar patterns)
const GRID_PATTERNS = [
  // Container: container, container-fluid, container-{breakpoint}
  /^container(-fluid|-(sm|md|lg|xl|xxl))?$/,
  // Row
  /^row$/,
  // Col: col, col-{number}, col-{breakpoint}, col-{breakpoint}-{number}, col-auto
  /^col(-auto|-(1[0-2]|[1-9])|(-(sm|md|lg|xl|xxl)(-(1[0-2]|[1-9]))?)?)?$/,
  // Row cols: row-cols-{number}, row-cols-{breakpoint}-{number}
  /^row-cols-((sm|md|lg|xl|xxl)-)?(1[0-2]|[1-6])$/,
  // Gap: g-{0-5}, gx-{0-5}, gy-{0-5}
  /^g[xy]?-[0-5]$/,
];

export default createBootstrapComponentRule({
  name: 'grid',
  patterns: GRID_PATTERNS,
  url: 'https://github.com/vmohir/you-dont-need-bootstrap#grid-system',
});
