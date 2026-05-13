/**
 * Single source of truth for KNB Detailing business data.
 * Anything flagged {{OWNER_CONFIRM_*}} is logged in /MISSING_DATA.md.
 * When the owner confirms a value, replace it here — nowhere else.
 */

export const BUSINESS = {
  legalName: "KNB Detailing LLC",
  shortName: "KNB Detailing",
  tagline: "Lake-ready. Showroom-clean.",
  description:
    "Mobile auto, boat, RV, and motorcycle detailing for Lake Wawasee and Kosciusko County. Licensed, insured, locally owned.",
  owners: ["Krista Hohman", "Benjamin Hohman"],
  phone: "(574) 265-7278",
  phoneE164: "+15742657278",
  email: "{{OWNER_CONFIRM_EMAIL}}", // proposed: hello@knbdetailing.com
  address: {
    street: "4381 E Magill Court",
    city: "Syracuse",
    state: "IN",
    zip: "46567",
    country: "US",
  },
  geo: {
    // Approximate — Syracuse, IN town center
    lat: 41.4259,
    lng: -85.7522,
  },
  hours: {
    // {{OWNER_CONFIRM_HOURS}} — proposed defaults
    monday: "8:00 AM – 6:00 PM",
    tuesday: "8:00 AM – 6:00 PM",
    wednesday: "8:00 AM – 6:00 PM",
    thursday: "8:00 AM – 6:00 PM",
    friday: "8:00 AM – 6:00 PM",
    saturday: "8:00 AM – 6:00 PM",
    sunday: "By appointment",
  },
  // ISO-8601 weekday + time for schema.org openingHours
  openingHoursSpec: [
    { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "08:00", closes: "18:00" },
  ],
  social: {
    facebook: "https://www.facebook.com/p/KNB-detailing-LLC-100085547831233/",
    instagram: "{{OWNER_CONFIRM_INSTAGRAM_URL}}",
    google: "{{OWNER_CONFIRM_GBP_URL}}",
  },
  chambers: [
    {
      name: "Syracuse-Wawasee Chamber of Commerce",
      url: "https://tourism.swchamber.com/list/member/knb-detailing-llc-1378",
      memberId: "1378",
    },
    {
      name: "Kosciusko Chamber of Commerce",
      url: "{{OWNER_CONFIRM_KOSCIUSKO_CHAMBER_LISTING}}",
    },
  ],
  licensedAndInsured: true,
  indianaSosEntityId: "{{OWNER_CONFIRM_SOS_ENTITY_ID}}",
  indianaSosFormationDate: "{{OWNER_CONFIRM_SOS_FORMATION_DATE}}",
  indianaSosRegisteredAgent: "{{OWNER_CONFIRM_SOS_REGISTERED_AGENT}}",
} as const;

export const SERVICE_AREA = {
  primary: ["Syracuse", "Lake Wawasee"],
  secondary: [
    "Warsaw",
    "Winona Lake",
    "Milford",
    "North Webster",
    "Pierceton",
    "Leesburg",
    "Cromwell",
  ],
  tertiary: ["Goshen", "Wakarusa", "Nappanee", "Ligonier", "Albion"],
  radiusMiles: 25,
  lakes: [
    "Lake Wawasee",
    "Syracuse Lake",
    "Tippecanoe Lake",
    "Webster Lake",
    "Big Chapman Lake",
    "Little Chapman Lake",
    "Winona Lake",
  ],
} as const;

export const SITE = {
  name: BUSINESS.shortName,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://knbdetailing.com",
  defaultLocale: "en-US",
  twitterHandle: "{{OWNER_CONFIRM_TWITTER}}",
} as const;

export const NAV_PRIMARY = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Beaconshire Advisory built-by credit. Subtle credit in the site footer.
 * Toggle to `false` to remove (the owner owns the site outright; the credit
 * is a courtesy, not a requirement).
 */
export const BEACONSHIRE = {
  enabled: true,
  name: "Beaconshire Advisory",
  url: "{{OWNER_CONFIRM_BEACONSHIRE_URL}}", // owner of Beaconshire fills this in
  tagline: "Local business websites · Owned by you",
} as const;

export const NAV_FOOTER = {
  services: [
    { href: "/services/auto", label: "Auto detailing" },
    { href: "/services/boat", label: "Boat detailing" },
    { href: "/services/rv", label: "RV detailing" },
    { href: "/services/motorcycle", label: "Motorcycle detailing" },
    { href: "/services/ceramic-coating", label: "Ceramic coating" },
    { href: "/services/paint-correction", label: "Paint correction" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    { href: "/membership", label: "Membership" },
    { href: "/gift-cards", label: "Gift cards" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
    { href: "/legal/accessibility", label: "Accessibility" },
  ],
} as const;
