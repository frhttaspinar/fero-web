# Ferhat Taşpınar — Yazılım Stüdyosu

Next.js 16 + React Three Fiber ile kodlanmış, tek sayfalık portfolyo sitesi.
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

### WhatsApp numarası

`src/components/WhatsAppButton.tsx` ve `src/components/Footer.tsx` içindeki
`905069060250` numarasını güncellersen tüm WhatsApp bağlantıları değişir.

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
