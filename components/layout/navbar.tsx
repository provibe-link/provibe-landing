"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/shared/theme-switcher"
import { LanguageSwitcher } from "@/components/shared/language-switcher"
import { WaitlistDialog } from "@/components/shared/waitlist-dialog"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations("nav")

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/creators", label: t("creators") },
    { href: "/brands", label: t("brands") },
    { href: "/blogs", label: t("blog") },
    { href: "/about", label: t("about") },
  ]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass background — fades in on scroll */}
      <div
        className={cn(
          "absolute inset-0 border-b transition-all duration-500",
          isScrolled
            ? "border-border/50 bg-background/60 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        )}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Zap className="h-4 w-4 text-primary" />
            </span>
            <span className="text-lg font-bold">ProVibe</span>
            <span className="hidden items-center rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline-flex">
              {t("launchBadge")}
            </span>
          </Link>

          {/* Desktop Navigation — pill container */}
          <div className="hidden md:flex">
            <div className="flex items-center gap-1 rounded-full border border-border/40 bg-background/40 px-1.5 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pathname === link.href && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-muted/80"
                      layoutId="navbar-pill"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button
              className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              onClick={() => setWaitlistOpen(true)}
            >
              {t("joinWaitlist")}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-border/30 bg-background/80 px-6 pb-6 backdrop-blur-xl">
              <div className="flex flex-col space-y-1 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-2 flex items-center gap-4 border-t border-border/30 pt-4">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                  <Button
                    className="flex-1 rounded-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setWaitlistOpen(true)
                    }}
                  >
                    {t("joinWaitlist")}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </motion.nav>
  )
}
