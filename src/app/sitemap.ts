import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  return ["", "/work", "/services", "/about", "/contact", "/privacy", ...projects.map((project) => `/work/${project.slug}`)].map((path) => ({ url: `${origin}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "monthly" : "yearly" }));
}
