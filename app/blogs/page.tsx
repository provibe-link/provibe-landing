import { Metadata } from "next"
import { BlogsContent } from "./content"

export const metadata: Metadata = {
  title: "ProVibe Blog - Tips & Insights for Creators",
  description: "Creator tips, brand partnership guides, and platform updates from the ProVibe team.",
}

export default function BlogsPage() {
  return <BlogsContent />
}
