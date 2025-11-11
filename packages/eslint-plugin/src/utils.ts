import type { Node } from 'estree-jsx';
import { Rule } from 'eslint';

/**
 * Extract class names from a string (handles template literals and string concatenation)
 */
export function extractClassNames(value: unknown): string[] {
  if (!value || typeof value !== 'string') return [];

  // Split by whitespace and filter out empty strings
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(className => className.trim());
}

/**
 * Get the class attribute value from a JSX attribute or HTML attribute
 * Returns an array of possible class values (for ternary expressions)
 */
export function getClassValue(node: Node): string | null {
  // JSX: className="..."
  if (!(node.type === 'JSXAttribute' && node.value)) {
    return null;
  }
  if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
    return node.value.value;
  }
  if (node.value.type !== 'JSXExpressionContainer') {
    return null;
  }

  const expr = node.value.expression;

  // Handle JSXExpressionContainer for template literals or expressions
  if (expr.type === 'Literal' && typeof expr.value === 'string') {
    return expr.value;
  }
  if (expr.type === 'TemplateLiteral' && expr.quasis.length === 1) {
    return expr.quasis[0]?.value.cooked ?? null;
  }

  // Handle ternary expressions: className={condition ? 'class-a' : 'class-b'}
  if (expr.type === 'ConditionalExpression') {
    const values: string[] = [];
    if (expr.consequent.type === 'Literal' && typeof expr.consequent.value === 'string') {
      values.push(expr.consequent.value);
    }
    if (expr.alternate.type === 'Literal' && typeof expr.alternate.value === 'string') {
      values.push(expr.alternate.value);
    }
    // Return combined classes from both branches
    return values.length > 0 ? values.join(' ') : null;
  }

  return null;
}

/**
 * Check if class names match any pattern in the list
 */
export function matchPatterns(
  classNames: string[],
  patterns: RegExp[]
): { matched: string[]; patterns: RegExp[] } {
  const matched = classNames.filter(className =>
    patterns.some(pattern => pattern.test(className))
  );

  const matchedPatterns = patterns.filter(pattern =>
    classNames.some(className => pattern.test(className))
  );

  return { matched, patterns: matchedPatterns };
}

/**
 * Create a message about detected Bootstrap classes
 */
export function createMessage(classes: string[], category: string): string {
  const classesStr = classes.map(c => `'${c}'`).join(', ');
  return `Avoid Bootstrap ${category} classes (${classesStr})`;
}

/**
 * Factory function to create a Bootstrap detection rule
 */
export function createBootstrapComponentRule(config: {
  name: string;
  patterns: RegExp[];
  url: string;
}): Rule.RuleModule {
  return {
    meta: {
      type: 'suggestion',
      docs: {
        description: `Disallow Bootstrap ${config.name} classes`,
        category: 'Best Practices',
        recommended: true,
        url: config.url,
      },
      messages: {
        noBootstrap: 'Avoid Bootstrap {{name}} classes "{{classes}}"',
      },
    },

    create(context): Rule.RuleListener {
      const checkClassAttribute = (node: Node): void => {
        const classValue = getClassValue(node);
        if (!classValue) return;

        const classNames = extractClassNames(classValue);
        const { matched } = matchPatterns(classNames, config.patterns);

        if (matched.length > 0) {
          const capitalizedName =
            config.name.charAt(0).toUpperCase() + config.name.slice(1);
          context.report({
            node,
            messageId: `noBootstrap${capitalizedName}`,
            data: {
              name: config.name,
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
}
