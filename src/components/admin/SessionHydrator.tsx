"use client"

import { useEffect } from "react"
import { getSession } from "next-auth/react"
import { useAppDispatch } from "@/lib/store/hooks"
import { setCredentials, logout } from "@/lib/store/auth/authSlice"

export function SessionHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let active = true

    async function hydrate() {
      try {
        const session = await getSession()
        if (!active) return
        if (session?.user) {
          dispatch(
            setCredentials({
              user: {
                id: (session.user as { id?: string }).id,
                _id: (session.user as { id?: string }).id,
                email: session.user.email ?? undefined,
                name: session.user.name ?? undefined,
                role: (session.user as { role?: string }).role,
              },
            }),
          )
        } else {
          dispatch(logout())
        }
      } catch {
        dispatch(logout())
      }
    }

    hydrate()
    return () => {
      active = false
    }
  }, [dispatch])

  return null
}
