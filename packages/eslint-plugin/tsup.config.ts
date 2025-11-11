import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable for now due to type complexity
  clean: true,
  splitting: false,
  sourcemap: true,
  outDir: 'dist',
  external: ['eslint'],
  cjsInterop: true, // Enable proper CommonJS interop for legacy eslintrc
  footer: {
    // For legacy .eslintrc support, unwrap default export for CommonJS
    js: 'if (typeof module !== "undefined" && module.exports && module.exports.default) { module.exports = module.exports.default; }',
  },
});
