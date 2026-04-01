import { Metadata } from "next"
import { ContactContent } from "./content"

export const metadata: Metadata = {
  title: "Contact ProVibe - Get in Touch",
  description: "Have questions? We'd love to hear from you. Reach out to the ProVibe team.",
}

export default function ContactPage() {
  return <ContactContent />
}
