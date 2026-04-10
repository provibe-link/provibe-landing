import { Metadata } from "next"
import { TermsContent } from "./content"

export const metadata: Metadata = {
  title: "Terms & Conditions - ProVibe",
  description:
    "The rules for using ProVibe as a creator, brand, or event organizer on our creator business platform.",
}

export default function TermsPage() {
  return <TermsContent />
}
