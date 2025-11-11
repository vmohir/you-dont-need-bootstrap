import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapButtons from '../src/rules/no-bootstrap-buttons';

const rule = noBootstrapButtons;

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

describe('no-bootstrap-buttons', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-buttons', rule, {
      valid: [
        {
          code: '<button class="custom-button">Click me</button>',
        },
        {
          code: '<button class="primary-action">Submit</button>',
        },
        {
          code: '<button>No classes</button>',
        },
      ],
      invalid: [
        // Base button class
        {
          code: '<button class="btn">Click me</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        // Button variants
        {
          code: '<button class="btn btn-primary">Submit</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        {
          code: '<button class="btn btn-danger">Delete</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        // Outline variants
        {
          code: '<button class="btn btn-outline-secondary">Cancel</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        // Button sizes
        {
          code: '<button class="btn btn-sm">Small</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        {
          code: '<button class="btn btn-lg">Large</button>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        // Button groups
        {
          code: '<div class="btn-group">Buttons</div>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
        {
          code: '<div class="btn-toolbar">Toolbar</div>',
          errors: [
            {
              messageId: 'noBootstrapButtons',
            },
          ],
        },
      ],
    });
  });
});
