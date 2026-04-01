"use client"

import { useEffect, useState, RefObject } from "react"
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
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return offsetY
}

/**
 * Hook to get scroll progress as percentage (0-1)
 * @returns Scroll progress from 0 to 1
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY / totalHeight
      setProgress(Math.min(Math.max(currentProgress, 0), 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}

/**
 * Hook to detect scroll direction
 * @param threshold - Minimum scroll distance to detect direction
 * @returns "up" | "down" | null
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<
    "up" | "down" | null
  >(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        return
      }

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, threshold])

  return scrollDirection
}
