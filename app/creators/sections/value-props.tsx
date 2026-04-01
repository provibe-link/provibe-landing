"use client"

import { motion } from "framer-motion"
import { FileText, Handshake, CalendarDays } from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { GradientCard } from "@/components/shared/gradient-card"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"

const props = [
  {
    icon: FileText,
    title: "Bio Pages",
    subtitle: "Full control, custom branding",
    points: [
      "Stunning customizable templates",
      "Add unlimited links and content blocks",
      "Custom domain support",
      "Built-in analytics dashboard",
    ],
  },
  {
    icon: Handshake,
    title: "Brand Connections",
    subtitle: "Get discovered, monetize",
    points: [
      "Smart brand matching algorithm",
      "Direct collaboration requests",
      "Campaign management tools",
      "Secure payment processing",
    ],
  },
  {
    icon: CalendarDays,
    title: "Events & Meetups",
    subtitle: "Network, collaborate, grow",
    points: [
      "Discover events near you",
      "Host your own meetups",
      "Connect with local creators",
      "Exclusive ProVibe events",
    ],
  },
]

export function ValueProps() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Choose ProVibe"
          headline="Everything You Need to"
          headlineHighlight="Succeed"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {props.map((prop) => (
            <motion.div key={prop.title} variants={cardFadeUp}>
              <GradientCard className="h-full">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-pink/10">
                    <prop.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">{prop.title}</h3>
                  <p className="text-sm font-medium text-primary">{prop.subtitle}</p>
                  <ul className="space-y-2">
                    {prop.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
