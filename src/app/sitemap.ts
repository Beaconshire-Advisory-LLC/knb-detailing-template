import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICE_PAGES } from "@/content/services-data";
import { getBlogPostSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/services",
    "/pricing",
    "/membership",
    "/gallery",
    "/about",
    "/reviews",
    "/service-area",
    "/blog",
    "/contact",
    "/quote",
    "/book",
    "/gift-cards",
    "/legal/privacy",
    "/legal/terms",
    "/legal/accessibility",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency:
      path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1.0 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const slugs = await getBlogPostSlugs();
  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
