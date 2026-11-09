# Portfolio för Jelal Qaiumi

En portfolio på en enda sida: header med svävande navigering och mobilmeny,
hero med svartvitt porträtt, projekt med filter, kompetenser, Om mig med
nyckeltal, kontakt med formulär och footer. Hela gränssnittet är på svenska.
Kod, filnamn och variabelnamn är på engelska.

Allt innehåll som ska gå att ändra ligger i datafilerna under `src/data/`.
Hur Jelal ändrar innehållet står i **[GUIDE.md](GUIDE.md)**.

## Stack

- **React och Vite**, JavaScript. Versionerna står i `package.json`.
- **CSS Modules** (en `.module.css` per komponent) och designtokens som
  CSS variabler i `src/styles/tokens.css`. Textstilarna som delas mellan
  komponenter ligger i `src/styles/type.module.css`.
- **Självhostade typsnitt:** Urbanist, Manrope och JetBrains Mono som woff2 i
  `src/styles/fonts/`, deklarerade i `src/styles/fonts.css`. Sidan gör inga
  anrop till Google Fonts. Vilken familj som används till vad står i
  `tokens.css` och i `ARKITEKTUR.md`, M1.
- **Förrendering vid bygget.** `npm run build` renderar `<App />` till HTML
  med `react-dom/server` och lägger in den i `dist/index.html`. Sidan syns
  därför innan JavaScript har körts, och `src/main.jsx` hydrerar den. I `dev`
  renderas sidan i webbläsaren som vanligt.
- **Kontaktformuläret** skickar via Web3Forms med hCaptcha
  (`@hcaptcha/react-hcaptcha`). Captchan laddas först när formuläret närmar sig
  skärmen eller får fokus.
- **Utvecklingsverktyg:** `sharp` för bildskripten och `oxlint` för lint.

Runtime beroenden är bara de tre som står under `dependencies` i
`package.json`. Ingen router, inget UI ramverk, inget animationsbibliotek och
inga ikonpaket.

## Kom igång

**Krav:** Node i en version som Vite stöder (Node 20.19 eller nyare, eller
22.12 eller nyare) och npm. Git behövs för att klona.

```sh
git clone https://github.com/jelalqaiumi/portfoolie-jelalq.git
cd portfoolie-jelalq
npm install
npm run dev
```

Vite skriver ut adressen i terminalen, normalt `http://localhost:5173`.

Du behöver inte generera några bilder först. De genererade bilderna i
`public/assets/` är incheckade i git och följer med vid kloning. Bara `dist/`
och `node_modules/` är ignorerade.

Så bygger du och tittar på det byggda resultatet:

```sh
npm run build
npm run preview
```

## Skripten

Alla skript som finns i `package.json`:

| Kommando | Vad det gör |
|---|---|
| `npm run dev` | Startar utvecklingsservern med omladdning. **Kör inga kontroller av datafilerna.** |
| `npm run build` | Kör fyra steg i tur och ordning, och stannar vid första steg som misslyckas: datavalideringen (`validate-data.mjs`), tokengrinden (`validate-tokens.mjs`), `vite build` och förrenderingen (`prerender.mjs`). Resultatet hamnar i `dist/`. |
| `npm run preview` | Visar den byggda `dist/` lokalt. Kör `npm run build` först. |
| `npm run lint` | Kör `oxlint` med inställningarna i `.oxlintrc.json`. |
| `npm run optimize:images` | Läser `assets-source/hero-portrait.jpg` och `assets-source/jq-logo-light.png` och skriver heros svartvita bilder till `public/assets/hero/` samt loggan och ikonerna till `public/assets/`. Körs bara när en källbild byts. Ingår inte i `build`. |
| `npm run optimize:projects` | Läser varje PNG i `assets-source/projects/` och skriver bildvarianter i webp till `public/assets/projects/`. Bredderna kommer ur `PROJECT_IMAGE_WIDTHS` i `src/data/projects.js`. Ingår inte i `build`. |
| `npm run validate:data` | Kör bara datavalideringen. Snabbaste sättet att kontrollera en ändring i `src/data/`. |
| `npm run validate:tokens` | Kör bara tokengrinden. |

Att valideringen sitter i `build` men inte i `dev` är avsiktligt. En ändring
ska synas direkt i webbläsaren, men ett fel ska aldrig nå ett bygge.

### Vad grindarna kontrollerar

- **`scripts/validate-data.mjs`** kontrollerar varje fil i `src/data/`:
  obligatoriska fält, tillåtna värden, dubbletter, att en projektbild är
  genererad, att länkar är `null` eller en riktig adress, att inget id ur
  datan krockar med ett id som sidan själv sätter, att varje tecken i datan
  finns i det typsnitt det visas i (filens egen teckentabell läses, med hjälp
  av `scripts/font-coverage.mjs`), och att heros preload i `index.html`
  stämmer med `HERO_IMAGE_WIDTHS` i `src/data/profile.js`. Alla fel skrivs ut
  på en gång, på svenska, med filnamnet först. När allt går igenom skrivs en
  rad som börjar med `Validering OK`.
- **`scripts/validate-tokens.mjs`** gör tre kontroller mot
  `src/styles/tokens.css`. Bara blocket `:root` räknas som deklarerat. En
  variabel som bara står i ett annat block i filen räknas inte som deklarerad.
  1. Varje CSS variabel som nämns i `src/` eller `scripts/` ska vara deklarerad
     i `:root`. Kommentarer räknas som förekomster, utom kommentarerna i
     `tokens.css`. `src/data/` genomsöks inte.
  2. Varje variabel i `:root` ska användas med `var()` någonstans i `src/`.
     En kommentar räknas inte som användning.
  3. Varje variabel som får ett nytt värde utanför `:root`, i blocket för de
     ljusa sektionerna, ska också finnas i `:root`. Ett felstavat namn där
     fäller alltså bygget i stället för att tyst inte binda om något.
- **`scripts/prerender.mjs`** kontrollerar den förrenderade sidan: exakt en
  `<h1>`, exakt en hero, att varje klassnamn finns i det byggda CSS och att
  captchan inte är förrenderad. Felraderna börjar med `prerender:`. Fallerar
  något lämnas `dist/index.html` orörd.
- **Bildskripten** skriver ingenting i `public/assets/` förrän alla deras
  kontroller har gått igenom. Utskriftens rader är märkta `GRIND:` (stoppar
  körningen) eller `UPPLYSNING:` (stoppar aldrig). `optimize:images` stannar
  om en källbild inte har de mått skriptet förväntar sig.

## Mappstruktur

```
Portfoolie-Jelalq/
├─ index.html          <title>, sidbeskrivning, ikoner, preload av heros bild, <noscript>
├─ package.json        Beroenden och skripten
├─ vite.config.js      Bara @vitejs/plugin-react
├─ .oxlintrc.json      Inställningar för oxlint
├─ .gitattributes      robots.txt låst till LF, bilder och typsnitt binära
├─ assets-source/      Källbilder. Läses av bildskripten, skrivs aldrig, publiceras aldrig
│  ├─ hero-portrait.jpg
│  ├─ jq-logo-light.png
│  └─ projects/        En PNG per projekt
├─ public/             Kopieras rakt ut i dist/
│  ├─ robots.txt       Handskriven, det enda som inte är genererat här
│  └─ assets/          Bara genererat: hero/, projects/, jq-logo-*.png, jq-icon-*.png
├─ scripts/            Grindarna, förrenderingen och bildskripten (se ovan)
└─ src/
   ├─ main.jsx         Hydrerar i bygget, renderar i dev. Importerar fonts.css, tokens.css, global.css
   ├─ prerender.jsx    render() för scripts/prerender.mjs
   ├─ App.jsx          Header, <main> med Hero och sektionerna i datans ordning, Footer
   ├─ data/            Innehållet. Ren data, ingen JSX och ingen logik
   ├─ lib/             Rena funktioner som delas av komponenterna och scripts/
   ├─ components/      En komponent per fil, med en .module.css bredvid
   └─ styles/          fonts.css, tokens.css, global.css, type.module.css och fonts/
```

**`src/data/`** innehåller `sections.js` (sektionernas id, ordning och
navrubriker), `projects.js`, `skills.js`, `about.js`, `contact.js` och
`profile.js` (namn, roll och heros bildbredder). Varje fil förklarar sina
egna fält och regler i kommentaren högst upp.

**`src/lib/`** innehåller regler som både komponenterna och valideringen
behöver, så att de inte kan glida isär: `projectRules.js` (när ett projekt
räknas som komplett, kortets länkmål, filtret), `skillRules.js` (vilka
kompetenser som blir chips), `keyFigures.js` (nyckeltalen) och
`sectionLabel.js` (sektionsetiketterna). Inga filer där importerar React eller
rör `document` eller `window`.

## Så hänger sidan ihop

- **`src/data/sections.js` är enda källan för sektionernas id och ordning.**
  `App.jsx` mappar över listan, så ordningen i listan är ordningen både i
  navigeringen och på sidan. Komponenterna importerar id:na som konstanter.
  Ett sektions id skrivs aldrig som bokstavlig sträng i en `.jsx` fil. En ny
  sektion kräver en post i `sections.js` och en rad i `SECTION_COMPONENTS` i
  `App.jsx`.
- **Sektionerna i `<main>` är direkta syskon.** Linjen mellan sektionerna är
  regeln `section[id] + section[id]` i `global.css`. Ett omslag runt en sektion
  bryter kedjan utan felmeddelande. Där en mörk och en ljus sektion möts är
  linjen genomskinlig men behåller sin bredd, så färgskiftet är gränsen. Med
  dagens ordning byter ytan vid varje gräns, och ingen linje syns.
- **Projekt och Om mig är ljusa, resten av sidan är mörk.** `Projects.jsx` och
  `About.jsx` skickar `surface={SURFACE_LIGHT}` till `Section`, som sätter
  attributet `data-surface="light"` på sektionen. Blocket
  `[data-surface='light']` direkt efter `:root` i `tokens.css` binder om
  färgerna för allt i sektionen. Ytan följer komponenten, inte platsen i
  `sections.js`. Headern och mobilmenyn ligger utanför sektionerna och är
  alltid mörka.
- **Ofullständig data renderas inte.** Ett projekt som inte är komplett ger
  inget kort, en kompetens utan namn ger inget chip och en länk med
  `url: null` visas inte. Komponenterna och valideringen använder samma regler.
- **Två värden står på två ställen.** Rollen i `profile.js` står också i
  `<title>` i `index.html`, och det kontrolleras inte. Heros bildbredder i
  `profile.js` står också i preloaden i `index.html`, och där stannar bygget om
  de inte stämmer.
- **`<div id="root"></div>` i `index.html` ska stå tom och på en rad.**
  Förrenderingen letar efter exakt den markeringen.
- **`public/` innehåller bara genererade filer**, med `robots.txt` som enda
  undantag. Lägg aldrig en fil där för hand. Allt där publiceras.

## Medvetna val som kan se ut som brister

- **Web3Forms nyckeln i `src/data/contact.js` är publik med avsikt.** Den säger
  "skicka hit" och kan inte användas för att läsa inkorgen.
- **hCaptcha måste vara påslagen i Web3Forms instrumentpanel.** Det syns inte i
  koden. Är den avslagen avvisas inskicken fast bygget är grönt. Det enda som
  bevisar att den är på är att ett riktigt meddelande kommer fram.
- **Domänbegränsningen hos Web3Forms är inte påslagen**, eftersom formuläret då
  slutar fungera på `localhost`.
- **Mejladressen står i klartext** utan obfuskering. Ett uttryckligt beslut av
  Jelal.
- **GitHub länken visas inte.** Den har `url: null` i `contact.js`.
- **Menyn, filtret och formuläret kräver JavaScript.** Resten av sidan syns
  utan, tack vare förrenderingen. `<noscript>` i `index.html` säger det.
- **Ingen konfiguration för driftsättning.** Ingen värdtjänst är vald.
  `npm run build` ger en statisk `dist/` som kan läggas på valfri statisk
  värd.

## Var besluten och lärdomarna finns

- **`ARKITEKTUR.md`** innehåller varje tekniskt beslut med skäl och mätningar.
  Börja med tabellen "Upphävda beslut" högst upp och fortsätt med avsnittet om
  moderniseringen (besluten M1 och framåt), som gäller före äldre stycken.
- **`LARDOMAR.md`** innehåller felen som faktiskt har inträffat i projektet.
  Raderna "Regel framåt" är bindande för den som ändrar i projektet.
- `PLAN.md` är arbetsplanen, `BRIEF.md` och `UPPDRAG-*.md` är beställningarna.
- `skills.txt` och `skills-full.txt` är historik. Inget skript läser dem.
- **[GUIDE.md](GUIDE.md)** är guiden för den som ändrar innehållet.
