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

export function StatsCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLElement>(null)
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
