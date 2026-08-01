/**
 * Hizmetlerin düz metin kaynağı.
 *
 * Görünür hizmet kartları (Services.tsx) ve ana sayfa yapısal verisi
 * (JsonLd.tsx) aynı adları ve açıklamaları buradan okur; böylece structured
 * data ile sayfada görünen metin birbirinden sapamaz.
 *
 * Burada yalnızca metin bulunur — ikonlar, düğüm konumları ve grid sınıfları
 * gibi görsel/UI verileri Services.tsx içinde kalır.
 */

export const serviceCatalog = [
  {
    id: "web-gelistirme",
    name: "Web Geliştirme",
    description:
      "Hızlı, erişilebilir ve arama motorlarına hazır modern web uygulamaları. Next.js ile ölçeklenen, bakımı kolay bir kod tabanı.",
  },
  {
    id: "mobil-uygulama-gelistirme",
    name: "Mobil Uygulama Geliştirme",
    description:
      "iOS ve Android'de tek kod tabanıyla akıcı, yüksek etkileşimli uygulamalar.",
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

/** Hizmet kartlarının beklediği `title` / `description` çiftini döndürür. */
export function serviceCopy(id: ServiceId): {
  title: string;
  description: string;
} {
  const entry = serviceCatalog.find((service) => service.id === id);
  if (!entry) throw new Error(`Bilinmeyen hizmet id'si: ${id}`);
  return { title: entry.name, description: entry.description };
}
