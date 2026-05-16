import Navbar from "@/components/Navbar/Navbar.jsx";
import Footer from "@/components/Footer/Footer.jsx";
// import LandingHero from "./components/LandingHero/LandingHero";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home/Home.jsx";
import People from "@/pages/People/People.jsx";
import Products from "@/pages/Products.jsx";
import ProductDetail from "@/pages/ProductDetail/ProductDetail.jsx";
import VerifyCertificate from "@/pages/VerifyCertificate.jsx";
// import VoiceAgent from "@/pages/VoiceAgent/VoiceAgent.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "./App.css";

function App() {
  const location = useLocation();
  const isVerifyPage = location.pathname === "/verify-certificate";
  const isHome = location.pathname === "/";

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      {!isVerifyPage && !isHome && <Navbar />}

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          {/* <Route path="/voice-agent" element={<VoiceAgent />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/custom-website-chatbots" element={<ProductDetail />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
        </Routes>
      </div>

      {!isVerifyPage && <Footer />}
    </>
  );
}

export default App;
