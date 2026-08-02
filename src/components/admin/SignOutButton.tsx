"use client"

import { signOut } from "next-auth/react"
import { useAppDispatch } from "@/lib/store/hooks"
import { logout } from "@/lib/store/auth/authSlice"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const dispatch = useAppDispatch()

  async function handleSignOut() {
    dispatch(logout())
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="size-4 shrink-0" />
      Sign Out
    </button>
  )
}
