"use client"

import { motion, Variants } from "framer-motion"
import {
  Heart,
  Lightbulb,
  Eye,
  Users,
  Globe,
  Megaphone,
  DollarSign,
  ArrowRight,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GradientCard } from "@/components/shared/gradient-card"
import { StatsCounter } from "@/components/shared/stats-counter"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

/* ------------------------------------------------------------------ */
/*  Reduced-motion-aware variants                                      */
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
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const reducedStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Active Creators" },
  { icon: Globe, value: 150, suffix: "+", label: "Countries" },
  { icon: Megaphone, value: 10000, suffix: "+", label: "Campaigns" },
  { icon: DollarSign, value: null, static: "$2B+", label: "Paid to Creators" },
] as const

const values = [
  {
    icon: Heart,
    title: "Creator First",
    description:
      "Every decision we make starts with the creator. We build tools that empower, not exploit.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description:
      "We believe real influence comes from genuine connections, not vanity metrics.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push the boundaries of what's possible in creator-brand collaboration with AI and data.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Fair payments, fair expectations, fair compensation \u2014 we keep negotiations fair and transparent for us.",
  },
]

const milestones = [
  {
    year: "2024",
    title: "Founded",
    description:
      "ProVibe launched with a mission to revolutionize creator-brand connections.",
  },
  {
    year: "2024",
    title: "10K Creators",
    description:
      "Reached our first major milestone of 10,000 active creators on the platform.",
  },
  {
    year: "2025",
    title: "AI Matching",
    description:
      "Launched AI-powered creator-brand matching, increasing campaign ROI by 3x.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description:
      "Expanded to 150+ countries with localized payment and language support.",
  },
]

const team = [
  { initials: "AR", name: "Alex Rivera", role: "CEO & Co-Founder" },
  { initials: "PS", name: "Priya Sharma", role: "CTO & Co-Founder" },
  { initials: "MC", name: "Marcus Chen", role: "Head of Product" },
  { initials: "SM", name: "Sofia Martinez", role: "VP of Partnerships" },
]

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export function AboutContent() {
  const prefersReducedMotion = useReducedMotion()

  const stagger = prefersReducedMotion ? reducedStagger : heroStagger
  const fadeUp = prefersReducedMotion ? reducedFadeOnly : heroFadeUp
  const cardStagger = prefersReducedMotion ? reducedStagger : staggerContainer
  const cardItem = prefersReducedMotion ? reducedFadeOnly : cardFadeUp

  return (
    <main>
      {/* ---------------------------------------------------------- */}
      {/*  Hero Section                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay />

        <div className="container relative mx-auto max-w-5xl px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-sm font-medium uppercase tracking-widest text-primary"
            >
              Our Mission
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              About <span className="gradient-text">ProVibe</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              We&apos;re on a mission to make creator-brand collaboration
              effortless, transparent, and impactful. Founded in 2024, ProVibe
              connects the world&apos;s best creators with forward-thinking
              brands.
            </motion.p>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={cardItem}
                  className="rounded-xl border border-border bg-card p-6 text-center transition-colors duration-300 hover:border-primary"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {stat.value !== null ? (
                    <StatsCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    <span className="font-mono text-4xl font-bold gradient-text">
                      {stat.static}
                    </span>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Story Section                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Left */}
            <AnimatedSection variant="slide-left">
              <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
                OUR STORY
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Built by creators, for creators
              </h2>
              <p className="mt-4 text-muted-foreground">
                ProVibe was born from a simple frustration: the creator economy
                was booming, but the tools connecting creators and brands were
                stuck in the past.
              </p>
              <p className="mt-4 text-muted-foreground">
                We built ProVibe to change that &mdash; combining AI-powered
                matching, transparent analytics, and secure payments into one
                seamless platform. Today, we&apos;re the trusted partner for
                over 50,000 creators and thousands of brands worldwide.
              </p>
            </AnimatedSection>

            {/* Right - mockup */}
            <AnimatedSection variant="slide-right">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-primary/5">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    provibe.com/username
                  </span>
                  <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white">
                    Claim your username
                  </button>
                </div>

                {/* Center content */}
                <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-display text-xl font-bold">Since 2024</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Empowering creators globally
                  </p>
                </div>

                {/* Top-right label */}
                <div className="px-4 pb-3 text-right">
                  <span className="text-[10px] text-muted-foreground/60">
                    Edit with ProVibe
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Values Section                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="WHAT DRIVES US"
            headline="Our Core"
            headlineHighlight="Values"
          />

          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div key={v.title} variants={cardItem}>
                  <GradientCard>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {v.description}
                    </p>
                  </GradientCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Milestones Section                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="OUR JOURNEY"
            headline="Key"
            headlineHighlight="Milestones"
          />

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-border" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <AnimatedSection
                  key={m.title}
                  variant="fade-up"
                  delay={prefersReducedMotion ? 0 : i * 0.12}
                >
                  <div className="flex gap-6">
                    {/* Dot */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                      <span className="text-xs font-bold text-white">PV</span>
                    </div>

                    {/* Content */}
                    <div className="pb-2">
                      <p className="text-sm font-bold text-primary">{m.year}</p>
                      <h3 className="font-heading text-lg font-bold">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Team Section                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="THE PEOPLE"
            headline="Meet Our"
            headlineHighlight="Team"
            description="A diverse group of builders, creators, and dreamers united by a shared vision."
          />

          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={cardItem}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  CTA Section (inline)                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/30 blur-3xl animate-float [animation-delay:2s]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-white/20 blur-3xl animate-float [animation-delay:4s]" />

        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Ready to Join the Movement?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/80"
            >
              Whether you&apos;re a creator looking to grow or a brand seeking
              authentic partnerships, ProVibe is your platform.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-white font-bold text-primary hover:bg-white/90"
              >
                Join as Creator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Partner as Brand
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
