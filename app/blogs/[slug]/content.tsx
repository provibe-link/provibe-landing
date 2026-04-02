"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GradientCard } from "@/components/shared/gradient-card"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { cn } from "@/lib/utils"

interface BlogPost {
  title: string
  excerpt: string
  category: string
  author: { name: string; role: string; bio: string; initials: string }
  date: string
  readTime: string
  content: string[]
}

const categoryColors: Record<string, string> = {
  "Creator Tips": "bg-primary/10 text-primary",
  "Brand Partnerships": "bg-pink/10 text-pink",
  "Events & Community": "bg-green-500/10 text-green-500",
  "Platform Updates": "bg-blue-500/10 text-blue-500",
}

const relatedPosts = [
  { slug: "bio-page-optimization", title: "Optimize Your Bio Page for Maximum Conversions", category: "Creator Tips", readTime: "6 min", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop" },
  { slug: "monetization-strategies", title: "5 Monetization Strategies Beyond Sponsorships", category: "Creator Tips", readTime: "7 min", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop" },
  { slug: "creator-events-networking", title: "How Creator Events Can Transform Your Career", category: "Events & Community", readTime: "4 min", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop" },
]

export function BlogPostContent({ post, slug }: { post: BlogPost; slug: string }) {
  const t = useTranslations("blog")

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay className="-z-10" />
        <div className="container relative mx-auto max-w-3xl px-6">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", categoryColors[post.category] || "bg-primary/10 text-primary")}>
              {post.category}
            </span>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {post.author.initials}
                </div>
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} {t("read")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="container mx-auto max-w-3xl px-6">
        <div className="relative -mt-8 mb-12 aspect-[2/1] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop"
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="pb-16">
        <div className="container mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-10 mb-4 font-heading text-2xl font-bold">
                    {block.replace("## ", "")}
                  </h2>
                )
              }
              return (
                <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                  {block}
                </p>
              )
            })}
          </motion.div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="border-t border-border py-12">
        <div className="container mx-auto max-w-3xl px-6">
          <GradientCard>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                {post.author.initials}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">{post.author.name}</h3>
                <p className="text-sm text-primary">{post.author.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>
          </GradientCard>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border py-12">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h3 className="font-heading text-xl font-bold">{t("newsletterTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("newsletterSubtitle")}</p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <Input type="email" placeholder={t("newsletterPlaceholder")} className="flex-1" />
            <Button className="bg-primary text-white hover:bg-primary/90">{t("newsletterButton")}</Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <h3 className="mb-8 text-center font-heading text-2xl font-bold">{t("relatedPosts")}</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blogs/${related.slug}`}>
                <GradientCard className="group h-full">
                  <div className="relative h-32 w-full overflow-hidden rounded-lg mb-4">
                    <Image src={related.image} alt={related.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium mb-3", categoryColors[related.category] || "bg-primary/10 text-primary")}>
                    {related.category}
                  </span>
                  <h4 className="font-heading font-bold transition-colors group-hover:text-primary line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground">{related.readTime} {t("read")}</p>
                </GradientCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
