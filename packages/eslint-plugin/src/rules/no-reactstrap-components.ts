import type { Rule } from "eslint";
import type { Node } from "estree-jsx";

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow Reactstrap components and suggest modern alternatives",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/vahidmohammadi/you-dont-need-bootstrap#reactstrap",
    },
    messages: {
      noReactstrapComponents: "Avoid Reactstrap component '{{componentName}}'",
    },
    schema: [],
  },

  create(context): Rule.RuleListener {
    // Track imports from 'reactstrap'
    // Map of local name -> original name (e.g., 'RSButton' -> 'Button')
    const importedComponents = new Map<string, string>();
    let namespaceImport: string | null = null;

    return {
      // Track import declarations from 'reactstrap'
      ImportDeclaration(node: Node) {
        if (node.type !== "ImportDeclaration") return;

        // Check if importing from 'reactstrap'
        if (node.source.value === "reactstrap") {
          // Handle named imports: import { Button, Alert } from 'reactstrap'
          node.specifiers.forEach((specifier) => {
            if (specifier.type === "ImportSpecifier") {
              const localName = specifier.local.name;
              const importedName =
                specifier.imported.type === "Identifier"
                  ? specifier.imported.name
                  : localName;
              importedComponents.set(localName, importedName);
            }
            // Handle namespace imports: import * as Reactstrap from 'reactstrap'
            else if (specifier.type === "ImportNamespaceSpecifier") {
              namespaceImport = specifier.local.name;
            }
          });
        }
      },

      // Detect usage of imported Reactstrap components
      JSXOpeningElement(node: Node) {
        if (node.type !== "JSXOpeningElement") return;

        let componentName: string | null = null;
        let originalName: string | null = null;

        // Handle regular component: <Button />
        if (node.name.type === "JSXIdentifier") {
          const localName = node.name.name;
          if (importedComponents.has(localName)) {
            componentName = localName;
            originalName = importedComponents.get(localName) || localName;
          }
        }
        // Handle namespace component: <Reactstrap.Button />
        else if (node.name.type === "JSXMemberExpression") {
          const obj = node.name.object;
          const prop = node.name.property;
          if (obj.type !== "JSXIdentifier") {
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
            messageId: "noReactstrapComponents",
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
