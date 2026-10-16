-- =====================================================
-- 0007_service_inquiries.sql
-- Service-page inquiry forms. Adds optional columns to
-- contact_submissions so each inquiry records which
-- service it came from and its service-specific details.
-- All columns are nullable: the general contact form
-- keeps inserting name/email/message only.
-- Existing "anon insert" / "auth all" RLS policies on
-- the table already cover the new columns.
-- Idempotent.
-- =====================================================

alter table contact_submissions
  add column if not exists service text,
  add column if not exists phone text,
  add column if not exists company text,
  add column if not exists property text,
  add column if not exists details jsonb;

create index if not exists contact_submissions_service_idx
  on contact_submissions (service);
