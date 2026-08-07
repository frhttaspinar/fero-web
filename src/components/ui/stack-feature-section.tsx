"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple, FaFigma
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFacebook, SiTailwindcss
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: FaFigma, color: "#F24E1E" },
];

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 12; // Yörüngeler arası boşluk artırıldı (daha büyük görünüm)
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    // max-w-6xl, border ve yuvarlak köşeler kaldırıldı. Tam genişlik ve min-height eklendi.
    <section className="relative z-20 mt-32 md:mt-48 w-full min-h-[75vh] flex flex-col md:flex-row items-center justify-between overflow-hidden bg-background py-24 px-6 md:px-24">

      {/* Sol Kısım: Başlık ve Metin */}
      <div className="w-full md:w-1/2 z-10 flex flex-col justify-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight leading-tight">
          Tek Çatı Altında,<br/> Tüm Çözümleriniz
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl text-lg sm:text-xl leading-relaxed">
          Web geliştirme, yüksek performanslı mobil uygulamalar, yapay zekâ entegrasyonları ve otomasyon. Hepsi Doku Yazılım standartlarında, markanıza özel ve ölçeklenebilir bir yapıda.
        </p>
        {/* İşletme kimliğini doğrulayan konum satırı. Vurgu bilinçli olarak
            ülke genelinde: Amasya ikincil bilgi olarak, ofisin fiziksel yeri
            olarak geçiyor — hizmet/pazar tanımı olarak değil. */}
        <p className="text-muted-foreground mb-10 max-w-xl text-base leading-relaxed">
          Doku Yazılım, Türkiye genelindeki işletmeler ve projeler için çalışır.
          Fiziksel ofisimiz Amasya Merkez&apos;de bulunur; Türkiye&apos;nin her
          yerindeki projeler uzaktan yürütülebilir.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex"
          >
            <Button asChild variant="outline" className="px-8 py-6 text-base bg-transparent hover:bg-muted/50 transition-colors">
               <Link href="#projeler">Projeleri İncele</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Sağ Kısım: Ekrandan sağa doğru taşan devasa yörünge animasyonu */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full flex items-center justify-end pointer-events-none opacity-30 md:opacity-100 z-0">
        <div className="relative w-[65rem] h-[65rem] translate-x-[25%] flex items-center justify-center">
          {/* Merkez İkon */}
          <div className="w-28 h-28 rounded-full bg-background shadow-2xl border border-border/40 flex items-center justify-center z-20">
            <FaReact className="w-14 h-14 text-[#61DAFB]" />
          </div>

          {/* Yörüngeler */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${20 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dashed border-border/50"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${25 + orbitIdx * 12}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    // Hydration uyumsuzluğunu önlemek için değerler sabitlendi
                    const x = Number((50 + 50 * Math.cos(angle)).toFixed(4));
                    const y = Number((50 + 50 * Math.sin(angle)).toFixed(4));

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-background rounded-full p-4 shadow-xl border border-border/30"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <cfg.Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: cfg.color }} />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
