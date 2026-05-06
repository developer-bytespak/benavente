import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GalleryClient from '@/components/sections/gallery/GalleryClient'
import CtaBand from '@/components/sections/home/CtaBand'
import { getPublicGallery } from '@/lib/cms/gallery'

export const metadata: Metadata = {
  title: 'Hawaii Commercial Appraisal Portfolio | Benavente Group',
  description:
    'Explore our Hawaii commercial appraisal portfolio of featured projects across Honolulu, Guam, Saipan, and the broader Pacific region.',
}

export const revalidate = 30

export default async function GalleryPage() {
  const categories = await getPublicGallery()

  return (
    <>
      <section className="relative bg-navy min-h-screen flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
        <Image
          src="/images/regions/big-island.webp"
          alt="Hilo Bay, Hawaii"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <RevealOnScroll>
          <div className="relative max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Hawaii Commercial Appraisal Portfolio</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Featured Hawaii Appraisal <span className="italic text-gold-light">Projects</span>
              <br />
              &amp; Case Studies
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              A sampling of our commercial appraisal case studies and services across Hawai&#8216;i, Guam, Saipan, the Marshall Islands, and other Pacific Islands.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact" variant="light">Start a Project</MicroCTA>
              <MicroCTA href="/about" variant="light">Our Expertise</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Suspense fallback={<div className="h-[200px]" />}>
        <GalleryClient categories={categories} />
      </Suspense>

      <CtaBand />
    </>
  )
}
