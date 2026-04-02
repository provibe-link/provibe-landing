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
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  read_time: string | null
  featured: boolean
  created_at: Date
  published_at: Date | null
  category: { id: number; name: string; slug: string } | null
}

interface RelatedPost {
  id: number
  title: string
  slug: string
  cover_image: string | null
  read_time: string | null
  category: { id: number; name: string; slug: string } | null
}

const categoryColors: Record<string, string> = {
  "Monetization": "bg-primary/10 text-primary",
  "Growth": "bg-green-500/10 text-green-500",
  "Brand Deals": "bg-pink/10 text-pink",
  "Tools & Tips": "bg-primary/10 text-primary",
  "Platform Updates": "bg-blue-500/10 text-blue-500",
}

export function BlogPostContent({ post, slug, relatedPosts }: { post: BlogPost; slug: string; relatedPosts: RelatedPost[] }) {
  const t = useTranslations("blog")

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
            <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", categoryColors[post.category?.name ?? ""] ?? "bg-primary/10 text-primary")}>
              {post.category?.name}
            </span>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.read_time} {t("read")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {post.cover_image && (
        <div className="container mx-auto max-w-3xl px-6">
          <div className="relative -mt-8 mb-12 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="pb-16">
        <div className="container mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {post.content && (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </motion.div>
        </div>
      </article>

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
      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <h3 className="mb-8 text-center font-heading text-2xl font-bold">{t("relatedPosts")}</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blogs/${related.slug}`}>
                  <GradientCard className="group h-full">
                    {related.cover_image && (
                      <div className="relative h-32 w-full overflow-hidden rounded-lg mb-4">
                        <Image src={related.cover_image} alt={related.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium mb-3", categoryColors[related.category?.name ?? ""] ?? "bg-primary/10 text-primary")}>
                      {related.category?.name}
                    </span>
                    <h4 className="font-heading font-bold transition-colors group-hover:text-primary line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground">{related.read_time} {t("read")}</p>
                  </GradientCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
