import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ArrowCircle — the circular ↗ affordance from the reference decks
 * ("Talk to us" / "Узнать больше" / card corner arrows). A bordered
 * round button with an arrow that nudges on hover. Pairs with the
 * `group` class on a parent link.
 *
 * Render as a standalone element inside an <a>/<button>; it does not
 * own the link itself, so it composes with MagneticButton / Link.
 */
export function ArrowCircle({
  size = "md",
  tone = "bronze",
  className,
}: {
  size?: "sm" | "md" | "lg";
  tone?: "bronze" | "cream" | "terracotta";
  className?: string;
}) {
  const dims = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  }[size];
  const icon = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];
  const toneClass =
    tone === "cream"
      ? "border-cream/40 text-cream group-hover:bg-cream group-hover:text-terracotta"
      : tone === "terracotta"
        ? "border-terracotta/40 text-terracotta group-hover:bg-terracotta group-hover:text-cream"
        : "border-bronze/50 text-bronze group-hover:bg-bronze group-hover:text-terracotta";

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        dims,
        toneClass,
        className,
      )}
    >
      <ArrowUpRight
        className={cn(
          icon,
          "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]",
        )}
      />
    </span>
  );
}
