# Release Process

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate versioning and package publishing.

## How It Works

1. Commits to the `main` branch trigger the release workflow
2. Semantic-release analyzes commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
3. Based on commit types, it determines the next version:
   - `feat:` → Minor version bump (0.x.0)
   - `fix:` → Patch version bump (0.0.x)
   - `BREAKING CHANGE:` → Major version bump (x.0.0)
4. Automatically generates CHANGELOG.md
5. Creates a GitHub release
6. Publishes to npm

## Commit Message Format

Use these prefixes for your commits:

- `feat:` - New feature (triggers minor release)
- `fix:` - Bug fix (triggers patch release)
- `perf:` - Performance improvement (triggers patch release)
- `refactor:` - Code refactoring (triggers patch release)
- `docs:` - Documentation changes (no release)
- `test:` - Test changes (no release)
- `chore:` - Maintenance tasks (no release)
- `ci:` - CI/CD changes (no release)

For breaking changes, add `BREAKING CHANGE:` in the commit body or use `!` after the type:

```
feat!: remove legacy config support

BREAKING CHANGE: Legacy .eslintrc format is no longer supported
```

## Setting Up NPM Token for CI

### Step 1: Create an NPM Granular Access Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Click your profile icon → **Access Tokens**
3. Click **Generate New Token** → **Granular Access Token**
4. Configure the token:
   - **Token Name**: `GitHub Actions - you-dont-need-bootstrap`
   - **Expiration**: Choose expiration (recommended: 1 year, then rotate)
   - **Packages and scopes**:
     - Select **"Only select packages and scopes"**
     - Find `eslint-plugin-you-dont-need-bootstrap` in the list
     - Check **Read and write** permissions
5. Click **Generate Token**
6. Copy the generated token (starts with `npm_...`)

**Important**: Granular tokens allow you to limit permissions to specific packages, making them more secure than classic tokens.

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### Step 3: Verify Permissions

Make sure your GitHub repository has these settings:

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**
3. Save changes

### Step 4: Test the Setup

1. Make a commit with a semantic message:

   ```bash
   git commit -m "feat: add new sizing utilities detection"
   ```

2. Push to main:

   ```bash
   git push origin main
   ```

3. Check the **Actions** tab to see the release workflow run

4. If successful, you'll see:
   - New version published to npm
   - CHANGELOG.md updated
   - GitHub release created

## Troubleshooting

### "npm ERR! code ENEEDAUTH"

- Your npm token is missing or incorrect
- Regenerate the token and update the GitHub secret

### "npm ERR! 403 Forbidden"

- Your npm account doesn't have publish permissions for this package
- Make sure you're a maintainer of `eslint-plugin-you-dont-need-bootstrap`
- Your granular token may not have **Read and write** permissions - regenerate with correct permissions

### "npm ERR! code EOTP" or 2FA errors

- Granular access tokens should work in CI without 2FA
- If you see 2FA prompts, your token configuration may be incorrect
- Make sure you created a **Granular Access Token**, not a Classic Token

### Release doesn't trigger

- Check commit message follows conventional commits format
- Ensure you're pushing to the `main` branch
- Check if `[skip ci]` is in the commit message

## Manual Release (Emergency)

If you need to publish manually:

```bash
# Make sure you're on main and up to date
git checkout main
git pull

# Build the package
pnpm build

# Bump version manually (choose one)
npm version patch  # 0.0.x
npm version minor  # 0.x.0
npm version major  # x.0.0

# Publish
npm publish --access public

# Push version changes
git push --follow-tags
```

## Local Testing

To test semantic-release locally without actually publishing:

```bash
# Install semantic-release CLI globally
npm install -g semantic-release-cli

# Dry run (won't publish)
npx semantic-release --dry-run
```
