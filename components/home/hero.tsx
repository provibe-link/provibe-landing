"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/lib/animations/hooks"
import { useParallax } from "@/lib/animations/scroll-animations"
import { GrainOverlay } from "@/components/shared/grain-overlay"

const headlineWords = ["Create.", "Connect.", "Grow."]

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
}

// Floating orb positions and colors
const orbs = [
  { size: 300, color: "rgba(250, 111, 98, 0.3)", x: "15%", y: "20%", delay: 0 },
  { size: 250, color: "rgba(255, 107, 157, 0.25)", x: "75%", y: "15%", delay: 1 },
  { size: 200, color: "rgba(250, 111, 98, 0.2)", x: "60%", y: "70%", delay: 2 },
  { size: 350, color: "rgba(255, 133, 179, 0.15)", x: "25%", y: "75%", delay: 0.5 },
  { size: 180, color: "rgba(229, 85, 72, 0.2)", x: "85%", y: "55%", delay: 1.5 },
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const parallaxY = useParallax(0.3)

  return (
    <section className="relative flex min-h-[600px] max-h-[900px] h-screen items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: prefersReducedMotion ? "none" : `translateY(${parallaxY * 0.5}px)` }}
      >
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              left: orb.x,
              top: orb.y,
              filter: "blur(80px)",
              animationDelay: `${orb.delay}s`,
              animationDuration: `${6 + i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Grain Texture Overlay */}
      <GrainOverlay className="-z-10" />

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  background: i === 1
                    ? "linear-gradient(135deg, var(--primary) 0%, var(--pink) 100%)"
                    : undefined,
                  WebkitBackgroundClip: i === 1 ? "text" : undefined,
                  WebkitTextFillColor: i === 1 ? "transparent" : undefined,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl"
          >
            Join <span className="font-semibold text-foreground">10K+</span> creators building their brand
            and connecting with opportunities
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={scaleVariants}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group relative h-14 px-8 text-lg bg-gradient-to-r from-primary to-pink text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow animate-glow-pulse"
            >
              Start Creating Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-8 text-sm text-muted-foreground"
          >
            No credit card required • Free forever • Setup in 30 seconds
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
