/**
 * Shared motion vocabulary for the Monument redesign.
 * One easing, one timing scale — coherence beats variety.
 */
export const EASE = [0.16, 1, 0.3, 1] as const; // expo-out
export const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const VIEWPORT_ONCE = { once: true, margin: "-12% 0px" } as const;

/** Monument palette — paper, ink, yellow, void. */
export const PAPER = "#F3F0E7";
export const INK = "#141410";
export const YELLOW = "#F4CE14";
export const VOID = "#0D0D0B";
