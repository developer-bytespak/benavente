import Topbar from '@/components/admin/shell/Topbar'
import HomePageForm from '@/components/admin/forms/HomePageForm'
import { getHomePage } from '@/lib/cms/home'

export const dynamic = 'force-dynamic'

export default async function HomePageAdmin() {
  const home = await getHomePage()
  return (
    <>
      <Topbar
        title="Home Page"
        subtitle="Hero video and headline, services ticker, intro copy, and statistics"
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <HomePageForm initial={home} />
      </main>
    </>
  )
}
