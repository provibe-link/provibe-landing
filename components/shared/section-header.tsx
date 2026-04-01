import { AnimatedSection } from "@/components/shared/animated-section"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow: string
  headline: string
  headlineHighlight?: string
  description?: string
  className?: string
}

/**
 * Reusable section header with eyebrow text, headline, optional highlight, and description
 *
 * @example
 * <SectionHeader eyebrow="Features" headline="Why Choose" headlineHighlight="ProVibe" description="Empowering creators worldwide" />
 */
export function SectionHeader({
  eyebrow,
  headline,
  headlineHighlight,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={cn("mb-16 text-center", className)}>
      <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {headline}
        {headlineHighlight && (
          <> <span className="gradient-text">{headlineHighlight}</span></>
        )}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </AnimatedSection>
  )
}
