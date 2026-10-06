# Uppdrag: Portfolio för Jelal Qaiumi

## Mål
En personlig portfolio-webbplats för Jelal Qaiumi (systemutvecklare).
Förebild i upplägg/känsla: https://jansz.se/ — one-pager med ankarnavigering,
sektioner som scrollar, stor hero, generösa marginaler, lugn och professionell ton.

## Grafisk profil (given av loggan)
- Loggan: `public/assets/logo.png` — orange "JQ"-monogram på svart botten,
  texten "JelalQaiumi" i vitt under, med ett kort orange streck.
- Accentfärg: orange (ca #F57C20 / #FF7A18 — plocka exakt ur loggan).
- Bas: mörk/svart botten och ljusgrå text, alternativt ljus bas — arkitekten
  bestämmer, men orange ska vara ENDA accentfärgen.

## Profilbild
- `public/assets/profile.jpg` — porträtt, 4688x5051 px, Jelal i svart kavaj mot
  ljusgrå vägg. Ansiktet sitter i övre tredjedelen.
- Ska visas med ett GRÅTT lager/overlay över bilden (gråskala + grå tonplatta),
  i samma anda som förebildssajten. Bilden är 3,7 MB och MÅSTE optimeras/skalas
  ner innan den används skarpt.

## Sektioner som ska finnas
1. Header/nav — logga uppe till vänster, ankarlänkar till sektionerna.
2. Hero — namn, titel, kort intro, profilbilden med grått lager.
3. Skills — HÖGT UPP på sidan (direkt efter hero). Se nedan.
4. Projekt/arbete — tomt utrymme förberett för projekt Jelal skapat.
   Ska vara enkelt att lägga till projekt senare (datadrivet).
5. Kontakt + footer.

## Skills — viktigaste kravet
Alla skills i `skills.txt` ska synas på sidan.

Varje skill har ett tillstånd:
- `ifylld` (behärskar) → ORANGE fylld pill, tydligt synlig.
- `ej ifylld` (ännu ej markerad) → dämpad/outline-pill.

Jelal ska själv kunna fylla i dem SENARE genom att ändra på ETT ställe
(en datafil), utan att röra komponentkod. Gör detta så enkelt som möjligt.
Just nu: alla är ej ifyllda tills Jelal säger annat.

Skills är många (~100 st) — gruppera dem i rimliga kategorier så listan blir
läsbar, och se till att den inte dominerar hela sidan (t.ex. kolumner/kompakta
pills).

## Teknik (beslutad)
React + Vite. Motiv: Jelal har React/Vite/Hooks i sin kompetenslista, så
portfolion demonstrerar det den påstår. Ren CSS (inget UI-ramverk).

## Krav
- Responsiv (mobil först), fungerar ner till 360 px bredd.
- Inga externa beroenden utöver React/Vite om det inte är motiverat.
- Svenska i allt gränssnittstext. Kod/filnamn/variabler på engelska.

## Beslut taget av Jelal 2026-10-02
- **Tema: mörk bas, orange accent.** Svart/mörkgrå botten rakt igenom hela
  sidan precis som loggan, ljus text. Orange är enda accentfärgen.
- Ifylld skill = ORANGE fylld pill. Ej ifylld = dämpad outline-pill mot mörk
  botten (ska synas men tydligt underordnad de ifyllda).
- Loggan ligger direkt mot den mörka bottnen utan platta eller ram.

## Miljö (verifierad)
- Node v24.19.0, npm 11.17.0.
- Inget ImageMagick på maskinen. Bildoptimeringen görs med `sharp` som
  devDependency och ett engångsskript, inte för hand.

## Kontaktuppgifter (given av Jelal 2026-10-02) — gäller paket 6
- E-post: qaiumi@hotmail.com
- GitHub: ÄNNU EJ GIVEN. Lämna platshållare, gissa inte en URL.
- LinkedIn: ÄNNU EJ GIVEN. Lämna platshållare, gissa inte en URL.

Bygg kontaktsektionen så att e-posten syns och fungerar, och så att GitHub-
och LinkedIn-länkarna kan läggas till senare genom att fylla i datafilen —
inte genom att ändra komponentkod. Rendera inte tomma länkar.

Beslut: vanlig `mailto:`-länk i klartext räcker. Inget kontaktformulär,
ingen obfuskering. Jelal är införstådd med skräppost-risken.

## Loggan i headern — beslut av Jelal 2026-10-02
Valt: **beskär till enbart JQ-monogrammet och sätt "Jelal Qaiumi" som riktig
HTML-text bredvid.** Motiv: skarpt i alla storlekar, läsbart för skärmläsare
och sökmotorer, och typsnittet kan bytas senare utan att röra bildfilen.

### Uppmätt beskärningsruta (pixelmätt, gissa inte)
logo.png är 1254x1254. Oranga pixlar bildar två skilda block:
- Monogrammet JQ: x 323..914, y 338..779 (592 x 442 px)
- Det korta strecket:        y 915..920 — SKA INTE vara med
- Texten "JelalQaiumi" är vit, ligger mellan blocken — SKA INTE vara med

Kvadratisk beskärning centrerad på monogrammet med 40 px luft:
    left=283  top=223  width=672  height=672
Ryms inom bilden. Ger en kvadratisk JQ-ikon på svart botten.

Originalet public/assets/logo.png lämnas orört. Den beskurna varianten
genereras av samma sharp-skript som profilbilden i paket 2.

## Miljökontroll inför paket 2 (verifierad 2026-10-02)
- Plattform: win32 x64, Node 24.19.0.
- `sharp` senaste version: 0.35.5.
- Förbyggd binär `@img/sharp-win32-x64@0.35.5` finns i registret.
  Ingen kompilering krävs, ingen Visual Studio Build Tools behövs.
  `npm install sharp` ska gå igenom rent. Gör den inte det är det ett
  verkligt fel och inte en förväntad plattformsstrul — lämna tillbaka.

## Processbeslut av Jelal 2026-10-02 — gäller fram till Leverans 1
Den hårda granskningen flyttas till Leverans 1. Konkret:
- Paket 1: rättas färdigt enligt pågående rundor, sedan STOPP. Ingen tredje
  granskningsrunda.
- Paket 2A, 2B och 3: byggs med LÄTT kontroll. Byggaren verifierar själv
  (build, lint, serverrendering, mätningar) och rapporterar ärligt vad den
  INTE kunnat verifiera. Ingen full granskarrunda mellan paketen.
- Vid Leverans 1: dev-servern startas, Jelal tittar, OCH granskaren kör en
  stor granskning av paket 1-3 i ett svep.

Motiv: paket 1 är ett tomt skelett och drog två fulla granskningsrundor med
14 fynd innan Jelal sett någonting. Fynden var verkliga, men kostnaden stod
inte i proportion. LARDOMAR.md:s "Regel framåt" är fortsatt BINDANDE för alla
agenter — det är bara granskningsrundorna som flyttas, inte lärdomarna.

## Profilbildens beskärning — kontrollerad 2026-10-02
profile.jpg är 4688 x 5051 px. Arkitekturens beskärning
`extract({ left: 584, top: 0, width: 3520, height: 4400 })` är verifierad:
- EXIF-orientering SAKNAS HELT. `.rotate()` blir alltså en no-op och måtten
  byter inte plats. Behåll ändå .rotate() före .extract() som försvar — hade
  flaggan funnits (värde 6 eller 8) hade måtten svängt till 5051 x 4688 och
  rutan pekat på fel del av bilden, utan att något larmat.
- Höger kant 4104 <= 4688, nedre kant 4400 <= 5051. Ryms.
- Vågrätt centrerad: 584 px marginal på BÅDA sidor.
- Bildförhållande exakt 0,8 = 4:5.
- 651 px klipps bort nedtill. Ansiktet sitter i övre tredjedelen och berörs inte.

## RÄTTELSE 2026-10-02 — ikonens beskärning får INTE vara kvadratisk mot källan
Den tidigare angivna rutan `left=283 top=223 width=672 height=672` är FEL och
får inte användas. Orsak, pixelmätt:

    monogrammet JQ      : x 323..914, y 338..779   (592 x 442)
    ordbilden (vit)     : x 403..849, y 836..872   (2370 px)
    korta strecket      :             y 915..920
    den gamla rutan     : x 283..954, y 223..894

Ordbilden ligger 37 px INUTI den gamla rutan. Alfa-formeln (R-2)/250 ger vita
pixlar alfa ~1 och färgar dem #FC6F03, så ikonen hade fått en orange
utsmetning av ordet "JelalQaiumi" längst ner.

Felet går inte att lösa genom att krympa rutan: monogrammet är 592 brett men
442 högt, så varje KVADRATISK ruta som rymmer hela bredden måste nå ner till
y 854 och träffar ordbilden.

### Rätt metod — beskär tajt, gör kvadratisk med GENOMSKINLIG utfyllnad
1. `.extract({ left: 323, top: 338, width: 592, height: 442 })` — exakt
   monogrammets bbox. Ordbilden och strecket ligger utanför och kan inte
   komma med.
2. Alfa-steget på det uttaget: alfa = (R-2)/250 klamrat 0..1, RGB = #FC6F03.
3. `.extend()` till 672 x 672 med helt genomskinlig utfyllnad:
       top: 115, bottom: 115, left: 40, right: 40
       background: { r: 0, g: 0, b: 0, alpha: 0 }
   (672-592)/2 = 40 i sidled, (672-442)/2 = 115 i höjdled.

Resultatet blir visuellt identiskt med arkitektens avsikt — samma 672 x 672,
samma luft runt märket, samma centrering — men utfyllnaden består av
genomskinliga pixlar i stället för pixlar ur källbilden. Eftersom bottnen ändå
ska vara genomskinlig är skillnaden osynlig, förutom att ordbilden inte kan
smyga med.

Verifiering byggaren ska göra: inga pixlar med alfa > 0 får finnas nedanför
rad 557 i den färdiga 672-bilden (442 + 115 = 557, monogrammets underkant).

## SÖKVÄGSÄNDRING 2026-10-02 — originalbilderna flyttas ut ur public/
Tidigare avsnitt i denna fil anger `public/assets/logo.png` och
`public/assets/profile.jpg`. De sökvägarna är INAKTUELLA efter flytten.

Orsak: `public/` är Vites katalog för filer som kopieras rakt ut i leveransen.
Originalen publicerades därför trots att hela poängen med paket 2A var att
slippa dem. Uppmätt: `dist/` var 4,9 MB, varav 4,40 MB (90 %) var de två
originalen, som ingen kod refererar.

Nya sökvägar:
    assets-source/logo.png        (var public/assets/logo.png)
    assets-source/profile.jpg     (var public/assets/profile.jpg)

Originalen ska fortfarande BEVARAS och ALDRIG skrivas över — det är bara
publiceringen som upphör. Allt annat i denna fil gäller oförändrat; läs varje
tidigare `public/assets/logo.png` som `assets-source/logo.png` och varje
`public/assets/profile.jpg` som `assets-source/profile.jpg`.

De GENERERADE filerna ligger kvar i public/assets/ och ska publiceras:
    public/assets/profile/profile-{400,800,1200}.{webp,jpg}
    public/assets/logo-mark-{32,96,192}.png
    public/assets/logo-mark-tight-{96,192}.png

Gräns för leveransen, inskriven av arkitekten och kontrollerad i VARJE paket:
    dist/ <= 1 MB, enskild fil <= 300 kB, noll orefererade filer.

## BESLUT 2026-10-03 — skills-listan slås ihop och växer till ca 323
Jelal har lämnat en betydligt större kompetenslista, sparad som
`skills-full.txt` i projektroten (17 kategorier, 292 poster, 267 unika namn).

Valt: **slå ihop den nya listan med de befintliga 93.**
- De 267 från den nya listan = `filled: true` (ORANGE). Jelal har uttryckligen
  sagt "dessa kompetenser har jag och har jobbat med".
- De 56 från den gamla listan som INTE finns i den nya = `filled: false`
  (dämpade). De står kvar, de är bara inte markerade.
- Summa ca 323 unika namn.

### Fakta som styr arbetet
- Av de gamla 93 finns 37 med i nya listan. 56 saknas, bland annat:
  Node.js, JSON, Swagger, Fetch API, OpenAPI, Middleware, Controllers,
  HTTP-statuskoder, CSS Grid, Flexbox, hela React Native-detaljblocket
  (FlatList, TextInput, Modal, Pressable, RefreshControl m.fl.) och större
  delen av AI-blocket.
- 25 namn står i FLERA av Jelals nya kategorier och måste få EN hemvist:
  Kodanalys (3), Refaktorisering (3), samt Exceptions, Systemutveckling,
  Blazor, Routing, State management, Dependency Injection, Clean Code,
  Designmönster, Underhållbar kod, Versionshantering, Pull Requests,
  Code Review, DevOps, CI/CD, DevSecOps, Säker systemarkitektur,
  Refresh Tokens, Identity, Scrum, Kanban, Teamarbete (2 vardera).
- Valideringen kräver unika namn, så dubbletterna MÅSTE lösas.
- Nära-dubbletter som inte är identiska strängar men betyder samma sak ska
  också bedömas, t.ex. "Pull Requests" (ny) mot "Pull requests" (gammal),
  "Kodgranskning / Code Review" mot "Kodgranskning" och "Code Review",
  "Testdriven utveckling (TDD)" mot "Testdriven utveckling".

### Konsekvens Jelal är införstådd med
Sektionen blir sidans tyngsta del. Uppskattad höjd ca 3000 px på desktop.
Det är accepterat — men layouten bör göra vad den kan för att hålla den
läsbar.

## Kontaktuppgifter kompletta 2026-10-06
    e-post    qaiumi@hotmail.com
    GitHub    https://github.com/Jelalqaiumi
    LinkedIn  https://www.linkedin.com/in/jelalqaiumi

GitHub-adressen är verifierad (HTTP 200).

LinkedIn-adressen är HÄRLEDD ur användarnamnet "Jelalqaiumi" som Jelal
uppgav, enligt LinkedIns format linkedin.com/in/<slug>. Den gick INTE att
verifiera: LinkedIn svarar HTTP 999 på automatiska anrop, vilket betyder
blockerat, inte saknat. Slutdelen i en LinkedIn-adress är inte alltid samma
som visningsnamnet.

Jelal ska klicka på länken när sektionen är byggd och bekräfta att den leder
rätt. Gör den inte det är det en rad i src/data/contact.js.

## Kontaktformulär — beslutat av Jelal 2026-10-06
Kontaktsektionen ska ha ett FORMULÄR där besökaren skriver ett meddelande som
mejlas till Jelal, utöver länkarna.

Tjänst: Web3Forms. Gratisplanen ger 250 meddelanden/månad, obegränsat antal
formulär, inget konto krävs.

    access key: 79f08fa8-8cdf-4841-8392-066feea2a389
    mottagare : qaiumi@hotmail.com

Nyckeln är AVSEDD att vara publik och ligger i klientkoden. Den är inte en
hemlighet i säkerhetsmening — den säger "skicka hit", inte "läs härifrån".
Men vem som helst som ser den kan skicka meddelanden till Jelals inkorg, så
skräppostskydd behövs.

VIKTIGT: domänbegränsning är en BETALFUNKTION och ska INTE aktiveras. Om den
någon gång aktiveras slutar formuläret fungera på localhost, alltså där vi
utvecklar. Den får i så fall slås på först efter att sidan ligger live.

Jelal har också sagt att länkarna till GitHub och LinkedIn ska finnas kvar —
formuläret ersätter dem inte.
