import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapSpinners from '../src/rules/no-bootstrap-spinners';

const rule = noBootstrapSpinners;

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

describe('no-bootstrap-spinners', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-spinners', rule, {
      valid: [
        {
          code: '<div class="custom-spinner">Loading...</div>',
        },
        {
          code: '<div class="loader">Loading</div>',
        },
        {
          code: '<div>Loading...</div>',
        },
      ],
      invalid: [
        // Border spinner
        {
          code: '<div class="spinner-border" role="status">Loading...</div>',
          errors: [
            {
              messageId: 'noBootstrapSpinners',
            },
          ],
        },
        {
          code: '<div class="spinner-border-sm">Loading...</div>',
          errors: [
            {
              messageId: 'noBootstrapSpinners',
            },
          ],
        },
        // Grow spinner
        {
          code: '<div class="spinner-grow" role="status">Loading...</div>',
          errors: [
            {
              messageId: 'noBootstrapSpinners',
            },
          ],
        },
        {
          code: '<div class="spinner-grow-sm">Loading...</div>',
          errors: [
            {
              messageId: 'noBootstrapSpinners',
            },
          ],
        },
      ],
    });
  });
});
