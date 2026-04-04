"use client"

import { useState, FormEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Loader2, Copy, Check } from "lucide-react"

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const t = useTranslations("waitlist")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [handle, setHandle] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [ref, setRef] = useState<string | null>(null)

  // Read referral code from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const refParam = params.get("ref")
      if (refParam) {
        setRef(refParam)
      }
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, handle, ref }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Already on list — still show success with their existing referral code
        setReferralCode(data.referral_code || "")
        setStatus("success")
        return
      }

      if (!res.ok) throw new Error("Failed to submit")

      setReferralCode(data.referral_code || "")
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMessage(t("error"))
    }
  }

  const handleClose = (value: boolean) => {
    onOpenChange(value)
    if (!value) {
      setTimeout(() => {
        setStatus("idle")
        setName("")
        setEmail("")
        setHandle("")
        setErrorMessage("")
        setReferralCode("")
        setCopied(false)
      }, 300)
    }
  }

  const referralLink = referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${referralCode}`
    : ""

  const handleCopy = async () => {
    if (!referralLink) return
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const text = `Join ProVibe — the all-in-one platform for creators. Sign up for early access and get 0% fees: ${referralLink}`
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    )
  }

  const handleShareTwitter = () => {
    const text = `I just joined the @provibeapp waitlist — 0% commission for early creators! Join through my link:`
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      "_blank"
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-6 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">
                {t("successTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("successDescription")}
              </p>

              {/* Referral section */}
              {referralCode && (
                <div className="mt-6 w-full space-y-3">
                  <p className="text-sm font-medium">{t("shareTitle")}</p>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                    <span className="flex-1 truncate text-left text-xs text-muted-foreground">
                      {referralLink}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 rounded-md p-1.5 transition-colors hover:bg-muted"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={handleShareWhatsApp}
                    >
                      {t("shareWhatsApp")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={handleShareTwitter}
                    >
                      {t("shareTwitter")}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <DialogHeader className="text-center">
                <div className="mx-auto mb-3 text-4xl">🚀</div>
                <DialogTitle className="font-display text-xl">
                  {t("title")}
                </DialogTitle>
                <DialogDescription>
                  {t("description")}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  placeholder={t("namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder={t("handlePlaceholder")}
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />

                {errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {t("button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                {t("privacyNote")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
