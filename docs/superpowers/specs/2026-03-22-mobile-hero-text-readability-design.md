# Mobile Hero Text Readability — Design Spec

## Problem

White text (`#F1F5F9` / `white`) on the mobile hero section is hard to read over the WebGL mesh gradient background. The gradient blends dark navy with bright gold, and the gold-heavy areas wash out the white text. The background should remain untouched.

## Solution

Add multi-layer dark text-shadow stacks to all text elements in the mobile hero. No overlays, no color changes, no background modifications.

## Changes

All changes are scoped to the mobile hero (`max-width: 1023px`) in `src/app/globals.css`.

### Headline (`.hero-shimmer` at `max-width: 1023px`)

**Before:**
```css
text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(244, 206, 20, 0.15);
```

**After:**
```css
text-shadow:
  0 1px 2px rgba(0, 0, 0, 1),
  0 2px 8px rgba(0, 0, 0, 0.9),
  0 4px 20px rgba(0, 0, 0, 0.7),
  0 0 60px rgba(0, 0, 0, 0.4);
```

4-layer shadow stack. The gold glow is removed — it was subtly tinting the shadow and reducing perceived whiteness.

### Eyebrow (`hero-entrance-eyebrow`)

**Before:** No text-shadow.

**After:**
```css
text-shadow:
  0 1px 2px rgba(0, 0, 0, 0.9),
  0 2px 10px rgba(0, 0, 0, 0.7),
  0 0 30px rgba(0, 0, 0, 0.4);
```

### Subheadline (`hero-entrance-sub`)

**Before:** No text-shadow.

**After:**
```css
text-shadow:
  0 1px 2px rgba(0, 0, 0, 0.9),
  0 2px 10px rgba(0, 0, 0, 0.7),
  0 0 30px rgba(0, 0, 0, 0.4);
```

## What does NOT change

- Text colors: headline stays `#F1F5F9`, eyebrow stays `white`, subheadline stays `white`
- Background: WebGL mesh gradient, noise overlay, SVG lines — all untouched
- Animations: entrance stagger, parallax, shimmer — all untouched
- Desktop hero: no changes (desktop uses Spline 3D, different text treatment)
- CTA buttons: rainbow buttons unchanged
- `prefers-reduced-motion`: the new text shadows are static visual properties, not animations — they remain active under reduced-motion preferences. Only entrance animations are suppressed.

## Files modified

- `src/app/globals.css` — update `.hero-shimmer` mobile media query, add shadow rules for `.hero-entrance-eyebrow` and `.hero-entrance-sub` (scoped to `max-width: 1023px`)

## Testing

- Verify on mobile viewport (375px) that all text is clearly legible over every region of the animated gradient
- Verify text colors remain visually identical to current (no dimming from shadows)
- Verify desktop hero is unaffected
- Verify `prefers-reduced-motion` still works correctly
