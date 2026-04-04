"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  Heart,
  Lightbulb,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

export function AboutContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("about")

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ]

  const phases = [
    {
      badge: t("phase1Badge"),
      title: t("phase1Title"),
      description: t("phase1Desc"),
      highlighted: true,
    },
    {
      badge: t("phase2Badge"),
      title: t("phase2Title"),
      description: t("phase2Desc"),
      highlighted: false,
    },
    {
      badge: t("phase3Badge"),
      title: t("phase3Title"),
      description: t("phase3Desc"),
      highlighted: false,
    },
  ]

  const founder = {
    name: t("team1Name"),
    role: t("team1Role"),
    bio: t("team1Bio"),
    initials: t("team1Initials"),
  }

  const values = [
    {
      icon: Heart,
      title: t("value1Title"),
      description: t("value1Desc"),
    },
    {
      icon: Shield,
      title: t("value2Title"),
      description: t("value2Desc"),
    },
    {
      icon: Lightbulb,
      title: t("value3Title"),
      description: t("value3Desc"),
    },
    {
      icon: Users,
      title: t("value4Title"),
      description: t("value4Desc"),
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
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("headlinePart1")}{" "}
              <span className="gradient-text">{t("headlineHighlight")}</span>
              <br />
              {t("headlinePart2")}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("subheadline")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t("missionText")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="rounded-xl border border-primary/15 bg-primary/[0.03] p-6 text-center"
              >
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision / Roadmap */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <SectionHeader
            eyebrow={t("visionEyebrow")}
            headline={t("visionHeadline")}
            headlineHighlight={t("visionHighlight")}
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className={`rounded-xl border p-6 transition-colors ${
                  phase.highlighted
                    ? "border-primary bg-primary/[0.06]"
                    : "border-border bg-card"
                }`}
                style={{ opacity: phase.highlighted ? 1 : 0.7 - i * 0.1 }}
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    phase.highlighted
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
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

      {/* Founder */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <SectionHeader
            eyebrow={t("teamEyebrow")}
            headline={t("teamHeadline")}
            headlineHighlight={t("teamHighlight")}
          />

          <AnimatedSection>
            <div className="rounded-xl border border-border bg-card p-8 text-center sm:p-10">
              <div
                className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #fa6f62 0%, #ff8a7a 40%, #e55548 100%)",
                }}
              >
                {founder.initials}
              </div>
              <h3 className="font-heading text-xl font-bold">
                {founder.name}
              </h3>
              <p className="text-sm font-medium text-primary">
                {founder.role}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {founder.bio}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <SectionHeader
            eyebrow={t("valuesEyebrow")}
            headline={t("valuesHeadline")}
            headlineHighlight={t("valuesHighlight")}
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-16 md:py-24"
              style={{
                background:
                  "linear-gradient(135deg, hsl(25, 40%, 20%) 0%, hsl(20, 50%, 25%) 30%, hsl(15, 45%, 30%) 60%, hsl(30, 35%, 22%) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse, hsl(20, 60%, 40%) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  {t("ctaHeadline")}
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base text-white/60 sm:text-lg">
                  {t("ctaSubtitle")}
                </p>
                <div className="mt-10">
                  <Button
                    size="lg"
                    className="group h-14 px-10 text-lg bg-primary text-white font-bold hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25"
                    onClick={() => setWaitlistOpen(true)}
                  >
                    {t("ctaButton")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  )
}
