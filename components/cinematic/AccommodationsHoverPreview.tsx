"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import { useState } from "react";
import { mockAccommodations } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/domain";

/**
 * 02 · Les maisons — hover-driven preview list (desktop).
 *
 * Modern editorial pattern: a list of four accommodation names on the left,
 * a single shared preview panel on the right. Hovering an item morphs the
 * preview with a cross-fade. Mobile falls back to stacked cards.
 *
 * The list is the editorial spine. The preview is the show.
 */

const VARIANTS: Record<string, string> = {
  "acc-1": "photo-zone photo-zone--orchard",
  "acc-2": "photo-zone",
  "acc-3": "photo-zone photo-zone--equestrian",
  "acc-4": "photo-zone photo-zone--equestrian",
};

const PLATES = ["I", "II", "III", "IV"];

const FAMILY_FRAMING: Record<Locale, string[]> = {
  fr: [
    "Pour les familles qui veulent leur cuisine.",
    "Pour les grands anniversaires, les retrouvailles, les noces.",
    "Pour les groupes d'amis qui ne dorment jamais à la même heure.",
    "Pour les week-ends à deux quand les enfants restent chez grand-mère.",
  ],
  en: [
    "For families who want their own kitchen.",
    "For big birthdays, reunions, weddings.",
    "For friends who never go to bed at the same time.",
    "For the two of you, when the children are with grandma.",
  ],
  ar: [
    "للعائلات التي تريد مطبخها الخاص.",
    "لأعياد الميلاد الكبيرة، اللقاءات، الأعراس.",
    "لمجموعات الأصدقاء التي لا تنام في الوقت نفسه.",
    "لعطلات نهاية الأسبوع عندما يبقى الأطفال عند الجدّة.",
  ],
};

const CAPACITY_LABEL: Record<Locale, string> = {
  fr: "personnes",
  en: "guests",
  ar: "أشخاص",
};

export function AccommodationsHoverPreview({ locale }: { locale: Locale }) {
  const items = mockAccommodations;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];
  const activeName = locale === "ar" ? active.name_ar : active.name_fr;

  return (
    <section
      id="chapter-02"
      className="relative bg-sunlit-noon py-28 text-terracotta md:py-40"
    >
      {/* Sun glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 200, 130, 0.15), transparent 60%)",
        }}
      />

      <div className="container relative">
        <div className="mb-20 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-clay-700">
                02
              </span>
              <span className="h-px w-12 bg-clay-500/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-clay-700">
                Les maisons
              </span>
            </div>
            <RevealText
              as="h2"
              className="display-serif text-terracotta"
              stagger={0.06}
            >
              <span
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                  lineHeight: "0.95",
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  display: "block",
                }}
              >
                Quatre maisons
                <span className="block italic text-clay-600">
                  pour vos tribus.
                </span>
              </span>
            </RevealText>
          </div>
          <div className="text-terracotta/70 md:col-span-5 md:text-end">
            <p className="max-w-md md:ms-auto">
              Du chalet familial à la tente berbère, du dôme sous les étoiles
              au cottage à deux — chaque maison a été pensée pour une tribu,
              une saison, une occasion.
            </p>
          </div>
        </div>

        {/* DESKTOP : list + shared preview */}
        <div className="hidden gap-x-12 md:grid md:grid-cols-12">
          {/* List */}
          <ol className="md:col-span-6">
            {items.map((item, idx) => {
              const name = locale === "ar" ? item.name_ar : item.name_fr;
              const isActive = idx === activeIdx;
              return (
                <li
                  key={item.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  className={cn(
                    "group/row relative border-b border-clay-500/25 transition",
                    isActive ? "bg-clay-500/[0.07]" : "bg-transparent",
                  )}
                >
                  <Link
                    href={`/${locale}/hebergement/${item.slug}`}
                    className="flex items-start gap-6 py-8 outline-none"
                  >
                    {/* Plate */}
                    <div className="flex w-8 shrink-0 flex-col items-center pt-2 text-[10px] uppercase tracking-[0.22em] text-clay-600/70">
                      <span>{PLATES[idx]}</span>
                    </div>

                    {/* Name + meta */}
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-serif font-light leading-[0.95] tracking-tight transition-colors duration-500",
                          isActive ? "text-clay-700" : "text-terracotta/85 group-hover/row:text-clay-700",
                        )}
                        style={{
                          fontSize: "clamp(2rem, 4vw, 3.25rem)",
                        }}
                      >
                        {name}
                      </h3>
                      <p className="mt-3 max-w-md italic text-terracotta/65">
                        {FAMILY_FRAMING[locale][idx]}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.22em] text-clay-700/80">
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3 w-3 text-bronze" />
                          {item.capacity} {CAPACITY_LABEL[locale]}
                        </span>
                        <span className="text-terracotta/30">·</span>
                        <span className="font-mono">
                          {formatCurrency(item.price_weekday, locale)} / nuit
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-all duration-500",
                        isActive
                          ? "translate-x-1 -translate-y-1 text-bronze opacity-100"
                          : "text-clay-500/0 opacity-0",
                        "rtl:scale-x-[-1]",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Shared preview */}
          <div className="md:col-span-6">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "absolute inset-0",
                      VARIANTS[active.id] ?? "photo-zone",
                    )}
                  />
                </AnimatePresence>
                {/* Plate overlay */}
                <span className="absolute end-5 top-5 z-10 font-serif text-3xl font-light italic text-bronze">
                  {PLATES[activeIdx]}
                </span>
                {/* Bottom gradient + caption */}
                <div
                  className="absolute inset-x-0 bottom-0 z-0 h-2/3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(40, 22, 14, 0.95) 0%, rgba(40, 22, 14, 0.5) 45%, transparent 100%)",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caption-${active.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-x-0 bottom-0 z-10 p-7"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-bronze">
                      {active.type === "chalet"
                        ? "Chalet"
                        : active.type === "tent"
                          ? "Tente berbère"
                          : "Glamping"}
                    </div>
                    <div className="mt-2 font-serif text-xl font-light leading-tight text-cream md:text-2xl">
                      {activeName}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE : stacked cards */}
        <div className="grid gap-10 md:hidden">
          {items.map((item, idx) => {
            const name = locale === "ar" ? item.name_ar : item.name_fr;
            return (
              <Link
                key={item.id}
                href={`/${locale}/hebergement/${item.slug}`}
                className="block"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm ${VARIANTS[item.id]}`}
                >
                  <span className="absolute end-4 top-4 z-10 font-serif text-2xl font-light italic text-bronze">
                    {PLATES[idx]}
                  </span>
                  <div
                    className="absolute inset-x-0 bottom-0 z-0 h-2/3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(40, 22, 14, 0.95) 0%, rgba(40, 22, 14, 0.55) 45%, transparent 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-bronze">
                      {item.type === "chalet"
                        ? "Chalet"
                        : item.type === "tent"
                          ? "Tente berbère"
                          : "Glamping"}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl font-light text-cream">
                      {name}
                    </h3>
                    <p className="mt-2 italic text-cream/80">
                      {FAMILY_FRAMING[locale][idx]}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-bronze/85">
                      <Users className="h-3 w-3" />
                      {item.capacity} {CAPACITY_LABEL[locale]}
                      <span className="text-cream/30">·</span>
                      <span className="font-mono">
                        {formatCurrency(item.price_weekday, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col items-center gap-4">
          <Link
            href={`/${locale}/hebergement`}
            className="group inline-flex items-center gap-3 border-b border-clay-600 pb-1 text-[11px] uppercase tracking-[0.22em] text-clay-700 transition-colors hover:text-terracotta"
          >
            <span>Voir toutes les maisons</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-180" />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta/50">
            106 lits · Familles de 2 à 12 personnes
          </p>
        </div>
      </div>
    </section>
  );
}
