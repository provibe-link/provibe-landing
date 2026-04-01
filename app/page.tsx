import { Hero } from "@/components/home/hero"
import { ProblemSolution } from "@/components/home/problem-solution"
import { Features } from "@/components/home/features"
import { BrandScroller } from "@/components/home/brand-scroller"
import { HowItWorks } from "@/components/home/how-it-works"
import { SuccessStories } from "@/components/home/success-stories"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <BrandScroller />
      <HowItWorks />
      <SuccessStories />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
