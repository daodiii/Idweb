"use client";

import { useState, type ReactNode } from "react";
import { ROLES, type RoleId } from "@/components/tjenester-lab/shop-info";
import { UiChecklist, UiCheckout, UiNewProduct, UiOrderDetail, UiOrders, UiPhone, UiProductPage, UiSentMail, UiShipping, UiStock } from "@/components/tjenester-lab/shop-ui";

const SCREENS: Record<string, ReactNode> = {
  product: <UiProductPage />,
  checkout: <UiCheckout />,
  sent: <UiSentMail />,
  new: <UiNewProduct />,
  stock: <UiStock />,
  orders: <UiOrders />,
  detail: <UiOrderDetail />,
  shipping: <UiShipping />,
  checklist: <UiChecklist />,
};

/**
 * «Hvem gjør hva»: three roles (the customer, you, us), each with four steps. Choose a role and a step, and the screen that
 * step is about shows on the right. Starts on the customer's first step, so the section reads without a click.
 */
export function RoleExplainer() {
  const [role, setRole] = useState<RoleId>("kunden");
  const [step, setStep] = useState(0);
  const r = ROLES.find((x) => x.id === role)!;
  const s = r.steps[step];
  const phone = role === "kunden" && s.ui !== "sent";

  return (
    <div className="rx">
      <div className="rx-tabs" role="group" aria-label="Velg hvem som gjør hva">
        {ROLES.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={x.id === role}
            className={x.id === role ? "on" : undefined}
            onClick={() => {
              setRole(x.id);
              setStep(0);
            }}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="rx-body">
        <div className="rx-left">
          <p className="rx-lede">{r.lede}</p>
          <ol className="rx-steps" key={role}>
            {r.steps.map((st, i) => (
              <li key={st.t}>
                <button type="button" aria-pressed={i === step} className={i === step ? "on" : undefined} onClick={() => setStep(i)}>
                  <span className="rx-n">{i + 1}</span>
                  <span>
                    <b>{st.t}</b>
                    <span className="rx-p">{st.p}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="rx-screen" aria-live="polite">
          <div className="rx-in" key={`${role}-${step}`}>
            {phone ? <UiPhone>{SCREENS[s.ui]}</UiPhone> : SCREENS[s.ui]}
          </div>
        </div>
      </div>
    </div>
  );
}
