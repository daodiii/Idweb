"""Nordlys over Bjørvika as three web layers, optimised: sky (static), aurora (animated by the page with CSS
transforms), city (static, everything that stands, the fjord and its reflections, the foreground). The ferry is an
inline layer in the page (moment.tsx).

Usage, from the repo root: python -I -X utf8 scripts/illustrations/bjorvika/build.py public/images/bjorvika
The scene itself (geometry, landmarks, palettes, three moods for mockups) is in scene.py; its layout follows real
photos of Bjørvika from Ekeberg on Wikimedia Commons, used as reference only.
"""
import math
import random
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import scene as g  # noqa: E402

OUT = Path(sys.argv[1])
SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")

M = dict(g.BASE, haze="#7FE8B8", far1="#2A3A6A", far2="#18244E", mid1="#1A2654", mid2="#0F1838", far_bld="#24305E", near_bld="#0C1434",
         water1="#1E3554", water2="#13203F", water3="#070C20", refl=".6", glow="#FFAA60")
AUR_DEFS = """<linearGradient id="aur" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7CF5B4" stop-opacity="0"/><stop offset=".15" stop-color="#7CF5B4" stop-opacity=".85"/><stop offset=".55" stop-color="#46D6A0" stop-opacity=".35"/><stop offset=".85" stop-color="#9B7CF2" stop-opacity=".22"/><stop offset="1" stop-color="#9B7CF2" stop-opacity="0"/></linearGradient>
<filter id="aurblur" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="2.5 7"/></filter>
<filter id="aurwide" x="-20%" y="-400%" width="140%" height="900%"><feGaussianBlur stdDeviation="18"/></filter>"""


def aurora():
    r = random.Random(202)
    curtains = []
    for base_y, amp, phase, height, x0, x1 in [(150, 30, 0, 120, -60, 1100), (128, 24, 2.1, 100, 380, 1680), (172, 18, 4.2, 70, 150, 1400)]:
        rays = []
        for x in range(x0, x1, 3):
            taper = min(1, (x - x0) / 220, (x1 - x) / 220)
            y = base_y + amp * math.sin(x / 210 + phase) + 9 * math.sin(x / 57 + phase * 2)
            hh = height * (0.55 + 0.45 * math.sin(x / 33 + phase) ** 2) * (0.6 + 0.4 * r.random())
            o = round(r.uniform(.35, .9) * max(0, taper), 1)
            if o > 0:
                rays.append(g.rect(x, y - hh, 2.4, hh, "url(#aur)", f' opacity="{g.f(o)}"'))
        curtains.append(f'<g filter="url(#aurblur)">{"".join(rays)}</g>')
    band = '<path d="M-40,180 C300,120 620,200 900,150 S1400,110 1660,160" stroke="#5BE3A6" stroke-width="70" fill="none" opacity=".25" filter="url(#aurwide)"/>'
    return f'<g id="aurora">{band}{"".join(curtains)}</g>'


def svg(defs, body, label=None):
    aria = f' role="img" aria-label="{label}"' if label else ' aria-hidden="true"'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {g.W} {g.H}" preserveAspectRatio="xMidYMid slice"{aria}>'
            f"<defs>{defs}</defs>{body}</svg>")


# ---------- optimiser: merge runs of plain rects and small circles into one path per paint ----------
PLAIN_RECT = {"x", "y", "width", "height", "fill", "opacity"}
PLAIN_CIRCLE = {"cx", "cy", "r", "fill", "opacity"}


def n(v):
    return f"{float(v):.1f}".rstrip("0").rstrip(".")


def mergeable(el):
    tag = el.tag.split("}")[-1]
    fill = el.get("fill", "")
    if fill.startswith("url(") or not fill:
        return None
    keys = set(el.attrib)
    if tag == "rect" and keys <= PLAIN_RECT and {"width", "height"} <= keys:
        return "rect"
    if tag == "circle" and keys <= PLAIN_CIRCLE and float(el.get("r")) <= 2.6:
        return "circle"
    return None


def seg(el, kind):
    if kind == "rect":
        x, y, w, h = (float(el.get(k, "0")) for k in ("x", "y", "width", "height"))
        if w >= 3 and h >= 3:  # big enough that whole units are invisible at any width the band is shown
            x, y, w, h = round(x), round(y), round(w), round(h)
        return f"M{n(x)} {n(y)}h{n(w)}v{n(h)}h{n(-w)}z"
    cx, cy, r = (float(el.get(k)) for k in ("cx", "cy", "r"))
    if r <= 1.3:  # tiny lights: a zero-length segment drawn with a round cap of the right width
        return f"M{n(cx)} {n(cy)}h0"
    return f"M{n(cx - r)} {n(cy)}a{n(r)} {n(r)} 0 1 0 {n(2 * r)} 0a{n(r)} {n(r)} 0 1 0 {n(-2 * r)} 0z"


def optimise(el):
    kids = list(el)
    out, run = [], []

    def bbox(k, kind):
        if kind == "rect":
            x, y, w, h = (float(k.get(a, "0")) for a in ("x", "y", "width", "height"))
            return (x, y, x + w, y + h)
        cx, cy, r = (float(k.get(a)) for a in ("cx", "cy", "r"))
        return (cx - r, cy - r, cx + r, cy + r)

    def hit(a, b):
        return a[0] < b[2] and b[0] < a[2] and a[1] < b[3] and b[1] < a[3]

    def flush():
        # paint order matters (a window must stay above its building), so a shape may only join an earlier group of the
        # same paint if nothing painted after that group overlaps it
        groups = []  # [key, segs, boxes, union]
        for k, kind in run:
            op = k.get("opacity")
            dot = kind == "circle" and float(k.get("r")) <= 1.3
            size = round(float(k.get("r")) * 2 * 4) / 4 if dot else None  # dots grouped by quarter-unit size
            key = (k.get("fill"), None if op is None else round(float(op) * 6) / 6, size)
            bb = bbox(k, kind)
            target = None
            for i in range(len(groups) - 1, -1, -1):
                gkey, _, boxes, union = groups[i]
                if gkey == key:
                    target = groups[i]
                    break
                if hit(bb, union) and any(hit(bb, b2) for b2 in boxes):
                    break
            if target is None:
                target = [key, [], [], list(bb)]
                groups.append(target)
            target[1].append(seg(k, kind))
            target[2].append(bb)
            u = target[3]
            target[3] = [min(u[0], bb[0]), min(u[1], bb[1]), max(u[2], bb[2]), max(u[3], bb[3])]
        for (fill, op, size), segs, _, _ in groups:
            if size:
                p = ET.Element(f"{{{SVG_NS}}}path", {"d": "".join(segs), "stroke": fill, "stroke-width": n(size), "stroke-linecap": "round", "fill": "none"})
            else:
                p = ET.Element(f"{{{SVG_NS}}}path", {"d": "".join(segs), "fill": fill})
            if op is not None and op < .999:
                p.set("opacity", n(op) if op >= .1 else "0.1")
            out.append(p)
        run.clear()

    for k in kids:
        kind = mergeable(k)
        if kind:
            run.append((k, kind))
            continue
        flush()
        optimise(k)
        out.append(k)
    flush()
    for k in kids:
        el.remove(k)
    el.extend(out)


def finish(name, s):
    root = ET.fromstring(s)
    optimise(root)
    text = ET.tostring(root, encoding="unicode")
    text = re.sub(r"\s+/>", "/>", text)
    path = OUT / name
    tmp = path.with_suffix(".svg.tmp")
    tmp.write_text(text, encoding="utf-8")
    tmp.replace(path)
    print(name, len(s) // 1024, "KB ->", len(text) // 1024, "KB")


# sky: gradient, stars, moon
r = random.Random(202)
sky_defs = '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030817"/><stop offset=".3" stop-color="#0A1633"/><stop offset=".45" stop-color="#16284D"/></linearGradient>'
# the moon sits top left: the page sets its heading top right, in the open sky above Barcode
sky_body = g.rect(0, 0, g.W, g.H, "url(#sky)") + g.stars(170, 230, r) + '<path d="M132,52 a18,18 0 1,0 22,26 a14,14 0 1,1 -22,-26 Z" fill="#FBEFD7" opacity=".9"/>'
finish("nordlys-himmel.svg", svg(sky_defs, sky_body))

# aurora, alone on a transparent layer
AUR = aurora()
finish("nordlys-lys.svg", svg(AUR_DEFS, AUR))

# city: everything that stands, the fjord with reflections (the aurora's included), the foreground, the grain
defs = g.defs_common(M) + AUR_DEFS + f'<linearGradient id="fore" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{M["fore1"]}"/><stop offset="1" stop-color="{M["fore2"]}"/></linearGradient>'
defs += f'<g id="town">{g.town(M)}</g>' + AUR
refl_aurora = f'<g mask="url(#reflmask)" opacity=".35"><g filter="url(#ripple)"><use href="#aurora" transform="translate(0 {2 * g.WL}) scale(1 -1)"/></g></g>'
body = '<use href="#town"/>' + g.water(M, ferry=False) + refl_aurora + g.foreground(M) + g.rect(0, 190, g.W, g.H - 190, "#888", ' filter="url(#grain)" style="mix-blend-mode:overlay"')
finish("nordlys-by.svg", svg(defs, body, "Bjørvika sett fra Ekeberg under nordlyset: Operaen, Munch, Posthuset, Oslo Plaza, Barcode og Sørenga"))
