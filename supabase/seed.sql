-- Edit the emails, then run once in the Supabase SQL editor. Add one row per child or parent.
-- Only these Google / email addresses can sign in and save progress.
insert into public.allowed_emails (email, role, note) values
  ('parent@example.com',  'parent',  'Parent account'),
  ('student@example.com', 'student', 'First student')
on conflict (email) do nothing;

-- After both people have signed in once:
-- select public.admin_link_parent('parent@example.com', 'student@example.com');
