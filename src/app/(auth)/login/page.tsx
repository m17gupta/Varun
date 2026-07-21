"use client"

import { useState, useEffect, useRef } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch } from "@/lib/store/hooks"
import { setCredentials } from "@/lib/store/auth/authSlice"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { useSpring, animated } from "react-spring"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import config from "@/config/pages/login.json"
import AuthBackground, { itemVariants } from "@/components/shared/AuthBackground"

function AnimatedInput({ id, label, ...props }: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onFocus = () => {
      gsap.to(labelRef.current, { y: -2, color: "var(--primary)", duration: 0.3, ease: "power2.out" })
      gsap.to(el, { borderColor: "var(--primary)", boxShadow: "0 0 0 3px rgba(139,92,246,0.12)", duration: 0.3 })
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4 })
      }
    }
    const onBlur = () => {
      if (!(document.activeElement === el)) {
        gsap.to(labelRef.current, { y: 0, color: "", duration: 0.3 })
        gsap.to(el, { borderColor: "", boxShadow: "", duration: 0.3 })
        if (glowRef.current) {
          gsap.to(glowRef.current, { opacity: 0, scale: 0.95, duration: 0.3 })
        }
      }
    }
    el.addEventListener("focusin", onFocus)
    el.addEventListener("focusout", onBlur)
    return () => {
      el.removeEventListener("focusin", onFocus)
      el.removeEventListener("focusout", onBlur)
    }
  }, [])

  return (
    <motion.div className="space-y-2.5 relative" variants={itemVariants}>
      <div
        ref={glowRef}
        className="absolute -inset-1 rounded-lg opacity-0 scale-95 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />
      <Label ref={labelRef} htmlFor={id} className="text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      <Input
        ref={inputRef}
        id={id}
        className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all duration-200 relative z-10"
        {...props}
      />
    </motion.div>
  )
}

function PasswordInput({ value, onChange, showPassword, onToggle }: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showPassword: boolean
  onToggle: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onFocus = () => {
      gsap.to(el, { borderColor: "var(--primary)", boxShadow: "0 0 0 3px rgba(139,92,246,0.12)", duration: 0.3 })
    }
    const onBlur = () => {
      gsap.to(el, { borderColor: "", boxShadow: "", duration: 0.3 })
    }
    el.addEventListener("focusin", onFocus)
    el.addEventListener("focusout", onBlur)
    return () => {
      el.removeEventListener("focusin", onFocus)
      el.removeEventListener("focusout", onBlur)
    }
  }, [])

  return (
    <motion.div className="space-y-2.5" variants={itemVariants}>
      <div className="flex items-center justify-between">
        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
          Password
        </Label>
        <Link
          href="/forgot-password"
          className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="relative">
        <Input
          ref={inputRef}
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          required
          autoComplete="current-password"
          className="h-11 pr-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => {
            onToggle()
            gsap.fromTo(
              ".password-toggle-icon",
              { rotate: showPassword ? 0 : 180 },
              { rotate: showPassword ? 180 : 0, duration: 0.3, ease: "power2.out" },
            )
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <span className="password-toggle-icon inline-flex">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </motion.div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  const springProps = useSpring({
    scale: loading ? 0.97 : 1,
    opacity: loading ? 0.8 : 1,
    config: { tension: 300, friction: 20 },
  })

  return (
    <motion.div variants={itemVariants}>
      <animated.div style={springProps}>
        <Button
          type="submit"
          className="h-11 w-full font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </animated.div>
    </motion.div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("varun@gmail.com")
  const [password, setPassword] = useState("1234567899")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current.querySelectorAll(".input-row"),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.4 },
      )
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password. Please try again.")
      setLoading(false)
      return
    }

    const session = await getSession()
    if (session?.user) {
      dispatch(
        setCredentials({
          user: {
            id: (session.user as any).id,
            _id: (session.user as any).id,
            email: session.user.email ?? undefined,
            name: session.user.name ?? undefined,
            role: (session.user as any).role,
          
          },
        }),
      )
    }

    router.push("/")
    router.refresh()
  }

  return (
    <AuthBackground>
      <Card
        ref={cardRef}
        className="w-full max-w-md border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 transition-all duration-300"
      >
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {config.pageHeader.title}
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            {config.pageHeader.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                role="alert"
                className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}
            <div className="input-row">
              <AnimatedInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="input-row">
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            </div>
            <motion.div className="flex items-start space-x-3 pt-1" variants={itemVariants}>
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="mt-0.5 border-slate-300 dark:border-slate-600"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
                Remember me for 30 days
              </Label>
            </motion.div>
            <SubmitButton loading={loading} />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4 pt-6">
          <motion.p variants={itemVariants} className="text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-slate-900 hover:underline dark:text-slate-100">
              Create one
            </Link>
          </motion.p>
        </CardFooter>
      </Card>
    </AuthBackground>
  )
}
