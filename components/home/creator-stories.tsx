"use client"

import { motion, Variants } from "framer-motion"
import { Rocket, DollarSign, Handshake } from "lucide-react"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardFadeUp, staggerContainer } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const stories = [
  {
    icon: Rocket,
    title: "Get started fast, at any size",
    description:
      "Whether you have 100 followers or 1 million, ProVibe gives you the tools to launch your creator page instantly and start growing from day one.",
  },
  {
    icon: DollarSign,
    title: "Build new streams of income",
    description:
      "Turn digital products, affiliate partnerships, and sponsored content into reliable revenue streams with built-in monetization tools.",
  },
  {
    icon: Handshake,
    title: "Partner with brands you love",
    description:
      "Our marketplace connects you with brands that align with your values. Build authentic partnerships that resonate with your audience.",
  },
]

export function CreatorStories() {
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
        <SectionHeader
          eyebrow="Creator Stories"
          headline="For every"
          headlineHighlight="creator"
          description="from first posts to fame and fortune"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.div key={story.title} variants={prefersReducedMotion ? cardReduced : cardFadeUp}>
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* Image placeholder */}
                  <div className="mb-6 h-56 rounded-lg bg-muted/20 flex items-center justify-center">
                    <story.icon className="h-10 w-10 text-muted-foreground/30" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-heading text-xl font-bold">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.description}
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
