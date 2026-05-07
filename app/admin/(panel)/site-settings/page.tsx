import Topbar from '@/components/admin/shell/Topbar'
import SiteSettingsForm from '@/components/admin/forms/SiteSettingsForm'
import CredentialsForm from '@/components/admin/forms/CredentialsForm'
import { getSiteSettings } from '@/lib/cms/site'

export const dynamic = 'force-dynamic'

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <Topbar
        title="Site Settings"
        subtitle="Logo, footer text, and copyright shown across every page"
      />
      <main className="flex-1 px-5 lg:px-9 py-7 space-y-10">
        <SiteSettingsForm initial={settings} />
        <div>
          <h2 className="font-serif text-[15px] text-navy font-semibold tracking-wide mb-5">
            Admin Credentials
          </h2>
          <CredentialsForm />
        </div>
      </main>
    </>
  )
}
