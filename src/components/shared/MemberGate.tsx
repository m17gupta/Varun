import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

interface MemberGateProps {
  tier: "free_member" | "paid"
  children: React.ReactNode
}

export async function MemberGate({ tier, children }: MemberGateProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  if (tier === "paid" && session.user?.role !== "paid") {
    redirect("/membership")
  }

  return <>{children}</>
}
