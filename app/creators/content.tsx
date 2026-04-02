"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import {
  Link2,
  ShoppingCart,
  BarChart3,
  Mail,
  Target,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function CreatorsContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("creators")

  const features = [
    {
      icon: Link2,
      title: t("bioBuilder"),
      description: t("bioBuilderDesc"),
    },
    {
      icon: ShoppingCart,
      title: t("digitalStorefront"),
      description: t("digitalStorefrontDesc"),
    },
    {
      icon: BarChart3,
      title: t("analyticsDashboard"),
      description: t("analyticsDashboardDesc"),
    },
    {
      icon: Mail,
      title: t("leadGen"),
      description: t("leadGenDesc"),
    },
    {
      icon: Target,
      title: t("affiliateManagement"),
      description: t("affiliateManagementDesc"),
    },
  ]

  const creatorFaqs = [
    {
      question: t("faqQ1"),
      answer: t("faqA1"),
    },
    {
      question: t("faqQ2"),
      answer: t("faqA2"),
    },
    {
      question: t("faqQ3"),
      answer: t("faqA3"),
    },
    {
      question: t("faqQ4"),
      answer: t("faqA4"),
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
                {t("joinWaitlist")}
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
            eyebrow={t("toolsEyebrow")}
            headline={t("toolsHeadline")}
            headlineHighlight={t("toolsHighlight")}
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
            eyebrow={t("templatesEyebrow")}
            headline={t("templatesHeadline")}
            headlineHighlight={t("templatesHighlight")}
            description={t("templatesDesc")}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { name: t("templateMinimal"), image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=533&fit=crop" },
              { name: t("templateBold"), image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=533&fit=crop" },
              { name: t("templateCreative"), image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=533&fit=crop" },
            ].map((template) => (
              <AnimatedSection key={template.name}>
                <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-semibold">{template.name}</h3>
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
            eyebrow={t("faqEyebrow")}
            headline={t("faqHeadline")}
            headlineHighlight={t("faqHighlight")}
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
                    {t("joinWaitlist")}
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
