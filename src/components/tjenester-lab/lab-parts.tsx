import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { bricolage, figtree, inter, youngSerif } from "@/lib/home/fonts";
import { MarkerReveal } from "@/components/home/marker-reveal";
import { ButtonGlow } from "@/components/home/button-glow";
import { Arrow } from "@/components/home/arrow";
import { CLIENTS, type ClientId } from "@/components/tjenester-lab/nettside-content";
import "@/styles/a-klar.css";
import "@/styles/a-klar-pages.css";
import "@/styles/a-klar-tjenester.css";
import "@/styles/a-klar-calm.css";
import "@/styles/tjenester-lab.css";

/** The calm system's page root, as the homepage wears it (.ka.calm), plus a variant class for the lab styles. */
export function LabPage({ variant, children }: { variant: string; children: ReactNode }) {
  return (
    <div className={`ka calm nl ${variant} ${bricolage.variable} ${figtree.variable} ${youngSerif.variable} ${inter.variable}`}>
      <MarkerReveal />
      <ButtonGlow />
      {children}
    </div>
  );
}

function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`wk-phone ${className}`}>
      <Image src={src} alt={alt} fill quality={90} sizes="(max-width: 900px) 26vw, 12vw" />
    </div>
  );
}

/** One client staged on its pastel card, the same pictures and arrangement as the homepage's work section. */
export function ClientStage({ id }: { id: ClientId }) {
  const client = CLIENTS.find((c) => c.id === id)!;
  if (id === "iqra")
    return (
      <div className="wk-card wk-trio" role="img" aria-label={`${client.name} på mobil`}>
        <Phone src="/images/arbeid/iqra-mobil-1-v2.webp" alt="" className="wk-trio-1" />
        <Phone src="/images/arbeid/iqra-mobil-2-v2.webp" alt="" className="wk-trio-2" />
        <Phone src="/images/arbeid/iqra-mobil-3-v2.webp" alt="" className="wk-trio-3" />
      </div>
    );
  if (id === "kong")
    return (
      <div className="wk-card wk-kong" role="img" aria-label={`${client.name} på PC og mobil`}>
        <Image className="wk-bg" src="/images/arbeid/kongsvinger-festning.webp" alt="" fill sizes="(max-width: 900px) 92vw, 50vw" />
        <div className="wk-desk">
          <Image src="/images/arbeid/kongsvinger-bok-hd.webp" alt="" fill quality={90} sizes="(max-width: 900px) 70vw, 38vw" />
        </div>
        <Phone src="/images/arbeid/kongsvinger-mobil-v2.webp" alt="" className="wk-kong-p" />
      </div>
    );
  if (id === "mk")
    return (
      <div className="wk-card wk-mk" role="img" aria-label={`${client.name} på PC og mobil`}>
        <div className="wk-desk">
          <Image src="/images/arbeid/mk-auto-desktop-hd.webp" alt="" fill quality={90} sizes="(max-width: 900px) 70vw, 38vw" />
        </div>
        <Phone src="/images/arbeid/mk-auto-mobil-hd-v2.webp" alt="" className="wk-mk-p" />
      </div>
    );
  return (
    <div className="wk-card wk-ringebu" role="img" aria-label={`${client.name} på PC og mobil`}>
      <div className="wk-desk">
        <Image src="/images/arbeid/ringebu-desktop-hd.webp" alt="" fill quality={90} sizes="(max-width: 900px) 70vw, 38vw" />
      </div>
      <Phone src="/images/arbeid/ringebu-mobil-v2.webp" alt="" className="wk-ringebu-p" />
    </div>
  );
}

export function ClientFigure({ id }: { id: ClientId }) {
  const client = CLIENTS.find((c) => c.id === id)!;
  return (
    <figure className="nl-fig">
      <ClientStage id={id} />
      <figcaption>
        {client.name} · {client.line}
      </figcaption>
    </figure>
  );
}

export function Crumbs() {
  return (
    <nav className="crumbs nl-crumbs" aria-label="Brødsmuler">
      <ol>
        <li>
          <Link href="/tjenester">Tjenester</Link>
        </li>
        <li aria-current="page">Skreddersydd nettside</li>
      </ol>
    </nav>
  );
}

export function BookButton({ children = "Book en gratis prat" }: { children?: ReactNode }) {
  return (
    <Link className="btn book" href="#kontakt">
      {children} <Arrow />
    </Link>
  );
}

/** A heading in the calm setting with its lede, used above every section of the mockups. */
export function SecHead({ id, title, lede }: { id: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="nl-sh">
      <h2 id={id}>{title}</h2>
      {lede && <p>{lede}</p>}
    </div>
  );
}
