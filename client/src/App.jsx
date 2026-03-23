import Navbar from "@/components/Navbar/Navbar.jsx";
import Footer from "@/components/Footer/Footer.jsx";
// import LandingHero from "./components/LandingHero/LandingHero";

import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home/Home.jsx";
import People from "@/pages/People/People.jsx";
import Products from "@/pages/Products.jsx";
import ProductDetail from "@/pages/ProductDetail/ProductDetail.jsx";
import VerifyCertificate from "@/pages/VerifyCertificate.jsx";

import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

function App() {
  const location = useLocation();
  const isVerifyPage = location.pathname === "/verify-certificate";

  return (
    <>
      <ScrollToTop />

      {!isVerifyPage && <Navbar />}

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
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
