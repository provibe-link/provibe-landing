"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useOpenPanel } from "@openpanel/nextjs"
import { EarlyJoinDialog } from "@/components/shared/early-join-dialog"

const STORAGE_KEY = "provibe:early-join-seen:v1"

export function EarlyJoinTrigger() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { track } = useOpenPanel()

  useEffect(() => {
    if (pathname?.startsWith("/join-early") || pathname?.startsWith("/admin")) {
      return
    }

    let seen = false
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1"
    } catch {
      seen = true
    }
    if (seen) return

    setOpen(true)
    track("early_join_dialog_opened", { trigger: "auto" })
    try {
      window.localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // ignore
    }
  }, [pathname, track])

  return <EarlyJoinDialog open={open} onOpenChange={setOpen} />
}
