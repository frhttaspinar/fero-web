import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Genel izin korunuyor. OAI-SearchBot (ChatGPT Search'ün tarayıcısı) için
    // ayrıca açık bir izin satırı yazılıyor; bu, mevcut politikanın kapsamını
    // genişletmez, yalnızca denetlenebilir biçimde belirtir. GPTBot ve diğer
    // ajanlar için özel kural eklenmedi — hepsi "*" kuralına tabi kalır.
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
