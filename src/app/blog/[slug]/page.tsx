import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, blogPostSlugs } from "@/lib/blog-posts";

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

  return (
    <main className="min-h-screen bg-background pt-32 pb-16 px-6 md:px-24">
      <article className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 mb-12 border-b border-border/50 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>
          <time dateTime={post.isoDate} className="text-sm text-muted-foreground block">
            {post.date}
          </time>
        </header>
        <div className="text-lg text-muted-foreground leading-relaxed">
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
