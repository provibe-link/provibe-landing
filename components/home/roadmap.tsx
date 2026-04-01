"use client"

import { motion, Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const phases = [
  {
    badge: "JULY 2026",
    badgeStyle: "bg-primary text-white",
    title: "Creator Platform Launch",
    description:
      "Bio links, digital store, analytics, lead capture, and monetization tools — everything you need to build your creator business.",
    highlighted: true,
    opacity: 1,
  },
  {
    badge: "COMING SOON",
    badgeStyle: "bg-muted text-muted-foreground",
    title: "Brand Marketplace",
    description:
      "Creator-brand matching, campaign management, collaboration tools, and performance tracking.",
    highlighted: false,
    opacity: 0.7,
  },
  {
    badge: "2027",
    badgeStyle: "bg-muted text-muted-foreground",
    title: "AI Growth Engine",
    description:
      "Smart scheduling, AI content assistant, creator matching engine, and predictive analytics.",
    highlighted: false,
    opacity: 0.5,
  },
]

export function Roadmap() {
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
    <section id="roadmap" className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="Roadmap"
          headline="What's"
          headlineHighlight="Coming Next"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4"
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              className={`rounded-xl border p-6 transition-colors ${
                phase.highlighted
                  ? "border-primary bg-primary/[0.06]"
                  : "border-border bg-card"
              }`}
              style={{ opacity: phase.opacity }}
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${phase.badgeStyle}`}
              >
                {phase.badge}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
