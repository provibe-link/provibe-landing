import { Metadata } from "next"
import { CreatorsContent } from "./content"

export const metadata: Metadata = {
  title: "ProVibe for Creators - Build Your Brand",
  description:
    "Create stunning bio pages, connect with brands, and discover events. Join 10K+ creators on ProVibe.",
}

export default function CreatorsPage() {
  return <CreatorsContent />
}
