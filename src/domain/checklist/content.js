import { checklists } from '../../content/checklists.js';
import { instruments } from '../../content/instruments.js';
import { guidanceArticles } from '../../content/guidance.js';
import { validateContent } from './validation.js';

export const contentValidation = validateContent(checklists, instruments, guidanceArticles);
if (!contentValidation.valid) console.error('Checklist content validation failed', contentValidation.errors);

export function getChecklist(checklistId) { return checklists.find(checklist => checklist.id === checklistId); }
export function getItem(checklist, itemId) {
  return checklist?.sections.flatMap(section => section.items).find(item => item.id === itemId);
}
export { checklists, instruments, guidanceArticles };
