// Hand-typed Database schema mirroring supabase/migrations/0001_init.sql.
// Shape matches what `supabase gen types typescript` would produce, so swapping
// to a generated file later is a drop-in replacement. To regenerate:
//   npx supabase gen types typescript --project-id fazfhxqmllanvovcforu > lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ----- Reusable JSON column shapes -----

export type StatItem = {
  label: string
  number: number
  suffix: string
}

export type CoreValueItem = {
  number: string
  name: string
  desc: string
}

// ----- Convenience Row aliases -----

export type SiteSettingsRow = {
  id: number
  logo_url: string | null
  footer_text: string | null
  copyright_text: string | null
  updated_at: string | null
}

export type ContactInfoRow = {
  id: number
  address: string | null
  phone: string | null
  email: string | null
  hours: string | null
  service_regions: string[]
  map_embed_url: string | null
  updated_at: string | null
}

export type HomePageRow = {
  id: number
  hero_video_urls: string[]
  hero_headline: string | null
  hero_subhead: string | null
  ticker_items: string[]
  intro_heading: string | null
  intro_paragraphs: string[]
  stats: StatItem[]
  updated_at: string | null
}

export type AboutPageRow = {
  id: number
  banner_url: string | null
  hero_headline: string | null
  hero_subtitle: string | null
  story_heading: string | null
  story_paragraphs: string[]
  story_stats: StatItem[]
  mission_headline: string | null
  mission_text: string | null
  core_values: CoreValueItem[]
  updated_at: string | null
}

export type TeamMemberRow = {
  id: string
  name: string
  role: string
  photo_url: string | null
  cv_url: string | null
  cv_filename: string | null
  sort_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export type RegionRow = {
  id: string
  name: string
  note: string | null
  hero_image_url: string | null
  broll_images: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

export type GalleryCategoryRow = {
  id: string
  slug: string
  label: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type GalleryImageRow = {
  id: string
  category_id: string
  image_url: string
  alt: string | null
  sort_order: number
  featured: boolean
  featured_order: number | null
  created_at: string
  updated_at: string
}

export type TestimonialRow = {
  id: string
  quote: string
  author: string | null
  company: string | null
  sort_order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export type ContactSubmissionRow = {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  submitted_at: string
}

// ----- Database union (explicit Insert/Update shapes — matches generated output) -----

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: SiteSettingsRow
        Insert: {
          id?: number
          logo_url?: string | null
          footer_text?: string | null
          copyright_text?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          logo_url?: string | null
          footer_text?: string | null
          copyright_text?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_info: {
        Row: ContactInfoRow
        Insert: {
          id?: number
          address?: string | null
          phone?: string | null
          email?: string | null
          hours?: string | null
          service_regions?: string[]
          map_embed_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          address?: string | null
          phone?: string | null
          email?: string | null
          hours?: string | null
          service_regions?: string[]
          map_embed_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      home_page: {
        Row: HomePageRow
        Insert: {
          id?: number
          hero_video_urls?: string[]
          hero_headline?: string | null
          hero_subhead?: string | null
          ticker_items?: string[]
          intro_heading?: string | null
          intro_paragraphs?: string[]
          stats?: StatItem[]
          updated_at?: string | null
        }
        Update: {
          id?: number
          hero_video_urls?: string[]
          hero_headline?: string | null
          hero_subhead?: string | null
          ticker_items?: string[]
          intro_heading?: string | null
          intro_paragraphs?: string[]
          stats?: StatItem[]
          updated_at?: string | null
        }
        Relationships: []
      }
      about_page: {
        Row: AboutPageRow
        Insert: {
          id?: number
          banner_url?: string | null
          hero_headline?: string | null
          hero_subtitle?: string | null
          story_heading?: string | null
          story_paragraphs?: string[]
          story_stats?: StatItem[]
          mission_headline?: string | null
          mission_text?: string | null
          core_values?: CoreValueItem[]
          updated_at?: string | null
        }
        Update: {
          id?: number
          banner_url?: string | null
          hero_headline?: string | null
          hero_subtitle?: string | null
          story_heading?: string | null
          story_paragraphs?: string[]
          story_stats?: StatItem[]
          mission_headline?: string | null
          mission_text?: string | null
          core_values?: CoreValueItem[]
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: TeamMemberRow
        Insert: {
          id?: string
          name: string
          role: string
          photo_url?: string | null
          cv_url?: string | null
          cv_filename?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          photo_url?: string | null
          cv_url?: string | null
          cv_filename?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      regions: {
        Row: RegionRow
        Insert: {
          id?: string
          name: string
          note?: string | null
          hero_image_url?: string | null
          broll_images?: string[]
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          note?: string | null
          hero_image_url?: string | null
          broll_images?: string[]
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_categories: {
        Row: GalleryCategoryRow
        Insert: {
          id?: string
          slug: string
          label: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          label?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: GalleryImageRow
        Insert: {
          id?: string
          category_id: string
          image_url: string
          alt?: string | null
          sort_order?: number
          featured?: boolean
          featured_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          image_url?: string
          alt?: string | null
          sort_order?: number
          featured?: boolean
          featured_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'gallery_images_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'gallery_categories'
            referencedColumns: ['id']
          }
        ]
      }
      testimonials: {
        Row: TestimonialRow
        Insert: {
          id?: string
          quote: string
          author?: string | null
          company?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote?: string
          author?: string | null
          company?: string | null
          sort_order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: ContactSubmissionRow
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          read?: boolean
          submitted_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          read?: boolean
          submitted_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
