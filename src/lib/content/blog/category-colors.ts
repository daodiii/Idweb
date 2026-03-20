export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Tips: { bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/20" },
  SEO: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/20" },
  Design: { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/20" },
  Utvikling: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/20" },
  "Markedsføring": { bg: "bg-rose-500/15", text: "text-rose-300", border: "border-rose-500/20" },
  "E-handel": { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/20" },
  Teknologi: { bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/20" },
  Priser: { bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/20" },
};

export const DEFAULT_CATEGORY_COLOR = {
  bg: "bg-[var(--color-accent)]/15",
  text: "text-[var(--color-accent)]",
  border: "border-[var(--color-accent)]/20",
};
