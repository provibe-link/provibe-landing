"use client"

import { motion } from "framer-motion"
import { CreatorCard } from "@/components/shared/creator-card"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"

const creators = [
  { name: "Priya Sharma", niche: "Lifestyle & Fashion", avatar: "/avatars/1.jpg", stats: { followers: 15800, engagement: 8.7 }, featured: true },
  { name: "Marcus Chen", niche: "Tech & Gaming", avatar: "/avatars/2.jpg", stats: { followers: 42000, engagement: 11.2 }, featured: false },
  { name: "Aisha Williams", niche: "Fitness & Wellness", avatar: "/avatars/3.jpg", stats: { followers: 28500, engagement: 9.8 }, featured: true },
  { name: "Jake Rodriguez", niche: "Food & Travel", avatar: "/avatars/4.jpg", stats: { followers: 67000, engagement: 12.4 }, featured: false },
  { name: "Luna Martinez", niche: "Travel Blogger", avatar: "/avatars/5.jpg", stats: { followers: 19200, engagement: 7.3 }, featured: false },
  { name: "Tyler Brooks", niche: "Tech Reviewer", avatar: "/avatars/6.jpg", stats: { followers: 31000, engagement: 6.9 }, featured: false },
  { name: "Zara Ahmed", niche: "Fashion Influencer", avatar: "/avatars/7.jpg", stats: { followers: 55000, engagement: 10.1 }, featured: true },
  { name: "Ryan Park", niche: "Fitness Coach", avatar: "/avatars/8.jpg", stats: { followers: 22000, engagement: 8.5 }, featured: false },
]

export function CreatorShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Creator Community"
          headline="Join"
          headlineHighlight="Amazing Creators"
          description="Discover creators from every niche building their brand on ProVibe."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {creators.map((creator) => (
            <motion.div key={creator.name} variants={cardFadeUp}>
              <CreatorCard {...creator} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
