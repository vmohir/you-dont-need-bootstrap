import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapBadges from '../src/rules/no-bootstrap-badges';

const rule = noBootstrapBadges;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe('no-bootstrap-badges', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-badges', rule, {
      valid: [
        {
          code: '<span class="custom-badge">New</span>',
        },
        {
          code: '<span class="tag">Label</span>',
        },
        {
          code: '<span>No classes</span>',
        },
      ],
      invalid: [
        // Base badge class
        {
          code: '<span class="badge">New</span>',
          errors: [
            {
              messageId: 'noBootstrapBadges',
            },
          ],
        },
        // Badge variants
        {
          code: '<span class="badge badge-primary">Primary</span>',
          errors: [
            {
              messageId: 'noBootstrapBadges',
            },
          ],
        },
        {
          code: '<span class="badge badge-success">Success</span>',
          errors: [
            {
              messageId: 'noBootstrapBadges',
            },
          ],
        },
        {
          code: '<span class="badge badge-danger">Error</span>',
          errors: [
            {
              messageId: 'noBootstrapBadges',
            },
          ],
        },
        // Badge pill
        {
          code: '<span class="badge badge-pill badge-info">Info</span>',
          errors: [
            {
              messageId: 'noBootstrapBadges',
            },
          ],
        },
      ],
    });
  });
});
