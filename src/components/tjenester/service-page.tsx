import { bricolage, figtree, inter, mona, schibsted, youngSerif, fraunces, bigShoulders, gloock } from "@/lib/home/fonts";
import { ServiceScript } from "@/components/tjenester/service-script";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES, type ServicePageSlug } from "@/components/tjenester/pages";

/**
 * A service page in the A · Klar style. The markup and demo script come from the approved drafts
 * (components/tjenester/markup, generated); the styles are scoped per page in styles/tjenester. The site's own
 * header and footer come from the layout shell.
 */
export function ServicePage({ slug, html, script }: { slug: ServicePageSlug; html: string; script: string }) {
  const meta = SERVICE_PAGES[slug];
  const fonts = [schibsted, mona, bricolage, figtree, youngSerif, inter, fraunces, bigShoulders, gloock]
    .map((f) => f.variable)
    .join(" ");
  return (
    <>
      <ServiceJsonLd name={meta.name} description={meta.description} slug={slug} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/#tjenester" },
          { name: meta.name, href: `/tjenester/${slug}` },
        ]}
      />
      <div className={`svc-${slug} ${fonts}`} data-svc dangerouslySetInnerHTML={{ __html: html }} />
      <ServiceScript html={html} script={script} />
    </>
  );
}
