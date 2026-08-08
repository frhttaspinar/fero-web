import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-posts";

/**
 * İçerik son güncelleme tarihi. `new Date()` yerine sabit tarih kullanılıyor:
 * her build'de değişen bir lastModified, sitemap çıktısını gereksiz yere
 * değiştirip crawler tarafında yanlış "güncellendi" sinyali üretir.
 */
const LAST_CONTENT_UPDATE = new Date("2026-08-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = Object.entries(blogPosts).map(([slug, post]) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: new Date(post.modifiedIsoDate ?? post.isoDate),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/iletisim"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/hakkimizda"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/gizlilik"),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...posts,
  ];
}
