# Doku Yazılım — Kurumsal Web Sitesi

Doku Yazılım; mobil uygulama, kurumsal web, e-ticaret, yapay zekâ asistanları
ve özel otomasyon çözümleri geliştirir. Bu depo, markanın Next.js 16 + React
Three Fiber ile kodlanmış tanıtım sitesini içerir.
Hero bölümündeki 3D "çekirdek", hiçbir dış `.glb`/`.gltf` dosyası indirmeden
saf prosedürel geometri ve custom GLSL shader ile üretiliyor — bu, dosya
boyutu sıfır, yükleme anlık, 60fps garantili demek.

## Mimari

- **Next.js 14+ (App Router) + TypeScript + Tailwind v4**
- **React Three Fiber / drei / three** — hero'daki 3D sahne
- **GSAP + ScrollTrigger** — scroll'a bağlı obje parçalanma/geçiş animasyonu
- **Lenis** — akıcı smooth scroll
- **Framer Motion** — kart hover'ları, modal, mikro-etkileşimler
- **Web3Forms** — backend'siz iletişim formu (doğrudan mail kutusuna düşer)

## Kurulum

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

### İletişim formunu aktif etmek (Web3Forms)

1. [web3forms.com](https://web3forms.com) adresine git, e-posta adresinle
   ücretsiz bir **Access Key** oluştur (frhttaspinar@gmail.com ile doğrula).
2. Aldığın key'i `.env.local` içindeki `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   değişkenine yapıştır.
3. Form artık doğrudan bu maile düşer — veritabanı, backend gerekmez.

Vercel'e deploy ederken aynı değişkeni **Project Settings → Environment
Variables** kısmına eklemeyi unutma.

### Site adresi ve kanonik domain

Kanonik üretim domaini:

```text
https://www.dokuyazilim.com
```

Metadata, canonical URL, Open Graph / Twitter görselleri, `robots.txt`,
`sitemap.xml`, `manifest.webmanifest` ve JSON-LD tek bir kaynaktan —
`src/lib/site-config.ts` — beslenir. Adres şu sırayla belirlenir:

1. `SITE_URL` environment değişkeni (tanımlıysa)
2. Tanımlı değilse kodda gömülü üretim domaini `https://www.dokuyazilim.com`

Üretim domaini varsayılan olduğu için **Vercel Production ortamında `SITE_URL`
tanımlamaya gerek yoktur.** Bu değişken yalnızca preview/staging gibi farklı bir
alan adı altında yayına alırken, canonical ve sitemap adreslerinin o alan adını
göstermesi için kullanılır:

```env
SITE_URL=https://staging.dokuyazilim.com
```

Değer yalnızca sunucu tarafında okunur (metadata, robots, sitemap, manifest,
JSON-LD, OG görseli); tarayıcıya sızmadığı için `NEXT_PUBLIC_` öneki
gerekmez. Adresin sonuna `/` konulmasına gerek yoktur; site config sondaki
eğik çizgiyi zaten temizler.

> Not: `.gitignore` tüm `.env*` dosyalarını dışladığı için `.env.local.example`
> depoya girmez; ortam değişkeni referansı olarak bu bölüm esas alınmalıdır.

### WhatsApp numarası

`src/components/WhatsAppButton.tsx` ve `src/components/Footer.tsx` içindeki
`905069060250` numarasını güncellersen tüm WhatsApp bağlantıları değişir.

### GEO (generatif arama) yaklaşımı — teknik karar

Generatif arama sistemleri için ayrı bir `llms.txt` veya `ai.txt` dosyası
kullanılmadı. Bunun yerine taranabilirlik, görünür içerik ve bu içerikle birebir
eşleşen yapısal veri tercih edildi:

- `robots.ts` içinde genel izin korunuyor; `OAI-SearchBot` için ayrıca açık bir
  izin satırı var. Diğer ajanlar (GPTBot dâhil) `*` kuralına tabi.
- Hizmet metinleri `src/lib/service-catalog.ts`, SSS içeriği
  `src/lib/geo-faq.ts` içinde tek kaynakta tutuluyor; hem sayfada görünen metin
  hem de JSON-LD aynı yerden okuyor.
- Ana sayfada Organization, WebSite, WebPage, hizmet `ItemList` ve `FAQPage`;
  blog yazılarında `BlogPosting` ve `BreadcrumbList` üretiliyor.

## Performans notları

- 3D sahne `next/dynamic` ile `ssr:false` olarak yükleniyor, hero metni ve
  LCP hiçbir şekilde 3D bundle'ı beklemiyor.
- Hero viewport dışına çıktığında (`IntersectionObserver`) Canvas'ın render
  döngüsü otomatik duruyor (`frameloop="never"`), gereksiz GPU kullanımı yok.
- `prefers-reduced-motion` tercih edilen kullanıcılarda 3D rotasyon/parallax
  ve sayfa animasyonları otomatik devre dışı kalıyor.
- DPR üst sınırı 1.75 ile sınırlandı; yüksek yoğunluklu ekranlarda bile
  gereksiz piksel maliyeti oluşmuyor.

## Deploy

```bash
npx vercel
```

Next.js'in yaratıcısı Vercel olduğu için ekstra bir yapılandırma gerekmez —
`next build` çıktısı doğrudan uyumludur.
