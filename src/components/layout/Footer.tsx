"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface FooterProps {
  className?: string
}

const footerLinks = [
  { label: "Research", href: "/research" },
  { label: "Articles", href: "/articles" },
  { label: "Books", href: "/books" },
  { label: "Videos", href: "/videos" },
  { label: "Podcast", href: "/podcast" },
  { label: "Speaking", href: "/speaking" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" },
]

export function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("")

  return (
    <footer
      className={cn("border-t border-white/10", className)}
      style={{ background: "#111009" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Top row: Newsletter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-sm">
            <p
              className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
            >
              A weekly dispatch on Mahabharata scholarship
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              New research, essays, and episodes — delivered bi-weekly.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0 max-w-sm w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-10 px-4 bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="h-10 px-5 text-xs font-semibold text-white flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "var(--crimson)" }}
            >
              Subscribe <ArrowRight className="size-3.5" />
            </button>
          </form>
        </div>

        {/* Middle: Name + Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Name — large editorial display */}
          <div>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
              }}
            >
              Varun Gupta
            </h2>
            <p className="mt-4 text-white/40 text-sm max-w-xs leading-relaxed">
              Mahabharata researcher, author, and speaker. Bridging ancient wisdom with the modern world.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-white/80 transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Varun Gupta. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/newsletter" className="hover:text-white/50 transition-colors">Newsletter</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
