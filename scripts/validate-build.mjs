import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distRoot = resolve('dist');
const indexPath = resolve(distRoot, 'index.html');
if (!existsSync(indexPath)) {
  console.error('Build validation failed: dist/index.html is missing.');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');
const assetReferences = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).filter(reference => !reference.startsWith('http'));
const invalidAbsoluteAssets = assetReferences.filter(reference => reference.startsWith('/'));
if (invalidAbsoluteAssets.length) {
  console.error(`Build validation failed: absolute asset paths found: ${invalidAbsoluteAssets.join(', ')}`);
  process.exit(1);
}

for (const reference of assetReferences) {
  const assetPath = resolve(distRoot, reference.replace(/^\.\//, ''));
  if (!existsSync(assetPath)) {
    console.error(`Build validation failed: referenced asset is missing: ${reference}`);
    process.exit(1);
  }
}

console.log(`Build output is valid: ${assetReferences.length} relative assets checked.`);
