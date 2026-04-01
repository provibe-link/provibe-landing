"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  fadeUp,
  slideLeft,
  slideRight,
  scale,
} from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

interface AnimatedSectionProps {
  children: ReactNode
  variant?: "fade-up" | "slide-left" | "slide-right" | "scale" | "custom"
  delay?: number
  threshold?: number
  className?: string
  customVariants?: Variants
}

export function AnimatedSection({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.2,
  className,
  customVariants,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  })
  const prefersReducedMotion = useReducedMotion()

  // Select variant based on prop
  const variantMap: Record<string, Variants> = {
    "fade-up": fadeUp,
    "slide-left": slideLeft,
    "slide-right": slideRight,
    scale: scale,
    custom: customVariants || fadeUp,
  }

  const selectedVariant = variantMap[variant]

  // If user prefers reduced motion, just fade in
  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : selectedVariant

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
