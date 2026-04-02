"use client"

import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/shared/section-header"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

interface TestimonialCardProps {
  name: string
  handle: string
  badge: string
  quote: string
  initials: string
  rating: number
}

function TestimonialCard({
  name,
  handle,
  badge,
  quote,
  initials,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="w-[340px] shrink-0 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary">
      {/* Header: avatar + name + badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">{handle}</p>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
          {badge}
        </span>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={rating} />
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

export function Testimonials() {
  const t = useTranslations("testimonials")

  const testimonials = [
    { name: t("t1Name"), handle: t("t1Handle"), badge: t("t1Badge"), rating: 5, quote: t("t1Quote"), initials: "ML" },
    { name: t("t2Name"), handle: t("t2Handle"), badge: t("t2Badge"), rating: 5, quote: t("t2Quote"), initials: "SR" },
    { name: t("t3Name"), handle: t("t3Handle"), badge: t("t3Badge"), rating: 5, quote: t("t3Quote"), initials: "JK" },
    { name: t("t4Name"), handle: t("t4Handle"), badge: t("t4Badge"), rating: 5, quote: t("t4Quote"), initials: "TE" },
    { name: t("t5Name"), handle: t("t5Handle"), badge: t("t5Badge"), rating: 5, quote: t("t5Quote"), initials: "PS" },
    { name: t("t6Name"), handle: t("t6Handle"), badge: t("t6Badge"), rating: 5, quote: t("t6Quote"), initials: "AC" },
  ]

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
          description={t("description")}
        />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
          {doubled.map((testimonial, i) => (
            <TestimonialCard key={`${testimonial.handle}-${i}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
