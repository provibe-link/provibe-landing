"use client"

import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"

export function FAQ() {
  const t = useTranslations("faq")

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
    { question: t("q8"), answer: t("a8") },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
        />

        {/* Accordion */}
        <AnimatedSection variant="fade-up" delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-6 transition-colors hover:border-primary data-[state=open]:border-primary"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
