const KEY = 'mixwise-progress-v2';
const empty = { set: [], prep: {}, lastPage: 'home' };
export function loadProgress(){ try { return {...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch { return {...empty}; } }
export function saveProgress(progress){ localStorage.setItem(KEY, JSON.stringify(progress)); }
export function setPage(progress, page){ progress.lastPage = page; saveProgress(progress); }
export function togglePrep(progress, instrumentId, itemId, checked){ progress.prep[instrumentId] ||= {}; progress.prep[instrumentId][itemId] = checked ? 'complete' : 'incomplete'; saveProgress(progress); }
export function exportProgress(progress){ const blob = new Blob([JSON.stringify(progress,null,2)], {type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='mixwise-progress.json'; a.click(); URL.revokeObjectURL(a.href); }
