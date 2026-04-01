"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import {
  TrendingUp,
  MessageCircle,
  ShoppingBag,
  Users,
  Heart,
  Star,
  BarChart3,
  Zap,
} from "lucide-react"

interface FloatingCardsProps {
  scrollProgress: MotionValue<number>
}

/*
 * Cards start hidden at the phone center (opacity 0, x/y near 0).
 * On scroll they burst outward to their final resting positions.
 *
 * The parent is full viewport width with overflow-x-clip, so cards
 * can spread wide. Phone is z-20; cards are z-[1]–z-[5].
 */

export function FloatingCards({ scrollProgress }: FloatingCardsProps) {
  // ── Wave 1: top pair — lands near top of phone ──
  const l1x = useTransform(scrollProgress, [0.03, 0.18], [0, -420])
  const l1y = useTransform(scrollProgress, [0.03, 0.18], [0, -20])
  const l1o = useTransform(scrollProgress, [0.0, 0.03], [0, 1])
  const l1s = useTransform(scrollProgress, [0.03, 0.18], [0.7, 1])
  const l1r = useTransform(scrollProgress, [0.03, 0.18], [0, -3])

  const r1x = useTransform(scrollProgress, [0.03, 0.18], [0, 420])
  const r1y = useTransform(scrollProgress, [0.03, 0.18], [0, -40])
  const r1o = useTransform(scrollProgress, [0.0, 0.03], [0, 1])
  const r1s = useTransform(scrollProgress, [0.03, 0.18], [0.7, 1])
  const r1r = useTransform(scrollProgress, [0.03, 0.18], [0, 3])

  // ── Wave 2: mid pair — lands at phone middle ──
  const l2x = useTransform(scrollProgress, [0.06, 0.22], [0, -450])
  const l2y = useTransform(scrollProgress, [0.06, 0.22], [230, 220])
  const l2o = useTransform(scrollProgress, [0.02, 0.06], [0, 1])
  const l2s = useTransform(scrollProgress, [0.06, 0.22], [0.7, 1])
  const l2r = useTransform(scrollProgress, [0.06, 0.22], [0, -5])

  const r2x = useTransform(scrollProgress, [0.06, 0.22], [0, 440])
  const r2y = useTransform(scrollProgress, [0.06, 0.22], [230, 240])
  const r2o = useTransform(scrollProgress, [0.02, 0.06], [0, 1])
  const r2s = useTransform(scrollProgress, [0.06, 0.22], [0.7, 1])
  const r2r = useTransform(scrollProgress, [0.06, 0.22], [0, 5])

  // ── Wave 3: bottom pair — lands near phone bottom ──
  const l3x = useTransform(scrollProgress, [0.10, 0.28], [0, -380])
  const l3y = useTransform(scrollProgress, [0.10, 0.28], [470, 460])
  const l3o = useTransform(scrollProgress, [0.06, 0.10], [0, 1])
  const l3s = useTransform(scrollProgress, [0.10, 0.28], [0.7, 1])
  const l3r = useTransform(scrollProgress, [0.10, 0.28], [0, -4])

  const r3x = useTransform(scrollProgress, [0.10, 0.28], [0, 390])
  const r3y = useTransform(scrollProgress, [0.10, 0.28], [470, 480])
  const r3o = useTransform(scrollProgress, [0.06, 0.10], [0, 1])
  const r3s = useTransform(scrollProgress, [0.10, 0.28], [0.7, 1])
  const r3r = useTransform(scrollProgress, [0.10, 0.28], [0, 4])

  // ── Wave 4: extra depth cards — land between top & mid ──
  const elx = useTransform(scrollProgress, [0.12, 0.30], [0, -480])
  const ely = useTransform(scrollProgress, [0.12, 0.30], [105, 100])
  const elo = useTransform(scrollProgress, [0.08, 0.12], [0, 1])
  const els = useTransform(scrollProgress, [0.12, 0.30], [0.7, 1])
  const elr = useTransform(scrollProgress, [0.12, 0.30], [0, -8])

  const erx = useTransform(scrollProgress, [0.12, 0.30], [0, 470])
  const ery = useTransform(scrollProgress, [0.12, 0.30], [105, 110])
  const ero = useTransform(scrollProgress, [0.08, 0.12], [0, 1])
  const ers = useTransform(scrollProgress, [0.12, 0.30], [0.7, 1])
  const err = useTransform(scrollProgress, [0.12, 0.30], [0, 6])

  return (
    <div className="absolute inset-0 pointer-events-none scale-[0.55] sm:scale-100 origin-top">
      {/* ── LEFT SIDE ── */}

      {/* Brand collab notification */}
      <motion.div
        style={{ x: l1x, y: l1y, opacity: l1o, scale: l1s, rotate: l1r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[5]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-4 w-[220px]">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/40 flex-shrink-0 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold font-heading">
                A brand wants to collaborate!
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Let&apos;s talk!
              </p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-right mt-2">May 18</p>
        </div>
      </motion.div>

      {/* Sales stats */}
      <motion.div
        style={{ x: l2x, y: l2y, opacity: l2o, scale: l2s, rotate: l2r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[4]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-4 w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">My sales</span>
          </div>
          <p className="text-2xl font-bold font-heading">500</p>
          <p className="text-[10px] text-muted-foreground">Dec 1 - 7</p>
          <div className="flex items-end gap-1 mt-2 h-8">
            {[40, 60, 30, 80, 55, 70, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Follower growth */}
      <motion.div
        style={{ x: l3x, y: l3y, opacity: l3o, scale: l3s, rotate: l3r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[3]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-3.5 w-[190px]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-medium text-foreground">New followers</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold font-heading">+2,847</p>
            <span className="text-[10px] font-medium text-emerald-500">+18%</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">This week</p>
        </div>
      </motion.div>

      {/* ── RIGHT SIDE ── */}

      {/* Earnings chart */}
      <motion.div
        style={{ x: r1x, y: r1y, opacity: r1o, scale: r1s, rotate: r1r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[5]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-4 w-[220px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Total earnings</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <p className="text-xl font-bold font-heading">$126,202</p>
          <div className="mt-2 h-12 flex items-end">
            <svg
              viewBox="0 0 100 30"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#hero-chart-grad)"
                stroke="none"
                points="0,28 10,25 20,22 30,24 40,18 50,20 60,15 70,12 80,8 90,5 100,2 100,30 0,30"
              />
              <polyline
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.5"
                points="0,28 10,25 20,22 30,24 40,18 50,20 60,15 70,12 80,8 90,5 100,2"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Auto-reply card */}
      <motion.div
        style={{ x: r2x, y: r2y, opacity: r2o, scale: r2s, rotate: r2r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[4]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-4 w-[240px]">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/40 flex-shrink-0" />
            <div>
              <p className="text-[11px] text-foreground">
                Thanks for your comment! Download your free workout plan here
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1">
                <BarChart3 className="h-3 w-3 text-primary-foreground" />
                <span className="text-[10px] font-medium text-primary-foreground">
                  Download now
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Engagement rate */}
      <motion.div
        style={{ x: r3x, y: r3y, opacity: r3o, scale: r3s, rotate: r3r }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[3]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-3.5 w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-3.5 w-3.5 text-destructive" />
            <span className="text-[11px] font-medium text-foreground">
              Engagement rate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold font-heading">8.4%</p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Top 5% in your niche</p>
        </div>
      </motion.div>

      {/* ── EXTRA DEPTH CARDS ── */}

      {/* Product card */}
      <motion.div
        style={{ x: elx, y: ely, opacity: elo, scale: els, rotate: elr }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[2]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-3 w-[180px]">
          <div className="h-20 rounded-lg bg-primary/10 mb-2 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary/40" />
          </div>
          <p className="text-[11px] font-semibold font-heading">
            ULTIMATE Workout Program
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-sm font-bold font-heading">$250</span>
            <span className="text-[9px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
              Download now
            </span>
          </div>
        </div>
      </motion.div>

      {/* AI match */}
      <motion.div
        style={{ x: erx, y: ery, opacity: ero, scale: ers, rotate: err }}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-[2]"
      >
        <div className="floating-card rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md  p-3.5 w-[185px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[11px] font-semibold font-heading">AI Match Found</span>
          </div>
          <p className="text-[10px] text-muted-foreground">98% brand compatibility</p>
          <div className="mt-2 w-full h-1.5 rounded-full bg-muted">
            <div className="h-full w-[98%] rounded-full bg-primary" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
