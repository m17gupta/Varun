import Link from "next/link"
import { Search } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-border/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-lg text-dark">
            Varun Gupta
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:inline">
            Mahabharata
          </span>
        </Link>
        <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground md:flex">
          <div className="size-1.5 rounded-full bg-dark" />
          <Link href="/articles" className="transition-colors duration-300 hover:text-dark">
            Essays
          </Link>
          <Link href="/books" className="transition-colors duration-300 hover:text-dark">
            Books
          </Link>
          <Link href="/videos" className="transition-colors duration-300 hover:text-dark">
            Lectures
          </Link>
          <Link href="/podcast" className="transition-colors duration-300 hover:text-dark">
            Podcast
          </Link>
          <Link href="/about" className="transition-colors duration-300 hover:text-dark">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/search" aria-label="Search">
            <Search className="size-4 text-muted-foreground transition-colors duration-300 hover:text-dark" />
          </Link>
          <Link
            href="/membership"
            className="hidden rounded-full bg-dark px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:scale-105 sm:inline-flex"
          >
            Become a reader
          </Link>
        </div>
      </div>
    </header>
  )
}
