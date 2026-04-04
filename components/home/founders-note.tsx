"use client"

import { motion, Variants } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

export function FoundersNote() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("foundersNote")

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
        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-2xl border border-border bg-card p-8 sm:p-10 md:p-12"
        >
          {/* Subtle warm glow behind the card */}
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-40 blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(250, 111, 98, 0.15), transparent 70%)",
            }}
          />

          {/* Eyebrow */}
          <motion.p
            variants={prefersReducedMotion ? cardReduced : cardFadeUp}
            className="mb-8 font-mono text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t("eyebrow")}
          </motion.p>

          {/* Content */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
            {/* Avatar */}
            <motion.div
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              className="shrink-0"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
                {/* Gradient avatar placeholder — replace with real photo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #fa6f62 0%, #ff8a7a 40%, #e55548 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white sm:text-3xl">
                  {t("initials")}
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <div className="flex-1">
              <motion.blockquote
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                <p className="mb-4">{t("messageLine1")}</p>
                <p className="mb-4">{t("messageLine2")}</p>
                <p>{t("messageLine3")}</p>
              </motion.blockquote>

              {/* Signature */}
              <motion.div
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="mt-8 flex items-center gap-4"
              >
                <div>
                  <p className="font-heading text-base font-bold">
                    {t("name")}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("role")}</p>
                </div>

                <a
                  href={t("socialUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {t("socialHandle")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
