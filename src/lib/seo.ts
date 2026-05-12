import type { Metadata } from "next";
import { BUSINESS, SITE } from "@/lib/constants";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og-default.png",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE.url).toString();
  const fullTitle =
    title === SITE.name ? title : `${title} · ${SITE.name}`;
  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.defaultLocale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/* JSON-LD builders — return objects, render via <script type="application/ld+json"> */

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${SITE.url}/#business`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.shortName,
    description: BUSINESS.description,
    url: SITE.url,
    telephone: BUSINESS.phoneE164,
    image: `${SITE.url}/og-default.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Syracuse, IN" },
      { "@type": "AdministrativeArea", name: "Kosciusko County, IN" },
      { "@type": "AdministrativeArea", name: "Elkhart County, IN" },
      { "@type": "AdministrativeArea", name: "Noble County, IN" },
    ],
    openingHoursSpecification: BUSINESS.openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    sameAs: [BUSINESS.social.facebook].filter(
      (v) => !v.includes("OWNER_CONFIRM"),
    ),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).toString(),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: "Kosciusko County, IN" },
    url: new URL(path, SITE.url).toString(),
  };
}
