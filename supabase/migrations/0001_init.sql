-- =====================================================
-- 0001_init.sql
-- Initial schema for The Benavente Group CMS
-- Generated 2026-05-04
-- =====================================================

-- ---------- Singletons (id = 1 enforced) ----------

create table site_settings (
  id smallint primary key default 1,
  logo_url text,
  footer_text text,
  copyright_text text,
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id = 1)
);

create table contact_info (
  id smallint primary key default 1,
  address text,
  phone text,
  email text,
  hours text,
  service_regions text[] default '{}',
  map_embed_url text,
  updated_at timestamptz default now(),
  constraint contact_info_singleton check (id = 1)
);

create table home_page (
  id smallint primary key default 1,
  hero_video_urls text[] default '{}',
  hero_headline text,
  hero_subhead text,
  ticker_items text[] default '{}',
  intro_heading text,
  intro_paragraphs text[] default '{}',
  stats jsonb default '[]'::jsonb,
  updated_at timestamptz default now(),
  constraint home_page_singleton check (id = 1)
);

create table about_page (
  id smallint primary key default 1,
  banner_url text,
  hero_headline text,
  hero_subtitle text,
  story_heading text,
  story_paragraphs text[] default '{}',
  story_stats jsonb default '[]'::jsonb,
  mission_headline text,
  mission_text text,
  core_values jsonb default '[]'::jsonb,
  updated_at timestamptz default now(),
  constraint about_page_singleton check (id = 1)
);

-- ---------- Collections ----------

create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  cv_url text,
  cv_filename text,
  sort_order int default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index team_members_sort_idx on team_members (sort_order);

create table regions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  note text,
  hero_image_url text,
  broll_images text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index regions_sort_idx on regions (sort_order);

create table gallery_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index gallery_categories_sort_idx on gallery_categories (sort_order);

create table gallery_images (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references gallery_categories(id) on delete cascade,
  image_url text not null,
  alt text,
  sort_order int default 0,
  -- Featured = appears in the home page "Featured Portfolio" strip (max 5).
  -- Cap is enforced in the API layer, not the schema, to keep editing flexible.
  featured boolean default false,
  featured_order int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index gallery_images_category_idx on gallery_images (category_id, sort_order);
create index gallery_images_featured_idx on gallery_images (featured_order)
  where featured = true;

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text,
  company text,
  sort_order int default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index testimonials_sort_idx on testimonials (sort_order);

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  submitted_at timestamptz default now()
);
create index contact_submissions_submitted_idx on contact_submissions (submitted_at desc);

-- ---------- updated_at trigger ----------

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_site_settings_updated      before update on site_settings      for each row execute function set_updated_at();
create trigger trg_contact_info_updated       before update on contact_info       for each row execute function set_updated_at();
create trigger trg_home_page_updated          before update on home_page          for each row execute function set_updated_at();
create trigger trg_about_page_updated         before update on about_page         for each row execute function set_updated_at();
create trigger trg_team_members_updated       before update on team_members       for each row execute function set_updated_at();
create trigger trg_regions_updated            before update on regions            for each row execute function set_updated_at();
create trigger trg_gallery_categories_updated before update on gallery_categories for each row execute function set_updated_at();
create trigger trg_gallery_images_updated     before update on gallery_images     for each row execute function set_updated_at();
create trigger trg_testimonials_updated       before update on testimonials       for each row execute function set_updated_at();
