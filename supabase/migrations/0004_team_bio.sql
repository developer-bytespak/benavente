-- =====================================================
-- 0004_team_bio.sql
-- Add bio column to team_members
-- =====================================================

alter table team_members
  add column if not exists bio text;
