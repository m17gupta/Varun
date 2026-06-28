import Link from "next/link"
import { Search } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ded6ca] bg-[#f6f2eb]/95 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-sm text-[#2b2823]">
          Varun Gupta
          <span className="ml-2 hidden text-[9px] uppercase tracking-[0.24em] text-[#8c8478] sm:inline">
            Mahabharata
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6d655b] md:flex">
          <Link href="/articles" className="transition hover:text-[#191714]">
            Essays
          </Link>
          <Link href="/books" className="transition hover:text-[#191714]">
            Books
          </Link>
          <Link href="/videos" className="transition hover:text-[#191714]">
            Lectures
          </Link>
          <Link href="/podcast" className="transition hover:text-[#191714]">
            Podcast
          </Link>
          <Link href="/about" className="transition hover:text-[#191714]">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search">
            <Search className="size-4 text-[#746b60]" />
          </Link>
          <Link
            href="/membership"
            className="hidden bg-[#812c2d] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#fffaf2] sm:inline-flex"
          >
            Become a reader
          </Link>
        </div>
      </div>
    </header>
  )
}
