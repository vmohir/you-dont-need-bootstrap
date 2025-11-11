import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap form class patterns
const FORM_PATTERNS = [
  // Form controls
  /^form-control(-sm|-lg|-plaintext)?$/,
  // Form select
  /^form-select(-sm|-lg)?$/,
  // Form check (checkbox/radio)
  /^form-check(-input|-label|-inline)?$/,
  // Form switch
  /^form-switch$/,
  // Form labels and text
  /^form-(label|text)$/,
  // Floating labels
  /^form-floating$/,
  // Input groups
  /^input-group(-text|-sm|-lg)?$/,
  // Form range
  /^form-range$/,
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap form classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#forms',
    },
    messages: {
      noBootstrapForms:
        'Avoid Bootstrap form classes "{{classes}}"',
    },
  },

  create(context): Rule.RuleListener {
    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched } = matchPatterns(classNames, FORM_PATTERNS);

      if (matched.length > 0) {
        context.report({
          node,
          messageId: 'noBootstrapForms',
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
