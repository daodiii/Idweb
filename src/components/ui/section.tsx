import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Apply subtle warm radial gradient to light sections */
  warm?: boolean;
  /** Use alternate gradient position */
  warmAlt?: boolean;
}

export function Section({ id, children, className = "", warm, warmAlt }: SectionProps) {
  const warmClass = warmAlt ? "light-section-warm-alt" : warm ? "light-section-warm" : "";

  return (
    <section id={id} className={`px-6 py-24 sm:py-32 ${warmClass} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
