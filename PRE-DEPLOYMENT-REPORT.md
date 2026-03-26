# IDweb Pre-Deployment Report

Generated: 25 March 2026

---

## PART 1: CHANGES MADE (Already Implemented)

### Security Fixes
1. **Security headers added** (`next.config.ts`) — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control
2. **Rate limiting added** (`src/app/api/contact/route.ts`) — 5 requests per IP per 15 minutes, input sanitization, length limits, honeypot bot trap
3. **Removed fake aggregate rating** from JSON-LD (was claiming 5.0 with 47 reviews — this could trigger Google penalties and violates Norwegian Marketing Control Act)

### SEO Fixes
4. **JSON-LD now renders inline** (was `afterInteractive` which deferred it from initial crawl — Google might not see structured data)
5. **Enhanced all page metadata** — longer descriptions (150-160 chars), more keywords per page, stronger title tags
6. **Added BreadcrumbJsonLd** to: blogg, kontakt, priser, om-oss, referanser (FAQ and service pages already had it)
7. **Added FaqJsonLd** to priser page (pricing FAQ section is eligible for rich results)
8. **Added SearchAction** to WebSite schema (enables Google sitelinks searchbox)
9. **Added hreflang tag** (`nb-NO`) to root layout
10. **Added font subsets** (`latin-ext`) for Norwegian characters
11. **Upgraded Business schema** from `LocalBusiness` to `ProfessionalService` with logo, image, legalName, currency, payment methods, areaServed (Oslo + Norway)

### Missing Files Created
12. **404 page** (`src/app/not-found.tsx`) — Norwegian, branded, with links to home and contact
13. **Error boundary** (`src/app/error.tsx`) — catches runtime errors, shows retry button
14. **Favicon set** — apple-touch-icon (180x180), favicon-32x32, favicon-16x16, icon-192x192, icon-512x512
15. **Web app manifest** (`public/site.webmanifest`) — enables PWA capabilities, proper branding

### Code Quality Fixes
16. **Removed duplicate `<main>`** landmark in service pages (WCAG violation)
17. **Removed dead code** — unused `NAV_LINKS` constant, unused `serviceSlugs` variable in sitemap
18. **Removed unused import** (`ArrowRight` in kontakt page)

---

## PART 2: SECURITY AUDIT SUMMARY

### No Critical Vulnerabilities Found
The site is primarily static with no authentication, no database, and no user accounts. Attack surface is minimal.

### Remaining Items (LOW priority for a static site)

| Issue | Severity | Status |
|-------|----------|--------|
| Security headers | HIGH | FIXED |
| Rate limiting on API | HIGH | FIXED |
| Fake aggregate rating | HIGH | FIXED |
| No CSP (Content Security Policy) | MEDIUM | See note below |
| Formspree form ID exposed in source | INFO | Normal — Formspree handles spam protection |
| Email/phone in source code | INFO | Necessary for business — bots can harvest but unavoidable |
| setInterval in API route (cleanup timer) | LOW | Only runs in development/server, no memory leak risk |

**CSP Note:** Adding a strict CSP would block the Spline 3D library and inline styles from Tailwind. You can add a basic CSP after deployment if needed, but it requires careful testing. The other security headers I added cover the most important protections.

---

## PART 3: SEO AUDIT SUMMARY

### What's Working Well
- Correct `lang="nb"` on HTML tag
- `metadataBase` set to `https://idweb.no`
- Canonical URLs on all pages
- OpenGraph and Twitter Card tags on all pages
- Well-structured sitemap with correct priorities
- Robots.txt blocks /api/ and /_next/
- Font loading uses `display: swap` (good for CLS)
- Images use Next.js `<Image>` with AVIF/WebP optimization
- Dynamic imports for below-fold sections (good for performance)
- Blog posts have proper BlogPosting schema with breadcrumbs
- Service pages have Service schema with FAQ schema

### MUST-DO Before Launch

| Action | Impact | Effort |
|--------|--------|--------|
| **Register Google Search Console** and add verification code in `layout.tsx` line 72 | CRITICAL | 10 min |
| **Create Google Business Profile** (Google My Business) for "IDweb Oslo" | CRITICAL | 30 min |
| **Add social media URLs** to `sameAs: []` in JSON-LD (currently empty) | HIGH | 5 min |
| **Set up Google Analytics 4** or Plausible/Umami for traffic tracking | HIGH | 20 min |
| **Add cookie consent banner** (required by Norwegian law if using analytics) | HIGH | 1 hr |

### Recommended After Launch

| Action | Impact | Effort |
|--------|--------|--------|
| Create `/tjenester` index page (currently 404 — dead nav link in constants) | HIGH | 30 min |
| Submit sitemap to Google Search Console | HIGH | 5 min |
| Set up Bing Webmaster Tools | MEDIUM | 15 min |
| Create Trustpilot profile and ask existing clients for reviews | HIGH | 1 hr |
| Add real `lastModified` dates to sitemap (currently uses build date) | MEDIUM | 15 min |
| Create social media profiles (LinkedIn, Facebook, Instagram) | HIGH | 1 hr |
| Write 3-5 more blog articles targeting "nettside + [city name]" keywords | HIGH | Ongoing |
| Add internal links between blog articles | MEDIUM | 30 min |
| Test with Google Rich Results Validator after deployment | HIGH | 10 min |

### Keyword Strategy

**Primary keywords (target on homepage):**
- nettside, webdesign, webutvikling, webdesignbyra oslo, lage nettside, nettside bedrift, profesjonell nettside

**Service page keywords:**
- nettside: skreddersydd nettside, webdesign, responsivt design, nettside bedrift oslo
- SEO: seo optimalisering, soekemotoroptimalisering, lokal seo, google rangering, seo oslo
- Vedlikehold: vedlikehold nettside, drift nettside, hosting norge, nettside sikkerhet

**Long-tail opportunities (for future blog posts):**
- "hva koster en nettside i Norge 2026"
- "beste webdesignbyra oslo"
- "nettside for restaurant oslo"
- "nettside for frisorsalong"
- "nettside for tannlege"
- "wordpress vs skreddersydd nettside"
- "hvordan fa flere kunder pa nett"
- "lokal seo guide for smabedrifter"

---

## PART 4: WEB DESIGN GUIDELINES AUDIT

### Critical Findings (Should Fix Before Launch)
1. **Mobile menu lacks focus trap and Escape-to-close** — accessibility issue for keyboard/screen reader users
2. **Contact form on yellow CTA section** — form inputs have poor contrast on bright background
3. **Several animations don't respect `prefers-reduced-motion`** — affects users with motion sensitivity

### High Priority Findings
4. **Spline 3D is ~562KB** — heavy on mobile, consider video alternative or loading only on desktop idle
5. **Footer accordion hides content without JS** — progressive enhancement issue
6. **Process section auto-advances without pause** — WCAG 2.2.2 compliance issue

### Good Practices Already in Place
- Skip navigation link present
- `aria-label` on form inputs
- `aria-expanded` on mobile menu toggle
- `prefers-reduced-motion` respected in hero, template, and globals.css
- Semantic heading hierarchy mostly correct
- Focus indicators visible on interactive elements
- Touch targets adequate size

---

## PART 5: CODE REVIEW SUMMARY

### Build Status: CLEAN
- TypeScript: 0 errors
- All 30 pages generated successfully
- Static + SSG + Dynamic routing working correctly

### Issues Found and Fixed
- Duplicate `<main>` landmark (FIXED)
- Dead code: NAV_LINKS, serviceSlugs (FIXED)
- Unused import ArrowRight (FIXED)

### Remaining Code Issues (Low Priority)
- `hexToRgb` in comparison-bento.tsx lacks input validation
- `MobileStickyCta` component exists but is never rendered (dead file)
- API route at `/api/contact` still has TODO for email integration

---

## PART 6: BUSINESS STRATEGY — Selling Websites to Norwegian Businesses

### Launch Day Checklist
1. Deploy to Vercel (connect idweb.no domain)
2. Set up SSL (Vercel handles this automatically)
3. Register Google Search Console + submit sitemap
4. Create Google Business Profile (name: "IDweb", category: "Web designer")
5. Set up Google Analytics 4 or Plausible Analytics
6. Test all forms work (Formspree submissions arrive)
7. Test site speed on PageSpeed Insights (target: 90+ on mobile)

### Immediate Revenue Actions (Week 1)
1. **Send your 50 leads** — personalized emails, not bulk. Reference their current website (or lack of one). Include your portfolio link and pricing.
2. **Google Business Profile** — this is free local SEO. Add photos, service descriptions, and ask your existing clients for Google reviews.
3. **LinkedIn profile** — create a professional LinkedIn page for IDweb. Post your portfolio projects. Connect with local business owners in Oslo.
4. **Finn.no tjenester** — list your services on Finn.no (Norways biggest marketplace). Many small businesses search there.

### Email Template Strategy for Cold Outreach

**Subject line ideas (Norwegian):**
- "Din nettside kan gi deg flere kunder"
- "Jeg har et forslag til [Bedriftsnavn]"
- "Rask forbedring av nettsiden til [Bedriftsnavn]"

**Email structure:**
1. Reference something specific about their business (shows you did research)
2. One problem you noticed with their current web presence
3. One specific thing you could improve
4. Link to a similar project in your portfolio
5. Clear CTA: "Skal vi ta en uforpliktende 15-minutters samtale?"

### Pricing Strategy Tips
- Your pricing (from kr 8,990) is competitive for the Norwegian market
- Emphasize the monthly maintenance as recurring revenue — this is where agency profits come from
- Offer a "nettside + 6 mnd vedlikehold" bundle at a slight discount
- Always frame pricing as investment, not cost: "En nettside som gir deg 2-3 nye kunder per maned"

### Lead Generation Channels (Ranked by ROI)

| Channel | Cost | Expected ROI | Time to Results |
|---------|------|-------------|-----------------|
| Google Business Profile | Free | Very High | 2-4 weeks |
| Cold email (your 50 leads) | Free | High | 1-2 weeks |
| LinkedIn content + networking | Free | High | 2-8 weeks |
| Finn.no tjenester listing | ~100-500 kr | Medium | 1-2 weeks |
| Google Ads (nettside oslo, etc.) | 50-200 kr/day | Medium-High | Immediate |
| Blog SEO (organic traffic) | Free (time) | Very High | 3-6 months |
| Facebook/Instagram ads | 50-150 kr/day | Medium | 1-4 weeks |
| Referral program (existing clients) | Free | Very High | Ongoing |

### Local SEO Strategy for Maximum Google Visibility
1. **City pages** — Create landing pages for "nettside [by]" (Oslo, Bergen, Trondheim, Stavanger). Even if you work remotely, these pages capture local search intent.
2. **Industry pages** — Create pages for "nettside for [bransje]" (restaurant, frisor, tannlege, advokat, renholdsbedrift). These are high-intent keywords.
3. **Google Business reviews** — Ask every satisfied client for a Google review. 5+ reviews with 4.5+ stars dramatically improves local ranking.
4. **NAP consistency** — Ensure Name, Address, Phone is identical everywhere: website, Google Business, Finn.no, LinkedIn, Eniro, Gule Sider.

### Content Marketing Plan
Write one blog post per week targeting:
- Week 1: "Hva koster en nettside i 2026? Komplett prisguide"
- Week 2: "10 tegn pa at bedriften din trenger ny nettside"
- Week 3: "WordPress vs. skreddersydd nettside: Hva passer for deg?"
- Week 4: "Lokal SEO-guide: Slik blir bedriften din synlig i Google"

### Norwegian Business-Specific Tips
- **ENK considerations**: As an ENK, you can deduct business expenses including software, hosting, courses. Track everything.
- **MVA threshold**: You're not required to register for MVA until kr 50,000 in revenue. Once you register, you can deduct MVA on expenses.
- **Contracts**: You have avtale-kontrakt.md and databehandleravtale.md in public/docs — make sure clients sign these before you start work.
- **Invoice apps**: Use Fiken, Tripletex, or Conta for invoicing. They handle Norwegian accounting requirements (SAF-T, etc.).
- **Business insurance**: Consider ansvarsforsikring (liability insurance) — some clients require it, and it protects you.

### Competitive Advantages to Emphasize
1. **Faste priser** — No hourly billing, clients know exactly what they pay
2. **Ingen bindingstid** — No lock-in, builds trust
3. **Norsk support** — You speak Norwegian, many agencies outsource to non-Norwegian speakers
4. **Rask levering** — Small company = no bureaucracy, faster turnaround
5. **Moderne teknologi** — Next.js, not WordPress. Faster, more secure, better SEO

---

## PART 7: FINAL PRE-DEPLOYMENT CHECKLIST

### Must-Do (Before Tomorrow)
- [ ] Register Google Search Console and add verification code
- [ ] Create Google Business Profile
- [ ] Set up analytics (GA4 or Plausible)
- [ ] Test contact form (submit a test and verify Formspree receives it)
- [ ] Test on mobile device (iPhone + Android if possible)
- [ ] Run PageSpeed Insights and fix any performance issues
- [ ] Verify all links work (no 404s) — use a link checker tool
- [ ] Test Open Graph previews (paste URL in LinkedIn/Facebook to preview)
- [ ] Verify DNS is configured for idweb.no pointing to Vercel

### Nice-to-Have (First Week)
- [ ] Add cookie consent banner
- [ ] Create social media profiles and add URLs to JSON-LD sameAs
- [ ] Ask existing clients for Google reviews
- [ ] Send first batch of cold emails to leads
- [ ] Set up email with Resend for the contact form API route
- [ ] Consider adding MobileStickyCta component (it's built but not rendered)
- [ ] Add city-specific landing pages for SEO
