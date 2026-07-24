"use client";

import { useState } from "react";
import { Send, CheckCircle2, Bell } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    segment: string;
    channel: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
    sentDetail: (seg: string, ch: string) => string;
    reset: string;
    segments: { all: string; recent: string; cabana: string; gold: string };
    channels: { push: string; whatsapp: string; sms: string };
    preview: string;
    charCount: (n: number) => string;
  }
> = {
  fr: {
    title: "Notifications",
    subtitle: "Envoyez un message ciblé à vos clients",
    segment: "Segment",
    channel: "Canal",
    message: "Message",
    messagePlaceholder: "Rédigez votre message…",
    send: "Envoyer",
    sent: "Message envoyé",
    sentDetail: (seg, ch) => `Envoyé au segment « ${seg} » via ${ch}.`,
    reset: "Nouveau message",
    segments: {
      all: "Tous",
      recent: "Clients récents",
      cabana: "Cabana",
      gold: "Or",
    },
    channels: { push: "Push", whatsapp: "WhatsApp", sms: "SMS" },
    preview: "Aperçu",
    charCount: (n) => `${n} caractères`,
  },
  en: {
    title: "Notifications",
    subtitle: "Send a targeted message to your customers",
    segment: "Segment",
    channel: "Channel",
    message: "Message",
    messagePlaceholder: "Write your message…",
    send: "Send",
    sent: "Message sent",
    sentDetail: (seg, ch) => `Sent to the "${seg}" segment via ${ch}.`,
    reset: "New message",
    segments: {
      all: "Everyone",
      recent: "Recent customers",
      cabana: "Cabana",
      gold: "Gold",
    },
    channels: { push: "Push", whatsapp: "WhatsApp", sms: "SMS" },
    preview: "Preview",
    charCount: (n) => `${n} characters`,
  },
  ar: {
    title: "الإشعارات",
    subtitle: "أرسل رسالة موجَّهة إلى عملائك",
    segment: "الشريحة",
    channel: "القناة",
    message: "الرسالة",
    messagePlaceholder: "اكتب رسالتك…",
    send: "إرسال",
    sent: "تم إرسال الرسالة",
    sentDetail: (seg, ch) => `أُرسلت إلى شريحة «${seg}» عبر ${ch}.`,
    reset: "رسالة جديدة",
    segments: {
      all: "الجميع",
      recent: "العملاء الجدد",
      cabana: "كابانا",
      gold: "ذهبي",
    },
    channels: { push: "Push", whatsapp: "WhatsApp", sms: "SMS" },
    preview: "معاينة",
    charCount: (n) => `${n} حرفًا`,
  },
};

type Segment = "all" | "recent" | "cabana" | "gold";
type Channel = "push" | "whatsapp" | "sms";

export default function AdminNotificationsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];

  const [segment, setSegment] = useState<Segment>("all");
  const [channel, setChannel] = useState<Channel>("push");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (message.trim().length === 0) return;
    setSent(true);
  }

  function reset() {
    setSent(false);
    setMessage("");
  }

  return (
    <div>
      <AdminPageHeader title={c.title} subtitle={c.subtitle} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-5 p-5">
            {sent ? (
              <div className="flex flex-col items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">
                      {c.sent}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {c.sentDetail(
                        c.segments[segment],
                        c.channels[channel],
                      )}
                    </p>
                  </div>
                </div>
                <Button type="button" variant="default" onClick={reset}>
                  {c.reset}
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>{c.segment}</Label>
                    <Select
                      value={segment}
                      onValueChange={(v) => setSegment(v as Segment)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{c.segments.all}</SelectItem>
                        <SelectItem value="recent">
                          {c.segments.recent}
                        </SelectItem>
                        <SelectItem value="cabana">
                          {c.segments.cabana}
                        </SelectItem>
                        <SelectItem value="gold">{c.segments.gold}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>{c.channel}</Label>
                    <Select
                      value={channel}
                      onValueChange={(v) => setChannel(v as Channel)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push">{c.channels.push}</SelectItem>
                        <SelectItem value="whatsapp">
                          {c.channels.whatsapp}
                        </SelectItem>
                        <SelectItem value="sms">{c.channels.sms}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notif-message">{c.message}</Label>
                  <Textarea
                    id="notif-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={c.messagePlaceholder}
                    className="min-h-[140px]"
                  />
                  <p className="text-xs text-ink-muted">
                    {c.charCount(message.trim().length)}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="coral"
                  onClick={handleSend}
                  disabled={message.trim().length === 0}
                >
                  <Send className="h-4 w-4" />
                  {c.send}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              {c.preview}
            </p>
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lagoon-500/12 text-lagoon-700">
                  <Bell className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Oxygen Island
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-ink-soft">
                    {message.trim().length > 0
                      ? message
                      : c.messagePlaceholder}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              {c.segments[segment]} · {c.channels[channel]}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
