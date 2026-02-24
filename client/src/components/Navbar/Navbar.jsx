import { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '@/assets/logo-white.svg';
// import logo from '/logo-black.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbarLogo} ${styles.glass}`}>
        <img src={logo} alt="GenLab logo" />
      </div>

      <button
        className={styles.menuToggle}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul
        className={`${styles.navbarLinks} ${styles.glass} ${
          open ? styles.active : ''
        }`}
      >
        <li><a href="#about">About</a></li>
        <li><a href="#verticals">Verticals</a></li>
        <li><a href="#capabilities">People</a></li>
        <li><a href="#connect">Careers</a></li>
        <li className={styles.navbarCta}><a href="#connect">Contact us</a></li>
      </ul>
    </nav>
  );
}
