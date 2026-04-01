"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainOverlay } from "@/components/shared/grain-overlay"

const creators = [
  "PS", "AK", "MJ", "SR", "TW", "LN", "DC", "RV",
  "KP", "JH", "NB", "EF", "GC", "YM", "QZ", "OD",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
}

export function CreatorsHero() {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <GrainOverlay className="-z-10" />

      <div className="container relative mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-mono text-sm font-medium uppercase tracking-widest text-primary"
        >
          For Creators
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Built for Creators{" "}
          <span className="gradient-text">Like You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Your brand deserves more than a generic link-in-bio. Create a stunning presence, get discovered by brands, and join a thriving creator community.
        </motion.p>

        {/* Creator Avatar Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-3"
        >
          {creators.map((initials, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-pink/80 text-xs font-bold text-white"
            >
              {initials}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="mt-10"
        >
          <Button
            size="lg"
            className="group h-14 px-8 text-lg bg-gradient-to-r from-primary to-pink text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
          >
            Start Your Page Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
