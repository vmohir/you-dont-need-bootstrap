import type { Rule } from 'eslint';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap utility patterns organized by category
const UTILITY_CATEGORIES = {
  spacing: {
    patterns: [
      // Margin
      /^[pm]-[0-5]$/,
      /^[pm]-auto$/,
      /^[pm][trblse]-[0-5]$/,
      /^[pm][trblse]-auto$/,
      // Negative margins
      /^m-n[1-5]$/,
      /^m[trblse]-n[1-5]$/,
    ],
    suggestion:
      'Use CSS custom properties with margin/padding. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#spacing',
  },
  display: {
    patterns: [
      /^d-none$/,
      /^d-inline$/,
      /^d-inline-block$/,
      /^d-block$/,
      /^d-grid$/,
      /^d-table$/,
      /^d-table-row$/,
      /^d-table-cell$/,
      /^d-flex$/,
      /^d-inline-flex$/,
      /^d-(sm|md|lg|xl|xxl)-none$/,
      /^d-(sm|md|lg|xl|xxl)-inline$/,
      /^d-(sm|md|lg|xl|xxl)-inline-block$/,
      /^d-(sm|md|lg|xl|xxl)-block$/,
      /^d-(sm|md|lg|xl|xxl)-grid$/,
      /^d-(sm|md|lg|xl|xxl)-flex$/,
    ],
    suggestion:
      'Use native CSS display property. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#display',
  },
  flexbox: {
    patterns: [
      /^flex-row$/,
      /^flex-column$/,
      /^flex-row-reverse$/,
      /^flex-column-reverse$/,
      /^flex-wrap$/,
      /^flex-nowrap$/,
      /^flex-wrap-reverse$/,
      /^flex-fill$/,
      /^flex-grow-[0-1]$/,
      /^flex-shrink-[0-1]$/,
      /^justify-content-start$/,
      /^justify-content-end$/,
      /^justify-content-center$/,
      /^justify-content-between$/,
      /^justify-content-around$/,
      /^justify-content-evenly$/,
      /^align-items-start$/,
      /^align-items-end$/,
      /^align-items-center$/,
      /^align-items-baseline$/,
      /^align-items-stretch$/,
      /^align-content-start$/,
      /^align-content-end$/,
      /^align-content-center$/,
      /^align-content-between$/,
      /^align-content-around$/,
      /^align-content-stretch$/,
      /^align-self-auto$/,
      /^align-self-start$/,
      /^align-self-end$/,
      /^align-self-center$/,
      /^align-self-baseline$/,
      /^align-self-stretch$/,
      /^gap-[0-5]$/,
    ],
    suggestion:
      'Use native CSS flexbox properties. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#flexbox',
  },
  colors: {
    patterns: [
      /^text-primary$/,
      /^text-secondary$/,
      /^text-success$/,
      /^text-danger$/,
      /^text-warning$/,
      /^text-info$/,
      /^text-light$/,
      /^text-dark$/,
      /^text-body$/,
      /^text-muted$/,
      /^text-white$/,
      /^text-black-50$/,
      /^text-white-50$/,
      /^bg-primary$/,
      /^bg-secondary$/,
      /^bg-success$/,
      /^bg-danger$/,
      /^bg-warning$/,
      /^bg-info$/,
      /^bg-light$/,
      /^bg-dark$/,
      /^bg-body$/,
      /^bg-white$/,
      /^bg-transparent$/,
    ],
    suggestion:
      'Use CSS custom properties for colors. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#colors',
  },
  typography: {
    patterns: [
      /^text-start$/,
      /^text-center$/,
      /^text-end$/,
      /^text-wrap$/,
      /^text-nowrap$/,
      /^text-break$/,
      /^text-lowercase$/,
      /^text-uppercase$/,
      /^text-capitalize$/,
      /^fs-[1-6]$/,
      /^fw-light$/,
      /^fw-lighter$/,
      /^fw-normal$/,
      /^fw-bold$/,
      /^fw-bolder$/,
      /^fst-italic$/,
      /^fst-normal$/,
      /^lh-1$/,
      /^lh-sm$/,
      /^lh-base$/,
      /^lh-lg$/,
      /^text-decoration-none$/,
      /^text-decoration-underline$/,
      /^text-decoration-line-through$/,
    ],
    suggestion:
      'Use native CSS typography properties. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#typography',
  },
};

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Bootstrap utility classes and suggest modern CSS alternatives',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vahidmohammadi/you-dont-need-bootstrap#utilities',
    },
    messages: {
      noBootstrapUtilities: '{{message}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          categories: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['spacing', 'display', 'flexbox', 'colors', 'typography'],
            },
            default: ['spacing', 'display', 'flexbox', 'colors', 'typography'],
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const enabledCategories = options.categories || [
      'spacing',
      'display',
      'flexbox',
      'colors',
      'typography',
    ];

    // Build patterns list based on enabled categories
    const allPatterns = [];
    const categoryMap = new Map();

    for (const category of enabledCategories) {
      if (UTILITY_CATEGORIES[category]) {
        for (const pattern of UTILITY_CATEGORIES[category].patterns) {
          allPatterns.push(pattern);
          categoryMap.set(pattern, category);
        }
      }
    }

    function checkClassAttribute(node) {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched, patterns } = matchPatterns(classNames, allPatterns);

      if (matched.length > 0) {
        // Group matches by category for better error messages
        const matchesByCategory = {};
        for (let i = 0; i < matched.length; i++) {
          const className = matched[i];
          const pattern = patterns.find(p => p.test(className));
          if (pattern) {
            const category = categoryMap.get(pattern);
            if (!matchesByCategory[category]) {
              matchesByCategory[category] = [];
            }
            matchesByCategory[category].push(className);
          }
        }

        // Report each category separately
        for (const [category, classes] of Object.entries(matchesByCategory)) {
          const categoryInfo = UTILITY_CATEGORIES[category];
          context.report({
            node,
            messageId: 'noBootstrapUtilities',
            data: {
              message: createMessage(classes, category, categoryInfo.suggestion),
            },
          });
        }
      }
    }

    return {
      // Handle JSX className attribute
      JSXAttribute(node) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return;
        }
        checkClassAttribute(node);
      },

      // Handle HTML class attribute
      Attribute(node) {
        if (node.key?.name !== 'class' && node.key?.value !== 'class') {
          return;
        }
        checkClassAttribute(node);
      },
    };
  },
};

export default rule;
