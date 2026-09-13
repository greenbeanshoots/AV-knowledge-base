import { ChecklistRepository } from './ChecklistRepository.js';

const STORAGE_KEY = 'worship-checklists-v1';
const emptyData = { version: 1, sessions: [] };

function readData() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...emptyData, ...parsed, sessions: Array.isArray(parsed.sessions) ? parsed.sessions.filter(isValidSession) : [] };
  }
  catch { return { ...emptyData }; }
}
function writeData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function createId() { return globalThis.crypto?.randomUUID?.() || `session-${Date.now()}`; }
function isValidSession(session) {
  return Boolean(session && typeof session.id === 'string' && typeof session.checklistId === 'string' && session.configuration && typeof session.configuration === 'object' && session.itemStates && typeof session.itemStates === 'object');
}
function validateImportedData(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.sessions) || data.sessions.some(session => !isValidSession(session))) throw new Error('This file is not a valid checklist export.');
  for (const session of data.sessions) for (const state of Object.values(session.itemStates)) {
    if (!state || !['complete', 'incomplete'].includes(state.status) || typeof state.note !== 'string' || typeof state.issueFlagged !== 'boolean') throw new Error('This file contains an invalid checklist item state.');
  }
}

export class LocalChecklistRepository extends ChecklistRepository {
  async listSessions() { return readData().sessions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); }
  async loadSession(sessionId) { return readData().sessions.find(session => session.id === sessionId) || null; }
  async saveSession(session) {
    const data = readData();
    const next = { ...session, updatedAt: new Date().toISOString() };
    const index = data.sessions.findIndex(candidate => candidate.id === session.id);
    if (index === -1) data.sessions.push(next); else data.sessions[index] = next;
    writeData(data); return next;
  }
  async createSession(configuration) {
    const now = new Date().toISOString();
    const session = { id: createId(), checklistId: configuration.checklistId, configuration, itemStates: {}, currentSectionId: null, currentItemId: null, createdAt: now, updatedAt: now, completedAt: null };
    return this.saveSession(session);
  }
  async deleteSession(sessionId) { const data = readData(); writeData({ ...data, sessions: data.sessions.filter(session => session.id !== sessionId) }); }
  async exportData() { return JSON.stringify(readData(), null, 2); }
  async importData(serialized) {
    const imported = typeof serialized === 'string' ? JSON.parse(serialized) : serialized;
    validateImportedData(imported);
    writeData(imported); return imported;
  }
  async resetData() { localStorage.removeItem(STORAGE_KEY); }
}
