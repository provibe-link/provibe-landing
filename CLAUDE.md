# ProVibe Landing - Frontend Design Guide

This is a Next.js 16 landing page project configured for **lovable-level design** - exceptional, distinctive, production-grade interfaces that stand out.

## Tech Stack

- **Framework**: Next.js 16.1.7 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4 + CSS variables
- **Components**: shadcn/ui (Radix Nova style, "mist" base color)
- **Icons**: Lucide React
- **Theme**: next-themes with dark mode support
- **TypeScript**: Full type safety

## Project Structure

```
provibe-landing/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & CSS variables
├── components/
│   ├── ui/                # shadcn/ui components
│   └── theme-provider.tsx # Theme context
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (utils, cn helper)
└── public/                # Static assets
```

## Frontend Design Philosophy

### CRITICAL: Lovable-Level Quality Standards

When building any interface in this project, apply the **frontend-design skill** principles:

1. **Bold Aesthetic Choices**: Never settle for generic. Every component should have a clear conceptual direction (brutalist, maximalist, minimal luxury, retro-futuristic, editorial, organic, etc.)

2. **Typography Excellence**: 
   - Avoid generic fonts (Inter, Roboto, Arial, system fonts)
   - Use distinctive, characterful font choices from Google Fonts or other sources
   - Pair display fonts with refined body fonts
   - Consider: Playfair Display, Space Mono, DM Serif Display, Archivo, Outfit, Syne, JetBrains Mono, etc.

3. **Color & Theme Mastery**:
   - Use CSS variables for consistency (already configured in globals.css)
   - Commit to cohesive palettes - dominant colors with sharp accents
   - Avoid cliché combinations (purple gradients on white)
   - Match colors to the aesthetic direction

4. **Motion & Animation**:
   - Use CSS animations for HTML/Tailwind projects
   - Framer Motion is available for React components
   - Focus on high-impact moments: page load sequences, scroll reveals, hover surprises
   - Use `animation-delay` for staggered reveals

5. **Spatial Composition**:
   - Unexpected layouts: asymmetry, overlap, diagonal flow
   - Grid-breaking elements
   - Generous negative space OR controlled density (match the aesthetic)

6. **Backgrounds & Visual Details**:
   - Create atmosphere with gradient meshes, noise textures, geometric patterns
   - Layered transparencies, dramatic shadows, decorative borders
   - Custom cursors, grain overlays, contextual effects

### Implementation Guidelines

#### Using the frontend-design Skill

When creating new components, pages, or features:

```bash
# In your message, invoke the skill BEFORE coding:
"Use frontend-design skill to create [component/page description]"
```

The skill will guide you through:
1. **Design thinking**: Purpose, tone, constraints, differentiation
2. **Bold execution**: Production-grade code with exceptional aesthetics
3. **Detail refinement**: Typography, colors, motion, composition

#### Next.js-Specific Best Practices

1. **Server Components by Default**:
   - Use `"use client"` only when needed (state, effects, browser APIs)
   - Keep interactive components small and focused

2. **Image Optimization**:
   ```tsx
   import Image from "next/image"
   <Image src="/hero.jpg" alt="..." width={1200} height={600} priority />
   ```

3. **Font Loading**:
   ```tsx
   import { Inter, Playfair_Display } from "next/font/google"
   
   const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })
   const body = Inter({ subsets: ["latin"], variable: "--font-body" })
   ```

4. **Metadata for SEO**:
   ```tsx
   export const metadata = {
     title: "ProVibe - [Page Title]",
     description: "...",
   }
   ```

5. **Route Organization**:
   - Use route groups `(marketing)`, `(app)` to organize without affecting URLs
   - Co-locate components in `_components/` folders within routes

#### Working with shadcn/ui

We use Radix Nova style with "mist" base color. Components are customizable:

```tsx
// Extend with custom variants
<Button variant="ghost" size="lg" className="your-custom-styles">
  Click Me
</Button>
```

Add new components:
```bash
npx shadcn@latest add [component-name]
```

#### Tailwind Conventions

- Use CSS variables for colors: `bg-background`, `text-foreground`, `border-border`
- Custom animations in globals.css with `@keyframes`
- Arbitrary values for unique designs: `w-[73%]`, `rotate-[12deg]`
- Group modifiers: `group-hover:`, `peer-checked:`

### Quality Checklist

Before considering any UI work complete:

- [ ] **Distinctive**: Does it have a clear, memorable aesthetic?
- [ ] **Typography**: Are fonts interesting and well-paired?
- [ ] **Motion**: Are there delightful animations at key moments?
- [ ] **Composition**: Is the layout unexpected and engaging?
- [ ] **Details**: Are there visual flourishes (backgrounds, shadows, effects)?
- [ ] **Responsive**: Does it work beautifully on mobile, tablet, desktop?
- [ ] **Accessible**: Proper ARIA labels, keyboard navigation, color contrast?
- [ ] **Performance**: Images optimized, fonts loaded efficiently?

### Anti-Patterns to Avoid

❌ Generic fonts (Inter, Roboto, Arial)
❌ Purple gradients on white backgrounds
❌ Cookie-cutter layouts
❌ Solid color backgrounds everywhere
❌ No animations or micro-interactions
❌ Evenly-distributed, timid color palettes
❌ Predictable component patterns
❌ "AI slop" aesthetics

✅ Bold, distinctive choices
✅ Characterful typography
✅ Atmospheric backgrounds
✅ Unexpected interactions
✅ Clear aesthetic direction
✅ Production-grade refinement

## Development Workflow

1. **Design First**: Before coding, define purpose, tone, and differentiation
2. **Implement Boldly**: Write production-grade code with exceptional details
3. **Refine Relentlessly**: Polish typography, spacing, animations, colors
4. **Test Across Devices**: Verify responsive behavior and performance
5. **Review Against Checklist**: Ensure lovable-level quality

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm typecheck    # TypeScript checks
```

## Remember

Every interface in this project should make someone stop and think "wow, this is beautifully designed." That's the standard. That's lovable-level quality.

**Use the frontend-design skill for EVERY new UI component or page.** It's not optional - it's how we maintain exceptional quality.
