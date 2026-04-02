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

const posts = [
  {
    slug: "10-tips-grow-creator-brand",
    title: "10 Tips to Grow Your Creator Brand in 2024",
    excerpt: "Discover proven strategies that top creators use to build their personal brand and attract loyal followers.",
    category: "Creator Tips",
    author: "Maya Thompson",
    date: "Mar 28, 2024",
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop",
  },
  {
    slug: "brand-partnership-guide",
    title: "The Ultimate Guide to Brand Partnerships",
    excerpt: "Everything you need to know about landing your first brand deal and building long-term partnerships.",
    category: "Brand Partnerships",
    author: "Alex Rivera",
    date: "Mar 25, 2024",
    readTime: "8 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  {
    slug: "bio-page-optimization",
    title: "Optimize Your Bio Page for Maximum Conversions",
    excerpt: "Learn how to design a bio page that converts visitors into followers, subscribers, and customers.",
    category: "Creator Tips",
    author: "Jordan Kim",
    date: "Mar 22, 2024",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
  {
    slug: "creator-events-networking",
    title: "How Creator Events Can Transform Your Career",
    excerpt: "From local meetups to industry conferences — why in-person networking is still king for creators.",
    category: "Events & Community",
    author: "Lucia Santos",
    date: "Mar 18, 2024",
    readTime: "4 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
  },
  {
    slug: "monetization-strategies",
    title: "5 Monetization Strategies Beyond Sponsorships",
    excerpt: "Diversify your income with these proven revenue streams that top creators swear by.",
    category: "Creator Tips",
    author: "Ryan Chang",
    date: "Mar 15, 2024",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
  },
  {
    slug: "provibe-spring-update",
    title: "ProVibe Spring 2024 Update: What's New",
    excerpt: "Exciting new features including AI-powered brand matching, event hosting tools, and redesigned analytics.",
    category: "Platform Updates",
    author: "Samira Patel",
    date: "Mar 12, 2024",
    readTime: "3 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    slug: "content-calendar-template",
    title: "Free Content Calendar Template for Creators",
    excerpt: "Stay organized and consistent with our free content planning template used by 1000+ creators.",
    category: "Creator Tips",
    author: "Maya Thompson",
    date: "Mar 8, 2024",
    readTime: "4 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
  },
  {
    slug: "brand-collaboration-mistakes",
    title: "7 Brand Collaboration Mistakes to Avoid",
    excerpt: "Common pitfalls that new creators face when working with brands and how to navigate them.",
    category: "Brand Partnerships",
    author: "Alex Rivera",
    date: "Mar 5, 2024",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=400&fit=crop",
  },
  {
    slug: "building-community-online",
    title: "Building a Loyal Community from Scratch",
    excerpt: "The secrets behind creators who've built engaged, passionate communities around their content.",
    category: "Events & Community",
    author: "Lucia Santos",
    date: "Mar 1, 2024",
    readTime: "5 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
  },
  {
    slug: "analytics-guide-creators",
    title: "Understanding Your Analytics: A Creator's Guide",
    excerpt: "Which metrics actually matter and how to use data to grow your audience strategically.",
    category: "Creator Tips",
    author: "David Okonkwo",
    date: "Feb 26, 2024",
    readTime: "8 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
]

const categoryColors: Record<string, string> = {
  "Creator Tips": "bg-primary/10 text-primary",
  "Brand Partnerships": "bg-pink/10 text-pink",
  "Events & Community": "bg-green-500/10 text-green-500",
  "Platform Updates": "bg-blue-500/10 text-blue-500",
}

export function BlogsContent() {
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
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) =>
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    )

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
                        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", categoryColors[featured.category])}>
                          {featured.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{t("featured")}</span>
                      </div>
                      <h2 className="font-heading text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {featured.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {featured.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="relative hidden h-48 w-64 overflow-hidden rounded-xl md:block">
                      <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="256px" />
                    </div>
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
                      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg">
                        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>

                      {/* Category */}
                      <span className={cn("mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium", categoryColors[post.category])}>
                        {post.category}
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
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
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
