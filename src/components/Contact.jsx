import Section from './Section.jsx';
import ContactForm from './ContactForm.jsx';
import Reveal from './Reveal.jsx';
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
      {/* h2 "Kontakt" kommer från <Section> och ligger UTANFÖR rutnätet - den
          namnger sektionen, inte en spalt. */}
      <div className={styles.grid}>
        {/* ORDNINGEN I DOM ÄR DEN VISUELLA ORDNINGEN OCH FÅR INTE KASTAS OM.
            Kontaktuppgifterna står FÖRST, formuläret EFTER: uppgifterna till
            vänster i tvåspaltigt läge och överst när spalterna staplas.

            Ordningen bärs av DOM, aldrig av grid-placering. Flyttas en spalt
            visuellt med CSS blir tangentbordsordningen olik den visuella.

            Beslutat i ARKITEKTUR.md, M16. */}
        {/* De två spalterna tonar in i ordning, steg 0 och 1 (ARKITEKTUR.md,
            M12). */}

        {/* Uppgiftsspalten har AVSIKTLIGT ingen egen klass. All luft inuti den
            bärs av .linkHeading, .email och .links, och spalten själv har
            inget att sätta. Behöver spalten stil: lägg till regeln i
            Contact.module.css OCH klassen här, i samma ändring - en klass som
            saknas i modulen blir undefined, och React utelämnar då attributet
            utan att något larmar. */}
        <Reveal index={0}>
          {/* Texten är godkänd ordagrant av Jelal 2026-11-18. Beslutat i
              ARKITEKTUR.md: M16. Rubriken behövs: utan den blir spalten ett
              namnlöst block bredvid formuläret, och den som hoppar mellan
              rubriker med skärmläsare får ingen väg dit. Byt strängen här,
              ingen annan fil berörs. */}
          <h3 className={styles.linkHeading}>Kontaktuppgifter</h3>

          {/* E-posten i KLARTEXT som mailto-länk. Ingen obfuskering, ingen
              entity-kodning, inget [at]: Jelals uttryckliga beslut, taget med
              full insikt om skräppost-risken. */}
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
                  <a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="visually-hidden"> (öppnas i ny flik)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Formuläret i sin panel. Panelen är rutnätets andra barn och bär
            därför också min-width: 0 (ARKITEKTUR.md, M16). */}
        <Reveal className={styles.formPanel} index={1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export default Contact;
