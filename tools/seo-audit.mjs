#!/usr/bin/env node

import { parse } from "node-html-parser";

// ── ANSI color helpers ──────────────────────────────────────────────
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// ── HTTP helpers ────────────────────────────────────────────────────

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "SEO-Audit-Bot/1.0" },
    });
    const contentType = res.headers.get("content-type") || "";
    const html = await res.text();
    return { html, finalUrl: res.url, contentType, ok: res.ok };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchResource(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "SEO-Audit-Bot/1.0" },
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(timer);
  }
}

// ── SEO Checks ──────────────────────────────────────────────────────

function checkTitle(document) {
  const title = document.querySelector("title");
  const text = title?.textContent?.trim() || "";

  if (!text) {
    return { name: "Title tag", status: "FAIL", score: 0, maxScore: 10, message: "No <title> tag found" };
  }
  if (text.length >= 30 && text.length <= 60) {
    return { name: "Title tag", status: "PASS", score: 10, maxScore: 10, message: `"${text.slice(0, 50)}${text.length > 50 ? "…" : ""}" (${text.length} chars)` };
  }
  return { name: "Title tag", status: "WARN", score: 5, maxScore: 10, message: `Title is ${text.length} chars (optimal: 30-60)` };
}

function checkMetaDescription(document) {
  const meta = document.querySelector('meta[name="description"]');
  const content = meta?.getAttribute("content")?.trim() || "";

  if (!content) {
    return { name: "Meta description", status: "FAIL", score: 0, maxScore: 10, message: "No meta description found" };
  }
  if (content.length >= 120 && content.length <= 160) {
    return { name: "Meta description", status: "PASS", score: 10, maxScore: 10, message: `${content.length} chars` };
  }
  return { name: "Meta description", status: "WARN", score: 5, maxScore: 10, message: `Description is ${content.length} chars (optimal: 120-160)` };
}

function checkH1(document) {
  const h1s = document.querySelectorAll("h1");
  if (h1s.length === 0) {
    return { name: "H1 heading", status: "FAIL", score: 0, maxScore: 8, message: "No H1 heading found" };
  }
  if (h1s.length === 1) {
    return { name: "H1 heading", status: "PASS", score: 8, maxScore: 8, message: `"${h1s[0].textContent.trim().slice(0, 50)}"` };
  }
  return { name: "H1 heading", status: "WARN", score: 4, maxScore: 8, message: `Found ${h1s.length} H1 tags — use exactly one` };
}

function checkHeadingHierarchy(document) {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  if (headings.length === 0) {
    return { name: "Heading hierarchy", status: "FAIL", score: 0, maxScore: 5, message: "No headings found" };
  }

  const levels = Array.from(headings).map((h) => parseInt(h.tagName[1]));
  let skips = 0;
  for (let i = 1; i < levels.length; i++) {
    const jump = levels[i] - levels[i - 1];
    if (jump > 1) skips++;
  }

  if (skips === 0) {
    return { name: "Heading hierarchy", status: "PASS", score: 5, maxScore: 5, message: "Clean hierarchy" };
  }
  if (skips === 1) {
    return { name: "Heading hierarchy", status: "WARN", score: 3, maxScore: 5, message: "Heading hierarchy has 1 level skip" };
  }
  return { name: "Heading hierarchy", status: "FAIL", score: 0, maxScore: 5, message: `Heading hierarchy has ${skips} level skips` };
}

function checkImageAlt(document) {
  const images = document.querySelectorAll("img");
  if (images.length === 0) {
    return { name: "Image alt text", status: "PASS", score: 8, maxScore: 8, message: "No images found" };
  }

  const withAlt = images.filter((img) => {
    const alt = img.getAttribute("alt");
    return alt !== null && alt.trim() !== "";
  }).length;
  const missing = images.length - withAlt;
  const pct = (withAlt / images.length) * 100;

  if (pct === 100) {
    return { name: "Image alt text", status: "PASS", score: 8, maxScore: 8, message: `All ${images.length} images have alt text` };
  }
  if (pct >= 50) {
    return { name: "Image alt text", status: "WARN", score: 4, maxScore: 8, message: `${missing} of ${images.length} images missing alt text` };
  }
  return { name: "Image alt text", status: "FAIL", score: 0, maxScore: 8, message: `${missing} of ${images.length} images missing alt text` };
}

function checkSSL(finalUrl) {
  if (finalUrl.startsWith("https://")) {
    return { name: "SSL / HTTPS", status: "PASS", score: 10, maxScore: 10, message: "Site uses HTTPS" };
  }
  return { name: "SSL / HTTPS", status: "FAIL", score: 0, maxScore: 10, message: "Site does not use HTTPS" };
}

async function checkSitemap(origin) {
  const { ok } = await fetchResource(`${origin}/sitemap.xml`);
  if (ok) {
    return { name: "sitemap.xml", status: "PASS", score: 8, maxScore: 8, message: "Found at /sitemap.xml" };
  }
  return { name: "sitemap.xml", status: "FAIL", score: 0, maxScore: 8, message: "No sitemap.xml found at /sitemap.xml" };
}

async function checkRobots(origin) {
  const { ok } = await fetchResource(`${origin}/robots.txt`);
  if (ok) {
    return { name: "robots.txt", status: "PASS", score: 5, maxScore: 5, message: "Found at /robots.txt" };
  }
  return { name: "robots.txt", status: "FAIL", score: 0, maxScore: 5, message: "No robots.txt found" };
}

function checkOpenGraph(document) {
  const tags = ["og:title", "og:description", "og:image"];
  const found = tags.filter((t) => document.querySelector(`meta[property="${t}"]`));
  const missing = tags.filter((t) => !found.includes(t));

  if (found.length === 3) {
    return { name: "Open Graph tags", status: "PASS", score: 6, maxScore: 6, message: "All OG tags present" };
  }
  if (found.length > 0) {
    return { name: "Open Graph tags", status: "WARN", score: 3, maxScore: 6, message: `Missing: ${missing.map((t) => t.replace("og:", "")).join(", ")}` };
  }
  return { name: "Open Graph tags", status: "FAIL", score: 0, maxScore: 6, message: "No Open Graph tags found" };
}

function checkViewport(document) {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    return { name: "Mobile viewport", status: "PASS", score: 10, maxScore: 10, message: "Viewport meta tag present" };
  }
  return { name: "Mobile viewport", status: "FAIL", score: 0, maxScore: 10, message: "No viewport meta tag — site may not be mobile-friendly" };
}

async function checkPageSpeed(url) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&strategy=mobile`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(apiUrl, { signal: controller.signal });
    if (res.status === 429) {
      return { name: "Page speed", status: "SKIP", score: 0, maxScore: 12, message: "PageSpeed API rate-limited" };
    }
    if (!res.ok) {
      return { name: "Page speed", status: "SKIP", score: 0, maxScore: 12, message: "PageSpeed API unavailable" };
    }
    const data = await res.json();
    const score = Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100);

    if (score >= 75) {
      return { name: "Page speed", status: "PASS", score: 12, maxScore: 12, message: `Mobile speed score: ${score}/100` };
    }
    if (score >= 50) {
      return { name: "Page speed", status: "WARN", score: 6, maxScore: 12, message: `Mobile speed score: ${score}/100` };
    }
    return { name: "Page speed", status: "FAIL", score: 0, maxScore: 12, message: `Mobile speed score: ${score}/100 — very slow` };
  } catch {
    return { name: "Page speed", status: "SKIP", score: 0, maxScore: 12, message: "PageSpeed API unavailable" };
  } finally {
    clearTimeout(timer);
  }
}

function checkSchema(document) {
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  const microdata = document.querySelector("[itemscope]");

  if (jsonLd || microdata) {
    return { name: "Schema markup", status: "PASS", score: 8, maxScore: 8, message: jsonLd ? "JSON-LD found" : "Microdata found" };
  }
  return { name: "Schema markup", status: "FAIL", score: 0, maxScore: 8, message: "No structured data (JSON-LD or microdata) found" };
}

// ── Check runner ────────────────────────────────────────────────────

async function runChecks(document, finalUrl, origin, isHtml) {
  const results = [];

  if (isHtml) {
    results.push(checkTitle(document));
    results.push(checkMetaDescription(document));
    results.push(checkH1(document));
    results.push(checkHeadingHierarchy(document));
    results.push(checkImageAlt(document));
  }

  results.push(checkSSL(finalUrl));

  const [sitemapResult, robotsResult] = await Promise.all([
    checkSitemap(origin),
    checkRobots(origin),
  ]);
  results.push(sitemapResult);
  results.push(robotsResult);

  if (isHtml) {
    results.push(checkOpenGraph(document));
    results.push(checkViewport(document));
  }

  console.log(c.dim("  Checking page speed (this may take a moment)..."));
  results.push(await checkPageSpeed(finalUrl));

  if (isHtml) {
    results.push(checkSchema(document));
  }

  return results;
}

// ── Scoring ─────────────────────────────────────────────────────────

function calculateScore(results) {
  const active = results.filter((r) => r.status !== "SKIP");
  const earned = active.reduce((sum, r) => sum + r.score, 0);
  const possible = active.reduce((sum, r) => sum + r.maxScore, 0);
  const normalized = possible > 0 ? Math.round((earned / possible) * 100) : 0;

  let grade;
  if (normalized >= 90) grade = "A";
  else if (normalized >= 75) grade = "B";
  else if (normalized >= 60) grade = "C";
  else if (normalized >= 40) grade = "D";
  else grade = "F";

  return { earned, possible, normalized, grade };
}

// ── Report printer ──────────────────────────────────────────────────

function printReport(results, scoreData, hostname) {
  const W = 56;
  const line = "═".repeat(W);

  console.log();
  console.log(`  ╔${line}╗`);
  const header = `SEO AUDIT — ${hostname}`;
  const pad = Math.max(0, W - header.length);
  const padL = Math.floor(pad / 2);
  const padR = pad - padL;
  console.log(`  ║${" ".repeat(padL)}${c.bold(header)}${" ".repeat(padR)}║`);
  console.log(`  ╠${line}╣`);
  console.log(`  ║${" ".repeat(W)}║`);

  for (const r of results) {
    const icon =
      r.status === "PASS" ? c.green("✓") :
      r.status === "WARN" ? c.yellow("⚠") :
      r.status === "FAIL" ? c.red("✗") :
      c.dim("—");

    const scoreStr =
      r.status === "SKIP" ? c.dim("SKIP") :
      r.status === "PASS" ? c.green(`${r.score}/${r.maxScore}`) :
      r.status === "WARN" ? c.yellow(`${r.score}/${r.maxScore}`) :
      c.red(`${r.score}/${r.maxScore}`);

    const statusStr =
      r.status === "PASS" ? c.green("PASS") :
      r.status === "WARN" ? c.yellow("WARN") :
      r.status === "FAIL" ? c.red("FAIL") :
      c.dim("SKIP");

    const nameLen = r.name.length;
    const dots = ".".repeat(Math.max(2, 28 - nameLen));

    console.log(`  ║  ${icon} ${r.name} ${c.dim(dots)} ${scoreStr}  ${statusStr}  ║`);

    if (r.status !== "PASS" && r.message) {
      console.log(`  ║    ${c.dim("→")} ${c.dim(r.message)}`);
    }
  }

  console.log(`  ║${" ".repeat(W)}║`);
  console.log(`  ╠${line}╣`);

  const gradeColor =
    scoreData.grade === "A" ? c.green :
    scoreData.grade === "B" ? c.green :
    scoreData.grade === "C" ? c.yellow :
    c.red;

  const scoreLine = `TOTAL SCORE:  ${scoreData.earned} / ${scoreData.possible}  (${scoreData.normalized}%)`;
  const gradeLine = `GRADE:  ${gradeColor(scoreData.grade)}`;
  console.log(`  ║  ${c.bold(scoreLine)}${" ".repeat(Math.max(1, W - scoreLine.length - 2))}║`);
  console.log(`  ║  ${gradeLine}${" ".repeat(Math.max(1, W - 10))}║`);
  console.log(`  ╚${line}╝`);
  console.log();
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  let url = process.argv[2];

  if (!url) {
    console.log(c.bold("SEO Audit Tool"));
    console.log();
    console.log("Usage: node seo-audit.mjs <url>");
    console.log();
    console.log("Example:");
    console.log("  node seo-audit.mjs https://example.com");
    process.exit(0);
  }

  // Normalize URL
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  console.log();
  console.log(c.cyan(`  Scanning ${url}...`));

  let html, finalUrl, contentType;
  try {
    const result = await fetchPage(url);
    html = result.html;
    finalUrl = result.finalUrl;
    contentType = result.contentType;
  } catch (err) {
    console.log(c.red(`\n  Could not reach ${url}: ${err.message}\n`));
    process.exit(1);
  }

  const isHtml = contentType.includes("text/html");
  if (!isHtml) {
    console.log(c.yellow(`  Response is not HTML (got ${contentType}). Skipping HTML checks.`));
  }

  const document = isHtml ? parse(html) : null;
  const origin = new URL(finalUrl).origin;
  const hostname = new URL(finalUrl).hostname;

  const results = await runChecks(document, finalUrl, origin, isHtml);
  const scoreData = calculateScore(results);

  printReport(results, scoreData, hostname);
}

main();
