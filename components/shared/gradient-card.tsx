"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: ReactNode
  variant?: "default" | "glass" | "solid"
  hoverEffect?: boolean
  className?: string
}

export function GradientCard({
  children,
  variant = "default",
  hoverEffect = true,
  className,
}: GradientCardProps) {
  const variantStyles = {
    default: "bg-background border-2 border-transparent bg-gradient-to-br from-primary/20 via-transparent to-pink/20",
    glass: "glass border-primary/30",
    solid: "bg-card border border-border",
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-lg p-6 transition-all duration-300",
        variantStyles[variant],
        hoverEffect && "hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20",
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
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
