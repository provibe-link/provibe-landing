"use client"

import { motion } from "framer-motion"
import { UserPlus, Paintbrush, TrendingUp, Rocket } from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { iconBounce, fadeUp } from "@/lib/animations/variants"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up Free",
    description: "Create your account in 30 seconds. No credit card required.",
    step: 1,
  },
  {
    icon: Paintbrush,
    title: "Build Your Bio",
    description: "Customize your page with your content, links, and personal brand.",
    step: 2,
  },
  {
    icon: TrendingUp,
    title: "Get Discovered",
    description: "Brands and creators find you through our smart matching system.",
    step: 3,
  },
  {
    icon: Rocket,
    title: "Grow Together",
    description: "Collaborate on campaigns, attend events, and monetize your influence.",
    step: 4,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Simple Process"
          headline="Get Started in"
          headlineHighlight="4 Easy Steps"
          className="mb-20"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary via-pink to-primary-dark md:block" />

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className={`flex flex-col items-center gap-6 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="mb-2 font-heading text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon Circle */}
                <motion.div
                  variants={iconBounce}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-pink shadow-lg shadow-primary/20"
                >
                  <step.icon className="h-7 w-7 text-white" />
                  {/* Step Number */}
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
                    {step.step}
                  </span>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
