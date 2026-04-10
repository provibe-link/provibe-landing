import { Metadata } from "next"
import { CreatorsContent } from "./content"

export const metadata: Metadata = {
  title: "ProVibe for Creators - Your Creator Storefront",
  description:
    "Build your creator storefront, sell products, accept bookings, and connect with brands. Join 10K+ creators on ProVibe.",
}

export default function CreatorsPage() {
  return <CreatorsContent />
}
