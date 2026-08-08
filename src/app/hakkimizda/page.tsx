import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * İşletme kimliği sayfası.
 *
 * Konumlandırma kuralı: birincil mesaj Türkiye geneli hizmet kapsamıdır;
 * Amasya yalnızca fiziksel ofisin bulunduğu yer olarak, ikincil bilgi
 * biçiminde geçer. Başlık, açıklama ve H1'e şehir adı eklenmez — bu, ulusal
 * arama niyetini yerel bir nişe daraltır.
 */
export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Doku Yazılım, Türkiye genelindeki işletmeler ve girişimler için web, mobil uygulama, e-ticaret, yapay zekâ ve otomasyon çözümleri geliştiren bağımsız bir yazılım işletmesidir.",
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    type: "profile",
    title: "Hakkımızda",
    description:
      "Türkiye genelindeki işletmeler ve girişimler için dijital ürünler ve yazılım çözümleri geliştiren bağımsız bir yazılım işletmesi.",
    url: "/hakkimizda",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  const canonicalUrl = absoluteUrl("/hakkimizda");

  // AboutPage, ana sayfadaki graph'ta tanımlı LocalBusiness varlığına bağlanır;
  // entity tekrarı yaratmamak için node yeniden tanımlanmaz, yalnızca @id ile
  // referans verilir.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${canonicalUrl}#aboutpage`,
    url: canonicalUrl,
    name: `Hakkımızda | ${siteConfig.name}`,
    description: metadata.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <ContactModalProvider>
      <JsonLdScript data={jsonLd} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background px-6 pt-32 pb-24 md:px-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Hakkımızda
            </h1>
            <p className="text-sm text-muted-foreground">
              Türkiye geneli hizmet · Fiziksel ofis Amasya Merkez
            </p>

            <div className="mt-12 space-y-10 text-lg leading-relaxed text-muted-foreground">
              <p>
                Doku Yazılım, Türkiye genelindeki işletmeler ve girişimler için
                dijital ürünler ve yazılım çözümleri geliştiren bağımsız bir
                yazılım işletmesidir.
              </p>

              <Section title="Nasıl çalışıyoruz">
                <p>
                  Web, mobil uygulama, e-ticaret, yapay zekâ ve otomasyon
                  projeleri Türkiye&apos;nin farklı bölgelerindeki müşterilerle
                  uzaktan yürütülebilir. Süreç, projenin ihtiyacının
                  netleştirilmesiyle başlar; UI/UX tarafında araştırmadan
                  prototipe bir tasarım çalışması yürütülür ve geliştirme bu
                  tasarımın üzerine kurulur.
                </p>
                <p>
                  Kapsam ve takvim projeden projeye değiştiği için görüşme
                  sırasında birlikte belirlenir. Nihai teknik kararlar ve yayın
                  süreci insan denetiminde yürütülür.
                </p>
              </Section>

              <Section title="Fiziksel ofisimiz">
                <p>
                  Fiziksel ofisimiz Amasya Merkez&apos;dedir ve yüz yüze
                  görüşmek isteyen müşterilerimizi burada ağırlayabiliriz. Ofise
                  ait adres, telefon ve yol tarifi bilgilerinin tamamı{" "}
                  <Link
                    href="/iletisim"
                    className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
                  >
                    iletişim sayfasında
                  </Link>{" "}
                  yer alır.
                </p>
                <p>
                  Ofise gelmek zorunlu değildir; projelerin büyük bölümü uzaktan
                  yürütülür ve görüşmeler çevrim içi yapılabilir.
                </p>
              </Section>

              <Section title="Hizmet başlıklarımız">
                <p>
                  Web geliştirme, mobil uygulama geliştirme, UI/UX tasarım,
                  yapay zekâ çağrı asistanı, dijital pazarlama, otomasyon
                  geliştirme ve e-ticaret siteleri olmak üzere yedi başlıkta
                  çalışıyoruz. Her hizmetin ayrıntısını{" "}
                  <Link
                    href="/#hizmetler"
                    className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
                  >
                    ana sayfadaki Hizmetler bölümünde
                  </Link>{" "}
                  bulabilirsiniz.
                </p>
              </Section>
            </div>

            <div className="mt-16 border-t border-border/50 pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
