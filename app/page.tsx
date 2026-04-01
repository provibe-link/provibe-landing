import { Hero } from "@/components/home/hero"
import { BrandScroller } from "@/components/home/brand-scroller"
import { Features } from "@/components/home/features"
import { Features2 } from "@/components/home/features2"
import { CreatorStories } from "@/components/home/creator-stories"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandScroller />
      <Features />
      <Features2 />
      <CreatorStories />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
