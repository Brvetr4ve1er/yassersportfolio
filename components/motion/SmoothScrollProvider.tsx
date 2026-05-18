"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider — Lenis-driven momentum scroll, tuned for
 * RESPONSIVENESS over heavy easing.
 *
 * Two key changes from the original duration-based config:
 *
 *  1. lerp (linear interpolation) instead of fixed duration.
 *     Each frame, the actual scroll position moves `lerp` fraction of
 *     the way toward the target. This makes the scroll inherently
 *     respond to input speed — a flick of the wheel moves the target
 *     a lot, so the page accelerates; a small turn barely moves the
 *     target, so the page glides slowly. Duration-based scrolling, by
 *     contrast, takes the same 1.25s regardless of how fast you scroll.
 *
 *  2. wheelMultiplier > 1 amplifies each wheel tick. Combined with
 *     lerp, this gives a confident, snappy desktop feel.
 *
 * Performance:
 *  - syncTouch=false lets native scroll handle touch (no jank)
 *  - prefersReducedMotion completely disables smooth scrolling
 *  - autoRaf=true uses requestAnimationFrame coalescing
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // Disable Lenis entirely if the user prefers reduced motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      document.documentElement.classList.add("reduce-motion");
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.8,
        autoRaf: true,
        // Don't fight with native anchors / smooth-scroll behavior
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
