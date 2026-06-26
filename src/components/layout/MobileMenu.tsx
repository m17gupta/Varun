"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileMenuLink {
  label: string
  href: string
}

interface MobileMenuProps {
  links: MobileMenuLink[]
  className?: string
}

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export function MobileMenu({ links, className }: MobileMenuProps) {
  return (
    <motion.nav
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-4 p-6", className)}
    >
      {links.map((link) => (
        <motion.div key={link.href} variants={linkVariants}>
          <Link
            href={link.href}
            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  )
}
