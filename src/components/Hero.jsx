import { HERO_ID, PROJECTS_ID, CONTACT_ID } from '../data/sections.js';
import { profile } from '../data/profile.js';
import styles from './Hero.module.css';
import typeStyles from '../styles/type.module.css';

/* Raden ovanför rubriken. Står med gemener i DOM - versalerna kommer från
 * .eyebrow i CSS, så att en skärmläsare läser ett ord och inte bokstäver. */
const eyebrowText = 'Portfolio';

/* Sidans enda <h1>. Skrivs HÄR och får aldrig läsas ur sections.js "label".
 *
 * ⚠️ FÖRSLAG - VÄNTAR PÅ JELALS GODKÄNNANDE. Texten är uppdragets exempeltext
 * ("t.ex.") och inte Jelals egna ord. Ingen agent ändrar den utan hans svar;
 * när han svarat byts strängen och denna rad tas bort. */
const headline = 'Jag bygger webb- och mobilappar, från gränssnitt till API.';

/* Ingressen är Jelals egna ord och bara hans att ändra.
 *
 * EN sträng, aldrig konkatenerad: en konkatenering är det enklaste sättet att
 * tappa ett mellanslag mitt i en text som ska vara exakt. */
const intro =
  'Jag bygger webb- och mobilappar i React, React Native och .NET, hela vägen från databas till app.';

/* Knapptexterna är också Jelals egna ord. De står som konstanter här, intill de
 * andra texterna, så att varje sträng han äger går att jämföra mot
 * uppdragsfilen utan att någon behöver läsa JSX. */
const primaryActionText = 'Se mina projekt';
const secondaryActionText = 'Kontakta mig';

/* sizes är cirkelns tak i varje läge: cirkelns renderade bredd når aldrig över
 * taket, så ett större sizes-värde hade bara hämtat en större fil än som visas.
 * Beslutat i ARKITEKTUR.md, "M10 - Hero".
 *
 * Samma sträng till <source> och <img>: olika sizes på de två hade kunnat få
 * dem att välja olika bredder. */
const IMAGE_SIZES = '(min-width: 900px) 420px, 360px';

function Hero() {
  return (
    /* Hero renderar sin EGEN <section> och använder inte <Section>: den har ett
     * <h1> och ingen <h2>-rubrik. Sidomarginalen kommer från den gemensamma
     * regeln i global.css - modulen äger bara centreringen i .inner. */
    <section id={HERO_ID} className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={typeStyles.eyebrow}>{eyebrowText}</p>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={typeStyles.meta}>{profile.role}</p>
          <p className={styles.intro}>{intro}</p>

          {/* TVÅ <a>, INTE <button>. Knapparna navigerar till en sektion på
              samma sida, och det är en länk; en <button> hade krävt JS för att
              göra något. Den mjuka scrollningen kommer från scroll-behavior i
              global.css, som redan har sitt undantag för
              prefers-reduced-motion - ingen scrollhanterare, ingen ny JS.

              Målen hämtas ur de namngivna konstanterna i sections.js. Ett
              sektions-id får aldrig skrivas av som bokstavlig sträng i en
              .jsx-fil - då kan länken peka på en sektion som inte finns.

              Avståndet upp till ingressen kommer ur .text-gridens gap och
              sätts inte här. */}
          <div className={styles.actions}>
            <a className={styles.actionPrimary} href={`#${PROJECTS_ID}`}>
              {primaryActionText}
            </a>
            <a className={styles.actionSecondary} href={`#${CONTACT_ID}`}>
              {secondaryActionText}
            </a>
          </div>
        </div>

        {/* Gråskalan och den grå tonplattan ligger i CSS, inte i bildfilen,
            så att tonen kan justeras utan att bilderna genereras om.
            Tonplattan är .media::after i modulen.

            <picture> med en WebP-source och JPEG som fallback: webbläsaren
            laddar exakt EN fil. width/height är den valda src-filens egna mått
            så att ingen layout shift uppstår.

            Ingen loading="lazy": porträttet ligger i första skärmen från
            brytpunkten, och en lat bild där fördröjer det största elementet. */}
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
              /* Beskrivande alt, eftersom bilden bär information: den visar vem
               * sidan handlar om. Beslutat i ARKITEKTUR.md, "M10 - Hero". */
              alt="Porträtt av Jelal Qaiumi"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

export default Hero;
