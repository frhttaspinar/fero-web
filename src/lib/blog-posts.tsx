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
  /** ISO tarih — yayın tarihi (datePublished). */
  isoDate: string;
  /** İçerik esaslı biçimde güncellendiyse görünen güncelleme tarihi. */
  modifiedDate?: string;
  /** ISO güncelleme tarihi — dateModified ve sitemap lastModified için. */
  modifiedIsoDate?: string;
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
    title:
      "Codex, Claude ve Antigravity ile Yapay Zekâ Destekli Yazılım Geliştirme",
    excerpt:
      "Kod üretimi, kod inceleme, hata ayıklama, test senaryoları ve dokümantasyon süreçlerinde Codex, Claude ve Google Antigravity’nin görev odaklı kullanımı.",
    date: "03 Temmuz 2026",
    isoDate: "2026-07-03",
    modifiedDate: "1 Ağustos 2026",
    modifiedIsoDate: "2026-08-01",
    content: (
      <div className="space-y-6">
        <p>
          Doku Yazılım&apos;da yapay zekâ destekli geliştirme tek bir araca
          bağlı yürütülmüyor. Projenin ihtiyacına ve elimizdeki görevin
          niteliğine göre OpenAI Codex, Anthropic Claude ve Google Antigravity
          farklı adımlarda yardımcı araç olarak kullanılıyor. Buradaki amaç
          geliştirmeyi devretmek değil; tekrar eden işleri hızlandırmak ve
          gözden kaçabilecek noktalar için ikinci bir bakış açısı elde etmek.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Tek araç yerine görev odaklı çalışma
        </h2>

        <p>
          Kod üretimi, mevcut kodun incelenmesi, hata ayıklama, refactor
          planlama, test senaryolarının çıkarılması ve dokümantasyon gibi
          işlerde bu araçlardan destek alıyoruz. Hangi aracın kullanılacağı
          görevin kapsamına ve ihtiyaç duyulan inceleme biçimine göre
          belirleniyor: kimi işte kısa ve odaklı bir düzenleme yeterli olurken,
          kimi işte kod tabanının bütününü kapsayan daha geniş bir inceleme
          gerekiyor.
        </p>

        <p>
          Bu yaklaşımın pratik faydası, her aracı kendi güçlü olduğu yerde
          kullanabilmek. Tek bir araca bağlı kalmak yerine görevi araca göre
          seçtiğimizde, çıkan öneriyi değerlendirme sorumluluğu da bizde
          kalıyor — üretilen her değişiklik, üzerine düşünülmesi gereken bir
          taslak olarak ele alınıyor.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          İnsan denetimi ve kontrollü yayın
        </h2>

        <p>
          Yapay zekâ tarafından önerilen değişiklikler doğrudan
          production&apos;a gönderilmiyor. Değişiklikler ayrı Git
          branch&apos;lerinde uygulanıyor, lint ve build kontrollerinden
          geçiriliyor, Preview ortamında canlıya benzer koşullarda gözden
          geçiriliyor. Ancak bu adımlar tamamlandıktan sonra yayın gündeme
          geliyor.
        </p>

        <p>
          Nihai kod incelemesi, test, güvenlik kontrolü ve production kararı her
          durumda insan denetiminde. Yapay zekâ araçları süreci hızlandıran bir
          yardımcı; teknik kararın ve sorumluluğun sahibi değil.
        </p>
      </div>
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
