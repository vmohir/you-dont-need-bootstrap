import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap nav and navbar class patterns
const NAV_PATTERNS = [
  // Base nav class
  /^nav$/,
  // Nav items
  /^nav-(link|item)$/,
  // Nav styles
  /^nav-(tabs|pills|fill|justified)$/,
  // Navbar base
  /^navbar$/,
  // Navbar components
  /^navbar-(brand|toggler|collapse|nav|text)$/,
  // Navbar responsive
  /^navbar-expand(-sm|-md|-lg|-xl|-xxl)?$/,
  // Navbar themes
  /^navbar-(light|dark)$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap nav and navbar classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#navs',
    },
    messages: {
      noBootstrapNavs:
        'Avoid Bootstrap nav/navbar classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, NAV_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapNavs',
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
