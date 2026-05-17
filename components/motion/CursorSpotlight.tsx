"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** CSS color (or rgba string) of the spotlight glow. */
  color?: string;
  /** Glow radius in px. */
  size?: number;
  /** Blend mode for the glow. Default "screen" brightens dark backgrounds. */
  blend?: "screen" | "soft-light" | "overlay" | "normal";
};

/**
 * CursorSpotlight — soft warm glow that follows the cursor within a section.
 *
 * Used on dark/terracotta passages to add interactive depth. The glow uses
 * mix-blend-mode: screen to brighten whatever is underneath without
 * obscuring it. Skipped on touch devices and when reduced motion is on.
 */
export function CursorSpotlight({
  children,
  className,
  color = "rgba(201, 163, 91, 0.30)",
  size = 460,
  blend = "screen",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const x = useSpring(mouseX, { damping: 28, stiffness: 240, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 240, mass: 0.5 });

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 65%)`;

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const onLeave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mouseX, mouseY, reduce]);

  return (
    <div ref={containerRef} className={cn("relative isolate", className)}>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
          style={{ background, mixBlendMode: blend }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
