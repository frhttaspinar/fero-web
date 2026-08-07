import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { serviceCatalog } from "@/lib/service-catalog";
import { geoFaq } from "@/lib/geo-faq";

/**
 * Ana sayfa yapısal verisi.
 *
 * Tek bir @graph içinde LocalBusiness, WebSite, WebPage, hizmet ItemList'i ve
 * FAQPage yer alır. Hizmet ve SSS metinleri sayfada görünen içerikle aynı
 * kaynaklardan (service-catalog.ts, geo-faq.ts) okunur; böylece structured
 * data ile görünür içerik arasında sapma oluşamaz.
 *
 * İşletme varlığı LocalBusiness tipindedir: Doku Yazılım'ın doğrulanmış bir
 * fiziksel ofisi vardır. LocalBusiness, Organization'ın alt türüdür; @id
 * (`/#organization`) değişmediği için sitedeki tüm mevcut varlık ilişkileri
 * korunur ve ayrı bir işletme node'u oluşturulmaz.
 *
 * Yalnızca doğrulanabilir bilgiler yer alır: marka adı, site adresi, açıklama,
 * iletişim numarası, e-posta, gerçek fiziksel ofis adresi ve koordinatı, hizmet
 * kapsamı ile sayfada görünen hizmet ve SSS metinleri. Fiyat, teklif, puan,
 * değerlendirme, müşteri sayısı veya kuruluş tarihi gibi doğrulanmamış alanlar
 * bilinçli olarak yoktur. GBP'deki gerçek yorumlar da buraya kopyalanmaz:
 * Review/AggregateRating yalnızca sitenin kendi topladığı, doğrulanabilir
 * değerlendirmeler için kullanılabilir.
 *
 * Konumlandırma kuralı: `areaServed` içinde ülke geneli (Türkiye) birincil
 * ticari kapsamdır, Amasya yalnızca fiziksel ofisin bulunduğu yerel bağlamdır.
 * Hizmet adlarına (`Service.name`) şehir eklenmez — bu, ulusal arama niyetini
 * yerel bir nişe daraltır.
 *
 * İşletme node'unda `sameAs` yoktur: alt bilgideki Instagram ve LinkedIn
 * adresleri kişisel profillerdir, kurumsal kimliği temsil etmez. `sameAs`
 * yalnızca resmî kurumsal hesaplar için kullanılmalıdır.
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
        // Doku Yazılım'ın doğrulanmış bir fiziksel konumu olduğu için tip
        // LocalBusiness. LocalBusiness zaten Organization'ın alt türü olduğundan
        // ayrıca "Organization" yazmaya gerek yok — tek tip yeterli.
        //
        // Ayrı bir işletme node'u AÇILMAZ: @id sabit kaldığı sürece
        // Service.provider, WebSite.publisher, WebPage.about ve blog
        // author/publisher referanslarının tamamı adres, telefon ve çalışma
        // saati taşıyan bu tek varlığa bağlı kalır. İkinci bir node graph'ı
        // böler ve hizmetleri konumsuz bir varlığa bağlı bırakırdı.
        "@type": "LocalBusiness",
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
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.address.latitude,
          longitude: siteConfig.address.longitude,
        },
        hasMap: siteConfig.address.mapsUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...siteConfig.openingHours.days],
          opens: siteConfig.openingHours.opens,
          closes: siteConfig.openingHours.closes,
        },
        // Sıra bilinçli: ülke geneli ticari kapsam, Amasya fiziksel bağlam.
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
