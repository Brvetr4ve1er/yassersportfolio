import type {
  Booking,
  Cabana,
  EventOffer,
  Pass,
  User,
} from "@/types/domain";

/**
 * Mock catalog for Oxygen Island. Pricing + hours are the real figures
 * from the venue's public listings (8 500 DA adult, 5 000 DA child,
 * 10h–19h30, Friday kids shows). Replace with Supabase rows when wired.
 */

export const mockPasses: Pass[] = [
  {
    id: "pass-adult",
    slug: "pass-adulte",
    name_fr: "Pass Adulte",
    name_en: "Adult Pass",
    name_ar: "تذكرة بالغ",
    audience: "adult",
    price: 8500,
    description_fr:
      "Accès au lagon toute la journée, transat fourni, vestiaire et douches. Bar et restauration sur place.",
    description_en:
      "All-day lagoon access, sun lounger included, locker and showers. Bar and food on site.",
    description_ar:
      "دخول البحيرة طوال اليوم، كرسي شاطئي مشمول، خزانة ودش. بار ومطعم في المكان.",
    includes: ["lagoon", "lounger", "locker", "showers"],
    image: "/images/pass-adult.svg",
  },
  {
    id: "pass-child",
    slug: "pass-enfant",
    name_fr: "Pass Enfant",
    name_en: "Child Pass",
    name_ar: "تذكرة طفل",
    audience: "child",
    price: 5000,
    description_fr:
      "Couloir débutant, maître-nageur, animation famille le vendredi. Glaces et jus offerts pour les moins de 10 ans.",
    description_en:
      "Beginner lane, lifeguard, Friday family entertainment. Free juice and ice cream for under-10s.",
    description_ar:
      "مسار للمبتدئين، منقذ بحري، ترفيه عائلي يوم الجمعة. عصير ومثلجات مجانية لمن هم دون 10 سنوات.",
    includes: ["lagoon", "beginner_lane", "lifeguard", "friday_show"],
    image: "/images/pass-child.svg",
  },
  {
    id: "pass-evening",
    slug: "pass-sunset",
    name_fr: "Pass Sunset",
    name_en: "Sunset Pass",
    name_ar: "تذكرة الغروب",
    audience: "evening",
    price: 6000,
    description_fr:
      "Accès à partir de 17h : coucher de soleil, set DJ le samedi, bar à mocktails. Ambiance adultes et adolescents.",
    description_en:
      "Access from 5pm: sunset, Saturday DJ set, mocktail bar. Adults and teens atmosphere.",
    description_ar:
      "دخول من الساعة 17:00 : غروب الشمس، عرض دي جاي يوم السبت، بار كوكتيلات. أجواء للبالغين والمراهقين.",
    includes: ["lagoon", "dj_saturday", "mocktail_bar"],
    image: "/images/pass-sunset.svg",
  },
];

export const mockCabanas: Cabana[] = [
  {
    id: "cabana-lagoon",
    slug: "cabana-lagon",
    name_fr: "Cabana Lagon",
    name_en: "Lagoon Cabana",
    name_ar: "كابانا البحيرة",
    capacity: 4,
    price: 25000,
    zone: "lagoon",
    amenities: ["shade", "lounger_service", "cooler", "priority_entry"],
    description_fr:
      "Cabana au bord de l'eau, à l'ombre, service au transat, glacière et boissons incluses. Réservation prioritaire.",
    description_en:
      "Waterside cabana, shaded, lounger service, cooler and drinks included. Priority entry.",
    description_ar:
      "كابانا على حافة الماء، مظلّلة، خدمة على الكرسي، ثلاجة ومشروبات مشمولة. دخول أولوية.",
    image: "/images/cabana-lagoon.svg",
  },
  {
    id: "cabana-palm",
    slug: "cabana-palmiers",
    name_fr: "Cabana Palmiers",
    name_en: "Palm Cabana",
    name_ar: "كابانا النخيل",
    capacity: 6,
    price: 32000,
    zone: "palm",
    amenities: ["shade", "lounger_service", "cooler", "priority_entry", "table_service"],
    description_fr:
      "Grande cabana sous les palmiers pour les groupes, service à table, espace privatif pour 6 personnes.",
    description_en:
      "Large cabana under the palms for groups, table service, private space for 6.",
    description_ar:
      "كابانا كبيرة تحت النخيل للمجموعات، خدمة على الطاولة، مساحة خاصة لـ 6 أشخاص.",
    image: "/images/cabana-palm.svg",
  },
  {
    id: "cabana-sunset",
    slug: "cabana-sunset",
    name_fr: "Cabana Sunset",
    name_en: "Sunset Cabana",
    name_ar: "كابانا الغروب",
    capacity: 4,
    price: 30000,
    zone: "sunset",
    amenities: ["shade", "lounger_service", "cooler", "priority_entry", "sunset_view"],
    description_fr:
      "Orientée plein ouest pour le coucher de soleil, parfaite pour les soirées DJ du samedi.",
    description_en:
      "Facing west for the sunset, perfect for Saturday DJ nights.",
    description_ar:
      "موجّهة نحو الغرب لغروب الشمس، مثالية لسهرات دي جاي يوم السبت.",
    image: "/images/cabana-sunset.svg",
  },
];

export const mockEvents: EventOffer[] = [
  {
    id: "event-kids",
    slug: "animation-enfants",
    name_fr: "Animation Enfants",
    name_en: "Kids' Entertainment",
    name_ar: "أنشطة الأطفال",
    kind: "kids",
    day: "friday",
    time: "15:00",
    price: 0,
    description_fr:
      "Spectacle famille, mascottes, atelier glaces. Inclus dans le pass enfant.",
    description_en:
      "Family show, mascots, ice-cream workshop. Included in the child pass.",
    description_ar:
      "عرض عائلي، شخصيات، ورشة المثلجات. مشمول في تذكرة الطفل.",
    image: "/images/event-kids.svg",
  },
  {
    id: "event-dj",
    slug: "sunset-dj",
    name_fr: "Sunset DJ",
    name_en: "Sunset DJ",
    name_ar: "دي جاي الغروب",
    kind: "dj",
    day: "saturday",
    time: "18:00",
    price: 2000,
    description_fr:
      "Coucher de soleil derrière la pinède, set DJ live, bar à mocktails. Réservation de table conseillée.",
    description_en:
      "Sun setting behind the pinewoods, live DJ set, mocktail bar. Table reservation recommended.",
    description_ar:
      "غروب الشمس خلف الصنوبر، عرض دي جاي مباشر، بار كوكتيلات. يُنصح بحجز طاولة.",
    image: "/images/event-dj.svg",
  },
  {
    id: "event-private",
    slug: "privatisation",
    name_fr: "Privatisation",
    name_en: "Privatization",
    name_ar: "الحجز الخاص",
    kind: "private",
    day: "on-request",
    time: "—",
    price: null,
    description_fr:
      "Anniversaires, fiançailles, événements d'entreprise. Capacité 50 à 300 personnes. Devis sur mesure.",
    description_en:
      "Birthdays, engagements, corporate events. Capacity 50 to 300. Custom quote.",
    description_ar:
      "أعياد الميلاد، الخطوبة، فعاليات الشركات. سعة 50 إلى 300 شخص. عرض مخصّص.",
    image: "/images/event-private.svg",
  },
];

export const mockUser: User = {
  id: "usr-demo",
  phone: "+213 555 12 34 56",
  email: null,
  full_name: "Yacine Meziane",
  preferred_lang: "fr",
};

export const mockBookings: Booking[] = [
  {
    id: "bk-001",
    reference: "OXI-7H3K-9P",
    user_id: "usr-demo",
    product: "pass",
    pass_id: "pass-adult",
    cabana_id: null,
    event_id: null,
    visit_date: "2026-07-18",
    adults: 2,
    children: 2,
    total_price: 27000,
    status: "confirmed",
    payment_method: "baridi",
    payment_status: "paid",
    qr_code_token: "qr-bk-001",
    special_requests: null,
    created_at: "2026-07-10T09:00:00Z",
  },
  {
    id: "bk-002",
    reference: "OXI-2L9M-4T",
    user_id: "usr-demo",
    product: "cabana",
    pass_id: null,
    cabana_id: "cabana-lagoon",
    event_id: null,
    visit_date: "2026-07-25",
    adults: 4,
    children: 0,
    total_price: 25000,
    status: "confirmed",
    payment_method: "cib",
    payment_status: "paid",
    qr_code_token: "qr-bk-002",
    special_requests: "Anniversaire — gâteau prévu",
    created_at: "2026-07-12T14:30:00Z",
  },
  {
    id: "bk-003",
    reference: "OXI-PAST-01",
    user_id: "usr-demo",
    product: "pass",
    pass_id: "pass-adult",
    cabana_id: null,
    event_id: null,
    visit_date: "2026-06-20",
    adults: 3,
    children: 1,
    total_price: 30500,
    status: "completed",
    payment_method: "baridi",
    payment_status: "paid",
    qr_code_token: "qr-bk-003",
    special_requests: null,
    created_at: "2026-06-15T11:00:00Z",
  },
];

export const AMENITY_LABELS: Record<string, Record<string, string>> = {
  fr: {
    lagoon: "Accès lagon",
    lounger: "Transat fourni",
    locker: "Vestiaire",
    showers: "Douches",
    beginner_lane: "Couloir débutant",
    lifeguard: "Maître-nageur",
    friday_show: "Animation vendredi",
    dj_saturday: "DJ samedi",
    mocktail_bar: "Bar à mocktails",
    shade: "Espace ombragé",
    lounger_service: "Service au transat",
    cooler: "Glacière + boissons",
    priority_entry: "Entrée prioritaire",
    table_service: "Service à table",
    sunset_view: "Vue coucher de soleil",
  },
  en: {
    lagoon: "Lagoon access",
    lounger: "Sun lounger",
    locker: "Locker",
    showers: "Showers",
    beginner_lane: "Beginner lane",
    lifeguard: "Lifeguard",
    friday_show: "Friday entertainment",
    dj_saturday: "Saturday DJ",
    mocktail_bar: "Mocktail bar",
    shade: "Shaded area",
    lounger_service: "Lounger service",
    cooler: "Cooler + drinks",
    priority_entry: "Priority entry",
    table_service: "Table service",
    sunset_view: "Sunset view",
  },
  ar: {
    lagoon: "دخول البحيرة",
    lounger: "كرسي شاطئي",
    locker: "خزانة",
    showers: "دش",
    beginner_lane: "مسار للمبتدئين",
    lifeguard: "منقذ بحري",
    friday_show: "ترفيه الجمعة",
    dj_saturday: "دي جاي السبت",
    mocktail_bar: "بار كوكتيلات",
    shade: "مساحة مظلّلة",
    lounger_service: "خدمة على الكرسي",
    cooler: "ثلاجة + مشروبات",
    priority_entry: "دخول أولوية",
    table_service: "خدمة على الطاولة",
    sunset_view: "إطلالة على الغروب",
  },
};
