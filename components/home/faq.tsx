import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/shared/animated-section"

const faqs = [
  {
    question: "What is ProVibe?",
    answer:
      "ProVibe is a creator marketplace platform that helps influencers and creators build stunning bio pages, connect with brands, and discover local events. Think of it as your all-in-one creator toolkit.",
  },
  {
    question: "How much does it cost?",
    answer:
      "ProVibe is free to get started! Our free plan includes a customizable bio page, basic analytics, and event discovery. Premium plans with advanced features like brand matching and priority support start at $9/month.",
  },
  {
    question: "How do brand connections work?",
    answer:
      "Our smart matching system connects you with brands based on your niche, audience size, and engagement rate. Brands can discover your profile, review your stats, and reach out directly through the platform.",
  },
  {
    question: "Can I use my existing bio links?",
    answer:
      "Absolutely! You can import your existing links and content into ProVibe. Our bio page builder lets you customize everything while keeping all your important links in one place.",
  },
  {
    question: "What events are available?",
    answer:
      "ProVibe features creator meetups, brand networking events, workshops, and community gatherings in cities worldwide. You can also host your own events and invite other creators.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "We're currently focused on delivering the best web experience. A mobile app is in our roadmap and will be available soon. Our website is fully responsive and works great on mobile browsers.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started takes less than 30 seconds! Click 'Start Creating Free', sign up with your email or social account, choose a template for your bio page, and start customizing. No credit card required.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team through the Contact page, email us at support@provibe.com, or use the in-app chat. We typically respond within 2 hours during business hours.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Got Questions?
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Everything you need to know about ProVibe. Can&apos;t find what you&apos;re looking for? Contact us.
          </p>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection variant="fade-up" delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card/50 px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5 transition-colors"
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
