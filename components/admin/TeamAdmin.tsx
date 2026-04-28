'use client'

import Image from 'next/image'
import Icon from './Icon'
import { teamAdmin } from '@/lib/admin/mockData'

export default function TeamAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Team <span className="italic text-gold">Members</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {teamAdmin.length} members &middot; appears on About page &middot; CV downloads tracked
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamAdmin.map((m) => (
          <div
            key={m.id}
            className="group bg-white border border-gold/15 rounded-[4px] overflow-hidden hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] bg-cream-deeper">
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-9 h-9 rounded-[3px] bg-white/95 hover:bg-white text-navy flex items-center justify-center shadow-sm" title="Edit">
                  <Icon name="edit" className="w-[15px] h-[15px]" />
                </button>
                <button className="w-9 h-9 rounded-[3px] bg-white/95 hover:bg-white text-red-600 flex items-center justify-center shadow-sm" title="Remove">
                  <Icon name="trash" className="w-[15px] h-[15px]" />
                </button>
              </div>
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-emerald-100/95 text-emerald-700 text-[10px] font-serif font-medium tracking-[0.05em] uppercase">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                Visible
              </span>
            </div>
            <div className="p-4">
              <p className="font-mono text-slate-light text-[10px]">{m.id}</p>
              <h3 className="font-serif text-[16px] text-navy mt-0.5 leading-tight">{m.name}</h3>
              <p className="text-slate text-[12px] tracking-[0.05em] uppercase font-serif mt-1">{m.role}</p>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gold/10">
                <span className="inline-flex items-center gap-1 text-[11px] font-serif text-slate">
                  <Icon name="image" className="w-3.5 h-3.5 text-gold" />
                  Photo
                </span>
                <span className="text-slate-light/40">&middot;</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-serif text-slate">
                  <Icon name="download" className="w-3.5 h-3.5 text-gold" />
                  CV uploaded
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button className="group bg-cream/40 border-2 border-dashed border-gold/30 rounded-[4px] hover:border-gold hover:bg-white transition-all duration-300 min-h-[280px] flex flex-col items-center justify-center text-center p-6">
          <span className="w-14 h-14 rounded-full bg-gold/10 group-hover:bg-gold text-gold-dark group-hover:text-white flex items-center justify-center transition-colors">
            <Icon name="plus" className="w-6 h-6" />
          </span>
          <p className="font-serif text-[16px] text-navy mt-3">Add Team Member</p>
          <p className="text-slate-light text-[12px] font-serif mt-1">
            Photo, role, bio, CV upload
          </p>
        </button>
      </div>
    </div>
  )
}
