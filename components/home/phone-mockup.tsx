"use client"

import { motion } from "framer-motion"
import { Globe, CirclePlay, Heart, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function PhoneMockup() {
  const t = useTranslations("phoneMockup")

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-[340px] sm:w-[340px] lg:w-[380px]"
    >
      {/* Phone frame — warm rose-gold bezel */}
      <div
        className="overflow-hidden rounded-[2.5rem] border-[6px]"
        style={{
          borderColor: "hsl(350, 40%, 35%)",
          backgroundColor: "hsl(350, 40%, 35%)",
        }}
      >
        {/* Notch */}
        <div className="relative">
          <div
            className="absolute top-0 left-1/2 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl"
            style={{ backgroundColor: "hsl(350, 40%, 35%)" }}
          />
        </div>

        {/* Screen content */}
        <div className="relative bg-primary">
          {/* Creator profile area */}
          <div className="relative flex flex-col items-center pt-10 pb-3">
            {/* Profile image */}
            <div className="relative h-[280px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-primary-dark" />
              {/* Gradient avatar — intentional abstract design */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div
                  className="h-[82%] w-[65%] rounded-t-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.05) 100%)",
                  }}
                />
              </div>
              {/* Decorative sparkles */}
              <div className="absolute top-6 right-6 h-2 w-2 animate-pulse rounded-full bg-white/60" />
              <div
                className="absolute top-14 left-8 h-1.5 w-1.5 animate-pulse rounded-full bg-white/40"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute right-10 bottom-20 h-1 w-1 animate-pulse rounded-full bg-white/50"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Creator name */}
            <div className="mt-3 px-4 text-center">
              <p className="font-heading text-base font-semibold text-white">
                {t("handle")}
              </p>
              <p className="mt-0.5 text-[10px] text-white/60">
                {t("tagline")}
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-5 py-3">
            {[Globe, CirclePlay, MessageCircle].map((Icon, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>
            ))}
          </div>

          {/* Shop section */}
          <div className="px-4 pb-4">
            <p className="mb-3 text-center font-heading text-sm font-semibold text-white">
              {t("shopTitle")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: t("product1"), count: t("product1Count") },
                { label: t("product2"), count: t("product2Count") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/15 p-3 text-center backdrop-blur-sm"
                >
                  <div className="mb-2 flex h-14 items-center justify-center rounded-lg bg-white/10">
                    <Heart className="h-4 w-4 text-white/30" />
                  </div>
                  <p className="text-[11px] font-medium text-white">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-white/50">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliate link section */}
          <div className="px-4 pb-6">
            <p className="mb-2 text-center font-heading text-sm font-semibold text-white">
              {t("affiliateTitle")}
            </p>
            <div className="rounded-xl bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-mono text-sm font-bold tracking-[0.2em] text-white">
                {t("affiliateCode")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
