"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ArrowRight, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GradientCard } from "@/components/shared/gradient-card"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { cn } from "@/lib/utils"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  read_time: string | null
  featured: boolean
  created_at: Date
  published_at: Date | null
  category: { id: number; name: string; slug: string } | null
}

const categoryColors: Record<string, string> = {
  "Monetization": "bg-primary/10 text-primary",
  "Growth": "bg-green-500/10 text-green-500",
  "Brand Deals": "bg-pink/10 text-pink",
  "Tools & Tips": "bg-primary/10 text-primary",
  "Platform Updates": "bg-blue-500/10 text-blue-500",
}

// Map filter keys to category slugs
const filterToSlug: Record<string, string> = {
  monetization: "monetization",
  growth: "growth",
  brandDeals: "brand-deals",
  toolsTips: "tools-tips",
}

export function BlogsContent({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const t = useTranslations("blog")

  const categories = [
    { key: "all", label: t("categoryAll") },
    { key: "monetization", label: t("categoryMonetization") },
    { key: "growth", label: t("categoryGrowth") },
    { key: "brandDeals", label: t("categoryBrandDeals") },
    { key: "toolsTips", label: t("categoryToolsTips") },
  ]

  const featured = posts.find((p) => p.featured)
  const filteredPosts = posts
    .filter((p) => !p.featured)
    .filter((p) => {
      if (activeCategory === "all") return true
      const slugMatch = filterToSlug[activeCategory]
      return p.category?.slug === slugMatch
    })
    .filter((p) =>
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt ?? "").toLowerCase().includes(search.toLowerCase())
    )

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay className="-z-10" />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("heroTitle")} <span className="gradient-text">{t("heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.key
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && activeCategory === "all" && search === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link href={`/blogs/${featured.slug}`}>
                <GradientCard className="group">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", categoryColors[featured.category?.name ?? ""] ?? "bg-primary/10 text-primary")}>
                          {featured.category?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{t("featured")}</span>
                      </div>
                      <h2 className="font-heading text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featured.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.read_time}
                        </span>
                      </div>
                    </div>
                    {featured.cover_image && (
                      <div className="relative hidden h-48 w-64 overflow-hidden rounded-xl md:block">
                        <Image src={featured.cover_image} alt={featured.title} fill className="object-cover" sizes="256px" />
                      </div>
                    )}
                  </div>
                </GradientCard>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory + search}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={cardFadeUp}>
                <Link href={`/blogs/${post.slug}`}>
                  <GradientCard className="group h-full">
                    <div className="flex h-full flex-col">
                      {/* Thumbnail */}
                      {post.cover_image && (
                        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg">
                          <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                        </div>
                      )}

                      {/* Category */}
                      <span className={cn("mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium", categoryColors[post.category?.name ?? ""] ?? "bg-primary/10 text-primary")}>
                        {post.category?.name}
                      </span>

                      {/* Title */}
                      <h3 className="mb-2 font-heading text-lg font-bold transition-colors group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                        <span>{formatDate(post.published_at)}</span>
                        <span>•</span>
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </GradientCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">{t("noPostsFound")}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSearch(""); setActiveCategory("all") }}
              >
                {t("clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
