/**
 * Extract class names from a string (handles template literals and string concatenation)
 * @param {string} value - The class string value
 * @returns {string[]} - Array of class names
 */
function extractClassNames(value) {
  if (!value || typeof value !== 'string') return [];

  // Split by whitespace and filter out empty strings
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(className => className.trim());
}

/**
 * Get the class attribute value from a JSX attribute or HTML attribute
 * @param {import('eslint').Rule.Node} node - The JSXAttribute or Attribute node
 * @returns {string|null} - The class string value or null
 */
function getClassValue(node) {
  // JSX: className="..."
  if (node.type === 'JSXAttribute' && node.value) {
    if (node.value.type === 'Literal') {
      return node.value.value;
    }
    // Handle JSXExpressionContainer for template literals or expressions
    if (node.value.type === 'JSXExpressionContainer') {
      const expr = node.value.expression;
      if (expr.type === 'Literal' || expr.type === 'StringLiteral') {
        return expr.value;
      }
      if (expr.type === 'TemplateLiteral' && expr.quasis.length === 1) {
        return expr.quasis[0].value.cooked;
      }
    }
  }

  return null;
}

/**
 * Check if class names match any pattern in the list
 * @param {string[]} classNames - Array of class names to check
 * @param {RegExp[]} patterns - Array of RegExp patterns to match
 * @returns {{matched: string[], patterns: RegExp[]}} - Matched classes and their patterns
 */
function matchPatterns(classNames, patterns) {
  const matched = [];
  const matchedPatterns = [];

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
 * @param {string[]} classes - Detected Bootstrap classes
 * @param {string} category - Category name (e.g., 'grid', 'spacing')
 * @param {string} suggestion - Suggested alternative
 * @returns {string} - Formatted message
 */
function createMessage(classes, category, suggestion) {
  const classesStr = classes.map(c => `'${c}'`).join(', ');
  return `Avoid Bootstrap ${category} classes (${classesStr}). ${suggestion}`;
}

module.exports = {
  extractClassNames,
  getClassValue,
  matchPatterns,
  createMessage,
};
