"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
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
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const t = useTranslations("cta")

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          variants={prefersReducedMotion ? staggerReduced : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-16 md:py-24"
          style={{
            background:
              "linear-gradient(135deg, hsl(25, 40%, 20%) 0%, hsl(20, 50%, 25%) 30%, hsl(15, 45%, 30%) 60%, hsl(30, 35%, 22%) 100%)",
          }}
        >
          {/* Subtle glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, hsl(20, 60%, 40%) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <motion.h2
              variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {t("headline")}
              <br />
              <span className="text-primary">{t("headlineHighlight")}</span>{" "}
              Today
            </motion.h2>

            <motion.p
              variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
              className="mx-auto mt-6 max-w-lg text-base text-white/60 sm:text-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
              className="mt-10"
            >
              <Button
                size="lg"
                className="group h-14 px-10 text-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all rounded-full shadow-lg shadow-primary/25"
                onClick={() => setWaitlistOpen(true)}
              >
                {t("button")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  )
}
