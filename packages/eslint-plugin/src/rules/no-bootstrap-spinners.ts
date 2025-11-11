import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap spinner class patterns
const SPINNER_PATTERNS = [
  // Border spinner
  /^spinner-border(-sm)?$/,
  // Grow spinner
  /^spinner-grow(-sm)?$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap spinner classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#spinners',
    },
    messages: {
      noBootstrapSpinners:
        'Avoid Bootstrap spinner classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, SPINNER_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapSpinners',
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
