/**
 * Photo registry — stand-in photography sourced from Unsplash (royalty-free,
 * properly licensed) until the owner uploads real KNB Detailing photos.
 *
 * Every URL here is a placeholder. When real photos arrive, swap the value
 * with a Supabase Storage URL (gallery/ bucket) and keep the same key.
 *
 * Owner: see MISSING_DATA.md §3 for the upload checklist.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  // Hero & marketing
  homeHero: u("1494976388531-d1058494cdd8", 1920),       // detail shop / clean car
  homeSecondary: u("1492144534655-ae79c964c9d7", 1200),  // hand washing / foam
  membershipBackdrop: u("1502082553048-f009c37129b9", 1600), // pontoon on lake

  // Service category heroes
  servicesAuto: u("1542362567-b07e54358753", 1600),            // sleek car detail
  servicesBoat: u("1535930891776-0c2dfb7fda1a", 1600),         // boat at dock
  servicesRv: u("1523987355523-c7b5b0dd90a7", 1600),           // motorhome
  servicesMotorcycle: u("1558981806-ec527fa84c39", 1600),      // motorcycle detail
  servicesCeramic: u("1605559424843-9e4c228bf1c2", 1600),      // glossy paint reflection
  servicesPaintCorrection: u("1485463611174-f302f6a5c1c9", 1600), // polishing

  // "We come to you" feature blocks
  weComeAuto: u("1492144534655-ae79c964c9d7", 800),
  weComeBoat: u("1502082553048-f009c37129b9", 800),
  weComeRvMoto: u("1523987355523-c7b5b0dd90a7", 800),

  // Team / about (silhouetted placeholder — owner replaces with real headshot)
  aboutOwners: u("1521791136064-7986c2920216", 1200),  // couple silhouette
} as const;

export const GALLERY_PHOTOS: { kind: "car" | "truck" | "suv" | "boat" | "rv" | "motorcycle"; title: string; url: string }[] = [
  { kind: "truck",      title: "F-150 — Full + ceramic",                url: u("1583121274602-3e2820c69888", 800) },
  { kind: "boat",       title: "22' pontoon — gel-coat restoration",    url: u("1502082553048-f009c37129b9", 800) },
  { kind: "boat",       title: "Mastercraft X22 — show prep",           url: u("1559825481-12a05cc00344", 800) },
  { kind: "rv",         title: "Class C Winnebago — oxidation removal", url: u("1523987355523-c7b5b0dd90a7", 800) },
  { kind: "motorcycle", title: "Harley Road King — show prep",          url: u("1558981806-ec527fa84c39", 800) },
  { kind: "car",        title: "Tesla Model Y — paint correction",      url: u("1494976388531-d1058494cdd8", 800) },
  { kind: "boat",       title: "Yamaha 242X — vinyl + carpet",          url: u("1535930891776-0c2dfb7fda1a", 800) },
  { kind: "suv",        title: "Chevy Tahoe — full interior detail",    url: u("1606016159991-dfe4f2746ad5", 800) },
  { kind: "motorcycle", title: "Ducati Monster — chrome + leather",     url: u("1558981420-87aa9dad1c89", 800) },
  { kind: "truck",      title: "Toyota Tundra — ceramic 5-year",        url: u("1502877338535-766e1452684a", 800) },
  { kind: "boat",       title: "Sea Ray 230 — hull oxidation removal",  url: u("1518895949257-7621c3c786d7", 800) },
  { kind: "suv",        title: "BMW X5 — paint correction + wax",       url: u("1605559424843-9e4c228bf1c2", 800) },
];
