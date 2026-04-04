"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
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
  {
    size: 250,
    color: "rgba(255, 107, 157, 0.25)",
    x: "75%",
    y: "15%",
    delay: 1,
  },
  { size: 200, color: "rgba(250, 111, 98, 0.2)", x: "60%", y: "70%", delay: 2 },
  {
    size: 350,
    color: "rgba(255, 133, 179, 0.15)",
    x: "25%",
    y: "75%",
    delay: 0.5,
  },
  {
    size: 180,
    color: "rgba(229, 85, 72, 0.2)",
    x: "85%",
    y: "55%",
    delay: 1.5,
  },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const t = useTranslations("hero")

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
      className="relative min-h-[200vh] pt-8 pb-16 sm:pt-12"
    >
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: rm ? 0 : bgY }}>
          {orbs.map((orb, i) => (
            <div
              key={i}
              className="animate-float absolute rounded-full"
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
        <div className="bg-pink/6 absolute top-20 right-0 h-[400px] w-[500px] rounded-full blur-[120px]" />
      </div>

      <GrainOverlay className="-z-10" />

      {/* Sticky wrapper — keeps everything in viewport while scrolling */}
      <div
        className="sticky top-16 overflow-x-clip"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {/* Text layer — stays in place, fades out on scroll, z-10 (behind phone) */}
        <motion.div
          style={{
            opacity: rm ? 1 : textOpacity,
            scale: rm ? 1 : textScale,
            y: rm ? 0 : textY,
          }}
          className="relative z-10 container mx-auto max-w-5xl px-6 pt-8 sm:pt-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            {/* Badge */}
            <motion.div
              variants={scaleVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5 text-xs font-medium text-secondary-foreground backdrop-blur-sm transition-colors hover:bg-secondary/60"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {t("badge")}
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-5xl lg:text-6xl">
              <motion.span variants={wordVariants} className="block">
                {t("headlineLine1")}
              </motion.span>
              <motion.span variants={wordVariants} className="block">
                <span className="gradient-text">{t("headlineLine2")}</span>
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="lg:text-md mx-auto mb-8 max-w-lg text-base text-muted-foreground sm:text-lg"
            >
              {t("subheadline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="group h-12 bg-primary px-8 text-base text-white hover:bg-primary/90"
                onClick={() => setWaitlistOpen(true)}
              >
                {t("joinWaitlist")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("seeFeatures")}
              </Button>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Phone + Cards layer — z-30 so it scrolls OVER the text */}
        <motion.div
          style={{ y: rm ? 0 : phoneAreaY }}
          className="absolute inset-x-0 top-[55%] z-30"
        >
          <div className="relative min-h-[800px]">
            {/* Cards — z-20, visible alongside phone */}
            <div className="relative z-20">
              <FloatingCards scrollProgress={scrollYProgress} />
            </div>
            {/* Phone — z-30, in front of cards so cards emerge from behind */}
            <div className="absolute inset-x-0 top-0 z-30 flex origin-top scale-[0.85] justify-center sm:scale-100">
              <PhoneMockup />
            </div>
          </div>
        </motion.div>
      </div>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  )
}
