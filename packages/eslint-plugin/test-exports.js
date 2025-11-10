// Quick test to verify plugin exports are correct
import plugin from './src/index.js';

console.log('=== Testing Plugin Exports ===\n');

console.log('Default export:', plugin);
console.log('\nRules:', Object.keys(plugin.rules));
console.log('Configs:', Object.keys(plugin.configs));

console.log('\n=== Rule Definitions ===');
console.log('no-bootstrap-grid:', typeof plugin.rules['no-bootstrap-grid']);
console.log('no-bootstrap-utilities:', typeof plugin.rules['no-bootstrap-utilities']);

console.log('\n=== Testing Rule Structure ===');
const gridRule = plugin.rules['no-bootstrap-grid'];
console.log('Grid rule has meta:', !!gridRule.meta);
console.log('Grid rule has create:', !!gridRule.create);

console.log('\n✅ All exports are valid!');
