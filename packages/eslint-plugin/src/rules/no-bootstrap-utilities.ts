import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';
import { extractClassNames, getClassValue, matchPatterns, createMessage } from '../utils';

// Bootstrap utility patterns organized by category (optimized by merging similar patterns)
const UTILITY_CATEGORIES = {
  spacing: {
    patterns: [
      // Padding: p-{0-5|auto}, p{direction}-{0-5|auto}
      /^p([trblse])?-([0-5]|auto)$/,
      // Margin: m-{0-5|auto|n1-5}, m{direction}-{0-5|auto|n1-5}
      /^m([trblse])?-(n[1-5]|[0-5]|auto)$/,
    ],
  },
  display: {
    patterns: [
      // Display: d-{value}, d-{breakpoint}-{value}
      /^d-((sm|md|lg|xl|xxl)-)?(none|inline|inline-block|block|grid|table|table-row|table-cell|flex|inline-flex)$/,
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
      // Width/Height: w-{value}, h-{value}, mw-{value}, mh-{value}
      /^m?[wh]-(25|50|75|100|auto)$/,
      // Viewport: vw-100, vh-100, min-vw-100, min-vh-100
      /^(min-)?v[wh]-100$/,
    ],
  },
  position: {
    patterns: [
      // Position: position-static, position-relative, position-absolute, position-fixed, position-sticky
      /^position-(static|relative|absolute|fixed|sticky)$/,
      // Fixed/Sticky helpers: fixed-top, fixed-bottom, sticky-top, sticky-bottom
      /^(fixed|sticky)-(top|bottom)$/,
      // Positioning: top-0, top-50, top-100, bottom-0, start-0, end-0, translate-middle
      /^(top|bottom|start|end)-(0|50|100)$/,
      /^translate-middle(-x|-y)?$/,
    ],
  },
  shadows: {
    patterns: [
      // Shadow: shadow, shadow-sm, shadow-lg, shadow-none
      /^shadow(-sm|-lg|-none)?$/,
    ],
  },
  borders: {
    patterns: [
      // Border: border, border-0, border-top/end/bottom/start
      /^border(-0|-(top|end|bottom|start))?$/,
      // Border width: border-1, border-2, border-3, border-4, border-5
      /^border-[1-5]$/,
      // Rounded: rounded, rounded-{size}, rounded-circle, rounded-pill
      /^rounded(-0|-1|-2|-3|-circle|-pill)?$/,
      // Rounded sides: rounded-top, rounded-end, rounded-bottom, rounded-start
      /^rounded-(top|end|bottom|start)$/,
    ],
  },
  opacity: {
    patterns: [
      // Opacity: opacity-0, opacity-25, opacity-50, opacity-75, opacity-100
      /^opacity-(0|25|50|75|100)$/,
    ],
  },
  overflow: {
    patterns: [
      // Overflow: overflow-auto, overflow-hidden, overflow-visible, overflow-scroll
      /^overflow-(auto|hidden|visible|scroll)$/,
      // Overflow X/Y: overflow-x-auto, overflow-y-hidden, etc.
      /^overflow-[xy]-(auto|hidden|visible|scroll)$/,
    ],
  },
  visibility: {
    patterns: [
      // Visibility: visible, invisible
      /^(in)?visible$/,
      // Visually hidden: visually-hidden, visually-hidden-focusable
      /^visually-hidden(-focusable)?$/,
    ],
  },
  interactions: {
    patterns: [
      // User select: user-select-all, user-select-auto, user-select-none
      /^user-select-(all|auto|none)$/,
      // Pointer events: pe-none, pe-auto
      /^pe-(none|auto)$/,
    ],
  },
  zindex: {
    patterns: [
      // Z-index: z-n1, z-0, z-1, z-2, z-3
      /^z-(n1|0|1|2|3)$/,
    ],
  },
  other: {
    patterns: [
      // Text utilities: text-truncate, text-break
      /^text-(truncate|break)$/,
      // Layout: clearfix, stretched-link
      /^(clearfix|stretched-link)$/,
      // Aspect ratio: ratio, ratio-1x1, ratio-4x3, ratio-16x9, ratio-21x9
      /^ratio(-1x1|-4x3|-16x9|-21x9)?$/,
      // Vertical rule
      /^vr$/,
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
  'position',
  'shadows',
  'borders',
  'opacity',
  'overflow',
  'visibility',
  'interactions',
  'zindex',
  'other',
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
    const options = (context.options[0] as { categories?: UtilityCategories[] } | undefined) ?? {};
    const enabledCategories: UtilityCategories[] = options.categories ?? ALL_CATEGORIES;

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
        context.report({
          node,
          messageId: 'noBootstrapUtilities',
          data: {
            message: createMessage(classes, category),
          },
        });
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
