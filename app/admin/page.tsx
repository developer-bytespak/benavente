'use client'

import { useEffect, useState } from 'react'
import Login from '@/components/admin/Login'
import Sidebar, { type SectionKey } from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'
import Dashboard from '@/components/admin/Dashboard'
import Assignments from '@/components/admin/Assignments'
import CompsLibrary from '@/components/admin/CompsLibrary'
import LitigationCases from '@/components/admin/LitigationCases'
import Leads from '@/components/admin/Leads'
import Subscribers from '@/components/admin/Subscribers'
import EngagementLetters from '@/components/admin/EngagementLetters'
import Invoices from '@/components/admin/Invoices'
import MarketData from '@/components/admin/MarketData'
import Analytics from '@/components/admin/Analytics'
import BlogPostsAdmin from '@/components/admin/BlogPostsAdmin'
import TeamAdmin from '@/components/admin/TeamAdmin'
import GalleryAdmin from '@/components/admin/GalleryAdmin'
import ServicesAdmin from '@/components/admin/ServicesAdmin'
import TestimonialsAdmin from '@/components/admin/TestimonialsAdmin'
import SiteContentAdmin from '@/components/admin/SiteContentAdmin'
import LicensesCe from '@/components/admin/LicensesCe'
import SettingsAdmin from '@/components/admin/SettingsAdmin'

const SECTION_META: Record<SectionKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Operations · Capacity · Revenue Pipeline' },
  assignments: { title: 'Assignments', subtitle: 'Active appraisal pipeline · workflow stages · peer review' },
  comps: { title: 'Comparable Sales Library', subtitle: 'Internal comps database · searchable, filterable' },
  cases: { title: 'Litigation Cases', subtitle: 'Expert witness engagements · deposition & trial deadlines' },
  leads: { title: 'Leads & Inquiries', subtitle: 'Manage incoming inquiries from contact form, phone & referrals' },
  subscribers: { title: 'Newsletter Subscribers', subtitle: 'People subscribed to your insights newsletter' },
  letters: { title: 'Engagement Letters', subtitle: 'Generate, send, and track signed contracts' },
  invoices: { title: 'Invoices & Payments', subtitle: 'Billing, collections, aging report' },
  market: { title: 'Market Data', subtitle: 'Submarket metrics · quarterly research reports' },
  analytics: { title: 'Conversion Analytics', subtitle: 'Lead funnel · CV downloads · referral attribution' },
  blog: { title: 'Blog Posts', subtitle: 'Publish, edit, and feature articles' },
  team: { title: 'Team Members', subtitle: 'Manage staff bios, photos, and CV downloads' },
  gallery: { title: 'Project Gallery', subtitle: 'Categories and project imagery for the Portfolio page' },
  services: { title: 'Services', subtitle: 'Service offerings shown on homepage and ticker' },
  testimonials: { title: 'Testimonials', subtitle: 'Client quotes shown on homepage and other sections' },
  site: { title: 'Site Content', subtitle: 'Hero, stats, mission pillars, and ticker copy' },
  licenses: { title: 'Licenses & CE', subtitle: 'Hawai‘i, Guam & CNMI license tracking · CE compliance' },
  settings: { title: 'Settings & SEO', subtitle: 'Contact info, integrations, and per-page metadata' },
}

export default function AdminPage() {
  const [hydrated, setHydrated] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [active, setActive] = useState<SectionKey>('dashboard')
  const [mobileSidebar, setMobileSidebar] = useState(false)

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem('benavente_admin_auth') === '1')
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [active])

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('benavente_admin_auth')
    } catch {}
    setAuthed(false)
    setActive('dashboard')
  }

  if (!hydrated) {
    return <div className="min-h-screen bg-navy" aria-hidden />
  }

  if (!authed) {
    return <Login onAuthenticated={() => setAuthed(true)} />
  }

  const meta = SECTION_META[active]

  return (
    <div className="min-h-screen bg-cream/60 lg:flex font-sans text-navy">
      <Sidebar
        active={active}
        onSelect={setActive}
        onLogout={handleLogout}
        open={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMenu={() => setMobileSidebar(true)}
        />

        <main className="flex-1 px-5 lg:px-9 py-7">
          {active === 'dashboard' && <Dashboard onNavigate={setActive} />}
          {active === 'assignments' && <Assignments />}
          {active === 'comps' && <CompsLibrary />}
          {active === 'cases' && <LitigationCases />}
          {active === 'leads' && <Leads />}
          {active === 'subscribers' && <Subscribers />}
          {active === 'letters' && <EngagementLetters />}
          {active === 'invoices' && <Invoices />}
          {active === 'market' && <MarketData />}
          {active === 'analytics' && <Analytics />}
          {active === 'blog' && <BlogPostsAdmin />}
          {active === 'team' && <TeamAdmin />}
          {active === 'gallery' && <GalleryAdmin />}
          {active === 'services' && <ServicesAdmin />}
          {active === 'testimonials' && <TestimonialsAdmin />}
          {active === 'site' && <SiteContentAdmin />}
          {active === 'licenses' && <LicensesCe />}
          {active === 'settings' && <SettingsAdmin />}
        </main>
      </div>
    </div>
  )
}
