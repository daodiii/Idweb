# SEO Audit CLI Tool — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone CLI tool that audits any website's SEO health and prints a scored, color-coded terminal report.

**Architecture:** Single-file Node.js script in `tools/seo-audit.mjs` with `node-html-parser` as sole dependency. Fetches the target page + supporting files (sitemap, robots.txt), runs 12 checks, scores each PASS/WARN/FAIL, and prints a box-drawing report with a letter grade.

**Tech Stack:** Node.js 18+ (native fetch), node-html-parser, Google PageSpeed Insights API (free)

---

## File Structure

```
tools/
  package.json        # Minimal: name, type:module, node-html-parser dependency
  seo-audit.mjs       # All logic: fetch, parse, check, score, print
```

Single file is appropriate here — the tool has one job and ~300-400 lines. No need to split.

---

## Chunk 1: Project Setup & Core Fetching

### Task 1: Initialize the tools directory

**Files:**
- Create: `tools/package.json`
- Create: `tools/seo-audit.mjs`

- [ ] **Step 1: Create `tools/package.json`**

```json
{
  "name": "seo-audit",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "node-html-parser": "^6.1.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd tools && npm install`
Expected: `node_modules` created, `package-lock.json` generated

- [ ] **Step 3: Add `tools/node_modules` to `.gitignore`**

Append `tools/node_modules/` to the project root `.gitignore`.

- [ ] **Step 4: Create `tools/seo-audit.mjs` with CLI entry point and fetch logic**

The script should:
- Read URL from `process.argv[2]`, validate it starts with `http`
- Normalize: prepend `https://` if no protocol, extract origin for sub-requests
- `fetchPage(url)`: fetch with 10s timeout via `AbortController`, follow redirects (max 5 via `redirect: "follow"`), return `{ html, finalUrl }`
- `fetchResource(url)`: same timeout, return `{ ok, status }` — used for sitemap/robots
- Print usage if no URL provided

- [ ] **Step 5: Test manually**

Run: `node tools/seo-audit.mjs https://example.com`
Expected: Fetches page without error, prints nothing yet (checks not implemented)

Run: `node tools/seo-audit.mjs`
Expected: Prints usage message

- [ ] **Step 6: Commit**

```bash
git add tools/package.json tools/package-lock.json tools/seo-audit.mjs .gitignore
git commit -m "feat: scaffold SEO audit CLI with fetch logic"
```

---

### Task 2: HTML parsing and check runner infrastructure

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Add HTML parsing and check runner**

After fetching, parse the HTML with `node-html-parser`. Define a `runChecks(document, finalUrl, origin)` function that:
- Accepts the parsed document, the final URL, and the origin
- Returns an array of check results: `{ name, status: "PASS"|"WARN"|"FAIL"|"SKIP", score, maxScore, message }`
- For now, return an empty array (checks added in next tasks)

Define `calculateGrade(totalScore)`:
- A: 90-100, B: 75-89, C: 60-74, D: 40-59, F: 0-39

Wire up the main function: fetch → parse → runChecks → (print step comes later)

- [ ] **Step 2: Test manually**

Run: `node tools/seo-audit.mjs https://example.com`
Expected: No errors, no output yet

- [ ] **Step 3: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add HTML parsing and check runner scaffold"
```

---

## Chunk 2: Implement All 12 SEO Checks

### Task 3: Checks 1-4 (Title, Meta Description, H1, Heading Hierarchy)

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Implement `checkTitle(document)`**

- Find `<title>` tag, get text content
- PASS (10): exists and 30-60 chars
- WARN (5): exists but outside range. Message: `"Title is X chars (optimal: 30-60)"`
- FAIL (0): missing. Message: `"No <title> tag found"`

- [ ] **Step 2: Implement `checkMetaDescription(document)`**

- Find `<meta name="description">`, get `content` attribute
- PASS (10): exists and 120-160 chars
- WARN (5): exists but outside range. Message: `"Description is X chars (optimal: 120-160)"`
- FAIL (0): missing. Message: `"No meta description found"`

- [ ] **Step 3: Implement `checkH1(document)`**

- `document.querySelectorAll("h1")`
- PASS (8): exactly 1
- WARN (4): 2+ found. Message: `"Found X H1 tags — use exactly one"`
- FAIL (0): none. Message: `"No H1 heading found"`

- [ ] **Step 4: Implement `checkHeadingHierarchy(document)`**

- Get all `h1`-`h6` tags in document order, extract their levels
- Count how many times a level is skipped (e.g., h1→h3 = 1 skip)
- PASS (5): 0 skips
- WARN (3): 1 skip. Message: `"Heading hierarchy has 1 level skip"`
- FAIL (0): 2+ skips or no headings. Message: `"Heading hierarchy has X level skips"` or `"No headings found"`

- [ ] **Step 5: Wire checks 1-4 into `runChecks`**

Add all four check functions to the results array returned by `runChecks`.

- [ ] **Step 6: Test manually**

Run: `node tools/seo-audit.mjs https://vg.no`
Expected: No errors, checks run (no visible output yet — we'll add printing in Task 7)

Run with `console.log(JSON.stringify(results, null, 2))` temporarily to verify check results look correct.

- [ ] **Step 7: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add title, meta description, H1, heading hierarchy checks"
```

---

### Task 4: Checks 5-8 (Image Alt, SSL, Sitemap, Robots)

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Implement `checkImageAlt(document)`**

- `document.querySelectorAll("img")` — get all images
- Count those with non-empty `alt` attribute
- If no images: PASS (8). Message: `"No images found (nothing to check)"`
- PASS (8): 100% have alt
- WARN (4): 50-99% have alt. Message: `"X of Y images missing alt text"`
- FAIL (0): <50% have alt. Message: `"X of Y images missing alt text"`

- [ ] **Step 2: Implement `checkSSL(finalUrl)`**

- Check if `finalUrl` starts with `https://`
- PASS (10): yes
- FAIL (0): no. Message: `"Site does not use HTTPS"`

- [ ] **Step 3: Implement `checkSitemap(origin)` (async)**

- `fetchResource(origin + "/sitemap.xml")`
- PASS (8): status 200
- FAIL (0): any other status. Message: `"No sitemap.xml found at /sitemap.xml"`

- [ ] **Step 4: Implement `checkRobots(origin)` (async)**

- `fetchResource(origin + "/robots.txt")`
- PASS (5): status 200
- FAIL (0): any other status. Message: `"No robots.txt found"`

- [ ] **Step 5: Wire checks 5-8 into `runChecks`**

- [ ] **Step 6: Test manually with temp `console.log`**

Run: `node tools/seo-audit.mjs https://vg.no`
Expected: All 8 checks produce results, no errors

- [ ] **Step 7: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add image alt, SSL, sitemap, robots.txt checks"
```

---

### Task 5: Checks 9-12 (Open Graph, Viewport, PageSpeed, Schema)

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Implement `checkOpenGraph(document)`**

- Look for `<meta property="og:title">`, `og:description`, `og:image`
- Count how many are present
- PASS (6): all 3
- WARN (3): 1-2 present. Message: `"Missing Open Graph tags: X, Y"`
- FAIL (0): none. Message: `"No Open Graph tags found"`

- [ ] **Step 2: Implement `checkViewport(document)`**

- Look for `<meta name="viewport">`
- PASS (10): present
- FAIL (0): missing. Message: `"No viewport meta tag — site may not be mobile-friendly"`

- [ ] **Step 3: Implement `checkPageSpeed(url)` (async)**

- Fetch `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&strategy=mobile`
- Timeout: 30s (PageSpeed is slow)
- Extract `lighthouseResult.categories.performance.score` (0-1, multiply by 100)
- PASS (12): score >= 75
- WARN (6): score 50-74. Message: `"Mobile speed score: X/100"`
- FAIL (0): score < 50. Message: `"Mobile speed score: X/100 — very slow"`
- On error/429: SKIP. Message: `"PageSpeed API unavailable"`

- [ ] **Step 4: Implement `checkSchema(document)`**

- Look for `<script type="application/ld+json">` or elements with `itemscope`/`itemtype` attributes
- PASS (8): found
- FAIL (0): none. Message: `"No structured data (JSON-LD or microdata) found"`

- [ ] **Step 5: Wire checks 9-12 into `runChecks`**

- [ ] **Step 6: Test manually**

Run: `node tools/seo-audit.mjs https://vg.no`
Expected: All 12 checks produce results. PageSpeed may take 10-20 seconds.

- [ ] **Step 7: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add Open Graph, viewport, PageSpeed, schema checks"
```

---

## Chunk 3: Terminal Report Output

### Task 6: Scoring calculation

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Implement `calculateScore(results)`**

- Filter out SKIP results
- Sum `score` values for total earned
- Sum `maxScore` values for total possible
- Normalize to 100: `Math.round((earned / possible) * 100)`
- Return `{ earned, possible, normalized, grade }`

Grade from `calculateGrade`: A (90-100), B (75-89), C (60-74), D (40-59), F (0-39)

- [ ] **Step 2: Test manually with console.log**

Run: `node tools/seo-audit.mjs https://example.com`
Expected: Score object logged, grade looks reasonable

- [ ] **Step 3: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add score calculation and grading"
```

---

### Task 7: Pretty terminal output

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Define ANSI color helpers**

```javascript
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};
```

- [ ] **Step 2: Implement `printReport(results, scoreData, hostname)`**

- Print header box with `SEO AUDIT — <hostname>`
- For each result:
  - PASS: green `✓`, check name, `score/maxScore`, green `PASS`
  - WARN: yellow `⚠`, check name, `score/maxScore`, yellow `WARN`, indented message
  - FAIL: red `✗`, check name, `0/maxScore`, red `FAIL`, indented message with `→` prefix
  - SKIP: dim `—`, check name, `SKIP`, dim message
- Print footer box with total score, grade (colored by grade level)
- Use dots `...` to pad between check name and score for alignment

- [ ] **Step 3: Wire everything together in main**

Full flow: validate args → fetch page → parse → run checks → calculate score → print report

- [ ] **Step 4: Test with multiple sites**

Run: `node tools/seo-audit.mjs https://vg.no`
Run: `node tools/seo-audit.mjs https://example.com`
Run: `node tools/seo-audit.mjs http://nrk.no`

Expected: Colored, formatted reports. Different scores for different sites. No crashes.

- [ ] **Step 5: Remove any leftover `console.log` debug statements**

- [ ] **Step 6: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add colored terminal report output"
```

---

## Chunk 4: Error Handling & Polish

### Task 8: Robust error handling

**Files:**
- Modify: `tools/seo-audit.mjs`

- [ ] **Step 1: Add error handling for unreachable sites**

Wrap the main fetch in try/catch. On failure:
- Print red error: `"Could not reach <url>: <error.message>"`
- `process.exit(1)`

- [ ] **Step 2: Add error handling for non-HTML responses**

Check `content-type` header. If not `text/html`:
- Print warning: `"Response is not HTML (got <content-type>). Skipping HTML checks."`
- Only run SSL check, sitemap, robots.txt, and PageSpeed

- [ ] **Step 3: Test error cases**

Run: `node tools/seo-audit.mjs https://thissitedoesnotexist12345.com`
Expected: Error message, exit code 1

Run: `node tools/seo-audit.mjs https://jsonplaceholder.typicode.com/posts/1`
Expected: Warning about non-HTML, only non-HTML checks run

- [ ] **Step 4: Add a "scanning..." progress indicator**

Print `"Scanning <url>..."` before starting checks, and `"Checking page speed (this may take a moment)..."` before the PageSpeed API call.

- [ ] **Step 5: Final test**

Run: `node tools/seo-audit.mjs https://vg.no`
Expected: Full clean report with progress messages, no debug output

- [ ] **Step 6: Commit**

```bash
git add tools/seo-audit.mjs
git commit -m "feat: add error handling and progress indicators"
```
