import styles from "./Footer.module.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/logo.png";

import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();

  const handleSectionClick = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const sectionLink = (id, label) => (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        handleSectionClick(id);
      }}
    >
      {label}
    </a>
  );

  return (
    <div className={styles.outer}>
      <footer className={styles.footer}>
        <div className={styles.container}>
          {/* Column 1 - Logo */}
          <div className={styles.col}>
            <div className={styles.navbarLogo}>
              <img src={logo} alt="GenLab logo" />
            </div>
            <div className={styles.socials}>
              <a
                href="https://in.linkedin.com/company/genlabz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/genlab.cc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/919994535120"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className={styles.col}>
            <ul className={styles.links}>
              <li>{sectionLink("about", "About")}</li>
              <li>{sectionLink("verticals", "Verticals")}</li>
              {/* <li>
                <Link to="/people">People</Link>
              </li> */}
              <li>{sectionLink("capabilities", "People")}</li>
              <li>{sectionLink("connect", "Careers")}</li>
              <li>{sectionLink("connect", "Contact")}</li>
            </ul>
          </div>

          {/* Column 3 - Social */}
          <div className={styles.col}>
            <ul className={styles.links}>
              <li>{sectionLink("launchpad", "Launchpad")}</li>
              <li>{sectionLink("ai", "AI Forge")}</li>
              <li>{sectionLink("brand", "Brand Studio")}</li>
            </ul>
          </div>

          {/* Column 4 - Address */}
          <div className={styles.col}>
            {/* <h4>Head Office</h4> */}
            <p>
              121/C, Chetti Kulam, Simon Nagar, Nagercoil, Tamil Nadu 629001
            </p>
            <p className={styles.phone}>
              <a href="tel:+91999435120">+91 99945 35120</a>
            </p>
            <p className={styles.phone}>
              <a href="mailto:info@genlab.cc">info@genlab.cc</a>
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottom}>
          {/* <span>Privacy Policy</span>
        <span>Terms and Conditions</span> */}
          <span>© 2026, GenLab Pvt. Ltd. All rights reserved.</span>
        </div>

        {/* Gradient Glow */}
        <div className={styles.glow}></div>
      </footer>
    </div>
  );
}
