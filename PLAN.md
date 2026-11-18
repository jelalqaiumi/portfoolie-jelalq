# Plan: P18 — ljusa sektioner efter loggan (Jelals beslut 9, M23), stängd med granskning, commit och push

Skriven 2026-11-08 av projektledaren, **i efterhand**: P18a–P18c och P18d del 1–2
är redan byggda och mätta. Planen ger dem sina poster och planerar det som
återstår. Granskningen av P18 gav **EJ GODKÄND** med tre fynd, och fynd 2 var att
denna post saknades.

**Underlag:**

- `UPPDRAG-2026-11-07.md`, avsnittet "Jelals beslut", **beslut 9** (bindande):
  temat följer loggan. Nav och hero förblir mörka. Projekt och Om mig får loggans
  varma ljusa botten med mörk text och orange accent. Kompetenser, kontakt och
  footer förblir mörka.
- `ARKITEKTUR.md`, **M23** (punkt 1–10). Punkt 10 delar P18 i stegen P18a–P18d.
  Punkt 8 har mätserierna K, P, L, S och D och de negativa kontrollerna N1–N6.
  Talen och tecknen står där och skrivs inte av här.
- `LARDOMAR.md`, posterna daterade 2026-11-08.

**Den förra planen** (moderniseringen P1–P17 och innehållsomgången A–M) är
ersatt här. Den finns oförändrad i `git show 6d74727:PLAN.md`. Omgången är
avslutad: G2 godkänd, P17 klar, och allt är incheckat i `6d74727`. Den commiten är
**inte pushad**. Paket L från omgången A–M står fortfarande utanför planen. Jag har
inte kontrollerat om de öppna frågorna till Jelal i den förra planen
(sidbeskrivningen, fraserna med streck och "1 PROJEKT") har fått svar. Där står de
som de var.

---

## Status 2026-11-08

| Paket | Läge |
|---|---|
| P18a — tokens och mekanism | **Byggt och mätt.** P-jämförelsen gav 0 skilda pixlar i hela sidan |
| P18b — projektsektionen | **Byggt och mätt.** K1–K7 utan fel |
| P18c — Om mig | **Byggt och mätt.** Kontrasten godkänd, höjderna oförändrade |
| P18d del 1 och 2 | **Mätta.** P, S och L. L gav tillgänglighet 100 i 10 av 10 körningar, prestanda 97 på mobil och 100 på desktop |
| Granskning av P18 | **EJ GODKÄND, tre fynd** (se nedan) |
| P18d del 3 (fynd 1) | **KLAR 2026-11-09.** N2, N5 och N6 körda och larmar, underlag i `scratchpad\p18d\neg\`. Efterkontrollen godkände fynd 1 i sak; M23 punkt 8 rättas av arkitekten |
| PLAN-posten (fynd 2) | **Klar med denna fil** |
| P18-dok (fynd 3) | Ej startat. Dokumentatorn |
| M23-stängning | Ej startad. Arkitekten |
| Efterkontroll av P18, commit, push | Ej startade |

**Granskningens tre fynd:**

1. De negativa kontrollerna N2, N5 och N6 saknas. → P18d del 3.
2. `PLAN.md` saknar P18. → Denna fil.
3. `README.md:88-90` beskriver tokengrinden som den var före M23. → P18-dok.

---

## Lärdomar som gäller här

Alla regler under "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar
planen direkt:

- **2026-11-08, P18 byggdes och mättes utan någon post i `PLAN.md`.** → Det är
  orsaken till denna fil. Varje återstående paket har en egen rad och ett eget
  `Klart när`, och namnen går att söka på: **P18d del 3**, **P18-dok**,
  **M23-stängning**, **Efterkontroll av P18** och **Commit och push av P18**.
  Byggaren startar inget paket som inte ger någon träff i `PLAN.md`.
- **2026-11-08 (ÅTERFALL), P18d saknar N5 och N6.** → P18d del 3 är inte
  överlämnat förrän varje rad N1–N6 har en sökväg i scratchpad. Filen ska visa
  larmet, elementet som bar det och att larmet upphörde efter återställningen. En
  ersatt kontroll redovisas som avvikelse, och arkitekten godkänner den.
- **2026-11-08 (ÅTERFALL), en konsolgrind räknas inte som klar förrän dess
  negativa kontroll har körts mot ett produktionsbygge.** → N5 körs mot en kopia
  av `dist/` från ett färskt bygge, enligt M23 punkt 8. Ingen dev-server används.
- **2026-11-08, README beskriver tokengrinden som den var före M23.** → P18-dok
  kör sökningen ur postens regel mot `README.md`, `GUIDE.md`, `ARKITEKTUR.md` och
  `PLAN.md`. Varje träff som återger vad grinden kontrollerar rättas, eller
  lämnas tillbaka med `fil:rad`. Därför återger denna plan inte grindens regel. Den
  står i M23 punkt 1.
- **2026-11-08 (ÅTERFALL, 3+), en rättad grind eller ett uppmätt tal står
  orättat på andra ställen.** → M23-stängningen söker varje tal den ersätter i
  både `ARKITEKTUR.md` och `PLAN.md`. Därför skriver denna plan **inga förväntade
  kvoter**. De står bara i M23.
- **2026-11-08, rubriken över en uträkning säger fortfarande "inte uppmätt".** →
  M23-stängningen söker efter `uträknat` och `inte uppmätt` i M23 och i rubrikerna
  ovanför, och rättar eller märker varje träff som gäller ett tal den ersätter.
- **2026-10-02, `ARKITEKTUR.md` ändras inte under ett pass som bygger eller mäter
  mot den.** → M23-stängningen startar först när P18d del 3 är överlämnat. N5 och
  N6 mäter mot M23 punkt 8.
- **2026-10-05, mät aldrig `dist/` utan att binda det till källan, och servrar:
  `netstat` före start och efter stopp, stopp via PID.** → Gäller P18d del 3.
  Mätningen görs mot ett färskt `vite preview` efter ett färskt bygge.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), arbetsträdet fryses under granskning.** →
  `GRANSKNING-PAGAR` skapas före efterkontrollen av P18 och raderas när rapporten
  är levererad. Inget paket ändrar filer medan filen finns.
- **Projektets minne: breda agentuppdrag hänger sig, och hård granskning sker vid
  leverans.** → P18d del 3 är bara tre kontroller. Efterkontrollen är smal och
  prövar bara granskningens tre fynd och stängningens ändringar. Den är ingen ny
  helgranskning.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| 1 | ~~**P18a — tokens och mekanism**, enligt M23 punkt 10~~ **KLART** | byggare | Tokengrindens prov (a)–(e) redovisade, och P-jämförelsen gav 0 skilda pixlar i hela sidan (uppfyllt) |
| 2 | ~~**P18b — projektsektionen**, enligt M23 punkt 10~~ **KLART** | byggare | K1–K7 för `#projects` vid 360 och 1280 utan fel, och M5h tyst (uppfyllt) |
| 3 | ~~**P18c — Om mig**, enligt M23 punkt 10~~ **KLART** | byggare | K1–K3 för `#about` vid 360 och 1280 utan fel, och höjderna oförändrade (uppfyllt) |
| 4 | **P18d — mätningen.** ~~Del 1 och 2: P, S och L~~ **KLARA.** **P18d del 3: N2, N5 och N6 (fynd 1). KLAR 2026-11-09** | byggare | Varje rad N1–N6 har en sökväg i scratchpad med larm, element och återställning. Serien D har också en sökväg (mitt underlag säger inte om D är körd). Varje beslut i M23 är besvarat med `fil:rad`. Inga filer i `src/` eller `scripts/` är ändrade |
| 5 | **P18-dok:** `README.md:88-90` skrivs om så att den stämmer med tokengrinden efter M23 (fynd 3) | dokumentator | Stycket stämmer med M23 punkt 1 och skriptets huvudkommentar. Sökningen ur posten 2026-11-08 är redovisad träff för träff med `fil:rad`. Bara `README.md` (och `GUIDE.md` om sökningen träffar där) är ändrade |
| 6 | **M23-stängning:** de uträknade kvoterna i M23 ersätts med de uppmätta från P18b–P18d | arkitekt | Varje uträknat tal i M23 har sitt uppmätta värde med källa (steg och sökväg), eller är märkt med varför det inte mättes. Sökningen efter talen och efter `uträknat` och `inte uppmätt` i `ARKITEKTUR.md` och `PLAN.md` är redovisad, och varje träff är rättad eller märkt RÄTTAT. Bara `ARKITEKTUR.md` är ändrad |
| 7 | **Efterkontroll av P18**, smal | granskare | Granskningens fynd 1–3 och M23-stängningen är bekräftade med `fil:rad` eller en sökväg, eller så finns ett nytt fynd i `LARDOMAR.md`. `GRANSKNING-PAGAR` skapades före start och är raderad |
| 8 | **Commit och push av P18.** Samordnaren checkar in, och **Jelal pushar själv** (verktyget nekar `git push`) | samordnare, sedan Jelal | `git status` är ren och varje incheckad fil hör till P18 eller dess följdpaket (P18-dok, M23-stängning, `LARDOMAR.md`, `UPPDRAG-2026-11-07.md`, `PLAN.md`). Efter Jelals push innehåller `origin/main` både `6d74727` och P18-commiten |

### Ordning och beroenden

Gjort: P18a → P18b → P18c → P18d del 1 och 2 → granskning (EJ GODKÄND).

**Pågår nu:** P18d del 3 (byggaren).

**Därefter:**

1. **P18-dok** får gå parallellt med P18d del 3. Det är olika filer, och README
   är inget P18d mäter mot.
2. **M23-stängning** startar **efter** att P18d del 3 är överlämnat. Den behöver
   de uppmätta talen, och `ARKITEKTUR.md` ändras inte medan det mäts mot M23.
3. **Efterkontroll av P18** startar när paket 4, 5 och 6 är överlämnade.
4. **Commit**, när efterkontrollen är godkänd.
5. **Jelal pushar.** Det gäller både `6d74727` och P18-commiten.

Sidan är körbar hela tiden. Vill Jelal se de ljusa sektionerna före commit kan
samordnaren visa dem mot ett färskt `vite preview`.

---

## Risker

- **P18d del 3 hänger sig eller växer.** Breda mätuppdrag har hängt sig förut.
  **Märks tidigt** genom att uppdraget bara gäller tre rader, och genom att
  överlämningen listar N1–N6 med en sökväg per rad. En rad utan sökväg betyder att
  steget inte är klart.
- **N5 kan inte ge det förväntade larmet.** Lighthouse kanske inte fäller
  tillgänglighet på den injicerade kvoten, på samma sätt som honeypotprovet i M22
  inte kunde ge sitt utfall. Den frestande utvägen är att byggaren byter kontroll på
  eget beslut. **Märks tidigt** genom att en ersatt kontroll står som avvikelse och
  lämnas till arkitekten, som godkänner den eller skriver om raden i M23.
- **Arkitekten ändrar M23 medan N5 och N6 körs.** **Märks tidigt** genom ordningen
  ovan och genom `git status` på `ARKITEKTUR.md` i byggarens överlämning.
- **Ett uppmätt tal hamnar på ett ställe och det uträknade står kvar på ett annat**
  (återfall 3+). **Märks tidigt** genom att M23-stängningens `Klart när` kräver
  sökningen i både `ARKITEKTUR.md` och `PLAN.md`, och genom att denna plan inte
  innehåller några kvoter.
- **README-rättningen återger grindens regel med egna ord och blir fel igen.**
  **Märks tidigt** genom att P18-dok jämför mot M23 punkt 1 och skriptets
  huvudkommentar, och genom att efterkontrollen läser stycket mot skriptet.
- **Efterkontrollen växer till en ny helgranskning.** **Märks tidigt** genom att
  den bara prövar de tre fynden och stängningen. Ett nytt fel blir en post i
  `LARDOMAR.md`.
- **`6d74727` och P18 ligger kvar lokalt utan push.** Försvinner arbetsträdet
  finns leveransen bara på en maskin. **Märks tidigt** genom att pushen står som
  eget steg hos Jelal, och genom att `git status` mot `origin/main` visas för
  honom vid commit.
- **Commiten får med en fil utan ägande paket.** Arbetsträdet har ändringar i
  elva filer under `src/` och `scripts/` (enligt granskningen) plus dokumenten.
  **Märks tidigt** genom att samordnaren jämför `git diff 6d74727 --stat` mot
  filerna i M23 punkt 10 och listan "Rörs inte i P18" före incheckningen.


---

## P21 — Ifyllda kompetens-chips i orange (#ff6b00) med mörk text, ersätter P20 (AVBRUTET 2026-11-18, chipsen grå som före P20)

**Ändrat igen 2026-11-18, P21 AVBRUTET:** Jelal såg orange kant och text (P21b omgång 2) och valde "Tillbaka till grå". Kompetens-chipsen ska se ut som före P20. Samordnaren har återställt `Chip.jsx`, `Chip.module.css`, `SkillChip.jsx`, `tokens.css` och `README.md` till läget i `9cb309b` (`git diff 9cb309b -- src` är tom). Arkitekten märker M25 och M26 UPPHÄVDA. P20 och P21 ger ingen kodändring.

**Ändrat 2026-11-18 efter Jelals besked:** Jelal såg de ifyllda orange chipsen (P21b) och svarade "För starkt". Kompetens-chipsen ska i stället ha orange kant och orange text utan fyllning, som ett valt filterchip. Arkitekten rättar M26, byggaren ändrar P21b. Godkänt när gäller med de nya färgerna.

Skriven 2026-11-18 av projektledaren. Fogas in i `PLAN.md` av samordnaren, ovanför
P20 och "Tidigare omgångar". Ingen tidigare text i `PLAN.md` tas bort.

**Mål (Jelal, 2026-11-18, efter att ha sett P20):** "vit passade inte alls".
Kompetens-chipsen i den mörka sektionen Kompetens blir ifyllda i orange:
fyllning `var(--accent-fill)` (#ff6b00) med text `var(--ink-inverse)` (#141414),
samma som knappen "Kontakta mig". Jelal valde ifylld framför orange kant och text.
Projektfiltrets chips ändras inte. P20:s mekanism (prop `surface` på `Chip` och
`data-surface='light'` på chipset) ersätts, den byggs inte ovanpå.

**Underlag:** `src/components/SkillChip.jsx`, `src/components/Chip.jsx`,
`src/components/Chip.module.css` (regeln `.chip[data-surface='light']`),
`src/components/ProjectFilter.jsx`, `src/components/ProjectFilter.module.css`,
`src/styles/tokens.css` (`--accent-fill`, `--ink-inverse` och kvoten 6,452:1 på
rad 66), `scripts/validate-tokens.mjs`, `ARKITEKTUR.md` M15, M23 och M25.

### Lärdomar som gäller här

- **2026-11-18, P20b mätte mot dev-servern fast M25 kräver `vite preview`.** →
  Varje mätning i "Godkänt när" görs mot `npx vite preview --port <ledig> --strictPort`
  av ett färskt bygge, servern stängs via sin PID, och varje mätfil anger port och
  byggets tidsstämpel. Går det inte: lämna tillbaka, mät aldrig mot dev. K1 för
  filterchipsen tas innan första ändringen i arbetsträdet, med `git diff --stat`
  eller `git stash list` som visar att trädet var rent.
- **2026-11-18, M25 N2 väntade fel detalj för det valda filterchipset.** → Varje
  negativ kontroll i M26 anger väntat utfall per tillstånd (vilande och
  `aria-pressed='true'`), uträknat ur specificiteten för varje regel som kan träffa
  elementet, innan det skrivs in.
- **2026-11-08, P18 byggdes utan post i `PLAN.md`.** → Detta avsnitt är posten.
  Byggaren startar P21b först när `grep -n "P21b" PLAN.md` ger träff.
- **2026-11-08, projektledaren skrev över hela PLAN.md.** → Avsnittet ligger i en
  separat fil. Samordnaren kör `git diff --numstat PLAN.md` efteråt, borttagna rader = 0.
- **2026-11-08, värde på flera ställen.** → #ff6b00 och #141414 står redan i
  `tokens.css`. Inga hexvärden i CSS-moduler; `grep -rn "ff6b00\|141414" src` ger
  bara träffar i `tokens.css` efter P21b.
- **2026-11-07, token utan konsument, och 2026-11-08, tokengrinden.** → Blir ett
  token eller en regel oanvänd när P20:s mekanism tas bort, tas den bort i samma
  paket. `validate-tokens` ska ge kod 0.
- **2026-10-08, kvoten skrivs i `tokens.css`.** → Kvoten `--ink-inverse` mot
  `--accent-fill` finns redan (6,452:1). Arkitekten avgör om den behöver en rad till
  eller räcker som den står.
- **Kodkommentarer (ÅTERFALL, 3+).** → `SkillChip.jsx:4-6` och `Chip.jsx:8` beskriver
  P20:s ljusa yta och blir falska. Byggaren kör grep-regeln 2026-11-08 på ändrade filer
  och skriver om kommentarerna till invarianten. M25 i `ARKITEKTUR.md` märks ERSATT AV M26.
- **2026-10-02 och 2026-10-08, 360 px-golvet och rullningslistvillkoret.** → Varje
  bredd redovisas med sitt rullningslistvillkor.

### Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| P21a | M26 i `ARKITEKTUR.md`: hur orange fyllning och mörk text når SkillChip, vad som tas bort av P20:s mekanism (prop `surface` på `Chip`, `data-surface` på chipset, regeln `.chip[data-surface='light']`) och vad som står kvar (`SURFACE_LIGHT` används fortfarande av `Section`), att filterchipsen inte påverkas i något tillstånd, vad som händer med kanten, och vilka kommentarer som blir falska. M25 märks ERSATT AV M26. | arkitekt | M26 finns, anger exakt vilka filer som ändras, väntat utfall per tillstånd för filterchipsen är uträknat ur specificiteten, och M25 är märkt ERSATT. |
| P21b | Ta K1 för filterchipsen mot `vite preview` innan någon fil ändras. Bygg sedan M26. | byggare | Allt under "Godkänt när" punkt 1–7 är kört och redovisat. |
| P21c | Smal granskning av P21b mot "Godkänt när". Inga nya mätserier utöver dem. | granskare | Utfall skrivet, nya fynd i `LARDOMAR.md`. |
| P21d | Commit. | samordnaren | `git status` ren för paketets filer. |

**Ingår:**
- Ifylld bakgrund `var(--accent-fill)` och text `var(--ink-inverse)` på kompetens-chipsen i Kompetens.
- Borttagning av P20:s mekanism för chipset (prop, attribut och CSS-regel), i den mån M26 säger att den blir oanvänd.
- Omskrivning av kommentarer i `SkillChip.jsx`, `Chip.jsx` och M15/M25 som beskriver den varmvita ytan.

**Ingår inte:**
- Projektfiltrets chips (`ProjectFilter.jsx`), deras växlingsläge och fokusstil.
- Nya färgvärden eller nya tokens för färg.
- Typsnitt, storlek, radie eller avstånd på chipsen.
- Hover eller andra tillstånd (kompetens-chipsen är text, inte kontroller).
- `data-surface='light'` på sektionerna (`Section`, `About`, `Projects`) och de ljusa sektionernas färger.

**Godkänt när:**
1. K1 för filterchipsen är tagen innan första ändringen i arbetsträdet: `getComputedStyle`
   för `background-color`, `color`, `border-color` och `padding` på ett filterchip i både
   vilande och `aria-pressed='true'` läge, mätt mot `vite preview` av ett färskt bygge på
   egen port. Mätfilen i scratchpad anger port, byggets tidsstämpel och `git diff --stat`
   (tom) vid mättillfället.
2. Filterchipsen är oförändrade: samma mätning (K2) efter P21b, mot `vite preview` av
   ett nytt färskt bygge, är identisk med K1 i båda tillstånden.
3. Kompetens-chipsen har renderat `background-color` rgb(255, 107, 0) och `color`
   rgb(20, 20, 20), och kontrasten uträknad ur dessa är minst 4,5:1 (väntat 6,452:1),
   mätt mot `vite preview`. Kvoten står i `tokens.css`.
4. Ingen rest av P20:s mekanism på chipset: `grep -rn "surface" src/components/Chip.jsx
   src/components/Chip.module.css src/components/SkillChip.jsx` ger inga träffar som
   M26 inte uttryckligen behåller, och inget kompetens-chip har attributet `data-surface`
   i renderad DOM.
5. 360 px-golvet håller med det längsta skill-namnet i datan: inget kompetens-chip har
   `scrollWidth > clientWidth` eller `scrollHeight > clientHeight`, och sidan har inget
   vågrätt överflöde. Bredd redovisas med rullningslistvillkor. Mätt mot `vite preview`.
6. `node scripts/validate-tokens.mjs` och `npm run build` ger kod 0.
7. Lighthouse tillgänglighet 100 på mobil och dator mot `vite preview` av färskt bygge.
   Preview-servern stängs via sin PID efteråt.

### Risker

- **Mätning mot dev igen.** Dev-servern kan redan köra på 5173. Märks i mätfilerna:
  saknar de port och byggets tidsstämpel, eller står port 5173, är punkten inte godkänd.
- **K1 tas för sent.** Byggaren börjar redigera först. Märks på att mätfilen saknar en
  tom `git diff --stat`, eller har senare tidsstämpel än första ändrade fil.
- **Filterchipsen följer med.** Ändras `.chip` i stället för en regel bara för
  kompetens-chipsen slår det mot båda. Märks i punkt 2.
- **Kompetens-chipsen ser ut som valda filterchips.** Det valda filterchipset har redan
  samma fyllning och text (`ProjectFilter.module.css:47-49`). Det är Jelals val, men
  arkitekten noterar det i M26 så att ingen senare "rättar" det; tas upp med Jelal bara
  om han själv nämner det.
- **P20 blir kvar halvt.** Prop eller CSS-regel ligger kvar oanvänd. Märks i punkt 4.
- **Falsk kommentar blir kvar.** Märks med `grep -rn "varmvit\|f6f4f0\|ljus yta" src ARKITEKTUR.md`
  efter P21b; träffar bara där M26 eller historik uttryckligen avser det.

## P20 — Ifyllda kompetens-chips i varmvitt (#f6f4f0) med mörk text (KLAR 2026-11-18, UPPHÄVD samma dag av Jelal, se P21)

Skriven 2026-11-18 av projektledaren. Fogas in i `PLAN.md` av samordnaren, ovanför
"Tidigare omgångar". Ingen tidigare text i `PLAN.md` tas bort.

**Mål (Jelal, 2026-11-18):** Kompetens-chipsen i den mörka sektionen Kompetens
(`--bg` #101010) blir ifyllda med varmvitt #f6f4f0, samma värde som `--bg` i
`[data-surface='light']`, med mörk text #141414. Jelal valde #f6f4f0 framför #ffffff.
Projektfiltrets chips ändras inte.

**Underlag:** `src/components/SkillChip.jsx`, `src/components/Chip.jsx`,
`src/components/Chip.module.css`, `src/components/ProjectFilter.jsx`,
`src/styles/tokens.css` (`:root` och `[data-surface='light']`),
`scripts/validate-tokens.mjs`, `ARKITEKTUR.md` M15 och M23.

### Lärdomar som gäller här

- **2026-11-08, P18 byggdes utan post i `PLAN.md`.** → Detta avsnitt är posten.
  Byggaren startar P20b först när `grep -n "P20b" PLAN.md` ger träff.
- **2026-11-08, projektledaren skrev över hela PLAN.md.** → Avsnittet ligger i en
  separat fil. Samordnaren kör `git diff --numstat PLAN.md` efteråt, borttagna rader = 0.
- **2026-11-08, `profile.js` lovar "ändra bara här" men värdet står på flera
  ställen.** → #f6f4f0 och #141414 står redan i `tokens.css` (ljus `--bg`, `--ink`
  och `--ink-inverse`). Arkitekten bestämmer i M25 hur värdet återanvänds så att det
  står på ett ställe, och kör `grep -rn "f6f4f0\|141414" src scripts index.html`
  före beslutet.
- **2026-11-07, token utan konsument.** → Ett nytt token deklareras i samma paket
  som sin första `var()`-konsument, och `validate-tokens` ska ge kod 0.
- **2026-11-08, README beskriver tokengrinden som före M23.** → Bara namn i `:root`
  räknas som deklarerade. Ett nytt namn som bara står i den ljusa ytan fäller bygget.
- **2026-10-08, tokennamn som motivering för kontrast.** → Kvoten text mot fyllning
  skrivs i `tokens.css` i formatet `/* <token> mot <bakgrund>: X,XXX:1 — AA normal */`.
- **Kodkommentarer (ÅTERFALL, 3+).** → `SkillChip.jsx:4-6` säger att kompetenserna
  "ser ut som filterchipsen". Det blir falskt. Byggaren kör grep-regeln 2026-11-08
  på ändrade filer och skriver om kommentaren till invarianten.
- **2026-10-02 och 2026-10-08, 360 px-golvet och rullningslistvillkoret.** → Varje
  bredd redovisas med sitt rullningslistvillkor.

### Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| P20a | M25 i `ARKITEKTUR.md`: hur fyllningen och textfärgen når SkillChip utan att värdena dubbleras (eget token, variant av Chip eller annat), att filterchipsen inte påverkas, vad som händer med kanten och `--ink-muted`, och vilka kommentarer som blir falska. | arkitekt | M25 finns, anger exakt vilka filer som ändras, och M15:s påstående om att chipsen ser likadana ut är rättat eller märkt RÄTTAT. |
| P20b | Bygg M25. | byggare | Allt under "Godkänt när" punkt 1–5 är kört och redovisat. |
| P20c | Smal granskning av P20b mot "Godkänt när". Inga nya mätserier utöver dem. | granskare | Utfall skrivet, nya fynd i `LARDOMAR.md`. |
| P20d | Commit. | samordnaren | `git status` ren för paketets filer. |

**Ingår:**
- Ifylld bakgrund #f6f4f0 och text #141414 på kompetens-chipsen i Kompetens.
- Kontrastkommentar för text mot fyllning i `tokens.css`.
- Omskrivning av kommentarer som påstår att kompetens-chipsen ser ut som filterchipsen.

**Ingår inte:**
- Projektfiltrets chips (`ProjectFilter.jsx`), deras växlingsläge och fokusstil.
- Andra färger, typsnitt, storlek, radie eller avstånd på chipsen.
- Hover eller andra tillstånd (kompetens-chipsen är text, inte kontroller).
- Färgerna i de ljusa sektionerna.

**Godkänt när:**
1. Kontrast text mot fyllning är minst 4,5:1 (AA normal), uppmätt på renderade
   värden (`getComputedStyle` på ett kompetens-chip, `color` mot `background-color`),
   och kvoten står i `tokens.css`.
2. Filterchipsen är oförändrade: `getComputedStyle` för `background-color`, `color`,
   `border-color` och `padding` på ett filterchip i både vilande och `aria-pressed='true'`
   läge är identisk före och efter P20b. Före-värdena sparas i scratchpad innan P20b ändrar något.
3. 360 px-golvet håller med det längsta skill-namnet i datan: inget kompetens-chip har
   `scrollWidth > clientWidth` eller `scrollHeight > clientHeight`, och sidan har inget
   vågrätt överflöde. Bredd redovisas med rullningslistvillkor.
4. `node scripts/validate-tokens.mjs` och `npm run build` ger kod 0.
5. Lighthouse tillgänglighet 100 på mobil och dator mot `vite preview` av färskt bygge.

### Risker

- **Värdet dubbleras.** Lättast att skriva #f6f4f0 direkt i CSS-modulen. Märks med
  `grep -rn "f6f4f0" src` efter P20b: träffar bara i `tokens.css`.
- **Filterchipsen följer med.** En ändring i `.chip` slår mot båda. Märks i punkt 2.
- **Tokengrinden fäller ett nytt namn** som bara binds i den ljusa ytan. Märks direkt
  i punkt 4.
- **Falsk kommentar blir kvar** i `SkillChip.jsx` eller M15. Märks med
  `grep -rn "filterchipsen" src ARKITEKTUR.md`.

## P19 — Full SEO: canonical, delningskort, JSON-LD och sitemap (KLAR 2026-11-18, godkänd i P19d, Lighthouse SEO 100 mobil och dator)

Skriven 2026-11-18 av projektledaren. Fogas in i `PLAN.md` av samordnaren, ovanför
"Tidigare omgångar". Ingen tidigare text i `PLAN.md` tas bort.

**Mål (Jelal):** Lighthouse SEO är redan 100. Sidan ska dessutom ha canonical,
Open Graph och Twitter-kort med en genererad delningsbild, JSON-LD för Person och
WebSite, och en sitemap som robots.txt pekar på. Domänen är
`https://jelalqaiumi.se/` (gemener, ingen www).

**Underlag:** `index.html`, `public/robots.txt`, `.gitattributes`,
`src/data/profile.js`, `src/data/contact.js`, `scripts/optimize-images.mjs`,
`scripts/prerender.mjs`, `ARKITEKTUR.md` M21 punkt 3 och 4.

### Lärdomar som gäller här

- **2026-11-08, P18 byggdes utan post i `PLAN.md`.** → Detta avsnitt är posten.
  Byggaren startar P19c först när `grep -n "P19c" PLAN.md` ger träff.
- **2026-11-08, projektledaren skrev över hela PLAN.md.** → Avsnittet ligger i en
  separat fil och fogas in. Samordnaren kör `git diff --numstat PLAN.md` efteråt,
  och kolumnen för borttagna rader ska vara 0.
- **2026-10-02 (ÅTERFALL, 3+), överspelade stycken står kvar i ARKITEKTUR.md.** →
  RÄTTAT 2026-11-18 i M24: M21 punkt 4 sade "Ingen `Sitemap`-rad" och att robots.txt var det
  "**enda** undantaget" från regeln att varje fil i `dist/` har en referens. Båda
  blir falska med P19. Arkitekten rättar dem på sin plats i samma redigering som
  M24, och söker efter `Sitemap` och `enda undantag` i `ARKITEKTUR.md` och
  `PLAN.md`.
- **2026-11-08, `profile.js` lovar "ändra bara här", men värdet står på flera
  ställen.** → Domänen kommer att stå i canonical, og:url, og:image, JSON-LD,
  sitemap och robots.txt. Namn och roll står redan i både `profile.js` och
  `<title>`. Arkitekten bestämmer för varje värde om det läses ur en enda källa
  eller skyddas av en grind som fäller bygget när ställena glider isär. Inget löfte
  om "ändra bara här" skrivs utan att `grep -rn "jelalqaiumi.se" src scripts public index.html`
  är körd.
- **2026-10-02, obearbetade källbilder ligger aldrig i `public/`, och varje fil i
  `dist/` har en referens.** → Delningsbilden genereras ur `assets-source/` och
  bara resultatet hamnar under `public/`. Den refereras av `og:image`. Sitemapen
  refereras av robots.txt. Arkitekten skriver om regeln om undantag så att den
  stämmer.
- **2026-10-02, ett skript som skriver artefakter skriver till en temporärkatalog
  och flyttar först när kontrollerna gått igenom.** → Gäller bildgenereringen,
  och en tvingad grind ska visas lämna målkatalogen orörd.
- **2026-10-02, utskrivna kontroller märks `GRIND:` eller `UPPLYSNING:`, och en
  kontroll som behövs två gånger lyfts till en funktion.** → Gäller om
  bildskriptet utvidgas. Byggaren redovisar `grep -c` på varje `fail()`-meddelande.
- **2026-10-02, ett npm-script läggs till i samma paket som filen det anropar, och
  varje script i `package.json` körs en gång före överlämning.**
- **2026-10-05, mät aldrig `dist/` utan att binda det till källan.** → Alla
  kontroller i "Godkänt när" görs på ett bygge som körts omedelbart före, och
  överlämningen anger byggkommandot och tidsstämpeln för senast ändrade fil under
  `src/`.
- **2026-10-05, en grind prövas med tre indata: korrekt (tiger), felaktigt
  (larmar) och den föreskrivna åtgärden (tiger).** → Gäller varje ny grind i P19.
- **2026-11-08, `robots.txt` blev CRLF i en färsk klon.** → Radslutet för
  robots.txt, och för sitemap.xml om arkitekten kräver det, verifieras i en färsk
  klon med `core.autocrlf=true`.
- **2026-10-02 (ÅTERFALL, 3+), kodkommentarer med uppmätta tal eller med vad
  ARKITEKTUR.md "säger".** → Kommentarerna i `index.html` och skripten skrivs som
  invarianter med hänvisning till M24.
- **Projektets minne: Jelal vill se något körbart snabbt, breda uppdrag hänger
  sig, inga streck i synlig text.** → Paketet är litet och byggs i ett steg.
  Granskningen är smal. Description och og:description prövas mot streck.

### Ingår

1. `<link rel="canonical">` med `https://jelalqaiumi.se/` i `<head>`.
2. Open Graph: `og:title`, `og:description`, `og:url`, `og:type` = `website`,
   `og:locale` = `sv_SE`, `og:image` (absolut adress), `og:image:width` = 1200,
   `og:image:height` = 630 och `og:image:alt`. Twitter: `twitter:card` =
   `summary_large_image`.
3. Delningsbilden, 1200 × 630, genererad av ett skript ur befintligt material i
   `assets-source/` (hero-porträttet eller loggan, arkitekten väljer), med ett
   npm-script. Ingen bild läggs för hand i `public/`.
4. JSON-LD med `Person` (namn, jobTitle, url, image, sameAs) och `WebSite`.
   Namn och roll läses ur `src/data/`. Var domänen och sameAs-adresserna bor
   bestämmer arkitekten, med svaret på fråga B nedan.
5. `public/sitemap.xml` med startsidan, och raden
   `Sitemap: https://jelalqaiumi.se/sitemap.xml` i `public/robots.txt`, med
   LF-radslut.
6. Jelals godkännande av sidbeskrivningen (fråga A). Efter godkännandet tas
   FÖRSLAG-markeringen bort ur `index.html`, och M21 punkt 3 uppdateras.
7. M24 i `ARKITEKTUR.md`, och rättningen av M21 punkt 4 på sin plats.

### Ingår inte

- Fler sidor i sitemapen, `lastmod`-logik utöver vad arkitekten beslutar,
  `hreflang` och en engelsk version.
- JSON-LD för projekten, och strukturerad data utöver Person och WebSite.
- Driftsättning, DNS, Google Search Console och manuell kontroll i externa
  validerare. Det kan Jelal göra efter driftsättning, och det är inget villkor här.
- Ändringar av synlig text på sidan, ikoner eller manifest.
- Ny design av delningsbilden utöver beskärning och placering av befintligt
  material.

### Två frågor till Jelal (besvaras innan P19c startar)

- **A. Sidbeskrivningen.** Texten i `index.html` är ett FÖRSLAG. Godkänner du den
  ordagrant, eller vill du ha en annan? Samma text blir `og:description`.
- **B. GitHub i sameAs.** GitHub-länken på sidan togs bort på din begäran
  2026-10-06 (`url: null` i `src/data/contact.js`). Ska den tillbaka på sidan, så
  att sameAs kan läsas ur samma lista, eller ska GitHub bara stå i sameAs och inte
  synas på sidan? LinkedIn-adressen i `contact.js` är märkt "härledd, inte
  verifierad", och din adress i uppdraget är densamma. Räknas den nu som
  verifierad?

**Jelals svar 2026-11-18 (P19a klar):**
- **A:** "Ja, godkänd". Beskrivningen i `index.html` används ordagrant.
- **B:** "Bara i JSON-LD". GitHub (`https://github.com/Jelalqaiumi`) står bara i
  sameAs och syns inte på sidan.
- **LinkedIn:** "Ja, den stämmer". `https://www.linkedin.com/in/jelalqaiumi` är
  bekräftad.

### Steg

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| P19a | Fråga A och B till Jelal | samordnare, sedan Jelal | Båda svaren står ordagrant med datum i `PLAN.md` under denna rubrik |
| P19b | **M24**: källan till varje värde (domän, namn, roll, sameAs), hur JSON-LD och metataggar kommer in i `dist/index.html`, bildens källa, format, beskärning och storlekstak, radslut för sitemap, och grindarna med tre indata vardera. M21 punkt 4 rättas på sin plats | arkitekt | Varje punkt i "Ingår" har ett beslut i M24 med vilket steg som genomför det. `grep -n "Ingen \`Sitemap\`-rad\|enda undantag" ARKITEKTUR.md PLAN.md` ger bara träffar märkta RÄTTAT eller UPPHÄVT |
| P19c | Bygget enligt M24 | byggare | Alla punkter under "Godkänt när" nedan är redovisade, och varje beslut i M24 är besvarat med `fil:rad` |
| P19d | Smal granskning av P19 | granskare | Varje punkt under "Godkänt när" är omprövad mot ett eget färskt bygge, eller så finns ett fynd i `LARDOMAR.md` |
| P19e | Commit. Jelal pushar själv | samordnare, sedan Jelal | `git status` är ren, och varje incheckad fil hör till P19 |

P19a och P19b går parallellt. M24 skrivs så att svaret på fråga B kan föras in
utan att beslutet görs om. P19c startar när både P19a och P19b är klara.

### Godkänt när (P19c och P19d)

Alla kontroller görs mot `dist/` från ett `npm run build` som körts omedelbart
före, med kod 0.

1. **Canonical.** `dist/index.html` har exakt en `<link rel="canonical">`, och
   dess `href` är exakt `https://jelalqaiumi.se/`.
2. **Open Graph och Twitter.** Var och en av de tio egenskaperna under "Ingår"
   punkt 2 förekommer exakt en gång i `dist/index.html` med det angivna värdet.
   `og:url` är lika med canonical. `og:image` börjar med `https://jelalqaiumi.se/`.
   `og:image:alt` och `og:title` innehåller text, och `og:description` är tecken
   för tecken lika med `meta name="description"`.
3. **Delningsbilden.** Filen som `og:image` pekar på finns i `dist/` på samma
   sökväg. Dess mått läses ur filen själv och är 1200 × 630, och storleken ligger
   under taket i M24. Ingen fil i `assets-source/` ligger i `public/` eller
   `dist/`. Bildens npm-script är kört, och en andra körning ger en fil med samma
   innehållshash. En tvingad grind i skriptet lämnar målkatalogen orörd (sökväg
   till utdata i scratchpad).
4. **JSON-LD.** Varje `<script type="application/ld+json">` i `dist/index.html`
   går att `JSON.parse` utan fel. Tillsammans innehåller de exakt en `Person` och
   exakt en `WebSite`. `Person.name` och `Person.jobTitle` är lika med värdena i
   `src/data/` enligt M24, `url` är domänen, `image` är en absolut adress till en
   fil som finns i `dist/`, och `sameAs` innehåller exakt de adresser som svaret
   på fråga B ger. **Negativ kontroll** i en kopia av projektet: ändrat namn i
   `src/data/profile.js` ger det nya namnet i JSON-LD efter bygget, och ett namn
   som innehåller `</script>` ger fortfarande JSON som går att tolka och samma
   antal `<script>`-element i sidan.
5. **Sitemap.** `dist/sitemap.xml` är välformad XML (tolkas utan fel), har
   rotelementet `urlset` i sitemaps.org-namnrymden och exakt en `<loc>`, som är
   `https://jelalqaiumi.se/`. `vite preview` svarar 200 på `/sitemap.xml`.
6. **robots.txt.** `dist/robots.txt` innehåller raden
   `Sitemap: https://jelalqaiumi.se/sitemap.xml` och raderna enligt M24. I en
   färsk klon med `core.autocrlf=true` visar `od -c` inget `\r` i robots.txt (och
   i sitemap.xml om M24 kräver LF där).
7. **En källa per värde.** Domänen ändrad på ett ställe i en kopia av projektet
   ger antingen samma ändring överallt i `dist/` eller ett stoppat bygge med ett
   svenskt meddelande, enligt M24. Samma prov för rollen. Varje grind som P19
   inför är prövad med korrekt, felaktigt och den föreskrivna åtgärden, med
   sökväg till utdata.
8. **Sidbeskrivningen.** Jelals svar på fråga A står i `PLAN.md`.
   `grep -c "FÖRSLAG" index.html` gäller inte längre beskrivningen, och
   description och `og:description` ger 0 träffar på streck med samma sökning som
   i M21 punkt 3.
9. **Inget annat har gått sönder.** Lighthouse SEO, Bästa praxis och
   Tillgänglighet är 100 mot ett färskt `vite preview`, mobil och desktop, en
   körning var. `du -sh dist` och de tre största filerna är redovisade. Varje fil i
   `dist/` har en referens, eller är ett undantag som M24 räknar upp.
10. **Städning.** Varje script i `package.json` har körts en gång.
    `grep -rn "EJ I ARKITEKTUR" src scripts index.html` är redovisad. Kommentarer
    i ändrade filer bär inga uppmätta tal. `netstat` visar ingen kvarlämnad
    server efter mätningen.

### Risker

- **Värdena glider isär.** Domän, namn och roll hamnar på sex eller fler ställen,
  och det första som ändras senare blir det enda som ändras. **Märks tidigt**
  genom punkt 7 i "Godkänt när", som tvingar fram ett prov där ett ställe ändras.
- **JSON-LD bryter sidan.** Ett värde ur datan som innehåller `</script>` eller
  citattecken kan bryta ut ur skriptblocket eller ge ogiltig JSON. **Märks
  tidigt** genom den negativa kontrollen i punkt 4.
- **Förrenderingen eller hydreringen påverkas.** Om metataggarna förs in i samma
  steg som fyller roten kan markeringen som `prerender.mjs` letar efter flyttas.
  **Märks tidigt** genom att bygget stannar, och genom Lighthouse-körningen i
  punkt 9.
- **Delningsbilden blir fel beskuren eller för tung.** 1200 × 630 är bredare än
  porträttet. **Märks tidigt** genom att arkitekten anger beskärning och
  storlekstak i M24, och genom att samordnaren visar bilden för Jelal innan
  commit.
- **Fråga B blir obesvarad och sameAs gissas.** Den frestande utvägen är att lägga
  GitHub direkt i JSON-LD och lämna sidans länk som `null`. **Märks tidigt**
  genom att P19c inte startar förrän svaret står i `PLAN.md`.
- **M21 punkt 4 står kvar och motsäger M24.** **Märks tidigt** genom
  sökningen i P19b:s "Klar när".
- **Paketet växer.** Externa validerare, fler sidor eller projektdata frestar.
  **Märks tidigt** genom listan "Ingår inte".

# Tidigare omgångar (oförändrade, ur 6d74727)

# Plan: Modernisera portfolion enligt `UPPDRAG-2026-11-07.md` — mörk, lugn premiumdesign, nya projektkort med filter, utan att bryta sidan

Skriven 2026-11-07. **Uppdaterad samma dag** efter G1 (EJ GODKÄND, sju fynd) och
arkitektens beslut R1–R6, efter granskarens efterkontroll (G1-rättningen
GODKÄND) och arkitektens beslut **M10c**, efter **M11b**, efter att P10 byggts,
arkitektens beslut **M12b**, P5 omgång 4:s återlämning och **Jelals besked om hero
på mobil**, och **igen** efter att P9b, P5 omgång 5, P11–P14 byggts och arkitekten
skrivit **M19**. **Uppdaterad 2026-11-08** efter P14b (M19), P14c (M20), P15-fix
(M21), commit `525afa1` och **G2: EJ GODKÄND** (sex fynd). **Denna omgång (paket
P1–P17) står först.** Den tidigare omgången (paket A–M, innehållsuppdraget
2026-10-07) står **oförändrad** längre ner i filen, under rubriken "Plan: Byt
innehållet i hero ...". Där har jag bara markerat de paket som är avslutade.

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

Därtill två beslut i samma avsnitt, med uppdragsfilens egna nummer, båda
**genomförda**:

- **Beslut 7, inga streck i synlig text.** Genomfört. P14b:s grind 5 prövar det på
  den renderade sidan, i `<title>` och i `noscript` (M19).
- **Beslut 8, mobil-hero med bilden överst och texten under.** Genomfört i P5
  omgång 5 enligt M10d.

Prefixet **P** används för att inte krocka med bokstäverna A–M i den förra
omgången eller med "paket 1–8" som `ARKITEKTUR.md` och `LARDOMAR.md` hänvisar
till. Paketen efter G1 heter **G1-kommentarerna** och **G1-rättningen**, det
senare med arkitektens namn ur `ARKITEKTUR.md`. Heros fjärde och femte omgång
heter **P5 omgång 4** (M10c) och **P5 omgång 5** (M10d). **P9b** är följdpaketet
med arkitektens namn ur M11b och M12b. **P11b** (M15b), **P12b** (M14b) och
**P14b** (M19) är följdpaket till P11, P12 och P14 med arkitektens beslut som
underlag. **P14c** (M20, ny logga) och **P15-fix** (M21) har arkitektens namn.
Paketen efter G2 heter **G2-kommentarerna** (fynd 1), **G2-rättning** (fynd 2–6
enligt **M22**) och **efterkontrollen av G2**. **P8b finns inte som eget paket.**
P8:s tre öppna frågor avgjordes i M11b (rad 1–3) och ingick i P9b.

---

## Status 2026-11-08, efter G2

| Paket | Läge |
|---|---|
| P1 | **Klart.** Besluten M1–M18 står i `ARKITEKTUR.md`, och följdbesluten därefter (M8b, M10b–M10d, M11b, M12b, M14b, M15b, M19, M20, M21) |
| P2, P3, P4, P5, P6, P7 | **Byggda.** P5 byggdes i fem omgångar, se nedan |
| P4b | **Byggt.** Följdpaket enligt M8b |
| G1 | **Genomförd: EJ GODKÄND, sju fynd** (`LARDOMAR.md`, posterna daterade 2026-11-07). Fynd 1–7 är åtgärdade |
| G1-kommentarerna | **Klart.** Fynd 1–2 |
| G1-rättningen | **KLART. GODKÄND av granskarens efterkontroll 2026-11-07.** Fynd 3–7 enligt R1–R6. Efterkontrollens två nya kommentarsfel åtgärdades i P5 omgång 4 (`index.html:34-35`) och P13 (`Contact.module.css:15-17`) |
| P8, P9, P10 | **Byggda.** Deras öppna punkter avgjordes i M11b och M12b och genomfördes i P9b |
| P5 omgång 4 | **Byggd, lämnad tillbaka** (M10c rad 7 och 9). Följd av omgång 5 |
| P5 omgång 5 | **Byggd** enligt M10d, med Jelals beslut 8 (bilden överst på mobil) |
| P9b | **Byggt.** M11b + M12b |
| P11, P11b | **Byggda.** P11b enligt **M15b**: mono-vikt och etikettavstånd |
| P12, P12b | **Byggda.** P12b enligt **M14b**: gemensamt kompetensurval i `src/lib/skillRules.js`, och tal som är 0 döljs |
| P13 | **Byggt** |
| P14 | **Byggt**, med en avvikelse under mätningen, se nedan |
| **P14b** | **Byggt och mätt** enligt **M19** |
| **P14c** | **Byggt och mätt** enligt **M20** (ny logga) |
| **P15 med P15-fix** | **Klar.** P15-fix enligt **M21**. P14b, P14c och P15-fix är byggda och mätta i steg 1–4. **Lighthouse, median: 97 på mobil och 100 på desktop. Accessibility, Best practices och SEO: 100.** P15 del B är omkörd på det slutliga bygget, med **0 fel** |
| Commit | **`525afa1`**, lokal, **inte pushad** |
| **P16 (G2)** | **Genomförd: EJ GODKÄND, sex fynd** (`LARDOMAR.md`, posterna daterade 2026-11-08) |
| **G2-kommentarerna** (fynd 1) | **PÅGÅR.** Byggaren rättar de falska kommentarerna |
| **M22** | **Ej skriven.** Arkitekten avgör fynd 2–6 |
| G2-rättning, efterkontrollen av G2, P17, commit och push | Ej startade |

"Byggt" betyder att byggarens verifiering är gjord. G1 underkände P1–P7 som
helhet. **Med G1-rättningen godkänd är G1:s fynd åtgärdade, och P1–P7 räknas som
godkända mot G1.** G2 (P16) prövade hela omgången och underkände den. **Omgången
räknas som godkänd först när efterkontrollen av G2 är godkänd.**

**G2:s sex fynd**, med samma ordning som posterna 2026-11-08 i `LARDOMAR.md`:

1. Sex kommentarer påstår ett tillstånd som moderniseringen ändrade (ÅTERFALL).
   → G2-kommentarerna, pågår.
2. `profile.js` lovar "ändra bara här", men heros bredder står på tre ställen.
   → M22.
3. En rättad grind och ett uppmätt utfall står orättade på andra ställen
   (ÅTERFALL). → Den del som gäller `PLAN.md:961` är rättad i denna
   uppdatering (P14b grind 3, märkt RÄTTAT 2026-11-08). De delar som står i
   `ARKITEKTUR.md` → M22.
4. M21 5c kan inte larma på Reacts hydreringsfel i produktion (ÅTERFALL). → M22.
5. Honeypot-fältet läses aldrig, så det kan inte stoppa något. → M22.
6. `robots.txt` blir CRLF i en färsk klon, och M21 kräver LF. → M22.

**Avvikelse under P14.** Byggaren hängde sig under mätningen, efter att koden var
skriven. Samordnaren stoppade processerna och kontrollerade att sidan renderas.
Dev-servern på port 5173 hade serverat en inaktuell modul (vit sida) och startades
om. **Följden för planen:** varje mätning från och med P14b görs mot ett färskt
`vite preview` efter ett färskt bygge, **aldrig mot dev-servern**. Se Lärdomar och
Risker.

---

## Lärdomar som gäller här

Varje "Regel framåt" i `LARDOMAR.md` är bindande. Dessa påverkar denna omgång
konkret:

**Nya efter G2 (posterna 2026-11-08), och vad de gör med planen:**

- **2026-11-08 (ÅTERFALL, 3+), en rättad grind och ett uppmätt utfall står
  orättade på andra ställen: när en grind eller ett förväntat tal rättas, sök
  efter kommandot eller talet i både `ARKITEKTUR.md` och `PLAN.md`, och märk varje
  träff `RÄTTAT <datum>, se <avsnitt>` i samma ändring.** → Gjort i denna
  uppdatering för P14b grind 3. Sökningen på `Mejl`, `emailLabel` och
  `columnHeading` i `PLAN.md` gav bara den raden som grind. **Varje grind eller
  tal som M22 rättar söks också i `PLAN.md`**, och G2-rättningens `Godkänt när`
  kräver sökningen i båda filerna.
- **2026-11-08 (ÅTERFALL, 3+), sex kommentarer påstår ett tillstånd som
  moderniseringen ändrade.** → G2-kommentarerna och G2-rättningen kör sökningen
  ur posten (`enda`, `första`, `bara här`, antal tillstånd, användningar och
  värden, och "ARKITEKTUR.md säger/anger/tar inte") mot sina ändrade filer, och
  redovisar varje träff med `fil:rad`.
- **2026-11-08, ett löfte i en datafil ska prövas med `grep` innan det skrivs.**
  → Arkitekten väljer i M22 mellan att löftet i `profile.js` räknar upp de andra
  ställena och en grind som jämför preloaden med `HERO_IMAGE_WIDTHS`. Planen
  väljer inte.
- **2026-11-08 (ÅTERFALL), en konsolgrind räknas inte som klar förrän dess
  negativa kontroll har körts mot ett produktionsbygge.** → Gäller M21 5c i
  G2-rättningen. Utdata från den negativa kontrollen sparas i scratchpad och
  anges med sökväg i överlämningen.
- **2026-11-08, ett skyddsfält prövas med ett negativt prov.** → Gäller
  honeypoten i G2-rättningen: rutan kryssas i, inskicket avlyssnas, och kroppen
  visas.
- **2026-11-08, ett krav på radslut skrivs in i repot och verifieras i en färsk
  klon.** → Gäller `robots.txt` i G2-rättningen.
- **2026-10-02, `ARKITEKTUR.md` ändras inte under ett pass som bygger mot den.**
  → M22 skrivs **medan** G2-kommentarerna byggs. Det är bara tillåtet om M22 inte
  ändrar något som G2-kommentarerna bygger mot. Se Risker.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), arbetsträdet fryses under granskning.**
  → `GRANSKNING-PAGAR` skapas också före **efterkontrollen av G2**.

**Nya efter P14, avvikelsen under mätningen och M19, och vad de gör med planen:**

- **2026-10-05, mät aldrig `dist/` utan att binda det till källan. Regeln gäller
  uttryckligen också en `preview`-server och en körande dev-server.** → Under P14
  serverade dev-servern en inaktuell modul. Därför mäter **P14b och P15** mot ett
  färskt `vite preview` efter `npm run build`, och överlämningen anger
  byggkommandot och tidsstämpeln för senast ändrade fil i `src/`. Dev-servern
  används inte för någon mätning. **Gäller också G2-rättningen och
  efterkontrollen.**
- **2026-10-02 + 2026-10-05, servrar: porten mäts med `netstat` före start och
  efter stopp, och servern stoppas via PID.** → Den hängda byggaren kan ha lämnat
  processer kvar. P14b mäter porten **före** start, inte bara efter stopp, och
  klistrar in raden.
- **Breda agentuppdrag hänger sig (projektets minne: dela uppdragen smalt, mät
  själv det som avgör).** → Byggaren hängde sig i mätfasen av P14. **P14b körs
  därför i två smala steg:** först ändringarna och de grindar som är sökningar och
  bygge, därefter de renderade mätningarna i en egen körning. Se P14b. **Samma
  sak gäller G2-rättningen och efterkontrollen**, som bara prövar G2:s sex fynd.
- **2026-10-02 + 2026-11-07 (ÅTERFALL), kodkommentarer bär uppmätta tal.** → M19
  punkt 12 räknar upp sju kommentarer, och de är punkter i P14b:s `Ingår:`. Hittar
  den bredare sökningen fler uppmätta tal lämnas de tillbaka till arkitekten och
  skrivs inte om på eget beslut (M19).
- **2026-10-05 (ÅTERKOMMANDE 3+), `EJ I ARKITEKTUR`-markeringar.** → M19 besvarar
  alla kvarvarande, och P14b:s grind 1 kräver noll träffar i `src`, `scripts` och
  `index.html`.
- **2026-11-07 (ÅTERFALL), ett uppskjutet beslut ska vara en punkt i `Ingår:` hos
  det paket som kommer efter villkoret.** → M19:s tabell är P14b:s `Ingår:`, rad
  för rad. Jelals två öppna frågor (fraserna med streck, "1 PROJEKT") är punkter i
  P16, inte bisatser någon annanstans. M19:s "inte kontrollerat av mig" (vilka rader
  P14 ändrade i `global.css`, `tokens.css` och `profile.js`) är en punkt i P16.
  **Efter G2:** M22:s tabell blir G2-rättningens `Ingår:`, rad för rad.

**Nya efter P10, M12b och Jelals besked (punkterna är genomförda):**

- **2026-11-07 (ÅTERFALL), ett uppskjutet beslut ska vara en punkt i `Ingår:`
  hos det paket som kommer efter villkoret.** → P8:s tre frågor, P9:s
  markeringar och P10:s fem fynd var **alla** punkter i `Ingår:` hos **P9b**, med
  arkitektens tabell som underlag. P8b upplöstes i P9b.
- **2026-10-02, paket 4 byggdes under pågående arbete: `ARKITEKTUR.md` ändras inte
  under ett pass som bygger mot den.** → M10d skrevs medan P9b byggdes, på
  villkoret att den inte rörde något P9b byggde mot. **Gällde M19 och P14b:**
  `ARKITEKTUR.md` ändrades inte medan P14b byggdes.
- **2026-11-07, `clientWidth`-grinden larmade av fel skäl: en förväntad
  mätsiffra ska ha mätts en gång innan den skrivs in i `ARKITEKTUR.md`.** → Gällde
  P5 omgång 5. Gäller också P14b: de uppmätta talen står i överlämningen.
- **2026-10-05, vaktrader som inte går att få att larma.** → Prövades i P9b (M12b
  punkt 5, prov 6).

**Nya efter efterkontrollen (de två sista posterna 2026-11-07):**

- **2026-11-07 (ÅTERFALL), `index.html` hävdar fortfarande att ARKITEKTUR.md
  stänger dörren för en tredje global klass: sök efter påståendets nyckelord i
  `src`, `scripts` och `index.html`, och kör tabellen över förbjudna strängar mot
  alla tre.** → Åtgärdat i P5 omgång 4. **P14b:s grind 1 och P16** söker också i
  `index.html`.
- **2026-11-07 (ÅTERFALL), `Contact.module.css` bär en mättabell från före M18.**
  → Åtgärdat i P13.

**Nya efter G1 (posterna 2026-11-07):**

- **2026-11-07 (ÅTERFALL), `profile-export-saknas` stod kvar: ett uppskjutet
  beslut ska vara en punkt i `Ingår:` hos det paket som kommer efter villkoret,
  aldrig en bisats i `ARKITEKTUR.md`.** → Varje byggpaket från och med
  G1-rättningen kör, före överlämning, för varje `OPEN-KEY: <nyckel>` i `src/` och
  `scripts/`: `grep -c "<nyckel>" ARKITEKTUR.md`. Varje träff större än 0 tas bort
  i samma ändring. Efter P14b ska det inte finnas någon `OPEN-KEY` kvar (grind 1).
- **2026-11-07, sex tokens utan konsument: ett token deklareras i samma paket som
  dess första `var()`-konsument, aldrig tidigare.** → Tokengrinden ska vara tyst
  efter P14b (grind 10).
- **2026-11-07 (ÅTERFALL), moderniseringen gjorde fem kommentarer falska.** →
  Varje paket som ändrar ett token, ett grid-spår eller en global klass kör
  `grep -rn "<tokennamn>\|<klassnamn>\|[0-9]\+ px" src` och skriver om tal, antal
  och uppräkningar i kommentarer till invarianter. I P14b motsvaras det av M19
  punkt 12:s sökning.
- **2026-11-07, logo-brickans fasta höjd: ett element med fast `height` och text ur
  `src/data/` anger sitt överflöde.** → Gällde P8–P12.
- **2026-11-07, en slug som krockar med sidans egna id passerar.** → Efter R2
  gäller att **varje fast id i en komponent är en `*_ID`-export i `sections.js`**.
  P14b inför inget id (M19 punkt 3: den dolda texten står inne i länken, och inget
  id behövs).
- **2026-11-07, grinden på rotens `clientWidth` larmade av fel skäl: "layouten
  flyttar sig inte" mäts på layoutens egna rektanglar.** → Samma metod i P15.
- **2026-11-07 (ÅTERFALL), A4:s deklaration pekade på fel element: en signatur
  anges med det paket där varje parameter får sin första konsument.** → Genomfört
  i P10 och P9b.

**Sedan tidigare:**

- **Breda agentuppdrag hänger sig (projektets minne).** Därför små paket. Varje
  byggpaket rör en sektion eller en mekanism, och varje paket lämnar en sida som
  går att öppna i webbläsaren. **P14b rör tio filer**, men varje ändring är en rad
  i M19:s tabell, och paketet körs i två steg (se ovan).
- **Granska hårt vid leverans, inte efter varje paket (Jelals önskemål, projektets
  minne).** Två granskningspunkter: **G1 efter P7** (projektkortet) och **G2 vid
  slutleveransen (P16)**. Övriga paket avslutas med byggarens egen
  verifieringslista och grönt `npm run build`. Det avviker från CLAUDE.md:s "kör
  alltid granskare" och är Jelals uttryckliga val. **P14b följde huvudregeln:**
  byggarens grindar, ingen egen granskning. **Efter G2** följer en smal
  efterkontroll av granskaren, som efter G1.
- **2026-10-02 + 2026-10-05 (ÅTERFALL), arbetsträdet fryses under granskning.**
  `GRANSKNING-PAGAR` skapas före G2 och raderas när rapporten är levererad. Inget
  P-paket byggs medan filen finns. P14b kräver att filen **inte** finns.
- **2026-10-02 (ÅTERFALL ×3), överspelade stycken i `ARKITEKTUR.md`.** Varje
  upphävt stycke märks `UPPHÄVT` eller skrivs om på sin egen plats. M19 har rättat
  M16:s footerpunkt på plats och lagt sina strängar i tabellen över förbjudna
  strängar ("Tillagt 2026-11-07, M19").
- **2026-10-02, ARKITEKTUR.md beskrev verktyg och filer som inte finns.**
  Lighthouse finns inte i `package.json`. **P15 kör Lighthouse enligt beslut 17**,
  och verktyget kontrolleras i miljön innan siffran redovisas.
- **2026-10-02, headerns höjd har två sanningar.** → P15 mäter ankarhoppen igen.
- **2026-10-02 (ÅTERFALL), 360 px-golvet spricker genom grid och flex.** Golvet
  mäts med programmatiskt insatt syntessträng, aldrig med dagens korta text, och
  mot **behållarens egen** bredd. → P14b grind 7 (footerns e-postlänk och etikett)
  och P15 punkt 1.
- **2026-10-08, mätvillkoret för rullningslisten.** Varje bredduppmätning anger
  sitt rullningslistvillkor. Ingen `--flagga=false`.
- **2026-10-02, sektions-id som bokstavlig sträng i `.jsx`, och länk bara om
  målet finns.** → P15 punkt 7.
- **2026-10-02, sidans enda `<h1>` och `label`.** → P14b grind 4 (rubriken
  "Kontakt" exakt en gång, inget `h1`–`h6` i footern) och P15 punkt 7.
- **2026-10-02 + 2026-10-05, datadrivet.** Räknarna och nyckeltalen räknas ur
  data, aldrig skrivs. → Jelals fråga om "1 PROJEKT" gäller **om** talet ska
  visas, inte hur det räknas.
- **2026-10-05, ett löfte i en fil Jelal redigerar får aldrig vara osant.** →
  `profile.js`-kommentaren rättades i P14b (M19 punkt 13), och fynd 2 i G2 gäller
  samma fil igen (M22). `README.md` och `GUIDE.md` i P17.
- **2026-10-05, mät artefakten, inte deklarationen — teckengrinden.** Grinden
  läser `cmap` ur **varje** woff2-fil och **alla** `@font-face`.
- **2026-10-05, en grind som fälls av fel skäl lär oss att ignorera den.** När en
  grind fäller i P14b eller P15 rättas orsaken av det paket som äger filen, aldrig
  grinden. **Undantaget är en grind som själv är fel skriven**, som P14b grind 3
  (G2-fynd 3). Den rättas av den som äger dokumentet, och den gamla lydelsen märks
  RÄTTAT.
- **2026-10-08, kontrast: tokennamnet är ingen motivering.** → P14b grind 6
  (footerns etikett, länkar, tagline och copyright mätta mot `--bg`) och P15
  punkt 2.
- **2026-10-05 + 2026-10-08 (ÅTERKOMMANDE 3+), kodkommentarer.** Kommentarerna
  beskriver invarianten, aldrig ett uppmätt tal, aldrig vad `ARKITEKTUR.md`
  säger och aldrig en uppräkning av ett block i en annan fil. Varje paket läser om
  hela kommentarsblocket kring det det ändrar.
- **2026-10-05, deklarationer i `ARKITEKTUR.md` skrivs tecken för tecken.** → M19
  skriver ut markupen för etiketten, länkmönstret och `.columnLabel`. Byggaren
  svarar med `fil:rad`.
- **2026-10-02, bilder.** Varje paket som rör bilder mäter `dist/`, bundet till ett
  färskt bygge. P14b rör inga bilder.
- **2026-10-05, negativ kontroll.** Smalaste selektorn, vilket element som bar
  avvikelsen, och att larmet upphörde. → P14b grind 5 skriver ut elementet och
  texten vid en träff.
- **2026-10-05, vaktrader.** Kopierar byggaren vaktrader till en ny layout ska de
  tvingas fallera där, annars skrivs kommentaren om.

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

**Mitt förslag** för de fyra öppna:

- **LEVERANS och G** körs inte separat. De skulle granska hero, kort och
  kompetenser som denna omgång skriver om. **G:s kontrollpunkter för filer som
  inte skrivs om** (Om mig, `validate-data.mjs`:s skills-grindar,
  `UPPDRAG-2026-10-07.md`:s oförändrade tecken) togs med i **G1**.
  Frågorna från förra LEVERANS-avsnittet som fortfarande gäller (Hem och Ekonomi,
  LinkedIn, granskningsrytmen) ställs vid **P16**.
- **Heros fyra `EJ I ARKITEKTUR`-markeringar** (`sizes`, `alt`, `.inner`,
  `contrast(1.05)`) avgjordes av arkitekten i **P1** och genomfördes i **P5**.
- **L** (`OPEN-KEY`-grinden) körs **efter P16**, av samma skäl som förut: en ny
  grind i `build` mitt i omgången ger varje pakets verifiering ett rött bygge som
  inte hör till paketet.
- **H** (GUIDE.md) slås ihop med **P17**.

---

## Arbetspaket

| # | Uppgift | Agent | Klar när |
|---|---------|-------|----------|
| P1 | ~~Arkitekturbesluten för moderniseringen, och upphävning av de gamla besluten på sin egen plats~~ **KLART** (M1–M18) | arkitekt | Varje beslut står i `ARKITEKTUR.md` med det paket som genomför det, och varje upphävt stycke är märkt på sin plats |
| P2 | ~~Tokens och de tre typsnitten, med teckensnitts- och tokengrinden anpassade~~ **BYGGT** | byggare | Hela sidan renderas i de nya färgerna och typsnitten, och båda grindarna har larmat och tigit |
| P3 | ~~Navigering, dator~~ **BYGGT** | byggare | Naven svävar, aktiv länk följer scrollen och ankarhoppen landar under naven |
| P4 | ~~Navigering, mobil~~ **BYGGT** | byggare | Panelen öppnas och stängs med mus, tangentbord och Esc, och fokus hanteras |
| P4b | ~~Följdpaket enligt M8b~~ **BYGGT** | byggare | Varje markering i M8b:s tabell är borttagen eller genomförd enligt sin rad |
| P5 | ~~Hero: eyebrow, h1, ingress, glöd och porträtt~~ **BYGGT** (tre omgångar) | byggare | Hero följer uppdragets typografi, ett `h1`, heros fyra markeringar avgjorda och borttagna |
| P5 omgång 4 | ~~Heros svartvita porträtt (M10c)~~ **BYGGD, LÄMNAD TILLBAKA** (rad 7 och 9) | byggare | Följdes av P5 omgång 5 |
| P5 omgång 5 | ~~Hero enligt M10d: Jelals beslut 8 och M10c:s rad 7 och 9~~ **BYGGD** | byggare | M10d:s grindar redovisade |
| P6 | ~~Projektdatan~~ **BYGGT** | byggare | Den nya modellen valideras med tre värden per obligatoriskt fält, och kortet visar Awle |
| P7 | ~~Projektkortet och kortgriden 3/2/1~~ **BYGGT** | byggare | Kortet följer uppdragets mått, länkar enligt beslut 1 och håller 360 px |
| **G1** | ~~**GRANSKNINGSPUNKT 1**~~ **GENOMFÖRD: EJ GODKÄND, sju fynd. Fynden åtgärdade** | granskare (+ samordnare visar) | Fynden i `LARDOMAR.md`, åtgärdade |
| G1-kommentarerna | ~~Fynd 1–2~~ **KLART** | byggare | Kommentarerna beskriver invarianter, och markeringen är borta |
| **G1-rättningen** | ~~Fynd 3–7 enligt R1–R6~~ **KLART. GODKÄND 2026-11-07** | byggare, sedan granskare | Varje mätpunkt redovisad och fynd 1–7 bekräftade som åtgärdade |
| P8 | ~~Filterpanel del 1~~ **BYGGT** | byggare | Segmenten filtrerar, antalen och live-raden räknas ur data |
| P9 | ~~Filterpanel del 2~~ **BYGGT** | byggare | Chips och sök samverkar med segmentet, och tokengrinden tiger |
| P10 | ~~Animationer~~ **BYGGT** | byggare | Reveal fungerar, reducerad rörelse stänger av allt, och tokengrinden tiger |
| P9b | ~~M11b + M12b~~ **BYGGT** | byggare | De sju grindarna redovisade |
| P11 | ~~Numrerade sektionsetiketter och kompetenserna i filterchipsens stil~~ **BYGGT** | byggare | Etiketterna räknas ur `sections.js`, och kompetenschipsen har filterchipsens stil |
| P11b | ~~Följdpaket enligt M15b: mono-vikt och etikettavstånd~~ **BYGGT** | byggare | Enligt M15b |
| P12 | ~~Nyckeltalsraden, och `--text-figure` (R5)~~ **BYGGT** | byggare | Varje tal är härlett ur data, och tokengrinden tiger |
| P12b | ~~Följdpaket enligt M14b: gemensamt kompetensurval i `skillRules.js`, och tal som är 0 döljs~~ **BYGGT** | byggare | Enligt M14b |
| P13 | ~~Kontakt: två kolumner, och mättabellen i `Contact.module.css` omskriven~~ **BYGGT** | byggare | Formuläret fungerar som före, layouten håller 360 px, och ingen kommentar bär ett uppmätt tal |
| P14 | ~~Footer: logga, tagline, länkkolumner, copyright, avdelare~~ **BYGGT** (avvikelse under mätningen, se Status) | byggare | Länkar renderas bara när adressen finns, och kontrasten är mätt |
| **P14b** | ~~De sista öppna punkterna före G2 enligt M19: footerns etikett, e-posten i klartext, ett `rel`-mönster, markeringarna och sju kommentarer. Tio filer~~ **BYGGT OCH MÄTT.** Grind 3 RÄTTAT 2026-11-08, se eget avsnitt | byggare | M19:s tio grindar redovisade, mätta mot färskt `vite preview`. Se eget avsnitt |
| **P14c** | ~~Ny logga enligt M20~~ **BYGGT OCH MÄTT** | byggare | Enligt M20 |
| P15 | ~~Slutkontroll: 360 px, kontrast AA, tangentbord, Lighthouse, före/efter, fillista~~ **KLAR, med P15-fix enligt M21.** Lighthouse-median 97 mobil, 100 desktop. Accessibility, Best practices och SEO 100. Del B omkörd på slutliga bygget: 0 fel | byggare | Alla mätserier redovisade som upprepbara kriterier. **P15 bygger ingenting** (rättningarna låg i P15-fix) |
| Commit `525afa1` | ~~P14b, P14c och P15-fix incheckade~~ **KLART, lokalt. Inte pushad** | samordnare | Incheckat |
| **P16 (G2)** | ~~**GRANSKNINGSPUNKT 2: hård granskning av hela omgången**~~ **GENOMFÖRD: EJ GODKÄND, sex fynd** (`LARDOMAR.md` 2026-11-08) | granskare | Fynden i `LARDOMAR.md`. Leveransfrågorna till Jelal står kvar, se Öppna frågor |
| **G2-kommentarerna** | **Fynd 1: de falska kommentarerna. PÅGÅR** | byggare | Varje kommentar i fynd 1 beskriver invarianten, och sökningen ur posten 2026-11-08 är redovisad med `fil:rad` |
| **M22** | **Arkitektens beslut om fynd 2–6**, med en tabell "exakt vad G2-rättningen ändrar" | arkitekt | Varje fynd 2–6 har ett beslut och en rad i tabellen, och varje rättad grind eller tal i `ARKITEKTUR.md` är också sökt i `PLAN.md` |
| **G2-rättning** | **Fynd 2–6. Ingår: enligt M22** (fylls i när M22 finns) | byggare | M22:s grindar redovisade, mätta mot färskt `vite preview`. Se eget avsnitt |
| **Efterkontroll av G2** | **Smal efterkontroll mot G2:s sex fynd** | granskare | Varje fynd 1–6 bekräftat som åtgärdat, eller ett nytt fynd i `LARDOMAR.md` |
| P17 | Dokumentation: README, GUIDE.md (tidigare paket H), **de gamla filnamnen och färgerna**, profilfilerna och `optimize:images` efter M10c och M10d, listan över ändrade filer | dokumentator | Guiden är **genomspelad**: att lägga till ett projekt enligt den ger grönt bygge |
| Commit och push | Omgången checkas in och pushas, tillsammans med `525afa1` | samordnare | `git status` är ren och pushen har gått igenom |

Därefter, utanför denna omgång: **paket L** från förra omgången.

### Ordning och beroenden

Byggt hittills: P1 → P2 → P3 → P4 → P4b → P5 → P6 → P7 → **G1** →
G1-kommentarerna → **G1-rättningen** → P8 → P9 → P10 (med P5 omgång 4 parallellt
med P9 och P10) → P9b ∥ P5 omgång 5 → P11 → P11b → P12 → P12b → P13 → P14 →
P14b → P14c → P15 med P15-fix → commit `525afa1` → **G2 (EJ GODKÄND)**.

**Pågår nu:** G2-kommentarerna (fynd 1, byggaren). M22 (fynd 2–6, arkitekten) är
nästa steg och får skrivas samtidigt, på villkoret i Risker.

**Ordningen därefter:**

1. **G2-rättning** (enligt M22)
2. **Efterkontroll av G2** (granskaren, smal, mot G2:s sex fynd)
3. **P17** (dokumentatorn: README, GUIDE och de gamla filnamnen och färgerna)
4. **Commit och push**

- **G2-rättning efter M22 och efter G2-kommentarerna.** G2-rättningens `Ingår:`
  finns först när M22 finns. Den startar inte förrän G2-kommentarerna är
  överlämnade, så att två byggare inte ändrar samma fil. Fynd 1 och fynd 5 rör
  båda `ContactForm.jsx`.
- **Efterkontrollen efter G2-rättningen.** Den prövar alla sex fynden, också fynd
  1, och kräver `GRANSKNING-PAGAR`.
- **P17 efter efterkontrollen**, och commit och push efter P17.
- **`ARKITEKTUR.md` ändras inte under G2-rättningen eller under efterkontrollen.**

**Körbart:** sidan är körbar efter varje paket. Vill Jelal se den före
efterkontrollen kan samordnaren visa den, mot ett färskt `vite preview`.

---

## Öppna frågor till Jelal

Dessa står kvar (läget 2026-11-08). Tills han svarat står texterna som de är
byggda, och inget paket ändrar dem. **Ett svar som kräver en ändring blir ett eget
paket före P17.**

1. **Sidbeskrivningen (meta description).** Ett förslag finns. Godkänner han det,
   eller vill han ha en annan text?
2. **Fraserna med streck:** ska de strykas helt eller skrivas om? Det gäller "webb-
   och mobilappar", "en webb- och mobilapp", "Något gick fel – försök igen" och
   titelns tankstreck.
3. **Nyckeltalet "1 PROJEKT":** ska det stå kvar så länge det bara finns ett
   projekt?

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
Den är borttagen i G1-kommentarerna, och R6 lade meddelandets prövning i
G1-rättningen.

---

## P5 — Hero (BYGGT, tre omgångar)

**Agent:** byggare. **Förutsättning:** P2, beslut 10.

**Mål:** heron i den nya formen.

**Ingår:** eyebrow "PORTFOLIO", h1 med uppdragets grad, letter-spacing och
radhöjd på dator och mobil, och ingress i `--ink-muted` med maxbredd 560 px.
Orange glöd från höger kant, porträtt till höger på dator. Heros fyra markeringar
genomförs enligt beslut 10 och tas bort i samma ändring.

**Glöden, den runda bilden och bildspåret ersattes i P5 omgång 4 (M10c).** Detta
avsnitt beskriver de tre första omgångarna och är historik för just de delarna.

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

## P5 omgång 4 — heros svartvita porträtt som profilbild och bakgrund (BYGGD, LÄMNAD TILLBAKA)

**Agent:** byggare. **Förutsättning:** Jelals besked 2026-11-07 och M10c i
`ARKITEKTUR.md` (båda uppfyllda). Kördes parallellt med P9 och P10.

**Utfall 2026-11-07: byggd, men lämnad tillbaka till arkitekten.** Två rader i
M10c:s mätserie höll inte:

- **Rad 7, kontrasten:** föll under 900 px.
- **Rad 9:** förutsade fel `loading`-värde.

Arkitekten avgjorde båda i **M10d**, tillsammans med Jelals besked om mobilläget,
och de genomfördes i **P5 omgång 5**.

**Jelals besked, bindande:** *"Lägg in bilden i hero-sektionen, det är en bild på
mig men den ska föreställa en profilbild samt täcka bakgrunden, gör bilden
svartvit."*

**Ingick** — M10c:s tabell "P5 omgång 4 — exakt vad som ändras", en punkt per fil:

1. **`src/components/Hero.module.css`:** enligt "`Hero.module.css`, tecken för
   tecken" i M10c.
2. **`src/components/Hero.jsx`:** bilden, `HERO_IMAGE_SIZES`, `heroImageSrc` och
   importen.
3. **`src/data/profile.js`:** `HERO_IMAGE_WIDTHS`.
4. **`src/styles/tokens.css`:** `--overlay-grey` togs bort.
5. **`index.html`:** preloaden, och **`<noscript>`-kommentaren** omskriven enligt
   M10c. Detta åtgärdade efterkontrollens fynd `index.html:34-35`.
6. **`scripts/optimize-images.mjs`:** profildelen ersatt av heros del.
7. **`public/assets/hero/`:** ny katalog, de tre genererade filerna.
8. **`public/assets/profile/`:** borttagen.
9. **`assets-source/hero-portrait.jpg`:** läggs till i git (otrackad tills
   incheckningen).
10. **`assets-source/profile.jpg`:** borttagen (finns i git-historiken).

**Ingick INTE:** M10c:s "Rörs inte", `README.md` och `GUIDE.md` (P17),
`ARKITEKTUR.md` och `PLAN.md`, och att ändra färger, texter, layout eller en
grind för att klara kontrasten.

---

## P5 omgång 5 — hero enligt M10d (BYGGD)

**Agent:** byggare. **Förutsättning:** M10d i `ARKITEKTUR.md` (uppfyllt). Kördes
parallellt med P9b.

**Bakgrund:**
- P5 omgång 4 lämnades tillbaka: kontrasten på M10c:s rad 7 föll under 900 px,
  och rad 9 förutsade fel `loading`-värde.
- **Jelals beslut 8, bindande:** på mobil ligger bilden **överst** och texten
  **under**. Han accepterar att man på små telefoner kan behöva scrolla för att nå
  knapparna.

**Utfall:** **byggd** enligt M10d. Innehållet och grindarna står i M10d i
`ARKITEKTUR.md`. Jag har inte fört in dem här i efterhand. G2 prövar M10d mot
koden (P16).

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

## G1 — Granskningspunkt 1 (efter projektkortet) — GENOMFÖRD, EJ GODKÄND, FYNDEN ÅTGÄRDADE

**Agent:** granskare. Samordnaren visar sidan för Jelal.

**Utfall:** EJ GODKÄND, sju fynd, nedskrivna i `LARDOMAR.md` (posterna daterade
2026-11-07). Fynd 1–2 rättades i **G1-kommentarerna**, fynd 3–7 i
**G1-rättningen** enligt arkitektens R1–R6. **G1-rättningen godkändes av
efterkontrollen 2026-11-07, så fynd 1–7 är åtgärdade.**

**Ingår:** `GRANSKNING-PAGAR` skapas före start och raderas efter rapporten.
Ändringslistan med datum tas vid start och slut. Hård granskning av P1–P7 mot
`ARKITEKTUR.md`, inklusive kontrollpunkterna ur förra omgångens G för filer som
inte skrivits om (se statusavsnittet). Varje "tecken för tecken" prövas om mot
filen. Varje `EJ I ARKITEKTUR` läses mot dokumentet.

**Godkänt när:** fynden står i `LARDOMAR.md`, och varje fynd är åtgärdat eller
uppskjutet av Jelal. **Fynden räknas som åtgärdade först när G1-rättningen är
godkänd** (uppfyllt 2026-11-07). Jelal har sett nav, hero och kortet, och har
fått frågan om Awles beskrivning.

---

## G1-kommentarerna — fynd 1–2 (KLART)

**Agent:** byggare. **Förutsättning:** G1:s rapport.

**Ingick:** fynd 1–2 ur G1. De falska kommentarerna omskrivna till invarianter,
och den kvarglömda markeringen `profile-export-saknas` i `validate-data.mjs`
borttagen.

---

## G1-rättningen — fynd 3–7 enligt R1–R6 (KLART, GODKÄND 2026-11-07)

**Agent:** byggare, därefter granskare för en smal efterkontroll.
**Beslut:** avsnittet "Besluten efter G1 (2026-11-07)" i `ARKITEKTUR.md`, R1–R6,
och M5h.

**Utfall:** **GODKÄND av granskarens efterkontroll 2026-11-07.** Efterkontrollens
två nya kommentarsfel åtgärdades i P5 omgång 4 (`index.html:34-35`) och P13
(`Contact.module.css:15-17`).

**Ingick** — arkitektens tabell "Exakt vad G1-rättningen ändrar": tio filer
(`ProjectCard.module.css`, `projectRules.js`, `ProjectCard.jsx`, `sections.js`,
`Header.jsx`, `main.jsx`, `index.html`, `validate-data.mjs`,
`validate-tokens.mjs`, `tokens.css`), med mätpunkterna R1–R6 redovisade.

---

## P8 — Filterpanel del 1: segmentkontrollen och live-raden (BYGGT)

**Agent:** byggare. **Förutsättning:** G1-rättningen godkänd, beslut 11.

**Läge:** **Byggt.** De tre öppna frågorna avgjordes i **M11b** rad 1–3 och
genomfördes i P9b.

**Ingår:** panelen, segmentkontrollen med antal räknade ur data och tillgänglig
grupproll, och live-raden "VISAR X AV Y PROJEKT".

---

## P9 — Filterpanel del 2: teknik-chips och sökfältet (BYGGT)

**Agent:** byggare. **Förutsättning:** P8, beslut 9 och 11.

**Läge:** **Byggt.** De öppna markeringarna avgjordes i **M11b** och genomfördes
i P9b. `--radius-chip` deklarerades här (R5).

---

## P10 — Animationer (BYGGT)

**Agent:** byggare. **Förutsättning:** P9, beslut 12.

**Läge:** **Byggt.** Fem fynd avgjordes i **M12b** och genomfördes i P9b.
`--duration-reveal`, `--reveal-index` och `--reveal-stagger` deklarerades här, och
`index` lades till i `ProjectCard` (R1).

---

## P9b — M11b + M12b: filtrets markeringar och P10:s fem fynd (BYGGT)

**Agent:** byggare. **Förutsättning:** P10 byggt, M11b och M12b. Kördes
parallellt med P5 omgång 5.

**Ingick** — tabellen "P9b — exakt vad som ändras (M11b + M12b, ett paket)" under
M11b i `ARKITEKTUR.md`: `ProjectFilter.module.css`, `ProjectFilter.jsx`,
`Projects.module.css`, `Projects.jsx`, `projectRules.js`, `global.css`,
`ProjectCard.jsx`, `Header.jsx`, `Reveal.jsx` och `main.jsx`.

**Utfall:** byggt, med M11b:s sju grindar redovisade.

---

## P11 och P11b — Sektionsetiketter och kompetenser (BYGGDA)

**Agent:** byggare. **Förutsättning:** P9b och P5 omgång 5, beslut 13 och 15.

**P11 ingick:** numrerade etiketter i formatet "01 / 04 · PROJEKT", härledda ur
`sections.js` (`src/lib/sectionLabel.js`), och kompetensgrupperna med chips i
filterchipsens stil (`Chip`).

**P11b ingick:** enligt **M15b**: mono-vikt och etikettavstånd.

---

## P12 och P12b — Nyckeltal (BYGGDA)

**Agent:** byggare. **Förutsättning:** P11, beslut 14 (M14).

**P12 ingick:** raden med siffror och mono-etiketter, där varje tal kommer ur data
(`src/lib/keyFigures.js`, `KeyFigures`), och `--text-figure` (R5). "År i
branschen" utgår tills Jelal ger det.

**P12b ingick:** enligt **M14b**: ett gemensamt kompetensurval i
`src/lib/skillRules.js`, och tal som är 0 döljs.

**Öppen fråga till Jelal:** ska "1 PROJEKT" stå kvar så länge det bara finns ett
projekt? Står kvar, se Öppna frågor till Jelal.

---

## P13 — Kontakt (BYGGT)

**Agent:** byggare. **Förutsättning:** P12, beslut 16.

**Ingick:** två kolumner med kontaktuppgifter ur `contact.js` till vänster och
formuläret i en `--surface`-panel till höger, en kolumn på mobil, och
mättabellen i `Contact.module.css` omskriven till invarianten (efterkontrollens
fynd).

---

## P14 — Footer (BYGGT, med avvikelse under mätningen)

**Agent:** byggare. **Förutsättning:** P13, beslut 16.

**Ingick:** avdelare överst, logga, tagline (`role` ur `profile.js`),
länkkolumner och copyright-rad. Länkar renderas bara när adressen finns.

**Avvikelse:** byggaren hängde sig under mätningen, efter att koden var skriven.
Samordnaren stoppade processerna och kontrollerade att sidan renderas. Dev-servern
på 5173 hade serverat en inaktuell modul (vit sida) och startades om. **Mätningar
görs från och med nu mot ett färskt `vite preview`, aldrig mot dev-servern.**

Det som återstod efter P14 (markeringarna, footerns rubrik och e-posttext,
`rel`-mönstret, kommentarer med uppmätta tal, `profile.js`-kommentaren) är avgjort
i **M19** och genomfördes i **P14b**.

---

## P14b — sista öppna punkterna före G2, enligt M19 (BYGGT OCH MÄTT)

**Agent:** byggare. **Förutsättning:** P14 överlämnat (uppfyllt), M19 i
`ARKITEKTUR.md` (uppfyllt), och ingen `GRANSKNING-PAGAR` i projektroten.
**Blockerade:** P15, och därmed G2.

**Utfall 2026-11-08:** byggt och mätt, incheckat i `525afa1`. G2 fann att grind 3
nedan var fel skriven (G2-fynd 3, ett återfall). Den gamla lydelsen står kvar på
sin plats, märkt RÄTTAT.

**Mål:** att inga `EJ I ARKITEKTUR`- eller `OPEN-KEY`-markeringar finns kvar,
att footern inte har någon rubrik och visar e-postadressen i klartext, att varje
extern länk följer ett och samma mönster, och att de sju kommentarerna med
uppmätta tal beskriver invarianten.

**Ingår** — tabellen "Exakt vad P14b ändrar" under M19 i `ARKITEKTUR.md`, en punkt
per rad. Markup, klassnamn och kommentarstexter skrivs **tecken för tecken som i
M19**, och byggaren svarar med `fil:rad` per rad. **Inga andra filer.**

1. **`src/components/Footer.jsx`** (punkt 1): `typeStyles` importeras ur
   `../styles/type.module.css`. Markeringen och kolumnrubriken ersätts av
   etiketten som ett `p` med typklassen först och `.columnLabel`, och kommentaren
   som hänvisar till M19 punkt 1.
2. **`src/components/Footer.jsx`** (punkt 2): `emailLabel` och kommentaren ovanför
   tas bort. E-postlänkens text blir adressen ur `contact.js`. `href` oförändrad.
3. **`src/components/Footer.jsx`** (punkt 3): den externa länken får `rel`-mönstret
   och den dolda texten "(öppnas i ny flik)".
4. **`src/components/Contact.jsx`** (punkt 3): samma ändring på `:71`.
5. **`src/components/Footer.module.css`** (punkt 1): `.columnHeading` byter namn
   till `.columnLabel` och behåller bara marginalen.
6. **`src/components/Footer.module.css`** (punkt 6): de två markeringarna på
   `:23-24` och `:67-68` ersätts med hänvisningen till M19 punkt 6.
7. **`src/components/About.module.css`** (punkt 4): `:26-27`, markeringen ersätts
   med hänvisningen. Invarianterna under står kvar.
8. **`src/components/ContactForm.module.css`** (punkt 5): `:37-38`, markeringen
   ersätts med hänvisningen. Raderna 34-35 står kvar.
9. **`src/components/Projects.module.css`** (punkt 8): `:5`, frågan ersätts med
   hänvisningen. Raderna 6-7 står kvar.
10. **`src/styles/global.css`** (punkt 9, 10, 12): `:21` och `:247-248` enligt
    tabellen, och `:47-49` omskriven enligt punkt 12.
11. **`src/components/Header.jsx`** (punkt 12): de sex raderna i punkt 12:s tabell.
12. **`scripts/validate-data.mjs`** (punkt 7): `:70`, `:556`, `:998`, första raden
    i markeringen ersätts med hänvisningen. **Inget meddelande ändras.**
13. **`src/data/profile.js`** (punkt 13): de två rättelserna i kommentaren.

**Ingår INTE:**
- Någon fil utöver de tio ovan. Särskilt inte `ProjectCard.jsx` (följer redan
  mönstret), `about.js`, `tokens.css` (kontrastkvoterna står kvar) och
  `ContactForm.jsx` (knappens dämpade läge godtas som byggt, punkt 11).
- Att skriva om ett uppmätt tal som M19 punkt 12 inte räknar upp. Hittas ett, lämnas
  det tillbaka till arkitekten.
- Texterna i Jelals två öppna frågor (fraserna som hade streck, "1 PROJEKT"). De
  står kvar som de är tills Jelal svarat.
- `ARKITEKTUR.md` och `PLAN.md`.

**Genomförs i två steg** (projektets minne: breda uppdrag hänger sig, och P14:s
byggare hängde sig i mätfasen):

- **Steg 1, ändringarna:** de tretton punkterna ovan, och grind 1, 2, 3, 8, 9 och
  10. Inga servrar. Överlämnas när de är gröna.
- **Steg 2, de renderade mätningarna:** grind 4–7 i en egen körning, mot ett
  färskt `vite preview` efter `npm run build`. Porten mäts med `netstat` före start
  och efter stopp, och servern stoppas via PID. Hänger sig steget stoppar
  samordnaren processerna och mäter porten innan något körs om.

**Godkänt när** — M19:s tio grindar, varje mått med vyport och
rullningslistvillkor:

1. `grep -rn "EJ I ARKITEKTUR\|OPEN-KEY" src scripts index.html` ger **0** träffar.
2. `grep -rn 'rel="noreferrer"' src` ger 0. Antalet rader med `target="_blank"` i
   `src` är lika med antalet med `rel="noopener noreferrer"`.
3. ~~`grep -rn "columnHeading\|emailLabel\|Mejl" src` ger 0.~~ **RÄTTAT
   2026-11-08, se M19 grind 3 i `ARKITEKTUR.md` (rättad i M20).** Den gamla
   lydelsen sökte "Mejl" i hela `src` och larmar av fel skäl på
   `src/components/ContactForm.jsx:42`. Gällande grind: `columnHeading` och
   `emailLabel` ger 0 i `src`, och "Mejl" söks **bara i
   `src/components/Footer.jsx`**, där den ska ge 0. G2-fynd 3, ett återfall
   (`LARDOMAR.md` 2026-11-08).
4. Renderad sida vid 360 × 640 och 1280 × 800: `h1`–`h6` har texten "Kontakt"
   **exakt en gång**, `footer` har inget `h1`–`h6`, footerns e-postlänk har
   adressen som text, och varje `a[target="_blank"]` i `footer` och `#contact` har
   `rel` lika med `noopener noreferrer` och en text som slutar på "(öppnas i ny
   flik)".
5. **Beslut 7:** `document.title`, `document.body.innerText` och texten i
   `noscript` innehåller inget bindestreck, tankstreck eller långt tankstreck, vid
   360 och 1280, med tomt formulär och efter klick på den dämpade knappen. Vid en
   träff skrivs elementet och texten ut.
6. Kontrast: footerns etikett, länkar, tagline och copyright mätta med
   `getComputedStyle` mot `--bg`, med renderad px-storlek, varje ≥ 4,5:1.
7. 360 px-golvet: syntessträngen i footerns e-postlänk och i etiketten,
   `documentElement.scrollWidth <= clientWidth`, med `innerWidth - clientWidth`
   utskrivet.
8. Grepen på de borttagna talen i M19 grind 8 ger 0, och den bredare sökningen i
   punkt 12 är redovisad träff för träff.
9. `grep -n "tankstreck\|paket P14" src/data/profile.js` ger 0.
10. `npm run validate:data`, `npm run build` och `npm run lint` gröna, och
    tokengrinden tyst.

Därtill: `git status` visar inga ändringar utöver de tio filerna och det som redan
låg i arbetsträdet före P14b. Överlämningen anger byggkommandot och tidsstämpeln
för senast ändrade fil i `src/`, och vilken server mätningarna gjordes mot.

---

## P14c — ny logga, enligt M20 (BYGGT OCH MÄTT)

**Agent:** byggare. **Beslut:** M20 i `ARKITEKTUR.md`.

**Utfall 2026-11-08:** byggt och mätt, incheckat i `525afa1`. Innehållet och
grindarna står i M20. Jag har inte fört in dem här i efterhand. G2-fynd 3 gäller
bland annat två tal i `ARKITEKTUR.md` från P14c:s mätning, och de avgörs i M22.

---

## P15 — Slutkontroll (KLAR, med P15-fix enligt M21)

**Agent:** byggare. **Förutsättning:** P3–P14, P9b, P5 omgång 5, P11b, P12b och
**P14b**. **P15 bygger ingenting.** Fallerar en rad lämnas fyndet tillbaka till det
paket som äger filen, som rättar, och P15 körs om.

**Utfall 2026-11-08:** rättningarna gjordes i **P15-fix** enligt **M21**. P14b,
P14c och P15-fix är byggda och mätta i steg 1–4, och incheckade i `525afa1`.

- **Lighthouse, median:** 97 på mobil och 100 på desktop. Accessibility, Best
  practices och SEO: 100.
- **P15 del B** är omkörd på det slutliga bygget, med **0 fel**.

G2-fynd 4 (M21 5c) och G2-fynd 6 (M21 punkt 4, `robots.txt`) gäller M21:s grindar,
och de avgörs i M22.

**Varje mätning görs mot ett färskt `vite preview` efter `npm run build`, aldrig
mot dev-servern** (avvikelsen under P14). Porten mäts med `netstat` före start och
efter stopp.

**Ingår:**
1. **360 px:** `documentElement.scrollWidth <= clientWidth` vid 360 × 640, 390 ×
   844, 600, 900, 1280 och 1600 px, med syntessträngen i varje textelement och
   med rullningslistvillkoret redovisat.
2. **Kontrast AA:** varje text-token mot varje bakgrund det faktiskt används på,
   som en tabell. I hero mot bildens pixlar, med M10d:s metod.
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

## P16 — Granskningspunkt 2 (G2) och LEVERANS (G2 GENOMFÖRD, EJ GODKÄND)

**Agent:** granskare, därefter projektledare. **Förutsättning:** P15.

**Utfall 2026-11-08:** **EJ GODKÄND, sex fynd**, nedskrivna i `LARDOMAR.md`
(posterna daterade 2026-11-08). Fynd 1 rättas i **G2-kommentarerna**, fynd 2–6 i
**G2-rättning** enligt **M22**, och alla sex prövas i **efterkontrollen av G2**.
Se listan under Status.

**Ingick:** `GRANSKNING-PAGAR` och frysningen som i G1. Hård granskning av hela
omgången: varje beslut i P1 punkt för punkt mot koden med `fil:rad`, inklusive
M10d, M11b, M12b, M14b, M15b och M19, de upphävda strängarna mot `src/`,
`scripts/`, **`index.html`** och `GUIDE.md`, och att inga `EJ I ARKITEKTUR` finns
kvar. Därtill:

- **M19:s "inte kontrollerat":** arkitekten läste `global.css`, `tokens.css` och
  `profile.js` men inte diffen från P14. G2 jämför mot `git diff` vilka rader P14
  ändrade i de tre filerna.
- **Jelals beslut 7 och 8:** att de är genomförda på den renderade sidan.

**Frågor till Jelal vid leverans:** de som står kvar 2026-11-08 är samlade under
**Öppna frågor till Jelal** ovan: sidbeskrivningen, fraserna med streck och
"1 PROJEKT".

Frågan om ansiktet på smal skärm är **struken**. Jelal beslutade 2026-11-07
(beslut 8): bilden överst och texten under på mobil, och scroll till knapparna
accepteras på små telefoner.

**Godkänt när:** fynden står i `LARDOMAR.md` (uppfyllt) och är åtgärdade eller
uppskjutna av Jelal, Jelal har sett jämförelsen, och varje öppen fråga har ett
svar. Fynden räknas som åtgärdade först när efterkontrollen av G2 är godkänd. Ett
svar som kräver en ändring blir ett eget paket före P17.

---

## G2-kommentarerna — fynd 1 (PÅGÅR)

**Agent:** byggare. **Förutsättning:** G2:s rapport (uppfyllt).

**Ingår:** G2-fynd 1, de sex falska kommentarerna i posten 2026-11-08
("Kodkommentarer: sex kommentarer påstår ett tillstånd som moderniseringen
ändrade") omskrivna till invarianter, med regeln i samma post.

**Godkänt när:** varje kommentar i fyndet beskriver invarianten, sökningen ur
postens "Regel framåt" är körd mot de ändrade filerna och redovisad med `fil:rad`,
och `npm run validate:data`, `npm run build` och `npm run lint` är gröna.

---

## G2-rättning — fynd 2–6, enligt M22

**Agent:** byggare. **Förutsättning:** M22 i `ARKITEKTUR.md`, G2-kommentarerna
överlämnade, och ingen `GRANSKNING-PAGAR` i projektroten. **Blockerar:**
efterkontrollen av G2.

**Ingår:** enligt M22. Fylls i när M22 finns, en punkt per rad i arkitektens
tabell, på samma sätt som P14b:s `Ingår:` följer M19.

**Godkänt när:** fylls i när M22 finns. Därtill, oberoende av M22:

- Varje grind eller tal som M22 rättar är sökt i både `ARKITEKTUR.md` och
  `PLAN.md`, och varje träff är rättad eller märkt RÄTTAT (posten 2026-11-08).
- Renderade mätningar görs mot ett färskt `vite preview` efter `npm run build`,
  med `netstat` före start och efter stopp.
- `npm run validate:data`, `npm run build` och `npm run lint` är gröna.

---

## Efterkontroll av G2

**Agent:** granskare. **Förutsättning:** G2-rättning överlämnad.

**Ingår:** en **smal** efterkontroll mot G2:s sex fynd, och bara mot dem.
`GRANSKNING-PAGAR` skapas före start och raderas när rapporten är levererad, och
ändringslistan med datum tas vid start och slut.

**Godkänt när:** varje fynd 1–6 är bekräftat som åtgärdat med `fil:rad` eller med
en mätning. Ett nytt fel som efterkontrollen hittar skrivs in i `LARDOMAR.md`.

---

## P17 — Dokumentation

**Agent:** dokumentator. **Förutsättning:** efterkontrollen av G2 godkänd.
Ersätter förra omgångens paket H.

**Ingår:**
- README, och GUIDE.md omskriven: projektdatan (nya fält, kategori, status, bild
  i 4:3), kompetenserna (förra H:s innehåll) och filtret. Listan över ändrade
  filer.
- **De gamla filnamnen och färgerna.** README och GUIDE får inte nämna en fil som
  inte längre finns eller en färg eller ett tokennamn som har upphävts.
- **Profilfilerna och `optimize:images` efter M10c och M10d.** `README.md` och
  `GUIDE.md` nämner fortfarande profilfilerna och `optimize:images`. Efter P5
  omgång 4 finns inte `public/assets/profile/` och `assets-source/profile.jpg`.
  Källan är `assets-source/hero-portrait.jpg`, och `optimize:images` genererar
  heros bild och logoikonerna. Varje sådant ställe skrivs om så att det stämmer
  med `ARKITEKTUR.md`, M10c och M10d.

**Godkänt när:** guiden är **genomspelad**. Att lägga till ett projekt, ändra
status och lägga till en kompetens enligt den ger grönt `npm run build` efter
varje steg, utan att en komponentfil öppnas. Inget antal och inget tokennamn som
har upphävts står kvar i guiden. `grep -n "profile\|optimize:images" README.md
GUIDE.md` är redovisad, och varje träff stämmer med M10c och M10d.

---

## Commit och push

**Agent:** samordnare. **Förutsättning:** P17 klart.

**Ingår:** incheckning av omgångens filer och push till `main`. Commit `525afa1`
(P14b, P14c och P15-fix) finns redan lokalt och är inte pushad. Den pushas i samma
steg. Varje paket har checkat in bara sina egna filer, så detta steg tar det som
återstår efter P17. Den otrackade `assets-source/hero-portrait.jpg`,
`public/assets/hero/` och de nya filerna under `src/` ingår, om de inte redan är
incheckade.

**Godkänt när:** `git status` är ren, ingen fil utan ägande paket är med (jämfört
mot fillistan från P15 punkt 6), och pushen har gått igenom.

---

## Risker (denna omgång)

**Nya efter G2:**

- **M22 skrivs medan G2-kommentarerna byggs, och ändrar något byggaren bygger
  mot.** Fynd 1 hänvisar till M21 punkt 1, och fynd 4 och 6 gäller också M21.
  **Märks tidigt** genom att arkitekten i M22 skriver ut vilka avsnitt M22 ändrar,
  och genom att M22 inte rör M21 punkt 1 förrän G2-kommentarerna är överlämnade.
- **Två byggare ändrar samma fil.** Fynd 1 och fynd 5 rör båda `ContactForm.jsx`.
  **Märks tidigt** genom att G2-rättning inte startar förrän G2-kommentarerna är
  överlämnade, och genom `git status` före varje överlämning.
- **Efterkontrollen växer till en ny G2.** **Märks tidigt** genom att den bara
  prövar de sex fynden. Ett nytt fel blir en post i `LARDOMAR.md`, inte en ny
  granskningsrunda.
- **En rättad grind står kvar orättad i ett annat dokument igen** (G2-fynd 3,
  återfall). **Märks tidigt** genom att G2-rättningens `Godkänt när` kräver
  sökningen i både `ARKITEKTUR.md` och `PLAN.md`.
- **`525afa1` ligger kvar lokalt utan push.** Försvinner arbetsträdet finns
  omgången bara på en maskin. **Märks tidigt** genom att commit och push står som
  eget steg, och genom `git status` mot `origin/main`.
- **Jelals svar kräver en ändring efter efterkontrollen.** Sidbeskrivningen ändrar
  troligen `index.html`. **Märks tidigt** genom att ett svar som kräver kod blir
  ett eget paket före P17, inte en ändring i dokumentationspaketet.

**Efter P14 och M19:**

- **En mätning görs mot dev-servern och mäter en inaktuell modul.** Det hände under
  P14 (vit sida på 5173). Ett grönt eller rött mätvärde säger då ingenting om
  koden. **Märks tidigt** genom att varje överlämning i P14b och P15 anger
  byggkommandot, tidsstämpeln för senast ändrade fil i `src/` och att servern var
  ett färskt `vite preview`.
- **Byggaren hänger sig igen under mätningen.** **Märks tidigt** genom att P14b
  körs i två steg: ändringarna och sökgrindarna överlämnas först, och mätningarna
  körs för sig. Samordnaren mäter porten och stoppar processerna via PID om steget
  står still.
- **Kvarlämnade processer från den hängda körningen håller en port.** **Märks
  tidigt** genom `netstat` **före** start i P14b steg 2 och i P15.
- **Grind 5 (beslut 7) fäller på en text utanför P14b:s filer**, till exempel i en
  datafil. Den frestande utvägen är att rätta den "medan byggaren ändå är där".
  **Märks tidigt** genom att grinden skriver ut elementet och texten, och fyndet
  lämnas tillbaka till arkitekten. Fraserna i Jelals öppna fråga rörs inte före
  hans svar.
- **Den bredare sökningen i M19 punkt 12 hittar fler uppmätta tal**, och byggaren
  skriver om dem på eget beslut. **Märks tidigt** genom att överlämningen redovisar
  sökningen träff för träff, och varje nytt tal lämnas tillbaka.
- **P14b växer utöver sina tio filer.** **Märks tidigt** genom `git status` före
  överlämning.
- **Jelals svar i P16 kräver en ändring efter G2.** **Märks tidigt** genom att
  frågorna ställs i P16 och ett svar som kräver kod blir ett eget paket före P17,
  inte en ändring i dokumentationspaketet.

**Efter P10, M12b och Jelals besked:**

- ~~**M10d skrivs medan P9b byggs.**~~ **Passerat, båda är byggda.**
- ~~**M10d rör en av P9b:s tio filer.**~~ **Passerat.**
- ~~**P5 omgång 5 faller igen på kontrasten eller på en förutsägelse.**~~
  **Passerat, omgång 5 är byggd.** Kontrasten i hero prövas igen i P15 punkt 2.
- ~~**Knappgrinden lossas av byggaren.**~~ **Passerat.**
- ~~**`changeFilter` i sju steg blir fel i ett kantfall.**~~ **Passerat, P9b är
  byggt.** P15 och G2 prövar filtret igen.
- ~~**P9b växer utöver sina tio filer.**~~ **Passerat.**
- **P8b dyker upp igen i en överlämning eller en hänvisning.** Paketet finns inte.

**Efter efterkontrollen och M10c:**

- **Ett rött bygge från grannpaketet läses som eget fel.** Den frestande utvägen är
  att "laga" grannens fil. **Märks tidigt** genom att varje rött bygge redovisas
  med fil och rad, och genom att varje paket bara checkar in sina egna filer.
- **Kommentaren vid `<noscript>` eller mättabellen i Contact kommer tillbaka.**
  **Märks tidigt** genom P14b grind 1 och G2:s sökning i `index.html`.

**Efter G1:**

- **Ett token deklareras före konsumenten, eller glöms.** M5h eller M5g fäller.
  **Märks tidigt** genom tokengrinden i P14b grind 10.
- **Reveal tappar kortets id eller scroll-marginal.** **Märks tidigt** genom P15
  punkt 7 och G2.

**Sedan tidigare:**

- **Gamla tokennamn och "en enda vikt" lever kvar i kommentarer och i
  `ARKITEKTUR.md`.** Registrerat återfall tre gånger. **Märks tidigt** genom G2:s
  sökning på de upphävda strängarna.
- **`--ink-subtle` faller på AA på `--surface-2` eller i hero.** **Märks tidigt**
  genom P15 punkt 2. Faller det går det till arkitekten, och byggaren justerar inte
  värdet själv.
- **Reveal gömmer innehåll.** **Märks tidigt** genom P15 och G2.
- **Påhittat innehåll om Jelal.** Awles beskrivning, taglinen och "år i branschen"
  lockar till att fylla i. **Märks tidigt** genom frågorna i P16. Hero-bilden är
  Jelals egen (`assets-source/hero-portrait.jpg`), och ingen agent byter ut den.
- **Platshållarprojekt smyger in i datan.** Beslut 2 förbjuder det. **Märks
  tidigt** genom att G2 kontrollerar att `projects.js` har exakt en post.
- **Navens höjd och `scroll-margin-top` glider isär.** **Märks tidigt** genom P15
  punkt 7.
- **Lighthouse-siffran mäts på ett gammalt bygge eller mot en levande dev-server.**
  **Märks tidigt** genom P15 punkt 4: färskt bygge, tidsstämpel, `netstat`, och
  `vite preview` i stället för dev-servern.
- **Arbetsträdet ändras under G2.** **Märks tidigt** genom `GRANSKNING-PAGAR` och
  ändringslistan med datum.
- **Förra omgångens öppna paket (L, H) faller mellan stolarna.** **Märks tidigt**
  genom statusavsnittet ovan: L efter P16, H i P17.

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
