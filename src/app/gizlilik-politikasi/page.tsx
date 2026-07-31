export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-16 px-6 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
          Gizlilik ve Veri Politikası
        </h1>
        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Veri Toplama ve İşleme Süreçlerimiz
            </h2>
            <p>
              Diskyazılım olarak, web platformları, e-ticaret altyapıları ve
              mobil uygulamalar geliştirirken kullanıcılarımızın gizliliğini en
              üst düzeyde tutuyoruz. Sitemizdeki iletişim formları (modallar)
              aracılığıyla toplanan ad, e-posta adresi ve proje detayları gibi
              bilgiler, yalnızca size sunduğumuz teknoloji çözümlerini
              kişiselleştirmek ve proje süreçlerini başlatmak amacıyla
              işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Üçüncü Taraf Entegrasyonları ve Güvenlik
            </h2>
            <p>
              Geliştirdiğimiz projelerde (Next.js, React Native, Vercel vb.
              modern teknolojiler kullanırken) veri güvenliği standartlarına
              harfiyen uymaktayız. Tarafımızla paylaştığınız iletişim ve proje
              verileri, endüstri standardı şifreleme yöntemleriyle korunur ve
              hiçbir surette üçüncü taraf veri sağlayıcılarına satılmaz veya
              pazarlama amacıyla izinsiz paylaşılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Çerezler (Cookies) ve Analitik
            </h2>
            <p>
              Web sitemizin performansını artırmak, kullanıcı etkileşimlerini
              analiz etmek (örneğin UI/UX animasyonlarının akıcılığını ölçmek)
              ve daha iyi bir deneyim sunmak için temel düzeyde analitik
              çerezler kullanmaktayız. Tarayıcı ayarlarınız üzerinden bu
              çerezleri dilediğiniz zaman yönetebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Haklarınız ve İletişim
            </h2>
            <p>
              Sistemlerimizde kayıtlı verilerinize erişme, bu verileri
              güncelleme veya tamamen silinmesini talep etme hakkına sahipsiniz.
              Bu talepleriniz veya gizlilik politikamız hakkındaki tüm
              sorularınız için sitemizdeki iletişim modülleri üzerinden bizimle
              doğrudan irtibata geçebilirsiniz.
            </p>
          </section>

          <p className="text-sm mt-12 pt-8 border-t border-border/50">
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>
    </main>
  );
}
