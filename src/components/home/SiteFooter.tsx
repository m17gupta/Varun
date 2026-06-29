import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-dark px-6 py-20 text-card sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Centered CTA */}
        <div className="mx-auto max-w-2xl text-center pb-16 border-b border-white/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40 mb-5">
            The letter
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl text-card">
            A weekly dispatch on dharma, history, and the long horizon.
          </h2>
          <form className="mt-10 mx-auto flex max-w-md border-b border-white/20">
            <label htmlFor="newsletter-email-footer" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email-footer"
              type="email"
              placeholder="youraddress@example.com"
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-card placeholder:text-white/30 focus:outline-none"
            />
            <button
              type="submit"
              className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-card"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle: Name + Links */}
        <div className="grid gap-12 pt-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-5xl leading-none sm:text-7xl text-card">
              Varun Gupta
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/40 leading-relaxed">
              Mahabharata researcher, author, and speaker. Bridging ancient wisdom with the modern world.
            </p>
          </div>
          <nav className="grid gap-3 text-sm text-white/40">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">
              Index
            </p>
            <Link href="/articles" className="transition-colors duration-300 hover:text-card">Essays</Link>
            <Link href="/books" className="transition-colors duration-300 hover:text-card">Books</Link>
            <Link href="/videos" className="transition-colors duration-300 hover:text-card">Lectures</Link>
            <Link href="/podcast" className="transition-colors duration-300 hover:text-card">Podcast</Link>
          </nav>
          <nav className="grid gap-3 text-sm text-white/40">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">
              Society
            </p>
            <Link href="/about" className="transition-colors duration-300 hover:text-card">About</Link>
            <Link href="/search" className="transition-colors duration-300 hover:text-card">Ask the Archive</Link>
            <Link href="/membership" className="transition-colors duration-300 hover:text-card">Members</Link>
            <Link href="/contact" className="transition-colors duration-300 hover:text-card">Contact</Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
            © 2026 / All rights reserved
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/30">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-card">Privacy</Link>
            <Link href="/newsletter" className="transition-colors duration-300 hover:text-card">Newsletter</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
