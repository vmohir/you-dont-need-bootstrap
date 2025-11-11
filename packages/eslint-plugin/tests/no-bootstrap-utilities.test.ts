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
        // Sizing utilities
        {
          code: '<div class="w-100">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="h-50">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="vw-100">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Position utilities
        {
          code: '<div class="position-relative">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="fixed-top">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="top-0 start-0">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Shadow utilities
        {
          code: '<div class="shadow">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="shadow-lg">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="shadow-sm">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Border utilities
        {
          code: '<div class="border">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="rounded">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="rounded-circle">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Opacity utilities
        {
          code: '<div class="opacity-50">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="opacity-0">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="opacity-100">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Overflow utilities
        {
          code: '<div class="overflow-hidden">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="overflow-auto">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="overflow-x-scroll">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Visibility utilities
        {
          code: '<div class="visible">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="invisible">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="visually-hidden">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Interaction utilities
        {
          code: '<div class="user-select-none">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="pe-none">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="user-select-all">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Z-index utilities
        {
          code: '<div class="z-0">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="z-1">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="z-3">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Other utilities
        {
          code: '<div class="text-truncate">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="clearfix">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div class="ratio ratio-16x9">Content</div>',
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
