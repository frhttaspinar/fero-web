import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * İletişim ve konum sayfası.
 *
 * Bu sayfa, iletişim modalının taranabilir karşılığıdır: modal hızlı dönüşüm
 * için korunur, NAP (Name/Address/Phone) bilgisi ise kalıcı bir URL'de yer alır.
 *
 * İki bilgi bilinçli olarak ayrı sunulur — hizmet alanı Türkiye geneli, fiziksel
 * ofis Amasya Merkez. Sayfanın amacı konum olduğu için adres burada daha
 * görünürdür; bu, sitenin ulusal konumlandırmasını değiştirmez.
 *
 * Adres, telefon ve e-posta siteConfig'ten tek kaynaktan okunur ve Google
 * Business Profile kaydıyla birebir aynı olmalıdır.
 */
export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Doku Yazılım ile iletişime geçin. Türkiye genelinde uzaktan proje yürütüyoruz; fiziksel ofisimiz Amasya Merkez'dedir. Telefon, e-posta ve adres bilgileri.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    type: "website",
    title: "İletişim",
    description:
      "Doku Yazılım iletişim bilgileri: telefon, e-posta, WhatsApp ve fiziksel ofis adresi.",
    url: "/iletisim",
  },
};

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/50 py-5">
      <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-lg leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}

export default function ContactPage() {
  const canonicalUrl = absoluteUrl("/iletisim");

  // ContactPage, ana sayfadaki graph'ta tanımlı Organization/ProfessionalService
  // varlığına @id ile bağlanır; adres ve telefon orada tanımlı olduğu için
  // burada tekrar edilmez, entity çiftlenmesi oluşmaz.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonicalUrl}#contactpage`,
    url: canonicalUrl,
    name: `İletişim | ${siteConfig.name}`,
    description: metadata.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
  };

  const linkClass =
    "underline underline-offset-4 transition-colors hover:text-muted-foreground";

  return (
    <ContactModalProvider>
      <JsonLdScript data={jsonLd} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background px-6 pt-32 pb-24 md:px-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              İletişim
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Projenizi anlatın, 24 saat içinde dönüş yapalım. Türkiye&apos;nin
              her yerindeki projeleri uzaktan yürütüyoruz; yüz yüze görüşmek
              isterseniz ofisimizde ağırlayabiliriz.
            </p>

            <dl className="mt-12 border-t border-border/50">
              <InfoRow label="Hizmet Alanı">
                Türkiye Geneli
                <span className="mt-1 block text-base text-muted-foreground">
                  Projeler Türkiye&apos;nin farklı şehirlerinden uzaktan
                  yürütülebilir.
                </span>
              </InfoRow>

              <InfoRow label="Fiziksel Ofis">
                Amasya Merkez
                <address className="mt-1 not-italic text-base leading-relaxed text-muted-foreground">
                  {siteConfig.address.full}
                </address>
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block text-base ${linkClass}`}
                >
                  Google Maps&apos;te aç — yol tarifi al →
                </a>
              </InfoRow>

              <InfoRow label="Telefon">
                <a href={`tel:${siteConfig.phone}`} className={linkClass}>
                  {siteConfig.phoneDisplay}
                </a>
              </InfoRow>

              <InfoRow label="WhatsApp">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </InfoRow>

              <InfoRow label="E-posta">
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </InfoRow>

              <InfoRow label="Çalışma Saatleri">
                7/24
                <span className="mt-1 block text-base text-muted-foreground">
                  Her gün 24 saat ulaşabilirsiniz; mesajlarınıza 24 saat içinde
                  dönüş yapılır.
                </span>
              </InfoRow>
            </dl>

            <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
              Dilerseniz sayfanın üstündeki{" "}
              <strong className="font-medium text-foreground">
                Bize Ulaşın
              </strong>{" "}
              düğmesinden iletişim formunu da kullanabilirsiniz. Doku
              Yazılım&apos;ın çalışma biçimi hakkında ayrıntı için{" "}
              <Link href="/hakkimizda" className={`text-foreground ${linkClass}`}>
                Hakkımızda
              </Link>{" "}
              sayfasına bakabilirsiniz.
            </p>

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
