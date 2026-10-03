// Parent access: read-only views of linked students. Enforced by row-level security in the database.
import { getClient } from './auth.js';

export async function loadLinkedStudents() {
  const c = await getClient();
  if (!c) return [];
  const { data: links, error } = await c.from('parent_links').select('student_id');
  if (error || !links?.length) return [];
  const ids = links.map((l) => l.student_id);
  const { data: profs } = await c.from('profiles').select('id,display_name,email').in('id', ids);
  return (profs || []).map((p) => ({ id: p.id, name: p.display_name || p.email || 'Student' }));
}

export async function loadStudentData(id) {
  const c = await getClient();
  const [{ data: st }, { data: attempts }] = await Promise.all([
    c.from('student_state').select('state').eq('user_id', id).maybeSingle(),
    c.from('attempts').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(500),
  ]);
  return { state: st?.state || null, attempts: attempts || [] };
}

// ---- invites and access requests (parent only; the database enforces this too) ----
export async function loadRequests() {
  const c = await getClient(); if (!c) return { requests: [], invites: [] };
  const [{ data: requests }, { data: invites }] = await Promise.all([
    c.from('access_requests').select('id,email,name,message,created_at').eq('status', 'pending').order('created_at', { ascending: false }),
    c.rpc('parent_pending_invites'),
  ]);
  return { requests: requests || [], invites: invites || [] };
}
export async function inviteStudent(email) {
  const c = await getClient();
  const { error } = await c.rpc('parent_invite', { p_email: email, p_role: 'student' });
  if (error) throw new Error(/invalid email/.test(error.message) ? 'That does not look like an email address.' : 'Could not add that email.');
}
export async function denyRequest(id) {
  const c = await getClient();
  const { error } = await c.rpc('parent_deny_request', { p_id: id });
  if (error) throw new Error('Could not update the request.');
}
