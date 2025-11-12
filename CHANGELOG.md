# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Legacy ESLint config support (.eslintrc format)
  - `recommended-legacy` preset for .eslintrc configurations
  - `strict-legacy` preset for .eslintrc configurations
  - Documentation for both flat config and legacy config usage
- Example `.eslintrc.example.json` demonstrating legacy config usage

## [0.1.0] - TBD

### Added

- Initial release
- ESLint plugin to detect Bootstrap usage
- Two core rules:
  - `no-bootstrap-grid` - Detects Bootstrap grid classes (container, row, col-\*)
  - `no-bootstrap-utilities` - Detects Bootstrap utility classes (spacing, display, flexbox, colors, typography)
- Two flat config presets:
  - `recommended` - Warnings for development-friendly feedback
  - `strict` - Errors to enforce migration
- Comprehensive README with Bootstrap → Modern CSS comparisons
- Full test coverage with Vitest
- Prettier formatting configuration
- CI/CD with GitHub Actions
- Contributing guidelines
- Publishing guide

### Features

- Detects 15+ Bootstrap grid class patterns
- Detects 90+ Bootstrap utility class patterns
- Configurable by category (spacing, display, flexbox, colors, typography)
- Helpful error messages with documentation links
- Support for both JSX and HTML class attributes
- Modern ESLint flat config support (ESLint >= 9.0.0)
- Legacy .eslintrc format support (ESLint >= 8.0.0)

[unreleased]: https://github.com/vmohir/you-dont-need-bootstrap/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/vmohir/you-dont-need-bootstrap/releases/tag/v0.1.0
