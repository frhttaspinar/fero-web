/**
 * Hizmetlerin düz metin kaynağı.
 *
 * Görünür hizmet kartları (Services.tsx) ve ana sayfa yapısal verisi
 * (JsonLd.tsx) aynı adları ve açıklamaları buradan okur; böylece structured
 * data ile sayfada görünen metin birbirinden sapamaz.
 *
 * Burada yalnızca metin bulunur — ikonlar, düğüm konumları ve grid sınıfları
 * gibi görsel/UI verileri Services.tsx içinde kalır.
 *
 * `landingPath` / `landingTitle` yalnızca **yayına alınmış** hizmet sayfası
 * olan hizmetlerde tanımlıdır. Tanımsız bırakılan hizmetler için hiçbir yerde
 * bağlantı üretilmez; böylece henüz var olmayan sayfalara 404 link çıkmaz.
 *
 * Kart adı ile sayfa başlığı bilinçli olarak ayrı: kart adı kısa ve görsel
 * düzene uygun kalır ("Web Geliştirme"), sayfa başlığı ise ticari arama
 * niyetini hedefler ("Web Sitesi Geliştirme").
 */

export const serviceCatalog = [
  {
    id: "web-gelistirme",
    name: "Web Geliştirme",
    description:
      "Hızlı, erişilebilir ve arama motorlarına hazır modern web uygulamaları. Next.js ile ölçeklenen, bakımı kolay bir kod tabanı.",
    landingPath: "/hizmetler/web-sitesi-gelistirme",
    landingTitle: "Web Sitesi Geliştirme",
  },
  {
    id: "mobil-uygulama-gelistirme",
    name: "Mobil Uygulama Geliştirme",
    description:
      "iOS ve Android'de tek kod tabanıyla akıcı, yüksek etkileşimli uygulamalar.",
    landingPath: "/hizmetler/mobil-uygulama-gelistirme",
    landingTitle: "Mobil Uygulama Geliştirme",
  },
  {
    id: "ui-ux-tasarim",
    name: "UI/UX Tasarım",
    description:
      "Kullanıcıyı yormayan, dönüşümü artıran arayüzler. Araştırmadan prototipe uçtan uca tasarım.",
  },
  {
    id: "yapay-zeka-cagri-asistani",
    name: "Yapay Zeka Çağrı Asistanı",
    description:
      "Gelen çağrıları 7/24 doğal bir sesle karşılayan, randevu oluşturan ve sık sorulan soruları yanıtlayan yapay zeka telefon asistanı.",
  },
  {
    id: "dijital-pazarlama",
    name: "Dijital Pazarlama",
    description:
      "Veriyle yönetilen reklam ve SEO çalışmaları; harcanan her bütçenin geri dönüşünü ölçüyoruz.",
  },
  {
    id: "otomasyon-gelistirme",
    name: "Otomasyon Geliştirme",
    description:
      "Tekrar eden işleri ortadan kaldıran özel entegrasyonlar ve iş akışları.",
  },
  {
    id: "e-ticaret-siteleri",
    name: "E-Ticaret Siteleri",
    description:
      "Sıfırdan kurulan, hızlı ve KVKK uyumlu satış siteleri; ödemeden kargoya tam entegre.",
  },
] as const;

export type ServiceId = (typeof serviceCatalog)[number]["id"];
export type ServiceEntry = (typeof serviceCatalog)[number];

/** Yayına alınmış bir hizmet sayfası olan katalog kaydı. */
export type LandedServiceEntry = Extract<ServiceEntry, { landingPath: string }>;

/** Yapısal veride hizmetin kalıcı kimliği. Tüm sayfalarda aynı kalmalıdır. */
export function serviceEntityId(siteUrl: string, id: ServiceId): string {
  return `${siteUrl}/#service-${id}`;
}

/** Kaydın yayına alınmış bir hizmet sayfası olup olmadığını daraltır. */
export function hasLanding(entry: ServiceEntry): entry is LandedServiceEntry {
  return "landingPath" in entry;
}

/** Yalnızca hizmet sayfası yayında olan kayıtlar. */
export const landedServices: LandedServiceEntry[] =
  serviceCatalog.filter(hasLanding);

/** `/hizmetler/<slug>` slug'ından katalog kaydını bulur; yoksa null. */
export function serviceByLandingSlug(slug: string): LandedServiceEntry | null {
  return (
    landedServices.find(
      (service) => service.landingPath === `/hizmetler/${slug}`,
    ) ?? null
  );
}

/** Yayına alınmış hizmet sayfalarının slug listesi (generateStaticParams). */
export const landedServiceSlugs: string[] = landedServices.map((service) =>
  service.landingPath.replace("/hizmetler/", ""),
);

/** Hizmet kartlarının beklediği `title` / `description` çiftini döndürür. */
export function serviceCopy(id: ServiceId): {
  title: string;
  description: string;
  /** Yalnızca hizmet sayfası yayındaysa tanımlı; yoksa kart bağlantısız kalır. */
  href?: string;
} {
  const entry = serviceCatalog.find((service) => service.id === id);
  if (!entry) throw new Error(`Bilinmeyen hizmet id'si: ${id}`);
  return {
    title: entry.name,
    description: entry.description,
    ...(hasLanding(entry) ? { href: entry.landingPath } : {}),
  };
}
