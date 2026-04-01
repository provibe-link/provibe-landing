"use client"

import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  Eye,
  Zap,
  Link2,
  ShoppingBag,
  FileText,
  Palette,
  Globe,
  GripVertical,
  Sparkles,
  BarChart3,
  MousePointer,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GradientCard } from "@/components/shared/gradient-card"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

/* ------------------------------------------------------------------ */
/*  Reduced-motion-safe variants                                       */
/* ------------------------------------------------------------------ */

const reducedFadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const ctaStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const ctaItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ------------------------------------------------------------------ */
/*  CreatorsContent                                                    */
/* ------------------------------------------------------------------ */

export function CreatorsContent() {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = prefersReducedMotion ? reducedFadeOnly : heroFadeUp
  const stagger = prefersReducedMotion ? reducedFadeOnly : heroStagger
  const staggerC = prefersReducedMotion ? reducedFadeOnly : staggerContainer
  const cardUp = prefersReducedMotion ? reducedFadeOnly : cardFadeUp
  const ctaStg = prefersReducedMotion ? reducedFadeOnly : ctaStagger
  const ctaI = prefersReducedMotion ? reducedFadeOnly : ctaItem

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Background */}
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Built for Creators
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Your all-in-one{" "}
              <span className="gradient-text">creator</span> platform
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              Build your brand, sell digital products, and land brand deals —
              all from a single, beautiful page.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex gap-4">
              <Button size="lg">
                Create Your Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                See Examples
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. CREATOR TOOLS                                             */}
      {/* ============================================================ */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="CREATOR TOOLS"
            headline="Everything to"
            headlineHighlight="build & grow"
            description="Six powerful tools designed to help you create, monetize, and manage your creator business."
          />

          {/* Phone Mockup */}
          <div className="mx-auto mb-12 max-w-[300px]">
            <AnimatedSection variant="scale">
              <div className="aspect-[9/16] rounded-3xl border border-border/50 bg-primary/5 p-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="mt-2 rounded-full bg-primary/10 px-4 py-1.5">
                    <span className="text-xs font-medium text-primary">
                      provibe.com/username
                    </span>
                  </div>
                  <div className="mt-auto flex w-full flex-col items-center gap-3 pb-8">
                    <div className="h-2 w-24 rounded-full bg-primary/10" />
                    <div className="h-2 w-16 rounded-full bg-primary/10" />
                    <div className="mt-4 rounded-lg bg-primary px-6 py-2">
                      <span className="text-xs font-medium text-primary-foreground">
                        Claim your username
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* 2 Large Cards */}
          <motion.div
            variants={staggerC}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-muted/20">
                  <Link2 className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  Bio Link Builder
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create a stunning link-in-bio page with custom themes,
                  analytics, and unlimited links.
                </p>
              </GradientCard>
            </motion.div>

            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-muted/20">
                  <ShoppingBag className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  Digital Store
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sell courses, presets, templates, and downloads with 0%
                  commission on sales.
                </p>
              </GradientCard>
            </motion.div>
          </motion.div>

          {/* Full-width Card */}
          <div className="mt-6">
            <AnimatedSection>
              <GradientCard>
                <div className="mb-4 flex aspect-[4/3] max-h-48 items-center justify-center rounded-lg bg-muted/20">
                  <FileText className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  Media Kit Generator
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Auto-generate professional media kits with your latest stats
                  to land brand deals.
                </p>
              </GradientCard>
            </AnimatedSection>
          </div>

          {/* 3 Smaller Cards */}
          <motion.div
            variants={staggerC}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">Custom Themes</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose from 30+ themes or fully customize colors, fonts, and
                  layouts to match your brand.
                </p>
              </GradientCard>
            </motion.div>

            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">Custom Domains</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect your own domain for a fully branded experience your
                  audience trusts.
                </p>
              </GradientCard>
            </motion.div>

            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold">SEO Tools</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Optimize your page for search engines and get discovered by
                  new audiences.
                </p>
              </GradientCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. PAGE BUILDER                                              */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          {/* Left */}
          <AnimatedSection variant="slide-left">
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
              PAGE BUILDER
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Drag, drop,{" "}
              <span className="gradient-text">publish</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our intuitive builder lets you create stunning creator pages in
              minutes. Add link blocks, product showcases, media kits, and more
              — no code required.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Drag-and-drop block editor
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Full visual customization
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Instant publishing & previews
              </li>
            </ul>
          </AnimatedSection>

          {/* Right — Builder Mockup */}
          <AnimatedSection variant="slide-right">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-border/50 bg-primary/5 p-6">
              {/* Simplified builder UI mock */}
              <div className="flex w-full max-w-xs flex-col gap-3">
                {/* Toolbar */}
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <GripVertical className="h-4 w-4 text-primary/40" />
                  <div className="h-2 w-16 rounded-full bg-primary/20" />
                  <div className="ml-auto h-2 w-8 rounded-full bg-primary/20" />
                </div>
                {/* Block 1 */}
                <div className="rounded-lg border border-border/30 bg-background/60 p-3">
                  <div className="mb-2 h-2 w-20 rounded-full bg-primary/15" />
                  <div className="h-2 w-full rounded-full bg-muted/30" />
                  <div className="mt-1.5 h-2 w-3/4 rounded-full bg-muted/30" />
                </div>
                {/* Block 2 */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-3.5 w-3.5 text-primary/40" />
                    <div className="h-2 w-24 rounded-full bg-primary/20" />
                  </div>
                </div>
                {/* Block 3 */}
                <div className="rounded-lg border border-border/30 bg-background/60 p-3">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-muted/30" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-2 w-16 rounded-full bg-primary/15" />
                      <div className="h-2 w-24 rounded-full bg-muted/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. TEMPLATES                                                 */}
      {/* ============================================================ */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="TEMPLATES"
            headline="Start with a"
            headlineHighlight="beautiful template"
            description="Choose from professionally designed templates and customize every detail to match your brand."
          />

          <motion.div
            variants={staggerC}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {/* Template 1 — Minimal Creator */}
            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-lg bg-primary/5 p-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10" />
                  <div className="h-2 w-20 rounded-full bg-primary/10" />
                  <div className="h-2 w-14 rounded-full bg-primary/5" />
                  <div className="mt-2 flex w-full flex-col gap-2 px-6">
                    <div className="h-6 w-full rounded-md bg-primary/10" />
                    <div className="h-6 w-full rounded-md bg-primary/10" />
                    <div className="h-6 w-full rounded-md bg-primary/10" />
                  </div>
                </div>
                <h3 className="font-heading font-bold">Minimal Creator</h3>
                <p className="text-xs text-muted-foreground">
                  Clean & Modern
                </p>
              </GradientCard>
            </motion.div>

            {/* Template 2 — Bold Portfolio */}
            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex aspect-[3/4] flex-col items-center justify-between gap-3 rounded-lg bg-primary/5 p-4">
                  <div className="h-3 w-24 rounded-full bg-primary/20" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-16 w-16 rounded-lg bg-primary/15" />
                    <div className="h-2 w-20 rounded-full bg-primary/10" />
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2 px-2">
                    <div className="aspect-square rounded-md bg-primary/10" />
                    <div className="aspect-square rounded-md bg-primary/10" />
                  </div>
                </div>
                <h3 className="font-heading font-bold">Bold Portfolio</h3>
                <p className="text-xs text-muted-foreground">High Contrast</p>
              </GradientCard>
            </motion.div>

            {/* Template 3 — Neon Studio */}
            <motion.div variants={cardUp}>
              <GradientCard>
                <div className="mb-4 flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-lg bg-primary/5 p-4">
                  <div className="h-12 w-12 rounded-full border-2 border-primary/20 bg-primary/10" />
                  <div className="h-2 w-16 rounded-full bg-primary/15" />
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10" />
                    <div className="h-6 w-6 rounded-full bg-primary/10" />
                    <div className="h-6 w-6 rounded-full bg-primary/10" />
                  </div>
                  <div className="mt-2 w-full space-y-2 px-4">
                    <div className="h-8 w-full rounded-full bg-primary/15" />
                    <div className="h-8 w-full rounded-full bg-primary/10" />
                  </div>
                </div>
                <h3 className="font-heading font-bold">Neon Studio</h3>
                <p className="text-xs text-muted-foreground">
                  Vibrant & Edgy
                </p>
              </GradientCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. ANALYTICS                                                 */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          {/* Left — Analytics Mockup */}
          <AnimatedSection variant="slide-left">
            <div className="aspect-[4/3] rounded-2xl border border-border/50 bg-primary/5 p-6">
              <div className="flex flex-col gap-4">
                {/* Stat Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Page Views</p>
                    <p className="font-heading text-xl font-bold">124.5K</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Link Clicks</p>
                    <p className="font-heading text-xl font-bold">48.2K</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-heading text-xl font-bold">$8,420</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Conv. Rate</p>
                    <p className="font-heading text-xl font-bold">6.8%</p>
                  </div>
                </div>
                {/* Chart placeholder */}
                <div className="flex items-end gap-1.5 rounded-lg bg-background/60 p-3">
                  <div className="h-8 w-full rounded-sm bg-primary/15" />
                  <div className="h-12 w-full rounded-sm bg-primary/20" />
                  <div className="h-6 w-full rounded-sm bg-primary/10" />
                  <div className="h-16 w-full rounded-sm bg-primary/25" />
                  <div className="h-10 w-full rounded-sm bg-primary/15" />
                  <div className="h-14 w-full rounded-sm bg-primary/20" />
                  <div className="h-20 w-full rounded-sm bg-primary/30" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Copy */}
          <AnimatedSection variant="slide-right">
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
              ANALYTICS
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Know your <span className="gradient-text">numbers</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Track every page view, link click, product sale, and audience
              trend with beautiful, real-time analytics. Understand what&apos;s
              working and double down.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Real-time visitor tracking
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Revenue & conversion analytics
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Audience demographics & geo data
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                Link click heatmaps
              </li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. CTA (inline)                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <motion.div
          variants={ctaStg}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="container relative z-10 mx-auto max-w-4xl px-4 text-center"
        >
          <motion.h2
            variants={ctaI}
            className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Your creator page awaits
          </motion.h2>

          <motion.p
            variants={ctaI}
            className="mx-auto mt-4 max-w-xl text-lg text-white/80"
          >
            Set up in under 5 minutes. Free forever for creators.
          </motion.p>

          <motion.div variants={ctaI} className="mt-8">
            <Button
              size="lg"
              className="bg-white font-bold text-primary hover:bg-white/90"
            >
              Create Your Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
