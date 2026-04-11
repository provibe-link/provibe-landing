"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useOpenPanel } from "@openpanel/nextjs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EarlyJoinGraphic } from "@/components/shared/early-join-graphic"
import { ArrowRight, Check } from "lucide-react"
import { useReducedMotion } from "@/lib/animations/hooks"
import { cn } from "@/lib/utils"

interface EarlyJoinDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const BENEFIT_KEYS = [
  "earlyAccess",
  "lessCommission",
  "freeEvents",
  "freeDelivery",
  "brandDiscovery",
  "noHostCommission",
] as const

export function EarlyJoinDialog({ open, onOpenChange }: EarlyJoinDialogProps) {
  const t = useTranslations("earlyJoin")
  const reduced = useReducedMotion()
  const { track } = useOpenPanel()

  const listItemVariants = reduced
    ? {
        hidden: { opacity: 1, x: 0 },
        show: { opacity: 1, x: 0 },
      }
    : {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0 },
      }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col overflow-hidden p-0",
          // Mobile: bottom sheet
          "!top-auto !left-0 !bottom-0 !translate-x-0 !translate-y-0",
          "!max-w-none !w-full !rounded-t-3xl !rounded-b-none",
          "max-h-[92dvh]",
          "data-open:!slide-in-from-bottom data-closed:!slide-out-to-bottom",
          // Desktop: recenter + card shape
          "sm:!top-1/2 sm:!left-1/2 sm:!bottom-auto sm:!-translate-x-1/2 sm:!-translate-y-1/2",
          "sm:!max-w-lg sm:!rounded-xl sm:max-h-[90dvh]",
          "sm:data-open:!zoom-in-95 sm:data-closed:!zoom-out-95"
        )}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(250,111,98,0.22) 0%, transparent 70%)",
            }}
          />

          <div className="relative px-6 pt-5 pb-6 sm:pt-6">
            <div
              className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-muted-foreground/30 sm:hidden"
              aria-hidden="true"
            />
            <div className="flex justify-center">
              <EarlyJoinGraphic size="sm" />
            </div>

            <div className="mt-2 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {t("dialog.badge")}
              </span>
            </div>

            <DialogHeader className="mt-3 text-center sm:text-center">
              <DialogTitle className="font-display text-2xl sm:text-3xl tracking-tight">
                {t("dialog.title")}
              </DialogTitle>
              <DialogDescription className="mx-auto max-w-sm text-sm">
                {t("dialog.description")}
              </DialogDescription>
            </DialogHeader>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: reduced ? 0 : 0.05 },
                },
              }}
              className="mt-5 space-y-2.5"
            >
              {BENEFIT_KEYS.map((key) => (
                <motion.li
                  key={key}
                  variants={listItemVariants}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {t(`benefits.items.${key}.title`)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("benefits.more")}
            </p>
          </div>
        </div>

        <div className="shrink-0 border-t border-border/60 bg-background/95 px-6 py-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] backdrop-blur-sm sm:pb-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="ghost"
              className="sm:flex-1"
              onClick={() => {
                track("early_join_dialog_later_clicked")
                onOpenChange(false)
              }}
            >
              {t("dialog.laterCta")}
            </Button>
            <Button
              asChild
              className="sm:flex-[2] bg-primary text-white hover:bg-primary/90"
            >
              <Link
                href="/join-early"
                onClick={() => {
                  track("early_join_dialog_explore_clicked")
                  onOpenChange(false)
                }}
              >
                {t("dialog.exploreCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
