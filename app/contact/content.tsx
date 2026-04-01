"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Clock, MessageSquare, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { cn } from "@/lib/utils"

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "creator-support", label: "Creator Support" },
  { value: "press", label: "Press & Media" },
  { value: "brand", label: "Brand Inquiry" },
]

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary/5" />
        <GrainOverlay className="-z-10" />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-sm font-medium uppercase tracking-widest text-primary"
          >
            Contact Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Have a question, partnership idea, or just want to say hi? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Form */}
            <AnimatedSection variant="slide-left" className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <CheckCircle className="mb-4 h-16 w-16 text-primary" />
                    <h3 className="font-heading text-2xl font-bold">Message Sent!</h3>
                    <p className="mt-2 text-muted-foreground">
                      We&apos;ll get back to you within 24-48 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                        Subject
                      </label>
                      <select
                        id="subject"
                        className={cn(
                          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        )}
                        required
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="How can we help?"
                        required
                        className={cn(
                          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors",
                          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                          "resize-none"
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Info Sidebar */}
            <AnimatedSection variant="slide-right" className="lg:col-span-2">
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">Email Us</h3>
                    <Link
                      href="mailto:hello@provibe.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@provibe.com
                    </Link>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24-48 hours during business days.
                    </p>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">Check our FAQ</h3>
                    <p className="text-sm text-muted-foreground">
                      Many questions are already answered in our{" "}
                      <Link href="/#faq" className="text-primary hover:underline">
                        FAQ section
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border pt-8">
                  <h3 className="mb-4 font-heading font-bold">Follow Us</h3>
                  <div className="flex gap-3">
                    {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                      <Link
                        key={social}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-sm font-bold text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                        aria-label={social}
                      >
                        {social.charAt(0)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
