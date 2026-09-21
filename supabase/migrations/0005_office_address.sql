-- =====================================================
-- 0005_office_address.sql
-- Office relocation: Pauahi Tower -> Pioneer Plaza.
-- 0003 seeds with `on conflict do nothing`, so existing
-- databases keep the old row; this updates it in place.
-- Idempotent.
-- =====================================================

update contact_info
set
  address = 'Pioneer Plaza, 900 Fort Street Mall, Suite 1820, Honolulu, Hawaii 96813',
  map_embed_url = 'https://www.google.com/maps?q=Pioneer+Plaza%2C+900+Fort+Street+Mall%2C+Suite+1820%2C+Honolulu%2C+HI+96813&output=embed'
where id = 1;
