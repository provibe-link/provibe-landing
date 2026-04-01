"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, Send, Rocket, BarChart3, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GradientCard } from "@/components/shared/gradient-card"
import { StatsCounter } from "@/components/shared/stats-counter"
import { CreatorCard } from "@/components/shared/creator-card"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { CTA } from "@/components/home/cta"
import { staggerContainer, cardFadeUp, iconBounce } from "@/lib/animations/variants"

const benefits = [
  {
    icon: Users,
    title: "Reach Engaged Audiences",
    description: "Access a network of 10K+ creators with authentic, engaged followings across every niche.",
  },
  {
    icon: Shield,
    title: "Authentic Partnerships",
    description: "Our matching algorithm pairs you with creators who genuinely align with your brand values.",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    description: "Track every metric that matters — reach, engagement, conversions, and revenue attribution.",
  },
]

const steps = [
  { icon: Search, title: "Browse Creators", description: "Search by niche, audience size, engagement rate, and location." },
  { icon: Send, title: "Send Requests", description: "Reach out directly with collaboration proposals and briefs." },
  { icon: Rocket, title: "Launch Campaigns", description: "Manage content, timelines, and deliverables in one place." },
  { icon: BarChart3, title: "Track Results", description: "Real-time analytics for every campaign and creator partnership." },
]

const featuredCreators = [
  { name: "Priya Sharma", niche: "Lifestyle", avatar: "/avatars/1.jpg", stats: { followers: 15800, engagement: 8.7 }, featured: true },
  { name: "Marcus Chen", niche: "Tech & Gaming", avatar: "/avatars/2.jpg", stats: { followers: 42000, engagement: 11.2 }, featured: false },
  { name: "Aisha Williams", niche: "Fitness", avatar: "/avatars/3.jpg", stats: { followers: 28500, engagement: 9.8 }, featured: true },
  { name: "Jake Rodriguez", niche: "Food & Travel", avatar: "/avatars/4.jpg", stats: { followers: 67000, engagement: 12.4 }, featured: false },
]

export function BrandsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent" />
        <GrainOverlay className="-z-10" />

        <div className="container relative mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-sm font-medium uppercase tracking-widest text-primary"
          >
            For Brands
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Connect with{" "}
            <span className="gradient-text">Authentic Creators</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Partner with creators who genuinely resonate with your audience. Smart matching, streamlined campaigns, measurable results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="group h-14 px-8 text-lg bg-gradient-to-r from-primary to-pink text-white shadow-lg shadow-primary/30"
            >
              Find Creators
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Why ProVibe for Brands"
            headline="Grow with"
            headlineHighlight="Creator Partnerships"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={cardFadeUp}>
                <GradientCard className="h-full">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-pink/10">
                      <b.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold">{b.title}</h3>
                    <p className="text-muted-foreground">{b.description}</p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="Simple Process"
            headline="How It"
            headlineHighlight="Works"
          />
          <div className="relative space-y-12">
            <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary to-pink md:block" />
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} variant="fade-up" delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <motion.div
                    variants={iconBounce}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-pink shadow-lg"
                  >
                    <step.icon className="h-7 w-7 text-white" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                  </motion.div>
                  <div className="pt-3">
                    <h3 className="font-heading text-xl font-bold">{step.title}</h3>
                    <p className="mt-1 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Top Talent"
            headline="Featured"
            headlineHighlight="Creators"
            description="Browse our curated selection of top-performing creators."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredCreators.map((c) => (
              <motion.div key={c.name} variants={cardFadeUp}>
                <CreatorCard {...c} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study / Stats */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto max-w-5xl px-6">
          <SectionHeader
            eyebrow="Proven Results"
            headline="Real"
            headlineHighlight="Campaign Impact"
          />
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <StatsCounter value={2500000} suffix="+" className="text-3xl md:text-4xl" />
                  <p className="mt-2 text-sm text-muted-foreground">Total Reach</p>
                </div>
                <div className="text-center">
                  <StatsCounter value={12} suffix="%" className="text-3xl md:text-4xl" />
                  <p className="mt-2 text-sm text-muted-foreground">Avg Engagement</p>
                </div>
                <div className="text-center">
                  <StatsCounter value={340} suffix="%" className="text-3xl md:text-4xl" />
                  <p className="mt-2 text-sm text-muted-foreground">ROI Increase</p>
                </div>
                <div className="text-center">
                  <StatsCounter value={500} suffix="+" className="text-3xl md:text-4xl" />
                  <p className="mt-2 text-sm text-muted-foreground">Brand Partners</p>
                </div>
              </div>

              <div className="mt-10 border-t border-border pt-8 text-center">
                <p className="text-lg italic text-muted-foreground">
                  &ldquo;ProVibe helped us find creators who truly understood our brand. Our campaign engagement was 4x higher than traditional influencer marketing.&rdquo;
                </p>
                <p className="mt-4 font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Head of Marketing, TechFlow</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  )
}
