import { HERO_ID, PROJECTS_ID, CONTACT_ID } from '../data/sections.js';
import { profile, HERO_IMAGE_WIDTHS } from '../data/profile.js';
import styles from './Hero.module.css';
import typeStyles from '../styles/type.module.css';

/* Raden ovanför rubriken. Står med gemener i DOM - versalerna kommer från
 * .eyebrow i CSS, så att en skärmläsare läser ett ord och inte bokstäver. */
const eyebrowText = 'Portfolio';

/* Sidans enda <h1>. Skrivs HÄR och får aldrig läsas ur sections.js "label".
 *
 * Texten är godkänd ordagrant av Jelal 2026-11-18 och är Jelals att ändra.
 * Beslutat i ARKITEKTUR.md: M10. */
const headline = 'Jag bygger webbappar och mobilappar, från gränssnitt till API.';

/* Ingressen är Jelals egna ord och bara hans att ändra.
 *
 * EN sträng, aldrig konkatenerad: en konkatenering är det enklaste sättet att
 * tappa ett mellanslag mitt i en text som ska vara exakt. */
const intro =
  'Jag bygger webbappar och mobilappar i React, React Native och .NET, hela vägen från databas till app.';

/* Knapptexterna är också Jelals egna ord. De står som konstanter här, intill de
 * andra texterna, så att varje sträng han äger går att jämföra mot
 * uppdragsfilen utan att någon behöver läsa JSX. */
const primaryActionText = 'Se mina projekt';
const secondaryActionText = 'Kontakta mig';

/* sizes beskriver bildens RITADE bredd, inte lådans: object-fit: cover ritar
 * bilden bredare än lådan när lådan är smalare än bildens format, och då ska
 * webbläsaren välja fil efter den bredd som faktiskt ritas. Skälet står i
 * ARKITEKTUR.md, M10c och M10d.
 *
 * Samma sträng och samma srcset står i preloaden i index.html. Ändras det ena
 * ändras det andra, i samma redigering - annars hämtas bilden två gånger.
 * Bygget stannar om imagesrcset eller href inte stämmer med HERO_IMAGE_WIDTHS i
 * src/data/profile.js. imagesizes kontrolleras inte. */
const HERO_IMAGE_SIZES = '(min-width: 900px) 100vw, 178vw';
const heroImageSrc = (width) => `/assets/hero/hero-${width}.webp`;

function Hero() {
  return (
    /* Hero renderar sin EGEN <section> och använder inte <Section>: den har ett
     * <h1> och ingen <h2>-rubrik. Sidomarginalen kommer från den gemensamma
     * regeln i global.css - modulen äger bara centreringen i .inner. */
    <section id={HERO_ID} className={styles.hero}>
      {/* Porträttet är heros profilbild. Gråskalan är inbakad i filerna av
          bildskriptet, så ingen CSS-filter behövs här.

          Sektionens FÖRSTA barn, så att läsordningen är densamma som den
          visuella på mobil: porträttet först och rubriken under. alt är
          informativ: bilden visar vem sidan handlar om.

          loading="eager": bilden är det största elementet i första skärmen och
          ska hämtas direkt. width och height är källans format, så att ingen
          layoutförskjutning uppstår. Beslutat i ARKITEKTUR.md, M10c och M10d. */}
      <img
        className={styles.backdrop}
        src={heroImageSrc(HERO_IMAGE_WIDTHS[1])}
        srcSet={HERO_IMAGE_WIDTHS.map((w) => `${heroImageSrc(w)} ${w}w`).join(', ')}
        sizes={HERO_IMAGE_SIZES}
        width="1672"
        height="941"
        alt="Porträtt av Jelal Qaiumi"
        loading="eager"
        fetchPriority="high"
      />
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
      </div>
    </section>
  );
}

export default Hero;
