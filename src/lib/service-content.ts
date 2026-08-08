import type { ServiceId } from "./service-catalog";

/**
 * Hizmet sayfalarının içerik kaynağı.
 *
 * Görünür sayfa (hizmetler/[slug]/page.tsx) ve o sayfanın yapısal verisi
 * (Service + FAQPage) aynı nesneden okur; böylece schema ile sayfada görünen
 * metin arasında sapma oluşamaz. Schema metni asla elle kopyalanmaz.
 *
 * İçerik kuralları:
 * - Yalnızca gerçekten sunulan yetenekler yazılır.
 * - Teknoloji listesi repoda ve mevcut projelerde doğrulanabilir olanlarla
 *   sınırlıdır; SEO için uzatılmaz.
 * - Sıralama, süre, fiyat veya sonuç garantisi verilmez.
 * - Şehir adı hedeflenmez: hizmetler Türkiye genelindeki ticari arama
 *   niyetine yöneliktir, Amasya yalnızca fiziksel ofis bilgisidir.
 */

export type ServiceFaqEntry = {
  question: string;
  answer: string;
};

export type ServiceSection = {
  heading: string;
  body: string[];
};

export type ServiceProcessStep = {
  title: string;
  body: string;
};

export type ServiceRelatedPost = {
  slug: string;
  /** Bağlantı metni — bilgi amaçlı, ticari anahtar kelime kullanılmaz. */
  label: string;
  note: string;
};

export type ServiceLandingContent = {
  serviceId: ServiceId;
  slug: string;
  h1: string;
  /** metadata.title — titleTemplate "%s | Doku Yazılım" ile tamamlanır. */
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  /** Service node açıklaması; hero metniyle aynı bilgiyi taşır. */
  schemaDescription: string;
  sections: ServiceSection[];
  process: ServiceProcessStep[];
  faq: ServiceFaqEntry[];
  relatedPosts: ServiceRelatedPost[];
};

export const serviceLandingContent: ServiceLandingContent[] = [
  {
    serviceId: "web-gelistirme",
    slug: "web-sitesi-gelistirme",
    h1: "Web Sitesi Geliştirme",
    metaTitle: "Web Sitesi Geliştirme",
    metaDescription:
      "Kurumsal ve özel web sitesi geliştirme. Tasarımdan yayına, Next.js ve TypeScript ile hızlı, mobil uyumlu ve arama motorlarına hazır siteler. Türkiye genelinde uzaktan çalışıyoruz.",
    heroLead:
      "Kurumsal tanıtım sitelerinden özel geliştirilen web uygulamalarına kadar, markanıza özel web siteleri geliştiriyoruz. Projeler Türkiye'nin her yerinden uzaktan yürütülebilir.",
    schemaDescription:
      "Kurumsal ve özel web sitesi geliştirme hizmeti. Tasarımdan yayına uçtan uca; Next.js, React ve TypeScript ile hızlı, mobil uyumlu ve arama motorlarına hazır web siteleri.",
    sections: [
      {
        heading: "Kurumsal ve Özel Web Siteleri",
        body: [
          "Kurumsal web sitesi, bir markanın dijitaldeki ilk izlenimidir. Faaliyet alanlarını anlaşılır biçimde anlatan, ziyaretçiyi iletişime yönlendiren ve kurumsal kimliğe sadık bir yapı kuruyoruz.",
          "Hazır tema kullanmıyoruz. Her proje, markanın ihtiyacına göre sıfırdan tasarlanıp geliştiriliyor; bu da içerik yapısının, sayfa akışının ve arayüzün şablona değil işe göre şekillenmesi anlamına geliyor.",
          "Tanıtım sitesinin ötesine geçen ihtiyaçlarda — panel, hesaplama aracı, rezervasyon akışı, içerik yönetimi — özel web uygulaması olarak geliştiriyoruz.",
        ],
      },
      {
        heading: "Tasarımdan Yayına",
        body: [
          "Süreç arayüz tasarımıyla başlıyor. Araştırmadan prototipe uzanan bir UI/UX çalışması yürütülüyor ve geliştirme bu tasarımın üzerine kuruluyor; böylece kod yazılmadan önce yapı üzerinde anlaşmış oluyoruz.",
          "Geliştirme boyunca sayfalar gerçek içerikle test ediliyor. Yayın öncesi mobil, tablet ve masaüstü kırılımlarında kontrol yapılıyor; yayın sonrasında da düzeltme ve geliştirme desteği sürüyor.",
        ],
      },
      {
        heading: "Web Yazılım ve Teknik Altyapı",
        body: [
          "Web projelerinde Next.js, React ve TypeScript kullanıyoruz; yönlendirme için App Router tercih ediliyor. Bu yığın, sayfaların sunucu tarafında oluşturulmasına ve arama motorlarının içeriği eksiksiz görmesine imkân veriyor.",
          "Kod tabanı ölçeklenebilir ve bakımı kolay olacak şekilde kuruluyor. Projeye sonradan yeni bir bölüm eklemek, mevcut yapıyı bozmadan mümkün oluyor.",
        ],
      },
      {
        heading: "Performans ve Teknik SEO",
        body: [
          "Bir web sitesinin bulunabilir olması, teknik temelin doğru kurulmasıyla başlıyor. Teslim ettiğimiz projelerde semantik HTML, sayfa bazlı metadata, canonical adresler, sitemap, robots yapılandırması ve yapısal veri (JSON-LD) standart olarak yer alıyor.",
          "Performans tarafında görsel optimizasyonu, gereksiz istemci tarafı yükünün azaltılması ve mobil öncelikli responsive yapı üzerinde çalışıyoruz.",
          "Teknik altyapı sıralamanın önkoşuludur, garantisi değil: arama sonuçlarındaki konum içerik, rekabet ve zamanla değişen algoritmalara bağlıdır. Sıra veya trafik taahhüdü vermiyoruz.",
        ],
      },
    ],
    process: [
      {
        title: "İhtiyacın Netleştirilmesi",
        body: "Projenin amacını, hedef kitlesini ve kapsamını birlikte netleştiriyoruz. Kapsam ve takvim projeden projeye değiştiği için bu aşamada belirleniyor.",
      },
      {
        title: "Tasarım ve Prototip",
        body: "Araştırmadan prototipe bir UI/UX çalışması yürütülüyor. Sayfa yapısı ve arayüz, geliştirme başlamadan önce onaylanıyor.",
      },
      {
        title: "Geliştirme ve Test",
        body: "Next.js ve TypeScript ile geliştirme yapılıyor; sayfalar gerçek içerikle ve farklı ekran boyutlarında test ediliyor.",
      },
      {
        title: "Yayın ve Destek",
        body: "Site yayına alınıyor, teknik SEO temeli (metadata, sitemap, yapısal veri) kuruluyor ve sonrasında düzeltme/geliştirme desteği sürüyor.",
      },
    ],
    faq: [
      {
        // Ana sayfadan taşındı: teknoloji sorusu artık bu hizmetin sayfasına ait.
        question: "Web projelerinde hangi teknolojiler kullanılıyor?",
        answer:
          "Web tarafında Next.js, React ve TypeScript kullanılıyor; yönlendirme için App Router tercih ediliyor. Amaç hızlı, erişilebilir ve arama motorlarına hazır uygulamalar üretmek. Kod tabanı ölçeklenebilir ve bakımı kolay olacak şekilde kuruluyor.",
      },
      {
        question: "Web sitesi geliştirme süreci nasıl ilerliyor?",
        answer:
          "Süreç iletişim formundan projenizi anlatmanızla başlıyor; mesajlara 24 saat içinde dönüş yapılıyor. Ardından ihtiyaç netleştiriliyor, araştırmadan prototipe bir UI/UX çalışması yürütülüyor ve geliştirme bu tasarımın üzerine kuruluyor. Yayın sonrası düzeltme ve geliştirme desteği devam ediyor. Kapsam ve takvim projeden projeye değiştiği için görüşme sırasında birlikte belirleniyor.",
      },
      {
        question: "Mevcut bir web sitesi yenilenebilir mi?",
        answer:
          "Evet. Mevcut sitenin içeriği, sayfa yapısı ve adresleri incelenerek yenileme yapılabilir. Bu durumda mevcut adreslerin korunması veya yeni adreslere doğru yönlendirilmesi planlanır; böylece sitenin arama motorlarında birikmiş değeri korunmaya çalışılır. Kapsam, mevcut sitenin durumuna göre görüşmede belirlenir.",
      },
      {
        question: "Geliştirilen web siteleri mobil uyumlu oluyor mu?",
        answer:
          "Evet. Tüm projeler mobil öncelikli responsive yapıda geliştiriliyor; telefon, tablet ve masaüstü kırılımlarında test ediliyor. Ziyaretçilerin önemli bir bölümü siteye telefondan geldiği için mobil deneyim ek bir seçenek değil, geliştirmenin varsayılan parçası.",
      },
    ],
    relatedPosts: [
      {
        slug: "3d-web-animasyonlari",
        label: "Kullanıcı Deneyimini Artıran 3D Web Animasyonları",
        note: "Arayüzde hareketin kullanıcıyı yormadan nasıl kurgulanabileceği üzerine.",
      },
      {
        slug: "nextjs-14-performans",
        label: "Next.js 14 ile E-Ticaret Performansı",
        note: "Sunucu taraflı render'ın performans ve SEO tarafındaki etkisi üzerine.",
      },
    ],
  },
  {
    serviceId: "mobil-uygulama-gelistirme",
    slug: "mobil-uygulama-gelistirme",
    h1: "Mobil Uygulama Geliştirme",
    metaTitle: "Mobil Uygulama Geliştirme",
    metaDescription:
      "iOS ve Android için mobil uygulama geliştirme. Fikirden mağaza yayınına; React Native ve Expo ile tek kod tabanı, projeye göre teknoloji seçimi. Türkiye genelinde uzaktan çalışıyoruz.",
    heroLead:
      "Fikir aşamasından mağaza yayınına kadar iOS ve Android uygulamaları geliştiriyoruz. Projeler Türkiye'nin her yerinden uzaktan yürütülebilir.",
    schemaDescription:
      "iOS ve Android için mobil uygulama geliştirme hizmeti. Fikirden mağaza yayınına uçtan uca; React Native ve Expo ile tek kod tabanı üzerinden iki platform.",
    sections: [
      {
        heading: "iOS ve Android Uygulama Geliştirme",
        body: [
          "Uygulamalar hem iOS hem Android için geliştiriliyor. Çoğu projede tek bir kod tabanıyla iki platforma birden çıkılıyor; böylece aynı özellik seti her iki tarafta paralel ilerliyor ve bakım tek yerden yürüyor.",
          "Platforma özgü davranışlar (bildirim izinleri, mağaza kuralları, arayüz alışkanlıkları) tek kod tabanı içinde ayrıca ele alınıyor — ortak kod, iki platformun kendi kurallarını yok saymak anlamına gelmiyor.",
        ],
      },
      {
        heading: "React Native ve Expo",
        body: [
          "Mobil projelerde React Native ve Expo ekosistemini kullanıyoruz. Bu tercih, gerçek projelerde tek kod tabanıyla iki platforma çıkabilmemizi ve geliştirme döngüsünü kısaltmamızı sağlıyor.",
          "Bununla birlikte her proje için tek bir doğru teknoloji yoktur. Yoğun cihaz donanımı kullanan, ağır grafik işleyen veya platforma çok özgü yetenekler gerektiren işlerde yerel (native) geliştirme daha doğru olabilir. Teknoloji seçimi projenin gereksinimine göre, görüşme sırasında birlikte yapılıyor.",
        ],
      },
      {
        heading: "Fikirden Mağaza Yayınına",
        body: [
          "Süreç, uygulamanın ne işe yarayacağının netleştirilmesiyle başlıyor. Ardından arayüz tasarımı, geliştirme ve gerekiyorsa backend ile API entegrasyonu geliyor.",
          "Yayın aşamasında mağaza gereksinimleri (uygulama künyesi, görseller, gizlilik bildirimi, izin açıklamaları) hazırlanıyor ve gönderim yapılıyor. Mağaza onayı Apple ve Google'ın kendi inceleme süreçlerine bağlı olduğu için onay süresi veya kesin kabul taahhüdü vermiyoruz; hazırlığın eksiksiz yapılmasından sorumluyuz.",
        ],
      },
    ],
    process: [
      {
        title: "İhtiyacın Netleştirilmesi",
        body: "Uygulamanın amacı, hedef kullanıcısı ve temel akışları birlikte netleştiriliyor. Hangi platformların gerektiği bu aşamada belirleniyor.",
      },
      {
        title: "Tasarım ve Prototip",
        body: "Mobil arayüz, dokunmatik kullanım ve ekran boyutları gözetilerek tasarlanıyor; akışlar geliştirme öncesinde onaylanıyor.",
      },
      {
        title: "Geliştirme ve Entegrasyon",
        body: "React Native ve Expo ile geliştirme yapılıyor; gerekiyorsa backend ve API entegrasyonları bu aşamada kuruluyor.",
      },
      {
        title: "Test ve Mağaza Yayını",
        body: "Uygulama gerçek cihazlarda test ediliyor, mağaza gereksinimleri hazırlanıyor ve yayın süreci yürütülüyor.",
      },
    ],
    faq: [
      {
        // Ana sayfadan taşındı: platform sorusu artık bu hizmetin sayfasına ait.
        question: "Mobil uygulamalar hangi platformlar için geliştiriliyor?",
        answer:
          "Mobil uygulamalar iOS ve Android için geliştiriliyor. Tek bir kod tabanıyla iki platforma birden çıkabilmek için React Native ve Expo kullanılıyor, böylece aynı özellik seti her iki platformda paralel ilerliyor. Hedef, akıcı ve yüksek etkileşimli bir kullanıcı deneyimi.",
      },
      {
        question: "Mobil uygulama geliştirme süreci nasıl ilerliyor?",
        answer:
          "Süreç iletişim formundan projenizi anlatmanızla başlıyor; mesajlara 24 saat içinde dönüş yapılıyor. Ardından uygulamanın amacı ve temel akışları netleştiriliyor, arayüz tasarımı yapılıyor, geliştirme ve gerekli API entegrasyonları yürütülüyor. Son aşamada gerçek cihaz testleri ve mağaza yayın hazırlığı geliyor. Kapsam ve takvim projeye göre değiştiği için görüşmede birlikte belirleniyor.",
      },
      {
        question: "iOS ve Android için ayrı uygulama gerekir mi?",
        answer:
          "Çoğu projede gerekmiyor. React Native ile tek kod tabanı yazılıp iki platforma da çıkılabiliyor; bu hem geliştirme hem bakım tarafında tek bir yapı anlamına geliyor. Platforma özgü davranışlar aynı kod tabanı içinde ayrıca ele alınıyor. Yalnızca donanıma çok bağlı veya platforma çok özgü işlerde ayrı yerel geliştirme gündeme gelebilir.",
      },
      {
        question: "React Native hangi projeler için uygundur?",
        answer:
          "İçerik, form, liste, hesap yönetimi, API ile konuşan ve iki platformda aynı deneyimi vermesi beklenen uygulamalar için uygundur. Yoğun 3B grafik, ağır gerçek zamanlı sinyal işleme veya çok özel donanım erişimi gerektiren projelerde yerel geliştirme daha doğru olabilir. Hangisinin uygun olduğuna projenin gereksinimlerine bakarak birlikte karar veriyoruz.",
      },
    ],
    relatedPosts: [
      {
        slug: "react-native-mi-native-mi",
        label: "React Native mi, Native mi?",
        note: "Çapraz platform ile yerel geliştirme arasındaki farklar ve seçim kriterleri üzerine.",
      },
    ],
  },
];

/** Slug'a karşılık gelen hizmet sayfası içeriği; yoksa null. */
export function serviceContentBySlug(
  slug: string,
): ServiceLandingContent | null {
  return serviceLandingContent.find((entry) => entry.slug === slug) ?? null;
}
