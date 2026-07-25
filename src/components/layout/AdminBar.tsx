"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, MessageSquare, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useAppSelector } from "@/lib/store/hooks"
import { useAnnotatorStore } from "@/components/annotationPlugin"
import { usePathname } from "next/navigation"

export function AdminBar() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { isCommentModeActive, toggleCommentMode, annotations } = useAnnotatorStore()
  const [isVisible, setIsVisible] = useState(true)

  const isAdmin = isAuthenticated && user?.role === "admin"

  useEffect(() => {
    if (isAdmin && isVisible) {
      document.documentElement.classList.add("has-admin-bar")
    } else {
      document.documentElement.classList.remove("has-admin-bar")
    }
    return () => {
      document.documentElement.classList.remove("has-admin-bar")
    }
  }, [isAdmin, isVisible])

  if (pathname.startsWith("/admin")) return null

  if (!isAdmin) return null

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-3 right-3 z-[10000] flex items-center gap-2 px-4 h-8 rounded-full border border-white/20 bg-[#063A1D] text-white/80 shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 hover:text-white text-[11px] font-semibold"
      >
        <Eye className="w-3.5 h-3.5 text-[#98c45f]" />
        <span>Show Admin Bar</span>
      </button>
    )
  }

  return (
    <div
      data-annotator-ui="true"
      className="fixed top-20 left-0 right-0 z-[9999] bg-[#063A1D] text-white text-[13px] font-sans border-b border-white/10 select-none"
    >
      <div className="w-full px-4 h-11 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-bold uppercase tracking-wider text-[11px]"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#98c45f]" />
            <span>ADMIN DASHBOARD</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCommentMode()}
            className={`h-7 px-3 rounded-full flex items-center gap-2 transition-all border text-[11px] font-semibold hover:opacity-90 ${
              isCommentModeActive
                ? "border-[#98c45f] text-[#98c45f] bg-[rgba(152,196,95,0.1)]"
                : "border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.05)]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isCommentModeActive ? "Hide Comments" : `Show Comments (${annotations.length})`}</span>
          </button>

          <span className="text-white/20 select-none">|</span>

          <button
            onClick={() => setIsVisible(false)}
            className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent text-white/70 hover:bg-white/15 hover:text-white transition-all"
            title="Hide Admin Bar"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
