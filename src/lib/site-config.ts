/**
 * Tek merkezden yönetilen site kimliği.
 *
 * Metadata, sitemap, robots, manifest ve JSON-LD bu dosyayı kullanır; site
 * adresi değiştiğinde tek bir yerin güncellenmesi yeterlidir.
 *
 * Kanonik üretim domaini `https://www.dokuyazilim.com`. SITE_URL yalnızca
 * staging/preview gibi ortamlar için bir geçersiz kılma imkânıdır; tanımsız
 * bırakıldığında üretim domaini kullanılır. Bu değer sadece sunucu tarafında
 * (metadata, robots, sitemap, manifest, JSON-LD, OG görseli) okunduğu için
 * NEXT_PUBLIC_ önekli bir değişkene gerek yoktur.
 */

const PRODUCTION_SITE_URL = "https://www.dokuyazilim.com";

/** Sondaki `/` karakterlerini temizler; canonical URL'lerin çiftlenmesini önler. */
function normalizeUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

const siteUrl = normalizeUrl(process.env.SITE_URL || PRODUCTION_SITE_URL);

export const siteConfig = {
  name: "Doku Yazılım",
  shortName: "Doku",
  url: siteUrl,
  title: "Doku Yazılım | Mobil Uygulama, Web ve Yapay Zekâ Çözümleri",
  titleTemplate: "%s | Doku Yazılım",
  description:
    "Doku Yazılım; mobil uygulama, kurumsal web, e-ticaret, yapay zekâ asistanları ve özel otomasyon çözümleri geliştirir.",
  keywords: [
    "Doku Yazılım",
    "yazılım geliştirme",
    "mobil uygulama geliştirme",
    "web yazılım",
    "kurumsal web sitesi",
    "e-ticaret yazılımı",
    "yapay zekâ asistanı",
    "yapay zekâ çözümleri",
    "iş otomasyonu",
    "Next.js",
    "React Native",
  ],
  locale: "tr_TR",
  lang: "tr",
  /** Mevcut tema rengi (layout viewport ile aynı). */
  themeColor: "#fafafa",
  /** Mevcut açık arka plan rengi (--color-paper). */
  backgroundColor: "#f4f4f6",
  ogImageAlt: "Doku Yazılım — mobil uygulama, web, e-ticaret ve yapay zekâ çözümleri",
  /**
   * Gerçek marka logosu: public/logo-dk.png (1024×1024, "DY" monogramı +
   * "Doku Yazılım" wordmark). Opak koyu gradyan zeminli olduğu için açık
   * renkli header/footer'da kullanılmıyor; JSON-LD ve PWA ikonu olarak uygun.
   */
  logo: {
    path: "/logo-dk.png",
    width: 1024,
    height: 1024,
  },
  /** Yalnızca gerçekten var olan hesaplar. */
  social: {
    instagram: "https://www.instagram.com/ferotaspinar/",
    linkedin:
      "https://www.linkedin.com/in/ferhat-ta%C5%9Fpinar-110814396/",
  },
  /** Uluslararası formatta iletişim numarası (WhatsApp hattıyla aynı). */
  phone: "+905069060250",
} as const;

/** siteConfig.url tabanlı mutlak URL üretir. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
