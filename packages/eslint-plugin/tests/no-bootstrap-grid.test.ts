import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapGrid from '../src/rules/no-bootstrap-grid';

const rule = noBootstrapGrid;

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

describe('no-bootstrap-grid', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-grid', rule, {
      valid: [
        {
          code: '<div class="grid">Content</div>',
        },
        {
          code: '<div class="flex">Content</div>',
        },
        {
          code: '<div class="my-custom-class">Content</div>',
        },
        {
          code: '<div>No classes</div>',
        },
      ],
      invalid: [
        {
          code: '<div class="container">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div class="row">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div class="col-md-6">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div class="row"><div class="col-6">Content</div></div>',
          errors: [{ messageId: 'noBootstrapGrid' }, { messageId: 'noBootstrapGrid' }],
        },
        {
          code: '<div class="container-fluid">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div class="col-lg-4 col-md-6">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
      ],
    });
  });
});
