import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
// Search engines are blocked until a real domain is set (not localhost, not vercel.app).
const IS_LIVE = !/localhost|vercel\.app/.test(SITE_URL);

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
