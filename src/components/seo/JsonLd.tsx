import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * Organization + WebSite yapısal verisi.
 *
 * Yalnızca doğrulanabilir bilgiler yer alır: marka adı, site adresi, açıklama,
 * gerçek Instagram hesabı ve mevcut iletişim numarası. Adres, kuruluş tarihi,
 * çalışan sayısı gibi doğrulanamayan alanlar bilinçli olarak eklenmemiştir.
 * `logo`, depodaki gerçek marka logosunu (public/logo-dk.png) gösterir.
 */

/** JSON içinde `</script>` dizisinin HTML'i kapatmasını engeller. */
function toSafeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function JsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.logo.path),
          width: siteConfig.logo.width,
          height: siteConfig.logo.height,
        },
        telephone: siteConfig.phone,
        sameAs: [siteConfig.social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "tr-TR",
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJson(graph) }}
    />
  );
}
