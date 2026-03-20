import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  company?: string
  avatar: string
  rating?: number
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div"

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "relative flex flex-col rounded-lg border border-[var(--color-dark-border)]",
        "bg-[var(--color-dark-glass)]",
        "p-4 text-start sm:p-6",
        href && "hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className,
      )}
    >
      <span
        className="absolute -top-1 right-4 select-none font-serif text-5xl leading-none text-[var(--color-accent)] opacity-20"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-14 w-14 shrink-0 ring-2 ring-[var(--color-accent)]/30">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-md font-semibold leading-none truncate max-w-full text-[var(--color-dark-text)]">{author.name}</h3>
          <p className="text-xs text-[var(--color-dark-muted)] truncate max-w-full">{author.handle}</p>
          {author.company && (
            <p className="text-xs font-medium text-[var(--color-accent)] opacity-80 truncate max-w-full">{author.company}</p>
          )}
        </div>
      </div>

      {author.rating && (
        <div className="mt-3 flex gap-0.5" aria-label={`${author.rating} av 5 stjerner`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < author.rating!
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-dark-muted)] opacity-30"
              }
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      )}

      <p className="sm:text-md mt-3 text-sm text-[var(--color-dark-muted)] line-clamp-4">{text}</p>
    </Card>
  )
}
