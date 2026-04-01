# ProVibe Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade marketing website for ProVibe with energetic animations, responsive design, and full accessibility.

**Architecture:** Hybrid approach - establish core design system (typography, colors, animation library, base components), build homepage to validate patterns, then implement remaining pages (creators, brands, blogs, about, contact) using refined system.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, shadcn/ui, Lucide Icons, next-themes

---

## File Structure

### New Files to Create

**Animation Library:**
- `lib/animations/variants.ts` - Framer Motion variant presets
- `lib/animations/scroll-animations.ts` - Scroll animation hooks
- `lib/animations/hooks.ts` - Utility animation hooks
- `lib/animations/page-transitions.ts` - Route transition configs

**Shared Components:**
- `components/shared/animated-section.tsx` - Scroll-triggered wrapper
- `components/shared/gradient-card.tsx` - Animated gradient card
- `components/shared/stats-counter.tsx` - Animated number counter
- `components/shared/theme-switcher.tsx` - Light/dark theme toggle
- `components/shared/creator-card.tsx` - Creator profile card

**Layout Components:**
- `components/layout/navbar.tsx` - Main navigation
- `components/layout/footer.tsx` - Site footer

**Homepage Sections:**
- `components/home/hero.tsx`
- `components/home/problem-solution.tsx`
- `components/home/features.tsx`
- `components/home/brand-scroller.tsx`
- `components/home/how-it-works.tsx`
- `components/home/success-stories.tsx`
- `components/home/testimonials.tsx`
- `components/home/faq.tsx`
- `components/home/cta.tsx`

**Pages:**
- `app/page.tsx` - Homepage (modify)
- `app/creators/page.tsx`
- `app/brands/page.tsx`
- `app/blogs/page.tsx`
- `app/blogs/[slug]/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`

### Files to Modify

- `app/layout.tsx` - Add Google Fonts, update theme provider
- `app/globals.css` - Add color variables, animation keyframes
- `package.json` - Add framer-motion dependency

---

## Phase 1: Core System Setup

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install framer-motion**

```bash
pnpm add framer-motion
```

Expected: Package installed successfully

- [ ] **Step 2: Verify installation**

```bash
pnpm list framer-motion
```

Expected: Shows framer-motion version

- [ ] **Step 3: Commit dependency**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add framer-motion for animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 2: Setup Typography System

**Files:**
- Modify: `app/layout.tsx:1-31`

- [ ] **Step 1: Update layout.tsx with Google Fonts**

Replace the entire file with:

```typescript
import { Space_Grotesk, Outfit, DM_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "600", "500"],
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "600", "500"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
  display: "swap",
})

export const metadata = {
  title: "ProVibe - Create. Connect. Grow.",
  description: "Join 10K+ creators building their brand and connecting with opportunities",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        spaceGrotesk.variable,
        outfit.variable,
        dmSans.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Test font loading**

```bash
pnpm dev
```

Open http://localhost:3000 and inspect `<html>` element - should see font CSS variables

- [ ] **Step 3: Commit typography setup**

```bash
git add app/layout.tsx
git commit -m "feat: setup typography system with Google Fonts

Add Space Grotesk (display), Outfit (headings), DM Sans (body), JetBrains Mono (accent)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 3: Extend Color System in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add ProVibe color variables to :root and .dark**

After line 83 (after existing :root definition), add:

```css
:root {
  /* ... existing variables ... */
  
  /* ProVibe Orange-Pink Palette */
  --primary: #fa6f62;
  --primary-light: #ff8a7a;
  --primary-dark: #e55548;
  --pink: #ff6b9d;
  --pink-light: #ff85b3;
  --pink-dark: #e5507c;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #fa6f62 0%, #ff6b9d 100%);
  --gradient-vibrant: linear-gradient(135deg, #ff8a7a 0%, #fa6f62 50%, #ff6b9d 100%);
  --gradient-subtle: linear-gradient(135deg, #fa6f62 0%, #ff85b3 100%);
}

.dark {
  /* ... existing dark theme variables ... */
  
  /* Ensure primary colors work in dark theme */
  --primary: #fa6f62;
  --primary-light: #ff8a7a;
  --primary-dark: #e55548;
  --pink: #ff6b9d;
  --pink-light: #ff85b3;
  --pink-dark: #e5507c;
}
```

- [ ] **Step 2: Add animation keyframes after line 189 (after existing utilities)**

```css
@layer utilities {
  /* ... existing utilities ... */
  
  /* ProVibe Custom Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  @keyframes slide-in-stagger {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      opacity: 1;
      filter: brightness(1);
    }
    50% {
      opacity: 0.8;
      filter: brightness(1.2);
    }
  }
  
  @keyframes rotate-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes gradient-shift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  /* Utility Classes */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 8s linear infinite;
  }
  
  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }
  
  .animate-gradient {
    animation: gradient-shift 3s ease infinite;
    background-size: 200% 200%;
  }
  
  /* Gradient Text */
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* Glass Morphism */
  .glass {
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-strong {
    backdrop-filter: blur(24px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
```

- [ ] **Step 3: Test CSS updates**

```bash
pnpm dev
```

Inspect browser console - no CSS errors should appear

- [ ] **Step 4: Commit color system**

```bash
git add app/globals.css
git commit -m "feat: add ProVibe color system and animation keyframes

Add orange-pink palette, gradient definitions, and custom animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 4: Create Animation Variants Library

**Files:**
- Create: `lib/animations/variants.ts`

- [ ] **Step 1: Create animations directory**

```bash
mkdir -p lib/animations
```

- [ ] **Step 2: Create variants.ts with Framer Motion presets**

```typescript
import { Variants } from "framer-motion"

// Fade Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Slide Variants
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Scale Variant
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger Item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Configurable Factory Functions
export const createFadeUp = (duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

export const createSlide = (
  direction: "left" | "right" | "up" | "down",
  duration = 0.6,
  delay = 0
): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const value =
    direction === "left" || direction === "up" ? -50 : 50

  return {
    hidden: { opacity: 0, [axis]: value },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
}

export const createScale = (
  initialScale = 0.8,
  duration = 0.5,
  delay = 0
): Variants => ({
  hidden: { opacity: 0, scale: initialScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

// Staggered Word Animation (for hero headline)
export const wordStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const wordItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Bounce Scale (for CTA buttons)
export const bounceScale: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.6,
    },
  },
}
```

- [ ] **Step 3: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 4: Commit animation variants**

```bash
git add lib/animations/variants.ts
git commit -m "feat: create animation variants library

Add Framer Motion preset variants and factory functions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 5: Create Scroll Animation Hooks

**Files:**
- Create: `lib/animations/scroll-animations.ts`

- [ ] **Step 1: Create scroll-animations.ts with custom hooks**

```typescript
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
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit scroll animation hooks**

```bash
git add lib/animations/scroll-animations.ts
git commit -m "feat: create scroll animation hooks

Add useScrollAnimation, useParallax, useScrollProgress, useScrollDirection

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 6: Create Animation Utility Hooks

**Files:**
- Create: `lib/animations/hooks.ts`

- [ ] **Step 1: Create hooks.ts with utility animation hooks**

```typescript
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
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

      setRotation(progress * 360)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [duration])

  return rotation
}
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit utility hooks**

```bash
git add lib/animations/hooks.ts
git commit -m "feat: create animation utility hooks

Add useMagneticButton, useCountUp, useReducedMotion, useGradientRotation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 7: Create Page Transition Configurations

**Files:**
- Create: `lib/animations/page-transitions.ts`

- [ ] **Step 1: Create page-transitions.ts**

```typescript
import { Variants } from "framer-motion"

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const pageTransition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.3,
}

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit page transitions**

```bash
git add lib/animations/page-transitions.ts
git commit -m "feat: create page transition configurations

Add variants for smooth route changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 8: Create AnimatedSection Component

**Files:**
- Create: `components/shared/animated-section.tsx`

- [ ] **Step 1: Create shared directory**

```bash
mkdir -p components/shared
```

- [ ] **Step 2: Create animated-section.tsx**

```typescript
"use client"

import { motion, useInView } from "framer-motion"
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
  customVariants?: any
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
  const variantMap = {
    "fade-up": fadeUp,
    "slide-left": slideLeft,
    "slide-right": slideRight,
    scale: scale,
    custom: customVariants || fadeUp,
  }

  const selectedVariant = variantMap[variant]

  // If user prefers reduced motion, just fade in
  const variants = prefersReducedMotion
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
```

- [ ] **Step 3: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 4: Commit AnimatedSection component**

```bash
git add components/shared/animated-section.tsx
git commit -m "feat: create AnimatedSection wrapper component

Wraps children with scroll-triggered animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 9: Create GradientCard Component

**Files:**
- Create: `components/shared/gradient-card.tsx`

- [ ] **Step 1: Create gradient-card.tsx**

```typescript
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
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit GradientCard component**

```bash
git add components/shared/gradient-card.tsx
git commit -m "feat: create GradientCard component

Animated card with gradient borders and hover effects

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 10: Create StatsCounter Component

**Files:**
- Create: `components/shared/stats-counter.tsx`

- [ ] **Step 1: Create stats-counter.tsx**

```typescript
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
  const ref = useRef<HTMLSpanElement>(null)
  const count = useCountUp(value, duration, ref)

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
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit StatsCounter component**

```bash
git add components/shared/stats-counter.tsx
git commit -m "feat: create StatsCounter component

Animated number counter triggered on scroll

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 11: Create ThemeSwitcher Component

**Files:**
- Create: `components/shared/theme-switcher.tsx`

- [ ] **Step 1: Create theme-switcher.tsx**

```typescript
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  variant?: "icon" | "toggle" | "dropdown"
  className?: string
}

export function ThemeSwitcher({
  variant = "icon",
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn("relative h-9 w-9", className)}
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    )
  }

  // Add toggle and dropdown variants if needed in the future
  return null
}
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Test theme switcher in browser**

```bash
pnpm dev
```

Import and use in a test page, verify icon animates and theme switches

- [ ] **Step 4: Commit ThemeSwitcher component**

```bash
git add components/shared/theme-switcher.tsx
git commit -m "feat: create ThemeSwitcher component

Toggle between light and dark themes with animated icon

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 12: Create CreatorCard Component

**Files:**
- Create: `components/shared/creator-card.tsx`

- [ ] **Step 1: Create creator-card.tsx**

```typescript
"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GradientCard } from "./gradient-card"

interface CreatorCardProps {
  name: string
  niche: string
  avatar: string
  stats: { followers: number; engagement: number }
  featured?: boolean
  className?: string
}

export function CreatorCard({
  name,
  niche,
  avatar,
  stats,
  featured = false,
  className,
}: CreatorCardProps) {
  return (
    <GradientCard
      variant={featured ? "glass" : "default"}
      className={cn("group cursor-pointer", className)}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Avatar */}
        <div className="relative">
          <motion.div
            className="relative h-24 w-24 overflow-hidden rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {featured && (
            <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-primary to-pink px-2 py-1 text-xs font-bold text-white">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{niche}</p>
        </div>

        {/* Stats */}
        <div className="flex w-full justify-around border-t border-border pt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" />
              {stats.followers >= 1000
                ? `${(stats.followers / 1000).toFixed(1)}K`
                : stats.followers}
            </div>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-pink" />
              {stats.engagement}%
            </div>
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
        </div>
      </div>
    </GradientCard>
  )
}
```

- [ ] **Step 2: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 3: Commit CreatorCard component**

```bash
git add components/shared/creator-card.tsx
git commit -m "feat: create CreatorCard component

Display creator profile with stats and hover effects

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 13: Create Navbar Component

**Files:**
- Create: `components/layout/navbar.tsx`

- [ ] **Step 1: Create layout directory**

```bash
mkdir -p components/layout
```

- [ ] **Step 2: Create navbar.tsx**

```typescript
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/shared/theme-switcher"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/creators", label: "Creators" },
  { href: "/brands", label: "Brands" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            ProVibe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-pink"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeSwitcher />
            <Button
              className="bg-gradient-to-r from-primary to-pink text-white hover:opacity-90"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background/95 backdrop-blur-md px-6 pb-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex items-center gap-4 pt-4">
                  <ThemeSwitcher />
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-pink text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
```

- [ ] **Step 3: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 4: Commit Navbar component**

```bash
git add components/layout/navbar.tsx
git commit -m "feat: create Navbar component

Responsive navigation with scroll effects and mobile menu

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 14: Create Footer Component

**Files:**
- Create: `components/layout/footer.tsx`

- [ ] **Step 1: Create footer.tsx**

```typescript
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Creators", href: "/creators" },
    { label: "Brands", href: "/brands" },
    { label: "Pricing", href: "#pricing" },
  ],
  resources: [
    { label: "Blog", href: "/blogs" },
    { label: "Help Center", href: "#help" },
    { label: "Events", href: "#events" },
    { label: "Community", href: "#community" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Contact", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">ProVibe</h3>
            <p className="text-sm text-muted-foreground">
              Empowering creators to build their brand and connect with opportunities.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div>
              <h4 className="font-semibold">Subscribe to our newsletter</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest creator tips and platform updates
              </p>
            </div>
            
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-primary to-pink text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ProVibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Input component if not exists**

```bash
npx shadcn@latest add input
```

Expected: Input component installed

- [ ] **Step 3: Test TypeScript compilation**

```bash
pnpm typecheck
```

Expected: No errors

- [ ] **Step 4: Commit Footer component**

```bash
git add components/layout/footer.tsx
git commit -m "feat: create Footer component

4-column footer with newsletter signup and social links

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Task 15: Update Root Layout with Navbar and Footer

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import Navbar and Footer in layout.tsx**

Add after imports:

```typescript
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
```

- [ ] **Step 2: Update body to include Navbar and Footer**

Replace the body content:

```typescript
<body className="font-body">
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange={false}
  >
    <Navbar />
    <main className="min-h-screen pt-16">{children}</main>
    <Footer />
  </ThemeProvider>
</body>
```

- [ ] **Step 3: Test layout in browser**

```bash
pnpm dev
```

Navigate to http://localhost:3000, verify navbar and footer appear

- [ ] **Step 4: Commit layout update**

```bash
git add app/layout.tsx
git commit -m "feat: add Navbar and Footer to root layout

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: Homepage Implementation (Structured Outline)

**Objective:** Build complete homepage with all 9 sections using established system

### Task 16-24: Homepage Sections (9 components)

Each homepage section follows this pattern:

**Task 16: Hero Section**
- Create `components/home/hero.tsx`
- Full viewport height with gradient background orbs
- Staggered text animation for headline
- Primary + Secondary CTAs with magnetic effect
- Parallax background on scroll

**Task 17: Problem/Solution Section**
- Create `components/home/problem-solution.tsx`
- Two-column layout (responsive)
- Animated icons that rotate on scroll
- Gradient divider between columns

**Task 18: Features Section**
- Create `components/home/features.tsx`
- 3-column grid using GradientCard
- Staggered animation (left → center → right)
- Icons: Portfolio, Handshake, Calendar

**Task 19: Brand Scroller Section**
- Create `components/home/brand-scroller.tsx`
- Infinite horizontal scroll (CSS transform)
- Two rows moving in opposite directions
- Grayscale logos with color on hover

**Task 20: How It Works Section**
- Create `components/home/how-it-works.tsx`
- Vertical timeline with 4 steps
- Animated connecting line (draws on scroll)
- Icons bounce when revealed

**Task 21: Success Stories Section**
- Create `components/home/success-stories.tsx`
- 2-column grid with creator cards
- Before/after stats, quotes
- Glass morphism styling

**Task 22: Testimonials Section**
- Create `components/home/testimonials.tsx`
- Add shadcn Carousel component
- 3 visible desktop, 1 mobile
- Auto-play with pause on hover

**Task 23: FAQ Section**
- Create `components/home/faq.tsx`
- Add shadcn Accordion component
- 6-8 questions with answers
- Gradient accent on open item

**Task 24: Final CTA Section**
- Create `components/home/cta.tsx`
- Full-width gradient background
- Floating orbs animation
- Pulse effect on CTA button

### Task 25: Compose Homepage

**Files:**
- Modify: `app/page.tsx`

- Import all 9 homepage sections
- Compose in order with proper spacing
- Add section spacing utility (120px desktop, 80px tablet, 60px mobile)
- Test scroll animations trigger correctly
- Verify responsive behavior

### Task 26: Homepage Performance Optimization

- Lazy load below-fold sections (Success Stories, Testimonials, FAQ, CTA)
- Add placeholder images for brand logos
- Test Lighthouse score (target > 90)
- Optimize animation performance

### Task 27: Homepage Accessibility Audit

- Test keyboard navigation
- Verify ARIA labels on all interactive elements
- Check color contrast (WCAG AA)
- Test with screen reader
- Ensure all animations respect prefers-reduced-motion

---

## Phase 3: Refinement (Structured Outline)

**Objective:** Extract patterns from homepage and refine system

### Task 28: Extract Reusable Patterns

- Review homepage components for duplication
- Extract common button patterns (magnetic CTA button)
- Extract section header pattern
- Create utility components if needed

### Task 29: Refine Animation Library

- Review animation usage across homepage
- Add any missing variant combinations
- Document animation timing guidelines
- Create animation performance guide

### Task 30: Component Documentation

- Add JSDoc comments to all shared components
- Document prop interfaces clearly
- Create usage examples (optional)
- Update README with component overview

---

## Phase 4: Additional Pages (Structured Outline)

**Objective:** Build remaining 6 pages using refined system

### Task 31: /creators Page

**Sections:**
1. Hero with creator-focused messaging
2. Value propositions (3-column grid)
3. Feature deep dive with mockups
4. Creator showcase (filterable grid using CreatorCard)
5. Pricing/plans comparison table
6. CTA section

**Implementation:**
- Create `app/creators/page.tsx`
- Reuse: GradientCard, AnimatedSection, CreatorCard, CTA from homepage
- New: Filter component for creator showcase
- Test: Responsive grid, filter functionality

### Task 32: /brands Page

**Sections:**
1. Hero targeting brands
2. Benefits for brands (3-column grid)
3. How it works for brands (step-by-step)
4. Featured creators carousel
5. Case study with stats counters
6. CTA section

**Implementation:**
- Create `app/brands/page.tsx`
- Reuse: GradientCard, StatsCounter, AnimatedSection
- New: Case study component
- Test: Stats animation on scroll

### Task 33: /about Page

**Sections:**
1. Hero with company mission
2. Story (2-column layout)
3. Mission/vision with icons
4. Stats/milestones using StatsCounter
5. Team grid with hover effects
6. CTA section

**Implementation:**
- Create `app/about/page.tsx`
- Reuse: StatsCounter, GradientCard, AnimatedSection
- New: Team member card component
- Test: Team photo hover effects (grayscale → color)

### Task 34: /contact Page

**Layout:**
1. Two-column (form + info)
2. Contact form with validation
3. Contact info sidebar
4. Response time expectations

**Implementation:**
- Create `app/contact/page.tsx`
- Add shadcn Form component
- Add form validation (react-hook-form + zod)
- Add success/error states
- Test: Form submission, validation errors

### Task 35: /blogs Page

**Layout:**
1. Hero/header with search
2. Featured post (large card)
3. Blog grid (3-column)
4. Category filter sidebar
5. Pagination or infinite scroll

**Implementation:**
- Create `app/blogs/page.tsx`
- Create blog card component
- Add search functionality (client-side filter)
- Add category filter
- Mock 10-15 blog posts data
- Test: Search, filters, responsive grid

### Task 36: /blogs/[slug] Page

**Layout:**
1. Hero with featured image
2. Article content (typography hierarchy)
3. Table of contents (sticky sidebar)
4. Author bio card
5. Related posts grid
6. Newsletter signup inline
7. Social share buttons

**Implementation:**
- Create `app/blogs/[slug]/page.tsx`
- Create mock blog post data
- Style article content (H2, H3, blockquotes, images)
- Add table of contents with scroll spy
- Test: Reading experience, responsive layout

---

## Phase 5: Polish & Optimization (Structured Outline)

**Objective:** Final refinements before production

### Task 37: Performance Audit

- Run Lighthouse on all pages
- Optimize images (WebP format, correct sizes)
- Review bundle size (next build analysis)
- Add font preloading for critical fonts
- Test Core Web Vitals (LCP, FID, CLS)
- Target: Lighthouse Performance > 90

### Task 38: Accessibility Audit

- Install axe DevTools
- Run accessibility scan on all pages
- Fix any contrast issues
- Verify all images have alt text
- Test keyboard navigation flow
- Test with screen reader (VoiceOver/NVDA)
- Target: Zero critical accessibility issues

### Task 39: Cross-Browser Testing

- Test on Chrome (desktop + mobile)
- Test on Firefox (desktop)
- Test on Safari (desktop + iOS)
- Test on Edge (desktop)
- Fix any browser-specific issues
- Verify animations work across browsers

### Task 40: Mobile Device Testing

- Test on real iPhone (iOS Safari)
- Test on real Android device (Chrome)
- Test on iPad/tablet
- Verify touch targets are large enough (min 44px)
- Test mobile menu interactions
- Test swipe gestures (carousel, mobile menu)

### Task 41: Animation Polish

- Review animation timings across site
- Adjust easing functions if needed
- Verify all animations respect prefers-reduced-motion
- Test animation performance (60fps target)
- Fine-tune scroll animation thresholds
- Test on lower-end devices

### Task 42: Content Review

- Spell-check all placeholder content
- Review tone consistency
- Verify all CTAs are compelling
- Check grammar and punctuation
- Verify brand name consistency (ProVibe)
- Review meta descriptions for SEO

### Task 43: SEO Optimization

- Add meta tags to all pages (title, description, og:image)
- Create `robots.txt`
- Create `sitemap.xml`
- Add JSON-LD structured data (Organization, WebSite)
- Verify internal linking structure
- Add canonical URLs

### Task 44: Final QA Checklist

Run through manual testing checklist:

**Functional:**
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Theme switcher works
- [ ] All CTAs are clickable
- [ ] Forms validate correctly
- [ ] Carousel/slider controls work
- [ ] Accordion expands/collapses
- [ ] Newsletter signup functional

**Responsive:**
- [ ] All pages work on mobile (375px)
- [ ] All pages work on tablet (768px)
- [ ] All pages work on desktop (1920px)
- [ ] No horizontal scroll
- [ ] Images load at correct sizes

**Animations:**
- [ ] Hero animations play on load
- [ ] Scroll animations trigger correctly
- [ ] Hover effects work (desktop only)
- [ ] Page transitions smooth
- [ ] Reduced motion respected

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Color contrast passes WCAG AA
- [ ] Alt text on all images

**Performance:**
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Fonts load quickly
- [ ] Images optimized

### Task 45: Production Build Test

- [ ] **Step 1: Create production build**

```bash
pnpm build
```

Expected: Build succeeds with no errors

- [ ] **Step 2: Test production build locally**

```bash
pnpm start
```

Navigate through all pages, verify everything works in production mode

- [ ] **Step 3: Run final Lighthouse audit**

Run Lighthouse on production build, verify scores

- [ ] **Step 4: Commit final changes**

```bash
git add .
git commit -m "chore: final polish and optimization

All pages tested and optimized for production

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Execution Summary

**Phase 1 (Detailed):** 15 tasks - Core system setup with animation library and base components
**Phase 2 (Outline):** 12 tasks - Homepage implementation with 9 sections
**Phase 3 (Outline):** 3 tasks - Pattern extraction and refinement
**Phase 4 (Outline):** 6 tasks - Build remaining 6 pages
**Phase 5 (Outline):** 9 tasks - Polish, testing, and optimization

**Total:** 45 tasks across 5 phases

**Estimated Timeline:**
- Phase 1: 4-6 hours (detailed implementation)
- Phase 2: 8-10 hours (homepage with all sections)
- Phase 3: 2-3 hours (refinement)
- Phase 4: 10-12 hours (6 additional pages)
- Phase 5: 4-6 hours (polish and testing)

**Total Estimate:** 28-37 hours for complete implementation

---

## Plan complete and saved to `docs/superpowers/plans/2026-04-01-provibe-marketing-site.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
