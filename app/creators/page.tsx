import { Metadata } from "next"
import { CreatorsHero } from "./sections/hero"
import { ValueProps } from "./sections/value-props"
import { FeatureDeepDive } from "./sections/feature-deep-dive"
import { CreatorShowcase } from "./sections/creator-showcase"
import { Pricing } from "./sections/pricing"
import { CTA } from "@/components/home/cta"

export const metadata: Metadata = {
  title: "ProVibe for Creators - Build Your Brand",
  description: "Create stunning bio pages, connect with brands, and discover events. Join 10K+ creators on ProVibe.",
}

export default function CreatorsPage() {
  return (
    <>
      <CreatorsHero />
      <ValueProps />
      <FeatureDeepDive />
      <CreatorShowcase />
      <Pricing />
      <CTA />
    </>
  )
}
