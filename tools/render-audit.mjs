// Render-audit crawler: raw HTML (what crawlers get) + rendered DOM (what visitors get)
// Usage: node tools/render-audit.mjs <baseUrl> <outDir> [siteOrigin]
import { chromium } from "playwright";
import { parse } from "node-html-parser";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "./audit";
const SITE_ORIGIN = process.argv[4] || "https://www.idweb.no"; // origin used inside sitemap
fs.mkdirSync(OUT, { recursive: true });

const local = (u) => u.replace(SITE_ORIGIN, BASE).replace("https://idweb.no", BASE);

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.error(`sitemap: ${urls.length} urls`);

function rawAudit(html) {
  const root = parse(html, { comment: false });
  const q = (s) => root.querySelector(s);
  const meta = (n) => q(`meta[name="${n}"]`)?.getAttribute("content") ?? null;
  const prop = (n) => q(`meta[property="${n}"]`)?.getAttribute("content") ?? null;
  const jsonld = root.querySelectorAll('script[type="application/ld+json"]').flatMap((s) => {
    try {
      const d = JSON.parse(s.text);
      const items = Array.isArray(d) ? d : d["@graph"] ? d["@graph"] : [d];
      return items.map((i) => ({ type: i["@type"], data: i }));
    } catch { return [{ type: "INVALID_JSON" }]; }
  });
  root.querySelectorAll("script,style,noscript,svg").forEach((n) => n.remove());
  const body = root.querySelector("body");
  const text = (body?.text || "").replace(/\s+/g, " ").trim();
  return {
    title: q("title")?.text ?? null,
    description: meta("description"),
    robots: meta("robots"),
    canonical: q('link[rel="canonical"]')?.getAttribute("href") ?? null,
    hreflang: root.querySelectorAll('link[rel="alternate"][hreflang]').map((l) => `${l.getAttribute("hreflang")}=${l.getAttribute("href")}`),
    ogTitle: prop("og:title"), ogImage: prop("og:image"), ogType: prop("og:type"), ogUrl: prop("og:url"),
    h1: root.querySelectorAll("h1").map((h) => h.text.replace(/\s+/g, " ").trim()),
    h2: root.querySelectorAll("h2").map((h) => h.text.replace(/\s+/g, " ").trim()),
    jsonld,
    rawWordCount: text ? text.split(" ").length : 0,
    rawText: text,
    rawLinks: [...new Set(body?.querySelectorAll("a[href]").map((a) => a.getAttribute("href")) || [])],
    imgsNoAlt: body?.querySelectorAll("img").filter((i) => i.getAttribute("alt") == null).map((i) => i.getAttribute("src")) || [],
    hiddenOpacity0: (html.match(/style="[^"]*opacity:0/g) || []).length,
  };
}

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const results = [];

for (const siteUrl of urls) {
  const url = local(siteUrl);
  const slug = (new URL(url).pathname.replace(/^\/|\/$/g, "") || "home").replace(/\//g, "__");
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const rec = { url: siteUrl, slug };
  try {
    const res = await fetch(url, { redirect: "manual" });
    rec.status = res.status;
    const html = await res.text();
    fs.writeFileSync(path.join(dir, "raw.html"), html);
    rec.raw = rawAudit(html);

    for (const [name, vp, mobile] of [["desktop", { width: 1440, height: 900 }, false], ["mobile", { width: 390, height: 844 }, true]]) {
      const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: "nb-NO" });
      const page = await ctx.newPage();
      const consoleErrors = [];
      const failed = [];
      let jsBytes = 0, totalBytes = 0;
      page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 300)));
      page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message.slice(0, 300)));
      page.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
      page.on("response", async (r) => {
        const len = Number(r.headers()["content-length"] || 0);
        totalBytes += len;
        if (r.request().resourceType() === "script") jsBytes += len;
      });
      await page.addInitScript(() => {
        window.__lcp = 0; window.__cls = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.screenshot({ path: path.join(dir, `${name}-fold.png`) });
      // scroll to trigger whileInView animations
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400));
      });
      await page.screenshot({ path: path.join(dir, `${name}-full.png`), fullPage: true });
      const r = await page.evaluate(() => {
        const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05 && b.width > 0 && b.height > 0; };
        const nav = performance.getEntriesByType("navigation")[0];
        const fcp = performance.getEntriesByName("first-contentful-paint")[0];
        return {
          h1: [...document.querySelectorAll("h1")].filter(vis).map((h) => h.innerText.replace(/\s+/g, " ").trim()),
          h2: [...document.querySelectorAll("h2")].filter(vis).map((h) => h.innerText.replace(/\s+/g, " ").trim()),
          foldText: (() => { const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const el = n.parentElement; if (!el || !n.textContent.trim()) continue; const b = el.getBoundingClientRect(); if (b.top < window.innerHeight && b.bottom > 0 && vis(el)) out.push(n.textContent.trim()); } return [...new Set(out)].join(" | ").slice(0, 1500); })(),
          text: document.body.innerText.replace(/\s+/g, " ").trim(),
          links: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")))],
          ctas: [...document.querySelectorAll("a,button")].filter(vis).map((a) => a.innerText.trim()).filter((t) => /tilbud|kontakt|book|ring|send|start|samtale|gratis/i.test(t)).slice(0, 30),
          forms: [...document.querySelectorAll("form")].map((f) => ({ action: f.getAttribute("action"), fields: [...f.querySelectorAll("input,textarea,select")].map((i) => i.name || i.type) })),
          imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src).slice(0, 20),
          tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
          mail: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          docHeight: document.body.scrollHeight,
          ttfb: nav ? Math.round(nav.responseStart) : null,
          fcp: fcp ? Math.round(fcp.startTime) : null,
          lcp: Math.round(window.__lcp), cls: Number(window.__cls.toFixed(3)),
        };
      });
      rec[name] = { ...r, consoleErrors, failed: failed.slice(0, 20), jsBytes, totalBytes };
      await ctx.close();
    }
  } catch (e) {
    rec.error = String(e).slice(0, 500);
  }
  results.push(rec);
  console.error(`${rec.status ?? "ERR"} ${slug} h1=${JSON.stringify(rec.desktop?.h1 ?? rec.raw?.h1)}`);
}
await browser.close();

// internal link check
const internal = new Set();
for (const r of results) for (const l of [...(r.raw?.rawLinks || []), ...(r.desktop?.links || []), ...(r.mobile?.links || [])]) {
  if (l && l.startsWith("/") && !l.startsWith("//")) internal.add(l.split("#")[0].split("?")[0] || "/");
}
const linkStatus = {};
for (const l of internal) { try { const res = await fetch(BASE + l, { redirect: "manual" }); linkStatus[l] = res.status; } catch (e) { linkStatus[l] = "ERR"; } }

fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify({ base: BASE, crawledAt: new Date().toISOString(), results, linkStatus }, null, 2));
console.error("done", results.length, "pages;", Object.entries(linkStatus).filter(([, s]) => s >= 400 || s === "ERR").length, "broken internal links");
