import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"

const faqs = [
  {
    question: "What is ProVibe?",
    answer:
      "ProVibe is an all-in-one creator platform that combines bio link pages, a digital storefront, audience analytics, lead capture, and brand partnerships — everything you need to build, monetize, and grow your creator business.",
  },
  {
    question: "When does ProVibe launch?",
    answer:
      "ProVibe launches in July 2026. Join the waitlist now to get early access and be among the first creators on the platform.",
  },
  {
    question: "Is it free to join the waitlist?",
    answer:
      "Absolutely! Joining the waitlist is completely free. We'll notify you as soon as we launch so you can be first in line.",
  },
  {
    question: "What features will be available at launch?",
    answer:
      "At launch, you'll get customizable bio link pages, a digital storefront for selling products and services, audience analytics, lead capture forms, email broadcasting, and affiliate link management.",
  },
  {
    question: "How is ProVibe different from Linktree?",
    answer:
      "ProVibe goes far beyond link-in-bio. While Linktree focuses on links, ProVibe includes a full digital store, lead generation tools, audience analytics, campaign broadcasting, and a brand partnership marketplace — all in one platform.",
  },
  {
    question: "Will there be a free plan?",
    answer:
      "Yes! ProVibe will offer a generous free plan that includes a customizable bio page, basic analytics, and essential monetization tools. Premium plans will unlock advanced features like detailed analytics, priority brand matching, and more.",
  },
  {
    question: "How do brand partnerships work?",
    answer:
      "After our Phase 2 launch, brands will be able to discover creators based on niche, audience size, and engagement. Creators can browse opportunities, apply to campaigns, and manage collaborations directly through ProVibe.",
  },
  {
    question: "Can I sell products on ProVibe?",
    answer:
      "Yes! You can sell digital products (ebooks, courses, templates), physical products, services (consultations, coaching), and subscription-based content — all from your ProVibe page with built-in payments.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="FAQ"
          headline="Questions?"
          headlineHighlight="Answers."
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
