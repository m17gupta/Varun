"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { MobileMenu } from "@/components/layout/MobileMenu"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Articles", href: "/articles" },
  { label: "Videos", href: "/videos" },
  { label: "Podcast", href: "/podcast" },
  { label: "Books", href: "/books" },
  { label: "Speaking", href: "/speaking" },
  { label: "Contact", href: "/contact" },
]

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 700 }}
        >
          Varun Gupta
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--crimson)" }}
          >
            Membership
          </Link>

          <Sheet>
            <SheetTrigger className="md:hidden p-2 -mr-2">
              <MenuIcon className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="top" className="md:hidden">
              <MobileMenu links={[...navLinks, { label: "Membership", href: "/membership" }]} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
