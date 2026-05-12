/**
 * Service-page content. Each entry powers /services/[slug]. Add a slug here +
 * the dynamic route picks it up automatically. Copy is production-ready.
 */

export type ServicePriceTier = {
  tier: string;
  size: string;
  fromCents: number;
  detail?: string;
};

export type ServicePage = {
  slug: string;
  category: "auto" | "boat" | "rv" | "motorcycle" | "ceramic" | "correction";
  badge: string;
  title: string;
  hero: {
    tagline: string;
    description: string;
  };
  whatsIncluded: string[];
  pricing: ServicePriceTier[];
  process: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  extraSections?: {
    title: string;
    body: string;
    bullets?: string[];
  }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "auto",
    category: "auto",
    badge: "Auto detailing",
    title: "Auto detailing",
    hero: {
      tagline: "Cars, trucks, SUVs — done in your driveway.",
      description:
        "Express through ceramic. Hand-washed, hand-dried, every panel and every cup holder. We bring water, power, and the products that work on Indiana road grit.",
    },
    whatsIncluded: [
      "Pre-rinse with foam cannon and decon wash",
      "Wheels, wells, tires, and door jambs",
      "Hand-dry with plush microfiber",
      "Vacuum carpets, floor mats, trunk",
      "Wipe-down every interior surface — vents, screens, cup holders",
      "Streak-free glass inside and out",
      "Tire dressing and trim conditioner",
      "Spray sealant on paint (Full+) or ceramic (Premium+)",
    ],
    pricing: [
      { tier: "Express", size: "Compact / Midsize", fromCents: 7500, detail: "~1 hr" },
      { tier: "Express", size: "Large / XL / XXL", fromCents: 9500, detail: "~1 hr" },
      { tier: "Full Detail", size: "Compact / Midsize", fromCents: 28500, detail: "3–4 hrs" },
      { tier: "Full Detail", size: "Large / XL / XXL", fromCents: 36500, detail: "4–5 hrs" },
      { tier: "Premium (1-step correction + sealant)", size: "Compact / Midsize", fromCents: 49500, detail: "6–7 hrs" },
      { tier: "Premium", size: "Large / XL / XXL", fromCents: 59500, detail: "7–8 hrs" },
    ],
    process: [
      {
        title: "Inspection",
        detail:
          "We walk the vehicle with you when we arrive, note any defects, and confirm scope. No surprises later.",
      },
      {
        title: "Decontamination",
        detail:
          "Iron-X if there's brake dust embedded, clay if the surface still feels gritty after wash. Standard on Full and Premium.",
      },
      {
        title: "Inside-out clean",
        detail:
          "We work seat-by-seat. Pet hair, embedded sand, sticky cup holders, dashboard dust — gone.",
      },
      {
        title: "Protect",
        detail:
          "Spray sealant or ceramic on paint, UV protectant on trim and dash, hydrophobic on glass.",
      },
    ],
    faqs: [
      {
        q: "How long does a Full Detail take?",
        a: "3–5 hours depending on size and condition. Premium runs 6–8 hours. We'll always give you a target window when we confirm.",
      },
      {
        q: "Can you remove pet hair?",
        a: "Yes — most pet hair is included with Full Detail. Heavy buildup is a $35–$65 add-on so we can spend the extra 30–45 minutes on it.",
      },
      {
        q: "What about smoke odor?",
        a: "We use ozone treatment as an add-on. It's a sealed 60–90 minute treatment that destroys smoke, mildew, and pet odors at the molecular level.",
      },
    ],
    relatedSlugs: ["ceramic-coating", "paint-correction"],
  },
  {
    slug: "boat",
    category: "boat",
    badge: "Boat detailing",
    title: "Boat detailing — dockside on Lake Wawasee",
    hero: {
      tagline: "Lift, dock, or trailer — wherever your boat lives.",
      description:
        "We detail more boats on Lake Wawasee than anywhere else. Pontoons, runabouts, ski boats, wave runners — gel-coat oxidation, vinyl seats, marine carpet, hardware. We come to your slip, your boat house, or your lift.",
    },
    whatsIncluded: [
      "Hull wash with marine-safe soap (won't strip wax)",
      "Light gel-coat oxidation cut on Full Detail (heavy on Premium)",
      "Vinyl seat clean + conditioner (UV-protectant)",
      "Marine carpet shampoo and extraction",
      "Metal polish — cleats, ladders, rails, bow rails",
      "Glass and isinglass cleaning",
      "Bilge wipe-down (Premium)",
      "Pre-wax / sealant on hull",
    ],
    pricing: [
      { tier: "Express (dockside wash + wipe-down)", size: "Up to 20'", fromCents: 18500, detail: "~1.5 hrs" },
      { tier: "Express", size: "21–24'", fromCents: 26500, detail: "~2 hrs" },
      { tier: "Full Detail", size: "Up to 20' (pontoon or runabout)", fromCents: 49500, detail: "4–5 hrs" },
      { tier: "Full Detail", size: "21–24'", fromCents: 69500, detail: "5–6 hrs" },
      { tier: "Gel-Coat Restoration", size: "Up to 20'", fromCents: 79500, detail: "6–8 hrs" },
      { tier: "Gel-Coat Restoration", size: "21–24' and up", fromCents: 129500, detail: "8+ hrs" },
      { tier: "Fall Winterize + Detail", size: "Any size", fromCents: 39500, detail: "Pre-storage clean before shrink wrap" },
    ],
    process: [
      {
        title: "Lift or dock setup",
        detail:
          "Most pontoons are easier to detail on the lift than on the trailer. We'll bring a generator if you don't have shore power.",
      },
      {
        title: "Hull and gel-coat",
        detail:
          "Marine-safe degrease, oxidation cut if needed, polish. We won't pull the boat off the lift unless you ask.",
      },
      {
        title: "Vinyl and carpet",
        detail:
          "Heated extraction on carpet, vinyl clean + UV conditioner on seats. We finish before the dock dust settles back.",
      },
      {
        title: "Hardware",
        detail:
          "Metal polish on rails and cleats, glass and isinglass, dressing on the dash and console plastics.",
      },
    ],
    faqs: [
      {
        q: "Can you detail my pontoon while it's on the lift?",
        a: "Yes — it's actually our preference. We have extension hoses and lift-stable equipment. The only thing we can't do on a lift is bottom paint touch-ups.",
      },
      {
        q: "What's gel-coat oxidation?",
        a: "When the clear top layer of fiberglass dulls from UV exposure, it gets chalky. We compound and polish it back to gloss, then seal. A faded 10-year-old pontoon can look 5 years younger.",
      },
      {
        q: "Do you offer seasonal packages?",
        a: "Yes — Captain's Club covers spring de-winterize, monthly mid-season washes, and fall winterize/wrap-ready clean. About 20% less than à la carte. See the Membership page.",
      },
      {
        q: "Can you handle vinyl mold and mildew?",
        a: "Yes. Mild mildew comes off with our marine cleaners. Deep-set staining sometimes needs a magic eraser plus oxalic — we'll show you a test patch before committing.",
      },
    ],
    relatedSlugs: ["motorcycle", "rv"],
    extraSections: [
      {
        title: "Lakes we serve",
        body: "Centered on Lake Wawasee, but we also work the rest of the local water:",
        bullets: [
          "Lake Wawasee (Syracuse) — our home base",
          "Syracuse Lake",
          "Tippecanoe Lake",
          "Webster Lake",
          "Big Chapman and Little Chapman",
          "Winona Lake",
        ],
      },
      {
        title: "Pontoon-specific add-ons",
        body: "Pontoons have surfaces other boats don't. We can add:",
        bullets: [
          "Aluminum oxidation cut on logs and fences",
          "Bimini canvas clean + UV treatment",
          "Snap-cover deep clean",
          "Trolling motor housing detail",
        ],
      },
      {
        title: "Seasonal cadence",
        body: "Most lake boats benefit from three touch points a year:",
        bullets: [
          "Spring — uncover, wash off winter grime, recondition vinyl",
          "Mid-season — quick dockside wash to keep pollen and water spots from baking on",
          "Fall — pre-storage deep clean so nothing's growing under the shrink wrap by April",
        ],
      },
    ],
  },
  {
    slug: "rv",
    category: "rv",
    badge: "RV detailing",
    title: "RV detailing",
    hero: {
      tagline: "Class A, Class C, fifth-wheel, travel trailer.",
      description:
        "RVs accumulate years of UV, road film, and storage stains. We come to your home, your storage lot, or your campground site. Most full details take a single day.",
    },
    whatsIncluded: [
      "Soft-wash exterior with marine-safe degreaser",
      "Fiberglass oxidation cut + seal",
      "Rubber roof clean + UV treatment",
      "Slide-out seals cleaned and conditioned",
      "Awning clean and stowed",
      "Interior dust, vacuum, hard-surface clean",
      "Bay doors, propane locker, hitch area",
    ],
    pricing: [
      { tier: "Full Detail", size: "Up to 28' (small Class C, travel trailer)", fromCents: 44500, detail: "6–7 hrs" },
      { tier: "Full Detail", size: "28–34' (Class C, midsize fifth-wheel)", fromCents: 59500, detail: "7–8 hrs" },
      { tier: "Full Detail", size: "35'+ (Class A, large fifth-wheel)", fromCents: 84500, detail: "8+ hrs" },
      { tier: "Oxidation Restoration", size: "Add-on per panel", fromCents: 29500, detail: "Quoted after inspection" },
    ],
    process: [
      {
        title: "Walkaround",
        detail:
          "We assess oxidation severity, decal condition, and roof state before quoting any oxidation work.",
      },
      {
        title: "Roof first",
        detail:
          "Rubber roofs get a dedicated cleaner that won't degrade the membrane. We don't pressure-wash roofs.",
      },
      {
        title: "Sidewalls",
        detail:
          "Two-bucket soft-wash, oxidation cut on faded panels, sealant. We mask decals when needed.",
      },
      {
        title: "Inside",
        detail:
          "Dust top-down, vacuum, hard-surface clean. We work around your gear — we don't unpack the RV.",
      },
    ],
    faqs: [
      {
        q: "Can you come to the storage lot?",
        a: "Yes, as long as we can access water and we have permission from the lot manager. Most local storage lots are familiar with us.",
      },
      {
        q: "How long can oxidation removal take?",
        a: "A faded 30-foot Class C can be 8–12 hours of paint correction. We'll quote each side and roof separately so you can scope.",
      },
    ],
    relatedSlugs: ["auto", "ceramic-coating"],
  },
  {
    slug: "motorcycle",
    category: "motorcycle",
    badge: "Motorcycle detailing",
    title: "Motorcycle detailing",
    hero: {
      tagline: "Harley, sportbike, cruiser, adventure.",
      description:
        "Cleaner than the showroom. Hand-wash, chrome polish, leather condition, and the corners that get missed on a wash-and-rinse at home.",
    },
    whatsIncluded: [
      "Hand wash with bike-safe shampoo",
      "Chain clean + lube (or belt-drive inspection)",
      "Painted-surface polish",
      "Chrome polish — pipes, levers, wheels",
      "Leather seat + saddlebag conditioner",
      "Plastic restorer on faded fairings and panels",
      "Wheel detail with degreaser if needed",
    ],
    pricing: [
      { tier: "Full Detail", size: "Sport / Standard / Cruiser", fromCents: 18500, detail: "2–3 hrs" },
      { tier: "Full Detail", size: "Touring (Harley Road King, Goldwing)", fromCents: 28500, detail: "3–4 hrs" },
      { tier: "Show prep (additional polish + ceramic spray)", size: "Any", fromCents: 12500, detail: "Add-on" },
    ],
    process: [
      {
        title: "Strip the grime",
        detail:
          "Pre-soak the bike, degrease the chain, knock the bug splatter off the front fender and headlight.",
      },
      {
        title: "Polish",
        detail:
          "Two-step polish on paint, dedicated chrome polish on pipes and metal, plastic restorer where needed.",
      },
      {
        title: "Protect",
        detail:
          "Carnauba wax or ceramic spray on paint, leather conditioner on seats, fresh chain lube.",
      },
    ],
    faqs: [
      {
        q: "Do you do show prep?",
        a: "Yes — for bike nights or shows, we'll spend extra time on chrome, painted surfaces, and engine detail. Book as Full + Show Prep.",
      },
    ],
    relatedSlugs: ["auto", "ceramic-coating"],
  },
  {
    slug: "ceramic-coating",
    category: "ceramic",
    badge: "Ceramic coating",
    title: "Ceramic coating",
    hero: {
      tagline: "Multi-year hydrophobic paint protection.",
      description:
        "A real ceramic — applied right — gives you 2–5 years of UV protection, easier washes, and surface gloss that doesn't fade. We do the full prep so it bonds correctly.",
    },
    whatsIncluded: [
      "Decontamination wash + iron remover",
      "Clay bar treatment",
      "Single-step paint correction (multi-step on dark/heavy oxidation)",
      "Panel wipe to strip oils",
      "Ceramic application — paint, wheels, glass, trim",
      "24-hour curing window",
      "6-month maintenance wash included",
      "Documented certificate of coating + maintenance schedule",
    ],
    pricing: [
      { tier: "3-year ceramic", size: "Compact / Midsize", fromCents: 129500, detail: "1 full day" },
      { tier: "3-year ceramic", size: "Large / XL / XXL", fromCents: 169500, detail: "1–1.5 days" },
      { tier: "5-year ceramic (premium)", size: "Compact / Midsize", fromCents: 179500, detail: "1.5 days" },
      { tier: "5-year ceramic", size: "Large / XL / XXL", fromCents: 229500, detail: "2 days" },
    ],
    process: [
      {
        title: "Honest assessment",
        detail:
          "We won't put a ceramic on a vehicle that needs paint correction first. We'll show you the swirls under a paint light and quote accordingly.",
      },
      {
        title: "Prep — the part that matters",
        detail:
          "Cheap ceramic jobs skip clay and correction. We don't. Your finish bonds to bare, polished paint.",
      },
      {
        title: "Application",
        detail:
          "Done in a clean, dust-controlled space. Single panel at a time, leveled with a microfiber cross-pattern.",
      },
      {
        title: "Cure + maintenance",
        detail:
          "Stays out of rain for 24 hours, no wash for 7 days. We include a maintenance wash at the 6-month mark.",
      },
    ],
    faqs: [
      {
        q: "Is ceramic worth it for a lake-side daily driver?",
        a: "On a vehicle that sees sun, pollen, bug bodies, gravel-road dust, and the occasional gas-pump splash? Honestly yes. UV protection alone is worth a few years.",
      },
      {
        q: "Does it scratch-proof my car?",
        a: "No. Ceramic is hardness, not body armor. It resists swirl marks from washing and makes contamination wipe off easier, but rock chips still happen.",
      },
      {
        q: "How is this different from wax?",
        a: "Wax lasts 1–3 months and degrades with each wash. Ceramic bonds chemically to the clear coat and lasts years.",
      },
    ],
    relatedSlugs: ["paint-correction", "auto"],
  },
  {
    slug: "paint-correction",
    category: "correction",
    badge: "Paint correction",
    title: "Paint correction",
    hero: {
      tagline: "Remove swirls, water spots, and scratches.",
      description:
        "Most cars hide gloss under thousands of micro-scratches. We measure paint thickness, compound the defects out, and refine to a clear, deep finish — perfect prep for ceramic.",
    },
    whatsIncluded: [
      "Decon wash + clay",
      "Paint thickness measurement (we don't cut paint we shouldn't)",
      "Compound stage to remove medium scratches and oxidation",
      "Polish stage to refine and bring up gloss",
      "Panel-wipe and inspection under multiple light sources",
      "Sealant or ceramic-ready handoff",
    ],
    pricing: [
      { tier: "1-step correction (light defects)", size: "Compact / Midsize", fromCents: 44500 },
      { tier: "1-step correction", size: "Large / XL / XXL", fromCents: 59500 },
      { tier: "2-step correction (medium defects)", size: "Compact / Midsize", fromCents: 79500 },
      { tier: "2-step correction", size: "Large / XL / XXL", fromCents: 99500 },
      { tier: "Spot correction (one panel, one defect)", size: "Any", fromCents: 12500 },
    ],
    process: [
      {
        title: "Light test",
        detail:
          "We use a 5-light paint inspection setup so you see exactly what we're correcting and what we're leaving.",
      },
      {
        title: "Compound",
        detail:
          "Foam or microfiber pad, carefully scoped to defect depth. Always leaves room for future correction.",
      },
      {
        title: "Polish",
        detail:
          "Removes compound haze and brings up gloss. This is where the depth comes from.",
      },
      {
        title: "Hand off ceramic-ready",
        detail:
          "If you're booking ceramic next, we don't apply sealant — your ceramic bonds better to bare polished paint.",
      },
    ],
    faqs: [
      {
        q: "How is this different from a buff at the dealer?",
        a: "Dealer buffs are usually one-step with aggressive product. We measure paint thickness first and use the lightest combination that achieves the defect removal.",
      },
      {
        q: "Will it permanently fix scratches?",
        a: "Scratches you can feel with your fingernail go below the clear coat and can't be fully corrected — we can minimize but not erase them. Most swirls and water spots disappear entirely.",
      },
    ],
    relatedSlugs: ["ceramic-coating", "auto"],
  },
];

export function findServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
