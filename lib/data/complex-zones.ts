import type { Locale } from "@/types/domain";

export type ZoneCategory =
  | "reception"
  | "accommodation"
  | "equestrian"
  | "pool"
  | "restaurant"
  | "orchard"
  | "beehive"
  | "camping"
  | "parking"
  | "play"
  | "trail";

/**
 * A point on the complex map.
 * Coordinates use a 1000×700 viewBox (approx 16:11 — fits the rough
 * footprint of the 25-hectare property). Origin is top-left.
 *
 * Shapes:
 *  - polygon: hand-drawn organic outline (orchards, paths)
 *  - rect:    geometric building footprint
 *  - circle:  pool, beehive clusters
 *  - oval:    equestrian arena (rx + ry)
 */
export type ZoneShape =
  | { type: "polygon"; points: string }
  | { type: "rect"; x: number; y: number; w: number; h: number; rx?: number }
  | { type: "circle"; cx: number; cy: number; r: number }
  | { type: "oval"; cx: number; cy: number; rx: number; ry: number };

export type Zone = {
  id: string;
  category: ZoneCategory;
  /** Pin position — center of the label and info anchor */
  pin: { x: number; y: number };
  /** Optional shape outline drawn on the map */
  shape?: ZoneShape;
  /** Trilingual labels + descriptions */
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  hours?: string;
  /** Booking flow link, if applicable */
  href?: string;
};

const RESTAURANT_DESCRIPTION_FR =
  "Couscous au mouton, tajines aux pruneaux, grillades. Pain cuit au four à bois. Service 12h–14h et 19h30–22h.";
const RESTAURANT_DESCRIPTION_EN =
  "Lamb couscous, prune tagines, grilled meats. Bread baked in the wood oven. Service noon–2pm and 7:30pm–10pm.";
const RESTAURANT_DESCRIPTION_AR =
  "كسكس بالضأن، طاجين بالبرقوق، مشاوي. خبز من فرن الحطب. الخدمة من 12 إلى 14 ومن 19:30 إلى 22.";

export const COMPLEX_ZONES: Zone[] = [
  // ─── ENTRANCE & RECEPTION ───────────────────────────────────────────
  {
    id: "reception",
    category: "reception",
    pin: { x: 500, y: 640 },
    shape: { type: "rect", x: 460, y: 605, w: 80, h: 50, rx: 4 },
    name: {
      fr: "Accueil",
      en: "Reception",
      ar: "الاستقبال",
    },
    description: {
      fr: "Première étape à votre arrivée. Présentez votre code QR pour valider votre séjour. Conseils, plans, informations.",
      en: "Your first stop on arrival. Show your QR code to validate the stay. Advice, maps, information.",
      ar: "أوّل محطّة عند وصولك. أبرز رمز QR لتأكيد إقامتك. نصائح، خرائط، معلومات.",
    },
    hours: "08:00 – 22:00",
  },
  {
    id: "parking",
    category: "parking",
    pin: { x: 500, y: 690 },
    shape: { type: "rect", x: 430, y: 668, w: 140, h: 26, rx: 3 },
    name: {
      fr: "Parking visiteurs",
      en: "Visitor parking",
      ar: "موقف الزوار",
    },
    description: {
      fr: "Parking ombragé pour 60 véhicules. Service voiturier sur demande pour les arrivées tardives.",
      en: "Shaded parking for 60 vehicles. Valet service available for late arrivals.",
      ar: "موقف مظلّل لـ60 سيارة. خدمة الركن متاحة عند الوصول المتأخر.",
    },
  },

  // ─── ACCOMMODATIONS — three clusters ────────────────────────────────
  {
    id: "chalets-standard",
    category: "accommodation",
    pin: { x: 210, y: 230 },
    shape: { type: "rect", x: 150, y: 200, w: 120, h: 60, rx: 4 },
    name: {
      fr: "Chalets Standard",
      en: "Standard Chalets",
      ar: "الأكواخ العادية",
    },
    description: {
      fr: "12 chalets en bois clair pour familles. Cuisine équipée, terrasse, vue sur les vergers.",
      en: "12 light-wood chalets for families. Equipped kitchen, terrace, views over the orchards.",
      ar: "12 كوخًا من الخشب الفاتح للعائلات. مطبخ مجهز، شرفة، إطلالة على البساتين.",
    },
    href: "/hebergement/chalet-standard",
  },
  {
    id: "chalets-familial",
    category: "accommodation",
    pin: { x: 720, y: 200 },
    shape: { type: "rect", x: 660, y: 165, w: 120, h: 70, rx: 4 },
    name: {
      fr: "Chalets Familiaux",
      en: "Family Chalets",
      ar: "أكواخ العائلة",
    },
    description: {
      fr: "8 chalets familiaux avec mezzanine pour groupes de 6. Idéal pour les réunions de famille.",
      en: "8 family chalets with mezzanine for groups of 6. Perfect for family reunions.",
      ar: "8 أكواخ عائلية مع ميزانين لمجموعات من 6 أشخاص. مثالية لاجتماعات العائلة.",
    },
    href: "/hebergement/chalet-familial-olivier",
  },
  {
    id: "tentes",
    category: "accommodation",
    pin: { x: 180, y: 470 },
    shape: { type: "rect", x: 130, y: 445, w: 100, h: 50, rx: 8 },
    name: {
      fr: "Tentes Berbères",
      en: "Berber Tents",
      ar: "خيام أمازيغية",
    },
    description: {
      fr: "6 tentes traditionnelles avec lits confortables. Tapis berbères, lanternes à huile, expérience nomade.",
      en: "6 traditional tents with comfortable beds. Berber rugs, oil lanterns, nomadic experience.",
      ar: "6 خيام تقليدية بأسرّة مريحة. زرابي أمازيغية، فوانيس، تجربة بدوية.",
    },
    href: "/hebergement/tente-berbere-premium",
  },
  {
    id: "glamping",
    category: "accommodation",
    pin: { x: 820, y: 440 },
    shape: { type: "circle", cx: 820, cy: 440, r: 22 },
    name: {
      fr: "Glamping Étoilé",
      en: "Star Glamping",
      ar: "غلامبينغ النجوم",
    },
    description: {
      fr: "4 dômes transparents pour dormir sous les étoiles. Sanitaires privatifs, petit-déjeuner inclus.",
      en: "4 transparent domes to sleep under the stars. Private bathrooms, breakfast included.",
      ar: "4 قبب شفافة للنوم تحت النجوم. حمامات خاصة، فطور مشمول.",
    },
    href: "/hebergement/glamping-etoile",
  },

  // ─── LEISURE & SERVICES ─────────────────────────────────────────────
  {
    id: "pool",
    category: "pool",
    pin: { x: 500, y: 380 },
    shape: { type: "rect", x: 455, y: 355, w: 90, h: 50, rx: 18 },
    name: {
      fr: "Sunset Pool",
      en: "Sunset Pool",
      ar: "مسبح الغروب",
    },
    description: {
      fr: "Piscine extérieure chauffée. Couloir débutant pour enfants, maître-nageur. Le soir, l'eau devient miroir au coucher du soleil.",
      en: "Heated outdoor pool. Beginner lane for children, lifeguard on duty. At dusk, the water turns to a mirror.",
      ar: "مسبح خارجي مُسخّن. مسار للمبتدئين، منقذ. عند الغروب، الماء يصبح مرآة.",
    },
    hours: "10:00 – 00:00 · Mai → Octobre",
    href: "/activites/piscine",
  },
  {
    id: "restaurant",
    category: "restaurant",
    pin: { x: 500, y: 520 },
    shape: { type: "rect", x: 450, y: 495, w: 100, h: 55, rx: 4 },
    name: {
      fr: "La Table",
      en: "The Table",
      ar: "المائدة",
    },
    description: {
      fr: RESTAURANT_DESCRIPTION_FR,
      en: RESTAURANT_DESCRIPTION_EN,
      ar: RESTAURANT_DESCRIPTION_AR,
    },
    hours: "12h–14h · 19h30–22h",
    href: "/restaurant",
  },
  {
    id: "ecurie",
    category: "equestrian",
    pin: { x: 850, y: 540 },
    shape: { type: "oval", cx: 850, cy: 540, rx: 75, ry: 38 },
    name: {
      fr: "L'écurie",
      en: "The Stables",
      ar: "الإسطبل",
    },
    description: {
      fr: "14 chevaux, manège couvert, cercle d'initiation pour enfants 4-8 ans. Casques fournis. Premier galop possible dès 4 ans.",
      en: "14 horses, covered arena, beginner ring for children 4-8. Helmets provided. First gallop from age 4.",
      ar: "14 حصانًا، حلبة مغطّاة، حلقة مبتدئين للأطفال 4-8 سنوات. خوذات متوفرة.",
    },
    hours: "Mercredi → dimanche · 09h–18h",
    href: "/activites/equitation",
  },

  // ─── NATURE — orchards, beehives, camping ───────────────────────────
  {
    id: "vergers-est",
    category: "orchard",
    pin: { x: 770, y: 320 },
    shape: {
      type: "polygon",
      points: "650,260 880,265 935,360 920,440 820,420 700,400 660,330",
    },
    name: {
      fr: "Vergers Est",
      en: "East Orchards",
      ar: "بساتين الشرق",
    },
    description: {
      fr: "Pommiers, poiriers, figuiers. Cueillette ouverte aux résidents le vendredi 10h–12h, panier offert par enfant.",
      en: "Apple, pear, fig trees. Picking open to residents Friday 10am–noon, a basket per child.",
      ar: "تفاح، إجاص، تين. القطف متاح للمقيمين الجمعة 10–12، سلة لكل طفل.",
    },
    hours: "Vendredi · 10h–12h",
  },
  {
    id: "vergers-ouest",
    category: "orchard",
    pin: { x: 130, y: 340 },
    shape: {
      type: "polygon",
      points: "60,280 230,290 290,380 250,460 130,440 70,380",
    },
    name: {
      fr: "Vergers Ouest",
      en: "West Orchards",
      ar: "بساتين الغرب",
    },
    description: {
      fr: "Grenadiers, oliviers centenaires. Promenades libres. Cueillette des olives en novembre, ouverte aux résidents.",
      en: "Pomegranate trees, century-old olive trees. Free walks. Olive harvest in November, open to residents.",
      ar: "أشجار رمان، زيتون مُعمّر. تجوّل حر. قطف الزيتون في نوفمبر، مفتوح للمقيمين.",
    },
  },
  {
    id: "ruches",
    category: "beehive",
    pin: { x: 880, y: 110 },
    shape: { type: "circle", cx: 880, cy: 110, r: 28 },
    name: {
      fr: "Les Ruches",
      en: "The Beehives",
      ar: "خلايا النحل",
    },
    description: {
      fr: "40 ruches. Visite guidée samedi 11h avec notre apiculteur. Miel d'oranger, jujubier, romarin. Dégustation offerte.",
      en: "40 beehives. Guided tour Saturday 11am with our beekeeper. Orange-blossom, jujube, rosemary honey. Tasting included.",
      ar: "40 خلية نحل. زيارة مرشدة السبت 11 مع نحّالنا. عسل البرتقال، السدر، الإكليل. تذوّق مجاني.",
    },
    hours: "Samedi · 11h",
    href: "/activites/visite-rucher",
  },
  {
    id: "camping",
    category: "camping",
    pin: { x: 130, y: 580 },
    shape: {
      type: "polygon",
      points: "60,540 220,550 240,610 100,630 50,600",
    },
    name: {
      fr: "Aire de Camping",
      en: "Camping Area",
      ar: "موقع التخييم",
    },
    description: {
      fr: "20 emplacements pour tente personnelle. Sanitaires, douches chaudes, accès cuisine partagée. Feu de camp autorisé.",
      en: "20 spots for personal tents. Bathrooms, hot showers, shared kitchen access. Campfires permitted.",
      ar: "20 موقعًا للخيام الشخصية. حمامات، دش ساخن، مطبخ مشترك. النار مسموح بها.",
    },
    href: "/activites/camping",
  },
  {
    id: "play",
    category: "play",
    pin: { x: 380, y: 480 },
    shape: { type: "rect", x: 350, y: 460, w: 60, h: 40, rx: 6 },
    name: {
      fr: "Aire de Jeux",
      en: "Playground",
      ar: "ساحة اللعب",
    },
    description: {
      fr: "Toboggans, balançoires, structure d'escalade en bois. Pour les 3-12 ans. À l'ombre des oliviers.",
      en: "Slides, swings, wooden climbing structure. For ages 3-12. In the shade of olive trees.",
      ar: "زلاجات، أراجيح، هيكل تسلق خشبي. للأعمار من 3 إلى 12. تحت ظل الزيتون.",
    },
  },
];

/** Bronze paths between key zones — drawn as dashed lines */
export const COMPLEX_PATHS: Array<{ from: string; to: string }> = [
  { from: "reception", to: "restaurant" },
  { from: "restaurant", to: "pool" },
  { from: "pool", to: "ecurie" },
  { from: "pool", to: "chalets-standard" },
  { from: "pool", to: "chalets-familial" },
  { from: "restaurant", to: "play" },
  { from: "chalets-standard", to: "tentes" },
  { from: "chalets-familial", to: "glamping" },
  { from: "chalets-standard", to: "vergers-ouest" },
  { from: "chalets-familial", to: "vergers-est" },
  { from: "vergers-est", to: "ruches" },
  { from: "tentes", to: "camping" },
];

/**
 * Category → palette + icon glyph reference. The icon glyph is a tiny SVG
 * path drawn inside the pin circle (paths sized to fit a 16px viewBox,
 * scaled inside the pin).
 */
export const CATEGORY_STYLE: Record<
  ZoneCategory,
  { fill: string; stroke: string; iconPath: string; label: Record<Locale, string> }
> = {
  reception: {
    fill: "#c9a35b",
    stroke: "#7e6231",
    iconPath: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z",
    label: { fr: "Accueil", en: "Reception", ar: "استقبال" },
  },
  accommodation: {
    fill: "#b56e3c",
    stroke: "#6f4124",
    iconPath: "M3 21V10l9-7 9 7v11h-6v-7h-6v7H3z",
    label: { fr: "Hébergement", en: "Stay", ar: "إقامة" },
  },
  equestrian: {
    fill: "#7e6231",
    stroke: "#46361a",
    iconPath: "M5 11c0-3 3-6 7-6s7 3 7 6c0 2-1 4-3 5l-1 2v3h-2v-3l-1-2c-1 1-3 1-4 0l-3 3v-3l1-1c-1-1-1-2-1-4z",
    label: { fr: "Écurie", en: "Stables", ar: "إسطبل" },
  },
  pool: {
    fill: "#4a7fa3",
    stroke: "#1d3a48",
    iconPath: "M2 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1v3H2v-3zm0-4c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1v3H2v-3z",
    label: { fr: "Piscine", en: "Pool", ar: "مسبح" },
  },
  restaurant: {
    fill: "#a04324",
    stroke: "#4a1d12",
    iconPath: "M7 2v8c0 2 1 3 2 3v10h2V13c1 0 2-1 2-3V2h-1v6h-1V2h-1v6H9V2H7zm9 0c-2 0-3 2-3 5v3c0 1 1 2 2 2v9h2V2z",
    label: { fr: "Table", en: "Table", ar: "مائدة" },
  },
  orchard: {
    fill: "#6b7a45",
    stroke: "#414929",
    iconPath: "M12 3a6 6 0 0 0-6 6c0 3 2 5 4 6l-1 5h6l-1-5c2-1 4-3 4-6a6 6 0 0 0-6-6z",
    label: { fr: "Vergers", en: "Orchards", ar: "بساتين" },
  },
  beehive: {
    fill: "#cfaa3b",
    stroke: "#695224",
    iconPath: "M8 4h8l3 4-3 4 3 4-3 4H8l-3-4 3-4-3-4 3-4z",
    label: { fr: "Ruches", en: "Beehives", ar: "نحل" },
  },
  camping: {
    fill: "#6b7a45",
    stroke: "#414929",
    iconPath: "M12 3L3 21h18L12 3zm0 5l5 10H7l5-10z",
    label: { fr: "Camping", en: "Camping", ar: "تخييم" },
  },
  parking: {
    fill: "#3d2418",
    stroke: "#28160e",
    iconPath: "M5 3h7a5 5 0 0 1 0 10H9v8H5V3zm4 4v4h3a2 2 0 0 0 0-4H9z",
    label: { fr: "Parking", en: "Parking", ar: "موقف" },
  },
  play: {
    fill: "#d4633b",
    stroke: "#a04324",
    iconPath: "M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1 8v3H7v2h4v7h2v-7h4v-2h-4v-3h-2z",
    label: { fr: "Jeux", en: "Play", ar: "ألعاب" },
  },
  trail: {
    fill: "#7e6231",
    stroke: "#46361a",
    iconPath: "M3 21l4-12 4 8 3-6 7 10H3z",
    label: { fr: "Sentiers", en: "Trails", ar: "مسارات" },
  },
};
