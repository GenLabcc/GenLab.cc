import "./LandingHero.css";
import logo from "@/assets/logo.png";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";


export default function Hero() {
  return (
    // <section className="hero">
    //     <div className="bg-shapes">
    //         <div className="shape triangle" />
    //         <div className="shape circle" />
    //         <div className="shape square" />
    //     </div>

        <section className="hero">
            
            <div className="bg-shapes">
                <div className="shape circle2" />
                <div className="shape circle1" />
            </div>

            {/* CONTENT ROW */}
            <div className="hero-content">
                <div className="hero-left">
                    <a href="/" aria-label="Go to homepage">
                        <img src={logo} alt="GenLab Logo" className="logo-img" />
                    </a>

                    <span className="headline">
                        World's First <br />
                        <span className="gbold">Gen Z</span><span className="green"> AI</span><span> Creative <br />
                        Powerhouse </span> 
                    </span>

                    <button className="cta">
                        Coming Soon <span>→</span>
                    </button>
                </div>

                <div className="hero-right">
                    <p className="description">
                        We're a Gen Z team of strategists, designers and AI builders.
                        We blend bold branding, smart automation and future-ready
                        upskilling to help you launch what's next.
                    </p>

                    <ul className="services">
                        <li><span>01</span> GenLab.Launchpad</li>
                        <li><span>02</span> GenLab.Brand Studio</li>
                        <li><span>03</span> GenLab.AI Forge</li>
                    </ul>
                </div>
            </div>

            {/* FOOTER ROW */}
            <div className="hero-footer">
                <div className="contact">
                    <span>info@genlab.cc</span>
                    <span>+91 99945 35120</span>
                </div>

                <div className="socials">
                    <a
                        href="https://in.linkedin.com/company/genlabz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span><FaLinkedinIn /></span>
                    </a>

                    <a
                        href="https://www.instagram.com/genlab.cc/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span><FaInstagram /></span>
                    </a>

                    <a
                        href="https://wa.me/919994535120"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span><FaWhatsapp /></span>
                    </a>
                </div>
            </div>
        </section>

    // </section>
  );
}
