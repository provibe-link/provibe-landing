"use client"

import { useEffect, useState, useRef, RefObject } from "react"
import { useInView } from "framer-motion"

/**
 * Hook for magnetic button effect (cursor follows on hover)
 * @returns Ref and transform values for magnetic effect
 */
export function useMagneticButton<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Limit magnetic effect to 20px
      const distance = Math.sqrt(x * x + y * y)

      // Prevent division by zero when cursor is at element center
      if (distance === 0) {
        setPosition({ x: 0, y: 0 })
        return
      }

      const maxDistance = 80
      const strength = Math.min(distance / maxDistance, 1)

      setPosition({
        x: (x / distance) * strength * 20,
        y: (y / distance) * strength * 20,
      })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return { ref, x: position.x, y: position.y }
}

/**
 * Hook for animated counter that counts from 0 to target
 * @param target - Target number to count to
 * @param duration - Animation duration in milliseconds
 * @param ref - Element reference to trigger animation on scroll
 * @returns Current count value
 */
export function useCountUp(
  target: number,
  duration = 2000,
  ref?: RefObject<HTMLElement>
) {
  const [count, setCount] = useState(0)
  const isInView = ref ? useInView(ref, { once: true, amount: 0.5 }) : true

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function (easeOutExpo)
      const easeOutExpo = (t: number) =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

      setCount(Math.floor(target * easeOutExpo(progress)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, isInView])

  return count
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns Boolean indicating reduced motion preference
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook for gradient rotation animation
 * @param duration - Rotation duration in seconds
 * @returns Current rotation angle in degrees
 */
export function useGradientRotation(duration = 10) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = (elapsed / (duration * 1000)) % 1
      const newRotation = progress * 360

      // Only update if changed by at least 1 degree to reduce re-renders
      setRotation(prev => {
        const diff = Math.abs(newRotation - prev)
        return diff > 1 ? newRotation : prev
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [duration])

  return rotation
}
