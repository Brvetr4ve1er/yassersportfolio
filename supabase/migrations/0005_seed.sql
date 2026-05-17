-- ============================================================================
-- 0005_seed.sql — Seed data mirroring lib/data/mock.ts
-- Safe to re-run: uses ON CONFLICT.
-- ============================================================================

insert into public.accommodations
(slug, name_fr, name_ar, type, capacity, price_weekday, price_weekend, price_holiday, amenities, description_fr, description_ar)
values
('chalet-standard', 'Chalet Standard', 'كوخ عادي', 'chalet', 4, 7500, 9500, 12000,
 array['wifi','ac','kitchen','tv','parking','terrace'],
 'Notre chalet familial le plus accessible.',
 'كوخنا العائلي الأكثر اقتصادًا.'),
('chalet-familial-olivier', 'Chalet Familial Olivier', 'كوخ العائلة الزيتون', 'chalet', 6, 11500, 14500, 18000,
 array['wifi','ac','heating','kitchen','tv','parking','view','terrace'],
 'Deux chambres, salon, cuisine équipée, grande terrasse.',
 'غرفتان، صالون، مطبخ مجهز، شرفة كبيرة.'),
('tente-berbere-premium', 'Tente Berbère Premium', 'خيمة أمازيغية فاخرة', 'tent', 4, 6000, 8000, 10000,
 array['heating','view','breakfast','pool_access'],
 'Tapis traditionnels, lit confortable, lanternes à huile.',
 'زرابي تقليدية، سرير مريح، فوانيس.'),
('glamping-etoile', 'Glamping Étoilé', 'غلامبينغ النجوم', 'glamping', 2, 9000, 12000, 15000,
 array['wifi','ac','heating','view','breakfast','pool_access'],
 'Dôme transparent, lit king, sanitaires privatifs.',
 'قبة شفافة، سرير كبير، حمام خاص.')
on conflict (slug) do nothing;

insert into public.activities
(slug, name_fr, name_ar, description_fr, description_ar, price_per_person, min_participants, max_participants, duration_minutes, available_days)
values
('equitation', 'Équitation', 'ركوب الخيل',
 'Balade encadrée à cheval dans nos vergers et sentiers.',
 'جولة بالحصان في بساتيننا ومساراتنا.',
 1500, 1, 10, 60, array['wednesday','thursday','friday','saturday','sunday']),
('quad', 'Quad sur Sentiers', 'كواد على المسارات',
 'Circuit balisé en quad à travers le complexe.',
 'جولة بالكواد عبر المركّب ومحيطه.',
 2000, 1, 6, 45, array['friday','saturday','sunday']),
('piscine', 'Accès Piscine', 'دخول المسبح',
 'Accès journée à notre piscine extérieure chauffée.',
 'دخول يومي للمسبح الخارجي المُسخّن.',
 800, 1, 50, 480, array['monday','tuesday','wednesday','thursday','friday','saturday','sunday']),
('visite-rucher', 'Visite du Rucher', 'زيارة المنحلة',
 'Découverte des ruches en compagnie de notre apiculteur.',
 'اكتشاف خلايا النحل برفقة نحّالنا.',
 600, 2, 12, 60, array['saturday','sunday']),
('cueillette-verger', 'Cueillette dans le Verger', 'قطف في البستان',
 'Cueillez vos fruits selon la saison.',
 'اقطف فواكهك حسب الموسم.',
 500, 1, 20, 90, array['friday','saturday','sunday']),
('camping', 'Emplacement Camping', 'موقع تخييم',
 'Emplacement pour tente personnelle.',
 'موقع لخيمة شخصية.',
 1200, 1, 6, 1440, array['friday','saturday'])
on conflict (slug) do nothing;

insert into public.packages
(slug, name_fr, name_ar, description_fr, description_ar, price, valid_from, valid_until, max_bookings)
values
('weekend-decouverte', 'Week-end Découverte', 'نهاية أسبوع اكتشاف',
 '2 nuits en chalet standard + petit-déjeuner + 1 séance équitation.',
 'ليلتان في كوخ عادي + إفطار + جلسة خيل.',
 22000, '2026-05-01', '2026-09-30', 80),
('famille-grande-evasion', 'Famille Grande Évasion', 'هروب عائلي كبير',
 '3 nuits en chalet familial + 1 quad + 1 équitation.',
 '3 ليالٍ في الكوخ العائلي + كواد + خيل.',
 45000, '2026-05-01', '2026-09-30', 30),
('nuit-glamping-romantique', 'Nuit Glamping Romantique', 'ليلة غلامبينغ رومانسية',
 '1 nuit glamping + dîner aux chandelles + petit-déjeuner.',
 'ليلة غلامبينغ + عشاء على ضوء الشموع + إفطار.',
 16000, '2026-04-01', '2026-10-31', 60)
on conflict (slug) do nothing;
