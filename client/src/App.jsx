import Navbar from "@/components/Navbar/Navbar.jsx";

// import LandingHero from "./components/LandingHero/LandingHero";
import Home from "@/pages/Home/Home.jsx"

import Footer from "@/components/Footer/Footer.jsx";
import "./App.css";

function App() {
  return (
    <>
      {/* <LandingHero /> */}

      <Navbar />
      <Home/>
      <Footer />
    </>
  );
}

export default App;
