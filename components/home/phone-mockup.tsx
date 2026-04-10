"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Palette,
  Store,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react"
import { useTranslations } from "next-intl"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3 3 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 0 0 2.12 2.13c1.88.57 9.38.57 9.38.57s7.5 0 9.38-.57a3 3 0 0 0 2.12-2.13C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
    </svg>
  )
}

const PRODUCTS = [
  {
    nameKey: "product1Name",
    priceKey: "product1Price",
    image: "/assets/phone-mockup/product-saree.jpg",
  },
  {
    nameKey: "product2Name",
    priceKey: "product2Price",
    image: "/assets/phone-mockup/product-cordset.jpg",
  },
  {
    nameKey: "product3Name",
    priceKey: "product3Price",
    image: "/assets/phone-mockup/product-kurti.jpg",
  },
] as const

const LINKS = [
  { key: "linkPortfolio", Icon: Palette },
  { key: "linkFullStore", Icon: Store },
] as const

export function PhoneMockup() {
  const t = useTranslations("phoneMockup")

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-[320px] sm:w-[340px] lg:w-[360px]"
    >
      <div
        className="relative overflow-hidden rounded-[3rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
        style={{ aspectRatio: "9 / 19" }}
      >
        <div
          className="absolute left-1/2 top-2 z-30 flex h-7 w-[110px] -translate-x-1/2 items-center justify-end gap-1 rounded-full bg-neutral-900 px-3"
          aria-hidden="true"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        </div>

        <div className="relative flex h-full w-full flex-col bg-[#fdfaf6] text-neutral-900">
          <div className="flex items-center justify-between px-6 pt-3 pb-1 font-mono text-[11px] font-semibold text-neutral-900">
            <span className="tabular-nums">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="h-3 w-3" strokeWidth={2.5} />
              <Wifi className="h-3 w-3" strokeWidth={2.5} />
              <BatteryFull className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
          </div>

          <div className="flex-1 overflow-hidden px-4 pt-6 pb-3">
            <div className="flex flex-col items-center">
              <div className="relative h-[86px] w-[86px] overflow-hidden rounded-full ring-4 ring-white shadow-[0_8px_24px_-8px_rgba(250,111,98,0.45)]">
                <Image
                  src="/assets/phone-mockup/avatar.jpg"
                  alt=""
                  fill
                  sizes="86px"
                  className="object-cover"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-3 font-display text-[17px] font-bold tracking-tight text-neutral-900">
                {t("name")}
              </h3>
              <p className="mt-0.5 text-[12px] font-semibold text-primary">
                {t("handle")}
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">
                {t("tagline")}
              </p>

              <div className="mt-3 flex gap-2.5">
                {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-display text-[13px] font-bold tracking-tight text-neutral-900">
                {t("newArrivals")}
              </h4>
              <div className="mt-2 flex gap-2 overflow-hidden">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.nameKey}
                    className="w-[38%] shrink-0 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-[0_4px_16px_-8px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative aspect-[5/6] w-full bg-neutral-100">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="px-1.5 py-1.5">
                      <p className="truncate text-[9px] font-semibold leading-tight text-neutral-900">
                        {t(product.nameKey)}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold leading-none text-primary">
                        {t(product.priceKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3.5">
              <h4 className="font-display text-[13px] font-bold tracking-tight text-neutral-900">
                {t("linksTitle")}
              </h4>
              <div className="mt-2 space-y-1.5">
                {LINKS.map(({ key, Icon }) => (
                  <div
                    key={key}
                    className="relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-neutral-200/70 bg-white px-2.5 py-2 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)]"
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-0.5 bg-primary"
                      aria-hidden="true"
                    />
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.3} />
                    </div>
                    <span className="flex-1 text-[11px] font-semibold text-neutral-900">
                      {t(key)}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-1.5" aria-hidden="true">
            <div className="h-1 w-24 rounded-full bg-neutral-900/70" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
