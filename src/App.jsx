import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { MAIN_ID } from './data/sections.js';

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

        {/* Skills äger sin egen <Section> och hämtar både id och rubrik ur
            sections.js. Den ligger därför utanför mappningen nedan, precis som
            Hero - jämför ARKITEKTUR.md:s komponenttabell, där <App> renderar
            <Hero />, <Skills />, <Projects /> och <Contact /> var för sig. */}
        <Skills />

        {/* Projects äger sin egen <Section> och hämtar id och rubrik ur
            sections.js, precis som Skills. Den ligger HÄR, mellan <Skills />
            och mappningen, så att sektionerna förblir DIREKTA syskon i <main>
            i datans ordning: hero, skills, projects, contact.

            Att ordningen är direkt syskonskap är inte kosmetik:
            sektionsavgränsarna i global.css är `section[id] + section[id]`.
            Hamnar något främmande mellan två sektioner bryts kedjan och
            linjerna försvinner UTAN felmeddelande. Räkna om de tre linjerna
            efter varje ändring i denna fil. */}
        <Projects />

        {/* Contact äger sin egen <Section> och hämtar id och rubrik ur
            sections.js, precis som Skills och Projects.

            MAPPNINGEN ÖVER sections ÄR BORTA. Varje sektion i listan har nu en
            egen komponent, så filtret hade undantagit samtliga poster och
            renderat ingenting - alltså dött fält. Sektionernas ORDNING ligger
            kvar i sections.js, som fortfarande är enda källan för id och
            navrubriker; det är ordningen HÄR som måste följa den.

            Att de fyra ligger som direkta syskon är inte kosmetik:
            sektionsavgränsarna i global.css är `section[id] + section[id]`.
            Hamnar något främmande mellan två sektioner bryts kedjan och
            linjerna försvinner UTAN felmeddelande. Räkna om de tre linjerna
            efter varje ändring i denna fil. */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
