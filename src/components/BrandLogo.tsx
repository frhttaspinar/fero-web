import Image from "next/image";

/**
 * Doku Yazılım logosu (public/logo-dk.png).
 *
 * Dosya 1024×1024 saydam bir tuval, ancak marka işareti tuvalin yalnızca
 * %13'ünü kaplıyor; kalan alan boş. Dosyayı olduğu gibi 48px'lik bir header
 * yuvasına koyduğumuzda işaret ~21px'e düşüp okunamaz hale geliyor.
 *
 * Marka görselinden kırpılmış bir türev dosya üretmemek için boşluğu render
 * sırasında kırpıyoruz: ölçüler dosyanın gerçek içerik sınırlarından
 * (x 351–655, y 254–709) hesaplandı. Depoya kenar boşlukları kırpılmış bir
 * logo eklenirse bu bileşen sade bir <Image> ile değiştirilebilir.
 */
const CONTENT = { x: 351, y: 254, width: 305, height: 456, canvas: 1024 };

export function BrandLogo({
  height,
  priority = false,
  className,
}: {
  /** İşaretin görünür yüksekliği (px). */
  height: number;
  priority?: boolean;
  className?: string;
}) {
  const scale = height / CONTENT.height;
  const rendered = Math.round(CONTENT.canvas * scale);
  const width = Math.round(CONTENT.width * scale);

  return (
    <span
      className={`relative block overflow-hidden ${className ?? ""}`}
      // Sabit ölçü: görsel yüklenmeden de yer kapladığı için CLS oluşmaz.
      style={{ width, height }}
    >
      <Image
        src="/logo-dk.png"
        alt="Doku Yazılım logosu"
        width={rendered}
        height={rendered}
        priority={priority}
        className="absolute max-w-none object-contain"
        style={{
          left: -Math.round(CONTENT.x * scale),
          top: -Math.round(CONTENT.y * scale),
        }}
      />
    </span>
  );
}
