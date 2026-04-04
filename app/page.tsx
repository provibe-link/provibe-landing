import { Hero } from "@/components/home/hero"
import { ProblemStatement } from "@/components/home/problem-statement"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Roadmap } from "@/components/home/roadmap"
import { FoundersNote } from "@/components/home/founders-note"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <Features />
      <HowItWorks />
      <Roadmap />
      <FoundersNote />
      <FAQ />
      <CTA />
    </>
  )
}
