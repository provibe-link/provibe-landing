import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: "Monetization", slug: "monetization" },
    { name: "Growth", slug: "growth" },
    { name: "Brand Deals", slug: "brand-deals" },
    { name: "Tools & Tips", slug: "tools-tips" },
    { name: "Platform Updates", slug: "platform-updates" },
    { name: "Creator Economy", slug: "creator-economy" },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
