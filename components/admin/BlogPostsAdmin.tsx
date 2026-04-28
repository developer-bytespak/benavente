'use client'

import { useState } from 'react'
import Icon from './Icon'
import { blogPostsAdmin, formatDate } from '@/lib/admin/mockData'

export default function BlogPostsAdmin() {
  const [filter, setFilter] = useState<'all' | 'Published' | 'Draft'>('all')

  const filtered = blogPostsAdmin.filter((p) => filter === 'all' || p.status === filter)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Blog <span className="italic text-gold">Posts</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {blogPostsAdmin.length} articles &middot; {blogPostsAdmin.filter((p) => p.status === 'Published').length} published &middot;{' '}
            {blogPostsAdmin.filter((p) => p.status === 'Draft').length} draft
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
          >
            <Icon name="external" className="w-[14px] h-[14px]" />
            View Live Blog
          </a>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="plus" className="w-[14px] h-[14px]" />
            New Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-gold/15 rounded-[4px] p-3 flex flex-wrap items-center gap-2">
        {(['all', 'Published', 'Draft'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 h-9 rounded-[3px] border text-[12px] font-serif font-medium tracking-[0.1em] uppercase transition-colors ${
              filter === f
                ? 'bg-navy text-white border-navy'
                : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-9 px-3">
          <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
          <input
            type="search"
            placeholder="Search posts…"
            className="flex-1 bg-transparent outline-none text-[13px] font-serif text-navy placeholder:text-slate-light/60"
          />
        </div>
      </div>

      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Title', 'Category', 'Author', 'Status', 'Views', 'Published', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] tracking-[0.22em] uppercase font-serif font-medium text-slate"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-2.5">
                      {post.featured && (
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded bg-gold/15 text-gold shrink-0 mt-0.5"
                          title="Featured post"
                        >
                          <Icon name="star" className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="font-serif text-[14px] text-navy font-medium leading-snug">
                          {post.title}
                        </p>
                        <p className="font-mono text-slate-light text-[10px] mt-0.5">{post.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-navy/15 text-navy bg-cream">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-serif text-navy">{post.author}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${
                        post.status === 'Published'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gold/10 text-gold-dark border-gold/30'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-serif text-navy tabular-nums">
                      {post.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-serif text-navy">{formatDate(post.publishedAt)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-light hover:text-gold-dark hover:bg-gold/10 rounded-[3px] transition-colors" title="Edit">
                        <Icon name="edit" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-navy hover:bg-cream rounded-[3px] transition-colors" title="View">
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-red-600 hover:bg-red-50 rounded-[3px] transition-colors" title="Delete">
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
