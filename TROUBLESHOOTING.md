# Troubleshooting Guide

## Error: "Definition for rule 'you-dont-need-bootstrap/no-bootstrap-grid' was not found"

This error typically occurs when ESLint can't properly load the plugin. Here are solutions:

### Solution 1: Verify Plugin Installation

```bash
# Check if the plugin is installed
npm list eslint-plugin-you-dont-need-bootstrap
# or
pnpm list eslint-plugin-you-dont-need-bootstrap

# If not installed, install it
npm install --save-dev eslint-plugin-you-dont-need-bootstrap
# or
pnpm add -D eslint-plugin-you-dont-need-bootstrap
```

### Solution 2: Clear ESLint Cache

ESLint caches plugin information. Clear it:

```bash
npx eslint --clear-cache
# or
pnpm exec eslint --clear-cache

# Also clear node_modules cache
rm -rf node_modules/.cache
```

### Solution 3: Restart Your Editor/IDE

If using VS Code or another IDE with ESLint integration:

1. Reload the window (VS Code: Cmd/Ctrl + Shift + P → "Reload Window")
2. Or restart the ESLint server (VS Code: Cmd/Ctrl + Shift + P → "ESLint: Restart ESLint Server")

### Solution 4: Verify .eslintrc Configuration

Make sure your `.eslintrc.js` or `.eslintrc.json` is correctly formatted:

**.eslintrc.js:**

```js
module.exports = {
  plugins: [
    'you-dont-need-bootstrap',
    // ... other plugins
  ],
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
    'you-dont-need-bootstrap/no-bootstrap-utilities': 'warn',
  },
};
```

**.eslintrc.json:**

```json
{
  "plugins": ["you-dont-need-bootstrap"],
  "rules": {
    "you-dont-need-bootstrap/no-bootstrap-grid": "warn",
    "you-dont-need-bootstrap/no-bootstrap-utilities": "warn"
  }
}
```

### Solution 5: For Local Development (Using pnpm link)

If you're testing the plugin locally before publishing:

```bash
# In the plugin directory
cd /path/to/you-dont-need-bootstrap/packages/eslint-plugin
pnpm link --global

# Verify it's linked globally
pnpm list -g | grep you-dont-need-bootstrap

# In your test project
pnpm link --global eslint-plugin-you-dont-need-bootstrap

# Verify the symlink exists
ls -la node_modules/eslint-plugin-you-dont-need-bootstrap
```

### Solution 6: Install from Local Path

Instead of using `pnpm link`, install directly from the local directory:

```bash
# In your test project
pnpm add file:../you-dont-need-bootstrap/packages/eslint-plugin

# Or with absolute path
pnpm add file:/absolute/path/to/you-dont-need-bootstrap/packages/eslint-plugin
```

### Solution 7: Check ESLint Version Compatibility

Make sure you're using a compatible ESLint version:

```bash
npx eslint --version
# or
pnpm exec eslint --version
```

This plugin requires **ESLint >= 8.0.0**.

If you're using ESLint 9.x, you might want to use the flat config format instead.

### Solution 8: Verify Plugin Exports (For Developers)

Test if the plugin exports are correct:

```bash
# In the plugin directory
cd packages/eslint-plugin
node test-exports.js
```

You should see:

```
✅ All exports are valid!
```

### Solution 9: Check for Module Resolution Issues

If using TypeScript or a bundler, ensure module resolution is working:

```bash
# Check if the plugin can be required/imported
node -e "console.log(require('eslint-plugin-you-dont-need-bootstrap'))"
```

### Solution 10: Reinstall Dependencies

Sometimes a clean reinstall helps:

```bash
# Remove node_modules and lock file
rm -rf node_modules pnpm-lock.yaml package-lock.json yarn.lock

# Reinstall
pnpm install
# or
npm install
```

## Still Not Working?

### Debug Steps:

1. **Check plugin location:**

```bash
find node_modules -name "eslint-plugin-you-dont-need-bootstrap"
```

2. **Verify the plugin has rules:**

```bash
cat node_modules/eslint-plugin-you-dont-need-bootstrap/package.json
```

3. **Check ESLint can load the plugin:**

```bash
npx eslint --debug 2>&1 | grep "you-dont-need-bootstrap"
```

4. **Test with a minimal config:**

Create a minimal `.eslintrc.test.js`:

```js
module.exports = {
  plugins: ['you-dont-need-bootstrap'],
  rules: {
    'you-dont-need-bootstrap/no-bootstrap-grid': 'warn',
  },
};
```

Then test:

```bash
npx eslint --config .eslintrc.test.js yourfile.jsx
```

## Common Issues

### Issue: "Cannot find module 'eslint-plugin-you-dont-need-bootstrap'"

**Cause:** Plugin not installed or not in node_modules

**Fix:**

```bash
pnpm add -D eslint-plugin-you-dont-need-bootstrap
```

### Issue: "Rule was not found" but plugin is installed

**Cause:** ESLint cache or editor cache

**Fix:**

```bash
npx eslint --clear-cache
# Restart your editor
```

### Issue: Works in CLI but not in editor

**Cause:** Editor ESLint extension using different ESLint version or config

**Fix:**

- Check VS Code ESLint extension settings
- Make sure editor is using the project's ESLint
- Reload the editor window

### Issue: Plugin works with flat config but not .eslintrc

**Cause:** Using flat config (eslint.config.js) with legacy rule names

**Fix:**

- For flat config: Use `youDontNeedBootstrap.configs.recommended`
- For .eslintrc: Use `plugin:you-dont-need-bootstrap/recommended-legacy`

## Need More Help?

[Open an issue](https://github.com/vahidmohammadi/you-dont-need-bootstrap/issues) with:

1. Your ESLint version (`npx eslint --version`)
2. Your Node version (`node --version`)
3. Your package manager (npm/pnpm/yarn)
4. Your full `.eslintrc` or `eslint.config.js`
5. The complete error message
6. Output of `npm list eslint-plugin-you-dont-need-bootstrap`
