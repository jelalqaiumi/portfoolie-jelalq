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
| Paket F — "Om mig" | **Byggs just nu** |
| Paket J | Fritt, men körs sist av byggpaketen |
| **Paket M** — arkitektens städpass i `ARKITEKTUR.md` | **Nytt.** Körs när F har lämnat, **före LEVERANS och absolut före G** |
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
| F | "Om mig": den exakta texten, och "Hem och Ekonomi" i båda lägena via `about.link` (A4, A14, A15) | byggare | **Byggs just nu.** Texten står tecken för tecken som i `UPPDRAG-2026-10-07.md` enligt A14:s mekaniska regel, ingen länk pekar på ett id som inte finns, och texten bor som namngiven konstant om den ligger i en komponent |
| J | **Tillgänglighet och tokengrind — det enda byggpaketet utanför Jelals uppdrag.** Footerns kontrast (A8) med fyra följdändringar, de två uppräknande kommentarerna (A9 del 1) och `scripts/validate-tokens.mjs` inkopplad i `build` (A9 del 2) | byggare | Se eget avsnitt nedan. Kriteriet är **mätt kontrast och en grind som larmat av rätt skäl och sedan tigit** — inte "texten står rätt", som är innehållspaketens kriterium |
| **M** | **Arkitektens städpass:** den omärkt upphävda texten om `MERGED` och `filled` i `ARKITEKTUR.md` märks eller stryks på sin egen plats | arkitekt | Noll träffar på `MERGED` och på `filled` utanför ett `UPPHÄVT`-stycke, sökningen redovisad. **Rör ingen fil utom `ARKITEKTUR.md`.** Måste vara klart före LEVERANS och **absolut före G** |
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
| F | **Byggs just nu.** |
| J | Fritt att starta när som helst, men **körs sist av byggpaketen** — se motiveringen i avsnittet. Oberoende av B–F och K. |
| **M** | Fritt när **F har lämnat**. Körs **före LEVERANS** och **blockerar G**. Får inte köras under G. |
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

## Paket F — "Om mig" (BYGGS JUST NU)

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

## Paket J — Tillgänglighet och tokengrind

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

## Paket M — arkitektens städpass i `ARKITEKTUR.md`

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

**Två fel i `GUIDE.md` som ska rättas här, så de inte tappas bort:**

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
