import { HERO_ID, PROJECTS_ID, CONTACT_ID } from '../data/sections.js';
import styles from './Hero.module.css';

/* Sidans enda <h1>. Skrivs HÄR och får aldrig läsas ur sections.js "label"
 * (ARKITEKTUR.md, rättelse 2). */
const name = 'Jelal Qaiumi';

/* Rollraden är Jelals egna ord och bara hans att ändra. Samma sträng står i
 * <title> i index.html - ändras den här ändras den där, i samma redigering. */
const role = 'Systemutvecklare · Fullstack';

/* Ingressen är Jelals egna ord och bara hans att ändra.
 *
 * EN sträng, aldrig konkatenerad: en konkatenering är det enklaste sättet att
 * tappa ett mellanslag mitt i en text som ska vara exakt. Beslutat i
 * ARKITEKTUR.md, "A5 - Hero: knapparna, mätserien och 360 px". */
const intro =
  'Jag bygger webb- och mobilappar i React, React Native och .NET, hela vägen från databas till app.';

/* Knapptexterna är också Jelals egna ord. De står som konstanter här, intill de
 * tre andra texterna, så att varje sträng han äger går att jämföra mot
 * uppdragsfilen utan att någon behöver läsa JSX. */
const primaryActionText = 'Se mina projekt';
const secondaryActionText = 'Kontakta mig';

/* EJ I ARKITEKTUR: vilket sizes-värde profilbilden ska ha.
 *
 * Varför det behövs alls: utan sizes antar webbläsaren 100vw och hämtar alltid
 * den största filen.
 *
 * Varför just dessa tal: cirkelns tak är 360 px under brytpunkten och 420 px
 * från 900 px (Hero.module.css .media). 400px täcker enspaltsläget med
 * marginal. Från 900 px är bildspåret (min(100vw, --content-max) - 2 x
 * sidmarginal - gap) / 2, vilket ligger mellan 43 och 47 vw mellan 900 och
 * 1600 px bredd; 45vw ligger mitt i det.
 *
 * Samma sträng till <source> och <img>: olika sizes på de två hade kunnat få
 * dem att välja olika bredder. */
const IMAGE_SIZES = '(min-width: 900px) 45vw, 400px';

function Hero() {
  return (
    /* Hero renderar sin EGEN <section> och använder inte <Section>: den har ett
     * <h1> och ingen <h2>-rubrik (ARKITEKTUR.md, komponenttabellen).
     * Sidomarginalen kommer från den gemensamma regeln i global.css - modulen
     * äger bara centreringen i .inner. */
    <section id={HERO_ID} className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1>{name}</h1>
          <p className={styles.role}>{role}</p>
          <p className={styles.intro}>{intro}</p>

          {/* TVÅ <a>, INTE <button>. Knapparna navigerar till en sektion på
              samma sida, och det är en länk; en <button> hade krävt JS för att
              göra något. Den mjuka scrollningen kommer från scroll-behavior i
              global.css, som redan har sitt undantag för
              prefers-reduced-motion - ingen scrollhanterare, ingen ny JS.

              Målen hämtas ur de namngivna konstanterna i sections.js. Ett
              sektions-id får aldrig skrivas av som bokstavlig sträng i en
              .jsx-fil - då kan länken peka på en sektion som inte finns.

              Ordningen primär före sekundär och båda knapparnas placering
              efter ingressen är beslutade i ARKITEKTUR.md, "A5 - Hero:
              knapparna, mätserien och 360 px". Avståndet upp till ingressen
              kommer ur .text-gridens gap och sätts inte här. */}
          <div className={styles.actions}>
            <a className={styles.actionPrimary} href={`#${PROJECTS_ID}`}>
              {primaryActionText}
            </a>
            <a className={styles.actionSecondary} href={`#${CONTACT_ID}`}>
              {secondaryActionText}
            </a>
          </div>
        </div>

        {/* Gråskalan och den grå tonplattan ligger i CSS, inte i bildfilen -
            medvetet beslut i ARKITEKTUR.md ("Vad som INTE görs i bildskriptet")
            så att tonen kan justeras efter Leverans 1 utan att bilderna
            genereras om. Tonplattan är .media::after i modulen.

            <picture> med en WebP-source och JPEG som fallback: webbläsaren
            laddar exakt EN fil. width/height är den valda src-filens egna mått
            (profile-800.jpg, 800 x 1000) så att ingen layout shift uppstår. */}
        <div className={styles.media}>
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/profile/profile-400.webp 400w, /assets/profile/profile-800.webp 800w, /assets/profile/profile-1200.webp 1200w"
              sizes={IMAGE_SIZES}
            />
            <img
              className={styles.image}
              src="/assets/profile/profile-800.jpg"
              srcSet="/assets/profile/profile-400.jpg 400w, /assets/profile/profile-800.jpg 800w, /assets/profile/profile-1200.jpg 1200w"
              sizes={IMAGE_SIZES}
              width="800"
              height="1000"
              /* EJ I ARKITEKTUR: vilken alt-text profilbilden ska ha, och om
               * den ska vara tom.
               *
               * Beskrivande alt vald eftersom bilden bär information - den
               * visar vem sidan handlar om. Tom alt hör till rent dekorativa
               * bilder, som headerns monogram. */
              alt="Porträtt av Jelal Qaiumi"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

export default Hero;
