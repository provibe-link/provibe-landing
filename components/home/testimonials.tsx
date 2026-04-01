"use client"

import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
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

export function Testimonials() {
  const t = useTranslations("testimonials")

  const testimonials = [
    { name: t("t1Name"), role: t("t1Role"), rating: 5, quote: t("t1Quote"), initials: "SK" },
    { name: t("t2Name"), role: t("t2Role"), rating: 5, quote: t("t2Quote"), initials: "DO" },
    { name: t("t3Name"), role: t("t3Role"), rating: 5, quote: t("t3Quote"), initials: "LM" },
    { name: t("t4Name"), role: t("t4Role"), rating: 5, quote: t("t4Quote"), initials: "RP" },
    { name: t("t5Name"), role: t("t5Role"), rating: 5, quote: t("t5Quote"), initials: "ZA" },
    { name: t("t6Name"), role: t("t6Role"), rating: 4, quote: t("t6Quote"), initials: "TB" },
    { name: t("t7Name"), role: t("t7Role"), rating: 5, quote: t("t7Quote"), initials: "MT" },
    { name: t("t8Name"), role: t("t8Role"), rating: 5, quote: t("t8Quote"), initials: "CR" },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineHighlight={t("headlineHighlight")}
        />

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <GradientCard className="h-full">
                  <div className="flex h-full flex-col space-y-4">
                    {/* Rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Quote */}
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </GradientCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
