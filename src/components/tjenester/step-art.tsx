/**
 * One small drawing per step, in one line style (ink outline, white and pastel fills, a cobalt action, one orange dot).
 * 0 Samtale, 1 Tilbud, 2 Design, 3 Bygging og lansering. No words in them, so they need no translation and say nothing false.
 */
const INK = "#131A3A";
const GREY = "#D8DAE2";
const ACTION = "var(--cobalt)";
const ORANGE = "#F2892B";

export function StepArt({ n }: { n: number }) {
  const common = { viewBox: "0 0 320 220", fill: "none", stroke: INK, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, className: "step-art" };
  if (n === 0)
    return (
      <svg {...common}>
        <path d="M46 34h126a16 16 0 0 1 16 16v52a16 16 0 0 1-16 16H84l-30 24v-24h-8a16 16 0 0 1-16-16V50a16 16 0 0 1 16-16Z" fill="#fff" />
        <rect x="52" y="54" width="104" height="8" rx="4" fill={GREY} stroke="none" />
        <rect x="52" y="72" width="124" height="8" rx="4" fill={GREY} stroke="none" />
        <rect x="52" y="90" width="72" height="8" rx="4" fill={GREY} stroke="none" />
        <path d="M148 100h126a16 16 0 0 1 16 16v52a16 16 0 0 1-16 16h-8v24l-30-24h-88a16 16 0 0 1-16-16v-52a16 16 0 0 1 16-16Z" fill={INK} />
        <rect x="160" y="122" width="108" height="8" rx="4" fill="#fff" stroke="none" opacity=".9" />
        <rect x="160" y="140" width="84" height="8" rx="4" fill="#fff" stroke="none" opacity=".9" />
        <rect x="160" y="158" width="52" height="8" rx="4" fill="#fff" stroke="none" opacity=".9" />
        <circle cx="286" cy="40" r="9" fill={ORANGE} stroke="none" />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...common}>
        <rect x="74" y="18" width="172" height="184" rx="12" fill="#fff" />
        <rect x="94" y="40" width="64" height="9" rx="4.5" fill={INK} stroke="none" />
        <rect x="196" y="38" width="34" height="13" rx="6.5" fill="#EEF0F4" stroke="none" />
        {[76, 102, 128].map((y) => (
          <g key={y}>
            <path d={`M95 ${y + 4}l5 5 9-10`} stroke={ACTION} strokeWidth="2.4" />
            <rect x="120" y={y} width="96" height="8" rx="4" fill={GREY} stroke="none" />
          </g>
        ))}
        <path d="M94 150h132" stroke={GREY} />
        <rect x="94" y="164" width="132" height="26" rx="13" fill={ACTION} stroke="none" />
        <rect x="114" y="174" width="56" height="6" rx="3" fill="#fff" stroke="none" />
        <circle cx="270" cy="44" r="9" fill={ORANGE} stroke="none" />
      </svg>
    );
  if (n === 2)
    return (
      <svg {...common}>
        <rect x="22" y="26" width="212" height="148" rx="10" fill="#fff" />
        <path d="M22 46h212" />
        <circle cx="36" cy="36" r="3" fill={INK} stroke="none" />
        <circle cx="47" cy="36" r="3" fill={INK} stroke="none" />
        <rect x="38" y="66" width="104" height="14" rx="4" fill={INK} stroke="none" />
        <rect x="38" y="88" width="82" height="8" rx="4" fill={GREY} stroke="none" />
        <rect x="38" y="102" width="64" height="8" rx="4" fill={GREY} stroke="none" />
        <rect x="38" y="126" width="48" height="18" rx="9" fill={ACTION} stroke="none" />
        <rect x="152" y="62" width="68" height="92" rx="6" fill="#DCE9F1" />
        <rect x="216" y="70" width="72" height="136" rx="14" fill="#fff" />
        <rect x="228" y="92" width="48" height="10" rx="3" fill={INK} stroke="none" />
        <rect x="228" y="110" width="36" height="6" rx="3" fill={GREY} stroke="none" />
        <rect x="228" y="124" width="48" height="40" rx="5" fill="#DFECE3" />
        <circle cx="46" cy="196" r="9" fill={ORANGE} stroke="none" />
        <circle cx="70" cy="196" r="9" fill={INK} stroke="none" />
        <circle cx="94" cy="196" r="9" fill={ACTION} stroke="none" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="40" y="30" width="240" height="160" rx="10" fill="#fff" />
      <path d="M40 54h240" />
      <circle cx="54" cy="42" r="3" fill={INK} stroke="none" />
      <circle cx="65" cy="42" r="3" fill={INK} stroke="none" />
      <rect x="96" y="37" width="112" height="10" rx="5" fill="#EEF0F4" stroke="none" />
      <rect x="58" y="76" width="96" height="14" rx="4" fill={INK} stroke="none" />
      <rect x="58" y="98" width="120" height="8" rx="4" fill={GREY} stroke="none" />
      <rect x="58" y="112" width="92" height="8" rx="4" fill={GREY} stroke="none" />
      <rect x="58" y="136" width="52" height="18" rx="9" fill={ACTION} stroke="none" />
      <rect x="190" y="74" width="72" height="86" rx="6" fill="#DCECE9" />
      <circle cx="262" cy="52" r="26" fill={ACTION} />
      <path d="M250 52l9 9 16-18" stroke="#fff" strokeWidth="4" />
    </svg>
  );
}
