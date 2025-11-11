import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap alert class patterns
const ALERT_PATTERNS = [
  // Base alert class
  /^alert$/,
  // Alert variants (contextual colors)
  /^alert-(primary|secondary|success|danger|warning|info|light|dark)$/,
  // Alert components
  /^alert-(dismissible|link|heading)$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap alert classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#alerts',
    },
    messages: {
      noBootstrapAlerts:
        'Avoid Bootstrap alert classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, ALERT_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapAlerts',
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
