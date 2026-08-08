import Link from "next/link";
import { absoluteUrl } from "@/lib/site-config";
import { JsonLdScript } from "./JsonLd";

/**
 * Görünür içerik yolu + eşleşen BreadcrumbList yapısal verisi.
 *
 * Görünen liste ile schema aynı diziden üretilir; ikisi birbirinden sapamaz.
 * Tasarım blog yazılarındaki mevcut breadcrumb deseniyle aynıdır.
 *
 * Son öğe geçerli sayfadır: bağlantı olarak render edilmez, `aria-current`
 * taşır. Ara öğeler `href` ile verilir.
 */
export type Crumb = {
  name: string;
  /** Kök-göreli yol. Son (geçerli) öğede de verilir; schema item'ı için gerekir. */
  path: string;
};

export function Breadcrumb({
  items,
  jsonLdId,
}: {
  items: Crumb[];
  /** BreadcrumbList @id — genellikle `${canonicalUrl}#breadcrumb`. */
  jsonLdId: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": jsonLdId,
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <nav aria-label="İçerik yolu" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((crumb, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-foreground">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
