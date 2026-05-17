import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { mockUser } from "@/lib/data/mock";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function ProfilePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["account"])) as {
    account: { account: { profile: Record<string, string> } };
  };
  const p = dict.account.account.profile;

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">{p.title}</h1>
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">{p.fullName}</Label>
            <Input id="fullName" defaultValue={mockUser.full_name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">{p.phone}</Label>
            <Input id="phone" defaultValue={mockUser.phone} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="email">{p.email}</Label>
            <Input id="email" type="email" defaultValue={mockUser.email ?? ""} />
          </div>
          <div className="sm:col-span-2">
            <Button variant="gold">{p.save}</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
