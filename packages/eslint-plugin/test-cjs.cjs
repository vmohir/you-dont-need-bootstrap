// Quick test to verify CJS exports work
const plugin = require('./src/index.cjs');

console.log('=== Testing CommonJS Exports ===\n');

console.log('Plugin:', plugin);
console.log('\nRules:', Object.keys(plugin.rules));
console.log('Configs:', Object.keys(plugin.configs));

console.log('\n=== Rule Definitions ===');
console.log('no-bootstrap-grid:', typeof plugin.rules['no-bootstrap-grid']);
console.log('no-bootstrap-utilities:', typeof plugin.rules['no-bootstrap-utilities']);

console.log('\n=== Testing Rule Structure ===');
const gridRule = plugin.rules['no-bootstrap-grid'];
console.log('Grid rule has meta:', !!gridRule.meta);
console.log('Grid rule has create:', !!gridRule.create);

console.log('\n✅ CommonJS exports are valid!');
