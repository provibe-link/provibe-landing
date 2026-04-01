"use client"

import { motion } from "framer-motion"
import { FileText, Handshake, CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardFadeUp, staggerContainer } from "@/lib/animations/variants"

const features = [
  {
    icon: FileText,
    title: "Stand Out with Bio Pages",
    description:
      "Create stunning, customizable bio pages that showcase all your content in one place. Your brand, your way.",
    link: { label: "Explore Bio Pages", href: "/creators" },
    gradient: "from-primary/20 to-pink/10",
  },
  {
    icon: Handshake,
    title: "Connect with Top Brands",
    description:
      "Get discovered by brands looking for authentic creators in your niche. Turn your influence into partnerships.",
    link: { label: "See Brand Partners", href: "/brands" },
    gradient: "from-pink/20 to-primary/10",
  },
  {
    icon: CalendarDays,
    title: "Discover Local Events",
    description:
      "Find nearby events, collaborate with creators, and grow your network in the real world.",
    link: { label: "Browse Events", href: "/creators" },
    gradient: "from-primary/15 to-pink/15",
  },
]

export function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Everything You Need"
          headline="One Platform,"
          headlineHighlight="Infinite Possibilities"
          description="Everything creators need to build their brand, connect with opportunities, and grow their community."
        />

        {/* Feature Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardFadeUp}>
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-pink/10">
                    <feature.icon className="h-7 w-7 text-primary" />
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
                    className="group inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-pink"
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
