import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { serviceContentBySlug } from "@/lib/service-content";
import {
  landedServiceSlugs,
  serviceByLandingSlug,
  serviceEntityId,
} from "@/lib/service-catalog";
import { projectsForService } from "@/lib/project-catalog";
import { blogPosts } from "@/lib/blog-posts";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/**
 * Hizmet landing page'i.
 *
 * Yalnızca `service-catalog.ts` içinde `landingPath` tanımlı hizmetler için
 * üretilir; başka slug'lar 404 döner (`dynamicParams = false` + `notFound`).
 * Böylece henüz yayına alınmamış hizmetler için boş sayfa oluşmaz.
 *
 * Yapısal veri kritik: sayfadaki `Service` node'u ana sayfadaki ItemList ile
 * **aynı @id'yi** kullanır. Bu duplicate entity değildir — aynı hizmetin aynı
 * kimlikle iki sayfada tutarlı biçimde tanımlanmasıdır. İkinci bir hizmet
 * kimliği (`/hizmetler/...#service` gibi) üretilmez.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return landedServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = serviceContentBySlug(slug);
  if (!content) return {};

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/hizmetler/${slug}` },
    openGraph: {
      type: "website",
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/hizmetler/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h2>
  );
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContentBySlug(slug);
  const catalogEntry = serviceByLandingSlug(slug);

  if (!content || !catalogEntry) {
    notFound();
  }

  const canonicalUrl = absoluteUrl(`/hizmetler/${slug}`);
  const webPageId = `${canonicalUrl}#webpage`;
  // Ana sayfadaki ItemList ile birebir aynı kimlik.
  const serviceId = serviceEntityId(siteConfig.url, content.serviceId);
  const projects = projectsForService(content.serviceId);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: canonicalUrl,
        name: `${content.metaTitle} | ${siteConfig.name}`,
        description: content.metaDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#organization` },
        mainEntity: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: catalogEntry.landingTitle,
        description: content.schemaDescription,
        url: canonicalUrl,
        serviceType: catalogEntry.landingTitle,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: siteConfig.areaServed.map((area) => ({
          "@type": area.type,
          name: area.name,
        })),
        mainEntityOfPage: { "@id": webPageId },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: content.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
    ],
  };

  return (
    <ContactModalProvider>
      <JsonLdScript data={graph} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background px-6 pt-32 pb-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { name: "Ana Sayfa", path: "/" },
                { name: "Hizmetler", path: "/hizmetler" },
                { name: catalogEntry.landingTitle, path: `/hizmetler/${slug}` },
              ]}
              jsonLdId={`${canonicalUrl}#breadcrumb`}
            />

            {/* HERO */}
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {content.heroLead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Proje Başlat
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/hizmetler"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Tüm hizmetler
              </Link>
            </div>

            {/* İÇERİK BÖLÜMLERİ */}
            <div className="mt-16 space-y-14">
              {content.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <SectionHeading>{section.heading}</SectionHeading>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-lg leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* GERÇEK PROJELER */}
            {projects.length > 0 && (
              <section className="mt-16 space-y-6">
                <SectionHeading>İlgili Projelerimiz</SectionHeading>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Bu hizmet kapsamında teslim ettiğimiz gerçek projelerden bir
                  seçki.
                </p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {projects.map((project) => (
                    <article
                      key={project.title}
                      className="overflow-hidden rounded-xl border border-border/60 bg-background"
                    >
                      <div
                        className="relative overflow-hidden bg-muted/40"
                        style={{ aspectRatio: project.ratio }}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} — ${project.tag}`}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="p-5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                          {project.tag}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* SÜREÇ */}
            <section className="mt-16 space-y-6">
              <SectionHeading>Süreç</SectionHeading>
              <ol className="space-y-px overflow-hidden rounded-xl border border-border/60 bg-border/60">
                {content.process.map((step, index) => (
                  <li key={step.title} className="bg-background p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 pl-9 text-base leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ — görünür içerik ve FAQPage schema aynı kaynaktan */}
            <section className="mt-16 space-y-6">
              <SectionHeading>Sık Sorulan Sorular</SectionHeading>
              <div className="border-t border-border/60">
                {content.faq.map((entry) => (
                  <details
                    key={entry.question}
                    className="group border-b border-border/60 py-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                      <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground">
                        {entry.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-2xl font-light leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {entry.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* İLGİLİ İÇERİK */}
            {content.relatedPosts.length > 0 && (
              <section className="mt-16 space-y-6">
                <SectionHeading>İlgili İçerik</SectionHeading>
                <ul className="space-y-4">
                  {content.relatedPosts
                    .filter((post) => blogPosts[post.slug])
                    .map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block rounded-xl border border-border/60 p-5 transition-colors hover:bg-muted/40"
                        >
                          <span className="text-base font-medium text-foreground underline underline-offset-4 decoration-border group-hover:decoration-foreground">
                            {post.label}
                          </span>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {post.note}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            )}

            {/* FİNAL CTA */}
            <section className="mt-16 rounded-2xl border border-border/60 bg-muted/30 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Projenizi anlatın
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                İhtiyacınızı yazın, 24 saat içinde dönüş yapalım. Kapsam ve
                takvimi görüşme sırasında birlikte belirliyoruz.
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
                  href="/hakkimizda"
                  className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Doku Yazılım hakkında
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
