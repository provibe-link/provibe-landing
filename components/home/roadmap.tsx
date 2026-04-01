"use client"

import { motion, Variants } from "framer-motion"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

export function Roadmap() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("roadmap")

  const phases = [
    {
      badge: t("phase1Badge"),
      badgeStyle: "bg-primary text-white",
      title: t("phase1Title"),
      description: t("phase1Desc"),
      highlighted: true,
      opacity: 1,
    },
    {
      badge: t("phase2Badge"),
      badgeStyle: "bg-muted text-muted-foreground",
      title: t("phase2Title"),
      description: t("phase2Desc"),
      highlighted: false,
      opacity: 0.7,
    },
    {
      badge: t("phase3Badge"),
      badgeStyle: "bg-muted text-muted-foreground",
      title: t("phase3Title"),
      description: t("phase3Desc"),
      highlighted: false,
      opacity: 0.5,
    },
  ]

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
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
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
