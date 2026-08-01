import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { serviceCatalog } from "@/lib/service-catalog";
import { geoFaq } from "@/lib/geo-faq";

/**
 * Ana sayfa yapısal verisi.
 *
 * Tek bir @graph içinde Organization, WebSite, WebPage, hizmet ItemList'i ve
 * FAQPage yer alır. Hizmet ve SSS metinleri sayfada görünen içerikle aynı
 * kaynaklardan (service-catalog.ts, geo-faq.ts) okunur; böylece structured
 * data ile görünür içerik arasında sapma oluşamaz.
 *
 * Yalnızca doğrulanabilir bilgiler yer alır: marka adı, site adresi, açıklama,
 * gerçek sosyal hesaplar, mevcut iletişim numarası ve sayfada görünen hizmet
 * ile SSS metinleri. Fiyat, teklif, puan, değerlendirme, müşteri sayısı, adres
 * veya kuruluş tarihi gibi sitede görünmeyen alanlar bilinçli olarak yoktur.
 */

/** JSON içinde `</script>` dizisinin HTML'i kapatmasını engeller. */
function toSafeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/** Yapısal veriyi güvenli biçimde basan paylaşılan script bileşeni. */
export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJson(data) }}
    />
  );
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
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
        sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "tr-TR",
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        inLanguage: "tr-TR",
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#services`,
        name: `${siteConfig.name} Hizmetleri`,
        itemListElement: serviceCatalog.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${siteConfig.url}/#service-${service.id}`,
            name: service.name,
            description: service.description,
            provider: { "@id": ORGANIZATION_ID },
            url: absoluteUrl("/#hizmetler"),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: geoFaq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}
