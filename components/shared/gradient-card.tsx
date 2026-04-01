"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Move outside component to prevent recreation
const VARIANT_STYLES = {
  default: "bg-background border-2 border-transparent", // Removed gradient - using inline style
  glass: "glass border-primary/30",
  solid: "bg-card border border-border",
}

interface GradientCardProps {
  children: ReactNode
  variant?: "default" | "glass" | "solid"
  hoverEffect?: boolean
  className?: string
}

/**
 * Card component with gradient backgrounds and hover effects
 * Supports 3 variants: default (gradient), glass (glassmorphism), solid (standard)
 *
 * @example
 * <GradientCard variant="default" hoverEffect>
 *   <h3>Feature Title</h3>
 *   <p>Description</p>
 * </GradientCard>
 */
export function GradientCard({
  children,
  variant = "default",
  hoverEffect = true,
  className,
}: GradientCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative rounded-lg p-6 transition-shadow duration-300", // Added 'group' class
        VARIANT_STYLES[variant],
        hoverEffect && "hover:shadow-2xl hover:shadow-primary/20",
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02, y: -8 } : undefined} // Consolidated transforms
      style={{
        background: variant === "default"
          ? "linear-gradient(135deg, rgba(250, 111, 98, 0.1) 0%, rgba(255, 107, 157, 0.1) 100%)"
          : undefined,
      }}
    >
      {/* Animated gradient border effect */}
      {variant === "default" && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-pink to-primary-dark opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
