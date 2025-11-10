# You Don't (May Not) Need Bootstrap

Modern CSS has evolved significantly, offering native solutions for layouts, components, and utilities that previously required Bootstrap. This guide provides modern CSS alternatives to Bootstrap, helping you write cleaner, more maintainable code with better performance and smaller bundle sizes.

[![GitHub stars](https://img.shields.io/github/stars/vahidmohammadi/you-dont-need-bootstrap.svg?style=social&label=Star)](https://github.com/vahidmohammadi/you-dont-need-bootstrap)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Quick Links

**[Layout System](#layout-system)**

- [Container](#container)
- [Grid System](#grid-system)
- [Responsive Columns](#responsive-columns)

**[Utilities](#utilities)**

- [Spacing](#spacing)
  - [Margin](#margin)
  - [Padding](#padding)
- [Display](#display)
  - [Display Values](#display-values)
  - [Hiding Elements](#hiding-elements)
- [Flexbox](#flexbox)
  - [Flex Container](#flex-container)
  - [Justify Content](#justify-content)
  - [Align Items](#align-items)
  - [Flex Direction](#flex-direction)
- [Colors](#colors)
  - [Text Colors](#text-colors)
  - [Background Colors](#background-colors)
- [Typography](#typography)
  - [Text Alignment](#text-alignment)
  - [Font Weight](#font-weight)
  - [Font Size](#font-size)

**[Browser Support](#browser-support)**

**[ESLint Plugin](#eslint-plugin)**

---

## Voice of Developers

> Modern CSS Grid and Flexbox eliminate the need for Bootstrap's grid system. Native CSS is more maintainable, performant, and doesn't require learning framework-specific class names.

> Reducing dependencies is always a win. With modern CSS features, Bootstrap has become unnecessary overhead for most projects.

---

## Layout System

### Container

Fixed-width containers for centering content.

```html
<!-- ❌ Bootstrap -->
<div class="container">
  <!-- content -->
</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="container">
  <!-- content -->
</div>

<style>
  .container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 1rem;
  }

  /* Responsive max-widths */
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }
</style>
```

**Benefits:**

- No framework dependency
- Full control over breakpoints and max-widths
- Logical properties (`margin-inline`, `padding-inline`) for better RTL support

---

### Grid System

Two-column responsive grid layout.

```html
<!-- ❌ Bootstrap -->
<div class="row">
  <div class="col-md-6">Column 1</div>
  <div class="col-md-6">Column 2</div>
</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS Grid -->
<div class="grid">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Benefits:**

- Simpler HTML structure (no nested `row` and `col` classes)
- Native CSS Grid is more powerful and flexible
- Better performance (no framework overhead)
- Consistent gap spacing with `gap` property

---

### Responsive Columns

12-column grid with responsive breakpoints.

```html
<!-- ❌ Bootstrap -->
<div class="row">
  <div class="col-12 col-md-8 col-lg-6">Main content</div>
  <div class="col-12 col-md-4 col-lg-6">Sidebar</div>
</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS Grid -->
<div class="grid-responsive">
  <div class="main">Main content</div>
  <div class="sidebar">Sidebar</div>
</div>

<style>
  .grid-responsive {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) {
    .grid-responsive {
      grid-template-columns: 2fr 1fr;
    }
  }

  @media (min-width: 1024px) {
    .grid-responsive {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
```

**Alternative using CSS Container Queries (Modern approach):**

```html
<!-- ✅ Modern CSS with Container Queries -->
<div class="grid-container">
  <div class="main">Main content</div>
  <div class="sidebar">Sidebar</div>
</div>

<style>
  .grid-container {
    container-type: inline-size;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @container (min-width: 768px) {
    .grid-container {
      grid-template-columns: 2fr 1fr;
    }
  }

  @container (min-width: 1024px) {
    .grid-container {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
```

**Benefits:**

- Component-scoped responsive behavior with container queries
- More semantic class names
- Full control over breakpoint behavior

---

## Utilities

### Spacing

#### Margin

Bootstrap provides utility classes for margins like `m-*`, `mt-*`, `mb-*`, `mx-*`, `my-*`.

```html
<!-- ❌ Bootstrap -->
<div class="mt-3 mb-4 mx-2">Content</div>

<style>
  /* No custom CSS needed */
  /* Bootstrap generates: margin-top: 1rem, margin-bottom: 1.5rem, margin-left/right: 0.5rem */
</style>
```

```html
<!-- ✅ Modern CSS with Custom Properties -->
<div class="spaced">Content</div>

<style>
  :root {
    --space-1: 0.25rem; /* 4px */
    --space-2: 0.5rem; /* 8px */
    --space-3: 1rem; /* 16px */
    --space-4: 1.5rem; /* 24px */
    --space-5: 2rem; /* 32px */
    --space-6: 3rem; /* 48px */
  }

  .spaced {
    margin-block-start: var(--space-3);
    margin-block-end: var(--space-4);
    margin-inline: var(--space-2);
  }

  /* Or use utility classes if preferred */
  .mt-3 {
    margin-block-start: var(--space-3);
  }
  .mb-4 {
    margin-block-end: var(--space-4);
  }
  .mx-2 {
    margin-inline: var(--space-2);
  }
</style>
```

**Benefits:**

- Custom properties provide theme-wide consistency
- Logical properties (`margin-block`, `margin-inline`) for better internationalization
- Full control over spacing scale
- No unused utility classes in production

---

#### Padding

```html
<!-- ❌ Bootstrap -->
<div class="p-4 px-5">Content</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="padded">Content</div>

<style>
  .padded {
    padding: var(--space-4);
    padding-inline: var(--space-5);
  }

  /* Or utility classes */
  .p-4 {
    padding: var(--space-4);
  }
  .px-5 {
    padding-inline: var(--space-5);
  }
</style>
```

---

### Display

#### Display Values

```html
<!-- ❌ Bootstrap -->
<div class="d-flex">Flex container</div>
<div class="d-block">Block element</div>
<div class="d-inline">Inline element</div>
<div class="d-grid">Grid container</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="flex">Flex container</div>
<div class="block">Block element</div>
<div class="inline">Inline element</div>
<div class="grid">Grid container</div>

<style>
  .flex {
    display: flex;
  }
  .block {
    display: block;
  }
  .inline {
    display: inline;
  }
  .grid {
    display: grid;
  }
</style>
```

**Benefits:**

- Shorter, clearer class names
- Native CSS with no framework overhead

---

#### Hiding Elements

```html
<!-- ❌ Bootstrap -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet and up</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="hidden-mobile">Hidden on mobile, visible on tablet and up</div>

<style>
  .hidden-mobile {
    display: none;
  }

  @media (min-width: 768px) {
    .hidden-mobile {
      display: block;
    }
  }

  /* Or using logical approach */
  @media (max-width: 767px) {
    .mobile-hidden {
      display: none;
    }
  }
</style>
```

---

### Flexbox

#### Flex Container

```html
<!-- ❌ Bootstrap -->
<div class="d-flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<style>
  .flex {
    display: flex;
    gap: 1rem; /* Modern gap property instead of margins */
  }
</style>
```

---

#### Justify Content

```html
<!-- ❌ Bootstrap -->
<div class="d-flex justify-content-center">Centered</div>
<div class="d-flex justify-content-between">Space between</div>
<div class="d-flex justify-content-end">End aligned</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="flex-center">Centered</div>
<div class="flex-between">Space between</div>
<div class="flex-end">End aligned</div>

<style>
  .flex-center {
    display: flex;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
</style>
```

---

#### Align Items

```html
<!-- ❌ Bootstrap -->
<div class="d-flex align-items-center">Vertically centered</div>
<div class="d-flex align-items-start">Top aligned</div>
<div class="d-flex align-items-end">Bottom aligned</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="items-center">Vertically centered</div>
<div class="items-start">Top aligned</div>
<div class="items-end">Bottom aligned</div>

<style>
  .items-center {
    display: flex;
    align-items: center;
  }

  .items-start {
    display: flex;
    align-items: flex-start;
  }

  .items-end {
    display: flex;
    align-items: flex-end;
  }
</style>
```

---

#### Flex Direction

```html
<!-- ❌ Bootstrap -->
<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="d-flex flex-row-reverse">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="flex-col">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex-row-reverse">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<style>
  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flex-row-reverse {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
  }
</style>
```

---

### Colors

#### Text Colors

```html
<!-- ❌ Bootstrap -->
<p class="text-primary">Primary text</p>
<p class="text-danger">Danger text</p>
<p class="text-success">Success text</p>
<p class="text-muted">Muted text</p>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS with Custom Properties -->
<p class="text-primary">Primary text</p>
<p class="text-danger">Danger text</p>
<p class="text-success">Success text</p>
<p class="text-muted">Muted text</p>

<style>
  :root {
    --color-primary: #0d6efd;
    --color-danger: #dc3545;
    --color-success: #198754;
    --color-muted: #6c757d;
  }

  .text-primary {
    color: var(--color-primary);
  }
  .text-danger {
    color: var(--color-danger);
  }
  .text-success {
    color: var(--color-success);
  }
  .text-muted {
    color: var(--color-muted);
  }
</style>
```

**Benefits:**

- Customizable color palette via CSS custom properties
- Easy theme switching (light/dark mode)
- Type-safe with CSS custom properties

---

#### Background Colors

```html
<!-- ❌ Bootstrap -->
<div class="bg-primary text-white">Primary background</div>
<div class="bg-light">Light background</div>
<div class="bg-dark text-white">Dark background</div>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<div class="bg-primary">Primary background</div>
<div class="bg-light">Light background</div>
<div class="bg-dark">Dark background</div>

<style>
  :root {
    --bg-primary: #0d6efd;
    --bg-light: #f8f9fa;
    --bg-dark: #212529;
    --fg-primary: white;
    --fg-light: black;
    --fg-dark: white;
  }

  .bg-primary {
    background-color: var(--bg-primary);
    color: var(--fg-primary);
  }

  .bg-light {
    background-color: var(--bg-light);
    color: var(--fg-light);
  }

  .bg-dark {
    background-color: var(--bg-dark);
    color: var(--fg-dark);
  }
</style>
```

---

### Typography

#### Text Alignment

```html
<!-- ❌ Bootstrap -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<style>
  .text-start {
    text-align: start;
  }
  .text-center {
    text-align: center;
  }
  .text-end {
    text-align: end;
  }
</style>
```

**Note:** Using `start` and `end` instead of `left` and `right` provides better RTL language support.

---

#### Font Weight

```html
<!-- ❌ Bootstrap -->
<p class="fw-bold">Bold text</p>
<p class="fw-normal">Normal text</p>
<p class="fw-light">Light text</p>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS -->
<p class="font-bold">Bold text</p>
<p class="font-normal">Normal text</p>
<p class="font-light">Light text</p>

<style>
  .font-bold {
    font-weight: 700;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-light {
    font-weight: 300;
  }
</style>
```

---

#### Font Size

```html
<!-- ❌ Bootstrap -->
<p class="fs-1">Font size 1 (largest)</p>
<p class="fs-3">Font size 3</p>
<p class="fs-6">Font size 6 (smallest)</p>

<style>
  /* No custom CSS needed */
</style>
```

```html
<!-- ✅ Modern CSS with Type Scale -->
<p class="text-4xl">Font size 1 (largest)</p>
<p class="text-xl">Font size 3</p>
<p class="text-sm">Font size 6 (smallest)</p>

<style>
  :root {
    --text-xs: 0.75rem; /* 12px */
    --text-sm: 0.875rem; /* 14px */
    --text-base: 1rem; /* 16px */
    --text-lg: 1.125rem; /* 18px */
    --text-xl: 1.25rem; /* 20px */
    --text-2xl: 1.5rem; /* 24px */
    --text-3xl: 1.875rem; /* 30px */
    --text-4xl: 2.25rem; /* 36px */
  }

  .text-xs {
    font-size: var(--text-xs);
  }
  .text-sm {
    font-size: var(--text-sm);
  }
  .text-base {
    font-size: var(--text-base);
  }
  .text-lg {
    font-size: var(--text-lg);
  }
  .text-xl {
    font-size: var(--text-xl);
  }
  .text-2xl {
    font-size: var(--text-2xl);
  }
  .text-3xl {
    font-size: var(--text-3xl);
  }
  .text-4xl {
    font-size: var(--text-4xl);
  }
</style>
```

**Benefits:**

- Consistent type scale using custom properties
- Easy to adjust globally
- More semantic naming

---

## Browser Support

All modern CSS features used in this guide are supported by:

| Feature            | Chrome  | Firefox | Safari   | Edge    |
| ------------------ | ------- | ------- | -------- | ------- |
| CSS Grid           | ✅ 57+  | ✅ 52+  | ✅ 10.1+ | ✅ 16+  |
| Flexbox            | ✅ 29+  | ✅ 28+  | ✅ 9+    | ✅ 12+  |
| Custom Properties  | ✅ 49+  | ✅ 31+  | ✅ 9.1+  | ✅ 15+  |
| Logical Properties | ✅ 89+  | ✅ 68+  | ✅ 15+   | ✅ 89+  |
| Container Queries  | ✅ 105+ | ✅ 110+ | ✅ 16+   | ✅ 105+ |
| `gap` in Flexbox   | ✅ 84+  | ✅ 63+  | ✅ 14.1+ | ✅ 84+  |

**Target:** Modern browsers (2020+). No IE11 support.

For production use, consider using [PostCSS](https://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer) for additional compatibility.

---

## ESLint Plugin

Automatically detect Bootstrap class usage and get suggestions for modern CSS alternatives.

### Installation

```bash
npm install --save-dev eslint-plugin-you-dont-need-bootstrap
# or
pnpm add -D eslint-plugin-you-dont-need-bootstrap
```

### Configuration

**ESLint Flat Config (eslint.config.js) - ESLint >= 9.0.0:**

```js
import youDontNeedBootstrap from 'eslint-plugin-you-dont-need-bootstrap';

export default [
  {
    plugins: {
      'you-dont-need-bootstrap': youDontNeedBootstrap,
    },
    rules: {
      'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
      'you-dont-need-bootstrap/no-bootstrap-utilities': 'warn',
    },
  },
  // Or use the recommended preset
  youDontNeedBootstrap.configs.recommended,
];
```

**Legacy Config (.eslintrc.json or .eslintrc.js):**

```json
{
  "plugins": ["you-dont-need-bootstrap"],
  "extends": ["plugin:you-dont-need-bootstrap/recommended-legacy"],
  "rules": {
    "you-dont-need-bootstrap/no-bootstrap-grid": "warn",
    "you-dont-need-bootstrap/no-bootstrap-utilities": "warn"
  }
}
```

### Rules

- **`no-bootstrap-grid`** - Detects Bootstrap grid classes (`container`, `row`, `col-*`) and suggests CSS Grid alternatives
- **`no-bootstrap-utilities`** - Detects Bootstrap utility classes (`m-*`, `p-*`, `d-*`, `text-*`, `bg-*`) and suggests modern CSS

### Example Output

```js
// ⚠️ Warning: Use CSS Grid instead of Bootstrap grid classes
<div className="row">
  <div className="col-md-6">Content</div>
</div>

// Suggested fix:
<div className="grid">
  <div>Content</div>
</div>

// CSS:
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

Found a better alternative? Have a suggestion? [Open an issue](https://github.com/vahidmohammadi/you-dont-need-bootstrap/issues) or submit a pull request!

---

## License

MIT © [Vahid Mohammadi](https://github.com/vahidmohammadi)

---

## Inspiration

Inspired by:

- [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)
- [You-Dont-Need-jQuery](https://github.com/you-dont-need/You-Dont-Need-jQuery)
- [You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs)
