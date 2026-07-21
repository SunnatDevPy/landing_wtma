import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker, KeywordTicker } from "@/components/ui/Marquee";
import { Features } from "@/components/sections/Features";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MidCTA } from "@/components/sections/MidCTA";
import { TeamFace } from "@/components/sections/TeamFace";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useI18n } from "@/i18n/I18nContext";

function PageTickers() {
  const { t } = useI18n();
  return (
    <>
      <LogoTicker labels={t.partners} />
      <KeywordTicker items={t.ticker} />
    </>
  );
}

function BottomTicker() {
  const { t } = useI18n();
  return <KeywordTicker items={t.ticker} className="border-t-0" />;
}

export function App() {
  return (
    <div className="main-canvas min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PageTickers />
        <Features />
        <AboutSection />
        <HowItWorks />
        <MidCTA />
        <TeamFace />
        <BottomTicker />
        <Benefits />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
