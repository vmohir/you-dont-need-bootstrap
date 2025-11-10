# Contributing to You-Dont-Need-Bootstrap

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (Node version, npm/pnpm version, OS)
- Code samples or screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and descriptive title
- Detailed explanation of the suggested enhancement
- Examples of how it would be used
- Why this enhancement would be useful

### Adding Bootstrap Alternatives

We're always looking to expand our coverage of Bootstrap features. To add a new Bootstrap → Modern CSS comparison:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/add-bootstrap-alternative`)
3. Add your comparison to the appropriate section in `README.md`
4. Follow the existing format:
   - Show Bootstrap example with ❌
   - Show Modern CSS example with ✅
   - Include CSS code with clear comments
   - Highlight benefits of the modern approach
   - Add browser compatibility notes if relevant
5. Update the ESLint plugin if applicable:
   - Add detection patterns to the relevant rule
   - Add tests for the new patterns
6. Commit your changes
7. Push to your fork
8. Open a Pull Request

### Contributing to the ESLint Plugin

To add new rules or improve existing ones:

1. Create or modify the rule in `packages/eslint-plugin/src/rules/`
2. Add comprehensive tests in `packages/eslint-plugin/tests/`
3. Update documentation in README.md
4. Ensure all tests pass: `pnpm test`

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup Steps

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/you-dont-need-bootstrap.git
cd you-dont-need-bootstrap
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run tests**

```bash
pnpm test
```

4. **Run linter**

```bash
pnpm lint
```

5. **Format code**

```bash
pnpm format
# or check formatting without modifying files
pnpm format:check
```

### Project Structure

```
you-dont-need-bootstrap/
├── .github/
│   └── workflows/         # CI/CD workflows
├── packages/
│   └── eslint-plugin/     # ESLint plugin package
│       ├── src/
│       │   ├── rules/     # ESLint rules
│       │   ├── configs/   # Preset configurations
│       │   └── index.js   # Plugin entry point
│       └── tests/         # Test files
├── README.md              # Main documentation
├── CONTRIBUTING.md        # This file
└── package.json           # Root package.json
```

### Making Changes

1. **Create a new branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make your changes**
   - Write clear, concise commit messages
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

```bash
pnpm test
pnpm format:check
pnpm lint
```

4. **Commit your changes**

```bash
git add .
git commit -m "feat: add your feature description"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

5. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Ensure CI checks pass

## Style Guidelines

### Code Style

- Use ES modules (`import`/`export`)
- Use descriptive variable and function names
- Add comments for complex logic
- Follow existing code formatting

### Documentation Style

- Use clear, concise language
- Provide practical examples
- Explain the "why" not just the "what"
- Keep code examples simple and focused
- Use proper markdown formatting

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

## Testing

All contributions should include tests:

- ESLint rules must have comprehensive test coverage
- Tests should cover both valid and invalid cases
- Include edge cases and error conditions

Run tests with:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with coverage
pnpm test -- --coverage
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
