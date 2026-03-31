export interface Service {
  id: number
  number: string
  name: string
  slug: string
  icon: string
  shortDesc: string
}

export interface Project {
  id: number
  title: string
  type: string
  location: string
  category: string
}

export interface Post {
  id: number
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface Region {
  name: string
  note: string
}
