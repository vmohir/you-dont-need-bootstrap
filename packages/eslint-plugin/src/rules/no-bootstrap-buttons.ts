import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap button class patterns
const BUTTON_PATTERNS = [
  // Base button class
  /^btn$/,
  // Button variants (contextual colors)
  /^btn-(primary|secondary|success|danger|warning|info|light|dark|link)$/,
  // Outline button variants
  /^btn-outline-(primary|secondary|success|danger|warning|info|light|dark)$/,
  // Button sizes
  /^btn-(sm|lg)$/,
  // Button block (legacy)
  /^btn-block$/,
  // Button groups
  /^btn-group(-vertical|-sm|-lg)?$/,
  /^btn-toolbar$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap button classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#buttons',
    },
    messages: {
      noBootstrapButtons:
        'Avoid Bootstrap button classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, BUTTON_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapButtons',
          data: {
            classes: matched.join(', '),
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
