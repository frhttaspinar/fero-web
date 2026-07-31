import { notFound } from "next/navigation";

// Örnek blog veritabanı (İleride CMS'e bağlanabilir)
const blogPosts: Record<
  string,
  { title: string; content: React.ReactNode; date: string }
> = {
  "nextjs-14-performans": {
    title:
      "Next.js 14 ile Yüksek Performanslı E-ticaret Siteleri Kurmanın Püf Noktaları",
    date: "25 Temmuz 2026",
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
    date: "12 Temmuz 2026",
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
    date: "03 Temmuz 2026",
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
    date: "20 Haziran 2026",
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

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-16 px-6 md:px-24">
      <article className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 mb-12 border-b border-border/50 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>
          <time className="text-sm text-muted-foreground block">
            {post.date}
          </time>
        </header>
        <div className="text-lg text-muted-foreground leading-relaxed prose prose-invert">
          {post.content}
        </div>
      </article>
    </main>
  );
}
