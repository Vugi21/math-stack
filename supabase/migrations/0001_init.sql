-- Prealgebra Workshop: initial schema.
-- Invite-only: only emails in allowed_emails can read or write anything.
-- Run with `supabase db push` (the GitHub workflow does this) or paste into the SQL editor.

create table if not exists public.allowed_emails (
  email      text primary key,
  role       text not null default 'student' check (role in ('student', 'parent', 'admin')),
  note       text,
  created_at timestamptz not null default now()
);
alter table public.allowed_emails enable row level security;
-- No policies on purpose: only the SQL editor / service role can edit the invite list.

create or replace function public.is_allowed() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.allowed_emails e
    where lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.my_role() returns text
language sql stable security definer set search_path = public as $$
  select e.role from public.allowed_emails e
  where lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  limit 1;
$$;

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text,
  display_name text,
  role         text not null default 'student',
  created_at   timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table if not exists public.parent_links (
  parent_id  uuid not null references auth.users (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  primary key (parent_id, student_id)
);
alter table public.parent_links enable row level security;

-- One JSON document per student holds all progress. Attempts below are an append-only log for reports.
create table if not exists public.student_state (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.student_state enable row level security;

create table if not exists public.attempts (
  id              bigint generated always as identity primary key,
  user_id         uuid not null references auth.users (id) on delete cascade,
  problem_key     text not null,
  lesson_id       text not null,
  kind            text not null,
  correct         boolean not null,
  answer          text,
  hints_used      int not null default 0,
  ms              int,
  mistake_tag     text,
  content_version text,
  created_at      timestamptz not null default now()
);
create index if not exists attempts_user_time on public.attempts (user_id, created_at desc);
create index if not exists attempts_user_lesson on public.attempts (user_id, lesson_id);
alter table public.attempts enable row level security;

-- ---- Row level security ----
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or exists (select 1 from public.parent_links l where l.parent_id = auth.uid() and l.student_id = profiles.id));
create policy profiles_write on public.profiles for insert with check (id = auth.uid() and public.is_allowed());
create policy profiles_update on public.profiles for update using (id = auth.uid() and public.is_allowed());

create policy links_select on public.parent_links for select using (parent_id = auth.uid() or student_id = auth.uid());

create policy state_own_select on public.student_state for select using (user_id = auth.uid() and public.is_allowed());
create policy state_own_insert on public.student_state for insert with check (user_id = auth.uid() and public.is_allowed());
create policy state_own_update on public.student_state for update using (user_id = auth.uid() and public.is_allowed()) with check (user_id = auth.uid());
create policy state_parent_select on public.student_state for select
  using (exists (select 1 from public.parent_links l where l.parent_id = auth.uid() and l.student_id = student_state.user_id));

create policy attempts_own_select on public.attempts for select using (user_id = auth.uid() and public.is_allowed());
create policy attempts_own_insert on public.attempts for insert with check (user_id = auth.uid() and public.is_allowed());
create policy attempts_parent_select on public.attempts for select
  using (exists (select 1 from public.parent_links l where l.parent_id = auth.uid() and l.student_id = attempts.user_id));

-- Called by the app right after sign-in. Creates the profile and returns the role from the invite list.
create or replace function public.ensure_profile(p_name text) returns text
language plpgsql security definer set search_path = public as $$
declare r text;
begin
  if not public.is_allowed() then return null; end if;
  r := public.my_role();
  insert into public.profiles (id, email, display_name, role)
  values (auth.uid(), auth.jwt() ->> 'email', nullif(p_name, ''), coalesce(r, 'student'))
  on conflict (id) do update set role = coalesce(r, public.profiles.role),
    display_name = coalesce(nullif(excluded.display_name, ''), public.profiles.display_name);
  return coalesce(r, 'student');
end;
$$;

-- Admin helper, run from the SQL editor: select public.admin_link_parent('parent@x.com', 'student@x.com');
create or replace function public.admin_link_parent(parent_email text, student_email text) returns void
language sql security definer set search_path = public as $$
  insert into public.parent_links (parent_id, student_id)
  select p.id, s.id from auth.users p, auth.users s
  where lower(p.email) = lower(parent_email) and lower(s.email) = lower(student_email)
  on conflict do nothing;
$$;
revoke all on function public.admin_link_parent(text, text) from public, anon, authenticated;
