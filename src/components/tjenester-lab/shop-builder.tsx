"use client";

import Image from "next/image";
import { useState } from "react";
import { ShopFront, type ShopItem } from "@/components/tjenester-lab/shop-parts";
import { PRODUCTS } from "@/components/tjenester-lab/nettbutikk-content";

/**
 * «Legg inn en vare»: pick a photo, give it a name, a price and a count, and press the button. The new item arrives first in
 * the shop beside it, marked Ny. Nothing is saved or sent. Mirrors the live page's demo with one example instead of a shelf.
 */
export function ShopBuilder() {
  const [pick, setPick] = useState(0);
  const [name, setName] = useState<string>(PRODUCTS[0].name);
  const [price, setPrice] = useState(395);
  const [stock, setStock] = useState(3);
  const [added, setAdded] = useState<ShopItem | null>(null);

  const items: ShopItem[] = added ? [added, ...PRODUCTS.slice(0, 2)] : [...PRODUCTS];

  function choose(i: number) {
    setPick(i);
    setName(PRODUCTS[i].name);
    setPrice(PRODUCTS[i].price);
    setStock(PRODUCTS[i].stock);
  }

  return (
    <div className="sb">
      <form className="sb-form" onSubmit={(e) => e.preventDefault()} aria-label="Legg inn en vare i eksempelbutikken">
        <div className="sh-admin-top">
          <b>Butikken</b>
          <span>Ny vare</span>
        </div>
        <fieldset className="sb-pics">
          <legend>Bilde</legend>
          {PRODUCTS.map((p, i) => (
            <button key={p.id} type="button" className={i === pick ? "on" : undefined} aria-pressed={i === pick} onClick={() => choose(i)} aria-label={p.name}>
              <Image src={p.img} alt="" fill sizes="80px" />
            </button>
          ))}
        </fieldset>
        <label className="sb-field">
          <small>Navn</small>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={28} />
        </label>
        <div className="sb-row">
          <label className="sb-field">
            <small>Pris (kr)</small>
            <input inputMode="numeric" value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value.replace(/\D/g, "")) || 0))} />
          </label>
          <div className="sb-field">
            <small>På lager</small>
            <span className="sb-step">
              <button type="button" onClick={() => setStock((s) => Math.max(0, s - 1))} aria-label="Ett færre">
                −
              </button>
              <output>{stock}</output>
              <button type="button" onClick={() => setStock((s) => Math.min(99, s + 1))} aria-label="Ett til">
                +
              </button>
            </span>
          </div>
        </div>
        <button type="button" className="tb-confirm sb-go" onClick={() => setAdded({ name: name.trim() || PRODUCTS[pick].name, price, stock, img: PRODUCTS[pick].img })}>
          Legg ut i butikken
        </button>
        {added && (
          <button type="button" className="sb-reset" onClick={() => setAdded(null)}>
            Nullstill
          </button>
        )}
      </form>
      <div className="sb-shop" aria-live="polite">
        <ShopFront items={items} fresh={!!added} />
      </div>
    </div>
  );
}
