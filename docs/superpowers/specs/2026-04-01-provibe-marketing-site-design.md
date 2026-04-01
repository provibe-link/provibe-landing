# ProVibe Marketing Website - Design Specification

**Date:** 2026-04-01  
**Project:** ProVibe Landing Site  
**Approach:** Hybrid - Core System + Iterative Pages

---

## 1. Project Overview

### What We're Building
A production-grade marketing website for ProVibe - a creator marketplace platform that enables influencers and creators to:
1. Create bio pages and increase content reach
2. Connect with brands for partnership opportunities  
3. Explore nearby events and meetups

### Target Audience
- Primary: Gen Z and millennial creators, influencers
- Secondary: Brands seeking authentic creator partnerships
- Tertiary: Event organizers and community builders

### Brand Personality: Energetic & Bold
- **Vibe:** High energy, vibrant, youth-focused
- **Visual Inspiration:** TikTok, Instagram, Behance
- **Design Direction:** Bright gradients, dynamic animations, bold typography, asymmetric layouts
- **Differentiator:** Standing out in the creator economy space with distinctive, memorable design

---

## 2. Technical Foundation

### Tech Stack
- **Framework:** Next.js 16.1.7 (App Router)
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 + CSS variables
- **Components:** shadcn/ui (Radix Nova style, "mist" base color)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes with dark mode support (dark theme first)
- **TypeScript:** Full type safety

### Project Structure
```
provibe-landing/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, theme provider
│   ├── page.tsx                   # Homepage (story-driven flow)
│   ├── creators/page.tsx          # Creator-focused landing
│   ├── brands/page.tsx            # Brand partnership page
│   ├── blogs/
│   │   ├── page.tsx              # Blog listing with filters
│   │   └── [slug]/page.tsx       # Individual blog post
│   ├── about/page.tsx            # Company story and team
│   └── contact/page.tsx          # Contact form
├── components/
│   ├── layout/
│   │   ├── navbar.tsx            # Main navigation (transparent → solid on scroll)
│   │   └── footer.tsx            # Site footer (4-column layout)
│   ├── home/                     # Homepage sections
│   │   ├── hero.tsx              # Full viewport hero with animated gradients
│   │   ├── problem-solution.tsx  # Two-column problem/solution
│   │   ├── features.tsx          # 3-column feature grid
│   │   ├── brand-scroller.tsx    # Infinite horizontal logo scroll
│   │   ├── how-it-works.tsx      # Step-by-step process timeline
│   │   ├── success-stories.tsx   # Creator result cards
│   │   ├── testimonials.tsx      # Carousel with quotes
│   │   ├── faq.tsx               # Accordion with Q&A
│   │   └── cta.tsx               # Final conversion section
│   ├── shared/                   # Reusable across pages
│   │   ├── animated-section.tsx  # Scroll-triggered animation wrapper
│   │   ├── gradient-card.tsx     # Energetic card with animated borders
│   │   ├── creator-card.tsx      # Creator profile card component
│   │   └── stats-counter.tsx     # Animated number counter (scroll-triggered)
│   └── ui/                       # shadcn/ui components (already installed)
├── lib/
│   ├── animations/
│   │   ├── variants.ts           # Framer Motion variant presets
│   │   ├── scroll-animations.ts  # Custom scroll hooks (useScrollAnimation, useParallax)
│   │   ├── page-transitions.ts   # Route transition configurations
│   │   └── hooks.ts              # Animation utility hooks (useMagneticButton, useCountUp, etc.)
│   └── utils.ts                  # cn helper (already exists)
└── public/
    └── images/                   # Image placeholder specifications
```

---

## 3. Design System

### Typography System

**Display/Hero Font:** Space Grotesk or Syne
- Usage: Hero headlines, section titles
- Weight: 700-900 (Bold to Black)
- Size: 48px - 96px desktop, 32px - 48px mobile
- Line height: 1.1

**Heading Font:** Clash Display or Outfit  
- Usage: H2, H3 headings
- Weight: 600-700 (Semibold to Bold)
- Size: 32px - 64px desktop, 24px - 40px mobile
- Line height: 1.2

**Body Font:** Inter or DM Sans
- Usage: Paragraphs, UI text, descriptions
- Weight: 400-500 (Regular to Medium)
- Size: 16px - 20px desktop, 14px - 18px mobile
- Line height: 1.6

**Accent Font:** JetBrains Mono
- Usage: Stats, numbers, code-like elements
- Weight: 500-600
- Size: 14px - 24px
- Line height: 1.4

**Implementation:**
- Load via `next/font/google` in `app/layout.tsx`
- Define CSS variables: `--font-display`, `--font-heading`, `--font-body`, `--font-mono`
- Apply via Tailwind utility classes

### Color System

**Dark Theme (Primary):**

**Base Colors:**
- Background: `oklch(0.12 0.01 240)` - Deep dark blue-black
- Foreground: `oklch(0.987 0.002 197.1)` - High contrast white
- Surface: `oklch(0.18 0.008 240)` - Slightly lighter for cards

**Primary Color Palette (Orange-Pink Range):**
- Primary: `#fa6f62` (coral-orange)
- Orange Light: `#ff8a7a`
- Orange Dark: `#e55548`
- Pink: `#ff6b9d`
- Pink Light: `#ff85b3`
- Pink Dark: `#e5507c`

**Gradient System:**
- Primary gradient: `linear-gradient(135deg, #fa6f62 0%, #ff6b9d 100%)`
- Vibrant gradient: `linear-gradient(135deg, #ff8a7a 0%, #fa6f62 50%, #ff6b9d 100%)`
- Subtle gradient: `linear-gradient(135deg, #fa6f62 0%, #ff85b3 100%)`

**Interactive Elements:**
- Links, hover states: Primary color variants
- Active states, CTAs: Primary gradient
- Glow effects on hover with gradient borders

**Semantic Colors:**
- Success: `#10B981` (green)
- Warning: `#F59E0B` (amber)
- Error: `#EF4444` (red)
- Info: `#3B82F6` (blue)

**Light Theme (Optional, Accessible):**
- Keep existing mist theme configuration
- Optimize dark theme first per requirements

**CSS Variables:**
- Extend existing `globals.css` variables
- Add gradient definitions as CSS custom properties
- Define animation color stops

### Spacing & Layout

**Container:**
- Max-width: 1200px (as specified)
- Padding: 24px mobile, 48px tablet, 64px desktop
- Centered with `mx-auto`

**Section Spacing:**
- Vertical gap between sections: 120px desktop, 80px tablet, 60px mobile
- Consistent padding-top/padding-bottom on each section

**Grid System:**
- Gap: 24px (as specified)
- Responsive columns: 1 (mobile) → 2 (tablet) → 3 (desktop)
- Use CSS Grid and Flexbox

**Responsive Breakpoints:**
- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## 4. Animation System

### Philosophy: Full Showcase
Every interaction should feel premium and energetic without sacrificing performance.

### Animation Categories

**1. Hero Animations (Page Load)**
- Staggered text reveal for headline (word by word, 0.05s delay)
- Subheadline fade-up with 0.2s delay after headline
- CTA buttons scale-in with bounce effect
- Background gradient orbs: floating animation (slow, continuous)
- Cursor-following subtle parallax on gradient orbs

**2. Scroll-Triggered Animations**
- Fade-up: Default for most sections (threshold: 0.2)
- Slide-left/right: Alternating for features
- Scale: For cards and images
- Stagger: For grid items (0.1s delay between items)
- Progressive reveal: Elements appear as user scrolls

**3. Micro-Interactions**
- Magnetic buttons: Cursor pulls button slightly on hover
- Gradient shift: Background gradients rotate on hover
- Lift effect: Cards elevate with shadow on hover (translateY: -8px)
- Icon animations: Bounce, rotate, or scale on hover
- Link underline: Animated gradient underline on hover

**4. Page Transitions**
- Route changes: Fade + slide (200ms duration)
- Smooth scroll to anchor links
- Loading states with skeleton screens

**5. Specialty Animations**
- Infinite scroll: Brand logo scroller (two rows, opposite directions)
- Stats counter: Count from 0 to target on scroll into view
- Parallax: Background elements move slower than foreground
- Timeline animation: Connecting line draws as user scrolls

### Animation Library Structure

**`lib/animations/variants.ts`**
```typescript
// Framer Motion variant presets
export const fadeIn = { ... }
export const fadeUp = { ... }
export const fadeDown = { ... }
export const slideLeft = { ... }
export const slideRight = { ... }
export const scale = { ... }
export const staggerContainer = { ... }
export const staggerItem = { ... }

// Configurable factory functions
export const createFadeUp = (duration, delay) => { ... }
```

**`lib/animations/scroll-animations.ts`**
```typescript
export const useScrollAnimation = (threshold = 0.2) => { ... }
export const useParallax = (speed = 0.5) => { ... }
export const useScrollProgress = () => { ... }
```

**`lib/animations/page-transitions.ts`**
```typescript
export const pageVariants = { ... }
export const pageTransition = { ... }
```

**`lib/animations/hooks.ts`**
```typescript
export const useMagneticButton = () => { ... }
export const useCountUp = (target, duration) => { ... }
export const useReducedMotion = () => { ... }
export const useGradientRotation = () => { ... }
```

### Performance & Accessibility
- All animations use GPU-accelerated properties (transform, opacity)
- Respect `prefers-reduced-motion` media query
- Disable complex animations on mobile by default
- Lazy load animation libraries below fold
- 60fps target for all animations

---

## 5. Core Components

### Reusable Shared Components

**1. AnimatedSection (`components/shared/animated-section.tsx`)**
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode
  variant?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'custom'
  delay?: number
  threshold?: number
  className?: string
}
```
**Purpose:** Wraps any section with scroll-triggered animations  
**Usage:** Every homepage section uses this for consistent reveals

**2. GradientCard (`components/shared/gradient-card.tsx`)**
```typescript
interface GradientCardProps {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'solid'
  hoverEffect?: boolean
  className?: string
}
```
**Features:**
- Animated gradient border (rotation effect)
- Hover lift with gradient shift
- Optional glass morphism background
- Used for features, creator profiles, brand cards

**3. StatsCounter (`components/shared/stats-counter.tsx`)**
```typescript
interface StatsCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}
```
**Purpose:** Animated number counting from 0 to target  
**Trigger:** Scroll into view  
**Usage:** "10K+ creators", "500+ brands", "1M+ connections"

**4. MagneticButton (extends shadcn Button)**
```typescript
// Extension of shadcn/ui Button component
// Add magnetic hover effect via useMagneticButton hook
```
**Features:**
- Cursor follows on hover (subtle magnetic pull)
- Gradient background with shine effect
- Primary CTA throughout site

**5. CreatorCard (`components/shared/creator-card.tsx`)**
```typescript
interface CreatorCardProps {
  name: string
  niche: string
  avatar: string
  stats: { followers: number, engagement: number }
  featured?: boolean
}
```
**Usage:** Creator showcases on homepage and /creators page

### Layout Components

**Navbar (`components/layout/navbar.tsx`)**
- **Behavior:** Transparent on hero, solid background on scroll (threshold: 100px)
- **Layout:** Logo left, nav links center, CTA button right
- **Mobile:** Hamburger menu with slide-in drawer (Framer Motion AnimatePresence)
- **Sticky:** Fixed positioning with smooth show/hide on scroll direction
- **Links:** Home, Creators, Brands, Blog, About, Contact
- **Active state:** Gradient underline for current page

**Footer (`components/layout/footer.tsx`)**
- **Layout:** 4-column grid (responsive: 2 cols tablet, 1 col mobile)
  - Column 1: Logo + tagline + social icons
  - Column 2: Product (Features, Creators, Brands, Pricing)
  - Column 3: Resources (Blog, Help, Events, Community)
  - Column 4: Legal (Privacy, Terms, Contact)
- **Newsletter:** Email signup with inline validation
- **Copyright:** Bottom row with copyright text + additional links
- **Social Icons:** Gradient hover effect on icons

---

## 6. Homepage Design (Story-Driven Flow)

### Section Order
1. Hero
2. Problem/Solution
3. Features
4. Brand Logos
5. How It Works
6. Success Stories
7. Testimonials
8. FAQ
9. CTA

### Detailed Section Specs

**1. Hero Section**
- **Height:** Full viewport (100vh, min 600px, max 900px)
- **Layout:** Centered content with background effects
- **Content:**
  - Headline: "Create. Connect. Grow." (or similar powerful statement)
  - Gradient text effect on key words
  - Subheadline: "Join 10K+ creators building their brand and connecting with opportunities"
  - Primary CTA: "Start Creating Free" (large, gradient button)
  - Secondary CTA: "See How It Works" (ghost button, smooth scroll to How It Works)
- **Background:**
  - 3-5 floating gradient orbs (blur: 150px)
  - Animated slow movement (float keyframe)
  - Subtle parallax on scroll
  - Grain texture overlay for depth
- **Animation:**
  - Headline: Staggered word reveal (0.05s between words)
  - Subheadline: Fade-up 0.2s after headline
  - CTAs: Scale-in with bounce 0.3s after headline
  - Background orbs: Continuous float animation

**2. Problem/Solution Section**
- **Layout:** Two columns desktop (50/50), stacked mobile
- **Problem Side:**
  - Icon: Frustrated face or crossed lines (animated)
  - Headline: "Struggling to stand out?"
  - Pain points: 3-4 bullet points (bio link limitations, scattered presence, missed opportunities)
- **Solution Side:**
  - Icon: Lightbulb or rocket (animated)
  - Headline: "ProVibe solves that"
  - Benefits: 3-4 bullet points (unified presence, brand connections, event discovery)
- **Divider:** Animated gradient line between columns (draw effect on scroll)
- **Animation:** Icons rotate/bounce on scroll into view

**3. Features Section**
- **Layout:** 3-column grid (1 col mobile, 2 col tablet, 3 col desktop)
- **Features:**
  1. **Bio Pages**
     - Icon: Portfolio/document icon
     - Headline: "Stand Out with Bio Pages"
     - Description: "Create stunning, customizable bio pages that showcase all your content in one place"
     - Link: "Explore Bio Pages →"
  2. **Brand Connections**
     - Icon: Handshake/network icon
     - Headline: "Connect with Top Brands"
     - Description: "Get discovered by brands looking for authentic creators in your niche"
     - Link: "See Brand Partners →"
  3. **Events & Meetups**
     - Icon: Calendar/location icon
     - Headline: "Discover Local Events"
     - Description: "Find nearby events, collaborate with creators, and grow your network"
     - Link: "Browse Events →"
- **Cards:** Use GradientCard component with hover effects
- **Animation:** Staggered appearance (left → center → right, 0.1s delay)

**4. Brand Logos Section**
- **Layout:** Full-width horizontal scroller
- **Content:**
  - Headline: "Trusted by Leading Brands"
  - Two rows of logos moving in opposite directions
  - 10-15 placeholder brand logos per row
- **Logo Treatment:**
  - Grayscale by default
  - Color + slight scale on hover
  - Semi-transparent (0.6 opacity)
- **Animation:**
  - Infinite scroll (CSS animation or Framer Motion)
  - Top row: Left to right
  - Bottom row: Right to left
  - Slight parallax speed difference between rows
- **Performance:** Use CSS transforms for infinite scroll

**5. How It Works Section**
- **Layout:** Vertical timeline (center-aligned)
- **Steps:** 4 steps
  1. **Sign Up Free**
     - Icon: User plus
     - Description: "Create your account in 30 seconds"
  2. **Build Your Bio**
     - Icon: Paint brush
     - Description: "Customize your page with content and links"
  3. **Get Discovered**
     - Icon: Trending up
     - Description: "Brands and creators find you"
  4. **Grow Together**
     - Icon: Rocket
     - Description: "Collaborate, create, and monetize"
- **Timeline Visual:**
  - Animated connecting line (draws as user scrolls)
  - Numbered circles for each step
  - Icons inside circles
  - Gradient color shift down the timeline
- **Animation:**
  - Timeline line draws progressively
  - Each step fades in when reached
  - Icons bounce when revealed

**6. Success Stories Section**
- **Layout:** 2-column grid (1 col mobile)
- **Content:** 2-4 creator success stories
- **Story Card:**
  - Large creator profile image (circular or rounded square)
  - Name + niche badge
  - Before/after stats (followers, engagement, deals)
  - Quote: "ProVibe helped me..."
  - CTA: "Read Full Story →"
- **Card Style:** GradientCard with glass morphism
- **Animation:** Scale on scroll into view, hover lift

**7. Testimonials Section**
- **Layout:** Carousel/slider (3 visible desktop, 1 mobile)
- **Content:** 6-8 testimonials
- **Testimonial Card:**
  - 5-star rating (gradient stars)
  - Quote text (2-3 sentences)
  - Avatar image (small, circular)
  - Name + platform/niche
- **Carousel Controls:**
  - Dots indicator at bottom
  - Arrow navigation (left/right)
  - Auto-play (5s interval, pause on hover)
  - Swipe on mobile
- **Animation:** Smooth slide transitions

**8. FAQ Section**
- **Layout:** Single column, max-width 800px centered
- **Headline:** "Frequently Asked Questions"
- **Questions:** 6-8 common questions
  - What is ProVibe?
  - How much does it cost?
  - How do brand connections work?
  - Can I use my existing bio links?
  - What events are available?
  - Is there a mobile app?
  - How do I get started?
  - How do I contact support?
- **Component:** shadcn Accordion
- **Styling:** Gradient accent on open item
- **Animation:** Smooth expand/collapse
- **Optional:** Search bar at top to filter questions

**9. CTA Section (Final)**
- **Layout:** Full-width, centered content
- **Background:** Vibrant gradient (orange → coral → pink)
- **Content:**
  - Headline: "Ready to Level Up?"
  - Subheadline: "Join thousands of creators building their brand"
  - Primary CTA: "Get Started Free"
  - Trust signals: "No credit card required • Free forever"
- **Visual Treatment:**
  - Grain texture overlay
  - Floating gradient orbs (subtle)
  - High contrast white text
- **Animation:** Parallax on scroll, CTA pulse effect

---

## 7. Additional Pages

### /creators Page
**Purpose:** Landing page for creators (target audience)

**Sections:**
1. **Hero:** "Built for Creators Like You"
   - Creator-focused headline
   - Visual: Grid of creator avatars (animated)
   - CTA: "Start Your Page Free"

2. **Value Propositions:** 3-column grid
   - Bio Pages: Full control, custom branding
   - Brand Connections: Get discovered, monetize
   - Events: Network, collaborate, grow

3. **Feature Deep Dive:** Expanded feature explanations
   - Screenshots/mockups of bio page builder
   - Brand discovery dashboard preview
   - Event map interface

4. **Creator Showcase:** Filterable grid
   - Filter by: Niche, followers, location
   - 12-20 creator cards
   - CTA on each: "View Profile"

5. **Pricing/Plans** (if applicable)
   - Free tier features
   - Premium tier benefits
   - Comparison table

6. **CTA:** "Start Creating Today"

### /brands Page
**Purpose:** Landing page for brands seeking creators

**Sections:**
1. **Hero:** "Connect with Authentic Creators"
   - Brand-focused value prop
   - Visual: Creator collaboration imagery
   - CTA: "Find Creators"

2. **Benefits for Brands:** 3-column grid
   - Reach: Access to engaged creator network
   - Authenticity: Genuine creator partnerships
   - ROI: Measurable campaign results

3. **How It Works:** Step-by-step for brands
   1. Browse Creators
   2. Send Collaboration Requests
   3. Launch Campaigns
   4. Track Performance

4. **Featured Creators:** Carousel of top creators
   - Stats: Reach, engagement, niche
   - CTA: "View Profile"

5. **Case Study/Success Metrics:**
   - Example campaign results
   - Stats counters: Reach, engagement, conversions
   - Client testimonial

6. **CTA:** "Get Started with Creator Partnerships"

### /blogs Page
**Purpose:** Blog listing and content hub

**Layout:**
- **Hero/Header:**
  - Title: "ProVibe Blog"
  - Subtitle: "Tips, stories, and insights for creators"
  - Search bar

- **Featured Post:** Large card at top
  - Hero image
  - Category badge
  - Title + excerpt
  - Author + date
  - CTA: "Read More"

- **Blog Grid:** 3-column grid (2 col tablet, 1 col mobile)
  - Blog cards with:
    - Thumbnail image
    - Category badge (gradient)
    - Title
    - Excerpt (2 lines, truncated)
    - Author avatar + name
    - Date + read time
    - Hover: Lift effect

- **Filters/Categories:** Sidebar or top bar
  - All Posts
  - Creator Tips
  - Brand Partnerships
  - Events & Community
  - Platform Updates

- **Pagination or Infinite Scroll:**
  - Load more button vs. auto-load
  - Smooth transitions

### /blogs/[slug] Page
**Purpose:** Individual blog post

**Layout:**
- **Hero Section:**
  - Full-width featured image
  - Overlay gradient at bottom
  - Category badge
  - Title (large, bold)
  - Author avatar + name + date
  - Read time estimate

- **Article Content:**
  - Max-width: 720px, centered
  - Typography hierarchy (H2, H3, body)
  - Images: Full-width within content column
  - Code blocks (if needed): Syntax highlighting
  - Quotes: Styled blockquotes with gradient accent
  - Links: Gradient underline

- **Table of Contents** (for long posts):
  - Sticky sidebar on desktop
  - Collapsible on mobile
  - Auto-highlight current section

- **Author Bio:** Card at bottom
  - Avatar, name, bio text
  - Social links

- **Related Posts:** 3-column grid
  - "Read More Like This"
  - 3 related posts by category

- **Newsletter Signup:** Inline CTA
  - "Get creator tips in your inbox"
  - Email input + subscribe button

- **Social Share:** Floating or fixed
  - Twitter, Facebook, LinkedIn, Copy Link
  - Share counts (optional)

### /about Page
**Purpose:** Company story and team

**Sections:**
1. **Hero:** "We're Building the Creator Economy"
   - Company mission statement
   - Visual: Team photo or abstract graphic

2. **Story:** 2-column layout
   - "Why We Built ProVibe"
   - Narrative: Problem identified, solution created, vision for future

3. **Mission/Vision:** Icon + text blocks
   - Mission statement
   - Core values (3-4 values)

4. **Stats/Milestones:** Horizontal counter row
   - "10K+ Creators"
   - "500+ Brands"
   - "1M+ Connections"
   - "Founded 2024"

5. **Team Grid:** 3-4 column grid
   - Team member cards:
     - Photo (circular)
     - Name
     - Role
     - LinkedIn link
   - Hover: Color photo (grayscale default)

6. **CTA:** "Join Our Team" or "Get in Touch"

### /contact Page
**Purpose:** Contact form and info

**Layout:**
- **Two-column layout** (form left, info right, stacked mobile)

**Form Section:**
- **Headline:** "Get in Touch"
- **Form Fields:**
  - Name (required)
  - Email (required, validated)
  - Subject (dropdown: General, Partnership, Support, Press)
  - Message (textarea, required)
  - Submit button (gradient, magnetic effect)
- **Validation:** Inline error messages
- **Success State:** Confirmation message with expected response time
- **Form Component:** Use shadcn Form + Input components

**Info Section:**
- **Contact Information:**
  - Email: hello@provibe.com (mailto link)
  - Social links (gradient hover)
  - FAQ link: "Check our FAQ first"
- **Response Time:** "We'll respond within 24-48 hours"
- **Office/Location** (if applicable)

---

## 8. Responsive Design Strategy

### Mobile-First Approach
Design and develop for mobile first, then enhance for larger screens.

### Breakpoint Strategy

**Mobile (< 640px):**
- Single column layouts
- Stacked sections
- Simplified animations (reduced motion default)
- Hamburger navigation
- Full-width cards
- Larger touch targets (min 44px)

**Tablet (640px - 1024px):**
- 2-column grids where applicable
- Expanded navigation (may still be hamburger)
- More animation detail
- Larger typography scale

**Desktop (1024px+):**
- 3-column grids
- Full navigation visible
- All animation effects active
- Parallax and complex interactions
- Hover states fully enabled

**Large Desktop (1280px+):**
- Max container width enforced (1200px)
- More generous spacing
- Larger typography if needed

### Touch vs. Hover
- **Mobile/Tablet:** Remove hover-only interactions
- **Desktop:** Full hover effects (magnetic buttons, card lifts, etc.)
- Use `@media (hover: hover)` for hover-specific styles

### Performance Considerations
- **Images:** Next.js Image component with responsive sizes
- **Fonts:** Subset Google Fonts, preload critical fonts
- **Animations:** Disable complex animations on mobile, use CSS animations where possible
- **Lazy Loading:** Below-fold components, images, and animation libraries
- **Code Splitting:** Dynamic imports for heavy components (carousel, form validation)

---

## 9. Accessibility Requirements

### Semantic HTML
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy (H1 → H2 → H3, no skipping levels)
- Use `<button>` for interactive elements, not `<div>` with onClick

### ARIA Labels
- Navigation landmarks: `<nav aria-label="Main Navigation">`
- Buttons: Descriptive labels, especially for icon-only buttons
- Forms: Proper label associations, error announcements
- Modals/Drawers: `role="dialog"`, focus trapping

### Keyboard Navigation
- All interactive elements keyboard accessible (Tab order)
- Focus indicators: Visible outline (gradient ring)
- Skip to main content link (hidden until focused)
- Escape key closes modals/drawers
- Arrow keys for carousel navigation

### Color Contrast
- Minimum WCAG AA compliance (4.5:1 for text)
- Ensure gradient text has sufficient contrast
- Dark theme: High contrast whites on dark backgrounds
- Light theme: Dark text on light backgrounds

### Motion Accessibility
- Respect `prefers-reduced-motion` media query
- Disable/simplify animations for users with vestibular disorders
- Provide toggle option for animations (optional)

### Screen Readers
- Alt text for all images (provide placeholder guidance)
- Hidden text for icon-only elements
- Announce dynamic content changes (form errors, success messages)
- Descriptive link text (avoid "click here")

### Forms
- Label all inputs properly
- Inline validation with clear error messages
- Success/error states announced to screen readers
- Autocomplete attributes for common fields

---

## 10. Image Asset Specifications

All images are placeholders initially. Below are specifications for sourcing later.

### Hero Section
- **Type:** Abstract gradient graphic or creator collaboration photo
- **Dimensions:** 1920x1080px minimum
- **Format:** WebP with PNG fallback
- **Style:** High energy, colorful, matches brand personality

### Brand Logos (Brand Scroller)
- **Count:** 10-15 logos
- **Dimensions:** 200x100px (various, maintain aspect ratio)
- **Format:** SVG preferred, PNG with transparency
- **Style:** Grayscale versions, high-res originals for hover color

### Creator Profile Photos (Success Stories, Creator Cards)
- **Dimensions:** 400x400px (square)
- **Format:** WebP with JPG fallback
- **Style:** Professional portraits, diverse representation
- **Source:** Unsplash portraits or stock photos

### Blog Post Featured Images
- **Dimensions:** 1200x630px (16:9 aspect ratio)
- **Format:** WebP with JPG fallback
- **Style:** Vibrant, relevant to blog topic
- **Source:** Unsplash or custom graphics

### Team Photos (About Page)
- **Dimensions:** 400x400px (square)
- **Format:** WebP with JPG fallback
- **Style:** Professional headshots, consistent lighting

### Icons
- **Library:** Lucide React (already installed)
- **Style:** Consistent stroke width, 24px default size
- **Animations:** Custom animations via Framer Motion

### Background Graphics
- **Gradient Orbs:** Generated via CSS (radial-gradient with blur)
- **Texture Overlays:** SVG noise pattern (inline in CSS)
- **Decorative Elements:** Abstract shapes, geometric patterns (SVG)

---

## 11. Content Strategy

### Placeholder Content Guidelines

All copy is placeholder initially. Below are guidelines for tone and structure.

**Tone of Voice:**
- Energetic, friendly, youth-focused
- Empowering and aspirational
- Clear and concise (avoid jargon)
- Conversational but professional

**Homepage Copy:**
- **Hero Headline:** Short, punchy, action-oriented (3-6 words)
  - Examples: "Create. Connect. Grow." / "Your Creator Hub"
- **Subheadline:** Expand on value prop (1 sentence, ~15 words)
  - Example: "Join 10K+ creators building their brand and connecting with opportunities"
- **CTAs:** Action verbs, benefit-focused
  - Primary: "Start Creating Free" / "Get Started Free"
  - Secondary: "See How It Works" / "Learn More"

**Feature Descriptions:**
- Format: Headline (3-5 words) + Description (1-2 sentences)
- Focus on benefits, not just features
- Use active voice

**Testimonials:**
- Format: Quote (2-3 sentences) + Name + Platform/Niche
- Authentic voice, specific results mentioned
- Example: "ProVibe helped me land 3 brand deals in my first month. The bio page is so much better than other tools!" - Sarah J., Lifestyle Creator

**FAQ Answers:**
- Format: Question + Answer (2-4 sentences)
- Clear, direct answers
- Link to relevant pages where applicable

### SEO Considerations
- **Title Tags:** Descriptive, include "ProVibe" + page topic (max 60 chars)
- **Meta Descriptions:** Compelling summary (max 155 chars)
- **H1 Tags:** One per page, clear page topic
- **Image Alt Text:** Descriptive, include keywords naturally
- **Internal Linking:** Link between related pages (Features → Creators page)

---

## 12. Development Approach

### Phase 1: Core System Setup
**Objective:** Establish design foundation before building pages

**Tasks:**
1. Install Framer Motion: `pnpm add framer-motion`
2. Set up typography in `app/layout.tsx`:
   - Import Google Fonts (Space Grotesk, Outfit, DM Sans, JetBrains Mono)
   - Define CSS variables
3. Extend `app/globals.css`:
   - Add gradient color variables
   - Define animation keyframes
   - Create utility classes (gradient text, glass morphism)
4. Create animation library:
   - `lib/animations/variants.ts`
   - `lib/animations/scroll-animations.ts`
   - `lib/animations/hooks.ts`
   - `lib/animations/page-transitions.ts`
5. Build core shared components:
   - `components/shared/animated-section.tsx`
   - `components/shared/gradient-card.tsx`
   - `components/shared/stats-counter.tsx`
6. Create layout components:
   - `components/layout/navbar.tsx`
   - `components/layout/footer.tsx`

**Validation:** Test components in isolation, verify animations work, check responsive behavior.

### Phase 2: Homepage Implementation
**Objective:** Build complete homepage with all sections

**Tasks:**
1. Create homepage section components in `components/home/`:
   - `hero.tsx`
   - `problem-solution.tsx`
   - `features.tsx`
   - `brand-scroller.tsx`
   - `how-it-works.tsx`
   - `success-stories.tsx`
   - `testimonials.tsx`
   - `faq.tsx`
   - `cta.tsx`
2. Compose in `app/page.tsx`
3. Add placeholder content
4. Implement scroll animations
5. Test responsive behavior across breakpoints
6. Optimize performance (lazy loading, image optimization)
7. Accessibility audit (keyboard nav, ARIA labels, color contrast)

**Validation:** Homepage is fully functional, animated, responsive, and accessible.

### Phase 3: Refine & Extract Patterns
**Objective:** Learn from homepage, refine system

**Tasks:**
1. Identify reusable patterns from homepage
2. Extract additional shared components if needed
3. Refine animation library based on usage
4. Document component APIs
5. Create component examples/documentation (optional)

**Validation:** System is mature enough to build remaining pages efficiently.

### Phase 4: Remaining Pages
**Objective:** Build all additional pages using refined system

**Order:**
1. `/creators` page (highest priority after homepage)
2. `/brands` page
3. `/about` page
4. `/contact` page
5. `/blogs` page
6. `/blogs/[slug]` page (template)

**For each page:**
1. Create page component in `app/[page]/page.tsx`
2. Build page-specific components if needed
3. Use shared components where applicable
4. Add placeholder content
5. Implement animations
6. Test responsive behavior
7. Accessibility check

**Validation:** All pages functional, consistent, responsive, accessible.

### Phase 5: Polish & Optimization
**Objective:** Final refinements before launch

**Tasks:**
1. Performance audit (Lighthouse)
2. Accessibility audit (axe DevTools)
3. Cross-browser testing (Chrome, Firefox, Safari, Edge)
4. Mobile device testing (iOS, Android)
5. Animation polish (timing, easing adjustments)
6. Content review (spelling, grammar, tone)
7. SEO optimization (meta tags, sitemap, robots.txt)
8. Analytics setup (if applicable)

**Validation:** Site is production-ready.

---

## 13. Testing & Quality Assurance

### Manual Testing Checklist

**Functional Testing:**
- [ ] All links work (internal navigation, external links)
- [ ] Forms submit correctly (contact form, newsletter)
- [ ] Form validation works (required fields, email format)
- [ ] Mobile menu opens/closes properly
- [ ] Carousel/slider controls work (arrows, dots, swipe)
- [ ] Accordion expands/collapses smoothly
- [ ] Scroll-to-anchor links work
- [ ] Page transitions work between routes

**Responsive Testing:**
- [ ] Test on physical devices (iPhone, Android, iPad, tablet)
- [ ] Test on browser dev tools (all major breakpoints)
- [ ] Typography scales appropriately
- [ ] Images load correctly at all sizes
- [ ] Touch targets are large enough (min 44px)
- [ ] Horizontal scroll is prevented
- [ ] Content fits within viewport

**Animation Testing:**
- [ ] Animations trigger on scroll at correct threshold
- [ ] No janky animations (60fps maintained)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Hover effects work on desktop only
- [ ] Page transitions are smooth
- [ ] Loading states work correctly

**Accessibility Testing:**
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly (test with NVDA/VoiceOver)
- [ ] Color contrast passes WCAG AA
- [ ] Alt text exists for all images
- [ ] Forms have proper labels and error announcements
- [ ] Headings are in correct order
- [ ] ARIA labels are appropriate

**Cross-Browser Testing:**
- [ ] Chrome (desktop and mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop and iOS)
- [ ] Edge (desktop)

**Performance Testing:**
- [ ] Lighthouse score > 90 (Performance)
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized (WebP format, correct sizes)
- [ ] Fonts loaded efficiently (preload, subset)
- [ ] No console errors or warnings

### Automated Testing (Optional)
- **Unit Tests:** Component functionality (Jest + React Testing Library)
- **E2E Tests:** Critical user flows (Playwright or Cypress)
- **Visual Regression:** Screenshot comparison (Percy or Chromatic)

---

## 14. Success Criteria

### Launch Requirements
- [ ] All pages (homepage, /creators, /brands, /blogs, /about, /contact) built and functional
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Animations are smooth and energetic (aligned with brand personality)
- [ ] Accessibility requirements met (WCAG AA minimum)
- [ ] Performance optimized (Lighthouse > 90)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] No console errors or warnings
- [ ] Placeholder content in place with clear specifications for replacement
- [ ] All CTAs functional (even if pointing to placeholder forms/signup)

### Post-Launch Enhancements (Out of Scope)
- CMS integration for blog posts
- User authentication/signup flows
- Creator dashboard
- Analytics dashboard
- Real brand partnership data
- Event listing functionality
- Search functionality

---

## 15. Open Questions & Assumptions

### Assumptions Made:
1. **No backend yet:** All pages are static with placeholder CTAs
2. **No real data:** Using placeholder content, images, and brand logos
3. **Dark theme priority:** Light theme exists but dark theme is primary focus
4. **Creator focus:** Primary audience is creators, not brands (but both served)
5. **Free tier exists:** Messaging assumes free signup option
6. **Events are location-based:** Event discovery mentions "nearby" suggesting geo features later

### Questions for Future Clarification:
1. **Pricing:** Is there a paid tier? What are the differences?
2. **Brand partnerships:** How do brand connections actually work (RFPs, direct messages, marketplace)?
3. **Events:** Are these ProVibe-hosted events or third-party events listed on ProVibe?
4. **Authentication:** What auth provider will be used (NextAuth, Clerk, Supabase, custom)?
5. **Content:** Who writes the final copy (internal team, copywriter, AI-assisted)?
6. **Images:** What budget/source for final images (stock, custom photography, AI-generated)?
7. **Analytics:** What tracking is needed (GA4, Mixpanel, Plausible)?

### Decisions Deferred:
- Exact CTA destinations (signup modal vs. dedicated page)
- Blog CMS choice (Contentful, Sanity, MDX, custom)
- Newsletter integration (Mailchimp, ConvertKit, custom)
- Form submission handling (email service, database, API endpoint)

---

## 16. Maintenance & Extensibility

### Design System Maintenance
- **Component Library:** Shared components should be well-documented with usage examples
- **Animation Library:** Keep variants organized, document new animations as they're added
- **Color System:** Extend CSS variables for new colors, maintain consistency
- **Typography:** Stick to defined scale, avoid ad-hoc font sizes

### Adding New Pages
1. Create page component in `app/[page]/page.tsx`
2. Use existing shared components where possible
3. Extract new patterns into shared components if reusable
4. Follow established animation patterns
5. Maintain accessibility standards
6. Test responsiveness

### Code Quality Standards
- **TypeScript:** Use proper types, avoid `any`
- **Component Props:** Define interfaces for all props
- **Naming:** Descriptive, consistent naming (PascalCase for components, camelCase for functions)
- **File Organization:** Group related components, keep files focused (single responsibility)
- **Comments:** Add comments for complex logic, animation configurations
- **Formatting:** Use Prettier (already configured)
- **Linting:** Follow ESLint rules (already configured)

---

## Summary

This design specification outlines a complete production-grade marketing website for ProVibe with an **Energetic & Bold** brand personality. The site features a story-driven homepage, dedicated pages for creators and brands, a blog, and standard informational pages (about, contact).

**Key Characteristics:**
- **Visual Identity:** Vibrant gradients, bold typography, dynamic animations
- **Tech Stack:** Next.js 16, Tailwind CSS, Framer Motion, shadcn/ui
- **Animation Philosophy:** Full showcase with hero animations, scroll-triggered effects, micro-interactions, and page transitions
- **Development Approach:** Hybrid (core system first, then pages iteratively)
- **Accessibility:** WCAG AA compliant with keyboard navigation and reduced motion support
- **Responsive:** Mobile-first design with 1200px max container width

**Build Order:**
1. Core system setup (typography, colors, animation library, base components)
2. Homepage (complete story-driven flow)
3. Refinement (extract patterns, mature system)
4. Remaining pages (/creators, /brands, /blogs, /about, /contact)
5. Polish & optimization

The design balances ambitious visual goals with maintainability and performance, creating a distinctive presence in the creator marketplace space while providing a solid foundation for future feature development.