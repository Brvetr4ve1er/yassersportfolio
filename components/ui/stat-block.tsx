import { cn } from "@/lib/utils";

/**
 * StatBlock — the large-number-with-label treatment from the reference
 * decks (">4 million", "75%", "227 thousand dollars", "10 ans / sur le
 * marché"). Optional progress bar for proportional stats.
 *
 * Tones:
 *  - "dark"   : cream number on terracotta passages
 *  - "light"  : terracotta number on sunlit passages
 *  - "bronze" : bronze number (accent)
 */
export function StatBlock({
  value,
  label,
  sublabel,
  progress,
  tone = "dark",
  align = "start",
  className,
}: {
  value: string;
  label: string;
  sublabel?: string;
  /** 0-100, renders a progress bar under the number when provided */
  progress?: number;
  tone?: "dark" | "light" | "bronze";
  align?: "start" | "center";
  className?: string;
}) {
  const numberColor =
    tone === "light"
      ? "text-terracotta"
      : tone === "bronze"
        ? "text-bronze"
        : "text-cream";
  const labelColor =
    tone === "light" ? "text-clay-700" : "text-bronze";
  const subColor =
    tone === "light" ? "text-terracotta/50" : "text-cream/45";
  const trackColor = tone === "light" ? "bg-clay-500/20" : "bg-cream/15";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <div className={cn("stat-number", numberColor)}>{value}</div>
      {typeof progress === "number" && (
        <div className={cn("mt-3 h-1 w-full overflow-hidden rounded-full", trackColor)}>
          <div
            className="h-full rounded-full bg-bronze transition-[width] duration-700"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
      <div className={cn("mt-2 text-eyebrow uppercase", labelColor)}>{label}</div>
      {sublabel && (
        <div className={cn("mt-1 text-[11px]", subColor)}>{sublabel}</div>
      )}
    </div>
  );
}
