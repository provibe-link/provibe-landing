"use client"

import { useRef } from "react"
import { useCountUp } from "@/lib/animations/hooks"
import { cn } from "@/lib/utils"

interface StatsCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/**
 * Animated counter that counts up to a target value on scroll into view
 *
 * @example
 * <StatsCounter value={1000} suffix="+" prefix="$" duration={2000} />
 */
export function StatsCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useCountUp(value, duration, ref as React.RefObject<HTMLElement>)

  return (
    <span
      ref={ref}
      className={cn("font-mono text-4xl font-bold gradient-text", className)}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
