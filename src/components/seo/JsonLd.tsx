import { siteConfig, absoluteUrl } from "@/lib/site-config";
import {
  serviceCatalog,
  serviceEntityId,
  hasLanding,
} from "@/lib/service-catalog";
import { geoFaq } from "@/lib/geo-faq";

/**
 * Ana sayfa Organization, WebSite, WebPage, hizmet listesi ve FAQ verileri.
 * Türkiye genelinde uzaktan hizmet veren yazılım işletmesi olarak gösterilir.
 * Geçici olarak kullanılmayan fiziki ofis, harita ve çalışma saati verileri
 * yayımlanmaz. Tek işletme kimliği (@id) korunur.
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
        image: absoluteUrl(siteConfig.logo.path),
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: siteConfig.areaServed.map((area) => ({
          "@type": area.type,
          name: area.name,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: "TR",
          availableLanguage: ["Turkish"],
        },
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
            // Hizmetin kalıcı kimliği. Hizmet sayfası açıldığında orada da
            // AYNI @id kullanılır; ikinci bir hizmet kimliği üretilmez.
            "@id": serviceEntityId(siteConfig.url, service.id),
            name: service.name,
            description: service.description,
            provider: { "@id": ORGANIZATION_ID },
            // Hizmetin kanonik adresi: yayına alınmışsa kendi sayfası, değilse
            // ana sayfadaki hizmetler bölümü. Böylece aynı hizmet için iki
            // rakip adres oluşmaz ve otorite doğru sayfaya işaret eder.
            url: hasLanding(service)
              ? absoluteUrl(service.landingPath)
              : absoluteUrl("/#hizmetler"),
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
