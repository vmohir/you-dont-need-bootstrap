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
});
