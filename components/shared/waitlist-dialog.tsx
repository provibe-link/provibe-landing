"use client"

import { useState, FormEvent } from "react"
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
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const apiUrl = process.env.NEXT_PUBLIC_WAITLIST_API_URL
      if (!apiUrl) {
        // Simulate success in dev when no API URL is configured
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStatus("success")
        return
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, handle }),
      })

      if (!res.ok) throw new Error("Failed to submit")
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
      }, 300)
    }
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
              className="flex flex-col items-center py-8 text-center"
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
