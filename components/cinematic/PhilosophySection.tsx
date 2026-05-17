"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * 01 · Origin — the philosophy passage.
 * Editorial. No icons. No cards. Just typography and breathing room.
 */
export function PhilosophySection() {
  return (
    <section className="relative bg-noir py-32 text-cream md:py-44">
      <div className="container">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <span className="chapter-num">01</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="eyebrow">Une origine</span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              whileInView={{ opacity: 0.7, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 hidden md:block"
            >
              <BrandMark
                variant="seal"
                tone="bronze"
                className="h-44 w-44 opacity-60"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 md:col-span-8"
          >
            <p className="display-serif text-editorial text-cream">
              À trente minutes de Constantine, là où la route nationale
              s'arrête de compter les kilomètres, nous gardons{" "}
              <em className="text-bronze">vingt-cinq hectares</em>{" "}
              de vergers, d'écuries et de ciel.
            </p>

            <div className="grid gap-8 border-t border-bronze/20 pt-10 md:grid-cols-2">
              <div className="space-y-3">
                <span className="eyebrow">Une promesse</span>
                <p className="text-base leading-relaxed text-cream/70">
                  Une chambre lente. Un cheval qu'on selle au lever du soleil.
                  Une table où les figues viennent de l'arbre d'à côté. Un
                  rucher visité par notre apiculteur, qui parle aux abeilles
                  comme on parle aux invités.
                </p>
              </div>
              <div className="space-y-3">
                <span className="eyebrow">Une saison</span>
                <p className="text-base leading-relaxed text-cream/70">
                  Le complexe vit toute l'année. L'été appartient aux familles
                  et à la piscine&nbsp;; l'automne aux promeneurs et aux
                  cavaliers&nbsp;; l'hiver aux feux de bois et aux retraites
                  silencieuses.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
