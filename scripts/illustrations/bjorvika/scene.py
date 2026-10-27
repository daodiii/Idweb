"""Bjørvika from Ekeberg: one detailed scene, three moods (blåtime, nordlys, vinterkveld). The site uses nordlys,
split into layers by build.py; running this file directly writes the three single-file mockups.

Looking north-west from Ekeberg. Left to right: Akershus small on its point, the Opera's marble roof sloping into the
water, Deichman behind it, the Munch tower bowing out over the fjord, Posthuset's two green towers, Oslo Plaza (the
tallest), Barcode with a facade of its own per building, Sørenga's housing blocks along the quay, and the two concrete
ventilation towers by Ekeberg's road. Heights follow the real ones (Plaza 117 m, Posthuset 111 m, Barcode 50-80 m,
Munch 60 m). Behind: the city as a carpet of lights up the hills, Holmenkollen lit on the ridge. Ekeberg's trees frame
the foreground, with two people on a bench under a lamp. The fjord mirrors it all through a ripple filter.
"""
import math
import random
import sys
from pathlib import Path

W, H, WL = 1600, 560, 400
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def poly(pts):
    return "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts) + " Z"


def smooth(pts, close_to=None):
    d = f"M{f(pts[0][0])},{f(pts[0][1])}"
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i else pts[i]
        p1, p2 = pts[i], pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}"
    if close_to is not None:
        d += f" L{f(pts[-1][0])},{close_to} L{f(pts[0][0])},{close_to} Z"
    return d


def mix(a, b, t):
    a, b = [int(a[i:i + 2], 16) for i in (1, 3, 5)], [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(x + (y - x) * max(0, min(1, t))):02X}" for x, y in zip(a, b))


def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{fill}"{extra}/>'


# ---------- terrain ----------
def ridge_far(x):
    return 206 - 18 * math.exp(-((x - 560) / 200) ** 2) + 7 * math.sin(x / 210 + .4) + 4 * math.sin(x / 83 + 1.3) + 8 * x / W


def ridge_mid(x):
    return 252 + 8 * math.sin(x / 170 + 2) + 5 * math.sin(x / 61) - 8 * math.exp(-((x - 1380) / 200) ** 2)


def bygdoy(x):
    return WL - 22 * math.exp(-((x - 60) / 120) ** 2) - 4


def crowns(fn, x0, x1, rng, size=2.2, step=4.5):
    """A forested skyline: overlapping small crowns riding on fn."""
    pts = []
    x = x0
    while x <= x1:
        pts.append((x, fn(x) - size * (0.4 + 0.6 * abs(math.sin(x * 0.7 + rng.random()))) ))
        x += step * rng.uniform(.7, 1.3)
    return pts


TREE_RNG = random.Random(3)
FAR = crowns(ridge_far, -20, W + 20, TREE_RNG, 2.6)
MID = crowns(ridge_mid, -20, W + 20, TREE_RNG, 2.0)
BYG = crowns(bygdoy, -20, 400, TREE_RNG, 2.4)

# ---------- the city behind Bjørvika ----------
R = random.Random(7)
carpet, lights = [], []
for y in range(256, WL - 4, 4):
    depth = (y - 250) / (WL - 250)
    s = .42 + 1.0 * depth
    x = -10 + R.uniform(0, 8)
    while x < W + 10:
        w, h = R.uniform(6, 15) * s, R.uniform(3, 10) * s
        if y - h > ridge_mid(x) + 3:
            carpet.append((x, y, w, h, depth))
            for _ in range(int(R.random() * 3.2 * s + (.6 if R.random() < .55 else 0))):
                lights.append((x + R.uniform(.5, max(.6, w - .5)), y - R.uniform(.5, h), R.uniform(.5, 1.1) * s, R.random(), R.uniform(.45, 1), depth))
        x += w + R.uniform(0, 5) * s
for _ in range(16):  # streets climbing the hills
    x0, y0, ang = R.uniform(0, 1580), R.uniform(280, 380), R.uniform(-.6, .6)
    for k in range(R.randint(12, 30)):
        xx, yy = x0 + k * 6 * math.cos(ang), y0 - k * 6 * math.sin(ang) * .3 - k * .9
        if ridge_mid(xx) + 4 < yy < WL - 4:
            d = (yy - 250) / (WL - 250)
            lights.append((xx, yy, .9 * (.45 + d), .97, .95, d))

# ---------- landmarks ----------
HX = 560
HY = ridge_far(HX) - 3
RAMP_END = ridge_far(HX + 58) + 1


def win_grid(r, x0, y0, w, h, dx, dy, p, m, ww=2.2, wh=2.0):
    out = []
    for cy in range(int(y0 + 3), int(y0 + h - 2), dy):
        for cx in range(int(x0 + 2), int(x0 + w - 2), dx):
            if r.random() < p:
                out.append(rect(cx, cy, ww, wh, m["win"], f' opacity="{f(r.uniform(.4, 1))}"'))
    return "".join(out)


def landmarks(m):
    """Bjørvika as seen from Ekeberg, left to right, with heights in proportion (Plaza 117 m, Posthuset 111 m,
    Barcode 50-80 m, Munch 60 m, the Opera's stage tower about 50 m)."""
    r = random.Random(17)
    o = []
    # Akershus, small and far on its point beyond the Opera
    o.append(f'<path d="{smooth([(-20, WL), (10, WL - 8), (60, WL - 13), (110, WL - 8), (140, WL)], WL)}" fill="{m["hill"]}"/>')
    o.append(f'<path d="{poly([(12, WL - 12), (14, WL - 24), (96, WL - 24), (98, WL - 12)])}" fill="url(#flood)"/>')
    for x0, w, h, rh in [(24, 11, 18, 13), (62, 13, 25, 18)]:
        o.append(rect(x0, WL - 24 - h, w, h, "url(#flood)"))
        o.append(f'<path d="{poly([(x0 - 1.5, WL - 24 - h), (x0 + w / 2, WL - 24 - h - rh), (x0 + w + 1.5, WL - 24 - h)])}" fill="{m["copper"]}"/>')
    # Deichman, the library behind the Opera: a glass box whose top floor cantilevers out
    o.append(rect(512, WL - 70, 116, 62, m["bld2"]))
    o.append(f'<path d="{poly([(498, WL - 70), (498, WL - 96), (622, WL - 100), (622, WL - 70)])}" fill="{m["bld1"]}"/>')
    for k, yy in enumerate(range(WL - 94, WL - 10, 7)):
        o.append(rect(500 if yy < WL - 70 else 514, yy, 120 if yy < WL - 70 else 112, 2.2, m["win"], f' opacity="{f(.25 + .5 * r.random())}"'))
    # the Opera: marble roof sloping into the water, the stage tower, the glass foyer and its oak wall
    o.append(f'<path d="{poly([(150, WL + 3), (362, WL - 62), (442, WL - 67), (512, WL - 40), (524, WL + 3)])}" fill="url(#marble)"/>')
    o.append(f'<path d="{poly([(196, WL + 2), (362, WL - 50), (392, WL - 53), (250, WL + 2)])}" fill="#FFFFFF" opacity=".3"/>')
    for x0 in range(170, 360, 16):
        o.append(f'<path d="M{x0},{WL + 2} L{x0 + 96},{WL - 52}" stroke="{m["seam"]}" stroke-width=".6"/>')
    o.append(f'<path d="{poly([(392, WL - 64), (396, WL - 116), (476, WL - 116), (474, WL - 66)])}" fill="url(#diamond)"/>')
    o.append(rect(392, WL - 118, 86, 3, m["marble1"]))
    o.append(f'<path d="{poly([(444, WL - 60), (510, WL - 38), (510, WL - 1), (444, WL - 1)])}" fill="url(#foyer)" filter="url(#bloom)"/>')
    o.append(f'<path d="M448,{WL - 2} C466,{WL - 28} 484,{WL - 10} 506,{WL - 26}" stroke="#C9772F" stroke-width="4" fill="none"/>')
    for gx in range(450, 510, 7):
        o.append(f'<path d="M{gx},{WL - 1} L{gx},{f(WL - 60 + (gx - 444) * 22 / 66)}" stroke="#FFF1D8" stroke-width=".45" opacity=".55"/>')
    o.append(f'<path d="M150,{WL + 3} L362,{WL - 62} L442,{WL - 67} L512,{WL - 40}" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity=".85"/>')
    for px in [236, 262, 284, 300, 330, 452, 470]:
        py = WL + 3 - (px - 150) * 65 / 212 if px < 362 else WL - 67 + max(0, px - 442) * 27 / 70
        o.append(rect(px, py - 3.4, 1.1, 3.4, m["people"]))
    # Posthuset: two green glass slabs set back behind the station
    for x0, w, top in [(736, 44, 108), (781, 46, 96)]:
        o.append(rect(x0, top, w, WL - 10 - top, "url(#green)"))
        o.append(rect(x0 + w - 4, top, 4, WL - 10 - top, "#000", ' opacity=".22"'))
        for xx in range(x0 + 3, x0 + w - 3, 4):
            o.append(rect(xx, top + 2, .6, WL - 14 - top, m["edge"], ' opacity=".18"'))
        o.append(win_grid(r, x0, top, w - 4, WL - 12 - top, 4, 6, .28, m, 2.2, 2.4))
    # Oslo Plaza: dark glass, vertical ribs, the lit crown
    o.append(rect(846, 92, 70, WL - 104, m["bld3"]))
    o.append(rect(846, 92, 70, WL - 104, "url(#glass)", ' opacity=".5"'))
    for xx in range(849, 914, 5):
        o.append(rect(xx, 100, .7, WL - 116, m["edge"], ' opacity=".3"'))
    o.append(rect(846, 86, 70, 8, m["crown"], ' filter="url(#bloom)"'))
    for x0, top in [(736, 108), (781, 96), (846, 92)]:
        o.append(rect(x0, top, 1.6, WL - 12 - top, "url(#rim)"))
    o.append(win_grid(r, 846, 100, 68, WL - 120, 5, 5, .42, m, 2.6, 2.2))
    # Barcode, each building its own facade
    bars = [(930, 40, 228, "dark"), (972, 30, 200, "glass"), (1004, 46, 236, "pattern"), (1052, 34, 192, "darkgrid"),
            (1088, 46, 226, "white"), (1136, 42, 214, "stepped"), (1180, 56, 244, "terrace")]
    for x0, w, top, kind in bars:
        base = WL - 18
        if kind == "pattern":  # white facade cut with triangular windows
            o.append(rect(x0, top, w, base - top, m["white"]))
            for _ in range(int(w * (base - top) / 28)):
                tx, ty, s = r.uniform(x0 + 1, x0 + w - 6), r.uniform(top + 2, base - 6), r.uniform(3, 5.5)
                lit = r.random() < .45
                o.append(f'<path d="{poly([(tx, ty + s), (tx + s * .6, ty), (tx + s * 1.1, ty + s)])}" fill="{m["win"] if lit else m["bld3"]}" opacity="{f(.9 if lit else .8)}"/>')
        elif kind == "stepped":  # DNB: stacked blocks shifted left and right
            n = 7
            bh = (base - top) / n
            for k in range(n):
                off = 4 if k % 2 else -4
                o.append(rect(x0 + off, top + k * bh, w, bh + .5, m["white"] if k % 2 else m["grey"]))
                o.append(win_grid(r, x0 + off, top + k * bh, w, bh, 4, 5, .5, m, 2.2, 1.8))
        elif kind == "terrace":  # orange-clad terraces stepping down to the right
            steps = 6
            for k in range(steps):
                yy = top + k * (base - top) / steps
                ww = w - (steps - 1 - k) * 6
                o.append(rect(x0, yy, ww, (base - top) / steps + .5, m["white"]))
                o.append(rect(x0 + ww - 10, yy, 10, 3, m["orange"]))
                o.append(win_grid(r, x0, yy, ww - 10, (base - top) / steps, 4, 5, .55, m, 2.2, 1.8))
        else:
            fill = {"dark": m["bld1"], "glass": m["bld3"], "darkgrid": m["bld2"], "white": m["white"]}[kind]
            o.append(rect(x0, top, w, base - top, fill))
            o.append(rect(x0 + w - 4, top, 4, base - top, "#000", ' opacity=".2"'))
            if kind == "glass":
                o.append(rect(x0, top, w - 4, base - top, "url(#glass)", ' opacity=".55"'))
            if kind == "dark":
                for yy in range(top + 3, base - 2, 4):
                    o.append(rect(x0 + 1, yy, w - 6, 1.2, m["win"] if r.random() < .5 else m["dim"], f' opacity="{f(r.uniform(.3, .9))}"'))
            else:
                o.append(win_grid(r, x0, top, w - 4, base - top, 4 if kind != "white" else 5, 5, .45, m, 2.4, 2))
        o.append(rect(x0, top, w, 1.5, m["edge"], ' opacity=".6"'))
    # Munch: grey ribbed glass, the top third bowing out over the fjord, the lit top floor
    o.append(f'<path d="{poly([(610, WL), (610, WL - 122), (720, WL - 122), (720, WL)])}" fill="url(#alu)"/>')
    o.append(f'<path d="{poly([(610, WL - 122), (586, WL - 176), (698, WL - 182), (720, WL - 122)])}" fill="url(#alu)"/>')
    o.append(f'<path d="{poly([(698, WL - 182), (720, WL - 122), (720, WL - 116), (706, WL - 160)])}" fill="#000" opacity=".25"/>')
    for yy in range(WL - 118, WL - 2, 5):
        o.append(rect(611, yy, 108, .8, m["edge"], ' opacity=".22"'))
    for k in range(10):
        t = k / 10
        y1 = WL - 124 - t * 52
        o.append(f'<path d="M{f(610 - 24 * t)},{f(y1)} L{f(720 - 22 * t)},{f(y1 - 6 * t)}" stroke="{m["edge"]}" stroke-width=".8" opacity=".22"/>')
    for xx in range(614, 718, 4):
        o.append(rect(xx, WL - 120, .6, 118, m["edge"], ' opacity=".14"'))
    o.append(f'<path d="{poly([(588, WL - 172), (697, WL - 178), (699, WL - 171), (591, WL - 166)])}" fill="#FFD29A" filter="url(#bloom)"/>')
    o.append(win_grid(r, 612, WL - 118, 104, 114, 6, 5, .2, m, 2, 1.6))
    # Sørenga: brick and white housing blocks at the water, balconies lit
    def block(x0, w, hh, col, back=False):
        out = [rect(x0, WL - hh, w, hh, mix(col, m["bld3"], .35) if back else col),
               rect(x0 + w - 3, WL - hh, 3, hh, "#000", ' opacity=".22"'), rect(x0, WL - hh, 1.2, hh, m["edge"], ' opacity=".18"')]
        if r.random() < .45:  # a setback top floor
            out.append(rect(x0 + 5, WL - hh - 7, w - 12, 7, col))
            out.append(rect(x0 + 7, WL - hh - 5, w - 16, 2, m["win"], ' opacity=".6"'))
        for cy in range(WL - hh + 4, WL - 3, 6):
            for cx in range(int(x0 + 3), int(x0 + w - 4), 5):
                if r.random() < (.38 if back else .55):
                    out.append(rect(cx, cy, 3, 2.4, m["win"], f' opacity="{f(r.uniform(.4, 1))}"'))
            out.append(rect(x0 + 1, cy + 3.1, w - 4, .6, m["edge"], ' opacity=".22"'))
        return "".join(out)
    x0 = 744  # the back row, taller, partly hidden
    while x0 < 1262:
        w = r.choice([30, 38, 44, 50, 58])
        o.append(block(x0, w, r.randint(70, 104), r.choice([m["sbrick"], m["swhite"], m["sbrick"]]), back=True))
        x0 += w + r.randint(2, 18)
    x0 = 760  # the front row along the quay, lower
    while x0 < 1250:
        w = r.choice([26, 34, 40, 48])
        o.append(block(x0, w, r.randint(34, 60), r.choice([m["sbrick"], m["swhite"]])))
        x0 += w + r.randint(10, 34)
    o.append(rect(742, WL - 2, 520, 2.2, m["quay"]))
    o.append('<g filter="url(#bloom)">' + "".join(f'<circle cx="{x}" cy="{WL - 1}" r="1.1" fill="{m["lamp"]}"/>' for x in range(746, 1262, 14)) + "</g>")
    return "".join(o)


def holmenkollen(m):
    ramp = f"M{HX},{f(HY - 38)} C{HX + 22},{f(HY - 30)} {HX + 38},{f(RAMP_END - 18)} {HX + 58},{f(RAMP_END)}"
    o = [f'<path d="{ramp}" stroke="{m["kollen"]}" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#bigglow)" opacity=".6"/>',
         f'<path d="{ramp}" stroke="{m["kollen"]}" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
         f'<path d="{poly([(HX - 3, HY - 41), (HX + 3, HY - 41), (HX + 4.5, HY + 2), (HX - 4.5, HY + 2)])}" fill="{m["kollen"]}"/>',
         f'<circle cx="{HX}" cy="{f(HY - 45)}" r="1.9" fill="#FF5A48" filter="url(#bloom)"/>']
    for k in range(18):  # the road of lights up to the jump
        t = k / 17
        x = HX + 60 - 70 * t + 8 * math.sin(t * 9)
        y = ridge_mid(x) - 2 - (ridge_mid(x) - ridge_far(x) - 4) * t
        o.append(f'<circle cx="{f(x)}" cy="{f(y)}" r=".9" fill="{m["lamp"]}" filter="url(#bloom)"/>')
    return "".join(o)


def town(m, snow=False):
    """Everything that stands on the land and is mirrored in the fjord."""
    o = [f'<path d="{smooth(FAR, WL)}" fill="url(#far)"/>', f'<rect y="150" width="{W}" height="120" fill="url(#haze)"/>', holmenkollen(m),
         f'<path d="{smooth(MID, WL)}" fill="url(#mid)"/>', f'<rect y="236" width="{W}" height="50" fill="url(#haze2)"/>']
    o.append("".join(rect(x, y - h, w, h + .6, mix(m["far_bld"], m["near_bld"], round(d * 10) / 10)) for x, y, w, h, d in carpet))
    if snow:
        o.append("".join(rect(x, y - h - .4, w, .9 * (.5 + d), "#E8EEFA", f' opacity="{f(.35 + .5 * d)}"') for x, y, w, h, d in carpet if (x * 7.3) % 1 < .7))
    o.append('<g filter="url(#cityglow)" opacity=".55">' + "".join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r * 2.2)}" fill="{m["glow"]}"/>' for x, y, r, t, op, d in lights[::3]) + "</g>")
    o.append('<g filter="url(#bloom)">' + "".join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{m["win"] if t > .2 else m["cool"]}" opacity="{f(op * (.5 + .5 * d))}"/>' for x, y, r, t, op, d in lights) + "</g>")
    o.append(landmarks(m))
    if snow:
        o.append(f'<path d="M150,{WL + 3} L362,{WL - 62} L442,{WL - 67} L512,{WL - 40}" stroke="#FFFFFF" stroke-width="2" fill="none"/>')
    return "".join(o)


def defs_common(m):
    return f"""
<linearGradient id="far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["far1"]}"/><stop offset="1" stop-color="{m["far2"]}"/></linearGradient>
<linearGradient id="mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["mid1"]}"/><stop offset="1" stop-color="{m["mid2"]}"/></linearGradient>
<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["haze"]}" stop-opacity="0"/><stop offset=".55" stop-color="{m["haze"]}" stop-opacity=".28"/><stop offset="1" stop-color="{m["haze"]}" stop-opacity="0"/></linearGradient>
<linearGradient id="haze2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["haze"]}" stop-opacity="0"/><stop offset=".5" stop-color="{m["haze"]}" stop-opacity=".14"/><stop offset="1" stop-color="{m["haze"]}" stop-opacity="0"/></linearGradient>
<linearGradient id="flood" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F3C98E"/><stop offset=".6" stop-color="#9C8C8E"/><stop offset="1" stop-color="{m["bld2"]}"/></linearGradient>
<linearGradient id="brick" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{m["brick1"]}"/><stop offset="1" stop-color="{m["brick2"]}"/></linearGradient>
<linearGradient id="alu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{m["alu1"]}"/><stop offset="1" stop-color="{m["alu2"]}"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9FB4EA" stop-opacity=".55"/><stop offset=".5" stop-color="#9FB4EA" stop-opacity="0"/><stop offset="1" stop-color="#9FB4EA" stop-opacity=".25"/></linearGradient>
<linearGradient id="marble" x1="0" y1="1" x2=".6" y2="0"><stop offset="0" stop-color="{m["marble2"]}"/><stop offset="1" stop-color="{m["marble1"]}"/></linearGradient>
<linearGradient id="foyer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE2AE"/><stop offset="1" stop-color="#F0A35A"/></linearGradient>
<linearGradient id="green" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{m["green1"]}"/><stop offset="1" stop-color="{m["green2"]}"/></linearGradient>
<linearGradient id="concrete" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#B98C6A"/><stop offset=".25" stop-color="{m["conc"]}"/><stop offset="1" stop-color="{m["conc2"]}"/></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9D6E4" stop-opacity=".8"/><stop offset="1" stop-color="#E9D6E4" stop-opacity="0"/></linearGradient>
<radialGradient id="halo"><stop offset="0" stop-color="#FFE2A8" stop-opacity=".9"/><stop offset="1" stop-color="#FFE2A8" stop-opacity="0"/></radialGradient>
<radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".75"/><stop offset=".35" stop-color="#FFC27A" stop-opacity=".25"/><stop offset="1" stop-color="#FFC27A" stop-opacity="0"/></radialGradient>
<pattern id="diamond" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="{m["marble2"]}"/><path d="M0,2 L2,0 L4,2 L2,4 Z" fill="{m["marble1"]}" opacity=".55"/></pattern>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["water1"]}"/><stop offset=".4" stop-color="{m["water2"]}"/><stop offset="1" stop-color="{m["water3"]}"/></linearGradient>
<linearGradient id="fade" x1="0" y1="{WL}" x2="0" y2="{H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="reflmask"><rect y="{WL}" width="{W}" height="{H - WL}" fill="url(#fade)"/></mask>
<filter id="ripple" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="turbulence" baseFrequency=".004 .11" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation=".6 1.2"/></filter>
<filter id="bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="bigglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="cityglow" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="trail" x="-5%" y="-300%" width="110%" height="700%"><feGaussianBlur stdDeviation=".8 .4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="cloudblur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="7 4"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .09"/></feComponentTransfer></filter>
"""


def water(m, ferry=True):
    r = random.Random(9)
    o = [rect(0, WL, W, H - WL, "url(#water)")]
    o.append(f'<g mask="url(#reflmask)" opacity="{m["refl"]}"><g filter="url(#ripple)"><use href="#town" transform="translate(0 {2 * WL}) scale(1 -1)"/></g></g>')
    o.append("".join(rect(r.uniform(-40, W), r.uniform(WL + 3, H - 30), r.uniform(18, 110), .8, m["shine"], f' opacity="{f(r.uniform(.08, .3))}"') for _ in range(130)))
    # the Nesodden ferry leaving, a sailboat, a small boat by Sørenga
    fx, fy = 470, WL + 34
    if not ferry:
        fx = -9999  # drawn as its own animated layer instead
    o.append(f'<path d="M{fx + 66},{fy + 6} L{fx + 230},{fy + 26} M{fx + 66},{fy + 6} L{fx + 220},{fy - 6}" stroke="{m["shine"]}" stroke-width="1" opacity=".35"/>')
    o.append(f'<g transform="translate({fx} {fy}) scale(1.3)"><path d="M0,0 L70,0 L64,8 L6,8 Z" fill="{m["hull"]}"/><rect x="10" y="-8" width="46" height="8" fill="{m["deck"]}"/><rect x="18" y="-14" width="28" height="6" fill="{m["deck"]}"/>'
             + '<g filter="url(#bloom)">' + "".join(rect(12 + i * 5, -6, 2.6, 2.2, m["win"]) for i in range(9)) + "".join(rect(20 + i * 5, -12.5, 2.4, 2, m["win"]) for i in range(5))
             + f'<circle cx="32" cy="-17" r="1.1" fill="#fff"/><circle cx="68" cy="2" r="1" fill="#57E08A"/></g></g>')
    o.append(f'<g transform="translate(700 {WL + 76}) scale(1.3)"><path d="M0,0 L26,0 L22,5 L4,5 Z" fill="{m["hull"]}"/><path d="M12,-1 L12,-34" stroke="{m["shine"]}" stroke-width=".8"/><path d="M13,-32 L24,-3 L13,-3 Z" fill="{m["sail"]}"/><circle cx="12" cy="-35" r="1" fill="#FFF3D6" filter="url(#bloom)"/></g>')
    o.append(f'<g transform="translate(1000 {WL + 28})"><path d="M0,0 L16,0 L13,4 L2,4 Z" fill="{m["hull"]}"/><circle cx="3" cy="-1" r=".9" fill="#FF5A48" filter="url(#bloom)"/><path d="M16,2 L70,7" stroke="{m["shine"]}" stroke-width=".7" opacity=".4"/></g>')
    return "".join(o)


def pine(x, y, h, rng, fill, snow=None):
    w = h * rng.uniform(.34, .42)
    tiers = rng.randint(5, 7)
    left, right = [], []
    for k in range(1, tiers + 1):
        ty = y - h + h * k / tiers
        tw = w * (k / tiers) ** .9 * rng.uniform(.85, 1.1)
        right += [(x + tw * .5, ty), (x + tw * .18, ty - h / tiers * .25)]
        left += [(x - tw * .18, ty - h / tiers * .25), (x - tw * .5, ty)]
    pts = [(x, y - h)] + right + [(x + 1.3, y), (x - 1.3, y)] + left[::-1]
    out = f'<path d="{poly(pts)}" fill="{fill}"/>'
    if snow:
        for k in range(1, tiers + 1):
            ty = y - h + h * k / tiers
            tw = w * (k / tiers) ** .9
            out += f'<path d="M{f(x - tw * .45)},{f(ty - .6)} Q{f(x)},{f(ty - h / tiers * .55)} {f(x + tw * .45)},{f(ty - .6)}" stroke="{snow}" stroke-width="{f(1.2 + k * .25)}" fill="none" stroke-linecap="round" opacity=".9"/>'
    return out


def round_tree(x, y, h, fill):
    rr = h * .3
    return (rect(x - .9, y - h * .45, 1.8, h * .45, fill)
            + "".join(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(rad)}" fill="{fill}"/>' for cx, cy, rad in
                      [(x, y - h * .66, rr), (x - rr * .75, y - h * .5, rr * .8), (x + rr * .8, y - h * .52, rr * .85), (x + rr * .2, y - h * .85, rr * .7)]))


def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return tuple(u ** 3 * a + 3 * u * u * t * b + 3 * u * t * t * c + t ** 3 * d for a, b, c, d in zip(p0, p1, p2, p3))


def foreground(m, snow=False):
    r = random.Random(13)
    L = ((-10, 418), (180, 422), (360, 444), (520, 482))
    Rr = ((1610, 436), (1500, 452), (1390, 476), (1280, 516))
    o = []
    # a back row of rounded trees, then the slope, then the front pines
    for i in range(30):
        x, y = bez(*L, (i + r.random()) / 30)
        o.append(round_tree(x, y + 2, r.uniform(26, 46), m["tree_back"]))
    for i in range(14):
        x, y = bez(*Rr, (i + r.random()) / 14)
        o.append(round_tree(x, y + 2, r.uniform(24, 40), m["tree_back"]))
    o.append(f'<path d="M-10,418 C180,422 360,444 520,482 C640,508 760,540 880,570 L-10,570 Z" fill="url(#fore)"/>')
    o.append(f'<path d="M1610,436 C1500,452 1390,476 1280,516 C1220,538 1180,560 1160,570 L1610,570 Z" fill="url(#fore)"/>')
    if snow:
        o.append(f'<path d="M-10,418 C180,422 360,444 520,482 C640,508 760,540 880,570" stroke="#E7EDFA" stroke-width="3" fill="none" opacity=".8"/>')
    # the path and the lamp pooling light on it, the bench and two people looking out
    o.append(f'<path d="M40,520 C140,486 230,462 330,452" stroke="{m["path"]}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".55"/>')
    lx, ly = 300, 452
    o.append(f'<ellipse cx="{lx}" cy="{ly + 4}" rx="70" ry="16" fill="url(#lamp)"/><circle cx="{lx}" cy="{ly - 36}" r="34" fill="url(#lamp)" opacity=".7"/>')
    o.append(f'<path d="M{lx},{ly} L{lx},{ly - 34} M{lx - 4},{ly - 34} L{lx + 4},{ly - 34}" stroke="{m["silh"]}" stroke-width="1.6"/><path d="M{lx - 3.5},{ly - 34} L{lx + 3.5},{ly - 34} L{lx + 2.4},{ly - 39} L{lx - 2.4},{ly - 39} Z" fill="#FFE3AE" filter="url(#bloom)"/>')
    bx, by = 214, 462
    o.append(f'<g transform="translate({bx} {by}) scale(1.6) translate({-bx} {-by})">')
    o.append(f'<path d="M{bx},{by} L{bx + 34},{by - 4} M{bx + 2},{by} L{bx + 2},{by + 6} M{bx + 32},{by - 4} L{bx + 32},{by + 3} M{bx + 1},{by - 6} L{bx + 33},{by - 10}" stroke="{m["silh"]}" stroke-width="1.6" stroke-linecap="round"/>')
    for px, lean in [(bx + 11, -1), (bx + 21, 1)]:
        o.append(f'<circle cx="{px + lean * .6}" cy="{by - 13}" r="2.6" fill="{m["silh"]}"/><path d="M{px - 3},{by - 1} C{px - 3.5},{by - 8} {px - 2},{by - 10.5} {px},{by - 10.5} C{px + 2},{by - 10.5} {px + 3.5},{by - 8} {px + 3},{by - 1} Z" fill="{m["silh"]}"/>')
    o.append(f'<path d="M{bx + 24},{by - 8} L{bx + 31},{by - 15}" stroke="{m["silh"]}" stroke-width="1.3" stroke-linecap="round"/>')  # one points at the city
    if snow:
        o.append(f'<path d="M{bx + 1},{by - 7} L{bx + 33},{by - 11}" stroke="#E7EDFA" stroke-width="1.2" stroke-linecap="round"/>')
    o.append("</g>")
    # Ekeberg's road curving below on the right, sodium lamps and light trails, and the two concrete ventilation towers
    road = "M1150,572 C1260,520 1400,486 1620,468"
    o.append(f'<path d="{road}" stroke="{m["road"]}" stroke-width="16" fill="none" opacity=".9"/>')
    o.append(f'<path d="{road}" stroke="#FFB15C" stroke-width="22" fill="none" opacity=".18" filter="url(#bigglow)"/>')
    o.append(f'<g filter="url(#trail)"><path d="{road}" stroke="#FF5A4A" stroke-width="1.2" stroke-dasharray="50 20 90 40" transform="translate(0 -3)" opacity=".9"/><path d="{road}" stroke="#FFF1CF" stroke-width="1.2" stroke-dasharray="80 30 40 50" transform="translate(0 3)" opacity=".9"/></g>')
    for i in range(9):
        lx, ly = bez((1150, 572), (1260, 520), (1400, 486), (1620, 468), (i + .5) / 9)
        o.append(f'<path d="M{f(lx)},{f(ly - 8)} L{f(lx)},{f(ly - 30)}" stroke="{m["silh"]}" stroke-width="1.2"/><circle cx="{f(lx)}" cy="{f(ly - 31)}" r="1.8" fill="#FFC27A" filter="url(#bloom)"/><circle cx="{f(lx)}" cy="{f(ly - 20)}" r="16" fill="url(#lamp)" opacity=".55"/>')
    for vx, top in [(1446, 300), (1480, 292)]:
        base = 470
        o.append(rect(vx, top, 28, base - top, "url(#concrete)"))
        o.append(rect(vx + 22, top, 6, base - top, "#000", ' opacity=".25"'))
        o.append(rect(vx - 1, top - 3, 30, 4, m["grey"]))
        for k, c in enumerate(["#C85A6E", "#5FA8C8", "#E7B44A"]):
            o.append(rect(vx + 3 + k * 7, base - 22 + (k % 2) * 6, 6, 10, c, ' opacity=".55"'))
    for i in range(20):
        x, y = bez(*L, (i + r.random() * .7) / 20)
        if not (190 < x < 330):
            o.append(pine(x, y + 4, r.uniform(34, 86), r, m["tree"], "#E7EDFA" if snow else None))
    for i in range(11):
        x, y = bez(*Rr, (i + r.random() * .7) / 11)
        o.append(pine(x, y + 4, r.uniform(30, 74), r, m["tree"], "#E7EDFA" if snow else None))
    return "".join(o)


def stars(n, top, rng, col="#fff"):
    o = []
    for _ in range(n):
        x, y, s = rng.uniform(0, W), rng.uniform(4, top), rng.choice([.4, .5, .6, .7, .9, 1.2])
        o.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(s)}" fill="{col}" opacity="{f(rng.uniform(.25, .95))}"/>')
        if s > 1:
            o.append(f'<path d="M{f(x - 4)},{f(y)} L{f(x + 4)},{f(y)} M{f(x)},{f(y - 4)} L{f(x)},{f(y + 4)}" stroke="{col}" stroke-width=".35" opacity=".5"/>')
    return "".join(o)


def compose(name, label, m, sky_defs, sky, extra_top="", snow=False):
    defs = defs_common(m) + sky_defs + f'<linearGradient id="fore" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{m["fore1"]}"/><stop offset="1" stop-color="{m["fore2"]}"/></linearGradient>'
    defs += f'<g id="town">{town(m, snow)}</g>'
    body = sky + f'<use href="#town"/>' + water(m) + extra_top + foreground(m, snow) + rect(0, 0, W, H, "#888", ' filter="url(#grain)" style="mix-blend-mode:overlay"')
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="{label}">'
         f"<defs>{defs}</defs>{body}</svg>")
    tmp = OUT / (name + ".svg.tmp")
    tmp.write_text(s, encoding="utf-8")
    tmp.replace(OUT / (name + ".svg"))
    print(name, len(s) // 1024, "KB")


BASE = dict(cool="#DCE6FF", glow="#FFB86B", dim="#7C88B8", edge="#AFC0EA", shade="#000000", lamp="#FFE0A8",
            bld1="#1E2A5A", bld2="#27356A", bld3="#18224C", crown="#B9CCF5", copper="#5E9088", hill="#141E44",
            brick1="#5A3A4E", brick2="#3C2A44", brickcap="#6D4A5E", alu1="#4A5A8E", alu2="#26336A", marble1="#F4F6FB", marble2="#B4BFDD",
            seam="#8E9CC6", people="#1A2147", far1="#4A5A92", far2="#2D3C72", mid1="#2B3A71", mid2="#18224D",
            far_bld="#33427A", near_bld="#141E45", haze="#E7B593", byg="#121B40",
            water1="#46558E", water2="#22305F", water3="#0D1534", refl=".55", shine="#C9D4F4", hull="#0A1130", deck="#1B2552", sail="#DCE3F5",
            tree="#070C1E", tree_back="#0D1533", fore1="#0B1229", fore2="#050915", path="#2A3360", silh="#04070F", kollen="#FBF6EA",
            white="#6E789E", grey="#525C84", orange="#E08A4A", sbrick="#4A2A34", swhite="#5E6890", quay="#2A3462", road="#2B2430",
            green1="#2E5A5E", green2="#1A3440", conc="#5A6488", conc2="#3A4470", win="#FFC983")


# ---------- 1: blåtime ----------
def blatime():
    m = dict(BASE)
    r = random.Random(101)
    sky_defs = """<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081331"/><stop offset=".2" stop-color="#172A60"/><stop offset=".32" stop-color="#36498A"/><stop offset=".4" stop-color="#8E7FA9"/><stop offset=".47" stop-color="#E7AE8E"/></linearGradient>
<radialGradient id="afterglow" cx=".33" cy=".42" r=".45"><stop offset="0" stop-color="#FFB98A" stop-opacity=".55"/><stop offset="1" stop-color="#FFB98A" stop-opacity="0"/></radialGradient>
<radialGradient id="moonhalo"><stop offset="0" stop-color="#FFF4DC" stop-opacity=".35"/><stop offset="1" stop-color="#FFF4DC" stop-opacity="0"/></radialGradient>"""
    cl = []
    for cx, cy, span, col, op in [(330, 122, 300, "#F2A98C", .5), (820, 104, 260, "#C892A6", .38), (560, 76, 180, "#6F6FA6", .4), (1460, 126, 200, "#E9AE92", .35)]:
        for _ in range(9):  # a cloud is a cluster of soft lobes, lit from below
            x = cx + r.uniform(-span / 2, span / 2)
            y = cy + r.uniform(-8, 6)
            rx, ry = r.uniform(30, 70), r.uniform(7, 14)
            cl.append(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(rx)}" ry="{f(ry)}" fill="{col}" opacity="{f(op * r.uniform(.6, 1))}"/>')
            cl.append(f'<ellipse cx="{f(x)}" cy="{f(y + ry * .5)}" rx="{f(rx * .8)}" ry="{f(ry * .35)}" fill="#FFD2B0" opacity="{f(op * .5)}"/>')
    clouds = '<g filter="url(#cloudblur)">' + "".join(cl) + "</g>"
    sky = (rect(0, 0, W, H, "url(#sky)") + rect(0, 0, W, 260, "url(#afterglow)") + stars(90, 120, r) + clouds
           + '<circle cx="1460" cy="64" r="46" fill="url(#moonhalo)"/><path d="M1452,52 a18,18 0 1,0 22,26 a14,14 0 1,1 -22,-26 Z" fill="#FBEFD7"/>')
    compose("oslo3-a-blatime", "Bjørvika sett fra Ekeberg i blåtimen", m, sky_defs, sky)


# ---------- 2: nordlys ----------
def nordlys():
    m = dict(BASE, haze="#7FE8B8", far1="#2A3A6A", far2="#18244E", mid1="#1A2654", mid2="#0F1838", far_bld="#24305E", near_bld="#0C1434",
             water1="#1E3554", water2="#13203F", water3="#070C20", refl=".6", glow="#FFAA60")
    r = random.Random(202)
    sky_defs = """<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030817"/><stop offset=".3" stop-color="#0A1633"/><stop offset=".45" stop-color="#16284D"/></linearGradient>
<linearGradient id="aur" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7CF5B4" stop-opacity=".0"/><stop offset=".15" stop-color="#7CF5B4" stop-opacity=".85"/><stop offset=".55" stop-color="#46D6A0" stop-opacity=".35"/><stop offset=".85" stop-color="#9B7CF2" stop-opacity=".22"/><stop offset="1" stop-color="#9B7CF2" stop-opacity="0"/></linearGradient>
<filter id="aurblur" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="2.5 7"/></filter>
<filter id="aurwide" x="-20%" y="-400%" width="140%" height="900%"><feGaussianBlur stdDeviation="18"/></filter>"""
    curtains = []
    for base_y, amp, phase, height, x0, x1 in [(150, 30, 0, 120, -60, 1100), (128, 24, 2.1, 100, 380, 1680), (172, 18, 4.2, 70, 150, 1400)]:
        rays = []
        for x in range(x0, x1, 3):
            taper = min(1, (x - x0) / 220, (x1 - x) / 220)  # curtains fade in and out instead of stopping
            y = base_y + amp * math.sin(x / 210 + phase) + 9 * math.sin(x / 57 + phase * 2)
            hh = height * (0.55 + 0.45 * math.sin(x / 33 + phase) ** 2) * (0.6 + 0.4 * r.random())
            rays.append(rect(x, y - hh, 2.4, hh, "url(#aur)", f' opacity="{f(r.uniform(.35, .9) * max(0, taper))}"'))
        curtains.append(f'<g filter="url(#aurblur)">{"".join(rays)}</g>')
    band = f'<path d="M-40,180 C300,120 620,200 900,150 S1400,110 1660,160" stroke="#5BE3A6" stroke-width="70" fill="none" opacity=".25" filter="url(#aurwide)"/>'
    aurora = f'<g id="aurora">{band}{"".join(curtains)}</g>'
    sky = rect(0, 0, W, H, "url(#sky)") + stars(170, 230, r) + aurora + '<path d="M1452,52 a18,18 0 1,0 22,26 a14,14 0 1,1 -22,-26 Z" fill="#FBEFD7" opacity=".9"/>'
    refl_aurora = f'<g mask="url(#reflmask)" opacity=".35"><g filter="url(#ripple)"><use href="#aurora" transform="translate(0 {2 * WL}) scale(1 -1)"/></g></g>'
    compose("oslo3-b-nordlys", "Bjørvika sett fra Ekeberg under nordlyset", m, sky_defs, sky, extra_top=refl_aurora)


# ---------- 3: vinterkveld ----------
def vinterkveld():
    m = dict(BASE, far1="#9AA8D2", far2="#5F6EA4", mid1="#6070A6", mid2="#3B4A80", far_bld="#7684B8", near_bld="#2B3870", haze="#F3D7E4",
             byg="#2E3A6E", hill="#3E4B80", water1="#4E5D96", water2="#2C3A6E", water3="#141D44", fore1="#C3CDEA", fore2="#7F8EC0",
             tree="#0B1430", tree_back="#2E3B70", path="#E9EEFA", silh="#0A1128", win="#FFCF8A")
    r = random.Random(303)
    sky_defs = """<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16244F"/><stop offset=".25" stop-color="#3A4C8C"/><stop offset=".38" stop-color="#8C8FC2"/><stop offset=".46" stop-color="#E4C6D6"/></linearGradient>"""
    sky = rect(0, 0, W, H, "url(#sky)") + stars(40, 90, r) + '<circle cx="1460" cy="64" r="20" fill="#FFF8EC" opacity=".95"/><circle cx="1460" cy="64" r="48" fill="#FFF8EC" opacity=".12"/>'
    glowattr = ' filter="url(#bloom)"'
    flakes = "".join(f'<circle cx="{f(r.uniform(0, W))}" cy="{f(r.uniform(0, H))}" r="{f(rr)}" fill="#FFFFFF" opacity="{f(r.uniform(.35, .9))}"{glowattr if rr > 1.6 else ""}/>'
                     for rr in [r.choice([.6, .8, 1, 1.2, 1.6, 2.2]) for _ in range(260)])
    compose("oslo3-c-vinterkveld", "Bjørvika sett fra Ekeberg en vinterkveld", m, sky_defs, sky, snow=True)
    # snowfall sits above everything: append it by re-reading the file
    p = OUT / "oslo3-c-vinterkveld.svg"
    s = p.read_text(encoding="utf-8").replace("</svg>", flakes + "</svg>")
    tmp = OUT / "oslo3-c-vinterkveld.svg.tmp"
    tmp.write_text(s, encoding="utf-8")
    tmp.replace(p)


if __name__ == "__main__":
    blatime()
    nordlys()
    vinterkveld()
