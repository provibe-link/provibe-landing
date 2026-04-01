"use client"

import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "hi" : "en"
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365}`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      className={cn("relative h-9 w-9 text-xs font-bold", className)}
      aria-label={`Switch to ${locale === "en" ? "Hindi" : "English"}`}
      disabled={isPending}
    >
      {locale === "en" ? "हि" : "EN"}
    </Button>
  )
}
