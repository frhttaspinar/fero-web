import type { ServiceId } from "./service-catalog";

/**
 * Gerçek referans projelerin tek kaynağı.
 *
 * Hem ana sayfadaki Projeler bölümü (Projects.tsx) hem de hizmet sayfaları bu
 * listeden okur; böylece aynı proje iki yerde farklı anlatılamaz.
 *
 * Tüm kayıtlar `public/refe` altındaki gerçek ekran görüntülerine dayanır.
 * Buraya yalnızca doğrulanabilir bilgi yazılır: kapsam, sektör ve gerçekten
 * kullanılan teknoloji. Müşteri adı yalnızca paylaşılabilir olduğu bilinen
 * projelerde yer alır; bilinmiyorsa **uydurulmaz**, kategori adı kullanılır.
 *
 * Bilinçli olarak yok: müşteri yorumu, puan, gelir, trafik, dönüşüm yüzdesi,
 * teslim süresi ve canlı adres (gerçek bir http(s) adresi bilinmiyorsa `link`
 * alanı hiç yazılmaz, kart bağlantısız kalır).
 *
 * `relatedServices`, projenin hangi hizmet sayfalarında kanıt olarak
 * gösterileceğini belirler.
 */
export type ProjectEntry = {
  title: string;
  tag: string;
  description: string;
  image: string;
  ratio: string;
  relatedServices: ServiceId[];
};

export const projectCatalog: ProjectEntry[] = [
  {
    title: "E-Ticaret",
    tag: "E-Ticaret",
    description:
      "Mobilya ve dekorasyon ürünleri için PayTR entegrasyonlu, yüksek dönüşümlü e-ticaret altyapısı.",
    image: "/refe/deco.png",
    ratio: "1919 / 882",
    relatedServices: ["e-ticaret-siteleri", "web-gelistirme"],
  },
  {
    title: "Mobil Uygulama",
    tag: "Mobil · iOS",
    description:
      "React Native ve Expo ile geliştirilen; numeroloji analizi, sesli sohbet ve kredili kullanım sunan yaşam tarzı uygulaması.",
    image: "/refe/mobil.png",
    ratio: "1242 / 2688",
    relatedServices: ["mobil-uygulama-gelistirme"],
  },
  {
    title: "Atelier Mermer Studio",
    tag: "Marka Vitrini",
    description:
      "El işçiliği mermer atölyesi için sanat ve zanaatı dijitale taşıyan, modern ve rustik esintili marka vitrini.",
    image: "/refe/atelier.png",
    ratio: "1920 / 879",
    relatedServices: ["web-gelistirme"],
  },
  {
    title: "Yaşam Tarzı",
    tag: "Web · Sağlık",
    description:
      "Diyetisyen için kişiye özel beslenme programları ve online randevuyu öne çıkaran kişisel marka sitesi.",
    image: "/refe/yasam.png",
    ratio: "635 / 348",
    relatedServices: ["web-gelistirme"],
  },
  {
    title: "Mühendislik",
    tag: "Kurumsal · Web",
    description:
      "Harita mühendisliği firması için ölçüm, imar ve kadastro hizmetlerini tanıtan kurumsal web sitesi.",
    image: "/refe/harita.png",
    ratio: "425 / 491",
    relatedServices: ["web-gelistirme"],
  },
  {
    title: "Moda Butik",
    tag: "E-Ticaret · Moda",
    description:
      "Moda markası için zamansız koleksiyonları premium bir alışveriş deneyimiyle sunan butik e-ticaret vitrini.",
    image: "/refe/moda.png",
    ratio: "491 / 333",
    relatedServices: ["e-ticaret-siteleri"],
  },
  {
    title: "Kurumsal Tanıtım",
    tag: "Kurumsal · Hukuk",
    description:
      "Hukuk ve danışmanlık bürosu için faaliyet alanlarını ve iletişimi öne çıkaran prestijli kurumsal tanıtım sitesi.",
    image: "/refe/ova.png",
    ratio: "1920 / 879",
    relatedServices: ["web-gelistirme"],
  },
  {
    title: "Yapay Zeka Asistanı",
    tag: "Yapay Zeka",
    description:
      "Gemini Pro Live altyapısıyla geliştirilmiş, sıfır gecikmeli akıllı asistan entegrasyonu.",
    image: "/refe/yz.jpeg",
    ratio: "736 / 1104",
    relatedServices: ["yapay-zeka-cagri-asistani"],
  },
  {
    title: "Mühendislik Firması",
    tag: "Kurumsal · Web",
    description:
      "Jeoloji mühendisliği firması için zemin etüdü, analiz ve danışmanlık hizmetlerini öne çıkaran kurumsal web sitesi.",
    image: "/refe/mühendislik.png",
    ratio: "427 / 489",
    relatedServices: ["web-gelistirme"],
  },
  {
    title: "Mobil Uygulama - Asistan",
    tag: "Mobil · Yapay Zeka",
    description:
      "Araç sahipleri için arıza teşhisi, maliyet tahmini ve sesli usta asistanı sunan yapay zeka destekli mobil uygulama.",
    image: "/refe/mobilusta.png",
    ratio: "1206 / 2484",
    relatedServices: ["mobil-uygulama-gelistirme", "yapay-zeka-cagri-asistani"],
  },
];

/** Bir hizmete kanıt olarak gösterilebilecek gerçek projeler. */
export function projectsForService(id: ServiceId, limit = 3): ProjectEntry[] {
  return projectCatalog
    .filter((project) => project.relatedServices.includes(id))
    .slice(0, limit);
}
