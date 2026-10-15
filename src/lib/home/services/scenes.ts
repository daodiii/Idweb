/**
 * The five service scenes for the homepage canvas, each for a fictional example client. Every scene is static
 * markup authored here plus a timeline of steps; nothing user-supplied is ever inserted.
 * Ported from the approved mockup (idweb-hero/tjenester/tjenester2.html, «Lerretet»).
 */
import { EIO, EO, type Api, type Scene } from "./scene-kit";
import type { SceneKey } from "./data";

/* ---------- small SVG pieces ---------- */
const CHECK_W = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg>';
/* Nordvik Arkitekter: a black timber cabin on the shore at dusk, used full-bleed in the hero (desktop and phone). */
const NV = (id: string, cls: string) => `<svg class="${cls}" viewBox="0 0 424 196" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
  <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E2533"/><stop offset=".5" stop-color="#2D5568"/><stop offset=".8" stop-color="#C98966"/><stop offset="1" stop-color="#F0B585"/></linearGradient>
  <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A4A5B"/><stop offset="1" stop-color="#0B1C26"/></linearGradient>
  <radialGradient id="${id}g"><stop offset="0" stop-color="#FFD7A1" stop-opacity=".9"/><stop offset="1" stop-color="#FFD7A1" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD48C"/><stop offset="1" stop-color="#EE8738"/></linearGradient>
  <linearGradient id="${id}o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#07131B" stop-opacity=".78"/><stop offset=".62" stop-color="#07131B" stop-opacity="0"/></linearGradient></defs>
  <rect width="424" height="196" fill="url(#${id}s)"/>
  <g fill="#fff" opacity=".8"><circle cx="40" cy="22" r=".9"/><circle cx="120" cy="14" r=".7"/><circle cx="208" cy="30" r=".8"/><circle cx="352" cy="18" r="1"/><circle cx="392" cy="42" r=".7"/><circle cx="276" cy="10" r=".7"/></g>
  <circle cx="318" cy="150" r="74" fill="url(#${id}g)" opacity=".5"/>
  <path d="M0 132 L48 104 L86 122 L140 88 L196 124 L250 100 L300 126 L352 96 L424 124 V160 H0Z" fill="#36596A"/>
  <path d="M0 146 L60 126 L120 140 L190 118 L260 140 L340 122 L424 140 V160 H0Z" fill="#244452"/>
  <rect y="150" width="424" height="46" fill="url(#${id}w)"/>
  <g stroke="#F3B784" stroke-linecap="round" opacity=".6"><path d="M300 158h38" stroke-width="1.6"/><path d="M306 165h26" stroke-width="1.3"/><path d="M312 172h14"/></g>
  <path d="M196 196 L214 160 L250 152 L300 156 L352 150 L388 166 L424 160 V196Z" fill="#161B20"/>
  <ellipse cx="282" cy="152" rx="48" ry="8" fill="url(#${id}g)" opacity=".75"/>
  <path d="M240 152 V122 L268 100 L332 116 V152Z" fill="#14181C"/>
  <path d="M236 123 L268 98 L336 114" fill="none" stroke="#2C3339" stroke-width="3" stroke-linejoin="round"/>
  <rect x="252" y="122" width="56" height="28" fill="url(#${id}l)"/>
  <path d="M266 122v28M280 122v28M294 122v28" stroke="#14181C" stroke-width="1.6"/>
  <rect x="314" y="128" width="10" height="22" fill="url(#${id}l)" opacity=".85"/>
  <path d="M232 152H344" stroke="#2C3339" stroke-width="2"/>
  <path d="M0 196 V168 L40 158 L92 166 L130 182 L150 196Z" fill="#0F1418"/>
  <rect width="424" height="196" fill="url(#${id}o)"/></svg>`;
/* Project thumbnails: summer shore, winter farm, city block. */
const HVALER = (id: string) => `<svg viewBox="0 0 136 66" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFD1DC"/><stop offset="1" stop-color="#F3E1CB"/></linearGradient></defs>
  <rect width="136" height="66" fill="url(#${id})"/><circle cx="104" cy="22" r="7" fill="#F7D3A4"/><rect y="44" width="136" height="22" fill="#7C9DA8"/><path d="M96 48h24M100 52h14" stroke="#EAF2F4" stroke-width="1" opacity=".7"/>
  <path d="M0 52 L28 40 L66 44 L94 36 L136 48 V66 H0Z" fill="#646D71"/><path d="M58 40 V28 L72 20 L94 26 V40Z" fill="#1A1E22"/><rect x="63" y="29" width="18" height="10" fill="#FFC680"/><path d="M69 29v10M75 29v10" stroke="#1A1E22"/>
  <path d="M0 66 V56 L40 52 L72 58 L92 66Z" fill="#3E4549"/></svg>`;
const VALDRES = (id: string) => `<svg viewBox="0 0 136 66" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DB4CA"/><stop offset="1" stop-color="#EAF0F6"/></linearGradient></defs>
  <rect width="136" height="66" fill="url(#${id})"/><path d="M0 40 L26 22 L44 32 L70 14 L98 30 L118 20 L136 30 V66 H0Z" fill="#E5ECF3"/><path d="M70 14 L98 30 L84 30 L76 22Z M26 22 L44 32 L34 32Z M118 20 L136 30 L126 30Z" fill="#C3D1DF"/>
  <path d="M0 50 Q68 40 136 50 V66 H0Z" fill="#F8FAFC"/>
  <path d="M40 51 V41 L52 34 L64 41 V51Z" fill="#3A2A20"/><path d="M38 42 L52 33 L66 42" fill="none" stroke="#F8FAFC" stroke-width="2.6" stroke-linejoin="round"/><rect x="47" y="43" width="5" height="5" fill="#FFC680"/>
  <path d="M72 53 V45 L82 39 L92 45 V53Z" fill="#4A3426"/><path d="M70 46 L82 38 L94 46" fill="none" stroke="#F8FAFC" stroke-width="2.4" stroke-linejoin="round"/><rect x="79" y="46" width="4" height="4" fill="#FFC680"/>
  <path d="M0 66 V59 Q60 55 136 61 V66Z" fill="#DFE7EF"/></svg>`;
const FROGNER_WIN = [30, 46, 62, 78, 94]
  .flatMap((x) => [16, 32, 48].map((y) => `<rect x="${x}" y="${y}" width="9" height="10" fill="${(x === 46 && y === 16) || (x === 94 && y === 32) || (x === 30 && y === 48) ? "#FFD08A" : "#34424F"}"/>`))
  .join("");
const FROGNER = (id: string) => `<svg viewBox="0 0 136 66" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9D6B8"/><stop offset="1" stop-color="#C6AA83"/></linearGradient></defs>
  <rect width="136" height="66" fill="#C2D5E6"/><rect x="22" y="8" width="92" height="58" fill="url(#${id})"/><rect x="18" y="5" width="100" height="4" fill="#B59A74"/>
  <path d="M22 29.5H114M22 45.5H114" stroke="#A88E69" stroke-width="1.2"/>${FROGNER_WIN}<rect x="58" y="58" width="20" height="2" fill="#2B3540"/>
  <circle cx="11" cy="46" r="13" fill="#6C7D4C"/><circle cx="127" cy="50" r="11" fill="#7B8B57"/><rect y="61" width="136" height="5" fill="#8D9096"/></svg>`;

/* Krus & Kar: glazed stoneware with studio light, speckles and a bare clay foot. */
const SPECK = (pts: number[][], c: string) => `<g fill="${c}" opacity=".35">${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>`;
const MUG = (id: string) => `<svg viewBox="0 0 80 80" aria-hidden="true"><defs>
  <linearGradient id="${id}b" x1="0" x2="1"><stop offset="0" stop-color="#55705F"/><stop offset=".34" stop-color="#B9D1C3"/><stop offset=".6" stop-color="#8EAD9C"/><stop offset="1" stop-color="#4A6455"/></linearGradient>
  <linearGradient id="${id}c" x1="0" x2="1"><stop offset="0" stop-color="#B49C80"/><stop offset=".4" stop-color="#E4D3BE"/><stop offset="1" stop-color="#9C8566"/></linearGradient>
  <radialGradient id="${id}s"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="39" cy="70" rx="29" ry="5" fill="url(#${id}s)"/>
  <path d="M55 31 q16 0 16 13.5 q0 13.5 -16 13.5" fill="none" stroke="#6E8B7B" stroke-width="6" stroke-linecap="round"/>
  <path d="M18 22 h40 v41 q0 5 -5 5 h-30 q-5 0 -5 -5z" fill="url(#${id}c)"/>
  <path d="M18 22 h40 v31 q-5 4 -9 1 q-5 -4 -10 2 q-5 5 -10 -1 q-5 -5 -11 -1z" fill="url(#${id}b)"/>
  <ellipse cx="38" cy="22" rx="20" ry="4" fill="#CFE1D6"/><ellipse cx="38" cy="22.6" rx="17" ry="2.8" fill="#3B5145"/>
  ${SPECK([[26, 32], [44, 28], [50, 40], [31, 44], [40, 36], [53, 30], [23, 41]], "#24342B")}
  <rect x="23.5" y="26" width="4" height="25" rx="2" fill="#fff" opacity=".24"/></svg>`;
const BOWL = (id: string) => `<svg viewBox="0 0 80 80" aria-hidden="true"><defs>
  <linearGradient id="${id}o" x1="0" x2="1"><stop offset="0" stop-color="#6E400F"/><stop offset=".38" stop-color="#E1A851"/><stop offset=".68" stop-color="#B9792A"/><stop offset="1" stop-color="#5E360D"/></linearGradient>
  <linearGradient id="${id}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4F2E0D"/><stop offset="1" stop-color="#A66B22"/></linearGradient>
  <radialGradient id="${id}s"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="40" cy="64" rx="31" ry="5" fill="url(#${id}s)"/><path d="M31 57 h18 l-2 6 h-14z" fill="#C7A782"/>
  <path d="M8 34 h64 q-3 26 -32 26 q-29 0 -32 -26z" fill="url(#${id}o)"/>
  <ellipse cx="40" cy="34" rx="32" ry="7" fill="#EDBE6E"/><ellipse cx="40" cy="34.6" rx="29" ry="5.3" fill="url(#${id}i)"/>
  <path d="M15 41 q5 13 20 16" fill="none" stroke="#fff" stroke-width="2.6" opacity=".26" stroke-linecap="round"/>
  ${SPECK([[22, 44], [34, 50], [48, 46], [58, 42], [41, 54], [28, 39], [52, 52]], "#3D2306")}</svg>`;
const VASE = (id: string) => `<svg viewBox="0 0 80 80" aria-hidden="true"><defs>
  <linearGradient id="${id}o" x1="0" x2="1"><stop offset="0" stop-color="#3B100E"/><stop offset=".36" stop-color="#A9473C"/><stop offset=".66" stop-color="#7A2A24"/><stop offset="1" stop-color="#34100D"/></linearGradient>
  <radialGradient id="${id}s"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="40" cy="72" rx="21" ry="4" fill="url(#${id}s)"/>
  <path d="M31 11 h18 v6 q-2 5 5 13 q11 15 4 31 q-4 9 -18 9 q-14 0 -18 -9 q-7 -16 4 -31 q7 -8 5 -13z" fill="url(#${id}o)"/>
  <path d="M27 64 q13 6 26 0 q-3 6 -13 6 q-10 0 -13 -6z" fill="#B99A7A"/>
  <ellipse cx="40" cy="11" rx="9" ry="2.6" fill="#C25B4E"/><ellipse cx="40" cy="11.3" rx="6.6" ry="1.6" fill="#2A0B09"/>
  <path d="M30 34 q-7 13 -1 25" fill="none" stroke="#fff" stroke-width="2.8" opacity=".22" stroke-linecap="round"/>
  ${SPECK([[44, 30], [36, 42], [50, 48], [42, 56], [33, 52]], "#1E0605")}</svg>`;

/* Vang Bakeri: a scored sourdough and a roll on a board in warm morning light. */
const FLOUR = [[186, 76], [196, 72], [208, 70], [222, 73], [234, 78], [204, 80], [216, 84], [192, 86], [228, 88], [244, 86]];
const BAKE = (id: string) => `<svg viewBox="0 0 286 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
  <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8D78E"/><stop offset=".55" stop-color="#E6AC3A"/><stop offset="1" stop-color="#C98418"/></linearGradient>
  <radialGradient id="${id}l" cx=".18" cy=".08" r=".75"><stop offset="0" stop-color="#FFF6DD" stop-opacity=".75"/><stop offset="1" stop-color="#FFF6DD" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B27641"/><stop offset="1" stop-color="#774421"/></linearGradient>
  <radialGradient id="${id}b" cx=".42" cy=".28" r=".8"><stop offset="0" stop-color="#F4C77E"/><stop offset=".45" stop-color="#C7772E"/><stop offset="1" stop-color="#7A3A12"/></radialGradient>
  <radialGradient id="${id}r" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#F2C178"/><stop offset="1" stop-color="#97491A"/></radialGradient>
  <radialGradient id="${id}s"><stop offset="0" stop-color="#3A2618" stop-opacity=".5"/><stop offset="1" stop-color="#3A2618" stop-opacity="0"/></radialGradient></defs>
  <rect width="286" height="140" fill="url(#${id}a)"/><rect width="286" height="140" fill="url(#${id}l)"/>
  <path d="M112 120 Q200 98 296 112 V140 H104Z" fill="url(#${id}w)"/>
  <path d="M126 127 Q200 108 292 119 M136 135 Q210 118 292 129" stroke="#5E3417" stroke-width="1" opacity=".35" fill="none"/>
  <ellipse cx="206" cy="114" rx="66" ry="9" fill="url(#${id}s)"/>
  <path d="M150 108 Q148 70 206 64 Q262 62 266 104 Q252 118 206 118 Q160 118 150 108Z" fill="url(#${id}b)"/>
  <path d="M168 92 Q200 72 246 82" fill="none" stroke="#F9DEAA" stroke-width="5.5" stroke-linecap="round" opacity=".9"/>
  <path d="M170 93 Q200 75 246 83.5" fill="none" stroke="#8B4516" stroke-width="1.3" opacity=".55"/>
  <g fill="#FFF8EA" opacity=".6">${FLOUR.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3"/>`).join("")}</g>
  <ellipse cx="134" cy="114" rx="21" ry="13" fill="url(#${id}r)"/><path d="M122 110 q12 -8 24 0" stroke="#F9DEAA" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
  <path d="M262 30 Q254 64 250 100" stroke="#C99A3C" stroke-width="1.6" fill="none"/>
  <g fill="#E9C77A">${[36, 46, 56, 66].map((y, i) => `<ellipse cx="${260 - i * 2.2}" cy="${y}" rx="3" ry="5.5" transform="rotate(-24 ${260 - i * 2.2} ${y})"/><ellipse cx="${265 - i * 2.2}" cy="${y + 4}" rx="3" ry="5.5" transform="rotate(24 ${265 - i * 2.2} ${y + 4})"/>`).join("")}</g></svg>`;
const TICK = '<svg class="ck" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="8" fill="none" stroke="#2447D6" stroke-width="1.6" stroke-dasharray="51" stroke-dashoffset="51" transform="rotate(-90 9 9)"/><path d="M5.5 9.2l2.3 2.3 4.6-4.8" fill="none" stroke="#2447D6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="14" stroke-dashoffset="14"/></svg>';
const NI = {
  home: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 6.5 7 2.5l5 4V12H2z"/></svg>',
  cal: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="3" width="10" height="9" rx="2"/><path d="M2 6h10M5 1.5v3M9 1.5v3"/></svg>',
  list: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4h7M5 7h7M5 10h7M2 4h.5M2 7h.5M2 10h.5"/></svg>',
  doc: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3.5 1.5h5l2.5 2.5v8.5h-7.5z"/></svg>',
  chat: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3.5h10v6H6l-3 2.5v-2.5H2z"/></svg>',
};

/* ---------- scenes ---------- */
export const SCENES: Record<SceneKey, Scene> = {
  web: {
    dur: 6500,
    html: `<div class="sc sc-web">
      <div class="bw blk" style="left:16px;top:20px;width:448px;height:400px">
        <div class="bar"><i></i><i></i><i></i><span class="url"><span class="u"></span></span><span class="pub hid">Publisert</span></div>
        <div class="site wf">
          <div class="nav blk"><b class="lg">Nordvik</b><span class="lk">Prosjekter</span><span class="lk">Kontoret</span><span class="lk">Kontakt</span></div>
          <div class="hro blk"><div class="fill"></div>${NV("sv-nvh", "land hid")}<span class="cap hid">Hytte på Hvaler · 2025</span><h4 class="hl hid"><span class="t"></span></h4><span class="hbtn hid">Se prosjektene</span></div>
          <div class="cards">
            <div class="cardx blk"><div class="img">${HVALER("sv-c1")}</div><b>Hytte på Hvaler</b><small>Fritid · 2025</small></div>
            <div class="cardx blk"><div class="img">${VALDRES("sv-c2")}</div><b>Tun i Valdres</b><small>Bolig · 2024</small></div>
            <div class="cardx blk"><div class="img">${FROGNER("sv-c3")}</div><b>Bygård på Frogner</b><small>Rehabilitering · 2024</small></div>
          </div>
        </div>
        <div class="pal hid"><span>Farger</span><i class="sw s1"></i><i class="sw s2"></i><i class="sw s3"></i></div>
      </div>
      <div class="ph blk hid" style="left:480px;top:60px;width:144px;height:304px">
        <div class="st"><span>09:41</span><span>●●●</span></div>
        <div class="pn"><b>Nordvik</b><i></i></div>
        <div class="phh"><h5>Hus som hører til stedet.</h5>${NV("sv-nvp", "")}</div>
        <div class="pc"><div class="img">${HVALER("sv-c1p")}</div><b>Hytte på Hvaler</b></div>
      </div>
    </div>`,
    run(a: Api) {
      a.enter(".bw", 0);
      a.type(".u", "nordvikarkitekter.no", 250, 42);
      a.at(650, () => a.qa(".site .blk").forEach((el, j) => a.anim(el, [{ clipPath: "inset(0 100% 0 0 round 8px)" }, { clipPath: "inset(0 0 0 0 round 8px)" }], { duration: 520, delay: j * 80, fill: "backwards", easing: EIO })));
      a.show(".pal", 1350, { from: "translateY(6px) scale(.97)" });
      a.cursor(".pal .s1", 1550);
      a.at(2200, () => {
        const hero = a.q(".hro"), h = a.pos(hero), s = a.pos(a.q(".pal .s1"));
        const x = s.x + s.w / 2 - h.x, y = s.y + s.h / 2 - h.y;
        hero.classList.add("done");
        a.anim(a.q(".fill"), [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(560px at ${x}px ${y}px)` }], { duration: 950, fill: "forwards", easing: EO });
        a.anim(a.q(".pal"), [{ opacity: 1 }, { opacity: 0, transform: "scale(.97)" }], { duration: 220, delay: 260, fill: "forwards" });
      });
      a.away(2500);
      a.show(".hl", 2650, { from: "none", d: 1 });
      a.type(".hl .t", "Hus som hører til stedet.", 2700, 32);
      a.at(3550, () => { const l = a.q(".hro .land"); l.classList.remove("hid"); a.anim(l, [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 900, fill: "backwards" }); });
      a.show(".hro .cap", 4100, { from: "translateY(-4px)" });
      a.show(".hbtn", 3850);
      a.at(4000, () => a.q(".nav").classList.add("done"));
      [0, 1, 2].forEach((j) => a.at(4250 + j * 130, () => {
        const c = a.qa(".cardx")[j];
        c.classList.add("done");
        a.anim(c.querySelector(".img"), [{ clipPath: "inset(0 0 100% 0 round 7px)" }, { clipPath: "inset(0 0 0 0 round 7px)" }], { duration: 650, fill: "backwards" });
      }));
      a.show(".ph", 4900, { from: "translateX(26px)", d: 700 });
      a.pop(".pub", 5700);
    },
  },

  portal: {
    dur: 6900,
    html: `<div class="sc sc-portal">
      <div class="pt blk" style="left:170px;top:50px;width:300px;height:340px">
        <div class="login">
          <div class="brand"><i class="mkr"></i><span>Bjølsen Fysioterapi</span></div>
          <h4>Logg inn på Min side</h4>
          <label>E-post</label><div class="fld f1"><span class="v"></span></div>
          <label>Passord</label><div class="fld f2"><span class="v"></span></div>
          <div class="lbtn blk"><span class="bt">Logg inn</span><i class="spin"></i></div>
          <small>Glemt passord?</small>
        </div>
        <div class="dash">
          <aside>
            <div class="brand"><i class="mkr"></i><span>Bjølsen</span></div>
            <div class="ni on">${NI.home}Oversikt</div>
            <div class="ni">${NI.cal}Timer</div>
            <div class="ni">${NI.list}Treningsprogram</div>
            <div class="ni">${NI.doc}Dokumenter</div>
            <div class="ni">${NI.chat}Meldinger<span class="dot">1</span></div>
            <div class="me"><i>M</i>Maria Holm</div>
          </aside>
          <main>
            <div class="mh"><h4>Hei, Maria</h4><p>Her er det som skjer denne uken.</p></div>
            <div class="tiles">
              <div class="tl blk hid"><span class="lb">Neste time</span><span class="bgn">Torsdag 14:30</span><span class="smt">Hos Ingrid, sal 2</span><div class="row"><span class="p">Flytt time</span><span>Avbestill</span></div></div>
              <div class="tl blk hid"><span class="lb">Treningsprogram</span><span class="bgn">3 nye øvelser</span><div class="exr"><i class="y"></i>Knebøy mot vegg</div><div class="exr"><i></i>Utfall</div><div class="exr"><i></i>Balanse på ett bein</div></div>
              <div class="tl blk hid"><span class="lb">Dokumenter</span><div class="up"><span class="doc"></span><div style="flex:1"><span class="nm">Henvisning.pdf</span><div class="pb"><i></i></div><div class="stt"><span class="a">Laster opp …</span><span class="b">Lagret</span></div></div></div><div class="old"><span class="doc"></span>Kvittering, april</div></div>
              <div class="tl blk hid"><span class="lb">Meldinger</span><div class="msg"><i>I</i><p><b>Ingrid</b>Hvordan kjennes kneet etter økta i går?</p></div><div class="row"><span class="p">Svar</span></div></div>
            </div>
          </main>
        </div>
        <div class="toast hid">${CHECK_W}<span>Timen er bekreftet. Påminnelse sendes dagen før.</span></div>
      </div>
    </div>`,
    run(a: Api) {
      const pt = a.q(".pt");
      a.enter(".pt", 0);
      a.cursor(".f1", 300);
      a.at(920, () => a.q(".f1").classList.add("focus"));
      a.type(".f1 .v", "maria@epost.no", 950, 30);
      a.cursor(".f2", 1450);
      a.at(2070, () => { a.q(".f1").classList.remove("focus"); a.q(".f2").classList.add("focus"); });
      a.type(".f2 .v", "••••••••", 2100, 40);
      a.cursor(".lbtn", 2350);
      a.at(2990, () => { a.q(".f2").classList.remove("focus"); a.q(".lbtn").classList.add("loading"); });
      a.away(3150);
      a.at(3550, () => {
        a.anim(a.q(".login"), [{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: "forwards" });
        a.anim(pt, [{ left: "170px", top: "50px", width: "300px", height: "340px" }, { left: "16px", top: "16px", width: "608px", height: "408px" }], { duration: 720, fill: "forwards", easing: EIO });
      });
      a.at(3980, () => {
        const d = a.q(".dash");
        d.classList.add("on");
        a.anim(d.querySelector("aside"), [{ opacity: 0, transform: "translateX(-10px)" }, { opacity: 1, transform: "none" }], { duration: 450, fill: "backwards" });
        a.anim(d.querySelector(".mh"), [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 450, delay: 80, fill: "backwards" });
      });
      a.show(".tl", 4150, { stagger: 80 });
      a.at(4800, () => a.anim(a.q(".pb i"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, fill: "forwards", easing: "cubic-bezier(.4,0,.2,1)" }));
      a.at(5750, () => a.q(".up").classList.add("ok"));
      a.show(".toast", 6000, { from: "translateY(-8px) scale(.98)" });
    },
  },

  shop: {
    dur: 7600,
    html: `<div class="sc sc-shop">
      <div class="bw blk" style="left:16px;top:16px;width:608px;height:408px">
        <div class="bar"><i></i><i></i><i></i><span class="url"><span class="u">kruskar.no</span></span></div>
        <div class="site">
          <div class="sh hid"><b class="lg">Krus &amp; Kar</b><span class="lk">Krus</span><span class="lk">Skåler</span><span class="lk">Fat</span>
            <span class="cart"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 6h11l-1 9.5h-9z"/><path d="M6.5 6V5a2.5 2.5 0 0 1 5 0v1"/></svg><span class="badge">0</span></span></div>
          <div class="intro hid"><h4>Dreid for hånd i Lillehammer.</h4><p>Små serier, brent i egen ovn.</p></div>
          <div class="grid">
            <div class="pcd blk c1 hid"><div class="imgw" style="background:radial-gradient(110% 85% at 50% 28%,#55675E,#232A26)">${MUG("sv-km")}<span class="add">Legg i kurv</span></div><div class="meta"><b>Krus, seladon</b><small>Steintøy · 300 ml</small></div></div>
            <div class="pcd blk c2 hid"><div class="imgw" style="background:radial-gradient(110% 85% at 50% 28%,#6A5236,#2A2018)">${BOWL("sv-kb")}<span class="add">Legg i kurv</span></div><div class="meta"><b>Skål, okergul</b><small>Steintøy · Ø 16 cm</small></div></div>
            <div class="pcd blk c3 hid"><div class="imgw" style="background:radial-gradient(110% 85% at 50% 28%,#62403A,#2A1715)">${VASE("sv-kv")}<span class="add">Legg i kurv</span></div><div class="meta"><b>Vase, oksblod</b><small>Steintøy · 22 cm</small></div></div>
          </div>
          <div class="dim"></div>
          <div class="bts"><span class="hid">${CHECK_W}Lager oppdatert</span><span class="hid">${CHECK_W}Pakkseddel klar</span><span class="hid">${CHECK_W}Kvittering sendt</span></div>
          <div class="drw">
            <div class="pane p1 on"><h5>Handlekurv</h5><div class="li"><span class="th">${BOWL("sv-kb2")}</span><span><b>Skål, okergul</b><small>1 stk</small></span></div><span class="go blk">Til kassen</span></div>
            <div class="pane p2"><h5>Kassen</h5><span class="lbl">Levering</span><span class="rd r1 sel"><i></i>Hent i butikken</span><span class="rd r2"><i></i>Send med posten</span><span class="lbl" style="margin-top:8px">Betaling</span><span class="rd sel"><i></i>Kort eller mobil</span><span class="go blk">Fullfør kjøp</span></div>
            <div class="pane p3"><svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="26" fill="none" stroke="#D9A441" stroke-width="3" stroke-dasharray="164" stroke-dashoffset="164" transform="rotate(-90 29 29)"/><path d="M18 30l7.5 7.5L41 22" fill="none" stroke="#1F1B18" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="36" stroke-dashoffset="36"/></svg><h5>Takk, Maria!</h5><p>Ordren er på vei. Kvitteringen ligger i innboksen din.</p></div>
          </div>
        </div>
      </div>
    </div>`,
    run(a: Api) {
      a.enter(".bw", 0);
      a.show(".sh", 250, { from: "translateY(-4px)" });
      a.show(".intro", 400);
      a.show(".pcd", 600, { stagger: 90, d: 560, from: "translateY(14px)" });
      a.cursor(".c2 .imgw", 1250, { click: false });
      a.at(1850, () => a.q(".c2").classList.add("hover"));
      a.cursor(".c2 .add", 2150);
      a.at(2790, () => {
        const src = a.q(".c2 .imgw svg"), s = a.pos(src), c = a.pos(a.q(".cart"));
        const g = src.cloneNode(true) as SVGElement;
        g.style.cssText = `position:absolute;left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px;z-index:20;pointer-events:none`;
        a.q(".sc").appendChild(g);
        const dx = c.x + c.w / 2 - (s.x + s.w / 2), dy = c.y + c.h / 2 - (s.y + s.h / 2);
        a.anim(g, [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx * 0.55}px,${dy * 0.55 - 50}px) scale(.55)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${dx}px,${dy}px) scale(.16)`, opacity: 0 },
        ], { duration: 720, fill: "forwards", easing: "cubic-bezier(.45,0,.55,1)" });
      });
      a.at(3480, () => { const b = a.q(".badge"); b.textContent = "1"; b.classList.add("on"); });
      a.at(3650, () => { a.q(".c2").classList.remove("hover"); a.q(".dim").classList.add("on"); a.q(".drw").classList.add("on"); });
      a.cursor(".p1 .go", 4100);
      a.at(4740, () => { a.q(".p1").classList.remove("on"); a.q(".p2").classList.add("on"); });
      a.cursor(".p2 .r2", 5050);
      a.at(5690, () => { a.q(".p2 .r1").classList.remove("sel"); a.q(".p2 .r2").classList.add("sel"); });
      a.cursor(".p2 .go", 5850);
      a.at(6490, () => {
        a.q(".p2").classList.remove("on"); a.q(".p3").classList.add("on");
        a.anim(a.q(".p3 circle"), [{ strokeDashoffset: 164 }, { strokeDashoffset: 0 }], { duration: 600, delay: 150, fill: "both" });
        a.anim(a.q(".p3 path"), [{ strokeDashoffset: 36 }, { strokeDashoffset: 0 }], { duration: 360, delay: 600, fill: "both" });
      });
      a.away(6600);
      a.show(".bts span", 6950, { stagger: 140, from: "translateY(6px)" });
    },
  },

  seo: {
    dur: 8400,
    html: `<div class="sc sc-seo">
      <div class="card srch hid" style="left:16px;top:16px;width:372px;height:408px">
        <div class="qf blk"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#5A606C" stroke-width="1.7"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><span class="v"></span></div>
        <div class="res">
          <div class="rw blk a hid" style="top:0"><div class="dm"><i class="fv" style="background:#8FA7C7"></i>tannhelsedrammen.no</div><div class="tt">Tannhelse Drammen – allmenn tannbehandling</div><div class="sn">Undersøkelse, fyllinger og tannrens for hele familien.</div></div>
          <div class="rw blk b hid" style="top:72px"><div class="dm"><i class="fv" style="background:#D7A2B4"></i>smilestudio.no</div><div class="tt">Smilestudio – tannbleking og estetikk</div><div class="sn">Tannbleking, skallfasetter og usynlig tannregulering.</div></div>
          <div class="rw blk c hid" style="top:144px"><div class="dm"><i class="fv" style="background:#B9BEC8"></i>tannlegeguiden.no</div><div class="tt">Tannleger i Drammen – sammenlign klinikker</div><div class="sn">Oversikt over klinikker i Drammen og omegn.</div></div>
          <div class="rw blk lia hid" style="top:216px"><div class="dm"><i class="fv" style="background:#0B7285"></i>liatannklinikk.no</div><div class="tt">Lia Tannklinikk – akutt tannlege i Drammen</div><div class="rx"><div class="rx1"><span class="open">Åpent nå</span>· til 20:00 · Bragernes torg 4</div><div class="sl"><span>Bestill time</span><span>Akutt-time</span><span>Finn oss</span></div></div></div>
        </div>
      </div>
      <span class="sd hid" style="left:410px;top:292px">Åpningstider</span>
      <span class="sd hid" style="left:430px;top:324px">Adresse</span>
      <span class="sd hid" style="left:418px;top:356px">Akutt-timer</span>
      <div class="card mp hid" style="left:404px;top:16px;width:220px;height:150px">
        <svg class="mapbg" viewBox="0 0 220 150" preserveAspectRatio="none" aria-hidden="true"><rect width="220" height="150" fill="#EDF1F3"/><path d="M-10 108 Q60 92 110 112 T230 100 V130 Q150 120 110 132 T-10 138Z" fill="#CFE2EA"/><g stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"><path d="M0 46 H220"/><path d="M70 0 V150"/><path d="M150 0 L176 150"/></g><g stroke="#fff" stroke-width="3.5" fill="none"><path d="M0 78 H220"/><path d="M110 0 V100"/><path d="M28 0 V150"/><path d="M190 0 V90"/></g><rect x="78" y="54" width="26" height="18" rx="2" fill="#DCE3D9"/><rect x="118" y="20" width="24" height="20" rx="2" fill="#E4E7EC"/></svg>
        <span class="rip"></span>
        <svg class="pin hid" viewBox="0 0 22 30" aria-hidden="true"><path d="M11 29s9-9.6 9-17A9 9 0 0 0 2 12c0 7.4 9 17 9 17z" fill="#0B7285"/><circle cx="11" cy="11.5" r="3.6" fill="#fff"/></svg>
        <div class="ml hid"><b>Lia Tannklinikk</b><small>Åpent til 20:00</small></div>
      </div>
      <div class="card ai hid" style="left:404px;top:182px;width:220px;height:242px">
        <div class="aih"><svg width="14" height="14" viewBox="0 0 14 14" fill="#2447D6" aria-hidden="true"><path d="M7 0l1.6 4.4L13 6l-4.4 1.6L7 12 5.4 7.6 1 6l4.4-1.6z"/></svg>AI-svar</div>
        <div class="ub hid">Akutt tannlege i Drammen i kveld?</div>
        <div class="an"></div>
        <span class="src hid">liatannklinikk.no ↗</span>
      </div>
    </div>`,
    run(a: Api) {
      a.show(".srch", 0, { d: 550, from: "translateY(10px) scale(.985)" });
      a.type(".qf .v", "tannlege drammen akutt", 300, 24);
      a.show(".rw", 1400, { stagger: 90 });
      a.show(".sd", 2150, { stagger: 120, from: "translateX(10px) scale(.96)" });
      a.at(2800, () => {
        const L = a.pos(a.q(".rw.lia"));
        a.qa(".sd").forEach((c, j) => {
          const p = a.pos(c);
          a.anim(c, [{ transform: "none", opacity: 1 }, { transform: `translate(${L.x + 110 + j * 64 - p.x}px,${L.y + 64 - p.y}px) scale(.7)`, opacity: 0 }], { duration: 560, delay: j * 70, fill: "forwards", easing: EIO });
        });
      });
      a.at(3150, () => a.q(".rw.lia").classList.add("rich"));
      a.at(3650, () => Object.entries({ lia: 0, a: 112, b: 184, c: 256 }).forEach(([k, top]) => (a.q(".rw." + k).style.top = top + "px")));
      a.show(".mp", 4350);
      a.at(4560, () => {
        const p = a.q(".pin"); p.classList.remove("hid");
        a.anim(p, [{ transform: "translateY(-26px)", opacity: 0 }, { transform: "translateY(2px)", opacity: 1, offset: 0.7 }, { transform: "none", opacity: 1 }], { duration: 520, fill: "backwards", easing: "cubic-bezier(.3,0,.5,1)" });
        a.anim(a.q(".rip"), [{ transform: "scale(.4)", opacity: 0.7 }, { transform: "scale(1.8)", opacity: 0 }], { duration: 700, delay: 380, fill: "forwards" });
      });
      a.show(".ml", 4900, { from: "translateY(4px)" });
      a.show(".ai", 5100);
      a.show(".ub", 5350, { from: "translateY(4px)" });
      a.type(".an", "Lia Tannklinikk på Bragernes tar akutt-timer til kl. 20 i dag. Du kan bestille direkte på nettsiden deres.", 5800, 60);
      a.show(".src", 7700, { from: "translateY(4px)" });
    },
  },

  ops: {
    dur: 6000,
    html: `<div class="sc sc-ops">
      <div class="card log hid" style="left:16px;top:16px;width:286px;height:190px">
        <div class="lh"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10.8 1.6A6.6 6.6 0 1 0 14.4 11 5.4 5.4 0 0 1 10.8 1.6z" fill="#1E2A6E"/></svg>I natt<span class="stx a">Automatisk</span><span class="stx ok hid">Alt i orden</span></div>
        <div class="lr hid"><time>03:00</time>Sikkerhetskopi tatt${TICK}</div>
        <div class="lr hid"><time>03:02</time>Oppdateringer installert${TICK}</div>
        <div class="lr hid"><time>03:04</time>Skjemaer og sider sjekket${TICK}</div>
        <div class="lr hid"><time>03:05</time>Sertifikat fornyet${TICK}</div>
      </div>
      <div class="card chat hid" style="left:16px;top:218px;width:286px;height:206px">
        <div class="chh"><i>VB</i>Vang Bakeri<small>Meldinger</small></div>
        <div class="msgs">
          <div class="bl b1 hid">Kan dere legge inn at vi har stengt 17. mai?<span class="rct hid"><svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 10.5S1 7.4 1 4.2A2.6 2.6 0 0 1 6 3a2.6 2.6 0 0 1 5 1.2c0 3.2-5 6.3-5 6.3z" fill="#E0464E"/></svg></span></div>
          <span class="tm t1 hid">08:14</span>
          <div class="slot"><div class="bl br dots hid"><i></i><i></i><i></i></div><div class="bl br b2 hid">Fikset! Det ligger ute nå.</div></div>
          <span class="tm r t2 hid">08:21 · Sett</span>
        </div>
      </div>
      <div class="bw blk hid" style="left:318px;top:16px;width:306px;height:408px">
        <div class="bar"><i></i><i></i><i></i><span class="url" style="width:130px;margin-left:-55px">vangbakeri.no</span></div>
        <div class="s3">
          <div class="ban">Stengt 17. mai. Gratulerer med dagen!</div>
          <div class="vn">Vang Bakeri<i></i></div>
          <div class="vh blk"><h4>Ferskt fra ovnen hver morgen.</h4><span>Se brødene</span>${BAKE("sv-vb")}</div>
          <div class="hrs blk"><h6>Åpningstider</h6>
            <div class="hr new"><b>17. mai</b><b>Stengt</b></div>
            <div class="hr"><span>Mandag–fredag</span><span>07–17</span></div>
            <div class="hr"><span>Lørdag</span><span>08–15</span></div>
            <div class="hr"><span>Søndag</span><span>Stengt</span></div>
          </div>
        </div>
      </div>
    </div>`,
    run(a: Api) {
      a.show(".log", 0, { d: 500, from: "translateY(10px)" });
      a.show(".bw", 120, { d: 500, from: "translateY(10px)" });
      a.show(".chat", 240, { d: 500, from: "translateY(10px)" });
      [0, 1, 2, 3].forEach((j) => a.at(450 + j * 380, () => {
        const r = a.qa(".lr")[j];
        r.classList.remove("hid");
        a.anim(r, [{ opacity: 0, transform: "translateX(-6px)" }, { opacity: 1, transform: "none" }], { duration: 350, fill: "backwards" });
        a.anim(r.querySelector(".ck circle"), [{ strokeDashoffset: 51 }, { strokeDashoffset: 0 }], { duration: 420, delay: 100, fill: "both" });
        a.anim(r.querySelector(".ck path"), [{ strokeDashoffset: 14 }, { strokeDashoffset: 0 }], { duration: 260, delay: 420, fill: "both" });
      }));
      a.at(2150, () => (a.q(".lh .a").style.opacity = "0"));
      a.show(".lh .ok", 2200, { from: "translateY(3px)" });
      a.show(".b1", 2450, { from: "translateY(6px) scale(.98)" });
      a.show(".t1", 2550, { from: "none" });
      a.show(".dots", 3050, { from: "translateY(4px)" });
      a.at(3850, () => (a.q(".dots").style.display = "none"));
      a.show(".b2", 3850, { from: "translateY(6px) scale(.98)" });
      a.at(4250, () => { a.q(".ban").classList.add("on"); a.q(".hr.new").classList.add("on"); });
      a.at(4500, () => a.anim(a.q(".hr.new"), [{ backgroundColor: "rgba(227,167,47,.45)" }, { backgroundColor: "rgba(227,167,47,.12)" }], { duration: 1400, fill: "forwards", easing: "ease-out" }));
      a.pop(".rct", 5100);
      a.show(".t2", 5150, { from: "none" });
    },
  },
};

/* where the camera looks inside each scene over time: [ms, x, y, w, h] in canvas units */
export const FOCUS: Record<SceneKey, number[][]> = {
  web: [[0, 16, 20, 448, 400], [4750, 300, 40, 330, 370], [5900, 0, 0, 640, 440]],
  portal: [[0, 165, 45, 310, 350], [3500, 0, 0, 640, 440], [4500, 166, 60, 458, 364], [5900, 330, 10, 300, 260], [6700, 0, 0, 640, 440]],
  shop: [[0, 0, 0, 640, 440], [1100, 16, 96, 420, 300], [3600, 330, 40, 294, 384], [6800, 0, 0, 640, 440]],
  seo: [[0, 16, 16, 372, 408], [4250, 396, 10, 236, 424], [7900, 0, 0, 640, 440]],
  ops: [[0, 16, 16, 286, 190], [2300, 16, 210, 286, 214], [4100, 312, 10, 318, 420], [5300, 0, 0, 640, 440]],
};
