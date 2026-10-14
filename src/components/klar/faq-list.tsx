import type { FAQ } from "@/types";

/** Questions as native <details>, so they open without JavaScript and stay in the page for search engines. */
export function FaqList({ faq, openFirst = true }: { faq: readonly FAQ[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {faq.map((item, i) => (
        <details key={item.question} open={openFirst && i === 0}>
          <summary>
            {item.question}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M9 3v12M3 9h12" />
            </svg>
          </summary>
          <p className="ans">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
