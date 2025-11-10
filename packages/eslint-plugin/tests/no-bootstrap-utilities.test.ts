import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapUtilities from '../src/rules/no-bootstrap-utilities';

const rule = noBootstrapUtilities;

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

describe('no-bootstrap-utilities', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-utilities', rule, {
      valid: [
        {
          code: '<div class="custom-class">Content</div>',
        },
        {
          code: '<div class="flex items-center">Content</div>',
        },
        {
          code: '<div>No classes</div>',
        },
      ],
      invalid: [
        // Spacing utilities
        {
          code: '<div class="mt-3">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="p-4">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="mx-auto">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Display utilities
        {
          code: '<div class="d-flex">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="d-none d-md-block">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Flexbox utilities
        {
          code: '<div class="justify-content-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="align-items-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="flex-column">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Color utilities
        {
          code: '<div class="text-primary">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="bg-danger">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Typography utilities
        {
          code: '<div class="text-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="fw-bold">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Multiple utilities
        {
          code: '<div class="d-flex justify-content-center align-items-center">Content</div>',
          errors: [{ messageId: 'noBootstrapUtilities' }, { messageId: 'noBootstrapUtilities' }],
        },
        {
          code: '<div class="mt-3 mb-4 text-center">Content</div>',
          errors: [{ messageId: 'noBootstrapUtilities' }, { messageId: 'noBootstrapUtilities' }],
        },
      ],
    });
  });

  it('should respect category options', () => {
    ruleTester.run('no-bootstrap-utilities with spacing only', rule, {
      valid: [
        {
          code: '<div class="d-flex">Content</div>',
          options: [{ categories: ['spacing'] }],
        },
        {
          code: '<div class="text-center">Content</div>',
          options: [{ categories: ['spacing'] }],
        },
      ],
      invalid: [
        {
          code: '<div class="mt-3">Content</div>',
          options: [{ categories: ['spacing'] }],
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="p-4">Content</div>',
          options: [{ categories: ['spacing'] }],
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
      ],
    });
  });
});
