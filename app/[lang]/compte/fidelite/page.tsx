import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StarCounter } from "@/components/loyalty/StarCounter";
import { TierBadge } from "@/components/loyalty/TierBadge";
import { mockUser } from "@/lib/data/mock";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

export default async function LoyaltyPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["account"])) as {
    account: {
      account: {
        loyalty: {
          title: string;
          balance: string;
          tier: string;
          nextTier: string;
          rewards: string;
          rewardsList: Array<{ cost: number; label: string }>;
          tiers: { bronze: string; silver: string; gold: string };
        };
      };
    };
  };
  const l = dict.account.account.loyalty;
  const nextThreshold = mockUser.tier === "bronze" ? 1000 : mockUser.tier === "silver" ? 5000 : 5000;
  const progress = Math.min(100, (mockUser.loyalty_points / nextThreshold) * 100);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold text-forest">{l.title}</h1>
        <TierBadge tier={mockUser.tier} />
      </header>

      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <StarCounter value={mockUser.loyalty_points} locale={params.lang} />
          {mockUser.tier !== "gold" && (
            <>
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground">
                {l.nextTier.replace(
                  "{{points}}",
                  String(nextThreshold - mockUser.loyalty_points),
                )}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 font-serif text-xl font-semibold text-forest">{l.rewards}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {l.rewardsList.map((r) => {
            const unlocked = mockUser.loyalty_points >= r.cost;
            return (
              <Card key={r.cost} className={unlocked ? "border-gold/40 bg-gold/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-mono text-sm font-semibold">{r.cost}</span>
                  </div>
                  <p className="mt-2 text-sm">{r.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card>
        <CardContent className="space-y-2 p-5 text-sm">
          <div className="font-serif text-base font-semibold text-forest">Niveaux</div>
          <p>{l.tiers.bronze}</p>
          <p>{l.tiers.silver}</p>
          <p>{l.tiers.gold}</p>
          <p className="text-xs text-muted-foreground">
            Gain : 1 point pour {formatCurrency(100, params.lang)} dépensés.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
