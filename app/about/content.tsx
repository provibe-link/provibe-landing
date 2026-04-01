"use client"

import { motion } from "framer-motion"
import { Heart, Lightbulb, Users, Zap } from "lucide-react"
import Link from "next/link"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GradientCard } from "@/components/shared/gradient-card"
import { StatsCounter } from "@/components/shared/stats-counter"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { CTA } from "@/components/home/cta"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"

const LinkedinIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
)

const values = [
  { icon: Heart, title: "Creator First", description: "Every decision starts with what's best for creators. They're not just users — they're our community." },
  { icon: Lightbulb, title: "Bold Innovation", description: "We challenge the status quo. Generic link-in-bio tools aren't enough — creators deserve more." },
  { icon: Users, title: "Community Driven", description: "Real connections matter. We build features that bring creators together, online and in person." },
  { icon: Zap, title: "Move Fast", description: "The creator economy evolves rapidly. We ship fast, iterate often, and listen to feedback." },
]

const stats = [
  { value: 10000, suffix: "+", label: "Creators" },
  { value: 500, suffix: "+", label: "Brand Partners" },
  { value: 1000000, suffix: "+", label: "Connections Made" },
  { value: 2024, suffix: "", label: "Founded" },
]

const team = [
  { name: "Alex Rivera", role: "CEO & Co-founder", initials: "AR" },
  { name: "Samira Patel", role: "CTO & Co-founder", initials: "SP" },
  { name: "Jordan Kim", role: "Head of Design", initials: "JK" },
  { name: "Maya Thompson", role: "Head of Marketing", initials: "MT" },
  { name: "David Okonkwo", role: "Lead Engineer", initials: "DO" },
  { name: "Lucia Santos", role: "Community Manager", initials: "LS" },
  { name: "Ryan Chang", role: "Product Manager", initials: "RC" },
  { name: "Zara Ahmed", role: "Brand Partnerships", initials: "ZA" },
]

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <GrainOverlay className="-z-10" />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-sm font-medium uppercase tracking-widest text-primary"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            We&apos;re Building the{" "}
            <span className="gradient-text">Creator Economy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            ProVibe was born from a simple belief: every creator deserves powerful tools to build their brand, not just another link in bio.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <AnimatedSection variant="slide-left">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Why We Built <span className="gradient-text">ProVibe</span>
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2024, we watched talented creators struggle with fragmented tools — a bio link here, analytics there, brand outreach somewhere else. The creator economy was booming, but the infrastructure wasn&apos;t keeping up.
                </p>
                <p>
                  We saw creators with incredible content and engaged audiences missing out on brand partnerships simply because they couldn&apos;t be discovered. We saw communities of creators in the same city who didn&apos;t even know each other existed.
                </p>
                <p>
                  So we built ProVibe — one platform where creators can showcase their brand, connect with opportunities, and find their community. Not just another tool, but a launchpad for creator careers.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slide-right">
              <div className="aspect-square rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-pink/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-6xl font-bold gradient-text">PV</div>
                  <p className="mt-2 text-sm text-muted-foreground">Est. 2024</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="What Drives Us"
            headline="Our Core"
            headlineHighlight="Values"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={cardFadeUp}>
                <GradientCard className="h-full">
                  <div className="space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-pink/10">
                      <v.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <StatsCounter value={stat.value} suffix={stat.suffix} className="text-3xl md:text-5xl" />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="The Team"
            headline="Meet the"
            headlineHighlight="Humans Behind ProVibe"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={cardFadeUp}>
                <div className="group text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-pink group-hover:text-white">
                    {member.initials}
                  </div>
                  <h3 className="font-heading font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <Link
                    href="#"
                    className="mt-2 inline-block text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <LinkedinIcon />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  )
}
