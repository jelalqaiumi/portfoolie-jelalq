import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Section from './components/Section.jsx';
import Footer from './components/Footer.jsx';
import { sections, SKILLS_ID, PROJECTS_ID, MAIN_ID } from './data/sections.js';

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

        {/* Kvar som tom platshållare med rubrik, byggd ur sections.js. Byts ut
            i paket 6: contact -> <Contact />.

            Inget HERO_ID-filter: hero ligger inte längre i sections
            (ARKITEKTUR.md, "Hero-posten tas bort ur sections"), och
            scripts/validate-data.mjs fäller körningen om id:t smyger tillbaka.
            SKILLS_ID och PROJECTS_ID undantas bara därför att <Skills /> och
            <Projects /> ovan äger sina egna <Section>, inte som ett urval ur
            listan.

            Poster utan id hoppas över - en sektion utan id går inte att länka
            till. Saknad eller blank "label" fångas av <Section> själv. */}
        {sections
          .filter((section) => section.id && section.id !== SKILLS_ID && section.id !== PROJECTS_ID)
          .map((section) => (
            <Section key={section.id} id={section.id} title={section.label} />
          ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
