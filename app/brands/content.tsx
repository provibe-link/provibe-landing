"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  Search,
  ClipboardList,
  TrendingUp,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

export function BrandsContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("brands")

  const brandFeatures = [
    {
      icon: Search,
      title: t("creatorDiscovery"),
      description: t("creatorDiscoveryDesc"),
    },
    {
      icon: ClipboardList,
      title: t("campaignManager"),
      description: t("campaignManagerDesc"),
    },
    {
      icon: TrendingUp,
      title: t("roiAnalytics"),
      description: t("roiAnalyticsDesc"),
    },
    {
      icon: MessageCircle,
      title: t("directMessaging"),
      description: t("directMessagingDesc"),
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
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 h-[500px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute right-0 top-20 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <GrainOverlay className="-z-10" />

        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              {t("badge")}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("headline")}{" "}
              <span className="gradient-text">{t("headlineHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("subheadline")}
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
                onClick={() => setWaitlistOpen(true)}
              >
                {t("getNotified")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <SectionHeader
            eyebrow={t("brandToolsEyebrow")}
            headline={t("forBrandsHeadline")}
            headlineHighlight={t("forBrandsHighlight")}
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {brandFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary" />
        <GrainOverlay opacity={0.05} />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {t("ctaHeadline")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90"
                onClick={() => setWaitlistOpen(true)}
              >
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  )
}
