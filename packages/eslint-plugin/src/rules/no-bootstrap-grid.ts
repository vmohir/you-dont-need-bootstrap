import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap grid patterns (optimized by merging similar patterns)
const GRID_PATTERNS = [
  // Container: container, container-fluid, container-{breakpoint}
  /^container(-fluid|-(sm|md|lg|xl|xxl))?$/,
  // Row
  /^row$/,
  // Col: col, col-{number}, col-{breakpoint}, col-{breakpoint}-{number}, col-auto
  /^col(-auto|-(1[0-2]|[1-9])|(-(sm|md|lg|xl|xxl)(-(1[0-2]|[1-9]))?)?)?$/,
  // Row cols: row-cols-{number}, row-cols-{breakpoint}-{number}
  /^row-cols-((sm|md|lg|xl|xxl)-)?(1[0-2]|[1-6])$/,
  // Gap: g-{0-5}, gx-{0-5}, gy-{0-5}
  /^g[xy]?-[0-5]$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap grid classes and suggest CSS Grid alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vmohir/you-dont-need-bootstrap#grid-system',
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
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, GRID_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapGrid',
          data: {
            message: createMessage(matched, 'grid'),
          },
        });
      }
    };

    return {
      // Handle JSX className attribute
      JSXAttribute(node: Node) {
        if (
          node.type === 'JSXAttribute' &&
          node.name.type === 'JSXIdentifier' &&
          (node.name.name === 'className' || node.name.name === 'class')
        ) {
          checkClassAttribute(node);
        }
      },

      // Handle HTML class attribute
      Attribute: checkClassAttribute,
    };
  },
};

export default rule;
