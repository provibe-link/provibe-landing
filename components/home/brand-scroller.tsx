"use client"

// Placeholder brand names (would be logos in production)
const brandsRow1 = [
  "Nike", "Spotify", "Adobe", "Shopify", "Notion",
  "Figma", "Stripe", "Discord", "Twitch", "YouTube",
  "TikTok", "Snapchat", "Pinterest", "Slack",
]

const brandsRow2 = [
  "Canva", "Mailchimp", "HubSpot", "Squarespace", "Webflow",
  "Framer", "Linear", "Vercel", "GitHub", "Dribbble",
  "Behance", "Medium", "Substack", "Patreon",
]

export function BrandScroller() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Trusted by Industry Leading Worldwide
        </p>
      </div>

      {/* Scrolling Rows */}
      <div className="space-y-6">
        {/* Row 1 - Left to Right */}
        <div className="relative">
          <div className="flex animate-scroll-left">
            {[...brandsRow1, ...brandsRow1].map((brand, i) => (
              <div
                key={`r1-${i}`}
                className="mx-4 flex shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card/50 px-8 py-4 opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:border-primary/30"
              >
                <span className="whitespace-nowrap font-heading text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative">
          <div className="flex animate-scroll-right">
            {[...brandsRow2, ...brandsRow2].map((brand, i) => (
              <div
                key={`r2-${i}`}
                className="mx-4 flex shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card/50 px-8 py-4 opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:border-primary/30"
              >
                <span className="whitespace-nowrap font-heading text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
