"use client"

import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Zap, DollarSign, Handshake } from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { GradientCard } from "@/components/shared/gradient-card"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"
import { useTranslations } from "next-intl"

export function ValueProps() {
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("valueProps")

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  const props = [
    {
      icon: Zap,
      title: t("startFastTitle"),
      description: t("startFastDesc"),
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    },
    {
      icon: DollarSign,
      title: t("earnIncomeTitle"),
      description: t("earnIncomeDesc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      icon: Handshake,
      title: t("workWithBrandsTitle"),
      description: t("workWithBrandsDesc"),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
          description={t("description")}
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {props.map((prop) => (
            <motion.div
              key={prop.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
            >
              <GradientCard className="h-full">
                <div className="flex h-full flex-col">
                  {/* Image */}
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-heading text-xl font-bold">
                    {prop.title}
                  </h3>
                  <p className="flex-1 text-muted-foreground">
                    {prop.description}
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
