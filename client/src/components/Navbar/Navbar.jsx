import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-white.svg";
// import logo from '/logo-black.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isPeoplePage = location.pathname === "/people";
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["about", "verticals", "connect", "capabilities"]; //remove capabilities

    const handleScroll = () => {
      let current = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${isPeoplePage ? styles.peopleNavbar : ""}`}
    >
      <Link to="/" className={`${styles.navbarLogo} ${styles.glass}`}>
        <img src={logo} alt="GenLab logo" />
      </Link>

      <button
        className={styles.menuToggle}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul
        className={`${styles.navbarLinks} ${styles.glass} ${
          open ? styles.active : ""
        }`}
      >
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? styles.activeLink : ""}
          >
            About
          </a>
        </li>

        <li>
          <a
            href="#verticals"
            className={activeSection === "verticals" ? styles.activeLink : ""}
          >
            Verticals
          </a>
        </li>

        {/* <li>
          <Link
            to="/people"
            className={location.pathname === "/people" ? styles.activeLink : ""}
          >
            People
          </Link>
        </li> */}

        <li>
          <a
            href="#capabilities"
            className={activeSection === "capabilities" ? styles.activeLink : ""}
          >
            People
          </a>
        </li>

        <li>
          <a
            href="#connect"
            className={activeSection === "connect" ? styles.activeLink : ""}
          >
            Careers
          </a>
        </li>
        <li className={styles.navbarCta}><a href="#connect">Contact us</a></li>
      </ul>
    </nav>
  );
}
