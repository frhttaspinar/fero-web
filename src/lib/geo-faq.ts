/**
 * Sık sorulan sorular — tek kaynak.
 *
 * Hem görünür FAQ bölümü (GeoFaq.tsx) hem de ana sayfadaki FAQPage yapısal
 * verisi (JsonLd.tsx) bu diziden okur. Böylece structured data ile sayfada
 * görünen metin birebir aynı kalır.
 *
 * Cevaplar yalnızca sitede görünen, doğrulanabilir bilgilere dayanır: hizmet
 * kartlarındaki açıklamalar ve teknoloji etiketleri, iletişim formunun
 * bildirdiği dönüş süresi ve alt bilgideki iletişim kanalları. Yapay zekâ
 * destekli geliştirme sorusu, stüdyonun beyan ettiği çalışma biçimini yansıtır.
 * Fiyat, teslim süresi taahhüdü veya doğrulanamayan üstünlük iddiası içermez.
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

export const geoFaq: FaqEntry[] = [
  {
    question: "Doku Yazılım hangi hizmetleri sunar?",
    answer:
      "Doku Yazılım yedi başlıkta hizmet veriyor: web geliştirme, mobil uygulama geliştirme, UI/UX tasarım, yapay zekâ çağrı asistanı, dijital pazarlama, otomasyon geliştirme ve e-ticaret siteleri. Projeler tasarımdan geliştirmeye uçtan uca yürütülüyor. Her hizmetin ayrıntısını ana sayfadaki Hizmetler bölümünde bulabilirsiniz.",
  },
  {
    question: "Mobil uygulamalar hangi platformlar için geliştiriliyor?",
    answer:
      "Mobil uygulamalar iOS ve Android için geliştiriliyor. Tek bir kod tabanıyla iki platforma birden çıkabilmek için React Native ve Expo kullanılıyor, böylece aynı özellik seti her iki platformda paralel ilerliyor. Hedef, akıcı ve yüksek etkileşimli bir kullanıcı deneyimi.",
  },
  {
    question: "Yapay zekâ çağrı asistanı ne yapar?",
    answer:
      "Gelen telefon çağrılarını 7/24 doğal bir sesle karşılar. Sık sorulan soruları yanıtlar, randevu oluşturur ve CRM entegrasyonu üzerinden mevcut sistemlerle birlikte çalışabilir. Bu yapı, mesai dışındaki veya yoğun saatlerde gelen çağrıların karşılanmasına yardımcı olur.",
  },
  {
    question: "Web projelerinde hangi teknolojiler kullanılıyor?",
    answer:
      "Web tarafında Next.js, React ve TypeScript kullanılıyor; yönlendirme için App Router tercih ediliyor. Amaç hızlı, erişilebilir ve arama motorlarına hazır uygulamalar üretmek. Kod tabanı ölçeklenebilir ve bakımı kolay olacak şekilde kuruluyor.",
  },
  {
    question: "Proje geliştirme süreci nasıl ilerliyor?",
    answer:
      "Süreç, iletişim formundan projenizi anlatmanızla başlıyor; mesajlara 24 saat içinde dönüş yapılıyor. Ardından ihtiyaç netleştiriliyor, UI/UX tarafında araştırmadan prototipe bir tasarım çalışması yürütülüyor ve geliştirme bu tasarımın üzerine kuruluyor. Kapsam ve takvim projeden projeye değiştiği için görüşme sırasında birlikte belirleniyor.",
  },
  {
    question: "Doku Yazılım ile nasıl iletişime geçebilirim?",
    answer:
      "En hızlı yol sitedeki iletişim formu: sayfanın üstündeki “Bize Ulaşın” ve alt bilgideki “Proje Başlat” düğmeleri aynı formu açar. Alternatif olarak alt bilgideki WhatsApp bağlantısından doğrudan mesaj gönderebilir, Instagram veya LinkedIn hesapları üzerinden de ulaşabilirsiniz. Form gönderimleri iletişim e-posta kutusuna iletilir.",
  },
  {
    question:
      "Yazılım geliştirme sürecinde hangi yapay zekâ araçları kullanılıyor?",
    answer:
      "Doku Yazılım, projenin ve görevin ihtiyacına göre OpenAI Codex, Anthropic Claude ve Google Antigravity gibi yapay zekâ destekli geliştirme araçlarından yararlanır. Bu araçlar kod üretimi, kod inceleme, hata ayıklama, test senaryoları ve dokümantasyon süreçlerinde destek amacıyla kullanılır. Nihai kontroller, teknik kararlar ve yayın süreci insan denetiminde yürütülür.",
  },
];
