"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "split";
  className?: string;
  id?: string;
};

/**
 * Chapter — the editorial section primitive.
 * Provides consistent rhythm: chapter number, eyebrow, large display title,
 * optional lede, then content body. Used to pace the homepage like a film.
 */
export function Chapter({
  number,
  eyebrow,
  title,
  lede,
  children,
  align = "left",
  className,
  id,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        className,
      )}
    >
      <div className="container">
        <div
          className={cn(
            "grid gap-y-10",
            align === "split" && "md:grid-cols-12 md:gap-x-12",
          )}
        >
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              align === "split" ? "md:col-span-5" : "max-w-4xl",
              "space-y-6",
            )}
          >
            <div className="flex items-center gap-4">
              <span className="chapter-num">{number}</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="eyebrow">{eyebrow}</span>
            </div>

            <h2 className="display-serif text-cinema text-cream">
              {title}
            </h2>

            {lede && (
              <p className="max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
                {lede}
              </p>
            )}
          </motion.header>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className={cn(align === "split" && "md:col-span-7")}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
