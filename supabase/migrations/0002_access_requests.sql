-- Access requests, and parent-managed invites (no SQL needed to add a student).

alter table public.allowed_emails add column if not exists invited_by uuid references auth.users (id) on delete set null;

create table if not exists public.access_requests (
  id          bigint generated always as identity primary key,
  email       text not null,
  name        text,
  message     text check (message is null or char_length(message) <= 300),
  status      text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  notified_at timestamptz,
  created_at  timestamptz not null default now(),
  decided_at  timestamptz,
  decided_by  uuid references auth.users (id) on delete set null
);
-- One open request per email: repeat clicks (or spam) cannot pile up.
create unique index if not exists access_requests_one_pending on public.access_requests (lower(email)) where status = 'pending';
alter table public.access_requests enable row level security;

create or replace function public.is_parent() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.my_role() in ('parent', 'admin'), false);
$$;

-- Parents can read requests. Nobody writes the table directly; everything goes through the functions below.
create policy requests_parent_select on public.access_requests for select using (public.is_parent());

-- Called by a signed-in person who is not on the invite list. Returns 'allowed', 'pending' or 'sent'.
create or replace function public.request_access(p_name text, p_message text) returns text
language plpgsql security definer set search_path = public as $$
declare em text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null or em = '' then raise exception 'not signed in'; end if;
  if public.is_allowed() then return 'allowed'; end if;
  if exists (select 1 from public.access_requests where lower(email) = em and status = 'pending') then return 'pending'; end if;
  insert into public.access_requests (email, name, message)
  values (em, left(nullif(trim(p_name), ''), 100), left(nullif(trim(p_message), ''), 300));
  return 'sent';
end;
$$;

-- Marks the request as notified; the email function calls this once per request so repeats cannot spam you.
create or replace function public.claim_request_notification() returns bigint
language plpgsql security definer set search_path = public as $$
declare rid bigint;
begin
  update public.access_requests set notified_at = now()
  where id = (select id from public.access_requests where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
              and status = 'pending' and notified_at is null limit 1)
  returning id into rid;
  return rid;
end;
$$;

-- Adds an email to the invite list, remembers who invited it, and links the student once they have an account.
create or replace function public.link_if_signed_up(p_email text, p_parent uuid) returns void
language sql security definer set search_path = public as $$
  insert into public.parent_links (parent_id, student_id)
  select p_parent, u.id from auth.users u where lower(u.email) = lower(p_email)
  on conflict do nothing;
$$;
revoke all on function public.link_if_signed_up(text, uuid) from public, anon, authenticated;

create or replace function public.parent_invite(p_email text, p_role text default 'student') returns void
language plpgsql security definer set search_path = public as $$
declare em text := lower(trim(p_email));
begin
  if not public.is_parent() then raise exception 'parents only'; end if;
  if em !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'invalid email'; end if;
  if p_role <> 'student' then raise exception 'only students can be invited here'; end if;
  insert into public.allowed_emails (email, role, invited_by) values (em, 'student', auth.uid())
  on conflict (email) do nothing;
  perform public.link_if_signed_up(em, auth.uid());
  update public.access_requests set status = 'approved', decided_at = now(), decided_by = auth.uid()
  where lower(email) = em and status = 'pending';
end;
$$;

create or replace function public.parent_deny_request(p_id bigint) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'parents only'; end if;
  update public.access_requests set status = 'denied', decided_at = now(), decided_by = auth.uid()
  where id = p_id and status = 'pending';
end;
$$;

-- Invites this parent made that the student has not used yet (shown so you can see what is outstanding).
create or replace function public.parent_pending_invites() returns table (email text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select e.email, e.created_at from public.allowed_emails e
  where public.is_parent() and e.invited_by = auth.uid()
    and not exists (select 1 from auth.users u where lower(u.email) = lower(e.email))
  order by e.created_at desc;
$$;

-- Same as before, plus: when an invited student first signs in, link them to the parent who invited them.
create or replace function public.ensure_profile(p_name text) returns text
language plpgsql security definer set search_path = public as $$
declare r text; inv uuid;
begin
  if not public.is_allowed() then return null; end if;
  r := public.my_role();
  insert into public.profiles (id, email, display_name, role)
  values (auth.uid(), auth.jwt() ->> 'email', nullif(p_name, ''), coalesce(r, 'student'))
  on conflict (id) do update set role = coalesce(r, public.profiles.role),
    display_name = coalesce(nullif(excluded.display_name, ''), public.profiles.display_name);
  select e.invited_by into inv from public.allowed_emails e where lower(e.email) = lower(auth.jwt() ->> 'email');
  if inv is not null and coalesce(r, 'student') = 'student' then
    insert into public.parent_links (parent_id, student_id) values (inv, auth.uid()) on conflict do nothing;
  end if;
  return coalesce(r, 'student');
end;
$$;

grant execute on function public.request_access(text, text), public.claim_request_notification(),
  public.parent_invite(text, text), public.parent_deny_request(bigint), public.parent_pending_invites() to authenticated;
