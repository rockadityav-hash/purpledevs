import type { MetadataRoute } from "next";
import { projects } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/work", "/services", "/about", "/contact", "/privacy", ...projects.map((project) => `/work/${project.slug}`)].map((path) => ({ url: `${origin}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "monthly" : "yearly" }));
}
