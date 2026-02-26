import styles from "./Home.module.css";
import HeroSection from "@/pages/Home/sections/HeroSection.jsx";
import CapabilitiesSection from "@/pages/Home/sections/CapabilitiesSection.jsx";
import CardSequence from "@/pages/Home/sections/CardSequence.jsx";
import ImpactStats from "@/pages/Home/sections/ImpactStats.jsx";
import PartnersSection from "@/pages/Home/sections/PartnersSection.jsx";
import FAQ from "@/pages/Home/sections/FAQ.jsx";
import ConnectSection from "@/components/ConnectSection/ConnectSection";
import BenefitsSection from "@/pages/Home/sections/BenefitsSection.jsx";


export default function Home() {
  return (
    <div className={styles.home}>
      
      <HeroSection />

      <CardSequence />
      
      <CapabilitiesSection />

      <BenefitsSection />
      <ImpactStats />
      <PartnersSection />
      <FAQ />
      <ConnectSection />

    </div>
  );
}
