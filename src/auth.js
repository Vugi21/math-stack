// Login. With Supabase configured: Google or emailed link, invite-only. Without it (demo): no login.
/* global __DEMO__ */
// Accept a pasted project address with extra path (e.g. /rest/v1/) or spaces; only the origin matters.
const cleanUrl = (u) => { try { return u ? new URL(/^https?:\/\//i.test(String(u).trim()) ? String(u).trim() : 'https://' + String(u).trim()).origin : ''; } catch { return ''; } };
const SB_URL = cleanUrl(import.meta.env?.VITE_SUPABASE_URL);
const KEY = (import.meta.env?.VITE_SUPABASE_ANON_KEY || '').trim();
export const hasSupabase = !__DEMO__ && !!(SB_URL && KEY);

let client = null;
export async function getClient() {
  if (!hasSupabase) return null;
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    client = createClient(SB_URL, KEY, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  }
  return client;
}

const here = () => location.origin + location.pathname;

export async function currentUser() {
  const c = await getClient();
  if (!c) return { guest: true, id: 'guest', email: null, name: 'Guest' };
  const { data } = await c.auth.getSession();
  const u = data?.session?.user;
  if (!u) return null;
  return { id: u.id, email: u.email, name: u.user_metadata?.full_name || u.user_metadata?.name || (u.email || '').split('@')[0] };
}

export async function signInGoogle() {
  const c = await getClient();
  const { error } = await c.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: here() } });
  if (error) throw error;
}
export async function signInEmail(email) {
  const c = await getClient();
  const { error } = await c.auth.signInWithOtp({ email, options: { emailRedirectTo: here(), shouldCreateUser: true } });
  if (error) throw error;
}
export async function signOut() {
  const c = await getClient();
  if (c) await c.auth.signOut();
}
export async function onAuthChange(fn) {
  const c = await getClient();
  if (!c) return () => {};
  const { data } = c.auth.onAuthStateChange((evt) => { if (evt === 'SIGNED_IN' || evt === 'SIGNED_OUT') fn(evt); });
  return () => data.subscription.unsubscribe();
}

/** Server-side invite check. The database refuses reads and writes for anyone not on the allowlist. */
export async function checkAllowed(name) {
  const c = await getClient();
  if (!c) return { allowed: true, role: 'student' };
  const { data: ok, error } = await c.rpc('is_allowed');
  if (error || !ok) return { allowed: false };
  const { data: role } = await c.rpc('ensure_profile', { p_name: name || '' });
  return { allowed: true, role: role || 'student' };
}
