"use client"

import { motion, Variants } from "framer-motion"
import { Link2, ShoppingBag, FileText, BarChart3, Users, Megaphone } from "lucide-react"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardFadeUp, staggerContainer } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const features = [
  {
    icon: Link2,
    title: "Bio Link Builder",
    description:
      "Create a stunning bio page with a drag-and-drop builder. Showcase your content, links, and brand beautifully.",
  },
  {
    icon: ShoppingBag,
    title: "Digital Store",
    description:
      "Sell downloads, templates, presets, and digital products with built-in checkout and delivery.",
  },
  {
    icon: FileText,
    title: "Media Kit Generator",
    description:
      "Auto-generate professional media kits with your latest stats to impress brands instantly.",
  },
  {
    icon: BarChart3,
    title: "Audience Analytics",
    description:
      "Track your demographics, engagement trends, and growth metrics with clear, actionable insights.",
  },
  {
    icon: Users,
    title: "Creator Marketplace",
    description:
      "Get discovered by brands looking for creators that match their audience and values.",
  },
  {
    icon: Megaphone,
    title: "Campaign Manager",
    description:
      "Manage brand partnerships, deliverables, deadlines, and payments all in one place.",
  },
]

export function Features2() {
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
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Platform Features"
          headline="Everything you need to"
          headlineHighlight="scale"
          description="A complete toolkit to build your brand, sell products, manage partnerships, and measure successful collaborations."
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={prefersReducedMotion ? cardReduced : cardFadeUp}>
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* Image placeholder */}
                  <div className="mb-5 h-40 rounded-lg bg-muted/20" />

                  {/* Title & Description */}
                  <h3 className="mb-2 font-heading text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
