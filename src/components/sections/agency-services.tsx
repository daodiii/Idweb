import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AgencyService {
  href: string;
  tag: string;
  title: string;
  description: string;
}

interface AgencyServicesProps {
  place: string;
  services: readonly AgencyService[];
  accent: string;
}

/**
 * What the agency covers, as a grid of links into the service pages. Doubles
 * as the page's internal-link hub. Server Component.
 */
export function AgencyServices({ place, services, accent }: AgencyServicesProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div className="relative mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-[family-name:var(--font-heading)] text-white">
          <span className="block text-[clamp(1.9rem,4vw,3.2rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-white/85">
            Dette bygger vi
          </span>{" "}
          <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
            for bedrifter i{" "}
            <span className="relative inline-block">
              {place}
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accent }} />
            </span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative flex flex-col bg-[var(--color-dark-bg)] p-7 transition-colors duration-200 hover:bg-white/[0.03] sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: accent }}>
                {service.tag}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-150 group-hover:text-white">
                Les mer
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
