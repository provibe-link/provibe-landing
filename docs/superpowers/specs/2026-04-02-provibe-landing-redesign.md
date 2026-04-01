# ProVibe Landing Page Redesign — Design Spec

## Context

ProVibe is a creator-brand platform launching July 2026 in three phases: Creator Platform (Phase 1), Brand Marketplace (Phase 2), and AI Growth Engine (Phase 3). The landing site needs to be redesigned to reflect this vision, capture creator leads before launch, and present coming-soon features as a teaser roadmap. All existing pages (Home, Creators, Brands, Blogs, About, Contact) will be redesigned.

**Design direction:** Bold Creator Energy — vibrant, energetic, maximalist. Builds on the existing warm orange-red palette, phone mockup, floating cards, and Framer Motion animations.

**Key constraint:** Keep the same brand color (#fa6f62 orange-red) and existing layout patterns across all pages. No new color accents for different pages.

---

## Global Changes

### Navbar (`components/layout/navbar.tsx`)
- Replace "Create Page" button → **"Join Waitlist"** (primary button, opens waitlist dialog)
- Remove "Log in" link (no app yet)
- Add subtle **"Launching July 2026"** text badge near the logo
- Nav links remain: Home, Creators, Brands, Blog, About

### Footer (`components/layout/footer.tsx`)
- Update tagline to pre-launch messaging: "The modern platform for creators to build, monetize, and grow. Launching July 2026."
- Remove dead links: Pricing, Changelog, Careers
- Add "Join the Waitlist →" CTA link in the brand column
- Keep social links (Twitter, Instagram, LinkedIn, GitHub) and legal links (Privacy, Terms, Cookies)

### Waitlist Dialog (NEW: `components/shared/waitlist-dialog.tsx`)
- **Trigger:** Floating sticky button (bottom-right), hero CTA, navbar button, CTA sections — all open the same dialog
- **Dialog content:**
  - Rocket emoji + "Join the Waitlist" heading
  - Subtitle: "Be first to launch when ProVibe goes live"
  - Fields: Name (text), Email (email, required), Social handle (text, placeholder "@handle")
  - Submit button: "Get Early Access →"
  - Privacy note: "No spam. We'll only email you about launch updates."
  - Success state: checkmark animation + "You're on the list!" message
- **Implementation:** Use shadcn/ui `Dialog` component
- **API:** POST to backend endpoint (URL to be configured via env var `NEXT_PUBLIC_WAITLIST_API_URL`)
- **Validation:** Email required, basic format check. Name and handle optional but encouraged.

### Sticky Floating Button (NEW: `components/shared/floating-waitlist-button.tsx`)
- Fixed position: bottom-right corner (`bottom-6 right-6`)
- Appearance: Primary color pill button "🚀 Join the Waitlist" with subtle glow shadow
- Small "FREE" badge on top-right corner
- Subtle pulse animation (CSS `animate-glow-pulse`)
- **Visibility:** Hidden when hero is in viewport, appears after scrolling past hero
- Click opens the waitlist dialog
- Respects `prefers-reduced-motion` (no pulse, still visible)

---

## Page Designs

### 1. Home Page (`app/page.tsx`)

**Section order (10 sections):**

#### 1.1 Hero (`components/home/hero.tsx`) — MODIFY
- Add **"🚀 Launching July 2026"** badge above headline
- Headline: "Your Creator Empire **Starts Here.**"
- Subheadline: "Bio links, digital store, brand deals, analytics — one platform to build, monetize, and grow."
- Two CTAs: "Join the Waitlist →" (primary, opens dialog) + "See Features" (ghost/outline, scrolls to features)
- Social proof counters below CTAs: "10K+ Creators waiting" · "500+ Brand partners" · "$2M+ Creator earnings" (animated counters using existing `useCountUp` hook)
- Keep existing phone mockup + floating cards animation
- Keep existing parallax scroll behavior and background orbs

#### 1.2 Brand Scroller (`components/home/brand-scroller.tsx`) — MINOR UPDATE
- Add eyebrow text: "Trusted by creators working with"
- Keep existing dual-row infinite scroll
- No structural changes

#### 1.3 For Every Creator (NEW: `components/home/for-every-creator.tsx`)
- Eyebrow: "Built For You"
- Headline: "For Every **Creator**"
- Subtitle: "No matter your niche, audience size, or goals — ProVibe adapts to how you create."
- 6-card grid (3 cols desktop, 2 cols mobile):
  - 🎥 Video Creators — "YouTube, TikTok, Reels"
  - 📸 Photographers — "Portfolios & prints"
  - ✍️ Writers & Bloggers — "Newsletters & ebooks"
  - 🎵 Musicians — "Merch & streaming"
  - 🎨 Artists & Designers — "Digital art & commissions"
  - 💪 Fitness & Coaches — "Programs & bookings"
- Each card: subtle gradient background tint (using primary at low opacity), emoji icon, title, subtitle
- Use `AnimatedSection` with stagger for scroll reveal
- Reuse `SectionHeader` component for eyebrow/headline

#### 1.4 Platform Features (`components/home/features.tsx` + `components/home/features2.tsx`) — MODIFY
- Consolidate into a single features section
- Eyebrow: "Platform Features"
- Headline: "Everything You Need to **Monetize**"
- 6-card grid (2 cols mobile, 3 cols desktop):
  - 🔗 Bio Link Pages — "Custom SEO-friendly pages"
  - 🛒 Digital Store — "Sell products & services"
  - 📊 Analytics — "Track clicks & conversions"
  - 📧 Lead Capture — "Grow your subscriber list"
  - 🤝 Brand Deals — "Connect with top brands"
  - 📢 Campaigns — "Broadcast to your audience"
- Use existing `GradientCard` component with hover border effect
- Each card: Lucide icon (not emoji in final), title, description

#### 1.5 How It Works (NEW: `components/home/how-it-works.tsx`)
- Eyebrow: "How It Works"
- Headline: "Launch in **3 Minutes**"
- 3-step vertical layout with numbered circles:
  1. **Create Your Page** — "Pick a template, add your links, products, and content blocks"
  2. **Set Up Your Store** — "Add digital products, services, or affiliate links to start earning"
  3. **Grow & Monetize** — "Track analytics, capture leads, and land brand partnerships"
- Numbered circles in primary color, connected with a vertical line
- Use `AnimatedSection` for staggered reveal

#### 1.6 Roadmap Teaser (NEW: `components/home/roadmap.tsx`)
- Eyebrow: "Roadmap"
- Headline: "What's **Coming Next**"
- 3 cards stacked vertically with decreasing opacity:
  - **Phase 1 — JULY 2026** (highlighted, primary border, full opacity): "Creator Platform Launch" — Bio links, digital store, analytics, lead capture, monetization tools
  - **Phase 2 — COMING SOON** (dimmed, 70% opacity): "Brand Marketplace" — Creator-brand matching, campaign management, collaboration tools
  - **Phase 3 — 2027** (more dimmed, 50% opacity): "AI Growth Engine" — Smart scheduling, content AI, creator matching, predictive analytics
- Phase 1 card has primary background tint and solid primary badge
- Phase 2/3 have muted background and muted badges
- Subtle gradient background for the section (dark with slight warm tint)

#### 1.7 Testimonials (`components/home/testimonials.tsx`) — MINOR UPDATE
- Keep existing Embla carousel structure
- Update testimonial content to be pre-launch relevant (beta testers, early access feedback)
- No structural changes

#### 1.8 FAQ (`components/home/faq.tsx`) — CONTENT UPDATE
- Keep existing accordion structure
- Update Q&A content for pre-launch:
  - What is ProVibe?
  - When does ProVibe launch?
  - Is it free to join the waitlist?
  - What features will be available at launch?
  - How is ProVibe different from Linktree?
  - Will there be a free plan?
  - How do brand partnerships work?
  - Can I sell products on ProVibe?

#### 1.9 CTA (`components/home/cta.tsx`) — MODIFY
- Headline: "Ready to Build Your Creator Empire?"
- Subtitle: "Join 10,000+ creators on the waitlist. Be first when we launch July 2026."
- Single button: "Join the Waitlist →" (white on gradient, opens dialog)
- Keep existing gradient background + grain overlay + floating orbs

#### 1.10 Sticky Floating Button
- Rendered in layout or home page, always present
- See "Sticky Floating Button" spec above

**Components to remove from home page:**
- `components/home/creator-stories.tsx` — replaced by "For Every Creator"
- `components/home/features2.tsx` — consolidated into single features section

---

### 2. Creators Page (`app/creators/content.tsx`) — REDESIGN

**Section order:**

1. **Hero** — "Your Bio. Your Store. **Your Empire.**" + phone mockup showing creator bio page + "Join the Waitlist →" CTA
2. **Feature Deep-Dives** — 5 horizontal cards (icon + title + description):
   - 🔗 Bio Link Builder — drag-and-drop blocks for links, media, products, forms, embeds
   - 🛒 Digital Storefront — sell digital/physical products, services, bookings, subscriptions
   - 📊 Analytics Dashboard — track link clicks, conversions, revenue, audience growth
   - 📧 Lead Gen & Broadcasting — capture emails, broadcast campaigns, grow subscribers
   - 🎯 Affiliate Management — track affiliate links, commissions, performance
3. **Template Gallery** — 3 sample bio page template previews (placeholder images for now)
4. **Creator FAQ** — accordion with creator-specific questions
5. **CTA** — gradient banner with "Start Building Today" + waitlist button

---

### 3. Brands Page (`app/brands/content.tsx`) — REDESIGN AS COMING SOON

**Section order:**

1. **Hero** — "Find Your Perfect **Creator Match.**" + "Coming Soon — Phase 2" badge (same primary color, not indigo) + "Get Notified When We Launch →" CTA (opens waitlist dialog)
2. **Feature Preview** — 4-card grid showing what brands will get:
   - 🔍 Creator Discovery — search by niche, audience, metrics
   - 📋 Campaign Manager — launch & track campaigns
   - 📈 ROI Analytics — measure real campaign results
   - 💬 Direct Messaging — communicate with creators
3. **CTA** — gradient banner with "Be First to Access" + waitlist button

Keep same orange-red brand color throughout. Differentiate from creator page through copy/messaging, not color.

---

### 4. Blogs Page (`app/blogs/content.tsx`) — STYLE UPDATE

- Update header section to match new design language (gradient background, SectionHeader)
- Refine category filter pills styling
- Add featured post highlight at top (larger card)
- Keep existing search, grid layout, and blog post page structure
- No structural changes to `app/blogs/[slug]/content.tsx`

---

### 5. About Page (`app/about/content.tsx`) — REDESIGN

**Section order:**

1. **Hero** — "Built **By Creators,** For Creators" + mission subtitle
2. **Mission** — short paragraph about ProVibe's purpose
3. **Stats** — 3 animated counters: "2026 Founded" · "10K+ Waitlist" · "3 Phases planned"
4. **Vision/Roadmap** — reuse roadmap component from home page (or simplified version)
5. **Team** — founder/team cards with photos (placeholder images), name, role, short bio
6. **Values** — 3-4 core value cards (e.g., Creator-First, Transparency, Innovation, Community)
7. **CTA** — "Join Our Journey" + waitlist button

---

### 6. Contact Page (`app/contact/content.tsx`) — STYLE UPDATE

- Update header section to match new design language
- Keep existing form structure (name, email, subject, message)
- Update subject options: General Inquiry, Partnership, Creator Support, Press, Brand Inquiry
- Keep contact info sidebar (email, response time, FAQ link, socials)
- Styling refresh to match new design system
- No structural changes

---

## Files to Create

| File | Purpose |
|------|---------|
| `components/shared/waitlist-dialog.tsx` | Reusable waitlist modal with form |
| `components/shared/floating-waitlist-button.tsx` | Sticky bottom-right CTA button |
| `components/home/for-every-creator.tsx` | Creator niche showcase grid |
| `components/home/how-it-works.tsx` | 3-step process section |
| `components/home/roadmap.tsx` | Phase 1/2/3 teaser timeline |

## Files to Modify

| File | Changes |
|------|---------|
| `app/page.tsx` | New section order, add new components, remove old ones |
| `app/layout.tsx` | Add floating waitlist button globally |
| `components/home/hero.tsx` | Launch badge, new copy, waitlist CTA, counters |
| `components/home/brand-scroller.tsx` | Add eyebrow text |
| `components/home/features.tsx` | Consolidate into single 6-card grid |
| `components/home/testimonials.tsx` | Update content for pre-launch |
| `components/home/faq.tsx` | Update Q&A for pre-launch |
| `components/home/cta.tsx` | Update copy for waitlist focus |
| `components/layout/navbar.tsx` | Waitlist button, remove login, add launch badge |
| `components/layout/footer.tsx` | Update tagline, remove dead links, add waitlist CTA |
| `app/creators/content.tsx` | Full redesign with feature deep-dives |
| `app/brands/content.tsx` | Redesign as "Coming Soon" page |
| `app/blogs/content.tsx` | Style updates, featured post |
| `app/about/content.tsx` | Full redesign with mission/team/values |
| `app/contact/content.tsx` | Style refresh, updated subject options |

## Files to Remove

| File | Reason |
|------|--------|
| `components/home/creator-stories.tsx` | Replaced by "For Every Creator" |
| `components/home/features2.tsx` | Consolidated into single features section |

## Reusable Components & Utilities

- `components/shared/section-header.tsx` — for all section eyebrow/headline/description
- `components/shared/gradient-card.tsx` — for feature cards
- `components/shared/animated-section.tsx` — for scroll-triggered animations
- `components/shared/grain-overlay.tsx` — for CTA section texture
- `lib/animations/variants.ts` — `fadeUp`, `staggerContainer`, `cardFadeUp`
- `lib/animations/hooks.ts` — `useCountUp`, `useReducedMotion`
- `shadcn/ui Dialog` — for waitlist modal

## Verification

1. **Dev server:** Run `pnpm dev` and verify all pages render without errors
2. **Visual check:** Navigate all 6 pages, verify consistent styling and brand color
3. **Waitlist flow:** Test floating button → dialog → form submission → success state on every page
4. **Responsive:** Check all pages on mobile (375px), tablet (768px), desktop (1280px+)
5. **Dark/light mode:** Verify both themes work across all pages
6. **Animations:** Verify scroll animations, parallax, and hover effects
7. **Reduced motion:** Test with `prefers-reduced-motion: reduce`
8. **Build:** Run `pnpm build` to confirm no TypeScript or build errors
9. **Lint:** Run `pnpm lint` to confirm no linting issues
