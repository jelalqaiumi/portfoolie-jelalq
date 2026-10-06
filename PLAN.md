# Plan: Bygga en personlig portfolio-webbplats för Jelal Qaiumi i React + Vite, levererad i små verifierbara steg

Reviderad 2026-10-02 efter granskningen av paket 1. Paket 2 är delat i **2A** och
**2B**, och paket 4 har utökats med ett valideringsskript. Övriga nummer är
oförändrade — se "Varför numreringen inte ändras" nedan.

## Lärdomar som gäller här

`LARDOMAR.md` finns nu och innehåller sju poster. Varje "Regel framåt" är bindande.
Dessa påverkar planen konkret:

- **Fynd 7 — ett script som pekar på en fil som inte finns.** Ett npm-script läggs
  till i samma paket som filen det anropar, och varje script i `package.json` körs
  en gång innan paketet lämnas. → `sharp`, `scripts/optimize-images.mjs` och
  scriptraden `optimize:images` ligger alla tre i **2A**. Samma regel gör att
  `validate-data.mjs` i paket 4 blir ett ordningsproblem — se den öppna punkten
  under paket 4.
- **Fynd 4 — headerns höjd har två oberoende sanningar.** Efter varje ändring i
  `Header.jsx`/`Header.module.css` ska renderad headerhöjd mätas och vara exakt
  `--header-height`. → Obligatoriskt verifieringssteg i **2B**, som bygger om
  headern.
- **Fynd 1 — sektions-id som bokstavlig sträng i `.jsx`.** → Verifieras i 2B
  (logga-länken till hero) och i varje paket som lägger till en `.jsx`.
- **Fynd 6 — beslut som saknas i arkitekturen uppfinns tyst i koden.** Varje värde
  byggaren väljer utan stöd i `ARKITEKTUR.md` märks `/* EJ I ARKITEKTUR: ... */`
  och listas i överlämningen; granskaren söker på strängen. → Står som sista
  verifieringspunkt i **varje** paket härifrån.
- **Fynd 3 — saknade eller dubbla fält går igenom tyst.** → Grunden till att paket
  4 nu också bär ett valideringsskript, och till att dess verifiering ska visa att
  skriptet faktiskt fäller trasig data.
- **Fynd 5 — 360 px-golvet ska verifieras med sidans längsta faktiska sträng.** →
  Gäller paket 4 (längsta skill-namnet är raden `HTTP-metoder (GET, POST, PUT,
  DELETE)`) och paket 7. Aldrig med kort platshållartext.
- **Fynd 2 — sidans `<h1>` får aldrig läsas ur `label`, och en platshållarrubrik
  ska innehålla riktig rubriktext.** → Gäller paket 3, och ligger bakom en öppen
  punkt jag flaggar där.
- **Mönstret i `ARKITEKTUR.md`: tre antaganden om `logo.png`, tre gånger fel vid
  mätning.** Ett felaktigt antagande om en bild ger tyst fel utdata som passerar
  alla kontroller. → Därför ska bildskripten i 2A och 2B **skriva ut sina
  framräknade värden**, och avvikelse mot arkitekturens förväntade utfall ska
  stoppa paketet, inte justeras för hand.

---

## Mina två ställningstaganden

### 1. Paket 2 delas — 2A profilbilden, 2B ikonen och headern

**Ja, det ska delas.** Paketet bär nu fyra artefakter och två helt olika sorters
kontroll:

- Att krympa ett foto verifieras genom att **mäta** — filstorlek, pixelmått, och
  att hjässan inte är avskuren.
- Att härleda en ikon med alfakanal och bygga om headern verifieras genom att
  **titta och navigera** — ingen fyrkant mot bakgrunden, mjuka kanter, läsbar
  textnod, mätt headerhöjd, fungerande tillgängligt namn på 360 px.

Planens styrka har varit att ett paket går att verifiera i ett svep. Det här är
två svep med olika felkällor: 2A faller på beskärningskoordinater och kompression,
2B på alfaberäkningen och på headerns tillgänglighet. Lägger vi dem i samma paket
får granskaren fyra artefakter att bedöma på en gång — exakt den situation som gav
sju fynd i paket 1.

Delningen krockar inte med fynd 7: `sharp`, skriptfilen och scriptraden tillkommer
samtidigt i 2A, och 2A kör scriptet. 2B **utökar** samma skriptfil med ett
utdatasteg och kör det igen. Regeln håller i båda paketen.

Kopplingen ikon → header behålls däremot ihop i 2B. Headern kan inte byta till
monogrammet förrän monogrammet finns, och en ikon som ingen använder går inte att
verifiera. Det är ett svep.

### 2. Leverans 1 ligger kvar efter paket 3 — men får en avgränsad frågeställning

**Den flyttas inte.** Leverans 1 finns för att fånga smakfrågor om **tonen**, och
tonen bor i hero: gråskalan, den grå tonplattan, typografin i namnet och
introtexten. Headern är synlig redan i paket 1 och förbättras i 2B, men en header
ensam ger inte Jelal något att tycka till om i den frågan. Arkitekturen har
dessutom medvetet lagt gråskalan i CSS i stället för att baka in den i bildfilerna,
just för att synpunkter vid Leverans 1 ska kunna hanteras utan att någon bild
genereras om. Det beslutet förutsätter att hero finns när vi frågar.

Det som däremot behöver skärpas är **vad vi frågar om**. Flera beslut är redan
tagna av Jelal själv eller uppmätta ur loggan, och om de tas upp igen vid
Leverans 1 raseras arbete utan att något blir bättre:

| Öppet för synpunkt vid Leverans 1 | Stängt — tas inte upp igen |
|---|---|
| Hero-introtexten | Monogram + HTML-text i headern (Jelals beslut (b), 2026-10-02) |
| Gråskalans och tonplattans styrka | Accentfärgen `#FC6F03` (uppmätt ur loggan, inte avläst) |
| Profilbildens beskärning | Mörk bas |
| Namnets grad och spärrning i headern | E-posten i klartext (Jelals uttryckliga beslut) |
| Kantlinjen under headern | Att skills inte får nivåangivelser |

**Konsekvens för ordningen:** 2B måste vara klart före Leverans 1. Lockupen i
44 px får inte stå kvar när Jelal tittar, eftersom headern är det första som möter
blicken. Är ikonen inte klar i 2B flyttas ombyggnaden till paket 3, men inte
längre.

### Varför numreringen inte ändras

`ARKITEKTUR.md` (1149 rader) och `LARDOMAR.md` refererar till paket 2 till 7 på en
mängd ställen, bland annat i tabellen över vilka filer som skapas i vilket paket.
Skulle jag skjuta paket 3–8 ett steg framåt blir varje sådan referens tyst fel i
ett dokument byggaren följer bokstavligt — samma klass av fel som fynd 7. Därför
`2A`/`2B` i stället för omnumrering. Nio verifieringssvep, åtta nummer.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| 1 | Arkitekturbeslut + körbart skelett med header, nav och tomma sektioner | arkitekt → byggare | **Pågår** — rättat efter sju fynd, andra granskningen inväntas |
| 2A | Profilbilden optimeras: `sharp` + bildskriptet + sex profilvarianter | byggare | De sex filerna finns under sina tak, beskärningen sitter, originalen orörda |
| 2B | Monogram-ikon med genomskinlig botten + headern byggs om till ikon + HTML-text | byggare | Ingen fyrkant mot någon bakgrund, headern visar monogram + markerbar text, höjden är exakt 64 px |
| 3 | Hero-sektion med namn, titel, intro och profilbild med grått lager | byggare | Hero ser färdig ut på 360 px och på desktop, bilden är gråtonad enligt briefen |
| — | **LEVERANS 1 — visa för Jelal, hämta synpunkter på det som står som öppet ovan** | projektledare | Jelal har sett paket 1–3 i webbläsaren och sagt ja eller begärt ändring |
| 4 | Skills: datafil med alla 93 + pills + `validate-data.mjs` inkopplat i `build` | arkitekt → byggare | 93 pills syns, ett skill kan tändas på ETT ställe, och skriptet fäller trasig data |
| 5 | Projektsektion förberedd men tom, datadriven | arkitekt → byggare | Tomt läge syns, ett testprojekt dyker upp som kort, valideringen täcker filen |
| 6 | Kontaktsektion + footer | byggare | E-post som `mailto:` i klartext, tomma länkar renderas inte, valideringen täcker filen |
| 7 | Responsiv genomgång, tillgänglighet, `<noscript>`, skip-länk, `aria-current` | byggare | Ingen horisontell scroll från 360 px, hela sidan navigerbar med tangentbord, `npm run build` går igenom |
| 8 | README + guide för hur Jelal fyller i skills, projekt och kontaktlänkar | dokumentator | En utomstående kan följa guiden utan att öppna en komponentfil |

Granskaren körs efter **varje** avslutat paket, inklusive efter 2A och efter 2B
separat. Den är inte ett eget paket i tabellen eftersom den alltid gäller.

---

### Paket 2A — Profilbilden
**Förutsättning:** Paket 1 godkänt i den andra granskningen. Inte dessförinnan.

**Ingår:**
- `sharp` som devDependency, `scripts/optimize-images.mjs` och scriptraden
  `optimize:images` — alla tre samtidigt, enligt fynd 7.
- De sex profilvarianterna enligt arkitekturens tabell.
- **Beskärningsbedömningen.** Arkitekturen säger själv att `left: 584` / `top: 0`
  är ett utgångsläge räknat på bildens mått, inte en mätning av var ansiktet
  sitter. Byggaren ska titta på resultatet, justera vid behov och skriva de
  slutliga värdena som kommentar i skriptet.

**Ingår INTE:** Monogram-ikonen och headern (2B). Gråskalan och tonplattan — de är
CSS och hör till paket 3, medvetet, så att tonen kan justeras efter Leverans 1 utan
att en bild genereras om. `.visually-hidden` (2B). `<noscript>` (paket 7). Och
**ingen temporär `<img>` i `App.jsx` för att kunna titta på bilden** — hero är
paket 3. En asset-leverans verifieras genom att filen öppnas, inte genom att något
provisoriskt läggs på sidan.

**Verifiering:**
1. `npm run optimize:images` går igenom och skriver ut sina framräknade värden.
2. Varje script i `package.json` körs en gång — inget faller på en saknad fil (fynd 7).
3. De sex filerna finns, har exakt de angivna pixelmåtten, och var och en ligger
   under sitt tak. Uppmätta storlekar listas i överlämningen.
4. `public/assets/profile.jpg` och `logo.png` är oförändrade — jämför storlek och
   ändringsdatum före och efter.
5. Öppna `profile-800` i hero-storlek: hjässan är inte avskuren, ansiktet sitter
   nära övre tredjedelen, motivet är inte ur centrum i sidled. Justerade
   `left`/`top` står som kommentar i skriptet.
6. Ingen EXIF följer med ut.
7. `EJ I ARKITEKTUR`-sökning gjord, träffarna listade i överlämningen (fynd 6).

---

### Paket 2B — Monogram-ikonen och headern
**Förutsättning:** 2A godkänt, så att skriptfilen finns och är känd att fungera.

**Ingår:**
- Ikonsteget i **samma** `scripts/optimize-images.mjs`: beskärningen med de
  uppmätta värdena, alfa-steget som ger genomskinlig botten, och nedskalningen —
  i arkitekturens ordning, alfa räknat på fullt underlag före `resize`.
- `logo-mark-32.png`, `logo-mark-96.png`, `logo-mark-192.png`.
- `.visually-hidden` i `global.css`.
- **Ombyggnaden av headern** till ikon + namnet som riktig HTML-text — den kända
  skulden från paket 1. `Header.jsx` + `Header.module.css`.
- Favicon-referensen i `index.html` byts från lockupen till `logo-mark-32.png`.
  *(Arkitekturens filtabell för paket 2 nämner inte `index.html`. Byggaren märker
  ändringen enligt fynd 6 och listar den, så att arkitekten kan ta in den.)*

**Ingår INTE:** Profilbilden (2A). Hero (paket 3). Skip-länk, `aria-current`,
`<noscript>` och mobil nav-toggle — allt det är paket 7 och ska inte smyga in här,
även om 2B råkar vara i närheten av headern. Ingen ny färg, ingen `.ico`, ingen
`<picture>` för ikonen.

**Verifiering:**
1. Skriptets utskrift stämmer **exakt** med arkitekturens förväntade utfall: bbox
   x 323..914 / y 338..779, två oranga block hittade, högsta blocket valt,
   beskärning `left=283 top=223 width=672 height=672`. **Avviker något tal — stanna
   och lämna tillbaka. Justera inte talen för hand.**
2. De tre ikonfilerna finns, har rätt mått, är PNG **med** alfakanal, och ligger
   under sina tak.
3. Öppna ikonen mot sidans bakgrund **och** mot en klart avvikande ton, t.ex. vit.
   Ingen fyrkant syns i någondera. Kanterna är mjuka, inte taggiga. Syns en
   fyrkant är alfan fel; är kanterna taggiga har `resize` skett före alfa-steget.
4. I webbläsaren: headern visar monogrammet plus "Jelal Qaiumi" som riktig text —
   markera texten med muspekaren för att bekräfta att det är en textnod och inte
   en bild. Ikon och namn är **en** länk till hero.
5. **Mät renderad headerhöjd — den ska vara exakt `--header-height`** (fynd 4,
   obligatorisk eftersom `Header.jsx`/`Header.module.css` ändrats).
6. På 360 px: namnet är visuellt dolt men länken har fortfarande ett tillgängligt
   namn — kontrollera i tillgänglighetsträdet att det läses som "Jelal Qaiumi",
   exakt en gång. Ingen horisontell scroll. På 600 px och uppåt syns namnet.
7. Fliken i webbläsaren visar monogrammet, utan mörk kvadrat runt om.
8. Sektions-id-sökningen i `.jsx` ger inga träffar utanför kommentarer — logga-
   länken använder konstanten, inte strängen (fynd 1).
9. Varje script i `package.json` körs en gång. `EJ I ARKITEKTUR` listat (fynd 6, 7).
10. `logo.png` och `profile.jpg` fortfarande oförändrade.

---

### Paket 3 — Hero
**Förutsättning:** 2B godkänt. Lockupen är borta ur headern.

**Öppen punkt som arkitekten behöver bekräfta innan paketet startar:**
`ARKITEKTUR.md` säger på ett ställe att hero-posten tappar `label` helt
(alternativ C), och på ett annat — i avsnittet "Bekräftat från paket 1" — att
hero-platshållarens `<h1>` renderar `label` ur `sections.js`, alltså "Start", och
att det är rätt som platshållare. De två kan inte båda gälla, och det senare
krockar dessutom med fynd 2:s regel att en platshållarrubrik ska innehålla riktig
rubriktext. Frågan kan redan vara avgjord i rättningen av paket 1; är den inte det
ska den redas ut av arkitekten, inte i koden.

**Ingår:** Namn som `<h1>` skrivet i `Hero.jsx`, titel, kort intro på svenska, och
profilbilden med gråskala plus grå tonplatta i CSS. Generösa marginaler.

**Ingår INTE:** Skills, projekt, kontakt. Ingen animation eller scroll-effekt — det
är inte beställt och arkitekturen har uttryckligen inget `--transition` för det.

**Verifiering:**
1. Öppna sidan i 360 px och i desktopbredd. Ingen horisontell scroll.
2. Bilden är tydligt gråtonad, texten läsbar mot underlaget, inget överlappar.
3. Webbläsaren laddar **exakt en** bildfil — kontrollera i nätverkspanelen att inte
   både WebP och JPEG hämtas.
4. `<img>` har explicita `width`/`height` — ingen layout shift vid laddning.
5. Sidans `<h1>` innehåller Jelals namn, inte ett navord. Det finns exakt ett `h1`.
6. `EJ I ARKITEKTUR` listat. Introtexten flaggas i överlämningen som text Jelal
   ska godkänna.

**Efter detta paket: LEVERANS 1.** Stanna. Visa sidan för Jelal och ställ frågorna
i tabellen "Öppet för synpunkt" ovan — inte en öppen "vad tycker du", som bjuder in
till att riva upp det som är stängt.

---

### Paket 4 — Skills + datavalidering
**Förutsättning:** Leverans 1 godkänd av Jelal.

**Öppen punkt som måste vara avgjord av arkitekten innan paketet startar:**
`validate-data.mjs` ska enligt arkitekturen kontrollera fyra datafiler, men
`projects.js` skapas först i paket 5 och `contact.js` i paket 6. Fynd 7 förbjuder
uttryckligen ett script som faller på en fil som inte finns — och det är precis det
felet som redan inträffat en gång med `optimize:images`. Mekanismen är arkitektens
beslut; jag konstaterar bara att den måste vara bestämd innan paketet startar, och
att **paket 5 och 6 i så fall får ett tillägg: att aktivera sin respektive
kontroll.** Det står i deras omfattning nedan.

**Ingår:**
- Arkitekten beslutar kategoriindelningen av de 93 skillsen. Formen är redan
  beslutad: `{ name, filled }`, inget mer.
- Byggaren lägger in alla 93 namn stavade exakt som i `skills.txt`, alla med
  `filled: false`, plus renderingen: orange fylld pill med mörk text för ifylld,
  outline-pill för ej ifylld. Kompakt kolumnlayout.
- `scripts/validate-data.mjs`, scriptraden `validate:data`, och inkopplingen i
  `build` — alla tre samtidigt.

**Ingår INTE:** Att markera några skills som ifyllda — det gör Jelal. Ingen sökruta,
inga filter, ingen nivå- eller procentangivelse, ingen ikon, ingen sorteringsvikt.

**Verifiering:**
1. Räkna pills på den renderade sidan — exakt 93, alla dämpade.
2. Ändra ett enda skill till `true`, spara, se pillen bli orange. Bekräfta att
   **endast** `skills.js` ändrats — ingen komponentfil rörd. Ändra tillbaka.
3. `npm run validate:data` går igenom på de riktiga filerna.
4. **Skriptet ska fälla trasig data, inte bara finnas.** Bryt datan medvetet, en
   sak i taget, i en kopia i scratch-katalogen: dubblerat skill-namn, 92 skills,
   94 skills, `filled` som sträng, två grupper med samma `id`, grupp utan `title`,
   dubblerat sektions-`id`, sektion utan `label`. Varje fall ska ge nollskild
   avslutskod och ett svenskt felmeddelande som namnger filen och värdet.
   Återställ och bekräfta att det går igenom igen. **Lämna aldrig trasig data kvar.**
5. `npm run build` ska **misslyckas** med trasig data och lyckas med återställd —
   det är beviset på att inkopplingen i `build` sitter, inte bara att scriptet finns.
6. Ett skill utan `name` renderar inget element alls, inte en tom pill (fynd 3).
7. 360 px-kontroll med sidans längsta faktiska skill-namn, raden
   `HTTP-metoder (GET, POST, PUT, DELETE)` — aldrig med kort platshållartext (fynd 5).
8. Skills-sektionen dominerar inte sidan på någon bredd.
9. Varje script i `package.json` körs en gång. `EJ I ARKITEKTUR` listat.

---

### Paket 5 — Projektsektion (förberedd, tom)
**Förutsättning:** Paket 4 klart och granskat.

**Ingår:** `projects.js` som tom array, datadriven sektion med tomt läge på svenska,
projektkort. **Plus: aktivera `projects.js`-kontrollen i `validate-data.mjs`** enligt
den öppna punkten i paket 4.

**Ingår INTE:** Riktiga projekt, projektbilder, detaljsidor, filtrering, årtal,
"featured"-flagga. Projekten kommer senare och ska inte gissas fram.

**Verifiering:**
1. Tomt läge syns med rubrik och svensk text.
2. Lägg in ett påhittat testprojekt → ett kort renderas med titel, beskrivning och
   tech-etiketter. Ta bort det → tomt läge tillbaka.
3. Ett projekt utan `id`, `title` eller `description` hoppas över helt (fynd 3), och
   `validate:data` fäller det. `url`/`repoUrl` som `null` renderar ingen länk.
4. **Inget `<footer>`-element inuti ett projektkort** — arkitekturen varnar att den
   globala sidmarginalregeln då ger kortet oväntad sidomarginal.
5. 360 px-kontroll med en lång projekttitel, inte en kort.
6. `npm run build` går igenom. `EJ I ARKITEKTUR` listat.

---

### Paket 6 — Kontakt + footer
**Förutsättning:** Paket 5 klart och granskat.

**Ingår:** `contact.js` med e-posten i klartext och GitHub/LinkedIn som `url: null`,
kontaktsektionen, och footern. **Plus: aktivera `contact.js`-kontrollen i
`validate-data.mjs`.**

**Ingår INTE:** Kontaktformulär, backend, e-posttjänst, karta. Ingen obfuskering av
e-posten — det är Jelals uttryckliga beslut, taget med insikt om skräppostrisken.
**Byggaren gissar inte en GitHub- eller LinkedIn-URL.**

**Verifiering:**
1. Navlänken till kontakt scrollar dit och rubriken hamnar inte under den sticky
   headern.
2. E-posten syns i klartext och `mailto:`-länken öppnar e-postklienten.
3. De två länkarna med `url: null` renderas **inte alls** — ingen grå ikon, inget
   "kommer snart", inget `href="#"`. Byt en `null` mot en URL → länken dyker upp.
   Byt tillbaka.
4. Footern ligger i botten utan glapp på både kort och lång sida.
5. `npm run build` går igenom. `EJ I ARKITEKTUR` listat.

---

### Paket 7 — Responsiv genomgång och robusthet
**Förutsättning:** Paket 6 klart och granskat. Alla sektioner finns.

**Ingår:** Genomgång på 360 px, 600, 900 och 1200. Mobil navigation. `<noscript>`
med arkitekturens exakta text. Skip-länk till `<main>`. `aria-current` på
navlänken till sektionen i vy — projektets första `useEffect`, och ett medvetet
val, inte något som smugit in tidigare. Tangentbordsnavigering, fokusmarkeringar,
alt-texter, kontraster.

**Ingår INTE:** Nya sektioner, nytt innehåll, omdesign. Deploy.

**Verifiering:**
1. Alla fyra bredder, ingen horisontell scroll någonstans — testat med sidans
   längsta faktiska strängar (fynd 5).
2. Hela sidan navigerbar med endast tangentbord, fokus alltid synligt, skip-länken
   är första fokuserbara elementet och blir synlig vid fokus.
3. Slå av JavaScript → `<noscript>`-texten visas, ordagrant som i arkitekturen.
4. Renderad headerhöjd fortfarande exakt `--header-height` efter eventuella
   header-ändringar (fynd 4).
5. `npm run build` och `npm run preview` går igenom, och den byggda sidan beter sig
   som utvecklingsversionen.
6. `EJ I ARKITEKTUR` listat.

---

### Paket 8 — Dokumentation
**Förutsättning:** Paket 7 klart och granskat.

**Ingår:** README med start, bygge och vad `validate:data` respektive
`optimize:images` gör. Guide på svenska: "så markerar du ett skill som ifyllt",
"så lägger du till ett projekt", "så fyller du i din GitHub- och LinkedIn-länk".

**Ingår INTE:** Deploy-instruktioner för en värdtjänst som inte är vald. Ingen
API-dokumentation — det finns inget API.

**Verifiering:** Följ guiden ordagrant: tänd ett skill, lägg till ett projekt, fyll
i en länk — utan att öppna någon komponentfil. Kör `npm run validate:data` efteråt
och se att den går igenom. Går något av detta inte är guiden eller arkitekturen
fel, och paketet lämnas tillbaka.

---

## Risker

- **Ett felaktigt antagande om en bildfil ger tyst fel utdata.** Det har redan
  hänt tre gånger med `logo.png` — accentfärgen, beskärningsgränsen och
  bottenfärgen. Varje gång fångades det av att någon mätte, aldrig av att bygget
  larmade. Märks tidigt genom att skripten i 2A och 2B skriver ut sina framräknade
  värden och att avvikelse mot arkitekturens förväntade utfall **stoppar** paketet.
- **Alfa-steget görs i fel ordning.** Sker `resize` före alfaberäkningen trappas
  kanterna. Märks tidigt genom att ikonen öppnas mot två olika bakgrunder i 2B —
  fyrkant betyder fel alfa, taggiga kanter betyder fel ordning.
- **Headerns höjd glider efter ombyggnaden.** Ikon plus textnod är nytt innehåll i
  headern, och fynd 4 visar att höjden har haft två sanningar. Märks tidigt genom
  att renderad höjd mäts i 2B, inte genom att ankarhoppen ser ungefär rätt ut.
- **`validate-data.mjs` faller på filer som inte finns än.** Skriptet skapas i
  paket 4 men kontrollerar filer från paket 5 och 6, och det är inkopplat i
  `build` — så felet skulle slå ut hela byggnationen. Samma fel som redan
  inträffat med `optimize:images`. Märks tidigt genom att den öppna punkten måste
  vara avgjord **innan** paket 4 startar, och genom att varje script körs före
  överlämning.
- **Valideringsskriptet finns men fäller ingenting.** Ett script som bara skriver
  "OK" är värre än inget, för det invaggar i trygghet. Märks tidigt genom att
  verifieringen kräver att varje enskild kontroll demonstreras på medvetet trasig
  data i scratch-katalogen.
- **Skills-datan hamnar fel.** Om kategorier eller tillstånd bakas in i
  komponentkod kan Jelal inte fylla i själv, och briefens viktigaste krav är
  missat. Märks tidigt genom verifieringen i paket 4: tänd ett skill och bekräfta
  att bara `skills.js` ändrats.
- **93 pills dominerar sidan.** Märks tidigt vid visuell kontroll på 360 px med
  det längsta faktiska skill-namnet.
- **2B drar in paket 7:s tillgänglighetsarbete.** Skip-länk och `aria-current`
  ligger nära headern och lockar. Märks tidigt genom att "ingår INTE" i 2B namnger
  dem, och genom att en `useEffect` före paket 7 ska betraktas som ett fynd.
- **Leverans 1 river upp det som är stängt.** Monogram-valet, accentfärgen och den
  mörka basen är beslutade av Jelal eller uppmätta. Motmedel: tabellen över öppet
  och stängt presenteras tillsammans med sidan, i stället för en öppen fråga.
- **`ARKITEKTUR.md` motsäger sig själv på två ställen** — hero-postens `label`, och
  avsnittet om bildoptimering som fortfarande säger "Loggan rörs inte — den är
  redan liten nog enligt PLAN.md" trots att samma dokument beslutar att en
  monogram-ikon ska härledas ur den. Byggaren följer dokumentet bokstavligt, så en
  motsägelse blir ett godtyckligt val i koden. Märks tidigt genom att båda är
  flaggade här och ska redas ut av arkitekten, inte av byggaren.
- **Scope-glidning.** "Resten fixar vi med vägen" kan bli att allt byggs samtidigt
  och inget blir verifierat. Motmedel: stopp-punkten efter paket 3 står kvar, och
  granskaren körs efter 2A och 2B var för sig.
