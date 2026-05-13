/**
 * Photo registry — real KNB Detailing photos sourced from the owner's
 * Facebook page + the cyan-and-black brand logo, stored locally in
 * /public/photos/.
 *
 * Two slots still use Unsplash stand-ins because the owner hasn't provided
 * matching photos yet:
 *  - `servicesMotorcycle` (no real motorcycle photo on file)
 *  - `aboutOwners` (no real Krista & Benjamin headshot on file)
 *
 * Both are flagged in MISSING_DATA.md §3.
 */

const local = (file: string) => `/photos/${file}`;
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  // Hero & marketing — all real KNB photos
  homeHero: local("mobile-vehicle.jpg"),         // branded silver Transit Connect work van
  homeSecondary: local("genesis.jpg"),           // Hyundai Genesis — luxury detail showcase
  membershipBackdrop: local("pontoon.jpg"),      // pontoon dockside

  // Service category heroes
  servicesAuto: local("genesis.jpg"),
  servicesBoat: local("boat.jpg"),
  servicesRv: local("rv-1.jpg"),
  servicesMotorcycle: u("1558981806-ec527fa84c39", 1600), // Unsplash — no real motorcycle photo yet
  servicesCeramic: local("truck-2.jpg"),         // glossy black truck — shows ceramic finish
  servicesPaintCorrection: local("interior.jpg"), // close-up paint/surface work

  // "We come to you" feature blocks
  weComeAuto: local("suv-1.jpg"),
  weComeBoat: local("boat.jpg"),
  weComeRvMoto: local("rv-2.jpg"),

  // Team / about — stand-in until owners provide a real headshot
  aboutOwners: u("1521791136064-7986c2920216", 1200),

  // Logo + award
  logo: local("logo.jpg"),
  awardBadge: local("award.jpg"),                // Best of BusinessRate 2025 plaque
} as const;

export const GALLERY_PHOTOS: { kind: "car" | "truck" | "suv" | "boat" | "rv" | "motorcycle"; title: string; url: string }[] = [
  { kind: "boat",  title: "Lake Wawasee — dockside detail",        url: local("boat.jpg") },
  { kind: "boat",  title: "Pontoon — full season package",         url: local("pontoon.jpg") },
  { kind: "car",   title: "Hyundai Genesis — full detail + shine", url: local("genesis.jpg") },
  { kind: "car",   title: "Interior — leather + carpet",           url: local("interior.jpg") },
  { kind: "rv",    title: "Class C RV — exterior + roof",          url: local("rv-1.jpg") },
  { kind: "rv",    title: "RV — pre-trip refresh",                 url: local("rv-2.jpg") },
  { kind: "suv",   title: "SUV — full detail",                     url: local("suv-1.jpg") },
  { kind: "suv",   title: "SUV — paint correction",                url: local("suv-2.jpg") },
  { kind: "truck", title: "Truck — exterior + bed clean",          url: local("truck-1.jpg") },
  { kind: "truck", title: "Truck — show prep + ceramic finish",    url: local("truck-2.jpg") },
];
