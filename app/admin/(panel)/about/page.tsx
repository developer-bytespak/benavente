import Topbar from '@/components/admin/shell/Topbar'
import AboutPageForm from '@/components/admin/forms/AboutPageForm'
import { getAboutPage } from '@/lib/cms/about'

export const dynamic = 'force-dynamic'

export default async function AboutPageAdmin() {
  const about = await getAboutPage()
  return (
    <>
      <Topbar
        title="About Page"
        subtitle="Banner, hero copy, story, mission, and core values"
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <AboutPageForm initial={about} />
      </main>
    </>
  )
}
