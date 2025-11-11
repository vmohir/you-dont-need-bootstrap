import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap badge class patterns
const BADGE_PATTERNS = [
  // Base badge class
  /^badge$/,
  // Badge variants (contextual colors)
  /^badge-(primary|secondary|success|danger|warning|info|light|dark)$/,
  // Badge pill (legacy)
  /^badge-pill$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap badge classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#badges',
    },
    messages: {
      noBootstrapBadges:
        'Avoid Bootstrap badge classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, BADGE_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapBadges',
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
