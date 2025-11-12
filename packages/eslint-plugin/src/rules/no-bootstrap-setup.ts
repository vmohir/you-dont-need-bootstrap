import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap imports (CSS and JS)',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#setup',
    },
    messages: {
      noBootstrapImport: 'Avoid importing Bootstrap {{type}}: "{{source}}"',
    },
    schema: [],
  },

  create(context): Rule.RuleListener {
    return {
      ImportDeclaration(node: Node) {
        if (node.type !== 'ImportDeclaration') return;

        const source = String(node.source.value);

        // Check for Bootstrap imports
        if (source === 'bootstrap' || source.startsWith('bootstrap/')) {
          let type = 'package';

          // Determine import type
          if (source.includes('/css/') || source.includes('.css')) {
            type = 'CSS';
          } else if (source.includes('/js/') || source.includes('.js')) {
            type = 'JavaScript';
          } else if (source.includes('/scss/') || source.includes('.scss')) {
            type = 'SCSS';
          }

          context.report({
            node,
            messageId: 'noBootstrapImport',
            data: {
              type,
              source,
            },
          });
        }
      },

      // Also check for require() calls
      CallExpression(node: Node) {
        if (
          node.type === 'CallExpression' &&
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments.length > 0
        ) {
          const arg = node.arguments[0];
          if (arg && arg.type === 'Literal' && typeof arg.value === 'string') {
            const source = arg.value;

            if (source === 'bootstrap' || source.startsWith('bootstrap/')) {
              let type = 'package';

              if (source.includes('/css/') || source.includes('.css')) {
                type = 'CSS';
              } else if (source.includes('/js/') || source.includes('.js')) {
                type = 'JavaScript';
              } else if (source.includes('/scss/') || source.includes('.scss')) {
                type = 'SCSS';
              }

              context.report({
                node,
                messageId: 'noBootstrapImport',
                data: {
                  type,
                  source,
                },
              });
            }
          }
        }
      },
    };
  },
};

export default rule;
