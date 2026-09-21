-- =====================================================
-- 0006_home_copy_seo.sql
-- SEO copy revisions for the home page: hero paragraph,
-- about/intro paragraph, and the marquee strip labels.
-- 0003 seeds with `on conflict do nothing`, so existing
-- databases keep the old copy; this updates it in place.
-- Idempotent.
-- =====================================================

update home_page
set
  hero_subhead = 'The Benavente Group is a team of commercial real estate appraiser in Honolulu, serving Hawai''i, Guam, Saipan, the Marshall Islands, and the wider Pacific. Since 2017, our MAI and SRA designated appraisers have delivered defensible valuations, litigation support, and market analysis for attorneys, lenders, developers, and government agencies.',
  intro_paragraphs = array[
    'The Benavente Group is a team of MAI real estate professionals specializing in valuation, economics, and market analysis. We understand the factors affecting commercial property values in island markets: thin comparable data, leasehold interests, and buyer motivations that differ sharply from the mainland. With over 50 years of combined experience, our MAI appraisers deliver the professionalism, technical skill, and credible appraisal reports our clients need across Hawai‘i, Guam, Saipan, the Marshall Islands, and beyond.'
  ],
  ticker_items = array[
    'Commercial Appraisal Reports','Commercial Property Valuation','Litigation Support','Property Tax Appeal',
    'Lease Abstracts & Analysis','Pacific Region','Residential Appraisal','Expert Testimony',
    'Feasibility Studies','Eminent Domain','MAI Appraisals','Arbitration Support',
    'Types of Appraisal Reports'
  ]
where id = 1;
