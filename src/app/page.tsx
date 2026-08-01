import { Header } from "@/components/Header";
import InteractiveFloatingHero from "@/components/hero/InteractiveFloatingHero";
import FeatureSection from "@/components/ui/stack-feature-section";
import { Services } from "@/components/services/Services";
import { Projects } from "@/components/projects/Projects";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <ContactModalProvider>
      <JsonLd />
      <div id="top" className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <InteractiveFloatingHero />
          <FeatureSection />
          <Services />
          <Projects />
        </main>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
