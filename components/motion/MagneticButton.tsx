"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /**
   * How strongly the button is pulled toward the cursor.
   * 0.25 = subtle (default), 0.5 = aggressive.
   */
  strength?: number;
  /**
   * Radius in pixels around the button where the magnetic pull engages.
   * Inside this distance, the button translates toward the cursor.
   */
  radius?: number;
  asChild?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

/**
 * MagneticButton — premium tactile feedback.
 *
 * The button translates toward the cursor when it enters a radius around
 * the element, using a spring physics return-to-center. The inner content
 * counter-moves slightly so the text feels heavier than the shell — a
 * subtle parallax depth.
 *
 * Skipped on touch devices and when prefers-reduced-motion is set.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
  radius = 110,
  asChild = false,
  style,
  type = "button",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.6 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.6 });
  const sInnerX = useSpring(innerX, { damping: 22, stiffness: 240, mass: 0.55 });
  const sInnerY = useSpring(innerY, { damping: 22, stiffness: 240, mass: 0.55 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      innerX.set(0);
      innerY.set(0);
      return;
    }
    const factor = 1 - dist / radius;
    x.set(dx * strength * factor);
    y.set(dy * strength * factor);
    innerX.set(dx * strength * factor * 0.4);
    innerY.set(dy * strength * factor * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handleLeave}
        style={{ x: sx, y: sy, ...style }}
        aria-label={ariaLabel}
        className={cn("inline-block", className)}
      >
        <motion.span
          style={{ x: sInnerX, y: sInnerY, display: "inline-flex" }}
          className="items-center"
        >
          {children}
        </motion.span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy, ...style }}
      aria-label={ariaLabel}
      className={cn("inline-flex", className)}
    >
      <motion.span
        style={{ x: sInnerX, y: sInnerY, display: "inline-flex" }}
        className="items-center"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
