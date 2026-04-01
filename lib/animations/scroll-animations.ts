"use client"

import { useEffect, useState, useRef, RefObject } from "react"
import { useInView } from "framer-motion"

/**
 * Hook to trigger animations when element scrolls into view
 * @param ref - Element reference to observe
 * @param threshold - Percentage of element visibility to trigger (0-1)
 * @returns Boolean indicating if element is in view
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  threshold = 0.2
) {
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  })

  return isInView
}

/**
 * Hook for parallax effect based on scroll position
 * @param speed - Parallax speed multiplier (0.5 = half speed, 2 = double speed)
 * @returns Y transform value
 */
export function useParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY * speed : 0
  )

  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY
        rafId = requestAnimationFrame(() => {
          setOffsetY(currentScrollY * speed)
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return offsetY
}

/**
 * Hook to get scroll progress as percentage (0-1)
 * @returns Scroll progress from 0 to 1
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(() =>
    typeof window !== 'undefined' ? 0 : 0
  )

  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY
        rafId = requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight
          const currentProgress = totalHeight > 0 ? currentScrollY / totalHeight : 0
          setProgress(Math.min(Math.max(currentProgress, 0), 1))
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}

/**
 * Hook to detect scroll direction
 * @param threshold - Minimum scroll distance to detect direction
 * @returns "up" | "down" | null
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollYRef.current) < threshold) {
        return
      }

      if (currentScrollY > lastScrollYRef.current) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrollDirection
}
