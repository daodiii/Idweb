import { PROJECTS } from "@/lib/content/portfolio";

export function ClientsStrip() {
  return (
    <section className="clients" aria-label="Kunder">
      <div className="wrap">
        <p>Nettsider vi har laget for</p>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.id}>{p.client}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
