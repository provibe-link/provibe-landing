"use client"

import { motion, Variants } from "framer-motion"
import {
  Link2,
  ShoppingCart,
  BarChart3,
  Mail,
  Handshake,
  Megaphone,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardFadeUp, staggerContainer } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const features = [
  {
    icon: Link2,
    title: "Bio Link Pages",
    description:
      "Custom SEO-friendly pages with drag-and-drop blocks for links, media, and products.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: ShoppingCart,
    title: "Digital Store",
    description:
      "Sell digital and physical products, services, bookings, and subscriptions.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track link clicks, conversions, revenue, and audience growth in real-time.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: Mail,
    title: "Lead Capture",
    description:
      "Grow your subscriber list with forms, email capture, and broadcast campaigns.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: Handshake,
    title: "Brand Deals",
    description:
      "Get discovered by brands looking for authentic creators in your niche.",
    link: { label: "See Brands", href: "/brands" },
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    description:
      "Broadcast promotions to your audience and manage affiliate link tracking.",
    link: { label: "Learn More", href: "/creators" },
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
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Platform Features"
          headline="Everything You Need to"
          headlineHighlight="Monetize"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
            >
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="mb-6 flex-1 text-muted-foreground">
                    {feature.description}
                  </p>
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
