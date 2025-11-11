import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapCards from '../src/rules/no-bootstrap-cards';

const rule = noBootstrapCards;

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

describe('no-bootstrap-cards', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-cards', rule, {
      valid: [
        {
          code: '<div class="custom-card">Content</div>',
        },
        {
          code: '<article class="post">Content</article>',
        },
        {
          code: '<div>No classes</div>',
        },
      ],
      invalid: [
        // Base card class
        {
          code: '<div class="card">Content</div>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        // Card sections
        {
          code: '<div class="card"><div class="card-body">Body</div></div>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        {
          code: '<div class="card-header">Header</div>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        // Card content
        {
          code: '<h5 class="card-title">Title</h5>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        {
          code: '<p class="card-text">Text content</p>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        // Card images
        {
          code: '<img class="card-img-top" src="image.jpg" />',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
        // Card layouts
        {
          code: '<div class="card-group">Cards</div>',
          errors: [
            {
              messageId: 'noBootstrapCards',
            },
          ],
        },
      ],
    });
  });
});
