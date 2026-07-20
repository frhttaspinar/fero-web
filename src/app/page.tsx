import { Header } from "@/components/Header";
import { AnimatedShaderHero } from "@/components/hero/AnimatedShaderHero";
import { ScrollGallery } from "@/components/gallery/ScrollGallery";
import { Services } from "@/components/services/Services";
import { Projects } from "@/components/projects/Projects";
import { TerminalReveal } from "@/components/about/TerminalReveal";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";

export default function Home() {
  return (
    <ContactModalProvider>
      <div id="top" className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedShaderHero />
          <ScrollGallery />
          <Services />
          <Projects />
          <TerminalReveal />
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
