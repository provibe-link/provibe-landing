"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { useReducedMotion } from "@/lib/animations/hooks"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const staggerReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
}

export function CTA() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-primary" />

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full animate-float opacity-20 bg-white/30"
          style={{ filter: "blur(40px)" }}
        />
        <div
          className="absolute right-[15%] bottom-[15%] h-48 w-48 rounded-full animate-float opacity-15 bg-white/40"
          style={{ filter: "blur(30px)", animationDelay: "2s" }}
        />
        <div
          className="absolute left-[50%] top-[10%] h-32 w-32 rounded-full animate-float opacity-10 bg-white/50"
          style={{ filter: "blur(20px)", animationDelay: "4s" }}
        />
      </div>

      {/* Grain Overlay */}
      <GrainOverlay opacity={0.05} />

      {/* Content */}
      <div className="container relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          variants={prefersReducedMotion ? staggerReduced : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Start Building Your Creator{" "}
            <span className="underline decoration-white/40 underline-offset-4 decoration-2">Blueprint</span>{" "}
            Today
          </motion.h2>

          <motion.p
            variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-white/80 sm:text-xl"
          >
            Join thousands of creators already growing with ProVibe. Free to start, no credit card required.
          </motion.p>

          <motion.div variants={prefersReducedMotion ? fadeUpReduced : fadeUp} className="mt-10">
            <Button
              size="lg"
              className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90 transition-all"
            >
              Create Your Page
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.p
            variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
            className="mt-6 text-sm text-white/60"
          >
            Free to start • No credit card required • Setup in 30 seconds
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
