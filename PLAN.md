# Plan: Byt innehållet i hero, "Om mig" och "Kompetenser" enligt Jelals uppdrag 2026-10-07, utan att röra sidans design eller övriga sektioner

Skriven 2026-10-08. **Detta är ett tillägg till en redan levererad sida**, inte ett
nytt projekt. Den gamla planen (paket 1–8, bygget av sidan) är genomförd och
ersätts av denna. Numreringen nedan är ny och börjar om på A för att inte krocka
med de referenser till "paket 1–8" som står i `ARKITEKTUR.md` och `LARDOMAR.md`.

Uppdraget står ordagrant i scratchpad-filen `uppdrag-ordagrant.md`. **Texterna i
uppdraget är exakta och får aldrig skrivas om** — Jelal skriver "Inga stavfel.
Texterna ska vara exakt som ovan."

---

## Först: fyra saker i uppdraget som INTE går att göra som skrivet

Jag planerar inte runt dessa i tysthet. De ska avgöras, inte tolkas i koden.

1. **"Använd ikonbiblioteket som redan finns i projektet."** Det finns inget
   ikonbibliotek. Körtidsberoendena är `react`, `react-dom` och
   `@hcaptcha/react-hcaptcha`. Premissen är osann, och att lägga till ett
   bibliotek är ett nytt teknikval — arkitektens, inte byggarens. Paket A avgör
   det.
2. **"#projekt" och "#kontakt".** Sektionernas id är `projects` och `contact`.
   Id:na får inte bytas: navet, `aria-current`-observern och varje befintlig
   länk hänger på dem. Vi uppfyller uppdragets **funktion** (knapparna scrollar
   till rätt sektion), inte dess bokstavliga strängar.
3. **Länken "Hem och Ekonomi" till "projektet längre ner på sidan".** Två fel i
   premissen: `src/data/projects.js` är tom, så det finns inget projekt och
   inget `#hem-och-ekonomi` att peka på — och Om mig ligger **efter** projekten i
   sidans ordning (hero, projekt, kompetenser, om mig, kontakt), så länken skulle
   gå uppåt, inte "längre ner". Projektinnehållet är **Jelals att ge**. Ingen
   agent hämtar det någon annanstans ifrån: Jelal har sagt "stop. gör inget
   sånt" när hans GitHub-repo slogs upp utan att han bett om det.
4. **"Behåll befintlig bild och layout i sektionen" (Om mig).** Om mig har ingen
   bild. `src/data/about.js` har bara ett fält, `paragraphs`, och datafilens egen
   kommentar säger att formen inte ska växa, med Jelals "en liten sektion" som
   skäl. Det finns alltså ingen bild att behålla, och att lägga till en är ett
   nytt beslut — inte ett "behåll".

Därtill en femte punkt som avgör sig själv och bara behöver ett avtryck:
**"Lugn in-animation ... om sidan redan använder animationer. Annars ingen."**
Sidan har två färgövergångar på 150 ms och inga in-animationer. Uppdragets egen
regel ger därmed **ingen animation**. Och **"scrollar mjukt"** kräver ingen JS:
`global.css` har redan `scroll-behavior: smooth` med `prefers-reduced-motion`-
undantag. En vanlig ankarlänk räcker.

---

## Lärdomar som gäller här

Varje "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar denna plan
konkret, i klartext:

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
  den.** `scripts/validate-data.mjs` korsrefererar varje skill-namn mot
  `skills.txt` och `skills-full.txt`, och grindar antalet 307 och antalet
  ifyllda. Den nya listan på nio grupper kommer att fälla den grinden — av en
  helt legitim ändring. Grinden måste göras om, inte kringgås. → Blockerar
  paket D och är en arkitektpunkt i A.
- **2026-10-05, Validering: mät artefakten, inte deklarationen.** Teckengrinden
  läser `cmap` ur woff2-filen. Den nya rollraden innehåller ett mittpunktstecken
  och de nya skill-namnen innehåller tecken sidan aldrig haft. Finns glyfen inte
  i filen renderas ordet i reservtypsnittet. → Mätpunkt i paket B och D.
- **2026-10-05 (ÅTERKOMMANDE 3+), Process: `EJ I ARKITEKTUR`-markeringar står
  kvar på frågor arkitekturen avgjort.** Hero.jsx och Skills-filerna bär sådana
  markeringar i dag. Varje paket avslutas med att läsa varje markering i de
  berörda filerna mot `ARKITEKTUR.md` och ta bort de besvarade i samma ändring.
- **2026-10-05 (ÅTERFALL), Kodkommentarer bär påståenden dokumentet tagit
  tillbaka.** `Hero.jsx` har en daterad kommentar om att Jelal bytt bort
  "Systemutvecklare"; uppdraget är nyare och återinför ordet. `Skills.module.css`
  och `SkillPill.module.css` bär talet 307 och en felaktig "längsta strängen".
  Lämnas de kvar blir de falska i samma stund paketen är klara. → Egna
  verifieringspunkter i B, D och E. En kommentar ska bära invarianten, inte
  värdet.
- **2026-10-05, CSS: beslutade deklarationer genomfördes med grannvärden.** Står
  ett värde utskrivet som en deklaration i `ARKITEKTUR.md` ska koden innehålla
  exakt det, tecken för tecken, och byggaren besvarar varje sådan punkt med
  `fil:rad` i överlämningen.
- **2026-10-05, Arkitektur: en invariant som bara står i prosa försvaras av att
  någon läser den.** Går ett "får aldrig" att mäta är mätningen beslutet. →
  Därför är "knapparna syns utan scroll på mobil" ett eget paket (C) med en
  mätserie, inte en mening i ett annat pakets verifiering.
- **2026-10-05, Verifiering: ett larm är inte ett kvitto förrän man vet vad som
  larmade.** Varje negativ kontroll ska redovisa att den larmade, vilket element
  som bar avvikelsen, och att larmet upphörde när injektionen togs bort.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), Process: arbetsträdet var inte fryst
  under granskningen.** Filen `GRANSKNING-PAGAR` skapas i projektroten innan
  granskaren startas och raderas först när rapporten är levererad. Byggaren och
  arkitekten kontrollerar att den inte finns innan de ändrar något under `src/`,
  `scripts/`, `dist/` eller `ARKITEKTUR.md`.
- **2026-10-02, Datadrivet: data utan verkan är död data.** Tappar `filled` sin
  betydelse ska fältet tas bort eller få en kommentar om vilket framtida paket
  som läser det — inte ligga kvar utan verkan. → Arkitektpunkt i A, genomförs i D
  och E.
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

**Processnot (Jelals preferens, från projektets minne):** granska hårt vid
leverans, inte efter varje litet paket — Jelal vill se något körbart innan tunga
granskningsloopar. Jag tolkar det så här: varje paket avslutas med byggarens egen
verifieringslista (den står utskriven per paket nedan) och `npm run build`, men
den fulla granskningen körs vid **LEVERANS** efter paket F. Paket G är
granskarens. Det här avviker från CLAUDE.md:s "kör alltid granskare efter varje
paket" och är därför något Jelal får säga nej till — det står som en öppen punkt.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| A | Arkitektbesluten: ikoner, `filled`/orange/teckenförklaring, kortrutnätet, knappstilarna, rollraden, Om mig-länkens två lägen, och vad som händer med skills-grindarna i `validate-data.mjs` | arkitekt | Varje punkt i listan nedan står som ett beslut i `ARKITEKTUR.md`, varje överspelat stycke är ändrat eller märkt `UPPHÄVT` på sin ursprungliga plats, och de nya förbjudna strängarna är införda i tabellen |
| B | Hero: namn, rollrad, ingress och de två knapparna — exakta texter | byggare | De tre texterna står tecken för tecken som i uppdraget, knapparna scrollar till projekt respektive kontakt, sidan har exakt ett `h1`, inget sektions-id står som literal i `.jsx` |
| C | **Mobilgrinden:** knapparna ska synas utan scroll på 360 px, och hero ska fylla ungefär första skärmen på dator | byggare | En mätserie visar att båda knapparnas underkant ligger inom vyporten på de uppmätta höjderna, och mätningen är skriven som ett upprepbart kriterium, inte som en iakttagelse |
| D | Kompetensdatan: `src/data/skills.js` byts till de nio grupperna, och skills-grindarna i `validate-data.mjs` görs om enligt beslut A | byggare | De nio grupperna och alla punkter står exakt som i uppdraget, `validate:data` tiger på korrekt data och larmar på trasig, och den gamla 307-listan finns inte kvar i någon datafil |
| E | Kompetensrenderingen: ett kort per grupp med `h3` och chips i `ul`/`li`, rutnät 3/2/1, ikonbeslutet genomfört, ingen animation | byggare | Nio kort, 3 per rad på dator, 2 på surfplatta, 1 på mobil, ingen nivåmätare, inget 360 px-överskridande mätt mot kortets egen behållare |
| F | "Om mig": den exakta texten, och "Hem och Ekonomi" i det läge beslut A ger | byggare | Texten står tecken för tecken som i uppdraget, och ingen länk pekar på ett id som inte finns |
| — | **LEVERANS — visa sidan för Jelal och hämta svar på de öppna punkterna** | projektledare | Jelal har sett hero, Om mig och Kompetenser i webbläsaren |
| G | Hård granskning av A–F, plus genomsökning efter rester av den gamla listan och efter kommentarer som blivit falska | granskare | Fynden nedtecknade i `LARDOMAR.md`, `GRANSKNING-PAGAR` skapad före start och raderad efter rapport |
| H | Dokumentation: hur Jelal ändrar de nio grupperna, plus listan över ändrade och borttagna filer som uppdraget beställer | dokumentator | En utomstående kan lägga till en kompetens utan att öppna en komponentfil, och fil-listan är komplett |

### Beroenden — vad som är blockerat och vad som kan byggas direkt

| Paket | Status |
|---|---|
| A | Kan startas direkt. Blockerar allt annat. |
| B | **Delvis blockerat av A** — rollraden (punkt 3 i A) och knappstilarna (punkt 4). Namnet och ingressen kunde byggas direkt, men de är tre rader i samma fil och ska inte delas i två paket. |
| C | Blockerat av B. Mäter det B byggt. |
| D | **Blockerat av A** — grindarna (punkt 7) och `filled`-fältets framtid (punkt 2). Utan beslutet fäller `validate:data` bygget på helt korrekt data. |
| E | **Blockerat av A** — ikonerna (punkt 1), rutnätet (punkt 5), teckenförklaringen (punkt 2). Blockerat av D, eftersom renderingen läser datan. |
| F | **Blockerat av A** — punkt 6. Textens tre stycken är givna och kunde skrivas direkt; länken kan inte. |
| G | Blockerat av F och av LEVERANS. |
| H | Blockerat av G. |

**Inget paket utom A kan börja utan arkitektbeslut.** Det är inte en brist i
planen — det är följden av att tre av uppdragets premisser inte stämmer med
koden, och lärdomen från 2026-10-02 säger uttryckligen att beslut som saknas i
`ARKITEKTUR.md` i stället uppfinns i koden, där ingen letar efter dem.

---

## Paket A — Arkitektbesluten

**Agent:** arkitekt. **Förutsättning:** ingen.

Nio punkter ska avgöras. Varje punkt ska stå som ett beslut i `ARKITEKTUR.md`, på
den plats där det gamla beslutet står, enligt dokumentets egen konvention i
"Upphävda beslut".

1. **Ikonerna.** Uppdraget vill en liten ikon per kort och hänvisar till ett
   ikonbibliotek som inte finns. Avgör: eget inline-SVG, eller inga ikoner.
   Ett nytt körtidsberoende är ett teknikval som bryter projektets etablerade
   linje om minsta antal beroenden, och det är arkitektens att ta eller avstå.
2. **`filled`, den orange fyllningen och teckenförklaringen.** Den nya listan har
   ingen ifylld/dämpad-skillnad: allt i den är sådant Jelal kan. Raden "De orange
   har jag arbetat med." förklarar då en skillnad som inte längre finns, och
   `SkillPill`s `filled`-prop blir död data. Avgör vad som händer med fältet,
   färgen och raden. Att Jelals 270 markeringar försvinner är hans att godkänna
   (se Öppna punkter) — mekanismen är din.
3. **Rollraden.** Uppdraget säger `Systemutvecklare · Fullstack`. Jelal sa
   tidigare uttryckligen "ta bort systemutvecklare längst upp", och `Hero.jsx`
   bär en daterad kommentar om just det. Uppdraget är nyare och uttryckligt, så
   det gäller. Avgör hur den daterade kommentaren skrivs om så att nästa läsare
   inte tror att den gamla regeln står kvar, och bekräfta att samma sträng i
   `<title>` i `index.html` följs åt.
4. **Knappstilarna.** "Primär, fylld" och "sekundär, kontur" är två nya visuella
   komponenter. Avgör om de bygger på något som redan finns i projektet eller
   blir nytt, och skriv ut deklarationerna — lärdomen från 2026-10-05 gör en
   utskriven deklaration bindande tecken för tecken.
5. **Kortrutnätet 3/2/1.** Avgör brytpunkterna och skriv ut behållarens
   deklaration. Den återkommande 360 px-lärdomen kräver `minmax(0, 1fr)`-formen
   på varje grid som bär text, och den ska stå i beslutet och inte uppfinnas i
   CSS:en.
6. **Om mig-länken, båda lägena.** Besluta hur stycket renderas **innan**
   projektet finns och hur det blir en länk **automatiskt** när Jelal lägger in
   projektet — samma text i båda lägena, ingen manuell omredigering. Ingen länk
   får peka på ett id som inte finns.
7. **Skills-grindarna i `validate-data.mjs`.** Korsreferensen mot `skills.txt`
   och `skills-full.txt` och antalsgrindarna kommer att fällas av den nya listan.
   Lärdomen från 2026-10-05 säger att en grind som fälls av en legitim ändring är
   felkonstruerad och ska göras om, inte dokumenteras med ett undantag. Avgör vad
   grinden ska kontrollera i stället, och vad som händer med de två källistorna.
   Innan en grind behålls ska det stå skrivet vilken legitim ändring som får fälla
   den.
8. **Teckentäckningen.** Rollradens mittpunktstecken och de nya skill-namnen
   innehåller tecken sidan aldrig haft. Avgör ingenting på deklarationen — kräv
   mätning mot woff2-filens `cmap` i paket B och D.
9. **Avtrycket att ingen animation ska införas**, med uppdragets egen formulering
   som skäl. Utan avtryck kommer en framtida läsare att se "lugn in-animation" i
   uppdraget och tro att den saknas.

**Klar när:** varje punkt står som beslut; varje överspelat stycke är ändrat
eller märkt `UPPHÄVT` på sin ursprungliga plats; de strängar som nu blir
felaktiga är införda i tabellen över förbjudna strängar — minst talen `307` och
`257`/`270`, de 18 gruppnamnen, teckenförklaringens text och den gamla rollraden,
om besluten gör dem överspelade.

---

## Paket B — Hero: texterna och knapparna

**Agent:** byggare. **Förutsättning:** A klart.

**Ingår:** namnet som `h1`, rollraden, ingressen och de två knapparna, med
uppdragets exakta texter. Knapparna hämtar sina mål ur `sections.js` namngivna
konstanter. Omskrivningen av den daterade rollkommentaren enligt beslut A3, och
`<title>` i `index.html` om beslutet säger det.

**Ingår INTE:** profilbildens storlek och placering (paket C), GitHub- och
LinkedIn-ikonlänkar (valfritt i uppdraget, och GitHub är uttryckligen borttagen
av Jelal — se Öppna punkter), någon animation, någon JS-scrollning.

**Verifiering:**
1. De tre texterna jämförs **tecken för tecken** mot uppdraget, maskinellt — inte
   genom att läsas. Ingen omskrivning, ingen ändrad interpunktion.
2. Sidan har exakt ett `h1`, och det innehåller namnet.
3. `grep` efter sektions-id som literaler i `.jsx` ger inga träffar utanför
   kommentarer.
4. Båda knapparna leder till ett id som finns i `sections.js`, och klick landar
   under den sticky headern utan att rubriken skyms.
5. Varje tecken i de nya strängarna finns i woff2-filens `cmap` — mätt på filen,
   inte på `unicode-range`. Mittpunktstecknet i rollraden är det som mest troligt
   saknas.
6. `npm run build` och `npm run validate:data` går igenom.
7. Varje `EJ I ARKITEKTUR`-markering i `Hero.jsx` läses mot `ARKITEKTUR.md`; de
   besvarade tas bort i samma ändring, de kvarvarande redovisas med meningen
   "ännu obesvarad av arkitekten".
8. Kommentarsblocken i `Hero.jsx` lästa om: ingen kommentar bär längre ett
   påstående som blivit falskt av detta paket.

---

## Paket C — Mobilgrinden: knapparna utan scroll

**Agent:** byggare. **Förutsättning:** B klart.

Detta är uppdragets hårdaste krav och därför ett eget paket. Hero ska rymma namn,
rollrad, ingress, två knappar **och** en rund profilbild — på 360 px bredd, där
den användbara spaltbredden är 309 px enligt arkitekturens egen mätning.

**Ingår:** att avgöra vad som faktiskt ryms och vad som får vika på mobil, inom
ramen för beslut A, och att skriva kravet som en **mätserie** i stället för som en
mening. Lärdomen från 2026-10-05 är tydlig: går ett "får aldrig" att mäta är
mätningen beslutet och prosan bara förklaringen.

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

**Agent:** byggare. **Förutsättning:** A klart, särskilt punkt 2 och 7.

**Ingår:** `src/data/skills.js` byts till de nio grupperna med uppdragets exakta
punkter i uppdragets ordning. Grindarna i `scripts/validate-data.mjs` görs om
enligt beslut A7. Datafilens kommentar skrivs om — den lovar i dag saker om 307
poster och om ifyllda skills som inte längre är sanna, och lärdomen från
2026-10-05 säger att ett löfte i en fil Jelal redigerar aldrig får vara osant.

**Ingår INTE:** renderingen (paket E). Att hitta på en grupp eller en punkt som
inte står i uppdraget. Att behålla en enda post ur den gamla listan "för
säkerhets skull" — uppdraget säger att den ska tas bort helt, och den finns kvar i
git-historiken.

**Verifiering:**
1. De nio gruppnamnen och varje punkt jämförs **tecken för tecken** mot
   uppdraget, maskinellt.
2. Ordningen är uppdragets ordning, både på grupperna och inom varje grupp.
3. `npm run validate:data` tiger på den korrekta datan.
4. Den görs om till en grind som larmar: pröva varje obligatoriskt fält med tre
   värden — borttaget, tom sträng och bara blanksteg — i en kopia i
   scratch-katalogen. Lämna aldrig trasig data kvar.
5. Den åtgärd ett felmeddelande föreskriver ska få grinden att **tiga**. Gör den
   inte det är grinden trasig, inte sträng.
6. Varje tecken i de nya namnen finns i woff2-filens `cmap`, mätt på filen.
7. `npm run build` går igenom, och misslyckas med medvetet trasig data.
8. Ingen förekomst av den gamla listan kvar i någon fil under `src/data/`.

---

## Paket E — Kompetensrenderingen

**Agent:** byggare. **Förutsättning:** D klart.

**Ingår:** ett kort per grupp med gruppnamnet som `h3` och kompetenserna som
chips i en riktig `ul`/`li`. Rutnätet 3/2/1 enligt beslut A5. Ikonbeslutet A1
genomfört. Teckenförklaringen och den orange fyllningen enligt beslut A2.

**Ingår INTE:** animation (uppdragets egen regel ger ingen). Nivåmätare, procent
eller stapel — uttryckligen förbjudet i uppdraget. Sökruta, filter, räknare.
Ändringar i andra sektioners CSS.

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
5. Ingen `transition` eller `animation` tillkommen. `grep` visar samma antal som
   före paketet.
6. Kontrasten mätt på chipsen mot den yta de faktiskt ligger på, inte den de låg
   på förut.
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

**Agent:** byggare. **Förutsättning:** A klart, särskilt punkt 6.

**Ingår:** uppdragets exakta text i `src/data/about.js`, och "Hem och Ekonomi" i
det läge beslut A6 ger.

**Ingår INTE:** att lägga till en bild i sektionen — det finns ingen att behålla,
och att införa en är ett nytt beslut, inte ett "behåll". Att hitta på innehåll om
projektet Hem och Ekonomi. Att hitta på något om Jelals bakgrund utöver textens
egna ord: texten säger att han bor i Motala och är i början av sin karriär, och
**inget mer om hans bakgrund får läggas till någonstans på sidan**.

**Verifiering:**
1. Texten jämförs **tecken för tecken** mot uppdraget, maskinellt. Den är en
   sammanhängande text; om den delas i stycken får inget tecken ändras.
2. Ingen `href` på sidan pekar på ett id som inte finns i den renderade markupen
   — kontrollerat mekaniskt, inte genom att klicka.
3. Det motsatta läget provas också: lägg in ett testprojekt med det id beslutet
   anger, och bekräfta att länken dyker upp **utan** att texten redigeras. Ta
   bort testprojektet och bekräfta att länken försvinner utan att en trasig
   `href` lämnas kvar.
4. `npm run build` och `npm run validate:data` går igenom.
5. Kommentaren i `about.js` lästs om: den beskriver i dag texten som ett
   byggarutkast som Jelal ska ersätta. Efter detta paket är texten Jelals egen,
   och kommentaren blir falsk om den står kvar.

**Efter detta paket: LEVERANS.** Stanna. Visa sidan för Jelal och ställ de öppna
frågorna nedan — inte en öppen "vad tycker du", som bjuder in till att riva upp
det som är avgjort.

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

---

## Paket H — Dokumentationen

**Agent:** dokumentator. **Förutsättning:** G klart och fynden åtgärdade.

**Ingår:** guiden uppdateras till de nio grupperna — hur Jelal lägger till,
ändrar och tar bort en kompetens eller en grupp, och vad som gäller för
`filled`-fältet efter beslut A2. Plus **listan över ändrade och borttagna filer**
som uppdraget uttryckligen beställer.

**Verifiering:** följ guiden ordagrant — lägg till en kompetens och en grupp,
utan att öppna en komponentfil — och kör `npm run validate:data` efteråt. Går det
inte är guiden eller arkitekturen fel, och paketet lämnas tillbaka.

---

## Öppet — och vems det är att svara

### Jelals, och ingen annans

1. **Projektinnehållet till Hem och Ekonomi.** Ingen agent hämtar det någon
   annanstans ifrån. Jelal har sagt "stop. gör inget sånt" när hans GitHub-repo
   slogs upp utan att han bett om det. Planen förutsätter att projektet **inte
   finns ännu**, och paket F bygger båda lägena så att länken tänds av sig själv
   när han lägger in det.
2. **Att de 270 markerade kompetenserna försvinner.** Han markerade dem över många
   omgångar. Den nya listan har ingen sådan skillnad, så markeringarna upphör att
   betyda något. Arkitekten beslutar mekanismen; att arbetet kastas är hans att
   godkänna. Listan finns kvar i git-historiken.
3. **Rollraden.** Uppdraget säger `Systemutvecklare · Fullstack`. Han sa tidigare
   uttryckligen att "systemutvecklare" skulle bort från toppen. Uppdraget är
   nyare och uttryckligt, så vi följer det — men det är värt en rad vid
   LEVERANS, eftersom det är en medveten omsvängning och inte ett misstag.
4. **LinkedIn-ikonen under knapparna.** Uppdraget listar den som **valfri**.
   GitHub återinförs inte: han har sagt "Ta bort github", och `contact.js` har
   `url: null` med en daterad kommentar. Frågan är bara om en LinkedIn-ikon i
   hero tillför något utöver länken som redan står i kontaktsektionen. Vi avstår
   om han inte ber om den.
5. **Bild i Om mig.** Uppdraget säger "behåll befintlig bild" — det finns ingen.
   Vill han ha en är det ett nytt beslut och ett eget paket.
6. **Granskningsrytmen.** Jag har lagt den hårda granskningen vid LEVERANS i
   stället för efter varje paket, enligt hans tidigare önskemål om att se något
   körbart först. Det avviker från CLAUDE.md. Säger han nej körs granskaren efter
   varje paket i stället.

### Arkitektens

Punkt 1–9 i paket A. Ingen av dem är byggarens att avgöra i koden, och ingen av
dem är Jelals: de är följder av premisser i uppdraget som inte stämmer med
projektets kod och etablerade linje.

---

## Risker

- **`validate:data` fäller bygget på helt korrekt data.** Korsreferensen mot
  `skills.txt` och `skills-full.txt` plus antalsgrindarna är byggda för den gamla
  listan. Det här är den risk som mest sannolikt stoppar arbetet, och den slår på
  hela `build`, inte bara på datafilen. **Märks tidigt** genom att beslut A7 måste
  vara fattat innan paket D börjar, och genom att paket D kräver att grinden tiger
  på korrekt data innan något annat verifieras.
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
- **Ett tecken i de nya strängarna saknas i teckensnittsfilen.** Rollradens
  mittpunkt är den mest troliga. Följden är en synlig skarv mitt i en rad, och
  den nuvarande teckengrinden mäter deklarationen och inte filen, så den kan
  släppa igenom det. **Märks tidigt** genom mätning mot `cmap` i både B och D.
- **En trasig ankarlänk i Om mig.** Texten ska innehålla en länk till ett projekt
  som inte finns. En länk som ser klickbar ut och inte gör något är precis det
  arkitekturen förbjudit. **Märks tidigt** genom att paket F kräver en mekanisk
  kontroll att ingen `href` pekar på ett saknat id, och genom att båda lägena
  provas.
- **Kommentarer som blir falska i samma stund paketet är klart.** Minst fem
  kommentarsblock beskriver i dag ett tillstånd som dessa paket ändrar: rollen i
  `Hero.jsx`, utkastmarkeringen i `about.js`, teckenförklaringen i `Skills.jsx`,
  talet 307 och "längsta strängen" i Skills-filerna. Posten är ett registrerat
  återfall. **Märks tidigt** genom att varje paket har en egen punkt om att läsa
  om kommentarsblocken, och genom att granskaren kör de förbjudna strängarna mot
  `src/`.
- **Arbetsträdet ändras under granskningen.** Har hänt två gånger, senast med
  åtta filer under en halvtimme. **Märks tidigt** genom `GRANSKNING-PAGAR` och
  ändringslistan med datum vid start och slut.
- **Scope-glidning in i övriga sektioner.** Uppdraget säger "Resten av portfolion
  är oförändrad", men paket E rör Skills-CSS:en som delar tokens med projekten,
  och paket C rör hero:s layout. **Märks tidigt** genom att varje pakets "ingår
  INTE" namnger det, och genom att granskaren jämför renderad markup för
  projekt-, kontakt- och footer-sektionerna före och efter.
- **Ett nytt beroende smyger in för ikonernas skull.** Uppdraget ber om det i
  klartext, och det är den enklaste vägen. **Märks tidigt** genom att beslut A1
  måste finnas skrivet innan paket E börjar, och genom att `package.json`
  jämförs före och efter varje paket.
