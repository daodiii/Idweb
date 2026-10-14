import { accentInk } from "@/lib/content/landing-identity";

/**
 * IndustryMockup — the "proof is the product" hero asset: a sketch of a built
 * site inside a browser frame. Icon-free; identity is carried by type, shape
 * and the scarce accent.
 */

interface IndustryMockupProps {
  accent: string;
  /** Domain shown in the browser bar. */
  url: string;
  className?: string;
}

export function IndustryMockup({ accent, url, className }: IndustryMockupProps) {
  const ink = accentInk(accent);
  const soft = `color-mix(in srgb, ${accent} 15%, transparent)`;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-[420px] overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#141416] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_40px_80px_-40px_rgba(0,0,0,0.9)] ${className ?? ""}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#19191c] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-white/45">
          {url}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <Dev accent={accent} ink={ink} soft={soft} />
      </div>
    </div>
  );
}

function Dev({ accent, ink, soft }: { accent: string; ink: string; soft: string }) {
  return (
    <div>
      {/* A built site, previewed inside the preview. */}
      <div className="rounded-lg border border-white/[0.07] bg-[#0d0d0f] p-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded" style={{ background: accent }} />
          <span className="flex gap-1.5">
            <span className="h-1 w-5 rounded-full bg-white/15" />
            <span className="h-1 w-5 rounded-full bg-white/15" />
            <span className="h-1 w-5 rounded-full bg-white/15" />
          </span>
          <span className="ml-auto rounded px-2 py-1 text-[9px] font-semibold" style={{ background: accent, color: ink }}>Få tilbud</span>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-2.5 w-4/5 rounded-full bg-white/[0.14]" />
          <div className="h-2.5 w-3/5 rounded-full" style={{ background: soft }} />
        </div>
        <div className="mt-2.5 h-1.5 w-11/12 rounded-full bg-white/[0.06]" />
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-7 rounded-md bg-white/[0.04]" />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Next.js</span>
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Lynrask</span>
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Mobilklar</span>
      </div>
    </div>
  );
}
