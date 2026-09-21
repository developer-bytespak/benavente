-- =====================================================
-- 0003_seed_singletons.sql
-- Initial content for the four singleton tables, ported
-- verbatim from the current hard-coded site so day-1 looks
-- identical after the rewire. Idempotent.
-- =====================================================

insert into site_settings (id, logo_url, footer_text, copyright_text)
values (
  1,
  '/images/hero/logo.png',
  'Credible solutions and timely results for real estate valuation across Hawai‘i and the Pacific.',
  '© 2026 The Benavente Group LLC. All Rights Reserved.'
)
on conflict (id) do nothing;

insert into contact_info (id, address, phone, email, hours, service_regions, map_embed_url)
values (
  1,
  'Pioneer Plaza, 900 Fort Street Mall, Suite 1820, Honolulu, Hawaii 96813',
  '(808) 784-4320',
  'Mail@BenaventeGroup.com',
  'Monday – Friday, 8:00 AM – 5:00 PM HST',
  array['Hawai‘i', 'Guam', 'Saipan', 'Marshall Islands', 'Pacific Islands'],
  'https://www.google.com/maps?q=Pioneer+Plaza%2C+900+Fort+Street+Mall%2C+Suite+1820%2C+Honolulu%2C+HI+96813&output=embed'
)
on conflict (id) do nothing;

insert into home_page (
  id, hero_video_urls, hero_headline, hero_subhead, ticker_items,
  intro_heading, intro_paragraphs, stats
) values (
  1,
  array[
    'https://res.cloudinary.com/djqmhkla6/video/upload/video-1_b1dhpi.mp4',
    'https://res.cloudinary.com/djqmhkla6/video/upload/video-3_pficky.mp4',
    'https://res.cloudinary.com/djqmhkla6/video/upload/video-4_nlyktc.mp4',
    'https://res.cloudinary.com/djqmhkla6/video/upload/video-2_u7oohe.mp4'
  ],
  'Real Estate Valuation & Consultancy',
  'The Benavente Group is a team of commercial real estate appraiser in Honolulu, serving Hawai''i, Guam, Saipan, the Marshall Islands, and the wider Pacific. Since 2017, our MAI and SRA designated appraisers have delivered defensible valuations, litigation support, and market analysis for attorneys, lenders, developers, and government agencies.',
  array[
    'Commercial Appraisal Reports','Commercial Property Valuation','Litigation Support','Property Tax Appeal',
    'Lease Abstracts & Analysis','Pacific Region','Residential Appraisal','Expert Testimony',
    'Feasibility Studies','Eminent Domain','MAI Appraisals','Arbitration Support',
    'Types of Appraisal Reports'
  ],
  'A Trusted Name in Pacific Real Estate',
  array[
    'The Benavente Group is a team of MAI real estate professionals specializing in valuation, economics, and market analysis. We understand the factors affecting commercial property values in island markets: thin comparable data, leasehold interests, and buyer motivations that differ sharply from the mainland. With over 50 years of combined experience, our MAI appraisers deliver the professionalism, technical skill, and credible appraisal reports our clients need across Hawai‘i, Guam, Saipan, the Marshall Islands, and beyond.'
  ],
  '[
    {"label":"Years Combined Experience","number":50,"suffix":"+"},
    {"label":"Completed Assignments","number":500,"suffix":"+"},
    {"label":"Pacific Island Regions","number":6,"suffix":""},
    {"label":"Property Types Covered","number":18,"suffix":"+"}
  ]'::jsonb
)
on conflict (id) do nothing;

insert into about_page (
  id, banner_url, hero_headline, hero_subtitle,
  story_heading, story_paragraphs, story_stats,
  mission_headline, mission_text, core_values
) values (
  1,
  '/images/regions/oahu-lanikai.webp',
  'Experts Rooted in Hawai‘i & the Pacific',
  'A team of credentialed professionals with over 50 years of combined experience in real estate economics, valuation, and market analysis.',
  'Built on Integrity, Driven by Expertise',
  array[
    'The Benavente Group was founded to bring professional-grade real estate economics and valuation services to Hawai‘i and the broader Pacific region. Our principals bring decades of hands-on experience across all major property types — from Class A office buildings to luxury resort properties, from industrial subdivisions to Pacific island hospitality assets.',
    'We understand that our clients — attorneys, lenders, developers, and government agencies — depend on defensible, accurate valuations delivered on schedule. That trust drives everything we do.'
  ],
  '[
    {"label":"Yrs. Experience","number":50,"suffix":"+"},
    {"label":"Assignments","number":500,"suffix":"+"},
    {"label":"Pacific Regions","number":6,"suffix":""}
  ]'::jsonb,
  'Credible Solutions. Timely Results.',
  '',
  '[
    {"number":"01","name":"Accuracy","desc":"Every valuation is grounded in rigorous analysis, defensible methodology, and deep local market expertise."},
    {"number":"02","name":"Integrity","desc":"We provide independent, unbiased assessments that clients and courts can rely on without reservation."},
    {"number":"03","name":"Timeliness","desc":"Our process is built to deliver thorough, court-ready reports on schedule — every time."},
    {"number":"04","name":"Local Knowledge","desc":"Deep roots in Hawai‘i and the Pacific give us market insight no mainland firm can replicate."}
  ]'::jsonb
)
on conflict (id) do nothing;
