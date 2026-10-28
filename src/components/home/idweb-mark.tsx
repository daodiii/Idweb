/**
 * The IDweb mark (the approved «Halvmåne» logo): an orange rounded «I» beside a crescent «D». Static SVG. `id` keeps the
 * gradient ids unique when the mark appears twice on one page; `tone="light"` is for dark backgrounds (the footer).
 */
export function IdwebMark({ id, tone = "dark", className }: { id: string; tone?: "dark" | "light"; className?: string }) {
  const [from, to] = tone === "light" ? ["#FFFFFF", "#9DB1F4"] : ["#4B6BEA", "#1E2A6E"];
  return (
    <svg className={className} viewBox="12 6 76 88" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-i`} gradientUnits="userSpaceOnUse" x1="22" y1="14" x2="34" y2="86">
          <stop offset="0" stopColor="#FFB36B" />
          <stop offset="1" stopColor="#F2892B" />
        </linearGradient>
        <linearGradient id={`${id}-d`} gradientUnits="userSpaceOnUse" x1="40" y1="14" x2="76" y2="86">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="22" y="14" width="12" height="72" rx="6" fill={`url(#${id}-i)`} />
      <path d="M40 13A37 37 0 0 1 40 87A41 41 0 0 0 40 13Z" fill={`url(#${id}-d)`} />
    </svg>
  );
}
