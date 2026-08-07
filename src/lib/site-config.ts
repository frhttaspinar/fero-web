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
  /** Sayfada okunabilir biçimde gösterilen telefon. */
  phoneDisplay: "+90 506 906 02 50",
  /** wa.me bağlantılarının beklediği, "+" içermeyen biçim. */
  whatsappNumber: "905069060250",
  /** Yayınlanan iletişim e-postası. */
  email: "frhttaspinar@gmail.com",
  /**
   * Gerçek fiziksel ofis.
   *
   * NAP (Name/Address/Phone) tutarlılığı için `full` metni site, Google
   * Business Profile ve dizin kayıtlarında BİREBİR aynı yazılmalıdır; farklı
   * kısaltma (Sok./Sk.) bile citation eşleşmesini zayıflatır.
   *
   * `postalCode` bilinçli olarak yok: doğrulanmış bir değer verilmedi, tahmin
   * edilen posta kodu yanlış yerel sinyal üretir.
   *
   * Şema alanlarında ilçe yerine il kullanılıyor (`addressLocality: "Amasya"`):
   * "Merkez" tek başına ülke genelinde ayırt edici değil, mahalle/sokak bilgisi
   * zaten `streetAddress` içinde yer alıyor.
   */
  address: {
    streetAddress: "Şeyhcui Mah., Poyraz Sk. No: 12/A",
    addressLocality: "Amasya",
    addressRegion: "Amasya",
    addressCountry: "TR",
    /** Sayfalarda gösterilen tek parça adres — GBP ile birebir aynı olmalı. */
    full: "Şeyhcui Mah., Poyraz Sk. No: 12/A, Amasya Merkez/Amasya",
    latitude: 40.6529354,
    longitude: 35.8028473,
    /**
     * Google Maps kaydının kalıcı adresi (CID biçimi). Paylaşım URL'sindeki
     * oturum/izleme parametreleri zamanla geçersizleşebildiği için kayıt
     * kimliğine dayanan bu biçim tercih edildi.
     */
    mapsUrl: "https://maps.google.com/?cid=6684633581312182868",
  },
  /**
   * Hizmet kapsamı. Sıra anlamlıdır: ülke geneli birincil ticari pazar,
   * Amasya yalnızca fiziksel ofisin bulunduğu yerel bağlamdır.
   */
  areaServed: [
    { type: "Country", name: "Türkiye" },
    { type: "City", name: "Amasya" },
  ],
} as const;

/** siteConfig.url tabanlı mutlak URL üretir. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
