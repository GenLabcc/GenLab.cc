import Navbar from "@/components/Navbar/Navbar.jsx";
import Footer from "@/components/Footer/Footer.jsx";
// import LandingHero from "./components/LandingHero/LandingHero";

import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home/Home.jsx";
import People from "@/pages/People/People.jsx";
import VerifyCertificate from "@/pages/VerifyCertificate.jsx";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      {/* <LandingHero /> */}

      <ScrollToTop />

      <Navbar />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
