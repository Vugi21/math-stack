// Emails the parent when someone asks for access. Called by the app right after request_access().
// The caller's own login is used to claim the notification, so each request sends at most one email.
// Secrets: RESEND_API_KEY, NOTIFY_EMAIL (set with `supabase secrets set`). SUPABASE_URL and SUPABASE_ANON_KEY are provided.
import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const auth = req.headers.get('Authorization') ?? '';
    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } });
    const { data: id, error } = await sb.rpc('claim_request_notification');
    if (error) throw error;
    if (!id) return new Response(JSON.stringify({ sent: false }), { headers: { ...cors, 'content-type': 'application/json' } });
    const { data: me } = await sb.auth.getUser();
    const email = me.user?.email ?? 'unknown';
    const name = (me.user?.user_metadata?.full_name as string) || '';
    const site = Deno.env.get('SITE_URL') ?? '';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: Deno.env.get('MAIL_FROM') ?? 'Math Workshop <onboarding@resend.dev>',
        to: [Deno.env.get('NOTIFY_EMAIL')],
        subject: `Access request: ${email}`,
        html: `<p><b>${esc(name || email)}</b> (${esc(email)}) asked for access to Math Workshop.</p>` +
          (site ? `<p><a href="${esc(site)}#/family">Open the Family tab to approve or deny</a></p>` : '<p>Open the Family tab to approve or deny.</p>'),
      }),
    });
    if (!res.ok) throw new Error('mail service: ' + res.status);
    return new Response(JSON.stringify({ sent: true }), { headers: { ...cors, 'content-type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), { status: 500, headers: { ...cors, 'content-type': 'application/json' } });
  }
});
