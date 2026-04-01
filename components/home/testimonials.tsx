"use client"

import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GradientCard } from "@/components/shared/gradient-card"
import { SectionHeader } from "@/components/shared/section-header"

const testimonials = [
  {
    name: "Sarah Kim",
    role: "Beauty Creator",
    rating: 5,
    quote: "ProVibe's bio page builder is incredible. My conversion rate doubled within the first week.",
    initials: "SK",
  },
  {
    name: "David Okonkwo",
    role: "Music Producer",
    rating: 5,
    quote: "Finally, a platform that actually connects me with brands that match my vibe. No more cold DMs.",
    initials: "DO",
  },
  {
    name: "Luna Martinez",
    role: "Travel Blogger",
    rating: 5,
    quote: "The events feature helped me meet 50+ creators in my city. My network has never been stronger.",
    initials: "LM",
  },
  {
    name: "Ryan Park",
    role: "Fitness Coach",
    rating: 5,
    quote: "I replaced 4 different tools with ProVibe. Everything I need in one beautiful dashboard.",
    initials: "RP",
  },
  {
    name: "Zara Ahmed",
    role: "Fashion Influencer",
    rating: 5,
    quote: "Brands reach out to ME now. ProVibe completely changed how I approach partnerships.",
    initials: "ZA",
  },
  {
    name: "Tyler Brooks",
    role: "Tech Reviewer",
    rating: 4,
    quote: "Setup took literally 2 minutes. The templates are gorgeous and the analytics are super helpful.",
    initials: "TB",
  },
  {
    name: "Mia Thompson",
    role: "Art & Design",
    rating: 5,
    quote: "My bio page is basically my portfolio now. Clients love it and I've landed 3 freelance gigs.",
    initials: "MT",
  },
  {
    name: "Carlos Ruiz",
    role: "Comedy Creator",
    rating: 5,
    quote: "The community aspect is what sets ProVibe apart. I've collabed with creators I never would have found.",
    initials: "CR",
  },
]

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
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Testimonials"
          headline="Loved by"
          headlineHighlight="Creators Everywhere"
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
                <GradientCard variant="solid" hoverEffect={false} className="h-full">
                  <div className="flex h-full flex-col space-y-4">
                    {/* Rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Quote */}
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-sm font-bold text-white">
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
