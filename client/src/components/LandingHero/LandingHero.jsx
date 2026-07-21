import "./LandingHero.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoMark from "../LogoMark.jsx";
import Navbar from "../Navbar/Navbar.jsx";

export default function LandingHero() {
  const navigate = useNavigate();

  const handleTagClick = (target) => {
    if (target === "launchpad") {
      navigate("/launchpad");
    } else {
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${target}`);
      }
    }
  };

  return (
    <div className="home-hero-shell">
      <section className="hero-section">
        <div className="stagger-item delay-1">
          <Navbar />
        </div>

        <div className="title-wrapper stagger-item delay-2">
          <h1 className="main-title">GenLab</h1>
          <div className="join-btn-wrapper">
            <button
              type="button"
              className="join-btn"
              onClick={() => {
                window.open("https://chat.whatsapp.com/L0n2kNQfSbR3lwhmN5mNVJ", "_blank");
              }}
            >
              <span className="join-text">JOIN WITH US</span>
              <div className="icon-circle">
                <ArrowRight size={16} color="black" />
              </div>
            </button>
          </div>
        </div>

        <div className="separator stagger-item delay-3" />

        <div className="middle-bar stagger-item delay-3">
          <div className="tags-container">
            <button type="button" className="tag" onClick={() => handleTagClick("launchpad")}>
              <span className="dot" />
              Launchpad
              <span className="dot" />
            </button>
            <button type="button" className="tag" onClick={() => handleTagClick("ai")}>
              <span className="dot" />
              AI Forge
              <span className="dot" />
            </button>
            <button type="button" className="tag" onClick={() => handleTagClick("brand")}>
              <span className="dot" />
              Brand Studio
              <span className="dot" />
            </button>
          </div>
          <div className="subtitle-wrapper">
            <p className="subtitle">World&apos;s First Gen Z &amp; AI</p>
            <p className="subtitle">Creative Powerhouse</p>
          </div>
        </div>

        <div className="bottom-section stagger-item delay-4">
          <div className="capabilities-col">
            <h2 className="cap-title">
              OUR
              <br />
              CAPABILITIES
            </h2>
            <p>
              We&apos;re a Gen Z team of strategists,
              <br />
              designers and AI builders.
            </p>
          </div>
          <div className="squares-wrapper-right">
            <div className="yellow-square-with-logo">
              <LogoMark color="rgba(161, 191, 0, 1)" size="50%" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
