import styles from "./Home.module.css";
import Navbar from "@/components/Navbar/Navbar.jsx";
import HeroSection from "@/pages/Home/sections/HeroSection.jsx";
import CapabilitiesSection from "@/pages/Home/sections/CapabilitiesSection.jsx";
// import CapabilitiesSectionTwo from "@/pages/Home/sections/CapabilitiesSectionTwo.jsx";
import CardSequence from "@/pages/Home/sections/CardSequence.jsx";
import ImpactStats from "@/pages/Home/sections/ImpactStats.jsx";
import PartnersSection from "@/pages/Home/sections/PartnersSection.jsx";
import FAQ from "@/pages/Home/sections/FAQ.jsx";
import ConnectSection from "@/pages/Home/sections/ConnectSection.jsx";
import BenefitsSection from "@/pages/Home/sections/BenefitsSection.jsx";

import Footer from "@/components/Footer/Footer.jsx";


export default function Home() {
  return (
    <div className={styles.home}>
      
      <HeroSection />
      {/* <CapabilitiesSectionTwo /> */}

      <CardSequence />
      
      <CapabilitiesSection />

      <BenefitsSection />
      <ImpactStats />
      <PartnersSection />
      <FAQ />
      <ConnectSection />

      {/* <Footer /> */}
    </div>
  );
}
