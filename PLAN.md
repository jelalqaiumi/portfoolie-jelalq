# Plan: Byt innehållet i hero, "Om mig" och "Kompetenser" enligt Jelals uppdrag 2026-10-07, utan att röra sidans design eller övriga sektioner

Skriven 2026-10-08, uppdaterad samma dag efter arkitektens tolv beslut, och
uppdaterad igen samma dag efter **A13–A15** (`102cd91`) — tillägget av **paket K**
och de beroenden det flyttar.
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
aldrig mot en scratchpad-sökväg, och varje verifieringsrad i en överlämning ska
ange vilken fil den jämförde mot.

`BRIEF.md` är orörd och ska förbli det. Den beskriver det ursprungliga uppdraget
från 2026-10-06 och är historik; detta är ett eget, senare uppdrag.

---

## Status 2026-10-08, sent

| Vad | Läge |
|---|---|
| Paket A — tolv beslut A1–A12 | **Klart**, `f5559ae` |
| A13, A14, A15 | **Klara**, `102cd91` — listade i `ARKITEKTUR.md`, avsnittet "Paket A — besluten för innehållsuppdraget 2026-10-08, och var de står" |
| Paket B — hero: texter och knappar | **Klart**, `4defa9f`. A14 och A15 bekräftar bygget; **ingen ändring i hero behövs** |
| Paket K — heros höjd på dator | **Nytt. Fritt att starta nu.** Blockerar C |
| Paket C — mätserien | Blockerat av **K** (tidigare av B) |
| Paket D — kompetensdatan | **Körs just nu** |
| Paket E | Blockerat av D |
| Paket F — "Om mig" | **Fritt att starta nu** — A14 är avgjord, A4 och A15 fattade, A12 uppfyllt |
| Paket J | Fritt, men körs sist av byggpaketen |

**A12 — uppdragstexten måste bo i repot — är uppfyllt.** Filen
`UPPDRAG-2026-10-07.md` finns i projektroten.

Arkitektens beslutsnummer (A1–A15) är **inte** samma numrering som de nio frågor
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

- **2026-10-02, Process: tre av sju bindande beslut i `ARKITEKTUR.md`:s
  rättelselista saknas i koden.** Regeln: ett beslut i `ARKITEKTUR.md` får bara
  lämnas ogenomfört genom att arkitekten skriver om punkten, och byggaren
  besvarar varje numrerad punkt med `fil:rad`. → **Hela paket K finns av detta
  skäl.** A5:s `.hero`-block stod utskrivet som en deklaration och låg i inget
  pakets "Ingår", och var därför på väg att bli ett beslut som aldrig blev av.
- **2026-10-05, CSS: två bindande avståndsbeslut genomfördes med andra tokens än
  de beslutade.** Står ett CSS-värde utskrivet som en deklaration i
  `ARKITEKTUR.md` ska koden innehålla exakt den deklarationen, tecken för tecken.
  → Paket K:s enda innehåll är en sådan deklaration, och de två `min-height`-
  raderna är en **reservkedja**, inte en dubblett: ordningen `100vh` före `100svh`
  är en del av beslutet och får inte "städas".
- **2026-10-02 och 2026-10-05 (ÅTERFALL ×3), Kodkommentarer och dokument som
  beskriver ett tillstånd som hunnit bytas.** Det är skälet till att paket B
  **inte** återöppnas för `.hero`-blocket: får ett levererat paket nytt innehåll
  betyder "paket B klart" två olika saker beroende på datum, vilket är exakt det
  felläget. → K är ett eget paket: ett bygge, en incheckning, en betydelse.
- **2026-10-05, Arkitektur: en invariant som bara står i prosa försvaras av att
  någon läser den.** Går ett "får aldrig" att mäta är mätningen beslutet. → Därför
  är mätserien ett eget paket (C), och därför får **C inte bygga det den mäter**.
  En grind som mäter sitt eget bygge är ingen grind.
- **2026-10-05 (ÅTERKOMMANDE 3+), Process: `EJ I ARKITEKTUR`-markeringar står
  kvar på frågor arkitekturen avgjort.** En besvarad fråga = markeringen tas bort
  i **samma ändring** som beslutet genomförs. → Styr svaret på arkitektens fråga
  om beslutsrundan för heros fyra kvarvarande markeringar, se eget avsnitt nedan.
  Och: **A15 förbjuder markeringen för kodstruktur** — den är bara för öppna
  frågor om utseende och värden.
- **2026-10-08, Tillgänglighet: footerns text faller på AA, och tokenets namn är
  skälet till att det fick ligga kvar.** Uppmätt 3,893:1 mot kravet 4,5:1. → Hela
  **paket J** finns av detta skäl (A8).
- **2026-10-08 (ÅTERKOMMANDE 3+), Kodkommentarer: två kommentarer räknar upp en
  ombindning som togs bort.** `Projects.jsx:51` och `Skills.jsx:68`. → **Paket J**
  (A9), plus att `Skills.jsx`-stycket inte får skrivas av till den nya filen i
  paket E.
- **2026-10-02, Navigering: sektions-id som bokstavlig sträng i `.jsx`.** Heros
  två knappar hämtar id:t ur `sections.js` namngivna konstanter. → Verifierad i B.
- **2026-10-02, Navigering: en länk till ett sektions-id får bara renderas om
  sektionen finns i datan.** → Detta är hela svårigheten i Om mig-länken (paket F).
- **2026-10-02 (ÅTERFALL), CSS: 360 px-golvet sprack genom hero-gridden.**
  `overflow-wrap: break-word` minskar inte min-content-bredden; ett grid-spår bär
  min-content som sitt automatiska minimum. Regeln kräver `minmax(0, 1fr)` på
  behållaren **och** `anywhere` på texten. → Gäller **paket K**, som gör `.hero`
  till en grid-container (därför står `minmax(0, 1fr)` i blocket), och paket C
  och E.
- **2026-10-05, Grindar: en grind som fälls av fel skäl lär oss att ignorera
  den.** → A1 gör skills-grinden strukturell; samma krav gäller
  `validate-tokens.mjs`.
- **2026-10-05, Validering: mät artefakten, inte deklarationen.** Teckengrinden
  läser `cmap` ur woff2-filen. → Körs om i B och D mot de strängar byggaren
  faktiskt skriver. Samma lärdom i sin allmänna form bär **A14**: en norm som
  kräver tolkning är ingen norm, därför är citatteckenregeln mekanisk.
- **2026-10-05 (ÅTERFALL), Kodkommentarer bär påståenden dokumentet tagit
  tillbaka.** `Skills.module.css` och `SkillPill.module.css` bär talet 307 och en
  felaktig "längsta strängen". → Egna verifieringspunkter i D, E och J.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), Process: arbetsträdet var inte fryst
  under granskningen.** Filen `GRANSKNING-PAGAR` skapas i projektroten innan
  granskaren startas och raderas först när rapporten är levererad.
- **2026-10-02, Datadrivet: data utan verkan är död data.** `filled` tas bort (A2).
- **2026-10-05, Vaktrader går inte att få att larma.** Flyttas en sådan rad med
  till en ny layout ska den tvingas fallera på nytt där.
- **2026-10-02 + 2026-10-05, Verktyg och samordning: påstå aldrig att en server är
  startad eller stoppad utifrån startkommandots utdata.** Mät porten med
  `netstat` och klistra in raden, eller dess frånvaro.
- **2026-10-05, Mätning: mät aldrig `dist/` utan att binda det till källan.**
- **2026-10-02, Verktyg: ett skript som skriver artefakter kontrollerar efter att
  filerna redan är skrivna.** Scriptet och `package.json`-raden ligger i samma
  paket (J).

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
| A | ~~Arkitektbesluten~~ **KLART** — femton beslut A1–A15 i `ARKITEKTUR.md` (`f5559ae`, `102cd91`) | arkitekt | Klart 2026-10-08. Varje beslut står på den plats där det gamla beslutet stod, och beslutstabellen i "Paket A"-avsnittet pekar ut avsnitt och blockerat paket |
| B | ~~Hero: namn, rollrad, ingress och de två knapparna~~ **KLART** (`4defa9f`) — A14 och A15 bekräftar bygget, ingen ändring behövs | byggare | Klart. De tre texterna står tecken för tecken som i `UPPDRAG-2026-10-07.md`, knapparna scrollar till projekt respektive kontakt, sidan har exakt ett `h1`, inget sektions-id står som literal i `.jsx` |
| **K** | **Heros höjd på dator:** A5:s `@media (min-width: 900px)`-block genomförs i `Hero.module.css` (A13) | byggare | Blocket står i filen tecken för tecken, båda `min-height`-raderna i beslutets ordning, och `section#hero` höjd vid 1280 × 800 ligger i A5:s band — se eget avsnitt |
| C | **Mobilgrinden och desktopbandet:** A5:s mätserie körs (A5) | byggare | Alla sex raderna i mätserien redovisade som upprepbara kriterier, inte som iakttagelser. **C bygger ingenting** — fallerar en rad går fyndet tillbaka till K |
| D | Kompetensdatan: `src/data/skills.js` byts till de nio grupperna, och skills-grindarna i `validate-data.mjs` görs om (A1, A2) | byggare | De nio grupperna och alla punkter står exakt som i `UPPDRAG-2026-10-07.md`, `validate:data` tiger på korrekt data och larmar på trasig, och den gamla 307-listan finns inte kvar i någon datafil |
| E | Kompetensrenderingen: ett kort per grupp med `h3` och chips i `ul`/`li`, rutnät 3/2/1, inga ikoner, ingen animation (A2, A3, A6, A11, A15) | byggare | Nio kort, 3 per rad på dator, 2 på surfplatta, 1 på mobil, ingen nivåmätare, inget 360 px-överskridande mätt mot kortets egen behållare |
| F | "Om mig": den exakta texten, och "Hem och Ekonomi" i båda lägena via `about.link` (A4, A14, A15) | byggare | Texten står tecken för tecken som i `UPPDRAG-2026-10-07.md` **enligt A14:s mekaniska regel**, ingen länk pekar på ett id som inte finns, och texten bor som namngiven konstant om den ligger i en komponent |
| **J** | **Tillgänglighet och tokengrind — det enda paketet utanför Jelals uppdrag.** Footerns kontrast (A8) med fyra följdändringar, de två uppräknande kommentarerna (A9 del 1) och `scripts/validate-tokens.mjs` inkopplad i `build` (A9 del 2) | byggare | Se eget avsnitt nedan. Kriteriet är **mätt kontrast och en grind som larmat av rätt skäl och sedan tigit** — inte "texten står rätt", som är innehållspaketens kriterium |
| — | **LEVERANS — visa sidan för Jelal, redovisa de sex avvikelserna och hämta svar på de öppna punkterna. Här körs också arkitektens beslutsrunda för heros fyra kvarvarande `EJ I ARKITEKTUR`-markeringar** | projektledare + arkitekt | Jelal har sett hero, Om mig och Kompetenser i webbläsaren, de sex avvikelserna är uppläsna, och de fyra markeringarna är avgjorda med ett paket utpekat för genomförandet |
| G | Hård granskning av A–F, J och K, plus genomsökning efter rester av den gamla listan och efter kommentarer som blivit falska | granskare | Fynden nedtecknade i `LARDOMAR.md`, `GRANSKNING-PAGAR` skapad före start och raderad efter rapport |
| H | Dokumentation: hur Jelal ändrar de nio grupperna, listan över ändrade och borttagna filer, **plus de två felen i `GUIDE.md:179`** | dokumentator | En utomstående kan lägga till en kompetens utan att öppna en komponentfil, fil-listan är komplett, och `GUIDE.md` innehåller inget antal linjer och inget påstående om skrivordningen i `App.jsx` |

**Varför bokstaven K.** A–H och J är tagna och får inte numreras om —
`ARKITEKTUR.md` och tidigare överlämningar hänvisar till dem. `I` undviks av samma
skäl som angavs för J: "paket I" läses som prepositionen "i" och förväxlas med
siffran 1 i en överlämning. Alltså **K**.

### Beroenden — vad som är blockerat och vad som kan byggas direkt

| Paket | Status |
|---|---|
| A | **Klart.** A1–A12 (`f5559ae`), A13–A15 (`102cd91`). |
| B | **Klart** (`4defa9f`). Får inte återöppnas — se paket K:s avsnitt. |
| **K** | **Fritt att starta nu.** Förutsätter B klart (blocket ligger i den `Hero.module.css` B lämnade) och A13. |
| C | **Blockerat av K**, inte längre av B. C mäter det K byggt. |
| D | **Körs just nu.** |
| E | Blockerat av D, eftersom renderingen läser datan. A3, A6, A11 och A15 är fattade. |
| F | **Fritt att starta nu** — A4, A14 och A15 fattade, A12 uppfyllt. |
| J | Fritt att starta när som helst, men **körs sist av byggpaketen** — se motiveringen i avsnittet. Oberoende av B–F och K: ingen fil i J överlappar någon fil i dem, med undantag för `Skills.jsx:68`, som paket E skriver om ändå. |
| G | Blockerat av C, F, J och av LEVERANS. |
| H | Blockerat av G. |

**Riktningen mellan K och C är enkelriktad och det är hela poängen:** K bygger,
C mäter. **C fixar ingenting.** Fallerar en mätning i C redovisar C vad som
fallerade och lämnar fyndet tillbaka till **K**, som gör ändringen och lämnar
igen; C körs därefter om. A5:s ordning för vad som får vika — `padding-block`,
sedan ingressens grad, sedan stopp — är ett **genomförande** och genomförs i K,
aldrig av C.

---

## Paket K — heros höjd på dator

**Agent:** byggare. **Förutsättning:** B klart (`4defa9f`), A13. **Placering:**
mellan B och C, och **K blockerar C**.

**Varför paketet finns.** Arkitektens `.hero`-block med `min-height` står
utskrivet som en deklaration i beslut **A5**, men låg i inget pakets "Ingår".
Byggaren byggde det därför inte, och **det var rätt** — ett paket bygger inte
utanför sin egen uppräkning. Fyndet lämnades tillbaka med paket B. Följden är
verifierad i webbläsare på den incheckade koden: `min-height` finns **inte
någonstans** i `Hero.module.css`, och hero är **676 px på en vyport på 900 px,
alltså 0,75** av skärmen mot A5:s eget band **0,80–1,15**. Paket C:s krav faller
alltså som läget är. Mobilsidan håller redan: vid 390 × 844 är hero 0,93 och båda
knapparnas underkant ligger inom vyporten.

**Arkitekten stängde uttryckligen två vägar, och skälen hör till planen:**

| Väg | Varför inte |
|---|---|
| Lägga blocket i **paket C** | **Nej.** C är grinden. En grind som mäter sitt eget bygge är ingen grind — projektets regel, och den gäller utan undantag |
| **Återöppna paket B** | **Nej.** B är levererat och incheckat som `4defa9f`. Får det nytt innehåll betyder "paket B klart" två olika saker beroende på datum — exakt det felläge `LARDOMAR.md` registrerat **tre gånger**: ett dokument eller en kommentar som beskriver ett tillstånd som hunnit bytas. Ett levererat paket får inte få nytt innehåll |
| **Eget paket K** | **Valt.** Ett bygge, en incheckning, en betydelse |

**Ingår — exakt detta och inget mer:** `@media (min-width: 900px)`-blocket ur
**A5**, skrivet i `Hero.module.css` **tecken för tecken**, med **båda
`min-height`-raderna i beslutets ordning** (`100vh` som reserv **före** `100svh`).
Det är en reservkedja, inte en dubblett, och raden som står först får inte tas
bort som "duplikat".

**Ingår INTE:**
- Allt annat i hero: inga texter, inga knappstilar (de är genomförda i B med 19 av
  19 deklarationer identiska), ingen profilbildsändring, ingen animation.
- **Ingen av de fyra kvarvarande `EJ I ARKITEKTUR`-markeringarna i hero-filerna**
  (`sizes`-värdet, profilbildens `alt`-text, `.inner`-layouten, `contrast(1.05)`).
  De är ännu obesvarade av arkitekten, de är **korrekt märkta i dag**, och de ska
  stå kvar orörda. Beslutsrundan ligger vid LEVERANS — se eget avsnitt.
- Att mäta kravet. Mätningen är paket C, och K får inte föregripa den med en egen
  "det ser rätt ut".

**Klar när:**
1. Blocket står i `Hero.module.css`, och byggaren besvarar varje deklaration i
   A5:s block med `fil:rad` i överlämningen — fem deklarationer, fem rader. Ett
   grannvärde är en tyst omröstning om arkitektens beslut.
2. `minmax(0, 1fr)` står i blocket, eftersom `.hero` blir en grid-container och
   regeln gäller varje grid-container utan undantag (registrerat återfall).
3. `--header-height` används som token, inte som tal, så att det inte kan driva
   isär från `scroll-margin-top`.
4. `section#hero` höjd vid **1280 × 800** mätt på elementets egen rektangel med
   bevisad vyport, och kvoten mot `(window.innerHeight - 64)` **utskriven som ett
   tal** i överlämningen. Den ska ligga i A5:s band 0,80–1,15. Talet före
   ändringen (0,75 vid 900 px vyporthöjd) anges som jämförelse.
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

**Agent:** byggare. **Förutsättning:** **K klart.** **Beslut:** A5.

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
5. `section#hero` höjd vid 1280 × 800 mellan **0,80 och 1,15 ×**
   `(window.innerHeight - 64)`. Talet skrivs i överlämningen. Det är den rad K
   byggde för, och C är första gången den mäts av någon som inte byggde den.
6. Negativ kontroll: tvinga fram ett överskridande genom den **smalaste** selektor
   som träffar det som prövas, redovisa **vilket element** som bar avvikelsen
   (`scrollWidth` plus elementet med största `right`), kontrollera
   `querySelectorAll(sel).length`, och visa att larmet upphörde när injektionen
   togs bort.

---

## Paket D — Kompetensdatan

**Agent:** byggare. **Förutsättning:** A klart (**A1**, **A2**), A12 uppfyllt.
**Körs just nu.**

**Ingår:** `src/data/skills.js` byts till de nio grupperna med uppdragets exakta
punkter i uppdragets ordning. Grindarna i `scripts/validate-data.mjs` görs om
enligt **A1** — strukturell grind, korsreferensen och `MERGED` utgår, och de gamla
felmeddelandena får inte stå kvar som döda strängar. `filled` tas bort enligt
**A2**. Datafilens kommentar skrivs om — den lovar i dag saker om 307 poster och
om ifyllda skills som inte längre är sanna, och lärdomen från 2026-10-05 säger att
ett löfte i en fil Jelal redigerar aldrig får vara osant.

**Ingår INTE:** renderingen (paket E). Att hitta på en grupp eller en punkt som
inte står i uppdraget. Att behålla en enda post ur den gamla listan "för
säkerhets skull" — uppdraget säger att den ska tas bort helt, och den finns kvar i
git-historiken.

**Verifiering:**
1. De nio gruppnamnen och varje punkt jämförs **tecken för tecken** mot
   `UPPDRAG-2026-10-07.md`, maskinellt. Verifieringsraden anger filnamnet.
   Omslutande citattecken i uppdragsfilen är avgränsare enligt **A14**.
2. Ordningen är uppdragets ordning, både på grupperna och inom varje grupp.
3. `npm run validate:data` tiger på den korrekta datan.
4. Den nya grinden larmar: pröva varje obligatoriskt fält med tre värden —
   borttaget, tom sträng och bara blanksteg — i en kopia i scratch-katalogen.
   Lämna aldrig trasig data kvar.
5. Den åtgärd ett felmeddelande föreskriver ska få grinden att **tiga**. Gör den
   inte det är grinden trasig, inte sträng.
6. Varje tecken i de nya namnen finns i woff2-filens `cmap`, mätt på filen.
7. `npm run build` går igenom, och misslyckas med medvetet trasig data.
8. Ingen förekomst av den gamla listan kvar i någon fil under `src/data/`, och
   inget av A1:s uppräknade gamla felmeddelanden kvar i `scripts/`.

---

## Paket E — Kompetensrenderingen

**Agent:** byggare. **Förutsättning:** D klart. **Beslut:** A2, A3, A6, A11, A15.

**Ingår:** ett kort per grupp med gruppnamnet som `h3` och kompetenserna som
chips i en riktig `ul`/`li`. Rutnätet 3/2/1 enligt **A6**. **A3: inga ikoner, inget
nytt beroende.** Teckenförklaringen och den orange fyllningen tas bort enligt
**A2**. Stycket om `surface-light` i `Skills.jsx:68` skrivs **inte** av till den
nya filen (A9 del 1). Varje Jelal-ägd text som bor i en komponent står som
**modulnivåkonstant** med invariantkommentar och renderas som `{konstanten}`
(**A15**) — ingen sådan text som JSX-literal.

**Ingår INTE:** animation (A11 — uppdragets egen regel ger ingen). Nivåmätare,
procent eller stapel — uttryckligen förbjudet i uppdraget. Sökruta, filter,
räknare. Ändringar i andra sektioners CSS. Footerns och `tokens.css`-ändringarna
— de ligger i **paket J**. **Ingen `EJ I ARKITEKTUR`-markering på kodstruktur** —
från och med A15 är den förbjuden där; markeringen är bara för öppna frågor om
utseende och värden.

**Verifiering:**
1. Nio kort renderas. 3 per rad på dator, 2 på surfplatta, 1 på mobil — mätt på
   kortens rektanglar vid brytpunkterna och strax under dem.
2. Varje `h3` ligger under sidans enda `h1` och under sektionens `h2` i
   rubriknivå — ingen nivå hoppas över.
3. Chipsen ligger i `ul`/`li`. Ett chip utan namn renderar inget element, inte ett
   tomt.
4. 360 px-golvet: projektets längsta sträng programmatiskt insatt i ett chip och
   i en gruppubrik, mätt mot **kortets egen behållare**. Grid-lärdomen gäller
   fullt ut här — detta är en ny grid.
5. Ingen `transition` eller `animation` tillkommen **i Skills-filerna**. `grep`
   visar samma antal som före paketet. Räkningen gäller just de filerna och är
   inget förbud mot heros hover-övergångar i A5.
6. Kontrasten mätt på chipsen mot den yta de faktiskt ligger på, inte den de låg
   på förut, och kvoten skriven i `tokens.css` i lärdomens format.
7. Vaktraderna i `.pills`: varje rad som bär en kommentar om att den är nödvändig
   tvingas fallera på nytt i den **nya** layouten. Går ingen skillnad att mäta
   skrivs kommentaren om till "förebyggande, ingen uppmätt effekt i nuvarande
   layout".
8. Kommentarerna i `Skills.module.css` och `SkillPill.module.css` lästa om: talet
   307 och påståendet om "längsta strängen" är borta, och ingen kommentar
   upprepar ett värde som står någon annanstans.
9. `EJ I ARKITEKTUR`-markeringarna i Skills-filerna lästa mot `ARKITEKTUR.md`,
   besvarade borttagna i samma ändring. Ingen ny markering sätts på kodstruktur.
10. `npm run build` går igenom.

---

## Paket F — "Om mig"

**Agent:** byggare. **Förutsättning:** A klart (**A4**, **A14**, **A15**), A12
uppfyllt. **Fritt att starta nu.**

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
   Verifieringsraden anger filnamnet.
2. Bor någon av texterna i en komponent står den som **modulnivåkonstant** med
   invariantkommentar och renderas som `{konstanten}` (**A15**). Ingen Jelal-ägd
   text som JSX-literal. Texter i `src/data/` är redan maskinellt jämförbara och
   berörs inte.
3. Ingen `href` på sidan pekar på ett id som inte finns i den renderade markupen
   — kontrollerat mekaniskt, inte genom att klicka.
4. Det motsatta läget provas också: lägg in ett testprojekt med det id A4 anger,
   och bekräfta att länken dyker upp **utan** att texten redigeras. Ta bort
   testprojektet och bekräfta att länken försvinner utan att en trasig `href`
   lämnas kvar.
5. `npm run build` och `npm run validate:data` går igenom.
6. Kommentaren i `about.js` läst om: den beskriver i dag texten som ett
   byggarutkast som Jelal ska ersätta. Efter detta paket är texten Jelals egen,
   och kommentaren blir falsk om den står kvar.

---

## Paket J — Tillgänglighet och tokengrind

**Agent:** byggare. **Förutsättning:** A klart (**A8**, **A9**). Oberoende av B–F
och K. **Körs sist av byggpaketen, omedelbart före LEVERANS.**

**Detta är det ENDA paketet som rör filer utanför Jelals innehållsuppdrag:**
`src/components/Footer.module.css`, `src/styles/tokens.css`,
`src/components/ContactForm.module.css`, `src/components/Projects.jsx`, det nya
`scripts/validate-tokens.mjs` och `package.json`. Arkitektens skäl, ordagrant:
blandas A8 och A9 in i paket E går det inte att läsa ut vilken ändring som bar
vilket fynd, och uppdragets rad "Resten av portfolion är oförändrad" blir
omätbar.

**Varför sist av byggpaketen.** A9 kopplar in en ny grind i `build`-kedjan, och
varje annat pakets verifiering kör `npm run build`. Införs grinden mitt i B–F
eller K får de paketen ett rött bygge som inte hör till dem. Hela J görs därför i
ett svep — grind, tokenborttagning, fyra följdändringar, kommentaromskrivning —
så att kedjan är grön när paketet lämnas.

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
   ska vara borta — arkitekten lägger den borttagningen i paket E, eftersom filen
   skrivs om där ändå, och J **verifierar** att det inte skrivits av till den nya
   filen. Finns stycket kvar lämnas fyndet tillbaka till paket E, det rättas inte
   här.
5. **A9 del 2 — `scripts/validate-tokens.mjs`**, plus `validate:tokens` och den
   nya `build`-kedjan i `package.json`. Scriptet och raden läggs till i samma
   paket, enligt regeln från 2026-10-02. Deklarationerna står utskrivna i
   `ARKITEKTUR.md` och ska stå tecken för tecken i `package.json`.

**Ingår INTE:** att ändra något under `src/` som hör till B–F eller K. Att höja
`--color-text-dim`:s värde i stället för att ta bort tokenet — arkitekten har
avfärdat den vägen och skälet är tokennamnet, inte hexvärdet. Att utvidga grinden
till att läsa kommentarernas innebörd — arkitekten har avfärdat tre sådana
formuleringar.

**Ett rött bygge är ett förväntat mellanläge i detta paket, inte ett fel.**
Arkitekten kallar det att grinden bevisar sig själv i denna leverans: när
`--color-text-dim` tas bort **ska** `validate-tokens.mjs` fälla bygget på
`ContactForm.module.css:90` till dess att kommentaren är omskriven. Ingen får
"laga" det genom att kringgå grinden, lägga in ett undantag, återställa tokenet
eller flytta scriptet ur `build`. Enda tillåtna åtgärden är den som
felmeddelandet föreskriver: rätta referensen.

**Klar när — kriteriet är mätt kontrast och en grind som larmat av rätt skäl och
sedan tigit. Det skiljer sig medvetet från innehållspaketens "texten står tecken
för tecken":**
1. Footerns uppmätta kontrast mot den bakgrund den faktiskt ligger på är
   redovisad med kvot och med den `font-size` i px som avgör tröskeln — inte med
   tokennamnet som skäl.
2. `grep -rn "color: var(--color-text" src` listad, och för varje träff är
   elementets faktiska bakgrund och renderade px-storlek slagna upp och 4,5:1
   tillämpat (3,0:1 bara vid ≥ 24 px, och teckensnittet har bara vikt 400, så
   "fet" finns inte som utväg).
3. `grep -rn "\-\-color-text-dim" src scripts ARKITEKTUR.md` ger noll träffar
   utanför ett `UPPHÄVT`-stycke, och sökningen är redovisad i överlämningen — en
   borttagning är inte klar förrän den sökningen är gjord och visad.
4. **Grindens tre indata redovisade:** att den **larmade** på
   `ContactForm.module.css:90` med fil och rad utskriven, att larmet **upphörde**
   när kommentaren rättades, och att den **tiger** på korrekt kod. Plus ett
   framtvingat fel (ett påhittat `--color-*`-namn i en kopia) som visar att den
   larmar av rätt skäl.
5. `npm run validate:tokens` körd ensam, och `npm run build` grön i slutläget med
   den nya kedjan.
6. Renderad markup för projekt-, kontakt- och footersektionerna jämförd före och
   efter: den enda avsiktliga skillnaden är footerns textfärg. Det är vad som gör
   "Resten av portfolion är oförändrad" mätbart.
7. Kommentarsblocken i de berörda filerna lästa om: ingen kommentar räknar upp
   innehållet i ett block som ligger i en annan fil.

---

## Svar på arkitektens fråga: beslutsrundan för heros fyra markeringar ligger vid LEVERANS

De fyra kvarvarande `EJ I ARKITEKTUR`-markeringarna i hero — **`sizes`-värdet,
profilbildens `alt`-text, `.inner`-layouten och `contrast(1.05)`** — är
arkitektens att besvara, och de är **korrekt märkta i dag**. Posten om dem är
märkt **ÅTERKOMMANDE (3+)** i `LARDOMAR.md`.

**Beslut: rundan körs vid LEVERANS, inte före K och C.** Fyra skäl:

1. **Ingen av de fyra blockerar K eller C.** K:s omfattning är fastslagen tecken
   för tecken i A13 och rör inget av dem. C mäter och bygger inget. Att köra
   rundan först skulle fördröja K och C utan att ändra en rad i något av dem.
2. **Ett beslut före K skulle tvinga fram ett regelbrott.** Lärdomen
   (ÅTERKOMMANDE 3+) kräver att markeringen tas bort **i samma ändring som
   beslutet genomförs**. Det enda paket som rör hero-filerna är K, och K får
   enligt A13 inte röra markeringarna. Då återstår två utvägar, och båda är
   registrerade fellägen: antingen vidgas K:s omfattning (samma felläge som att
   återöppna B), eller så ligger en besvarad markering kvar i koden (exakt det
   återkommande felet). **Risken för det återkommande felet ökar om rundan körs
   nu — den minskar inte.** En markering som fortfarande är öppen är inte ett fel;
   felet uppstår när beslutet finns och markeringen står kvar.
3. **Två av de fyra är Jelals att se, inte bara arkitektens att lösa.**
   Profilbildens `alt`-text är text om Jelal, och `contrast(1.05)` är hur hans
   eget ansikte ser ut på sidan. Han är närvarande vid LEVERANS ändå, och
   arkitekten får då ett underlag som inte går att få fram före rundan.
4. **A13:s egen lärdom ska hålla även här:** "varje CSS-block jag skriver ut ska
   namnge det paket som genomför det, i samma stycke." Därför gäller detta
   villkor för rundan: **besluten skrivs in i `ARKITEKTUR.md` först i samma
   redigering som ett paket pekas ut för genomförandet** — ett paket efter
   LEVERANS, parallellt med att G:s fynd åtgärdas. Ingen av de fyra markeringarna
   får bli besvarad innan dess paket finns. Det är hela poängen med K, uttryckt
   som en regel i stället för som ett undantag.

**Till dess:** markeringarna står kvar orörda, var och en med meningen "ännu
obesvarad av arkitekten" i varje överlämning som rör hero-filerna (K punkt 6).
Granskaren i paket G **läser** dem mot `ARKITEKTUR.md` i stället för att räkna
dem, och ska finna att de fortfarande är obesvarade — att de står kvar är då det
rätta utfallet, inte ett fynd.

---

## LEVERANS — vad som visas och vad som ska sägas

**Agent:** projektledare (och arkitekten för beslutsrundan ovan).
**Förutsättning:** B, K, C, D, E, F och J klara.

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
   beskrivs och visas, och han ser dem på skärmen i samma svep.

---

## Paket G — Granskningen

**Agent:** granskare. **Förutsättning:** LEVERANS genomförd.

**Ingår:** `GRANSKNING-PAGAR` skapas i projektroten **innan** granskaren startas
och raderas först när rapporten är levererad. Ändringslistan med datum tas vid
start och vid slut; skiljer de sig är granskningen ogiltig för de filerna.
Därtill, utöver den vanliga genomgången:

1. Genomsökning efter **rester av den gamla listan** överallt: komponenter,
   datafiler, kommentarer, `skills.txt`, `skills-full.txt`, grindarna och
   `dist/`. Uppdraget nämner undersidor — sidan är ensidig, så det är trivialt
   uppfyllt, men det ska stå att det kontrollerats.
2. Arkitekturens tabell över förbjudna strängar körd mot `src/` och `scripts/`,
   inte bara mot `ARKITEKTUR.md`. Raden om "de tre linjerna" gäller också
   `GUIDE.md` — se paket H.
3. Varje `EJ I ARKITEKTUR`-markering läst mot `ARKITEKTUR.md`, inte räknad. För
   heros fyra: att de fortfarande är obesvarade är det **rätta** utfallet, enligt
   beslutet om rundan ovan.
4. `dist/` mätt bara i samma körning som ett ombyggt bygge, med byggkommandot och
   tidsstämpeln för senast ändrade fil under `src/` i rapporten.
5. Startas någon server: porten mäts med `netstat` före start och efter stopp, och
   raden klistras in.
6. **Varje "tecken för tecken"-påstående i en överlämning prövas om mot
   `UPPDRAG-2026-10-07.md`** — inte mot en text i en rapport, och med **A14:s
   mekaniska regel** som norm för avgränsarna. Filen ska vara oförändrad sedan
   `5c62ac4`; det kontrolleras.
7. **Paket J granskas som eget paket**, med frågan om någon fil utanför Jelals
   uppdrag har ändrats av något annat paket än J.
8. **Paket K och C granskas som två paket, inte ett.** Frågan är om C har byggt
   något, och om K har rört något utanför A5:s block — särskilt de fyra
   markeringarna. Blandas de ihop är grinden förlorad.

---

## Paket H — Dokumentationen

**Agent:** dokumentator. **Förutsättning:** G klart och fynden åtgärdade.

**Ingår:** guiden uppdateras till de nio grupperna — hur Jelal lägger till,
ändrar och tar bort en kompetens eller en grupp, och att `filled` är borta efter
**A2**. Plus **listan över ändrade och borttagna filer** som uppdraget uttryckligen
beställer; den ska visa paket J:s filer som en egen grupp, eftersom de ligger
utanför innehållsuppdraget.

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

- **Gränsen mellan K och C löses upp.** Den frestande utvägen när en mätning i C
  fallerar är att rätta på plats — en rad `padding-block` är tio sekunders arbete.
  Då har grinden mätt sitt eget bygge, och A13:s hela skäl är borta. **Märks
  tidigt** genom att C:s "ingår INTE" namnger just den utvägen, genom att A5:s
  viknings­ordning står som K:s genomförande, och genom granskningens punkt 8.
- **K vidgas till "medan jag är i filen ändå".** Hero-filerna bär fyra öppna
  markeringar och en del äldre kommentarer, och det är lockande att städa dem i
  samma svep. Då betyder "paket K" något annat än A13 säger. **Märks tidigt**
  genom att K kräver `fil:rad` för fem deklarationer och ingenting mer, och genom
  att markeringsantalet före och efter paketet ska vara lika.
- **En av de två `min-height`-raderna tas bort som duplikat.** Den som läser
  blocket utan beslutet ser två rader med samma egenskap. Det är en reservkedja.
  **Märks tidigt** genom att K:s kriterium kräver båda raderna i beslutets
  ordning, redovisade med `fil:rad`.
- **Ett golv införs även på mobil.** `min-height` på hero är lätt att skriva utan
  mediafrågan, och då tvingas tomrum fram på en låg telefon — alltså motverkas
  uppdragets hårdaste krav av den åtgärd som skulle uppfylla det andra. **Märks
  tidigt** genom K:s punkt 5 och genom C:s rad 1, där 360 × 640 är golvet.
- **Någon "lagar" det förväntade röda bygget i paket J.** Grinden ska fälla
  bygget på `ContactForm.module.css:90` när `--color-text-dim` tas bort. Den
  frestande utvägen är att återställa tokenet, lägga in ett undantag eller lyfta
  scriptet ur `build` — alla tre förstör grindens enda negativa kontroll och
  lämnar AA-felet kvar. **Märks tidigt** genom att J:s klar-kriterium kräver att
  larmet redovisas med fil och rad, att det upphörde, och att `build` är grön i
  slutläget.
- **Paket J:s filer ändras av något annat paket.** Då går det inte att läsa ut
  vilken ändring som bar vilket fynd. **Märks tidigt** genom att varje annat
  pakets "ingår INTE" namnger dem, genom J:s markup-jämförelse före/efter, och
  genom granskningens punkt 7.
- **`validate:data` fäller bygget på helt korrekt data.** A1 gör om grindarna.
  **Märks tidigt** genom att paket D kräver att grinden tiger på korrekt data
  innan något annat verifieras.
- **360 px-golvet spricker genom den nya kortgridden eller genom `.hero` som ny
  grid-container.** Det har redan hänt en gång genom hero-gridden, och posten är
  ett registrerat återfall. **Märks tidigt** genom `minmax(0, 1fr)` i K:s block
  och genom att golvet mäts med programmatiskt insatt syntessträng mot hero:s
  respektive kortets egen behållare.
- **Knapparna får inte plats utan att något viker.** Den frestande utvägen är att
  korta texterna — de är exakta och får inte röras. **Märks tidigt** genom att C
  mäts på elementens rektanglar och att vikningsordningen är beslutad i förväg.
- **Ett tecken i de nya strängarna saknas i teckensnittsfilen.** **Märks tidigt**
  genom mätning mot `cmap` i både B och D, på de strängar byggaren faktiskt
  skriver.
- **En trasig ankarlänk i Om mig.** **Märks tidigt** genom att paket F kräver en
  mekanisk kontroll att ingen `href` pekar på ett saknat id, och att båda lägena
  provas.
- **Citattecknen renderas, eller skalas av från en text där de är innehåll.**
  A14 är mekanisk just för att undvika bedömningen. **Märks tidigt** genom att
  F:s punkt 1 har tre utfall, varav det tredje är "lämna tillbaka till
  arkitekten" — inte "välj det rimligaste".
- **Kommentarer som blir falska i samma stund paketet är klart.** Posten är märkt
  ÅTERKOMMANDE (3+). **Märks tidigt** genom att varje paket har en egen punkt om
  att läsa om kommentarsblocken, genom `validate-tokens.mjs` för den halva som går
  att automatisera, och genom att granskaren kör de förbjudna strängarna mot
  `src/` **och** `GUIDE.md`.
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
