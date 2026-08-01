/**
 * Blog içerikleri (ileride CMS'e bağlanabilir).
 *
 * Hem /blog/[slug] sayfası hem de sitemap aynı kaynağı kullanır; böylece yeni
 * bir yazı eklendiğinde sitemap kendiliğinden güncellenir.
 */

export type BlogPost = {
  title: string;
  /** Metadata açıklaması için düz metin özet. */
  excerpt: string;
  date: string;
  /** ISO tarih — sitemap lastModified için. */
  isoDate: string;
  content: React.ReactNode;
};

export const blogPosts: Record<string, BlogPost> = {
  "nextjs-14-performans": {
    title:
      "Next.js 14 ile Yüksek Performanslı E-ticaret Siteleri Kurmanın Püf Noktaları",
    excerpt:
      "App Router ve Turbopack ile sunucu taraflı render'ı optimize ederek e-ticaret sitelerinde SEO ve kullanıcı deneyimini birlikte yükseltme yöntemleri.",
    date: "25 Temmuz 2026",
    isoDate: "2026-07-25",
    content: (
      <p>
        Modern e-ticaret sitelerinde hız her şeydir. Next.js 14&apos;ün
        getirdiği App Router ve Turbopack gibi yenilikler sayesinde, sunucu
        taraflı render (SSR) işlemlerini optimize ederek hem SEO puanlarını hem
        de kullanıcı deneyimini maksimuma çıkarıyoruz. Bu yazıda, projelerimizde
        uyguladığımız performans optimizasyon stratejilerini inceliyoruz.
      </p>
    ),
  },
  "react-native-mi-native-mi": {
    title: "React Native mi, Native mi? Projeniz İçin Hangisi Doğru?",
    excerpt:
      "Çapraz platform ve yerel geliştirme arasındaki farklar, Expo ekosisteminin katkısı ve projenize uygun teknoloji yığınını seçme kriterleri.",
    date: "12 Temmuz 2026",
    isoDate: "2026-07-12",
    content: (
      <p>
        Mobil uygulama geliştirme süreçlerinde çapraz platform (cross-platform)
        ile doğrudan yerel (native) diller arasında seçim yapmak kritik bir
        karardır. React Native, kod tekrarını azaltıp hızlı teslimat sağlarken,
        Expo ekosistemiyle birlikte kusursuz bir geliştirme deneyimi sunar.
        Projenizin ihtiyaçlarına göre en doğru teknoloji yığınını nasıl
        seçeceğinizi detaylandırıyoruz.
      </p>
    ),
  },
  "google-antigravity-yapay-zeka": {
    title: "Google Antigravity ve Yapay Zeka İle Otomasyon Sistemleri",
    excerpt:
      "Kod üretiminden hata ayıklamaya, test senaryolarından arayüz iyileştirmelerine kadar geliştirme sürecini yapay zeka ile otomatikleştirme yaklaşımımız.",
    date: "03 Temmuz 2026",
    isoDate: "2026-07-03",
    content: (
      <p>
        Uygulama ve web sitesi geliştirme süreçlerimizde Google Antigravity
        kullanmak, iş akışımızı inanılmaz bir seviyeye taşıyor. Özellikle
        Antigravity ajanı olarak Gemini 3.1 Pro entegrasyonu sayesinde; kod
        üretiminden hata ayıklamaya, test senaryolarının oluşturulmasından UI
        iyileştirmelerine kadar birçok adımı otomatize ediyoruz. Bu yapay zeka
        destekli yaklaşım, müşterilerimize daha hızlı ve hatasız projeler teslim
        etmemizi sağlıyor.
      </p>
    ),
  },
  "3d-web-animasyonlari": {
    title: "Kullanıcı Deneyimini Artıran 3D Web Animasyonları",
    excerpt:
      "Framer Motion ve WebGL ile 60fps akıcılığında, kullanıcıyı yormayan fizik tabanlı web animasyonları kurgulamanın temelleri.",
    date: "20 Haziran 2026",
    isoDate: "2026-06-20",
    content: (
      <p>
        Sıradan, statik web sitelerinin devri kapandı. Framer Motion ve WebGL
        gibi teknolojiler kullanarak, kullanıcıyı yormayan ancak görsel olarak
        büyüleyen fizik tabanlı animasyonlar (spring, hover efektleri, yörünge
        animasyonları) tasarlıyoruz. Bu yazıda 60fps akıcılığında animasyonlar
        kurgulamanın temellerini ele alıyoruz.
      </p>
    ),
  },
};

export const blogPostSlugs = Object.keys(blogPosts);
