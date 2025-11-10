import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
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

type UtilityCategories = keyof typeof UTILITY_CATEGORIES;
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

  create(context): Rule.RuleListener {
    const options = (context.options[0] as { categories?: UtilityCategories[] }) || {};
    const enabledCategories: UtilityCategories[] =
      options.categories || (['spacing', 'display', 'flexbox', 'colors', 'typography'] as const);

    // Build patterns list based on enabled categories
    const allPatterns: RegExp[] = [];
    const categoryMap = new Map<RegExp, string>();

    for (const category of enabledCategories) {
      if (!(category in UTILITY_CATEGORIES)) {
        continue;
      }
      for (const pattern of UTILITY_CATEGORIES[category].patterns) {
        allPatterns.push(pattern);
        categoryMap.set(pattern, category);
      }
    }

    function checkClassAttribute(node: Node): void {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched, patterns } = matchPatterns(classNames, allPatterns);

      if (matched.length > 0) {
        // Group matches by category for better error messages
        const matchesByCategory: Record<string, string[]> = {};
        for (const className of matched) {
          if (!className) continue;
          const pattern = patterns.find(p => p.test(className));
          if (!pattern) continue;
          const category = categoryMap.get(pattern);
          if (!category) continue;
          matchesByCategory[category] = [...(matchesByCategory[category] ?? []), className];
        }

        // Report each category separately
        for (const [category, classes] of Object.entries(matchesByCategory)) {
          const categoryInfo = UTILITY_CATEGORIES[category as UtilityCategories];
          if (categoryInfo && classes) {
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
    }

    return {
      // Handle JSX className attribute
      JSXAttribute(node: Node) {
        if (node.type !== 'JSXAttribute') return;
        if (
          node.name.type === 'JSXIdentifier' &&
          node.name.name !== 'className' &&
          node.name.name !== 'class'
        ) {
          return;
        }
        checkClassAttribute(node);
      },

      // Handle HTML class attribute
      Attribute(node: Node) {
        checkClassAttribute(node);
      },
    };
  },
};

export default rule;
