import Section from './Section.jsx';
import { about } from '../data/about.js';
import { sections, ABOUT_ID } from '../data/sections.js';
import styles from './About.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs och i de andra sektionskomponenterna. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function About() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda - precis som i Projects, Skills och Contact. Ingen text om Jelal står
   * i den här filen; den bor i src/data/about.js, där han letar efter den. */
  const section = sections.find((s) => s.id === ABOUT_ID);

  /* TOMMA STYCKEN RENDERAS ALDRIG. Ett <p></p> ger ett tomt radavstånd som ser
   * ut som ett layoutfel, och en post som bara innehåller blanksteg är lika tom
   * som en som saknas. Valideringen fäller båda före bygget; filtret är
   * skyddet för utvecklingsläget, där ingen validering körts. */
  const paragraphs = Array.isArray(about?.paragraphs)
    ? about.paragraphs.filter(hasText)
    : [];

  return (
    <Section id={section?.id} title={section?.label}>
      {/* Ett <p> per post, inget omslag. Beslutat i ARKITEKTUR.md,
          "src/data/about.js - Om mig".

          Nyckeln är styckets egen text. Det finns inget id att använda, och
          index som nyckel är projektets enda ställe där det hade varit
          frestande - men texten är stabil, unik i praktiken och ändrar sig
          bara när Jelal skriver om stycket, vilket är precis när React ska
          montera om det. Skriver han två identiska stycken varnar React i
          utvecklingsläge; det är en synlig påminnelse, inte ett fel på sidan. */}
      {paragraphs.map((paragraph) => (
        <p className={styles.paragraph} key={paragraph}>
          {paragraph}
        </p>
      ))}
    </Section>
  );
}

export default About;
