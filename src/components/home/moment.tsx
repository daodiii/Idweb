import { Marker } from "@/components/home/marker";

/**
 * The page's one full-width moment. Bjørvika seen from Ekeberg under the northern lights, drawn by
 * us as SVG (scripts/illustrations/bjorvika). Three image layers so only cheap CSS transforms move: the sky, the aurora
 * (drifting slowly), the city with the fjord and its reflections; the ferry is a small inline layer gliding across the
 * water. Styles in a-klar-calm.css. Reduced motion holds it still.
 */
export function Moment() {
  return (
    <section className="moment" aria-labelledby="moment-h">
      <div className="moment-art" aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element -- layered vector art: next/image adds nothing for SVG and would break the stacking */}
        <img className="moment-sky" src="/images/bjorvika/nordlys-himmel.svg" alt="" loading="lazy" decoding="async" />
        <img className="moment-aurora" src="/images/bjorvika/nordlys-lys.svg" alt="" loading="lazy" decoding="async" />
        <img className="moment-city" src="/images/bjorvika/nordlys-by.svg" alt="" loading="lazy" decoding="async" />
        {/* eslint-enable @next/next/no-img-element */}
        <svg className="moment-ferry" viewBox="0 0 1600 560" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="moment-bloom" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="moment-ferry-g">
            <path d="M536,440 L700,460 M536,440 L690,428" stroke="#C9D4F4" strokeWidth="1" opacity=".35" />
            <g transform="translate(470 434) scale(1.3)">
              <path d="M0,0 L70,0 L64,8 L6,8 Z" fill="#0A1130" />
              <rect x="10" y="-8" width="46" height="8" fill="#1B2552" />
              <rect x="18" y="-14" width="28" height="6" fill="#1B2552" />
              <g filter="url(#moment-bloom)" fill="#FFC983">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <rect key={`a${i}`} x={12 + i * 5} y="-6" width="2.6" height="2.2" />
                ))}
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={`b${i}`} x={20 + i * 5} y="-12.5" width="2.4" height="2" />
                ))}
                <circle cx="32" cy="-17" r="1.1" fill="#fff" />
                <circle cx="68" cy="2" r="1" fill="#57E08A" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="wrap moment-in">
        <h2 id="moment-h">
          Du snakker med den som <Marker>bygger</Marker>.
        </h2>
      </div>
    </section>
  );
}
