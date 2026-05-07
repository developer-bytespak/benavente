-- =====================================================
-- 0002_rls.sql
-- Row-level security
-- Pattern: anon = SELECT (with conditions), authenticated = ALL.
-- The service-role key bypasses RLS, so server-side code is unaffected.
-- =====================================================

alter table site_settings        enable row level security;
alter table contact_info         enable row level security;
alter table home_page            enable row level security;
alter table about_page           enable row level security;
alter table team_members         enable row level security;
alter table regions              enable row level security;
alter table gallery_categories   enable row level security;
alter table gallery_images       enable row level security;
alter table testimonials         enable row level security;
alter table contact_submissions  enable row level security;

-- ---------- Singletons: public read, auth full ----------

create policy "anon read site_settings" on site_settings
  for select to anon using (true);
create policy "auth all site_settings" on site_settings
  for all to authenticated using (true) with check (true);

create policy "anon read contact_info" on contact_info
  for select to anon using (true);
create policy "auth all contact_info" on contact_info
  for all to authenticated using (true) with check (true);

create policy "anon read home_page" on home_page
  for select to anon using (true);
create policy "auth all home_page" on home_page
  for all to authenticated using (true) with check (true);

create policy "anon read about_page" on about_page
  for select to anon using (true);
create policy "auth all about_page" on about_page
  for all to authenticated using (true) with check (true);

-- ---------- Collections ----------

-- team_members: public sees only visible rows, auth sees everything
create policy "anon read visible team_members" on team_members
  for select to anon using (visible = true);
create policy "auth all team_members" on team_members
  for all to authenticated using (true) with check (true);

create policy "anon read regions" on regions
  for select to anon using (true);
create policy "auth all regions" on regions
  for all to authenticated using (true) with check (true);

create policy "anon read gallery_categories" on gallery_categories
  for select to anon using (true);
create policy "auth all gallery_categories" on gallery_categories
  for all to authenticated using (true) with check (true);

create policy "anon read gallery_images" on gallery_images
  for select to anon using (true);
create policy "auth all gallery_images" on gallery_images
  for all to authenticated using (true) with check (true);

-- testimonials: public sees only visible rows
create policy "anon read visible testimonials" on testimonials
  for select to anon using (visible = true);
create policy "auth all testimonials" on testimonials
  for all to authenticated using (true) with check (true);

-- ---------- Contact form: anon insert, auth manage ----------

create policy "anon insert contact_submissions" on contact_submissions
  for insert to anon with check (true);
create policy "auth all contact_submissions" on contact_submissions
  for all to authenticated using (true) with check (true);
