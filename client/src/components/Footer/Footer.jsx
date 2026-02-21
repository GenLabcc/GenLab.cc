import styles from "./Footer.module.css";
import logo from "@/assets/logo.png";

import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1 - Logo */}
        <div className={styles.col}>
          <div className={styles.navbarLogo}>
            <img src={logo} alt="GenLab logo" />
          </div>
        </div>

        {/* Column 2 - Navigation */}
        <div className={styles.col}>
          <ul className={styles.links}>
            <li>About</li>
            <li>Verticals</li>
            <li>People</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 - Social */}
        <div className={styles.col}>
          <h4>Connect with us</h4>
          <div className={styles.socials}>
            <a href="#">
              <FaLinkedinIn />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Column 4 - Address */}
        <div className={styles.col}>
          <h4>Head Office</h4>
          <p>
            121/C, Chetti Kulam, Simon Nagar, Nagercoil,
            <br />
            Tamil Nadu 629001
          </p>
          <p className={styles.phone}>+91 99945 35120</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottom}>
        <span>Privacy Policy</span>
        <span>Terms and Conditions</span>
      </div>

      {/* Gradient Glow */}
      <div className={styles.glow}></div>
    </footer>
  );
}
