import styles from './Navbar.module.css';
import logo from '@/assets/white.png';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbarLogo} ${styles.glass}`}>
        <img src={logo} alt="GenLab logo" />
      </div>

      <ul className={`${styles.navbarLinks} ${styles.glass}`}>
        <li>About</li>
        <li>Verticals</li>
        <li>People</li>
        <li>Careers</li>
        <li className={styles.navbarCta}>Contact us</li>
      </ul>
    </nav>
  );
}
