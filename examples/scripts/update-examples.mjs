#!/usr/bin/env node

import { ESLint } from 'eslint';
import { writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const examplesDir = join(__dirname, '..', 'rules');
const expectedDir = join(__dirname, '..', 'expected');

async function updateExamples() {
  // Create expected directory if it doesn't exist
  if (!existsSync(expectedDir)) {
    mkdirSync(expectedDir, { recursive: true });
  }

  const eslint = new ESLint({
    cwd: join(__dirname, '..'),
    overrideConfigFile: join(__dirname, '..', 'eslint.config.mjs'),
  });

  const exampleFiles = readdirSync(examplesDir).filter(f => f.endsWith('.jsx'));

  console.log('Updating expected outputs...\n');

  for (const file of exampleFiles) {
    const filePath = join(examplesDir, file);
    const outputFile = join(expectedDir, file.replace('.jsx', '.json'));

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

      // Write to file
      writeFileSync(outputFile, JSON.stringify(messages, null, 2) + '\n');

      console.log(`✓ ${file} - ${messages.length} errors`);
    } catch (error) {
      console.log(`✗ ${file} - ${error.message}`);
    }
  }

  console.log(`\nUpdated ${exampleFiles.length} expected output files\n`);
}

updateExamples().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
