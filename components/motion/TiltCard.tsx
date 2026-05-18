"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Maximum tilt in degrees on either axis. Modern Framer-style sites use
   * 4-7 degrees — beyond that it looks amateur. Default 5.
   */
  maxTilt?: number;
  /**
   * Scale applied while hovered. Adds a subtle "lift" feel. Default 1.025.
   */
  hoverScale?: number;
  /**
   * Translation in px on hover (lift effect). Default -4.
   */
  hoverLift?: number;
  /**
   * Whether children should inherit transformStyle preserve-3d so child
   * elements can use translateZ. Default true.
   */
  preserve3d?: boolean;
  style?: MotionStyle;
};

/**
 * TiltCard — premium tactile card behavior.
 *
 *  · 3D perspective tilt driven by cursor position
 *  · Scale + lift on hover (spring-easing, not linear)
 *  · Returns to rest with a damped spring when the cursor leaves
 *  · Respects prefers-reduced-motion (renders as plain div)
 *  · Skipped on touch (no hover events)
 *
 * Apply to any card-shaped content — accommodation cards, terroir plates,
 * activity tiles, family-day moments.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 5,
  hoverScale = 1.025,
  hoverLift = -4,
  preserve3d = true,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hovered = useMotionValue(0); // 0 → 1 on hover

  // Spring-damped follower for stability
  const sx = useSpring(mx, { damping: 22, stiffness: 200, mass: 0.4 });
  const sy = useSpring(my, { damping: 22, stiffness: 200, mass: 0.4 });
  const sHover = useSpring(hovered, { damping: 28, stiffness: 320 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const scale = useTransform(sHover, [0, 1], [1, hoverScale]);
  const y = useTransform(sHover, [0, 1], [0, hoverLift]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    hovered.set(1);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    hovered.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        y,
        transformPerspective: 1200,
        transformStyle: preserve3d ? "preserve-3d" : "flat",
        willChange: "transform",
        ...style,
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
