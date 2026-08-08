import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import {
  serviceCatalog,
  serviceEntityId,
  hasLanding,
} from "@/lib/service-catalog";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * Hizmet merkezi (hub).
 *
 * Yedi hizmetin tamamını tek yerde toplar. Yalnızca yayına alınmış hizmet
 * sayfaları bağlantı alır (`landingPath` tanımlı olanlar); diğerleri özet
 * olarak gösterilir ve hiçbir yere link vermez — böylece 404 üretilmez.
 *
 * Konumlandırma: hub, "yazılım geliştirme hizmetleri" düzeyinde genel bir
 * sayfadır; tek bir hizmetin ticari sorgusunu sahiplenmez, o iş ilgili hizmet
 * sayfasına aittir.
 */
export const metadata: Metadata = {
  title: "Yazılım Geliştirme Hizmetleri",
  description:
    "Doku Yazılım'ın Türkiye genelindeki işletmeler için geliştirdiği web, mobil uygulama, e-ticaret, yapay zekâ, otomasyon ve tasarım hizmetleri.",
  alternates: { canonical: "/hizmetler" },
  openGraph: {
    type: "website",
    title: "Yazılım Geliştirme Hizmetleri",
    description:
      "Web, mobil uygulama, e-ticaret, yapay zekâ ve otomasyon çözümleri. Türkiye genelinde uzaktan yürütülen projeler.",
    url: "/hizmetler",
  },
};

export default function ServicesHubPage() {
  const canonicalUrl = absoluteUrl("/hizmetler");

  // ItemList mevcut Service @id'lerine referans verir; yeni bir hizmet kimliği
  // üretilmez, böylece aynı hizmet için ikinci bir entity oluşmaz.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collectionpage`,
    url: canonicalUrl,
    name: `Yazılım Geliştirme Hizmetleri | ${siteConfig.name}`,
    description: metadata.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: `${siteConfig.name} Hizmetleri`,
      itemListElement: serviceCatalog.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": serviceEntityId(siteConfig.url, service.id) },
      })),
    },
  };

  return (
    <ContactModalProvider>
      <JsonLdScript data={jsonLd} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background px-6 pt-32 pb-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <Breadcrumb
              items={[
                { name: "Ana Sayfa", path: "/" },
                { name: "Hizmetler", path: "/hizmetler" },
              ]}
              jsonLdId={`${canonicalUrl}#breadcrumb`}
            />

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Yazılım Geliştirme Hizmetleri
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Bir dijital ürünün ihtiyaç duyduğu her katmanı tek elden
              geliştiriyoruz. Projeler Türkiye&apos;nin her yerindeki
              işletmelerle uzaktan yürütülebilir.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2">
              {serviceCatalog.map((service) => {
                const landed = hasLanding(service);
                const heading = landed ? service.landingTitle : service.name;

                const inner = (
                  <>
                    <h2 className="flex items-start gap-2 text-xl font-semibold tracking-tight text-foreground">
                      <span>{heading}</span>
                      {landed && (
                        <ArrowUpRight
                          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </>
                );

                // Yalnızca yayındaki hizmetler bağlantı olur; diğerleri düz
                // özet kart olarak durur ("hazırlanıyor" gibi bir ifade yok).
                return landed ? (
                  <Link
                    key={service.id}
                    href={service.landingPath}
                    className="group block bg-background p-7 transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground sm:p-8"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={service.id} className="bg-background p-7 sm:p-8">
                    {inner}
                  </div>
                );
              })}
            </div>

            <section className="mt-16 rounded-2xl border border-border/60 bg-muted/30 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Projenizi konuşalım
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                İhtiyacınızı anlatın, 24 saat içinde dönüş yapalım. Hangi
                hizmetin uygun olduğundan emin değilseniz de yazabilirsiniz —
                kapsamı birlikte netleştiririz.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
                >
                  İletişime Geçin
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/#projeler"
                  className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Önceki projelerimize göz atın
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
