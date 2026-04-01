import { Metadata } from "next"
import { BrandsContent } from "./content"

export const metadata: Metadata = {
  title: "ProVibe for Brands - Find Authentic Creators",
  description: "Connect with 10K+ creators for authentic brand partnerships. Smart matching, campaign management, measurable results.",
}

export default function BrandsPage() {
  return <BrandsContent />
}
