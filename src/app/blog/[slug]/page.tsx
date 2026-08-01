import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, blogPostSlugs } from "@/lib/blog-posts";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { JsonLdScript } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      publishedTime: post.isoDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
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

  const canonicalUrl = absoluteUrl(`/blog/${slug}`);
  const organizationId = `${siteConfig.url}/#organization`;

  // Yazar ve yayıncı olarak Organization kullanılıyor: site marka mimarisini
  // kurum üzerinden sürdürüyor, kişisel yazar adı uydurulmuyor.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    // İçerik esaslı biçimde güncellendiyse gerçek güncelleme tarihi kullanılır;
    // aksi hâlde yayın tarihi korunur (sahte "güncellendi" sinyali üretilmez).
    dateModified: post.modifiedIsoDate ?? post.isoDate,
    inLanguage: "tr-TR",
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: absoluteUrl(`/blog/${slug}/opengraph-image`),
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background px-6 pt-32 pb-16 md:px-24">
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />

      <article className="mx-auto max-w-3xl space-y-8">
        <nav aria-label="İçerik yolu" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="mb-12 space-y-4 border-b border-border/50 pb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.isoDate}>{post.date}</time>
            {post.modifiedDate && post.modifiedIsoDate && (
              <time dateTime={post.modifiedIsoDate}>
                Güncellendi: {post.modifiedDate}
              </time>
            )}
          </div>
        </header>

        <div className="text-lg leading-relaxed text-muted-foreground">
          {post.content}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 pt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Ana sayfaya dön
        </Link>
      </article>
    </main>
  );
}
