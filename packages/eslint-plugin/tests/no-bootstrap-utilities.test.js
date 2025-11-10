import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-bootstrap-utilities.js';

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
          code: '<div className="custom-class">Content</div>',
        },
        {
          code: '<div className="flex items-center">Content</div>',
        },
        {
          code: '<div>No classes</div>',
        },
      ],
      invalid: [
        // Spacing utilities
        {
          code: '<div className="mt-3">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="p-4">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="mx-auto">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Display utilities
        {
          code: '<div className="d-flex">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="d-none d-md-block">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Flexbox utilities
        {
          code: '<div className="justify-content-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="align-items-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="flex-column">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Color utilities
        {
          code: '<div className="text-primary">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="bg-danger">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Typography utilities
        {
          code: '<div className="text-center">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="fw-bold">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        // Multiple utilities
        {
          code: '<div className="d-flex justify-content-center align-items-center">Content</div>',
          errors: [{ messageId: 'noBootstrapUtilities' }, { messageId: 'noBootstrapUtilities' }],
        },
        {
          code: '<div className="mt-3 mb-4 text-center">Content</div>',
          errors: [{ messageId: 'noBootstrapUtilities' }, { messageId: 'noBootstrapUtilities' }],
        },
      ],
    });
  });

  it('should respect category options', () => {
    ruleTester.run('no-bootstrap-utilities with spacing only', rule, {
      valid: [
        {
          code: '<div className="d-flex">Content</div>',
          options: [{ categories: ['spacing'] }],
        },
        {
          code: '<div className="text-center">Content</div>',
          options: [{ categories: ['spacing'] }],
        },
      ],
      invalid: [
        {
          code: '<div className="mt-3">Content</div>',
          options: [{ categories: ['spacing'] }],
          errors: [
            {
              messageId: 'noBootstrapUtilities',
            },
          ],
        },
        {
          code: '<div className="p-4">Content</div>',
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
