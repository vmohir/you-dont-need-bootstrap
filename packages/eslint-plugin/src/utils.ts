import type { Node } from 'estree-jsx';

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
 */
export function getClassValue(node: Node): string | null {
  // JSX: className="..."
  if (node.type === 'JSXAttribute' && node.value) {
    if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
      return node.value.value;
    }
    // Handle JSXExpressionContainer for template literals or expressions
    if (node.value.type === 'JSXExpressionContainer') {
      const expr = node.value.expression;
      if (expr.type === 'Literal' && typeof expr.value === 'string') {
        return expr.value;
      }
      if (expr.type === 'TemplateLiteral' && expr.quasis.length === 1) {
        return expr.quasis[0]?.value.cooked ?? null;
      }
    }
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
  const matched: string[] = [];
  const matchedPatterns: RegExp[] = [];

  for (const className of classNames) {
    for (const pattern of patterns) {
      if (pattern.test(className)) {
        matched.push(className);
        if (!matchedPatterns.includes(pattern)) {
          matchedPatterns.push(pattern);
        }
      }
    }
  }

  return { matched, patterns: matchedPatterns };
}

/**
 * Create a message about detected Bootstrap classes
 */
export function createMessage(classes: string[], category: string, suggestion: string): string {
  const classesStr = classes.map(c => `'${c}'`).join(', ');
  return `Avoid Bootstrap ${category} classes (${classesStr}). ${suggestion}`;
}
