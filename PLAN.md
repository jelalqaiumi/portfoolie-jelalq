# Plan: Byt innehållet i hero, "Om mig" och "Kompetenser" enligt Jelals uppdrag 2026-10-07, utan att röra sidans design eller övriga sektioner

Skriven 2026-10-08, uppdaterad samma dag efter arkitektens tolv beslut.
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

## Status: paket A är klart, A12 är uppfyllt

**Arkitekten har fattat alla tolv besluten.** De listas i `ARKITEKTUR.md`,
avsnittet "Paket A — besluten för innehållsuppdraget 2026-10-08, och var de
står". Det är enda stället som listar dem; ingen byggare behöver läsa dokumentet
uppifrån och ner.

**A12 — uppdragstexten måste bo i repot — är uppfyllt.** Filen
`UPPDRAG-2026-10-07.md` finns i projektroten. Blockeringen av paket B, D och F
är därmed hävd, och **paket B är startat och körs**.

Arkitektens beslutsnummer (A1–A12) är **inte** samma numrering som de nio frågor
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

---

## Lärdomar som gäller här

Varje "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar denna plan
konkret, i klartext:

- **2026-10-08, Tillgänglighet: footerns text faller på AA, och tokenets namn är
  skälet till att det fick ligga kvar.** Uppmätt 3,893:1 mot kravet 4,5:1. Regeln
  kräver att varje `--color-text*`-token bär sin uppmätta kvot mot varje bakgrund
  det används mot, och att värdet ändras hellre än att kvoten dokumenteras som
  undantag. → Hela **paket J** finns av detta skäl (A8).
- **2026-10-08 (ÅTERKOMMANDE 3+), Kodkommentarer: två kommentarer räknar upp en
  ombindning som togs bort.** `Projects.jsx:51` och `Skills.jsx:68`. Regeln säger
  att en borttagning inte är klar förrän tokennamnet är sökt i hela projektet och
  varje träff rättad, redovisat i överlämningen. → **Paket J** (A9), plus att
  `Skills.jsx`-stycket inte får skrivas av till den nya filen i paket E.
- **2026-10-02, Navigering: sektions-id som bokstavlig sträng i `.jsx`.** Heros
  två knappar är nya länkar till sektioner. De ska hämta id:t ur `sections.js`
  namngivna konstanter — ett sektions-id får aldrig stå som literal i en
  `.jsx`-fil. → Verifieringspunkt i paket B.
- **2026-10-02, Navigering: en länk till ett sektions-id får bara renderas om
  sektionen finns i datan.** → Detta är hela svårigheten i Om mig-länken
  (paket F). En ankarlänk till ett `#hem-och-ekonomi` som inte finns är exakt det
  mönster arkitekturen redan förbjudit.
- **2026-10-02 (ÅTERFALL), CSS: 360 px-golvet sprack genom hero-gridden.**
  `overflow-wrap: break-word` minskar inte min-content-bredden; ett grid-spår bär
  min-content som sitt automatiska minimum. Regeln kräver `minmax(0, 1fr)` på
  behållaren **och** `anywhere` på texten, och att golvet verifieras genom att
  programmatiskt sätta in projektets längsta sträng — aldrig genom att titta på
  sidan. → Gäller paket C och E, som båda rör grid.
- **2026-10-05, Grindar: en grind som fälls av fel skäl lär oss att ignorera
  den.** Den gamla korsreferensen mot `skills.txt`/`skills-full.txt` hade fällts
  av en helt legitim ändring; A1 gör därför grinden strukturell i stället för att
  dokumentera ett undantag. Samma krav gäller den nya `validate-tokens.mjs`:
  arkitekten har skrivit ut vilken ändring som får fälla den.
- **2026-10-05, Validering: mät artefakten, inte deklarationen.** Teckengrinden
  läser `cmap` ur woff2-filen. Arkitekten har mätt att varje tecken i uppdragets
  nya texter finns i filen, inklusive `U+00B7` i rollraden — men mätningen gällde
  de strängar arkitekten kunde läsa. → Körs om i paket B och D mot de strängar
  byggaren faktiskt skriver.
- **2026-10-05 (ÅTERKOMMANDE 3+), Process: `EJ I ARKITEKTUR`-markeringar står
  kvar på frågor arkitekturen avgjort.** Hero.jsx och Skills-filerna bär sådana
  markeringar i dag. Varje paket avslutas med att läsa varje markering i de
  berörda filerna mot `ARKITEKTUR.md` och ta bort de besvarade i samma ändring.
- **2026-10-05 (ÅTERFALL), Kodkommentarer bär påståenden dokumentet tagit
  tillbaka.** `Hero.jsx` har en daterad kommentar om att Jelal bytt bort
  "Systemutvecklare"; uppdraget är nyare och återinför ordet (A7).
  `Skills.module.css` och `SkillPill.module.css` bär talet 307 och en felaktig
  "längsta strängen". Lämnas de kvar blir de falska i samma stund paketen är
  klara. → Egna verifieringspunkter i B, D, E och J. En kommentar ska bära
  invarianten, inte värdet.
- **2026-10-05, CSS: beslutade deklarationer genomfördes med grannvärden.** Står
  ett värde utskrivet som en deklaration i `ARKITEKTUR.md` ska koden innehålla
  exakt det, tecken för tecken, och byggaren besvarar varje sådan punkt med
  `fil:rad` i överlämningen. Det gäller också `package.json`-raderna i A9.
- **2026-10-05, Arkitektur: en invariant som bara står i prosa försvaras av att
  någon läser den.** Går ett "får aldrig" att mäta är mätningen beslutet. →
  Därför är "knapparna syns utan scroll på mobil" ett eget paket (C) med en
  mätserie, inte en mening i ett annat pakets verifiering.
- **2026-10-05, Verifiering: ett larm är inte ett kvitto förrän man vet vad som
  larmade.** Varje negativ kontroll ska redovisa att den larmade, vilket element
  eller vilken rad som bar avvikelsen, och att larmet upphörde när injektionen
  togs bort. → Avgörande i paket J, där grindens första larm är en del av
  leveransen.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), Process: arbetsträdet var inte fryst
  under granskningen.** Filen `GRANSKNING-PAGAR` skapas i projektroten innan
  granskaren startas och raderas först när rapporten är levererad. Byggaren och
  arkitekten kontrollerar att den inte finns innan de ändrar något under `src/`,
  `scripts/`, `dist/` eller `ARKITEKTUR.md`.
- **2026-10-02, Datadrivet: data utan verkan är död data.** `filled` tappar sin
  betydelse och tas bort enligt A2 — det får inte ligga kvar utan verkan.
- **2026-10-05, Vaktrader går inte att få att larma.** `Skills.module.css` bär
  rader som påstås hålla pillens höjd men som inte gick att få att larma i
  nuvarande layout. Paket E byter layouten till kort. Flyttas en sådan rad med
  ska den tvingas fallera på nytt i den nya layouten, annars skrivs kommentaren
  om till "förebyggande, ingen uppmätt effekt".
- **2026-10-02 + 2026-10-05, Verktyg och samordning: påstå aldrig att en server
  är startad eller stoppad utifrån startkommandots utdata.** Mät porten med
  `netstat` och klistra in raden, eller dess frånvaro. Starta aldrig en server i
  förgrunden; avsluta via PID på porten.
- **2026-10-05, Mätning: mät aldrig `dist/` utan att binda det till källan.**
  Bygg om omedelbart före mätningen.
- **2026-10-02, Verktyg: ett skript som skriver artefakter kontrollerar efter att
  filerna redan är skrivna.** Gäller inte `validate-tokens.mjs`, som inget
  skriver — men regeln "ett npm-script läggs till i samma paket som filen det
  anropar" gäller fullt ut: scriptet och `package.json`-raden ligger i samma
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
| A | ~~Arkitektbesluten~~ **KLART** — tolv beslut A1–A12 i `ARKITEKTUR.md` | arkitekt | Klart 2026-10-08. Varje beslut står på den plats där det gamla beslutet stod, och beslutstabellen i "Paket A"-avsnittet pekar ut avsnitt och blockerat paket |
| B | Hero: namn, rollrad, ingress och de två knapparna — exakta texter (A5, A7, A10) | byggare | De tre texterna står tecken för tecken som i `UPPDRAG-2026-10-07.md`, knapparna scrollar till projekt respektive kontakt, sidan har exakt ett `h1`, inget sektions-id står som literal i `.jsx` |
| C | **Mobilgrinden:** knapparna ska synas utan scroll på 360 px, och hero ska fylla ungefär första skärmen på dator (A5) | byggare | En mätserie visar att båda knapparnas underkant ligger inom vyporten på de uppmätta höjderna, och mätningen är skriven som ett upprepbart kriterium, inte som en iakttagelse |
| D | Kompetensdatan: `src/data/skills.js` byts till de nio grupperna, och skills-grindarna i `validate-data.mjs` görs om (A1, A2) | byggare | De nio grupperna och alla punkter står exakt som i `UPPDRAG-2026-10-07.md`, `validate:data` tiger på korrekt data och larmar på trasig, och den gamla 307-listan finns inte kvar i någon datafil |
| E | Kompetensrenderingen: ett kort per grupp med `h3` och chips i `ul`/`li`, rutnät 3/2/1, inga ikoner, ingen animation (A2, A3, A6, A11) | byggare | Nio kort, 3 per rad på dator, 2 på surfplatta, 1 på mobil, ingen nivåmätare, inget 360 px-överskridande mätt mot kortets egen behållare |
| F | "Om mig": den exakta texten, och "Hem och Ekonomi" i båda lägena via `about.link` (A4) | byggare | Texten står tecken för tecken som i `UPPDRAG-2026-10-07.md`, och ingen länk pekar på ett id som inte finns |
| **J** | **Tillgänglighet och tokengrind — det enda paketet utanför Jelals uppdrag.** Footerns kontrast (A8) med fyra följdändringar, de två uppräknande kommentarerna (A9 del 1) och `scripts/validate-tokens.mjs` inkopplad i `build` (A9 del 2) | byggare | Se eget avsnitt nedan. Kriteriet är **mätt kontrast och en grind som larmat av rätt skäl och sedan tigit** — inte "texten står rätt", som är innehållspaketens kriterium |
| — | **LEVERANS — visa sidan för Jelal, redovisa de sex avvikelserna och hämta svar på de öppna punkterna** | projektledare | Jelal har sett hero, Om mig och Kompetenser i webbläsaren, och de sex avvikelserna är uppläsna, inte förbigångna |
| G | Hård granskning av A–F och J, plus genomsökning efter rester av den gamla listan och efter kommentarer som blivit falska | granskare | Fynden nedtecknade i `LARDOMAR.md`, `GRANSKNING-PAGAR` skapad före start och raderad efter rapport |
| H | Dokumentation: hur Jelal ändrar de nio grupperna, plus listan över ändrade och borttagna filer som uppdraget beställer | dokumentator | En utomstående kan lägga till en kompetens utan att öppna en komponentfil, och fil-listan är komplett |

**Varför bokstaven J.** A–H är tagna och får inte numreras om — `ARKITEKTUR.md`
och tidigare överlämningar hänvisar till dem. `I` undviks eftersom "paket I" läses
som prepositionen "i" och förväxlas med siffran 1 i en överlämning. Alltså **J**.

### Beroenden — vad som är blockerat och vad som kan byggas direkt

| Paket | Status |
|---|---|
| A | **Klart.** Tolv beslut fattade 2026-10-08. |
| B | **Startat och körs.** A12-blockeringen är hävd: uppdragstexten finns i `UPPDRAG-2026-10-07.md`. |
| C | Blockerat av B. Mäter det B byggt. |
| D | Fritt att starta — A1 och A2 är fattade och A12 är uppfyllt. |
| E | Blockerat av D, eftersom renderingen läser datan. A3, A6 och A11 är fattade. |
| F | Fritt att starta — A4 är fattad och A12 är uppfyllt. |
| J | **Fritt att starta när som helst, men körs sist av byggpaketen** — se motiveringen i avsnittet. Oberoende av B–F: ingen fil i J överlappar någon fil i B–F, med undantag för `Skills.jsx:68`, som paket E skriver om ändå. |
| G | Blockerat av F, J och av LEVERANS. |
| H | Blockerat av G. |

---

## Paket B — Hero: texterna och knapparna

**Agent:** byggare. **Förutsättning:** A klart, A12 uppfyllt. **Startat.**

**Ingår:** namnet som `h1`, rollraden, ingressen och de två knapparna, med
uppdragets exakta texter. Knapparna hämtar sina mål ur `sections.js` namngivna
konstanter. Omskrivningen av den daterade rollkommentaren enligt **A7**, och
`<title>` i `index.html` enligt samma beslut.

**Ingår INTE:** profilbildens storlek och placering (paket C), GitHub- och
LinkedIn-ikonlänkar (**A10: inga ikonlänkar i hero**), någon animation (A11),
någon JS-scrollning.

**Verifiering:**
1. De tre texterna jämförs **tecken för tecken** mot `UPPDRAG-2026-10-07.md`,
   maskinellt — inte genom att läsas. Ingen omskrivning, ingen ändrad
   interpunktion. Verifieringsraden i överlämningen anger filnamnet.
2. Sidan har exakt ett `h1`, och det innehåller namnet.
3. `grep` efter sektions-id som literaler i `.jsx` ger inga träffar utanför
   kommentarer.
4. Båda knapparna leder till ett id som finns i `sections.js`, och klick landar
   under den sticky headern utan att rubriken skyms.
5. Varje tecken i de nya strängarna finns i woff2-filens `cmap` — mätt på filen,
   inte på `unicode-range`. Arkitekten har mätt `U+00B7` och funnit det i filen;
   mätningen körs ändå om mot de strängar som faktiskt skrivs.
6. `npm run build` och `npm run validate:data` går igenom.
7. Varje `EJ I ARKITEKTUR`-markering i `Hero.jsx` läses mot `ARKITEKTUR.md`; de
   besvarade tas bort i samma ändring, de kvarvarande redovisas med meningen
   "ännu obesvarad av arkitekten".
8. Kommentarsblocken i `Hero.jsx` lästa om: ingen kommentar bär längre ett
   påstående som blivit falskt av detta paket.

---

## Paket C — Mobilgrinden: knapparna utan scroll

**Agent:** byggare. **Förutsättning:** B klart. **Beslut:** A5.

Detta är uppdragets hårdaste krav och därför ett eget paket. Hero ska rymma namn,
rollrad, ingress, två knappar **och** en rund profilbild — på 360 px bredd, där
den användbara spaltbredden är 309 px enligt arkitekturens egen mätning.

**Ingår:** att genomföra A5:s mätserie, och att skriva kravet som en **mätserie** i
stället för som en mening. Lärdomen från 2026-10-05 är tydlig: går ett "får
aldrig" att mäta är mätningen beslutet och prosan bara förklaringen.

**Ingår INTE:** att ändra texterna för att få plats — de är exakta. Att ta bort
profilbilden utan att det står som ett beslut. Att byta typsnittsgrader på hela
sidan.

**Klar när:**
1. Båda knappelementens underkant ligger inom vyporten vid 360 px bredd på de
   höjder som mäts — den lägsta rimliga telefonhöjden ska ingå, inte bara en
   bekväm. Mätt på elementens egna rektanglar, aldrig genom att titta på sidan.
2. Mätningen är icke-avtagande över en serie bredder, så att en framtida
   brytpunkt inte kan smyga sönder den — samma form som cirkelns monotonikontroll
   i arkitekturen.
3. Överskridanden mäts mot **hero:s egen behållare**, inte mot sidan: slack
   absorberar fel, och absorberade fel larmar inte.
4. Inget 360 px-överskridande med projektets längsta sträng programmatiskt
   insatt i varje textelement i hero — den återkommande grid-lärdomen.
5. "Hero fyller ungefär första skärmen på dator" mätt på en desktopbredd, med
   talet skrivet i överlämningen.
6. En negativ kontroll som visar att mätningen faktiskt kan larma: tvinga fram
   ett överskridande, redovisa vilket element som bar det, och visa att larmet
   upphörde när injektionen togs bort.

---

## Paket D — Kompetensdatan

**Agent:** byggare. **Förutsättning:** A klart (**A1**, **A2**), A12 uppfyllt.

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

**Agent:** byggare. **Förutsättning:** D klart. **Beslut:** A2, A3, A6, A11.

**Ingår:** ett kort per grupp med gruppnamnet som `h3` och kompetenserna som
chips i en riktig `ul`/`li`. Rutnätet 3/2/1 enligt **A6**. **A3: inga ikoner, inget
nytt beroende.** Teckenförklaringen och den orange fyllningen tas bort enligt
**A2**. Stycket om `surface-light` i `Skills.jsx:68` skrivs **inte** av till den
nya filen (A9 del 1).

**Ingår INTE:** animation (A11 — uppdragets egen regel ger ingen). Nivåmätare,
procent eller stapel — uttryckligen förbjudet i uppdraget. Sökruta, filter,
räknare. Ändringar i andra sektioners CSS. Footerns och `tokens.css`-ändringarna
— de ligger i **paket J**, och blandas de in här går det inte att läsa ut vilken
ändring som bar vilket fynd.

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
   besvarade borttagna i samma ändring.
10. `npm run build` går igenom.

---

## Paket F — "Om mig"

**Agent:** byggare. **Förutsättning:** A klart (**A4**), A12 uppfyllt.

**Ingår:** uppdragets exakta text i `src/data/about.js`, och "Hem och Ekonomi" i
båda lägena via `about.link` enligt **A4**.

**Ingår INTE:** att lägga till en bild i sektionen — det finns ingen att behålla,
och att införa en är ett nytt beslut, inte ett "behåll". Att hitta på innehåll om
projektet Hem och Ekonomi. Att hitta på något om Jelals bakgrund utöver textens
egna ord: texten säger att han bor i Motala och är i början av sin karriär, och
**inget mer om hans bakgrund får läggas till någonstans på sidan**.

**Verifiering:**
1. Texten jämförs **tecken för tecken** mot `UPPDRAG-2026-10-07.md`, maskinellt.
   Den är en sammanhängande text; om den delas i stycken får inget tecken ändras.
   Verifieringsraden anger filnamnet.
2. Ingen `href` på sidan pekar på ett id som inte finns i den renderade markupen
   — kontrollerat mekaniskt, inte genom att klicka.
3. Det motsatta läget provas också: lägg in ett testprojekt med det id A4 anger,
   och bekräfta att länken dyker upp **utan** att texten redigeras. Ta bort
   testprojektet och bekräfta att länken försvinner utan att en trasig `href`
   lämnas kvar.
4. `npm run build` och `npm run validate:data` går igenom.
5. Kommentaren i `about.js` lästs om: den beskriver i dag texten som ett
   byggarutkast som Jelal ska ersätta. Efter detta paket är texten Jelals egen,
   och kommentaren blir falsk om den står kvar.

---

## Paket J — Tillgänglighet och tokengrind

**Agent:** byggare. **Förutsättning:** A klart (**A8**, **A9**). Oberoende av B–F.
**Körs sist av byggpaketen, omedelbart före LEVERANS.**

**Detta är det ENDA paketet som rör filer utanför Jelals innehållsuppdrag:**
`src/components/Footer.module.css`, `src/styles/tokens.css`,
`src/components/ContactForm.module.css`, `src/components/Projects.jsx`, det nya
`scripts/validate-tokens.mjs` och `package.json`. Arkitektens skäl, ordagrant:
blandas A8 och A9 in i paket E går det inte att läsa ut vilken ändring som bar
vilket fynd, och uppdragets rad "Resten av portfolion är oförändrad" blir
omätbar.

**Varför sist av byggpaketen.** A9 kopplar in en ny grind i `build`-kedjan, och
varje annat pakets verifiering kör `npm run build`. Införs grinden mitt i B–F får
de paketen ett rött bygge som inte hör till dem. Hela J görs därför i ett svep —
grind, tokenborttagning, fyra följdändringar, kommentaromskrivning — så att
kedjan är grön när paketet lämnas.

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

**Ingår INTE:** att ändra något under `src/` som hör till B–F. Att höja
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

## LEVERANS — vad som visas och vad som ska sägas

**Agent:** projektledare. **Förutsättning:** B, C, D, E, F och J klara.

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
   inte bara mot `ARKITEKTUR.md`.
3. Varje `EJ I ARKITEKTUR`-markering läst mot `ARKITEKTUR.md`, inte räknad.
4. `dist/` mätt bara i samma körning som ett ombyggt bygge, med byggkommandot och
   tidsstämpeln för senast ändrade fil under `src/` i rapporten.
5. Startas någon server: porten mäts med `netstat` före start och efter stopp, och
   raden klistras in.
6. **Varje "tecken för tecken"-påstående i en överlämning prövas om mot
   `UPPDRAG-2026-10-07.md`** — inte mot en text i en rapport. Filen ska vara
   oförändrad sedan `5c62ac4`; det kontrolleras.
7. **Paket J granskas som eget paket**, med frågan om någon fil utanför Jelals
   uppdrag har ändrats av något annat paket än J.

---

## Paket H — Dokumentationen

**Agent:** dokumentator. **Förutsättning:** G klart och fynden åtgärdade.

**Ingår:** guiden uppdateras till de nio grupperna — hur Jelal lägger till,
ändrar och tar bort en kompetens eller en grupp, och att `filled` är borta efter
**A2**. Plus **listan över ändrade och borttagna filer** som uppdraget uttryckligen
beställer; den ska visa paket J:s filer som en egen grupp, eftersom de ligger
utanför innehållsuppdraget.

**Verifiering:** följ guiden ordagrant — lägg till en kompetens och en grupp,
utan att öppna en komponentfil — och kör `npm run validate:data` och
`npm run validate:tokens` efteråt. Går det inte är guiden eller arkitekturen fel,
och paketet lämnas tillbaka.

---

## Risker

- **Någon "lagar" det förväntade röda bygget i paket J.** Grinden ska fälla
  bygget på `ContactForm.module.css:90` när `--color-text-dim` tas bort. Den
  frestande utvägen är att återställa tokenet, lägga in ett undantag eller lyfta
  scriptet ur `build` — alla tre förstör grindens enda negativa kontroll och
  lämnar AA-felet kvar. **Märks tidigt** genom att J:s klar-kriterium kräver att
  larmet redovisas med fil och rad, att det upphörde, och att `build` är grön i
  slutläget — ett kriterium som inte går att uppfylla genom att kringgå grinden.
- **Paket J:s filer ändras av något annat paket.** Då går det inte att läsa ut
  vilken ändring som bar vilket fynd, och "Resten av portfolion är oförändrad"
  blir omätbar. **Märks tidigt** genom att varje annat pakets "ingår INTE"
  namnger dem, genom J:s markup-jämförelse före/efter, och genom granskningens
  punkt 7.
- **`validate:data` fäller bygget på helt korrekt data.** Den gamla
  korsreferensen mot `skills.txt` och `skills-full.txt` plus antalsgrindarna är
  byggda för den gamla listan. A1 gör om dem. **Märks tidigt** genom att paket D
  kräver att grinden tiger på korrekt data innan något annat verifieras, och att
  den åtgärd ett felmeddelande föreskriver får den att tiga.
- **360 px-golvet spricker genom den nya kortgridden.** Det har redan hänt en
  gång genom hero-gridden, och posten är ett registrerat återfall. Paket E inför
  projektets nästa grid och paket C ändrar hero:s. **Märks tidigt** genom att
  golvet mäts med programmatiskt insatt längsta sträng mot kortets egen
  behållare, inte genom att sidan ser hel ut.
- **Knapparna får inte plats utan att något viker.** Hero ska rymma fem element
  på 309 px användbar bredd och en låg telefonhöjd. Den frestande utvägen är att
  korta texterna — de är exakta och får inte röras. **Märks tidigt** genom att
  paket C är eget, mäts på elementens rektanglar, och har ett "ingår INTE" som
  namnger just den utvägen.
- **Ett tecken i de nya strängarna saknas i teckensnittsfilen.** Arkitekten har
  mätt att varje tecken finns, inklusive rollradens mittpunkt — men mätningen
  gällde de strängar arkitekten kunde läsa, och den gamla teckengrinden mäter
  deklarationen och inte filen. **Märks tidigt** genom mätning mot `cmap` i både
  B och D, på de strängar byggaren faktiskt skriver.
- **En trasig ankarlänk i Om mig.** Texten ska innehålla en länk till ett projekt
  som inte finns. En länk som ser klickbar ut och inte gör något är precis det
  arkitekturen förbjudit. **Märks tidigt** genom att paket F kräver en mekanisk
  kontroll att ingen `href` pekar på ett saknat id, och genom att båda lägena
  provas.
- **Kommentarer som blir falska i samma stund paketet är klart.** Minst sju
  kommentarsblock beskriver i dag ett tillstånd som dessa paket ändrar: rollen i
  `Hero.jsx`, utkastmarkeringen i `about.js`, teckenförklaringen i `Skills.jsx`,
  talet 307 och "längsta strängen" i Skills-filerna, uppräkningen i
  `Projects.jsx:51` och det referenslösa blocket i `tokens.css:219-226`. Posten är
  märkt ÅTERKOMMANDE (3+). **Märks tidigt** genom att varje paket har en egen
  punkt om att läsa om kommentarsblocken, genom `validate-tokens.mjs` för den
  halva som går att automatisera, och genom att granskaren kör de förbjudna
  strängarna mot `src/`.
- **Arbetsträdet ändras under granskningen.** Har hänt två gånger, senast med
  åtta filer under en halvtimme. **Märks tidigt** genom `GRANSKNING-PAGAR` och
  ändringslistan med datum vid start och slut.
- **Scope-glidning in i övriga sektioner.** Uppdraget säger "Resten av portfolion
  är oförändrad", men paket E rör Skills-CSS:en som delar tokens med projekten,
  och paket C rör hero:s layout. **Märks tidigt** genom att varje pakets "ingår
  INTE" namnger det, och genom att granskaren jämför renderad markup för
  projekt-, kontakt- och footer-sektionerna före och efter.
- **Ett nytt beroende smyger in för ikonernas skull.** Uppdraget ber om det i
  klartext, och det är den enklaste vägen. A3 säger nej. **Märks tidigt** genom
  att `package.json` jämförs före och efter varje paket — och i paket J ändras den
  avsiktligt, vilket gör jämförelsen särskilt viktig just där.
- **Uppdragstexten skrivs om av misstag.** `UPPDRAG-2026-10-07.md` är normen för
  fyra verifieringspunkter. Rättas ett "stavfel" i den filen upphör normen att
  vara Jelals text. **Märks tidigt** genom att granskningens punkt 6 kontrollerar
  att filen är oförändrad sedan `5c62ac4`.
