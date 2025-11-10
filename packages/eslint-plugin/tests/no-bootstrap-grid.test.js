import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-bootstrap-grid.js';

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
          code: '<div className="grid">Content</div>',
        },
        {
          code: '<div className="flex">Content</div>',
        },
        {
          code: '<div className="my-custom-class">Content</div>',
        },
        {
          code: '<div>No classes</div>',
        },
      ],
      invalid: [
        {
          code: '<div className="container">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div className="row">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div className="col-md-6">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div className="row"><div className="col-6">Content</div></div>',
          errors: [{ messageId: 'noBootstrapGrid' }, { messageId: 'noBootstrapGrid' }],
        },
        {
          code: '<div className="container-fluid">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapGrid',
            },
          ],
        },
        {
          code: '<div className="col-lg-4 col-md-6">Content</div>',
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
