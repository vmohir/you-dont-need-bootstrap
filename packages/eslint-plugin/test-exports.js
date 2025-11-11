// Test CommonJS require
const plugin = require("./dist/index.js");

console.log("Testing CommonJS exports...");
console.log("Plugin meta:", plugin.meta);
console.log("Number of rules:", Object.keys(plugin.rules).length);
console.log("Rules:", Object.keys(plugin.rules));
console.log("Number of configs:", Object.keys(plugin.configs).length);
console.log("Configs:", Object.keys(plugin.configs));

// Verify all expected rules exist
const expectedRules = [
  "no-bootstrap-grid",
  "no-bootstrap-utilities",
  "no-reactstrap-components",
  "no-bootstrap-buttons",
  "no-bootstrap-alerts",
  "no-bootstrap-badges",
  "no-bootstrap-cards",
  "no-bootstrap-modals",
  "no-bootstrap-navs",
  "no-bootstrap-dropdowns",
  "no-bootstrap-forms",
  "no-bootstrap-accordion",
  "no-bootstrap-spinners",
];

const missingRules = expectedRules.filter((rule) => !plugin.rules[rule]);
if (missingRules.length > 0) {
  console.error("Missing rules:", missingRules);
  process.exit(1);
}

console.log("\n✓ All 13 rules exported correctly");
console.log("✓ CommonJS exports working");
