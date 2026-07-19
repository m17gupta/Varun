import Link from "next/link"
import { Search } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-lg text-dark">
            Varun Gupta
          </span>
          <span className="hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:inline">
            Mahabharata
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground md:flex">
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
        <div className="flex items-center gap-3">
          <Link href="/search" aria-label="Search">
            <Search className="size-3.5 text-muted-foreground transition-colors duration-300 hover:text-dark" />
          </Link>
          <Link
            href="/membership"
            className="hidden rounded-full bg-dark px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:scale-105 sm:inline-flex"
          >
            Become a reader
          </Link>
        </div>
      </div>
    </header>
  )
}
