"use client"

/**
 * Creator storefront template preview mockups.
 * Each template renders a realistic SVG-based preview showing
 * a creator profile, products, and booking sections.
 */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      {/* Phone bezel */}
      <div className="rounded-[2rem] border-2 border-border bg-background p-2 shadow-xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/10" />
        {/* Screen */}
        <div className="overflow-hidden rounded-[1.5rem] bg-background">
          {children}
        </div>
      </div>
    </div>
  )
}

function Avatar({
  initials,
  gradient,
}: {
  initials: string
  gradient: string
}) {
  return (
    <div
      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white shadow-md"
      style={{ background: gradient }}
    >
      {initials}
    </div>
  )
}

function ProductCard({
  name,
  price,
  accent,
}: {
  name: string
  price: string
  accent: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <div
          className="h-8 w-8 rounded-md"
          style={{ background: `${accent}20` }}
        />
        <span className="text-[11px] font-medium text-foreground">{name}</span>
      </div>
      <span className="text-[11px] font-bold" style={{ color: accent }}>
        {price}
      </span>
    </div>
  )
}

function ActionButton({
  label,
  accent,
  variant = "solid",
}: {
  label: string
  accent: string
  variant?: "solid" | "outline"
}) {
  return (
    <div
      className="rounded-lg px-4 py-2 text-center text-[11px] font-semibold"
      style={
        variant === "solid"
          ? { background: accent, color: "#fff" }
          : {
              border: `1.5px solid ${accent}`,
              color: accent,
              background: "transparent",
            }
      }
    >
      {label}
    </div>
  )
}

/** Minimal — clean, spacious, monochrome with a single accent */
export function MinimalTemplate() {
  const accent = "#6366f1"
  return (
    <PhoneFrame>
      <div className="space-y-4 px-5 pb-6 pt-10">
        <Avatar initials="AS" gradient={`linear-gradient(135deg, ${accent}, #818cf8)`} />
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">Ananya Sharma</p>
          <p className="text-[11px] text-muted-foreground">
            Designer & Illustrator
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Products
          </p>
          <ProductCard name="Icon Pack Vol. 2" price="₹499" accent={accent} />
          <ProductCard name="Procreate Brushes" price="₹799" accent={accent} />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Bookings
          </p>
          <ActionButton label="Book a Design Review — ₹1,999" accent={accent} />
        </div>

        <ActionButton label="Get in Touch" accent={accent} variant="outline" />
      </div>
    </PhoneFrame>
  )
}

/** Bold — vibrant gradients, stronger contrast, energetic feel */
export function BoldTemplate() {
  const accent = "#f43f5e"
  return (
    <PhoneFrame>
      <div className="pb-6 pt-10">
        {/* Gradient header */}
        <div
          className="mx-4 rounded-xl px-5 py-5 text-center"
          style={{
            background: `linear-gradient(135deg, ${accent}, #fb923c)`,
          }}
        >
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/40 text-base font-bold text-white">
            RK
          </div>
          <p className="text-sm font-bold text-white">Ravi Kumar</p>
          <p className="text-[11px] text-white/70">Fitness Coach & YouTuber</p>
        </div>

        <div className="space-y-4 px-5 pt-4">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Programs
            </p>
            <ProductCard
              name="12-Week Transform"
              price="₹2,999"
              accent={accent}
            />
            <ProductCard
              name="Meal Plan Bundle"
              price="₹999"
              accent={accent}
            />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sessions
            </p>
            <ActionButton
              label="1:1 Coaching Call — ₹1,499"
              accent={accent}
            />
          </div>

          <ActionButton
            label="Collab with Me"
            accent={accent}
            variant="outline"
          />
        </div>
      </div>
    </PhoneFrame>
  )
}

/** Creative — asymmetric layout, playful colors, editorial feel */
export function CreativeTemplate() {
  const accent = "#8b5cf6"
  return (
    <PhoneFrame>
      <div className="space-y-4 px-5 pb-6 pt-10">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}, #ec4899)`,
            }}
          >
            NP
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Neha Patel</p>
            <p className="text-[11px] text-muted-foreground">
              Content Creator & Author
            </p>
          </div>
        </div>

        {/* Promo block */}
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: `${accent}12` }}
        >
          <p className="text-[10px] font-semibold" style={{ color: accent }}>
            FEATURED
          </p>
          <p className="mt-0.5 text-[12px] font-bold text-foreground">
            New Book: &quot;Creator Economy 101&quot;
          </p>
          <p className="text-[11px] text-muted-foreground">
            Pre-order now — launches May 2026
          </p>
        </div>

        <div className="space-y-2">
          <ProductCard
            name="Writing Masterclass"
            price="₹3,499"
            accent={accent}
          />
          <ProductCard
            name="Notion Template Kit"
            price="₹299"
            accent={accent}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ActionButton label="Book a Session" accent={accent} />
          <ActionButton
            label="Brand Inquiries"
            accent={accent}
            variant="outline"
          />
        </div>
      </div>
    </PhoneFrame>
  )
}
