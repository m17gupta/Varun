import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-[#12110e] px-5 py-14 text-[#eee8dd] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#81796f]">
              The letter
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
              A weekly dispatch on dharma, history, and the long horizon.
            </h2>
            <form className="mt-8 flex max-w-md border-b border-white/20">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="youraddress@example.com"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#eee8dd] placeholder:text-[#777066] focus:outline-none"
              />
              <button
                type="submit"
                className="py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#bcb3a8]"
              >
                Subscribe
              </button>
            </form>
          </div>
          <nav className="grid gap-3 text-sm text-[#9a9185]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#81796f]">
              Index
            </p>
            <Link href="/articles">Essays</Link>
            <Link href="/books">Books</Link>
            <Link href="/videos">Lectures</Link>
            <Link href="/podcast">Podcast</Link>
          </nav>
          <nav className="grid gap-3 text-sm text-[#9a9185]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#81796f]">
              Society
            </p>
            <Link href="/about">About</Link>
            <Link href="/search">Ask the Archive</Link>
            <Link href="/membership">Members</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-serif text-5xl leading-none sm:text-7xl">
            Varun Gupta
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#746c62]">
            © 2026 / All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
