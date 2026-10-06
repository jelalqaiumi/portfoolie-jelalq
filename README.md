# Portfolio — Jelal Qaiumi

En personlig portfolio som en one-pager: header med ankarnavigering, hero,
kompetenser, projekt, kontakt och footer. Byggd i React och Vite med ren CSS.

Allt innehåll som ska kunna ändras ligger i fyra datafiler under `src/data/`.
Ingen komponentfil behöver röras för att markera en kompetens, lägga till ett
projekt eller byta en länk. Hur du gör det står i **[GUIDE.md](GUIDE.md)**.

## Sidans innehåll

- **Header** — monogram plus namnet som riktig text, båda i samma länk till
  toppen, och ankarlänkar till sektionerna. Länken till den sektion som syns
  mest av markeras med `aria-current`.
- **Hero** — namn, titel, kort intro och porträttet som en gråtonad cirkel med
  ett tunt vitt streck runt om. Webbläsaren laddar exakt en bildfil via
  `<picture>`.
- **Kompetenser** — 307 kompetenser i 18 grupper som pills på ljus yta. Orange
  fylld pill betyder behärskar, dämpad pill med tunn ram betyder ännu inte
  markerad. Tillståndet ligger i data, ett fält per kompetens.
- **Projekt** — datadriven lista. Tom just nu, med avsikt.
- **Kontakt** — e-post i klartext som `mailto:`, länkar som bara renderas när
  de har en adress, och ett meddelandeformulär via Web3Forms.
- **Footer** — upphovsrad med innevarande år.

Hela gränssnittet är på svenska. Kod, filnamn och variabelnamn är på engelska.
Sidan fungerar ner till 360 px bredd, är navigerbar med enbart tangentbord och
har en skip-länk som första fokuserbara element.

---

## Kom igång

**Krav:** Node enligt Vites eget `engines`-krav, `^20.19.0 || >=22.12.0`.
Projektet är byggt och kört på Node 24.19.0 med npm 11.17.0.

```sh
git clone https://github.com/jelalqaiumi/portfoolie-jelalq.git
cd portfoolie-jelalq
npm install
npm run dev
```

Vite skriver ut adressen i terminalen, normalt `http://localhost:5173`.

Du behöver inte generera några bilder först. De färdiga bildvarianterna ligger
i `public/assets/` och är inte ignorerade i git, så de följer med arkivet.

---

## Kommandon

Exakt de script som finns i `package.json`:

| Kommando | Kör | Gör |
|---|---|---|
| `npm run dev` | `vite` | Utvecklingsserver med hot reload. **Validerar inte datafilerna.** |
| `npm run build` | `node scripts/validate-data.mjs && vite build` | Validerar `src/data/` och bygger till `dist/` bara om valideringen går igenom. |
| `npm run preview` | `vite preview` | Servar den byggda `dist/`-katalogen lokalt. Kräver att `npm run build` körts. |
| `npm run lint` | `oxlint` | Linting enligt `.oxlintrc.json`. |
| `npm run validate:data` | `node scripts/validate-data.mjs` | Kör bara valideringen. Snabbaste sättet att kontrollera en redigering. |
| `npm run optimize:images` | `node scripts/optimize-images.mjs` | Genererar bildvarianterna i `public/assets/` ur originalen i `assets-source/`. Behövs bara om ett original byts ut. |

Att valideringen sitter i `build` och inte i `dev` är avsiktligt: en redigering
ska gå att se direkt i webbläsaren, men ett fel får aldrig nå en leverans.

---

## Mappstruktur

```
Portfoolie-Jelalq/
├─ index.html                 Vites entry. <html lang="sv">, <title>, favicon, <noscript>
├─ package.json               Beroenden och de sex npm-scripten
├─ vite.config.js             Enbart @vitejs/plugin-react
├─ .oxlintrc.json             Linterns konfiguration. react/rules-of-hooks som error.
├─ assets-source/             ORIGINALBILDER. Läses av bildskriptet, skrivs aldrig över.
│  ├─ logo.png                Loggan, 1254 × 1254
│  └─ profile.jpg             Porträttet, 4688 × 5051
├─ public/assets/             Enbart GENERERADE filer. Kopieras rakt ut i dist/.
│  ├─ profile/                profile-{400,800,1200}.{webp,jpg}
│  ├─ logo-mark-{32,96,192}.png        Kvadratisk ikon: favicon och apple-touch
│  └─ logo-mark-tight-{96,192}.png     Tajt märke, används i headern
├─ scripts/
│  ├─ optimize-images.mjs     Bildgenereringen
│  ├─ validate-data.mjs       Valideringen av src/data/
│  └─ font-coverage.mjs       Läser vilka tecken woff2-filen faktiskt innehåller
├─ skills.txt                 Kompetenslistorna i råform. Valideringen korsrefererar
├─ skills-full.txt            mot dem — se GUIDE.md innan du lägger till ett namn.
└─ src/
   ├─ main.jsx                Monterar <App />. Importerar fonts, tokens, global i den ordningen.
   ├─ App.jsx                 Skip-länk, Header, <main>, Hero, Skills, Projects, Contact, Footer
   ├─ data/                   DET DU REDIGERAR. Ren data, ingen JSX, ingen logik.
   │  ├─ sections.js          Sektionernas id och navigationens rubriker
   │  ├─ skills.js            18 grupper, 307 kompetenser
   │  ├─ projects.js          Tom lista med en kommenterad mall
   │  └─ contact.js           E-post, länkar, formulärets nyckel
   ├─ components/             En komponent per fil + en .module.css per komponent
   └─ styles/
      ├─ fonts.css            @font-face för Didact Gothic
      ├─ tokens.css           Alla designtokens som CSS-variabler i :root
      ├─ global.css           Elementstilar och de två sanktionerade globala klasserna
      └─ fonts/               didact-gothic-latin-400.woff2
```

`dist/` och `node_modules/` är ignorerade i git.

---

## Så hänger sidan ihop

**`src/data/sections.js` är enda källan för sektionernas id.** Filen exporterar
`HERO_ID`, `SKILLS_ID`, `PROJECTS_ID`, `CONTACT_ID` och `MAIN_ID` som namngivna
konstanter, och komponenterna importerar dem. Ett sektions-id får därför aldrig
skrivas som bokstavlig sträng i en `.jsx`-fil — annars kan en navlänk komma att
peka på en sektion som inte finns.

**Sektionerna i `<main>` är direkta syskon, i tur och ordning.** Linjerna mellan
sektionerna är CSS-regeln `section[id] + section[id]` i `global.css`. Hamnar
något annat element mellan två sektioner bryts kedjan och linjerna försvinner
utan felmeddelande. Räkna om linjerna om du ändrar i `App.jsx`.

**Ordningen i `sections.js` styr navigationen. Ordningen på sidan styrs av
skrivordningen i `App.jsx`.** De två måste hållas överens för hand; kastar du om
den ena utan den andra glider nav och sida isär utan att något larmar.

**Komponenterna filtrerar bort ofullständig data i stället för att rendera tomma
element.** En kompetens utan namn ger ingen pill, ett projekt utan titel ger
inget kort, och en kontaktlänk med `url: null` renderas inte alls. Samma uttryck
(`typeof v === 'string' && v.trim() !== ''`) används i komponenterna och i
valideringsskriptet, så att ett fält med bara blanksteg räknas som tomt på båda
ställena.

---

## Teknikval

| Val | Varför |
|---|---|
| React 19 + Vite 8, JavaScript | Beslutat i uppdraget. Sidan demonstrerar den stack kompetenslistan påstår. |
| CSS Modules (`*.module.css`) | Inbyggt i Vite, noll nya beroenden, klassnamn skopas per komponent. |
| Designtokens som CSS-variabler i `src/styles/tokens.css` | Ett ställe att ändra färg och avstånd på. Kaskaderar rakt in i modulerna. |
| Didact Gothic, självhostad woff2, endast vikt 400 och latin-delmängden | Noll externa anrop i runtime, besökarens IP går inte till tredje part. Enda vikten gör att webbläsaren aldrig kan feta syntetiskt. |
| `sharp` som devDependency | Bildvarianterna genereras av ett skript som går att köra om och verifiera, inte av manuell export. Hamnar aldrig i bundlen. |
| `oxlint` | Följer med Vite-mallen, och mallens `.oxlintrc.json` behålls som den levereras. Ger `react/rules-of-hooks` som error gratis. |

**Runtime-beroenden: `react` och `react-dom`. Inget mer.** Inget UI-ramverk,
ingen router, inget animationsbibliotek, inga ikonpaket. Ankarnavigering,
pills, grid och gråskala löses med plattformen.

Accentfärgen `#FC6F03` är pixelmätt ur `assets-source/logo.png`, inte avläst på
ögonmått, så att färgen på sidan matchar loggan som ligger bredvid den.

---

## Validering av datafilerna

`scripts/validate-data.mjs` körs som första steg i `npm run build` och kan
köras separat med `npm run validate:data`. Den finns därför att filerna i
`src/data/` handredigeras: en dubblett eller ett saknat fält renderas **tyst**
utan den, och med drygt 300 handskrivna poster räcker det inte att någon tittar.

Skriptet kontrollerar bland annat att

- obligatoriska fält finns och innehåller text, inte bara blanksteg,
- varje id och varje kompetensnamn förekommer exakt en gång,
- `filled` är `true` eller `false` och inte en sträng,
- varje kompetensnamn finns i `skills.txt` eller `skills-full.txt` — och
  omvänt, att inget namn ur dessa listor har tappats,
- varje tecken som används i `src/data/` har en glyf i den woff2-fil som
  `fonts.css` pekar på, så att inget ord får en skarv i ett reservtypsnitt,
- `url`-fält är en adress eller `null` — aldrig tom text och aldrig `"#"`.

Alla fel samlas och skrivs ut tillsammans, så att den som redigerat många rader
ser alla sina misstag i en körning. Avslutskoden är nollskild så fort ett fel
hittats, och då byggs ingenting. Felmeddelandena är på svenska och namnger
filen och värdet. Går allt igenom skriver skriptet ut en `Validering OK`-rad med
det aktuella antalet poster — den raden finns för att en tyst validering inte
går att skilja från en som inte kördes.

Inga beroenden, ren Node.

---

## Bilderna

Originalen ligger i `assets-source/` och **skrivs aldrig över**. De ligger
medvetet utanför `public/`: allt i `public/` kopieras rakt ut i leveransen, och
när originalen låg där publicerades de trots att ingen kod refererade dem.

`npm run optimize:images` läser originalen och skriver elva genererade filer
till `public/assets/`. Skriptet kodar varje artefakt till en buffert, kör alla
kontroller mot bufferten, och skriver först därefter filerna i ett svep — så
"avbryter" betyder att ingenting ändrades på disk. Varje rad i utskriften är
märkt `GRIND:` (stoppar körningen om värdet inte håller) eller `UPPLYSNING:`
(stoppar aldrig). Skillnaden är viktig: en upplysning som läses som en grind
skulle stoppa körningen på korrekt utdata.

Gråskalan och den grå tonplattan på profilbilden ligger i CSS, inte i
bildfilerna, så att tonen kan justeras utan att någon bild genereras om.

---

## Medvetna val som kan se ut som brister

- **Projektsektionen är tom.** Datafilen `src/data/projects.js` är en tom lista
  med en kommenterad mall. Sidan visar en kort rad i stället för en tom yta.
  Inget är trasigt — se GUIDE.md för hur ett projekt läggs till.
- **Sidan är helt klientrenderad** och blir blank utan JavaScript. `index.html`
  innehåller ett `<noscript>`-meddelande om det.
- **Web3Forms-nyckeln i `src/data/contact.js` är publik med avsikt.** Den säger
  "skicka hit", inte "läs härifrån", och går inte att använda för att läsa
  inkorgen eller ändra inställningar.
- **E-postadressen står i klartext** utan obfuskering. Ett uttryckligt beslut,
  taget med insikt om skräppostrisken.
- **GitHub-länken visas inte.** Den har `url: null` i `contact.js`, vilket är
  det beslutade sättet att säga att en länk inte finns.
- **Ingen deploy-konfiguration.** Ingen värdtjänst är vald, så det finns inget
  att dokumentera. `npm run build` ger en statisk `dist/` som kan läggas var
  som helst.

---

## Vidare läsning

- **[GUIDE.md](GUIDE.md)** — så ändrar du innehållet på sidan.
- **ARKITEKTUR.md** — varje teknisk beslut med motiv och mätningar. Stor fil;
  börja med tabellen "Upphävda beslut" högst upp, som listar värden och strängar
  som inte längre gäller.
- `BRIEF.md`, `PLAN.md` och `LARDOMAR.md` är interna arbetsanteckningar.
