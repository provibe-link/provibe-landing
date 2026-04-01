"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  Link2,
  ShoppingCart,
  BarChart3,
  Mail,
  Target,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const features = [
  {
    icon: Link2,
    title: "Bio Link Builder",
    description:
      "Drag-and-drop blocks for links, media, products, forms, and embeds. Fully customizable templates with your brand colors.",
  },
  {
    icon: ShoppingCart,
    title: "Digital Storefront",
    description:
      "Sell digital and physical products, offer services and bookings, manage subscriptions — all with built-in payments.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track link clicks, page views, conversions, revenue, and audience growth with real-time dashboards.",
  },
  {
    icon: Mail,
    title: "Lead Gen & Broadcasting",
    description:
      "Capture emails and phone numbers, broadcast campaigns to subscribers, and grow your audience list.",
  },
  {
    icon: Target,
    title: "Affiliate Management",
    description:
      "Track affiliate links, monitor commissions, and measure performance across all your partnerships.",
  },
]

const creatorFaqs = [
  {
    question: "How quickly can I set up my page?",
    answer:
      "Most creators have their page live in under 3 minutes. Choose a template, customize your colors and content, and you're ready to share.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! You can connect your custom domain or use a free provibe.com/yourname subdomain.",
  },
  {
    question: "What can I sell on ProVibe?",
    answer:
      "Digital products (ebooks, courses, templates, presets), physical products, services (coaching, consultations), and subscription content.",
  },
  {
    question: "How do payments work?",
    answer:
      "We integrate with major payment processors. You receive payouts directly to your bank account with transparent fee structures.",
  },
]

export function CreatorsContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

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
              For Creators
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Bio. Your Store.{" "}
              <span className="gradient-text">Your Empire.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              One link to showcase everything — sell products, capture leads, and
              land brand deals. All from your ProVibe page.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="Creator Tools"
            headline="Everything to"
            headlineHighlight="Build & Sell"
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="flex gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="bg-card/30 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Templates"
            headline="Start With a"
            headlineHighlight="Template"
            description="Choose from professionally designed templates and make them yours in minutes."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {["Minimal", "Bold", "Creative"].map((name) => (
              <AnimatedSection key={name}>
                <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary">
                  <div className="aspect-[3/4] bg-muted/20" />
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-semibold">{name}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Creator FAQ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <SectionHeader
            eyebrow="FAQ"
            headline="Creator"
            headlineHighlight="Questions"
          />

          <AnimatedSection variant="fade-up" delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {creatorFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border bg-card px-6 transition-colors hover:border-primary data-[state=open]:border-primary"
                >
                  <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary" />
        <GrainOverlay opacity={0.05} />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Start Building Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Be among the first creators on ProVibe. Join the waitlist and get
              early access when we launch.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Join the Waitlist
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
