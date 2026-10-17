import type { ProcessStep } from "@/types";

/** A process as numbered columns under an ink rule. */
export function StepList({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="stepl">
      {steps.map((s) => (
        <li key={s.step}>
          <span className="n">{String(s.step).padStart(2, "0")}</span>
          <b>{s.title}</b>
          <span>{s.description}</span>
        </li>
      ))}
    </ol>
  );
}
