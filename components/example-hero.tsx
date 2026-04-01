/**
 * EXAMPLE: Lovable-Level Hero Component
 *
 * This demonstrates the frontend-design principles:
 * - Bold, distinctive typography
 * - Atmospheric backgrounds with gradients and effects
 * - Staggered animations for high-impact page load
 * - Unexpected spatial composition
 * - Visual details (grain, glow, glass effects)
 *
 * To use this as a reference:
 * 1. Always invoke the frontend-design skill before creating UI
 * 2. Choose a clear aesthetic direction (this one: "refined brutalism")
 * 3. Avoid generic choices - make bold, memorable decisions
 * 4. Add motion and micro-interactions
 * 5. Polish every detail
 */

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function ExampleHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, oklch(0.7 0.2 280) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, oklch(0.6 0.25 200) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, oklch(0.65 0.15 320) 0%, transparent 50%)
            `
          }}
        />

        {/* Animated gradient orb */}
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-[rotate-slow_20s_linear_infinite]"
          style={{
            background: "linear-gradient(45deg, oklch(0.7 0.25 280), oklch(0.65 0.2 200))"
          }}
        />

        {/* Grain texture */}
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Content with staggered reveal */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow text */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-primary/20 animate-[slide-in-stagger_0.6s_ease-out]"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <Sparkles className="w-4 h-4 text-primary animate-[glow-pulse_2s_ease-in-out_infinite]" />
            <span className="text-sm font-medium text-foreground/80">
              Next-gen landing page
            </span>
          </div>

          {/* Main headline - staggered animation */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
            <span
              className="block animate-[slide-in-stagger_0.8s_ease-out] bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              Build with
            </span>
            <span
              className="block animate-[slide-in-stagger_0.8s_ease-out] bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              Distinction
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl leading-relaxed animate-[slide-in-stagger_0.8s_ease-out]"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            Create interfaces that people remember. Bold choices, exceptional details,
            lovable experiences.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 animate-[slide-in-stagger_0.8s_ease-out]"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-lg shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer effect on hover */}
              <div
                className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[shimmer_2s_linear_infinite]"
                style={{ backgroundSize: "200% 100%" }}
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg glass-strong hover:bg-foreground/5 transition-all duration-300"
            >
              View Examples
            </Button>
          </div>
        </div>

        {/* Decorative floating element */}
        <div
          className="absolute bottom-20 right-20 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm border border-primary/30 animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </section>
  )
}

/**
 * IMPLEMENTATION NOTES:
 *
 * This example uses "refined brutalism" aesthetic:
 * - Bold, oversized typography
 * - Soft atmospheric gradients
 * - Glass morphism elements
 * - Subtle grain texture
 * - Staggered reveal animations
 *
 * When creating your own components:
 * 1. Choose a DIFFERENT aesthetic direction - don't copy this
 * 2. Use the frontend-design skill to guide your choices
 * 3. Make it memorable and distinctive
 * 4. Polish every detail until it's lovable
 *
 * Every component should feel intentionally designed, not templated.
 */
