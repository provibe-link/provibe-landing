"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useOpenPanel } from "@openpanel/nextjs"
import {
  Rocket,
  Percent,
  CalendarHeart,
  Truck,
  Sparkles,
  Mic,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { EarlyJoinGraphic } from "@/components/shared/early-join-graphic"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"

const BENEFITS = [
  { key: "earlyAccess", Icon: Rocket },
  { key: "lessCommission", Icon: Percent },
  { key: "freeEvents", Icon: CalendarHeart },
  { key: "freeDelivery", Icon: Truck },
  { key: "brandDiscovery", Icon: Sparkles },
  { key: "noHostCommission", Icon: Mic },
] as const

export function JoinEarlyContent() {
  const t = useTranslations("earlyJoin")
  const [open, setOpen] = useState(false)
  const { track } = useOpenPanel()

  useEffect(() => {
    track("join_early_page_viewed")
  }, [track])

  const openWaitlist = (location: "hero" | "secondary") => {
    track("join_early_cta_clicked", { location })
    setOpen(true)
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
        <GrainOverlay opacity={0.04} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(250,111,98,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <AnimatedSection variant="scale">
            <EarlyJoinGraphic size="lg" />
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.1}>
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {t("page.eyebrow")}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.15}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {t("page.heroTitle")}{" "}
              <span className="bg-gradient-to-br from-[#fa6f62] via-[#ff8a7a] to-[#e55548] bg-clip-text text-transparent">
                {t("page.heroTitleHighlight")}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              {t("page.heroSubtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.25}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => openWaitlist("hero")}
                className="h-12 bg-primary px-8 text-base text-white shadow-[0_8px_30px_-6px_rgba(250,111,98,0.6)] hover:bg-primary/90"
              >
                {t("page.primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28">
        <GrainOverlay opacity={0.03} />
        <div className="relative mx-auto max-w-6xl px-6">
          <AnimatedSection variant="fade-up" className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t("page.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {t("benefits.heading")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              {t("benefits.subheading")}
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(({ key, Icon }, index) => (
              <AnimatedSection
                key={key}
                variant="fade-up"
                delay={0.05 * index}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-background p-6 transition-all hover:border-primary/40 hover:shadow-[0_12px_40px_-16px_rgba(250,111,98,0.45)]">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(250,111,98,0.5) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#fa6f62] to-[#e55548] text-white shadow-[0_6px_20px_-6px_rgba(250,111,98,0.7)]">
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {t(`benefits.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`benefits.items.${key}.description`)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection variant="fade-up" delay={0.3}>
            <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("benefits.more")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/60 bg-background py-20 sm:py-28">
        <GrainOverlay opacity={0.03} />
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-96 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(250,111,98,0.16) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection variant="fade-up">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("page.secondaryCtaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t("page.secondaryCtaSubtitle")}
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                onClick={() => openWaitlist("secondary")}
                className="h-12 bg-primary px-10 text-base text-white shadow-[0_8px_30px_-6px_rgba(250,111,98,0.6)] hover:bg-primary/90"
              >
                {t("page.secondaryCtaButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistDialog open={open} onOpenChange={setOpen} source="early-join" />
    </>
  )
}
