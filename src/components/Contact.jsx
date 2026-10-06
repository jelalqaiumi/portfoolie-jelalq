import Section from './Section.jsx';
import ContactForm from './ContactForm.jsx';
import { contact } from '../data/contact.js';
import { sections, CONTACT_ID } from '../data/sections.js';
import styles from './Contact.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function Contact() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda - precis som i Skills och Projects. */
  const section = sections.find((s) => s.id === CONTACT_ID);

  /* TOMMA LÄNKAR RENDERAS ALDRIG. url === null betyder "den här finns inte",
   * och då ska ingen grå ikon, inget "kommer snart" och inget href="#" stå
   * kvar. Filtret tar också bort en url som råkat bli tom sträng - en länk utan
   * mål är värre än ingen länk. */
  const links = contact.links.filter((link) => hasText(link.url) && hasText(link.label));

  return (
    <Section id={section?.id} title={section?.label}>
      {/* E-posten i KLARTEXT som mailto-länk. Ingen obfuskering, ingen
          entity-kodning, inget [at]: Jelals uttryckliga beslut, taget med full
          insikt om skräppost-risken. */}
      <p className={styles.email}>
        <a className={styles.link} href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </p>

      {/* Länkarna är en riktig lista: skärmläsaren annonserar antalet.
          Formuläret ERSÄTTER INTE länkarna - båda finns. */}
      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a className={styles.link} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <ContactForm />
    </Section>
  );
}

export default Contact;
