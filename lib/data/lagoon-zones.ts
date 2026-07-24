import type { Locale } from "@/lib/i18n/config";
import type { LagoonZoneCategory } from "@/types/domain";

/**
 * LAGOON MAP — single source of truth for the illustrated aerial plan.
 *
 * Everything is laid out on a 1000 × 700 viewBox. The composition is a
 * turquoise lagoon (1 200 m²) sunk into the Bouchaoui pinewoods, ringed by
 * cabanas, a beach bar, a restaurant, lounger decks, a kids' lane, the
 * reception and a shaded car park. Pure data — no React — so the map can be
 * rendered as inline SVG and works fully offline.
 */

/** Geometry of a zone footprint on the 1000×700 board. */
export type ZoneShape =
  | { type: "rect"; x: number; y: number; w: number; h: number; rx?: number }
  | { type: "circle"; cx: number; cy: number; r: number }
  | { type: "oval"; cx: number; cy: number; rx: number; ry: number }
  | { type: "polygon"; points: Array<[number, number]> };

/** A single place on the map. */
export type LagoonZone = {
  id: string;
  category: LagoonZoneCategory;
  /** Marker anchor on the 1000×700 board. */
  pin: { x: number; y: number };
  shape: ZoneShape;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Opening hours, already locale-neutral (24h clock, e.g. "10h00 – 19h30"). */
  hours?: string;
  /** In-app path WITHOUT the locale prefix, e.g. "/reservation". */
  href?: string;
};

/** A dashed sand walkway between two zones (referenced by id). */
export type LagoonPath = {
  id: string;
  from: string;
  to: string;
};

/** Visual + iconographic identity for each zone category. */
export type CategoryStyle = {
  /** Fill for the zone footprint. */
  fill: string;
  /** Outline / marker ring colour. */
  stroke: string;
  /** A single-path icon drawn on a 0 0 24 24 viewBox (stroke, no fill). */
  iconPath: string;
  label: Record<Locale, string>;
};

// ─────────────────────────────────────────────────────────────────────────
// ZONES — ~11 places around the lagoon
// ─────────────────────────────────────────────────────────────────────────

export const LAGOON_ZONES: LagoonZone[] = [
  {
    id: "lagoon",
    category: "lagoon",
    pin: { x: 500, y: 300 },
    shape: { type: "oval", cx: 500, cy: 305, rx: 250, ry: 140 },
    name: {
      fr: "Le Grand Lagon",
      en: "The Grand Lagoon",
      ar: "البحيرة الكبرى",
    },
    description: {
      fr: "1 200 m² d'eau turquoise imitant la mer, au cœur de la forêt de Bouchaoui — le cœur battant d'Oxygen Island.",
      en: "1,200 m² of sea-turquoise water in the heart of the Bouchaoui pinewoods — the beating heart of Oxygen Island.",
      ar: "1200 م² من المياه الفيروزية التي تحاكي البحر في قلب غابة بوشاوي — القلب النابض لجزيرة أوكسجين.",
    },
    hours: "10h00 – 19h30",
  },
  {
    id: "kids",
    category: "kids",
    pin: { x: 290, y: 405 },
    shape: { type: "oval", cx: 290, cy: 405, rx: 95, ry: 48 },
    name: {
      fr: "Couloir des petits",
      en: "Kids' beginner lane",
      ar: "مسار الصغار",
    },
    description: {
      fr: "Un bassin peu profond et surveillé, réservé aux enfants qui font leurs premières brasses.",
      en: "A shallow, supervised lane set aside for children taking their first strokes.",
      ar: "حوض ضحل تحت الإشراف، مخصّص للأطفال في سباحتهم الأولى.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "bar",
    category: "bar",
    pin: { x: 500, y: 121 },
    shape: { type: "rect", x: 430, y: 92, w: 140, h: 58, rx: 14 },
    name: {
      fr: "Bar de la Plage",
      en: "Beach Bar",
      ar: "بار الشاطئ",
    },
    description: {
      fr: "Jus pressés, cocktails sans alcool et glaces artisanales, servis les pieds dans le sable.",
      en: "Pressed juices, alcohol-free cocktails and artisan ice cream, served with your feet in the sand.",
      ar: "عصائر طازجة وكوكتيلات دون كحول ومثلجات، تُقدَّم وأقدامك في الرمل.",
    },
    hours: "10h00 – 19h30",
  },
  {
    id: "restaurant",
    category: "restaurant",
    pin: { x: 866, y: 308 },
    shape: { type: "rect", x: 788, y: 250, w: 156, h: 116, rx: 16 },
    name: {
      fr: "Le Restaurant",
      en: "The Restaurant",
      ar: "المطعم",
    },
    description: {
      fr: "Cuisine méditerranéenne et grillades face au lagon, le midi comme le soir.",
      en: "Mediterranean cooking and grills facing the lagoon, at lunch and dinner alike.",
      ar: "مطبخ متوسّطي ومشاوٍ أمام البحيرة، ظهرًا ومساءً.",
    },
    hours: "12h00 – 22h00",
  },
  {
    id: "cabana-palmeraie",
    category: "cabana",
    pin: { x: 198, y: 159 },
    shape: { type: "rect", x: 120, y: 112, w: 156, h: 94, rx: 18 },
    name: {
      fr: "Cabanas Palmeraie",
      en: "Palm Grove Cabanas",
      ar: "كابانات النخيل",
    },
    description: {
      fr: "Cabanas privatives à l'ombre des palmiers, côté nord-ouest. Service au transat, à réserver à l'avance.",
      en: "Private cabanas in palm shade on the north-west side. Lounger service, bookable ahead.",
      ar: "كابانات خاصة في ظلّ النخيل جهة الشمال الغربي. خدمة على الكرسي، بالحجز المسبق.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "cabana-lagon",
    category: "cabana",
    pin: { x: 802, y: 159 },
    shape: { type: "rect", x: 724, y: 112, w: 156, h: 94, rx: 18 },
    name: {
      fr: "Cabanas Lagon",
      en: "Lagoon Cabanas",
      ar: "كابانات البحيرة",
    },
    description: {
      fr: "Les cabanas les plus proches de l'eau, avec vue directe sur le lagon. Parfaites pour les groupes.",
      en: "The cabanas closest to the water, with a direct lagoon view. Perfect for groups.",
      ar: "أقرب الكابانات إلى الماء بإطلالة مباشرة على البحيرة. مثالية للمجموعات.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "cabana-sunset",
    category: "cabana",
    pin: { x: 836, y: 484 },
    shape: { type: "rect", x: 752, y: 436, w: 168, h: 96, rx: 18 },
    name: {
      fr: "Cabanas Sunset",
      en: "Sunset Cabanas",
      ar: "كابانات الغروب",
    },
    description: {
      fr: "Côté sud-est, pour capter la lumière dorée de fin de journée jusqu'au coucher du soleil.",
      en: "On the south-east side, to catch the golden late-day light through to sunset.",
      ar: "جهة الجنوب الشرقي، لالتقاط الضوء الذهبي في آخر النهار حتى الغروب.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "solarium",
    category: "deck",
    pin: { x: 500, y: 511 },
    shape: { type: "rect", x: 326, y: 474, w: 348, h: 74, rx: 16 },
    name: {
      fr: "Le Solarium",
      en: "The Sun Deck",
      ar: "المصطبة الشمسية",
    },
    description: {
      fr: "Un grand deck de transats face au lagon, pour bronzer entre deux baignades.",
      en: "A wide deck of loungers facing the lagoon, to sunbathe between swims.",
      ar: "مصطبة واسعة من الكراسي أمام البحيرة، للتشمّس بين سباحةٍ وأخرى.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "deck-ombrage",
    category: "deck",
    pin: { x: 148, y: 295 },
    shape: { type: "rect", x: 86, y: 240, w: 124, h: 110, rx: 18 },
    name: {
      fr: "Deck Ombragé",
      en: "Shaded Deck",
      ar: "المصطبة المظلَّلة",
    },
    description: {
      fr: "Un espace lounge à l'ombre des pins, côté ouest, pour une pause au frais.",
      en: "A lounge area in pine shade on the west side, for a break in the cool.",
      ar: "مساحة استراحة في ظلّ الصنوبر جهة الغرب، لاستراحة منعشة.",
    },
    hours: "10h00 – 19h30",
  },
  {
    id: "entrance",
    category: "entrance",
    pin: { x: 513, y: 631 },
    shape: { type: "rect", x: 428, y: 588, w: 170, h: 86, rx: 14 },
    name: {
      fr: "Réception & Entrée",
      en: "Reception & Entrance",
      ar: "الاستقبال والمدخل",
    },
    description: {
      fr: "Votre point d'arrivée : billetterie, bracelets et vestiaires. Présentez votre QR code et plongez dans la journée.",
      en: "Your arrival point: ticketing, wristbands and lockers. Show your QR code and dive into the day.",
      ar: "نقطة وصولك: التذاكر والأساور وخزائن الأمتعة. أظهر رمز QR وابدأ يومك.",
    },
    hours: "10h00 – 19h30",
    href: "/reservation",
  },
  {
    id: "parking",
    category: "parking",
    pin: { x: 169, y: 616 },
    shape: { type: "rect", x: 64, y: 560, w: 210, h: 112, rx: 12 },
    name: {
      fr: "Parking ombragé",
      en: "Shaded parking",
      ar: "موقف مظلَّل",
    },
    description: {
      fr: "Stationnement gratuit sous les pins, à deux pas de l'entrée.",
      en: "Free parking under the pines, a few steps from the entrance.",
      ar: "موقف مجاني تحت أشجار الصنوبر، على بُعد خطواتٍ من المدخل.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// WALKWAYS — dashed sand paths between zones
// ─────────────────────────────────────────────────────────────────────────

export const LAGOON_PATHS: LagoonPath[] = [
  { id: "w-entrance-solarium", from: "entrance", to: "solarium" },
  { id: "w-entrance-parking", from: "entrance", to: "parking" },
  { id: "w-solarium-lagoon", from: "solarium", to: "lagoon" },
  { id: "w-lagoon-kids", from: "lagoon", to: "kids" },
  { id: "w-lagoon-bar", from: "lagoon", to: "bar" },
  { id: "w-palmeraie-lagoon", from: "cabana-palmeraie", to: "lagoon" },
  { id: "w-lagon-bar", from: "cabana-lagon", to: "bar" },
  { id: "w-sunset-restaurant", from: "cabana-sunset", to: "restaurant" },
  { id: "w-restaurant-solarium", from: "restaurant", to: "solarium" },
  { id: "w-deckombrage-solarium", from: "deck-ombrage", to: "solarium" },
  { id: "w-deckombrage-kids", from: "deck-ombrage", to: "kids" },
];

// ─────────────────────────────────────────────────────────────────────────
// CATEGORY STYLE — colour + icon + label per category
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORY_STYLE: Record<LagoonZoneCategory, CategoryStyle> = {
  lagoon: {
    fill: "#1d8da0",
    stroke: "#5fb9c6",
    iconPath:
      "M3 8c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 M3 13c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 M3 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2",
    label: { fr: "Lagon", en: "Lagoon", ar: "البحيرة" },
  },
  cabana: {
    fill: "#c97b57",
    stroke: "#ec6e4f",
    iconPath: "M12 9v11 M8.5 20h7 M3 9a9 8 0 0 1 18 0Z",
    label: { fr: "Cabanas", en: "Cabanas", ar: "الكابانات" },
  },
  bar: {
    fill: "#8a5a3b",
    stroke: "#dec291",
    iconPath: "M4 5h16l-8 9z M12 14v5 M8 20h8",
    label: { fr: "Bar", en: "Bar", ar: "البار" },
  },
  restaurant: {
    fill: "#6e4a34",
    stroke: "#f49174",
    iconPath:
      "M6 3v5 M9 3v5 M6 8h3 M7.5 8v13 M16.5 3v18 M16.5 3c2.2 0 3.6 2.2 3.6 5.5s-1.4 4.5-3.6 4.5",
    label: { fr: "Restaurant", en: "Restaurant", ar: "المطعم" },
  },
  kids: {
    fill: "#7da05a",
    stroke: "#a8c08a",
    iconPath:
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M4 9c5 3 11 3 16 0 M4 15c5-3 11-3 16 0 M12 3v18",
    label: { fr: "Enfants", en: "Kids", ar: "الأطفال" },
  },
  entrance: {
    fill: "#c98b3a",
    stroke: "#dec291",
    iconPath:
      "M4 21V10a8 7 0 0 1 16 0v11 M3 21h18 M9.5 21v-5a2.5 3 0 0 1 5 0v5",
    label: { fr: "Entrée", en: "Entrance", ar: "المدخل" },
  },
  parking: {
    fill: "#4b5a44",
    stroke: "#a8c08a",
    iconPath:
      "M4 13l1.8-5.5A2 2 0 0 1 7.7 6h8.6a2 2 0 0 1 1.9 1.5L20 13v5H4z M8 18v1.5 M16 18v1.5 M6.5 13h2 M15.5 13h2",
    label: { fr: "Parking", en: "Parking", ar: "الموقف" },
  },
  deck: {
    fill: "#cba66b",
    stroke: "#dec291",
    iconPath:
      "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.4 1.4 M17.6 17.6L19 19 M19 5l-1.4 1.4 M6.4 17.6L5 19",
    label: { fr: "Solarium", en: "Sun deck", ar: "المصطبة" },
  },
};

/** Category display order for the legend. */
export const CATEGORY_ORDER: LagoonZoneCategory[] = [
  "lagoon",
  "kids",
  "cabana",
  "deck",
  "bar",
  "restaurant",
  "entrance",
  "parking",
];

/** Convenience lookup for resolving path endpoints to pins. */
export const ZONE_BY_ID: Record<string, LagoonZone> = Object.fromEntries(
  LAGOON_ZONES.map((z) => [z.id, z]),
);
