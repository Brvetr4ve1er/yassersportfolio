"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/components/i18n/I18nProvider";
import { toast } from "@/components/ui/use-toast";

export default function AdminNotifications() {
  const { t } = useI18n();
  const [segment, setSegment] = useState("all");
  const [channel, setChannel] = useState("push");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 500));
    setSending(false);
    setMessage("");
    toast({
      title: "Message envoyé",
      description: `${channel} → ${segment}`,
      variant: "success" as never,
    });
  };

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">
        {t("admin.notifications.title")}
      </h1>
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("admin.notifications.segment")}</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  <SelectItem value="stayed-6mo">Séjour dans les 6 mois</SelectItem>
                  <SelectItem value="active-activity">Activité réservée</SelectItem>
                  <SelectItem value="tier-gold">Niveau Or</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{t("admin.notifications.channel")}</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="push">{t("admin.notifications.channels.push")}</SelectItem>
                  <SelectItem value="whatsapp">{t("admin.notifications.channels.whatsapp")}</SelectItem>
                  <SelectItem value="sms">{t("admin.notifications.channels.sms")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("admin.notifications.message")}</Label>
            <Textarea
              rows={5}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Offre week-end : -20% sur tous les chalets…"
            />
          </div>
          <Button variant="gold" onClick={handleSend} disabled={!message || sending}>
            <Send className="h-4 w-4" />
            {t("admin.notifications.send")}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
