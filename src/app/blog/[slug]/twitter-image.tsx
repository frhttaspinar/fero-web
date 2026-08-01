import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";
import { blogPostSlugs } from "@/lib/blog-posts";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export default function TwitterImage() {
  return renderOgImage();
}
