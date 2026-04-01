"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Briefcase, Quote } from "lucide-react"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"
import { cardScale, staggerContainer } from "@/lib/animations/variants"

const stories = [
  {
    name: "Priya Sharma",
    niche: "Lifestyle & Fashion",
    quote: "ProVibe transformed my online presence. I went from scattered links to a stunning bio page that brands actually notice.",
    stats: {
      followers: { before: "2.3K", after: "15.8K" },
      engagement: { before: "2.1%", after: "8.7%" },
      deals: { before: "1", after: "12" },
    },
    avatar: "/avatars/creator-1.jpg",
  },
  {
    name: "Marcus Chen",
    niche: "Tech & Gaming",
    quote: "Within 3 months, I landed partnerships with 5 gaming brands. The brand connection feature is a game-changer.",
    stats: {
      followers: { before: "5.1K", after: "42K" },
      engagement: { before: "3.4%", after: "11.2%" },
      deals: { before: "0", after: "8" },
    },
    avatar: "/avatars/creator-2.jpg",
  },
  {
    name: "Aisha Williams",
    niche: "Fitness & Wellness",
    quote: "The events feature helped me find my community. I've hosted 6 meetups and grown my local following by 300%.",
    stats: {
      followers: { before: "8.2K", after: "28.5K" },
      engagement: { before: "4.2%", after: "9.8%" },
      deals: { before: "3", after: "15" },
    },
    avatar: "/avatars/creator-3.jpg",
  },
  {
    name: "Jake Rodriguez",
    niche: "Food & Travel",
    quote: "My bio page gets more clicks than all my other links combined. ProVibe is the only creator tool I recommend.",
    stats: {
      followers: { before: "12K", after: "67K" },
      engagement: { before: "5.1%", after: "12.4%" },
      deals: { before: "2", after: "20" },
    },
    avatar: "/avatars/creator-4.jpg",
  },
]

export function SuccessStories() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Real Results"
          headline="Creators Who"
          headlineHighlight="Leveled Up"
          description="See how real creators transformed their online presence with ProVibe."
        />

        {/* Stories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {stories.map((story) => (
            <motion.div key={story.name} variants={cardScale}>
              <GradientCard variant="glass" className="h-full">
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-xl font-bold text-white">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{story.name}</h3>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                        {story.niche}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -left-1 -top-1 h-6 w-6 text-primary/20" />
                    <p className="pl-6 text-sm italic text-muted-foreground leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  {/* Before/After Stats */}
                  <div className="grid grid-cols-3 gap-4 rounded-lg bg-background/50 p-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground">Followers</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground/60 line-through">
                        {story.stats.followers.before}
                      </div>
                      <div className="font-mono text-sm font-bold text-primary">
                        {story.stats.followers.after}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-pink" />
                        <span className="text-xs text-muted-foreground">Engagement</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground/60 line-through">
                        {story.stats.engagement.before}
                      </div>
                      <div className="font-mono text-sm font-bold text-pink">
                        {story.stats.engagement.after}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-foreground" />
                        <span className="text-xs text-muted-foreground">Deals</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground/60 line-through">
                        {story.stats.deals.before}
                      </div>
                      <div className="font-mono text-sm font-bold">
                        {story.stats.deals.after}
                      </div>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
