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
            {/* Samma tajta märke som headern. Det är dekor: namnet står i
                copyrightraden, så ikonen har alt="" + aria-hidden.
                width/height är filens egna mått, så att ingen layout shift
                uppstår. CSS sätter höjden. */}
            <img
              className={styles.logo}
              src="/assets/logo-mark-tight-96.png"
              srcSet="/assets/logo-mark-tight-96.png 96w, /assets/logo-mark-tight-192.png 192w"
              /* sizes = ikonens CSS-bredd, samma som i headern. */
              sizes="48px"
              alt=""
              aria-hidden="true"
              width="96"
              height="72"
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
