"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: ReactNode
  className?: string
}

/**
 * Clean card component with border and primary hover effect.
 *
 * @example
 * <GradientCard>
 *   <h3>Feature Title</h3>
 *   <p>Description</p>
 * </GradientCard>
 */
export function GradientCard({
  children,
  className,
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary",
        className
      )}
    >
      {children}
    </div>
  )
}
