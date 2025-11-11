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
  },
  display: {
    patterns: [
      /^d-(none|inline|inline-block|block|grid|table|table-row|table-cell|flex|inline-flex)$/,
      /^d-(sm|md|lg|xl|xxl)-(none|inline|inline-block|block|grid|table|table-row|table-cell|flex|inline-flex)$/,
    ],
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
  },
  colors: {
    patterns: [
      /^text-(primary|secondary|success|danger|warning|info|light|dark|body|muted|white|black-50|white-50)$/,
      /^bg-(primary|secondary|success|danger|warning|info|light|dark|body|white|transparent)$/,
      /^border$/,
      /^border-(primary|secondary|success|danger|warning|info|light|dark|white)$/,
      /^rounded-(top|bottom|start|end|circle|pill|[0-5])$/,
    ],
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
  },
  sizing: {
    patterns: [
      /^[hw]-(25|50|75|100|auto)$/,
      /^m[wh]-(25|50|75|100|auto)$/,
      /^min-v[hw]-100$/,
      /^v[hw]-100$/,
    ],
  },
};

type UtilityCategories = keyof typeof UTILITY_CATEGORIES;
export const ALL_CATEGORIES: UtilityCategories[] = [
  'spacing',
  'display',
  'flexbox',
  'colors',
  'typography',
  'sizing',
];
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
              enum: ALL_CATEGORIES,
            },
            default: ALL_CATEGORIES,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context): Rule.RuleListener {
    const options = (context.options[0] as { categories?: UtilityCategories[] }) || {};
    const enabledCategories: UtilityCategories[] = options.categories || ALL_CATEGORIES;

    // Build patterns list based on enabled categories using flatMap
    const categoryMap = new Map<RegExp, string>();
    const allPatterns = enabledCategories.flatMap(category => {
      if (!(category in UTILITY_CATEGORIES)) return [];

      return UTILITY_CATEGORIES[category].patterns.map(pattern => {
        categoryMap.set(pattern, category);
        return pattern;
      });
    });

    const checkClassAttribute = (node: Node): void => {
      const classValue = getClassValue(node);
      if (!classValue) return;

      const classNames = extractClassNames(classValue);
      const { matched, patterns } = matchPatterns(classNames, allPatterns);

      if (matched.length === 0) return;

      // Group matches by category using reduce
      const matchesByCategory = matched.reduce<Record<string, string[]>>((acc, className) => {
        const pattern = patterns.find(p => p.test(className));
        const category = pattern && categoryMap.get(pattern);

        if (category) {
          (acc[category] ??= []).push(className);
        }

        return acc;
      }, {});

      // Report each category separately
      Object.entries(matchesByCategory).forEach(([category, classes]) => {
        const categoryInfo = UTILITY_CATEGORIES[category as UtilityCategories];
        if (categoryInfo) {
          context.report({
            node,
            messageId: 'noBootstrapUtilities',
            data: {
              message: createMessage(classes, category),
            },
          });
        }
      });
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
