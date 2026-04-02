import { FileText, FolderOpen, Tags, Users } from "lucide-react"
import { prisma } from "@/lib/prisma"

const statCards = [
  { label: "Posts", icon: FileText, countKey: "posts" as const },
  { label: "Categories", icon: FolderOpen, countKey: "categories" as const },
  { label: "Tags", icon: Tags, countKey: "tags" as const },
  { label: "Waitlist Entries", icon: Users, countKey: "waitlist" as const },
]

export default async function AdminDashboardPage() {
  const [posts, categories, tags, waitlist] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.waitlistEntry.count(),
  ])

  const counts = { posts, categories, tags, waitlist }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Overview of your content and audience.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {card.label}
              </span>
              <card.icon className="size-5 text-muted-foreground" />
            </div>
            <p className="font-display mt-3 text-3xl font-bold">
              {counts[card.countKey]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
