# eslint-plugin-you-dont-need-bootstrap

ESLint plugin to detect Bootstrap usage and suggest modern CSS alternatives.

Part of the [You-Dont-Need-Bootstrap](https://github.com/vmohir/you-dont-need-bootstrap) project.

## Installation

```bash
npm install --save-dev eslint-plugin-you-dont-need-bootstrap
# or
pnpm add -D eslint-plugin-you-dont-need-bootstrap
# or
yarn add -D eslint-plugin-you-dont-need-bootstrap
```

## Usage

### ESLint Flat Config (ESLint >= 9.0.0)

**eslint.config.js:**

```js
import youDontNeedBootstrap from "eslint-plugin-you-dont-need-bootstrap";

export default [
  // Use the recommended preset
  youDontNeedBootstrap.configs.recommended,

  // Or configure rules individually
  {
    plugins: {
      "you-dont-need-bootstrap": youDontNeedBootstrap,
    },
    rules: {
      "you-dont-need-bootstrap/no-bootstrap-grid": "warn",
      "you-dont-need-bootstrap/no-bootstrap-utilities": "warn",
    },
  },
];
```

### Legacy Config (.eslintrc)

**.eslintrc.json:**

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

**.eslintrc.js:**

```js
module.exports = {
  plugins: ["you-dont-need-bootstrap"],
  extends: ["plugin:you-dont-need-bootstrap/recommended-legacy"],
  rules: {
    "you-dont-need-bootstrap/no-bootstrap-grid": "warn",
    "you-dont-need-bootstrap/no-bootstrap-utilities": "warn",
  },
};
```

## Presets

### Flat Config Presets (ESLint >= 9.0.0)

#### `recommended`

Warns about Bootstrap usage without blocking development.

```js
import youDontNeedBootstrap from "eslint-plugin-you-dont-need-bootstrap";

export default [youDontNeedBootstrap.configs.recommended];
```

#### `strict`

Treats Bootstrap usage as errors to enforce migration.

```js
import youDontNeedBootstrap from "eslint-plugin-you-dont-need-bootstrap";

export default [youDontNeedBootstrap.configs.strict];
```

### Legacy Config Presets (.eslintrc)

#### `recommended-legacy`

Warns about Bootstrap usage without blocking development.

```json
{
  "extends": ["plugin:you-dont-need-bootstrap/recommended-legacy"]
}
```

#### `strict-legacy`

Treats Bootstrap usage as errors to enforce migration.

```json
{
  "extends": ["plugin:you-dont-need-bootstrap/strict-legacy"]
}
```

## Rules

### `no-bootstrap-grid`

Detects Bootstrap grid classes and suggests CSS Grid alternatives.

**Detected patterns:**

- Container classes: `container`, `container-fluid`, `container-{breakpoint}`
- Row class: `row`
- Column classes: `col`, `col-{number}`, `col-{breakpoint}`, `col-{breakpoint}-{number}`

**Example:**

```jsx
// ❌ Avoid
<div className="container">
  <div className="row">
    <div className="col-md-6">Content</div>
  </div>
</div>

// ✅ Use modern CSS Grid
<div className="container">
  <div className="grid">
    <div>Content</div>
  </div>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
</style>
```

### `no-bootstrap-utilities`

Detects Bootstrap utility classes and suggests modern CSS alternatives.

**Options:**

```js
{
  'you-dont-need-bootstrap/no-bootstrap-utilities': ['warn', {
    categories: ['spacing', 'display', 'flexbox', 'colors', 'typography']
  }]
}
```

**Detected categories:**

1. **Spacing** - `m-*`, `mt-*`, `mb-*`, `mx-*`, `my-*`, `p-*`, etc.
2. **Display** - `d-flex`, `d-none`, `d-block`, etc.
3. **Flexbox** - `justify-content-*`, `align-items-*`, `flex-*`, etc.
4. **Colors** - `text-*`, `bg-*`
5. **Typography** - `text-center`, `fw-bold`, `fs-*`, etc.

**Example:**

```jsx
// ❌ Avoid
<div className="d-flex justify-content-center align-items-center">
  <p className="text-primary fw-bold">Hello</p>
</div>

// ✅ Use modern CSS
<div className="flex-center">
  <p className="text-primary bold">Hello</p>
</div>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-primary {
  color: var(--color-primary);
}

.bold {
  font-weight: 700;
}
</style>
```

## When to Use This Plugin

This plugin is helpful when:

- Migrating from Bootstrap to modern CSS
- Preventing new Bootstrap dependencies in a project
- Learning modern CSS alternatives to Bootstrap
- Maintaining consistency in a codebase

## When NOT to Use This Plugin

Consider not using this plugin if:

- You're maintaining a legacy project that depends on Bootstrap
- You don't have time for a migration
- Your team prefers utility-first frameworks

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © [Vahid Mohammadi](https://github.com/vmohir)

## Resources

- [Main Repository](https://github.com/vmohir/you-dont-need-bootstrap)
- [Documentation](https://github.com/vmohir/you-dont-need-bootstrap#readme)
- [Report Issues](https://github.com/vmohir/you-dont-need-bootstrap/issues)
