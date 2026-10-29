import type { ReactNode } from "react";
import { MODULES, type Entry, type ModuleId } from "@/components/tjenester/kundeportal-content";

/** One entry in the inbox. Pass onDone to make the button work (client use); without it the row is only drawn. */
export function EntryRow({ e, done = false, onDone, isNew = false }: { e: Entry; done?: boolean; onDone?: () => void; isNew?: boolean }) {
  return (
    <div className={`pt-entry${done ? " done" : ""}${isNew ? " is-new" : ""}`}>
      <div className="pt-entry-top">
        <b>{e.name}</b>
        <span className={`pt-status ${done ? "won" : e.status.toLowerCase()}`}>{done ? "VUNNET" : e.status}</span>
      </div>
      <p>{e.what}</p>
      <small>{e.contact}</small>
      <div className="pt-entry-foot">
        {done ? <span className="pt-done">Ferdig</span> : <span />}
        {onDone ? (
          <button type="button" onClick={onDone}>
            {done ? "Angre ferdig" : "Marker som ferdig"}
          </button>
        ) : (
          <span className="pt-btn">{done ? "Angre ferdig" : "Marker som ferdig"}</span>
        )}
      </div>
    </div>
  );
}

/** What one module's page shows: two numbers and a line. */
export function ModuleScreen({ id }: { id: ModuleId }) {
  const m = MODULES.find((x) => x.id === id)!;
  return (
    <div className="pt-module">
      <b>{m.label}</b>
      <p>{m.lede}</p>
      <div className="pt-stats">
        {m.stats.map(([n, l]) => (
          <div key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="pt-note">{m.note}</p>
    </div>
  );
}

/** The portal window: a menu that only lists what the business has chosen, and the page for the chosen item. */
export function PortalFrame({ have, active, onPick, children }: { have: readonly ModuleId[]; active: "innboks" | ModuleId; onPick?: (id: "innboks" | ModuleId) => void; children: ReactNode }) {
  const items: ("innboks" | ModuleId)[] = ["innboks", ...MODULES.filter((m) => have.includes(m.id)).map((m) => m.id)];
  const label = (id: "innboks" | ModuleId) => (id === "innboks" ? "Innboks" : MODULES.find((m) => m.id === id)!.label);
  return (
    <div className="pt-frame">
      <div className="pt-top">
        <b>Kundeportal</b>
        <span>Bedriften din</span>
      </div>
      <div className="pt-body">
        <nav className="pt-menu" aria-label="Portalens meny">
          {items.map((id) =>
            onPick ? (
              <button key={id} type="button" aria-current={active === id ? "page" : undefined} className={active === id ? "on" : undefined} onClick={() => onPick(id)}>
                {label(id)}
              </button>
            ) : (
              <span key={id} className={active === id ? "on" : undefined}>
                {label(id)}
              </span>
            ),
          )}
        </nav>
        <div className="pt-main">{children}</div>
      </div>
    </div>
  );
}
