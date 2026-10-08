import Section from './Section.jsx';
import { isComplete } from './ProjectCard.jsx';
import { about } from '../data/about.js';
import { projects } from '../data/projects.js';
import { sections, ABOUT_ID } from '../data/sections.js';
import styles from './About.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs och i de andra sektionskomponenterna. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* Delar ett stycke på frasen, men BARA när frasen förekommer exakt en gång.
 * Noll förekomster ger ingen länk att sätta, och två gör valet mellan dem till
 * en gissning - i båda fallen lämnas stycket oförändrat och texten är
 * teckenidentisk med datan. Valideringen fäller båda lägena före ett bygge;
 * detta är skyddet i utvecklingsläget, där ingen validering körts. */
function splitOnce(paragraph, phrase) {
  const first = paragraph.indexOf(phrase);

  if (first < 0 || first !== paragraph.lastIndexOf(phrase)) {
    return null;
  }

  return {
    before: paragraph.slice(0, first),
    after: paragraph.slice(first + phrase.length),
  };
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

  /* LÄNKEN TÄNDS AV SIG SJÄLV, och bara när målet finns.
   *
   * Invarianten är densamma som för logga-länken i headern: ingenting som
   * pekar på ett id får renderas utan att det id:t finns i den markup som
   * renderas (LARDOMAR.md 2026-10-02). Målet är ett projektkort, och ett kort
   * renderas bara för en post som isComplete släpper igenom - därför frågas
   * samma predikat som Projects.jsx filtrerar med, inte om posten existerar.
   *
   * Finns ingen sådan post renderas frasen som vanlig text, utan href. Texten
   * är teckenidentisk i båda lägena: samma sträng ur samma stycke, bara med
   * eller utan ett <a> runt en del av den. */
  const target = about?.link;
  const linked = target != null && projects.some(
    (project) => isComplete(project) && project.id === target.projectId,
  );

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
      {paragraphs.map((paragraph) => {
        const parts = linked ? splitOnce(paragraph, target.phrase) : null;

        return (
          <p className={styles.paragraph} key={paragraph}>
            {parts === null ? (
              paragraph
            ) : (
              <>
                {parts.before}
                {/* Frasen står INTE i den här filen. Både texten som visas och
                    id:t som länkas hämtas ur datan, så ett omskrivet stycke kan
                    aldrig tappa länken tyst. */}
                <a className={styles.link} href={`#${target.projectId}`}>
                  {target.phrase}
                </a>
                {parts.after}
              </>
            )}
          </p>
        );
      })}
    </Section>
  );
}

export default About;
