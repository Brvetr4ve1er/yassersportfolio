import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoyaltyTier } from "@/types/domain";

const STYLES: Record<LoyaltyTier, string> = {
  bronze: "bg-amber-700/10 text-amber-700 border-amber-700/30",
  silver: "bg-zinc-400/10 text-zinc-500 border-zinc-400/40",
  gold: "bg-gold/10 text-gold-700 border-gold/40",
};

const STARS: Record<LoyaltyTier, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
};

export function TierBadge({ tier }: { tier: LoyaltyTier }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase",
        STYLES[tier],
      )}
    >
      {Array.from({ length: STARS[tier] }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
      {tier}
    </span>
  );
}
