"use client"

import { motion } from "framer-motion"
import { Rocket, Sparkles, Star } from "lucide-react"
import { useReducedMotion } from "@/lib/animations/hooks"

interface EarlyJoinGraphicProps {
  size?: "sm" | "lg"
}

export function EarlyJoinGraphic({ size = "sm" }: EarlyJoinGraphicProps) {
  const reduced = useReducedMotion()
  const dimension = size === "lg" ? 240 : 160

  const floatAnim = reduced
    ? {}
    : {
        y: [0, -6, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      }

  const rotateAnim = reduced
    ? {}
    : {
        rotate: [0, 360],
        transition: {
          duration: 24,
          repeat: Infinity,
          ease: "linear" as const,
        },
      }

  return (
    <div
      className="relative mx-auto"
      style={{ width: dimension, height: dimension }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #fa6f62 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-3 rounded-full border border-primary/30"
        animate={rotateAnim}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(250,111,98,0.05) 0deg, rgba(250,111,98,0.35) 120deg, rgba(255,138,122,0.15) 240deg, rgba(250,111,98,0.05) 360deg)",
        }}
      >
        <div
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(250,111,98,0.9)]"
        />
        <div
          className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#ff8a7a] shadow-[0_0_10px_rgba(255,138,122,0.9)]"
        />
        <div
          className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/70"
        />
        <div
          className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a7a]/80"
        />
      </motion.div>

      <div className="absolute inset-8 rounded-full border border-primary/20 bg-background/40 backdrop-blur-sm" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={floatAnim}
      >
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fa6f62] via-[#ff8a7a] to-[#e55548] shadow-[0_8px_40px_-8px_rgba(250,111,98,0.8)]">
          <Rocket
            className="h-10 w-10 text-white"
            strokeWidth={2.2}
            style={{ transform: "rotate(-30deg)" }}
          />
          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.9)]" />
          <Star
            className="absolute -bottom-2 -left-2 h-4 w-4 fill-white text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          />
        </div>
      </motion.div>
    </div>
  )
}
