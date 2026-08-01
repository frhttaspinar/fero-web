import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    lang: siteConfig.lang,
    // Yalnızca gerçekten var olan dosyalar: src/app/favicon.ico ve
    // public/logo-dk.png (marka logosu, PWA ikonu için uygun kare format).
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: siteConfig.logo.path,
        sizes: `${siteConfig.logo.width}x${siteConfig.logo.height}`,
        type: "image/png",
      },
    ],
  };
}
