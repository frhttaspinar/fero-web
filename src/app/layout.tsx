import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferhat Taşpınar — Yazılım Stüdyosu",
  description:
    "Mobil uygulama, e-ticaret altyapısı, kurumsal web ve yapay zeka destekli otomasyon çözümleri geliştiren yazılım stüdyosu.",
  keywords: [
    "yazılım geliştirme",
    "React Native",
    "mobil uygulama",
    "e-ticaret",
    "kurumsal web sitesi",
    "otomasyon",
    "Ferhat Taşpınar",
  ],
  authors: [{ name: "Ferhat Taşpınar" }],
  openGraph: {
    title: "Ferhat Taşpınar — Yazılım Stüdyosu",
    description:
      "Mobil uygulama, e-ticaret, kurumsal web ve otomasyon çözümleri.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SmoothScrollProvider>
          {children}
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
