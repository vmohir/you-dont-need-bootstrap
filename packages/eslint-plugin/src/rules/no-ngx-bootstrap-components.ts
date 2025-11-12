import type { Rule } from 'eslint';
import type { Node } from 'estree-jsx';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow NGX Bootstrap components',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/vmohir/you-dont-need-bootstrap#ngx-bootstrap',
    },
    messages: {
      noNgxBootstrapComponents: 'Avoid NGX Bootstrap component "{{componentName}}"',
    },
    schema: [],
  },

  create(context): Rule.RuleListener {
    const importedComponents = new Map<string, string>();
    let namespaceImport: string | null = null;

    return {
      ImportDeclaration(node: Node) {
        if (node.type !== 'ImportDeclaration') return;

        if (node.source.value === 'ngx-bootstrap' || String(node.source.value).startsWith('ngx-bootstrap/')) {
          node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportSpecifier') {
              const localName = specifier.local.name;
              const importedName =
                specifier.imported.type === 'Identifier'
                  ? specifier.imported.name
                  : localName;
              importedComponents.set(localName, importedName);
            } else if (specifier.type === 'ImportNamespaceSpecifier') {
              namespaceImport = specifier.local.name;
            }
          });
        }
      },

      JSXOpeningElement(node: Node) {
        if (node.type !== 'JSXOpeningElement') return;

        let componentName: string | null = null;
        let originalName: string | null = null;

        if (node.name.type === 'JSXIdentifier') {
          const localName = node.name.name;
          if (importedComponents.has(localName)) {
            componentName = localName;
            originalName = importedComponents.get(localName) || localName;
          }
        } else if (node.name.type === 'JSXMemberExpression') {
          const obj = node.name.object;
          const prop = node.name.property;
          if (obj.type !== 'JSXIdentifier') {
            return;
          }
          const namespace = obj.name;
          if (namespace === namespaceImport) {
            componentName = `${namespace}.${prop.name}`;
            originalName = prop.name;
          }
        }

        if (componentName && originalName) {
          context.report({
            node,
            messageId: 'noNgxBootstrapComponents',
            data: {
              componentName: originalName,
            },
          });
        }
      },
    };
  },
};

export default rule;
