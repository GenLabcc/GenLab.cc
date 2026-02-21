import { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '@/assets/white.png';

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
        <li>About</li>
        <li>Verticals</li>
        <li>People</li>
        <li>Careers</li>
        <li className={styles.navbarCta}>Contact us</li>
      </ul>
    </nav>
  );
}
