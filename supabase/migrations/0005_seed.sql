-- ============================================================================
-- 0005_seed.sql — Oxygen Island DZ · catalog seed
-- Mirrors lib/data/mock.ts exactly: 3 passes, 3 cabanas, 3 events.
-- Idempotent (ON CONFLICT (id) DO NOTHING) so it is safe to re-run.
-- Prices in DZD.
-- ============================================================================

-- ---- Passes ----------------------------------------------------------------
insert into public.passes
  (id, slug, name_fr, name_en, name_ar, audience, price,
   description_fr, description_en, description_ar, includes, image, sort_order)
values
  ('pass-adult', 'pass-adulte', 'Pass Adulte', 'Adult Pass', 'تذكرة بالغ',
   'adult', 8500,
   'Accès au lagon toute la journée, transat fourni, vestiaire et douches. Bar et restauration sur place.',
   'All-day lagoon access, sun lounger included, locker and showers. Bar and food on site.',
   'دخول البحيرة طوال اليوم، كرسي شاطئي مشمول، خزانة ودش. بار ومطعم في المكان.',
   array['lagoon','lounger','locker','showers'], '/images/pass-adult.svg', 1),

  ('pass-child', 'pass-enfant', 'Pass Enfant', 'Child Pass', 'تذكرة طفل',
   'child', 5000,
   'Couloir débutant, maître-nageur, animation famille le vendredi. Glaces et jus offerts pour les moins de 10 ans.',
   'Beginner lane, lifeguard, Friday family entertainment. Free juice and ice cream for under-10s.',
   'مسار للمبتدئين، منقذ بحري، ترفيه عائلي يوم الجمعة. عصير ومثلجات مجانية لمن هم دون 10 سنوات.',
   array['lagoon','beginner_lane','lifeguard','friday_show'], '/images/pass-child.svg', 2),

  ('pass-evening', 'pass-sunset', 'Pass Sunset', 'Sunset Pass', 'تذكرة الغروب',
   'evening', 6000,
   'Accès à partir de 17h : coucher de soleil, set DJ le samedi, bar à mocktails. Ambiance adultes et adolescents.',
   'Access from 5pm: sunset, Saturday DJ set, mocktail bar. Adults and teens atmosphere.',
   'دخول من الساعة 17:00 : غروب الشمس، عرض دي جاي يوم السبت، بار كوكتيلات. أجواء للبالغين والمراهقين.',
   array['lagoon','dj_saturday','mocktail_bar'], '/images/pass-sunset.svg', 3)
on conflict (id) do nothing;

-- ---- Cabanas ---------------------------------------------------------------
insert into public.cabanas
  (id, slug, name_fr, name_en, name_ar, capacity, price, zone,
   amenities, description_fr, description_en, description_ar, image, sort_order)
values
  ('cabana-lagoon', 'cabana-lagon', 'Cabana Lagon', 'Lagoon Cabana', 'كابانا البحيرة',
   4, 25000, 'lagoon',
   array['shade','lounger_service','cooler','priority_entry'],
   'Cabana au bord de l''eau, à l''ombre, service au transat, glacière et boissons incluses. Réservation prioritaire.',
   'Waterside cabana, shaded, lounger service, cooler and drinks included. Priority entry.',
   'كابانا على حافة الماء، مظلّلة، خدمة على الكرسي، ثلاجة ومشروبات مشمولة. دخول أولوية.',
   '/images/cabana-lagoon.svg', 1),

  ('cabana-palm', 'cabana-palmiers', 'Cabana Palmiers', 'Palm Cabana', 'كابانا النخيل',
   6, 32000, 'palm',
   array['shade','lounger_service','cooler','priority_entry','table_service'],
   'Grande cabana sous les palmiers pour les groupes, service à table, espace privatif pour 6 personnes.',
   'Large cabana under the palms for groups, table service, private space for 6.',
   'كابانا كبيرة تحت النخيل للمجموعات، خدمة على الطاولة، مساحة خاصة لـ 6 أشخاص.',
   '/images/cabana-palm.svg', 2),

  ('cabana-sunset', 'cabana-sunset', 'Cabana Sunset', 'Sunset Cabana', 'كابانا الغروب',
   4, 30000, 'sunset',
   array['shade','lounger_service','cooler','priority_entry','sunset_view'],
   'Orientée plein ouest pour le coucher de soleil, parfaite pour les soirées DJ du samedi.',
   'Facing west for the sunset, perfect for Saturday DJ nights.',
   'موجّهة نحو الغرب لغروب الشمس، مثالية لسهرات دي جاي يوم السبت.',
   '/images/cabana-sunset.svg', 3)
on conflict (id) do nothing;

-- ---- Events ----------------------------------------------------------------
-- event-private has price NULL (quote-only privatization).
insert into public.events
  (id, slug, name_fr, name_en, name_ar, kind, day, "time", price,
   description_fr, description_en, description_ar, image, sort_order)
values
  ('event-kids', 'animation-enfants', 'Animation Enfants', 'Kids'' Entertainment', 'أنشطة الأطفال',
   'kids', 'friday', '15:00', 0,
   'Spectacle famille, mascottes, atelier glaces. Inclus dans le pass enfant.',
   'Family show, mascots, ice-cream workshop. Included in the child pass.',
   'عرض عائلي، شخصيات، ورشة المثلجات. مشمول في تذكرة الطفل.',
   '/images/event-kids.svg', 1),

  ('event-dj', 'sunset-dj', 'Sunset DJ', 'Sunset DJ', 'دي جاي الغروب',
   'dj', 'saturday', '18:00', 2000,
   'Coucher de soleil derrière la pinède, set DJ live, bar à mocktails. Réservation de table conseillée.',
   'Sun setting behind the pinewoods, live DJ set, mocktail bar. Table reservation recommended.',
   'غروب الشمس خلف الصنوبر، عرض دي جاي مباشر، بار كوكتيلات. يُنصح بحجز طاولة.',
   '/images/event-dj.svg', 2),

  ('event-private', 'privatisation', 'Privatisation', 'Privatization', 'الحجز الخاص',
   'private', 'on-request', '—', null,
   'Anniversaires, fiançailles, événements d''entreprise. Capacité 50 à 300 personnes. Devis sur mesure.',
   'Birthdays, engagements, corporate events. Capacity 50 to 300. Custom quote.',
   'أعياد الميلاد، الخطوبة، فعاليات الشركات. سعة 50 إلى 300 شخص. عرض مخصّص.',
   '/images/event-private.svg', 3)
on conflict (id) do nothing;
