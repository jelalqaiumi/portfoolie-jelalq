import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>© {currentYear} Jelal Qaiumi</p>
      </div>
    </footer>
  );
}

export default Footer;
