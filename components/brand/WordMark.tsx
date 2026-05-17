import { BrandMark } from "./BrandMark";
import { cn } from "@/lib/utils";

/**
 * WordMark — typographic logo treatment. Pairs the abstracted star mark with
 * an editorial serif rendering of the brand name. Used in the header and
 * footer in place of an image-based logo, until the owner provides a true
 * vector logo file.
 */
export function WordMark({
  className,
  tone = "cream",
  size = "default",
}: {
  className?: string;
  tone?: "cream" | "noir" | "bronze";
  size?: "default" | "sm" | "lg";
}) {
  const textTone =
    tone === "cream"
      ? "text-cream"
      : tone === "noir"
        ? "text-noir"
        : "text-bronze";

  const sizes = {
    sm: { gap: "gap-2", mark: "h-4 w-4", text: "text-[0.95rem]" },
    default: { gap: "gap-2.5", mark: "h-5 w-5", text: "text-[1.1rem]" },
    lg: { gap: "gap-3", mark: "h-7 w-7", text: "text-[1.5rem]" },
  };
  const s = sizes[size];

  return (
    <div className={cn("inline-flex items-center", s.gap, className)}>
      <BrandMark variant="mark" tone={tone} className={s.mark} />
      <span
        className={cn(
          "font-serif font-light tracking-tight leading-none",
          s.text,
          textTone,
        )}
      >
        L'Étoile <span className="opacity-60">·</span> de l'Est
      </span>
    </div>
  );
}
