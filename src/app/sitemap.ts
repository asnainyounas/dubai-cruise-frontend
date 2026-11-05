import type { MetadataRoute } from "next";
import { CRUISES } from "@/data/cruises";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/menu"].map((path) => ({ url: `${SITE_URL}${path}` }));
  const cruises = Object.values(CRUISES)
    .filter((c) => !c.draft)
    .map((c) => ({ url: `${SITE_URL}/cruises/${c.slug}` }));
  return [...pages, ...cruises];
}