import HeroSection from "@/pages/Home/sections/HeroSection.jsx";
import Navbar from "@/components/Navbar/Navbar.jsx"
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar/>
      <HeroSection />
    </div>
  );
}
