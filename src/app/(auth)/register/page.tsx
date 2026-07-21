"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { useSpring, animated } from "react-spring"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { signupThunk } from "@/lib/store/auth/authThunks"
import config from "@/config/pages/register.json"
import AuthBackground, { itemVariants } from "@/components/shared/AuthBackground"

function AnimatedInput({ id, label, ...props }: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onFocus = () => {
      gsap.to(labelRef.current, { y: -2, color: "var(--primary)", duration: 0.3, ease: "power2.out" })
      gsap.to(el, { borderColor: "var(--primary)", boxShadow: "0 0 0 2px rgba(139,92,246,0.15)", duration: 0.3 })
    }
    const onBlur = () => {
      if (!(document.activeElement === el)) {
        gsap.to(labelRef.current, { y: 0, color: "var(--muted-foreground)", duration: 0.3 })
        gsap.to(el, { borderColor: "", boxShadow: "", duration: 0.3 })
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
    <motion.div className="space-y-2" variants={itemVariants}>
      <Label ref={labelRef} htmlFor={id}>
        {label}
      </Label>
      <Input ref={inputRef} id={id} {...props} />
    </motion.div>
  )
}

function PasswordField({ id, label, value, onChange, showPassword, onToggle, matchValue }: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showPassword: boolean
  onToggle: () => void
  matchValue?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onFocus = () => {
      gsap.to(labelRef.current, { y: -2, color: "var(--primary)", duration: 0.3, ease: "power2.out" })
      gsap.to(el, { borderColor: "var(--primary)", boxShadow: "0 0 0 2px rgba(139,92,246,0.15)", duration: 0.3 })
    }
    const onBlur = () => {
      if (!(document.activeElement === el)) {
        gsap.to(labelRef.current, { y: 0, color: "var(--muted-foreground)", duration: 0.3 })
        gsap.to(el, { borderColor: "", boxShadow: "", duration: 0.3 })
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
    <motion.div className="space-y-2" variants={itemVariants}>
      <Label ref={labelRef} htmlFor={id}>
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          required
          autoComplete={id === "password" ? "new-password" : "new-password"}
          className="pr-11"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {matchValue !== undefined && value.length > 0 && (
        <p className={`flex items-center gap-1.5 text-xs ${value === matchValue ? "text-emerald-600" : "text-destructive"}`}>
          <span className={`inline-block size-1.5 rounded-full ${value === matchValue ? "bg-emerald-600" : "bg-destructive"}`} />
          {value === matchValue ? "Passwords match" : "Passwords do not match"}
        </p>
      )}
    </motion.div>
  )
}

function SubmitButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  const springProps = useSpring({
    scale: loading ? 0.97 : 1,
    opacity: loading ? 0.8 : 1,
    config: { tension: 300, friction: 20 },
  })

  return (
    <motion.div variants={itemVariants}>
      <animated.div style={springProps}>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? loadingLabel : label}
        </Button>
      </animated.div>
    </motion.div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current.querySelectorAll(".input-field"),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.5 },
      )
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    try {
      await dispatch(signupThunk({ name, email, password })).unwrap()
      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err || "Registration failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <AuthBackground>
      <Card ref={cardRef} className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">{config.pageHeader.title}</CardTitle>
          <CardDescription>{config.pageHeader.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}
            <AnimatedInput id="name" label="Full Name" type="text" placeholder="Varun Gupta" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            <AnimatedInput id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <PasswordField id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            <PasswordField id="confirmPassword" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} showPassword={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} matchValue={password} />
            <SubmitButton loading={loading} label="Create Account" loadingLabel="Creating account…" />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <motion.div variants={itemVariants} className="w-full">
            <Separator />
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </CardFooter>
      </Card>
    </AuthBackground>
  )
}
