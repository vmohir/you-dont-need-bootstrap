import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap accordion class patterns
const ACCORDION_PATTERNS = [
  // Base accordion
  /^accordion(-flush)?$/,
  // Accordion components
  /^accordion-(item|header|button|body|collapse)$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap accordion classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#accordion',
    },
    messages: {
      noBootstrapAccordion:
        'Avoid Bootstrap accordion classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, ACCORDION_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapAccordion',
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
