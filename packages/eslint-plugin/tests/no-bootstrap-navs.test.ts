import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noBootstrapNavs from '../src/rules/no-bootstrap-navs';

const rule = noBootstrapNavs;

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

describe('no-bootstrap-navs', () => {
  it('should pass rule tests', () => {
    ruleTester.run('no-bootstrap-navs', rule, {
      valid: [
        {
          code: '<nav class="custom-nav">Links</nav>',
        },
        {
          code: '<ul class="menu">Menu</ul>',
        },
        {
          code: '<nav>No classes</nav>',
        },
      ],
      invalid: [
        // Base nav class
        {
          code: '<ul class="nav">Links</ul>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        // Nav items
        {
          code: '<li class="nav-item"><a class="nav-link">Link</a></li>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        // Nav styles
        {
          code: '<ul class="nav nav-tabs">Tabs</ul>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        {
          code: '<ul class="nav nav-pills">Pills</ul>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        // Navbar
        {
          code: '<nav class="navbar">Navigation</nav>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        {
          code: '<a class="navbar-brand">Brand</a>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
        // Navbar responsive
        {
          code: '<nav class="navbar navbar-expand-lg">Nav</nav>',
          errors: [
            {
              messageId: 'noBootstrapNavs',
            },
          ],
        },
      ],
    });
  });
});
