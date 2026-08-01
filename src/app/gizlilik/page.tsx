import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Doku Yazılım web sitesinde hangi verilerin toplandığı, bu verilerin nasıl işlendiği ve hangi üçüncü taraf hizmetlerin kullanıldığı hakkında bilgilendirme.",
  alternates: { canonical: "/gizlilik" },
  openGraph: {
    type: "article",
    title: "Gizlilik Politikası",
    description:
      "Doku Yazılım web sitesinde toplanan veriler, işlenme amaçları ve kullanılan üçüncü taraf hizmetler.",
    url: "/gizlilik",
  },
};

const LAST_UPDATED = "31 Temmuz 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <ContactModalProvider>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-background px-6 pt-32 pb-24 md:px-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Gizlilik Politikası
            </h1>
            <p className="text-sm text-muted-foreground">
              Son güncelleme: {LAST_UPDATED}
            </p>

            <div className="mt-12 space-y-10 text-lg leading-relaxed text-muted-foreground">
              <p>
                Bu sayfa, Doku Yazılım web sitesinde hangi verilerin toplandığını
                ve bu verilerin ne amaçla kullanıldığını açıklar. Amacımız, siteyi
                ziyaret ettiğinizde neyin gerçekleştiğini teknik olarak
                doğrulanabilir biçimde anlatmaktır.
              </p>

              <Section title="1. Topladığımız veriler">
                <p>
                  Sitede tek veri toplama noktası iletişim formudur. Formda
                  yalnızca şu alanlar bulunur ve yalnızca sizin yazdığınız
                  bilgiler bize ulaşır:
                </p>
                <ul className="ml-5 list-disc space-y-2">
                  <li>Ad soyad</li>
                  <li>E-posta adresi</li>
                  <li>Proje hakkında yazdığınız mesaj</li>
                </ul>
                <p>
                  Formda ayrıca otomatik spam gönderimlerini engellemek için
                  görünmeyen bir kontrol alanı bulunur. Bu alan yalnızca botları
                  ayırt etmeye yarar, sizden herhangi bir ek bilgi toplamaz.
                </p>
              </Section>

              <Section title="2. Verilerin işlenme biçimi">
                <p>
                  Formu gönderdiğinizde bilgiler, form iletim servisi Web3Forms
                  üzerinden doğrudan e-posta kutumuza iletilir. Bu sitenin bir
                  veritabanı yoktur; mesajınız site tarafında saklanmaz, üye
                  kaydı veya profil oluşturulmaz.
                </p>
                <p>
                  Bize ulaşan bilgileri yalnızca talebinizi yanıtlamak ve proje
                  görüşmesini yürütmek için kullanırız. Verileriniz üçüncü
                  taraflara satılmaz ve pazarlama amacıyla paylaşılmaz.
                </p>
              </Section>

              <Section title="3. Çerezler ve analitik">
                <p>
                  Bu site çerez kullanmaz. Sitede analitik, reklam veya izleme
                  scripti bulunmaz; tarayıcınızda ziyaretinizi takip eden bir
                  tanımlayıcı oluşturulmaz. Yazı tipleri, dışarıya istek
                  yapılmayacak şekilde site üzerinden sunulur.
                </p>
              </Section>

              <Section title="4. Üçüncü taraf hizmetler">
                <p>
                  Siteyi çalıştırmak için kullandığımız ve veriyle temas edebilen
                  hizmetler şunlardır:
                </p>
                <ul className="ml-5 list-disc space-y-2">
                  <li>
                    <strong className="font-medium text-foreground">
                      Web3Forms
                    </strong>{" "}
                    — iletişim formunun içeriğini e-posta kutumuza iletir.
                  </li>
                  <li>
                    <strong className="font-medium text-foreground">Vercel</strong>{" "}
                    — siteyi barındırır. Barındırma altyapısı, teknik işleyişin
                    doğal parçası olarak sunucu erişim kayıtları tutabilir.
                  </li>
                  <li>
                    <strong className="font-medium text-foreground">
                      WhatsApp ve Instagram
                    </strong>{" "}
                    — sitedeki bağlantılara tıklarsanız ilgili platforma
                    yönlendirilirsiniz ve o noktadan sonra o platformun kendi
                    gizlilik koşulları geçerli olur.
                  </li>
                </ul>
                <p>
                  Bu hizmetlerin kendi veri işleme politikaları bizden bağımsızdır.
                </p>
              </Section>

              <Section title="5. Saklama ve talepleriniz">
                <p>
                  Form aracılığıyla gönderdiğiniz mesajlar e-posta yazışması
                  olarak saklanır. Bize ulaştırdığınız verilere erişmek,
                  düzeltilmesini veya silinmesini istemek için sitedeki iletişim
                  formundan ya da WhatsApp bağlantısından bize yazmanız
                  yeterlidir; talebinizi makul süre içinde karşılarız.
                </p>
              </Section>

              <Section title="6. Bu metnin kapsamı">
                <p>
                  Bu sayfa bilgilendirme amaçlıdır; hukuki danışmanlık veya
                  herhangi bir mevzuata tam uygunluk beyanı değildir. Sitenin
                  işleyişi değiştikçe bu metin güncellenir ve güncelleme tarihi
                  yukarıda belirtilir.
                </p>
              </Section>
            </div>

            <div className="mt-16 border-t border-border/50 pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
