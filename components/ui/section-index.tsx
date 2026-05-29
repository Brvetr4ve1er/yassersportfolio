import { cn } from "@/lib/utils";

/**
 * SectionIndex — the chapter prelude row: a number, a hairline, an eyebrow
 * label. Distilled from the reference decks (Emerald's 01-07, GreenSpace's
 * 1-4). Replaces the ad-hoc "chapter-num + line + eyebrow" markup repeated
 * across every cinematic section.
 *
 * `ghost` renders the number large and faded as a background-style index
 * (the GreenSpace treatment); default renders it inline and compact.
 */
export function SectionIndex({
  index,
  label,
  tone = "light",
  className,
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const numberColor = tone === "dark" ? "text-bronze/70" : "text-clay-700";
  const lineColor = tone === "dark" ? "bg-bronze/40" : "bg-clay-500/40";
  const labelColor = tone === "dark" ? "text-bronze" : "text-clay-700";

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className={cn("font-mono text-eyebrow uppercase", numberColor)}>
        {index}
      </span>
      <span className={cn("h-px w-12", lineColor)} />
      <span className={cn("text-eyebrow uppercase", labelColor)}>{label}</span>
    </div>
  );
}
