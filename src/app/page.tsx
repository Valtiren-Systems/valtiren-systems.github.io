import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/site/Nav";
import ScrollHero from "@/components/site/ScrollHero";
import SuiteSection from "@/components/site/SuiteSection";
import LogoMarquee from "@/components/site/LogoMarquee";
import ServicesSection from "@/components/site/ServicesSection";
import CtaSection from "@/components/site/CtaSection";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Nav />
      <main>
        <ScrollHero />
        <SuiteSection />
        <LogoMarquee />
        <ServicesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
