"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  BarChart3,
  Menu,
  BookOpen,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminSidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r bg-card md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 border-b px-4 font-semibold">
          <BookOpen className="size-5 text-primary" />
          <span>Varun Gupta</span>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <SidebarNav />
        </ScrollArea>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger className="fixed top-3 left-3 z-40 inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-foreground md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 p-0">
          <div className="flex h-14 items-center gap-2 border-b px-4 font-semibold">
            <BookOpen className="size-5 text-primary" />
            <span>Varun Gupta</span>
          </div>
          <ScrollArea className="flex-1 px-3 py-4">
            <SidebarNav />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
