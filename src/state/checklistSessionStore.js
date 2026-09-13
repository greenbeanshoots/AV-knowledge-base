import { useEffect, useState } from 'react';
import { LocalChecklistRepository } from '../repositories/LocalChecklistRepository.js';

export const repository = new LocalChecklistRepository();
export function useSession(sessionId) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; setLoading(true); repository.loadSession(sessionId).then(value => { if (active) { setSession(value); setLoading(false); } }); return () => { active = false; }; }, [sessionId]);
  async function update(patch) { const next = await repository.saveSession({ ...session, ...patch }); setSession(next); return next; }
  return { session, setSession, loading, update };
}
