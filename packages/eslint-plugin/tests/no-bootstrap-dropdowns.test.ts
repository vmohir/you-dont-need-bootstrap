import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapDropdowns from '../src/rules/no-bootstrap-dropdowns';

const rule = noBootstrapDropdowns;

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

describe('no-bootstrap-dropdowns', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-dropdowns', rule, {
      valid: [
        {
          code: '<details class="custom-dropdown">Menu</details>',
        },
        {
          code: '<div class="menu">Dropdown</div>',
        },
        {
          code: '<select>No classes</select>',
        },
      ],
      invalid: [
        // Dropdown directions
        {
          code: '<div class="dropdown">Menu</div>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        {
          code: '<div class="dropup">Menu</div>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        {
          code: '<div class="dropend">Menu</div>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        // Dropdown components
        {
          code: '<button class="dropdown-toggle">Toggle</button>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        {
          code: '<ul class="dropdown-menu">Menu</ul>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        {
          code: '<li class="dropdown-item">Item</li>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
        // Dropdown menu alignment
        {
          code: '<ul class="dropdown-menu dropdown-menu-end">Menu</ul>',
          errors: [
            {
              messageId: 'noBootstrapDropdowns',
            },
          ],
        },
      ],
    });
  });
});
