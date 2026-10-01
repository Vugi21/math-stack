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
