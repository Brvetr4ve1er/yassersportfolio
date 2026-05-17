"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { galleryGroups } from "@/lib/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/domain";

const PLACEHOLDER = (n: number) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 ${n}'><rect width='200' height='${n}' fill='%230a1f0e'/><circle cx='100' cy='${Math.floor(n / 2)}' r='${Math.floor(n / 5)}' fill='%23b08d3e' opacity='0.4'/></svg>")`;

const HEIGHTS = [180, 240, 200, 280, 220, 260, 190, 250];

export function MasonryGallery({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(
    null,
  );

  return (
    <>
      <Tabs defaultValue={galleryGroups[0].key} className="w-full">
        <TabsList className="flex flex-wrap">
          {galleryGroups.map((g) => (
            <TabsTrigger key={g.key} value={g.key}>
              {locale === "ar" ? g.label_ar : g.label_fr}
            </TabsTrigger>
          ))}
        </TabsList>
        {galleryGroups.map((g) => (
          <TabsContent key={g.key} value={g.key}>
            <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
              {g.items.map((item, i) => {
                const alt = locale === "ar" ? item.alt_ar : item.alt_fr;
                const h = HEIGHTS[i % HEIGHTS.length];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive({ src: item.src, alt })}
                    className={cn(
                      "mb-3 block w-full overflow-hidden rounded-lg bg-forest transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold",
                    )}
                    style={{
                      height: `${h}px`,
                      backgroundImage: PLACEHOLDER(h),
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-label={alt}
                  />
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute end-4 top-4 rounded-full bg-parchment/10 p-2 text-parchment"
            onClick={() => setActive(null)}
            aria-label="close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="aspect-[4/3] w-full max-w-3xl rounded-xl"
            style={{
              backgroundImage: PLACEHOLDER(600),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      )}
    </>
  );
}
