"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Custom bio page",
      "Up to 10 links",
      "Basic analytics",
      "Event discovery",
      "Community access",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For serious creators",
    features: [
      "Everything in Free",
      "Unlimited links & blocks",
      "Advanced analytics",
      "Brand matching",
      "Custom domain",
      "Priority support",
      "Event hosting",
      "Revenue tracking",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    description: "For agencies & teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Multiple bio pages",
      "API access",
      "White-label options",
      "Dedicated manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Simple Pricing"
          headline="Plans That"
          headlineHighlight="Grow with You"
          description="Start free, upgrade when you're ready. No hidden fees."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <AnimatedSection key={plan.name} variant="fade-up">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8",
                  plan.popular
                    ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-pink px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-pink text-white hover:opacity-90"
                      : "variant-outline"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
