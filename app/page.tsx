import { Hero } from "@/components/home/hero"
import { BrandScroller } from "@/components/home/brand-scroller"
import { ValueProps } from "@/components/home/value-props"
import { Features } from "@/components/home/features"
import { ForEveryCreator } from "@/components/home/for-every-creator"
import { HowItWorks } from "@/components/home/how-it-works"
import { Roadmap } from "@/components/home/roadmap"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandScroller />
      <ValueProps />
      <Features />
      <ForEveryCreator />
      <HowItWorks />
      <Roadmap />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
