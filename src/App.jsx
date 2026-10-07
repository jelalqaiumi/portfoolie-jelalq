import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import {
  sections,
  MAIN_ID,
  PROJECTS_ID,
  SKILLS_ID,
  ABOUT_ID,
  CONTACT_ID,
} from './data/sections.js';

/* ===== UPPSLAGET: ett sektions-id till en komponent ======================
 * SIDANS ORDNING BOR INTE HÄR. Den bor i sections.js, och denna tabell säger
 * bara vilken komponent ett id motsvarar. Att byta ordning på sektionerna är
 * därför EN redigering, i sections.js - inte två.
 *
 * Varför det är viktigt: tidigare renderade denna fil namngivna komponenter i
 * en egen fast ordning, medan sections.js lovade att listans ordning var
 * sidans. Ordningen bodde på två ställen, och en omordning på bara det ena
 * hade gett ett nav och ett innehåll som säger olika saker - tyst, utan
 * felmeddelande. Det var precis det fallet som uppstod när projekten skulle
 * flyttas före kompetenserna. Beslutat i ARKITEKTUR.md, "sections.js blir åter
 * enda källan för sidans ordning".
 *
 * TABELLEN ÄR KONFIGURATION, INTE LOGIK. Arkitektens regel att App.jsx inte
 * har egen logik gäller fortfarande: här finns inga villkor och inga
 * beräkningar, bara en koppling från id till komponent. Nycklarna är
 * konstanterna ur sections.js, aldrig bokstavliga strängar - ett sektions-id
 * får inte skrivas av i en .jsx-fil.
 *
 * ATT LÄGGA TILL EN SEKTION kräver fortfarande två redigeringar: posten i
 * sections.js och raden här. Det är accepterat och sällsynt. Glöms raden här
 * renderas sektionen inte, och det fångas av verifieringspunkten nedan.
 * ======================================================================== */
const SECTION_COMPONENTS = {
  [PROJECTS_ID]: Projects,
  [SKILLS_ID]: Skills,
  [ABOUT_ID]: About,
  [CONTACT_ID]: Contact,
};

function App() {
  return (
    <>
      {/* SKIP-LÄNKEN är sidans FÖRSTA fokuserbara element och måste förbli det.
          Lägg aldrig något fokuserbart före den - då tappar den sin uppgift,
          att låta en tangentbordsanvändare hoppa över headern utan att tabba
          genom den.

          Dold med .visually-hidden, synlig vid :focus (global.css). Målet
          hämtas ur MAIN_ID, inte som bokstavlig sträng: regeln att inget
          sektions-id får skrivas av i en .jsx-fil gäller även detta ankare, och
          MAIN_ID exporteras ur sections.js just för det.

          Beslutat i ARKITEKTUR.md, "Skip-länk och aria-current". */}
      <a className="visually-hidden" href={`#${MAIN_ID}`}>
        Hoppa till innehållet
      </a>

      <Header />
      {/* tabIndex={-1} är det som FAKTISKT får skip-länken att fungera, och
          det är uppmätt: utan den flyttade aktiveringen bara rullningen, medan
          document.activeElement förblev <body>. Nästa Tab gick då tillbaka in i
          headern - alltså precis det länken finns för att slippa.
          -1 håller <main> utanför tabordningen men gör den mottaglig för
          fokus via ankaret. Ingen synlig ring uppstår: :focus-visible matchar
          inte programmatiskt fokus från en fragmentnavigering. */}
      <main id={MAIN_ID} tabIndex={-1}>
        {/* Hero renderas ALLTID och ligger därför utanför mappningen. Det
            garanterar att sidan alltid har exakt ett <h1> och att
            logga-länkens ankare alltid har ett mål - även om hero-posten
            skulle saknas i sections.js. Hero äger sin egen <section id> och
            sitt eget <h1>. */}
        <Hero />

        {/* SEKTIONERNA I DATANS ORDNING. Varje komponent äger sin egen
            <Section> och hämtar både id och rubrik ur sections.js.

            Poster vars id saknas i uppslaget hoppas över i stället för att
            krascha. En okänd komponent går inte att rendera, och ett vitt kort
            är ett sämre felläge än en saknad sektion - men tyst ska det inte
            vara: verifieringspunkten "den renderade sidan ska innehålla exakt
            de sektioner som står i sections.js, i samma ordning" mäter utdata
            och fångar både en post utan komponent och en komponent i fel
            ordning. En statisk grind i validate-data.mjs valdes bort: den hade
            behövt läsa denna fil som text och gissa sig till tabellens
            innehåll.

            ATT SEKTIONERNA BLIR DIREKTA SYSKON i <main> är inte kosmetik.
            Sektionsavgränsarna i global.css är `section[id] + section[id]`.
            Hamnar något främmande mellan två sektioner bryts kedjan och
            linjerna försvinner UTAN felmeddelande. Mappningen renderar varje
            sektion utan omslag just därför - lägg aldrig in en <div> eller ett
            <Fragment> med markup runt posterna här. Räkna om linjerna efter
            varje ändring i denna fil. */}
        {sections.map((section) => {
          const SectionComponent = SECTION_COMPONENTS[section.id];
          return SectionComponent ? <SectionComponent key={section.id} /> : null;
        })}
      </main>
      <Footer />
    </>
  );
}

export default App;
