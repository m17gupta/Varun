export interface BookModel {
  _id?: string
  title?: string
  slug?: string
  label?: string
  excerpt?: string
  image?: string
  href?: string
  featured?: boolean
  order?: number
  published?: boolean
  type?: "book"
  createdAt?: string
  updatedAt?: string
}

export interface BookFormData {
  title: string
  slug: string
  label: string
  excerpt: string
  image: string
  href: string
  featured: boolean
  order: number
  published: boolean
}

export interface BooksState {
  books: BookModel[]
  selectedBooks: BookModel | null
  loading: boolean
  error: string | null
  isFetchedBooks: boolean
}
