# ProVibe Landing

A Next.js 16 landing page built for **lovable-level design** - exceptional, distinctive interfaces that stand out.

## Design Philosophy

This project is configured to create production-grade UIs with bold aesthetic choices, distinctive typography, and memorable interactions. Every component should make users stop and think "wow."

See **[CLAUDE.md](./CLAUDE.md)** for complete design guidelines and frontend best practices.

## Quick Start

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** with Server Components
- **Tailwind CSS v4** with CSS variables
- **shadcn/ui** (Radix Nova style)
- **TypeScript** for type safety
- **Lucide React** for icons

## Building with Claude Code

### Using the Frontend Design Skill

When creating new components or pages, invoke the frontend-design skill:

```
Use frontend-design skill to create [your component/page description]
```

The skill guides you through:

1. Design thinking (purpose, tone, differentiation)
2. Bold aesthetic choices
3. Production-grade implementation
4. Exceptional polish

See `components/example-hero.tsx` for a reference implementation.

### Quality Standards

✅ Distinctive, memorable aesthetics
✅ Characterful typography (avoid Inter, Roboto, Arial)
✅ Atmospheric backgrounds and visual effects
✅ Delightful animations and micro-interactions
✅ Unexpected, engaging layouts
✅ Production-grade refinement

❌ Generic fonts and cookie-cutter layouts
❌ Cliché color schemes (purple gradients on white)
❌ "AI slop" aesthetics
❌ Predictable patterns

## Adding Components

```bash
npx shadcn@latest add [component-name]
```

Components are placed in `components/ui/` and can be customized with Tailwind classes.

## Project Structure

```
provibe-landing/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Styles + design utilities
├── components/
│   ├── ui/                # shadcn/ui components
│   └── example-hero.tsx   # Reference component
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities
```

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm typecheck    # TypeScript checks
```

## Learn More

- [CLAUDE.md](./CLAUDE.md) - Complete design guidelines
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Remember**: Use the frontend-design skill for every new UI component or page. It's how we maintain lovable-level quality.
