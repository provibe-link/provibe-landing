import { Metadata } from "next"
import { AboutContent } from "./content"

export const metadata: Metadata = {
  title: "About ProVibe - Our Story & Mission",
  description: "Learn about ProVibe's mission to empower creators with tools to build their brand and connect with opportunities.",
}

export default function AboutPage() {
  return <AboutContent />
}
