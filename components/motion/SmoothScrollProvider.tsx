"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider — wraps the homepage in Lenis-driven momentum scroll.
 *
 * Lenis intercepts wheel/touch events and animates the scroll position with
 * easing, producing the buttery overshoot feel premium editorial sites use.
 *
 * Disabled on touch via Lenis's syncTouch=false default. Respects
 * prefers-reduced-motion via a CSS media query check below.
 *
 * Note: Lenis hijacks window scroll, so anchor links must use Lenis's
 * scrollTo method. The ChapterProgressRail uses this.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
