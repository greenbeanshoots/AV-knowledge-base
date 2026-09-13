import { contentValidation } from '../src/domain/checklist/content.js';

if (!contentValidation.valid) {
  console.error(contentValidation.errors.join('\n'));
  process.exit(1);
}

console.log('Checklist content is valid.');
