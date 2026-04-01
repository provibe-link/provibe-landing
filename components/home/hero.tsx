"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { useReducedMotion } from "@/lib/animations/hooks"
import { PhoneMockup } from "./phone-mockup"
import { FloatingCards } from "./floating-cards"

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      mass: 1.2,
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
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const rm = prefersReducedMotion

  // Text — fades out as phone rises over it
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.4, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.95, 0.9])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  // Phone + cards — starts below text, scrolls UP over text on scroll
  const phoneAreaY = useTransform(scrollYProgress, [0, 0.5], [0, -600])

  // Background orbs — drift down for depth contrast
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 pb-16 min-h-[200vh]"
    >
      {/* Background layer */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{ y: rm ? 0 : bgY }}
        >
          {orbs.map((orb, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: orb.size,
                height: orb.size,
                background: orb.color,
                left: orb.x,
                top: orb.y,
                filter: "blur(80px)",
                animationDelay: `${orb.delay}s`,
                animationDuration: `${6 + i * 1.5}s`,
              }}
            />
          ))}
        </motion.div>

        <div className="absolute -top-40 left-1/4 h-[600px] w-[700px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[500px] rounded-full bg-pink/6 blur-[120px]" />
      </div>

      <GrainOverlay className="-z-10" />

      {/* Sticky wrapper — keeps everything in viewport while scrolling */}
      <div className="sticky top-16 overflow-x-clip" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Text layer — stays in place, fades out on scroll, z-10 (behind phone) */}
        <motion.div
          style={{ 
            opacity: rm ? 1 : textOpacity,
            scale: rm ? 1 : textScale,
            y: rm ? 0 : textY
          }}
          className="relative z-10 container mx-auto max-w-5xl px-6 pt-8 sm:pt-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={scaleVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-secondary-foreground cursor-pointer hover:bg-secondary/60 transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              ProVibe — The Creator Platform
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]">
              <motion.span variants={wordVariants} className="block">
                All you need to
              </motion.span>
              <motion.span variants={wordVariants} className="block">
                <span className="gradient-text">power your</span>
              </motion.span>
              <motion.span variants={wordVariants} className="block">
                creator growth
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mb-8 max-w-lg text-base sm:text-lg lg:text-xl text-muted-foreground"
            >
              Build your creator hub, sell digital products, and connect with
              brands — all in one place.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUpVariants}>
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Phone + Cards layer — z-30 so it scrolls OVER the text */}
        <motion.div
          style={{ y: rm ? 0 : phoneAreaY }}
          className="absolute inset-x-0 top-[75%] z-30"
        >
          <div className="relative min-h-[800px]">
            {/* Cards — z-20, visible alongside phone */}
            <div className="relative z-20">
              <FloatingCards scrollProgress={scrollYProgress} />
            </div>
            {/* Phone — z-30, in front of cards so cards emerge from behind */}
            <div className="absolute inset-x-0 top-0 flex justify-center z-30 scale-[0.85] sm:scale-100 origin-top">
              <PhoneMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
