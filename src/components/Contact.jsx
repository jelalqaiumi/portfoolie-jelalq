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
      {/* h2 "Kontakt" kommer från <Section> och ligger UTANFÖR rutnätet - den
          namnger sektionen, inte en spalt. */}
      <div className={styles.grid}>
        {/* ⚠️ ORDNINGEN I DOM ÄR AVSIKTLIG OCH FÅR INTE KASTAS OM.
            Formuläret står FÖRST, länkarna EFTER, därför att det är den
            visuella ordningen från 900 px - formuläret till vänster.

            Att i stället låta länkarna ligga först i koden och flytta dem
            visuellt med grid-placering är uttryckligen avfärdat: då hade
            tangentbordsordningen blivit olik den visuella på bred skärm, och
            att de två stämmer överens är en mätt verifieringspunkt sedan
            paket 7.

            FÖLJDEN under 900 px: spalterna staplas, och länkarna hamnar UNDER
            formuläret - fem fält och en captcha bort. Det är accepterat och
            ingen kompensation ska byggas: att upprepa e-posten på två ställen
            vore två ställen att underhålla och adressen uppläst två gånger för
            en skärmläsare.

            Beslutat i ARKITEKTUR.md, "Kontaktsektionen blir tvåspaltig". */}
        <div className={styles.formColumn}>
          <ContactForm />
        </div>

        {/* Länkspalten har AVSIKTLIGT ingen egen klass. Diven behövs som
            rutnätets andra barn, men all luft inuti den bärs av .linkHeading,
            .email och .links - spalten själv har inget att sätta. Här stod
            className={styles.linkColumn} fram till 2026-10-07; eftersom
            .linkColumn aldrig fanns i modulen blev uttrycket undefined, och
            React utelämnar då attributet helt. Uppmätt: class=null i DOM,
            ingen stil förlorad - men referensen var en lögn, och nästa läsare
            hade trott att spalten var stylad. Samma tysta fälla som .logoName
            och .wrapper. Behöver spalten stil: lägg till regeln i
            Contact.module.css OCH klassen här, i samma ändring. */}
        <div>
          {/* ===== TEXT SOM JELAL SKA GODKÄNNA =====================
              Rubriken är arkitektens förslag, inte Jelals ord. Den behövs:
              utan den blir högerspalten ett namnlöst block som svävar bredvid
              formuläret, och den som hoppar mellan rubriker med skärmläsare får
              ingen väg dit. Byt strängen här, ingen annan fil berörs. */}
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
                  <a className={styles.link} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}

export default Contact;
