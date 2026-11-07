# Plan: Modernisera portfolion enligt `UPPDRAG-2026-11-07.md` — mörk, lugn premiumdesign, nya projektkort med filter, utan att bryta sidan

Skriven 2026-11-07, **uppdaterad samma dag efter G1** (EJ GODKÄND, sju fynd) och
arkitektens beslut R1–R6. **Denna omgång (paket P1–P17) står först.** Den tidigare
omgången (paket A–M, innehållsuppdraget 2026-10-07) står **oförändrad** längre
ner i filen, under rubriken "Plan: Byt innehållet i hero ...". Där har jag bara
markerat de paket som är avslutade.

Uppdraget står i **`UPPDRAG-2026-11-07.md`** i projektroten. **Avsnittet "Jelals
beslut (2026-11-07)" är bindande och går före uppdragstexten** där de krockar.
Kort:

1. Inga detaljsidor, ingen routing. Hela kortet länkar till `liveUrl` i ny flik,
   annars till `githubUrl`; saknas båda är kortet ingen länk.
2. Bara Awle i datan. Inga platshållarprojekt. Filter, räknare och grid ska ändå
   fungera för många projekt.
3. Före-läget är commit `6154c9d`. Skärmdumparna i 1280 och 360 px är redan tagna
   av samordnaren.
4. Den nya designen gäller. Krockande beslut i `ARKITEKTUR.md` skrivs om och
   märks upphävda **på sin egen plats**. Grindarna `validate-data`,
   `validate-tokens` och teckensnittstäckningen **behålls och anpassas**.
5. Awle: byggt under LIA hos Pixl Media, kategori Fullstack, status Live, tekniker
   Next.js, React, TypeScript, Supabase, TanStack Query, Zod.

Prefixet **P** används för att inte krocka med bokstäverna A–M i den förra
omgången eller med "paket 1–8" som `ARKITEKTUR.md` och `LARDOMAR.md` hänvisar
till. Paketen efter G1 heter **G1-kommentarerna** och **G1-rättningen**, det
senare med arkitektens namn ur `ARKITEKTUR.md`.

---

## Status efter G1 (2026-11-07)

| Paket | Läge |
|---|---|
| P1 | **Klart.** Besluten M1–M18 står i `ARKITEKTUR.md` |
| P2, P3, P4, P5, P6, P7 | **Byggda.** P5 byggdes i tre omgångar (omgång 2 enligt M10b) |
| P4b | **Byggt.** Följdpaket enligt M8b: de öppna markeringarna från P3 och P4, och hover enligt M7 |
| G1 | **Genomförd: EJ GODKÄND, sju fynd** (`LARDOMAR.md`, posterna daterade 2026-11-07) |
| G1-kommentarerna | **Klart.** Fynd 1–2: de falska kommentarerna och den kvarglömda markeringen |
| G1-rättningen | **Pågår** (byggaren arbetar med den). Fynd 3–7 enligt R1–R6 |
| P8–P17 | Ej startade. **P8 startar inte förrän G1-rättningen är godkänd** |

"Byggt" betyder att byggarens verifiering är gjord. **Inget av P1–P7 är godkänt
förrän G1-rättningen är godkänd**, eftersom G1 underkände dem som helhet.

---

## Lärdomar som gäller här

Varje "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar denna omgång
konkret:

**Nya efter G1 (posterna 2026-11-07), och vad de gör med planen:**

- **2026-11-07 (ÅTERFALL), `profile-export-saknas` stod kvar: ett uppskjutet
  beslut ska vara en punkt i `Ingår:` hos det paket som kommer efter villkoret,
  aldrig en bisats i `ARKITEKTUR.md`.** → Därför har P9, P10 och P12 nu var sin
  `Ingår:`-punkt för de tokens R5 skjuter upp, och P10 en för `index` (R1). Och
  därför kör **varje** byggpaket från och med G1-rättningen, före överlämning, för
  varje `OPEN-KEY: <nyckel>` i `src/` och `scripts/`: `grep -c "<nyckel>"
  ARKITEKTUR.md`. Varje träff större än 0 tas bort i samma ändring.
- **2026-11-07, sex tokens utan konsument: ett token deklareras i samma paket som
  dess första `var()`-konsument, aldrig tidigare.** → M5h gör det till en grind i
  G1-rättningen. P9, P10 och P12 deklarerar sina tokens själva och måste klara
  den grinden.
- **2026-11-07 (ÅTERFALL), moderniseringen gjorde fem kommentarer falska.** →
  Varje paket som ändrar ett token, ett grid-spår eller lägger till en användare
  av en global klass kör `grep -rn "<tokennamn>\|<klassnamn>\|[0-9]\+ px" src` och
  skriver om tal, antal och uppräkningar i kommentarer till invarianter. Gäller
  särskilt P10, som gör `.reveal` till global klass och lägger till tre tokens.
- **2026-11-07, logo-brickans fasta höjd: ett element med fast `height` och text ur
  `src/data/` anger sitt överflöde, och syntessträngsprovet mäter
  `scrollHeight <= clientHeight`.** → R3 i G1-rättningen. Gäller också segment,
  chips och sökfält i P8–P9 och nyckeltalen i P12 om de får fast höjd.
- **2026-11-07, en slug som krockar med sidans egna id passerar: varje värde ur
  `src/data/` som blir `id` valideras mot alla id sidan sätter.** → R2 i
  G1-rättningen. Efter den gäller att **varje fast id i en komponent är en
  `*_ID`-export i `sections.js`**. P8 och P9 får inte införa ett fast id på annat
  sätt.
- **2026-11-07, grinden på rotens `clientWidth` larmade av fel skäl: "layouten
  flyttar sig inte" mäts på layoutens egna rektanglar.** → R4 i G1-rättningen, och
  samma metod i P15.
- **2026-11-07 (ÅTERFALL), A4:s deklaration pekade på fel element: en signatur
  anges med det paket där varje parameter får sin första konsument.** → `index`
  läggs till i `ProjectCard` i P10, inte tidigare.

**Sedan tidigare:**

- **Breda agentuppdrag hänger sig (projektets minne).** Därför 17 små paket i
  stället för 8 breda. Varje byggpaket rör en sektion eller en mekanism, och varje
  paket lämnar en sida som går att öppna i webbläsaren.
- **Granska hårt vid leverans, inte efter varje paket (Jelals önskemål, projektets
  minne).** Två granskningspunkter: **G1 efter P7** (projektkortet) och **G2 vid
  slutleveransen (P16)**. Övriga paket avslutas med byggarens egen
  verifieringslista och grönt `npm run build`. Det avviker från CLAUDE.md:s "kör
  alltid granskare" och är Jelals uttryckliga val. **Undantag efter G1:**
  G1-rättningen godkänns genom en **smal** efterkontroll av granskaren, bara mot
  fynd 1–7 och R1–R6, inte en ny hel granskning.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), arbetsträdet fryses under granskning.**
  `GRANSKNING-PAGAR` skapas före G1, efterkontrollen och G2, och raderas när
  rapporten är levererad. Inget P-paket byggs medan filen finns.
- **2026-10-02 (ÅTERFALL ×3), överspelade stycken i `ARKITEKTUR.md`.** Beslut 4
  upphäver mycket: färgtokens, Didact Gothic och "en enda vikt", A11 (ingen
  animation), A3 (inga ikoner), A5 (knappstilarna), A6 (kortet och rutnätet) och
  `.surface-light`. **Varje sådant stycke märks `UPPHÄVT` eller skrivs om på sin
  egen plats i P1**, inte bara i ett nytt avsnitt. Annars implementerar nästa
  byggare det gamla.
- **2026-10-02, ARKITEKTUR.md beskrev verktyg och filer som inte finns.**
  Lighthouse finns inte i `package.json`, och typsnittsfilerna finns inte i
  repot. **P1 får inte namnge ett verktyg eller en fil utan att ha kontrollerat att
  det finns.**
- **2026-10-02, headerns höjd har två sanningar.** Den svävande pill-naven ändrar
  headerns höjd och lägger till ett avstånd från toppen. `scroll-margin-top` och
  den uppmätta navhöjden får inte glida isär. → P3 mäter detta.
- **2026-10-02 (ÅTERFALL), 360 px-golvet spricker genom grid och flex.** Varje
  ny grid- eller flex-behållare med text (kortgrid, filterpanel, segmentrad,
  chipsrad, kontaktens två kolumner, footerns kolumner, nyckeltalsraden) kräver
  `minmax(0, 1fr)` eller `min-width: 0` **och** `overflow-wrap: anywhere`.
  Golvet mäts med programmatiskt insatt syntessträng, aldrig med dagens korta
  text, och mot **behållarens egen** bredd.
- **2026-10-08, mätvillkoret för rullningslisten.** Varje bredduppmätning anger
  sitt rullningslistvillkor. Ingen `--flagga=false`.
- **2026-10-02, sektions-id som bokstavlig sträng i `.jsx`, och länk bara om
  målet finns.** Nav-CTA:n "Kontakta mig", navlänkarna och sektionsetiketterna
  hämtar id och antal ur `src/data/sections.js`. En länk till ett id renderas
  bara om sektionen renderas.
- **2026-10-02, sidans enda `<h1>` och `label`.** `label` används bara till
  navlänk och `<h2>`. Eyebrow "PORTFOLIO" och `h1` bor i hero. Sektionsetiketten
  "01 / 04 · PROJEKT" räknas ur listan, inte skrivs.
- **2026-10-02 + 2026-10-05, datadrivet.** Nya fält i projektdatan
  (kategori, status, nya länknamn) är obligatoriska eller valfria **enligt
  typedefen**, och varje obligatoriskt fält får en egen grind prövad med tre
  värden: borttaget, `''` och `'   '`. OK-radens antal är antalet kort som
  faktiskt renderas. Räknarna i filtret räknas ur data, aldrig skrivs.
- **2026-10-05, ett löfte i en fil Jelal redigerar får aldrig vara osant.**
  Kommentaren överst i `projects.js` beskriver i dag sju fält och fältnamnen
  `id`, `url` och `repoUrl`. Den skrivs om i samma paket som datamodellen byts.
- **2026-10-05, mät artefakten, inte deklarationen — teckengrinden.** Med tre
  typsnittsfamiljer räcker det inte att mäta en fil. Grinden ska läsa `cmap` ur
  **varje** woff2-fil och läsa **alla** `@font-face` (`matchAll`).
  **Laddas typsnitten från Google CDN finns ingen fil att mäta**, och då slutar
  grinden mäta artefakten. Det är skälet till att typsnittsladdningen är beslut
  nummer ett för arkitekten.
- **2026-10-05, en grind som fälls av fel skäl lär oss att ignorera den.** När
  grindarna anpassas ska det stå skrivet vilken legitim ändring som får fälla dem.
  Svaret ska vara "ingen". Varje anpassad grind prövas med tre indata: korrekt,
  felaktigt och den åtgärd felmeddelandet föreskriver.
- **2026-10-08, kontrast: tokennamnet är ingen motivering.** Varje nytt texttoken
  (`--ink`, `--ink-muted`, `--ink-subtle`, mörk text på `--accent`) bär sin
  uppmätta kvot mot **varje** bakgrund det faktiskt används på, i lärdomens
  format. `--ink-subtle` hamnar både på `--surface` och möjligen på `--surface-2`.
  Det ska mätas, inte antas.
- **2026-10-05 + 2026-10-08 (ÅTERKOMMANDE 3+), kodkommentarer.** Kommentarerna
  beskriver invarianten, aldrig ett uppmätt tal, aldrig vad `ARKITEKTUR.md`
  säger och aldrig en uppräkning av ett block i en annan fil. **Varje paket i
  denna omgång skriver om stora delar av CSS-filerna, så varje paket läser om
  hela kommentarsblocket kring det det ändrar.** Det gäller särskilt
  `Projects.jsx`, `tokens.css` och `fonts.css`, som i dag bär långa kommentarer om
  `.surface-light` och om "en enda vikt".
- **2026-10-05 (ÅTERKOMMANDE 3+), `EJ I ARKITEKTUR`-markeringar.** Varje värde
  byggaren väljer utan stöd i `ARKITEKTUR.md` märks med frågan, utan beskrivning
  av dokumentet. En besvarad fråga tas bort i samma ändring.
- **2026-10-05, deklarationer i `ARKITEKTUR.md` skrivs tecken för tecken.**
  Uppdragets tokens och mått är exakta. Skriver P1 ut dem som deklarationer ska
  koden innehålla exakt dem, och byggaren svarar med `fil:rad`.
- **2026-10-02, bilder.** Källbilder ligger aldrig i `public/`. Projektbilden ska
  vara webp med `width`/`height`. Varje paket som rör bilder mäter `dist/`, bundet
  till ett färskt bygge (2026-10-05).
- **2026-10-02 + 2026-10-05, servrar.** Porten mäts med `netstat` före start och
  efter stopp, och servern stoppas via PID. Raden klistras in i överlämningen.
- **2026-10-05, negativ kontroll.** Smalaste selektorn, vilket element som bar
  avvikelsen, och att larmet upphörde.
- **2026-10-05, vaktrader.** Kopierar byggaren vaktrader från de gamla korten
  till de nya ska de tvingas fallera i den nya layouten, annars skrivs
  kommentaren om.

---

## Status för den tidigare omgången (A–M) — och vad som händer med det som är öppet

| Paket | Läge |
|---|---|
| A, B, K, D, E | Klara sedan tidigare (se tabellen i förra omgången) |
| F | **Klart**, `34aaf79` |
| M | **Klart**, `63d0207` |
| J | **Klart**, `e0899bb` |
| C | `a175b4a` skrev ner en lärdom från C:s mätning. Att alla sex raderna redovisades kan jag inte bekräfta ur repot. **Markeras inte som klart.** |
| LEVERANS, G, L, H | **Ej genomförda.** |

**Mitt förslag** för de fyra öppna. Samordnaren eller Jelal bekräftar det innan
P2 startar:

- **LEVERANS och G** körs inte separat. De skulle granska hero, kort och
  kompetenser som denna omgång skriver om. **G:s kontrollpunkter för filer som
  inte skrivs om** (Om mig, `validate-data.mjs`:s skills-grindar,
  `UPPDRAG-2026-10-07.md`:s oförändrade tecken) tas med i **G1**.
  Frågorna från förra LEVERANS-avsnittet som fortfarande gäller (Hem och Ekonomi,
  LinkedIn, granskningsrytmen) ställs vid **P16**.
- **Heros fyra `EJ I ARKITEKTUR`-markeringar** (`sizes`, `alt`, `.inner`,
  `contrast(1.05)`) ligger i filer som **P5** skriver om. De avgörs därför av
  arkitekten i **P1**, och genomförs och tas bort i **P5** i samma ändring. Det
  ersätter förra planens "rundan vid LEVERANS, genomförande i L" för just dessa
  fyra.
- **L** (`OPEN-KEY`-grinden) körs **efter P16**, av samma skäl som förut: en ny
  grind i `build` mitt i omgången ger varje pakets verifiering ett rött bygge som
  inte hör till paketet.
- **H** (GUIDE.md) slås ihop med **P17**. GUIDE:s projektkapitel blir ändå fel
  när datamodellen byts i P6.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| P1 | ~~Arkitekturbesluten för moderniseringen, och upphävning av de gamla besluten på sin egen plats~~ **KLART** (M1–M18) | arkitekt | Varje beslut i listan "Beslut arkitekten måste fatta" nedan står i `ARKITEKTUR.md` med det paket som genomför det, och varje upphävt stycke är märkt på sin plats |
| P2 | ~~Tokens och de tre typsnitten, med teckensnitts- och tokengrinden anpassade~~ **BYGGT** | byggare | Hela sidan renderas i de nya färgerna och typsnitten, och båda grindarna har larmat och tigit |
| P3 | ~~Navigering, dator: svävande pill-nav, logga, länkar, aktiv understrykning, CTA~~ **BYGGT** | byggare | Naven svävar, aktiv länk följer scrollen och ankarhoppen landar under naven |
| P4 | ~~Navigering, mobil: hamburgermeny med fullskärmspanel~~ **BYGGT** | byggare | Panelen öppnas och stängs med mus, tangentbord och Esc, och fokus hanteras |
| P4b | ~~Följdpaket enligt M8b: de öppna markeringarna från P3 och P4, och hover enligt M7~~ **BYGGT** | byggare | Varje markering i M8b:s tabell är borttagen eller genomförd enligt sin rad, med M8b:s mätningar redovisade |
| P5 | ~~Hero: eyebrow, h1, ingress, orange glöd och porträtt~~ **BYGGT** (tre omgångar) | byggare | Hero följer uppdragets typografi, ett `h1`, heros fyra markeringar avgjorda och borttagna |
| P6 | ~~Projektdatan: ny modell, Awle enligt beslut 5, `validate-data` anpassad~~ **BYGGT** | byggare | Den nya modellen valideras med tre värden per obligatoriskt fält, och det befintliga kortet visar Awle |
| P7 | ~~Projektkortet och kortgriden 3/2/1 (hela kortet en länk, logo-bricka, statusbadge, hover, fokus)~~ **BYGGT** | byggare | Kortet följer uppdragets mått, länkar enligt beslut 1 och håller 360 px |
| **G1** | ~~**GRANSKNINGSPUNKT 1: hård granskning av P1–P7**, och Jelal ser sidan~~ **GENOMFÖRD: EJ GODKÄND, sju fynd** | granskare (+ samordnare visar) | Fynden i `LARDOMAR.md`, fynden åtgärdade eller uppskjutna av Jelal |
| G1-kommentarerna | ~~Fynd 1–2: de falska kommentarerna och den kvarglömda markeringen~~ **KLART** | byggare | Kommentarerna beskriver invarianter, och markeringen är borta |
| **G1-rättningen** | **Fynd 3–7 enligt arkitektens R1–R6: tio filer, se eget avsnitt. PÅGÅR** | byggare, sedan granskare (smal efterkontroll) | Varje mätpunkt i avsnittet redovisad, och granskaren har bekräftat fynd 1–7 som åtgärdade. **P8 startar först då** |
| P8 | Filterpanel del 1: segmentkontrollen med räknare och live-raden | byggare | Segmenten filtrerar på klientsidan, antalen och live-raden räknas ur data |
| P9 | Filterpanel del 2: teknik-chips och sökfältet, och `--radius-chip` (R5) | byggare | Chips och sök samverkar med segmentet, tomt resultat har ett tydligt läge, och tokengrinden tiger |
| P10 | Animationer: scroll-reveal, stagger på korten, in-/uttoning vid filtrering, `prefers-reduced-motion`, tre reveal-tokens (R5) och `index` i `ProjectCard` (R1) | byggare | Reveal fungerar, med reducerad rörelse finns ingen transform eller transition kvar, och tokengrinden tiger |
| P11 | Numrerade sektionsetiketter och kompetenserna i filterchipsens stil | byggare | Etiketterna räknas ur `sections.js`, och kompetenschipsen har samma stil som filterchipsen |
| P12 | Nyckeltalsraden, och `--text-figure` (R5) | byggare | Varje tal är härlett ur data eller givet av Jelal, inget är påhittat, och tokengrinden tiger |
| P13 | Kontakt: två kolumner, uppgifter till vänster och formuläret i en panel till höger | byggare | Formuläret (inklusive hCaptcha) fungerar som före, och layouten håller 360 px |
| P14 | Footer: logga, tagline, länkkolumner, copyright, avdelare | byggare | Länkar renderas bara när adressen finns, och kontrasten är mätt |
| P15 | Slutkontroll: 360 px, kontrast AA, tangentbord, Lighthouse, före/efter, fillista | byggare | Alla mätserier redovisade som upprepbara kriterier. **P15 bygger ingenting.** |
| **P16** | **GRANSKNINGSPUNKT 2 och LEVERANS: hård granskning av hela omgången, och Jelal ser före/efter** | granskare, sedan projektledare | Fynden i `LARDOMAR.md`, Jelal har sett jämförelsen och svarat på de öppna frågorna |
| P17 | Dokumentation: README, GUIDE.md (projektdatan och övrigt, tidigare paket H), listan över ändrade filer | dokumentator | Guiden är **genomspelad**: att lägga till ett projekt enligt den ger grönt bygge |

Därefter, utanför denna omgång: **paket L** från förra omgången.

### Ordning och beroenden

P1 → P2 → P3 → P4 → P4b → P5 → P6 → P7 → **G1** → G1-kommentarerna →
**G1-rättningen** → P8 → P9 → P10 → P11 → P12 → P13 → P14 → P15 → **P16** → P17.

- **P1 blockerar allt.** Ingen byggare startar på ett beslut som inte är fattat.
- **P2 före allt annat bygge**, eftersom varje senare paket använder de nya
  tokens och typsnitten.
- **P4 efter P3**, eftersom de delar header-komponenten. Två paket som skriver i
  samma fil samtidigt går inte att läsa isär. **P4b efter P4**, av samma skäl.
- **P6 före P7.** Datan och valideringen byts först, med det gamla kortet kvar,
  så att ett fel i datamodellen inte blandas ihop med ett fel i kortets layout.
- **G1-kommentarerna före G1-rättningen.** De rör delvis samma filer
  (`tokens.css`, `validate-data.mjs`). Två agenter i samma fil går inte att läsa
  isär (arkitektens förutsättning i "Exakt vad G1-rättningen ändrar").
- **G1-rättningen blockerar P8.** P8 startar inte förrän G1-rättningen är
  godkänd. Filtret bygger på kortet, och kortet ska vara rättat först.
- **P10 efter P9.** Uttoningen vid filtrering behöver filtret, och reveal ska
  gälla de färdiga sektionerna.
- **P12 är blockerat av Jelals svar** om ett nyckeltal kräver uppgifter om honom
  (se P12). P13 och P14 kan köras före P12 om svaret dröjer.
- **P15 efter allt bygge, P16 efter P15.** P16 kräver `GRANSKNING-PAGAR`.

**Körbart tidigt:** efter P2 syns de nya färgerna och typsnitten på hela sidan.
Efter P3 syns naven, efter P5 hero, och efter P7 de nya korten. G1 är första
gången Jelal visas något. Vill han se sidan tidigare kan samordnaren visa den
efter vilket paket som helst, utan granskning.

---

## Öppna punkter utan paket

- **Hero-bakgrundsbild — väntar på Jelals besked och bild.** Jelal funderar på en
  bakgrundsbild i hero, i 4K. Inget är beslutat. Inget paket planeras, och ingen
  agent hämtar eller skapar en bild, förrän Jelal har gett besked och bilden.

---

## Beslut arkitekten måste fatta i P1 innan bygget börjar

Varje beslut skrivs in i `ARKITEKTUR.md` **tillsammans med det P-paket som
genomför det**. Upphävda stycken märks på sin egen plats i samma redigering.

1. **Hur typsnitten laddas: självhostade woff2 eller Google CDN.** Avvägningen
   gäller teckensnittsgrinden (`scripts/font-coverage.mjs` och
   `validate-data.mjs`), som mäter `cmap` i filen. Med CDN finns ingen fil att
   mäta. Den gäller också Lighthouse (render-blocking, extern anslutning,
   `font-display`) och den nuvarande principen "noll externa anrop i runtime"
   i `fonts.css`. Arkitekten avgör också:
   - vilka vikter som laddas per familj. Urbanist 600 och 700, Manrope 400, 600 och
     700 (eyebrown är 700) och JetBrains Mono 400 enligt uppdraget. Variabla eller
     statiska filer?
   - vilka delmängder som laddas (latin räcker för svenska?), och om någon fil
     ska preloadas.
   - hur grinden mäter mot **rätt** familj. Mono-texten är taggar och tekniknamn,
     Urbanist är rubriker och Manrope är brödtext. Ska varje tecken i `src/data/`
     finnas i alla filer, eller bara i den familj texten renderas i?
   - var filerna kommer ifrån. Agenterna hämtar inget som inte är
     beslutat, och P1 namnger ingen fil som inte finns.
   - att "en enda vikt" och Didact Gothic märks upphävda i `ARKITEKTUR.md`, och
     vilket paket som skriver om kommentaren i `fonts.css` (P2).
2. **`.surface-light`.** I dag ligger projektsektionen på en ljus yta med
   ombundna tokens. Den nya designen är genomgående mörk. Tas klassen bort helt,
   eller behålls den för något? Vad händer med kontrollerna i
   `validate-tokens.mjs` som rör den, och med kommentarerna som nämner den
   (`Projects.jsx`, `tokens.css`, `ProjectCard.module.css`, `About.module.css`,
   `Contact.module.css`, `ContactForm.module.css`)?
3. **Den nya datamodellen för projekt.** Uppdragets modell (`slug`, `title`,
   `category`, `status`, `description`, `tech`, `image`, `logo?`, `liveUrl?`,
   `githubUrl?`) mot dagens (`id`, `url`, `repoUrl`). Arkitekten avgör:
   - byts fältnamnen eller behålls de? Det påverkar `validate-data.mjs`,
     `optimize-project-images.mjs`, `GUIDE.md` och kommentaren i `projects.js`.
   - vilka värden `status` och `category` får ha. Uppdraget nämner "Live",
     "Skolprojekt" och "Arkiverad". Vilka är tillåtna, och vilken färg har pricken
     för respektive?
   - om `logo` är ett bildnamn eller text, och vad logo-brickan visar när det
     saknas (uppdraget: projektets namn).
   - att länkregeln i beslut 1 (live, sedan GitHub, sedan ingen länk) är **en**
     regel på **ett** ställe.
4. **Projektbildens format.** Uppdraget kräver 4:3 och webp. Dagens källbild är
   16:10. Beskärs den, och hur? Ändras `PROJECT_IMAGE_WIDTHS` och
   `optimize-project-images.mjs`? Får kortet `loading="lazy"` även när det ligger
   ovanför vikningen? Det påverkar LCP i Lighthouse.
5. **Tokennamnen.** Uppdragets namn (`--bg`, `--ink` och så vidare) ersätter
   dagens `--color-*`, eller mappas de? Det ena kräver att varje modul skrivs om i
   P2, det andra ger två namn för samma sak. Vad gör `validate-tokens.mjs` med
   gamla namn som blir kvar?
6. **Headerns höjd med svävande nav.** Hur `--header-height` och
   `scroll-margin-top` räknar in avståndet på 16 px från toppen, och var
   navhöjden låses (LARDOMAR 2026-10-02). Även naven `z-index`, och hur
   `backdrop-filter` beter sig där det inte stöds.
7. **Aktiv länk.** Dagens `aria-current`-observer behålls som mekanism, och den
   orange understrykningen läggs på den. Bekräftas eller ändras.
8. **Mobilmenyn.** Från vilken bredd hamburgermenyn tar över, fokusfälla i
   panelen, Esc, scroll-lås på sidan bakom, och om CTA:n ligger i panelen.
9. **Ikonerna: förstoringsglaset, hamburgern och stängkrysset.** A3 sa "inget nytt
   beroende". Inline-SVG eller något annat? A3 märks upphävt eller ändrat.
10. **Heros texter.** Uppdraget ger h1 som "t.ex." och kräver eyebrow
    "PORTFOLIO". De nuvarande texterna är Jelals exakta från 2026-10-07 (paket B).
    Behålls de, eller byts h1? **Är det oklart frågar arkitekten Jelal och
    bestämmer det inte själv.** Avgör också heros fyra öppna markeringar (`sizes`,
    `alt`, `.inner`, `contrast(1.05)`) med P5 som genomförare.
11. **Filtrets regler.** Hämtas teknik-chipsen ur projektdatan (då kan ingen chip
    ge noll träffar) eller är de en fast lista som i uppdragets exempel (React
    Native, C#, Blazor och så vidare, som inget projekt har i dag)? Visas segment
    med antal 0? Hur kombineras segment, flera chips och sök (OCH/ELLER)? Vad visas
    vid noll träffar? Är `aria-live` på live-raden önskat, och hur ofta läses den
    upp?
12. **Animationerna.** A11 ("ingen animation") upphävs av beslut 4. Var
    `.reveal` sätts, vad som händer utan JavaScript (innehållet får aldrig förbli
    osynligt), staggerns tak när det finns många kort, hur kort tonas ut och
    in vid filtrering, och vad `prefers-reduced-motion` stänger av, inklusive
    befintlig `scroll-behavior: smooth`.
13. **Sektionsetiketterna.** Formatet "01 / 04 · PROJEKT" räknas ur
    `sections.js`. Om hero räknas med, och vad etiketten läses upp som för
    skärmläsare.
14. **Nyckeltalen.** Vilka tal som visas. "Antal projekt" och "antal teknologier"
    kan härledas ur data. **"År i branschen" är en uppgift om Jelal** som ingen
    agent får hitta på (förra omgången: inget om hans bakgrund får läggas till).
    Antingen avstår vi från det talet, eller så ger Jelal det.
15. **Kompetenschipsen.** Om de byter till filterchipsens stil (radie 3 px,
    `--line-strong`, mono 12 px) och vad det gör med A6 och `SkillChip`.
16. **Kontakt och footer.** Vilka uppgifter som står till vänster i kontakten
    (ur `contact.js`). Footerns länkkolumner: Jelal har tidigare sagt "Ta bort
    github", och `contact.js` har GitHub som `null`. Med datadriven rendering
    försvinner länken av sig själv. Bekräftas.
17. **Slutkontrollens verktyg.** Hur Lighthouse körs (det finns inte i
    `package.json`; ett nytt devberoende eller en befintlig Chrome?), och med vilka
    inställningar (mobil/desktop, throttling) siffran 90+ ska gälla. Verifieras i
    miljön innan det skrivs in.
18. **Maxbredd och sidmarginal.** Uppdraget anger cirka 1180 px och 24 px på
    mobil. Dagens `--content-max` och `--content-padding` byts, och i så fall i
    P2.

---

## P1 — Arkitekturbesluten (KLART)

**Agent:** arkitekt. **Förutsättning:** ingen. **Blockerar:** allt.

**Mål:** att varje beslut byggarna behöver finns i `ARKITEKTUR.md` innan någon
kod skrivs, och att de gamla besluten som krockar är märkta på sin egen plats.

**Ingår:**
- De arton besluten ovan, vart och ett med det P-paket som genomför det.
- Upphävning **på sin egen plats** av varje stycke som beslut 4 ersätter: färger,
  Didact Gothic och "en enda vikt", `.surface-light`, A3, A5, A6, A11 och
  korttexterna om 16:10.
- Tabellen över upphävda strängar kompletteras med de gamla tokennamnen och
  typsnittsnamnet, om de upphävs, så att ett återfall fälls.
- Varje deklaration som byggaren ska skriva tecken för tecken står utskriven.

**Ingår INTE:**
- Kod, data eller annan fil än `ARKITEKTUR.md`.
- Texter om Jelal. Hero-h1, Awles beskrivning och "år i branschen" är Jelals.
  Behövs de ställer arkitekten frågan.
- Att ta bort en grind.

**Godkänt när:**
1. Varje av de arton besluten går att peka ut med avsnitt, och varje avsnitt
   namnger sitt P-paket.
2. Sökning i `ARKITEKTUR.md` på `Didact`, `surface-light` och varje gammalt
   tokennamn som upphävs ger noll träffar utanför ett `UPPHÄVT`-stycke.
   Sökningen klistras in i överlämningen.
3. Varje verktyg och varje fil som namnges är kontrollerad i miljön, och
   kontrollen är redovisad.
4. `git status` visar endast `ARKITEKTUR.md` ändrad.
5. `npm run build` är fortfarande grön. Inget i koden har rörts.

---

## P2 — Tokens och typsnitt (BYGGT)

**Agent:** byggare. **Förutsättning:** P1 (beslut 1, 2, 5, 18).

**Mål:** hela sidan renderas i den nya färgpaletten och de tre typsnitten, med
oförändrad layout. Det är det första körbara steget.

**Ingår:**
- Uppdragets tokens i `tokens.css` enligt beslut 5, inklusive radier, easing,
  duration och skugga.
- De tre familjerna enligt beslut 1, och grundtypografin: brödtext, rubriker,
  mono och eyebrow som återanvändbar stil.
- Teckensnittsgrinden anpassad till flera filer och familjer, och
  `validate-tokens.mjs` anpassad till de nya namnen.
- `.surface-light` enligt beslut 2.
- Kommentaren i `fonts.css` och tokenkommentarerna omskrivna till invarianter.
- Kontrastkvoten skriven vid varje texttoken, mot varje bakgrund det används på.

**Ingår INTE:**
- Layoutändringar i någon sektion: nav, hero, kort, filter och så vidare. Det
  enda som ändras visuellt är färg, typsnitt och grundgrader.
- Animationer.

**Godkänt när:**
1. `npm run build` grön. Alla sektioner renderas i webbläsaren utan att någon
   försvunnit (antalet `section[id]` lika före och efter).
2. Teckensnittsgrinden redovisad med **tre indata per fil**: korrekt (tyst), ett
   tecken som saknas i filen (larm med fil och tecken), åtgärden (tyst). Och med
   ett extra `@font-face` i en isolerad kopia som bevis på att alla läses.
3. Tokengrinden: ett påhittat tokennamn larmar med fil och rad, och tiger när det
   rättats.
4. Det står skrivet vilken legitim ändring som får fälla respektive grind.
   Svaret är "ingen".
5. Varje `color:`-användning av ett texttoken listad, med uppmätt kvot mot den
   faktiska bakgrunden och den renderade px-storleken, och ≥ 4,5:1 (3:1 bara vid
   ≥ 24 px eller 18,66 px fet).
6. Typsnitten är verkligen laddade. Det mäts i webbläsaren att respektive familj
   används (`document.fonts`), inte att reservtypsnittet syns.
7. `du -sh dist` och de tre största filerna redovisade efter ett färskt bygge.
8. `grep` på de gamla tokennamnen och typsnittsnamnet i `src/` och `scripts/` ger
   noll träffar som inte är upphävningsmarkeringar.

---

## P3 — Navigering, dator (BYGGT)

**Agent:** byggare. **Förutsättning:** P2, beslut 6, 7 och 9.

**Mål:** den svävande pill-naven på bred skärm.

**Ingår:** pill-formen med uppdragets mått, avstånd, bakgrund och blur, och
JQ-loggan till vänster. Länkarna Projekt, Kompetenser, Om mig och Kontakt kommer ur
`sections.js`. Aktiv länk får orange understrykning via befintlig
`aria-current`-mekanism. CTA "Kontakta mig" med uppdragets mått, länkad till
kontakt-id:t ur konstanten.

**Ingår INTE:** mobilmenyn (P4). Hero och övriga sektioner.

**Godkänt när:**
1. Naven ligger 16 px från toppen och följer med vid scroll (mätt på
   rektangeln vid scroll 0 och vid scroll till sidans botten).
2. Navens renderade höjd plus avstånd stämmer med det `--header-height` och
   `scroll-margin-top` räknar med enligt beslut 6. Varje ankarhopp landar med
   sektionens överkant **under** navens underkant, mätt för alla fyra sektioner.
3. CTA:n mätt till höjd 40 px. Kontrasten mellan mörk text och `--accent` mätt
   och ≥ 4,5:1.
4. Inget sektions-id står som bokstavlig sträng i `.jsx`
   (sökningen ur LARDOMAR redovisad).
5. Tangentbord: Tab når logga, fyra länkar och CTA i ordning, och varje fokus är
   synligt.
6. Inget horisontellt överskridande vid 900, 1280 och 1600 px med en
   syntessträng i en navlänk.
7. `npm run build` grön.

---

## P4 — Navigering, mobil (BYGGT)

**Agent:** byggare. **Förutsättning:** P3, beslut 8 och 9.

**Mål:** hamburgermeny som öppnar en fullskärmspanel under brytpunkten.

**Ingår:** knappen med tillgängligt namn och `aria-expanded`. Panelen med samma
länkar ur `sections.js`. Stängning via kryss, Esc och klick på en länk. Fokus in
i panelen och tillbaka till knappen. Scroll-lås enligt beslut 8.

**Ingår INTE:** ändringar i dator-naven utöver det som krävs för att dölja den
under brytpunkten.

**Godkänt när:**
1. Vid 360 × 640 och 390 × 844: panelen täcker vyporten och alla länkar syns
   utan att något överskrider bredden (med syntessträng).
2. Öppna med Enter/Space, stäng med Esc. Fokus landar på knappen efter stängning,
   prövat med tangentbord och inte med mus.
3. Klick på en länk stänger panelen och hoppar till rätt sektion, som landar under
   naven.
4. Ovanför brytpunkten finns ingen hamburger, och naven från P3 är oförändrad
   (jämförd mätning).
5. `npm run build` grön.

---

## P4b — Följdpaket för header och meny enligt M8b (BYGGT)

**Agent:** byggare. **Förutsättning:** P4, och M8b i `ARKITEKTUR.md`.

**Ingick:** de öppna markeringarna från P3 och P4, avgjorda i M8b, genomförda och
borttagna i samma ändring, och hover på navlänkarna enligt M7 (understrykning i
`--ink`, ingen färgändring). Mätningarna står per rad i M8b:s tabell.

**Ingick INTE:** markeringen `profile-export-saknas`. M8b sköt upp den till efter
P6 utan att ge den ett paket, och det blev G1:s fynd (`LARDOMAR.md` 2026-11-07).
Den är borttagen i G1-kommentarerna, och R6 lägger meddelandets prövning i
G1-rättningen.

---

## P5 — Hero (BYGGT, tre omgångar)

**Agent:** byggare. **Förutsättning:** P2, beslut 10.

**Mål:** heron i den nya formen.

**Ingår:** eyebrow "PORTFOLIO", h1 med uppdragets grad, letter-spacing och
radhöjd på dator och mobil, och ingress i `--ink-muted` med maxbredd 560 px.
Orange glöd från höger kant, porträtt till höger på dator. Heros fyra markeringar
genomförs enligt beslut 10 och tas bort i samma ändring.

**Ingår INTE:** heros knappar, om P1 inte uttryckligen ändrar dem. Andra
sektioner.

**Godkänt när:**
1. Sidan har exakt ett `h1`, och dess text är den beslutade (jämförd tecken för
   tecken mot den fil beslutet pekar på).
2. 360 px-golvet håller mot `#hero`:s egen behållare med syntessträngen i eyebrow,
   h1 och ingress, och med redovisat rullningslistvillkor.
3. Ingressens kontrast mot den **ljusaste** punkten i glöden är mätt och ≥ 4,5:1.
4. Porträttet har `width`/`height` och laddas inte lazy om det ligger ovanför
   vikningen (beslut 4).
5. `grep -rn "EJ I ARKITEKTUR" src` redovisad: heros fyra är borta, och inga nya
   har tillkommit utan att listas.
6. `npm run build` grön.

---

## P6 — Projektdatan (BYGGT)

**Agent:** byggare. **Förutsättning:** P1 beslut 3 och 4.

**Mål:** den nya datamodellen och valideringen, **med det befintliga kortet
kvar**, så att ett fel i datan inte blandas ihop med ett fel i kortet.

**Ingår:** `projects.js` till den beslutade modellen. Awle med kategori
Fullstack, status Live, de sex teknikerna och länkregeln enligt beslut 1.
`validate-data.mjs` med en grind per obligatoriskt fält och en grind för
tillåtna värden på `category` och `status`. Bildskriptet till 4:3 och webp enligt
beslut 4. Kommentaren överst i `projects.js` omskriven så att den stämmer.
Minsta möjliga ändring i dagens kort så att det läser de nya fältnamnen.

**Ingår INTE:** kortets nya utseende (P7). Platshållarprojekt (beslut 2). Att
hitta på text om Awle utöver beslut 5. **Awles beskrivning** säger i dag
"samarbetsprojekt" men inte LIA hos Pixl Media, och uppdraget vill ha 1–2
meningar. Byggaren skriver den text som härleds ur beslut 5 och den nuvarande
texten, och **flaggar den för Jelal** vid G1. Ingen ny fakta.

**Godkänt när:**
1. Varje obligatoriskt fält prövat med borttaget, `''` och `'   '`: larm med
   fil, post och fält. Ett otillåtet `category`- och `status`-värde larmar. Den
   föreskrivna åtgärden får grinden att tiga.
2. OK-raden räknar de projekt som faktiskt renderas.
3. Länkregeln prövad i tre lägen i en kopia: live finns (`target="_blank"` och
   `rel` enligt beslutet), bara GitHub, ingen länk (kortet renderas utan `<a>`).
4. Projektbilden finns som webp i de beslutade bredderna, källan ligger utanför
   `public/`, och `dist/` är mätt efter färskt bygge utan orefererade filer.
5. Ingen förekomst av de gamla fältnamnen kvar i `src/`, `scripts/` eller
   kommentaren i `projects.js`, om de byts.
6. `npm run build` grön, och Awle syns på sidan.

---

## P7 — Projektkortet och kortgriden (BYGGT)

**Agent:** byggare. **Förutsättning:** P6.

**Mål:** kortet så som uppdraget beskriver det. Det är uppdragets viktigaste
del.

**Ingår:** grid 3/2/1 med gap 24 px. Hela kortet som en `<a>` enligt beslut 1.
Mediadelen 4:3 med logo-brickan. Body med kategori, statusbadge med prick,
titel, beskrivning och tekniktaggar. Hover bara på enheter med hover (lyft,
skugga, kant, bildzoom). Synligt fokus.

**Ingår INTE:** filtret (P8–P9). Reveal och stagger (P10). Hovrens transitions
**ingår** här, eftersom de hör till kortet, men de stängs av under
`prefers-reduced-motion` redan nu.

**Godkänt när:**
1. Kolumnantalet mätt på kortens rektanglar vid brytpunkterna och strax under
   dem, med **sex klonade testkort i en kopia** (beslut 2 förbjuder dem i datan)
   för att visa 3/2/1.
2. 360 px-golvet håller mot kortets egen behållare med syntessträng i titel,
   beskrivning, kategori, badge, logo-brickan och en tekniktagg.
3. Kontrast mätt för kategori och tekniktaggar (`--ink-subtle`), beskrivning,
   badge och logo-brickans text mot den faktiska bakgrunden, och ≥ 4,5:1.
4. Tangentbord: kortet nås med Tab, fokusringen är 2 px i accent med offset 2 px
   och syns runt hela kortet (inte klippt av `overflow: hidden`). Enter öppnar
   länken i ny flik.
5. Kortet har ett begripligt tillgängligt namn, inte hela kortets text som en
   länkmening. Att länken öppnas i ny flik framgår för skärmläsare.
6. Bilden har `alt`, `width`, `height` och `loading` enligt beslut 4.
7. Utan hover-stöd (emulerat) sker ingen lyftning.
8. `npm run build` grön.

---

## G1 — Granskningspunkt 1 (efter projektkortet) — GENOMFÖRD, EJ GODKÄND

**Agent:** granskare. Samordnaren visar sidan för Jelal.

**Utfall:** EJ GODKÄND, sju fynd, nedskrivna i `LARDOMAR.md` (posterna daterade
2026-11-07). Fynd 1–2 rättas i **G1-kommentarerna**, fynd 3–7 i
**G1-rättningen** enligt arkitektens R1–R6.

**Ingår:** `GRANSKNING-PAGAR` skapas före start och raderas efter rapporten.
Ändringslistan med datum tas vid start och slut. Hård granskning av P1–P7 mot
`ARKITEKTUR.md`, inklusive kontrollpunkterna ur förra omgångens G för filer som
inte skrivits om (se statusavsnittet). Varje "tecken för tecken" prövas om mot
filen. Varje `EJ I ARKITEKTUR` läses mot dokumentet.

**Godkänt när:** fynden står i `LARDOMAR.md`, och varje fynd är åtgärdat eller
uppskjutet av Jelal. **Fynden räknas som åtgärdade först när G1-rättningen är
godkänd.** Jelal har sett nav, hero och kortet, och har fått frågan om Awles
beskrivning.

---

## G1-kommentarerna — fynd 1–2 (KLART)

**Agent:** byggare. **Förutsättning:** G1:s rapport.

**Ingick:** fynd 1–2 ur G1. De falska kommentarerna (`LARDOMAR.md` 2026-11-07,
"moderniseringen gjorde fem kommentarer falska") omskrivna till invarianter, och
den kvarglömda markeringen `profile-export-saknas` i `validate-data.mjs`
borttagen. Arkitekten räknar upp filerna som `Header.jsx`, `global.css`,
`Hero.module.css`, `tokens.css`, `Projects.module.css` och `validate-data.mjs`.

**Kontrollerat av mig 2026-11-07:** `OPEN-KEY: profile-export-saknas` finns inte
längre i `src/` eller `scripts/`. Kommentarernas innehåll har jag inte prövat. Det
gör granskarens efterkontroll i G1-rättningen.

---

## G1-rättningen — fynd 3–7 enligt R1–R6 (PÅGÅR)

**Agent:** byggare, därefter granskare för en smal efterkontroll.
**Förutsättning:** G1-kommentarerna klara (uppfyllt). **Beslut:** avsnittet
"Besluten efter G1 (2026-11-07)" i `ARKITEKTUR.md`, R1–R6, och M5h.
**Blockerar:** P8.

**Mål:** att G1:s fynd 3–7 är rättade så som arkitekten beslutat, och att varje
rättelse är mätt.

**Ingår** — arkitektens tabell "Exakt vad G1-rättningen ändrar", en punkt per fil:

1. **`src/components/ProjectCard.module.css`** (R1, R3): markeringen
   `kortets-li-scroll-marginal` ovanför `.item` ersätts med hänvisningen till A4
   (R1), och `.item` rörs inte. `.brand` ändras enligt R3: blockvisning, en rad,
   klippt med ellips, och den beslutade paddingen. Kommentaren beskriver
   invarianten, utan tal.
2. **`src/lib/projectRules.js`** (R2): `cardIds(slug)` enligt signaturen i R2.
3. **`src/components/ProjectCard.jsx`** (R1, R2): kortets id hämtas ur
   `cardIds(slug)`. Signaturen förblir `ProjectCard({ project })`. `index` kommer
   först i P10.
4. **`src/data/sections.js`** (R2): `MENU_ID` och `ROOT_ID` som `*_ID`-exporter,
   och kommentaren om att varje fast id på sidan är en export här.
5. **`src/components/Header.jsx`** (R2): den lokala `MENU_ID` tas bort och
   importeras ur `sections.js`.
6. **`src/main.jsx`** (R2): monteringspunkten hämtas med `ROOT_ID`.
7. **`index.html`** (R2): kommentaren vid monteringspunkten om var värdet bor.
8. **`scripts/validate-data.mjs`** (R2, R6): grinden för sidans id
   (`checkPageIds`), grinden mot dubbla tekniker, och de fyra kvarvarande
   exportmarkeringarna ersatta med hänvisningen till R6. Den femte,
   `profile-export-saknas`, är redan borta (G1-kommentarerna), men meddelandet
   prövas ändå enligt R6.
9. **`scripts/validate-tokens.mjs`** (R5): grinden i M5h, byggd **innan** tokens
   tas bort.
10. **`src/styles/tokens.css`** (R5): de sex tokens utan konsument tas bort, och
    ingen kommentar nämner dem.

Fynd 6 (R4) ändrar ingen fil. Det är en ny mätmetod för menyn, och den körs under
punkt 4 i "Godkänt när".

**Ingår INTE:**
- `ProjectCard({ project, index })`. Det är P10.
- `--radius-chip`, `--duration-reveal`, `--reveal-index`, `--reveal-stagger` och
  `--text-figure`. De kommer tillbaka i P9, P10 och P12. `--space-9` kommer inte
  tillbaka.
- Markeringarna utanför R6 i `validate-data.mjs` (`HERO_ID`, url i `contact.js`,
  ett namn i `ACTIVE` utan kontroll). De är fortfarande öppna och står kvar.
- Någon fil utöver de tio ovan. Någon ändring i `.item`.
- `ARKITEKTUR.md` och `PLAN.md`.

**Godkänt när** (varje mått med vyport och rullningslistvillkor):
1. **R2:** de sju prövningarna i en isolerad kopia, med exit-kod och utskrift:
   korrekt data ger kod 0. Varje fast id som `slug` (`hero`, `projects`,
   `skills`, `about`, `contact`, `main`, `mobile-menu`, `root`) ger kod 1 och
   exakt en rad `sidans id: …` med rätt namn. Sedan skillgruppen, två projekt med
   krockande kortid, skillgrupp lika med ett sektions-id, och dubbla tekniker
   (`Zod`/`Zod` och `Zod`/`zod`). Rättat ger kod 0.
2. **R2:** `grep -rnE "id=\"|id=\{'|getElementById\('" src --include=*.jsx` ger noll
   träffar utanför kommentarer.
3. **R6:** för var och en av de fem exporterna, i en isolerad kopia: exporten
   borttagen, satt till `null`, och rättad. De två första ger exakt den beslutade
   raden, den tredje tiger.
4. **R5/M5h, i denna ordning:** grinden ger **exakt sex** rader innan tokens tas
   bort, en per token. Efter borttagningen är den tyst. Ett påhittat testtoken i
   `:root` ger en rad med rätt radnummer, och borttaget tiger grinden igen.
5. **R3:** de fem grindarna och de två negativa kontrollerna vid de fem
   vyporterna, med Awles riktiga titel och med syntessträngarna, inklusive
   `scrollHeight <= clientHeight` på brickan. Med Awle är brickans bredd och höjd
   ±0,5 px mot ett mått taget före ändringen.
6. **R4:** de fyra layoutgrindarna vid 360 × 640, 600 × 640 och 899 × 700 med
   reserverad rullningslist, kontrollerad med menyn stängd. Den negativa
   kontrollen med `scrollbar-gutter: auto`: korrekt (tyst), injektionen (larmar)
   och injektionen borttagen (tyst). **De uppmätta talen för den negativa
   kontrollen skrivs i överlämningen**, eftersom arkitektens förutsägelse inte är
   mätt. Larmar grind 2 inte stoppar byggaren och lämnar tillbaka till
   arkitekten.
7. **R1:** ett hopp till `#awle` landar på samma avstånd som före, vid 360 och
   1280 px.
8. **OPEN-KEY:** för varje `OPEN-KEY: <nyckel>` i `src/` och `scripts/`:
   `grep -c "<nyckel>" ARKITEKTUR.md`, redovisat. `kortets-li-scroll-marginal` och
   `profile-export-saknas` finns inte längre i koden.
9. **Kommentarer:** `grep -rn` på varje borttaget tokennamn och på `MENU_ID`,
   `ROOT_ID` och `.brand` i `src/` och `scripts/`. Varje träff i en kommentar är
   läst och beskriver en invariant.
10. `npm run validate:data` och `npm run build` gröna, tokengrinden tyst, och
    `git status` visar inga ändringar utöver de tio filerna (och de filer
    G1-kommentarerna redan ändrat).
11. **Efterkontrollen:** granskaren, med `GRANSKNING-PAGAR` och ändringslistan
    med datum, bekräftar fynd 1–7 som åtgärdade mot `LARDOMAR.md` och R1–R6.
    Inget annat granskas. Ett nytt fynd utanför de sju skrivs ner i `LARDOMAR.md`
    men blockerar inte P8, om inte Jelal säger annat.

---

## P8 — Filterpanel del 1: segmentkontrollen och live-raden

**Agent:** byggare. **Förutsättning:** **G1-rättningen godkänd**, beslut 11.

**Mål:** filtrering per kategori utan sidomladdning.

**Ingår:** panelen (`--surface`, kant, radie 14 px, padding 24 px).
Segmentkontrollen "Alla N", "Fullstack N", "Frontend N" och "Backend N" med antal
räknade ur data och tillgänglig grupproll. Live-raden "VISAR X AV Y PROJEKT".
Varje fast id panelen sätter är en `*_ID`-export i `sections.js` (R2), så att
id-grinden ser det.

**Ingår INTE:** chips och sök (P9). In- och uttoning (P10).

**Godkänt när:**
1. Med Awle enbart: "Alla 1", "Fullstack 1", och de övriga enligt beslut 11 om
   nolla. Med klonade testprojekt i en kopia stämmer varje antal och live-raden
   vid varje val.
2. Inget antal står som bokstavligt tal i kod. Det mäts genom att lägga till och
   ta bort ett testprojekt och se att räknarna följer.
3. Aktivt segment har accentbakgrund och mörk text, kontrasten är mätt, och det
   aktiva läget går att utläsa programmatiskt (inte bara via färg).
4. Tangentbord: segmenten nås och väljs utan mus.
5. 360 px: segmentraden överskrider inte panelen med syntessträng i en etikett.
6. `npm run build` grön.

---

## P9 — Filterpanel del 2: teknik-chips och sökfältet

**Agent:** byggare. **Förutsättning:** P8, beslut 9 och 11.

**Ingår:** teknik-chips med uppdragets mått och aktivt läge. Sökfältet med
pill-form, ikon, placeholder "Sök projekt" och en riktig etikett. Kombinationen
segment, chips och sök enligt beslut 11. Tomt resultat enligt beslut 11.
- **`--radius-chip` deklareras i `tokens.css` här (R5)**, i samma ändring som
  chipsen blir dess första `var()`-konsument. Kommentaren i `tokens.css` som pekar
  fram mot chipsen skrivs om, så att den inte längre beskriver något framtida.

**Ingår INTE:** animation (P10). Nya fält i datan för sökningens skull.

**Godkänt när:**
1. En tabell med minst sex kombinationer (segment × chip × sökord) mot klonade
   testprojekt i en kopia, med förväntat och uppmätt antal kort och live-rad.
2. Sökningen hanterar versaler/gemener och å, ä, ö enligt beslut 11.
3. Sökfältet har tillgängligt namn. Placeholdern är inte enda etiketten.
4. Chipsens kant mot panelen och aktiv chiptext mätta mot sina krav (3:1 för
   kant, 4,5:1 för text).
5. 360 px: chipsraden och sökfältet håller panelens bredd med syntessträng.
6. **Tokengrinden (M5h) tiger:** `--radius-chip` har minst en `var()`-förekomst
   utanför kommentarer, och `npm run validate:tokens` ger ingen rad "tokenet har
   ingen konsument". Utskriften redovisad.
7. `npm run build` grön.

---

## P10 — Animationer

**Agent:** byggare. **Förutsättning:** P9, beslut 12.

**Ingår:** `.reveal` med IntersectionObserver, staggern på korten, in- och
uttoning vid filtrering, och `prefers-reduced-motion` som stänger av transforms
och transitions på hela sidan.
- **`--duration-reveal`, `--reveal-index` och `--reveal-stagger` deklareras här
  (R5)**, i samma ändring som `.reveal` och `Reveal` blir deras första
  konsumenter.
- **`index` läggs till i `ProjectCard`, som `ProjectCard({ project, index })`
  (R1)**, med `Reveal` som dess första konsument. Kortets `<li>` behåller sitt id
  ur `cardIds` och sin klass `.item`, så att ankarmålet och scroll-marginalen
  följer med (M12).
- **Den globala regeln `a { transition }` stängs av vid reducerad rörelse**,
  tillsammans med varje annan transition på sidan.

**Ingår INTE:** nya animationer utöver uppdraget. Ändrad layout.

**Godkänt när:**
1. Med JavaScript avstängt (eller observern borttagen i en kopia) syns allt
   innehåll. Inget förblir på opacitet 0.
2. Med reducerad rörelse emulerad: noll element med pågående transition eller
   transform efter scroll och filtrering, mätt med `getAnimations()` eller
   beräknad stil på varje `.reveal` och kort. **Därtill är `transitionDuration`
   `0s` på en navlänk och på en länk i brödtexten**, så att den globala
   länkregeln är prövad.
3. Staggerns fördröjning mätt per kort och inom 60–80 ms, med det tak beslut 12
   anger.
4. Filtrering under pågående uttoning lämnar inget kort i fel läge (snabba klick
   prövade).
5. Ingen layoutförskjutning från reveal: element tar sin plats före inbläddring
   (CLS i P15).
6. **Tokengrinden (M5h) tiger** för alla tre tokens, och utskriften är redovisad.
7. **`ProjectCard({ project, index })` stämmer med komponenttabellen**, och ett
   hopp till `#awle` landar på samma avstånd som efter G1-rättningen.
8. Kommentarer: `grep -rn "reveal\|[0-9]\+ px" src` läst. `.reveal` är en ny
   användare av en global klass, och varje kommentar som räknar global klasser
   eller deras användare skrivs om till invarianten.
9. `npm run build` grön.

---

## P11 — Sektionsetiketter och kompetenser

**Agent:** byggare. **Förutsättning:** P2 (kan köras efter P10), beslut 13 och 15.

**Ingår:** numrerade etiketter i formatet "01 / 04 · PROJEKT" för varje sektion,
härledda ur `sections.js`. Kompetensgrupperna med mono-eyebrow och chips i
filterchipsens stil.

**Ingår INTE:** ändringar i `skills.js` eller dess grindar. Texterna är Jelals.

**Godkänt när:**
1. Kastas ordningen om i `sections.js` följer etiketternas nummer med. Läggs en
   post till ändras nämnaren. Båda prövade i en kopia.
2. Rubriknivåerna oförändrade: ett `h1`, ett `h2` per sektion, `h3` per grupp.
3. Kompetenschipsens mått och färger stämmer med filterchipsens (jämförd
   beräknad stil).
4. 360 px-golvet med syntessträng i en chip och en gruppubrik, mot kortets egen
   behållare.
5. `npm run validate:data` tiger, och alla 9 grupper och deras punkter renderas
   som före (antal jämfört).
6. `npm run build` grön.

---

## P12 — Nyckeltal

**Agent:** byggare. **Förutsättning:** beslut 14, och **Jelals svar om ett tal
kräver uppgifter om honom.**

**Ingår:** raden med Urbanist-siffror och mono-etiketter, där varje tal kommer
ur data eller ur en uppgift Jelal själv gett.
- **`--text-figure` deklareras här (R5)**, i samma ändring som siffrorna blir dess
  första `var()`-konsument.

**Ingår INTE:** något tal som ingen har gett. Ett påhittat "år i branschen" är
ett påstående om Jelal.

**Godkänt när:**
1. Varje tal går att spåra till data (läggs ett testprojekt till ökar talet) eller
   till Jelals ordagranna svar.
2. 360 px-golvet håller med syntessträng i en etikett.
3. Talen läses begripligt av skärmläsare (siffra och etikett hör ihop).
4. **Tokengrinden (M5h) tiger:** `--text-figure` har en konsument, och
   utskriften är redovisad.
5. `npm run build` grön.

---

## P13 — Kontakt

**Agent:** byggare. **Förutsättning:** P2, beslut 16.

**Ingår:** två kolumner med kontaktuppgifter ur `contact.js` till vänster och
formuläret i en `--surface`-panel till höger, en kolumn på mobil.

**Ingår INTE:** ändrad formulärlogik, hCaptcha-integration eller fält.

**Godkänt när:**
1. Formuläret beter sig som före: obligatoriska fält, felmeddelanden och
   hCaptcha-widgeten laddar (prövat i webbläsaren, servern startad och stoppad
   enligt `netstat`-regeln).
2. Varje fält har etikett. Felmeddelandenas och etiketternas kontrast mot panelen
   är mätt och ≥ 4,5:1.
3. En uppgift som är `null` i `contact.js` renderar inget element.
4. 360 px-golvet med syntessträng i en uppgift och en etikett.
5. `npm run build` grön.

---

## P14 — Footer

**Agent:** byggare. **Förutsättning:** P2, beslut 16.

**Ingår:** avdelare överst, logga, tagline, länkkolumner för GitHub, LinkedIn och
e-post, och copyright-rad.

**Ingår INTE:** nya uppgifter om Jelal. Taglinen är Jelals text. Finns ingen
godkänd text skriver byggaren den som härleds ur befintligt innehåll och flaggar
den.

**Godkänt när:**
1. En länk vars adress saknas i `contact.js` renderas inte (GitHub i dag),
   kontrollerat i markup.
2. All text i footern mätt mot `--bg` och ≥ 4,5:1, med px-storleken redovisad.
3. 360 px-golvet med syntessträng i taglinen och en länk.
4. `npm run build` grön.

---

## P15 — Slutkontroll

**Agent:** byggare. **Förutsättning:** P3–P14. **P15 bygger ingenting.**
Fallerar en rad lämnas fyndet tillbaka till det paket som äger filen, som rättar,
och P15 körs om.

**Ingår:**
1. **360 px:** `documentElement.scrollWidth <= clientWidth` vid 360 × 640, 390 ×
   844, 600, 900, 1280 och 1600 px, med syntessträngen i varje textelement och
   med rullningslistvillkoret redovisat.
2. **Kontrast AA:** varje text-token mot varje bakgrund det faktiskt används på,
   som en tabell.
3. **Tangentbord:** hela sidan genomtabbad från skip-länken till footern. Varje
   interaktivt element nås, har synligt fokus och fungerar med Enter/Space.
   Mobilmenyn ingår.
4. **Lighthouse** enligt beslut 17, Performance och Accessibility ≥ 90 för både
   mobil och dator om beslutet säger så. Siffran redovisas med bygget den mättes
   på (färskt bygge, tidsstämpel för senast ändrade fil i `src/`).
5. **Före/efter:** samma vyportar som samordnarens skärmdumpar av `6154c9d` (1280
   och 360, hela sidan), tagna på det färska bygget och lagda bredvid.
6. **Fillista:** `git diff --stat 6154c9d` som underlag för listan över ändrade
   filer.
7. **Befintliga sidor:** varje `href="#..."` pekar på ett id som finns, sidan har
   ett `h1`, och skip-länken fungerar.

**Godkänt när:** varje punkt är redovisad som ett upprepbart kriterium med mätt
värde. `npm run build` och `npm run lint` gröna. Servern är stoppad och porten
ledig enligt `netstat`.

---

## P16 — Granskningspunkt 2 och LEVERANS

**Agent:** granskare, därefter projektledare. **Förutsättning:** P15.

**Ingår:** `GRANSKNING-PAGAR` och frysningen som i G1. Hård granskning av hela
omgången: varje beslut i P1 punkt för punkt mot koden med `fil:rad`, de upphävda
strängarna mot `src/`, `scripts/` och `GUIDE.md`, och varje `EJ I ARKITEKTUR` läst
mot dokumentet. Därefter visas före/efter och fillistan för Jelal.

**Frågor till Jelal vid leverans:** Awles beskrivning och footerns tagline, om de
inte redan godkänts. Kvarvarande frågor från förra omgången: Hem och Ekonomi,
LinkedIn och granskningsrytmen. Att paket L körs härnäst.

**Godkänt när:** fynden står i `LARDOMAR.md` och är åtgärdade eller uppskjutna av
Jelal, och Jelal har sett jämförelsen.

---

## P17 — Dokumentation

**Agent:** dokumentator. **Förutsättning:** P16. Ersätter förra omgångens paket H.

**Ingår:** README, och GUIDE.md omskriven: projektdatan (nya fält, kategori,
status, bild i 4:3), kompetenserna (förra H:s innehåll) och filtret. Listan över
ändrade filer.

**Godkänt när:** guiden är **genomspelad**. Att lägga till ett projekt, ändra
status och lägga till en kompetens enligt den ger grönt `npm run build` efter
varje steg, utan att en komponentfil öppnas. Inget antal och inget tokennamn som
har upphävts står kvar i guiden.

---

## Risker (denna omgång)

**Nya efter G1:**

- **P9, P10 eller P12 deklarerar sitt token före konsumenten, eller glömmer det.**
  M5h fäller då bygget, eller så används ett odeklarerat token och M5g fäller.
  **Märks tidigt** genom att alla tre har tokengrinden som egen godkännandepunkt.
- **`index` eller tokens läggs till "medan byggaren ändå är i filen" i
  G1-rättningen.** Då får de ingen konsument, och M5h fäller. **Märks tidigt**
  genom G1-rättningens "Ingår INTE".
- **Grind 2 i R4 larmar inte i den negativa kontrollen.** Arkitektens förutsägelse
  är omätt. **Märks tidigt** genom att G1-rättningen punkt 6 kräver de uppmätta
  talen och stoppar byggaren om grinden inte larmar.
- **Reveal i P10 tappar kortets id eller scroll-marginal** när `<li>` byts mot
  `Reveal`. **Märks tidigt** genom P10 punkt 7, hoppet till `#awle`.
- **Efterkontrollen av G1-rättningen växer till en ny hel granskning och hänger
  sig.** **Märks tidigt** genom att den bara gäller fynd 1–7 och R1–R6.

**Sedan tidigare:**

- ~~**Typsnitten laddas från CDN och teckensnittsgrinden tappar tänderna.**~~
  **Avgjort i M1: självhostade woff2.**
- ~~**P2 blir brett och hänger sig.**~~ **Passerat, P2 är byggt.**
- **Gamla tokennamn och "en enda vikt" lever kvar i kommentarer och i
  `ARKITEKTUR.md`.** Registrerat återfall tre gånger. **Märks tidigt** genom P1
  punkt 2 och P2 punkt 8.
- **`--ink-subtle` faller på AA på `--surface-2` eller i glöden.** Tokenvärdena
  är Jelals, men kontrasten är ett krav. **Märks tidigt** genom att P2, P5 och P7
  mäter mot den faktiska bakgrunden. Faller det går det till arkitekten, och
  byggaren justerar inte värdet själv.
- **Fokusringen klipps av kortets `overflow: hidden`.** **Märks tidigt** genom
  P7 punkt 4.
- **Reveal gömmer innehåll.** Faller observern, eller JS, förblir sektioner
  osynliga, vilket både Lighthouse och besökare straffar. **Märks tidigt** genom
  P10 punkt 1.
- **Påhittat innehåll om Jelal.** Hero-h1, Awles beskrivning, taglinen och "år i
  branschen" lockar till att fylla i. **Märks tidigt** genom att varje sådant ställe
  har en uttrycklig flaggning till Jelal i P5, P6, P12 och P14. Detsamma gäller
  hero-bakgrundsbilden: ingen agent tar fram en bild innan Jelal gett en.
- **Platshållarprojekt smyger in i datan för att visa griden.** Beslut 2
  förbjuder det. **Märks tidigt** genom att P7, P8 och P9 kräver kloner **i en
  kopia**, och genom att G1 kontrollerar att `projects.js` har exakt en post.
- **Navens höjd och `scroll-margin-top` glider isär.** **Märks tidigt** genom P3
  punkt 2, mätt för varje sektion.
- **Lighthouse-siffran mäts på ett gammalt bygge eller mot en levande dev-server.**
  **Märks tidigt** genom P15 punkt 4: färskt bygge, tidsstämpel, `netstat`.
- **Arbetsträdet ändras under G1, efterkontrollen eller G2.** **Märks tidigt**
  genom `GRANSKNING-PAGAR` och ändringslistan med datum.
- **Förra omgångens öppna paket (L, H, heros markeringar) faller mellan
  stolarna.** **Märks tidigt** genom statusavsnittet ovan, som ger var och en en
  plats, och genom att samordnaren bekräftar den placeringen före P2.

---
---

# Plan: Byt innehållet i hero, "Om mig" och "Kompetenser" enligt Jelals uppdrag 2026-10-07, utan att röra sidans design eller övriga sektioner

Skriven 2026-10-08, uppdaterad samma dag efter arkitektens tolv beslut, uppdaterad
igen efter **A13–A15** (`102cd91`), och uppdaterad nu efter **A16–A21**
(`1e08ea8`) — som låste upp paket C, upphävde två tal i denna plan, och gav
upphov till **paket L** och **paket M**.
**Detta är ett tillägg till en redan levererad sida**, inte ett nytt projekt. Den
gamla planen (paket 1–8, bygget av sidan) är genomförd och ersätts av denna.
Numreringen nedan börjar om på A för att inte krocka med de referenser till
"paket 1–8" som står i `ARKITEKTUR.md` och `LARDOMAR.md`.

Uppdraget står ordagrant i **`UPPDRAG-2026-10-07.md`** i projektroten, incheckad
som `5c62ac4`, kopierad med `cp` och verifierad byte-identisk med sha256 — den
skrevs inte om för hand, eftersom en handskriven kopia hade kunnat införa precis
de avvikelser verifieringspunkterna finns för att fånga. **Texterna i uppdraget
är exakta och får aldrig skrivas om** — Jelal skriver "Inga stavfel. Texterna ska
vara exakt som ovan." Varje jämförelse "tecken för tecken" görs mot den filen,
aldrig mot en scratchpad-sökväg (**A18**), och varje verifieringsrad i en
överlämning ska ange vilken fil den jämförde mot.

`BRIEF.md` är orörd och ska förbli det. Den beskriver det ursprungliga uppdraget
från 2026-10-06 och är historik; detta är ett eget, senare uppdrag.

---

## Status 2026-10-08, sent

| Vad | Läge |
|---|---|
| Paket A — tolv beslut A1–A12 | **Klart**, `f5559ae` |
| A13, A14, A15 | **Klara**, `102cd91` |
| **A16–A21** | **Klara**, `1e08ea8` — listade i `ARKITEKTUR.md`, avsnittet "Paket A — besluten för innehållsuppdraget 2026-10-08, och var de står" |
| Paket B — hero: texter och knappar | **Klart**, `4defa9f` |
| Paket K — heros höjd på dator | **Klart**, `24bae37`. Godkänt som byggt |
| Paket D — kompetensdatan | **Klart**, `89ad33b`. Godkänt som byggt |
| Paket E — kompetensrenderingen | **Klart**, `4a82515` |
| Paket C — mätserien | **Fritt att starta nu.** K är klart och punkt 5 är omskriven enligt **A16** |
| Paket F — "Om mig" | **Klart**, `34aaf79` |
| Paket J | **Klart**, `e0899bb` |
| **Paket M** — arkitektens städpass i `ARKITEKTUR.md` | **Klart**, `63d0207` |
| **Paket L** — `OPEN-KEY`-grinden och beslutsrundans genomförande | **Nytt.** Körs **efter LEVERANS och efter G** (A20) |

**Paket D och K är godkända som byggda.** Av arkitektens sex återlämnade punkter
visade sig **fyra** vara fel i dokumentet och inte i koden: A17, A18, A19 och A21
är rättelser av arkitektens egna stycken och kräver ingen kodändring. A16 var det
enda som låste ett paket — C kunde inte starta förrän höjdkvoten hade **en** enda
formel. A20 pekar ut ett nytt paket.

**A12 — uppdragstexten måste bo i repot — är uppfyllt.** Filen
`UPPDRAG-2026-10-07.md` finns i projektroten.

Arkitektens beslutsnummer (A1–A21) är **inte** samma numrering som de nio frågor
jag ställde i det ursprungliga paket A. Från och med nu används arkitektens
nummer överallt i denna plan. Mappningen, för den som läser ett äldre utdrag:

| Min gamla fråga i paket A | Arkitektens beslut |
|---|---|
| 1. Ikonerna | **A3** — inga ikoner, inget nytt beroende |
| 2. `filled`, orange fyllning, teckenförklaring | **A2** — tas bort |
| 3. Rollraden | **A7** — `Systemutvecklare · Fullstack`, och `<title>` |
| 4. Knappstilarna | **A5** — heros knappar, stilarna och mätserien |
| 5. Kortrutnätet 3/2/1 | **A6** — kortet, chipset och rutnätet |
| 6. Om mig-länken, båda lägena | **A4** — via `about.link` |
| 7. Skills-grindarna i `validate-data.mjs` | **A1** — grinden blir strukturell |
| 8. Teckentäckningen | inget beslut — mätning mot `cmap` krävs i B och D |
| 9. Avtrycket "ingen animation" | **A11** |
| — (tillkom av arkitekten) | **A8** footerns kontrast, **A9** tokengrinden, **A10** inga ikonlänkar i hero, **A12** uppdragstexten i repot |
| — (tillkom efter paket B:s återlämning) | **A13** `.hero`-blocket får paket K, **A14** citattecknen är avgränsare, **A15** Jelal-ägda texter som namngivna konstanter |
| — (tillkom efter D:s och K:s återlämning av sex punkter) | **A16** höjdkvoten har EN formel, **A17** stycket om nästlad struktur rättat, **A18** jämförelsen görs mot repots fil, **A19** OK-raden är ett format, **A20** `OPEN-KEY`-grinden får eget paket, **A21** grupp utan `id` |

---

## Först: fyra saker i uppdraget som INTE gick att göra som skrivet

Jag planerade inte runt dessa i tysthet, och de är nu avgjorda av arkitekten, inte
tolkade i koden. De **redovisas för Jelal vid LEVERANS** — se det avsnittet.

1. **"Använd ikonbiblioteket som redan finns i projektet."** Det finns inget
   ikonbibliotek. Körtidsberoendena är `react`, `react-dom` och
   `@hcaptcha/react-hcaptcha`. Premissen är osann. **Avgjort i A3: inga ikoner.**
2. **"#projekt" och "#kontakt".** Sektionernas id är `projects` och `contact`.
   Id:na får inte bytas: navet, `aria-current`-observern och varje befintlig länk
   hänger på dem. Vi uppfyller uppdragets **funktion** (knapparna scrollar till
   rätt sektion), inte dess bokstavliga strängar.
3. **Länken "Hem och Ekonomi" till "projektet längre ner på sidan".** Två fel i
   premissen: `src/data/projects.js` är tom, så det finns inget projekt och inget
   `#hem-och-ekonomi` att peka på — och Om mig ligger **efter** projekten i sidans
   ordning (hero, projekt, kompetenser, om mig, kontakt), så länken går uppåt,
   inte "längre ner". **Avgjort i A4: båda lägena, via `about.link`.**
   Projektinnehållet är **Jelals att ge**. Ingen agent hämtar det någon annanstans
   ifrån: Jelal har sagt "stop. gör inget sånt" när hans GitHub-repo slogs upp
   utan att han bett om det.
4. **"Behåll befintlig bild och layout i sektionen" (Om mig).** Om mig har ingen
   bild. `src/data/about.js` har bara ett fält, `paragraphs`, och datafilens egen
   kommentar säger att formen inte ska växa, med Jelals "en liten sektion" som
   skäl. Det finns alltså ingen bild att behålla, och att lägga till en är ett
   nytt beslut — inte ett "behåll".

Därtill en femte punkt som avgjorde sig själv och bara behövde ett avtryck:
**"Lugn in-animation ... om sidan redan använder animationer. Annars ingen."**
Sidan har två färgövergångar på 150 ms och inga in-animationer. Uppdragets egen
regel ger därmed **ingen animation** (A11). Och **"scrollar mjukt"** kräver ingen
JS: `global.css` har redan `scroll-behavior: smooth` med
`prefers-reduced-motion`-undantag. En vanlig ankarlänk räcker.

**En sjätte punkt, nu avgjord:** citattecknen runt heros ingress och runt "Om
mig"-texten i uppdragsfilen. De är **filens avgränsare, inte text** (A14). Den
frågan är därmed inte byggarens att tolka i paket F.

---

## Lärdomar som gäller här

Varje "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar denna plan
konkret, i klartext:

- **2026-10-02, CSS: headerns höjd är definierad på två oberoende ställen.**
  Samma mått får inte ha två sanningar. → **Detta är hela skälet till A16:s
  formel.** Mätseriens nämnare **mäts** på `header`-elementets egen rektangel i
  samma körning. **Talet `64` får aldrig skrivas i formeln** — skrivs det har
  headerns höjd två sanningar igen, vid sidan av `--header-height`. Att den
  uppmätta höjden **är** 64 px är i stället en **egen grind** i samma mätrad.
  Gäller paket C punkt 5 och är upphävd text i varje äldre lydelse.
- **2026-10-05, Arkitektur: en invariant som bara står i prosa försvaras av att
  någon läser den.** Går ett "får aldrig" att mäta är mätningen beslutet. → Därför
  är mätserien ett eget paket (C), och därför får **C inte bygga det den mäter**.
  Samma lärdom i sin skarpa form bär A16:s andra halva: **exakt en kvot per
  mätrad.** Två kvoter intill varandra lämnar valet till läsaren, och då är
  mätraden fel skriven — inte generös.
- **2026-10-02, Process: tre av sju bindande beslut i `ARKITEKTUR.md`:s
  rättelselista saknas i koden.** Regeln: ett beslut i `ARKITEKTUR.md` får bara
  lämnas ogenomfört genom att arkitekten skriver om punkten, och byggaren
  besvarar varje numrerad punkt med `fil:rad`. → **Hela paket K finns av detta
  skäl, och av inget annat.** A5:s `.hero`-block stod utskrivet som en deklaration
  och låg i inget pakets "Ingår". Det var **inte** en fälld mätning som gjorde K
  nödvändigt — se paket K:s bakgrundsstycke.
- **2026-10-05, CSS: två bindande avståndsbeslut genomfördes med andra tokens än
  de beslutade.** Står ett CSS-värde utskrivet som en deklaration i
  `ARKITEKTUR.md` ska koden innehålla exakt den deklarationen, tecken för tecken.
  → Paket K:s enda innehåll var en sådan deklaration, och de två `min-height`-
  raderna är en **reservkedja**, inte en dubblett: ordningen `100vh` före `100svh`
  är en del av beslutet och får inte "städas".
- **2026-10-02 och 2026-10-05 (ÅTERFALL ×3), Arkitektur: överspelade stycken står
  kvar och motsäger gällande beslut.** Ett nytt beslut får bara skrivas in genom
  att varje äldre stycke om samma sak ändras eller stryks i **samma** redigering.
  → **Hela paket M finns av detta skäl.** `ARKITEKTUR.md` bär i dag omärkt upphävd
  text om `MERGED` och `filled` som A1/A2 upphävde utan `UPPHÄVT`-märkning.
  Samma felläge som A17 rättade på sin egen plats, bara inte färdigstädat.
- **2026-10-05 (ÅTERKOMMANDE 3+), Process: `EJ I ARKITEKTUR`-markeringar står
  kvar på frågor arkitekturen avgjort.** En besvarad fråga = markeringen tas bort
  i **samma ändring** som beslutet genomförs, och posten kräver uttryckligen en
  maskinläsbar `OPEN-KEY`-rad plus en grind. → **Hela paket L finns av detta skäl
  (A20).** Och: **A15 förbjuder markeringen för kodstruktur** — den är bara för
  öppna frågor om utseende och värden.
- **2026-10-05, Grindar: en grind som fälls av fel skäl lär oss att ignorera
  den — och en grind som inte kan fälla är sämre än ingen grind.** → A1 gör
  skills-grinden strukturell; samma krav gäller `validate-tokens.mjs`. Och det är
  A20:s andra skäl till att `OPEN-KEY`-grinden inte får införas förrän
  nyckelorden finns: med noll nyckelord i projektet hade den tigit i varje
  körning och **sett ut** som ett skydd.
- **2026-10-08, Tillgänglighet: footerns text faller på AA, och tokenets namn är
  skälet till att det fick ligga kvar.** Uppmätt 3,893:1 mot kravet 4,5:1. → Hela
  **paket J** finns av detta skäl (A8).
- **2026-10-08 (ÅTERKOMMANDE 3+), Kodkommentarer: två kommentarer räknar upp en
  ombindning som togs bort.** `Projects.jsx:51` och `Skills.jsx:68`. → **Paket J**
  (A9), plus att `Skills.jsx`-stycket inte fick skrivas av till den nya filen i
  paket E.
- **2026-10-02 och 2026-10-05 (ÅTERFALL), Kodkommentarer som beskriver ett annat
  dokuments innehåll.** En kommentar som säger vad `ARKITEKTUR.md` "säger", "anger"
  eller "inte tar ställning till" blir fel i samma stund dokumentet ändras. →
  Sju sådana rader finns kvar **utanför** markeringar. `about.js:31` ligger i
  paket F punkt 6; de tre återstående ställena får sitt paket i **L del 3**.
- **2026-10-02, Navigering: sektions-id som bokstavlig sträng i `.jsx`.** Heros
  två knappar hämtar id:t ur `sections.js` namngivna konstanter. → Verifierad i B.
- **2026-10-02, Navigering: en länk till ett sektions-id får bara renderas om
  sektionen finns i datan.** → Detta är hela svårigheten i Om mig-länken (paket F).
- **2026-10-02 (ÅTERFALL), CSS: 360 px-golvet sprack genom hero-gridden.**
  `overflow-wrap: break-word` minskar inte min-content-bredden; ett grid-spår bär
  min-content som sitt automatiska minimum. Regeln kräver `minmax(0, 1fr)` på
  behållaren **och** `anywhere` på texten. → Gällde **paket K**, som gjorde `.hero`
  till en grid-container, och gäller paket C:s mätning.
- **2026-10-05, Validering: mät artefakten, inte deklarationen.** Teckengrinden
  läser `cmap` ur woff2-filen. → Kördes om i B och D mot de strängar byggaren
  faktiskt skrev. Samma lärdom i sin allmänna form bär **A14** och **A18**: en norm
  som kräver tolkning är ingen norm, och en norm som ligger i en scratchpad kan
  inte prövas om av granskaren.
- **2026-10-05 (ÅTERFALL), Kodkommentarer bär påståenden dokumentet tagit
  tillbaka.** Talet 307 och en felaktig "längsta strängen". → Egna
  verifieringspunkter i D, E och J.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), Process: arbetsträdet var inte fryst
  under granskningen.** Filen `GRANSKNING-PAGAR` skapas i projektroten innan
  granskaren startas och raderas först när rapporten är levererad. → Det är också
  skälet till att **paket M måste vara klart före G**: `ARKITEKTUR.md` är
  granskarens norm och får inte redigeras under granskningen.
- **2026-10-02, Datadrivet: data utan verkan är död data.** `filled` tas bort (A2).
- **2026-10-05, Vaktrader går inte att få att larma.** Flyttas en sådan rad med
  till en ny layout ska den tvingas fallera på nytt där.
- **2026-10-02 + 2026-10-05, Verktyg och samordning: påstå aldrig att en server är
  startad eller stoppad utifrån startkommandots utdata.** Mät porten med
  `netstat` och klistra in raden, eller dess frånvaro.
- **2026-10-05, Mätning: mät aldrig `dist/` utan att binda det till källan.**
- **2026-10-02, Verktyg: ett skript som skriver artefakter kontrollerar efter att
  filerna redan är skrivna.** Scriptet och `package.json`-raden ligger i samma
  paket (J respektive L).

**Processnot (Jelals preferens, från projektets minne):** granska hårt vid
leverans, inte efter varje litet paket — Jelal vill se något körbart innan tunga
granskningsloopar. Jag tolkar det så här: varje paket avslutas med byggarens egen
verifieringslista (den står utskriven per paket nedan) och `npm run build`, men
den fulla granskningen körs vid **LEVERANS** efter paket J. Paket G är
granskarens. Det här avviker från CLAUDE.md:s "kör alltid granskare efter varje
paket" och är därför något Jelal får säga nej till — det står som en öppen punkt.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| A | ~~Arkitektbesluten~~ **KLART** — tjugoen beslut A1–A21 i `ARKITEKTUR.md` (`f5559ae`, `102cd91`, `1e08ea8`) | arkitekt | Klart 2026-10-08. Varje beslut står på den plats där det gamla beslutet stod, och beslutstabellen i "Paket A"-avsnittet pekar ut avsnitt och blockerat paket |
| B | ~~Hero: namn, rollrad, ingress och de två knapparna~~ **KLART** (`4defa9f`) | byggare | Klart. De tre texterna står tecken för tecken som i `UPPDRAG-2026-10-07.md`, knapparna scrollar till projekt respektive kontakt, sidan har exakt ett `h1`, inget sektions-id står som literal i `.jsx` |
| K | ~~Heros höjd på dator: A5:s `@media (min-width: 900px)`-block i `Hero.module.css`~~ **KLART** (`24bae37`) | byggare | Klart och godkänt. Blocket står tecken för tecken, båda `min-height`-raderna i beslutets ordning. Efter K är höjdkvoten **1,000** vid både 1280 × 800 och 1280 × 900 |
| D | ~~Kompetensdatan: de nio grupperna, och skills-grindarna i `validate-data.mjs`~~ **KLART** (`89ad33b`) | byggare | Klart och godkänt. A17, A18, A19 och A21 bekräftar bygget — de fyra punkterna var fel i dokumentet, inte i koden |
| E | ~~Kompetensrenderingen: ett kort per grupp, rutnät 3/2/1, inga ikoner, ingen animation~~ **KLART** (`4a82515`) | byggare | Klart. Nio kort, 3/2/1, ingen nivåmätare, inget 360 px-överskridande mätt mot kortets egen behållare |
| **C** | **Mobilgrinden och desktopbandet:** A5:s mätserie körs, höjdraden enligt **A16** | byggare | **Fritt att starta.** Alla sex raderna redovisade som upprepbara kriterier, inte som iakttagelser. **C bygger ingenting** — fallerar en rad går fyndet tillbaka till K |
| F | ~~"Om mig": den exakta texten, och "Hem och Ekonomi" i båda lägena via `about.link` (A4, A14, A15)~~ **KLART** (`34aaf79`) | byggare | Texten står tecken för tecken som i `UPPDRAG-2026-10-07.md` enligt A14:s mekaniska regel, ingen länk pekar på ett id som inte finns, och texten bor som namngiven konstant om den ligger i en komponent |
| J | ~~**Tillgänglighet och tokengrind — det enda byggpaketet utanför Jelals uppdrag.** Footerns kontrast (A8) med fyra följdändringar, de två uppräknande kommentarerna (A9 del 1) och `scripts/validate-tokens.mjs` inkopplad i `build` (A9 del 2)~~ **KLART** (`e0899bb`) | byggare | Se eget avsnitt nedan. Kriteriet är **mätt kontrast och en grind som larmat av rätt skäl och sedan tigit** — inte "texten står rätt", som är innehållspaketens kriterium |
| **M** | ~~**Arkitektens städpass:** den omärkt upphävda texten om `MERGED` och `filled` i `ARKITEKTUR.md` märks eller stryks på sin egen plats~~ **KLART** (`63d0207`) | arkitekt | Noll träffar på `MERGED` och på `filled` utanför ett `UPPHÄVT`-stycke, sökningen redovisad. **Rör ingen fil utom `ARKITEKTUR.md`.** Måste vara klart före LEVERANS och **absolut före G** |
| — | **LEVERANS — visa sidan för Jelal, redovisa de sex avvikelserna och hämta svar på de öppna punkterna. Här körs också arkitektens beslutsrunda för heros fyra kvarvarande `EJ I ARKITEKTUR`-markeringar** | projektledare + arkitekt | Jelal har sett hero, Om mig och Kompetenser i webbläsaren, de sex avvikelserna är uppläsna, och de fyra markeringarna är avgjorda **med paket L utpekat för genomförandet** |
| G | Hård granskning av A–F, J, K och M, plus genomsökning efter rester av den gamla listan och efter kommentarer som blivit falska | granskare | Fynden nedtecknade i `LARDOMAR.md`, `GRANSKNING-PAGAR` skapad före start och raderad efter rapport |
| **L** | **`OPEN-KEY`-grinden och beslutsrundans genomförande (A20):** tre delgrindar i `scripts/validate-data.mjs`, en `OPEN-KEY`-rad på varje öppen markering, borttagning av de markeringar rundan besvarade, plus de tre kvarvarande kommentarerna som beskriver `ARKITEKTUR.md`:s innehåll | byggare | Se eget avsnitt nedan. Varje delgrind redovisad med tre indata, och antalet markeringar före och efter stämmer med rundans utfall |
| H | Dokumentation: hur Jelal ändrar de nio grupperna, listan över ändrade och borttagna filer, **plus de två felen i `GUIDE.md:179`** | dokumentator | En utomstående kan lägga till en kompetens utan att öppna en komponentfil, fil-listan är komplett, och `GUIDE.md` innehåller inget antal linjer och inget påstående om skrivordningen i `App.jsx` |

**Varför bokstäverna K, L och M.** A–H och J var tagna och får inte numreras om —
`ARKITEKTUR.md` och tidigare överlämningar hänvisar till dem. `I` undviks: "paket
I" läses som prepositionen "i" och förväxlas med siffran 1 i en överlämning.
Alltså **K**, därefter **L** (A20 pekar ut behovet och överlåter uttryckligen
bokstaven till `PLAN.md`) och **M**. **Bokstavsordningen är tilldelningsordning,
inte körordning** — K kördes mellan B och C, M körs före LEVERANS och L efter G.
Körordningen står i beroendetabellen och ingen annanstans.

### Beroenden — vad som är blockerat och vad som kan byggas direkt

| Paket | Status |
|---|---|
| A | **Klart.** A1–A12 (`f5559ae`), A13–A15 (`102cd91`), A16–A21 (`1e08ea8`). |
| B | **Klart** (`4defa9f`). Får inte återöppnas. |
| K | **Klart** (`24bae37`). Godkänt som byggt. |
| D | **Klart** (`89ad33b`). Godkänt som byggt. |
| E | **Klart** (`4a82515`). |
| **C** | **Fritt att starta nu.** K är klart och punkt 5 är omskriven enligt A16. C mäter det K byggt. |
| F | **Klart** (`34aaf79`). |
| J | **Klart** (`e0899bb`). |
| **M** | **Klart** (`63d0207`). |
| G | Blockerat av C, F, J, **M** och av LEVERANS. |
| **L** | Blockerat av **LEVERANS** (beslutsrundan) och av **G** (A20). |
| H | Blockerat av G **och av L** — H:s verifiering kör `validate:data`, och L ändrar det scriptet. |

**Riktningen mellan K och C är enkelriktad och det är hela poängen:** K byggde,
C mäter. **C fixar ingenting.** Fallerar en mätning i C redovisar C vad som
fallerade och lämnar fyndet tillbaka till **K**, som gör ändringen och lämnar
igen; C körs därefter om. A5:s ordning för vad som får vika — `padding-block`,
sedan ingressens grad, sedan stopp — är ett **genomförande** och genomförs i K,
aldrig av C.

---

## Paket K — heros höjd på dator (KLART, `24bae37`)

**Agent:** byggare. **Förutsättning:** B klart (`4defa9f`), A13. **Placering:**
mellan B och C. **K blockerade C.**

**Varför paketet fanns — och detta är omskrivet efter A16, eftersom den tidigare
lydelsen angav fel skäl.** Arkitektens `.hero`-block med `min-height` stod
utskrivet som en **deklaration** i beslut **A5**, men låg i **inget pakets
"Ingår"**. Byggaren byggde det därför inte, och **det var rätt** — ett paket
bygger inte utanför sin egen uppräkning. Fyndet lämnades tillbaka med paket B.
**Det är hela skälet till att K finns:** ett beslut i `ARKITEKTUR.md` får bara
lämnas ogenomfört genom att arkitekten skriver om punkten (`LARDOMAR.md`
2026-10-02), och det hade inte skett. **K:s skäl är alltså inte att en mätning
föll.**

Under A16:s nu **enda** formel var kvoten **före** paket K **0,918** vid
1280 × 800 och **0,809** vid 1280 × 900 — **båda inne i bandet 0,80–1,15**. Läst
bokstavligt föll höjdraden alltså aldrig vid de vyportar den föreskriver. Talet
**0,75**, som stod i en tidigare lydelse av denna plan, var kvoten `676 / 900`
mot **hela vyporten** — den andra, nu upphävda läsningen. **Det talet är upphävt
av A16 och får inte skrivas igen, varken som krav eller som jämförelsetal.**
Samma gäller nämnaren `(window.innerHeight - 64)`, som också stod här.

**K var ändå rätt att bygga**, och efter K är kvoten **1,000** vid både
1280 × 800 och 1280 × 900. Mobilsidan av kravet höll redan före K: vid 390 × 844
låg båda knapparnas underkant inom vyporten.

**Arkitekten stängde uttryckligen två vägar, och skälen hör till planen:**

| Väg | Varför inte |
|---|---|
| Lägga blocket i **paket C** | **Nej.** C är grinden. En grind som mäter sitt eget bygge är ingen grind — projektets regel, och den gäller utan undantag |
| **Återöppna paket B** | **Nej.** B är levererat och incheckat som `4defa9f`. Får det nytt innehåll betyder "paket B klart" två olika saker beroende på datum — exakt det felläge `LARDOMAR.md` registrerat **tre gånger**: ett dokument eller en kommentar som beskriver ett tillstånd som hunnit bytas. Ett levererat paket får inte få nytt innehåll |
| **Eget paket K** | **Valt.** Ett bygge, en incheckning, en betydelse |

**Ingick — exakt detta och inget mer:** `@media (min-width: 900px)`-blocket ur
**A5**, skrivet i `Hero.module.css` **tecken för tecken**, med **båda
`min-height`-raderna i beslutets ordning** (`100vh` som reserv **före** `100svh`).
Det är en reservkedja, inte en dubblett, och raden som står först får inte tas
bort som "duplikat".

**Ingick INTE:**
- Allt annat i hero: inga texter, inga knappstilar (de är genomförda i B med 19 av
  19 deklarationer identiska), ingen profilbildsändring, ingen animation.
- **Ingen av de fyra kvarvarande `EJ I ARKITEKTUR`-markeringarna i hero-filerna**
  (`sizes`-värdet, profilbildens `alt`-text, `.inner`-layouten, `contrast(1.05)`).
  De är ännu obesvarade av arkitekten, de är **korrekt märkta i dag**, och de ska
  stå kvar orörda. Beslutsrundan ligger vid LEVERANS, genomförandet i **paket L**.
- Att mäta kravet. Mätningen är paket C, och K fick inte föregripa den med en egen
  "det ser rätt ut".

**Klart när:**
1. Blocket står i `Hero.module.css`, och byggaren besvarar varje deklaration i
   A5:s block med `fil:rad` i överlämningen — fem deklarationer, fem rader. Ett
   grannvärde är en tyst omröstning om arkitektens beslut.
2. `minmax(0, 1fr)` står i blocket, eftersom `.hero` blir en grid-container och
   regeln gäller varje grid-container utan undantag (registrerat återfall).
3. `--header-height` används som token, inte som tal, så att det inte kan driva
   isär från `scroll-margin-top`.
4. `section#hero` höjd vid **1280 × 800 och 1280 × 900**, mätt på elementets egen
   rektangel med bevisad vyport, och kvoten enligt **A16:s enda formel** utskriven
   som ett tal: heros uppmätta höjd delad med vyporthöjden minus **headerns i
   samma körning uppmätta** rektangelhöjd. **Talet 64 skrivs inte i formeln.**
   Båda kvoterna ska ligga i bandet **0,80–1,15**; efter K är de **1,000**.
   **Ingen andra kvot redovisas** — se C punkt 5.
5. Mobilläget är **oförändrat**: inget golv under 900 px, och 390 × 844 ger samma
   utfall som före ändringen. Ett golv på mobilhöjden hade tvingat fram tomrum på
   en låg telefon, alltså motverkat det andra kravet.
6. `grep -rn "EJ I ARKITEKTUR" src` redovisad: de fyra hero-markeringarna ska
   finnas kvar, var och en med meningen "ännu obesvarad av arkitekten". Antalet
   före och efter paketet är lika.
7. Kommentarsblocken runt den nya regeln lästa: kommentaren bär **invarianten**
   ("hero ska fylla ungefär första skärmen från 900 px"), aldrig ett uppmätt tal
   och aldrig en uppräkning av vad `ARKITEKTUR.md` säger.
8. `npm run build` går igenom.

---

## Paket C — mätserien (grinden)

**Agent:** byggare. **Förutsättning:** **K klart** (`24bae37`) — uppfyllt.
**Beslut:** A5, och höjdraden enligt **A16**. **Fritt att starta nu.**

Detta är uppdragets hårdaste krav och därför ett eget paket. Hero ska rymma namn,
rollrad, ingress, två knappar **och** en rund profilbild — på 360 px bredd, där
den användbara spaltbredden är 309 px enligt arkitekturens egen mätning — och
samtidigt fylla ungefär första skärmen från 900 px.

**Ingår:** att genomföra A5:s mätserie, alla sex raderna, och att skriva kravet
som en **mätserie** i stället för som en mening. Lärdomen från 2026-10-05 är
tydlig: går ett "får aldrig" att mäta är mätningen beslutet och prosan bara
förklaringen.

**Ingår INTE — och detta är gränsen som gjorde A13 nödvändig:**
- **Att bygga något.** C mäter, redovisar och lämnar tillbaka. Fallerar en rad går
  fyndet till **K**, som genomför åtgärden. A5:s ordning för vad som får vika
  (`padding-block` under 600 px, sedan ingressens grad under 600 px, sedan stopp)
  genomförs **i K, aldrig av C**.
- Att ändra texterna för att få plats — de är exakta.
- Att ta bort eller krympa profilbilden utan att det står som ett beslut.
- Att byta typsnittsgrader på hela sidan.
- **Att utvidga mätserien.** Sex rader, inte sju. En sjunde rad är ett
  arkitektbeslut med eget paket, aldrig ett initiativ under mätningen.

**Klar när** — varje rad mäts på elementens egna rektanglar
(`getBoundingClientRect()`), med **bevisad vyport**, aldrig genom att titta på
sidan:
1. Båda knappelementens `bottom <= window.innerHeight` vid 360 × 640,
   360 × 667, 360 × 740 och 390 × 844. **640 är golvet och får inte utelämnas för
   en bekvämare höjd.**
2. Samma mätning vid 600 × 640, 900 × 700, 1280 × 800 och 1600 × 900. Serien gör
   att en framtida brytpunkt inte kan smyga sönder kravet.
3. `section#hero .inner` `scrollWidth` lika med `clientWidth` vid 360 px — mätt
   mot **hero:s egen behållare**, inte mot sidan. Slack absorberar fel, och
   absorberade fel larmar inte.
4. Samma, med `verksamhetsutvecklingsprojektledningsarbete` (43 tecken)
   programmatiskt insatt i `h1`, rollraden, ingressen **och båda knapptexterna**.
   En synteststräng, inte dagens text. **Den gamla listans längsta strängar är
   inte längre måttet.**
5. **Höjdkvoten — omskriven enligt A16, som är det enda gällande beslutet om
   denna rad.** `section#hero` höjd mäts vid **1280 × 800** och **1280 × 900**,
   och kvoten är:

   `hero.getBoundingClientRect().height / (window.innerHeight - headerHöjd)`

   där `headerHöjd` **mäts i samma körning** på `header`-elementets egen
   rektangel. Kvoten ska ligga i bandet **0,80–1,15** i **båda** fallen; efter K
   är den uppmätt till **1,000** i båda. Fem bindande villkor på hur raden skrivs:

   - **Talet 64 får aldrig skrivas i formeln.** Nämnaren mäts. Skrivs talet har
     headerns höjd två sanningar igen, vid sidan av `--header-height` — det felet
     finns registrerat i `LARDOMAR.md` 2026-10-02.
   - **Att den uppmätta headerhöjden är 64 px skrivs som en egen `GRIND:`** i
     samma mätrad, och den fäller om höjden avviker från tokenvärdet. Headern är
     låst till tokenet, så den **ska** vara 64 — men det är ett eget kriterium,
     inte en konstant i kvoten.
   - **Exakt en kvot per rad.** **Kvoten mot hela vyporten är inget kriterium, är
     inget jämförelsetal och redovisas inte alls.** Arkitektens regel: står två
     kvoter i en mätrad är mätraden fel skriven, inte generös.
   - **Serien får inte utvidgas nedåt.** **`899 × 700` är inte ett fynd.** Bandet
     gäller **från 900 px bredd**, samma brytpunkt som `@media (min-width: 900px)`-
     blocket som bär golvet. Under 900 px finns inget höjdgolv, avsiktligt: ett
     golv på mobilhöjden tvingar fram tomrum på en låg telefon. Där gäller
     uteslutande rad 1 och 2 — knapparnas underkant, vid 899 × 700 uppmätt till
     **418,984 ≤ 700** och **oförändrad av K**. Hero får vara högre än vyporten
     där; sidan rullar. Vill någon ha ett höjdkrav strax under brytpunkten är det
     ett **nytt arkitektbeslut med eget paket** — aldrig en rad som C lägger till.
   - **Och inte uppåt heller.** Kravet är dessa två vyportar. Bandets
     giltighetsområde ("från 900 px") säger var ett framtida höjdkrav **får** bo,
     inte att C ska mäta fler vyportar. Knapparnas underkant mäts däremot vid
     alla åtta vyportarna i rad 1 och 2, inklusive 900 × 700 — det är en **annan**
     mätning än höjdkvoten och ska inte blandas med den.
6. Negativ kontroll: tvinga fram ett överskridande genom den **smalaste** selektor
   som träffar det som prövas, redovisa **vilket element** som bar avvikelsen
   (`scrollWidth` plus elementet med största `right`), kontrollera
   `querySelectorAll(sel).length`, och visa att larmet upphörde när injektionen
   togs bort.

---

## Paket D — Kompetensdatan (KLART, `89ad33b`)

**Agent:** byggare. **Förutsättning:** A klart (**A1**, **A2**), A12 uppfyllt.

**Godkänt som byggt.** D lämnade tillbaka fem av de sex punkterna som blev
A16–A21, och **fyra av dem var fel i dokumentet, inte i koden**: A17
(`filled`-formatexemplet i stycket om nästlad struktur), A18 (scratchpad-sökvägen
som norm), A19 (OK-raden som utskriven sträng) och A21 (grupp utan `id`). Ingen
kodändring krävs av dem. Att byggaren rapporterade motsägelserna i stället för
att tolka dem är det rätta utfallet enligt `LARDOMAR.md` 2026-10-02.

**Ingick:** `src/data/skills.js` byttes till de nio grupperna med uppdragets
exakta punkter i uppdragets ordning. Grindarna i `scripts/validate-data.mjs`
gjordes om enligt **A1** — strukturell grind, korsreferensen och `MERGED` utgick,
och de gamla felmeddelandena fick inte stå kvar som döda strängar. `filled` togs
bort enligt **A2**. Datafilens kommentar skrevs om.

**Ingick INTE:** renderingen (paket E). Att uppfinna en tolfte grind — A1 säger
"exakt dessa elva, och inga andra". **Det är skälet till att `OPEN-KEY`-grinden
inte ligger här utan i paket L** (A20). Att behålla en enda post ur den gamla
listan "för säkerhets skull".

**Verifiering (genomförd):**
1. De nio gruppnamnen och varje punkt jämförda **tecken för tecken** mot
   `UPPDRAG-2026-10-07.md`, maskinellt — **aldrig mot en scratchpad-sökväg**
   (A18). Omslutande citattecken i uppdragsfilen är avgränsare enligt **A14**.
2. Ordningen är uppdragets ordning, både på grupperna och inom varje grupp.
3. `npm run validate:data` tiger på den korrekta datan.
4. Grinden larmar: varje obligatoriskt fält prövat med tre värden — borttaget, tom
   sträng och bara blanksteg — i en kopia i scratch-katalogen.
5. Den åtgärd ett felmeddelande föreskriver får grinden att **tiga**.
6. Varje tecken i de nya namnen finns i woff2-filens `cmap`, mätt på filen.
7. `npm run build` går igenom, och misslyckas med medvetet trasig data.
8. Ingen förekomst av den gamla listan kvar under `src/data/`, och inget av A1:s
   uppräknade gamla felmeddelanden kvar i `scripts/`.

---

## Paket E — Kompetensrenderingen (KLART, `4a82515`)

**Agent:** byggare. **Förutsättning:** D klart. **Beslut:** A2, A3, A6, A11, A15.

**Ingick:** ett kort per grupp med gruppnamnet som `h3` och kompetenserna som
chips i en riktig `ul`/`li`. Rutnätet 3/2/1 enligt **A6**. **A3: inga ikoner,
inget nytt beroende.** Teckenförklaringen och den orange fyllningen togs bort
enligt **A2**. Stycket om `surface-light` i `Skills.jsx:68` skrevs **inte** av
till den nya filen (A9 del 1). Varje Jelal-ägd text som bor i en komponent står
som **modulnivåkonstant** med invariantkommentar och renderas som `{konstanten}`
(**A15**).

**Ingick INTE:** animation (A11). Nivåmätare, procent eller stapel. Sökruta,
filter, räknare. Ändringar i andra sektioners CSS. Footerns och
`tokens.css`-ändringarna — de ligger i **paket J**. **Ingen `EJ I ARKITEKTUR`-
markering på kodstruktur** (A15).

**Verifiering (genomförd):**
1. Nio kort renderas. 3 per rad på dator, 2 på surfplatta, 1 på mobil — mätt på
   kortens rektanglar vid brytpunkterna och strax under dem.
2. Varje `h3` ligger under sidans enda `h1` och under sektionens `h2` i
   rubriknivå — ingen nivå hoppas över.
3. Chipsen ligger i `ul`/`li`. Ett chip utan namn renderar inget element.
4. 360 px-golvet: projektets längsta sträng programmatiskt insatt i ett chip och
   i en gruppubrik, mätt mot **kortets egen behållare**.
5. Ingen `transition` eller `animation` tillkommen **i Skills-filerna**.
6. Kontrasten mätt på chipsen mot den yta de faktiskt ligger på, och kvoten
   skriven i `tokens.css` i lärdomens format.
7. Vaktraderna i `.pills` tvingade att fallera på nytt i den **nya** layouten.
8. Kommentarerna i `Skills.module.css` och `SkillPill.module.css` lästa om: talet
   307 och påståendet om "längsta strängen" borta.
9. `EJ I ARKITEKTUR`-markeringarna i Skills-filerna lästa mot `ARKITEKTUR.md`.
   **Antalet markeringar i `src/` är rörligt efter detta paket** — paket L räknar
   om det själv i stället för att lita på en siffra i ett dokument.
10. `npm run build` går igenom.

---

## Paket F — "Om mig" (KLART, `34aaf79`)

**Agent:** byggare. **Förutsättning:** A klart (**A4**, **A14**, **A15**), A12
uppfyllt.

**Ingår:** uppdragets exakta text i `src/data/about.js`, och "Hem och Ekonomi" i
båda lägena via `about.link` enligt **A4**.

**Ingår INTE:** att lägga till en bild i sektionen — det finns ingen att behålla,
och att införa en är ett nytt beslut, inte ett "behåll". Att hitta på innehåll om
projektet Hem och Ekonomi. Att hitta på något om Jelals bakgrund utöver textens
egna ord: texten säger att han bor i Motala och är i början av sin karriär, och
**inget mer om hans bakgrund får läggas till någonstans på sidan**. **Att tolka
citattecknen** — A14 har avgjort dem.

**Verifiering:**
1. Texten jämförs **tecken för tecken** mot `UPPDRAG-2026-10-07.md`, maskinellt,
   **enligt A14:s mekaniska regel** — byggaren tolkar ingenting:
   - ett par `U+0022` som **omsluter hela strängen** är filens notation och
     **ingår inte i texten**;
   - ett citattecken **inuti** strängen är innehåll och skrivs av;
   - ett fall där paret **inte** omsluter hela texten, eller där det står ett
     ensamt citattecken, **lämnas tillbaka till arkitekten**. Det är ett nytt
     beslut, inte en bedömning.
   Texten är sammanhängande; delas den i stycken får inget tecken ändras.
   Verifieringsraden anger filnamnet — repots fil, aldrig en scratchpad (A18).
2. Bor någon av texterna i en komponent står den som **modulnivåkonstant** med
   invariantkommentar och renderas som `{konstanten}` (**A15**).
3. Ingen `href` på sidan pekar på ett id som inte finns i den renderade markupen
   — kontrollerat mekaniskt, inte genom att klicka.
4. Det motsatta läget provas också: lägg in ett testprojekt med det id A4 anger,
   och bekräfta att länken dyker upp **utan** att texten redigeras. Ta bort
   testprojektet och bekräfta att länken försvinner utan att en trasig `href`
   lämnas kvar.
5. `npm run build` och `npm run validate:data` går igenom.
6. **Kommentaren i `about.js:31` skrivs om — den är en av de sju rader som
   beskriver vad `ARKITEKTUR.md` säger eller inte tar ställning till**, vilket den
   bindande regeln från 2026-10-02 förbjuder. Den beskriver dessutom texten som
   ett byggarutkast som Jelal ska ersätta, och efter detta paket är texten Jelals
   egen. Skriv invarianten, inte dokumentets innehåll. **De tre återstående av de
   sju ligger i paket L del 3** — F tar bara sin egen.
7. Om mig-delen av `validate-data.mjs`:s upplysningsrad ägs av detta paket enligt
   **A19**: länkfras-upplysningen införs här, och OK-raden är ett **format** och en
   `UPPLYSNING:`, inte en sträng som matchas tecken för tecken.

---

## Paket J — Tillgänglighet och tokengrind (KLART, `e0899bb`)

**Agent:** byggare. **Förutsättning:** A klart (**A8**, **A9**). Oberoende av B–F
och K. **Körs sist av byggpaketen, omedelbart före LEVERANS.**

**Detta är det ENDA byggpaketet som rör filer utanför Jelals innehållsuppdrag:**
`src/components/Footer.module.css`, `src/styles/tokens.css`,
`src/components/ContactForm.module.css`, `src/components/Projects.jsx`, det nya
`scripts/validate-tokens.mjs` och `package.json`. Arkitektens skäl, ordagrant:
blandas A8 och A9 in i paket E går det inte att läsa ut vilken ändring som bar
vilket fynd, och uppdragets rad "Resten av portfolion är oförändrad" blir
omätbar.

**Varför sist av byggpaketen.** A9 kopplar in en ny grind i `build`-kedjan, och
varje annat pakets verifiering kör `npm run build`. Införs grinden mitt i B–F
eller K får de paketen ett rött bygge som inte hör till dem. Hela J görs därför i
ett svep. **Samma skäl bär A20:s tredje punkt**, och är en av anledningarna till
att `OPEN-KEY`-grinden inte läggs i J utan i paket L: **J:s innehåll är bindande
rad för rad och utvidgas inte.**

**Ingår:**
1. **A8 — footerns kontrast.** `Footer.module.css:20` byter till
   `--color-text-muted` (uppmätt **7,662:1** mot `--color-bg`, mot dagens
   **3,893:1** som faller på AA-kravet 4,5:1 för normal text).
   `--color-text-dim` tas bort ur `:root` (`tokens.css:95`).
2. **A8:s fyra följdändringar, alla i samma ändring**, inklusive kommentaren i
   `ContactForm.module.css:90` (skrivs om utan tokennamnet) och det nu
   referenslösa kommentarsblocket i `tokens.css:219-226`. Arkitekturens tabell
   under "A8 — Footerns kontrast" är bindande rad för rad.
3. **Varje `--color-text*`-token bär sin uppmätta kvot** i `tokens.css` i formen
   `/* <token> mot <bakgrund>: X,XXX:1 — AA <normal|stor> */`, mot varje bakgrund
   det faktiskt används mot.
4. **A9 del 1 — de två falska kommentarerna.** `Projects.jsx:51`: uppräkningen av
   de fem tokennamnen stryks och ersätts av konsekvensen. `Skills.jsx:68`: stycket
   ska vara borta — borttagningen låg i paket E, och J **verifierar** att det inte
   skrivits av till den nya filen. Finns stycket kvar lämnas fyndet tillbaka till
   paket E, det rättas inte här.
5. **A9 del 2 — `scripts/validate-tokens.mjs`**, plus `validate:tokens` och den
   nya `build`-kedjan i `package.json`. Scriptet och raden läggs till i samma
   paket, enligt regeln från 2026-10-02. Deklarationerna står utskrivna i
   `ARKITEKTUR.md` och ska stå tecken för tecken i `package.json`.

**Ingår INTE:** att ändra något under `src/` som hör till B–F eller K. Att höja
`--color-text-dim`:s värde i stället för att ta bort tokenet. Att utvidga grinden
till att läsa kommentarernas innebörd — arkitekten har avfärdat tre sådana
formuleringar. **Och inte `OPEN-KEY`-grinden** — den är paket L (A20).
**`Projects.jsx:9`** rörs inte här trots att J öppnar filen: den raden hör till
**L del 3**, så att de tre kvarvarande kommentarerna rättas i ett svep och går att
läsa ut som ett fynd.

**Ett rött bygge är ett förväntat mellanläge i detta paket, inte ett fel.**
Arkitekten kallar det att grinden bevisar sig själv i denna leverans: när
`--color-text-dim` tas bort **ska** `validate-tokens.mjs` fälla bygget på
`ContactForm.module.css:90` till dess att kommentaren är omskriven. Ingen får
"laga" det genom att kringgå grinden, lägga in ett undantag, återställa tokenet
eller flytta scriptet ur `build`. Enda tillåtna åtgärden är den som
felmeddelandet föreskriver: rätta referensen.

**Klar när — kriteriet är mätt kontrast och en grind som larmat av rätt skäl och
sedan tigit:**
1. Footerns uppmätta kontrast mot den bakgrund den faktiskt ligger på är
   redovisad med kvot och med den `font-size` i px som avgör tröskeln — inte med
   tokennamnet som skäl.
2. `grep -rn "color: var(--color-text" src` listad, och för varje träff är
   elementets faktiska bakgrund och renderade px-storlek slagna upp och 4,5:1
   tillämpat (3,0:1 bara vid ≥ 24 px, och teckensnittet har bara vikt 400, så
   "fet" finns inte som utväg).
3. `grep -rn "\-\-color-text-dim" src scripts ARKITEKTUR.md` ger noll träffar
   utanför ett `UPPHÄVT`-stycke, och sökningen är redovisad i överlämningen.
4. **Grindens tre indata redovisade:** att den **larmade** på
   `ContactForm.module.css:90` med fil och rad utskriven, att larmet **upphörde**
   när kommentaren rättades, och att den **tiger** på korrekt kod. Plus ett
   framtvingat fel (ett påhittat `--color-*`-namn i en kopia) som visar att den
   larmar av rätt skäl.
5. `npm run validate:tokens` körd ensam, och `npm run build` grön i slutläget med
   den nya kedjan.
6. Renderad markup för projekt-, kontakt- och footersektionerna jämförd före och
   efter: den enda avsiktliga skillnaden är footerns textfärg.
7. Kommentarsblocken i de berörda filerna lästa om: ingen kommentar räknar upp
   innehållet i ett block som ligger i en annan fil.

---

## Paket M — arkitektens städpass i `ARKITEKTUR.md` (KLART, `63d0207`)

**Agent:** arkitekt. **Förutsättning:** paket F har lämnat. **Placering: före
LEVERANS, och absolut före paket G. Blockerar G.**

**Varför paketet finns, och varför det inte hör någon annanstans.** Arkitekten
rapporterar att `ARKITEKTUR.md` **själv** bär omärkt upphävd text om `MERGED` och
`filled` på raderna **1316, 1329, 1333–1335, 1413, 1437–1457 och 5022–5061** —
upphävda av **A1** och **A2** men utan `UPPHÄVT`-märkning. Det är träffar som
dokumentets **egen** kontroll ska fälla, och det är exakt det felläge **A17**
handlade om: A1/A2 skrevs in utan att varje äldre stycke om samma sak ändrades i
samma redigering. `LARDOMAR.md` har posten registrerad som **ÅTERFALL ×3**.

Arkitekten erbjöd sig att städa dem i ett eget pass, och jag avgör placeringen så:

| Var det kunde ligga | Varför inte / varför |
|---|---|
| **Paket L** | **Nej.** L ligger efter LEVERANS och efter G. Då hade granskaren i G läst kod mot ett dokument som bär omärkt upphävd text — alltså graderat mot en norm som motsäger sig själv. Dessutom är L byggarens paket och skriver kod; detta är arkitektens eget dokument |
| **Granskningen (G)** | **Nej.** Felet är redan uppmätt och rapporterat av arkitekten, med radnummer. Att låta G "hitta" det igen är att lägga en känd skuld i granskarens knä, och `LARDOMAR.md`-posten finns redan. Värre: regeln säger att `ARKITEKTUR.md` **inte får ändras under granskningen**, så om texten står kvar när G startar kan den inte rättas förrän G är klar |
| **Eget städpass före LEVERANS** | **Valt.** Dokumentet är granskarens norm. En norm städas före mätningen, inte under den och inte efteråt |

**Varför inte tidigare än nu:** paket D och E, de enda paket som läste de styckena
som underlag, är klara (`89ad33b`, `4a82515`). Risken att en byggare genomför det
upphävda är därmed borta. Och att ändra `ARKITEKTUR.md` under ett pågående paket
är samma felläge som registrerades 2026-10-02 (dokumentet växte 1506 → 1786 rader
mitt i ett arbetspass). Därför: **efter att F lämnat, före LEVERANS.**

**Ingår — exakt detta och inget mer:**
1. De åtta uppräknade radställena märks `UPPHÄVT` med hänvisning till A1
   respektive A2, **eller** stryks. Arkitekten väljer per ställe, och beslutet står
   på **styckets egen plats** — aldrig bara i ett rättelseavsnitt.
2. Varje rättat stycke namnger det paket som genomfört beslutet, enligt A13:s egen
   lärdom ("varje CSS-block jag skriver ut ska namnge det paket som genomför det,
   i samma stycke"). Här är genomförandet redan gjort i D och E, så raden ska peka
   dit.
3. Tabellen över upphävda strängar kompletteras med `MERGED` och `filled` om de
   inte redan står där, så att dokumentets egen kontroll fäller ett återfall.

**Ingår INTE:**
- **Varje annan fil.** M rör **bara** `ARKITEKTUR.md`. Ingen kod, ingen datafil,
  ingen `GUIDE.md`. Rör M en fil under `src/` eller `scripts/` går det inte längre
  att läsa ut vilket paket som bar vilken ändring.
- **Nya beslut.** Detta är ett städpass: text som redan är upphävd märks som
  upphävd. Vill arkitekten ändra ett gällande beslut är det ett eget beslut med
  eget nummer och eget genomförandepaket.
- **De sju kommentarerna i koden.** De är `src/`- och `scripts/`-filer: `about.js:31`
  ligger i paket F, de tre återstående i **L del 3**.

**Klar när:**
1. `grep -n "MERGED" ARKITEKTUR.md` och `grep -n "filled" ARKITEKTUR.md`
   redovisade, och **varje** träff ligger i ett `UPPHÄVT`-stycke eller är borta.
   Sökningen klistras in i överlämningen — en borttagning är inte klar förrän
   sökningen är gjord och visad (`LARDOMAR.md` 2026-10-08).
2. Dokumentets egen tabell över upphävda strängar körd mot `ARKITEKTUR.md`,
   `src/`, `scripts/` **och** `GUIDE.md`, och utfallet redovisat.
3. Inga andra rader i `ARKITEKTUR.md` ändrade än de som bär upphävd text —
   diffens omfång redovisas, så att "medan jag var i filen ändå" går att se.
4. `git status` visar **endast** `ARKITEKTUR.md` ändrad.
5. Paketet är incheckat **innan** `GRANSKNING-PAGAR` skapas.

---

## Svar på arkitektens fråga: beslutsrundan för heros fyra markeringar ligger vid LEVERANS, och genomförandet i paket L

De fyra kvarvarande `EJ I ARKITEKTUR`-markeringarna i hero — **`sizes`-värdet,
profilbildens `alt`-text, `.inner`-layouten och `contrast(1.05)`** — är
arkitektens att besvara, och de är **korrekt märkta i dag**. Posten om dem är
märkt **ÅTERKOMMANDE (3+)** i `LARDOMAR.md`.

**Beslut: rundan körs vid LEVERANS, inte före K och C.** Fyra skäl:

1. **Ingen av de fyra blockerar K eller C.** K:s omfattning var fastslagen tecken
   för tecken i A13 och rörde inget av dem. C mäter och bygger inget. Att köra
   rundan först skulle fördröja K och C utan att ändra en rad i något av dem.
2. **Ett beslut före K skulle tvinga fram ett regelbrott.** Lärdomen
   (ÅTERKOMMANDE 3+) kräver att markeringen tas bort **i samma ändring som
   beslutet genomförs**. Det enda paket som rörde hero-filerna var K, och K fick
   enligt A13 inte röra markeringarna. Då återstod två utvägar, och båda är
   registrerade fellägen: antingen vidgas K:s omfattning, eller så ligger en
   besvarad markering kvar i koden. **En markering som fortfarande är öppen är
   inte ett fel;** felet uppstår när beslutet finns och markeringen står kvar.
3. **Två av de fyra är Jelals att se, inte bara arkitektens att lösa.**
   Profilbildens `alt`-text är text om Jelal, och `contrast(1.05)` är hur hans
   eget ansikte ser ut på sidan. Han är närvarande vid LEVERANS ändå.
4. **A13:s egen lärdom ska hålla även här:** "varje CSS-block jag skriver ut ska
   namnge det paket som genomför det, i samma stycke." Därför gäller detta
   villkor för rundan: **besluten skrivs in i `ARKITEKTUR.md` först i samma
   redigering som ett paket pekas ut för genomförandet.**

**Det paketet finns nu, och det är `L`.** A20 pekar ut det uttryckligen: samma
paket som bär `OPEN-KEY`-grinden genomför beslutsrundan, efter LEVERANS och efter
G. Ingen av de fyra markeringarna får bli besvarad i `ARKITEKTUR.md` förr än
rundan körs, och rundans beslut genomförs i L — i samma ändring som markeringen
tas bort.

**Till dess:** markeringarna står kvar orörda, var och en med meningen "ännu
obesvarad av arkitekten" i varje överlämning som rör hero-filerna.
Granskaren i paket G **läser** dem mot `ARKITEKTUR.md` i stället för att räkna
dem, och ska finna att de fortfarande är obesvarade — att de står kvar är då det
rätta utfallet, inte ett fynd.

---

## LEVERANS — vad som visas och vad som ska sägas

**Agent:** projektledare (och arkitekten för beslutsrundan ovan).
**Förutsättning:** B, K, C, D, E, F, J och **M** klara.

Sidan visas för Jelal: hero, Om mig och Kompetenser i webbläsaren. Startas en
server mäts porten med `netstat` före start och efter stopp, och raden klistras
in — aldrig ett påstående byggt på startkommandots utdata.

### Sex avvikelser från uppdragets bokstav — läses upp, går inte igenom tyst

Arkitekten har beslutat sex saker som avviker från hur uppdraget är skrivet. De
redovisas för Jelal här, i klartext:

1. **Inga ikoner på kompetenskorten.** Uppdraget sa "använd ikonbiblioteket som
   redan finns i projektet" — det finns inget ikonbibliotek, och att lägga till
   ett vore ett nytt körtidsberoende. (A3)
2. **Id:na förblir `projects` och `contact`**, inte `#projekt`/`#kontakt`. Navet,
   `aria-current`-observern och varje befintlig länk hänger på dem. Knapparna gör
   det uppdraget ville — de scrollar till rätt sektion.
3. **Länken till Hem och Ekonomi scrollar UPPÅT**, inte "längre ner på sidan",
   eftersom Om mig ligger efter projekten i Jelals egen sektionsordning.
4. **Ingen bild i Om mig.** Uppdraget sa "behåll befintlig bild" — det finns ingen
   att behålla.
5. **Ingen animation.** Uppdragets egen regel: lugn in-animation bara om sidan
   redan använder animationer. Den gör den inte. (A11)
6. **Chipsen blir neutrala i stället för orange**, och de 270 markeringarna
   försvinner med den gamla listan. Den nya listan har ingen ifylld/dämpad
   skillnad — allt i den är sådant Jelal kan — så raden "De orange har jag
   arbetat med." förklarar en skillnad som inte längre finns. (A2)

### Därtill, och det ska sägas med samma tydlighet

**Rollraden blir `Systemutvecklare · Fullstack`** enligt uppdraget. Det är en
medveten omsvängning mot hans tidigare uttryckliga "ta bort systemutvecklare
längst upp". Uppdraget är nyare och uttryckligt, så det gäller — men det är
ingenting han ska behöva upptäcka själv på sidan. (A7)

**Citattecknen runt ingressen och "Om mig"-texten renderas inte.** De är
uppdragsfilens avgränsare (A14), och heros bygge i `4defa9f` är därmed rätt.

### Frågorna som ställs vid LEVERANS

Inte en öppen "vad tycker du", som bjuder in till att riva upp det som är
avgjort — utan dessa:

1. **Projektinnehållet till Hem och Ekonomi.** Ingen agent hämtar det någon
   annanstans ifrån. Jelal har sagt "stop. gör inget sånt" när hans GitHub-repo
   slogs upp utan att han bett om det. Planen förutsätter att projektet **inte
   finns ännu**, och paket F bygger båda lägena så att länken tänds av sig själv
   när han lägger in det.
2. **Att de 270 markerade kompetenserna försvinner** (avvikelse 6 ovan). Han
   markerade dem över många omgångar. Att arbetet kastas är hans att godkänna;
   mekanismen är arkitektens. Listan finns kvar i git-historiken.
3. **LinkedIn-ikonen under knapparna.** Uppdraget listar den som **valfri**, och
   A10 säger inga ikonlänkar i hero. GitHub återinförs inte: han har sagt "Ta
   bort github", och `contact.js` har `url: null` med en daterad kommentar. Vi
   avstår om han inte ber om den.
4. **Bild i Om mig** (avvikelse 4 ovan). Vill han ha en är det ett nytt beslut och
   ett eget paket.
5. **Granskningsrytmen.** Den hårda granskningen ligger vid LEVERANS i stället
   för efter varje paket, enligt hans tidigare önskemål om att se något körbart
   först. Det avviker från CLAUDE.md. Säger han nej körs granskaren efter varje
   paket i stället.
6. **Footerns ton.** A8 ger footern samma ton som annan dämpad text, och den
   tappar därmed sin egen nivå i texthierarkin. Kostnaden är verklig, och den är
   priset för att texten uppfyller AA. Visas i samma svep.
7. **Profilbildens `alt`-text och gråskalans `contrast(1.05)`** — två av de fyra
   markeringar arkitekten avgör i rundan ovan. Båda handlar om hur Jelal själv
   beskrivs och visas, och han ser dem på skärmen i samma svep. **Genomförandet
   ligger i paket L**, efter granskningen.

---

## Paket G — Granskningen

**Agent:** granskare. **Förutsättning:** LEVERANS genomförd **och paket M
incheckat** — granskaren graderar mot `ARKITEKTUR.md`, och normen får inte bära
omärkt upphävd text när mätningen börjar.

**Ingår:** `GRANSKNING-PAGAR` skapas i projektroten **innan** granskaren startas
och raderas först när rapporten är levererad. Ändringslistan med datum tas vid
start och vid slut; skiljer de sig är granskningen ogiltig för de filerna.
**Ingen agent — inte heller arkitekten — ändrar `ARKITEKTUR.md` under G.**
Därtill, utöver den vanliga genomgången:

1. Genomsökning efter **rester av den gamla listan** överallt: komponenter,
   datafiler, kommentarer, `skills.txt`, `skills-full.txt`, grindarna och
   `dist/`. Uppdraget nämner undersidor — sidan är ensidig, så det är trivialt
   uppfyllt, men det ska stå att det kontrollerats.
2. Arkitekturens tabell över förbjudna strängar körd mot `src/` och `scripts/`,
   inte bara mot `ARKITEKTUR.md`. Raden om "de tre linjerna" gäller också
   `GUIDE.md` — se paket H. **Och: `MERGED`, `filled`, `0,75` och
   `(window.innerHeight - 64)` ingår i sökningen** — de är upphävda av A1, A2 och
   A16, och paket M respektive denna plan har städat dem. En träff utanför ett
   `UPPHÄVT`-stycke är ett återfall, inte en detalj.
3. Varje `EJ I ARKITEKTUR`-markering läst mot `ARKITEKTUR.md`, inte räknad. För
   heros fyra: att de fortfarande är obesvarade är det **rätta** utfallet, enligt
   beslutet om rundan ovan. **Antalet i `src/` räknas om i samma körning** —
   paket E skrev om Skills-filerna, så varje siffra i ett dokument är överspelad.
4. `dist/` mätt bara i samma körning som ett ombyggt bygge, med byggkommandot och
   tidsstämpeln för senast ändrade fil under `src/` i rapporten.
5. Startas någon server: porten mäts med `netstat` före start och efter stopp, och
   raden klistras in.
6. **Varje "tecken för tecken"-påstående i en överlämning prövas om mot
   `UPPDRAG-2026-10-07.md`** — inte mot en text i en rapport, och inte mot en
   scratchpad-sökväg (**A18**), med **A14:s mekaniska regel** som norm för
   avgränsarna. Filen ska vara oförändrad sedan `5c62ac4`; det kontrolleras.
7. **Paket J granskas som eget paket**, med frågan om någon fil utanför Jelals
   uppdrag har ändrats av något annat paket än J och M.
8. **Paket K och C granskas som två paket, inte ett.** Frågan är om C har byggt
   något, och om K har rört något utanför A5:s block — särskilt de fyra
   markeringarna. Blandas de ihop är grinden förlorad. **Därtill: att C:s
   höjdrad har exakt en kvot, att nämnaren är mätt och inte skriven, att
   headerhöjden står som egen grind, och att serien inte utvidgats med en sjunde
   rad eller med 899 × 700.**
9. **Paket M granskas som eget paket**, och bara på en fråga: är `MERGED` och
   `filled` borta utanför `UPPHÄVT`-stycken, och rörde M någon annan fil?
10. De sju kommentarerna som beskriver `ARKITEKTUR.md`:s innehåll utanför
    markeringar räknas om: `about.js:31` ska vara rättad av F, och de tre
    återstående ställena ska stå kvar med **paket L** utpekat. Att de står kvar är
    då rätt utfall; att de saknar paket hade varit fyndet.

---

## Paket L — `OPEN-KEY`-grinden, beslutsrundans genomförande och de tre sista kommentarerna

**Agent:** byggare. **Förutsättning:** **LEVERANS genomförd** (beslutsrundan) och
**paket G klart med fynden åtgärdade** (A20). **Blockerar H.**

**Varför paketet finns.** `LARDOMAR.md` 2026-10-05, märkt **ÅTERKOMMANDE (3+)**,
kräver en maskinläsbar `OPEN-KEY`-rad i varje markering plus en grind i
`scripts/validate-data.mjs`. **A20 avgör att grinden bärs varken av D eller av J,
utan av ett eget paket efter LEVERANS och efter G — samma paket som genomför
beslutsrundan för heros fyra markeringar.** Arkitektens fyra skäl:

1. **Grindens enda del med tänder kräver en `OPEN-KEY`-rad i varje öppen
   markering** — inklusive hero-filernas fyra, som **A13 förbjuder K och varje
   paket före LEVERANS att röra**. Grinden kan därför inte komma före rundan utan
   att tvinga fram ett registrerat felläge.
2. **Med noll nyckelord i projektet kunde grinden inte fälla alls**, och en grind
   som inte kan fälla är **sämre än ingen grind**: den hade tigit i varje körning
   och sett ut som ett skydd.
3. **En ny grind i `build` ger varje annat pakets verifiering ett rött bygge som
   inte hör till det.** Samma skäl som gör att J körs sist — och J:s innehåll är
   bindande rad för rad och utvidgas inte.
4. **Inte paket D.** A1:s elva grindar är grindar på innehållet i `skills.js`.
   Denna grind läser ingen datafil alls: den läser `src/`, `scripts/` och
   `ARKITEKTUR.md`. Den räknas inte in bland de elva och motsäger inte A1 — men
   den hör inte hemma i ett datapaket.

**Ingår — tre delar:**

**Del 1 — grinden.** Tre delgrindar i `scripts/validate-data.mjs`, **efter
datakontrollerna och före OK-raden**, utskrivna i A20. Varje rad märks `GRIND:`
och varje meddelande följer formatet `<fil>:<rad>: <vad som är fel>`:

| # | Villkor som fäller |
|---|---|
| G1 | Ett kommentarsblock innehåller `EJ I ARKITEKTUR` men saknar raden `OPEN-KEY: <nyckelord>` |
| G2 | Ett nyckelord ur en `OPEN-KEY`-rad förekommer i `ARKITEKTUR.md` — frågan är då besvarad och markeringen ska bort |
| G3 | Inuti ett block med `EJ I ARKITEKTUR` står "ARKITEKTUR.md säger", "ARKITEKTUR.md anger", "ARKITEKTUR.md nämner" eller "tar inte ställning" |

Meddelandenas exakta lydelse står i A20 och skrivs tecken för tecken.
**Sökmängd:** `src/` och `scripts/`, rekursivt — aldrig `node_modules/` eller
`dist/`. `ARKITEKTUR.md` läses enbart av G2, och enbart som söktext. **G2 jämför
skiftesokänsligt och på hela ord**; nyckelordet är minst fyra tecken och har
formen `<filnamn utan ändelse>-<frågan i två ord>`, med bindestreck och utan å, ä,
ö. **Ett nyckelord som `grid` är fel valt, inte strängt.** Arkitekten skriver
medvetet **inget exempel på ett nyckelord** i `ARKITEKTUR.md`, eftersom ett
nyckelord som står där fäller G2 i samma stund markeringen får sin rad — och
samma försiktighet gäller denna plan: **inget nyckelord skrivs här heller.**

**Del 2 — markeringarna.** `OPEN-KEY`-raden sätts på **varje** markering som
fortfarande är öppen, och de markeringar vars fråga beslutsrundan vid LEVERANS
besvarade **tas bort — i samma ändring som beslutet genomförs**. Arkitektens
beslut ur rundan skrivs in i `ARKITEKTUR.md` i samma redigering. **Inga värden
ändras av markeringsarbetet**; ändrar rundans beslut ett värde är det beslutets
genomförande och redovisas för sig, med `fil:rad`.

**Del 3 — de tre sista kommentarerna som beskriver `ARKITEKTUR.md`:s innehåll.**
Sju rader i koden säger vad `ARKITEKTUR.md` "säger", "anger" eller "inte tar
ställning till" **utanför** en markering. Den bindande regeln från 2026-10-02
förbjuder den formuleringen; A20 konstaterar att grinden inte fäller på dem
eftersom den bara läser inuti markeringar, och att de därför är ett eget fynd.
**De hade inget paket. Här är det:**

| Ställe | Läge |
|---|---|
| `src/data/about.js:31` | **Ligger i paket F punkt 6.** Rörs inte här |
| `src/components/Projects.jsx:9` | **L del 3.** J öppnar samma fil för rad 51 men rör inte rad 9, så att de tre rättas i ett svep |
| `src/components/ProjectCard.module.css:39` | **L del 3** |
| fyra rader i `scripts/optimize-images.mjs` | **L del 3** |

Var och en skrivs om till **invarianten** och en hänvisning till avsnittet, aldrig
till en beskrivning av ett annat dokuments innehåll. **Att vidga G3 till all
kommentarstext är ett nytt beslut som ingen har fattat** — det görs inte här.

**Ingår INTE:**
- Att vidga grinden utöver A20:s tre delgrindar, eller att lägga in ett undantag
  för en markering som inte går att formulera. Går en markering inte att ge ett
  nyckelord är det ett fynd till arkitekten, inte ett undantag.
- Att besvara en markering på egen hand. Rundans beslut är arkitektens; L
  **genomför** dem.
- Nya värden, ny layout, nya texter.
- `ARKITEKTUR.md`:s egen upphävda text — det var **paket M**, före LEVERANS.

**Klar när:**
1. **Varje delgrind redovisad med tre indata:** korrekt kod (tyst), en framtvingad
   överträdelse (**larm, med fil och rad utskriven**), och den åtgärd meddelandet
   föreskriver (**tyst igen**). G1, G2 och G3 var för sig — inte som en klump.
2. **Vilken LEGITIM ändring som får fälla respektive delgrind står skrivet**, och
   svaret ska vara "ingen" för alla tre. Blir svaret något annat är grinden fel
   konstruerad och görs om, inte dokumenterad med ett undantag.
3. `grep -rn "EJ I ARKITEKTUR" src scripts` och `grep -rn "OPEN-KEY" src scripts`
   redovisade: **varje** markering har sin `OPEN-KEY`-rad, och antalet markeringar
   före och efter stämmer med rundans utfall, post för post. Antalet räknas i
   samma körning — ingen siffra hämtas ur ett dokument.
4. De besvarade markeringarna är borta, och beslutet står i `ARKITEKTUR.md` på
   **styckets egen plats**, med paket L namngivet som genomförare.
5. `grep -rn "ARKITEKTUR.md säger\|ARKITEKTUR.md anger\|ARKITEKTUR.md nämner\|tar inte ställning" src scripts`
   ger noll träffar — både inuti och utanför markeringar.
6. `npm run validate:data` tiger på korrekt kod, och `npm run build` är grön i
   slutläget. Ett rött mellanläge medan markeringarna får sina rader är förväntat;
   ingen får "laga" det genom att lyfta grinden ur kedjan.
7. Kommentarsblocken i de fyra berörda filerna lästa om i sin helhet, inte bara
   den ändrade raden.

---

## Paket H — Dokumentationen

**Agent:** dokumentator. **Förutsättning:** G klart och fynden åtgärdade, **och
paket L klart** — H:s verifiering kör `validate:data`, och L ändrar det scriptet.

**Ingår:** guiden uppdateras till de nio grupperna — hur Jelal lägger till,
ändrar och tar bort en kompetens eller en grupp, och att `filled` är borta efter
**A2**. Plus **listan över ändrade och borttagna filer** som uppdraget uttryckligen
beställer; den ska visa paket J:s filer som en egen grupp, eftersom de ligger
utanför innehållsuppdraget, och paket L:s och M:s som en egen, eftersom de är
processpaket.

**⚠️ `GUIDE.md` ÄR GENOMGÅENDE UPPHÄVD, INTE "TVÅ FEL".** Uppmätt av arkitekten
2026-10-08 i paket M. Hela skills-kapitlet beskriver ett arbetsflöde som inte
finns, och **följer Jelal guiden i dag fäller han bygget**:

- **rad 37:** "18 grupper och 307 kompetenser" — det är 9 grupper och 53.
- **rad 42–56:** instruerar honom att ändra `filled: false` till `filled: true`.
  Fältet finns inte efter **A2**, och grind 9 i `validate-data.mjs` fäller bygget
  på det (`okänt fält på skill`).
- **rad 64–71:** ber honom skriva in nya kompetenser i `skills-full.txt` och
  beskriver korsreferensen i båda riktningarna. Korsreferensen är borttagen i
  **A1**, och källistorna läses inte längre av något skript.
- **rad 232–235:** dokumenterar tre felmeddelanden som inte längre finns.
- **rad 257:** beskriver pillen. Komponenten heter `SkillChip` efter **A6** och
  har ett enda utseende.

Kapitlet ska **skrivas om**, inte lappas.

**KLAR-KRITERIUM FÖR SKILLS-KAPITLET: guiden ska spelas igenom, inte läsas.**
Varje instruktion utförs i ordning på en riktig kopia av datan, och `npm run
build` ska vara grön efter varje steg. En guide som bara lästs igenom är inte
verifierad — det var precis så de sex osanna ställena kunde uppstå.

**Två fel till i `GUIDE.md` som ska rättas här, så de inte tappas bort:**

1. **`GUIDE.md:179` säger "de tre linjerna".** Sidan renderar nu fem
   `section[id]`, alltså **fyra** linjer. Arkitekturens tabell över upphävda
   strängar förbjuder dessutom att antalet skrivs i prosa — en linje per par av
   renderade `section[id]` är regeln. Guiden ska därför inte byta tre mot fyra
   utan sluta ange ett antal.
2. **Samma stycke säger att sidans ordning styrs av skrivordningen i `App.jsx`.**
   `App.jsx` renderar numera ur en mappning. Stycket beskriver alltså en mekanism
   koden inte längre använder, och det är en fil Jelal redigerar efter — ett löfte
   i en sådan fil får aldrig vara osant (`LARDOMAR.md` 2026-10-05).

**Verifiering:** följ guiden ordagrant — lägg till en kompetens och en grupp,
utan att öppna en komponentfil — och kör `npm run validate:data` och
`npm run validate:tokens` efteråt. Kasta därefter om ordningen i `sections.js` och
kontrollera att guidens stycke om ordning stämmer med vad som faktiskt händer.
Går det inte är guiden eller arkitekturen fel, och paketet lämnas tillbaka.

---

## Risker

- **Den upphävda nämnaren eller talet `0,75` skrivs tillbaka.** Båda stod i denna
  plan och är upphävda av **A16**: `(window.innerHeight - 64)` ersätts av den
  mätta nämnaren, och `0,75` var kvoten mot hela vyporten. Den frestande utvägen
  är att behålla det gamla talet "som jämförelse". **Märks tidigt** genom att
  granskningens punkt 2 söker på båda strängarna i `src/`, `scripts/`, `PLAN.md`
  och varje överlämning, och genom att K:s bakgrundsstycke nu namnger dem som
  upphävda.
- **Två kvoter redovisas i mätrad 5 "för säkerhets skull".** Det är precis så de
  två läsningarna kunde leva sida vid sida i fyra mätrader. **Märks tidigt** genom
  att C punkt 5 skriver ut att en andra kvot gör mätraden **fel skriven**, och
  genom granskningens punkt 8.
- **Talet 64 smyger in i formeln som konstant.** Då har headerns höjd två
  sanningar igen — ett registrerat fel. **Märks tidigt** genom att C punkt 5
  kräver att nämnaren mäts på `header`-elementets rektangel, och att "headern är
  64 px" står som en **egen** grind.
- **C utvidgar mätserien.** `899 × 700` ser ut som ett fynd, och en sjunde rad ser
  ut som noggrannhet. Båda är nya arkitektbeslut. **Märks tidigt** genom att C:s
  "ingår INTE" säger sex rader, inte sju, och genom att punkt 5 namnger
  899 × 700 som icke-fynd med den uppmätta 418,984 ≤ 700 som skäl.
- **Gränsen mellan K och C löses upp.** Den frestande utvägen när en mätning i C
  fallerar är att rätta på plats. Då har grinden mätt sitt eget bygge. **Märks
  tidigt** genom C:s "ingår INTE" och granskningens punkt 8.
- **Paket M hoppas över, eller körs under G.** Hoppas det över graderar granskaren
  kod mot en norm som bär omärkt upphävd text; körs det under G är granskningen
  ogiltig för `ARKITEKTUR.md`. **Märks tidigt** genom att M blockerar G i
  beroendetabellen, genom att M:s punkt 5 kräver incheckning före
  `GRANSKNING-PAGAR`, och genom granskningens punkt 9.
- **M vidgas till "medan jag är i filen ändå".** Ett städpass i ett 6 000-raders
  dokument är det perfekta tillfället att smyga in ett nytt beslut. **Märks
  tidigt** genom att M:s punkt 3 kräver att diffens omfång redovisas och punkt 4
  att `git status` visar endast `ARKITEKTUR.md`.
- **`OPEN-KEY`-grinden införs utan att nyckelorden finns.** Då tiger den i varje
  körning och **ser ut** som ett skydd — sämre än ingen grind. **Märks tidigt**
  genom att L del 1 och del 2 ligger i samma paket, och genom att L:s punkt 1
  kräver ett framtvingat larm per delgrind med fil och rad.
- **Ett nyckelord skrivs in i `ARKITEKTUR.md` eller i `PLAN.md`.** Då fäller G2 i
  samma stund markeringen får sin rad. **Märks tidigt** genom att både A20 och
  detta avsnitt uttryckligen avstår från att ge ett exempel.
- **En markering besvaras utan att dess paket finns.** Exakt det återkommande
  felet (ÅTERKOMMANDE 3+). **Märks tidigt** genom villkoret att rundans beslut
  skrivs in först i samma redigering som paket L genomför dem.
- **De tre kommentarerna faller mellan paketen igen.** De hade inget paket, och
  `Projects.jsx` öppnas av J för en annan rad. **Märks tidigt** genom att J:s
  "ingår INTE" namnger rad 9 som L:s, och genom granskningens punkt 10.
- **Någon "lagar" det förväntade röda bygget i paket J eller L.** Grinden ska
  fälla. Den frestande utvägen är att återställa tokenet, lägga in ett undantag
  eller lyfta scriptet ur `build` — alla tre förstör grindens enda negativa
  kontroll. **Märks tidigt** genom att både J och L kräver att larmet redovisas
  med fil och rad, att det upphörde, och att `build` är grön i slutläget.
- **Paket J:s filer ändras av något annat paket.** **Märks tidigt** genom att
  varje annat pakets "ingår INTE" namnger dem, genom J:s markup-jämförelse
  före/efter, och genom granskningens punkt 7.
- **360 px-golvet spricker genom `.hero` som grid-container.** Registrerat
  återfall. **Märks tidigt** genom `minmax(0, 1fr)` i K:s block och genom att
  golvet mäts med programmatiskt insatt syntessträng mot hero:s egen behållare.
- **Knapparna får inte plats utan att något viker.** Den frestande utvägen är att
  korta texterna — de är exakta och får inte röras. **Märks tidigt** genom att C
  mäts på elementens rektanglar och att vikningsordningen är beslutad i förväg.
- **En trasig ankarlänk i Om mig.** **Märks tidigt** genom att paket F kräver en
  mekanisk kontroll att ingen `href` pekar på ett saknat id, och att båda lägena
  provas.
- **Citattecknen renderas, eller skalas av från en text där de är innehåll.**
  A14 är mekanisk just för att undvika bedömningen. **Märks tidigt** genom att
  F:s punkt 1 har tre utfall, varav det tredje är "lämna tillbaka till
  arkitekten" — inte "välj det rimligaste".
- **Kommentarer som blir falska i samma stund paketet är klart.** Posten är märkt
  ÅTERKOMMANDE (3+). **Märks tidigt** genom att varje paket har en egen punkt om
  att läsa om kommentarsblocken, genom `validate-tokens.mjs` och L:s tre
  delgrindar för de halvor som går att automatisera, och genom att granskaren kör
  de förbjudna strängarna mot `src/` **och** `GUIDE.md`.
- **Arbetsträdet ändras under granskningen.** Har hänt två gånger. **Märks
  tidigt** genom `GRANSKNING-PAGAR` och ändringslistan med datum vid start och
  slut.
- **Scope-glidning in i övriga sektioner.** **Märks tidigt** genom varje pakets
  "ingår INTE" och genom granskarens markup-jämförelse av projekt-, kontakt- och
  footer-sektionerna.
- **Ett nytt beroende smyger in för ikonernas skull.** A3 säger nej. **Märks
  tidigt** genom att `package.json` jämförs före och efter varje paket.
- **Uppdragstexten skrivs om av misstag.** Rättas ett "stavfel" i
  `UPPDRAG-2026-10-07.md` upphör normen att vara Jelals text. **Märks tidigt**
  genom att granskningens punkt 6 kontrollerar att filen är oförändrad sedan
  `5c62ac4`.
