// Bu segment kendi `openGraph` metadata'sını tanımladığı için kök segmentin
// openGraph alanlarını (dolayısıyla kök OG görselini) devralmaz. Görsel yolunu
// elle yazmak yerine dosya konvansiyonu kullanılıyor; URL'yi Next üretir.
import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage();
}
