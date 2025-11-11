import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapForms from '../src/rules/no-bootstrap-forms';

const rule = noBootstrapForms;

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

describe('no-bootstrap-forms', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-forms', rule, {
      valid: [
        {
          code: '<input class="custom-input" />',
        },
        {
          code: '<label class="input-label">Label</label>',
        },
        {
          code: '<input type="text" />',
        },
      ],
      invalid: [
        // Form controls
        {
          code: '<input class="form-control" />',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        {
          code: '<input class="form-control-sm" />',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        {
          code: '<input class="form-control-lg" />',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        // Form select
        {
          code: '<select class="form-select">Options</select>',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        // Form check
        {
          code: '<div class="form-check"><input class="form-check-input" /></div>',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        {
          code: '<label class="form-check-label">Label</label>',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        // Form switch
        {
          code: '<div class="form-switch">Switch</div>',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
        // Input groups
        {
          code: '<div class="input-group">Group</div>',
          errors: [
            {
              messageId: 'noBootstrapForms',
            },
          ],
        },
      ],
    });
  });
});
