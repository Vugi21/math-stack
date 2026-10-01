// Where progress is kept. LocalBackend writes to this browser. SupabaseBackend writes to the database
// and keeps a local copy plus an outbox, so nothing is lost when the connection drops.
import { emptyState, mergeState } from './state.js';

function safeStorage() {
  try { const ls = globalThis.localStorage; ls.setItem('__t', '1'); ls.removeItem('__t'); return ls; } catch { /* private mode */ }
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
}
const readJson = (ls, k, d) => { try { const v = JSON.parse(ls.getItem(k)); return v ?? d; } catch { return d; } };
const writeJson = (ls, k, v) => { try { ls.setItem(k, JSON.stringify(v)); } catch { /* quota */ } };

export class LocalBackend {
  constructor(uid = 'guest', ls = safeStorage()) { this.uid = uid; this.ls = ls; this.online = true; }
  get kState() { return 'pc:state:' + this.uid; }
  get kAttempts() { return 'pc:attempts:' + this.uid; }
  async load() { return readJson(this.ls, this.kState, null); }
  async saveState(s) { writeJson(this.ls, this.kState, s); }
  async logAttempt(a) {
    const list = readJson(this.ls, this.kAttempts, []);
    list.push(a);
    writeJson(this.ls, this.kAttempts, list.slice(-4000));
  }
  async getAttempts(limit = 2000) { return readJson(this.ls, this.kAttempts, []).slice(-limit).reverse(); }
  async reset() { this.ls.removeItem(this.kState); this.ls.removeItem(this.kAttempts); }
}

export class SupabaseBackend {
  constructor(client, uid, { ls = safeStorage(), onStatus = () => {} } = {}) {
    this.client = client; this.uid = uid; this.local = new LocalBackend(uid, ls); this.ls = ls; this.onStatus = onStatus;
    this.flushing = false; this.online = true;
  }
  get kOutbox() { return 'pc:outbox:' + this.uid; }
  get outbox() { return readJson(this.ls, this.kOutbox, []); }
  set outbox(v) { writeJson(this.ls, this.kOutbox, v); }

  async load() {
    const localState = await this.local.load();
    let remote = null;
    try {
      const { data, error } = await this.client.from('student_state').select('state').eq('user_id', this.uid).maybeSingle();
      if (error) throw error;
      remote = data?.state && Object.keys(data.state).length ? data.state : null;
      this.online = true;
    } catch { this.online = false; }
    const merged = mergeState(localState || emptyState(), remote || emptyState());
    await this.local.saveState(merged);
    if (this.online && localState) this.enqueue({ op: 'state', payload: merged });
    this.flush();
    return merged;
  }

  enqueue(item) {
    let q = this.outbox;
    if (item.op === 'state') q = q.filter((x) => x.op !== 'state');
    q.push(item);
    this.outbox = q;
  }

  async saveState(s) { await this.local.saveState(s); this.enqueue({ op: 'state', payload: s }); return this.flush(); }
  async logAttempt(a) { await this.local.logAttempt(a); this.enqueue({ op: 'attempt', payload: a }); return this.flush(); }
  async getAttempts(limit = 500) {
    try {
      const { data, error } = await this.client.from('attempts').select('*').eq('user_id', this.uid).order('created_at', { ascending: false }).limit(limit);
      if (error) throw error;
      return data;
    } catch { return this.local.getAttempts(limit); }
  }

  async flush() {
    if (this.flushing) return;
    this.flushing = true;
    this.onStatus('saving');
    try {
      for (;;) {
        const q = this.outbox;
        if (!q.length) break;
        const item = q[0];
        let error;
        if (item.op === 'state') {
          ({ error } = await this.client.from('student_state').upsert({ user_id: this.uid, state: item.payload, updated_at: new Date().toISOString() }));
        } else {
          ({ error } = await this.client.from('attempts').insert({ ...item.payload, user_id: this.uid }));
        }
        if (error) throw error;
        this.outbox = this.outbox.slice(1);
      }
      this.online = true; this.onStatus('saved');
    } catch {
      this.online = false; this.onStatus('offline');
    } finally { this.flushing = false; }
  }
}
