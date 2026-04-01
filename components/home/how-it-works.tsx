"use client"

import { motion, Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const steps = [
  {
    number: 1,
    title: "Create Your Page",
    description:
      "Pick a template, add your links, products, and content blocks. Your page is live in minutes.",
  },
  {
    number: 2,
    title: "Set Up Your Store",
    description:
      "Add digital products, services, or affiliate links to start earning from day one.",
  },
  {
    number: 3,
    title: "Grow & Monetize",
    description:
      "Track analytics, capture leads, and land brand partnerships as your audience grows.",
  },
]

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="How It Works"
          headline="Launch in"
          headlineHighlight="3 Minutes"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Vertical connecting line */}
          <div className="absolute bottom-8 left-5 top-8 w-px bg-border sm:left-6" />

          <div className="space-y-8">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="relative flex gap-5 sm:gap-6"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 sm:h-12 sm:w-12 sm:text-base">
                  {step.number}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-heading text-lg font-bold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
