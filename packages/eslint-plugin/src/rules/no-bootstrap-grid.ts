import type { Rule } from 'eslint';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap grid patterns
const GRID_PATTERNS = [
  /^container$/,
  /^container-fluid$/,
  /^container-(sm|md|lg|xl|xxl)$/,
  /^row$/,
  /^col$/,
  /^col-(1[0-2]|[1-9])$/,
  /^col-(sm|md|lg|xl|xxl)$/,
  /^col-(sm|md|lg|xl|xxl)-(1[0-2]|[1-9])$/,
  /^col-auto$/,
  /^row-cols-(1[0-2]|[1-6])$/,
  /^row-cols-(sm|md|lg|xl|xxl)-(1[0-2]|[1-6])$/,
  /^g-[0-5]$/,
  /^gx-[0-5]$/,
  /^gy-[0-5]$/,
];

const SUGGESTION =
  'Use CSS Grid with `display: grid` and `grid-template-columns` instead. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#grid-system';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap grid classes and suggest CSS Grid alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#grid-system',
    },
    messages: {
      noBootstrapGrid: '{{message}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          suggest: {
            type: 'string',
            enum: ['css-grid', 'flexbox'],
            default: 'css-grid',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context): Rule.RuleListener {
    return {
      // Handle JSX className attribute
      JSXAttribute(node) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return;
        }

        const classValue = getClassValue(node);
        if (!classValue) return;

        const classNames = extractClassNames(classValue);
        const { matched } = matchPatterns(classNames, GRID_PATTERNS);

        if (matched.length > 0) {
          context.report({
            node,
            messageId: 'noBootstrapGrid',
            data: {
              message: createMessage(matched, 'grid', SUGGESTION),
            },
          });
        }
      },

      // Handle HTML class attribute (for .html or template files if configured)
      Attribute(node) {
        if (node.key?.name !== 'class' && node.key?.value !== 'class') {
          return;
        }

        const classValue = getClassValue(node);
        if (!classValue) return;

        const classNames = extractClassNames(classValue);
        const { matched } = matchPatterns(classNames, GRID_PATTERNS);

        if (matched.length > 0) {
          context.report({
            node,
            messageId: 'noBootstrapGrid',
            data: {
              message: createMessage(matched, 'grid', SUGGESTION),
            },
          });
        }
      },
    };
  },
};

export default rule;
