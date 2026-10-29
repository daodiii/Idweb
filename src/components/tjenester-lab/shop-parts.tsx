import Image from "next/image";
import "@/styles/tjenester-lab.css";
import { PRODUCTS } from "@/components/tjenester-lab/nettbutikk-content";

export type ShopItem = { name: string; price: number; stock: number; img: string };

function stockLabel(n: number) {
  return n <= 0 ? "Utsolgt" : n === 1 ? "Bare 1 igjen" : `${n} igjen`;
}

/** The shop as the customer sees it. Drawn in markup; the photos are the credited ones from nettbutikk-content. */
export function ShopFront({ items = PRODUCTS, fresh = false }: { items?: readonly ShopItem[]; fresh?: boolean }) {
  return (
    <div className="sh-front" aria-hidden="true">
      <div className="sh-front-top">
        <b>Krus &amp; Kar</b>
        <span>Butikk</span>
        <span>Om verkstedet</span>
        <span className="sh-cart">Handlekurv (0)</span>
      </div>
      <div className="sh-strip">Fri frakt over 800 kr</div>
      <div className="sh-front-head">
        <b>Nytt fra ovnen</b>
        <span>{items.length} varer</span>
      </div>
      <div className="sh-grid">
        {items.map((it, i) => (
          <div key={it.name + i} className={`sh-item${fresh && i === 0 ? " is-new" : ""}`}>
            <div className="sh-img">
              <Image src={it.img} alt="" fill sizes="(max-width: 900px) 40vw, 14vw" />
              <span className={`sh-badge${it.stock <= 0 ? " out" : ""}`}>{fresh && i === 0 ? "Ny" : stockLabel(it.stock)}</span>
            </div>
            <b>{it.name}</b>
            <span>{it.price} kr</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** «Ny vare» in the shop's own admin. */
export function AdminCard() {
  return (
    <div className="sh-admin" aria-hidden="true">
      <div className="sh-admin-top">
        <b>Butikken</b>
        <span>Ny vare</span>
      </div>
      <div className="sh-admin-pics">
        {PRODUCTS.map((p, i) => (
          <span key={p.id} className={i === 0 ? "on" : undefined}>
            <Image src={p.img} alt="" fill sizes="80px" />
          </span>
        ))}
      </div>
      <div className="sh-field">
        <small>Navn</small>
        <span>Krus med penselstrøk</span>
      </div>
      <div className="sh-field-row">
        <div className="sh-field">
          <small>Pris</small>
          <span>395 kr</span>
        </div>
        <div className="sh-field">
          <small>På lager</small>
          <span className="sh-step">
            <i>−</i>3<i>+</i>
          </span>
        </div>
      </div>
      <span className="tb-confirm">Legg ut i butikken</span>
    </div>
  );
}

/** The checkout: the basket, the shipping choices and the pay button. */
export function CheckoutCard() {
  return (
    <div className="sh-checkout" aria-hidden="true">
      <div className="sh-admin-top">
        <b>Kassen</b>
        <span>Steg 2 av 3</span>
      </div>
      <div className="sh-line">
        <span className="sh-thumb">
          <Image src={PRODUCTS[0].img} alt="" fill sizes="44px" />
        </span>
        <span>
          <b>Krus med penselstrøk</b>
          <small>1 stk</small>
        </span>
        <b>395 kr</b>
      </div>
      <div className="sh-ship">
        <small>Frakt</small>
        {["Sending i posten", "Hent hos verkstedet", "Fri frakt over 800 kr"].map((s, i) => (
          <span key={s} className={i === 0 ? "on" : undefined}>
            <i />
            {s}
          </span>
        ))}
        <em>Fraktprisen vises før betaling.</em>
      </div>
      <span className="tb-confirm">Betal</span>
    </div>
  );
}

/** The order as it arrives for the shop owner. */
export function OrderCard() {
  return (
    <div className="sh-order" aria-hidden="true">
      <div className="sh-admin-top">
        <b>Ny ordre</b>
        <span className="tb-when">Betalt</span>
      </div>
      <div className="sh-line">
        <span className="sh-thumb">
          <Image src={PRODUCTS[0].img} alt="" fill sizes="44px" />
        </span>
        <span>
          <b>Krus med penselstrøk</b>
          <small>1 stk · sending i posten</small>
        </span>
        <b>395 kr</b>
      </div>
      <span className="tb-confirm">Merk som sendt</span>
    </div>
  );
}

/** The e-mail the customer gets when the order is marked as sent. */
export function SentMail() {
  return (
    <div className="tb-mail sh-mail" aria-hidden="true">
      <div className="tb-mail-top">
        <span>Til kunden</span>
        <span className="tb-when">Når dere merker den sendt</span>
      </div>
      <b className="tb-subject">Pakken din fra Krus &amp; Kar er sendt</b>
      <p>Hei, ordren din er på vei.</p>
    </div>
  );
}

/** One product on its own page, as it looks on a phone. */
export function ProductCard() {
  const p = PRODUCTS[0];
  return (
    <div className="sh-product" aria-hidden="true">
      <div className="sh-img sh-img-lg">
        <Image src={p.img} alt="" fill sizes="(max-width: 900px) 60vw, 20vw" />
        <span className="sh-badge">{stockLabel(p.stock)}</span>
      </div>
      <b>{p.name}</b>
      <span className="sh-price">{p.price} kr</span>
      <span className="tb-confirm">Legg i handlekurv</span>
      <small>Fri frakt over 800 kr</small>
    </div>
  );
}

export function Credits({ text }: { text: string }) {
  return <p className="sh-credits">{text}</p>;
}
