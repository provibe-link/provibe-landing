"use client"

import { motion } from "framer-motion"
import { Palette, BarChart3, Globe } from "lucide-react"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"

const features = [
  {
    icon: Palette,
    title: "Bio Page Builder",
    description: "Design your perfect bio page with our drag-and-drop builder. Choose from premium templates, customize colors and fonts, and showcase your content beautifully.",
    highlights: ["Drag & drop editor", "50+ premium templates", "Custom domains", "Dark/light themes"],
    align: "left" as const,
  },
  {
    icon: BarChart3,
    title: "Brand Discovery Dashboard",
    description: "Get matched with brands that align with your niche and audience. Track partnership opportunities, manage campaigns, and grow your income.",
    highlights: ["AI-powered matching", "Campaign analytics", "Invoice management", "Revenue tracking"],
    align: "right" as const,
  },
  {
    icon: Globe,
    title: "Events & Community",
    description: "Find events near you, connect with creators in your area, and build meaningful relationships that fuel your growth.",
    highlights: ["Location-based discovery", "Event hosting tools", "Creator networking", "Community forums"],
    align: "left" as const,
  },
]

export function FeatureDeepDive() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Feature Deep Dive"
          headline="Powerful Tools for"
          headlineHighlight="Modern Creators"
          description="Everything you need to build, grow, and monetize your creator brand."
        />

        <div className="space-y-24">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              variant={feature.align === "left" ? "slide-left" : "slide-right"}
            >
              <div className={`flex flex-col gap-12 md:flex-row md:items-center ${
                feature.align === "right" ? "md:flex-row-reverse" : ""
              }`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-pink">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold md:text-3xl">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Placeholder */}
                <div className="flex-1">
                  <div className="aspect-[4/3] rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-pink/5 flex items-center justify-center">
                    <feature.icon className="h-16 w-16 text-primary/20" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
