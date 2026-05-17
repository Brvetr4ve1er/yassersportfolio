"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  /** Loop duration in seconds. Larger = slower. */
  duration?: number;
  /** Direction of travel. */
  direction?: "left" | "right";
  /** Separator character between items. */
  separator?: string;
  className?: string;
  /** Tone variant. */
  tone?: "bronze" | "cream" | "terracotta";
};

/**
 * Marquee — infinite scrolling text strip.
 *
 * Renders two copies of the item list and animates the wrapper by -50%
 * (or +50%) so the seam between copies is invisible. Pauses on hover.
 * Respects prefers-reduced-motion.
 */
export function Marquee({
  items,
  duration = 45,
  direction = "left",
  separator = "✦",
  className,
  tone = "bronze",
}: Props) {
  const reduce = useReducedMotion();

  const toneClass =
    tone === "bronze"
      ? "text-bronze"
      : tone === "cream"
        ? "text-cream"
        : "text-terracotta";
  const sepClass =
    tone === "bronze"
      ? "text-bronze/40"
      : tone === "cream"
        ? "text-cream/40"
        : "text-terracotta/40";

  const renderRow = () => (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((item, i) => (
        <Fragment key={i}>
          <span
            className={cn(
              "whitespace-nowrap text-[11px] uppercase tracking-[0.32em] md:text-[13px]",
              toneClass,
            )}
          >
            {item}
          </span>
          <span className={cn("text-base", sepClass)} aria-hidden>
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden py-6",
        className,
      )}
      aria-label={`Marquee: ${items.join(", ")}`}
    >
      <motion.div
        className="flex"
        animate={
          reduce
            ? undefined
            : direction === "left"
              ? { x: ["0%", "-50%"] }
              : { x: ["-50%", "0%"] }
        }
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={reduce ? { transform: "translateX(0)" } : undefined}
      >
        {renderRow()}
        {renderRow()}
      </motion.div>
    </div>
  );
}
