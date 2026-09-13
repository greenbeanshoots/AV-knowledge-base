const checklistTypes = new Set(['preservice', 'soundcheck', 'service-operation', 'postservice']);

export function validateContent(checklists, instruments, guidanceArticles) {
  const errors = [];
  const instrumentIds = new Set();
  const guidanceIds = new Set();
  const checklistIds = new Set();
  const itemIds = new Set();

  for (const instrument of instruments) {
    if (!instrument.id) errors.push('Instrument is missing an ID.');
    if (instrumentIds.has(instrument.id)) errors.push(`Duplicate instrument ID: ${instrument.id}`);
    instrumentIds.add(instrument.id);
  }
  for (const article of guidanceArticles) {
    if (!article.id) errors.push('Guidance article is missing an ID.');
    if (guidanceIds.has(article.id)) errors.push(`Duplicate guidance article ID: ${article.id}`);
    guidanceIds.add(article.id);
  }
  for (const checklist of checklists) {
    if (!checklist.id) errors.push('Checklist is missing an ID.');
    if (checklistIds.has(checklist.id)) errors.push(`Duplicate checklist ID: ${checklist.id}`);
    if (!checklistTypes.has(checklist.type)) errors.push(`Invalid checklist type: ${checklist.type}`);
    if (!checklist.title) errors.push(`Checklist ${checklist.id || '(unknown)'} is missing a title.`);
    checklistIds.add(checklist.id);
    const sectionIds = new Set();
    for (const section of checklist.sections || []) {
      if (!section.id) errors.push(`Checklist ${checklist.id} has a section without an ID.`);
      if (sectionIds.has(section.id)) errors.push(`Duplicate section ID: ${section.id}`);
      sectionIds.add(section.id);
      const orders = new Set();
      for (const item of section.items || []) {
        if (!item.id) errors.push(`Section ${section.id} has an item without an ID.`);
        if (itemIds.has(item.id)) errors.push(`Duplicate checklist item ID: ${item.id}`);
        if (!item.title) errors.push(`Item ${item.id || '(unknown)'} is missing a title.`);
        if (!item.completionCriteria) errors.push(`Item ${item.id || '(unknown)'} is missing completion criteria.`);
        if (!item.problemResponse) errors.push(`Item ${item.id || '(unknown)'} is missing problem-response guidance.`);
        if (item.instrumentId && !instrumentIds.has(item.instrumentId)) errors.push(`Item ${item.id} references missing instrument: ${item.instrumentId}`);
        if (item.guidanceArticleId && !guidanceIds.has(item.guidanceArticleId)) errors.push(`Item ${item.id} references missing guidance article: ${item.guidanceArticleId}`);
        if (item.dependency && !itemIds.has(item.dependency)) errors.push(`Item ${item.id} references missing dependency: ${item.dependency}`);
        if (orders.has(item.order)) errors.push(`Duplicate item order ${item.order} in section ${section.id}`);
        orders.add(item.order);
        itemIds.add(item.id);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}
