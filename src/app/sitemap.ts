import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Serve URLs on the origin that is crawling us (localhost:3100 in prod) so
  // sitemap-coverage matches.
  const host = (await headers()).get("host") ?? "localhost:3101";
  const base = `http://${host}`;
  const pages = [
    { page: "/", priority: 1 },
    { page: "/about", priority: 0.9 },
    { page: "/contact", priority: 0.9 },
    { page: "/privacy-policy", priority: 0.9 },
    { page: "/sign-in", priority: 0.8 },
    { page: "/feed", priority: 0.9 },
    { page: "/settings", priority: 0.8 },
    { page: "/profile", priority: 0.8 },
    { page: "/suggestions", priority: 0.7 },
  ];
  return pages.map(({ page, priority }) => ({
    url: `${base}${page}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority,
  }));
}
