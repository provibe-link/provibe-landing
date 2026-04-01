"use client"

import { motion, Variants } from "framer-motion"
import {
  Video,
  Camera,
  PenTool,
  Music,
  Palette,
  Dumbbell,
} from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const creatorTypes = [
  {
    icon: Video,
    title: "Video Creators",
    subtitle: "YouTube, TikTok, Reels",
  },
  {
    icon: Camera,
    title: "Photographers",
    subtitle: "Portfolios & prints",
  },
  {
    icon: PenTool,
    title: "Writers & Bloggers",
    subtitle: "Newsletters & ebooks",
  },
  {
    icon: Music,
    title: "Musicians",
    subtitle: "Merch & streaming",
  },
  {
    icon: Palette,
    title: "Artists & Designers",
    subtitle: "Digital art & commissions",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Coaches",
    subtitle: "Programs & bookings",
  },
]

export function ForEveryCreator() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Built For You"
          headline="For Every"
          headlineHighlight="Creator"
          description="No matter your niche, audience size, or goals — ProVibe adapts to how you create."
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
        >
          {creatorTypes.map((creator) => (
            <motion.div
              key={creator.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              className="group rounded-xl border border-border bg-primary/[0.03] p-6 text-center transition-colors hover:border-primary hover:bg-primary/[0.06]"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <creator.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold sm:text-base">
                {creator.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {creator.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
