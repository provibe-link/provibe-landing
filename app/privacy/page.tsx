import { Metadata } from "next"
import { PrivacyContent } from "./content"

export const metadata: Metadata = {
  title: "Privacy Policy - ProVibe",
  description:
    "How ProVibe collects, uses, and protects your personal information as a creator business platform.",
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
