# Guide: så ändrar du innehållet på sidan

Den här guiden är för dig som äger sidan. Den visar arbetsgången för de
ändringar du gör oftast. Nästan allt innehåll ligger i filerna under
`src/data/`, och för de vanliga ändringarna behöver du inte öppna någon
komponent eller någon CSS.

**Varje datafil har sina regler i kommentaren högst upp i filen.** Där står
vilka fält som finns, vilka värden som är tillåtna och vad bygget kontrollerar.
Den här guiden skriver inte av de reglerna. Läs kommentaren i filen innan du
ändrar i den. Står guiden och filen någon gång i konflikt är det filen som
gäller.

## Regeln som gäller all text: inga streck

Ditt beslut från 2026-11-07: **ingen text som syns på sidan får innehålla
bindestreck eller tankstreck.** Det gäller allt en besökare kan läsa:
rubriker, projekttitlar och beskrivningar, tekniknamn, kompetenser, texten i
Om mig, knappar, formulärets etiketter och felmeddelanden, `<title>` och
sidbeskrivningen i `index.html`.

- **Skriv om meningen** i stället för att bara ta bort tecknet. Skriv till
  exempel "webbappar och mobilappar" i stället för att korta ihop orden med
  ett streck.
- **Undantag:** sådant som inte syns som text på sidan, alltså `slug`, `id`,
  filnamn, adresser och kommentarer i koden. Där får bindestreck stå, och i
  `slug` och `id` är det just bindestreck som skiljer orden åt.
- **Ingen kontroll fångar det här.** Bygget går igenom även om en text har ett
  streck, så du måste själv titta efter. Sök på `-` med Ctrl+F i texten du
  skrev.
- **Klistra inte in text från Word eller en chatt** utan att läsa den. Sådana
  program byter ofta ett bindestreck mot ett tankstreck utan att det syns.
  Skriv hellre texten direkt i filen.

## Köra sidan lokalt och bygga

Första gången, i projektmappen:

```sh
npm install
```

Sedan, varje gång du ska arbeta:

```sh
npm run dev
```

Terminalen visar en adress, normalt `http://localhost:5173`. Öppna den i
webbläsaren. När du sparar en fil syns ändringen direkt.

**`npm run dev` kontrollerar ingenting.** En trasig ändring kan se ut att
fungera där. Kör därför kontrollen när du är klar:

```sh
npm run validate:data
```

Den tar någon sekund och svarar antingen med en rad som börjar med
`Validering OK` eller med exakt vad som är fel.

När allt ser rätt ut bygger du sidan:

```sh
npm run build
```

Bygget kör samma kontroll och några till, och skapar den färdiga sidan i
`dist/`. Vill du se den byggda sidan precis som en besökare får den:

```sh
npm run preview
```

Stoppa servern med Ctrl+C i terminalen.

## 1. Lägga till ett projekt

**Fil:** `src/data/projects.js`

1. Öppna filen. Högst upp finns en mall mellan två streckade rader, märkt
   `KOPIERA HÄR`. Kopiera blocket.
2. Klistra in det i listan `projects` längre ner, efter det sista projektet.
   Varje projekt slutar med `},` så att nästa kan följa.
3. Fyll i fälten. Spara. Kortet syns på sidan direkt.

Fälten, kort om vad de är till för. Vilka värden som är tillåtna står i
kommentaren i filen.

| Fält | Vad det är |
|---|---|
| `slug` | Projektets interna namn med små bokstäver, till exempel `min-app`. Syns inte som text. Måste vara unikt. |
| `title` | Projektets namn, som det visas på kortet. |
| `category` | Vilken knapp i filtret projektet hör till. Ett av de värden som står i filen. |
| `status` | Märket uppe till höger på kortet. Ett av de värden som står i filen. |
| `description` | En eller två meningar om projektet. |
| `tech` | Teknikerna, som en lista inom hakparenteser. |
| `image` | Bildens namn, eller `null` om projektet saknar bild. Se nedan. |
| `liveUrl` | Adressen till projektet live, eller `null`. |
| `githubUrl` | Adressen till koden, eller `null`. |

**Länkarna.** Hela kortet är en länk som öppnas i en ny flik. Den går till
`liveUrl` om den finns, annars till `githubUrl`. Finns ingen av dem är kortet
ingen länk. Skriv `null` utan citattecken när en adress saknas, aldrig tom
text och aldrig `'#'`.

**Filtret sköter sig självt.** Antalet på knapparna räknas ur `category`, och
teknikknapparna byggs ur alla projekts `tech`. Skriv samma teknik på samma
sätt i alla projekt, annars blir det två knappar. Nyckeltalet för projekt i
Om mig räknas också automatiskt.

### Projektets bild

Bilden är en skärmdump, till exempel av projektets startsida.

1. Spara skärmdumpen som PNG i `assets-source/projects/`. Filnamnet blir
   bildens namn, till exempel `min-app.png`.
2. Kör:

   ```sh
   npm run optimize:projects
   ```

   Skriptet gör om varje PNG i mappen till färdiga bilder i
   `public/assets/projects/`. Bilden beskärs till formatet 4:3 från vänster
   kant, så det viktiga ska ligga uppe till vänster i skärmdumpen. Är
   skärmdumpen för liten stannar skriptet och säger det, och då har ingenting
   skrivits.
3. Skriv namnet utan `.png` i projektet: `image: 'min-app',`

Skriver du ett namn i `image` innan du har kört skriptet stannar bygget, för
då finns inga bilder att visa.

### Ändra status på ett projekt

Byt värdet i `status` mot ett annat av de tillåtna värdena. Spara.

### Ta bort ett projekt

1. Radera hela blocket, från `{` till och med `},`.
2. Radera projektets PNG i `assets-source/projects/` och dess bilder i
   `public/assets/projects/` (filerna som börjar med projektets bildnamn).
   Allt i `public/` följer med ut på sidan, även bilder som inget visar.

Blir listan tom visar sidan en kort rad i stället för en tom yta. Det är
avsiktligt.

### Länken i Om mig

Texten i Om mig kan innehålla en fras som blir en länk till ett projektkort.
Frasen och projektets `slug` står under `link` i `src/data/about.js`. Så länge
inget projekt har den `slug` är frasen vanlig text. Lägger du till projektet
med just den `slug` blir frasen en länk av sig själv.

## 2. Ändra kompetenser

**Fil:** `src/data/skills.js`

Kompetenserna står i grupper, en kompetens per rad. Hur du lägger till, tar
bort och flyttar står i kommentaren högst upp i filen. Kort:

- **Lägga till:** skriv en ny rad i rätt grupp, i samma form som raderna
  bredvid.
- **Ta bort:** radera raden.
- **Flytta:** flytta raden. Ordningen i filen är ordningen på sidan, och samma
  namn får bara stå en gång i hela filen.
- **Ny grupp:** kopiera ett helt gruppblock och ge det ett eget `id`.

Dela aldrig upp en rad på flera rader. Då hittar du den inte längre med
Ctrl+F. Nyckeltalet för kompetenser i Om mig räknas automatiskt.

## 3. Byta heroporträtt eller logga

Källbilderna ligger i `assets-source/`. Skripten läser dem men skriver aldrig
över dem, och de publiceras aldrig.

| Bild | Källfil |
|---|---|
| Heroporträttet | `assets-source/hero-portrait.jpg` |
| Loggan, och ikonen i webbläsarfliken | `assets-source/jq-logo-light.png` |

1. Ersätt filen i `assets-source/` med en ny fil med **samma namn**.
2. Kör:

   ```sh
   npm run optimize:images
   ```

   Skriptet gör heros svartvita bilder, loggan och ikonerna, och lägger dem i
   `public/assets/`.

Skriptet förväntar sig exakt samma mått som den nuvarande källbilden, och för
loggan även samma placering av rutan och texten i bilden. Har den nya bilden
andra mått stannar skriptet med en rad som börjar med `AVBRYTER`, och då har
ingenting ändrats. Det är inget du har gjort fel. Det betyder att bytet kräver
en ändring i skriptet och i bildens mått på sidan, och det är ett jobb för
utvecklaren.

Lägg aldrig en bild direkt i `public/assets/`. Allt där är genererat.

## 4. Ändra texten i Om mig

**Fil:** `src/data/about.js`

Texten är en lista med stycken. Varje post i `paragraphs` blir ett eget stycke
på sidan.

- **Ändra:** skriv om texten inom citattecknen.
- **Nytt stycke:** lägg till en ny post i listan.
- **Ta bort ett stycke:** radera posten. Minst ett stycke måste finnas kvar.

Ändrar du den fras som är länk (se "Länken i Om mig" ovan) måste frasen under
`link` fortfarande stå exakt en gång i texten, annars stannar bygget. Vill du
inte ha någon länk alls: skriv `link: null,`.

Rubriken "Om mig" står inte här, utan som `label` i `src/data/sections.js`.

## 5. Ändra kontaktuppgifter

**Fil:** `src/data/contact.js`

- **Mejladressen:** byt texten i `email`. Den visas i klartext och blir en
  länk som öppnar mejlprogrammet.
- **En länk:** byt `url` på den raden.
- **Gömma en länk:** skriv `url: null,`. Radera inte raden. Så är
  GitHub länken gömd i dag. Skriv in adressen igen för att visa den.
- **Formuläret:** `form` styr vart formuläret skickar. Läs kommentaren i filen
  innan du ändrar något där.

LinkedIn adressen är härledd ur ditt användarnamn och har inte gått att
kontrollera automatiskt. Klicka på länken på sidan och byt adressen om den
leder fel.

**Två saker som inte syns i koden:**

- hCaptcha måste vara påslagen i Web3Forms instrumentpanel. Är den avslagen
  försvinner meddelandena, fast bygget är grönt. Skicka ett riktigt
  meddelande och se att det kommer fram.
- Slå inte på domänbegränsningen hos Web3Forms. Då slutar formuläret fungera
  när du kör sidan på din egen dator.

## 6. Ändra namn och roll

**Fil:** `src/data/profile.js`

`name` och `role` står här. Kommentaren i filen visar var de syns.
**Ändrar du `role` ska du ändra samma text i `<title>` i `index.html`**, i
samma redigering. Ingen kontroll jämför de två.

Rubrikerna i navigeringen ändrar du med `label` i `src/data/sections.js`. Där
bestämmer ordningen i listan också ordningen på sidan. Rör inte `id`.

## 7. Texter som ligger i komponenterna

Några texter ligger inte i `src/data/` utan i komponenterna. Ändra bara
texten inom citattecknen.

| Text | Fil | Var i filen |
|---|---|---|
| Rubriken i hero (ett förslag som väntar på ditt svar) | `src/components/Hero.jsx` | `headline` |
| Ingressen i hero | `src/components/Hero.jsx` | `intro` |
| Ordet ovanför rubriken och knapparna i hero | `src/components/Hero.jsx` | `eyebrowText`, `primaryActionText`, `secondaryActionText` |
| Knappen i navigeringen | `src/components/Header.jsx` | `ctaText` |
| Raden som visas när projektlistan är tom | `src/components/Projects.jsx` | `EMPTY_TEXT` |
| Rubriken ovanför kontaktuppgifterna | `src/components/Contact.jsx` | rubriken i `<h3>` |
| Formulärets etiketter och platshållartexter | `src/components/ContactForm.jsx` | `FIELDS` |
| Formulärets felmeddelanden för fälten | `src/components/ContactForm.jsx` | funktionen `validate` |
| Formulärets besked efter inskick | `src/components/ContactForm.jsx` | `status` |
| Texten på formulärets knapp | `src/components/ContactForm.jsx` | sök med Ctrl+F på texten du ser på knappen |
| Sidbeskrivningen för sökmotorer (ett förslag) | `index.html` | `<meta name="description">` |

Texten i `<noscript>` i `index.html` är beslutad ordagrant i `ARKITEKTUR.md`.
Ändra den inte själv.

Kör `npm run build` efter en ändring i en komponent. Ett skrivfel där fångas
först av bygget.

## När bygget stannar på en grind

En grind är en kontroll som stoppar bygget när något är fel. Det är meningen:
du kan inte råka bygga en halv ändring. Bygget har fyra steg, och det första
som hittar ett fel stoppar resten. Felet står i terminalen, och första ordet
på raden visar vilket steg som stannade.

| Raden börjar med | Vad det betyder | Vad du gör |
|---|---|---|
| Namnet på en datafil, till exempel `projects.js:` | Datakontrollen hittade ett fel i den filen. Resten av raden säger vad, och oftast vilken post. | Rätta det som står. Läs kommentaren högst upp i filen om du är osäker på regeln. |
| Namnet på en datafil följt av `tecken saknas i` | Ett tecken i din text finns inte i typsnittet. Raden visar tecknet och fältet. | Byt tecknet mot ett vanligt tecken. Behöver du verkligen tecknet är det ett jobb för utvecklaren. |
| `index.html:` | Heros bildbredder i `profile.js` stämmer inte med `index.html`. | Raden säger exakt vad som ska stå i `index.html`. Skriv in det, eller ångra ändringen i `profile.js`. |
| `sidans id:` | En `slug` eller ett grupp `id` är samma som ett id som sidan redan använder. | Välj ett annat namn. |
| `validate-tokens.mjs:` eller `tokens.css:` | Tokengrinden. Gäller CSS och inte din text. | Ångra den senaste ändringen i komponenten eller CSS filen och fråga utvecklaren. |
| En sökväg till en `.jsx` fil, med radnummer | `vite build` hittade ett skrivfel i en komponent. | Gå till raden. Oftast saknas ett citattecken, ett kommatecken eller en klammer. |
| `prerender:` | Förrenderingen av sidan stannade. | Ångra den senaste ändringen i komponenten och fråga utvecklaren. |

Datakontrollen skriver ut alla fel på en gång, inte ett i taget. Sista raden
säger hur många fel den hittade. Ett skrivfel i en datafil, till exempel ett
glömt kommatecken, ger en rad som säger att filen inte går att läsa och vilken
fil det gäller.

Bildskripten har egna grindar. `npm run optimize:images` stannar med
`AVBRYTER`, och `npm run optimize:projects` stannar med `FEL`. I båda fallen
har ingenting skrivits.

**Det här är inte fel:**

- Att talen i raden `Validering OK` ändras. De visar hur mycket som finns i
  datan och ändras när du lägger till något. De är inga gränser.
- En tom projektlista. Det är ett giltigt läge.

**Kommer du inte vidare:** ångra din ändring och kör `npm run validate:data`
igen. Går den igenom låg felet i det du just skrev. I git kan du se exakt vad
du har ändrat med `git diff`, och lägga tillbaka en fil som den var med
`git checkout -- <fil>`. Det sista tar bort dina ändringar i den filen.

## Sista kontrollen innan du är klar

```sh
npm run validate:data
npm run build
```

Går båda igenom är ändringen klar. Titta en sista gång efter streck i texten
du har skrivit, eftersom ingen kontroll gör det åt dig.
