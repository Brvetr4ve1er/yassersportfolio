import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "lagoon" | "coral" | "palm" | "neutral";

const TONE_CHIP: Record<Tone, string> = {
  lagoon: "bg-lagoon-500/12 text-lagoon-700",
  coral: "bg-coral/12 text-coral-dark",
  palm: "bg-palm-400/15 text-palm-700",
  neutral: "bg-muted text-ink-soft",
};

export type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "lagoon",
}: StatCardProps) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              {label}
            </p>
            <p className="stat-number mt-2 break-words leading-none text-foreground">
              {value}
            </p>
            {hint ? (
              <p className="mt-2 text-xs text-ink-muted">{hint}</p>
            ) : null}
          </div>
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              TONE_CHIP[tone],
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
