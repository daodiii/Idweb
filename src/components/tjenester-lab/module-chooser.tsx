"use client";

import { useState } from "react";
import { EntryRow, ModuleScreen, PortalFrame } from "@/components/tjenester-lab/portal-parts";
import { ENTRIES, MODULES, type ModuleId } from "@/components/tjenester-lab/kundeportal-content";

/**
 * «Bare modulene dere trenger»: tick the modules the business has, and the portal's menu shows only those. Choose a menu item
 * to see its page. Starts with the chat and booking ticked and the inbox open, so it reads without a click.
 */
export function ModuleChooser() {
  const [have, setHave] = useState<ModuleId[]>(["chat", "booking"]);
  const [active, setActive] = useState<"innboks" | ModuleId>("innboks");

  function toggle(id: ModuleId) {
    setHave((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));
    if (active === id) setActive("innboks");
  }

  return (
    <div className="mc2">
      <fieldset className="mc2-pick">
        <legend>Dere velger</legend>
        {MODULES.map((m) => (
          <label key={m.id} className={have.includes(m.id) ? "on" : undefined}>
            <input type="checkbox" checked={have.includes(m.id)} onChange={() => toggle(m.id)} />
            <i aria-hidden="true" />
            {m.label}
          </label>
        ))}
        <p>Menyen viser bare det dere har valgt. Tallene er eksempler.</p>
      </fieldset>
      <div className="mc2-screen" aria-live="polite">
        <PortalFrame have={have} active={active} onPick={setActive}>
          {active === "innboks" ? (
            <div className="pt-inbox">
              <p className="pt-lede">Når noen tar kontakt, havner de her.</p>
              {ENTRIES.map((e) => (
                <EntryRow key={e.id} e={e} />
              ))}
            </div>
          ) : (
            <ModuleScreen id={active} />
          )}
        </PortalFrame>
      </div>
    </div>
  );
}
