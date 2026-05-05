import Topbar from '@/components/admin/shell/Topbar'
import ContactInfoForm from '@/components/admin/forms/ContactInfoForm'
import { getContactInfo } from '@/lib/cms/site'

export const dynamic = 'force-dynamic'

export default async function ContactInfoPage() {
  const info = await getContactInfo()

  return (
    <>
      <Topbar
        title="Contact Info"
        subtitle="Office address, phone, email, hours, and service regions"
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <ContactInfoForm initial={info} />
      </main>
    </>
  )
}
