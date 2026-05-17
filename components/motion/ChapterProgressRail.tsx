"use client";

import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Chapter = {
  id: string;
  num: string;
  label: string;
};

type Props = {
  chapters: Chapter[];
  className?: string;
};

/**
 * ChapterProgressRail — fixed right-rail navigator for the cinematic
 * homepage. Tracks which chapter is in viewport, lets the reader jump.
 *
 *  - Vertical dot column on the right edge
 *  - Active dot expands and fills bronze
 *  - Chapter label slides in from the right on hover
 *  - Click scrolls the page to the chapter using Lenis (smooth)
 *  - Hidden under md breakpoint
 */
export function ChapterProgressRail({ chapters, className }: Props) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      },
    );

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className={cn(
        "pointer-events-none fixed end-5 top-1/2 z-40 hidden -translate-y-1/2 md:block",
        className,
      )}
    >
      <ol className="pointer-events-auto flex flex-col gap-3">
        {chapters.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id} className="group/item relative">
              <button
                type="button"
                onClick={() => handleJump(c.id)}
                className="flex items-center gap-3 outline-none focus-visible:outline-1 focus-visible:outline-bronze"
                aria-label={`Jump to chapter ${c.num} — ${c.label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Sliding label, visible on active or hover */}
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 12,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none flex items-center gap-2 whitespace-nowrap rounded-full bg-terracotta/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-bronze backdrop-blur group-hover/item:opacity-100"
                >
                  <span className="font-mono text-cream/55">{c.num}</span>
                  <span>{c.label}</span>
                </motion.span>

                {/* The dot */}
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.55,
                    backgroundColor: isActive
                      ? "rgba(201, 163, 91, 1)"
                      : "rgba(241, 233, 214, 0.35)",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "block h-2 w-2 rounded-full",
                    isActive && "shadow-[0_0_0_4px_rgba(201,163,91,0.18)]",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
