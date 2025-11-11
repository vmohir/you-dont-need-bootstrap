import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapAlerts from '../src/rules/no-bootstrap-alerts';

const rule = noBootstrapAlerts;

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

describe('no-bootstrap-alerts', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-alerts', rule, {
      valid: [
        {
          code: '<div class="custom-alert">Message</div>',
        },
        {
          code: '<div class="notification">Alert</div>',
        },
        {
          code: '<div role="alert">No classes</div>',
        },
      ],
      invalid: [
        // Base alert class
        {
          code: '<div class="alert">Message</div>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
        // Alert variants
        {
          code: '<div class="alert alert-success">Success message</div>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
        {
          code: '<div class="alert alert-danger">Error message</div>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
        {
          code: '<div class="alert alert-warning">Warning</div>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
        // Dismissible alerts
        {
          code: '<div class="alert alert-info alert-dismissible">Info</div>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
        // Alert link
        {
          code: '<a class="alert-link">Link</a>',
          errors: [
            {
              messageId: 'noBootstrapAlerts',
            },
          ],
        },
      ],
    });
  });
});
