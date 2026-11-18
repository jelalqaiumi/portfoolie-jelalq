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
- **SEO vid bygget.** Samma steg skriver in canonical, delningskortet
  (`og:*` och `twitter:card`) och två block strukturerad data (JSON-LD,
  `Person` och `WebSite`) i `<head>` i `dist/index.html`. Värdena härleds ur
  `src/data/site.js`, `profile.js` och `contact.js` med hjälp av
  `scripts/seo.mjs`. De står inte i `index.html` och finns alltså inte i
  `dev`. `public/robots.txt` och `public/sitemap.xml` är statiska filer som
  bygget jämför med domänen i `site.js`.
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
| `npm run optimize:share-image` | Läser `assets-source/hero-portrait.jpg` och skriver delningsbilden, en svartvit JPEG på 1200 × 630 px, till `public/assets/share/share-1200x630.jpg` (sökvägen och måtten står i `SHARE_IMAGE` i `scripts/seo.mjs`). Körs när porträttet byts. Ingår inte i `build`, men bygget stannar om bilden saknas. |
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
  stämmer med `HERO_IMAGE_WIDTHS` i `src/data/profile.js`. För SEO
  kontrollerar den dessutom att `url` i `src/data/site.js` är en https-adress
  till startsidan med gemener och ett snedstreck sist, att `sameAsExtra` är en
  lista med https-adresser, att `public/robots.txt` och `public/sitemap.xml`
  är exakt det som `url` ger (med LF-radslut; annars skrivs det väntade
  innehållet ut), och att `<title>` i `index.html` är exakt namnet och rollen
  ur `profile.js` med en mittpunkt emellan. Alla fel skrivs ut
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
  3. Varje variabel som får ett nytt värde utanför `:root`, i blocket
     `[data-surface='light']` för den ljusa ytan, ska också finnas i `:root`. Ett felstavat namn där
     fäller alltså bygget i stället för att tyst inte binda om något.
- **`scripts/prerender.mjs`** kontrollerar den förrenderade sidan: exakt en
  `<h1>`, exakt en hero, att varje klassnamn finns i det byggda CSS och att
  captchan inte är förrenderad. Före renderingen kontrollerar den `<head>`:
  att `</head>` finns en gång, att ingen canonical, `og:`, `twitter:` eller
  JSON-LD är handskriven i `index.html` (oavsett citattecken och skiftläge),
  att `<meta name="description">` finns en gång och inte är tom, att
  delningsbilden finns i `dist/`, och att JSON-LD-blocken går att tolka och
  inte innehåller `<`. Felraderna börjar med `prerender:`. Fallerar något
  lämnas `dist/index.html` orörd.
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
├─ .gitattributes      robots.txt och sitemap.xml låsta till LF, bilder och typsnitt binära
├─ assets-source/      Källbilder. Läses av bildskripten, skrivs aldrig, publiceras aldrig
│  ├─ hero-portrait.jpg
│  ├─ jq-logo-light.png
│  └─ projects/        En PNG per projekt
├─ public/             Kopieras rakt ut i dist/
│  ├─ robots.txt       Handskriven, kontrolleras mot domänen i src/data/site.js
│  ├─ sitemap.xml      Handskriven, kontrolleras mot domänen i src/data/site.js
│  └─ assets/          Bara genererat: hero/, projects/, share/, jq-logo-*.png, jq-icon-*.png
├─ scripts/            Grindarna, förrenderingen, bildskripten och seo.mjs (se ovan)
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
`profile.js` (namn, roll och heros bildbredder) och `site.js` (sidans domän
och `sameAsExtra`, som bara används i `<head>`). Varje fil förklarar sina
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
  attributet `data-surface="light"` på sektionen. Samma attribut sätts också
  på varje kompetens-chip: `SkillChip` skickar `surface={SURFACE_LIGHT}` till
  `Chip`, som sätter det på sitt `span`, så att kompetenserna står ifyllda i
  varmvitt med mörk text på den mörka sektionen. `Chip` läser `surface` bara
  när chipset är text. Projektfiltrets chips är knappar och får aldrig
  attributet. Blocket `[data-surface='light']` direkt efter `:root` i
  `tokens.css` binder om färgerna för elementet med attributet och allt inuti
  det. Regeln `.chip[data-surface='light']` i `Chip.module.css` läser
  fyllningen och texten ur de ombundna `--bg` och `--ink`, så färgvärdena
  står bara i `tokens.css`. Ytan följer komponenten, inte platsen i
  `sections.js`. Headern och mobilmenyn ligger utanför sektionerna och är
  alltid mörka.
- **Ofullständig data renderas inte.** Ett projekt som inte är komplett ger
  inget kort, en kompetens utan namn ger inget chip och en länk med
  `url: null` visas inte. Komponenterna och valideringen använder samma regler.
- **Några värden står på flera ställen, och bygget kontrollerar dem.** Namnet
  och rollen i `profile.js` står också i `<title>` i `index.html`. Heros
  bildbredder i `profile.js` står också i preloaden i `index.html`. Domänen i
  `site.js` står också i `public/robots.txt` och `public/sitemap.xml`. I alla
  tre fallen stannar bygget om ställena inte stämmer, och skriver ut vad som
  ska stå.
- **`<div id="root"></div>` i `index.html` ska stå tom och på en rad.**
  Förrenderingen letar efter exakt den markeringen.
- **`public/` innehåller bara genererade filer**, med `robots.txt` och
  `sitemap.xml` som enda undantag. Lägg aldrig någon annan fil där för hand.
  Allt där publiceras.

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
- **GitHub länken visas inte.** Den har `url: null` i `contact.js`. Adressen
  står i stället i `sameAsExtra` i `site.js`, så att den finns med i den
  strukturerade datan för sökmotorer men inte på sidan.
- **Canonical och delningskortet saknas i `npm run dev`.** De skrivs in först
  av förrenderingen i bygget. Kontrollera dem i `dist/index.html` eller med
  `npm run preview`.
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
