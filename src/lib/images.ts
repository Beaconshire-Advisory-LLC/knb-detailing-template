/**
 * Photo registry — every image is now a real KNB Detailing photo provided
 * by the owner. Files live under /public/photos/.
 */

const local = (file: string) => `/photos/${file}`;

export const PHOTOS = {
  // Hero & marketing
  homeHero: local("mobile-vehicle.jpg"),         // branded silver Transit Connect work van
  homeSecondary: local("genesis.jpg"),           // Hyundai Genesis — luxury detail showcase
  membershipBackdrop: local("pontoon.jpg"),      // pontoon dockside

  // Service category heroes
  servicesAuto: local("genesis.jpg"),
  servicesBoat: local("boat.jpg"),
  servicesRv: local("rv-1.jpg"),
  servicesMotorcycle: local("motorcycle.jpg"),
  servicesCeramic: local("truck-2.jpg"),
  servicesPaintCorrection: local("interior.jpg"),

  // "We come to you" feature blocks
  weComeAuto: local("suv-1.jpg"),
  weComeBoat: local("boat.jpg"),
  weComeRvMoto: local("rv-2.jpg"),

  // Team / about
  aboutOwners: local("owners.jpg"),              // Krista & Benjamin Hohman

  // Logo + award
  logo: local("logo.jpg"),
  awardBadge: local("award.jpg"),                // Best of BusinessRate 2025 plaque
} as const;

export type GalleryKind =
  | "car"
  | "truck"
  | "suv"
  | "boat"
  | "rv"
  | "motorcycle"
  | "jetski"
  | "commercial";

export const GALLERY_PHOTOS: { kind: GalleryKind; title: string; url: string }[] = [
  { kind: "boat",       title: "Lake Wawasee — dockside detail",         url: local("boat.jpg") },
  { kind: "boat",       title: "Pontoon — full season package",          url: local("pontoon.jpg") },
  { kind: "jetski",     title: "Sea-Doo — pre-season detail",            url: local("jet-ski.jpg") },
  { kind: "car",        title: "Hyundai Genesis — full detail + shine",  url: local("genesis.jpg") },
  { kind: "car",        title: "Interior — leather + carpet",            url: local("interior.jpg") },
  { kind: "motorcycle", title: "Harley-Davidson Softail — show prep",    url: local("motorcycle.jpg") },
  { kind: "rv",         title: "Class C RV — exterior + roof",           url: local("rv-1.jpg") },
  { kind: "rv",         title: "RV — pre-trip refresh",                  url: local("rv-2.jpg") },
  { kind: "suv",        title: "SUV — full detail",                      url: local("suv-1.jpg") },
  { kind: "suv",        title: "SUV — paint correction",                 url: local("suv-2.jpg") },
  { kind: "truck",      title: "Truck — exterior + bed clean",           url: local("truck-1.jpg") },
  { kind: "truck",      title: "Truck — show prep + ceramic finish",     url: local("truck-2.jpg") },
  { kind: "commercial", title: "International semi — fleet detail",      url: local("semi.jpg") },
];
