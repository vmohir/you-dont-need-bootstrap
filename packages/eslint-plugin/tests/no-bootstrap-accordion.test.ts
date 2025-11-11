import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapAccordion from '../src/rules/no-bootstrap-accordion';

const rule = noBootstrapAccordion;

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

describe('no-bootstrap-accordion', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-accordion', rule, {
      valid: [
        {
          code: '<details class="custom-accordion">Content</details>',
        },
        {
          code: '<div class="collapsible">Accordion</div>',
        },
        {
          code: '<details>No classes</details>',
        },
      ],
      invalid: [
        // Base accordion
        {
          code: '<div class="accordion">Items</div>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        {
          code: '<div class="accordion-flush">Flush accordion</div>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        // Accordion components
        {
          code: '<div class="accordion-item">Item</div>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        {
          code: '<h2 class="accordion-header">Header</h2>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        {
          code: '<button class="accordion-button">Toggle</button>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        {
          code: '<div class="accordion-body">Body content</div>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
        {
          code: '<div class="accordion-collapse">Collapse</div>',
          errors: [
            {
              messageId: 'noBootstrapAccordion',
            },
          ],
        },
      ],
    });
  });
});
