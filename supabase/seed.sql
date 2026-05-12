-- KNB Detailing — seed data
-- PLACEHOLDER pricing — owner to confirm in /admin/services before launch.
-- Apply via `supabase db reset` (local) or `psql ... -f supabase/seed.sql` (manual).

-- =====================================================================
-- Service catalog
-- =====================================================================
insert into public.services (slug, name, category, short_description, long_description, base_duration_min, sort_order) values
  ('auto-express',           'Express auto wash',          'auto',       'Quick wash, wheels, tires, windows.',                            'Full exterior wash with foam cannon, wheel and tire detail, streak-free window clean, and a hand dry. The right cadence between full details.',                          60,  10),
  ('auto-full',              'Full auto detail',           'auto',       'Inside and out, every surface.',                                 'Wash + decontaminate + interior shampoo + leather/vinyl condition + spray sealant + glass + tires. Plan 3–5 hours.',                                                          240, 20),
  ('auto-premium',           'Premium auto detail',        'auto',       'Paint correction + interior deep clean + sealant.',              'One-step machine polish for swirl removal, decon wash, full interior deep clean (steam + extraction), 6-month sealant. Plan 6–8 hours.',                                      420, 30),
  ('boat-express',           'Boat express wash',          'boat',       'Wash, wipe-down, tire/trailer check.',                           'Dockside wash with marine-safe soap, hull rinse, towel dry, vinyl seat wipe-down, trailer tire check if on lift. Maintains the work of a full detail.',                       90,  40),
  ('boat-full',              'Full boat detail',           'boat',       'Hull wash, oxidation removal, seat condition.',                  'Hull wash, light gel-coat oxidation removal, vinyl seat clean + condition, carpet shampoo, metal polish, wax. Plan 4–6 hours dockside.',                                     330, 50),
  ('boat-gelcoat',           'Gel-coat oxidation removal', 'boat',       'Restore faded, chalky hulls.',                                   'Heavy compound + polish to remove oxidation, restore gloss. Includes hull seal. Severity determines time; typical pontoon: 6–8 hours.',                                      480, 60),
  ('boat-winterize-detail',  'Fall winterize + detail',    'boat',       'Pre-storage clean, seal, and wrap-ready.',                       'Deep clean before shrink wrap or storage cover: hull, seats, carpet, metal, hatches. Helps prevent winter staining and mildew.',                                              300, 70),
  ('rv-full',                'Full RV detail',             'rv',         'Exterior wash, oxidation, seal; interior clean.',                'RV-scaled wash, rubber roof clean, oxidation polish on fiberglass sides, slide-out seals, interior dust + surface clean. Class C / Class A pricing differs.',                  480, 80),
  ('moto-full',              'Full motorcycle detail',     'motorcycle', 'Hand wash, polish, chrome, leather.',                            'Bath, chain clean and lube (no chain wax on belt-drive), polish all painted surfaces, chrome polish, leather conditioner on seats and bags, plastic restore on faded panels.', 180, 90),
  ('ceramic-coating',        'Ceramic coating',            'ceramic',    'Multi-year hydrophobic paint protection.',                       'Wash + decon + single-step polish + ceramic application. 3 or 5 year coatings available. Includes 6-month maintenance wash.',                                                 540, 100),
  ('paint-correction-2step', 'Two-step paint correction',  'correction', 'Restore gloss and remove swirls.',                               'Compound + polish to remove medium scratches, swirls, water spots. Pair with ceramic for lasting results.',                                                                  420, 110),
  ('addon-headlight',        'Headlight restoration',      'add_on',     'Sand, polish, seal hazed plastic lenses.',                       'Bring foggy headlights back to clarity. Sealed to prevent re-hazing for 12+ months.',                                                                                         60,  120),
  ('addon-pet-hair',         'Pet hair removal',           'add_on',     'Heavy pet-hair extraction.',                                     'Specialized rubber + extraction for heavy pet hair. Most cars 30–60 min.',                                                                                                     45,  130),
  ('addon-ozone',            'Ozone deodorizing',          'add_on',     'Removes smoke, mildew, pet odors.',                              'Sealed-cabin ozone treatment removes organic odors at the molecular level. 60–90 min.',                                                                                       60,  140),
  ('addon-engine-bay',       'Engine bay detail',          'add_on',     'Degrease and dress under the hood.',                             'Safe degrease, hand detail of plastics, hoses, and metal; dressing for a clean shop-finish look. 60 min.',                                                                    60,  150);

-- =====================================================================
-- Service prices (PLACEHOLDER — owner to confirm)
-- compact / midsize / large / xl / xxl
-- xxl is used for full-size pickups, Class A RVs, 24'+ pontoons
-- =====================================================================
insert into public.service_prices (service_id, size_category, price_cents)
select s.id, sz.size_category, sz.price_cents
from public.services s
join (values
  ('auto-express',           'compact',  6500),  ('auto-express',           'midsize',  7500),  ('auto-express',           'large', 8500),   ('auto-express',           'xl', 9500),   ('auto-express',           'xxl', 11000),
  ('auto-full',              'compact', 24500),  ('auto-full',              'midsize', 28500),  ('auto-full',              'large', 32500),  ('auto-full',              'xl', 36500),  ('auto-full',              'xxl', 42500),
  ('auto-premium',           'compact', 44500),  ('auto-premium',           'midsize', 49500),  ('auto-premium',           'large', 54500),  ('auto-premium',           'xl', 59500),  ('auto-premium',           'xxl', 69500),
  ('boat-express',           'midsize', 18500),  ('boat-express',           'large', 22500),    ('boat-express',           'xl', 26500),    ('boat-express',           'xxl', 32500),
  ('boat-full',              'midsize', 49500),  ('boat-full',              'large', 59500),    ('boat-full',              'xl', 69500),    ('boat-full',              'xxl', 89500),
  ('boat-gelcoat',           'midsize', 79500),  ('boat-gelcoat',           'large', 99500),    ('boat-gelcoat',           'xl',129500),    ('boat-gelcoat',           'xxl',169500),
  ('boat-winterize-detail',  'midsize', 39500),  ('boat-winterize-detail',  'large', 49500),    ('boat-winterize-detail',  'xl', 59500),    ('boat-winterize-detail',  'xxl', 79500),
  ('rv-full',                'large',  44500),   ('rv-full',                'xl', 59500),       ('rv-full',                'xxl', 84500),
  ('moto-full',              'compact', 18500),  ('moto-full',              'midsize', 22500),  ('moto-full',              'large', 28500),
  ('ceramic-coating',        'compact',129500),  ('ceramic-coating',        'midsize',149500),  ('ceramic-coating',        'large',169500), ('ceramic-coating',        'xl',189500), ('ceramic-coating',        'xxl',229500),
  ('paint-correction-2step', 'compact', 79500),  ('paint-correction-2step', 'midsize', 89500),  ('paint-correction-2step', 'large', 99500), ('paint-correction-2step', 'xl',119500), ('paint-correction-2step', 'xxl',149500),
  ('addon-headlight',        'compact',  9500),  ('addon-headlight',        'midsize',  9500),  ('addon-headlight',        'large', 9500),  ('addon-headlight',        'xl', 9500),
  ('addon-pet-hair',         'compact',  3500),  ('addon-pet-hair',         'midsize',  4500),  ('addon-pet-hair',         'large', 5500),  ('addon-pet-hair',         'xl', 6500),
  ('addon-ozone',            'compact',  7500),  ('addon-ozone',            'midsize',  7500),  ('addon-ozone',            'large', 9500),  ('addon-ozone',            'xl', 9500),
  ('addon-engine-bay',       'compact',  4500),  ('addon-engine-bay',       'midsize',  5500),  ('addon-engine-bay',       'large', 6500),  ('addon-engine-bay',       'xl', 7500)
) as sz(slug, size_category, price_cents) on s.slug = sz.slug;

-- =====================================================================
-- Packages
-- =====================================================================
insert into public.packages (slug, name, tier, category, description, base_price_cents, deposit_pct, sort_order) values
  ('auto-express-pkg',    'Auto Express',                'express',    'auto',  'Quick exterior + interior wipe-down. The right cadence between full details.',                                                            7500,  25, 10),
  ('auto-full-pkg',       'Auto Full Detail',            'full',       'auto',  'Inside and out — every panel, every cup holder.',                                                                                       28500, 25, 20),
  ('auto-premium-pkg',    'Auto Premium',                'premium',    'auto',  'Single-step paint correction, deep interior, 6-month sealant.',                                                                         49500, 25, 30),
  ('auto-ceramic-pkg',    'Auto Ceramic Coating',        'ceramic',    'auto',  'Multi-year ceramic protection with prep correction and maintenance wash.',                                                              149500, 25, 40),
  ('boat-express-pkg',    'Boat Express',                'express',    'boat',  'Dockside wash and wipe-down.',                                                                                                          22500, 25, 50),
  ('boat-full-pkg',       'Boat Full Detail',            'full',       'boat',  'Hull, seats, carpet, metal — the whole rig.',                                                                                            59500, 25, 60),
  ('boat-premium-pkg',    'Boat Premium',                'premium',    'boat',  'Includes gel-coat oxidation removal and seal.',                                                                                          99500, 25, 70),
  ('boat-captains-pkg',   'Captain''s Club',             'membership', 'boat',  'Spring de-winterize + monthly wash + fall winterize. Save ~20% vs. à la carte.',                                                       125000, 25, 80),
  ('membership-express',  'Express Refresh (monthly)',   'membership', 'auto',  'Monthly Express auto wash. Auto-charge; pause anytime.',                                                                                 7500,  0,  90),
  ('membership-lake',     'Lake Life Standard',          'membership', 'auto',  'Bi-monthly Full Detail. Includes 10% off add-ons.',                                                                                     25500, 0,  100),
  ('membership-wawasee',  'Wawasee Premium',             'membership', 'auto',  'Quarterly Full Detail + annual ceramic refresh.',                                                                                       39500, 0,  110);

-- =====================================================================
-- Service area ZIPs (Tier 1 = no travel fee; Tier 2 = +$25; Tier 3 = +$50)
-- =====================================================================
insert into public.service_zips (zip, city, county, tier, travel_fee_cents) values
  -- Tier 1: Syracuse / Lake Wawasee shoreline
  ('46567', 'Syracuse',      'Kosciusko', 1, 0),
  -- Tier 2: Kosciusko County
  ('46580', 'Warsaw',        'Kosciusko', 2, 2500),
  ('46582', 'Warsaw',        'Kosciusko', 2, 2500),
  ('46590', 'Winona Lake',   'Kosciusko', 2, 2500),
  ('46542', 'Milford',       'Kosciusko', 2, 2500),
  ('46555', 'North Webster', 'Kosciusko', 2, 2500),
  ('46562', 'Pierceton',     'Kosciusko', 2, 2500),
  ('46538', 'Leesburg',      'Kosciusko', 2, 2500),
  ('46732', 'Cromwell',      'Noble',     2, 2500),
  -- Tier 3: Elkhart / Noble
  ('46526', 'Goshen',        'Elkhart',   3, 5000),
  ('46573', 'Wakarusa',      'Elkhart',   3, 5000),
  ('46550', 'Nappanee',      'Elkhart',   3, 5000),
  ('46767', 'Ligonier',      'Noble',     3, 5000),
  ('46701', 'Albion',        'Noble',     3, 5000);

-- =====================================================================
-- Demo reviews (set approved=false until owner re-approves with real customers)
-- =====================================================================
-- Intentionally empty. Owner adds real reviews in /admin/reviews. The site
-- gracefully handles empty review state with copy directing to Google reviews.
