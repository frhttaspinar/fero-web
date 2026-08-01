import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

/**
 * Open Graph / Twitter paylaşım görseli.
 *
 * Harici font indirilmez; ImageResponse'un yerleşik varsayılan fontu kullanılır.
 * Renkler site paletiyle aynı (paper / ink / graphite / signal).
 */

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = siteConfig.ogImageAlt;

const TAGS = ["Mobil Uygulama", "Web", "E-Ticaret", "Yapay Zekâ"];

const host = siteConfig.url.replace(/^https?:\/\//, "");

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f4f6",
          padding: "72px 80px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: "#3d5afe",
              display: "flex",
              marginRight: 16,
            }}
          />
          <div style={{ display: "flex", fontSize: 36 }}>
            <span style={{ color: "#1d1d1f", fontWeight: 700 }}>Doku</span>
            <span style={{ color: "#6e6e73", marginLeft: 12 }}>Yazılım</span>
          </div>
        </div>

        {/* Başlık */}
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            color: "#1d1d1f",
            lineHeight: 1.1,
            maxWidth: 940,
          }}
        >
          Mobil Uygulama, Web ve Yapay Zekâ Çözümleri
        </div>

        {/* Etiketler ve adres */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            {TAGS.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#1d1d1f",
                  border: "1px solid #d6d7dd",
                  borderRadius: 999,
                  padding: "10px 22px",
                  marginRight: 14,
                  backgroundColor: "#ffffff",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6e6e73" }}>
            {host}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
