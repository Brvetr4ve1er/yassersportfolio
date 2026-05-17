"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/i18n/format";
import type { Locale } from "@/types/domain";

export function StarCounter({ value, locale }: { value: number; locale: Locale }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplay(Math.round(value * eased));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ rotate: -30, scale: 0.5 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-full bg-gold/10 p-3 text-gold"
      >
        <Star className="h-7 w-7 fill-current" />
      </motion.div>
      <div>
        <div className="font-serif text-4xl font-semibold text-forest">
          {formatNumber(display, locale)}
        </div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          étoiles
        </div>
      </div>
    </div>
  );
}
