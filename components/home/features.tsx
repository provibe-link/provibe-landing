"use client"

import { motion, Variants } from "framer-motion"
import { Zap, DollarSign, Handshake, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardFadeUp, staggerContainer } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const features = [
  {
    icon: Zap,
    title: "Start Fast",
    description:
      "Launch your creator page in minutes. No technical skills needed, just your content and creativity.",
    link: { label: "Get Started", href: "/creators" },
  },
  {
    icon: DollarSign,
    title: "Earn Income",
    description:
      "Sell digital products, accept tips, and monetize your audience with built-in payment tools.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: Handshake,
    title: "Grow With Brands",
    description:
      "Get discovered by brands looking for authentic creators. Turn your influence into real partnerships.",
    link: { label: "See Brands", href: "/brands" },
  },
]

export function Features() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Built For You"
          headline="For Every"
          headlineHighlight="Creator"
        />

        {/* Feature Cards */}
        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={prefersReducedMotion ? cardReduced : cardFadeUp}>
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* Image placeholder */}
                  <div className="mb-5 h-40 rounded-lg bg-muted/20" />

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-heading text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="mb-6 flex-1 text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Link */}
                  <Link
                    href={feature.link.href}
                    className="group inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {feature.link.label}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
