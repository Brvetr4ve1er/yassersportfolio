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
  strength?: number;
  radius?: number;
  style?: CSSProperties;
  ariaLabel?: string;
};

/**
 * MagneticButton — cursor-attraction with spring return-to-center + inner
 * parallax. Skipped on touch and reduced-motion. Works as link or button.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
  radius = 110,
  style,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.6 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.6 });
  const six = useSpring(ix, { damping: 22, stiffness: 240, mass: 0.55 });
  const siy = useSpring(iy, { damping: 22, stiffness: 240, mass: 0.55 });

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0); y.set(0); ix.set(0); iy.set(0);
      return;
    }
    const f = 1 - dist / radius;
    x.set(dx * strength * f);
    y.set(dy * strength * f);
    ix.set(dx * strength * f * 0.4);
    iy.set(dy * strength * f * 0.4);
  };
  const leave = () => { x.set(0); y.set(0); ix.set(0); iy.set(0); };

  const inner = (
    <motion.span style={{ x: six, y: siy, display: "inline-flex" }} className="items-center">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ x: sx, y: sy, ...style }}
        aria-label={ariaLabel}
        className={cn("inline-flex", className)}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x: sx, y: sy, ...style }}
      aria-label={ariaLabel}
      className={cn("inline-flex", className)}
    >
      {inner}
    </motion.button>
  );
}
