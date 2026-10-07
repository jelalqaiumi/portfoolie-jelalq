import { HERO_ID } from '../data/sections.js';
import styles from './Hero.module.css';

/* Sidans enda <h1>. Skrivs HÄR och får aldrig läsas ur sections.js "label"
 * (ARKITEKTUR.md, rättelse 2). Namnet kommer ur BRIEF.md. */
const name = 'Jelal Qaiumi';

/* Titeln ur BRIEF.md: "En personlig portfolio-webbplats för Jelal Qaiumi
 * (systemutvecklare)". */
const role = 'Fullstackutvecklare';

/* ===== UTKAST - TEXT SOM JELAL SKA GODKÄNNA ELLER ERSÄTTA =================
 *
 * PLAN.md listar introtexten som ÖPPEN vid Leverans 1 och ARKITEKTUR.md
 * ("Öppna punkter som INTE är arkitektens att besluta") säger att den
 * formuleras i paket 3 och godkänns av Jelal. Jelal har inte skrivit någon
 * text, så detta är byggarens utkast, härlett ur BRIEF.md (systemutvecklare,
 * React/Vite-stacken) och skills.txt (Fullstack-utveckling, C#, .NET,
 * ASP.NET Core, REST API, React, React Native).
 *
 * Medvetet INTE med: superlativ, och varje påstående om antal år eller
 * omfattning av erfarenhet - det finns inget underlag för sådana i materialet.
 *
 * Byt ut strängen nedan. Ingen annan fil behöver röras.
 * ========================================================================= */
const introDraft =
  'Jag bygger webb- och mobilapplikationer, från gränssnitt till API. ' +
  'På serversidan arbetar jag med C# och .NET, i klienten med React och React Native.';

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
          <p className={styles.intro}>{introDraft}</p>
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
