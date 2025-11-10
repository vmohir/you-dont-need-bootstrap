import type { Rule } from 'eslint';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap utility patterns organized by category
const UTILITY_CATEGORIES = {
  spacing: {
    patterns: [
      // Margin
      /^[pm]-([0-5]|auto)$/,
      /^[pm][trblse]-([0-5]|auto)$/,
      // Negative margins
      /^m-n[1-5]$/,
      /^m[trblse]-n[1-5]$/,
    ],
    suggestion:
      'Use CSS custom properties with margin/padding. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#spacing',
  },
  display: {
    patterns: [
      /^d-(none|inline|inline-block|block|grid|table|table-row|table-cell|flex|inline-flex)$/,
      /^d-(sm|md|lg|xl|xxl)-(none|inline|inline-block|block|grid|table|table-row|table-cell|flex|inline-flex)$/,
    ],
    suggestion:
      'Use native CSS display property. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#display',
  },
  flexbox: {
    patterns: [
      /^flex-(row|column|row-reverse|column-reverse|wrap|nowrap|wrap-reverse|fill)$/,
      /^flex-(grow|shrink)-[0-1]$/,
      /^justify-content-(start|end|center|between|around|evenly)$/,
      /^align-items-(start|end|center|baseline|stretch)$/,
      /^align-content-(start|end|center|between|around|stretch)$/,
      /^align-self-(auto|start|end|center|baseline|stretch)$/,
      /^gap-[0-5]$/,
    ],
    suggestion:
      'Use native CSS flexbox properties. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#flexbox',
  },
  colors: {
    patterns: [
      /^text-(primary|secondary|success|danger|warning|info|light|dark|body|muted|white|black-50|white-50)$/,
      /^bg-(primary|secondary|success|danger|warning|info|light|dark|body|white|transparent)$/,
      /^border$/,
      /^border-(primary|secondary|success|danger|warning|info|light|dark|white)$/,
      /^rounded-(top|bottom|start|end|circle|pill|[0-5])$/,
    ],
    suggestion:
      'Use CSS custom properties for colors. See: https://github.com/vahidmohammadi/you-dont-need-bootstrap#colors',
  },
  typography: {
    patterns: [
      /^text-(start|center|end|wrap|nowrap|break|lowercase|uppercase|capitalize)$/,
      /^fs-[1-6]$/,
      /^fw-(light|lighter|normal|bold|bolder)$/,
      /^fst-(normal|italic)$/,
      /^lh-(1|sm|base|lg)$/,
      /^text-decoration-(none|underline|line-through)$/,
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
