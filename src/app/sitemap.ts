import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://[website-name]";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/sign-up`, lastModified: new Date() },
  ];
}
