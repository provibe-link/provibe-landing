# ProVibe Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 6 pages of the ProVibe landing site to reflect the 3-phase platform vision, add creator lead capture (waitlist), and present coming-soon features — targeting July 2026 launch.

**Architecture:** Build shared waitlist infrastructure first (dialog + floating button), then update global chrome (navbar/footer), then redesign pages starting with home. Each task produces a working build. All components reuse existing patterns: `SectionHeader`, `GradientCard`, `AnimatedSection`, Framer Motion variants from `lib/animations/variants.ts`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui (Radix), Framer Motion 12, Lucide icons

**Design spec:** `docs/superpowers/specs/2026-04-02-provibe-landing-redesign.md`

---

### Task 1: Waitlist Dialog Component

**Files:**
- Create: `components/shared/waitlist-dialog.tsx`

- [ ] **Step 1: Create the waitlist dialog component**

```tsx
// components/shared/waitlist-dialog.tsx
"use client"

import { useState, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [handle, setHandle] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
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
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  const handleClose = (value: boolean) => {
    onOpenChange(value)
    if (!value) {
      // Reset form after close animation
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
              <h3 className="mb-2 font-display text-xl font-bold">You&apos;re on the list!</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ll notify you as soon as ProVibe launches. Get ready to build your creator empire.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DialogHeader className="text-center">
                <div className="mx-auto mb-3 text-4xl">🚀</div>
                <DialogTitle className="font-display text-xl">Join the Waitlist</DialogTitle>
                <DialogDescription>
                  Be first to launch when ProVibe goes live
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="@social_handle"
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
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                No spam. We&apos;ll only email you about launch updates.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds (component not yet used, but should compile)

- [ ] **Step 3: Commit**

```bash
git add components/shared/waitlist-dialog.tsx
git commit -m "feat: add waitlist dialog component with form and success state"
```

---

### Task 2: Floating Waitlist Button

**Files:**
- Create: `components/shared/floating-waitlist-button.tsx`

- [ ] **Step 1: Create the floating button component**

```tsx
// components/shared/floating-waitlist-button.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket } from "lucide-react"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { useReducedMotion } from "@/lib/animations/hooks"

export function FloatingWaitlistButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~100vh
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
              animation: prefersReducedMotion ? "none" : "glow-pulse 2s ease-in-out infinite",
            }}
            aria-label="Join the waitlist"
          >
            <Rocket className="h-4 w-4" />
            Join the Waitlist
            <span className="absolute -right-1 -top-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-primary shadow-sm">
              FREE
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <WaitlistDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
```

- [ ] **Step 2: Add floating button to root layout**

Modify `app/layout.tsx` — add `FloatingWaitlistButton` inside `ThemeProvider`, after `Footer`:

```tsx
import { FloatingWaitlistButton } from "@/components/shared/floating-waitlist-button"

// Inside the ThemeProvider, after <Footer />:
<Footer />
<FloatingWaitlistButton />
```

- [ ] **Step 3: Verify dev server**

Run: `pnpm dev`
Expected: Floating button appears on scroll past hero on any page. Clicking it opens the waitlist dialog.

- [ ] **Step 4: Commit**

```bash
git add components/shared/floating-waitlist-button.tsx app/layout.tsx
git commit -m "feat: add floating waitlist button with dialog integration"
```

---

### Task 3: Update Navbar

**Files:**
- Modify: `components/layout/navbar.tsx`

- [ ] **Step 1: Update navbar — replace "Log in" and "Create Page" with waitlist**

Changes to `components/layout/navbar.tsx`:
1. Add state and import for `WaitlistDialog`
2. Replace "Log in" link and "Create Page" button with "Join Waitlist" button
3. Add "Launching July 2026" badge near logo
4. Update mobile menu similarly

```tsx
// Add imports at top:
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"

// Add state inside Navbar component:
const [waitlistOpen, setWaitlistOpen] = useState(false)

// Replace the Logo section (after the existing logo span):
<Link href="/" className="flex items-center gap-2.5">
  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
    <Zap className="h-4 w-4 text-primary" />
  </span>
  <span className="text-lg font-bold">ProVibe</span>
  <span className="hidden sm:inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
    July 2026
  </span>
</Link>

// Replace Desktop Actions div:
<div className="hidden items-center gap-5 md:flex">
  <ThemeSwitcher />
  <Button
    className="rounded-full bg-primary text-white hover:bg-primary/90 px-5"
    onClick={() => setWaitlistOpen(true)}
  >
    Join Waitlist
    <ArrowRight className="ml-1.5 h-4 w-4" />
  </Button>
</div>

// Replace mobile menu bottom section (remove "Log in", update button):
<div className="flex items-center gap-4 border-t border-border/30 pt-4 mt-2">
  <ThemeSwitcher />
  <Button
    className="flex-1 rounded-full bg-primary text-white hover:bg-primary/90"
    onClick={() => {
      setIsMobileMenuOpen(false)
      setWaitlistOpen(true)
    }}
  >
    Join Waitlist
    <ArrowRight className="ml-1.5 h-4 w-4" />
  </Button>
</div>

// Add before closing </motion.nav>:
<WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: Navbar shows "July 2026" badge, "Join Waitlist" button instead of "Log in" / "Create Page". Button opens waitlist dialog.

- [ ] **Step 3: Commit**

```bash
git add components/layout/navbar.tsx
git commit -m "feat: update navbar with waitlist button and launch badge"
```

---

### Task 4: Update Footer

**Files:**
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1: Update footer columns and tagline**

Replace the `footerColumns` array in `components/layout/footer.tsx`:

```tsx
const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Creator Hub", href: "/creators" },
      { label: "Digital Store", href: "/creators" },
      { label: "Analytics", href: "/creators" },
    ],
  },
  {
    title: "Brands",
    links: [
      { label: "Brand Portal", href: "/brands" },
      { label: "Campaign Manager", href: "/brands" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Help Center", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
]
```

Update the tagline paragraph:

```tsx
<p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
  The modern platform for creators to build, monetize, and grow. Launching July 2026.
</p>
```

Add a waitlist link after the social links div:

```tsx
<Link
  href="#"
  onClick={(e) => { e.preventDefault() }}
  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
>
  Join the Waitlist →
</Link>
```

Note: The footer is a server component. For the waitlist link to open the dialog, we have two options: (a) make the link scroll to a section with a form, or (b) just link to `/#` since the floating button is always available. Option (b) is simpler — the footer waitlist link can be a styled anchor that relies on the floating button. Simply use:

```tsx
<button
  onClick={() => window.dispatchEvent(new CustomEvent("open-waitlist"))}
  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
>
  Join the Waitlist →
</button>
```

But since the footer is a server component, it's simpler to just make it a visual link. Convert footer to a client component by adding `"use client"` at top, or keep it as server component and skip the interactive waitlist link. Simplest approach: keep server component, make "Join the Waitlist →" a link to the top of the page where the hero CTA is.

```tsx
<Link
  href="/"
  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
>
  Join the Waitlist →
</Link>
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: Footer shows updated columns (no Pricing, Changelog, Careers), updated tagline with "Launching July 2026", waitlist link.

- [ ] **Step 3: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "feat: update footer with pre-launch links and waitlist CTA"
```

---

### Task 5: Update Hero Section

**Files:**
- Modify: `components/home/hero.tsx`

- [ ] **Step 1: Update hero content and CTAs**

In `components/home/hero.tsx`, update the content inside the text layer. Key changes:
1. Badge text → "🚀 Launching July 2026"
2. Headline → "Your Creator Empire" / "Starts Here."
3. Subheadline → new copy
4. CTA → "Join the Waitlist" (opens dialog) + "See Features" (scroll)
5. Add social proof counters below CTAs

Add imports:
```tsx
import { useState } from "react"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { useCountUp } from "@/lib/animations/hooks"
```

Add state:
```tsx
const [waitlistOpen, setWaitlistOpen] = useState(false)
```

Replace the Badge motion.div content:
```tsx
<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
🚀 Launching July 2026
```

Replace the Headline h1:
```tsx
<h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]">
  <motion.span variants={wordVariants} className="block">
    Your Creator Empire
  </motion.span>
  <motion.span variants={wordVariants} className="block">
    <span className="gradient-text">Starts Here.</span>
  </motion.span>
</h1>
```

Replace the Subheadline:
```tsx
<motion.p
  variants={fadeUpVariants}
  className="mx-auto mb-8 max-w-lg text-base sm:text-lg lg:text-xl text-muted-foreground"
>
  Bio links, digital store, brand deals, analytics — one platform to build, monetize, and grow.
</motion.p>
```

Replace the CTA button with two buttons:
```tsx
<motion.div variants={fadeUpVariants} className="flex flex-wrap items-center justify-center gap-4">
  <Button
    size="lg"
    className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
    onClick={() => setWaitlistOpen(true)}
  >
    Join the Waitlist
    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Button>
  <Button
    size="lg"
    variant="outline"
    className="h-12 px-8 text-base"
    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
  >
    See Features
  </Button>
</motion.div>
```

Add social proof counters after the CTA div:
```tsx
<motion.div
  variants={fadeUpVariants}
  className="mt-10 flex items-center justify-center gap-8 sm:gap-12"
>
  {[
    { value: "10K+", label: "Creators waiting" },
    { value: "500+", label: "Brand partners" },
    { value: "$2M+", label: "Creator earnings" },
  ].map((stat) => (
    <div key={stat.label} className="text-center">
      <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
        {stat.value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
        {stat.label}
      </div>
    </div>
  ))}
</motion.div>
```

Add the dialog before the closing `</section>`:
```tsx
<WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: Hero shows launch badge, new headline, two CTA buttons, social proof counters. "Join the Waitlist" opens dialog.

- [ ] **Step 3: Commit**

```bash
git add components/home/hero.tsx
git commit -m "feat: update hero with launch badge, waitlist CTA, and social proof"
```

---

### Task 6: Create "For Every Creator" Section

**Files:**
- Create: `components/home/for-every-creator.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/home/for-every-creator.tsx
"use client"

import { motion, Variants } from "framer-motion"
import {
  Video,
  Camera,
  PenTool,
  Music,
  Palette,
  Dumbbell,
} from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const creatorTypes = [
  {
    icon: Video,
    title: "Video Creators",
    subtitle: "YouTube, TikTok, Reels",
  },
  {
    icon: Camera,
    title: "Photographers",
    subtitle: "Portfolios & prints",
  },
  {
    icon: PenTool,
    title: "Writers & Bloggers",
    subtitle: "Newsletters & ebooks",
  },
  {
    icon: Music,
    title: "Musicians",
    subtitle: "Merch & streaming",
  },
  {
    icon: Palette,
    title: "Artists & Designers",
    subtitle: "Digital art & commissions",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Coaches",
    subtitle: "Programs & bookings",
  },
]

export function ForEveryCreator() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Built For You"
          headline="For Every"
          headlineHighlight="Creator"
          description="No matter your niche, audience size, or goals — ProVibe adapts to how you create."
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
        >
          {creatorTypes.map((creator) => (
            <motion.div
              key={creator.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              className="group rounded-xl border border-border bg-primary/[0.03] p-6 text-center transition-colors hover:border-primary hover:bg-primary/[0.06]"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <creator.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold sm:text-base">
                {creator.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {creator.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/home/for-every-creator.tsx
git commit -m "feat: add For Every Creator section component"
```

---

### Task 7: Update Features Section (Consolidate)

**Files:**
- Modify: `components/home/features.tsx`

- [ ] **Step 1: Replace features data and update to 6-card grid**

Replace the entire `features` array and update the grid in `components/home/features.tsx`:

```tsx
// Replace imports — remove unused icons, add new ones:
import { Link2, ShoppingCart, BarChart3, Mail, Handshake, Megaphone, ArrowRight } from "lucide-react"

// Replace features array:
const features = [
  {
    icon: Link2,
    title: "Bio Link Pages",
    description: "Custom SEO-friendly pages with drag-and-drop blocks for links, media, and products.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: ShoppingCart,
    title: "Digital Store",
    description: "Sell digital and physical products, services, bookings, and subscriptions.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track link clicks, conversions, revenue, and audience growth in real-time.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: Mail,
    title: "Lead Capture",
    description: "Grow your subscriber list with forms, email capture, and broadcast campaigns.",
    link: { label: "Learn More", href: "/creators" },
  },
  {
    icon: Handshake,
    title: "Brand Deals",
    description: "Get discovered by brands looking for authentic creators in your niche.",
    link: { label: "See Brands", href: "/brands" },
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    description: "Broadcast promotions to your audience and manage affiliate link tracking.",
    link: { label: "Learn More", href: "/creators" },
  },
]
```

Update the SectionHeader:
```tsx
<SectionHeader
  eyebrow="Platform Features"
  headline="Everything You Need to"
  headlineHighlight="Monetize"
/>
```

Update the grid class from `lg:grid-cols-3` to include an `id` and make it 2/3 cols:
```tsx
<section id="features" className="py-24 md:py-32">
```

Update grid:
```tsx
className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
```

Remove the image placeholder `<div className="mb-5 h-40 rounded-lg bg-muted/20" />` from each card to make them more compact.

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: Features section shows 6 cards in 3-column grid with new content, no image placeholders.

- [ ] **Step 3: Commit**

```bash
git add components/home/features.tsx
git commit -m "feat: consolidate features section with 6 platform feature cards"
```

---

### Task 8: Create "How It Works" Section

**Files:**
- Create: `components/home/how-it-works.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/home/how-it-works.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const steps = [
  {
    number: 1,
    title: "Create Your Page",
    description:
      "Pick a template, add your links, products, and content blocks. Your page is live in minutes.",
  },
  {
    number: 2,
    title: "Set Up Your Store",
    description:
      "Add digital products, services, or affiliate links to start earning from day one.",
  },
  {
    number: 3,
    title: "Grow & Monetize",
    description:
      "Track analytics, capture leads, and land brand partnerships as your audience grows.",
  },
]

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="How It Works"
          headline="Launch in"
          headlineHighlight="3 Minutes"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Vertical connecting line */}
          <div className="absolute left-5 top-8 bottom-8 w-px bg-border sm:left-6" />

          <div className="space-y-8">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="relative flex gap-5 sm:gap-6"
              >
                {/* Numbered circle */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 sm:h-12 sm:w-12 sm:text-base">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <h3 className="font-heading text-lg font-bold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/home/how-it-works.tsx
git commit -m "feat: add How It Works 3-step section"
```

---

### Task 9: Create Roadmap Teaser Section

**Files:**
- Create: `components/home/roadmap.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/home/roadmap.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const phases = [
  {
    badge: "JULY 2026",
    badgeStyle: "bg-primary text-white",
    title: "Creator Platform Launch",
    description:
      "Bio links, digital store, analytics, lead capture, and monetization tools — everything you need to build your creator business.",
    highlighted: true,
  },
  {
    badge: "COMING SOON",
    badgeStyle: "bg-muted text-muted-foreground",
    title: "Brand Marketplace",
    description:
      "Creator-brand matching, campaign management, collaboration tools, and performance tracking.",
    highlighted: false,
    opacity: 0.7,
  },
  {
    badge: "2027",
    badgeStyle: "bg-muted text-muted-foreground",
    title: "AI Growth Engine",
    description:
      "Smart scheduling, AI content assistant, creator matching engine, and predictive analytics.",
    highlighted: false,
    opacity: 0.5,
  },
]

export function Roadmap() {
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section id="roadmap" className="py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="Roadmap"
          headline="What's"
          headlineHighlight="Coming Next"
        />

        <motion.div
          variants={prefersReducedMotion ? staggerReduced : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4"
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.title}
              variants={prefersReducedMotion ? cardReduced : cardFadeUp}
              className={`rounded-xl border p-6 transition-colors ${
                phase.highlighted
                  ? "border-primary bg-primary/[0.06]"
                  : "border-border bg-card"
              }`}
              style={{ opacity: phase.opacity ?? 1 }}
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${phase.badgeStyle}`}
              >
                {phase.badge}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/home/roadmap.tsx
git commit -m "feat: add roadmap teaser section with 3 phases"
```

---

### Task 10: Update FAQ Content

**Files:**
- Modify: `components/home/faq.tsx`

- [ ] **Step 1: Replace FAQ content with pre-launch questions**

Replace the `faqs` array in `components/home/faq.tsx`:

```tsx
const faqs = [
  {
    question: "What is ProVibe?",
    answer:
      "ProVibe is an all-in-one creator platform that combines bio link pages, a digital storefront, audience analytics, lead capture, and brand partnerships — everything you need to build, monetize, and grow your creator business.",
  },
  {
    question: "When does ProVibe launch?",
    answer:
      "ProVibe launches in July 2026. Join the waitlist now to get early access and be among the first creators on the platform.",
  },
  {
    question: "Is it free to join the waitlist?",
    answer:
      "Absolutely! Joining the waitlist is completely free. We'll notify you as soon as we launch so you can be first in line.",
  },
  {
    question: "What features will be available at launch?",
    answer:
      "At launch, you'll get customizable bio link pages, a digital storefront for selling products and services, audience analytics, lead capture forms, email broadcasting, and affiliate link management.",
  },
  {
    question: "How is ProVibe different from Linktree?",
    answer:
      "ProVibe goes far beyond link-in-bio. While Linktree focuses on links, ProVibe includes a full digital store, lead generation tools, audience analytics, campaign broadcasting, and a brand partnership marketplace — all in one platform.",
  },
  {
    question: "Will there be a free plan?",
    answer:
      "Yes! ProVibe will offer a generous free plan that includes a customizable bio page, basic analytics, and essential monetization tools. Premium plans will unlock advanced features like detailed analytics, priority brand matching, and more.",
  },
  {
    question: "How do brand partnerships work?",
    answer:
      "After our Phase 2 launch, brands will be able to discover creators based on niche, audience size, and engagement. Creators can browse opportunities, apply to campaigns, and manage collaborations directly through ProVibe.",
  },
  {
    question: "Can I sell products on ProVibe?",
    answer:
      "Yes! You can sell digital products (ebooks, courses, templates), physical products, services (consultations, coaching), and subscription-based content — all from your ProVibe page with built-in payments.",
  },
]
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: FAQ section shows updated pre-launch questions

- [ ] **Step 3: Commit**

```bash
git add components/home/faq.tsx
git commit -m "feat: update FAQ content for pre-launch"
```

---

### Task 11: Update CTA Section

**Files:**
- Modify: `components/home/cta.tsx`

- [ ] **Step 1: Update CTA copy and button to open waitlist**

In `components/home/cta.tsx`:

Add imports and state:
```tsx
import { useState } from "react"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"

// Inside CTA component:
const [waitlistOpen, setWaitlistOpen] = useState(false)
```

Replace the h2 content:
```tsx
Ready to Build Your Creator{" "}
<span className="underline decoration-white/40 underline-offset-4 decoration-2">Empire?</span>
```

Replace the subtitle p:
```tsx
Join 10,000+ creators on the waitlist. Be first when we launch July 2026.
```

Replace the Button:
```tsx
<Button
  size="lg"
  className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90 transition-all"
  onClick={() => setWaitlistOpen(true)}
>
  Join the Waitlist
  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
</Button>
```

Replace the bottom tagline:
```tsx
<motion.p
  variants={prefersReducedMotion ? fadeUpReduced : fadeUp}
  className="mt-6 text-sm text-white/60"
>
  Free to join • No credit card required • Launch July 2026
</motion.p>
```

Add before closing `</section>`:
```tsx
<WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`
Expected: CTA shows new copy, button opens waitlist dialog

- [ ] **Step 3: Commit**

```bash
git add components/home/cta.tsx
git commit -m "feat: update CTA section with waitlist copy and dialog"
```

---

### Task 12: Update Home Page Section Order

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update imports and section order**

Replace entire `app/page.tsx`:

```tsx
import { Hero } from "@/components/home/hero"
import { BrandScroller } from "@/components/home/brand-scroller"
import { ForEveryCreator } from "@/components/home/for-every-creator"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Roadmap } from "@/components/home/roadmap"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandScroller />
      <ForEveryCreator />
      <Features />
      <HowItWorks />
      <Roadmap />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
```

- [ ] **Step 2: Verify full home page flow**

Run: `pnpm dev`
Expected: Home page shows all 9 sections in order. Scroll through to verify: Hero → Brand Scroller → For Every Creator → Features → How It Works → Roadmap → Testimonials → FAQ → CTA. Floating button appears after scrolling past hero.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update home page with new section order"
```

---

### Task 13: Redesign Creators Page

**Files:**
- Modify: `app/creators/content.tsx`

- [ ] **Step 1: Rewrite creators page content**

Replace the entire content of `app/creators/content.tsx` with a clean creator-focused page:

```tsx
// app/creators/content.tsx
"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  Link2,
  ShoppingCart,
  BarChart3,
  Mail,
  Target,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { AnimatedSection } from "@/components/shared/animated-section"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const features = [
  {
    icon: Link2,
    title: "Bio Link Builder",
    description:
      "Drag-and-drop blocks for links, media, products, forms, and embeds. Fully customizable templates with your brand colors.",
  },
  {
    icon: ShoppingCart,
    title: "Digital Storefront",
    description:
      "Sell digital and physical products, offer services and bookings, manage subscriptions — all with built-in payments.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track link clicks, page views, conversions, revenue, and audience growth with real-time dashboards.",
  },
  {
    icon: Mail,
    title: "Lead Gen & Broadcasting",
    description:
      "Capture emails and phone numbers, broadcast campaigns to subscribers, and grow your audience list.",
  },
  {
    icon: Target,
    title: "Affiliate Management",
    description:
      "Track affiliate links, monitor commissions, and measure performance across all your partnerships.",
  },
]

const creatorFaqs = [
  {
    question: "How quickly can I set up my page?",
    answer:
      "Most creators have their page live in under 3 minutes. Choose a template, customize your colors and content, and you're ready to share.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! You can connect your custom domain or use a free provibe.com/yourname subdomain.",
  },
  {
    question: "What can I sell on ProVibe?",
    answer:
      "Digital products (ebooks, courses, templates, presets), physical products, services (coaching, consultations), and subscription content.",
  },
  {
    question: "How do payments work?",
    answer:
      "We integrate with major payment processors. You receive payouts directly to your bank account with transparent fee structures.",
  },
]

export function CreatorsContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 h-[500px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <GrainOverlay className="-z-10" />

        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
              For Creators
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Bio. Your Store.{" "}
              <span className="gradient-text">Your Empire.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              One link to showcase everything — sell products, capture leads, and
              land brand deals. All from your ProVibe page.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Deep Dives */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-6">
          <SectionHeader
            eyebrow="Creator Tools"
            headline="Everything to"
            headlineHighlight="Build & Sell"
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="flex gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Template Gallery Placeholder */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Templates"
            headline="Start With a"
            headlineHighlight="Template"
            description="Choose from professionally designed templates and make them yours in minutes."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {["Minimal", "Bold", "Creative"].map((name) => (
              <AnimatedSection key={name}>
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="aspect-[3/4] bg-muted/20" />
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-semibold">{name}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Creator FAQ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <SectionHeader
            eyebrow="FAQ"
            headline="Creator"
            headlineHighlight="Questions"
          />

          <AnimatedSection variant="fade-up" delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {creatorFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border bg-card px-6 transition-colors hover:border-primary data-[state=open]:border-primary"
                >
                  <AccordionTrigger className="text-left font-heading text-base font-semibold hover:text-primary hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary" />
        <GrainOverlay opacity={0.05} />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Start Building Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Be among the first creators on ProVibe. Join the waitlist and get
              early access when we launch.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  )
}
```

- [ ] **Step 2: Verify**

Run: `pnpm dev`, navigate to `/creators`
Expected: Creators page shows Hero → Feature deep-dives → Template gallery → FAQ → CTA

- [ ] **Step 3: Commit**

```bash
git add app/creators/content.tsx
git commit -m "feat: redesign creators page with feature deep-dives and waitlist"
```

---

### Task 14: Redesign Brands Page (Coming Soon)

**Files:**
- Modify: `app/brands/content.tsx`

- [ ] **Step 1: Read current brands content**

Read `app/brands/content.tsx` to understand current structure before replacing.

- [ ] **Step 2: Rewrite brands page as coming soon**

Replace the entire content of `app/brands/content.tsx`:

```tsx
// app/brands/content.tsx
"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import {
  Search,
  ClipboardList,
  TrendingUp,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/shared/section-header"
import { GrainOverlay } from "@/components/shared/grain-overlay"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { staggerContainer, cardFadeUp } from "@/lib/animations/variants"
import { useReducedMotion } from "@/lib/animations/hooks"

const brandFeatures = [
  {
    icon: Search,
    title: "Creator Discovery",
    description: "Search and filter creators by niche, audience size, engagement rate, and performance metrics.",
  },
  {
    icon: ClipboardList,
    title: "Campaign Manager",
    description: "Launch, manage, and track influencer campaigns with budget controls and milestone tracking.",
  },
  {
    icon: TrendingUp,
    title: "ROI Analytics",
    description: "Measure real campaign results with conversion tracking, engagement analytics, and ROI reporting.",
  },
  {
    icon: MessageCircle,
    title: "Direct Messaging",
    description: "Communicate directly with creators, share briefs, approve content, and manage deliverables.",
  },
]

export function BrandsContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const staggerReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const cardReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 h-[500px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <GrainOverlay className="-z-10" />

        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              ⏳ Coming Soon — Phase 2
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect{" "}
              <span className="gradient-text">Creator Match.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Discover vetted creators, launch campaigns, and measure real ROI —
              all in one platform. Coming after our creator platform launch.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-primary text-white hover:bg-primary/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Get Notified When We Launch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <SectionHeader
            eyebrow="Brand Tools"
            headline="What Brands Will"
            headlineHighlight="Get"
          />

          <motion.div
            variants={prefersReducedMotion ? staggerReduced : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {brandFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={prefersReducedMotion ? cardReduced : cardFadeUp}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary" />
        <GrainOverlay opacity={0.05} />
        <div className="container relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Be First to Access
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Brand marketplace launching after our creator platform. Get
              notified when it&apos;s ready.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-14 px-10 text-lg bg-white text-primary font-bold hover:bg-white/90"
                onClick={() => setWaitlistOpen(true)}
              >
                Join Brand Waitlist
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  )
}
```

- [ ] **Step 3: Verify**

Run: `pnpm dev`, navigate to `/brands`
Expected: Brands page shows "Coming Soon" hero, 4 feature preview cards, CTA — all using orange-red primary color.

- [ ] **Step 4: Commit**

```bash
git add app/brands/content.tsx
git commit -m "feat: redesign brands page as coming soon with feature preview"
```

---

### Task 15: Update About Page

**Files:**
- Modify: `app/about/content.tsx`

- [ ] **Step 1: Read current about content**

Read `app/about/content.tsx` to understand current structure.

- [ ] **Step 2: Rewrite about page with mission, stats, team, values**

Replace the entire content of `app/about/content.tsx` with the redesigned version. Follow the same patterns as the creators page: use `AnimatedSection`, `SectionHeader`, `GrainOverlay`, `WaitlistDialog`. Include sections:
1. Hero — "Built **By Creators,** For Creators"
2. Mission statement paragraph
3. Stats — 3 counters ("2026 Founded", "10K+ Waitlist", "3 Phases")
4. Vision — reuse Roadmap-style phase cards (inline, not importing from home)
5. Team — 3 placeholder team member cards (image placeholder + name + role + bio)
6. Values — 4 value cards (Creator-First, Transparency, Innovation, Community)
7. CTA — "Join Our Journey" with waitlist button

The component should export `AboutContent` and be a client component with waitlist dialog state.

- [ ] **Step 3: Verify**

Run: `pnpm dev`, navigate to `/about`
Expected: About page shows all 7 sections with consistent styling.

- [ ] **Step 4: Commit**

```bash
git add app/about/content.tsx
git commit -m "feat: redesign about page with mission, team, and values"
```

---

### Task 16: Update Blog & Contact Pages (Style Refresh)

**Files:**
- Modify: `app/blogs/content.tsx`
- Modify: `app/contact/content.tsx`

- [ ] **Step 1: Read current blog and contact content**

Read both `app/blogs/content.tsx` and `app/contact/content.tsx` to understand current structure.

- [ ] **Step 2: Update blog page header**

In `app/blogs/content.tsx`, update the page header section to use the new design language — gradient background with `SectionHeader` pattern. Change the hero area eyebrow to "Blog", headline to "Creator **Insights**". Keep existing search and grid functionality.

- [ ] **Step 3: Update contact page**

In `app/contact/content.tsx`:
- Update header to match new design language
- Update subject dropdown options to: "General Inquiry", "Partnership", "Creator Support", "Press", "Brand Inquiry"
- Keep existing form structure and contact info sidebar

- [ ] **Step 4: Verify**

Run: `pnpm dev`, navigate to `/blogs` and `/contact`
Expected: Both pages show updated headers and styling consistent with the rest of the site.

- [ ] **Step 5: Commit**

```bash
git add app/blogs/content.tsx app/contact/content.tsx
git commit -m "feat: style refresh for blog and contact pages"
```

---

### Task 17: Clean Up Removed Components

**Files:**
- Remove: `components/home/creator-stories.tsx`
- Remove: `components/home/features2.tsx`

- [ ] **Step 1: Delete unused components**

```bash
rm components/home/creator-stories.tsx components/home/features2.tsx
```

- [ ] **Step 2: Verify no imports reference deleted files**

Run: `pnpm build`
Expected: Build succeeds with no missing module errors. If any file still imports these components, remove the import.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused creator-stories and features2 components"
```

---

### Task 18: Final Verification

- [ ] **Step 1: Full build check**

Run: `pnpm build`
Expected: Build succeeds with zero errors

- [ ] **Step 2: Lint check**

Run: `pnpm lint`
Expected: No linting errors

- [ ] **Step 3: Visual walkthrough**

Run: `pnpm dev` and manually verify each page:
- `/` — Hero with launch badge, social proof, For Every Creator, Features, How It Works, Roadmap, Testimonials, FAQ, CTA
- `/creators` — Creator hero, feature deep-dives, template gallery, FAQ, CTA
- `/brands` — Coming Soon hero, feature preview, CTA
- `/blogs` — Updated header styling
- `/about` — Mission, stats, team, values
- `/contact` — Updated header and subject options

Verify on each page:
- Floating waitlist button appears after scrolling
- Navbar "Join Waitlist" button works
- Waitlist dialog opens, form submits (shows success state in dev mode)
- Dark/light mode toggle works
- Mobile responsive layout at 375px width

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final verification and polish"
```
