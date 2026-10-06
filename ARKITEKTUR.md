# Arkitektur

Gäller projektet **Portfolio för Jelal Qaiumi** (React + Vite, ren CSS, mörk bas
med orange som enda accentfärg).

Underlag: `BRIEF.md`, `PLAN.md`, `skills.txt` (93) och `skills-full.txt` (292
poster, 267 unika), `assets-source/logo.png`
och — sedan granskningen av paket 1 — `LARDOMAR.md`, vars "Regel framåt" är
bindande. Se avsnittet "Rättelser efter granskningen av paket 1".

Detta dokument beslutar **struktur, teknik och gränssnitt**. Det innehåller ingen
implementation. Byggaren följer det utan att behöva gissa en enda signatur eller
filplacering.

---

## Upphävda beslut — läs denna tabell först

Dokumentet har tre gånger motsagt sina egna gällande beslut, och varje gång har
någon hunnit bygga mot det upphävda. `LARDOMAR.md` har märkt det
**ÅTERKOMMANDE (3+)**, vilket enligt filens eget format betyder att det ska bli en
mekanisk kontroll. Här är den.

**Konventionen:** när ett beslut upphävs ska den gamla texten antingen **raderas**
eller märkas med ordet **`UPPHÄVT`** och en hänvisning till det gällande avsnittet.
Dessutom förs värdet in i tabellen nedan.

**Kontrollen, som granskaren kör vid varje granskning:** grep på varje sträng i
kolumnen "Förbjuden sträng". Varje träff måste ligga antingen i denna tabell, i ett
stycke märkt `UPPHÄVT`, eller i en citerad rättelse. Träff någon annanstans är ett
fynd.

| Förbjuden sträng | Gäller i stället | Beslutet står i |
|------------------|------------------|-----------------|
| `44 × 44` / `44x44` (om loggan) | 48 × 36 px, tajt märke | "Ikonens optiska storlek" |
| `/assets/logo.png` (som bildkälla i app) | `logo-mark-tight-*.png` i headern | "Headerns logotyp" |
| `alt="Jelal Qaiumi"` (på loggan) | `alt=""` + `aria-hidden="true"` | "Headerns uppbyggnad" |
| `label: 'Start'` / hero-post i `sections` | hero ligger inte i `sections` | "Hero-posten tas bort ur `sections`" |
| `public/assets/profile.jpg` som källa | `assets-source/profile.jpg` | "Källbilder bor utanför `public/`" |
| `public/assets/logo.png` som källa | `assets-source/logo.png` | "Källbilder bor utanför `public/`" |
| `left: 283` / `top: 223` (beskärning) | tajt uttag + `extend()` | "Kvadratisk form skapas med genomskinlig utfyllnad" |
| `overflow-wrap: break-word` | `overflow-wrap: anywhere` | "360 px-golvet och grid" |
| `h1, h2, h3, p, li { overflow-wrap` (selektorlistan) | `body { overflow-wrap: anywhere }`, ärvt | "360 px-golvet och grid" |
| "apple-touch-icon i paket 7" | läggs in nu, tillsammans med favicon-raderna | "Utdatafiler för ikonen" |
| `systemutveckling` (grupp-id) | de 18 grupperna i `skills.js` | "Grupperna — 18 stycken" |
| `sprak-och-karnteknik` (grupp-id) | ↑ | ↑ |
| `backend-och-api` (grupp-id) | `api-och-backend` | ↑ |
| `frontend-och-webb` (grupp-id) | `webbutveckling-och-fullstack` | ↑ |
| `verktyg-och-versionshantering` (grupp-id) | `git-och-versionshantering` | ↑ |
| `kvalitet-och-arbetssatt` (grupp-id) | `testning-och-kvalitetssakring` / `kodkvalitet-och-arkitektur` | ↑ |
| "exakt 93 skills" som grind | unika namn + korsreferens mot källistorna | "Validering av skills" |
| `308 poster` / `258 filled` | **307** / **257** | "Förväntat antal: 307" |
| "HTTP-raden är sidans längsta sträng" | `React Native-komponentbaserad utveckling` (40) | "360 px — den längsta strängen" |
| "ca 1200 px på desktop" / "ca 2500 px på mobil" | 2410 px vid 1280, **6634 px vid 360** | "Layout — omdimensionerad" |
| `328` som spaltbredd vid 360 px vyport | **309 px** (5vw = 18, plus rullningslist) | "Diametern" + navets budget |
| `max-width: 420px` utan brytpunkt | 360 under 900 px, 420 över | "Diametern" |
| `.photo` som klassnamn | `.media` (koden har hetat så sedan paket 3) | "Beskärningen görs i CSS" |
| `.brandName` som klassnamn | `.logoName` | headerns uppbyggnad |
| `R > G` (tröskel) | `R - G >= 30` | blockdetekteringen |
| `palette: true` | `compressionLevel: 9` ensamt | utdatafiler för ikonen |

Jag skriver in nya rader här varje gång jag upphäver något. Raderna tas aldrig
bort — en tom tabell går inte att skilja från en obevakad.

---

## Mappstruktur

```
Portfoolie-Jelalq/
├─ index.html                     Vites entry. <html lang="sv">, <title>, favicon → /assets/logo-mark-32.png
├─ package.json                   Scripts: dev, build, preview (paket 1) + optimize:images (läggs till i paket 2)
├─ vite.config.js                 Enbart @vitejs/plugin-react. Ingen extra konfiguration.
├─ ARKITEKTUR.md                  Detta dokument
├─ BRIEF.md / PLAN.md / skills.txt
├─ scripts/
│  └─ optimize-images.mjs         Engångsskript (paket 2). Körs manuellt, ingår INTE i build.
├─ assets-source/                 KÄLLBILDER. Publiceras ALDRIG — ligger utanför public/.
│  ├─ logo.png                    ORIGINAL 1254x1254 — läses, skrivs aldrig över
│  └─ profile.jpg                 ORIGINAL 4688x5051 — läses, skrivs aldrig över
├─ public/                        Allt här kopieras rakt ut i dist/. Endast genererat.
│  └─ assets/
│     ├─ profile/                 Genererade profilvarianter (paket 2A)
│     ├─ logo-mark-{32,96,192}.png        Kvadratisk ikon, favicon/apple-touch (paket 2B)
│     └─ logo-mark-tight-{96,192}.png     Tajt märke för headern (paket 3)
└─ src/
   ├─ main.jsx                    Monterar <App />. Importerar tokens.css + global.css i den ordningen.
   ├─ App.jsx                     Komponerar sidan: Header, Hero, Skills, Projects, Contact, Footer.
   ├─ components/                 En komponent per fil + en .module.css per komponent
   ├─ data/                       Ren data. Innehåll som Jelal redigerar. Ingen JSX här.
   └─ styles/                     Global CSS: fonts.css, tokens.css, global.css.
      └─ fonts/                   didact-gothic-latin-400.woff2. Refereras ur fonts.css.
```

Regler för mapparna:

- `src/components/` — presentations­komponenter. Får läsa från `src/data/` men
  får aldrig innehålla innehållsdata (skill-namn, projekt, kategorier) hårdkodad.
- `src/data/` — innehåller endast `export const`-arrayer/objekt. Ingen import av
  React, ingen logik, inga funktioner.
- `src/styles/` — innehåller bara `fonts.css`, `tokens.css`, `global.css` och
  mappen `fonts/`. All komponentspecifik CSS bor i respektive `.module.css`.
- `assets-source/` — källbilderna. Läses av `scripts/optimize-images.mjs`, skrivs
  aldrig. Ligger **utanför** `public/` och följer därför aldrig med i leveransen.
- `public/assets/` — **endast genererat**. Ingenting läggs här för hand.

### Källbilder bor utanför `public/` — rättat efter granskningen

**Felet:** `dist/` var 4,9 MB, varav `dist/assets/profile.jpg` 3,57 MB och
`dist/assets/logo.png` 0,83 MB — alltså **90 % oanvänd last**. Ingen kod refererar
dem; enda träffen i hela `src/` var en kommentar i `tokens.css`.

Orsaken var strukturell och mitt beslut: jag la originalen i `public/`, som är
Vites katalog för filer som ska **kopieras rakt igenom till leveransen**. Hela
poängen med paket 2A var att gå från 3,7 MB till 177 kB, och originalet följde med
ut ändå. Att ett original "aldrig rörs" betyder inte att det ska publiceras.

**Beslut: källbilderna flyttas till `assets-source/` i projektroten.**

| Vad | Från | Till |
|-----|------|------|
| Profilbilden | `public/assets/profile.jpg` | `assets-source/profile.jpg` |
| Loggan | `public/assets/logo.png` | `assets-source/logo.png` |

Följdändringar som ingår i samma åtgärd:

- `scripts/optimize-images.mjs`: `SOURCE`-konstanterna pekas om till
  `assets-source/`. Utdatasökvägarna är oförändrade.
- Skriptet ska **avbryta med fel om en utdatasökväg hamnar under
  `assets-source/`**, på samma sätt som det redan vägrar skriva över källan.
- Kommentaren i `tokens.css` som nämner `/assets/logo.png` pekas om till
  `assets-source/logo.png`, så att den inte läser som en körbar sökväg.
- En omkörning av `npm run optimize:images` ska fungera oförändrat: den läser från
  `assets-source/`, skriver till `public/assets/`. Determinismen som granskaren
  bevisade (11 byte-identiska artefakter) ska gälla efter flytten också — kör om
  och jämför.
- **`BRIEF.md` anger sökvägarna `public/assets/logo.png` och
  `public/assets/profile.jpg`.** Den filen är inte min att ändra. Projektledaren
  behöver uppdatera dem, annars pekar beställningen på en plats som inte finns.

Originalen bevaras och skrivs aldrig över. Det enda som upphör är att de
publiceras.

### Leveransens storlek är en verifieringspunkt

Ingen mätte `dist/` på fyra paket. Det ska inte kunna hända igen, så kontrollen
skrivs ut:

| Kontroll | Gräns |
|----------|-------|
| `dist/` totalt | **≤ 1 MB** |
| Enskild fil i `dist/` | **≤ 300 kB** |
| Filer i `dist/` som ingen kod refererar | **0** |

Förväntat utfall efter flytten: ca 0,4–0,5 MB totalt (bildvarianter ~177 kB,
ikoner ~10 kB, JS och CSS resten). Hamnar siffran nära 1 MB är något fel även om
gränsen formellt hålls — mät vad som växt innan paketet lämnas.

Kontrollen körs i **varje** paket från och med nu, inte bara i paket 7. En
regression som upptäcks fyra paket senare är dyr att spåra.

---

## Teknikval

| Val | Varför | Vad vi valde bort |
|-----|--------|-------------------|
| React 19 + Vite (mall `react`, JavaScript) | Beslutat i briefen. Portfolion demonstrerar den stack som står i kompetenslistan. Mallen `react` (Babel-plugin) framför `react-swc` eftersom skillnaden bara är byggtid på ett projekt av den här storleken och Babel-varianten är den som är bäst dokumenterad. | TypeScript (inte efterfrågat, Jelals lista säger JavaScript), Next.js (ingen SSR eller routing behövs för en one-pager) |
| **CSS Modules** (`*.module.css`), inbyggt i Vite | Noll nya beroenden — Vite kompilerar `.module.css` direkt. Klassnamn skopas automatiskt, så sex komponenter kan använda `.title` utan att krocka och utan att vi måste upprätthålla en namnkonvention med disciplin. Stilen ligger bredvid komponenten, vilket gör den lätt att hitta och lätt att ta bort. | Global BEM-fil (växer till en enda lång fil, kräver mänsklig disciplin för att inte läcka), Tailwind/UI-ramverk (förbjudet i briefen), CSS-in-JS (runtime-beroende utan nytta här) |
| Designtokens som CSS-variabler i `:root` i `styles/tokens.css` | Variabler kaskaderar rakt in i CSS Modules, så de två strategierna krockar inte. Ett ställe att ändra färg/spacing på. | SASS-variabler (hade krävt `sass` som beroende och tappat runtime-kaskaden) |
| Systemfont-stack, ingen webbfont | Noll nätverksbegäran, ingen FOUT, inget beroende. Loggan bär den grafiska identiteten — texten ska vara neutral och lugn. | Google Fonts / Inter via npm (extern begäran eller extra beroende för marginell vinst) |
| `sharp` som **devDependency** | ImageMagick saknas på maskinen (verifierat i briefen). sharp är standardverktyget i Node för detta, körs en gång manuellt och hamnar aldrig i bundlen. | Manuell export i bildprogram (går inte att upprepa eller verifiera), `vite-imagetools` (pluggar in sig i byggkedjan för en enda bild) |
| **oxlint** — mallens egen linter behålls som den levereras | Dev-beroende, noll runtime-kostnad. Vite-mallen `react` ger i dag (vite 8.3.0) `.oxlintrc.json` + `oxlint`, **inte** ESLint. Regeln `react/rules-of-hooks: error` finns med, vilket är exakt det skydd vi ville ha. | Att byta ut mallens linter mot ESLint (nytt beroende och ny konfiguration för ett skydd vi redan har), att strippa lintern helt (tar bort ett verkligt skyddsnät gratis) |
| Inga andra runtime-beroenden | Briefen: "Inga externa beroenden utöver React/Vite om det inte är motiverat". Ankarnavigering, pills, grid och gråskala löses med plattformen. | react-router (one-pager använder ankare), framer-motion (ingen animation är beställd), ikonbibliotek (inga ikoner är beställda) |

**Runtime-beroenden totalt: `react`, `react-dom`. Inget mer.**

---

## Designtokens

### Accentfärg — mätning

Accentfärgen är **pixelmätt** ur `assets-source/logo.png` (1254 × 1254 px) med
System.Drawing: hela bilden avsökt med var tredje pixel, filtrerat på mättade
pixlar där R > G. De vanligaste oranga nyanserna:

| Hex | RGB | Antal px |
|-----|-----|----------|
| **`#FC6F03`** | **rgb(252, 111, 3)** | **96** ← dominant |
| `#FD6E02` | rgb(253, 110, 2) | 74 |
| `#FC6F02` | rgb(252, 111, 2) | 73 |
| `#FC7003` | rgb(252, 112, 3) | 73 |
| `#FC7002` | rgb(252, 112, 2) | 72 |

Den heltäckande orangen i monogrammet är alltså:

**`#FC6F03`** — rgb(252, 111, 3) — HSL(26°, 98 %, 50 %)

Mätningen är gjord och gäller. Ingen ytterligare sampling behövs i senare paket.

Briefens två kandidater är båda avfärdade av mätningen: `#F57C20` (245, 124, 32)
avviker +7 / −13 / −29 per kanal och `#FF7A18` ligger också fel. Loggans orange är
mer mättad och rödare än båda — B-kanalen är i praktiken noll, inte 24–32. Hade vi
byggt på briefens ungefärliga värde hade accentfärgen på sidan aldrig matchat
loggan som ligger bredvid den i headern.

### Färger

Mörk bas rakt igenom, i loggans nästan-svarta ton. Orange är enda accenten.

| Variabel | Värde | Används till |
|----------|-------|--------------|
| `--color-bg` | `#0B0B0C` | Sidans botten, hela vägen. Matchar loggans svarta platta. |
| `--color-surface` | `#141416` | Pills, kort, nedtonade ytor |
| `--color-bg-top` | `#2A2A2E` | **Sidans gråa övre fält**: headern och hero, en sammanhängande yta. Jelals val 2026-10-05, ett steg ljusare än `#1C1C1F`. |
| `--color-header-border` | `#45454B` | Headerns `border-bottom`. **Ljusare** än bandet, se "Kanten måste byta riktning". |
| ~~`--color-surface-raised`~~ | — | **BORTTAGET.** Hade ingen konsument efter att `--color-bg-top` bröts ut. Ett token utan användning är dött fält, samma regel som fällde vikttokenen. Behöver projektkorten hover någon gång införs det då, med en verklig användning. |
| `--color-border` | `#2A2A2E` | Hårfina avgränsare, outline-pills |
| `--color-text` | `#EDEDEF` | Brödtext och rubriker. Även profilbildens vita streck — se "Det vita strecket" för varför ingen separat vit token införs. |
| `--color-text-muted` | `#A1A1A8` | Sekundär text, intro, grupprubriker i skills. **Inte** navlänkarna — se "Headern är enfärgad". |
| `--color-text-dim` | `#6E6E76` | Footer, metadata, ej ifyllda pills |
| `--color-accent` | `#FC6F03` | **Enda accentfärgen.** Ifyllda pills, länkhover, fokusring, streck |
| `--color-accent-hover` | `#FD9140` | Hover/aktivt läge på accentytor. Samma kulör, ljushet 50 % → 62 %. |
| ~~`--color-accent-soft`~~ | — | **BORTTAGET.** Noll användningar i `src/`. Infördes "vid behov" — alltså utan behov. Se noten under tabellen. |
| `--color-on-accent` | `#0B0B0C` | **Text ovanpå orange yta.** Mörk text, inte vit. |
| `--color-overlay-grey` | `rgba(32, 32, 36, 0.45)` | Grå tonplatta över profilbilden (paket 3) |
| `--color-focus` | `#FC6F03` | Fokusring. Binds om i `.surface-light` — se "Fokusringen". |

> **Två token har tagits bort av samma skäl, och det skälet är värt att minnas.**
> `--color-surface-raised` ("hover på kort") och `--color-accent-soft` ("vid
> behov") hade båda noll konsumenter. Ingen av dem kom ur ett krav — de kom ur att
> jag föreställde mig en framtida användning. **Ett token ska införas av en
> komponent som behöver det, inte i väntan på en.** Det är samma regel som fällde
> vikttokenen och `inNav`, nu tredje och fjärde gången.

**Not om byggd CSS:** minifieraren skriver om `rgba()` till hex med alfakanal —
`--color-overlay-grey` blir `#20202473`. Det är väntat och ska inte "rättas".
Avrundningen gäller bara alfavärdet. **Accentfärgen själv är exakt** i både källa
och bygge, vilket är det som räknas när den ska matcha loggan.

**Kontrastbeslut** (omräknat på det uppmätta `#FC6F03`): vit text på orange ger
**2,83:1** och klarar inte WCAG AA. Mörk text (`--color-on-accent` `#0B0B0C`) på
samma orange ger **6,95:1** och klarar AA med marginal. Därför är en **ifylld
skill-pill orange botten med mörk text** — det är både tillgängligt och mest likt
loggan. Orange text på `--color-bg` är samma par omvänt, alltså också 6,95:1, och
är tillåtet för länkar och accentdetaljer.

### Spacing

8 px-rytm, 4 px som finsteg.

| Variabel | Värde |
|----------|-------|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.5rem` (24px) |
| `--space-6` | `2rem` (32px) |
| `--space-7` | `3rem` (48px) |
| `--space-8` | `4rem` (64px) |
| `--space-9` | `6rem` (96px) |
| `--space-10` | `8rem` (128px) |

Sektionernas vertikala luft: `padding-block: clamp(var(--space-8), 10vw, var(--space-10))`.
Det ger de generösa marginalerna som förebilden har, utan att spräcka 360 px.

### Typografi

```
--font-sans: 'Didact Gothic', system-ui, -apple-system, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

**Didact Gothic, valt av Jelal 2026-10-03.** Se "Typsnittet" nedan — det har
**bara en vikt (400)**, vilket upphäver alla viktbaserade beslut i tabellen nedan.

| Variabel | Värde | Används till |
|----------|-------|--------------|
| `--text-xs` | `0.75rem` | Pill-text på mobil, metadata |
| `--text-sm` | `0.875rem` | Pill-text, navlänkar, footer |
| `--text-base` | `1rem` | Brödtext |
| `--text-lg` | `1.125rem` | Intro-ingress |
| `--text-xl` | `clamp(1.25rem, 2.5vw, 1.5rem)` | Kategorirubriker, projekttitel |
| `--text-2xl` | `clamp(1.75rem, 4vw, 2.5rem)` | Sektionsrubriker (`h2`) |
| `--text-3xl` | `clamp(2.5rem, 8vw, 4.5rem)` | Hero-namn (`h1`) |
| `--leading-tight` | `1.1` | Rubriker |
| `--leading-normal` | `1.6` | Brödtext |
| `--tracking-wide` | `0.08em` | Versaletiketter, wordmark-känsla |
| `--tracking-tight` | `-0.02em` | `h1` och `h2`. Stora grader i en enviktsskärning ser luckiga ut med normal spärrning. |

> **UPPHÄVT: `--weight-regular` / `--weight-medium` / `--weight-bold`.** Tokenen
> är **borttagna**, inte omvärderade. Didact Gothic har en enda vikt, så ett
> viktvärde är inget val längre — och ett token utan alternativ är dött fält,
> samma resonemang som när `inNav` togs bort. Se "Typsnittet".

Max radlängd för brödtext: `--measure: 62ch`.

### Typsnittet — Didact Gothic, en enda vikt

Jelals val 2026-10-03. Teckensnittet finns **bara i vikt 400**. Begäran om
`wght@100..900` returnerar enbart `font-weight: 400`-deklarationer.

Det är inte en detalj. Det tar bort ett av typografins två huvudverktyg, och allt
nedan följer av det.

#### 1. Vikt är inte längre en designparameter

```css
/* global.css */
body { font-weight: 400; }
h1, h2, h3, h4, strong, b { font-weight: inherit; }
```

**`font-weight` sätts aldrig till något annat än 400, någonstans.** Webbläsaren
fetar annars syntetiskt: den smetar ut konturerna algoritmiskt. Det ser märkbart
sämre ut än äkta fet stil, värst i stora grader och värst mot mörk botten, där
utsmetningen läses som grötighet. **En fetning som webbläsaren hittar på är inget
designval.**

`font-weight: inherit` på rubrikerna och på `strong`/`b` är mekanismen, inte
`font-weight: 400` upprepat. Den säger vad vi menar: vikt ärvs, den väljs inte.
Webbläsarens standard gör annars `h1`–`h4` och `strong` feta utan att någon bett
om det, och det är just den tysta fetningen vi stänger av.

#### 2. Hierarkin bärs av storlek, färg, versaler, spärrning och luft

| Nivå | Vad som skiljer den | Ändring |
|------|---------------------|---------|
| `h1` hero | `--text-3xl` (upp till 4,5rem) + `--tracking-tight` + `--leading-tight` | Ny spärrning |
| `h2` sektion | `--text-2xl` (upp till 2,5rem) + `--tracking-tight` + `margin-bottom: var(--space-5)` | Ny spärrning, mer luft under |
| `h3` grupprubrik | `--text-xs` + VERSALER + `--tracking-wide` + `--color-text-muted` | **Oförändrad** |
| Brödtext | `--text-base`, `--color-text` | Oförändrad |

**Steget mellan rubrik och brödtext är inte svagare än förut.** `h2` är upp till
2,5 rem mot brödtextens 1 rem — en storleksskillnad på 2,5 gånger. Vikt bidrog
marginellt vid den skillnaden. Luften under `h2` höjs ändå ett steg, eftersom luft
är det billigaste sättet att förstärka en rubrik utan vikt.

Negativ spärrning på `h1` och `h2` är ny: en enviktsskärning i stora grader får
lätt glesa, luckiga ordbilder, och `-0.02em` stramar upp dem. Det är ett verktyg
vi inte behövde när vikten fanns.

**Kategorirubrikerna i skills fungerar fortfarande — bättre, till och med.** Deras
särskiljning kom aldrig från vikt. Den kommer från versaler, spärrning, liten grad
och dämpad färg, fyra signaler som alla är kvar. Vid 12 px versaler var skillnaden
mellan 400 och 500 nätt och jämnt synlig.

**Headerns namn** tappar `--weight-medium` och får i stället `--color-text` medan
navlänkarna har `--color-text-muted`. Distinktionen flyttar från vikt till färg,
och den var redan tillgänglig i tokentabellen.

#### 3. Självhostad woff2, inte Google Fonts CDN

**Beslut: filen bor i projektet.**

| Val | Varför | Vad vi valde bort |
|-----|--------|-------------------|
| Självhostad woff2 från `src/styles/fonts/` | Noll externa anrop i runtime. Besökarens IP skickas inte till tredje part — en integritetsfråga som prövats rättsligt i Europa. Sidan har i dag noll runtime-beroenden utöver React, och arkitekturen har konsekvent krävt motivering för varje nytt. Vite ger dessutom filen en innehållshash, alltså säker cachning. | Google Fonts CDN: en rad i `index.html`, men lägger ett externt beroende i runtime, en extra DNS- och TLS-uppkoppling, och en synlig omflödning vid varje förstabesök |

**Placering: `src/styles/fonts/didact-gothic-latin-400.woff2`**, refererad med
relativ `url()` ur `src/styles/fonts.css`.

**Inte i `public/`.** Min egen regel säger att `public/assets/` bara innehåller
genererat och att ingenting läggs där för hand. En teckensnittsfil i `src/` som
CSS refererar får dessutom innehållshash av Vite och kan aldrig bli en orefererad
fil i `dist/` — den gräns jag själv satt.

**Importordning i `main.jsx`**, fonts först så att `@font-face` är deklarerad
innan något använder den:

```js
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';
```

#### 4. Delmängd, visning och reserv

**Endast `latin`.** Sidan är på svenska. `å ä ö` ligger i latin-delmängden, liksom
tankstrecket i `Klient–server-kommunikation` (U+2013 ingår i U+2000–206F).
`latin-ext`, `greek`, `greek-ext`, `cyrillic` och `cyrillic-ext` laddas inte — de
är merparten av filerna och behövs inte för en enda sträng på sidan.

**Ny grind i `validate-data.mjs`:** varje tecken i alla strängar i `src/data/`
måste täckas av teckensnittet.

> **Skärpt av byggaren, och skärpningen är rätt.** Jag skrev att grinden skulle
> mäta mot den `unicode-range` som `@font-face` **deklarerar**. Byggaren mäter i
> stället **filens faktiska täckning**. Skillnaden är att en deklaration kan påstå
> en täckning filen inte har — då hade grinden godkänt ett tecken som ändå renderas
> i reservtypsnittet. Att mäta artefakten i stället för påståendet om den är samma
> princip som gäller överallt annars i detta dokument. Lägger någon in
ett tecken utanför delmängden renderas det i reservtypsnittet — en skarv mitt i ett
ord som är lätt att missa med blotta ögat. Felmeddelande:

```
skills.js: tecken utanför teckensnittets delmängd ("Łukasiewicz", tecken "Ł" U+0141)
```

Slår grinden till är åtgärden att lägga till `latin-ext`, inte att döpa om Jelals
post.

**`font-display: swap`.** `optional` övervägdes och valdes bort: det kan hoppa
över typsnittet helt vid ett långsamt förstabesök, och då syns inte det typsnitt
Jelal valt. För en portfolio är en kort omflödning bättre än att valet uteblir.
Filen är samma ursprung och ca 15–30 kB, så fönstret är kort.

**Ingen `<link rel="preload">`.** Filen får en innehållshash av Vite, och en
preload-rad i `index.html` skulle behöva det hashade namnet. Att lösa det skulle
kräva antingen att filen flyttas till `public/` — mot regeln ovan — eller en
plugin. Byggaren ska **mäta hur lång omflödningen faktiskt blir** och rapportera.
Är den störande är preload nästa steg, och då med den avvägningen framme på
bordet i stället för antagen.

**Reservkedjan** är systemstacken, oförändrad. Laddas typsnittet aldrig är sidan
fullt läsbar — reserven är en systemfont som alltid finns, inte ett andra
nedladdat typsnitt.

`size-adjust` på en reserv-`@font-face` för att minska omflödningen övervägdes och
valdes bort. Det kräver uppmätta metrik-värden per plattform och är mer maskineri
än problemet motiverar vid en fil på 20 kB från samma ursprung.

#### 5. Vad byggaren måste mäta om efter bytet

Ett nytt typsnitt ändrar textens mått. Tre saker som i dag är verifierade kan
spricka, och **inget av dem larmar av sig självt**:

1. **`--header-height: 64px`.** Headerns höjd är låst till token och innehållet
   mäts mot den. `LARDOMAR.md` kräver redan ommätning efter varje ändring i
   headern — detta är en sådan. Renderad höjd ska vara exakt 64,00 px.
2. **360 px-golvet.** Didact Gothic är bredare än systemstacken. Verifiera med
   längsta obrutna token, `Klient–server-kommunikation` och
   `autentisering/auktorisering`, 27 tecken, och med
   `React Native-komponentbaserad utveckling` som längsta hela sträng.
3. **Navets utrymmesbudget vid 360 px.** Den räknades på systemfontens bredd och
   hade ca 57 px marginal. Ett bredare typsnitt äter den. Kontrollen är den
   befintliga: varje navlänks rektangel ska ligga innanför headerns.

Dessutom: `dist/`-gränsen räknas om. Teckensnittet lägger ca 15–30 kB på nuvarande
472 kB, alltså långt under 1 MB — men siffran ska mätas och rapporteras, inte
antas.

### Layout, radier och övrigt

| Variabel | Värde | Kommentar |
|----------|-------|-----------|
| `--content-max` | `1120px` | Max bredd på innehållet |
| `--content-padding` | `clamp(1rem, 5vw, 3rem)` | Sidmarginal, aldrig under 16px |
| `--header-height` | `64px` | Används av `scroll-margin-top` |
| `--radius-sm` | `6px` | |
| `--radius-md` | `12px` | Projektkort |
| `--radius-pill` | `999px` | Skill-pills |
| `--transition` | `150ms ease` | Hover/fokus. Ingen scroll- eller entré-animation. |
| `--z-header` | `10` | Sticky headerns lagernivå. Enda z-index-värdet i projektet. |

### Brytpunkter

Mobil först. CSS-variabler fungerar inte i `@media`, så dessa är **fasta tal** och
skrivs som en kommenterad lista högst upp i `tokens.css`. Använd exakt dessa, inga
andra:

| Namn | Query | Avsikt |
|------|-------|--------|
| (bas) | — | 360–599 px. En kolumn överallt. |
| sm | `@media (min-width: 600px)` | Två kolumner skills, större hero-typografi |
| md | `@media (min-width: 900px)` | Hero blir två kolumner (text + bild), nav alltid synlig, tre kolumner skills |
| lg | `@media (min-width: 1200px)` | Max bredd slår in, fyra kolumner skills |

Golvet är **360 px utan horisontell scroll**. Se "360 px-golvet och grid" nedan —
det är tre regler, inte en, och de löser olika saker.

### 360 px-golvet och grid

Ett vanligt svenskt ord på 17 tecken, `systemintegration`, i hero-rubriken gav
horisontell scroll vid 360 px: `innerWidth` 360, `clientWidth` 345, `scrollWidth`
upp till 2043. Intro- och titelraden sprack vid 35–36 tecken.

**Rättelse 5 var genomförd och räckte ändå inte.** Orsaken är att de två sakerna
inte är samma sak:

- `overflow-wrap: break-word` bryter ett ord som **redan** ligger ensamt på en rad
  och inte får plats. Den **sänker inte elementets `min-content`-bredd**.
- Ett grid-spår med `1fr` betyder `minmax(auto, 1fr)`, och det automatiska minimum
  för ett grid-barn **är `min-content`**. Spåret vägrar alltså bli smalare än det
  längsta ordet.

Samma ord i ett `h2` inuti `<Section>` (förälder `display: block`) spricker inte
ens vid 70 tecken. Det var paket 3:s första grid som gjorde skillnaden, och
`min-width: 0` på grid-**barnet** hjälper inte — det är **spåret** som bär golvet.

**Beslut: båda mekanismerna gäller, för de löser var sin halva.**

```css
/* 1. global.css — ärvs av ALLT. Detta är det som bär golvet. */
body { overflow-wrap: anywhere; }

/* 1b. De få ställen som INTE får brytas säger det själva */
.navList, .navLink, .logoName { white-space: nowrap; }

/* 2. varje grid-container, utan undantag — hygien, inte garanti */
grid-template-columns: minmax(0, 1fr);                      /* inte 1fr */
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* explicit min är OK */
```

**1. `overflow-wrap: anywhere` på `body`, ärvt nedåt.** Till skillnad från
`break-word` räknas dess brytpunkter in i `min-content`, så elementet får faktiskt
bli smalare. `overflow-wrap` är en **ärvd** egenskap, så en deklaration på `body`
täcker varje element som finns i dag och varje element någon lägger till i
morgon — `<span>`, `<code>`, `<a>`, allt.

> **UPPHÄVT: selektorlistan `h1, h2, h3, p, li`.** Den var en uppräkning, och en
> uppräkning har alltid en lucka. Se mätningen nedan.

**1b. Den som inte får brytas säger det själv** med `white-space: nowrap`.
`overflow-wrap` saknar verkan när radbrytning är avstängd, så de två krockar inte.
Headerns navlista, navlänkar och namnet är redan skyddade på det sättet.

Systemet är alltså **säkert som standard med uttryckligt undantag**, i stället för
osäkert som standard med en lista man måste komma ihåg att utöka. Det är hela
poängen: luckan kan inte uppstå igen genom att någon lägger till ett element.

**2. Inget grid-spår får skrivas som bara `1fr`.** Skriv `minmax(0, 1fr)`, eller
`minmax(<explicit min>, 1fr)` när ett minimum är avsiktligt.

> **Rättad motivering.** Jag skrev att regel 2 var den som gjorde golvet
> strukturellt, och att regel 1 bara skyddade "text vi kan räkna upp". **Det var
> en gissning och den var fel.** Byggaren mätte vid 360 px med en 60 tecken lång
> filsökväg i ett `<span>` — alltså exakt det fall motiveringen handlade om:
>
> | Spår | `<span>` | `scrollWidth` |
> |------|----------|---------------|
> | `minmax(0,1fr)` | utan wrap | **398 — sprack** |
> | `1fr` | utan wrap | **398 — sprack** |
> | `minmax(0,1fr)` | `anywhere` | 345 OK |
> | `1fr` | `anywhere` | 345 OK |
>
> Spåret gör **ingen skillnad alls**. Ett spår som krymper hindrar inte barnet
> från att svämma över det — bara innehållets egen brytbarhet gör det. Det som
> bär golvet är `overflow-wrap` på elementet, punkt.

Regel 2 **behålls ändå, men som hygien och inte som garanti.** `1fr` är en välkänd
fälla: ett spår som vägrar krympa under `min-content` biter i andra sammanhang än
detta — kolumner som inte blir lika breda, innehåll som trycker ut sin granne. Det
är ett billigt skydd mot en verklig klass av problem. Det är bara inte det här
problemets lösning, och dokumentet ska inte påstå det.

Gäller retroaktivt: samtliga grid-containrar i `src/` ska vara mönstrade. Byggaren
har hittat fyra, däribland `Hero.module.css .text` och `Skills.module.css .group`
som jag inte listat. Projektkorten i paket 5 omfattas från första raden.

`hyphens: auto` övervägdes och valdes bort. Det hade gett snyggare brytning av
svenska sammansättningar (`system-integration` i stället för `systemintegratio/n`),
men det är kosmetik vars utfall varierar mellan webbläsare, och det får inte
blandas ihop med det som **garanterar** golvet. Vill vi ha det är det ett eget
beslut, inte en del av denna rättelse.

**Verifiering.** `img, svg { max-width: 100% }` står kvar i `global.css`. Golvet
verifieras vid 360 px med **bevisad vyport** (se navigeringens verifiering) och med
ett avsiktligt långt svenskt sammansatt ord på minst 40 tecken temporärt inlagt i
`h1`, i titelraden och i introt — till exempel
`verksamhetsutvecklingsprojektledningsarbete`. `scrollWidth` ska vara lika med
`clientWidth` i samtliga fall. Att verifiera med den text som råkar stå där i dag
bevisar ingenting om morgondagens text.

**Testa dessutom ett element utanför all selektorlista** — en lång sträng i ett
`<span>` eller `<a>`. Det är det fall som avslöjade att den gamla motiveringen var
fel, och det är det fall paket 5:s projektkort kommer att innehålla på riktigt när
de får länkar och tekniknamn.

### Varje kontroll ska bevisas kunna fallera

Byggaren körde ett **negativt kontrollexperiment**: med `break-word` återinjicerat
sprack golvet till `scrollWidth` 884. Därmed vet vi att mätningen kan ge utslag,
och det godkända utfallet är värt något.

**Det görs till en regel.** En kontroll som aldrig har setts fallera är inte en
kontroll — den är ett påstående. Varje gång en ny grind eller verifieringspunkt
införs ska den en gång tvingas att fallera, och det ska stå i överlämningen att
den gjorde det.

Det här projektet har sju nedtecknade fall där något såg rimligt ut och var fel.
Alla sju delar att inget larmade. En grind som inte kan larma hade inte hjälpt mot
någon av dem.

#### Ett larm är inte ett kvitto förrän man vet vad som larmade

Byggarens negativa kontroll för cirkelns monotonikontroll injicerade
`div:has(picture) { max-width: 420px }`. Selektorn träffade även grid-behållaren,
som också innehåller en `picture`. Spåren kollapsade till 178 px och kontrollen
larmade — **men på ett helt annat fel än det den utgav sig för att pröva.**
Rättat till `div:has(> picture)`.

**Att tvinga fram ett larm räcker alltså inte. Man måste veta vad som larmade.**
En negativ kontroll som fallerar av fel skäl är sämre än ingen, eftersom den ger
falskt förtroende för grinden den skulle validera.

Samma byggare formulerade den andra halvan: *"ett falsklarm som man ser igenom är
nästa gångs ignorerade grind."* De två hör ihop. En grind måste kunna larma, larma
av rätt skäl, och inte larma när allt är rätt — annars lär den oss att titta bort.

#### Mät invarianten, dokumentera den inte bara

Jag skrev regeln "när en skyddsregel tas bort måste det nya beslutet överta
skyddet". **Byggarens invändning är starkare än regeln, och den är riktig:**

> Jag kunde inte ha vetat att regeln bar ett skydd.
> `@media (min-width: 900px) { max-width: none }` hade en kommentar som förklarade
> taket, men ingenting sa att **kombinationen** av de två hindrade en krympning vid
> brytpunkten. Skyddet fanns i förhållandet mellan två regler, och förhållanden har
> ingen plats att bo på i CSS.

Min regel förutsätter att någon **vet** att skyddet finns. Här gick det inte att
veta. En bättre kommentar hade inte heller räddat det, eftersom kommentaren hade
suttit på den regel som togs bort.

Det som räddade det var **verifieringspunkt 5 själv**: en monotonikontroll över en
serie bredder fångar felet oavsett vilken regel som orsakade det och oavsett om
någon mindes varför den fanns.

**Regel: en invariant som bara står i prosa försvaras av att någon läser den. En
invariant som mäts försvarar sig själv.** Varje gång detta dokument formulerar ett
"får aldrig" ska frågan ställas om det går att mäta i stället för att beskrivas.
Går det, är mätningen beslutet och prosan bara förklaringen.

### Grindar körs före skrivning, inte efter

`LARDOMAR.md` föreskriver "skriv till en temporärkatalog, kontrollera där, flytta
sedan". Den **invariant** regeln skyddar är: *fallerar en kontroll är målkatalogen
orörd.*

Att i stället köra grindarna på bufferten innan filen skrivs uppfyller samma
invariant **starkare** — ingen temporärkatalog kan bli kvar, och ingen skrivning
sker alls före sista grinden. Byggaren bevisade det genom att tvinga sista grinden
att fallera och visa att `find public/assets` var identisk före och efter,
inklusive mtimes.

**Det är den gällande metoden.** Regeln ska beskriva invarianten, inte mekaniken;
formuleringen i `LARDOMAR.md` ägs av granskaren.

---

## Datamodell

Allt innehåll som Jelal ska kunna ändra ligger i `src/data/`, **en fil per sak**.

### Filformat: `.js`-moduler, inte JSON

Beslut: datafilerna är JavaScript-moduler med `export const`.

Motivering: JSON tillåter inga kommentarer och ingen avslutande komma — med 93
rader att redigera för hand är det precis där en ovan redigerare går sönder, och
felet syns som en kryptisk parse-error. En `.js`-modul tillåter kommentarer som
förklarar för Jelal vad som ska ändras, överlever en extra komma, och Vites HMR
laddar om direkt vid spara.

### `src/data/sections.js` — sidans sektioner och nav

Enda sanningskällan för både sektions-`id` och navlänkar, så att de inte kan
glida isär.

```js
/**
 * @typedef {Object} SectionDef
 * @property {string} id     Unikt, gemener, a-z. Blir <section id="..."> och href="#..."
 * @property {string} label  OBLIGATORISK. Svensk text i navigationen och som h2-rubrik.
 */
export const HERO_ID     = 'hero';
export const SKILLS_ID   = 'skills';
export const PROJECTS_ID = 'projects';
export const CONTACT_ID  = 'contact';
export const MAIN_ID     = 'main';   // <main id>, mål för skip-länken i paket 7

export const sections = [ /* se tabellen nedan, id hämtas ur konstanterna ovan */ ];
```

Id:na exporteras som namngivna konstanter eftersom kod ibland behöver ett enskilt
id (logga-länken, heros egen `<section id>`). **Ett sektions-id får aldrig
förekomma som bokstavlig sträng i en `.jsx`-fil** — se "Rättelser efter
granskningen av paket 1".

Innehållet är beslutat och ska vara exakt detta, i denna ordning:

| `id` | `label` |
|------|---------|
| `skills` | `Kompetenser` |
| `projects` | `Projekt` |
| `contact` | `Kontakt` |

Båda fälten är obligatoriska på **varje** post. Inga undantag, inga valfria fält.
Footern är inget navmål och får inget `id`.

#### Hero-posten tas bort ur `sections` — rättat efter granskningen

~~Tidigare beslut (alternativ C): hero-posten är `{ id: HERO_ID, inNav: false }`.~~
**UPPHÄVT.**

Mitt skäl att välja C framför B var att heros närvaro höll sidans ordning i **en**
lista. Granskaren har mätt att koden inte längre använder posten till det: `App`
renderar alltid `<Hero />` och filtrerar bort `HERO_ID`, `Header` filtrerade på
`inNav`. Utdata med posten kvar är **identisk** med utdata utan den. Ordningen är
alltså redan delad, och skälet till C har därmed upphört att finnas.

**Beslut: hero ligger inte i `sections`.** `HERO_ID` exporteras fortfarande,
eftersom logga-länken och `Hero.jsx` egen `<section id>` behöver det.

**Och `inNav` tas bort samtidigt.** Med hero borta har alla tre kvarvarande poster
`inNav: true`, och ett fält som har samma värde på varje post är dött — precis det
fel vi just rättade på `label`. Att ta bort det ena och låta det andra stå kvar
hade varit att lära sig halva läxan. `sections` betyder nu helt enkelt *"de
navigerbara sektionerna, i ordning"*, och både `Header` och `App` mappar hela
listan utan filter.

Tillkommer en sektion som inte ska synas i navet är det då ett eget beslut att
återinföra fältet — med ett verkligt användningsfall bakom sig.

**Följd för valideringen:** kontrollen `label finns på alla utom HERO_ID` blir
`label finns på alla`, och felmeddelandet `sections.js: label saknas (id "...")`
gäller utan undantag.

### `src/data/skills.js` — skills

Form **och** kategoriindelning är nu beslutade. Se "Skills — kategoriindelning"
längre ner för de 18 grupperna, de 56 gamla posternas placering och hur dubbletter
och nära-dubbletter avgörs.

```js
/**
 * @typedef {Object} Skill
 * @property {string}  name    Visas som text i pillen. Unikt i HELA filen (används som React-key).
 * @property {boolean} filled  true = behärskar → ORANGE fylld pill. false = dämpad outline-pill.
 *
 * @typedef {Object} SkillGroup
 * @property {string}  id      Unikt, gemener, a-z0-9-. Används som React-key och rubrik-id.
 * @property {string}  title   Svensk kategorirubrik
 * @property {Skill[]} skills  Minst en skill
 */
export const skillGroups = [ /* fylls i paket 4 */ ];
```

Ett **skill-post ser exakt ut så här**, inget mer:

```js
{ name: "React", filled: false }
```

Regler som byggaren måste följa:

- Inga andra fält. Ingen nivå, inget procenttal, ingen ikon, ingen sorteringsvikt.
  Briefen förbjuder uttryckligen nivåangivelser.
- Varje namn ska stavas **tecken för tecken** som i källistorna `skills.txt` och
  `skills-full.txt` — inklusive parenteser, bindestreck och versaler.
  `JavaScript (ES6+)`, `HTTP-metoder (GET, POST, PUT, DELETE)`,
  `expo vector-icons` (mellanslag, inte bindestreck), `Trådsäkerhet (lock)` och
  `Klient–server-kommunikation` (tankstreck, inte bindestreck) är de som är
  lättast att råka städa i. Det är Jelals lista, inte vår.
- **Inget fast totalantal.** Se "Validering av skills" — summan är en upplysning,
  och korsreferensen mot källistorna är grinden.
- `filled` sätts enligt BRIEF.md:s beslut 2026-10-03: namn ur `skills-full.txt`
  är `true`, de 50 som bara finns i `skills.txt` är `false`.
- Att markera ett skill som ifyllt = ändra `false` till `true` på en rad i denna
  fil. Ingen komponentfil får behöva röras. Det är paketets hela verifiering.
- Filen inleds med en kommentar på svenska som förklarar just detta.

#### Nästlad struktur, inte platt lista med kategorifält

**Beslut: nästlad.** Kategorin är `skillGroups`-postens plats i trädet, inte ett
värde på varje skill.

Det avgörande skälet är **inte** läsbarhet utan felläge. En platt lista hade krävt
ett `category: 'frontend'`-fält per post, alltså 93 handskrivna strängar som var
och en måste matcha en kategoridefinition. En felstavning där ger antingen en
skill som tyst försvinner eller en spök-kategori som tyst dyker upp — exakt den
sortens tysta fel som detta projekt redan har sex nedtecknade exempel på. I den
nästlade formen är en skill i en kategori **därför att den står där**, och det går
inte att placera den i en kategori som inte finns.

Invändningen mot nästlat är att det är svårare att söka i en lång fil. Den faller
på en formateringsregel:

> **En skill per rad, och `filled` på samma rad som `name`:**
> `{ name: 'React', filled: false },`

Då räcker Ctrl+F på namnet för att hamna på exakt den rad som ska ändras. Jelal
behöver aldrig förstå strukturen — han söker, byter `false` mot `true`, sparar.
Filens ordning följer dessutom sidans ordning, så listan och sidan går att ha
sida vid sida.

Byggaren ska **inte** formatera om filen till flerradiga objekt, och inte låta en
formaterare bryta raderna.

### Skills — kategoriindelning

#### Hur abstraktionsnivån hanteras

Listan är inte homogen. Den innehåller breda yrkesbegrepp (`Systemutveckling`),
ramverk (`React`), finkorniga API-ytor (`TouchableOpacity`), arbetssätt
(`Kodgranskning`) och ett sammanhållet AI-block. Att visa `Systemutveckling` och
`TouchableOpacity` som likvärdiga pills bredvid varandra säger något oavsiktligt
om nivån.

**Beslut: indelningen är ämnesmässig, men kategorinamnen är valda så att
abstraktionsnivån framgår av namnet.** Ingen separat nivådimension, inget extra
fält, ingen rangordning.

Det löser problemet utan att införa något briefen förbjuder. `TouchableOpacity`
och `FlatList` står under **"React Native — komponenter och API:er"**, och den
rubriken säger redan vad de är: enskilda byggdelar i ett ramverk. `Systemutveckling`
och `Fullstack-utveckling` står under rubriker som säger något annat. Läsaren
placerar dem rätt utan att vi behöver sätta en etikett på dem — och utan att vi
antyder att någon post är "mindre värd", vilket vore att nedvärdera Jelals egen
lista.

Alternativet, en uttrycklig nivåindelning à la "Kärnkompetens / Detaljkunskap",
avfärdas: det är i praktiken en nivåangivelse, och sådana är uttryckligen
bortvalda i både briefen och PLAN.md paket 4.

Principen sätts på prov av den nya listan, som innehåller både
`Säker systemarkitektur` och `If/else`. Den håller: `If/else` ligger under
**"Programmering och .NET"** bland `Switch` och `For-, while- och foreach-loopar`,
där den hör hemma som språkgrundkunskap. Ingen läser den rubriken och tror att
raden gör anspråk på något annat.

#### Så specificeras indelningen — deltan, inte en ny lista

`skills-full.txt` **innehåller redan en placering för var och en av sina 292
poster**. Att skriva av alla 267 namnen hit vore att skapa en andra sanning som
kan glida isär från hans fil, och att införa ~300 tillfällen att stava fel.

**Därför specificeras bara avvikelserna:** vilka kategorier som slås ihop, delas
eller löses upp, var de 56 gamla posterna hamnar, och hur varje dubblett och
nära-dubblett avgörs. **Allt annat behåller Jelals placering ur `skills-full.txt`.**

#### Grupperna — 18 stycken

Jelals 17 kategorier är stommen. Fyra ingrepp görs, vart och ett motiverat:

| Ingrepp | Vad | Varför |
|---------|-----|--------|
| **Löses upp** | `Utvecklingsprocess` (19 poster) | 13 av 19 är dubbletter av andra kategorier. En kategori där två tredjedelar är upprepningar är ingen kategori, det är en sammanfattning. De 6 egna posterna flyttas till `Agila arbetssätt och projektmetodik`. |
| **Löses upp** | `Övrigt` (8 poster) | "Övrigt" som synlig rubrik på en portfolio är en eftergift. Posterna har riktiga hem: tre till `Dokumentation och kommunikation` (ny), två till `DevOps och deployment`, en till `Kodkvalitet och arkitektur`, en till `Webbutveckling och fullstack`, en till `Agila arbetssätt`. |
| **Delas** | `Säker webbutveckling` (40 poster) | 40 poster i en grupp är oläsligt. Delas i `Säker webbutveckling` (hot, risk, testning) och `Autentisering och kryptering`, dit Jelals egen kategori `Autentisering` också går in — överlappningen var nästan total. |
| **Delas ut** | React- och mobilposterna ur `Webbutveckling & Fullstack` och `Mobilutveckling` | Blir tre grupper: `React — byggstenar`, `React Native och Expo`, `React Native — komponenter och API:er`. Det är här principen om abstraktionsnivå i rubriken gör mest nytta, eftersom 28 av de gamla posterna är enskilda RN-komponenter. |

**Exakt vilka poster som flyttas** — detta stod inte utskrivet och byggaren fick
härleda det. Byggarens härledning var rätt och är nu beslutet:

| Flyttas från | Till | Poster |
|--------------|------|--------|
| `Webbutveckling & Fullstack` | `React — byggstenar` | React · React-komponenter · Komponentbaserad utveckling · JSX · React Hooks · useState (6 st) |
| `Mobilutveckling` (hela kategorin) | `React Native och Expo` | React Native · Mobilapputveckling · Cross-platform-utveckling · Expo · React Native-komponentbaserad utveckling · Mobil datahantering · Navigation i mobilapplikationer (7 st) |

Med de gamla posterna blir `React — byggstenar` 11 och `React Native och Expo` 14.
`React Native — komponenter och API:er` består helt av gamla poster, 11 st.

Allt annat i `Webbutveckling & Fullstack` står kvar där: Systemutveckling,
Fullstack-utveckling, Webbutveckling, Moderna webbapplikationer,
Klient-server-arkitektur, Responsiv design, Formulärhantering, HTML5, CSS,
C#-baserad webbutveckling, Routing, State management. (`Blazor` går till `Blazor`,
`JavaScript` stryks som nära-dubblett.)

Resultatet, i den ordning de ska stå i datafilen:

| # | `id` | `title` |
|---|------|---------|
| 1 | `programmering-och-net` | Programmering och .NET |
| 2 | `webbutveckling-och-fullstack` | Webbutveckling och fullstack |
| 3 | `react-byggstenar` | React — byggstenar |
| 4 | `react-native-och-expo` | React Native och Expo |
| 5 | `react-native-api` | React Native — komponenter och API:er |
| 6 | `api-och-backend` | API och backend |
| 7 | `databaser` | Databaser |
| 8 | `testning-och-kvalitetssakring` | Testning och kvalitetssäkring |
| 9 | `kodkvalitet-och-arkitektur` | Kodkvalitet och arkitektur |
| 10 | `git-och-versionshantering` | Git och versionshantering |
| 11 | `filhantering` | Filhantering |
| 12 | `devops-och-deployment` | DevOps och deployment |
| 13 | `saker-webbutveckling` | Säker webbutveckling |
| 14 | `autentisering-och-kryptering` | Autentisering och kryptering |
| 15 | `blazor` | Blazor |
| 16 | `agila-arbetssatt` | Agila arbetssätt och projektmetodik |
| 17 | `ai-i-utvecklingsarbetet` | AI i utvecklingsarbetet |
| 18 | `dokumentation-och-kommunikation` | Dokumentation och kommunikation |

#### De 56 gamla posterna — var var och en hamnar

Dessa är `filled: false`. Ingen av dem byter namn.

| Grupp | Gamla poster som läggs till |
|-------|------------------------------|
| Programmering och .NET | Async/await · Trådsäkerhet (lock) |
| Webbutveckling och fullstack | CSS Grid · Flexbox · Media queries · Fetch API · Promise chaining · FormData · Filuppladdning · MVC-mönster · npm · Vite |
| React — byggstenar | Props · Conditional rendering · Controlled components · useEffect · useContext |
| React Native och Expo | React Navigation · AsyncStorage · EAS Build · expo-image-picker · expo-font · expo vector-icons · app.json-konfiguration |
| React Native — komponenter och API:er | FlatList · StyleSheet · Platform-specifik styling · TextInput · Pressable · Modal · RefreshControl · KeyboardAvoidingView · TouchableOpacity · Dimensions API · useColorScheme |
| API och backend | Node.js · JSON · Swagger · OpenAPI · Middleware · HTTP-statuskoder |
| AI i utvecklingsarbetet | Agentisk AI · AI-orkestrering · Prompt engineering · AI-assisterad kodgranskning · AI-assisterad testgenerering · AI-assisterad dokumentation · Chattbaserad AI-assisterad kodning · Ansvarsfull AI-användning |
| Dokumentation och kommunikation | Teknisk dokumentation |

Summa: 2+10+5+7+11+6+8+1 = **50 `filled: false`**. De återstående 6 av de 56 är
nära-dubbletter: `JavaScript (ES6+)`, `CSS3`, `Dependency injection`,
`Pull requests`, `Controllers`, `HTTP-metoder (GET, POST, PUT, DELETE)`.

Av dessa 6 blir **två egna poster med `filled: true`** (`JavaScript (ES6+)` och
`HTTP-metoder (GET, POST, PUT, DELETE)`, eftersom de är `MERGED`-mål) och **fyra
stryks helt**. Se "De två `MERGED`-målen" nedan.

#### De 25 exakta dubbletterna — en hemvist var

Regeln: **en kompetens bor i den kategori där den är ämnet, inte där den nämns.**

| Namn | Hemvist |
|------|---------|
| Kodanalys · Refaktorisering · Clean Code · Designmönster · Underhållbar kod · Dependency Injection | Kodkvalitet och arkitektur |
| Exceptions | Programmering och .NET |
| Systemutveckling | Webbutveckling och fullstack |
| Blazor | Blazor |
| Routing · State management | Webbutveckling och fullstack |
| Versionshantering · Pull Requests | Git och versionshantering |
| DevOps · CI/CD · DevSecOps | DevOps och deployment |
| Säker systemarkitektur | Säker webbutveckling |
| Refresh Tokens · Identity | Autentisering och kryptering |
| Scrum · Kanban · Teamarbete | Agila arbetssätt och projektmetodik |

`Code Review` löses i stället som nära-dubblett, se nedan.

#### Nära-dubbletterna — regeln och de tolv fallen

Två skrivningar av samma sak är ett fel, inte två kompetenser. Men vilken form som
vinner får inte avgöras från fall till fall efter smak, så här är regeln, i
ordning:

1. **Är paret svenskt/engelskt — behåll det svenska.** Gränssnittet är på svenska.
2. **Annars: behåll den form som bär mest korrekt information.**
3. **Annars: behåll den nya listans form**, eftersom den är Jelals senaste ord.

| Behålls | Stryks | Regel |
|---------|--------|-------|
| `Kodgranskning` | `Code Review`, `Kodgranskning / Code Review` | 1 |
| `Autentisering` | `Authentication` | 1 |
| `Agil utveckling` | `Agile development` | 1 |
| `JavaScript (ES6+)` | `JavaScript` | 2 — versionsangivelsen är information |
| `Testdriven utveckling (TDD)` | `Testdriven utveckling` | 2 — akronymen är information |
| `SOLID-principerna` | `SOLID` | 2 |
| `HTTP-metoder (GET, POST, PUT, DELETE)` | `HTTP-metoder`, `GET`, `POST`, `PUT` | 2 — se nedan |
| `Controllers / API-endpoints` | `Controllers` | 2 — snedstrecket förenar två olika saker, inte två namn på samma |
| `API-utveckling` | `Web API-utveckling` | 2 — sammansättning av `Web API` + `API-utveckling`, båda finns kvar |
| `CSS` | `CSS3` | 3 — "CSS3" är en daterad versionsbeteckning, inte mer information |
| `Pull Requests` | `Pull requests` | 3 — enbart versalisering |
| `Dependency Injection` | `Dependency injection` | 3 — enbart versalisering |

Två fall förtjänar ett ord:

- **`Kodgranskning / Code Review`** strykes trots att det är Jelals egen sträng.
  Ett snedstreck som förenar två namn på *samma* sak är dubblettskuld inuti en
  etikett. Ett snedstreck som förenar två *olika* saker, som
  `Controllers / API-endpoints` eller `ORM (Object-Relational Mapping)`, är en
  etikett och behålls.
- **`HTTP-metoder` + `GET` + `POST` + `PUT`** slås ihop till den gamla, fullständiga
  strängen. Fyra pills för enskilda HTTP-verb är precis den granularitet som gör
  323 pills oläsliga, och `DELETE` saknas i den nya listan och hade annars tyst
  fallit bort. **Detta är det enda stället där jag tar bort tre av Jelals poster
  utan att de är rena stavningsvarianter** — det ska han få säga ja eller nej till.
  Säger han nej läggs de fyra tillbaka och den gamla strängen stryks i stället.

`Exceptions` mot `Egna exceptions / throw` är **inte** en dubblett — det ena är
begreppet, det andra att kasta egna. Båda behålls.

#### Förväntat antal: 307

> **Rättat.** Jag skrev först 258 + 50 = 308. Det var fel på två sätt, och
> byggaren spårade kedjan i stället för att justera bort avvikelsen — precis vad
> regeln nedan kräver.
>
> 1. `267 − 10 = 257`, inte 258. Ren felräkning.
> 2. Listan på 10 saknade `Code Review` och `Kodgranskning / Code Review`. Båda
>    står i `skills-full.txt` och båda stryks enligt nära-dubblettabellen. Alltså
>    **12** strukna.

| Steg | Antal |
|------|-------|
| Unika namn i `skills-full.txt` | 267 |
| − strukna nära-dubbletter som finns i den listan | −12 |
| + `MERGED`-mål som bara finns i den gamla listan och därför måste vara egna poster | +2 |
| **Summa poster** | **307** |

**Endast totalen 307 är ett arkitekturtal.** Fördelningen mellan ifyllda och
dämpade är **levande data** som ändras varje gång Jelal markerar ett skill — den
var 257/50 vid leverans och 265/42 efter att han fyllt i åtta till. **Citera den
inte som ett fast tal någonstans**, varken här, i verifieringar eller i
granskningar. Frågan "hur många är ifyllda" besvaras genom att läsa filen, aldrig
genom att läsa det här dokumentet.

De 12 strukna ur `skills-full.txt`: `Authentication`, `Agile development`,
`JavaScript`, `Testdriven utveckling`, `SOLID`, `HTTP-metoder`, `GET`, `POST`,
`PUT`, `Web API-utveckling`, `Code Review`, `Kodgranskning / Code Review`.

De 4 strukna ur `skills.txt` räknas inte bort från 267 — de ingick aldrig där:
`CSS3`, `Dependency injection`, `Pull requests`, `Controllers`.

De 2 som läggs till: `JavaScript (ES6+)` och
`HTTP-metoder (GET, POST, PUT, DELETE)`. Se nästa avsnitt.

Talet är en **upplysning, inte en grind** — se valideringen. Avviker byggarens
summa ska den rapporteras, inte justeras bort. Den regeln har nu betalat sig en
gång.

#### De två `MERGED`-målen ur den gamla listan är egna poster med `filled: true`

Dokumentet motsade sig självt här: avsnittet om de 56 gamla posterna sa att de 6
nära-dubbletterna löses upp "i stället för att läggas till som egna poster", medan
nära-dubblettabellen gör två av dem till `MERGED`-mål. Ett mål som inte är en post
bryter grinden "varje `MERGED`-mål finns i `skills.js`".

**Byggarens tolkning är rätt och är nu beslutet:**

| Post | `filled` | Varför |
|------|----------|--------|
| `JavaScript (ES6+)` | `true` | Bär `JavaScript` ur `skills-full.txt` |
| `HTTP-metoder (GET, POST, PUT, DELETE)` | `true` | Bär `HTTP-metoder`, `GET`, `POST`, `PUT` ur `skills-full.txt` |

`filled: true` därför att strängen bär namn Jelal uttryckligen sagt att han har.
Hade de satts `false` skulle en kompetens han äger visas som omarkerad, vilket är
sämre än att en gammal sträng råkar bli orange. Att de två **också** fanns i den
gamla listan är en tillfällighet i strängvalet, inte ett påstående om hans nivå.

De övriga 4 av de 6 (`CSS3`, `Dependency injection`, `Pull requests`,
`Controllers`) är **inte** poster — deras `MERGED`-mål finns redan i
`skills-full.txt`.

#### Det som INTE har gjorts

Ingen post har omdöpts, omstavats eller fått ändrad versalisering utöver de
nära-dubbletter som räknas upp ovan. Ingen kategori har tagits bort utan att dess
innehåll fått ett namngivet nytt hem.

### Ljus yta — Kompetenser får vit bakgrund, beslutat av Jelal 2026-10-05

Jelal: *"sektionen med kompetens sidan ha bakrunden vit."* Varje färg i sektionen
är vald för mörk botten, så det här är ingen enradsändring.

#### Mekanismen: tokenen binds om på en ytklass, inte nya tokennamn

```css
/* tokens.css, direkt efter :root */
.surface-light {
  --color-bg:         #F4F4F6;
  --color-bg-top:     #F4F4F6;   /* hindrar läckage om något ärver den */
  --color-text:       #0B0B0C;   /* 17,9:1 */
  --color-text-muted: #4F4F56;   /* 7,40:1 */
  --color-text-dim:   #6E6E76;   /* 4,60:1 */
  --color-border:     #CFCFD4;   /* 1,413:1 */
  --color-focus:      #C25102;   /* 4,28:1 — se "Fokusringen" */
  /* --color-accent binds INTE om. Se "De ifyllda pillarna". */

  /* Utan dessa två målar klassen ingenting. */
  background-color: var(--color-bg);
  color:            var(--color-text);
}
```

Alla kvoter ovan är mot `--color-bg` i samma block, alltså `#F4F4F6`.

> **De två sista raderna är nödvändiga, inte prydnad.** Mitt första block hade
> bara anpassade egenskaper, och en klass som enbart definierar variabler sätter
> ingen bakgrund — `section[id]` har ingen egen, så `body` hade fortsatt lysa
> igenom och sektionen förblivit mörk. Byggaren mätte fram det. Jag beskrev en
> ombindning och glömde att något måste konsumera den.

Skills-sektionen får klassen. Inget annat ändras.

**Varför ombindning och inte egna tokennamn.** Med
`--color-text-on-light` och liknande hade varje regel i `Skills.module.css` och
`SkillPill.module.css` behövt byta variabelnamn — och `SkillPill` hade fått
kunskap om ljus botten inbakad i sig. Med ombindning behöver **ingen komponent
ändras alls**. Pillen frågar efter `--color-text-muted` och får rätt svar för den
yta den står på.

Den invändning du kan resa — *"en variabel betyder olika saker på olika delar av
sidan"* — gäller inte här, och skillnaden är densamma som när jag delade
`--color-surface-raised` men vägrade dela `--color-text`:

- `--color-surface-raised` bar **två olika jobb**, ett headerband och ett
  hovertillstånd. Inget gemensamt villkor. Delades.
- `--color-text` betyder **ett** jobb: *textens färg mot den yta den står på.*
  Det är en och samma roll i båda sammanhangen. Ombindning är inte att ge
  variabeln en andra betydelse, det är att lösa in dess enda betydelse mot ett
  annat underlag.

**Testet är fortfarande "vill vi ändra dem tillsammans".** Gör vi texten varmare
vill vi göra det på båda ytorna. Ja alltså — samma roll, en definition per yta.

Klassen bor i **`tokens.css`**, inte i `Skills.module.css`: alla färgvärden i
projektet ligger i en fil, och en ljus yta är ett sidbegrepp som en annan sektion
ska kunna återanvända utan att importera skills modul.

#### De dämpade pillarna — härledda ur kvoten, inte ur färgen

Problemet du pekar på är verkligt: `--color-border` `#2A2A2E` mot vitt blir en
stark mörk ram, och de dämpade hade dominerat över de ifyllda. En inversion
av hela poängen.

Lösningen är att **bevara kvoten, inte färgen**:

| | På mörk botten | På ljus botten (`#F4F4F6`) |
|---|---|---|
| Ram mot bakgrund | `#2A2A2E` mot `#0B0B0C` = **1,38:1** | `#CFCFD4` = **1,413:1** |
| Dämpad text mot bakgrund | `#A1A1A8` mot `#0B0B0C` = ca 7:1 | `#4F4F56` = **7,40:1** |
| Svagaste text mot bakgrund | `#6E6E76` mot `#0B0B0C` = 4,6:1 | `#6E6E76` = **4,60:1** |

Underordningen blir alltså **exakt lika stark** på båda ytorna. Det är inte en
smaksak utan en uträkning, och det är därför de nya värdena ser godtyckliga ut men
inte är det.

> **Varje värde är framräknat baklänges ur målkvoten**, genom att söka igenom
> gråskalan efter den ton som ligger närmast. Byts bakgrunden igen måste alla tre
> räknas om — de är härledningar, inte val. Det är också vad som hände när
> bakgrunden gick från vitt till `#F4F4F6`: samtliga tre tappade sin kvot och
> fick nya värden.

#### De ifyllda pillarna — accenten ändras inte, och kan inte heller räddas

Orange `#FC6F03` som **yta** mot vitt ger **2,83:1**, mot 6,95:1 på mörk botten.
Det ligger under WCAG:s 3:1 för grafiska objekt.

**Och det går inte att lösa med bakgrunden.** För att nå 3:1 skulle bakgrunden
behöva vara ljusare än vitt. Rent vitt är alltså *bästa möjliga* fall för orangen,
och det räcker ändå inte.

| Bakgrund | Orange som yta mot den |
|----------|------------------------|
| `#FFFFFF` | 2,83:1 |
| `#F4F4F6` (brutet vitt) | 2,53:1 |
| `#0B0B0C` (sidans mörka) | 6,95:1 |

**Beslut: `--color-accent` är `#FC6F03` överallt, även på ljus yta. En andra
orange avfärdas.**

Skälet är briefens hårdaste krav: orange är **enda** accentfärgen och värdet är
pixelmätt ur loggan. Headern är dessutom klibbande, så JQ-märket ligger kvar
överst medan man scrollar genom Kompetenser — två oranga toner hade varit synliga
samtidigt.

**Och tillståndet går ändå inte att missa.** Skillnaden mellan ifylld och ej
ifylld bärs av tre signaler samtidigt: fylld orange yta mot vit yta, mörk text mot
grå text, ingen ram mot ljus ram. Texten i den ifyllda pillen behåller sina 6,95:1
oförändrat.

Det här är ett medvetet avsteg från 1.4.11 med ett utskrivet skäl, inte ett
förbiseende.

#### Bakgrunden blir `#F4F4F6` — och vad som följde med

Jelal 2026-10-05: *"Gör bakgrunden på kompetenser lite mindre vit den är för
vit."* Han valde `#F4F4F6` ur `#FAFAFB` / `#F4F4F6` / `#EDEDF0`.

**Ett bakgrundsbyte på en yta vars alla färger är härledda ur bakgrunden är inte
en radändring.** Tre av fem härledda värden tappade sin målkvot och fick räknas
om:

| Token | Mot vitt | Mot `#F4F4F6` | Nytt värde | Ny kvot |
|-------|----------|----------------|------------|---------|
| `--color-border` | 1,4065:1 ✓ | 1,280:1 ✗ | `#CFCFD4` | **1,413:1** |
| `--color-text-muted` | 7,39:1 ✓ | 6,73:1 ✗ | `#4F4F56` | **7,40:1** |
| `--color-text-dim` | 4,50:1 ✓ | **4,10:1 ✗ under AA** | `#6E6E76` | **4,60:1** |

**`--color-text-dim` var det tredje tokenet jag missade när ytan infördes**, efter
`--color-focus`. Det hade hamnat under WCAG AA:s 4,5:1 — inte ett smakfel utan ett
tillgänglighetsfel. Att jag missade två av åtta token på samma yta är skälet till
att regeln nedan finns.

**Varför jag kompenserade den dämpade texten i stället för att acceptera 6,73:1.**
Avvikelsen från min egen formulering "exakt lika stark" vore i sig inte värd en
ändring — 6,73 är långt över AA. Men **6,73 faller under AAA:s 7:1 medan den mörka
ytan ligger över**. Att den ljusa ytan blir mätbart sämre tillgänglig än den mörka
är en asymmetri som inte går att försvara, och åtgärden är ett tecken.

**Två tal som inte kompenseras, och inte ska:**

| | Mot vitt | Mot `#F4F4F6` |
|---|----------|----------------|
| Mörk text `#0B0B0C` | 19,7:1 | **17,9:1** — ingen gräns i närheten |
| Orange pill som yta | 2,83:1 | **2,58:1** |

**Avsteget från 1.4.11 växer alltså från 2,83 till 2,58.** Beslutet står kvar — se
"De ifyllda pillarna" — men talet som anges som avstegets storlek är nu 2,58, och
det ska stå rätt. Ett medvetet avsteg vars storlek är felskriven är på väg att bli
ett omedvetet.

#### Fokusringen binds om — och varför samma tal duger här men inte där

`--color-focus` är ett eget token, inte `--color-accent`. Det följer alltså inte
med en ombindning av accenten, och mot vitt ger `#FC6F03` **2,832:1** — under
WCAG:s 3:1. Mot det gråa bandet är den 5,047:1.

**Inget är fel i dag.** Sidan har fyra fokusbara element, alla i headern, och noll
innanför `.surface-light`. Pillarna är avsiktligt inte interaktiva. Men paket 7
planerar skip-länk och `aria-current`, och projektsektionen får länkar så fort
Jelal lägger till ett projekt.

**Beslut: `--color-focus: #C25102` i `.surface-light`.** 4,70:1 mot vitt, kulör
24,7° mot originalets 26,0° — samma orange, mörkare valör.

**Varför 2,83:1 duger för den ifyllda pillen men inte för fokusringen.** Samma tal,
olika svar, och skillnaden är inte godtycklig:

| | Pillen | Fokusringen |
|---|--------|-------------|
| Signaler som bär budskapet | tre: orange yta, mörk text, ingen ram | **en: ringen** |
| Om kontrasten sviker | tillståndet syns ändå | markeringen försvinner helt |

**En kontrastkvot är inte godtagbar eller ogiltig i sig — det beror på om signalen
är redundant.** Pillen har två reservsignaler. Fokusringen har noll. Därför får den
inte ligga under tröskeln ens med marginal.

#### Det tysta felet som inte hann bli ett fel

Hade den mörkare orangen stått kvar hade accenten bytts men ringen inte. Inne i
den vita sektionen hade fokusmarkeringen behållit originalorangen **utan att någon
märkt det** — ingen mätning hade gått sönder, eftersom ingenting var fokusbart där
ännu.

Byggaren fångade det i en **kartläggning av läckage**, inte i en mätning av något
som brast. Det är en annan sorts arbete än att verifiera: att leta efter vad som
*kan* gå sönder i stället för att kontrollera vad som gick det.

**Regel: när en ny yta införs ska varje token som bär en signal prövas mot den
ytan, inte bara de som råkar användas där i dag.** Jag band om sju token och
missade det åttonde, därför att inget element använde det ännu.

**Verifiering i paket 7:** räkna upp varje fokusbart element per yta och mät den
renderade fokusringens kontrast mot underlaget på varje. Minst 3:1. Listan ska
vara uttömmande, inte stickprov — det är frånvaron av element som dolde felet.

#### Underlag om frågan kommer upp igen

Jelal bad 2026-10-05 om en mörkare orange, fick siffrorna nedan, valde `#D65B02`
begränsat till `.surface-light` — och ångrade sig innan något syntes: *"återgå
till den vanliga orange."* **Beslutet ovan gäller.** Förloppet står här för att
frågan kan återkomma, inte för att något är oavgjort.

Siffrorna avslöjade en motsättning jag inte hade räknat på: ju mörkare orange,
desto bättre syns pillen mot vitt — men desto sämre syns den **mörka texten inuti**
den.

| Ton | Pillen mot vitt | Mörk text i pillen |
|-----|-----------------|---------------------|
| **`#FC6F03`** | **2,83 ✗** | **6,95 ✓** ← gäller |
| `#EA6503` | 3,30 ✓ | 5,96 ✓ |
| `#D65B02` | 3,92 ✓ | 5,02 ✓ |
| `#C25102` | 4,70 ✓ | 4,19 ✗ |
| `#AE4802` | 5,63 ✓ | 3,49 ✗ |

**Fönstret där båda kraven klaras är smalt — ungefär `#EA6503` till `#D65B02`.**
Det stängs uppifrån av pillens kontrast mot vitt och **underifrån av pilltextens
läsbarhet**, vilket är den sidan jag missade när jag först kallade problemet
olösligt.

Kommer frågan upp igen är det den tabellen som avgör vad som är möjligt. Och en
sak till som gäller oavsett: en ljus variant vore en **härledning** av den mörka,
inte en egen färg, så de måste behålla samma kulör. Blir det aktuellt ska
invarianten mätas — högst 5° kulörskillnad — inte kommenteras.

#### Sektionsavgränsarna löser sig själva

Linjen hör till den **andra** syskonsektionen, så den ritas i skills överkant och
ärver skills ombundna `--color-border`:

| Gräns | Linjens färg | Mot | Kontrast |
|-------|--------------|-----|----------|
| hero → skills | `#D9D9DE` (ljus yta) | vitt | 1,41:1 |
| skills → projects | `#2A2A2E` (mörk yta) | `#0B0B0C` | 1,38:1 |

Hade jag valt egna tokennamn hade avgränsaren behövt ett specialfall. Nu gör
ombindningen det automatiskt, och **båda linjerna har samma upplevda tyngd**.

Vid hero → skills gör dessutom färgsteget grått → vitt nästan hela jobbet, så
linjen blir knappt synlig där. Det är rätt: jag beslutade tidigare att den gränsen
bär dubbel markering, och viktningen mellan de två signalerna är fri.

#### Till Jelal: rent vitt eller brutet vitt

Sektionen är 2410 px hög på desktop och 6634 px på mobil. Det är en stor ljus yta
att scrolla igenom på en i övrigt nästan svart sida.

| | `#FFFFFF` | `#F4F4F6` |
|---|---|---|
| Mörk text mot bakgrunden | 19,7:1 | 17,6:1 |
| Orange pill som yta | 2,83:1 | 2,53:1 |
| Upplevd bländning | hårdast möjliga | mjukare |

**Byggt: `#FFFFFF`**, eftersom det är vad Jelal bad om. Men lägg fram `#F4F4F6`
som alternativ med talen ovan — båda misslyckas på orangens 3:1, så den frågan
avgör inte valet, och då återstår bländningen.

### Skills — rendering

#### Pillarnas två tillstånd

| Tillstånd | Utseende |
|-----------|----------|
| `filled: true` | Botten `var(--color-accent)`, text `var(--color-on-accent)`, ingen ram. Kontrast 6,95:1. |
| `filled: false` | Genomskinlig botten, `1px solid var(--color-border)`, text `var(--color-text-muted)`. |

Ej ifylld ska **synas men vara tydligt underordnad** — det är briefens ordval.
`--color-text-dim` är för svagt för text som ska gå att läsa; `--color-text-muted`
mot `--color-bg` ger ca 7:1 och är läsbart utan att konkurrera med orange.

Gemensamt: `border-radius: var(--radius-pill)`, `font-size: var(--text-xs)`,
`padding: var(--space-1) var(--space-2)`, `border: 1px solid transparent` även på
den ifyllda, så att de två tillstånden får **exakt samma mått** och listan inte
hoppar när Jelal ändrar ett värde.

Graden är sänkt från `--text-sm` till `--text-xs` och den vågräta paddingen från
`--space-3` till `--space-2`. Det är den enda åtgärd som biter linjärt på 307
pills, och 12 px är fortfarande läsbart för en etikett på ett till tre ord.

Pillarna är inte interaktiva. Ingen hover, ingen länk, ingen `title`-attribut,
inget `tabindex`. De är text, inte kontroller.

#### Layout — omdimensionerad för 307 pills

Den tidigare layouten dimensionerades för 93 och gav 1 kolumn vid 360, 2 vid 900,
3 vid 1200+. Med 307 pills hade sektionen blivit betydligt högre på desktop.

Två fel i den gamla lösningen, utöver antalet:

- `minmax(260px, 1fr)` gav för få kolumner på breda skärmar.
- Grid gör alla kolumner lika höga som den högsta. Med 18 olika stora grupper —
  från 7 poster till drygt 30 — blir det mycket tomrum.

**Beslut: CSS-flerkolumn för grupplistan, flex-wrap för pillarna.**

```css
.groups { columns: 1; column-gap: var(--space-6); }
@media (min-width: 600px)  { .groups { columns: 2; } }
@media (min-width: 900px)  { .groups { columns: 3; } }
@media (min-width: 1200px) { .groups { columns: 4; } }

.group  { break-inside: avoid; margin-bottom: var(--space-6); }
.pills  { display: flex; flex-wrap: wrap; gap: var(--space-2); }
```

Flerkolumn **balanserar höjderna automatiskt** — det är precis vad 18 olika stora
grupper behöver, och det är den enda inbyggda mekanism som gör det utan JS.
`break-inside: avoid` håller en kategori samman så att dess rubrik aldrig hamnar i
en annan kolumn än sina pills.

Brytpunkterna är här **explicita** och följer tabellen, till skillnad från `auto-fit`
tidigare. Det är ett medvetet byte: `columns` tar ett antal, inte en minimibredd,
så valet står mellan explicita brytpunkter och `column-width`, och explicita tal
som matchar den dokumenterade tabellen är lättare att granska.

**Uppmätt höjd på `section#skills`**, med 307 pills i 18 grupper:

| Bredd | Höjd |
|-------|------|
| 360 px | **6634 px** |
| 900 px | 3061 px |
| 1280 px | 2410 px |
| 1600 px | 2410 px |

> **Rättat.** Jag uppskattade ca 1200 px på desktop och ca 2500 på mobil. Båda var
> fel med faktor 2 till 2,7. Flerkolumn ger fler och smalare kolumner än jag
> räknade med, så varje grupp blir högre och höjdvinsten äts upp. **Planera mot
> tabellen, inte mot mina uppskattningar.** Det är nionde gången något rimligt men
> oprövat faller på mätning, och den här gången var det min egen aritmetik två
> gånger i rad.

**6634 px vid 360 px är sjutton skärmhöjder.** Jag skrev tidigare att mobilen
"accepteras" med hänvisning till ca 2500 px. Det var ett annat påstående än det
som nu gäller, och jag drar tillbaka godkännandet: 2500 px är en lång sektion,
6634 px är något annat.

Jag föreslår ingen åtgärd, eftersom varje åtgärd som skulle bita — filter, sökruta,
hopfällbara grupper, eller att visa färre kategorier på mobil — är uttryckligen
bortvald i PLAN.md. **Att ompröva något av bortvalen är Jelals beslut, inte mitt.**
Han bör få se siffran innan han avgör. Vill han ha ett alternativ som ryms inom
bortvalen finns ett: fler kolumner på mobil med ännu mindre pills, vilket sänker
höjden men gör etiketterna svårlästa. Det är en avvägning han ska göra, inte jag.

Vid 360 px blir sektionen alltså mycket lång. **Om Jelal accepterar det** —
Jelal är införstådd med att sektionen är sidans tyngsta del, och de åtgärder som
skulle korta den på mobil (filter, sökruta, hopfällbara grupper) är uttryckligen
bortvalda i PLAN.md. Att införa dem vore hans beslut, inte mitt.

Gruppens rubrik är `<h3>` i `var(--text-xs)`, `var(--color-text-muted)`,
`text-transform: uppercase`, `letter-spacing: var(--tracking-wide)`. Liten och
lugn, så att pillarna är det man ser och inte 18 rubriker.

**Avstånden — beslutade nu, markeringarna kan tas bort.** När `display: grid`
försvann från `.group` försvann också den `gap` som höll luften mellan rubrik och
pills. Byggaren flyttade den till `margin-bottom`. Det är rätt lösning:

```css
.groupTitle { margin-bottom: var(--space-2); }   /* 8px, rubrik → pills */
.legend     { margin-bottom: var(--space-6); }   /* 32px, teckenförklaring → första gruppen */
```

`--space-2` mellan rubrik och pills håller dem som en synlig enhet — rubriken ska
tillhöra sina pills, inte sväva mellan två grupper. Avståndet **mellan** grupper är
`--space-6` via `.group { margin-bottom }`, alltså fyra gånger större, vilket är
det som gör grupperingen läsbar.

`--space-6` under teckenförklaringen skiljer den från första gruppen så att den
inte läses som en rubrik.

Det är de två sista `EJ I ARKITEKTUR`-markeringarna i Skills-filerna.

Semantik: varje grupp är en `<ul>` med `<li>` per pill. En lista ska vara en
lista — skärmläsaren annonserar antalet, vilket är den enda "räkning" sidan
behöver.

#### 360 px — den längsta strängen

> **Rättat.** Jag skrev att `HTTP-metoder (GET, POST, PUT, DELETE)` fortfarande är
> sidans längsta sträng. Det stämmer inte sedan den nya listan kom in.

Uppmätt, längst först:

| Sträng | Tecken |
|--------|--------|
| `React Native-komponentbaserad utveckling` | 40 |
| `Rollbaserad autentisering/auktorisering` | 39 |
| `HTTP-metoder (GET, POST, PUT, DELETE)` | 37 |

**Men teckenantalet är fel mått.** Det som avgör om golvet spricker är längsta
**obrutna token**, eftersom det är den som sätter `min-content`. Där gäller:

| Token | Tecken |
|-------|--------|
| `Klient–server-kommunikation` | 27 |
| `autentisering/auktorisering` | 27 |
| (tidigare värsta: `KeyboardAvoidingView`) | 20 |

Värsta token har alltså vuxit från 20 till 27 tecken. Det är den siffran som ska
användas när golvet verifieras, och `React Native-komponentbaserad utveckling` som
testrad för total bredd.

Att `overflow-wrap: anywhere` ligger på `body` gör att även dessa bryts — men det
är precis därför den regeln inte får smalnas av till en selektorlista igen.

**Pillen får därför radbryta inuti sig själv.** Ingen `white-space: nowrap`, och
`max-width: 100%`.

> Det är **motsatt** regel mot headern, och det är avsiktligt. I headern är höjden
> låst, så radbrytning klipper bort innehåll tyst. Här är höjden fri, så
> radbrytning är ofarlig medan utebliven radbrytning ger horisontell scroll och
> spräcker 360 px-golvet. **Regeln är densamma i båda fallen: välj det felläge
> som syns.**

Verifieringen vid 360 px görs med just den strängen, inte med kort
platshållartext, enligt `LARDOMAR.md`.

#### Teckenförklaring — vänd, nu när orange är regeln

Förhållandet har kastats om. Tidigare var alla 93 dämpade och orange fanns inte;
nu är **de allra flesta orange och det dämpade är undantaget**. En text som säger
"listan fylls i efter hand" beskriver inte längre det man ser.

**Beslut: en kort teckenförklaring renderas direkt under `<h2>`, alltid.**

Förvald text, omvänd så att den beskriver undantaget i stället för regeln:

> De orange har jag arbetat med. De dämpade har jag rört vid men inte markerat.

- **Alltid renderad, aldrig villkorad på antalet ifyllda.** En rad som försvinner
  av sig själv vid ett visst antal är ett tyst tillståndsbyte, och sådana har det
  här projektet redan betalat för. Raden fungerar i båda lägena.
- Den är ingen nivåangivelse, inget filter och ingen räknare — den säger vad
  färgen betyder, inget annat. Därmed krockar den inte med planens bortval.
- Typografi: `var(--text-base)`, `var(--color-text-muted)`, `max-width: var(--measure)`.
- **Texten ska godkännas av Jelal.** Den är förvald, inte beslutad. Andra
  meningen gör dessutom ett påstående om hans förhållande till de dämpade som
  bara han kan bekräfta — säger han att de hellre ska beskrivas som "ännu inte
  genomgångna" eller något annat, är det hans ord som gäller.

### `src/data/projects.js` — projekt (fylls av Jelal, tom i paket 5)

```js
/**
 * @typedef {Object} Project
 * @property {string}        id           OBLIGATORISK. Unik slug, gemener, a-z0-9-. React-key.
 * @property {string}        title        OBLIGATORISK. Projektets namn.
 * @property {string}        description  OBLIGATORISK. 1-3 meningar på svenska.
 * @property {string[]}      tech         OBLIGATORISK. Får vara tom array []. Visas som små etiketter.
 * @property {string|null}   url          Valfri. Länk till live/demo, annars null.
 * @property {string|null}   repoUrl      Valfri. Länk till repo, annars null.
 */
export const projects = [];
```

`projects` är **tom array** när paket 5 levereras. Tomt läge renderas när
`projects.length === 0`. Inga fält utöver dessa sex — ingen bild, inget årtal,
ingen kategori, ingen "featured"-flagga. De kan läggas till den dag de behövs.

### Projektkortens bredd — läget med ETT projekt

Det här är **Jelals första läge**: han lägger in ett projekt, laddar om, och ser
resultatet. Mitt layoutavsnitt var tyst om det.

`repeat(auto-fit, minmax(280px, 1fr))` kollapsar tomma spår, så ett ensamt kort
blir **1120 px brett**. Byggaren mätte beskrivningens rader till 1070 px.

**Beskrivningens `max-width: var(--measure)` är redan rätt och står kvar.**
`--measure` är tokenet för max radlängd på brödtext och beskrivningen *är*
brödtext — det var ingen ny designidé utan en tillämpning av ett befintligt
beslut. Uppmätt efter: 557 px vid 900, 1280 och 1600.

Men kortet är fortfarande 1120 px. Det är ett utseendeval, och tre vägar finns:

| Alt | Mekanism | Ett projekt | Två projekt | Tre projekt |
|-----|----------|-------------|-------------|-------------|
| **A** | som i dag, `minmax(280px, 1fr)` | 1120 px, spänner hela sidan | 544 px vardera | 352 px vardera |
| **B** | tak på spåret, `minmax(280px, <tak>)` | ca 605 px, vänsterställt | 544 px vardera | 352 px vardera |
| **C** | `auto-fill` i stället för `auto-fit` | 280 px, litet och ensamt | 280 px vardera | 352 px vardera |

**Jelal har valt B**, efter att ha sett uppmätta tal för båda mekanismerna.

#### Taket ligger på KORTET, inte på spåret

> **Rättelse.** Jag skrev formeln som ett tak på *spåret*, medan tabellen beskrev
> ett tak på *kortet*. De ger olika layouter, och byggaren mätte båda:
>
> | Mekanism | 1 projekt | 2 projekt | 3 projekt |
> |----------|-----------|-----------|-----------|
> | tak på **spåret** (min formel) | 604,5 px | 604,5 px, **2 rader** | 604,5 px, **3 rader** |
> | tak på **kortet** (min tabell) | 604,5 px | 548 px | 357,3 px, sida vid sida |
>
> **Orsaken, exakt:** `repeat(auto-fit, …)` räknar antalet spår ur spårets
> max-funktion när den är **definit**. Med max = 604,5 blir
> `floor((1120 + 24) / (604,5 + 24)) = 1` — ett enda spår, alltså en lodrät
> stapel. Så länge max var `1fr`, alltså **indefinit**, användes minimum 280 px
> och det blev tre spår.
>
> Byggaren genomförde formeln och rapporterade motsägelsen i stället för att välja
> åt mig. Det är rätt: ett beslut i detta dokument får bara lämnas ogenomfört
> genom att jag skriver om punkten.

**Gällande mekanism:**

```css
.grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.card { max-width: calc(var(--measure) + var(--space-5) * 2); }
```

Spåret behåller `1fr`. Taket sitter på kortet och binder bara när det finns färre
kort än spår.

**Framräknat ur sidans egna token:** `--measure` = 556,5 px (62ch i Didact Gothic)
+ `--space-5` × 2 = 48 px → **604,5 px**.

#### Två påståenden i mitt eget beslut som inte stämde

**1. "Kortet ska vara exakt så brett som dess egen text vill vara."** Fel ordval.
Med tre projekt är kortet 357 px och beskrivningen pressas till 307 px — smalare
än texten "vill". Rätt formulering är **"aldrig bredare än texten vill vara"**, och
den uppfylls i alla tre lägena.

Det är inget tummande på kravet: `--measure` är ett **tak på radlängd, aldrig ett
golv**. En rad på 307 px bryter ingenting — korta rader är läsbara, långa är det
inte. Takets hela uppgift är att hindra ett ensamt kort från att bli en banderoll.

**2. "Det enda alternativ där kortet ser ungefär likadant ut vid ett, två och
tre."** Överdrivet. 604,5 → 548 → 357 är en krympning på 41 %. Det stämmer att B
ändrar sig **mindre än A** (som går 1120 → 548, alltså 51 %), men "ungefär
likadant" var fel ord och motiveringen bar mer vikt än den tålde.

**Den hållbara motiveringen är enklare:** projekten ska läsas som en samling, inte
som en stapel, och ett ensamt kort ska inte bli en banderoll. Sida vid sida ger
det första, taket det andra. Att kortet krymper när samlingen växer är hur ett
rutnät fungerar, inte ett pris man betalar.

#### De 2 pixlarna från kortets ram — ingen avvikelse

Kortet har `border: 1px` per sida. Med `box-sizing: border-box` blir
innehållsbredden 604,5 − 48 − 2 = **554,5 px**, alltså 2 px under `--measure`
(556,5). Beskrivningen begränsas därmed av kortet i stället för av sitt eget tak.

**Byggaren gjorde rätt som inte lade till `+ 2px`** — ett löst tal i en formel som
uttryckligen ska vara tokenbaserad.

Och det är **ingen avvikelse från invarianten.** Kravet är "aldrig bredare än
`--measure`". Kortets tak och beskrivningens `max-width` är båda **övre gränser i
samma riktning**; vilken som binder först saknar betydelse så länge ingen av dem
överskrids. 2 px på 556,5 är 0,36 % och ändrar ingen radbrytning.

Ramen tokeniseras **inte**. Ett `--border-width`-token hade behövt förklara varför
profilbildens 2 px-streck inte använder det, och vunnit 2 pixlar utan synlig
effekt.

> Skulle kortets ram någon gång bli väsentligt tjockare — säg 4 px eller mer —
> smalnar beskrivningen märkbart och formeln behöver då räkna med ramen. Det är
> inget som ska göras i förväg, men det är skälet talet står utskrivet här.

#### Kort i samma rad får inte sträckas ut

Byggaren satte `align-content: flex-start` och `align-items: flex-start` på
teknik-etiketterna **förebyggande**, med samma uppmätta skäl som i skills:
rutnätet gör kort i samma rad lika höga, så utsträckningsrisken är verklig. Mätt
till en enda höjd, 29,19 px, över båda testkorten.

**Det är rätt och generaliseras till en regel:** i varje rutnät av kort gäller att
innehåll inuti kortet aldrig får ärva kortets utsträckta höjd. Ett kort blir högt
av sin granne, inte av sitt eget innehåll, och då ska dess etiketter, knappar och
bilder ligga kvar högst upp. Markeringen `EJ I ARKITEKTUR` kan tas bort.

### `src/data/contact.js` — kontaktuppgifter (paket 6)

Uppgifterna är givna av Jelal 2026-10-02 i `BRIEF.md`. E-posten är känd, GitHub
och LinkedIn är **ännu ej givna** och ska vara platshållare som Jelal kan fylla i
utan att öppna komponentkod.

```js
/**
 * @typedef {Object} ContactLink
 * @property {string}      label  Svensk etikett som visas, t.ex. "GitHub"
 * @property {string|null} url    Fullständig URL, eller null om den inte är känd än
 *
 * @typedef {Object} Contact
 * @property {string}        email  OBLIGATORISK. Renderas som mailto:-länk i klartext.
 * @property {ContactLink[]} links  Övriga länkar. Poster med url === null renderas INTE.
 */
export const contact = {
  email: 'qaiumi@hotmail.com',
  links: [
    { label: 'GitHub', url: null },   // fyll i URL här när den finns
    { label: 'LinkedIn', url: null }, // fyll i URL här när den finns
  ],
};
```

Regler som byggaren måste följa:

- E-posten skrivs **i klartext** som `<a href="mailto:qaiumi@hotmail.com">`. Ingen
  obfuskering, ingen entity-kodning, inget `[at]`, inget kontaktformulär och ingen
  backend. Det är Jelals uttryckliga beslut, taget med full insikt om
  skräppost-risken.
- `links` filtreras på `url !== null` före rendering. **Tomma länkar renderas
  aldrig** — ingen grå ikon, ingen "kommer snart", inget `href="#"`.
- Byggaren **gissar inte** en GitHub- eller LinkedIn-URL. `null` står kvar tills
  Jelal fyller i den.
- Att lägga till en länk senare = byta `null` mot en URL-sträng på en rad i denna
  fil. Ingen komponentfil rörs. Samma princip som för skills.
- Filen inleds med en kommentar på svenska som förklarar just detta.

---

## Gränssnitt

### Namngivning

- Komponentfil: `PascalCase.jsx`, en exporterad komponent per fil, `export default`.
- Stilfil: samma namn, `PascalCase.module.css`, ligger bredvid komponenten.
- Klassnamn inuti moduler: `camelCase` (så att `styles.navLink` fungerar utan
  hakparenteser).
- Data: `camelCase.js`, named exports.
- All kod, alla filnamn och alla variabler på engelska. All text som syns i
  gränssnittet på svenska.

### Komponenter och exakta signaturer

| Fil | Signatur | Ansvar |
|-----|----------|--------|
| `src/App.jsx` | `function App()` | Renderar `<Header />`, `<main>` med `<Hero />`, `<Skills />`, `<Projects />`, `<Contact />`, och `<Footer />`. Ingen egen logik. |
| `src/components/Header.jsx` | `function Header()` | Sticky header. JQ-märket (`logo-mark-tight-96/192.png`, `alt=""` + `aria-hidden="true"`) plus namnet som HTML-text, tillsammans **en** länk till `HERO_ID`, utan platta eller ram runt märket. Headerbandet är grått (`--color-bg-top`). Navlänkar genereras från hela `sections`. Tar inga props. Detaljerna står i "Headerns uppbyggnad" — den som bara läser denna rad har inte hela beslutet. |
| `src/components/Section.jsx` | `function Section({ id, title, children, className })` | Återanvänd ram för skills/projects/contact. Renderar `<section id={id}>` med `<h2>{title}</h2>` och innehållet. `className` är valfri och läggs till efter modulens egen klass. Används **inte** av Hero. |
| `src/components/Hero.jsx` | `function Hero()` | Renderar sin egen `<section id="hero">` med `<h1>`, titel, intro och profilbilden. Egen, eftersom hero har `h1` och ingen `h2`-rubrik. |
| `src/components/Skills.jsx` | `function Skills()` | Läser `skillGroups` från `src/data/skills.js`. Renderar grupper och pills. Innehåller ingen skill-data. |
| `src/components/SkillPill.jsx` | `function SkillPill({ name, filled })` | Renderar en `<li>` med pill. `filled === true` → orange fylld, mörk text. `filled === false` → outline mot mörk botten. Ren presentation, inget state. |
| `src/components/Projects.jsx` | `function Projects()` | Läser `projects`. `projects.length === 0` → tomt läge på svenska. Annars en lista av `<ProjectCard />`. |
| `src/components/ProjectCard.jsx` | `function ProjectCard({ project })` | Tar hela project-objektet. Renderar `url`/`repoUrl` endast när de inte är `null`. |
| `src/components/Contact.jsx` | `function Contact()` | Läser `contact` från `src/data/contact.js`. Renderar e-posten som `mailto:`-länk i klartext samt `contact.links.filter(l => l.url !== null)`. Innehåller inga adresser eller URL:er hårdkodade. |
| `src/components/Footer.jsx` | `function Footer()` | `<footer>` med namn och årtal. Inget `id`, inget navmål. |

Alla komponenter är funktionskomponenter utan `useState`/`useEffect` i paket 1–6.
Den mobila navigationens eventuella toggle hör till paket 7.

### Ankarnavigering — exakt mekanik

1. `src/data/sections.js` är enda källan. Header mappar `sections` till länkar,
   och varje sektion får sitt `id` från samma lista. Ingen sträng skrivs två gånger.
2. Navlänk: ett vanligt `<a href={"#" + section.id}>`. Ingen router, ingen
   JS-scrollhanterare, ingen `scrollIntoView`.
3. Mjuk scroll i `global.css`:
   ```css
   html { scroll-behavior: smooth; }
   @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
   ```
4. Sticky header skulle annars täcka rubriken man hoppar till. Därför får varje
   `<section>` i `global.css`:
   ```css
   section[id] { scroll-margin-top: calc(var(--header-height) + var(--space-4)); }
   ```
5. Headern ligger i `<header>` utanför `<main>`. Sektionerna ligger i `<main>`.
   Rubrikordning: ett enda `<h1>` (hero), `<h2>` per sektion, `<h3>` för
   skill-kategorier och projekttitlar.
6. Fokus: `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }`
   globalt. Ingen `outline: none` någonstans.

### Var sidmarginalen bor — beslutat efter paket 1

Arkitekturen sa var `padding-block` och `scroll-margin-top` hör hemma men inget om
sidmarginalen. Byggaren lade den globalt. **Det beslutet står fast.**

`global.css` äger den vågräta sidmarginalen för alla sektioner:

```css
section[id] {
  padding-inline: var(--content-padding);
  padding-block: clamp(var(--space-8), 10vw, var(--space-10));
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}
```

Komponentmodulerna äger **bara centreringen**:

```css
.inner { max-width: var(--content-max); margin-inline: auto; }
```

Regler som följer av det:

- En komponentmodul får **aldrig** sätta `padding-inline` på sin sektionsrot. Då
  blir marginalen dubbel. Behöver något mer luft inåt sätter man det på ett
  innerelement.
- Golvet på 360 px utan horisontell scroll är ett hårt krav i briefen. Ligger
  regeln på ett ställe är det uppfyllt för varje sektion som läggs till, även en
  som ännu inte har någon modulfil. Hade varje modul ägt sin egen marginal hade
  Hero, Skills, Projects och Contact behövt upprepa samma rad fyra gånger, och den
  som glöms bort syns som text mot skärmkanten på den minsta skärmen — precis den
  risk PLAN.md pekar ut.
- `--content-padding` är `clamp(1rem, 5vw, 3rem)`, alltså aldrig under 16 px.
- **Varning inför paket 5:** regeln använder elementselektorerna `header` och
  `footer`. Hamnar ett `<footer>` inuti ett projektkort får det oväntad
  sidomarginal. Det är den risk beslutet bär. Använd `<div>` eller en
  modulklass inuti kort — spara `<footer>` till sidans egen footer.
- Behöver något i framtiden gå kant i kant (full bleed) gör den komponenten ett
  medvetet undantag med negativ marginal i sin egen modul. Inget sådant behov
  finns i planen i dag.

### Hero får grå bakgrund — beslutat av Jelal 2026-10-05

Jelal har valt att **hero**, inte Kompetenser, är "första sektionen" och ska ha
samma grå ton som headern. Header och hero blir alltså **ett sammanhängande grått
fält**, och den mörka bottnen börjar först vid Kompetenser.

#### Var bakgrunden sätts

**I `Hero.module.css`, på heros egen sektionsklass.** `Hero.jsx` renderar sin egen
`<section id={HERO_ID}>`, så komponenten äger sitt eget utseende.

Byggaren använder **den klass som redan finns** — jag namnger den inte. Två gånger
i rad har jag skrivit klassnamn ur minnet som koden inte haft.

Inte i `global.css`. En regel som gäller alla sektioner ska inte bära ett
specialfall; det är samma skäl som gjorde `section[id] + section[id]` till en
syskonselektor i stället för ett undantag för hero.

Noterat att `section#hero` i dag har `rgba(0,0,0,0)` och visar `body` igenom.
Byggaren upptäckte det när dess luminansfunktion läste genomskinligt som svart —
värt att minnas nästa gång något mäts: **genomskinlig är inte en färg, och en
mätfunktion som tolkar den som svart ljuger tyst.**

#### Varför tokenet delas

`--color-surface-raised` bar tre jobb: headerns band, heros bakgrund och hover på
kort. **Det delas i två.**

| Token | Bär | Värde |
|-------|-----|-------|
| `--color-bg-top` | headern + hero, ett sammanhängande fält | `#2A2A2E` |
| ~~`--color-surface-raised`~~ | ~~hover på kort~~ — **borttaget, ingen konsument** | — |

> **Efterskrift.** Delningens värde var att **bryta ut** `--color-bg-top` till ett
> eget begrepp, inte att bevara andra halvan. När granskaren konstaterade att
> `--color-surface-raised` saknade konsument togs den bort. Beslutet att dela står
> kvar och var rätt; det som återstod av den gamla tokenen var ett dött fält.

Jag avvisade tidigare att dela `--color-text` när den fick bära både brödtext och
profilbildens vita streck. **Här är kopplingen av en annan sort, och skillnaden är
hela poängen:**

- Brödtext och det vita strecket lyder under **samma villkor** — sidans ljusaste
  ton mot mörk botten. `--color-text` kan inte driva iväg åt ett håll som skadar
  strecket utan att hela sidan går sönder. Delad begränsning.
- Headerns band och hover på kort delar **ingenting** utom ett hexvärde just nu.
  Ett återkopplingsläge på ett kort och sidans största bakgrundsyta har inga
  gemensamma villkor. Ändrar Jelal den gråa tonen ska kortens hover inte följa
  med. Sammanträffande.

**Testet är inte "ser de likadana ut" utan "vill vi ändra dem tillsammans".**
Header och hero: ja, alltid — de är samma yta. Hover på kort: nej.

Namnet `--color-bg-top` parar med `--color-bg`: den mörka bottnen och det gråa
övre fältet, båda sidbakgrunder. `surface-raised` betyder upphöjd yta, vilket
passade ett 64 px-band men beskriver inte sidans största område.

#### Gränsen hero → Kompetenser bär dubbel markering — avsiktligt

Där möts nu både `section[id] + section[id]`-linjen och ett färgsteg från grått
till mörkt, medan de två andra sektionsgränserna bara har linjen.

**Det är rätt, och det är ett val.** Gränsen mellan presentation och innehåll är
en annan sorts gräns än den mellan två innehållssektioner. Att den starkaste
gränsen på sidan också är den tydligast markerade är hierarki, inte slump.

Alternativet — att släcka linjen just där med `#hero + section[id]` — avfärdas på
två grunder: det inför ett id-specifikt undantag i en regel som i dag är
id-oberoende, och det hade gett sidans viktigaste gräns dess svagaste markering.

#### Cirkeln mot grå botten

**Det vita strecket klarar sig väl.** `#EDEDEF` mot `#1C1C1F` ger **14,5:1**, mot
tidigare 16,8:1 mot `#0B0B0C`. Skillnaden är marginell och strecket förblir
omisskännligt.

**Tonplattan är den verkliga frågan.** `rgba(32, 32, 36, 0.45)` togs fram mot en
mörk omgivning. Bilden är ett gråskalat porträtt i mörk kavaj mot ljusgrå vägg, och
mot grå botten gäller ungefär detta:

| Område i bilden | Mot `--color-bg-top` |
|-----------------|----------------------|
| Den ljusa väggen efter tonplattan | ca 2,8:1 — mjuk men synlig kant |
| Den mörka kavajen efter tonplattan | ca 1,05:1 — går i praktiken ihop med bakgrunden |

**Det accepteras, och det är avsiktligt:** tonplattans uppgift är tonal, att låta
fotot sjunka in i sidans palett. **Strecket är det som definierar bilden som ett
objekt.** Att kavajen smälter in blir en vinjetteffekt snarare än ett fel, så
länge cirkelns form är tydlig — och det är den, med 14,5:1.

**Men talen ovan är uppskattade, inte uppmätta.** Byggaren ska mäta den renderade
kontrasten mellan bildens ljusaste och mörkaste parti och hero-bakgrunden, och
rapportera båda. Ser cirkeln ut som en fläck snarare än ett porträtt är rätt
åtgärd att **sänka tonplattans opacitet** så att fotot behåller mer av sitt eget
omfång — inte att ändra bakgrunden Jelal just valt, och inte att göra strecket
tjockare.

### Sektionsavgränsare — beslutat av Jelal 2026-10-03

Jelals ord: *"mellan varje sektion dra en liten och tunn streck så man ser vart
sektionerna är på sidan"*. Det upphäver rättelse 6. Hans beslut gäller — han har
sett sidan, jag resonerade om den.

**Regeln, i `global.css`, intill de andra sektionsreglerna:**

```css
section[id] + section[id] {
  border-top: 1px solid var(--color-border);
}
```

**Varför syskonselektorn och inte bara `border-top` på alla sektioner.** Hero är
första sektionen och ligger direkt under headern, som redan har en
`border-bottom`. En regel på alla sektioner hade gett två linjer med bara
headerns höjd emellan — en dubbellinje precis där blicken landar först.

`section[id] + section[id]` träffar varje sektion **som följer på en annan**,
alltså skills, projects och contact. Det blir exakt tre linjer, en mellan varje
par. Det är ordagrant vad Jelal bad om, utan ett hårdkodat undantag för hero och
utan att regeln behöver känna till något id.

| Gräns | Linje kommer från |
|-------|-------------------|
| header → hero | headerns egen `border-bottom` |
| hero → skills | `section[id] + section[id]` |
| skills → projects | `section[id] + section[id]` |
| projects → contact | `section[id] + section[id]` |
| contact → footer | footerns egen `border-top` |

**Footern dubbleras inte.** `<footer>` är ingen `section[id]`, så syskonregeln
träffar den inte. Dess befintliga `border-top` står kvar och ger linjen mellan
contact och footer. Byggaren ska kontrollera att footerns kant är **samma**
`1px solid var(--color-border)` som den nya regeln, annars syns två olika
linjetjocklekar eller toner på samma sida.

**Färg: `var(--color-border)`, samma som headern.** Inget nytt token. Jelal ville
se sektionsgränserna, så en linje som knappt syns missar hans faktiska önskemål.
Läser den tung när han ser den är rätt åtgärd ett nytt `--color-divider`-token —
**inte** ett inline-värde, och inte att sänka `--color-border`, som också styr
outline-pillarnas ram.

**Full bredd, inte innehållsbredd.** Linjen går kant i kant eftersom `border-top`
på `section[id]` ligger utanför sektionens `padding-inline`.

Innehållsbredd övervägdes och valdes bort. Den hade sett något mer avsiktlig ut,
men krävt antingen att regeln upprepas i fyra modulfiler på `.inner` — samma
driftrisk som fick sidmarginalen att ligga globalt — eller ett pseudoelement med
negativa marginaler som motverkar `padding-block`. Båda är dyrare än den
estetiska vinsten. Full bredd är dessutom konsekvent med headerns linje, som också
går kant i kant.

**Ingen `.section`-klass återinförs.** Linjen sätts med elementselektorn i
`global.css`, där sidmarginal, `padding-block` och `scroll-margin-top` redan bor.
Allt som gäller *varje sektion* ska stå på ett ställe. En klass som bara bär en
kant blir ett andra hem för sektionsregler, och då är frågan "var sitter det?"
tillbaka.

**Verifiering:**

1. Räkna linjerna i renderad sida: **tre** mellan sektionerna, plus footerns.
2. Bekräfta att det inte finns någon dubbellinje under headern.
3. Syskonselektorn förutsätter att sektionerna är direkta syskon utan främmande
   element emellan. Läggs något in mellan dem i `<main>` bryts kedjan **tyst** —
   linjen försvinner utan felmeddelande. Kontrollera punkt 1 på nytt varje gång
   `App.jsx` ändras.

### Headerns logotyp — beslutat efter paket 1

`logo.png` är en **lockup**, inte ett rent monogram: JQ-märket, texten
"JelalQaiumi" i vitt och ett kort orange streck. I 44 × 44 px blir ordbilden en
suddig rad som varken går att läsa eller att markera.

**Beslut av Jelal 2026-10-02 (se `BRIEF.md`, "Loggan i headern"): alternativ (b).**
Headern visar JQ-**monogrammet** som beskuren ikon, och namnet "Jelal Qaiumi"
sätts bredvid som riktig HTML-text. Detta är Jelals eget beslut och omprövas inte.

Vinsten: ordbilden blir läsbar i stället för suddig, texten skalar med
användarens egen typsnittsstorlek, den går att markera och söka i, och
skärmläsaren får en riktig textnod i stället för att vara utlämnad åt en alt-text.

#### Headerns uppbyggnad

Loggan är **en enda länk** till `#hero` som innehåller två saker: ikonen och
namnet.

```
<a href="#hero">  [ikon 48×36]  [span: Jelal Qaiumi]  </a>
```

| Egenskap | Beslut |
|----------|--------|
| Ikonens storlek | **48 × 36 px** — se "Ikonens optiska storlek" nedan. `height: 36px; width: auto;` i CSS, och `width`/`height` på `<img>` satta till filens egna mått så att ingen layout shift uppstår |
| Ikonens `sizes` | **`sizes="48px"`** tillsammans med `srcset`. Utan `sizes` antar webbläsaren `100vw` och hämtar alltid den största filen — det är inte ett påhitt utan en nödvändig följd av att `srcset` anges i bredder |
| Avstånd ikon → text | `var(--space-3)` (12 px), via `gap` på länkens flexrad |
| Namnets typsnittsgrad | `var(--text-base)` (1 rem) |
| Namnets vikt | ~~`var(--weight-medium)`~~ **UPPHÄVT** — alltid 400. ~~Skiljs från navlänkarna med färg.~~ **Även färgen är upphävd**, se "Headern är enfärgad". |
| Namnets teckenavstånd | `0.04em` — ekar lockupens vida spärrning utan att bli en pastisch |
| Namnets färg | `var(--color-text)`. **Ingen orange.** Accenten hör till pills och fokus, och loggans eget monogram bär redan orangen. |
| Radbrytning | `white-space: nowrap`. Namnet får aldrig brytas till två rader i en 64 px hög header. |

#### Headern är enfärgad — beslutat 2026-10-05

Jelal vill ha navlänkarna vita: *"där uppe där det står kompetenser, projekt och
kontakt gör de till vitt så de syns ännu bättre."* Navlänkarna får
`var(--color-text)`.

Det upphäver den distinktion jag införde en stund tidigare, när vikten försvann:
namnet `--color-text`, navlänkarna `--color-text-muted`.

**Beslut: namnet får ingen ersättande distinktion. Headern är enfärgad.**

Jag hade kunnat försvara skillnaden med storlek eller versaler, men skulle då
lägga till ett tredje signalverktyg för att rädda en åtskillnad som **placeringen
redan gör**:

- Ikonen sitter 12 px från namnet, navlänkarna i andra änden av raden. Närheten
  binder märke och namn till en enhet långt innan färgen hinner säga något.
- Märke till vänster, navigation till höger är en konvention läsaren inte behöver
  få förklarad.
- Namnet är ett egennamn, navlänkarna är tre vanliga substantiv. Den skillnaden
  läses omedelbart.
- Under 600 px är namnet visuellt dolt ändå, så frågan finns bara på bred skärm.

Namnets `letter-spacing: 0.04em` står kvar. Den är en svag men verklig skillnad
mot navlänkarna, den fanns redan, och den ekar loggans spärrade ordbild. Det
räcker.

**Alternativet att i stället dämpa namnet avfärdas.** Det hade gjort identiteten
underordnad navigationen, vilket är fel ordning i en header.

#### Hover — mätningen säger tvärtom mot magkänslan

Oron var att orange hover skulle bli ett mindre tydligt steg mot nästan vitt än
mot dämpat grått. **Uträknat blir det tvärtom:**

| Viloläge → hover | Kontrastkvot |
|------------------|--------------|
| `--color-text-muted` `#A1A1A8` → `--color-accent` `#FC6F03` | **1,10:1** |
| `--color-text` `#EDEDEF` → `--color-accent` `#FC6F03` | **2,42:1** |

Dämpat grått och orange har nästan **samma ljushet** (relativ luminans 0,359 mot
0,321). Den gamla hovern var alltså i praktiken enbart ett kulörbyte, med knappt
någon ljushetsförändring. Vitt mot orange ändrar både kulör och ljushet, och är
mer än dubbelt så stort steg.

**Beslut: hover förblir `var(--color-accent)`. Ingen underlinje, ingen
accentfärgad underkant.** Jelals ändring gör hovern tydligare, inte svagare.

Byggaren ska ändå mäta och rapportera den renderade kvoten — talen ovan är
uträknade ur WCAG-luminans, inte avlästa i webbläsaren. Visar mätningen något
annat är underlinje det första alternativet, eftersom det inte kostar någon
färgdimension.

#### Distinktionsregister — vilket verktyg bär vilken skillnad

Namn-mot-nav-skillnaden flyttade från vikt till färg utan att någon skrev ner det,
och bröts därför av nästa färgändring utan förvarning. Den sortens följdbeslut är
osynliga för Jelal tills de spricker.

**Regel: när ett designverktyg tas bort eller ändras, skriv ner vilka
distinktioner som flyttade till vilket verktyg.** Då vet nästa ändring vad den
bär.

| Skillnad | Bärs i dag av | Bars tidigare av |
|----------|---------------|------------------|
| Namn mot navlänkar | placering + ikonens närhet + `0.04em` spärrning | vikt (500), sedan färg |
| Navlänk viloläge mot hover | kulör **och** ljushet (vit → orange) | enbart kulör (grått → orange) |
| Rubriknivå mot brödtext | storlek + spärrning + luft | vikt + storlek |
| Grupprubrik mot pills | versaler + spärrning + grad + dämpad färg | samma, plus vikt |
| Ifylld mot ej ifylld pill | fylld orange mot genomskinlig med ram | samma |

Tabellen uppdateras varje gång ett verktyg tas bort eller tas i anspråk. **Står en
skillnad kvar med bara en bärare är den sårbar** — det var exakt namnets läge
mellan de två senaste ändringarna.

**På smal skärm döljs namnet visuellt, inte semantiskt.** Under `600px` får
`<span>`-elementet mönstret "visually hidden" (1 px clip), **inte**
`display: none`. Skälet: på 360 px finns inte plats för ikon, namn och tre
navlänkar samtidigt, men namnet måste ändå finnas kvar i tillgänglighetsträdet —
annars blir länken namnlös för en skärmläsare precis på den skärm där den är
svårast att använda ändå.

Det ger också svaret på alt-frågan:

- Ikonen får **`alt=""` och `aria-hidden="true"`**, alltid, i alla bredder.
- Länkens tillgängliga namn kommer helt från `<span>`-texten. Därmed läses
  "Jelal Qaiumi" upp exakt en gång, aldrig två, och aldrig noll gånger.
- Ingen `aria-label` på länken — den hade bara dubblerat textnoden.

#### Ikonens optiska storlek — rättat efter paket 2B

Den kvadratiska 672-ikonen har 115 px genomskinlig luft upptill och nedtill,
eftersom märket är 592 × 442, alltså bredare än högt. I en 44 × 44-ruta blir det
synliga märket därför bara ca **39 × 29 px** och ser för litet ut bredvid namnet.
Det är en följd av mina beslutade tal, inte av bygget.

Att låta 44 px gälla märkets höjd i stället för rutans går inte: då blir rutan
44 × 672/442 ≈ 67 px hög och spräcker `--header-height: 64px`.

**Beslut: headern använder ett tajt, icke-kvadratiskt märke. Den kvadratiska
varianten behålls för favicon och apple-touch-icon, där kvadrat krävs.**

Samma script, samma tajta uttag — det skrivs bara ut före `extend()`-steget:

| Fil | Mått | Används till |
|-----|------|--------------|
| `logo-mark-tight-96.png` | 96 × 72 | Headern 1× och 2× |
| `logo-mark-tight-192.png` | 192 × 143 | Headern 3×–4× |

Höjden följer av bredden och bevarad proportion (592 : 442). Headern renderar dem
med `height: 36px; width: auto`, alltså ca 48 × 36 px — märket blir **24 % högre
optiskt** än med den kvadratiska varianten, och 36 px i en 64 px hög header lämnar
14 px luft över och under.

Genomförs i **paket 3**, inte som en egen omgång: header och hero ses tillsammans
vid Leverans 1, och det är då proportionerna ska stämma.

#### Navigeringen på smal skärm — förebyggande regel, inte en felrättning

> **Premissen i en tidigare version av detta avsnitt var fel.** Avsnittet sa att
> navlänkar försvann tyst under 480 px (360 px → bara "Kompetenser", 420 px → två
> av tre) och beskrev det som ett uppmätt fel. **Det felet har aldrig funnits.**
> Mätningen gjordes med Edges `--window-size`, som sätter fönstrets storlek och
> inte CSS-vyporten — sidan lades ut mot en bredare vyport och beskars sedan till
> 360 px, så länkarna låg utanför den beskurna bilden, inte utanför headern.
>
> Kontrollmätning med `Emulation.setDeviceMetricsOverride` visar alla tre
> länkarna synliga vid 360, 420 och 480 px — **både med `nowrap` och med det
> gamla `wrap`**, återinfört via injicerad CSS i den körande sidan. Navigeringen
> var aldrig trasig. Utrymmesbudgeten nedan stämde hela tiden.
>
> De uppmätta 360/420/480-talen ska också strykas ur kommentaren i
> `Header.module.css`, eftersom de beskriver ett fel som aldrig inträffade.

**Beslutet står ändå kvar**, men som det det är: en **förebyggande** regel, inte
en rättning. Motiveringen var aldrig beroende av felfyndet — den vilar på att wrap
inuti en låst höjd är en tyst felmekanism — och det argumentet är lika giltigt nu.
Skillnaden är att regeln skyddar mot något hypotetiskt i stället för något
observerat, och det ska dokumentet säga rakt ut.

**Regeln, i en mening: ingenting inuti headern får radbryta, eftersom headern har
låst höjd.** Det täcker både listan och den enskilda länken, så att ingen av dem
ser ut som en lapp för sig:

```css
/* Header.module.css */
.navList { flex-wrap: nowrap; }        /* listan bryter aldrig till ny rad */
.navLink { white-space: nowrap; }      /* etiketten bryter aldrig inuti sig själv */

/* under 600px */
font-size: var(--text-sm);             /* 14px i stället för 16 */
gap: var(--space-4);                   /* 16px i stället för 24 */
```

Byggarens `white-space: nowrap` på navlänken **godkänns och markeringen
`EJ I ARKITEKTUR` kan tas bort.** Den har exakt samma karaktär som `nowrap` på
listan: ett förebyggande försvar, inte svar på ett observerat fel. Utan den kan en
lång etikett brytas mitt i sig själv, bli två rader hög och klippas av precis som
en wrappad lista — samma felmekanism, bara en nivå ned. De två hör ihop och ska
motiveras av samma mening, inte var för sig.

Utrymmesbudget vid 360 px, så att nästa person kan räkna efter i stället för att
bedöma:

| Post | px |
|------|-----|
| Vyport | 360 |
| `clientWidth` efter rullningslist | **345** |
| − `--content-padding` × 2 (5vw av 360 = **18**, inte 16) | −36 |
| **Spaltbredd** | **309** |
| − ikon 48 + gap 12 | −60 |
| **Kvar till navet** | **249** |
| "Kompetenser" + "Projekt" + "Kontakt" vid 14 px | ~179 |
| 2 × `gap` 16 px | 32 |
| **Navet behöver** | **~211** |
| **Marginal** | **~38** |

> **Rättat.** Tabellen räknade tidigare med 16 px sidmarginal och landade på 328 px
> spaltbredd och ~57 px marginal. `--content-padding` är
> `clamp(1rem, 5vw, 3rem)`, och 5vw av 360 är **18**, inte 16 — 1rem binder först
> vid vyport ≤ 320. Dessutom saknades rullningslisten. **Rätt spaltbredd vid
> 360 px vyport är 309 px.** Marginalen är alltså 38 px, inte 57. Den håller
> fortfarande, men med en tredjedel mindre luft än jag trodde.

Namnet är redan visuellt dolt under 600 px och tar ingen plats. Budgeten är
bekräftad mot verklig rendering: alla tre länkarna är synliga vid 360 px.

**Varför `nowrap` behålls trots att inget fel fanns.** Wrap inuti en låst höjd är
en **tyst** felmekanism: innehållet försvinner nedåt, där ingenting mäter. Med
`nowrap` blir ett framtida överskridande i stället en vågrät överspillning — som
ger horisontell scroll, som redan fångas av en kontroll vi kör. Regeln byter alltså
ut ett osynligt felläge mot ett som larmar av sig självt. Storlekarna ger marginal
i dag; `nowrap` ser till att vi får veta den dag marginalen tar slut, i stället för
att länkar tyst försvinner.

Det är en billig regel — två rader CSS — mot ett dyrt felläge. Men den löser inget
som finns i dag, och den ska inte beskrivas som om den gjorde det.

Avfärdade alternativ, bedömda som om problemet vore verkligt:

- **(a) Låt headern växa.** Upphäver rättelse 4 och återinför glidningen mellan
  renderad höjd och `scroll-margin-top`.
- **(c) Vågrätt rullbar navrad.** En `overflow-x: auto`-container **absorberar**
  överspillningen, så sidan får ingen horisontell scroll och kontrollen passerar
  medan länkar ligger utanför synfältet. Det byter en tyst felmekanism mot en
  annan.
- **(d) Hamburgermeny.** Ett nytt interaktivt element med fokusfälla,
  Escape-hantering och `aria-expanded` — betydligt mer än en CSS-ändring, och det
  drar in paket 7:s tillgänglighetsarbete i förtid. Inga nya navposter är
  planerade. Behövs det någon gång är det ett eget beslut då, inte nu.

#### Verifiering av navigeringen — "ingen horisontell scroll" räcker INTE

`scrollWidth === clientWidth` bevisar att inget svämmar över åt sidan. Det säger
ingenting om innehåll som klipps bort **nedåt** i en låst höjd. Måttet kan alltså
vara uppfyllt medan navigeringen är obrukbar.

**Den kontrollen får aldrig ensam användas som bevis för att navigeringen
fungerar.** Använd denna, som mäter resultatet i stället för en följdeffekt:

Vid bredderna **360, 420, 480 och 600 px**, för **varje** navlänk:

1. `rect.width > 0 && rect.height > 0`
2. `rect.top >= headerRect.top`
3. `rect.bottom <= headerRect.bottom`

Alla tre ska gälla för alla länkar vid alla fyra bredderna. Punkt 3 är den som
fångar bortklippning i en låst höjd.

**Och vyporten måste bevisligen vara satt.** En skärmbild vid en viss bredd är
inte bevis för hur sidan beter sig vid den bredden. Edges `--window-size` sätter
**fönstrets** storlek, inte CSS-vyporten: sidan läggs ut bredare och beskärs
sedan, så innehåll kan ligga utanför bilden utan att ligga utanför sitt element.
Det var precis så det falska navfyndet uppstod.

Använd `Emulation.setDeviceMetricsOverride` eller motsvarande, och låt sidan
rapportera sitt eget `window.innerWidth` i samma mätning. **Mät elementens
rektanglar, tolka inte en bild.**

#### Fyra noteringar från paket 2B

- ~~**`apple-touch-icon`** hör hemma i paket 7 tillsammans med `<noscript>`.~~
  **UPPHÄVT** — läggs in **nu**, tillsammans med de två `rel="icon"`-raderna. Se
  "Utdatafiler för ikonen" för skälet: placeringen i paket 7 gjorde två genererade
  filer orefererade i `dist/` i tre paket.
- **`.visually-hidden-until-sm` i `global.css` godkänns.** En CSS-modul kan varken
  `composes` inuti en media query eller nå en global klass, så mönstret hade annars
  behövt stå på ett ställe och hävningen på ett annat. Det är **den andra och sista
  sanktionerade globala klassen** vid sidan av `.visually-hidden`. Markeringen
  `EJ I ARKITEKTUR` kan tas bort.
- **React 19:s automatiska `<link rel="preload" as="image">`** för ikonen är
  väntat beteende från ramverket, inte något byggaren skrivit. Ingen åtgärd, och
  den ska inte tas bort.
- **Mätta filstorlekar** är införda i tabellen över utdatafiler.

Mönstret "visually hidden" läggs som klassen `.visually-hidden` i `global.css`.
Det är ett **medvetet undantag** från regeln att `global.css` bara innehåller
reset och baselement: det är en tillgänglighetsprimitiv som paket 7 med stor
sannolikhet behöver igen, och den ska inte kopieras in i varje modul.

#### Beskärningen — blockdetektering, inte en höjdtröskel

`logo.png` är 1254 × 1254 px. De oranga pixlarna bildar **två skilda block** med
den vita ordbilden i glappet mellan dem:

| Block | Område | Andel av höjden | Med? |
|-------|--------|-----------------|------|
| Monogrammet JQ | x 323–914, **y 338–779** (592 × 442 px) | botten på **62,1 %** | **Ja** |
| Texten "JelalQaiumi" (vit) | i glappet y 780–914 | — | Nej |
| Korta strecket | **y 915–920** | **72,9 %** | Nej |

> **Rättad regel.** En tidigare version av detta avsnitt sa "sök bara i den
> översta 60 % av bilden". Den premissen var fel: monogrammets botten ligger på
> 62,1 %, alltså 27 px **nedanför** en 60 %-gräns. Q:ets nedåtgående svans hade
> klippts av, och eftersom rektangeln räknas fram ur underlaget hade både höjd
> och centrering blivit fel — **utan att något i bygget larmat**. Regeln nedan
> ersätter den.

Skriptet ska hitta blocken i stället för att gissa en tröskel:

1. Läs `logo.png` som raw pixels.
2. Markera varje bildrad som innehåller minst en **orange** pixel, alltså där
   `R - G >= 30 && R > 120`.

   > **Rättad tröskel.** Den tidigare lydelsen var `R > G && R > 120`. `R > G` är
   > inget mättnadstest — det passerar vilken nästan-neutral ljus pixel som helst.
   > Ordbilden är vit men inte neutral: 732 pixlar i y 836–872 passerade, t.ex.
   > `rgb(255, 252, 254)` med R−G = 1. Riktig orange i loggan har R−G = 62–159.
   > Tröskeln 30 ligger **24 steg över** den vitaste störningen och **32 steg
   > under** den minst mättade orangen, alltså med god marginal åt båda håll.

3. Gruppera de markerade raderna i sammanhängande block. Ett glapp på **mer än
   4 rader** bryter ett block. Med den rättade tröskeln ger det **exakt två**
   block: y 338–779 (monogrammet) och y 915–920 (strecket).
4. Välj det **högsta** blocket, alltså det med störst höjd i y-led. Det är
   monogrammet.
5. Räkna fram den omslutande rektangeln i både x- och y-led för **enbart det
   blocket**.
6. **Beskär tajt mot den rektangeln.** Ingen utvidgning mot källbilden, ingen
   kvadratisering i detta steg.
7. Kontrollera att rektangeln ryms inom bilden. Gör den inte det: avbryt med fel.
   Tysta inte ned det genom att klippa mot kanten.

Valet av blockdetektering framför en höjdtröskel: en tröskel någonstans mellan
63 % och 72 % hade fungerat på just den här filen, men den vilar på var saker
råkar sitta i en bild. Blockdetekteringen vilar bara på att monogrammet är det
största sammanhängande oranga partiet, vilket håller även om loggan görs om.

#### Kvadratisk form skapas med genomskinlig utfyllnad, inte mot källan

> **Rättad regel.** En tidigare version sa att uttaget skulle göras kvadratiskt
> **mot källbilden**: `left=283 top=223 width=672 height=672`, alltså y 223..894.
> Det var fel. Ordbilden "JelalQaiumi" ligger på x 403..849, **y 836..872** — det
> vill säga 37 px *inuti* den rutan. Alfa-formeln `(R−2)/250` ger vita pixlar
> (R=255) alfan ~1 och färgar dem `#FC6F03`, så ikonen hade fått en orange
> utsmetning av ordet "JelalQaiumi" längst ner. Precis det vi beskär bort den för
> att slippa — och den hade sett fullt rimlig ut i varje filstorlekskontroll.

Rutan går inte att krympa sig ur problemet. Monogrammet är 592 px brett men bara
442 px högt. En kvadrat som rymmer hela bredden måste ha sidan ≥ 592, alltså halva
sidan ≥ 296. Centrerad på monogrammets mitt (y 558,5) når underkanten 854,5, och
ordbilden börjar på 836. **Varje kvadratisk beskärning mot källbilden som rymmer
monogrammets bredd träffar ordbilden.** Det är geometriskt oundvikligt.

Den gällande metoden, i denna ordning:

1. **Beskär tajt till monogrammets bbox:**
   ```
   .extract({ left: 323, top: 338, width: 592, height: 442 })
   ```
   Ordbilden och strecket ligger utanför uttaget och kan inte komma med.
2. **Alfa-steget på det uttaget:** `alpha = clamp((R − 2) / 250, 0, 1)`,
   RGB = `#FC6F03` för varje pixel.
3. **Utvidga till kvadrat med helt genomskinlig utfyllnad:**
   ```
   .extend({
     top: 115, bottom: 115, left: 40, right: 40,
     background: { r: 0, g: 0, b: 0, alpha: 0 },
   })
   ```
   `(672 − 592) / 2 = 40` i sidled, `(672 − 442) / 2 = 115` i höjdled.

Resultatet är visuellt identiskt med den ursprungliga avsikten: samma 672 × 672,
samma luft runt märket, samma centrering. Skillnaden är att utfyllnaden består av
genomskinliga pixlar i stället för pixlar ur källbilden. Eftersom bottnen ändå ska
vara genomskinlig är skillnaden osynlig — förutom att ordbilden inte kan smyga
med.

Metoden har dessutom en egenskap den gamla saknade: den är **okänslig för vad som
råkar ligga runt monogrammet i källbilden**. Görs loggan om med ordbilden närmare
märket spelar det ingen roll.

#### Förväntat utfall — byggaren jämför mot detta

Skriptet ska skriva ut sina framräknade värden. De ska bli **exakt** dessa:

```
orange bbox, monogrammet:   x 323..914, y 338..779   (592 x 442 px)
antal orange block hittade: 2
valt block (högst):         y 338..779
tajt uttag:                 left=323 top=338 width=592 height=442
extend till kvadrat:        top=115 bottom=115 left=40 right=40  -> 672 x 672
```

**Avviker körningsutdraget från detta ska byggaren stanna och lämna tillbaka, inte
justera talen för hand.** Avvikelsen betyder att detekteringen gör något annat än
mätningen gjorde, och då är det regeln som ska redas ut — inte resultatet som ska
putsas.

**Två oberoende kontroller, båda ska stämma.** Blockantalet (= 2) och den
framräknade bboxen (x 323..914, y 338..779) kontrollerar samma sak från två håll.
Byggaren i paket 2B lät bboxen vara det som gatet vilade på och blockantalet bara
bli en utskriven upplysning — rimligt när tröskeln var trasig, men nu när den är
rättad ska **båda vara hårda kontroller**. Stämmer bboxen men inte blockantalet
har något i bilden ändrats som vi inte förstår, och det ska stoppa körningen.

#### Verifiering som fångar just detta fel

I den färdiga 672 × 672-bilden upptar märket raderna y 115–557 (`115 + 442 = 557`).

**Inga pixlar med alfa > 0 får finnas nedanför rad 557.** Finns det pixlar där har
ordbilden kommit med. Kontrollen körs på den genererade bilden, inte på källan,
och är det enda steget som skiljer en korrekt ikon från en som ser rimlig ut i
alla andra kontroller.

#### Utdatafiler för ikonen

Produceras av **samma** `scripts/optimize-images.mjs`, i paket 2B.
**`assets-source/logo.png` lämnas orört** — det bara läses, precis som
`assets-source/profile.jpg`.

| Fil | Mått | Format | Refereras från | Tak | Uppmätt |
|-----|------|--------|----------------|-----|---------|
| `logo-mark-32.png` | 32 × 32 | PNG med alfa | `<link rel="icon" sizes="32x32">` | ≤ 1 kB | 0,70 kB |
| `logo-mark-96.png` | 96 × 96 | PNG med alfa | `<link rel="icon" sizes="96x96">` | ≤ 4 kB | 2,32 kB |
| `logo-mark-192.png` | 192 × 192 | PNG med alfa | `<link rel="apple-touch-icon">` | ≤ 10 kB | 7,10 kB |

**Alla tre refereras från `index.html`, och raderna läggs in nu — inte i paket 7:**

```html
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo-mark-32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/logo-mark-96.png">
<link rel="apple-touch-icon" href="/assets/logo-mark-192.png">
```

> **UPPHÄVT: `<link rel="apple-touch-icon">` ligger i paket 7.** Den placeringen
> gjorde `logo-mark-96.png` och `logo-mark-192.png` orefererade i `dist/` i tre
> paket, vilket krockar med min egen gräns "noll orefererade filer".
>
> Alternativet hade varit ett namngivet undantag från gränsen fram till paket 7.
> Det avfärdas: ett undantag som lever i tre paket är ett undantag ingen längre
> minns varför det finns, och en gräns med undantag kontrolleras inte. Tre rader i
> `index.html` är billigare än en bevakad avvikelse. `<noscript>` och skip-länken
> ligger kvar i paket 7 — de är beteende, dessa är resurslänkar till filer vi
> redan levererar.

**Gränsen "noll orefererade filer i `dist/`" gäller därmed utan undantag.**

Samtliga ligger under sina tak med `png({ compressionLevel: 9 })` rakt av.

**Anvisningen om `png({ palette: true })` är struken.** Den var fel: mätningen i
paket 2B visar att paletten gör 32 px-filen **sämre** (1,02 → 1,27 kB) samtidigt
som den bara marginellt hjälper de större. Antagandet att "konstant RGB och bara
alfa varierar räcker för en palett" höll inte, eftersom RGB i praktiken inte var
konstant efter nedskalning — se steg 8 nedan. Behöver ett tak sänkas igen är rätt
åtgärd att mäta först, inte att nå efter paletten.

Ligger direkt i `public/assets/`, inte i `profile/`-mappen — det är inte ett
profilbildsderivat.

**Endast PNG, ingen WebP och ingen `<picture>`.** Motiv: märket är en platt
tvåfärgsgrafik där PNG redan blir några kB, favicon måste ändå vara PNG eller ICO,
och en `<picture>` med `<source>` för en 44 px ikon är ren överbyggnad. Headern
använder `srcset` med `96w`/`192w` och klarar sig på det.

Ingen `.ico` genereras. `<link rel="icon" type="image/png" href="/assets/logo-mark-32.png">`
räcker i alla webbläsare som är aktuella, och ICO hade krävt ett beroende till
utöver sharp.

#### Ikonen genereras med genomskinlig botten

Kontrollen av loggans bottenton är gjord och utfallet var negativt:

| Yta | Värde |
|-----|-------|
| `logo.png` botten (jämn över hela ytan, även i hörnen) | `#020202` rgb(2, 2, 2) |
| `--color-bg` | `#0B0B0C` rgb(11, 11, 12) |

Loggan är ~9 steg mörkare per kanal än sidan. Litet i siffror, men det sitter som
en hård rak kant mot en helt plan yta, och sådant ser ögat. En ikon med inbakad
botten hade alltså synts som en svagt mörkare kvadrat — precis det briefen
förbjuder med "loggan ligger direkt mot den mörka bottnen utan platta eller ram".

**Beslut: ikonen genereras med genomskinlig botten.** `--color-bg` förblir
`#0B0B0C` och är **inte** låst.

Det avfärdade alternativet var att sätta `--color-bg` till `#020202`. Det löser
symptomet men skapar ett dolt beroende: ändrar någon bakgrundstonen i paket 7,
eller lägger till en sektion med avvikande botten, är fyrkanten tillbaka — och
ingen hade förstått varför. Genomskinlighet gör ikonen oberoende av vad som
ligger bakom, nu och senare. Favicon-varianten blir dessutom bättre, eftersom
webbläsarens flikfält har en egen färg som vi inte styr över.

Underlaget är ovanligt tacksamt: inom beskärningen finns bara två färger plus
kantutjämning mellan dem, och röda kanalen bär hela övergången (2 → 252).

Steg i skriptet, i denna ordning:

1. `extract({ left: 323, top: 338, width: 592, height: 442 })` — det **tajta**
   uttaget, körs **före** alfa-steget. Se "Kvadratisk form skapas med genomskinlig
   utfyllnad" för varför det inte får vara kvadratiskt mot källan.
2. Läs ut pixlarna med `raw()`.
3. Räkna alfa per pixel: `alpha = clamp((R - 2) / 250, 0, 1)`, skalat till 0–255.
4. Sätt RGB till accentfärgen `#FC6F03` rakt av för **varje** pixel, och lägg den
   framräknade alfan som fjärde kanal. Resultatet är ett rent orange märke med
   mjuka kanter och helt genomskinlig botten, utan trappsteg.
5. Mata tillbaka bufferten till sharp som `raw({ width: 592, height: 442, channels: 4 })`.
6. `extend({ top: 115, bottom: 115, left: 40, right: 40, background: { r: 0, g: 0, b: 0, alpha: 0 } })`
   → 672 × 672 med genomskinlig utfyllnad.
7. **Först därefter** `resize()` till 192, 96 och 32. Alfan ska räknas på fullt
   underlag och skalas ned, inte tvärtom.
8. **Sätt RGB till `#FC6F03` igen, efter `resize()`, utan att röra alfakanalen.**
9. `png({ compressionLevel: 9 })`.

Alfan är rak, inte förmultiplicerad. Det är vad sharp förväntar sig av en
raw-buffer, och det är därför `resize()` i steg 7 inte ger mörka kantränder.

> **Steg 8 är en rättelse.** Min steglista satte RGB en gång, före nedskalningen,
> och förutsatte att värdet höll hela vägen. Det gör det inte: `resize()`
> interpolerar alla fyra kanalerna, så RGB driver isär. Mätning i paket 2B gav
> **106 / 204 / 219 distinkta RGB-värden** bland pixlar med alfa > 0, däribland
> `255,0,0`, `255,255,0` och `0,0,0`. Värsta avvikelsen satt på en **helt opak**
> pixel: `255,126,3` mot den pixelmätta accenten `252,111,3` — 15 steg fel i
> grönkanalen.
>
> Följden hade blivit svaga röd- och gulstick i kanterna och en heltäckande
> orange som inte längre matchar `--color-accent` i headern bredvid. Alltså
> precis det färgfel fyra mätningar lagts ned på att undvika.
>
> Steg 8 inför ingen ny regel — det **upprätthåller den invariant detta dokument
> redan påstår**, att märket är "ett rent orange märke". Att invarianten bara var
> beskriven och aldrig verkställd var felet.

**Verifiering av steg 8:** räkna antalet distinkta RGB-värden bland pixlar med
alfa > 0 i varje färdig fil. Det ska vara **exakt 1**, och det ska vara
`252, 111, 3`. Fler än ett betyder att steg 8 saknas eller körs i fel ordning.

**Kontrollen byggaren gör i paket 2B:** öppna ikonen både mot sidans bakgrund och
mot en klart avvikande ton (t.ex. vit), och bekräfta två saker — att ingen
fyrkant syns i någon av dem, och att kanterna är mjuka och inte taggiga. Syns en
fyrkant är alfan fel. Är kanterna taggiga har alfan trappats, troligen genom att
resize skett före alfa-steget.

Detta ligger i **paket 2B** enligt omskrivna PLAN.md, som delar paket 2 i 2A
(profilbilden) och 2B (monogram-ikonen + headerns ombyggnad). Lockup-frågan är
avgjord av Jelal och ska inte tas upp igen vid Leverans 1.

#### Känd skuld från paket 1

Paket 1:s header är byggd med **hela lockupen** `logo.png` i 44 × 44 px. Det var
rätt enligt arkitekturen som den såg ut då, och det är **inte ett nytt fel** —
granskaren ska inte rapportera det som ett sådant.

Skulden betalas i **paket 2B**, i samma svep som ikonen genereras: `Header.jsx` och
`Header.module.css` byggs om till ikon + textnod enligt tabellen ovan. Byggaren
vet alltså att den ska tillbaka till headern. Är ikonen av något skäl inte klar i
paket 2B flyttas ombyggnaden till paket 3, men inte längre än så — lockupen får
inte stå kvar till Leverans 1, eftersom det är just headern Jelal kommer att titta
på först.

### Rättelser efter granskningen av paket 1

`LARDOMAR.md` lämnar sju punkter tillbaka till arkitekten. Besluten är dessa.

> **Denna lista är bindande och ska bockas av punkt för punkt.**
> `LARDOMAR.md` och denna lista är **inte samma lista**. LARDOMAR beskriver
> *problem*, denna beskriver *besluten som löser dem* — och ett beslut kan gå
> längre än problemet. Att rätta mot LARDOMAR räcker därför inte: tre av de sju
> punkterna nedan genomfördes inte i första omgången just därför att byggaren
> rättade mot problemlistan i stället för mot denna. Gå igenom 1–7 och bekräfta
> var och en i överlämningen, även de som ser ut att redan vara gjorda.

**1. Sektions-id får aldrig stå som bokstavlig sträng i `.jsx`.**
`sections.js` exporterar namngivna konstanter som också används i arrayen, så att
det finns ett enda ställe per id:

```js
export const HERO_ID     = 'hero';
export const SKILLS_ID   = 'skills';
export const PROJECTS_ID = 'projects';
export const CONTACT_ID  = 'contact';

export const sections = [
  { id: SKILLS_ID, label: 'Kompetenser' },   // hero ligger INTE i listan
  // ...
];
```

Logga-länken importerar `HERO_ID` och skriver `href={'#' + HERO_ID}`. `Hero.jsx`
sätter `<section id={HERO_ID}>` ur samma konstant. Att bara exportera arrayen var
mitt fel — koden behövde ett enskilt id och fick ingen väg att hämta det, så
strängen skrevs av.

**2. Sidans `<h1>` får aldrig läsas ur `label`.**
`label` har bara två användningar: navlänk och `<h2>`. Hero har varken, och
**saknar därför `label` helt** — se beslutet om hero-posten i datamodellen.
`<h1>` skrivs i `Hero.jsx`. En platshållarrubrik ska innehålla den
riktiga rubriktexten, härledd ur `BRIEF.md` och flaggad i överlämningen, aldrig
ett navord.

**3. Komponenter hoppar över ofullständiga poster.**
Datafilerna handredigeras av en icke-utvecklare, och en typedef-kommentar har
ingen verkan. En komponent som renderar data ur `src/data/` ska **hoppa över**
poster som saknar ett obligatoriskt fält och rendera inget element alls — hellre
ingenting än ett tomt `<h2></h2>`. Det gäller `Section` (utan `title`), `Skills`
(skill utan `name`) och `Projects` (projekt utan `id`, `title` eller
`description`).

**4. Headerns höjd har en enda sanning.**
`Header.module.css` sätter `height: var(--header-height)` på header-elementet.
Ingen `min-height`, ingen höjd som växer med innehållet. Annars glider den
renderade höjden från det token som `scroll-margin-top` räknar med, och ankarhopp
landar under headern.

**5. ~~`overflow-wrap: break-word`~~ gäller `h1, h2, h3, p, li`.**
Inte bara brödtext. Rubrikerna är den största texten och spräcker 360 px-golvet
först. Min ursprungliga formulering sa "brödtext" och byggaren följde den
ordagrant — felet var mitt.

**UPPHÄVT i sak:** urvalet av element gäller, men **värdet är nu
`overflow-wrap: anywhere`**, och det räcker inte ensamt när föräldern är en grid.
Hela mekanismen står i "360 px-golvet och grid". Golvet verifieras med ett
avsiktligt långt ord, inte med sidans nuvarande text.

**6. ~~`border-top` mellan sektioner tas bort. Beslut: ingen linje.~~**
**UPPHÄVT av Jelal 2026-10-03.** Det ska finnas en linje mellan sektionerna. Se
"Sektionsavgränsare" nedan — det är den gällande beskrivningen.

Mitt skäl då var att linjen konkurrerade med orangen. Jelal har sett resultatet
och tycker att sektionerna flyter ihop. Han har tittat på sidan, jag resonerade om
den. **Ta inte bort linjen igen med hänvisning till denna punkt.**

**7. Headerns `z-index` blir ett token.**
`--z-header: 10` i `tokens.css`. Värdet byggaren valde är rätt, men ett löst tal i
en modulfil är ett tal ingen hittar nästa gång något ska ligga ovanför eller
under.

**Och en processregel som gäller mig lika mycket som byggaren:** varje värde som
byggaren väljer utan stöd i detta dokument skrivs i koden som
`/* EJ I ARKITEKTUR: <vad och varför> */` och listas i överlämningen. Två av
paket 1:s beslut (`border-top`, `z-index`) gjordes tyst och syntes bara för den
som läste koden. Hade de varit märkta hade de kommit till mig direkt.

**Markeringen tas bort så snart beslutet finns här.** Fem av paket 1:s nio
markeringar är nu felaktiga, antingen för att arkitekturen aldrig var tyst eller
för att frågan sedan dess är avgjord. Här är var och en och var beslutet står, så
att det inte uppstår en ny tvetydighet när markeringarna städas bort:

| Markering i koden | Status | Beslutet står i |
|-------------------|--------|-----------------|
| `border-top` mellan sektioner | Avgjort — **linje SKA finnas** (Jelal 2026-10-03) | "Sektionsavgränsare" |
| headerns `background-color: var(--color-bg)` | `var(--color-bg-top)` (Jelal 2026-10-03) | "Headerns bakgrund" |
| "`--color-surface-raised` — **inte** headern" | headern och hero använder `--color-bg-top` | "Varför tokenet delas" |
| `--color-surface-raised` på headern eller hero | `--color-bg-top`; `surface-raised` bär endast hover på kort | "Varför tokenet delas" |
| hero utan egen bakgrund (`rgba(0,0,0,0)`) | `--color-bg-top` i `Hero.module.css` | "Hero får grå bakgrund" |
| `--color-bg-top: #1C1C1F` | `#2A2A2E` (Jelal 2026-10-05) | "Det gråa fältet ljusnar" |
| headerns kant i `--color-border` | `--color-header-border` `#45454B`, ljusare än bandet | "Kanten måste byta riktning" |
| `minmax(280px, calc(--measure …))` på spåret | taket ligger på **kortet**, spåret är `1fr` | "Taket ligger på KORTET" |
| "kortet exakt så brett som texten vill" | **aldrig bredare** än texten vill | samma avsnitt |
| hårdkodad färg i `Skills.module.css` | `.surface-light` i `tokens.css` | "Ljus yta" |
| `--color-text-on-light` o.likn. som nya tokennamn | ombundna befintliga token | "Ljus yta" |
| `#D65B02` / `--color-accent` i `.surface-light` | `#FC6F03` överallt — Jelal återtog begäran | "De ifyllda pillarna" |
| `--color-surface-raised` | borttaget, ingen konsument | tokentabellen |
| `--color-accent-soft` | borttaget, ingen konsument | tokentabellen |
| `257 ifyllda` / `50 dämpade` som fast tal | levande data — läs filen | "Förväntat antal: 307" |
| `.surface-light` utan `background-color`/`color` | klassen måste måla, inte bara binda om | "Mekanismen" |
| `--weight-medium` / `--weight-bold` / `--weight-regular` | tokenen är borttagna, vikten är alltid 400 | "Typsnittet" |
| `font-weight: 500` / `600` / `700` | `font-weight: inherit`, aldrig syntetisk fetning | "Typsnittet" |
| `system-ui` som första typsnitt | `'Didact Gothic'` först, systemstacken som reserv | tokentabellen |
| navlänkar i `--color-text-muted` | `--color-text` (Jelal 2026-10-05) | "Headern är enfärgad" |
| "namnet skiljs från navlänkarna med färg" | ingen färgskillnad; placering + spärrning | "Headern är enfärgad" |
| `z-index: 10` på headern | Avgjort — blir token `--z-header: 10` | Rättelse 7 ovan + tokentabellen |
| `padding-inline` globalt | Avgjort — **ligger kvar globalt** | "Var sidmarginalen bor" |
| Loggans visningsstorlek | Avgjort — **48 × 36 px**, tajt märke | "Ikonens optiska storlek" |
| `<title>`-texten | Avgjort — `Jelal Qaiumi — Systemutvecklare` | "Bekräftat från paket 1" |

De fyra återstående markeringarna rör värden jag ännu inte tagit ställning till.
De ska stå kvar tills de finns i detta dokument.

### Validering av datafilerna — beslutat inför paket 4

Problemet är verkligt: granskaren hittade att en dubblett av ett sektions-`id` och
en post utan obligatoriskt fält båda renderas **tyst**, och det var med fyra
poster. I paket 4 blir det 93 handskrivna poster som Jelal själv redigerar. Att
lita på att någon tittar räcker inte.

**Beslut: ett valideringsskript i `scripts/`, inte en modul i `src/data/`.**

```
scripts/validate-data.mjs
npm run validate:data   →   node scripts/validate-data.mjs
"build": "node scripts/validate-data.mjs && vite build"
```

Skriptet kopplas alltså **in i `build`**. Då kan trasig data aldrig nå en
leverans, och paket 7 kör ändå en produktionsbyggnation som verifiering. Enbart
ett fristående script hade krävt att någon kommer ihåg att köra det, vilket är
samma svaghet som den manuella kontrollen har.

Varför `scripts/` och inte en modul i `src/data/`: regeln att `src/data/` bara
innehåller data är till för att Jelal ska kunna öppna vilken fil som helst där
och se enbart sitt eget innehåll. En valideringsmodul mitt bland datafilerna
hade brutit mot det. `scripts/` är redan platsen för verktyg som körs manuellt.

Skriptet kontrollerar:

| Fil | Aktiveras i | Kontroll |
|-----|-------------|----------|
| `sections.js` | paket 4 | `id` unika (`new Set(ids).size === ids.length`), `label` finns på **alla** poster, `HERO_ID` förekommer **inte** i listan |
| `skills.js` | paket 4 | Se "Validering av skills" nedan — korsreferens mot källistorna, unika namn, `filled` boolean, unika grupp-id, `title` finns, varje grupp ≥ 1 skill |
| `projects.js` | **paket 5** | `id` unika, `id`/`title`/`description` finns, `tech` är en array |
| `contact.js` | **paket 6** | `email` finns, varje `links`-post har `label` |

Felmeddelanden skrivs på svenska, namnger filen och det värde som är fel, och
skriptet avslutas med nollskild kod. Inga nya beroenden — ren Node.

#### Exakta felmeddelanden

Formatet är `<fil>: <vad som är fel> (<det felaktiga värdet>)`. Alla fel samlas
och skrivs ut tillsammans — skriptet stannar **inte** på det första, eftersom den
som redigerat 93 rader vill se alla sina misstag i en körning.

```
skills.js: namn ur skills-full.txt saknas och är inte sammanslaget ("Mocking")
skills.js: namn ur skills.txt saknas och är inte sammanslaget ("Flexbox")
skills.js: sammanslagning pekar på ett namn som inte finns ("CSS3" -> "CSS")
skills.js: namnet finns varken i skills.txt eller skills-full.txt ("Reakt")
skills.js: skill-namnet förekommer mer än en gång ("React")
skills.js: skill saknar name (grupp "webbutveckling-och-fullstack", post 4)
skills.js: filled måste vara true eller false ("React", fick "false")
skills.js: grupp-id förekommer mer än en gång ("react-byggstenar")
skills.js: grupp saknar title (id "react-byggstenar")
skills.js: grupp saknar skills eller är tom (id "react-byggstenar")

sections.js: id förekommer mer än en gång ("skills")
sections.js: label saknas (id "contact")

projects.js: id förekommer mer än en gång ("portfolio")
projects.js: projekt saknar obligatoriskt fält (id "portfolio", fält "description")
projects.js: tech måste vara en array (id "portfolio")

contact.js: email saknas
contact.js: länk saknar label (post 2)

Valideringen hittade 3 fel. Bygget avbryts.
```

Två saker som är lätta att få fel och därför ska stå uttryckligen:

- **`filled måste vara true eller false`** gäller också strängen `"false"`. Det är
  det troligaste misstaget när en icke-utvecklare redigerar, och det är ett fel
  som annars renderar som `true` eftersom en icke-tom sträng är sanningsvärd. Just
  därför visar meddelandet det mottagna värdet inom citattecken.
- **Antalskontrollen 93** gäller summan över alla grupper, inte per grupp.

Vid godkänd körning skrivs en rad, så att det syns att kontrollen faktiskt körts
och inte bara teg:

```
Validering OK: 3 sektioner, 18 grupper, 307 skills (265 ifyllda, 42 dämpade).
```

Den raden är inte kosmetisk. En validering som är tyst när allt är bra går inte
att skilja från en som inte kördes alls.

#### Validering av skills — korsreferens i stället för ett fast tal

Ett hårdkodat `93` var rätt när listan var frusen. Nu växer den, och **ett tal som
måste ändras varje gång Jelal lägger till en kompetens är en grind som kommer att
fallera av fel skäl.** Den lär oss att ignorera den.

**Beslut: totalantalet är en upplysning. Grinden är korsreferens mot källistorna.**

Skriptet läser `skills.txt` och `skills-full.txt` — de ligger i repot och är
Jelals egna — och kontrollerar:

| Grind | Innebörd |
|-------|----------|
| Varje namn i `skills-full.txt` finns i `skills.js`, **eller** står i `MERGED` | Inget av det Jelal sagt att han har kan tyst falla bort |
| Varje namn i `skills.txt` finns i `skills.js`, **eller** står i `MERGED` | Detsamma för den gamla listan |
| Varje `MERGED`-målnamn finns i `skills.js` | En sammanslagning kan inte peka i tomma luften |
| Varje namn i `skills.js` finns i någon av källistorna | Inget uppfunnet eller felstavat namn kan smyga in |
| Alla namn unika över hela filen | React-key och renderingen |
| Varje grupp: unikt `id`, `title` finns, minst en skill | |
| `filled` är `true` eller `false` | Inte strängen `"false"` |

`MERGED` är en uttrycklig tabell i skriptet över varje medvetet struken
nära-dubblett och vad den ersätts av:

```js
// Varje rad motsvarar ett beslut i ARKITEKTUR.md, "Nära-dubbletterna".
const MERGED = {
  'Code Review': 'Kodgranskning',
  'Kodgranskning / Code Review': 'Kodgranskning',
  'Authentication': 'Autentisering',
  'Agile development': 'Agil utveckling',
  'JavaScript': 'JavaScript (ES6+)',
  'Testdriven utveckling': 'Testdriven utveckling (TDD)',
  'SOLID': 'SOLID-principerna',
  'HTTP-metoder': 'HTTP-metoder (GET, POST, PUT, DELETE)',
  'GET': 'HTTP-metoder (GET, POST, PUT, DELETE)',
  'POST': 'HTTP-metoder (GET, POST, PUT, DELETE)',
  'PUT': 'HTTP-metoder (GET, POST, PUT, DELETE)',
  'Controllers': 'Controllers / API-endpoints',
  'Web API-utveckling': 'API-utveckling',
  'CSS3': 'CSS',
  'Pull requests': 'Pull Requests',
  'Dependency injection': 'Dependency Injection',
};
```

**Det här är kärnan i beslutet.** Varje struken post står i koden med sin ersättare
bredvid sig, inte bara i ett dokument. Den dag någon undrar vart `GET` tog vägen
finns svaret på raden. Och den dag Jelal lägger till en kompetens behöver ingen
röra en siffra — han lägger till den i `skills-full.txt` och i `skills.js`, och
grinden säger till om han bara gjorde det ena.

Säger Jelal nej till HTTP-sammanslagningen tas de fyra raderna bort ur `MERGED`,
`GET`/`POST`/`PUT`/`HTTP-metoder` läggs in som egna poster och den gamla strängen
stryks. Det är en avgränsad ändring på ett ställe.

#### Filer som ännu inte finns — explicit lista, inte tyst överhoppning

`projects.js` finns först i paket 5 och `contact.js` först i paket 6. Eftersom
skriptet sitter i `build` hade en saknad fil slagit ut hela byggnationen i paket 4
och 5. Det är exakt samma fel som `optimize:images`, och `LARDOMAR.md` förbjuder
det nu.

**Beslut: skriptet har en uttrycklig lista över aktiva kontroller högst upp.**

```js
// Lägg till en rad här i det paket där datafilen skapas.
const ACTIVE = [
  'sections',
  'skills',
  // 'projects',  <- avkommenteras i paket 5
  // 'contact',   <- avkommenteras i paket 6
];
```

Skriptet kontrollerar **bara** det som står i `ACTIVE`, och **avbryter med fel om
en fil i `ACTIVE` saknas**. Ett saknat `projects.js` i paket 4 är alltså tyst och
förväntat; ett saknat `projects.js` i paket 6 är ett fel som stoppar bygget.

Varför inte hoppa över saknade filer tyst: då hade en felstavad sökväg, en
raderad fil eller en byggare som glömde skapa datafilen sett ut som "allt är bra".
En validering som tiger när underlaget försvinner är värre än ingen validering,
för den ger falsk trygghet. Listan kostar en kommenterad rad per paket och gör
det omöjligt att av misstag tappa en kontroll.

**Paket 5 och 6 aktiverar sin egen kontroll.** Att avkommentera raden i `ACTIVE`
ingår i samma paket som skapar datafilen, precis som npm-scriptet gör. Det är en
rad, och den ska stå i paketets verifiering: kör `npm run build` och bekräfta att
den nya kontrollen faktiskt körs genom att tillfälligt bryta datafilen och se att
bygget stannar.

**Följd för datafilerna:** de måste förbli vanlig ESM som Node kan importera
direkt. Ingen import av CSS eller bilder, ingen `import.meta.env`, ingen
JSX. Det är ingen ny begränsning, bara en som nu har en konsekvens om den bryts.

Skapas i **paket 4**, tillsammans med npm-scriptet, enligt regeln att ett script
läggs till i samma paket som filen det anropar. Granskarens manuella kontroll
enligt `LARDOMAR.md` ligger kvar som extra nät — den automatiska kontrollen
ersätter den inte, den fångar bara felen tidigare.

### Headerns bakgrund — ~~avgjort~~ UPPHÄVT av Jelal 2026-10-03

~~`background-color: var(--color-bg)`. Loggan ska ligga direkt mot den mörka
bottnen utan platta.~~

**UPPHÄVT. Headern är grå: `background-color: var(--color-bg-top)`
(`#1C1C1F`).** Jelal har sett sidan och valt tonen själv, ur tre alternativ, utan
att bli styrd mot något av dem.

> **Återställ inte headern till `--color-bg` med hänvisning till detta avsnitt.**
> Det är precis det som hände med sektionslinjerna, fast åt andra hållet.

Värdet är exakt det som min **ursprungliga** tokentabell pekade ut för "sticky
header med bakgrund". Den tolkningen var alltså rätt från början — det var min
omprövning som var fel, inte byggarens ursprungliga läsning av tabellen.

```css
/* Header.module.css */
background-color: var(--color-bg-top);
border-bottom: 1px solid var(--color-border);
```

**Om briefens "utan platta eller ram".** Det var mitt skäl att ompröva, och jag
läste det för brett. Meningen gäller **loggan**: inget kort, ingen ram, ingen
rundad platta bakom själva märket. Ett grått headerband är sidans struktur, inte
en platta bakom loggan — märket ligger fortfarande direkt mot bandet utan ram runt
sig. Briefen och Jelals val är alltså förenliga, och ingen ändring av BRIEF.md är
nödvändig. Vill du ändå lägga in en förtydligande rad är den din att skriva; jag
ser inget krav på det.

**En tyst vinst som blir synlig här:** ikonen har genomskinlig botten. Hade den
haft loggans `#020202` inbakad hade Jelals gråa header gjort en svart fyrkant
runt märket fullt synlig. Beslutet togs av ett annat skäl och betalar sig nu.

Avgränsningen mot innehållet löses med en **hårfin kantlinje i botten**,
permanent. Granskarens invändning var riktig: en sticky header i exakt samma ton
som det som scrollar förbi under den gör att text glider in under headern och ser
ut att kapas mitt i tecknen. Med grå header gäller det argumentet svagare, men se
nästa avsnitt.

#### Det gråa fältet ljusnar till `#2A2A2E` — och kanten måste byta riktning

Jelal: *"Gör den lite ljusare grå."* Han valde `#1C1C1F` ur stegen
`#1C1C1F` / `#2A2A2E` / `#3A3A40`, så **"lite ljusare" är ett steg på den stege han
redan sett**: `--color-bg-top: #2A2A2E`.

Det kolliderar med `--color-border`, som är exakt `#2A2A2E`. Headerns
`border-bottom` hade blivit samma färg som sin egen bakgrund och **försvunnit
helt**.

Två vägar fanns, och jag valde den andra:

| Väg | Varför inte / varför |
|-----|----------------------|
| Stanna under `#2A2A2E`, t.ex. `#232327` | **Avfärdad.** Kantens kontrast sjunker då från 1,19:1 till **1,10:1** — linjen är i praktiken borta ändå, så vägen räddar inte det den finns för. Och den gör Jelals färgval till gisslan för ett token som inte har med saken att göra. |
| Gå till `#2A2A2E` och ge kanten ett eget, **ljusare** token | **Vald.** Löser problemet i stället för att väja för det. Kostar ett token. |

**`--color-header-border: #45454B`**, ljusare än bandet i stället för mörkare.

| Par | Kontrast |
|-----|----------|
| gammal kant `#2A2A2E` mot gammalt band `#1C1C1F` | 1,19:1 |
| gammal kant mot nytt band `#2A2A2E` | **1,00:1 — osynlig** |
| **ny kant `#45454B` mot nytt band `#2A2A2E`** | **1,50:1** |

Kanten blir alltså 26 % tydligare än den var innan ljusningen, inte svagare. Det
är befogat: den är nu den **enda** markören för var den klibbande headern slutar,
eftersom hero har samma ton.

Jag pekade tidigare ut `--color-header-border` som rätt åtgärd *om* kanten skulle
visa sig osynlig. Den blev osynlig, bevisligen och uträknat, så åtgärden utlöses
nu.

> **`--color-border` och `--color-bg-top` har nu samma hexvärde, `#2A2A2E`.** Det
> är ett sammanträffande, inte en koppling. Slå **inte** ihop dem. Testet är
> "vill vi ändra dem tillsammans" — en kantfärg på pills och kort och sidans övre
> bakgrundsfält har inga gemensamma villkor.

#### Vad ljusningen gör med allt annat — uträknat

| Vad | Mot `#1C1C1F` | Mot `#2A2A2E` | Bedömning |
|-----|---------------|---------------|-----------|
| Navlänkar och hero-rubrik (`--color-text`) | 14,54:1 | **12,22:1** | Långt över AAA (7:1) |
| Profilbildens vita streck | 14,5:1 | **12,22:1** | Omisskännligt |
| JQ-märket `#FC6F03` | 6,00:1 | **5,05:1** | Väl över 3:1 för grafik, läses tydligt |
| Dämpad text på bandet (`--color-text-muted`) | 6,63:1 | **5,57:1** | Klarar AA, under AAA — oförändrat läge, den var under AAA förut också |
| Fotots ljusa parti efter tonplattan | ca 2,78:1 | ca **2,34:1** | Sämre |
| Fotots mörka parti efter tonplattan | ca 1,05:1 | ca **1,25:1** | Bättre |

**Ingen gräns passeras.** Allt som bär text ligger kvar över AA, och det som låg
över AAA ligger kvar där.

**Men bedömningen om tonplattan skärps.** Ett ljusare band klämmer ihop fotots
omfång runt bakgrunden från båda håll — ljusa partier närmar sig bandet uppifrån,
mörka nedifrån. Bilden riskerar att läsa flackt snarare än som ett porträtt.
**Rekommendationen att sänka tonplattans opacitet står kvar och är nu mer sannolik
att behövas.** Byggaren mäter båda ytterligheterna i den renderade cirkeln och
rapporterar.

Talen är uträknade ur WCAG-luminans. Att min uträkning för JQ-märket mot
`#1C1C1F` ger exakt samma 6,00:1 som rapporterades oberoende är en välkommen
kontroll av att metoden stämmer.

#### Kanten behålls — och mitt tidigare skäl var fel fråga

> **Rättad motivering.** Jag försvarade kanten med att jämföra färgsteg: kanten
> mot hero gav 1,38:1 medan enbart färgskillnaden gav 1,16:1. **Den uträkningen
> besvarade fel fråga**, och den föll så snart hero blev grå — nu är kontrasten
> mellan de två ytorna 1,00:1 och kanten avgränsar inget färgfält alls.

Kantens uppgift var aldrig att skilja headerns färg från sidans. Den är att visa
**var den klibbande headern slutar, så att innehåll som glider in under den inte
ser ut att kapas mitt i tecknen.** Det var skälet jag skrev när den infördes, och
det skälet är oberoende av vilken färg hero har.

**Med grå hero blir uppgiften viktigare, inte mindre viktig.** Tidigare hjälpte
färgsteget till när mörkt innehåll passerade under headern. Nu finns inget steg
alls vid sidans topp, och kanten är den enda markören.

**Beslut: kanten står kvar, nu med `--color-header-border` (`#45454B`), 1,50:1 mot
bandet.** Se avsnittet ovan för hur den siffran kom till.

Byggaren ska mäta den renderade kontrasten och rapportera talet. Talen här är
uträknade ur WCAG-luminans, inte uppmätta, och de säger inget om hur tydlig ett
1 px-streck upplevs.

Varför en permanent linje och inte en som tonas in vid scroll: en scrollberoende
linje kräver antingen en scroll-lyssnare i JS — projektets första `useEffect`, för
en rent kosmetisk detalj — eller `animation-timeline: scroll()`, som är ojämnt
stödd. Vid sidans topp har hero generös `padding-block`, så linjen ligger mot
tomrum och stör inte. Den kostar en rad och inget annat.

Varför en permanent linje och inte en som tonas in vid scroll: en scrollberoende
linje kräver antingen en scroll-lyssnare i JS — projektets första `useEffect`, för
en rent kosmetisk detalj — eller `animation-timeline: scroll()`, som är ojämnt
stödd. Den permanenta kostar en rad och inget annat.

### Tre noteringar från granskningen

**1. `<noscript>` — ja, i paket 7.**
Sidan är helt klientrenderad och blir blank utan JavaScript. Det är en känd följd
av stackvalet, inte ett fel, men ett meddelande kostar ingenting. Läggs i
`index.html` direkt före `<div id="root">`. Exakt text, så att ingen formulerar
om den:

> Den här sidan behöver JavaScript för att visas. Slå på JavaScript i
> webbläsaren och ladda om sidan.

Paket 7 och inte paket 2, därför att paket 2 ska hållas på bilder. Det hör ihop
med robusthetsgenomgången.

**2. Skip-länk och `aria-current` — paket 7, nedskrivna nu.**

- **Skip-länk:** första fokuserbara elementet i `<body>`,
  `<a href={'#' + MAIN_ID}>Hoppa till innehållet</a>`. `<main id={MAIN_ID}>`.
  Länken döljs med samma `.visually-hidden` som headerns namn och blir synlig vid
  `:focus`. `MAIN_ID` exporteras ur `sections.js` tillsammans med sektions-id:na,
  så att regeln "inget id som bokstavlig sträng i `.jsx`" håller.
- **`aria-current`:** navlänken till den sektion som är i vy får
  `aria-current="true"` (inte `"page"` — det gäller sidor, inte avsnitt på en
  sida). Kräver en `IntersectionObserver` och blir därmed **projektets första
  `useEffect`**. Det är acceptabelt i paket 7, där den mobila navigationen ändå
  kan behöva state, men det ska vara ett medvetet val och inte smyga in tidigare.

Båda tillförs paket 7:s omfattning.

**3. Namnet i flera filer — ingen konstant.**
I dag står "Jelal Qaiumi" i `index.html` (`<title>`), `Header.jsx` (alt-text) och
`Footer.jsx`. Efter paket 2 försvinner alt-texten enligt mitt eget beslut
(ikonen får `alt=""` + `aria-hidden`), men namnet tillkommer i stället som synlig
textnod i headern. Det blir alltså fortsatt tre ställen, varav två i JS.

**Beslut: ingen delad konstant.** En `SITE_NAME` hade sett ut som en enda
sanning utan att vara det — `index.html` kan inte importera från JS, så `<title>`
hade ändå stått kvar som ett eget ställe. En abstraktion som bara täcker två av
tre förekomster är sämre än ingen, för den invaggar nästa läsare i tron att det
räcker att ändra på ett ställe.

I stället en checklista som gäller den dag namnet ändras:

| Fil | Förekomst |
|-----|-----------|
| `index.html` | `<title>Jelal Qaiumi — Systemutvecklare</title>` |
| `src/components/Header.jsx` | Synlig textnod bredvid ikonen |
| `src/components/Footer.jsx` | Namn i footern |

### Bekräftat från paket 1

Byggaren härledde två saker ur `BRIEF.md` som inte stod i arkitekturen. **Båda är
rätt och gäller nu som fastställda beslut** — de är inte längre något byggaren
"valt utan stöd" och ska därför inte bära någon `EJ I ARKITEKTUR`-markering:

- `<title>` = `Jelal Qaiumi — Systemutvecklare`. Namn + titel rakt ur briefen.
- ~~Logotypens visningsstorlek i headern = 44 × 44 px.~~ **UPPHÄVT** — gäller nu
  **48 × 36 px** med det tajta märket, se "Ikonens optiska storlek". Principen som
  står kvar: explicita `width`/`height` på `<img>` så att ingen layout shift
  uppstår.

Den tredje punkten — att hero-platshållarens `<h1>` renderar `label` — är
**struken**. Den var fel och är upphävd på två håll: av granskningens fynd 2 och
av beslutet om hero-posten, som tar bort `label` ur hero helt. `<h1>` skrivs i
`Hero.jsx` och får aldrig läsas ur `label`. En platshållarrubrik ska innehålla
riktig rubriktext, härledd ur `BRIEF.md` och flaggad i överlämningen.

Hero-platshållaren ligger inline i `App.jsx` med en kommentar om att den byts mot
`<Hero />` i paket 3. **Det är rätt väg fram till paket 3.** `Section.jsx` får inte
användas för hero, `Hero.jsx` tillhör paket 3, och `sections.js` är fortfarande
enda källan — inget `id` står skrivet två gånger. Lämna det som det är.

### Stilimport

`src/main.jsx` importerar i exakt denna ordning:

```js
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';
```

`fonts.css` först, så att `@font-face` är deklarerad innan något använder den.
Inga `@import` inuti CSS-filerna — ordningen ska vara synlig i JS. `global.css`
innehåller reset, baselement, `html`/`body`-färger och `section[id]`-regeln.
Allt annat ligger i modulfiler.

### Vilka filer som skapas i vilket paket

Skapa inga tomma filer i förväg.

| Paket | Filer |
|-------|-------|
| 1 | `index.html`, `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/styles/tokens.css`, `src/styles/global.css`, `src/data/sections.js`, `Header.jsx` + modul, `Section.jsx` + modul, `Footer.jsx` + modul, samt platshållar­rubriker för hero/skills/projects/contact |
| 2 | `scripts/optimize-images.mjs`, scriptraden `optimize:images` i `package.json`, `sharp` som devDependency, `public/assets/profile/*`, `public/assets/logo-mark-{32,96,192}.png`, `.visually-hidden` i `global.css` + ombyggnaden av `Header.jsx` + modul till ikon + textnod |
| 3 | `Hero.jsx` + `Hero.module.css` |
| 4 | `src/data/skills.js`, `Skills.jsx` + modul, `SkillPill.jsx` + modul, `scripts/validate-data.mjs` + `validate:data` i `package.json` + inkoppling i `build` |
| 5 | `src/data/projects.js`, `Projects.jsx` + modul, `ProjectCard.jsx` + modul, **`'projects'` aktiveras i `ACTIVE`** |
| 6 | `src/data/contact.js`, `Contact.jsx` + modul, **`'contact'` aktiveras i `ACTIVE`** |

---

## Bildoptimering (beslut för paket 2)

### Verktyg

`sharp` som **devDependency**, körs via ett engångsskript. ImageMagick finns inte
på maskinen. Skriptet ingår inte i `npm run build`.

```
npm run optimize:images   →   node scripts/optimize-images.mjs
```

**Scriptraden läggs till i `package.json` i paket 2, inte i paket 1.** Rättelse av
mappstrukturen ovan, som felaktigt placerade alla fyra scripten i paket 1.
Byggaren följde dokumentet bokstavligt och fick då ett `npm run optimize:images`
som pekade på en fil som inte fanns. Ett script som inte går att köra är sämre än
inget script: det ser ut som ett fel i miljön i stället för en uppgift som ligger
i nästa paket. Scriptraden, `scripts/optimize-images.mjs` och `sharp` tillkommer
alla tre samtidigt i paket 2.

### Källa och beskärning

Källa: `assets-source/profile.jpg`, 4688 × 5051 px, 3,7 MB. **Originalet skrivs
aldrig över.** Skriptet ska avbryta med fel om utdatasökvägen sammanfaller med
källan.

Steg i skriptet, i denna ordning:

1. `.rotate()` **först**, utan argument — autorotera efter EXIF. Görs före
   beskärningen, annars blir koordinaterna fel om bilden har en orienteringsflagga.
2. Läs metadata och kontrollera att måtten efter rotation är 4688 × 5051. Avvikelse
   → avbryt med tydligt felmeddelande i stället för att beskära blint.
3. Beskär till **4:5 stående** (bredd/höjd = 0,8), ankrad mot bildens övre del
   eftersom ansiktet sitter i övre tredjedelen:

   ```
   extract: { left: 584, top: 0, width: 3520, height: 4400 }
   ```
   (3520 / 4400 = 0,8 exakt. 584 + 3520 = 4104 ≤ 4688. 4400 ≤ 5051.)

   `left: 584` centrerar uttaget horisontellt. `top: 0` behåller huvudet högt upp
   och skär bort de nedersta 651 px, vilket placerar ansiktet nära en tredjedel in
   i bildrutan.

   > Dessa två tal är ett utgångsläge räknat på bildens mått, inte på en mätning
   > av var ansiktet faktiskt sitter. **Byggaren ska titta på resultatet och
   > justera `left`/`top` om motivet inte är centrerat eller om hjässan skärs av**,
   > samt skriva de slutliga värdena som kommentar i skriptet. Det är precis det
   > PLAN.md paket 2 kräver vid verifieringen.

4. Skala ned till varje målbredd med `fit: 'cover'` och höjd = bredd × 1,25.

### Utdatafiler

Katalog: `public/assets/profile/`. Refereras i JSX som `/assets/profile/<fil>`.

| Fil | Mått (px) | Format | Kvalitet | Målstorlek |
|-----|-----------|--------|----------|------------|
| `profile-400.webp` | 400 × 500 | WebP | `quality: 72` | ≤ 25 kB |
| `profile-800.webp` | 800 × 1000 | WebP | `quality: 72` | ≤ 70 kB |
| `profile-1200.webp` | 1200 × 1500 | WebP | `quality: 72` | ≤ 130 kB |
| `profile-400.jpg` | 400 × 500 | JPEG | `quality: 78, mozjpeg: true, progressive: true` | ≤ 40 kB |
| `profile-800.jpg` | 800 × 1000 | JPEG | samma | ≤ 110 kB |
| `profile-1200.jpg` | 1200 × 1500 | JPEG | samma | ≤ 190 kB |

Metadata strippas (sharps standard) — ingen EXIF, ingen GPS följer med ut.

**Varför just dessa bredder:** hero-bilden visas som mest ca 560 CSS-px bred på
desktop och ca 400 CSS-px på mobil. 400 täcker mobil 1×, 800 täcker mobil 2× och
desktop 1×, 1200 täcker desktop 2×. Större än så är bortkastade byte eftersom
bilden ändå gråtonas.

**Varför WebP + JPEG och inte AVIF:** WebP stöds av praktiskt taget alla
webbläsare och JPEG täcker resten. AVIF hade gett kanske 20 % till på en enda bild
— inte värt ett tredje format och tre filer till att hålla reda på.

**Webbläsaren laddar exakt en fil** via `<picture>` med `<source type="image/webp" srcset>`
och `<img srcset sizes>` som fallback. Byggaren sätter `width`/`height` på `<img>`
för att undvika layout shift.

### Profilbilden är rund — beslutat av Jelal 2026-10-05

Jelals ord: *"Kan du göra profilbilden som en rund ring så ansiktet syns och att
bilden inte är 4 kantigt?"*, förtydligat till **"bilden ska vara rund men en vit
kant utanför ringen"**. Alltså rund urklippning **plus en synlig vit ram**.

#### Beskärningen görs i CSS, inte med nya filer

De sex profilvarianterna är 4:5 stående och behålls oförändrade.

Klassen heter **`.media`** i `Hero.module.css` och har gjort det sedan paket 3.

```css
.media {
  width: 100%;
  max-width: 360px;          /* se "Diametern" — taket är brytpunktsberoende */
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--color-text);   /* det vita strecket */
  overflow: hidden;
  position: relative;        /* för tonplattans ::after */
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;   /* kvadrat tagen från ÖVERKANTEN */
}
```

`box-sizing: border-box` gäller globalt, så ramen räknas in i `max-width` och
lägger **ingen** bredd utanpå.

> **Rättat namn.** Jag skrev `.photo`. Klassen heter `.media` och finns på fyra
> ställen: `Hero.jsx`, `.media::after` som bär tonplattan, och en befintlig
> brytpunkt. Byggaren döpte med rätta **inte** om den — en omdöpning är ett eget
> beslut, inte något som görs i förbifarten för att arkitekten skrev fel namn.
>
> Det är andra gången i rad dokumentet namnger en klass koden inte har; förra
> gången `.brandName` mot `.logoName`. **Regel: jag hittar inte på klassnamn.
> Finns komponenten redan, används dess befintliga namn. Ska ett namn ändras är
> det ett eget beslut med egen motivering.**

**Varför överkanten och inte mitten.** Uppmätt i `profile-800.jpg` (800 × 1000):
hjässan på y = 142, axlarna på y = 528, huvudets mitt på y = 335, i sidled x = 412
(51,5 %). En kvadrat från överkanten (800 × 800) placerar huvudets mitt på
**335/800 = 41,9 %** av cirkelns höjd — strax ovanför mitten, vilket är där ett
ansikte hör hemma i en rund ram. `object-position: 50% 0%` räcker alltså, ingen
omplacering behövs.

| Val | Varför | Vad vi valde bort |
|-----|--------|-------------------|
| **CSS-beskärning** på de befintliga 4:5-filerna | Noll nya filer, noll ändring i `optimize-images.mjs`, ingen ny determinismverifiering, ingen risk att röra en kedja som nyss verifierats med elva tvingade grindar. Ingen kvalitetsförlust — `object-fit: cover` beskär, den skalar inte om. | Att **lägga till** tre kvadratiska varianter: då blir 4:5-filerna orefererade och bryter min egen gräns "noll orefererade filer i `dist/`" |
| | | Att **ersätta** 4:5-filerna med kvadratiska: tekniskt renast och sparar ca 20 % byte, men kostar skriptändring, omgenerering och omverifiering av determinism och samtliga grindar — för ca 14 kB på en leverans på 472 kB |

**Kostnaden skrivs ut så att den inte glöms:** webbläsaren hämtar hela 4:5-bilden
och visar 80 % av den. Det är ca **14 kB bortkastat** på den största varianten,
alltså omkring 3 % av leveransen.

**Blir `dist/`-budgeten någon gång trång är ersättningsvägen den rätta åtgärden** —
`extract` en kvadrat med `top: 0` ur originalet och byt ut de sex filerna, inte
lägg till. Att lägga till skapar orefererade filer. Det är en avgränsad ändring på
ett ställe och originalet ligger kvar i `assets-source/`.

#### Diametern — och felet att den krympte när skärmen växte

> **Rättat fel.** Ett enda `max-width: 420px` utan brytpunkt gav detta:
>
> | Vyport | Hero | Cirkel |
> |--------|------|--------|
> | 899 px | enspaltig, taket binder | **420 px** |
> | 900 px | tvåspaltig, spåret binder | **365,5 px** |
>
> Bilden blev alltså **mindre på en större skärm**. Vid 900 px byter hero till två
> spalter, och spåret `(795 − 64) / 2 = 365,5` är smalare än mitt tak på 420.
>
> Byggaren avvek inte — mitt CSS-block hade en enda regel utan brytpunkt och den
> följdes ordagrant. Den gamla koden hade
> `@media (min-width: 900px) { .media { max-width: none } }`, som fanns just för
> att skydda mot detta. Byggaren tog bort den eftersom den motsade mitt "420 px
> vid 1600" — korrekt beslut, men skyddet försvann med den, och jag hade inte
> ersatt det.

**Beslut: taket är lägre under brytpunkten än över den.**

```css
.media { width: 100%; max-width: 360px; }
@media (min-width: 900px) { .media { max-width: 420px; } }
```

**360 är inte ett valt tal utan ett härlett.** Spåret vid brytpunkten är 365,5 px.
Taket i enspaltsläget får inte överstiga det, annars krymper bilden i övergången.
360 ligger strax under, med marginal för avrundning.

Resultatet blir monotont — cirkeln växer eller står still, aldrig krymper:

| Vyport | Läge | Diameter |
|--------|------|----------|
| 360 px | enspaltig, spalten binder | **309 px** |
| 600 px | enspaltig, taket binder | 360 px |
| 899 px | enspaltig, taket binder | 360 px |
| 900 px | tvåspaltig, spåret binder | 365,5 px |
| ca 1015 px | tvåspaltig, taket tar över | 420 px |
| 1280 / 1600 px | tvåspaltig, taket binder | **420 px** |

Diametern är **relativ, aldrig fast**: `width: 100%` med ett tak. Ett fast
pixelmått är det enda sättet att spräcka 360 px-golvet med en cirkel, och den
möjligheten finns därmed inte.

Alternativet `max-width: none` över 900 px — den gamla kodens lösning — ger också
monotont beteende, men låter cirkeln växa till 528 px vid 1600. En cirkel upplevs
större än en rektangel med samma bredd, eftersom den saknar hörn som drar undan
blicken, och 528 px hade dominerat hero. Därför taket, inte `none`.

**De två talen 360 och 900 hör ihop med heros grid.** Ändras heros `gap`,
`--content-max` eller brytpunkten måste 360 räknas om — annars kommer krympningen
tillbaka tyst. Därför grinden i verifieringspunkt 5.

Vid 360 px vyport fyller cirkeln spalten. Det är avsiktligt — ett porträtt i hero
på mobil tål att vara stort. **Det är ett utseendeval och därmed preliminärt**
tills Jelal sett det; tycker han att det är för stort är taket på mobil en rad.

> **Rättade tal.** Jag skrev "328 px vid 360 px" och "ca 400 px vid 900 px". Båda
> var uträknade i huvudet och båda var fel. Spaltbredden vid 360 px vyport är
> **309 px**, inte 328: `--content-padding` är `clamp(1rem, 5vw, 3rem)` och 5vw av
> 360 är **18**, inte 16 — 1rem binder först vid vyport ≤ 320 — och rullningslisten
> tar 15 px till. Vid 900 px är spåret **365,5 px**, inte 400.

#### Gråskalan och tonplattan följer med in i cirkeln

`border-radius: 50%` plus `overflow: hidden` ligger på **behållaren**, inte på
`<img>`. Då klipps allt inuti av samma rundning — bilden, gråskalefiltret och
tonplattan, oavsett om tonplattan är ett `::after` eller ett eget element. Och
eftersom klippningen går vid padding-boxen hamnar tonplattan innanför det vita
strecket, aldrig över det.

Hade rundningen legat på `<img>` ensam hade ett separat overlay-lager blivit
kvar som en fyrkant ovanpå cirkeln. Det är den fällan som verifieringspunkt 3
nedan finns för.

Gråskalan och tonplattan är i övrigt oförändrade. De är beslutade och Jelal har
inte invänt.

#### Det vita strecket

Jelal preciserade till **"vit streck mena jag"**. Det är samma ord han använde om
sektionsavgränsarna — *"en liten och tunn streck"* — och samma avsikt. En linje
runt cirkeln, inte en bred vit kant.

**Tjocklek: 2 px.**

Sidans alla andra linjer är 1 px: headerns kant, de tre sektionsavgränsarna,
footern, outline-pillarnas ram. En cirkel tål lite mer än en rak linje, eftersom en
böjd 1 px-kontur kantutjämnas ut över flera delpixlar och tappar skärpa — den läses
som en skugga snarare än som ett streck. 2 px håller sig i det nedre spannet, läses
som avsiktlig, och börjar inte bli ett band. 3 px och uppåt läser som ram, vilket
är det han just avfärdade.

**Färg: `var(--color-text)` (`#EDEDEF`). Inget nytt token.**

Jag var först på väg att införa ett rent vitt token, med motiveringen att
`--color-text` betyder "textfärg" och att ge den ett andra, obesläktat jobb är
precis den sortens koppling som brast när namn-mot-nav flyttade från vikt till
färg.

Men kopplingen här är **inte** godtycklig. Båda användningarna lyder under samma
villkor: *sidans ljusaste ton mot mörk botten*. `--color-text` kan aldrig bli mörk
utan att hela sidan går sönder, så den kan aldrig driva iväg åt ett håll som
skadar strecket. Det är en delad begränsning, inte en tillfällighet — och då är ett
andra token bara en rad till att hålla synkroniserad.

Att en 2 px linje i `#EDEDEF` och en i `#FFFFFF` är omöjliga att skilja åt mot
mörkt underlag är ett stödjande skäl, inte huvudskälet. Hade de gått att skilja åt
hade jag ändå landat här.

**Hårdkodat `#FFFFFF` är avfärdat.** Sidan har noll hårdkodade färger utanför
`tokens.css`, och det är en egenskap värd att behålla.

#### Mekanismen: `border`, inte `outline` eller `box-shadow`

| Mekanism | Varför inte |
|----------|-------------|
| `outline` | `outline` är reserverad för `:focus-visible` i hela projektet. Att använda den dekorativt gör att två obeslättade saker ritar samma sorts kontur, och nästa person som felsöker en fokusmarkering hittar en dekoration. |
| `box-shadow: 0 0 0 2px` | Ligger **utanför** layouten. Strecket skulle sticka ut 2 px utanför elementets box och kan vid 360 px visuellt tangera skärmkanten utan att någon breddmätning fångar det. |
| **`border`** ✓ | Deltar i layouten, följer `border-radius` nativt, och med `box-sizing: border-box` ryms den inom `max-width` utan att lägga en enda pixel utanpå. |

**`border` löser dessutom tonplatte-problemet gratis, och det är det starkaste
skälet.** `overflow: hidden` klipper barn till **padding-boxen**, alltså innanför
ramen. Ett absolutpositionerat `::after { inset: 0 }` placeras också mot
padding-boxen. Tonplattan kan därför **aldrig** nå ut över strecket och gråa ner
det — det följer av boxmodellen, inte av att någon kommer ihåg det.

Med `box-shadow` hade strecket legat utanför och förblivit vitt av en annan
anledning; med en rundad `<img>` plus ett separat overlay-lager hade plattan
lagt sig över allt. `border` på behållaren är det enda av de tre alternativen där
rätt resultat är strukturellt garanterat.

**Byt inte mekanism** utan att läsa om detta stycke. De tre ger olika rundning,
olika layoutpåverkan och olika förhållande till tonplattan.

#### Verifiering

1. **Ansiktet ska rymmas i cirkeln.** Mät hjässans och axlarnas läge i den
   **renderade** cirkeln, inte i källbilden. Hjässan ska ligga innanför den övre
   bågen med marginal, och hakan får inte skäras av. Förväntat: huvudets mitt på
   ca 42 % av cirkelns höjd.
2. **360 px-golvet.** `scrollWidth === clientWidth` vid 360 px med bevisad vyport.
   Kontrollera särskilt att ingen fast pixeldiameter har smugit in — det är det
   enda sättet cirkeln kan spräcka golvet.
3. **Tonplattan är rund och når inte strecket.** Bekräfta visuellt att ingen
   fyrkantig kant syns i något hörn av cirkeln, och att det vita strecket är vitt
   hela varvet — inte gråtonat någonstans. Syns en fyrkant är overlay-lagret inte
   klippt av behållarens rundning; är strecket grått ligger plattan utanför
   padding-boxen, vilket betyder att mekanismen har bytts.
4. **Strecket läggs inte till bredd.** Vid 360 px vyport ska cirkelns totala bredd
   vara **309 px inklusive de 2+2 px streck**, och bilden innanför 305 px — exakt
   4 px skillnad. Blir totalen 313 saknas `box-sizing: border-box` eller har någon
   bytt till `box-shadow`. (Invarianten är "spaltbredden inklusive strecket", inte
   "spalt + 4". Den höll även när mitt tal 328 var fel.)
5. **Diametern får aldrig minska när vyporten växer.** Mät cirkelns renderade
   bredd vid **360, 600, 899, 900, 1015, 1280 och 1600 px** och kontrollera att
   serien är icke-avtagande. 899 → 900 är den kritiska övergången.

   Detta är grinden mot att krympningen återkommer tyst den dag någon ändrar heros
   `gap`, `--content-max` eller brytpunkten. **Tvinga den att fallera en gång** —
   sätt tillfälligt taket under 900 px till 420 och bekräfta att kontrollen
   larmar — enligt regeln att en kontroll som aldrig setts fallera inte är en
   kontroll.

### Vad som INTE görs i bildskriptet

Gråskalan och den grå tonplattan bakas **inte** in i filerna. De görs i CSS i
paket 3 (`filter: grayscale(1) contrast(…)` plus ett overlay-lager med
`--color-overlay-grey`). Skälet: då går tonen att justera efter Jelals synpunkter
vid Leverans 1 utan att någon bild behöver genereras om.

`assets-source/logo.png` **skrivs aldrig över** — den läses, precis som
`assets-source/profile.jpg`. Däremot härleds monogram-ikonen ur den i paket 2B, se "Headerns
logotyp". En tidigare rad här sa att loggan inte rörs alls, med hänvisning till
den gamla PLAN.md; den var i direkt konflikt med ikonbeslutet och är struken.

---

## Beslutslogg

- **CSS Modules som enda CSS-strategi, med globala tokens i `:root`** — ger
  skopning gratis via Vite utan nytt beroende, och tokens kaskaderar ändå in i
  modulerna så de två inte krockar. En global BEM-fil valdes bort för att den
  kräver mänsklig disciplin som ingen kontrollerar. (påverkat av lärdom: nej —
  `LARDOMAR.md` finns inte)
- **Mörk bas `#0B0B0C`, accent `#FC6F03` som enda accentfärg** — temavalet är
  Jelals beslut 2026-10-02 och omprövas inte. Hexvärdet är **pixelmätt** ur
  `logo.png` (dominant nyans, 96 px), inte avläst och inte hämtat från briefens
  ungefärliga `#F57C20`/`#FF7A18`. Avvikelsen mot briefens värde var +7 / −13 /
  −29 per kanal — tillräckligt för att accenten synligt inte hade matchat loggan
  i headern. (påverkat av lärdom: nej)
- **Mörk text på orange pill, inte vit** — vit text på `#FC6F03` ger 2,83:1 och
  faller på WCAG AA; `#0B0B0C` på samma orange ger 6,95:1. Beslutat nu i stället
  för att upptäckas i tillgänglighetsgenomgången i paket 7. (påverkat av
  lärdom: nej)
- **Data i `.js`-moduler, inte JSON** — JSON tillåter varken kommentarer eller
  avslutande komma, och det är den vanligaste fällan när en människa redigerar 93
  rader för hand. `.js` låter oss skriva instruktionen till Jelal överst i den fil
  Jelal faktiskt öppnar. (påverkat av lärdom: nej)
- **`sections.js` som enda källa för både `id` och navlänk** — PLAN.md:s
  verifiering i paket 1 är att varje navlänk scrollar rätt. Två separata listor
  hade gjort det möjligt att stava fel på ett ställe. (påverkat av lärdom: nej)
- **Skill-posten har exakt två fält, `name` och `filled`** — briefens viktigaste
  krav är att Jelal ändrar ett tillstånd på ETT ställe. Varje extra fält är ett
  till ställe att göra fel på, och nivåangivelser är uttryckligen bortvalda i
  PLAN.md paket 4. (påverkat av lärdom: nej)
- **Project-posten har sex fält, inget mer** — `url` och `repoUrl` är med eftersom
  ett projektkort utan länk är meningslöst för den som ska visa upp något. Bild,
  årtal, kategori och filtrering är medvetet uteslutna: de står inte i planen.
  (påverkat av lärdom: nej)
- **`.rotate()` före `extract()` i bildskriptet** — annars blir beskärnings­
  koordinaterna fel på bilder med EXIF-orientering, och felet syns först som ett
  snedskuret ansikte. (påverkat av lärdom: nej)
- **Gråskalan görs i CSS, inte i bildfilen** — Leverans 1 finns för att fånga
  smakfrågor om tonen. Hade effekten bakats in i filen skulle varje synpunkt
  kräva en ny bildgenerering. (påverkat av lärdom: nej)
- **Inga runtime-beroenden utöver React och React-DOM** — briefen kräver
  motivering för varje beroende, och ingen av sidans delar behöver ett.
  (påverkat av lärdom: nej)
- **Sidmarginalen ligger globalt på `section[id]`, inte i varje modul** — golvet på
  360 px utan horisontell scroll är ett hårt krav. En regel på ett ställe gäller
  automatiskt även för sektioner som ännu inte har en modulfil. Fyra upprepningar
  hade gett fyra chanser att glömma, och den som glöms syns som text mot
  skärmkanten. Modulerna äger bara `max-width` + centrering. (påverkat av
  lärdom: nej)
- **Mallens linter (oxlint) behålls som den levereras** — faktarättning efter
  paket 1: Vite-mallen ger i dag oxlint, inte ESLint. Avsikten med beslutet var
  hooks-skydd till noll kostnad, och `react/rules-of-hooks: error` ger exakt det.
  Att byta till ESLint hade varit ett nytt beroende för ett skydd vi redan har.
  (påverkat av lärdom: nej)
- **`optimize:images` läggs till i paket 2, inte i paket 1** — ett script som
  pekar på en fil som inte finns ser ut som ett trasigt projekt i stället för en
  uppgift som ligger längre fram. Script, skriptfil och `sharp` tillkommer
  samtidigt. (påverkat av lärdom: nej)
- **Headern: beskuret JQ-monogram som bild + namnet som HTML-text** — Jelals eget
  beslut 2026-10-02. Lockupens ordbild blir oläslig i 44 px. Texten blir läsbar,
  markerbar och skalar med användarens typsnittsstorlek. Ikonen får `alt=""` +
  `aria-hidden`, så att namnet läses upp exakt en gång. (påverkat av lärdom: nej)
- **Namnet döljs med "visually hidden", inte `display: none`, under 600 px** — på
  360 px finns inte plats för ikon, namn och tre navlänkar, men länken får inte
  bli namnlös för en skärmläsare just på den smalaste skärmen. (påverkat av
  lärdom: nej)
- **Ikonens beskärning hittas med blockdetektering, inte med en höjdtröskel** —
  en första version av regeln sa "översta 60 %", men monogrammets botten ligger på
  62,1 %. Q:ets svans hade klippts av utan att något larmat. Blockdetektering
  vilar bara på att monogrammet är det största sammanhängande oranga partiet.
  Förväntat utfall står utskrivet så att avvikelse syns direkt. (påverkat av
  lärdom: se mönstret nedan)
- **Ikonen genereras med genomskinlig botten, `--color-bg` förblir `#0B0B0C`** —
  loggans botten är uppmätt till `#020202`, nio steg mörkare än sidan, så en
  inbakad botten hade synts som en svagt mörkare kvadrat mot en helt plan yta.
  Att i stället låsa `--color-bg` till `#020202` avfärdades: det löser symptomet
  men lägger en osynlig fälla för paket 7 och för varje framtida sektion med
  avvikande botten. Alfa räknas ur röda kanalen, som bär hela övergången 2 → 252.
  (påverkat av lärdom: se mönstret nedan)
- **Hero-posten tappar `label` (alternativ C), hero stannar kvar i `sections`** —
  fältet var dött efter fynd 2, och ett dött fält är samma sorts tvetydighet som
  orsakade fyndet. Att i stället lyfta ut hero (B) hade delat sidans ordning
  mellan `sections.js` och `App.jsx`, och det var att det fanns en enda lista att
  jämföra mot som gjorde fynd 1 upptäckbart. C ger samma skydd utan den kostnaden.
  (påverkat av lärdom: ja — fynd 1 och 2 i `LARDOMAR.md`)
- **Datavalidering som script i `scripts/`, inkopplat i `build`** — 93
  handredigerade poster utan något som larmar är en fälla, och granskaren visade
  att både dubbletter och saknade fält renderas tyst redan vid fyra poster. En
  modul i `src/data/` avfärdades: den mappen ska innehålla enbart Jelals eget
  innehåll. Inkopplingen i `build` väljs framför ett fristående script eftersom
  ett script någon måste komma ihåg har samma svaghet som en manuell kontroll.
  (påverkat av lärdom: ja — fynd 3 i `LARDOMAR.md`)
- **Valideringen har en uttrycklig `ACTIVE`-lista, hoppar inte över saknade filer
  tyst** — `projects.js` och `contact.js` finns först i paket 5 och 6, och
  skriptet sitter i `build`. Tyst överhoppning hade gjort att en felstavad sökväg
  eller en glömd datafil såg ut som "allt är bra" — en validering som tiger när
  underlaget försvinner ger falsk trygghet och är värre än ingen. Listan kostar en
  kommenterad rad per paket och gör det omöjligt att tappa en kontroll av misstag.
  (påverkat av lärdom: ja — samma klass av fel som `optimize:images`)
- ~~**Headern får `--color-bg`**~~ **UPPHÄVT: headern är grå,
  `--color-bg-top`** — Jelals val 2026-10-03 ur tre alternativ. Mitt skäl
  att ompröva var att briefens "utan platta eller ram" förbjöd en upphöjd ton; jag
  läste meningen för brett. Den gäller **loggan** — ingen ram runt märket — inte
  headerbandets färg. Min ursprungliga tokentabell hade alltså rätt hela tiden.
  Kanten behålls, se den räknade motiveringen. (påverkat av lärdom: ja)
- **Didact Gothic har en vikt, så vikt tas bort som designparameter** — Jelals val
  2026-10-03. `font-weight: inherit` på rubriker och `strong` stänger av
  webbläsarens standardfetning; syntetisk fetning är ingen design, den är en
  algoritm som smetar ut konturer. Hierarkin bärs i stället av storlek, färg,
  versaler, spärrning och luft — fem verktyg som alla redan fanns. De tre
  vikttokenen tas **bort**, inte omvärderas: ett token utan alternativ är dött
  fält. (påverkat av lärdom: ja — samma resonemang som när `inNav` togs bort)
- **Typsnittet självhostas, inte Google Fonts CDN** — noll externa anrop i runtime,
  besökarens IP skickas inte till tredje part, och sidan har i dag noll
  runtime-beroenden utöver React. Filen ligger i `src/styles/fonts/` och inte i
  `public/`, dels för att `public/` enligt egen regel bara innehåller genererat,
  dels för att en CSS-refererad fil får innehållshash och aldrig kan bli en
  orefererad fil i `dist/`. Endast `latin`-delmängden, med en ny grind som fångar
  tecken utanför den. (påverkat av lärdom: ja)
- **Cirkelns tak är lägre under heros brytpunkt än över den** — ett enda
  `max-width: 420px` gjorde bilden **mindre på en större skärm**, eftersom
  två-spaltsspåret vid 900 px är 365,5 px. Taket 360 under brytpunkten är härlett
  ur spåret, inte valt. Den gamla koden hade ett skydd mot just detta som togs bort
  av rätt skäl, utan att jag ersatte det. **Min första lärdom här — "det nya
  beslutet måste överta skyddet" — är upphävd av byggarens invändning:** skyddet
  satt i förhållandet mellan två regler, och förhållanden har ingen plats att bo
  på i CSS, så det gick inte att veta att det fanns. Det som räddade det var
  monotonikontrollen, inte en bättre kommentar. **Mät invarianten, dokumentera den
  inte bara.** (påverkat av lärdom: ja)
- **Hero får grå bakgrund, satt i `Hero.module.css`** — Jelals val 2026-10-05.
  Header och hero blir ett sammanhängande grått fält. Bakgrunden sätts av
  komponenten själv, inte som ett undantag i `section[id]` — en regel som gäller
  alla sektioner ska inte bära ett specialfall. (påverkat av lärdom: ja)
- **Headerns kant står kvar, men mitt gamla skäl var fel fråga** — jag försvarade
  den genom att jämföra färgsteg, och det argumentet föll när hero blev grå.
  Kantens uppgift var aldrig att skilja två färgfält utan att visa var den
  klibbande headern slutar, så att innehåll som glider in under den inte ser ut
  att kapas. **Med grå hero blir uppgiften viktigare, inte mindre viktig**, för nu
  finns inget färgsteg som hjälper till. (påverkat av lärdom: ja)
- **`--color-surface-raised` delas i två: `--color-bg-top` och sig själv** — och
  skillnaden mot när jag vägrade dela `--color-text` är hela poängen. Brödtext och
  det vita strecket lyder under samma villkor och kan inte divergera utan att
  sidan går sönder: delad begränsning. Headerns band och hover på kort delar
  ingenting utom ett hexvärde: sammanträffande. **Testet är inte "ser de likadana
  ut" utan "vill vi ändra dem tillsammans".** (påverkat av lärdom: ja)
- **Dubbel markering vid hero → Kompetenser behålls medvetet** — linje plus
  färgsteg, medan övriga sektionsgränser bara har linjen. Gränsen mellan
  presentation och innehåll är en annan sorts gräns, och att den starkaste
  gränsen är tydligast markerad är hierarki. Att släcka linjen just där hade
  krävt ett id-specifikt undantag i en id-oberoende regel. (påverkat av lärdom: nej)
- **Projektkortets tak ligger på kortet, inte på spåret (alt B, Jelals val)** —
  min formel och min tabell beskrev olika mekanismer, eftersom `auto-fit` räknar
  spår ur max-funktionen när den är definit: ett definit tak gav en lodrät stapel.
  Jag rättade också två egna påståenden som inte höll: taket är **aldrig bredare
  än** texten vill vara, inte "exakt så brett", och B ändrar sig **mindre än A**,
  inte "ungefär likadant". `--measure` är ett tak på radlängd, aldrig ett golv.
  (påverkat av lärdom: ja — en motivering som bär mer vikt än den tål spricker vid
  första mätning)
- **Ljus yta görs genom att binda om befintliga token på en klass, inte med nya
  tokennamn** — Jelals val 2026-10-05. Med egna namn hade `SkillPill` fått kunskap
  om ljus botten inbakad; med ombindning behöver ingen komponent ändras.
  Invändningen "en variabel betyder olika saker på olika ställen" gäller inte:
  `--color-text` har **ett** jobb, textens färg mot sin yta, och det är samma jobb
  i båda sammanhangen. Till skillnad från `--color-surface-raised`, som bar två
  obesläktade jobb och därför delades. (påverkat av lärdom: ja)
- **De dämpade pillarnas ljusa värden härleds ur kvoten, inte ur färgen** — ram
  1,41:1 mot vitt mot 1,38:1 mot mörkt, text 7,40:1 mot ca 7:1. Underordningen blir
  exakt lika stark på båda ytorna. Samma metod gör att sektionsavgränsaren löser
  sig själv i stället för att behöva ett specialfall. (påverkat av lärdom: nej)
- **`--color-accent` är `#FC6F03` överallt, trots 2,83:1 mot vitt** — Jelal bad om
  en mörkare variant, fick siffrorna och ångrade sig innan något syntes. Beslutet
  står alltså kvar oförändrat. **Men min motivering var till hälften fel:** jag
  skrev att problemet inte gick att lösa eftersom orange aldrig når 3:1 mot en
  ljus yta. Det stämmer för *den* orangen. Räknar man på mörkare toner finns ett
  fönster mellan `#EA6503` och `#D65B02` där både pillen och texten i den klarar
  sig — jag hade bara räknat på det ena av två motriktade krav. Tabellen står kvar
  som underlag. (påverkat av lärdom: ja — räkna på **båda** sidor av en avvägning
  innan den kallas omöjlig)
- **`--color-focus` binds om i `.surface-light` till `#C25102`** — ett eget token
  som inte följde med accenten, och mot vitt bara 2,832:1. Inget var fel i dag, för
  inget fokusbart element låg i den vita sektionen — men paket 7 och Jelals första
  projektlänk ändrar det. **Samma tal, 2,83, duger för den ifyllda pillen men inte
  för fokusringen:** pillen har tre signaler som bär tillståndet, ringen har en.
  **En kontrastkvot är inte godtagbar i sig — det beror på om signalen är
  redundant.** (påverkat av lärdom: ja)
- **Regel: när en ny yta införs prövas varje signalbärande token mot den ytan, inte
  bara de som används där i dag.** Jag band om sju token och missade det åttonde
  just för att inget element använde det ännu. Felet hade varit tyst om den mörkare
  orangen stått kvar — byggaren hittade det i en **kartläggning av läckage**, inte
  i en mätning av något som brast. Att leta efter vad som kan gå sönder är en annan
  sorts arbete än att verifiera att det inte gjorde det. (påverkat av lärdom: ja)
- **Fördelningen ifyllda/dämpade är levande data, inte ett arkitekturtal** — bara
  totalen 307 är strukturell. Antalet ändras varje gång Jelal markerar ett skill,
  och ett dokument som citerar det blir fel utan att någon gjort något fel.
  (påverkat av lärdom: ja — åtta rättade tal lärde mig att inte skriva ned sådant
  som rör sig)
- **`--color-surface-raised` och `--color-accent-soft` tas bort** — den saknade konsument efter att
  `--color-bg-top` bröts ut, respektive infördes "vid behov" utan behov.
  Delningens värde var att bryta ut det nya begreppet, inte att bevara andra
  halvan. **Ett token ska införas av en komponent som behöver det, inte i väntan
  på en** — tredje och fjärde gången samma regel tillämpas efter vikttokenen och
  `inNav`. (påverkat av lärdom: ja — dött fält tas bort)
- **Det gråa fältet ljusnar till `#2A2A2E`, och headerns kant byter riktning** —
  Jelals "lite ljusare" är ett steg på den stege han redan sett. Värdet kolliderar
  med `--color-border`, så kanten hade blivit osynlig. Att i stället stanna under
  `#2A2A2E` avfärdades: det hade sänkt kantens kontrast till 1,10:1, alltså inte
  räddat den, **och gjort Jelals färgval till gisslan för ett token som inte har
  med saken att göra.** `--color-header-border: #45454B` är ljusare än bandet och
  ger 1,50:1 — tydligare än före ljusningen. (påverkat av lärdom: ja)
- **Klassnamn hittas inte på.** Dokumentet har två gånger i rad namngett en klass
  koden inte har: `.photo` mot `.media`, `.brandName` mot `.logoName`. Finns
  komponenten redan används dess befintliga namn; ska ett namn ändras är det ett
  eget beslut med egen motivering, inte något som sker i förbifarten för att jag
  skrev fel. Byggaren gjorde rätt som inte döpte om. (påverkat av lärdom: ja)
- **Rotfel: `--content-padding` vid 360 px är 18 px, inte 16** — `clamp(1rem, 5vw, 3rem)`
  binder på `5vw` till och med vyport 320, inte 360. Samma antagande satt på två
  ställen och gav fel spaltbredd (328 i stället för 309) i både navets
  utrymmesbudget och cirkelns tabell. Navets marginal är 38 px, inte 57 — den
  håller, men med en tredjedel mindre luft än jag trodde. **Ett fel i en
  gemensam förutsättning yttrar sig på varje ställe som ärvt den; rätta
  förutsättningen, sök sedan på talet.** (påverkat av lärdom: ja — åttonde gången
  ett huvudräknat tal faller på mätning)
- **Profilbilden blir rund med CSS, inte med nya bildfiler** — `aspect-ratio: 1` +
  `object-position: 50% 0%` på de befintliga 4:5-filerna. Att lägga till
  kvadratiska varianter hade gjort 4:5-filerna orefererade och brutit min egen
  gräns; att ersätta dem hade krävt omgenerering och omverifiering av determinism
  och elva grindar för ca 14 kB. Kostnaden — 20 % bortkastade pixlar — är utskriven
  så att den inte glöms, med ersättningsvägen som rätt åtgärd om budgeten blir
  trång. (påverkat av lärdom: ja — rör inte en kedja som nyss verifierats)
- **Det vita strecket: 2 px `border` i `--color-text`, inget nytt token** — jag var
  på väg att införa ett rent vitt token, eftersom `--color-text` då hade fått ett
  andra obesläktat jobb. Men kopplingen är inte godtycklig: båda användningarna
  lyder under samma villkor, *sidans ljusaste ton mot mörk botten*. En delad
  begränsning är inte samma sak som en tillfällighet. `border` framför `outline`
  (reserverad för fokus) och `box-shadow` (ligger utanför layouten) — och `border`
  garanterar dessutom strukturellt att tonplattan inte kan gråa ner strecket,
  eftersom `overflow: hidden` klipper vid padding-boxen. (påverkat av lärdom: ja)
- **Headern är enfärgad: navlänkarna vita, namnet utan ersättande distinktion** —
  Jelals val 2026-10-05. Att lägga till ett tredje signalverktyg för att rädda
  namnets särskiljning hade varit överdesign: placering, ikonens närhet och den
  befintliga `0.04em`-spärrningen gör redan jobbet. Att i stället dämpa namnet
  avfärdades — det gör identiteten underordnad navigationen. (påverkat av lärdom:
  ja)
- **Hover förblir orange, och mätningen vände min förväntan** — oron var att
  orange mot nästan vitt skulle bli ett svagare steg än mot dämpat grått.
  Tvärtom: grått och orange har nästan samma ljushet (1,10:1), medan vitt mot
  orange ger 2,42:1. Den gamla hovern var i praktiken enbart ett kulörbyte.
  Ingen underlinje behövs. (påverkat av lärdom: ja — räkna, gissa inte)
- **Distinktionsregister: när ett designverktyg tas bort, skriv ner vilka
  skillnader som flyttade till vilket verktyg.** Namn-mot-nav flyttade från vikt
  till färg utan att någon antecknade det, och bröts därför av nästa färgändring
  utan förvarning. Följdbeslut av den typen är osynliga för Jelal tills de
  spricker — en tabell gör dem synliga innan. **Står en skillnad kvar med bara en
  bärare är den sårbar.** (påverkat av lärdom: ja)
- **Beslut om hur något SER UT är preliminära tills Jelal sett det renderat.** Tre
  gånger nu har han upphävt eller valt om ett utseendebeslut efter att ha sett
  sidan: loggans form, sektionslinjerna, headerns botten. Besluten var inte dåliga
  — de gällde saker som inte går att avgöra från ett dokument. **Märk
  utseendebeslut som preliminära och lägg fram alternativ i stället för att
  argumentera för ett**, så blir omtagen val i stället för rättelser. Det hade
  sparat två varv. (påverkat av lärdom: ja)
- **Ingen delad `SITE_NAME`-konstant för namnet** — `index.html` kan inte
  importera från JS, så en konstant hade täckt två av tre förekomster och sett ut
  som en enda sanning utan att vara det. En checklista över de tre ställena är
  ärligare än en abstraktion som inte håller. (påverkat av lärdom: nej)
- **Ikonen görs kvadratisk med `extend()` och genomskinlig utfyllnad, inte med en
  kvadratisk `extract()` mot källan** — ordbilden ligger på y 836–872 och hamnade
  37 px inuti den gamla rutan y 223–894, där alfa-formeln hade färgat de vita
  pixlarna orange. Problemet går inte att krympa sig ur: monogrammet är 592 × 442,
  så varje kvadrat som rymmer bredden når ned i ordbilden. `extend()` ger samma
  bild visuellt men kan inte få med något ur källan. (påverkat av lärdom: ja —
  se mönstret nedan)
- **360 px-golvet bärs av `overflow-wrap: anywhere` på `body`, ärvt nedåt** —
  `break-word` sänker inte `min-content` och var därför otillräckligt. Men
  selektorlistan `h1,h2,h3,p,li` var också fel: en uppräkning har alltid en lucka,
  och byggaren mätte att ett `<span>` med en lång sökväg sprack golvet med båda
  reglerna uppfyllda. `overflow-wrap` är ärvd, så en deklaration på `body` täcker
  även det som läggs till i morgon. De få ställen som **inte** får brytas säger det
  själva med `white-space: nowrap`. Säkert som standard med uttryckligt undantag,
  i stället för osäkert som standard med en lista att minnas.
  (påverkat av lärdom: ja — ÅTERFALL på 360 px-golvet)
- **`minmax(0, 1fr)` behålls som hygien, inte som golvets garant** — min
  motivering var en gissning och byggaren mätte bort den: spårets minimum gör
  **ingen** skillnad för en lång obruten sträng, eftersom ett krympt spår inte
  hindrar barnet från att svämma över det. Regeln är ändå värd sin rad: `1fr` är
  en välkänd fälla som biter i andra sammanhang. Den ska bara inte påstås lösa
  detta problem. (påverkat av lärdom: ja — sjunde gången "rimligt men oprövat"
  faller på mätning)
- **Varje kontroll ska bevisas kunna fallera** — byggaren körde ett negativt
  kontrollexperiment och visade att golvmätningen ger utslag (884 med `break-word`
  återinjicerat). Därmed är det godkända utfallet värt något. En kontroll som
  aldrig setts fallera är inte en kontroll utan ett påstående, och ingen av
  projektets sju tysta fel hade fångats av en sådan. (påverkat av lärdom: ja)
- **Grindar körs på bufferten före skrivning** — `LARDOMAR.md`:s "temporärkatalog,
  kontrollera, flytta" beskriver mekanik; invarianten är att målkatalogen är orörd
  när en kontroll fallerar. Buffertgrindning uppfyller den starkare: ingen
  temporärkatalog kan bli kvar och ingen skrivning sker före sista grinden.
  Bevisat med en tvingad fallering. (påverkat av lärdom: ja)
- **Favicon- och apple-touch-raderna läggs in nu, inte i paket 7** — placeringen i
  paket 7 gjorde två genererade filer orefererade i `dist/` i tre paket och krockade
  med min egen gräns "noll orefererade filer". Ett undantag som lever i tre paket
  är ett undantag ingen minns varför det finns, och en gräns med undantag
  kontrolleras inte. Tre rader i `index.html` är billigare än en bevakad avvikelse.
  (påverkat av lärdom: ja)
- **Källbilderna flyttas till `assets-source/`, utanför `public/`** — `public/` är
  Vites katalog för filer som kopieras rakt ut i leveransen, så originalen följde
  med ut och utgjorde 90 % av `dist/`. Hela poängen med paket 2A var att gå från
  3,7 MB till 177 kB. Att ett original "aldrig rörs" betyder inte att det ska
  publiceras — det var mitt tankefel. Originalen bevaras, bara publiceringen
  upphör. (påverkat av lärdom: ja)
- **`dist/`-storleken blir en verifieringspunkt i varje paket** — ingen mätte den
  på fyra paket, och felet var därför osynligt trots att det var 90 % av
  leveransen. Gränser: totalt ≤ 1 MB, enskild fil ≤ 300 kB, noll orefererade
  filer. (påverkat av lärdom: ja)
- **Hero-posten tas bort ur `sections`, och `inNav` med den** — skälet till
  alternativ C var att heros närvaro höll sidans ordning i en lista, och mätning
  visar att koden inte längre använder den till det. När hero försvinner har alla
  kvarvarande poster `inNav: true`, vilket gör även det fältet dött. Att ta bort
  det ena och låta det andra stå kvar hade varit att lära sig halva läxan.
  (påverkat av lärdom: ja)
- **"Upphävda beslut"-tabellen med förbjudna strängar** — dokumentet har tre
  gånger motsagt sina egna gällande beslut, och varje gång har någon hunnit bygga
  mot det upphävda. `LARDOMAR.md` märkte det ÅTERKOMMANDE (3+), vilket kräver en
  mekanisk kontroll. För ett markdown-dokument är den kontrollen en greppbar lista
  av förbjudna strängar plus konventionen att upphävd text märks `UPPHÄVT`.
  Raderna tas aldrig bort: en tom tabell går inte att skilja från en obevakad.
  (påverkat av lärdom: ja — ÅTERKOMMANDE (3+))
- **Kategoriindelningen specificeras som delta mot `skills-full.txt`, inte som en
  avskrift** — Jelals fil innehåller redan en placering för var och en av sina 292
  poster. Att skriva av 267 namn hit hade skapat en andra sanning som kan glida
  isär från hans, plus ~300 tillfällen att stava fel. Bara avvikelserna
  specificeras. (påverkat av lärdom: ja — två sanningar om samma sak)
- **Fyra ingrepp i Jelals 17 kategorier, inga fler** — `Utvecklingsprocess` löses
  upp (13 av 19 var dubbletter), `Övrigt` löses upp (en portfolio ska inte ha den
  rubriken och posterna hade riktiga hem), `Säker webbutveckling` delas och tar upp
  `Autentisering`, och React/mobil bryts ut i tre grupper. Varje upplöst kategoris
  innehåll har ett namngivet nytt hem. (påverkat av lärdom: nej)
- **Nära-dubbletter avgörs av en tregradig regel, inte från fall till fall** —
  svenskt före engelskt, annars mest korrekt information, annars nya listan. Utan
  en regel blir tolv enskilda smakbeslut som ingen kan granska. (påverkat av
  lärdom: nej)
- **Totalantalet skills blir en upplysning, korsreferens mot källistorna blir
  grinden** — ett hårdkodat tal måste ändras varje gång Jelal lägger till en
  kompetens och skulle fallera av fel skäl, vilket lär oss att ignorera det.
  `MERGED`-tabellen i skriptet gör dessutom varje struken nära-dubblett synlig i
  koden med sin ersättare bredvid sig. (påverkat av lärdom: ja — en grind som
  fallerar av fel skäl är värre än ingen)
- **Flerkolumn i stället för grid för de 18 grupperna** — grid gör alla kolumner
  lika höga som den högsta, och med grupper från 7 till drygt 30 poster ger det
  mycket tomrum. `columns` balanserar höjderna automatiskt, vilket är den enda
  inbyggda mekanism som gör det utan JS. Pillarnas grad sänks till `--text-xs`,
  den enda åtgärd som biter linjärt på 307 pills. **Höjdvinsten blev mindre än jag
  trodde** — uppmätt 2410 px vid 1280 och 6634 px vid 360, mot mina uppskattningar
  1200 respektive 2500. (påverkat av lärdom: nej)
- **Mönster, nionde gången: mina egna uppskattningar är inte mätningar.** Tre av
  de senaste fem felen kom inte från en bild utan från att jag räknade i huvudet
  och skrev resultatet som ett faktum: grid-spårets roll i golvet, antalet 308, och
  två höjduppskattningar som låg 2–2,7 gånger fel. Alla tre fångades av att någon
  mätte. **Varje tal i detta dokument som inte är uppmätt ska stå som uppskattning
  och vara märkt som sådant.** (påverkat av lärdom: ja)
- **Linje mellan sektionerna, satt med `section[id] + section[id]`** — Jelals
  beslut 2026-10-03 upphäver rättelse 6. Syskonselektorn väljs framför `border-top`
  på alla sektioner, eftersom hero ligger direkt under headerns `border-bottom` och
  en regel utan undantag hade gett en dubbellinje där blicken landar först. Full
  bredd framför innehållsbredd: innehållsbredd hade krävt antingen fyra upprepade
  modulregler eller ett pseudoelement med negativa marginaler, båda dyrare än den
  estetiska vinsten. (påverkat av lärdom: ja — regeln ligger på ett ställe, som
  sidmarginalen)
- **Teckenförklaringen vänds** — med de allra flesta orange är det dämpade undantaget,
  och en text om att "listan fylls i efter hand" beskriver inte längre det man ser.
  (påverkat av lärdom: nej)
- **Skills grupperas nästlat, inte platt med kategorifält** — ett `category`-fält
  per post hade varit 93 handskrivna strängar som var och en kan stavas fel, och
  en felstavning ger en skill som tyst försvinner eller en spök-kategori. Nästlat
  gör kategoritillhörigheten strukturell och därmed omöjlig att stava fel.
  Sökbarheten löses i stället av formateringsregeln "en skill per rad, `filled` på
  samma rad som `name`". (påverkat av lärdom: ja — tysta fel i handredigerad data)
- **Kategorinamnen bär abstraktionsnivån, ingen separat nivådimension** — "React
  Native — komponenter och API:er" säger redan vad `TouchableOpacity` är, utan att
  vi behöver rangordna Jelals poster. En uttrycklig nivåindelning hade i praktiken
  varit en nivåangivelse, vilket är bortvalt i både briefen och PLAN.md.
  (påverkat av lärdom: nej)
- **Pillen får radbryta inuti sig själv, till skillnad från navlänken** — i
  headern är höjden låst, så radbrytning klipper bort innehåll tyst; i
  skills-sektionen är höjden fri, så radbrytning är ofarlig medan utebliven
  radbrytning spräcker 360 px-golvet. Samma underliggande regel i båda fallen:
  **välj det felläge som syns.** (påverkat av lärdom: ja)
- **Förklarande rad under skills-rubriken, alltid renderad** — med noll ifyllda
  visar sektionen 93 dämpade pills och ingenting orange, vilket ser trasigt ut
  snarare än tomt. Raden villkoras **inte** på antalet ifyllda: en rad som
  försvinner av sig själv är ett tyst tillståndsbyte. Den är teckenförklaring, inte
  nivåangivelse, och krockar därför inte med planens bortval. Texten ska godkännas
  av Jelal. (påverkat av lärdom: ja)
- **Inget inuti headern får radbryta: `nowrap` på både listan och länken** —
  **förebyggande**, inte en rättning. Det fel som ursprungligen motiverade regeln
  visade sig aldrig ha funnits; mätningen var gjord med `--window-size`, som
  beskär bilden i stället för att sätta vyporten. Regeln behålls ändå, eftersom
  wrap inuti en låst höjd klipper innehåll nedåt där ingen kontroll tittar, medan
  `nowrap` ger en vågrät överspillning som redan fångas. Två rader CSS mot ett
  tyst felläge. Vågrätt rullbar nav (c) avfärdades eftersom en scrollcontainer
  absorberar överspillningen och gör felet tyst igen. (påverkat av lärdom: ja)
- **Processlärdom: en skärmbild är inte en mätning.** Det falska navfyndet uppstod
  av att fönsterstorlek förväxlades med CSS-vyport — sidan lades ut bredare och
  beskars, så länkarna låg utanför bilden men innanför headern. Progressionen
  1 → 2 → 3 länkar såg övertygande ut och ingenting larmade. Samma felklass som
  bildfelen nedan, med samma botemedel: mät det du faktiskt vill veta något om.
  Verifiera vyporten genom att låta sidan rapportera sitt eget `window.innerWidth`,
  och mät elementens rektanglar i stället för att tolka en bild. Formuleringen
  ägs av granskaren i `LARDOMAR.md`.
- **RGB sätts om efter `resize()`** — min steglista beskrev invarianten "ett rent
  orange märke" men verkställde den aldrig. `resize()` interpolerar alla fyra
  kanalerna; mätning gav upp till 219 distinkta RGB-värden och 15 steg fel i
  grönkanalen på en helt opak pixel. Anvisningen om `palette: true` är struken,
  den gjorde 32 px-filen sämre. (påverkat av lärdom: ja)
- **Tröskeln skärpt från `R > G` till `R − G ≥ 30`** — `R > G` är inget
  mättnadstest och släppte igenom 732 nästan-neutrala vita pixlar ur ordbilden.
  (påverkat av lärdom: ja)
- **Headerns ikon blir tajt och icke-kvadratisk, 48 × 36** — den kvadratiska
  varianten gav ett synligt märke på bara ca 39 × 29 px i en 44-ruta, eftersom
  märket är bredare än högt. Kvadraten behålls där kvadrat krävs: favicon och
  apple-touch. (påverkat av lärdom: nej)
- **Processlärdom: en risk som avfärdas med "fungerar i dag" ska få en utskriven
  brytpunkt.** Granskaren flaggade navets wrap-risk två gånger och båda gångerna
  blev bedömningen "fungerar i dag, spricker vid nästa ändring". Två rättelser
  senare sprack den. En risk utan mätbar brytpunkt går inte att bevaka och
  försvinner i bedömning. Formuleringen ägs av granskaren i `LARDOMAR.md`.
- **Mönster: sju antaganden, sju gånger fel vid mätning.** Accentfärgen
  (`#F57C20` avläst, `#FC6F03` uppmätt), beskärningsgränsen (60 % antaget,
  monogrammets botten på 62,1 %), bottenfärgen (antagen lika med `--color-bg`,
  uppmätt till `#020202`), ordbildens läge (antaget utanför beskärningen, uppmätt
  till 37 px innanför), blockantalet (två antagna, tre uppmätta), RGB efter
  `resize()` (antaget konstant, uppmätt till 219 värden), och grid-spårets roll i
  360 px-golvet (antagen avgörande, uppmätt till ingen alls).

  Alla sju delar en egenskap: **utdata såg rimlig ut i varje mätning vi gjorde.**
  Filstorlek, mått, format och "ingen horisontell scroll" stämde varje gång.
  Bara en kontroll av det faktiska innehållet i resultatet avslöjade dem.

  Därav att varje bildsteg i detta dokument numera har ett **förväntat utfall**
  och en **kontroll på den genererade filen**, inte på källan — och att
  navigeringens verifiering mäter länkarnas position i stället för en följdeffekt.
  Regeln framåt formuleras av granskaren i `LARDOMAR.md`.
- **Kontaktlänkar som `{ label, url }` med `url: null` som platshållare** — GitHub
  och LinkedIn är ännu ej givna. Med `null` kan Jelal fylla i dem på en rad senare,
  och filtret `url !== null` garanterar att en halvfärdig länk aldrig renderas.
  Alternativet, att utelämna dem helt tills de finns, hade tvingat någon att
  redigera datastrukturen i stället för att bara fylla i ett värde. (påverkat av
  lärdom: nej)

---

## Öppna punkter som INTE är arkitektens att besluta

- **GitHub- och LinkedIn-URL:er** är ännu ej givna av Jelal. De ligger som
  `url: null` i `src/data/contact.js` och fylls i av Jelal när de finns. Byggaren
  gissar inte en URL och renderar inte en tom länk. E-posten är däremot given och
  beslutad — den är inte längre en öppen punkt.
- **Sammanslagningen av `HTTP-metoder` + `GET` + `POST` + `PUT`** till den gamla
  fullständiga strängen är det enda stället där tre av Jelals poster tas bort utan
  att vara rena stavningsvarianter. Gäller tills han säger annat; säger han nej är
  ändringen fyra rader i `MERGED`.
- **Teckenförklaringens andra mening** gör ett påstående om Jelals förhållande till
  de dämpade. Den ska godkännas av honom.
- **Hero-texten** (intro på svenska) formuleras i paket 3 och godkänns av Jelal
  vid Leverans 1.
