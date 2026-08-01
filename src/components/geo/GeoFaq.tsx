import { geoFaq } from "@/lib/geo-faq";

/**
 * Görünür SSS bölümü.
 *
 * Native <details>/<summary> kullanır: JavaScript kapalıyken de okunabilir,
 * klavyeyle açılıp kapanır ve ek bir accordion bağımlılığı gerektirmez.
 * İçerik JsonLd.tsx'teki FAQPage ile aynı kaynaktan (geo-faq.ts) gelir.
 */
export function GeoFaq() {
  return (
    <section
      id="sik-sorulan-sorular"
      className="relative bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-ash">
            SSS
          </span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Sık Sorulan Sorular
          </h2>
        </div>

        <div className="border-t border-line">
          {geoFaq.map((entry) => (
            <details
              key={entry.question}
              className="group border-b border-line py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-black sm:text-xl">
                  {entry.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-2xl font-light leading-none text-graphite transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-graphite">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
