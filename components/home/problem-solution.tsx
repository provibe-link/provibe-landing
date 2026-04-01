"use client"

import { motion, Variants } from "framer-motion"
import { XCircle, Sparkles, AlertTriangle, Link2Off, EyeOff, Zap, Globe, Handshake, CalendarSearch } from "lucide-react"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"
import { iconBounce, listItem, staggerList } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const problems = [
  { icon: Link2Off, text: "Generic bio links that don't stand out" },
  { icon: EyeOff, text: "Scattered presence across platforms" },
  { icon: AlertTriangle, text: "Missed brand partnership opportunities" },
  { icon: XCircle, text: "No way to discover local events & creators" },
]

const solutions = [
  { icon: Globe, text: "One stunning bio page that showcases everything" },
  { icon: Handshake, text: "Direct connections with brands in your niche" },
  { icon: CalendarSearch, text: "Discover nearby events and meetups" },
  { icon: Zap, text: "Grow your audience with built-in analytics" },
]

export function ProblemSolution() {
  const prefersReducedMotion = useReducedMotion()

  const iconReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  const listReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemReduced: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Why ProVibe?"
          headline="The Creator Economy is"
          headlineHighlight="Broken"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Problem Side */}
          <AnimatedSection variant="slide-left">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <motion.div
                variants={prefersReducedMotion ? iconReduced : iconBounce}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 inline-flex rounded-xl bg-red-500/10 p-3"
              >
                <XCircle className="h-8 w-8 text-red-400" />
              </motion.div>

              <h3 className="mb-6 font-heading text-2xl font-bold text-red-400">
                Struggling to stand out?
              </h3>

              <motion.ul
                variants={prefersReducedMotion ? listReduced : staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {problems.map((problem) => (
                  <motion.li
                    key={problem.text}
                    variants={prefersReducedMotion ? itemReduced : listItem}
                    className="flex items-start gap-3"
                  >
                    <problem.icon className="mt-0.5 h-5 w-5 shrink-0 text-red-400/70" />
                    <span className="text-muted-foreground">{problem.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </AnimatedSection>

          {/* Solution Side */}
          <AnimatedSection variant="slide-right">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <motion.div
                variants={prefersReducedMotion ? iconReduced : iconBounce}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 inline-flex rounded-xl bg-primary/10 p-3"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>

              <h3 className="mb-6 font-heading text-2xl font-bold gradient-text">
                ProVibe solves that
              </h3>

              <motion.ul
                variants={prefersReducedMotion ? listReduced : staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {solutions.map((solution) => (
                  <motion.li
                    key={solution.text}
                    variants={prefersReducedMotion ? itemReduced : listItem}
                    className="flex items-start gap-3"
                  >
                    <solution.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{solution.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
