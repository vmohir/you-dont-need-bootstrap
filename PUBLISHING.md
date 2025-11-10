# Publishing Guide

## Pre-Publishing Checklist

- [x] All tests passing
- [x] Code formatted with Prettier
- [x] ESLint checks passing
- [x] Package.json configured correctly
- [x] README.md in plugin package
- [ ] npm token obtained

## Publishing Steps

### 1. Authenticate with npm

```bash
# Option A: Set token in npm config (persistent)
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE

# Option B: Use environment variable (session only)
export NPM_TOKEN=your_token_here
```

### 2. Verify you're logged in

```bash
npm whoami
```

This should display your npm username.

### 3. Check if package name is available

```bash
npm view eslint-plugin-you-dont-need-bootstrap
```

If you see "404 Not Found", the name is available!

### 4. Do a dry-run (already done!)

```bash
cd packages/eslint-plugin
npm pack --dry-run
```

This shows what will be included in the package.

### 5. Publish the package

```bash
cd packages/eslint-plugin
npm publish --access public
```

**Note:** Use `--access public` because this is a scoped or new package.

### 6. Verify publication

```bash
npm view eslint-plugin-you-dont-need-bootstrap
```

You should see your package details!

### 7. Test installation

```bash
# In a different directory
npm install eslint-plugin-you-dont-need-bootstrap
```

## Publishing Updates

When you want to publish a new version:

### 1. Update version

```bash
cd packages/eslint-plugin

# For patch updates (bug fixes): 0.1.0 → 0.1.1
npm version patch

# For minor updates (new features): 0.1.0 → 0.2.0
npm version minor

# For major updates (breaking changes): 0.1.0 → 1.0.0
npm version major
```

### 2. Commit and tag

```bash
git add packages/eslint-plugin/package.json
git commit -m "chore: bump version to $(node -p "require('./packages/eslint-plugin/package.json').version")"
git tag v$(node -p "require('./packages/eslint-plugin/package.json').version")
git push origin main --tags
```

### 3. Publish

```bash
cd packages/eslint-plugin
npm publish --access public
```

## Automated Publishing with GitHub Actions

The project already has a release workflow in `.github/workflows/release.yml`.

To use it:

1. Add `NPM_TOKEN` as a GitHub secret:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token

2. Create and push a tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The GitHub Action will automatically:

- Run tests
- Build the project
- Publish to npm
- Create a GitHub release

## Troubleshooting

### "You must be logged in to publish packages"

Make sure you've set your npm token correctly:

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
npm whoami  # Should show your username
```

### "You do not have permission to publish"

Make sure you're using `--access public`:

```bash
npm publish --access public
```

### "Package name too similar to existing package"

If the package name is too similar to an existing one, you may need to:

- Choose a different name
- Or contact npm support

## After Publishing

1. **Update README.md** in the root to show the npm badge:

```markdown
[![npm version](https://img.shields.io/npm/v/eslint-plugin-you-dont-need-bootstrap.svg)](https://www.npmjs.com/package/eslint-plugin-you-dont-need-bootstrap)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-you-dont-need-bootstrap.svg)](https://www.npmjs.com/package/eslint-plugin-you-dont-need-bootstrap)
```

2. **Announce it!**
   - Tweet about it
   - Post on Reddit (r/javascript, r/webdev)
   - Share on Discord/Slack communities
   - Submit to awesome lists

3. **Monitor issues** on GitHub for bug reports and feature requests

## Useful Commands

```bash
# View package info
npm view eslint-plugin-you-dont-need-bootstrap

# View all versions
npm view eslint-plugin-you-dont-need-bootstrap versions

# Unpublish (only within 72 hours)
npm unpublish eslint-plugin-you-dont-need-bootstrap@0.1.0

# Deprecate a version
npm deprecate eslint-plugin-you-dont-need-bootstrap@0.1.0 "Please use version 0.2.0"
```
