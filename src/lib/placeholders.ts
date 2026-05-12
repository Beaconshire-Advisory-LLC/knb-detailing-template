/**
 * Curated placeholder content used until the owner uploads real reviews,
 * photos, and packages. Each item flagged here is also tracked in
 * MISSING_DATA.md so we know what's stand-in vs. real.
 */

export type PlaceholderReview = {
  display_name: string;
  rating: number;
  body: string;
  city?: string;
};

export const PLACEHOLDER_REVIEWS: PlaceholderReview[] = [
  {
    display_name: "{{OWNER_CONFIRM: Sarah M.}}",
    rating: 5,
    body: "Krista and Ben detailed our pontoon dockside on Lake Wawasee. The vinyl looked brand new and they were so easy to work with. Already booked them for fall winterize.",
    city: "Syracuse",
  },
  {
    display_name: "{{OWNER_CONFIRM: Mike R.}}",
    rating: 5,
    body: "Got the ceramic coating on my truck before hunting season. Three months later mud rinses right off with a garden hose. Worth every penny.",
    city: "Warsaw",
  },
  {
    display_name: "{{OWNER_CONFIRM: Jess H.}}",
    rating: 5,
    body: "They came to our lakehouse, did both cars and the wave runner the same day. Showed up on time, took before/after pictures, and the inside of my SUV looks better than the day we bought it.",
    city: "North Webster",
  },
];

export const PLACEHOLDER_GALLERY = [
  {
    kind: "boat" as const,
    title: "20' pontoon — gel-coat restoration",
    after: "/gallery-placeholders/boat-1.jpg",
  },
  {
    kind: "car" as const,
    title: "F-150 — full detail + ceramic",
    after: "/gallery-placeholders/auto-1.jpg",
  },
  {
    kind: "rv" as const,
    title: "Class C — exterior oxidation removal",
    after: "/gallery-placeholders/rv-1.jpg",
  },
  {
    kind: "motorcycle" as const,
    title: "Harley Road King — show prep",
    after: "/gallery-placeholders/moto-1.jpg",
  },
];

export const HOME_FAQS = [
  {
    q: "Do you really come to us?",
    a: "Yes — that's the whole idea. We bring water, power, and every product. Driveway, garage, dock, lift, or storage lot. As long as we can park safely within ~75 feet, we're set.",
  },
  {
    q: "How long does a detail take?",
    a: "Express services run about an hour. Full details on a car or midsize boat take 3–5 hours. Premium and ceramic services can be 6+ hours — we'll always give you a target window when we confirm.",
  },
  {
    q: "Do you take cards and digital payments?",
    a: "Yes. We charge a 25% deposit at booking and the balance after we finish. All major credit cards via Stripe; we'll text you a secure link.",
  },
  {
    q: "What about boats on a lift or in storage?",
    a: "Lift service is our specialty — most pontoons and runabouts on Lake Wawasee are easier to detail on the lift than on the trailer. We also handle pre-storage and post-storage details at your boathouse or storage facility.",
  },
  {
    q: "What if it rains?",
    a: "Light rain — we'll usually still come for interior or covered work. Heavy weather, we'll reach out the day before to reschedule with no fee.",
  },
  {
    q: "Is ceramic coating worth it for a lake car?",
    a: "On a lake-side daily driver that sees sun, pollen, fish blood, and gravel-road dust? Honestly yes. Ceramic gives you 2–5 years of UV protection, easier washes, and bug/sap that doesn't bake in.",
  },
  {
    q: "Do you sell gift cards?",
    a: "Yes — they're a really popular Father's Day and birthday gift for boat and truck folks. Buy any amount online; they're delivered to the recipient by email.",
  },
  {
    q: "Do you offer recurring plans?",
    a: "Yes. Our Lake Life Membership gets you a discounted bi-monthly full detail with priority scheduling. Captain's Club is the boat version: spring de-winterize, monthly wash, fall winterize.",
  },
];
