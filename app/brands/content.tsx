"use client"

import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  Search,
  Zap,
  ClipboardList,
  Users,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Target,
  FileCheck,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GradientCard } from "@/components/shared/gradient-card"
import { StatsCounter } from "@/components/shared/stats-counter"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const campaignSteps = [
  {
    icon: ClipboardList,
    title: "Create Brief",
    description:
      "Define your campaign goals, deliverables, timeline, and budget in minutes.",
  },
  {
    icon: Users,
    title: "Select Creators",
    description:
      "Browse AI-recommended creators or invite from your saved lists.",
  },
  {
    icon: MessageCircle,
    title: "Collaborate",
    description:
      "Chat, share assets, review drafts, and approve content — all in-platform.",
  },
  {
    icon: BarChart3,
    title: "Measure Results",
    description:
      "Track real-time performance with conversion attribution and ROI reporting.",
  },
]

const caseStudies = [
  {
    initial: "T",
    badge: "SaaS",
    company: "TechFlow",
    metrics: [
      { value: "340% ROI increase", label: "Return on Investment" },
      { value: "2.1M impressions", label: "Total Reach" },
    ],
    quote:
      "ProVibe\u2019s creator matching drove more qualified leads than any channel we\u2019ve tried.",
    author: "Sr. Marketing Director",
  },
  {
    initial: "G",
    badge: "Beauty",
    company: "GlowUp",
    metrics: [
      { value: "4.2x ROAS", label: "Return on Ad Spend" },
      { value: "800K engagements", label: "Total Engagements" },
    ],
    quote:
      "We went from guessing to data-driven influencer marketing overnight.",
    author: "Sr. Marketing Manager",
  },
  {
    initial: "F",
    badge: "Fitness",
    company: "FitNation",
    metrics: [
      { value: "5.8x ROAS", label: "Return on Ad Spend" },
      { value: "1.4M impressions", label: "Total Reach" },
    ],
    quote:
      "ProVibe connected us with creators whose audiences genuinely care about fitness — the partnerships felt authentic from day one.",
    author: "Head of Brand Partnerships",
  },
]

export function BrandsContent() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay />

        <div className="container relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              For Brands &amp; Agencies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.1,
              duration: prefersReducedMotion ? 0.3 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Scale creator campaigns with{" "}
            <span className="gradient-text">measurable ROI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Find verified creators, manage campaigns end-to-end, and prove real
            business impact — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.4,
              type: prefersReducedMotion ? undefined : "spring",
              duration: prefersReducedMotion ? 0.3 : undefined,
              stiffness: 200,
              damping: 20,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group h-14 px-8 text-lg bg-primary text-white hover:bg-primary/90"
            >
              Start a Campaign
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg"
            >
              Book a Demo
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.6,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div className="text-center">
              <StatsCounter
                value={50000}
                suffix="+"
                className="font-mono text-2xl font-bold text-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Verified Creators
              </p>
            </div>
            <div className="text-center">
              <StatsCounter
                value={340}
                suffix="%"
                className="font-mono text-2xl font-bold text-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Avg. ROI Increase
              </p>
            </div>
            <div className="text-center">
              <StatsCounter
                value={150}
                suffix="+"
                className="font-mono text-2xl font-bold text-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">Countries</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl font-bold text-primary">
                $2B+
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Campaign Value
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AI Matching Section ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Phone mockup */}
            <AnimatedSection variant="slide-left">
              <div className="mx-auto aspect-[9/16] max-w-[300px] rounded-3xl border border-border/50 bg-primary/5 p-6">
                {/* Mock search UI */}
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-background/80 px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Search creators...
                  </span>
                </div>
                <div className="space-y-3">
                  {["Lifestyle", "Tech", "Fitness", "Beauty"].map((niche) => (
                    <div
                      key={niche}
                      className="flex items-center gap-3 rounded-lg bg-background/60 p-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/20" />
                      <div className="flex-1">
                        <div className="h-3 w-20 rounded bg-foreground/10" />
                        <div className="mt-1 h-2 w-14 rounded bg-muted-foreground/10" />
                      </div>
                      <span className="text-[10px] font-medium text-primary">
                        {niche}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                  <Zap className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-xs font-medium text-primary">
                    AI Match Score: 94%
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Copy */}
            <AnimatedSection variant="slide-right">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Find the{" "}
                <span className="gradient-text">perfect match</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Stop guessing. Our AI analyzes audience overlap, engagement
                authenticity, and brand fit to surface creators who will actually
                move the needle.
              </p>
            </AnimatedSection>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatedSection variant="fade-up" delay={0}>
              <GradientCard className="h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">Smart Search</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Filter by niche, audience size, engagement rate, location, and
                  more.
                </p>
              </GradientCard>
            </AnimatedSection>
            <AnimatedSection variant="fade-up" delay={0.1}>
              <GradientCard className="h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">AI Matching</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our AI models recommend creators matching your brand values and
                  audience demographics.
                </p>
              </GradientCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Campaign Management ── */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="CAMPAIGN MANAGEMENT"
            headline="From brief to"
            headlineHighlight="results"
            description="A streamlined workflow that takes you from campaign creation to measurable outcomes in four simple steps."
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {campaignSteps.map((step) => (
              <motion.div
                key={step.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              >
                <GradientCard className="h-full">
                  <div className="mb-4 flex aspect-[3/2] items-center justify-center rounded-lg bg-muted/20">
                    <step.icon className="h-10 w-10 text-primary/40" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </GradientCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Analytics Section ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Copy */}
            <AnimatedSection variant="slide-left">
              <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
                ANALYTICS
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Prove <span className="gradient-text">real ROI</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Go beyond vanity metrics. Track impressions, engagement,
                click-throughs, and conversions with full attribution — data your
                CFO will actually believe.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time campaign dashboards",
                  "Multi-touch conversion attribution",
                  "Exportable reports for stakeholders",
                  "A/B testing across creator cohorts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Analytics mockup */}
            <AnimatedSection variant="slide-right">
              <div className="aspect-[4/3] rounded-2xl border border-border/50 bg-primary/5 p-6">
                {/* Stat cards row */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "4.2M", label: "Impressions" },
                    { value: "350K", label: "Engagements" },
                    { value: "$184K", label: "Revenue" },
                    { value: "3.8%", label: "Conv. Rate" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-background/80 p-3 text-center"
                    >
                      <p className="font-mono text-lg font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mock bar chart */}
                <div className="mt-4 rounded-lg bg-background/60 p-4">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Campaign Performance
                  </p>
                  <div className="flex items-end gap-2">
                    {[40, 65, 50, 80, 70, 90, 75, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary/30"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="CASE STUDIES"
            headline="Brands winning with"
            headlineHighlight="ProVibe"
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {caseStudies.map((study) => (
              <motion.div
                key={study.company}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              >
                <GradientCard className="h-full">
                  {/* Header row */}
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white">
                      {study.initial}
                    </div>
                    <div className="flex-1" />
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {study.badge}
                    </span>
                  </div>

                  {/* Company name */}
                  <h3 className="mt-4 font-heading text-lg font-bold">
                    {study.company}
                  </h3>

                  {/* Metrics */}
                  <div className="mt-2 flex gap-4">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="text-xs">
                        <span className="font-bold text-primary">
                          {m.value}
                        </span>{" "}
                        <span className="text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    — {study.author}
                  </p>
                </GradientCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA (inline) ── */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float [animation-delay:2s]" />

        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Ready to scale your{" "}
            <span className="underline decoration-white/40 underline-offset-4">
              creator marketing
            </span>
            ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.1,
              duration: prefersReducedMotion ? 0.3 : 0.6,
            }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Join 3,000+ brands already running high-ROI campaigns on ProVibe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.3,
              type: prefersReducedMotion ? undefined : "spring",
              duration: prefersReducedMotion ? 0.3 : undefined,
              stiffness: 200,
              damping: 20,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group h-14 bg-white px-8 text-lg font-bold text-primary hover:bg-white/90"
            >
              Start a Campaign
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-2 border-white px-8 text-lg text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
