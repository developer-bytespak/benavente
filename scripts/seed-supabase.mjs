// One-shot data migration. Reads the values currently hard-coded in
// lib/data/* and components/sections/about/MeetTeam.tsx, and inserts them
// into Supabase. Idempotent: each seeder skips if the table already has rows,
// so it's safe to run multiple times.
//
// Usage: node scripts/seed-supabase.mjs

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

// ===== Source data (mirrors lib/data/* and MeetTeam.tsx as of seed date) =====

const TESTIMONIALS = [
  "It's a pleasure working with you and your team!! High quality appraisals, easy to work with, thorough… we're very fortunate.",
  "Indeed, we thank you very much for your hard work. Want to thank you for taking this on, the attached is perfect and I look forward to working with you on the others as well.",
  "Thank you for your research diligence and being a great partner in resolving yet another challenging assignment.",
  "Outstanding… collaboration is how we get this done. If it were easy, we would not be doing what we do for a living… Kudos…",
  "Please extend a heartfelt thank you to your staff. It seems to be a constant baptism by fire with our assignments.",
  "I do need to commend Mr. Benavente's staff's research skills. While our organization takes pride in conducting thorough pre-flight research, by coincidence, matters that are unknown until a physical visit to the property and/or county departments have beleaguered several of our engagements with The Benavente Group.",
  "Man. Your drone pictures are so professional. Love it!… some awesome pictures! Thanks!",
  "Thank you for submitting the draft appraisal report. It is truly one of the best written drafts I have reviewed with data support and rationale behind the assumptions.",
  "My review is completed. Firstly, I would like to state that the report format and the substance & content of this report is one of the best I've seen in 30+ years of appraisal reviews.",
  "I've seen lots of appraisals and this is best I've reviewed. Lots of detail and I learned a lot from it. Thank you.",
  "I again extend my appreciation for the excellent client service that I have experienced with our TBG relationship as well as for the preeminent market knowledge and appraisal expertise that you bring to every assignment!",
  "As part of this assignment, TBG was able to uncover material use restrictions associated with this property that were appropriately treated in the valuation. As a result, our company was able to appropriately respond to the ground lessor's ground lease renegotiation offer.",
  "Thanks so much for understanding our urgent need and your excellent customer service.",
  "My preliminary review of the two appraisals you prepared showed that you were thorough and complete with your analysis, and I am happy with your work. If asked for a referral I would not hesitate to recommend you and I will not hesitate to use your services again if necessary. Thanks again.",
]

const TEAM = [
  { name: 'Fernando Benavente, MAI, SRA', role: 'Manager',                       photo: '/images/team/fernando.webp', cv: '/cv/fernando-benavente.pdf',  cv_filename: 'Fernando-Benavente-CV.pdf' },
  { name: 'Brian S. Goto, MAI, SRA',      role: 'Appraiser Consultant',          photo: '/images/team/brian.webp',    cv: '/cv/brian-goto.pdf',          cv_filename: 'Brian-Goto-CV.pdf' },
  { name: 'Randolph K. Flores, MAI, SRA', role: 'Appraiser Consultant',          photo: '/images/team/randy.webp',    cv: '/cv/randolph-flores.pdf',     cv_filename: 'Randolph-Flores-CV.pdf' },
  { name: 'Matthew Flores',               role: 'Associate',                     photo: '/images/team/matt.webp',     cv: '/cv/matthew-flores.pdf',      cv_filename: 'Matthew-Flores-CV.pdf' },
  { name: 'Jared Miyashiro',              role: 'Certified General Appraiser',   photo: '/images/team/jared.webp',    cv: '/cv/jared-miyashiro.pdf',     cv_filename: 'Jared-Miyashiro-CV.pdf' },
  { name: 'Kanae Bamba',                  role: 'Certified General Appraiser',   photo: '/images/team/kanae.webp',    cv: '/cv/kanae-bamba.pdf',         cv_filename: 'Kanae-Bamba-CV.pdf' },
  { name: 'Kamugisha Pearl',              role: 'Senior Market Analyst',         photo: '/images/team/pearl.webp',    cv: '/cv/kamugisha-pearl.pdf',     cv_filename: 'Kamugisha-Pearl-CV.pdf' },
  { name: 'Asiimwe Miriam',               role: 'Administrative Assistant',      photo: '/images/team/miriam.webp',   cv: '/cv/asiimwe-miriam.pdf',      cv_filename: 'Asiimwe-Miriam-CV.pdf' },
  { name: 'Anthony Chang',                role: 'Market Analyst',                photo: '/images/team/anthony.webp',  cv: '/cv/AC.pdf',                  cv_filename: 'Anthony-CV.pdf' },
]

const REGIONS = [
  { name: 'City and County of Honolulu', note: 'Honolulu Metro & all districts',     hero: '/images/regions/oahu-skyline.webp', broll: 'oahu' },
  { name: 'Maui County',                 note: 'Kahului, Wailea & resort corridors', hero: '/images/regions/maui.webp',          broll: 'maui' },
  { name: "Hawai'i County",              note: 'Kona, Hilo & rural parcels',         hero: '/images/regions/big-island.webp',    broll: 'big-island' },
  { name: 'Guam & Saipan',               note: 'CNMI commercial & residential',      hero: '/images/regions/guam.webp',          broll: 'guam-saipan' },
  { name: 'Kauai County',                note: 'Kauai',                              hero: '/images/regions/kauai.webp',         broll: 'kauai' },
  { name: 'Other Pacific',               note: 'Additional Pacific territories',     hero: '/images/regions/guam-2.webp',        broll: 'kauai' },
]

const BROLL = {
  oahu: [
    '/images/broll/oahu/dji_0095-large.webp', '/images/broll/oahu/dji_0170.webp', '/images/broll/oahu/dji_0195.webp',
    '/images/broll/oahu/dji_0217-large.webp', '/images/broll/oahu/dji_0238.webp', '/images/broll/oahu/dji_0435-large.webp',
    '/images/broll/oahu/dji_0479.webp', '/images/broll/oahu/dji_0549.webp', '/images/broll/oahu/dji_0579-large.webp',
    '/images/broll/oahu/dji_0581-large.webp', '/images/broll/oahu/dji_0613.webp', '/images/broll/oahu/dji_0615.webp',
    '/images/broll/oahu/dji_0617.webp', '/images/broll/oahu/dji_0618.webp', '/images/broll/oahu/dji_0639.webp',
    '/images/broll/oahu/dji_0660.webp', '/images/broll/oahu/dji_0686-large.webp', '/images/broll/oahu/dji_0735.webp',
    '/images/broll/oahu/dji_0736.webp', '/images/broll/oahu/dji_0737.webp', '/images/broll/oahu/dji_0763.webp',
    '/images/broll/oahu/dji_0786-waikiki-atlantis-submarine.webp', '/images/broll/oahu/dji_0788.webp',
    '/images/broll/oahu/dji_0807-large.webp', '/images/broll/oahu/dji_0830-large.webp', '/images/broll/oahu/dji_0855.bak.webp',
    '/images/broll/oahu/dji_0859-large.webp', '/images/broll/oahu/dji_0876-nauru-cpr.webp', '/images/broll/oahu/dji_0886-large.webp',
    '/images/broll/oahu/dji_0913.webp', '/images/broll/oahu/dji_0959-large.webp', '/images/broll/oahu/dji_0961.webp',
    '/images/broll/oahu/dji_0962.webp', '/images/broll/oahu/dji_0964.webp', '/images/broll/oahu/dji_0971.webp',
    '/images/broll/oahu/dji_20260328113943_0018_d-large.webp', '/images/broll/oahu/dji_20260328113953_0019_d-large.webp',
    '/images/broll/oahu/dji_20260328114013_0021_d-large.webp', '/images/broll/oahu/dji_20260328145233_0082_d-large.webp',
    '/images/broll/oahu/dji_20260328145248_0085_d-large.webp', '/images/broll/oahu/dji_20260411104416_0025_d.webp',
    '/images/broll/oahu/dji_20260411104850_0035_d.webp', '/images/broll/oahu/dji_20260411115233_0060_d.webp',
  ],
  maui: [
    '/images/broll/maui/dji_0027.webp', '/images/broll/maui/dji_0202.webp', '/images/broll/maui/dji_0371.webp',
    '/images/broll/maui/dji_0519.webp', '/images/broll/maui/dji_0564.webp', '/images/broll/maui/dji_0820.webp',
    '/images/broll/maui/dji_20260331103400_0018_d-large.webp', '/images/broll/maui/dji_20260331103413_0020_d-large.webp',
  ],
  'big-island': [
    '/images/broll/big-island/20230109_171002018_ios.webp', '/images/broll/big-island/20230109_171018008_ios.webp',
    '/images/broll/big-island/dji_0326.webp', '/images/broll/big-island/dji_0347.webp', '/images/broll/big-island/dji_0422.webp',
    '/images/broll/big-island/dji_0450.webp', '/images/broll/big-island/dji_0585.webp', '/images/broll/big-island/dji_0703.webp',
    '/images/broll/big-island/dji_0722.webp', '/images/broll/big-island/dji_0731.webp', '/images/broll/big-island/dji_0737.webp',
  ],
  'guam-saipan': [
    '/images/broll/guam-saipan/dji_0234.webp', '/images/broll/guam-saipan/dji_0668.webp',
    '/images/broll/guam-saipan/dji_20260403113445_0026_d-large.webp', '/images/broll/guam-saipan/dji_20260403113459_0028_d-large.webp',
  ],
  kauai: [
    '/images/broll/kauai/dji_0020.webp', '/images/broll/kauai/dji_0050.webp', '/images/broll/kauai/dji_0296-large.webp',
    '/images/broll/kauai/dji_0384.webp', '/images/broll/kauai/dji_0413.webp', '/images/broll/kauai/dji_0712.webp',
  ],
}

const GALLERY = [
  { slug: 'agriculture',         label: 'Agriculture',                images: ['/images/gallery/agriculture/dji_0306.webp','/images/gallery/agriculture/dji_0750-large.webp','/images/gallery/agriculture/dji_0771.webp'] },
  { slug: 'cbd',                 label: 'CBD',                        images: ['/images/gallery/cbd/dji_0337.webp','/images/gallery/cbd/dji_0340.webp','/images/gallery/cbd/dji_0341.webp','/images/gallery/cbd/dji_0344.webp','/images/gallery/cbd/dji_0345.webp','/images/gallery/cbd/dji_0348.webp'] },
  { slug: 'hotel-hospitality',   label: 'Hotel & Hospitality',        images: ['/images/gallery/hotel-hospitality/20220914_192538031_ios.webp','/images/gallery/hotel-hospitality/20230109_185426343_ios.webp','/images/gallery/hotel-hospitality/20230109_202619038_ios.webp','/images/gallery/hotel-hospitality/20230623_211737885_ios.webp','/images/gallery/hotel-hospitality/20250715_183541840_ios.webp','/images/gallery/hotel-hospitality/20250715_184319263_ios.webp','/images/gallery/hotel-hospitality/dji_0012.webp','/images/gallery/hotel-hospitality/dji_0061.webp','/images/gallery/hotel-hospitality/dji_0305.webp','/images/gallery/hotel-hospitality/dji_0378.webp','/images/gallery/hotel-hospitality/dji_0436.webp','/images/gallery/hotel-hospitality/dji_0445-large.webp','/images/gallery/hotel-hospitality/dji_0532.webp','/images/gallery/hotel-hospitality/dji_0551.webp','/images/gallery/hotel-hospitality/dji_0554.webp','/images/gallery/hotel-hospitality/dji_0861-large.webp','/images/gallery/hotel-hospitality/dji_0875-large.webp','/images/gallery/hotel-hospitality/dji_20260403113436_0024_d-large.webp','/images/gallery/hotel-hospitality/dji_20260403113926_0038_d-large.webp','/images/gallery/hotel-hospitality/kbh-aerial-mauka-view.webp'] },
  { slug: 'industrial',          label: 'Industrial',                 images: ['/images/gallery/industrial/20210208_195722077_ios.webp','/images/gallery/industrial/20210504_184102130_ios.webp','/images/gallery/industrial/20230106_185411167_ios.webp','/images/gallery/industrial/20240809_185508294_ios.webp','/images/gallery/industrial/20250206_213812465_ios.webp','/images/gallery/industrial/dji_0153.webp','/images/gallery/industrial/dji_0172_1.webp','/images/gallery/industrial/dji_0196.webp','/images/gallery/industrial/dji_0274.webp','/images/gallery/industrial/dji_0274_1.webp','/images/gallery/industrial/dji_0412.webp','/images/gallery/industrial/dji_0422.webp','/images/gallery/industrial/dji_0675.webp','/images/gallery/industrial/dji_0787.webp','/images/gallery/industrial/dji_0889.webp','/images/gallery/industrial/dji_0902.webp','/images/gallery/industrial/dji_0974.webp','/images/gallery/industrial/dji_0993.webp','/images/gallery/industrial/dji_20260331103116_0007_d-large.webp','/images/gallery/industrial/img_5263-2.webp'] },
  { slug: 'luxury-residential',  label: 'Luxury Residential',         images: ['/images/gallery/luxury-residential/20240215_221808975_ios.webp','/images/gallery/luxury-residential/dji_0514.webp','/images/gallery/luxury-residential/dji_0523.webp','/images/gallery/luxury-residential/dji_0858.webp','/images/gallery/luxury-residential/dji_0958-large.webp','/images/gallery/luxury-residential/dji_20260411115211_0058_d.webp','/images/gallery/luxury-residential/img_6725.webp'] },
  { slug: 'multi-family',        label: 'Multi-Family',               images: ['/images/gallery/multi-family/20221202_003924648_ios.webp','/images/gallery/multi-family/dji_0010.webp','/images/gallery/multi-family/dji_0123.webp','/images/gallery/multi-family/dji_0168.webp','/images/gallery/multi-family/dji_0240.webp','/images/gallery/multi-family/dji_0262.webp','/images/gallery/multi-family/dji_0373.webp','/images/gallery/multi-family/dji_0378.webp','/images/gallery/multi-family/dji_0677.webp','/images/gallery/multi-family/dji_0788.webp','/images/gallery/multi-family/dji_0823-large.webp','/images/gallery/multi-family/dji_0870.webp','/images/gallery/multi-family/dji_0919.webp','/images/gallery/multi-family/dji_20260403121646_0070_d-large.webp','/images/gallery/multi-family/dji_20260403124149_0088_d-large.webp'] },
  { slug: 'office',              label: 'Office',                     images: ['/images/gallery/office/20200923_195716675_ios.webp','/images/gallery/office/20210203_003609547_ios.webp','/images/gallery/office/20211123_032909164_ios.webp','/images/gallery/office/20220203_210049153_ios.webp','/images/gallery/office/20230109_221840981_ios.webp','/images/gallery/office/dji_0124.webp','/images/gallery/office/dji_0625.webp','/images/gallery/office/dji_0651.webp','/images/gallery/office/dji_0912.webp','/images/gallery/office/dji_0916.webp','/images/gallery/office/dji_0987.webp','/images/gallery/office/img_5409_1.webp','/images/gallery/office/img_7702-large.webp'] },
  { slug: 'residential-developments', label: 'Residential Developments', images: ['/images/gallery/residential-developments/dji_0056.webp','/images/gallery/residential-developments/dji_0069.webp','/images/gallery/residential-developments/dji_0406.webp','/images/gallery/residential-developments/dji_0761.webp','/images/gallery/residential-developments/dji_0949.webp','/images/gallery/residential-developments/img_7673.webp','/images/gallery/residential-developments/img_7682.webp'] },
  { slug: 'retail',              label: 'Retail',                     images: ['/images/gallery/retail/20220708_235121743_ios.webp','/images/gallery/retail/20250922_195346584_ios.webp','/images/gallery/retail/20260205_201544477_ios.webp','/images/gallery/retail/dji_0083-large.webp','/images/gallery/retail/dji_0106.webp','/images/gallery/retail/dji_0160.webp','/images/gallery/retail/dji_0168-large.webp','/images/gallery/retail/dji_0260.webp','/images/gallery/retail/dji_0279.webp','/images/gallery/retail/dji_0281.webp','/images/gallery/retail/dji_0285.webp','/images/gallery/retail/dji_0289.webp','/images/gallery/retail/dji_0290.webp','/images/gallery/retail/dji_0337.webp','/images/gallery/retail/dji_0371.webp','/images/gallery/retail/dji_0394.webp','/images/gallery/retail/dji_0520.webp','/images/gallery/retail/dji_0544.webp','/images/gallery/retail/dji_0557.webp','/images/gallery/retail/dji_0610.webp','/images/gallery/retail/dji_0634.webp','/images/gallery/retail/dji_0643.webp','/images/gallery/retail/dji_0692.webp','/images/gallery/retail/dji_0704.webp','/images/gallery/retail/dji_0734.webp','/images/gallery/retail/dji_0861.webp','/images/gallery/retail/dji_0875.webp','/images/gallery/retail/dji_0892.webp','/images/gallery/retail/dji_0906.webp','/images/gallery/retail/dji_0947-large.webp','/images/gallery/retail/dji_0957.webp','/images/gallery/retail/dji_20260328113619_0009_d-large.webp','/images/gallery/retail/img_6891.webp'] },
  { slug: 'special-use',         label: 'Special Use',                images: ['/images/gallery/special-use/20240715_084018.webp','/images/gallery/special-use/20250502_185811278_ios.webp','/images/gallery/special-use/20250804_211746654_ios.webp','/images/gallery/special-use/dji_0008.webp','/images/gallery/special-use/dji_0101.webp','/images/gallery/special-use/dji_0109.webp','/images/gallery/special-use/dji_0144.webp','/images/gallery/special-use/dji_0168.webp','/images/gallery/special-use/dji_0258.webp','/images/gallery/special-use/dji_0462.webp','/images/gallery/special-use/dji_0569.webp','/images/gallery/special-use/dji_0675-large.webp','/images/gallery/special-use/dji_0690.webp','/images/gallery/special-use/dji_0812.webp','/images/gallery/special-use/hole-1-large.webp','/images/gallery/special-use/img_3965.webp'] },
  { slug: 'vacant-land',         label: 'Vacant / Development Land',  images: ['/images/gallery/vacant-land/20210504_210943467_ios.webp','/images/gallery/vacant-land/20220224_221109562_ios-large.webp','/images/gallery/vacant-land/20221021_201055667_ios.webp','/images/gallery/vacant-land/20230109_190808769_ios.webp','/images/gallery/vacant-land/20230411_200637180_ios.webp','/images/gallery/vacant-land/dji_0025.webp','/images/gallery/vacant-land/dji_0029.webp','/images/gallery/vacant-land/dji_0111-large.webp','/images/gallery/vacant-land/dji_0159.webp','/images/gallery/vacant-land/dji_0238.webp','/images/gallery/vacant-land/dji_0314.webp','/images/gallery/vacant-land/dji_0439.webp','/images/gallery/vacant-land/dji_0442.webp','/images/gallery/vacant-land/dji_0484.webp','/images/gallery/vacant-land/dji_0485-large.webp','/images/gallery/vacant-land/dji_0515-large.webp','/images/gallery/vacant-land/dji_0618.webp','/images/gallery/vacant-land/dji_0635-large.webp','/images/gallery/vacant-land/dji_0843.bak.webp','/images/gallery/vacant-land/dji_0860.bak.webp','/images/gallery/vacant-land/dji_0923.webp','/images/gallery/vacant-land/dji_0971.webp','/images/gallery/vacant-land/dji_0996.webp'] },
]

// ===== Seeders (each idempotent: skip if table already populated) =====

async function tableCount(table) {
  const { count, error } = await sb.from(table).select('*', { count: 'exact', head: true })
  if (error) throw new Error(`count(${table}): ${error.message}`)
  return count ?? 0
}

async function seedTestimonials() {
  if ((await tableCount('testimonials')) > 0) {
    console.log('  testimonials   skipped (already populated)')
    return
  }
  const rows = TESTIMONIALS.map((quote, i) => ({ quote, sort_order: i, visible: true }))
  const { error } = await sb.from('testimonials').insert(rows)
  if (error) throw error
  console.log(`  testimonials   inserted ${rows.length}`)
}

async function seedTeam() {
  if ((await tableCount('team_members')) > 0) {
    console.log('  team_members   skipped (already populated)')
    return
  }
  const rows = TEAM.map((m, i) => ({
    name: m.name,
    role: m.role,
    photo_url: m.photo,
    cv_url: m.cv,
    cv_filename: m.cv_filename,
    sort_order: i,
    visible: true,
  }))
  const { error } = await sb.from('team_members').insert(rows)
  if (error) throw error
  console.log(`  team_members   inserted ${rows.length}`)
}

async function seedRegions() {
  if ((await tableCount('regions')) > 0) {
    console.log('  regions        skipped (already populated)')
    return
  }
  const rows = REGIONS.map((r, i) => ({
    name: r.name,
    note: r.note,
    hero_image_url: r.hero,
    broll_images: BROLL[r.broll] ?? [],
    sort_order: i,
  }))
  const { error } = await sb.from('regions').insert(rows)
  if (error) throw error
  console.log(`  regions        inserted ${rows.length}`)
}

async function seedGallery() {
  if ((await tableCount('gallery_categories')) > 0) {
    console.log('  gallery        skipped (already populated)')
    return
  }
  const catRows = GALLERY.map((c, i) => ({ slug: c.slug, label: c.label, sort_order: i }))
  const { data: cats, error: catErr } = await sb
    .from('gallery_categories')
    .insert(catRows)
    .select('id, slug')
  if (catErr) throw catErr

  const slugToId = Object.fromEntries(cats.map((c) => [c.slug, c.id]))
  const imageRows = []
  for (const cat of GALLERY) {
    cat.images.forEach((url, i) => {
      imageRows.push({
        category_id: slugToId[cat.slug],
        image_url: url,
        sort_order: i,
      })
    })
  }
  const { error: imgErr } = await sb.from('gallery_images').insert(imageRows)
  if (imgErr) throw imgErr
  console.log(`  gallery        inserted ${cats.length} categories, ${imageRows.length} images`)
}

// ===== Main =====

console.log('Seeding Supabase from current site data...\n')

try {
  await seedTestimonials()
  await seedTeam()
  await seedRegions()
  await seedGallery()
  console.log('\nDone.')
} catch (err) {
  console.error('\nFAILED:', err.message)
  process.exit(1)
}
