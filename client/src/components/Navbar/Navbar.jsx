import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-white.svg";
// import logo from '/logo-black.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSectionClick = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  // Close on path (page) change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // CLose on #change
  useEffect(() => {
    setOpen(false);
  }, [location]);

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
        {/* button is used to navigate to # (in home) from other pages */}
        <li>
          <button
            onClick={() => {
              handleSectionClick("about");
              setOpen(false);
            }}
            className={activeSection === "about" ? styles.activeLink : ""}
          >
            About
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              handleSectionClick("verticals");
              setOpen(false);
            }}
            className={activeSection === "verticals" ? styles.activeLink : ""}
          >
            Verticals
          </button>
        </li>

        {/* <li>
          <Link
            to="/people"
            onClick={() => setOpen(false)}
            className={location.pathname === "/people" ? styles.activeLink : ""}
          >
            People
          </Link>
        </li> */}

        <li>
          <button
            onClick={() => {
              handleSectionClick("capabilities");
              setOpen(false);
            }}
            className={
              activeSection === "capabilities" ? styles.activeLink : ""
            }
          >
            People
          </button>
        </li>

        {/* Navigate to # of same page. So <a> is used. */}
        <li>
          <button
            onClick={() => {
              handleSectionClick("connect");
              setOpen(false);
            }}
            className={activeSection === "connect" ? styles.activeLink : ""}
          >
            Careers
          </button>
        </li>
        <li className={styles.navbarCta}>
          <button
            onClick={() => {
              handleSectionClick("connect");
              setOpen(false);
            }}
          >
            Contact us
          </button>
        </li>
      </ul>
    </nav>
  );
}
