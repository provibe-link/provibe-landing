"use client"

import { motion, Variants } from "framer-motion"
import {
  Link2,
  ShoppingCart,
  Mail,
  BarChart3,
  FileSpreadsheet,
  ArrowRight,
  Zap,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

export function ProblemStatement() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("problemStatement")

  const tools = [
    { icon: Link2, label: t("tool1") },
    { icon: ShoppingCart, label: t("tool2") },
    { icon: Mail, label: t("tool3") },
    { icon: BarChart3, label: t("tool4") },
    { icon: FileSpreadsheet, label: t("tool5") },
  ]

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  const toolVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
          description={t("description")}
        />

        {/* Scattered tools → converge into ProVibe */}
        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12"
        >
          {/* Tool pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.label}
                variants={prefersReducedMotion ? cardReduced : toolVariant}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground sm:px-5 sm:py-3"
              >
                <tool.icon className="h-4 w-4 shrink-0 opacity-60" />
                <span className="whitespace-nowrap font-medium">
                  {tool.label}
                </span>
                {i < tools.length - 1 && (
                  <span className="ml-1 hidden text-xs text-muted-foreground/40 sm:inline">
                    +
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Arrow down to ProVibe */}
          <motion.div
            variants={prefersReducedMotion ? cardReduced : cardFadeUp}
            className="my-8 flex flex-col items-center gap-2"
          >
            <div className="h-10 w-px bg-gradient-to-b from-border to-primary/60" />
            <ArrowRight className="h-5 w-5 rotate-90 text-primary" />
          </motion.div>

          {/* ProVibe unified */}
          <motion.div
            variants={prefersReducedMotion ? cardReduced : cardFadeUp}
            className="mx-auto max-w-md rounded-2xl border border-primary/30 bg-primary/[0.06] p-6 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-heading text-lg font-bold">
              {t("solutionTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("solutionDesc")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
