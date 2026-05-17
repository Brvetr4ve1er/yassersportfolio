"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * 01 · The Manifesto — the centerpiece of the homepage.
 *
 * A single statement of welcome, rendered in French, English, and Arabic,
 * side by side. This is the most important section on the site: it tells
 * every visitor — French-speaking Algerian families, returning diaspora,
 * international tourists — that this place was built for them.
 *
 * Design: three columns on desktop, stacked on mobile. Each column reads
 * the same essay in a different language. The brand mark sits at the top
 * like a seal authenticating the welcome.
 */

const ESSAYS = [
  {
    code: "FR",
    lang: "fr",
    dir: "ltr" as const,
    title: "Une maison ouverte",
    eyebrow: "Maison ouverte · Depuis 1989",
    body: [
      "Au pied des hauteurs d'Ain Abid, L'Étoile de l'Est est ce qu'on appelle ici une maison ouverte — vingt-cinq hectares où trois générations se croisent sans se gêner.",
      "Les grands-parents s'installent à l'ombre des oliviers. Les enfants apprennent à seller un cheval pour la première fois. Les parents nagent à la piscine quand le soleil commence à incliner. Et tout le monde se retrouve à la même table, le soir, autour d'un couscous qui mijote depuis le matin.",
      "Ce n'est ni tout à fait un hôtel, ni tout à fait une ferme. C'est quelque chose entre les deux — plus ancien, plus chaud, plus algérien : une vieille maison de famille qu'on aurait simplement agrandie pour la vôtre.",
    ],
    signature: "Ouvert toute l'année",
  },
  {
    code: "EN",
    lang: "en",
    dir: "ltr" as const,
    title: "An open house",
    eyebrow: "Open house · Since 1989",
    body: [
      "Tucked into the hills above Ain Abid, half an hour from Constantine, L'Étoile de l'Est is what Algerians call a maison ouverte — an open house. Twenty-five hectares where three generations share the same day without crowding each other.",
      "Grandparents settle beneath the olive trees. Children saddle their first horse. Parents swim as the light starts to tilt. And in the evening, everyone meets again at the long table, around couscous that's been on the stove since dawn.",
      "It isn't quite a hotel. It isn't quite a farm. It's something older and warmer — an Algerian family seat, kept open for yours.",
    ],
    signature: "Open every day of the year",
  },
  {
    code: "AR",
    lang: "ar",
    dir: "rtl" as const,
    title: "بيتٌ مفتوح",
    eyebrow: "بيتٌ مفتوح · منذ 1989",
    body: [
      "على سفوح عين عبيد، على بُعد نصف ساعة من قسنطينة، نجمة الشرق ليست فندقًا ولا ضيعة — بل ما نسمّيه عندنا بيتًا مفتوحًا. خمسة وعشرون هكتارًا تتلاقى فيها ثلاثة أجيال دون أن يضيق أحدها بالآخر.",
      "الجدّات يجلسن تحت ظلال الزيتون. الأطفال يتعلّمون ركوب الخيل لأوّل مرة. الأهل يسبحون حين تميل الشمس. وفي المساء، يجتمع الجميع حول مائدة كسكسٍ ينضج منذ الفجر.",
      "ليست بيتًا غريبًا، ولا فندقًا باردًا. شيءٌ أقدم، أدفأ، وأقرب إلى الجزائر: بيتُ عائلةٍ قديم، أُبقي مفتوحًا لعائلتك.",
    ],
    signature: "مفتوح طوال أيام السنة",
  },
];

export function TrilingualManifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-sunlit-noon py-28 text-terracotta md:py-40"
    >
      {/* Sun glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245, 180, 100, 0.18), transparent 60%)",
        }}
      />

      <div className="container relative">
        {/* Heading: the chapter label + brand seal as authenticator */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandMark
              variant="seal"
              tone="noir"
              className="h-32 w-32 opacity-90"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-clay-700">
              01
            </span>
            <span className="h-px w-12 bg-clay-500/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-clay-700">
              Bienvenue · Welcome · أهلًا
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="display-serif mt-6 max-w-3xl text-terracotta"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.025em",
              fontWeight: 300,
            }}
          >
            Trois générations.
            <span className="block italic text-clay-600">
              Un seul ciel.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-terracotta/70 md:text-lg"
          >
            La même promesse en français, en anglais et en arabe. Parce qu'une
            maison ouverte se présente dans la langue de ceux qu'elle accueille.
          </motion.p>
        </div>

        {/* Trilingual essay grid */}
        <div className="grid gap-px overflow-hidden rounded-sm bg-clay-500/20 md:grid-cols-3">
          {ESSAYS.map((essay, idx) => (
            <motion.article
              key={essay.code}
              dir={essay.dir}
              lang={essay.lang}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col bg-sunlit-noon p-8 md:p-10"
            >
              {/* Language code chip */}
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full border border-clay-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-clay-700">
                  {essay.code}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-clay-500/70">
                  {essay.eyebrow}
                </span>
              </div>

              {/* Title in essay's language */}
              <h3
                className={
                  essay.lang === "ar"
                    ? "font-arabic text-3xl font-semibold text-terracotta md:text-4xl"
                    : "font-serif text-3xl font-light text-terracotta md:text-4xl"
                }
                style={{ lineHeight: "1.1", letterSpacing: "-0.01em" }}
              >
                {essay.title}
              </h3>

              {/* Body paragraphs */}
              <div
                className={
                  essay.lang === "ar"
                    ? "mt-6 flex-1 space-y-4 font-arabic text-[1.05rem] leading-[1.85] text-terracotta/85"
                    : "mt-6 flex-1 space-y-4 text-[15px] leading-relaxed text-terracotta/80"
                }
              >
                {essay.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Signature */}
              <div className="mt-8 border-t border-clay-500/25 pt-5">
                <span
                  className={
                    essay.lang === "ar"
                      ? "font-arabic text-xs tracking-wider text-clay-700"
                      : "text-[10px] uppercase tracking-[0.22em] text-clay-700"
                  }
                >
                  — {essay.signature}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
