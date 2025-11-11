import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapModals from '../src/rules/no-bootstrap-modals';

const rule = noBootstrapModals;

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

describe('no-bootstrap-modals', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-modals', rule, {
      valid: [
        {
          code: '<dialog class="custom-modal">Content</dialog>',
        },
        {
          code: '<div class="overlay">Modal</div>',
        },
        {
          code: '<dialog>No classes</dialog>',
        },
      ],
      invalid: [
        // Base modal class
        {
          code: '<div class="modal">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        // Modal dialog
        {
          code: '<div class="modal-dialog">Dialog</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        {
          code: '<div class="modal-dialog-centered">Centered</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        // Modal sections
        {
          code: '<div class="modal-content">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        {
          code: '<div class="modal-header">Header</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        {
          code: '<div class="modal-body">Body</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
        // Modal sizes
        {
          code: '<div class="modal-lg">Large modal</div>',
          errors: [
            {
              messageId: 'noBootstrapModals',
            },
          ],
        },
      ],
    });
  });
});
