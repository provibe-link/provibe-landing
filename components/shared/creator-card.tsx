"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GradientCard } from "./gradient-card"

interface CreatorCardProps {
  name: string
  niche: string
  avatar: string
  stats: { followers: number; engagement: number }
  featured?: boolean
  className?: string
}

export function CreatorCard({
  name,
  niche,
  avatar,
  stats,
  featured = false,
  className,
}: CreatorCardProps) {
  return (
    <GradientCard
      variant={featured ? "glass" : "default"}
      className={cn("group cursor-pointer", className)}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Avatar */}
        <div className="relative">
          <motion.div
            className="relative h-24 w-24 overflow-hidden rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={avatar}
              alt={name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </motion.div>

          {featured && (
            <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-primary to-pink px-2 py-1 text-xs font-bold text-white">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{niche}</p>
        </div>

        {/* Stats */}
        <div className="flex w-full justify-around border-t border-border pt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" />
              {stats.followers >= 1000
                ? `${(stats.followers / 1000).toFixed(stats.followers % 1000 === 0 ? 0 : 1)}K`
                : stats.followers}
            </div>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-pink" />
              {stats.engagement}%
            </div>
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
        </div>
      </div>
    </GradientCard>
  )
}
