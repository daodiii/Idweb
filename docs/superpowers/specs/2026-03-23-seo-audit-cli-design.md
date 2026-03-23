# SEO Audit CLI Tool — Design Spec

## Purpose

Standalone CLI tool for prospecting. Audits a business website's SEO health and outputs a scored terminal report. Helps identify potential customers who lack proper SEO.

## Usage

```bash
cd tools && npm install   # first time only
node seo-audit.mjs https://example.com
```

## Architecture

Single-file Node.js script (`tools/seo-audit.mjs`) with one lightweight dependency (`node-html-parser`). Uses Node 18+ built-in `fetch` for HTTP requests.

All HTTP requests use a 10-second timeout. Redirects are followed up to 5 hops. The final resolved URL is used for the report header.

### Flow

1. Fetch the target URL (follow redirects, max 5, timeout 10s)
2. Parse HTML response
3. Run each check against the parsed document
4. Fetch `/sitemap.xml` and `/robots.txt` (separate requests)
5. Call Google PageSpeed Insights API for performance data (rate-limited — skip gracefully if 429)
6. Score each check: PASS (green) / WARN (yellow) / FAIL (red)
7. Print colored terminal report with total score out of 100

## Checks & Scoring Thresholds

| # | Check | PASS | WARN | FAIL | Weight |
|---|-------|------|------|------|--------|
| 1 | Title tag | Exists, 30-60 chars | Exists but outside range | Missing | 10 |
| 2 | Meta description | Exists, 120-160 chars | Exists but outside range | Missing | 10 |
| 3 | H1 heading | Exactly 1 H1 | 2+ H1s present | No H1 | 8 |
| 4 | Heading hierarchy | No levels skipped | 1 skip (e.g., H1→H3) | 2+ skips or no headings | 5 |
| 5 | Image alt text | 100% have alt | 50-99% have alt | <50% have alt | 8 |
| 6 | SSL/HTTPS | Final URL is HTTPS | — | HTTP | 10 |
| 7 | sitemap.xml | 200 at /sitemap.xml | — | Missing or error | 8 |
| 8 | robots.txt | 200 at /robots.txt | — | Missing or error | 5 |
| 9 | Open Graph tags | All 3 (title, desc, image) | 1-2 present | None | 6 |
| 10 | Mobile viewport | `<meta name="viewport">` present | — | Missing | 10 |
| 11 | Page speed | PSI score >= 75 | PSI score 50-74 | PSI score < 50 | 12 |
| 12 | Schema markup | JSON-LD or microdata found | — | None | 8 |

**Scoring:** PASS = full weight, WARN = half weight (rounded up), FAIL = 0. Total out of 100.

## Output Format

Colored terminal output using ANSI escape codes (no dependency needed). Output adapts to terminal width; the box-drawing mockup below is illustrative.

```
╔══════════════════════════════════════════════════╗
║          SEO AUDIT — example.com                 ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  ✓ Title tag .................... 10/10  PASS    ║
║  ✗ Meta description ............  0/10  FAIL    ║
║    → Missing. Add a 120-160 char description.    ║
║  ⚠ H1 heading ..................  4/8   WARN    ║
║    → Found 3 H1 tags. Use exactly one.           ║
║  ...                                             ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║  TOTAL SCORE:  42 / 100                          ║
║  GRADE:  D                                       ║
╚══════════════════════════════════════════════════╝
```

Grade scale: A (90-100), B (75-89), C (60-74), D (40-59), F (0-39)

## Error Handling

- Site unreachable / timeout → print error, exit with code 1
- Individual check fails (e.g., PageSpeed API rate-limited or down) → mark as "SKIP", exclude weight from total
- Non-HTML response → warn and skip HTML-dependent checks

## Dependencies

- `node-html-parser` — fast HTML parsing without a browser engine
- Node.js 18+ built-in `fetch` — no HTTP library needed

## File Location

```
tools/
  seo-audit.mjs      # The CLI script
  package.json        # Minimal, just node-html-parser dep
```

Kept separate from the Next.js project to avoid polluting the site's dependencies.
