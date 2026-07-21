"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"

const AnimatedBackground3D = dynamic(
  () => import("@/components/shared/AnimatedBackground3D"),
  { ssr: false },
)

interface AuthBackgroundProps {
  children: ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
      duration: 0.8,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
} as const

export { itemVariants, containerVariants, cardVariants }

export default function AuthBackground({ children }: AuthBackgroundProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { filter: "blur(8px)" },
        {
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        },
      )
    }
  }, [])

  return (
    <>
      <AnimatedBackground3D />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          ref={cardRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm"
        >
          <motion.div variants={cardVariants}>{children}</motion.div>
        </motion.div>
      </div>
    </>
  )
}
