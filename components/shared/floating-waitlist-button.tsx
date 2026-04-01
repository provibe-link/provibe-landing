"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket } from "lucide-react"
import { useTranslations } from "next-intl"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { useReducedMotion } from "@/lib/animations/hooks"

export function FloatingWaitlistButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("floatingButton")

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDialogOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
            style={{
              animation: prefersReducedMotion
                ? "none"
                : "glow-pulse 2s ease-in-out infinite",
            }}
            aria-label={t("text")}
          >
            <Rocket className="h-4 w-4" />
            {t("text")}
            <span className="absolute -right-1 -top-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-primary shadow-sm">
              {t("badge")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <WaitlistDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
