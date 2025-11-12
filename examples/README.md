# Examples

This directory contains example files demonstrating violations for each ESLint rule in the plugin.

## Structure

- **`rules/`** - Contains one `.jsx` file per rule with example violations
- **`expected/`** - Contains `.json` files with expected ESLint output for each example
- **`scripts/`** - Contains test and update scripts
- **`eslint.config.mjs`** - ESLint configuration for running the plugin on examples

## Commands

Run these commands from the `packages/eslint-plugin` directory:

### Test Examples

Validates that all example files produce the expected ESLint output:

```bash
pnpm test:examples
```

This compares the current ESLint output against the expected JSON files. All examples must pass for the test to succeed.

### Update Examples

Updates the expected output JSON files based on current ESLint results:

```bash
pnpm update:examples
```

Run this command when:
- Adding new rules
- Modifying existing rules
- Updating example files
- The expected output needs to be regenerated

## Rules with Examples

Each rule has a dedicated example file:

### Grid & Layout
- `no-bootstrap-grid.jsx` - Bootstrap grid system classes

### Utilities
- `no-bootstrap-utilities.jsx` - Utility classes (spacing, display, flexbox, colors, typography)

### Components
- `no-bootstrap-buttons.jsx` - Button styles and groups
- `no-bootstrap-alerts.jsx` - Alert components
- `no-bootstrap-badges.jsx` - Badge components
- `no-bootstrap-cards.jsx` - Card components
- `no-bootstrap-modals.jsx` - Modal dialogs (includes data attributes)
- `no-bootstrap-navs.jsx` - Navigation components
- `no-bootstrap-dropdowns.jsx` - Dropdown menus (includes data attributes)
- `no-bootstrap-forms.jsx` - Form controls and validation
- `no-bootstrap-accordion.jsx` - Accordion components
- `no-bootstrap-spinners.jsx` - Loading spinners
- `no-bootstrap-list-group.jsx` - List group components
- `no-bootstrap-breadcrumbs.jsx` - Breadcrumb navigation
- `no-bootstrap-pagination.jsx` - Pagination controls
- `no-bootstrap-progress.jsx` - Progress bars
- `no-bootstrap-toasts.jsx` - Toast notifications (includes data attributes)
- `no-bootstrap-tables.jsx` - Table styles
- `no-bootstrap-offcanvas.jsx` - Offcanvas panels (includes data attributes)
- `no-bootstrap-carousel.jsx` - Carousel/slider (includes data attributes)
- `no-bootstrap-tooltips.jsx` - Tooltips and popovers (includes data attributes)
- `no-bootstrap-close.jsx` - Close buttons
- `no-bootstrap-collapse.jsx` - Collapse components (includes data attributes)
- `no-bootstrap-tabs.jsx` - Tab navigation (includes data attributes)

### Setup & Imports
- `no-bootstrap-setup.jsx` - Bootstrap CSS/JS imports

### Framework Libraries
- `no-reactstrap-components.jsx` - Reactstrap library components
- `no-react-bootstrap-components.jsx` - React Bootstrap library components
- `no-bootstrap-vue-components.jsx` - Bootstrap Vue library components
- `no-bootstrap-vue-next-components.jsx` - Bootstrap Vue Next library components
- `no-ngx-bootstrap-components.jsx` - NGX Bootstrap library components

## Data Attribute Detection

Several rules detect Bootstrap data attributes in addition to CSS classes:

- Modals: `data-bs-toggle="modal"`, `data-bs-dismiss="modal"`
- Dropdowns: `data-bs-toggle="dropdown"`
- Collapse: `data-bs-toggle="collapse"`
- Tabs: `data-bs-toggle="tab"`, `data-bs-toggle="pill"`
- Tooltips: `data-bs-toggle="tooltip"`, `data-bs-toggle="popover"`
- Carousel: `data-bs-slide="prev"`, `data-bs-slide="next"`
- Offcanvas: `data-bs-toggle="offcanvas"`
- Toasts: `data-bs-dismiss="toast"`

## Adding New Examples

1. Create a new `.jsx` file in `rules/` with example violations
2. Add the rule to `eslint.config.mjs` if it's not already there
3. Run `pnpm update:examples` to generate the expected output
4. Run `pnpm test:examples` to verify the example works correctly
