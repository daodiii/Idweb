import Link from "next/link";

export interface Crumb {
  name: string;
  href: string;
}

interface PageHeadProps {
  /** Visible trail; the last crumb is the current page. Pages render BreadcrumbJsonLd themselves. */
  crumbs: Crumb[];
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Buttons or links under the lede. */
  children?: React.ReactNode;
  /** One column instead of headline left, lede right. For long titles and text pages. */
  solo?: boolean;
}

/** The top of every A · Klar inner page: breadcrumbs, the page's single h1 and a short lede. */
export function PageHead({ crumbs, title, lede, children, solo }: PageHeadProps) {
  return (
    <section className={`phead${solo ? " solo" : ""}`}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Brødsmuler">
          <ol>
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <li key={c.href} aria-current="page">
                  {c.name}
                </li>
              ) : (
                <li key={c.href}>
                  <Link href={c.href}>{c.name}</Link>
                </li>
              ),
            )}
          </ol>
        </nav>
        <div className="phead-g">
          <h1>{title}</h1>
          {(lede || children) && (
            <div>
              {lede && <p className="lede">{lede}</p>}
              {children && <div className="actions">{children}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
