import type { Metadata } from "next"
import loginConfig from "@/config/pages/login.json"
import registerConfig from "@/config/pages/register.json"

export const metadata: Metadata = {
  title: {
    template: "%s | Varun Gupta",
    default: "Sign In | Varun Gupta",
  },
  description: "Sign in or create an account on Varun Gupta's Mahabharata knowledge platform.",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
