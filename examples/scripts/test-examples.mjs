#!/usr/bin/env node

import { ESLint } from 'eslint';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const examplesDir = join(__dirname, '..', 'rules');
const expectedDir = join(__dirname, '..', 'expected');

async function testExamples() {
  const eslint = new ESLint({
    cwd: join(__dirname, '..'),
    overrideConfigFile: join(__dirname, '..', 'eslint.config.mjs'),
  });

  const exampleFiles = readdirSync(examplesDir).filter(f => f.endsWith('.jsx'));

  let passed = 0;
  let failed = 0;
  const failures = [];

  console.log('Testing example files...\n');

  for (const file of exampleFiles) {
    const filePath = join(examplesDir, file);
    const expectedFile = join(expectedDir, file.replace('.jsx', '.json'));

    try {
      // Run ESLint
      const results = await eslint.lintFiles([filePath]);
      const result = results[0];

      // Extract messages
      const messages = result.messages.map(msg => ({
        ruleId: msg.ruleId,
        message: msg.message,
        line: msg.line,
        column: msg.column,
      }));

      // Load expected results
      const expected = JSON.parse(readFileSync(expectedFile, 'utf-8'));

      // Compare
      const actual = JSON.stringify(messages, null, 2);
      const expectedStr = JSON.stringify(expected, null, 2);

      if (actual === expectedStr) {
        console.log(`✓ ${file}`);
        passed++;
      } else {
        console.log(`✗ ${file}`);
        console.log(`  Expected ${expected.length} errors, got ${messages.length}`);
        failed++;
        failures.push({
          file,
          expected: expected.length,
          actual: messages.length,
        });
      }
    } catch (error) {
      console.log(`✗ ${file} - ${error.message}`);
      failed++;
      failures.push({
        file,
        error: error.message,
      });
    }
  }

  console.log(`\n${passed} passed, ${failed} failed out of ${exampleFiles.length} total\n`);

  if (failures.length > 0) {
    console.log('Failures:');
    failures.forEach(f => {
      console.log(`  - ${f.file}`);
      if (f.error) {
        console.log(`    Error: ${f.error}`);
      } else {
        console.log(`    Expected: ${f.expected}, Actual: ${f.actual}`);
      }
    });
    process.exit(1);
  }
}

testExamples().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
