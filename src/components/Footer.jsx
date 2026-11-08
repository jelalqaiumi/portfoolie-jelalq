import { contact } from '../data/contact.js';
import { profile } from '../data/profile.js';
import styles from './Footer.module.css';
import typeStyles from '../styles/type.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* Året räknas ut, det skrivs aldrig in. */
const currentYear = new Date().getFullYear();

/* EN LÄNK VARS ADRESS SAKNAS RENDERAS INTE. url === null betyder "den här
 * finns inte", och då försvinner posten helt - ingen tom länk och inget
 * href="#". Samma filter som kontaktsektionen. Beslutat i ARKITEKTUR.md, M16. */
const links = contact.links.filter((link) => hasText(link.url) && hasText(link.label));

/* Footern är inget navmål och får inget id, och den är ingen .reveal - den
 * ska synas utan att vänta på en observer. Beslutat i ARKITEKTUR.md, M12 och
 * M16. */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {/* Samma logga som headern. Den är dekor här: namnet står i
                copyrightraden. width/height är 1x-filens mått, så att ingen
                layout shift uppstår. CSS sätter höjden. Beslutat i
                ARKITEKTUR.md: M20. */}
            <img
              className={styles.logo}
              src="/assets/jq-logo-34.png"
              srcSet="/assets/jq-logo-34.png 1x, /assets/jq-logo-68.png 2x, /assets/jq-logo-102.png 3x"
              alt=""
              aria-hidden="true"
              width="159"
              height="34"
            />
            {/* Taglinen är rollraden ur profile.js, Jelals egen godkända text.
                Ingen ny text hittas på. Beslutat i ARKITEKTUR.md, M16. */}
            {hasText(profile.role) && <p className={styles.tagline}>{profile.role}</p>}
          </div>

          <div className={styles.column}>
            {/* Beslutat i ARKITEKTUR.md: M19 punkt 1 */}
            <p className={`${typeStyles.meta} ${styles.columnLabel}`}>Kontakt</p>
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.label}>
                  <a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="visually-hidden"> (öppnas i ny flik)</span>
                  </a>
                </li>
              ))}
              {hasText(contact.email) && (
                <li>
                  <a className={styles.link} href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className={styles.copyright}>
          © {currentYear} {profile.name}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
