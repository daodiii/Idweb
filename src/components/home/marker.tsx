/**
 * The calm homepage's signature: an orange marker stroke behind one key word of a heading, drawn in once
 * (a-klar-calm.css, .mk). Use it on one word per heading.
 */
export function Marker({ children }: { children: string }) {
  return (
    <span className="mk">
      {children}
      <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 25c22-5 49-8 82-8.5 37-.6 73 1.6 110-2.5" />
      </svg>
    </span>
  );
}
