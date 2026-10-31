import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/account", "/api"],
    },
    sitemap: "https://[website-name]/sitemap.xml",
  };
}
