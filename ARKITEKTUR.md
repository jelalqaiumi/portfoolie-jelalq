# Arkitektur

Gäller projektet **Portfolio för Jelal Qaiumi** (React + Vite, ren CSS, mörk bas
med orange som enda accentfärg). **Tillägg 2026-11-08, se M23:** Projekt och Om mig
är ljusa sektioner på loggans botten `#f6f4f0`.

Underlag: `BRIEF.md`, `PLAN.md`, `UPPDRAG-2026-10-07.md`, ~~`assets-source/logo.png`~~
(**UPPHÄVT 2026-11-07, se M20:** loggans källa är `assets-source/jq-logo-light.png`)
och — ~~`skills.txt` (93) och `skills-full.txt` (292 poster, 267 unika)~~ **UPPHÄVT
2026-10-08 av A1: båda filerna är historik och är inte underlag för något beslut
och inte källa för någon grind. Genomfört i paket D.**
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
| `44 × 44` / `44x44` (om loggan) | ~~48 × 36 px, tajt märke~~ **UPPHÄVT 2026-11-07:** hela loggan, 34 px hög | ~~"Ikonens optiska storlek"~~ M20 |
| `/assets/logo.png` (som bildkälla i app) | ~~`logo-mark-tight-*.png` i headern~~ **UPPHÄVT 2026-11-07:** `jq-logo-{34,68,102}.png` | ~~"Headerns logotyp"~~ M20 |
| ~~`alt="Jelal Qaiumi"` (på loggan)~~ **RADEN UPPHÄVD 2026-11-07, se M20:** strängen är nu det gällande värdet på headerns logga. Förbjudet i stället: `alt=""` på **headerns** logga (footerns har `alt=""` med avsikt) | ~~`alt=""` + `aria-hidden="true"`~~ `alt="Jelal Qaiumi"`, ingen dold text | ~~"Headerns uppbyggnad"~~ M20 punkt 3 |
| `label: 'Start'` / hero-post i `sections` | hero ligger inte i `sections` | "Hero-posten tas bort ur `sections`" |
| `public/assets/profile.jpg` som källa | `assets-source/profile.jpg` | "Källbilder bor utanför `public/`" |
| `public/assets/logo.png` som källa | ~~`assets-source/logo.png`~~ **UPPHÄVT 2026-11-07:** `assets-source/jq-logo-light.png` | "Källbilder bor utanför `public/`", M20 |
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
| "exakt 93 skills" som grind | strukturgrindarna i A1; **ingen** korsreferens, inget antal grindas | "A1 — Grinden för `skills.js` är strukturell" |
| `308 poster` / `258 filled` | ~~**307** / **257**~~ — **även ersättningen är upphävd:** inget antal grindas och inget antal står i prosa | A1 + A19 (raden skrevs när "Förväntat antal: 307" var gällande) |
| "HTTP-raden är sidans längsta sträng" | `React Native-komponentbaserad utveckling` (40) | "360 px — den längsta strängen" |
| "ca 1200 px på desktop" / "ca 2500 px på mobil" | 2410 px vid 1280, **6634 px vid 360** | "Layout — omdimensionerad" |
| `328` som spaltbredd vid 360 px vyport | **309 px** (5vw = 18, plus rullningslist) | "Diametern" + navets budget |
| `max-width: 420px` utan brytpunkt | 360 under 900 px, 420 över | "Diametern" |
| `.photo` som klassnamn | `.media` (koden har hetat så sedan paket 3) | "Beskärningen görs i CSS" |
| `.brandName` som klassnamn | `.logoName` | headerns uppbyggnad |
| `R > G` (tröskel) | `R - G >= 30` | blockdetekteringen |
| `palette: true` | `compressionLevel: 9` ensamt | utdatafiler för ikonen |
| `SKILL_SOURCES` / korsreferens mot `skills.txt` | strukturgrindar utan källista | "A1 — Grinden för `skills.js` är strukturell" |
| `MERGED` (tabellen i `validate-data.mjs`) | utgår helt, inga sammanslagningar | ↑ |
| "en grind på gruppernas id och ordning" | ordningen verifieras EN gång i paket D | ↑ |
| `namn ur skills-full.txt saknas` (felmeddelande) | meddelandetabellen i A1 | ↑ |
| `filled måste vara true eller false` (felmeddelande) | `okänt fält på skill` | ↑ |
| `filled` (fält på en skill) | fältet är borttaget | "A2 — `filled`, den orange fyllningen och teckenförklaringen" |
| `De orange har jag arbetat med.` | ingen teckenförklaring alls | ↑ |
| `LEGEND` (konstant i `Skills.jsx`) | ↑ | ↑ |
| `SkillPill` (fil, komponent, import) | `SkillChip` | "A6 — Kortet, chipset och rutnätet" |
| `.pill` / `.filled` / `.outline` (klassnamn) | `.chip`, ett enda utseende | ↑ |
| `.groups` / `.group` / `.groupTitle` / `.pills` / `.legend` | `.grid` / `.card` / `.cardTitle` / `.chips` | ↑ |
| `columns: 1` / `columns: 2` / `columns: 3` / `columns: 4` | kortrutnät 3/2/1 med `minmax(0, 1fr)` | ↑ |
| `break-inside: avoid` (i Skills) | utgår med flerkolumnlayouten | ↑ |
| `307` / `257` / `270` / `18 grupper` (antal skills) | inget antal grindas; 9 grupper, 53 namn som UPPLYSNING | A1 + A6 |
| `React Native-komponentbaserad utveckling` (längsta sträng) | mäts ur datan, teststräng i A5 | "A5 — Hero: knapparna, mätserien och 360 px" |
| `Klient–server-kommunikation` (längsta token) | ↑ | ↑ |
| "Inga fält för bild, rubriknivåer eller länkar" (om `about.js`) | `link`-fältet finns, bild finns inte | "A4 — Hem och Ekonomi som länk" |
| "Innehållet är en öppen punkt" (om Om mig-texten) | texten är Jelals, given 2026-10-07 | ↑ |
| `UTKAST - TEXT SOM JELAL SKA GODKÄNNA` (i `about.js`, `Hero.jsx`) | texterna är Jelals egna | A4 + A7 |
| `Fullstackutvecklare` (som rollrad eller i `<title>`) | `Systemutvecklare · Fullstack` | "A7 — Rollraden" |
| "ta bort systemutvecklare längst upp" | uppdraget 2026-10-07 återinför ordet | ↑ |
| "Jelal bytte den från Systemutvecklare" (kommentar i `Hero.jsx`) | invariantkommentaren i A7 | ↑ |
| `introDraft` (konstant i `Hero.jsx`) | `intro`, Jelals exakta ingress som EN sträng | "A5 — Hero: knapparna, mätserien och 360 px" |
| `--color-border` som knappram i hero | `--color-text-muted` (1,00:1 mot `--color-bg-top`) | ↑ |
| "platshållare för länkarna" (GitHub/LinkedIn i hero) | inga ikonlänkar i hero | "A10 — Inga ikonlänkar i hero" |
| "lugn in-animation" som beställd | ingen animation, uppdragets egen regel | "A11 — Ingen animation införs" |
| `--color-text-dim` | `--color-text-muted`; tokenet är borttaget | "A8 — Footerns kontrast" |
| "Footer, metadata, ej ifyllda pills" (tokenets användning) | ↑ | ↑ |
| uppräkningen av fem tokens i `.surface-light` (i `Projects.jsx`/`Skills.jsx`) | konsekvensen, utan lista. **Tillägg 2026-11-08, M23:** samma regel gäller blocket `[data-surface='light']`. Uppräkningen av vad det binder om står bara i blocket | "A9 — Kommentarer som räknar upp tokens", M23 punkt 9 |
| de 18 gamla gruppubrikerna, t.ex. `React Native — komponenter och API:er`, `Säker webbutveckling`, `Kodkvalitet och arkitektur` | de nio grupperna i "Kompetenssektionen görs om från grunden" | A1 + A6 |
| `exakt tre linjer` / `de tre linjerna` (om sektionsavgränsarna) | en linje per par av renderade `section[id]`; antalet skrivs inte i prosa | "Sektionsavgränsare" |
| `ca 12,2:1` / `ca 5,6:1` (hero:s textkvoter som överslag) | uppmätt **12,226:1** och **5,567:1** mot `--color-bg-top` | "A5 — Knappstilarna" |
| citattecknen runt ingressen eller "Om mig"-texten som innehåll | de är uppdragsfilens avgränsare | "A14 — Citattecknen i `UPPDRAG-2026-10-07.md`" |
| `window.innerHeight - 64` (som nämnare i mätserien) | nämnaren **mäts**: vyporthöjden minus headerns uppmätta rektangel | "A16 — Höjdkvoten har EN formel" |
| `0,75` / `676 / 900` (heros höjdkvot före K) | **0,918** vid 1280 × 800, **0,809** vid 1280 × 900 — mot mätseriens nämnare | ↑ |
| två kvoter i samma mätrad (mot vyporten **och** mot vyporten minus headern) | exakt **en** kvot per mätrad; kvoten mot hela vyporten redovisas inte | ↑ |
| bandet 0,80–1,15 som krav under 900 px bredd | bandet gäller **från 900 px**; under brytpunkten gäller bara knapparnas underkant | ↑ |
| `filled: false` / `{ name: 'React', filled: false }` (som formatexempel) | `{ name: 'React (Hooks, Context)' },` | "A17 — Detta stycke motsade A2" |
| "byter `false` mot `true`" (om hur Jelal redigerar) | han söker namnet och rättar, flyttar eller raderar raden | ↑ |
| `93 handskrivna strängar` / `93 skills` (som antal i prosa) | inget antal i prosa; 9 grupper och 53 namn som UPPLYSNING | A1 + A17 |
| "uppdragstexten i scratchpad-filen" / "uppdragstexten är inte en fil i repot" | `UPPDRAG-2026-10-07.md` i projektroten (`5c62ac4`) | "A18 — scratchpad-filen är upphävd" (i A1) |
| `1 stycke i Om mig (1 länkfras, 0 pekar på ett projekt som finns)` (i OK-raden) | antalet är databeroende; länkfras-upplysningen införs i paket F | "A19 — OK-raden är ett FORMAT" |
| OK-raden med teckentalet **sist** | teckentalet står **först**, `summary.push`-ordningen från paket 4 | ↑ |
| `Validering OK: 4 sektioner, 18 grupper, 307 skills` (hela den gamla OK-raden) | formatet i A19, med uppmätta tal | "A19 — OK-raden är ett FORMAT" |
| `sammanslagning pekar på ett namn som inte finns` / `namnet är sammanslaget och får inte stå som egen post` (felmeddelanden) | meddelandetabellen i A1 | "A1 — Grinden för `skills.js` är strukturell" |
| `Antalskontrollen 93` / `93 handskrivna poster` / `93 rader` (som antal i prosa) | inget antal grindas och inget antal står i prosa | A1 + A17 |
| `filled: true` (som värde på en post i `skills.js`) | fältet är borttaget; inga sammanslagningar, alltså inga `MERGED`-mål | A1 + A2 |
| `292` / `267` / `56 gamla poster` / `50 filled: false` (antal ur den gamla listan) | nio grupper och 53 namn, inget antal grindas | A1 + A6 |
| `#D9D9DE` (som ljusa ytans ram eller som avgränsarlinje) | ~~`#CFCFD4` — **1,413:1** mot `#F4F4F6`~~ — ~~**även ersättningen är upphävd 2026-11-07:** ingen ljus yta finns~~ **UPPHÄVT 2026-11-08, se M23:** en ljus yta finns igen. Dess linje är `--line` `#e2ded7` och dess kontrollram `--line-strong` `#7a756f`. Varken `#D9D9DE`, `#CFCFD4` eller `#F4F4F6` används | M2, M23 punkt 2 (raden skrevs när "De dämpade pillarna" gällde) |
| "de dämpade pillarnas ram" / "de ifyllda pillarna" som **motivering** för ett tokenvärde | konsumenten är kortets och chipsets ram (A6) | ↑ |
| **Tillagt 2026-11-07, moderniseringen:** | | |
| `Didact Gothic` / `didact-gothic-latin-400.woff2` | Urbanist, Manrope, JetBrains Mono | "M1 — Typsnitten" |
| "en enda vikt" / `font-weight: inherit` (på rubriker) / "sätts aldrig till något annat än 400" | `--weight-regular` / `--weight-semibold` / `--weight-bold` | M1 + M5 |
| `--font-sans` | `--font-body` (och `--font-heading`, `--font-mono`) | M1 + M5 |
| "Systemfont-stack, ingen webbfont" | självhostade woff2 | M1 |
| `surface-light` / `.surface-light` / `className="surface-light"` | ~~klassen finns inte~~ **"Gäller i stället" UPPHÄVT 2026-11-08, se M23:** strängen förblir förbjuden, men en ljus yta finns: attributet `data-surface="light"` satt av `Section`, och blocket `[data-surface='light']` i `tokens.css` | ~~"M2 — `.surface-light` tas bort helt"~~ M2 + M23 punkt 1 |
| varje `--color-`-namn: `--color-bg`, `--color-surface`, `--color-bg-top`, `--color-header-border`, `--color-border`, `--color-field-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-on-accent`, `--color-overlay-grey`, `--color-focus`, `--color-error`, `--color-media-*` | översättningstabellen | "M5 — Tokens" |
| `--transition` / `150ms ease` | `var(--duration-fast) var(--ease-out)` | M5 |
| `--tracking-wide` | utgår, ingen konsument | M5 |
| `--content-max: 1120px` / `1120 px` som maxbredd | `1180px` | M18 |
| `clamp(1rem, 5vw, 3rem)` (sidmarginal) | `1.5rem` | M18 |
| `--header-height: 64px` / "exakt 64,00 px" (headerns höjd) | `calc(var(--nav-offset) + var(--nav-height))`, alltså 74 px | M6 |
| `repoUrl` / `url` (fält på ett projekt) / `id` (fält på ett projekt) | `githubUrl` / `liveUrl` / `slug` | "M3 — Projektdatan" |
| `projectId` (fält i `about.link`) | `projectSlug` | M3 |
| `16 / 10` / "16:10" (projektbilden) / `[640, 1280]` | `4 / 3` / `[600, 1200]` | "M4 — Projektbilden och kortet" |
| `minmax(280px, 1fr)` / `calc(var(--measure) + var(--space-5) * 2)` (projektkortet) | rutnät 3/2/1 med `minmax(0, 1fr)`, inget tak på kortet | M4 |
| "Ingen animation" / "inga in-animationer" som gällande | M12 | "M12 — Animationerna" |
| "Inga ikoner" som gällande för hela sidan | tre inline-SVG med funktion | "M9 — Ikonerna" |
| "Formuläret till vänster, kontaktuppgifterna till höger" | uppgifterna till vänster, formuläret till höger | "M16 — Kontakt och footer" |
| "Ingen tredje global klass" som gällande | `.reveal` är den tredje, och dörren stängs efter den | M12 |
| **Tillagt 2026-11-07, efter G1:** | | |
| `.card { scroll-margin-top` | `.item { scroll-margin-top: … }` på kortets `<li>` | "R1" och A4 |
| `ProjectCard({ project, index })` som signatur i P7 | `ProjectCard({ project })` i P7, `index` från P10 | R1 |
| `clientWidth` som grind för att layouten står still med menyn öppen | rotens, `#projects` och panelens `getBoundingClientRect().width` | R4, M10b punkt 3 |
| "15 … och nu också med menyn öppen" (om `innerWidth - clientWidth`) | villkoret läses med menyn stängd | R4 |
| "var och en har en konsument" (om tokenblocket i M5) | ett token deklareras i det paket som har dess första konsument | R5 |
| `--space-9` | tokenet är borttaget | R5 |
| `const MENU_ID` i `Header.jsx` | `MENU_ID` ur `src/data/sections.js` | R2 |
| **Tillagt 2026-11-07, M10c (heros bild):** | | |
| `IMAGE_SIZES` / `'(min-width: 900px) 420px, 360px'` | `HERO_IMAGE_SIZES = '(min-width: 900px) 100vw, 178vw'` | "M10c", M10d |
| `/assets/profile/` / `profile-400` / `profile-800` / `profile-1200` | `/assets/hero/hero-{960,1440,1672}.webp`, profilvarianterna tas bort | M10c |
| `assets-source/profile.jpg` som källa | `assets-source/hero-portrait.jpg`. `profile.jpg` tas bort ur trädet (finns i git-historiken) | M10c |
| `.media` / `.image` / `.media::after` **i `Hero.module.css`** (projektkortets `.media` berörs inte) | `.backdrop` (bilden) och `.hero::before` (toningen) | M10c |
| `filter: grayscale(1) contrast(1.05)` / gråskalan "i CSS, inte i bildfilen" | gråskalan bakas in av `optimize-images.mjs` med sharp `grayscale()` | M10c |
| `--overlay-grey` / tonplattan | tokenet och tonplattan tas bort | M10c |
| `minmax(0, 420px)` (heros bildspår) | `minmax(0, 1fr) minmax(0, 1fr)`, högra spåret är tomt och ansiktet syns där | M10c |
| "Diametern" / diameterserien / "icke-avtagande" som krav på hero / "360/420" som tak / det vita strecket runt porträttet | utgår, det finns ingen cirkel. Raderna om "Diametern" ovan är historik | M10c |
| `radial-gradient(60% 70% at 100% 35%` (heros orange glöd) | glöden utgår. Toningen i `.hero::before` | M10c |
| `fontSize` är `72px` vid 1280 × 800 och 1600 × 900 (som grind) | `fontSize` = `clamp(44, 0,11 × spåret, 72)` ±0,5 px | M10c |
| "Porträtt" i `<picture>` med JPEG-reserv | ett `<img>` med webp, ingen `<picture>` | M10c |
| **Tillagt 2026-11-07, M10d (bilden överst på mobil):** | | |
| `300vw` (heros `sizes`/`imagesizes`) | `178vw` | M10d |
| `var(--bg) 92%` / `var(--bg) 45%` (toningen uppifrån under 900 px) | ingen `::before` under 900 px, `mask-image` på `.backdrop` | M10d |
| "sektionens sista barn" / "Ingen loading" om heros bild | första barnet, `loading="eager"` | M10d |
| knapparna ovanför skärmkanten som krav under 900 px | rubrikens överkant inom vyporten (rad 1d) | M10d |
| **Tillagt 2026-11-07, M12b (fynden från P10):** | | |
| `opacity: 0; transform: translateY(24px);` i samma `.reveal:not([data-revealed])`-regel | opacitet på alla, `transform` bara på `.reveal:not([id])` | M12b punkt 1 |
| `export function enableReveal` / `enableReveal` "i samma fil" som `Reveal` | lokal funktion i `main.jsx`, ingen export | M12b punkt 3 |
| `oxlint-disable` / `eslint-disable` i `src/` | ingen avstängd lintregel | M12b punkt 3 |
| `Visar {shown.length}` / "Uppläsningen följer varje ändring" | `Visar {displayed.length}`, uppläsningen följer korten | M12b punkt 4 |
| `filter.category !== category` (vakt i `ProjectFilter.jsx`) | villkoret `sameSlugs` i `Projects.jsx` gäller alla filterändringar | M12b punkt 5 |
| **Tillagt 2026-11-07, M15b (fynden från P11):** | | |
| `--space-1` som token (sök `--space-1[^0]`, så att `--space-10` inte räknas) | tokenet är borttaget i P11. Skalan är `--space-2` till `--space-8` plus `--space-10` | M15b punkt 1, M5, Spacing |
| "`--space-1` till `--space-8`" (om skalan) | "`--space-2` till `--space-8` och `--space-10`" | ↑ |
| "Kortets rubrik är `--text-lg`" / "Ingen `text-transform`" (om kompetenskortets `h3`) | `typeStyles.meta` på `h3`, versaler och mono, vikt 400 ur typklassen | M15, M15b punkt 3 och 4 |
| **Tillagt 2026-11-07, M19 (före G2):** | | |
| `<h2 className={styles.columnHeading}>` / `.columnHeading` (footerns kolumnrubrik) | ``<p className={`${typeStyles.meta} ${styles.columnLabel}`}>Kontakt</p>``, ingen rubrik i footern | M19 punkt 1 |
| `emailLabel` / `'Mejl'` (footerns e-postlänk) | adressen i klartext, `{contact.email}`, som i kontaktsektionen. **Förtydligat 2026-11-07, M20 punkt 7:** `'Mejl'` är förbjudet **bara i `Footer.jsx`**. I `ContactForm.jsx` är det fältets etikett (Jelals beslut 7) | M19 punkt 2 |
| `rel="noreferrer"` ensamt | `rel="noopener noreferrer"` på varje `target="_blank"` | M19 punkt 3 |
| **Tillagt 2026-11-07, M20 (ny logga):** | | |
| `logo-mark` (varje filnamn `logo-mark-*.png` och `logo-mark-tight-*.png`) | `jq-logo-{34,68,102}.png` i naven och footern, `jq-icon-{32,96,192}.png` som favicon och apple-touch-icon | M20 punkt 1 och 2 |
| `assets-source/logo.png` som källa | `assets-source/jq-logo-light.png`. `logo.png` tas bort ur trädet (finns i git-historiken) | M20 punkt 5 |
| `<span className="visually-hidden">Jelal Qaiumi</span>` (i logglänken) | `alt="Jelal Qaiumi"` på loggans `<img>`, ingen dold text | M20 punkt 3 |
| `sizes="48px"` / `96w` / `192w` (loggan) | `srcSet` med `1x`, `2x`, `3x`, inget `sizes` | M20 punkt 1 och 3 |
| `height: 36px` (loggan) / `48 × 36` (loggans mått) | `height: 34px`, 159 × 34 | M20 punkt 3 |
| `MARK_CROP` / `EXPECTED_MARK_BBOX` / `EXPECTED_BLOCKS` / `ORANGE_MIN_DELTA` / `TIGHT_SIZES` / `LOGO_BASE_R` / `ALPHA_SPAN` / `ICON_SIDE` | `LOGO_CROP`, `LOGO_SQUARE`, luminansformeln | M20 punkt 1 |
| `#FC6F03` / `252, 111, 3` (som ikonens eller loggans färg) | `--accent`, läst ur `tokens.css` | M20 punkt 1 |
| `extend(` (i bildskriptet) / `672` (ikonens underlag) | ingen utfyllnad, rutan rakt ur källan | M20 punkt 2 |
| **Tillagt 2026-11-08, M21 (prestanda före G2):** | | |
| "median av tre" / "Tre körningar per läge" (Lighthouse) | fem körningar per läge, medianen och alla fem värdena redovisas | M21 punkt 0 |
| `import HCaptcha from '@hcaptcha/react-hcaptcha'` (statisk import) | `lazy(() => import('@hcaptcha/react-hcaptcha')...)`, monteras först när den behövs | M21 punkt 1 |
| `(min-width: 600px) 50vw, 100vw"` (projektbildens `sizes`) | `(min-width: 600px) 50vw, calc(100vw - 3rem)"` | M21 punkt 2 |
| "Den här sidan behöver JavaScript för att visas" / "helt klientrenderad" / "blir blank utan JavaScript" | sidan förrenderas vid bygget och syns utan JavaScript. `<noscript>` har texten i M21 punkt 5 | M21 punkt 5 |
| "anropar den före `createRoot`" / "före `createRoot(...).render`" (om `enableReveal`) | före `hydrateRoot` i bygget och före `createRoot` i dev | M21 punkt 5 |
| "varje fil i `dist/` har en referens" utan undantag | ett undantag: `robots.txt` | M21 punkt 4 |
| **Tillagt 2026-11-08, M23 (ljusa sektioner):** | | |
| "mörk rakt igenom" / "Sidan har ingen ljus yta" / "ingen ombindning av färgtokens" som gällande | Projekt och Om mig är ljusa, via `data-surface="light"` | M23 |
| `rgba(20, 20, 20, .62)` (pillens bakgrund) | `rgba(20, 20, 20, .9)`. Reservregeln `.94` är oförändrad | M23 punkt 3 |
| `.segment[aria-pressed='true']` med `background-color: var(--accent)` | `background-color: var(--accent-fill); border-color: var(--accent);` | M23 punkt 3 |
| `function Section({ id, title, children, className })` som gällande signatur | `function Section({ id, title, children, className, surface })` | M23 punkt 1 |
| `className` / global klass som bärare av den ljusa ytan | attributet `data-surface`, ingen klass | M23 punkt 1 |
| `#ff6b00` som text, länk eller fokusring på ljus botten | `--accent` binds om till `#b84a00`. `#ff6b00` bara som yta, `--accent-fill` | M23 punkt 2 |
| **Tillagt 2026-11-18, M24 (full SEO):** | | |
| UPPHÄVT 2026-11-18: "Ingen `Sitemap`-rad" (om robots.txt) | sista raden `Sitemap: <site.url>sitemap.xml`, innehållet exakt `robotsTxt(site.url)` | M24 punkt 5 |
| "Handskriven, två rader" (om robots.txt) | två rader, tomrad, Sitemap-raden, grindad av V8 | M24 punkt 5 |
| "referens i `src/` eller `index.html`" som de enda referenskällorna för filer i `dist/` | `src/`, `index.html`, `scripts/seo.mjs` och `public/robots.txt`. Undantaget är `robots.txt` | M24 punkt 6 |
| `rel="canonical"`, `property="og:`, `name="twitter:` eller `application/ld+json` i `index.html` | skrivs in av `prerender.mjs` i `dist/`, grind P2 | M24 punkt 3 |
| Domänen skriven i `src/` eller `scripts/` utanför `src/data/site.js` | `site.url`, och adresser byggda med `new URL(…, site.url)` | M24 punkt 1 |

Jag skriver in nya rader här varje gång jag upphäver något. Raderna tas aldrig
bort — en tom tabell går inte att skilja från en obevakad.

### Märka eller skriva om — kriteriet, så att nästa städning blir likadan

Konventionen ovan ger två utfall, och valet mellan dem har hittills varit en
bedömning per gång. Här är regeln, formulerad under städpasset 2026-10-08
(paket M i `PLAN.md`), och den gäller varje framtida städning:

1. **Märkning räcker** när stycket är **historik** — det förklarar hur något en
   gång var, och ingen läsare kan ta det för en instruktion när märkningen syns.
   Märkningen sätts då på **styckets egen rubrik eller första rad**, aldrig bara
   på avsnittet ovanför: läsaren kommer via Ctrl+F på en sträng, inte uppifrån och
   ner. Ett `###`-avsnitt märkt "UPPHÄVT i sin helhet" räcker alltså **inte** för
   de `####` som ligger under det — de får var sin märkning.
2. **Omskrivning krävs** när stycket står där en byggare läser efter **vad som
   gäller**: en normativ rubrik ("Exakta felmeddelanden"), en kontrolltabell, en
   utskriven deklaration, en OK-rad. Är hela premissen borta ersätts stycket av
   **en rad som säger vad som gäller i stället**, och den gamla texten står kvar
   **under** den raden, märkt. Den gamla texten raderas inte: nästa läsare måste
   kunna se att frågan en gång var avgjord åt andra hållet.
3. **Varje märkt eller omskrivet stycke namnger det paket som genomfört
   beslutet** (A13:s lärdom). Står genomförandet kvar namnges det blockerade
   paketet i stället.
4. **Städning fattar inga beslut.** Är ett stycke upphävt men saknar ersättare är
   det ett **nytt beslut med eget nummer och eget genomförandepaket** — det
   lämnas tillbaka till `PLAN.md`, det avgörs inte i ett städpass.
5. **Den text som UPPHÄVER något är inte upphävd text.** En träff på en förbjuden
   sträng i en mening som säger att strängen **utgår, är borttagen eller fälls av
   en grind** är kontrollens egen funktion, inte ett fynd — annars hade varje
   beslut om att ta bort något blivit omöjligt att skriva. Det gäller tre platser:
   tabellen ovan, det gällande beslutets egen text (t.ex. "`filled` TAS BORT",
   "`MERGED`-tabellen tas bort", uppräkningen under "Vad som utgår") och ett
   grindmeddelande som finns **för** att fånga strängen (`okänt fält på skill
   ("React", fält "filled")`). Allt annat är ett fynd.

---

## Paket P — moderniseringen 2026-11-07: besluten M1–M18, och var de står

Underlag: `UPPDRAG-2026-11-07.md` (avsnittet **"Jelals beslut (2026-11-07)" går
före uppdragstexten** där de krockar), `PLAN.md` paket P1–P17 och `LARDOMAR.md`.
Numret M*n* är samma som numret i `PLAN.md`:s lista "Beslut arkitekten måste
fatta i P1".

**Detta avsnitt är det gällande för allt det rör.** Varje äldre stycke som krockar
är märkt `UPPHÄVT 2026-11-07, se M<n>` på **sin egen rubrik** (konventionen
ovan). Gäller bara tokennamnen i ett i övrigt gällande stycke står det
`tokennamnen UPPHÄVDA 2026-11-07, se M5` — då gäller beslutet, och namnen läses
genom översättningstabellen i M5. Hittar byggaren ett omärkt äldre stycke som
krockar gäller M-avsnittet, och motsägelsen lämnas tillbaka hit.

| # | Beslut i en mening | Genomförs i | Upphäver (märkt på sin plats) |
|---|--------------------|-------------|-------------------------------|
| M1 | Tre självhostade woff2 (Urbanist, Manrope, JetBrains Mono), latin, och teckengrinden mäter varje familj mot de fält som renderas i den. Textstilarna i `type.module.css` sätts i JSX, aldrig med `composes` (efter P5) | P2, P5 | "Typsnittet — Didact Gothic, en enda vikt" med 1–5, Teknikval-raden "Systemfont-stack" |
| M2 | `.surface-light` tas bort helt. **Premissen "mörk rakt igenom" UPPHÄVD 2026-11-08, se M23:** klassen förblir borta, men ljusa sektioner finns igen | P2 | "Ljus yta — Kompetenser får vit bakgrund" med alla underavsnitt |
| M3 | Projektdatan byter till uppdragets fältnamn, `logo` utgår, en länkregel i `src/lib/projectRules.js` | P6 | "`src/data/projects.js` — projekt" |
| M4 | Projektbilden blir 4:3, vänsterförankrad beskärning, bredderna 600 och 1200, `loading="lazy"`; kortets deklarationer | P6 (bild), P7 (kort) | "Projektkortens bredd — läget med ETT projekt" med underavsnitt |
| M5 | Uppdragets tokennamn ersätter `--color-*` rakt av, översättningstabell, och tokengrinden gäller varje custom property | P2 | "Färger", "A8", "Typografi", "Layout, radier och övrigt", "Accentfärg — mätning" |
| M6 | Svävande nav: `--header-height` = avstånd + pillhöjd, båda låsta som token | P3 | "Headern är enfärgad", "Headerns bakgrund" (redan upphävd) |
| M7 | `aria-current`-observern behålls, understrykningen läggs på den. Hover i pillen är en understrykning i `--ink`, ingen färgändring (efter P4) | P3, P4b | "Hover — mätningen säger tvärtom mot magkänslan" |
| M8 | Hamburgermeny under 900 px, dialog med fokusfälla, Esc, scroll-lås och CTA i panelen. M8b avgör P3:s och P4:s öppna markeringar. Låset får inte flytta layouten: `scrollbar-gutter: stable` på `html` (M10b punkt 3) | P4, P4b, P5 omgång 2 (punkt 3) | "Navigeringen på smal skärm" med underavsnitt (alternativ (d) var avfärdat) |
| M9 | Tre egna inline-SVG, inget beroende | P4, P9 | "A3 — Inga ikoner" |
| M10 | Heros texter (h1 ~~är ett markerat förslag~~ **GODKÄND ordagrant av Jelal 2026-11-18**, inget namn i hero), ~~glöd~~, knappstilar och heros fyra markeringar. M10b: heros `padding-block`, h1:s grad från 900 px med `.inner` i full bredd, `scrollbar-gutter` på `html`, och mätseriens vyporter. **M10c (Jelal 2026-11-07): porträttet blir heros svartvita bakgrundsbild och profilbild. Cirkeln, bildspåret, glöden, tonplattan och profilvarianterna utgår, och mätserien skrivs om** | P5 (omgång 2 för M10b, **omgång 4 för M10c**) | "Hero får grå bakgrund", "A5 … Knappstilarna", "Heros `EJ I ARKITEKTUR`-markeringar", A5 "Vad som får vika" steg 1. **M10c upphäver:** M10:s glöd, bildspår och porträttrader, M10b:s spår- och 72 px-grind och förväntade tal, "Profilbilden är rund" med underavsnitt, "Källa och beskärning", "Utdatafiler", "Vad som INTE görs i bildskriptet", `--overlay-grey` |
| M11 | Filtret: chips ur datan, segment med 0 visas men är inaktiva, OCH mellan alla villkor, live-raden `aria-live="polite"`. **M11b avgör P8:s och P9:s tolv markeringar och flyttar fokus till "Alla" efter "Rensa filter"** | P8, P9, **P9b (efter P10)** | — |
| M12 | Animationerna: `.reveal` via en gemensam observer, aldrig dold utan observer, stagger 70 ms med tak, och reducerad rörelse stänger av allt. **M12b: ett ankarmål (`.reveal[id]`) tonas bara i opacitet, headern tål att observer saknas, `enableReveal` flyttar till `main.jsx`, live-raden räknar den visade listan, och en fas startar bara när mängden slugs ändras** | P7 (hover), P10, **P9b (M12b)** | "A11 — Ingen animation införs". **M12b ändrar:** M11b punkt 4 (vakten i `ProjectFilter.jsx` utgår) och M11:s live-rad |
| M13 | Sektionsetiketten `01 / 04 · PROJEKT` räknas ur `sections` utan hero och är `aria-hidden`. Nämnaren är `sections.length`, och avståndet till `h2` är `--space-3` (M15b) | P11, P11b | — |
| M14 | Nyckeltalen är "Projekt" och "Kompetenser", båda härledda; "år i branschen" utgår ~~tills Jelal svarat~~ (**BESVARAD 2026-11-18:** utelämnas, Jelals beslut). M14b: kompetensurvalet bor i `src/lib/skillRules.js`, och ett tal som är 0 visas inte | P12, P12b | M14:s "unika namn" |
| M15 | Kompetenschipsen får filterchipsens stil via en gemensam `Chip`-komponent (**RÄTTAT 2026-11-18, Jelals beslut "Tillbaka till grå":** gäller som skrivet. Kompetens-chipsen ser ut som filterchipsen, grå kant och text. ~~orange kant och text, M26~~ ~~ifyllda orange~~ ~~ifyllda i den ljusa ytan, M25~~ UPPHÄVDA). M15b: `--space-1` är borttaget, och mono-typklasserna sätter vikten 400 själva | P9 (Chip), P11, P11b | "A6" (chipset och `.cardTitle`), "Chipsens färg", Spacing-raden `--space-1` |
| M16 | Kontakt: uppgifterna till vänster, formuläret i en panel till höger, hCaptcha `compact`. Footer: GitHub renderas inte så länge den är `null` | P13, P14 | "Kontaktsektionen blir tvåspaltig" med underavsnitt |
| M17 | Lighthouse körs med `npx` mot `vite preview` och installerad Chrome, mobil och dator. ~~median av tre~~ **Ändrat 2026-11-08, M21 punkt 0:** fem körningar per läge, medianen | P15 | Teknikval (inget verktyg fanns) |
| M18 | `--content-max: 1180px` och `--content-padding: 1.5rem` | P2 | "Layout, radier och övrigt", värdet i "Var sidmarginalen bor" |
| M19 | De sista öppna markeringarna före G2: footerns kolumnetikett är ett `p` utan rubrik, e-posten i klartext, ett `rel`-mönster för hela sidan, tio markeringar och knappens dämpade läge godkända som byggda, och sju kommentarer med uppmätta tal omskrivna | **P14b** (före P15) | M16:s footerpunkt (rättad på plats), R6:s "fortfarande öppna", "Markeringarna från före P2" |
| M20 | **Ny logga (Jelal 2026-11-07, "Kör på B"):** hela loggan (JQ-rutan plus ordmärket i `--ink`, genomskinlig botten) i naven och footern, 34 px hög, `alt="Jelal Qaiumi"` i headerns länk utan dold text. JQ-rutan ensam, opak och utan luft, är favicon och apple-touch-icon. Källan är `assets-source/jq-logo-light.png`. Dessutom formulärtexterna efter Jelals beslut 7 | **P14c** (efter P14b, före P15) | "Headerns logotyp" med alla underavsnitt, M10c:s ikondel och ikongrind (rad 14), M16:s footermärke, M19 punkt 12:s rader om loggan, mappstrukturens loggrader, "Källbilder bor utanför `public/`" (loggraden), "Vad som INTE görs i bildskriptet" (loggstycket), Öppen punkt 5 (accentfärgen) |
| M22 | **Rättningar efter G2 (2026-11-08):** grinden 5c lyssnar på `Runtime.exceptionThrown` och på produktionsnumren; M20:s breddgrind jämför mot den laddade filen; honeypoten läses ur DOM och stoppar inskicket tyst; `.gitattributes` låser `robots.txt` till LF; bygget jämför heros preload med `HERO_IMAGE_WIDTHS`; brytpunktslistan anger avsikt, inte moduler | **G2-rättning** | M21 5c, M21 punkt 5:s riskmening, M20 punkt 3:s uträkning och grind 7, M20-tabellens rad 3, "Skräppostskydd: honeypot" (premissen), M10c:s kommentar i `profile.js`, "Brytpunkter" (raderna sm och md) |
| M21 | **Prestanda före G2 (2026-11-08):** fem Lighthouse-körningar per läge; hCaptcha laddas först när formuläret närmar sig vyn eller får fokus; projektbildens `sizes` rättas; `meta description` (förslag) och `robots.txt`; sidan förrenderas vid bygget med `react-dom/server` och hydreras | **P15-fix** (efter P15 del A, före resten av P15) | M17:s antal körningar, "Tre noteringar från granskningen" punkt 1 (`<noscript>`-texten), M12:s och M12b punkt 3:s "före `createRoot`", Teknikval-raden React (skälet "ingen SSR"), mappstrukturens rader för `index.html`, `package.json`, `public/` och `main.jsx`, "Leveransens storlek" (undantaget `robots.txt`) |
| M26 | **UPPHÄVT 2026-11-18 i sin helhet, Jelals beslut "Tillbaka till grå": chipsen behåller sin ursprungliga stil (M15), och koden är återställd till 9cb309b.** ~~**Kompetens-chipsen med orange kant och orange text (Jelal 2026-11-18, ersätter M25; RÄTTAT samma dag efter "För starkt"):**~~ `Chip` får den booleska propen `accent`, som bara `span`-grenen läser, och `.chip.accent` sätter `border-color: var(--accent)` och `color: var(--accent)`. Bakgrunden ärvs (`transparent`). Kvoten mot kortets `--surface` är 6,219:1, uträknad och mätt i K3, och den skrivs in i `tokens.css`. ~~`filled`, `.chip.filled`, `--accent-fill`, `--ink-inverse`, 6,452:1~~. Inget `data-surface` på chipset, inga nya token. Filterchipsen är oförändrade | **P21** | Hela M25, och de stycken M25 ändrade: M15, M23 punkt 1 och 2, komponenttabellen, "Chipsens färg", A6-notisen, den öppna punkten om chipsens färg |
| M25 | **UPPHÄVT 2026-11-18 i sin helhet, Jelals beslut: chipsen behåller sin ursprungliga stil (M15).** ~~**Kompetens-chipsen ifyllda (Jelal 2026-11-18):**~~ chipsets `span` får `data-surface="light"` via en ny prop `surface` på `Chip`, och `.chip[data-surface='light']` läser `var(--bg)` och `var(--ink)`. Inga nya token, inga värden dubblerade. Kanten blir genomskinlig men behåller sin bredd. Filterchipsen är oförändrade | **P20b** | M15:s "ser ut som filterchipsen", M15:s signatur och `SkillChip`-rendering, M23 punkt 1 (var attributet sätts) och M23 punkt 2 (blockets kommentar), komponenttabellen |
| M23 | **Ljusa sektioner efter loggan (Jelals beslut 9, 2026-11-08):** Projekt och Om mig får `data-surface="light"` via `Section`, och ett block efter `:root` binder om färgtokens och målar botten `#f6f4f0` och texten `#141414`. Accenten för text, länk och ring blir `#b84a00`, och `--accent-fill` `#ff6b00` bär orange yta under mörk text. Pillen blir `.9`. Ingen synlig linje vid ytbyte. `validate-tokens.mjs` grindar att varje ombundet namn finns i `:root` | **P18** (a tokens och mekanism, b projekt, c Om mig, d mätning) | M2:s premiss och avgränsarföljd, tabellraderna om `surface-light` och `#D9D9DE`, M6:s pillbakgrund, M11:s valda segment, M13:s och komponenttabellernas `Section`-signatur, "Sektionsavgränsare" (linjen vid ytbyte), den öppna punkten om den ljusa ytans placering, M2-raden i beslutsloggen för P1 |
| M24 | **Full SEO (2026-11-18):** domänen bor i `src/data/site.js`. `prerender.mjs` skriver in canonical, Open Graph, Twitter-kortet och två JSON-LD-block (Person, WebSite) i `<head>` i `dist/`, med `</script>` escapat. Delningsbilden 1200 × 630 JPEG, svartvit, görs ur porträttet av ett eget skript. `robots.txt` får Sitemap-raden och `sitemap.xml` tillkommer, båda statiska och grindade byte för byte mot `site.url`. `<title>` grindas mot namn och roll. **Jelal svarade 2026-11-18:** beskrivningen är godkänd, GitHub står bara i sameAs (`sameAsExtra: ['https://github.com/Jelalqaiumi']`), och LinkedIn är bekräftad | **P19c** (efter P19a och P19b) | M21 punkt 4 (Sitemap-raden och referensregeln), M21 punkt 3 (tillägg om `og:description`), M22 punkt 4:s mening om radslut, mappstrukturen, "Leveransens storlek", M20 grind 14, M10c grind 16, "Utdatafiler för ikonen" (gränsen utan undantag), M21:s beslutslogg |

**Efter G1 (2026-11-07):** besluten R1–R6 står i "Besluten efter G1", sist i
M-avsnittet, och genomförs i paketet G1-rättningen. De rättar A4, M3, M4, M5,
M8b, M10b punkt 3 och M18 på sina platser.

### Kontrollerat i miljön 2026-11-07 (LARDOMAR 2026-10-02: inget namnges okontrollerat)

| Namngivet | Läge |
|-----------|------|
| `scripts/font-coverage.mjs`, `scripts/validate-data.mjs`, `scripts/validate-tokens.mjs`, `scripts/optimize-project-images.mjs` | Finns |
| `src/data/projects.js` med `PROJECT_IMAGE_WIDTHS = [640, 1280]` | Finns |
| `assets-source/projects/awle.png` | Finns. Måtten 1440 × 900 är **uppgivna** (kommentaren i `projects.js` och samordnaren) och syns som 16:10 när filen öppnas, men är **inte uppmätta av mig**. P6 läser dem med `sharp().metadata()` innan beskärningen körs |
| `public/assets/projects/awle-640.webp`, `awle-1280.webp` | Finns. Blir orefererade i P6 och tas bort där |
| `src/styles/fonts/didact-gothic-latin-400.woff2` | Finns. Tas bort i P2 |
| Urbanist, Manrope och JetBrains Mono som filer | **Finns inte.** Hämtas i P2 enligt M1. Att nätverket når `fonts.googleapis.com` har jag inte kunnat pröva. P2 prövar det först |
| Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe` finns |
| Lighthouse | **Finns inte**: varken i `package.json`, i `%APPDATA%\npm\node_modules` eller i npx-cachen. M17 föreskriver `npx`, och P15 prövar det innan något mäts |
| `size="compact"` på `HCaptcha` | Finns i `node_modules/@hcaptcha/react-hcaptcha/types/index.d.ts:26` (`"normal" \| "compact" \| "invisible"`) |
| `src/lib/`, `src/data/profile.js`, `src/styles/type.module.css` och de nya komponenterna | **Finns inte.** Skapas i det paket som står vid varje namn |

### M1 — Typsnitten: självhostade woff2, en fil per familj (P2)

**Beslut: självhostade, som i dag.** Samordnarens rekommendation följs i sak.
Google Fonts CDN skulle ta bort det enda teckengrinden kan mäta (filen), lägga
en extern uppkoppling och render-blockerande CSS i Lighthouse, och bryta
principen om noll externa anrop i runtime. hCaptcha är fortfarande det enda
externa anropet, och bara i kontaktsektionen.

**En avvikelse från rekommendationen: variabla filer i stället för en fil per
vikt.** Google serverar alla tre familjerna som variabla typsnitt. Begärs ett
viktintervall (`wght@600..700`) svarar API:t med **ett** `@font-face` och **en**
fil som täcker intervallet. Statiska woff2 per vikt går inte att få därifrån utan
att konvertera TTF, och det kräver ett nytt verktyg. Följden är att Urbanist- och
Manrope-filerna bär hela viktaxeln. Deklarationen begränsar ändå webbläsaren
till de vikter uppdraget använder. Byten mäts i P2 och redovisas, och
`dist/`-gränsen på 1 MB gäller.

**Filerna, i `src/styles/fonts/`:**

| Fil | `font-family` | `font-weight` | Används till |
|-----|---------------|---------------|--------------|
| `urbanist-latin-var.woff2` | `'Urbanist'` | `600 700` | rubriker, kortets titel, logo-brickan, nyckeltalens siffror |
| `manrope-latin-var.woff2` | `'Manrope'` | `400 700` | brödtext, navlänkar, knappar, segment, eyebrow (700) |
| `jetbrains-mono-latin-400.woff2` | `'JetBrains Mono'` | `400` | kategori, status, taggar, chips, live-raden, sektionsetiketten, nyckeltalens etiketter |

**Källan, och hur den hämtas en gång:** P2 hämtar
`https://fonts.googleapis.com/css2?family=Urbanist:wght@600..700&family=Manrope:wght@400..700&family=JetBrains+Mono:wght@400&display=swap`
med en aktuell webbläsares `User-Agent`. Utan den svarar Google med TTF. Ur svaret
används blocken märkta `/* latin */`. Filerna laddas ned från de
`fonts.gstatic.com`-adresser som står i blocken och döps om enligt tabellen.
`unicode-range` och `font-weight` kopieras **ordagrant** ur respektive latin-block.
Det är samma väg som Didact Gothic hämtades. **P2 klistrar in de tre blocken ur
svaret i överlämningen.** Visar svaret något annat än ett block och en adress per
familj (t.ex. olika adresser per vikt) stannar P2 och lämnar tillbaka hit. Det
avgörs inte på plats.

**Licens:** alla tre är SIL OFL 1.1. OFL-texten läggs bredvid som
`src/styles/fonts/OFL-urbanist.txt`, `OFL-manrope.txt` och `OFL-jetbrains-mono.txt`,
hämtade från `github.com/google/fonts` (`ofl/<familj>/OFL.txt`). Ingen CSS
refererar dem, så de hamnar inte i `dist/`. **Didact Gothic hade ingen sådan fil.**
Det rättas inte i efterhand, eftersom filen tas bort.

**`fonts.css` — ett `@font-face` per fil, alla med `font-style: normal;` och
`font-display: swap;`.** Ingen `<link rel="preload">`, samma skäl som förut: Vite
ger filerna innehållshash. Behöver Lighthouse preload är det ett eget beslut med
den avvägningen framme (M17).

**Typsnittstokens (i `tokens.css`, M5), tecken för tecken:**

```css
--font-heading: 'Urbanist', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Manrope', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Mono', Consolas, monospace;
```

**Grundtypografin i `global.css` (P2), tecken för tecken.** Den ersätter
`font-weight: 400` på `body` och regeln `h1, h2, h3, h4, strong, b { font-weight: inherit; }`:

```css
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

h1 {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }

strong,
b {
  font-weight: var(--weight-semibold);
}
```

`overflow-wrap: anywhere` på `body` står kvar oförändrad ("360 px-golvet och
grid" gäller).

**Krocken med A6 (avgjord efter P2): M1 gäller.** Kompetenskortets `.cardTitle`
är ett `h3` och får `--tracking-tight` ur regeln ovan från P2. A6:s "utan
spärrning" är upphävt för `.cardTitle`. Det sattes mot den gamla breda
spärrningen, och rubriken byts ändå i P11 mot mono-stilen (M15, som ger
`--tracking-mono`). Ingen undantagsregel läggs in för de paket som är kvar till
dess. **P11 genomför** och skriver i samma ändring om kommentaren ovanför
`.cardTitle` i `Skills.module.css`, som fram till dess påstår "utan spärrning".

**De återanvändbara textstilarna bor i `src/styles/type.module.css`** och sätts
**i JSX**, aldrig med `composes` (avgjort efter P5, se nedan). Det blir inga
globala klasser. **Filen skapas av det första paket som har en konsument**
(`.eyebrow` och `.meta` i P5, där rollraden är `.meta`. `.tag` i P7), inte av P2.
En stil utan konsument är samma döda fält som ett token utan konsument.
Deklarationerna, tecken för tecken:

```css
.eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-eyebrow);
  color: var(--accent);
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--tracking-mono);
  color: var(--ink-subtle);
}

.tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-mono);
  color: var(--ink-subtle);
}
```

**Rättat 2026-11-07 efter P11 (M15b punkt 3):** `font-weight: var(--weight-regular);`
läggs till i `.meta` och `.tag` i **P11b**. Mono-filen finns bara i vikt 400, så
**en typklass med `--font-mono` sätter vikten själv** och ärver den aldrig. Annars
ärver ett `h3` eller `strong` med typklassen vikt 600, och webbläsaren ritar en
syntetisk fetstil. Före P11b saknade båda klasserna raden.

`src/styles/` får därmed innehålla `type.module.css` utöver `fonts.css`,
`tokens.css`, `global.css` och `fonts/`.

**Hur stilen når elementet (avgjort efter P5): import i JSX, inte `composes`.**
`composes … from '<fil>'` ger Vite-varningen "A PostCSS plugin did not pass the
`from` option" i varje bygge. Klasserna fungerar, men en varning alla lär sig läsa
förbi är det felläge LARDOMAR 2026-10-05 ("Grindar") beskriver. Därför:

- Importnamnet är **`typeStyles`**, i varje fil:
  `import typeStyles from '../styles/type.module.css';`
- Har elementet **ingen** egen stil utöver textstilen:
  `className={typeStyles.meta}`. Ingen tom modulklass skapas.
- Har elementet egen stil: `` className={`${typeStyles.meta} ${styles.category}`} ``,
  typklassen först.
- **Invarianten:** modulklassen får aldrig deklarera en egenskap som typklassen
  sätter (`font-family`, `font-size`, `font-weight`, `text-transform`,
  `letter-spacing`, `color`). Två klasser i olika moduler har samma specificitet,
  och vilken som vinner beror då på i vilken ordning Vite buntar filerna. Det är
  inget beslut och ska inte kunna bli ett.
- **Verifiering i varje paket som använder en typklass:** `grep -rn "composes" src`
  ger noll träffar, och utdata från `npm run build` innehåller inte strängen
  `did not pass the`. Utdata klistras in i överlämningen.
- **Genomförs i P5, omgång 2:** `.eyebrow` och `.role` tas bort ur
  `Hero.module.css`, `Hero.jsx` importerar `typeStyles` (M10), och kommentaren
  överst i `type.module.css`, som beskriver `composes`, skrivs om till hur filen
  används. P7, P9, P11 och P12 följer regeln när de skapar sina konsumenter.

#### M1d — Teckengrinden mäter varje familj mot de fält som renderas i den

Unionen av alla filer, som grinden räknar i dag, räcker inte längre. Ett tecken
som finns i Manrope men saknas i JetBrains Mono skulle passera grinden och sedan
renderas i reservtypsnittet i en tagg. **Beslut:**

1. **Täckning per familj.** Grinden läser **alla** `@font-face` i `fonts.css`
   (`matchAll`) och grupperar dem på `font-family`. Inom en familj och samma
   `font-weight`-deklaration är täckningen **unionen** av filerna (flera
   `unicode-range`-delmängder kompletterar varandra). Mellan olika
   `font-weight`-deklarationer i samma familj är täckningen **snittet**, eftersom
   ett tecken måste finnas i den vikt det renderas i. Med M1:s tre filer blir det
   en fil per familj. Regeln står ändå skriven så att den inte går sönder om P2
   måste falla tillbaka till en fil per vikt.
2. **Vilka fält som renderas i vilken familj står i EN tabell,** konstanten
   `FONT_ROLES` i `scripts/validate-data.mjs`. Nycklarna är sökvägar i datan.
   `[]` betyder ett element i en lista, och `—` betyder att fältet inte renderas
   som text. Familjenycklarna `heading`, `body` och `mono` slås upp mot
   `font-family`-namnen `Urbanist`, `Manrope` och `JetBrains Mono`.

   | Sökväg | Familjer |
   |--------|----------|
   | `sections[].label` | heading, body, mono |
   | `sections[].id` och varje `*_ID`-konstant i `sections.js` | — |
   | `skillGroups[].id` | — |
   | `skillGroups[].title` | mono |
   | `skillGroups[].skills[].name` | mono |
   | `projects[].slug`, `projects[].image`, `projects[].liveUrl`, `projects[].githubUrl` | — |
   | `projects[].title` | heading |
   | `projects[].category` | mono |
   | `projects[].status` | mono |
   | `projects[].description` | body |
   | `projects[].tech[]` | mono |
   | `PROJECT_CATEGORIES[]` | body, mono |
   | `PROJECT_STATUSES[]` | mono |
   | `about.paragraphs[]`, `about.link.phrase` | body |
   | `about.link.projectSlug` | — |
   | `contact.email`, `contact.links[].label` | body |
   | `contact.links[].url`, `contact.form.endpoint`, `contact.form.accessKey`, `contact.form.hcaptchaSiteKey` | — |
   | `profile.name` | body |
   | `profile.role` | body, mono |

   **Tillfälligt, från P2 till P6:** datan bär fortfarande de gamla fältnamnen,
   och `FONT_ROLES` har därför fyra rader till: `projects[].id` → `—`,
   `projects[].url` → body (det gamla kortet skriver värdnamnet som knapptext),
   `projects[].repoUrl` → `—` och `about.link.projectId` → `—`. Raderna godkänns
   som byggaren skrev dem och **står kvar tills P6 byter fältnamnen.** P6 tar
   bort de fyra raderna och markeringen med nyckeln `FONT_ROLES-gamla-projektfält`
   i samma ändring som omdöpningen (M3). Efter P6 ska en kvarglömd gammal rad
   inte kunna dölja något: datan har då inga sådana fält, och raden är död.

3. **En sträng på en sökväg som saknas i `FONT_ROLES` fäller bygget:**
   `<fil>: fältet <sökväg> saknar typsnittsroll (FONT_ROLES i scripts/validate-data.mjs)`.
   Det tvingar den som inför ett fält att ta ställning. Tystnad är inget alternativ.
   Talvärden, som `PROJECT_IMAGE_WIDTHS`, är inte strängar och berörs inte.
4. **Grundmängden.** Varje familj ska dessutom innehålla U+0020–U+007E,
   `å ä ö Å Ä Ö` och `·` (U+00B7). Den täcker de texter som står som
   literaler i komponenterna (siffrorna och `/` i sektionsetiketten,
   "Visar … av … projekt", "Sök projekt") utan att grinden behöver läsa `.jsx`.
5. **Felmeddelandet** får familjen:
   `projects.js: tecken saknas i JetBrains Mono ("Łódź", tecken "Ł" U+0141, fältet projects[].tech[])`.
   **Åtgärden är att lägga till en delmängd som verkligen innehåller tecknet, för
   den familjen, aldrig att döpa om Jelals post.**
6. **Upplysningsraden** visar en siffra per familj:
   `<n> tecken i Urbanist, <n> i Manrope, <n> i JetBrains Mono` (`UPPLYSNING`, ingen
   grind).
7. **Meddelandena för `fonts.css` själv (avgjort efter P2).** Byggarens två
   ordalydelser godkänns som de står, och en tredje läggs till:

   | Fall | Meddelande |
   |------|------------|
   | Ett `@font-face`-block saknar `font-family` (nyckel `fonts-block-utan-familj`) | `fonts.css: ett @font-face-block saknar font-family, teckensnittets täckning går inte att läsa` |
   | En familj saknar ett tecken ur grundmängden (nyckel `grundmangd-meddelande`) | `fonts.css: tecken saknas i <familj> (tecken "<t>" U+XXXX, grundmängden)` |
   | En familj i `FONT_FAMILIES` har **inget** `@font-face`-block alls | `fonts.css: inget @font-face-block för <familj>, teckengrinden kan inte mäta den` — **en** rad, och grundmängdskontrollen hoppas över för den familjen |

   Skälet till den tredje: i dag ger en borttagen familj en rad per tecken i
   grundmängden (102 rader), och felet syns inte i mängden. Samma princip som
   "ett tecken i 50 poster ger en rad". Datafälten som renderas i familjen larmar
   fortfarande, så inget tystnar. **P5 genomför** (första paket efter P2 som rör
   `validate-data.mjs`): lägger till den tredje raden, prövar den med tre indata,
   och tar bort de två markeringarna med nycklarna ovan i samma ändring.

**Vilken legitim ändring får fälla grinden? Ingen.** Jelal som skriver ett
tecken som faktiskt saknas i den familj det renderas i är ett riktigt fel. Ett nytt
fält utan roll är en ändring av en byggare, och det felmeddelandet föreskriver
(lägg till rollen) får grinden att tiga.

**Prövning i P2, tre indata per fil:** korrekt (tyst). Ett tecken som saknas i
just den filen, insatt i ett fält med den familjen (larm med fil, familj och
tecken). Åtgärden (tyst). Därtill: samma tecken i ett fält som **inte** renderas i
den familjen ska **inte** larma, för det beviser att grinden mäter per familj. Och
ett extra `@font-face` i en isolerad kopia beviser att alla block läses.

**Mätning i webbläsaren (P2):** efter `document.fonts.ready`, för var och en av
de tre familjerna, att `document.fonts` har en post med den familjen och
`status === 'loaded'`. Dessutom första namnet i den beräknade `font-family` på
`h1`, på ett stycke brödtext och på ett mono-element.

### M2 — `.surface-light` tas bort helt (P2) — premissen "mörk rakt igenom" och följden för avgränsarna UPPHÄVDA 2026-11-08, se M23

> **UPPHÄVT 2026-11-08, se M23 (Jelals beslut 9):** sidan har ljusa sektioner igen,
> Projekt och Om mig. Mekanismen är attributet `data-surface="light"` och ett
> ombindningsblock direkt efter `:root`, inte klassen. **Det som fortfarande
> gäller ur M2:** klassen `.surface-light` finns inte och kommer inte tillbaka, och
> `grep -rn "surface-light" src scripts` ger noll. Punkten om avgränsarna nedan
> gäller bara mellan två mörka sektioner (M23 punkt 5). Meningen "Den nya designen
> är mörk rakt igenom" och raden om `validate-tokens.mjs` är historik: skriptet
> räknar i dag bara `:root` som deklarerat och grindar ombindningen (M23 punkt 1).

~~Den nya designen är mörk rakt igenom.~~ **Klassen, ombindningsblocket i
`tokens.css` och `className="surface-light"` i `Projects.jsx` tas bort i P2.**
Ingenting behålls "för framtiden".

- `validate-tokens.mjs` slutar tala om klassen: deklarationer räknas var de än står
  i `tokens.css` (M5).
- Kommentarerna som nämner klassen skrivs om **till invarianter** eller tas bort
  i samma ändring. Det gäller `Projects.jsx`, `tokens.css`,
  `ProjectCard.module.css`, `About.module.css`, `Contact.module.css`,
  `ContactForm.module.css` och `validate-tokens.mjs` (LARDOMAR 2026-10-08: sök
  på namnet i hela projektet och redovisa sökningen).
- Följden för sektionsavgränsarna: alla gränser ritas nu i `--line` på mörk yta.
- `grep -rn "surface-light" src scripts` ska ge **noll** träffar efter P2.

### M3 — Projektdatan (P6)

**Uppdragets fältnamn införs.** `id` → `slug`, `url` → `liveUrl`, `repoUrl` →
`githubUrl`. Två namn för samma sak i en fil Jelal redigerar vore sämre än en
engångsomdöpning. Kortet byggs ändå om i P7.

```js
/**
 * @typedef {'Fullstack'|'Frontend'|'Backend'} ProjectCategory
 * @typedef {'Live'|'Skolprojekt'|'Arkiverad'} ProjectStatus
 *
 * @typedef {Object} Project
 * @property {string}          slug         OBLIGATORISK. Unik, gemener, a-z0-9-. React-key och kortets id (ankarmål för Om mig). Får inte krocka med något annat id på sidan (R2).
 * @property {string}          title        OBLIGATORISK. Projektets namn. Visas som titel och i logo-brickan.
 * @property {ProjectCategory} category     OBLIGATORISK. Ett av värdena i PROJECT_CATEGORIES.
 * @property {ProjectStatus}   status       OBLIGATORISK. Ett av värdena i PROJECT_STATUSES.
 * @property {string}          description  OBLIGATORISK. 1-2 meningar på svenska.
 * @property {string[]}        tech         OBLIGATORISK. Får vara tom []. Visas som taggar och blir filterchips. Ingen teknik två gånger (R2).
 * @property {string|null}     image        OBLIGATORISK NYCKEL. Bildnamn utan ändelse, eller null (då platshållare).
 * @property {string|null}     [liveUrl]    Valfri. https-adress till live-sajten, eller null.
 * @property {string|null}     [githubUrl]  Valfri. https-adress till koden, eller null.
 */
export const PROJECT_CATEGORIES = ['Fullstack', 'Frontend', 'Backend'];
export const PROJECT_STATUSES = ['Live', 'Skolprojekt', 'Arkiverad'];
```

- **`logo` införs inte.** Det finns ingen loggfil för något projekt och ingen
  pipeline för en. Ett fält som bara kan vara `null` är dött fält. Brickan visar
  `title` (uppdraget: "projektets logga eller namn"). Vill Jelal ha loggor är det
  ett eget beslut. Ett `logo`-fält i datan fälls av grinden för okända fält.
- **`status`:** alla tre värdena är tillåtna. Pricken är grön (`--positive`) för
  `Live` och grå (`--ink-subtle`) för `Skolprojekt` och `Arkiverad`. Färgen är
  aldrig ensam bärare, eftersom statusen alltid står som text bredvid.
- **Ordningen i `PROJECT_CATEGORIES` är segmentens ordning** (M11).
- **Awle enligt Jelals beslut 5:** `category: 'Fullstack'`, `status: 'Live'`, de
  sex teknikerna i den ordning de står i dag, `liveUrl: 'https://awle.se'`,
  `githubUrl: null`, `image: 'awle'`. Beskrivningen: se P6 i `PLAN.md`. Byggaren
  härleder den ur beslut 5 och dagens text, utan ny fakta, och flaggar den till
  G1.
- **`about.link.projectId` döps om till `about.link.projectSlug`** i samma
  ändring, med `validate-data.mjs` och `About.jsx`. Fältet pekar på `slug`, och ett
  namn som säger `Id` om något som heter `slug` är ett löfte som inte stämmer.
- **Kommentaren överst i `projects.js` skrivs om helt** (LARDOMAR 2026-10-05: ett
  löfte i en fil Jelal redigerar får aldrig vara osant). Den räknar upp
  fälten, de tillåtna värdena, att bilden ska vara en PNG i
  `assets-source/projects/` som beskärs till 4:3 från vänster kant (M4), och
  reglerna bygget kontrollerar.

**Länkregeln är EN funktion på ETT ställe,** `src/lib/projectRules.js`:

```js
/** Kortets länkmål: liveUrl, annars githubUrl, annars inget. */
/** @param {Project} project  @returns {string|null} */
export function projectHref(project)

/** Samma krav som valideringen. Kort, filter, räknare, Om mig och OK-raden läser detta. */
/** @param {unknown} project  @returns {boolean} */
export function isComplete(project)
```

`isComplete` flyttar från `ProjectCard.jsx` till `src/lib/projectRules.js` i P6.
`About.jsx` och `Projects.jsx` importerar den därifrån, och `validate-data.mjs`
importerar samma funktion, så att OK-radens antal är **antalet kort som
renderas**. `src/lib/` är ren JavaScript utan React, JSX och DOM, så att Node kan
importera den.

Länkattribut när `projectHref` ger en adress: `target="_blank"` och
`rel="noopener noreferrer"` (samma mönster för varje extern länk på sidan, M19
punkt 3). När den ger `null` renderas kortet utan `<a>`.

**Grindarna i `validate-data.mjs` (P6), ett meddelande per fall:**

| Fall | Meddelande |
|------|------------|
| Obligatoriskt textfält borttaget, `''` eller `'   '` (`slug`, `title`, `description`) | `projects.js: <fält> saknas eller är tomt (post <n>, "<slug eller ?>")` |
| `category` inte i `PROJECT_CATEGORIES` | `projects.js: category måste vara ett av Fullstack, Frontend, Backend (post <n>, "<slug>", fick "<värde>")` |
| `status` inte i `PROJECT_STATUSES` | samma form, med Live, Skolprojekt, Arkiverad |
| `tech` inte en lista med icke-tomma strängar | `projects.js: tech måste vara en lista med text (post <n>, "<slug>")` |
| `image` saknas som nyckel, `''`, `'   '`, eller saknar genererade filer | `projects.js: image måste vara null eller ett namn vars bilder är genererade (post <n>, "<slug>")` |
| `liveUrl` eller `githubUrl` finns men är varken `null` eller en sträng som börjar med `https://` | `projects.js: <fält> måste vara null eller en https-adress (post <n>, "<slug>")` |
| Okänt fält | `projects.js: okänt fält på projekt ("<slug>", fält "<namn>")` |
| `slug` förekommer två gånger eller bryter mot `a-z0-9-` | `projects.js: slug "<slug>" ...` (dubblett respektive ogiltigt tecken) |
| **Tillagt 2026-11-07 (R2):** samma teknik två gånger i `tech` i ett projekt, jämfört efter `trim()` och `toLocaleLowerCase('sv')` | `projects.js: tekniken "<värde>" står mer än en gång i tech (post <n>, "<slug>")` |
| **Tillagt 2026-11-07 (R2):** ett id som kortet sätter är redan ett id på sidan | `sidans id: "<id>" sätts av både <källa 1> och <källa 2>`, se R2 för källorna och mekanismen |

Varje rad prövas med tre indata, i P6:s godkännandepunkt 1. De två tillagda raderna
prövas i G1-rättningen, se R2.

#### M3b — De öppna frågorna från P6, avgjorda (genomförs i P7)

P7 tar bort markeringen nedan i samma ändring som beslutet genomförs, och
ersätter den med `/* Beslutat i ARKITEKTUR.md: M3b */` (LARDOMAR 2026-10-02).
Kvarvarande text i kommentaren skrivs som invariant.

| Nyckel | Fil | Beslut |
|--------|-----|--------|
| `isComplete-kravmangd` | `src/lib/projectRules.js` | Godkänd som den står: `slug` (text, `a-z0-9-`), `title`, `description`, `category`, `status` och `tech`. Kriteriet: `isComplete` prövar de krav i grindtabellen ovan som går att avgöra ur posten själv **och som kortet behöver för att renderas**. Bildfilerna och slugens unikhet prövas bara av valideringen, eftersom de inte går att avgöra ur en post. `image`-nyckelns form, url-formaten och okända fält prövas inte heller: valideringen fäller dem, och kortet tål dem redan (`hasImage` i `ProjectCard.jsx`, och `projectHref` ger `null` för allt som inte är https). Ingen kod ändras, bara kommentaren |
| Dubbla larm (ingen nyckel) | `scripts/validate-data.mjs` | Ändrad: **teckengrinden läser inte en projektpost som datagrinden redan har fällt.** Se nedan |

**Dubbla larm: mekanismen (P7).** Med `tech: 'React'` eller ett okänt fält gav
bygget i dag dessutom `saknar typsnittsroll (FONT_ROLES …)`. Den åtgärden är fel
för Jelal, som har gjort ett datafel, och följer han den tystnar fel grind
(LARDOMAR 2026-10-05, "Grindar").

```js
/** Fäller enligt grindtabellen i M3. Returnerar indexen för de poster som fick minst en rad. */
/** @param {object} mod  @returns {Promise<Set<number>>} */
async function checkProjects(mod)

/* Oförändrad signatur. */
function checkFontSubset(fileName, mod, coverage)
```

- För `projects.js` anropas `checkFontSubset` med en kopia av modulen där
  `projects` bara innehåller poster vars index **inte** finns i mängden ur
  `checkProjects`. Är `projects` inte en array hoppar teckengrinden över hela
  exporten (`checkProjects` har redan fällt den). Övriga exporter i filen och
  övriga datafiler läses som i dag.
- **Varför per post och inte "hoppa över fält utanför datamodellen":** den
  regeln täcker inte `tech` som sträng, vars sökväg `projects[].tech` är ett känt
  fält med fel form. Och den hade stängt av skyddet för byggaren, som är själva
  skälet till larmet `saknar typsnittsroll`.
- **Ingenting tystnar för gott:** en fälld posts tecken mäts så snart Jelal rättat
  posten, och bygget är rött under tiden.
- **P7 prövar med tre indata, plus skyddet:**
  1. Korrekt data (Awle): tyst.
  2. `tech: 'React'` ger exakt en rad, tech-raden. `logo: 'x'` ger exakt en rad,
     raden om okänt fält. Ingen av dem ger `saknar typsnittsroll`.
  3. Den föreskrivna åtgärden (`tech` som lista, `logo` borttaget): tyst.
  4. Skyddet står kvar: med korrekt data och `'projects[].title'` tillfälligt
     borttagen ur `FONT_ROLES` ska raden `fältet projects[].title saknar
     typsnittsroll` komma.

### M4 — Projektbilden och kortet (P6 bilden, P7 kortet)

**Format: 4:3, webp, bredderna `PROJECT_IMAGE_WIDTHS = [600, 1200]`** i
`src/data/projects.js`.

- **Beskärning: full höjd, vänsterförankrad.** Ur en 16:10-källa på 1440 × 900
  tas fönstret `left: 0, top: 0, width: 1200, height: 900`. Skälet är uppmätt i
  bilden: Awle-loggan ligger vid x ≈ 108–185 och rubriken börjar vid x ≈ 112. En
  centrerad beskärning (x 120–1320) kapar loggan. En vänsterförankrad tappar bara
  "Logga in" och "Registrera dig" längst till höger. Regeln är allmän: är källan
  bredare än 4:3 tas full höjd från vänster kant, och är den högre tas full bredd
  från överkanten. Skärmdumpar av startsidor har sin identitet uppe till vänster.
- **Ingen uppskalning.** 1200 är källans beskurna bredd. Är beskärningen smalare
  än den största bredden i `PROJECT_IMAGE_WIDTHS` fäller skriptet med
  `GRIND: <namn>: beskuren bredd <b> px är mindre än <största> px`, före all
  skrivning. Det mönstret gäller redan i skriptet ("Grindar körs före skrivning").
- **Varför 600 och 1200:** kortet är som bredast i enspaltsläget strax under
  600 px vyport, ca 552 px. Där räcker 600 för 1×. 1200 täcker 2× i tre- och
  tvåspaltsläget och är det största källan ger.
- `optimize-project-images.mjs`: `RATIO` blir `4 / 3`, beskärningen enligt ovan,
  och storleksgrinden på 150 kB står kvar. Kommentaren om 16:10 skrivs om. De gamla
  `awle-640.webp` och `awle-1280.webp` tas bort i P6, eftersom de annars blir
  orefererade i `dist/`.
- **`<img>` i kortet:** `src` = 600-varianten, `srcSet` med båda bredderna,
  ~~`sizes="(min-width: 900px) 380px, (min-width: 600px) 50vw, 100vw"`~~
  (**UPPHÄVT 2026-11-08, se M21 punkt 2:** sista grenen är `calc(100vw - 3rem)`),
  `width="600"`, `height="450"`, `loading="lazy"`, `decoding="async"`, `alt=""`.
  **Lazy även för första kortet:** hero fyller första skärmen från 900 px ("Hero
  fyller första skärmen på dator"), och under 900 px står hero ovanför. Kortet
  ligger alltså under vikningen i alla mätserier, och ~~heros text är LCP-elementet~~
  (**UPPHÄVT 2026-11-08, se M21:** uppmätt är LCP-elementet heros `<img>`. Kortet
  ligger fortfarande under vikningen).
  **`alt=""` är ett beslut, inte en lucka:** bilden är en dekorativ skärmdump
  inuti en länk vars namn är titeln (se nedan). En beskrivande alt hade blivit en
  del av länkens namn och upprepat titeln.
- **Utan bild** (`image: null`): mediadelen behåller 4:3 och `--surface-2`, och
  logo-brickan står kvar.

**Kortets markup (P7).** Det är en `<li>` per kort i en `<ul>`:

```
<li class="item reveal" id={slug}>                 ← ankarmål för Om mig-länken (A4), bär scroll-marginalen (R1), tonas bara i opacitet (M12b)
  <a class="card" href={projectHref} target="_blank" rel="noopener noreferrer"
     aria-labelledby="{slug}-title {slug}-newtab" aria-describedby="{slug}-desc">
    <div class="media">
      <img … />                                    ← bara om image inte är null
      <span class="brand" aria-hidden="true">{title}</span>
    </div>
    <div class="body">
      <div class="meta">
        <span class="category">{category}</span>
        <span class="badge"><span class="dot" data-status={status} aria-hidden="true"></span>{status}</span>
      </div>
      <h3 class="title" id="{slug}-title">{title}</h3>
      <p class="description" id="{slug}-desc">{description}</p>
      <ul class="tags" aria-label="Tekniker">…<li class="tag">…</li></ul>   ← bara om tech inte är tom
      <span class="visually-hidden" id="{slug}-newtab">(öppnas i ny flik)</span>
    </div>
  </a>
</li>
```

Utan länk byts `<a …>` mot `<div class="card">` utan aria-attribut och utan
`newtab`-spannet. Länkens namn blir "Awle (öppnas i ny flik)" och beskrivningen
blir dess beskrivning. Hela kortets text som länkmening uppfyller inte P7:5.

**`ProjectCard.module.css`, tecken för tecken** (`.item` och `.brand` rättade
2026-11-07 efter G1, se R1 och R3):

```css
.item {
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.card {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  background-color: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.media {
  position: relative;
  aspect-ratio: 4 / 3;
  background-color: var(--surface-2);
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  display: block;
  height: 40px;
  max-width: calc(100% - 2 * var(--space-4));
  padding: 9px var(--space-3);
  border-radius: var(--radius-sm);
  background-color: rgba(255, 255, 255, .92);
  color: var(--ink-inverse);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: var(--space-2);
  padding: var(--space-5);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.category {
  min-width: 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 2px var(--space-2);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-badge);
  color: var(--ink-muted);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
}

.dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--ink-subtle);
}

.dot[data-status='Live'] {
  background-color: var(--positive);
}

.title {
  font-size: var(--text-title);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-title);
}

.description {
  font-size: var(--text-sm);
  line-height: var(--leading-snug);
  color: var(--ink-muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

/* I JSX: className={`${typeStyles.meta} ${styles.category}`} på kategorin och
 * className={`${typeStyles.tag} ${styles.tag}`} på varje tagg (M1, "Hur stilen
 * når elementet"). */
.tag {
  max-width: 100%;
}

a.card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform var(--duration-base) var(--ease-out),
      box-shadow var(--duration-base) var(--ease-out),
      border-color var(--duration-base) var(--ease-out);
  }

  .image {
    transition: transform .9s var(--ease-out);
  }

  a.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }

  a.card:hover .image {
    transform: scale(1.05);
  }
}

@media (hover: hover) and (prefers-reduced-motion: reduce) {
  a.card:hover {
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
}
```

- **Hover bara på kort som är länkar.** Ett kort utan mål som lyfter sig lovar ett
  klick som inte finns.
- `outline` ritas utanför elementets egen ram och klipps inte av dess egen
  `overflow: hidden`. P7:4 **mäter** det ändå.
- `.9s` står som literal, eftersom uppdraget anger det och inget annat element
  har den längden. Ett token med en konsument vore ingen vinst.
- **Brickan är en rad och klipps med ellips (R3, rättat 2026-11-07 efter G1).**
  Brickan har en fast höjd och text ur `src/data/`, och M4 sa inte vad som händer
  när titeln är längre än en rad. Med 47 tecken blev `scrollHeight` 53 mot 40, och
  raderna utanför brickan ritades mörkt på mörkt. Därför `white-space: nowrap`,
  `overflow: hidden` och `text-overflow: ellipsis`. `display` blir `block`,
  eftersom ellipsen inte ritas när texten ligger i en flexcontainer. Den vertikala
  centreringen som `align-items: center` gav bärs nu av `padding-block: 9px`,
  alltså (40 − 22) / 2 med `box-sizing: border-box` ur `global.css`. Brickan ser
  likadan ut som förut för en kort titel. `max-width: calc(100% - 2 * var(--space-4))`
  räknas mot `.media` (`position: relative`), så ellipsen slår in vid mediadelens
  inre kant och aldrig utanför. Brickan är `aria-hidden` och titeln står i sin
  helhet i `h3`, så ingen text går förlorad för skärmläsare.
  - Avvisat: `min-height: 40px` i stället för `height`. Brickan hade då vuxit uppåt
    över bilden med en lång titel, och uppdraget anger 40 px.
  - Avvisat: `line-height: 40px` utan padding. Det ger samma bild, men `22px` är
    det uppmätta och godkända värdet från P7, och padding ändrar mindre.
- **Hur 360-golvet mäts för brickan (R3).** Brickans `scrollWidth` är **större**
  än `clientWidth` när ellipsen är aktiv, och det är avsikten. Golvet mäts därför
  inte med `scrollWidth` på brickan utan mot dess behållare. Med syntessträngen
  som titel (47 tecken, `Hem och Ekonomi - hushållsapp för hela familjen`, och en
  obruten sträng på 60 tecken) vid 360 × 640, 600 × 640, 899 × 700, 900 × 700 och
  1280 × 800, med reserverad rullningslist 15 px (kontrollerat före serien):
  1. **GRIND:** `brand.scrollHeight <= brand.clientHeight` (talet ska vara 40 mot 40).
  2. **GRIND:** `brand.getBoundingClientRect().height` är 40 ±0,5.
  3. **GRIND:** brickans `left >= media.left + 16 - 0,5` och
     `right <= media.right - 16 + 0,5`, där `media` är `brand.parentElement`.
  4. **GRIND:** `getComputedStyle(brand).textOverflow === 'ellipsis'` och
     `brand.scrollWidth > brand.clientWidth` med syntessträngen, alltså att
     klippningen faktiskt sker.
  5. Sidans `scrollWidth <= clientWidth`, som för alla golvprov.
  - **Negativa kontroller:** injicera `li[id] [class*="brand"] { white-space: normal; }`
    sist i dokumentet. Klassnamnet är hashat av CSS Modules, därför
    delsträngsselektorn. Kontrollera `querySelectorAll('li[id] [class*="brand"]').length`
    mot antalet kort innan slutsatsen dras. Grind 1 ska larma med brickan som
    element som bär avvikelsen. Injicera sedan `max-width: none` på samma selektor.
    Grind 3 ska larma. Båda ska tiga när injektionen tas bort.

**Rutnätet, `Projects.module.css`, tecken för tecken.** Det ersätter
`repeat(auto-fit, minmax(280px, 1fr))` och taket på kortet:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
}

@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Ett ensamt kort blir alltså en tredjedel brett från 900 px och står till vänster.
Det är uppdragets rutnät. Jelals val B från 2026-10-05, med taket på kortet,
**upphävs av hans beslut 4** och är märkt på sin plats.

**Kontraster P7 mäter**, mina uträknade förväntningar enligt WCAG-formeln. De är
inte beslutet:

| Text | Mot | Förväntat |
|------|-----|-----------|
| `--ink-subtle` (kategori, taggar) | `--surface` | ca 4,99:1, alltså **knappt** över 4,5 |
| `--ink-muted` (beskrivning, badge) | `--surface` | ca 7,09:1 |
| `--ink-inverse` (brickan) | brickan över svart bild, sämsta fall `#EBEBEB` | ca 15,5:1 |
| `--ink-subtle` | `--surface-2` | ca **4,48:1, FALLER**. Därför **får `--ink-subtle` aldrig stå som text på `--surface-2`.** Ingen text gör det i M4 |

### M5 — Tokens: uppdragets namn ersätter `--color-*` (P2)

**Beslut: ersätt, mappa inte.** Ett alias ger två namn för samma sak, och
projektet har tre gånger betalat för kommentarer och namn som pekar på något som
bytts. P2 skriver om **varje** referens i `src/` och `scripts/` enligt
översättningstabellen nedan, och de gamla namnen deklareras inte längre. Varje
kvarglömd referens, även i en kommentar, fälls då av tokengrinden.

**`:root` i `tokens.css`, tecken för tecken.** Uppdragets tolv
deklarationer står exakt som i `UPPDRAG-2026-11-07.md`. Resten är mina.

> **Rättat 2026-11-07 efter G1 (R5).** ~~"var och en har en konsument"~~ var ett
> påstående om slutläget, skrivet som om det gällde efter P2. Sex tokens hade
> ingen konsument. **Ett token deklareras i samma paket som dess första
> `var()`-konsument** (M1:s princip om döda fält). Blocket nedan är därför
> **slutläget**, och varje rad märkt `← <paket>` finns **inte** i `tokens.css`
> förrän det paketet lägger till den, tillsammans med konsumenten. G1-rättningen
> tar bort de fem raderna och `--space-9`. Tokengrinden fäller från och med nu en
> deklaration utan konsument (M5h).

```css
--bg: #101010;
--surface: #181818;
--surface-2: #222222;
--line: #2e2e2e;
--line-strong: #7a756f;
--ink: #f4f1ec;
--ink-muted: #a8a39c;
--ink-subtle: #8d8780;
--ink-inverse: #141414;
--accent: #ff6b00;
--accent-fill: #ff6b00;                   /* ← P18b, med ProjectFilter.module.css (M23). Binds aldrig om */
--accent-hover: #ff8a3d;
--positive: #5dbb7e;
/* + blocket [data-surface='light'] direkt efter :root, tecken för tecken i M23 punkt 2 (P18a) */
--error: #f85149;
--overlay-grey: rgba(32, 32, 36, 0.45);  /* UPPHÄVT 2026-11-07, M10c: tas bort i P5 omgång 4, konsumenten (tonplattan) utgår */
/* + de fem temporära --media-*-tokens nedan, med dagens värden oförändrade. Tas bort i P7 */

--radius-chip: 3px;                       /* ← P9, med Chip.module.css (M15) */
--radius-badge: 4px;
--radius-sm: 8px;
--radius-md: 14px;
--radius-pill: 999px;

--ease-out: cubic-bezier(.16, 1, .3, 1);
--duration-fast: .16s;
--duration-base: .32s;
--duration-reveal: .72s;                  /* ← P10, med .reveal (M12) */
--shadow-lift: 0 24px 60px rgba(0,0,0,.55);

/* --font-heading, --font-body och --font-mono: de tre deklarationerna i M1, tecken för tecken */

--weight-regular: 400;
--weight-semibold: 600;
--weight-bold: 700;

--text-2xs: 0.6875rem;
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-title: 1.375rem;
--text-xl: clamp(1.25rem, 2.5vw, 1.5rem);
--text-2xl: clamp(1.75rem, 4vw, 2.5rem);
--text-3xl: clamp(2.75rem, 1.6rem + 5.2vw, 4.5rem);
--text-figure: clamp(2.5rem, 6vw, 3.5rem); /* ← P12, med KeyFigures (M14) */

--leading-display: 0.98;
--leading-tight: 1.1;
--leading-snug: 1.55;
--leading-normal: 1.6;

--tracking-display: -0.04em;
--tracking-tight: -0.02em;
--tracking-title: -0.01em;
--tracking-mono: 0.04em;
--tracking-eyebrow: 0.16em;

--measure: 62ch;
--content-max: 1180px;
--content-padding: 1.5rem;
--nav-offset: 16px;
--nav-height: 58px;
--header-height: calc(var(--nav-offset) + var(--nav-height));
--z-header: 10;

--reveal-index: 0;                        /* ← P10, med .reveal och Reveal.jsx (M12, M5g) */
--reveal-stagger: 70ms;                   /* ← P10, med .reveal (M12) */
```

`--space-2` till `--space-8` och `--space-10` står kvar oförändrade.
**`--space-9` tas bort i G1-rättningen (R5)** och läggs inte tillbaka: ingen regel
använder det och inget paket planerar en. **`--space-1` togs bort i P11 (M15b
punkt 1).** Dess enda konsument var `SkillChip.module.css`, som P11 tog bort, och
M5h fällde då deklarationen. Det läggs inte tillbaka. Behövs ett avstånd på 4 px
igen, deklareras tokenet i samma paket som konsumenten. `--space-10` byter inte namn. Ett hål i
numreringen kostar ingenting, ett namnbyte ändrar `global.css` utan skäl.

- **`--accent` blir `#ff6b00`, inte loggans uppmätta `#FC6F03`.** Uppdraget
  skriver ut värdet och säger "behåll min accentfärg". Jelals beslut 4 ("den nya
  designen gäller") avgör det. Skillnaden är 3/4/3 per kanal. Det är noterat för
  G1 att headerns PNG-märke är `#FC6F03` och står bredvid. "Accentfärg — mätning"
  är märkt.
- **`--text-3xl`** ger 44,3 px vid 360 px vyport och når taket 72 px vid ca 893 px
  (uppdraget: 72 px dator, ca 44 px mobil).
- **`--line-strong` som formulärram och sökfältsram:** mot `--surface` ca 3,89:1
  och mot `--bg` ca 4,17:1, alltså över 1.4.11:s 3:1. `--line` (ca 1,3:1) duger
  inte för en gränssnittskomponents avgränsning. Se M11 för sökfältet.
- **`--accent-hover`, `--ink-inverse`, `--error` och `--overlay-grey`** står inte i
  uppdraget men har konsumenter: hover på accentytor och accentlänkar, mörk text
  på orange (uppdraget: "#141414") och på logo-brickan, formulärets röda och
  porträttets tonplatta. Värdena för `--error` och `--overlay-grey` är dagens.
  **`--overlay-grey` UPPHÄVT 2026-11-07, se M10c:** tonplattan utgår och tokenet
  tas bort i P5 omgång 4, eftersom tokengrinden (M5h) fäller en deklaration utan
  konsument.
- **`--media-scrim`, `--media-scrim-strong`, `--media-pill-border`,
  `--media-pill-bg` och `--media-shadow` är TEMPORÄRA.** De bär det gamla kortet
  från P2 till P7, med dagens värden, och **tas bort i P7** tillsammans med kortet.
  Tokengrinden fäller varje referens som blir kvar. **Rättelse efter P2:**
  `--media-scrim-strong` har **ingen** konsument (påståendet ovan att varje token
  har en stämmer inte för det). Det står kvar till P7 och tas bort där med de
  andra fyra. Tokengrinden ser inte oanvända deklarationer, så P7 bekräftar med
  `grep -rn "media-" src scripts` att noll träffar återstår.

**Översättningstabellen (P2), tecken för tecken.** Vänster kolumn finns inte
efter P2:

| Gammalt | Nytt |
|---------|------|
| `--color-bg` | `--bg` |
| `--color-surface` | `--surface` |
| `--color-bg-top` | `--bg` (det gråa övre fältet utgår, M6 och M10) |
| `--color-header-border` | `--line` |
| `--color-border` | `--line` |
| `--color-field-border` | `--line-strong` |
| `--color-text` | `--ink` |
| `--color-text-muted` | `--ink-muted` |
| `--color-accent` | `--accent` |
| `--color-accent-hover` | `--accent-hover` |
| `--color-on-accent` | `--ink-inverse` |
| `--color-overlay-grey` | `--overlay-grey` |
| `--color-focus` | `--accent` |
| `--color-error` | `--error` |
| `--color-media-text` | `--ink` |
| `--color-media-text-muted` | `--ink-muted` |
| `--color-media-fallback` | `--surface-2` |
| `--color-media-accent` | `--accent` |
| `--color-media-accent-hover` | `--accent-hover` |
| `--color-media-scrim` / `-scrim-strong` / `-pill-border` / `-pill-bg` / `-shadow` | `--media-scrim` / `--media-scrim-strong` / `--media-pill-border` / `--media-pill-bg` / `--media-shadow` (temporära, P7) |
| `--font-sans` | `--font-body` |
| `--transition` | `var(--duration-fast) var(--ease-out)` skrivet ut. Tokenet tas bort |
| `--tracking-wide` | tas bort. Ingen konsument finns |
| `--content-max: 1120px` | `1180px` (M18) |
| `--content-padding: clamp(1rem, 5vw, 3rem)` | `1.5rem` (M18) |
| `--header-height: 64px` | `calc(var(--nav-offset) + var(--nav-height))` (M6) |
| `--radius-sm: 6px` / `--radius-md: 12px` | `8px` / `14px` |

**Globalt fokus (P2, `global.css`), tecken för tecken:**

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

**Kontrastkvoterna i `tokens.css`** skrivs vid varje texttoken i lärdomens format
(`/* <token> mot <bakgrund>: X,XXX:1 — AA <normal|stor> */`), **uppmätta i P2**
mot varje bakgrund tokenet faktiskt står på. Mina förväntningar, som ska
bekräftas eller rättas av mätningen: `--ink` mot `--bg` ca 16,9 och mot `--surface`
ca 15,7. `--ink-muted` mot `--bg` ca 7,6 och mot `--surface` ca 7,1.
`--ink-subtle` mot `--bg` ca 5,35 och mot `--surface` ca 4,99. `--ink-inverse`
mot `--accent` ca 6,45. `--accent` som text mot `--bg` ca 6,67. `--error` mot
`--surface` ca 5,3.

#### M5g — Tokengrinden gäller varje custom property

`validate-tokens.mjs` (P2) byter mönster:

- **Regeln:** varje namn som matchar `(?<![\w-])--[a-z][a-z0-9]*(?:-[a-z0-9]+)*`
  i `src/**/*.{css,jsx,js}` och `scripts/*.mjs` ska vara **deklarerat** i
  `tokens.css` (`--namn:` utanför kommentarer). Kommentarer räknas som
  förekomster, som i dag. **Skärpt 2026-11-08, se M23 punkt 1 (P18a):**
  deklarerat betyder deklarerat i `:root`, och varje `--namn:` utanför `:root`
  (ombindningen) ska också finnas i `:root`, med ett eget meddelande.
- **`src/data/` genomsöks inte.** Det är Jelals filer, och ingen text han skriver
  ska kunna fälla en tokengrind. Datafilerna refererar inga tokens.
- **`tokens.css` själv:** kommentarerna är fortfarande undantagna, men varje
  `var(--x)` utanför kommentarer ska peka på ett deklarerat namn, eftersom
  `--header-height` nu bygger på två andra.
- **Inline custom properties som JSX sätter** (`--reveal-index`, M12) ska ha en
  deklaration med standardvärde i `:root`. Då gäller regeln utan undantag.
- Meddelandet (rättat efter P2, byggarens form bekräftas):
  `validate-tokens.mjs: tokenet finns inte i tokens.css ("--x" i <fil>:<rad>)`,
  t.ex. `("--x" i src/components/Hero.module.css:20)`. `<fil>` är sökvägen
  relativt projektroten med `/`, och `<rad>` är **första** förekomsten i filen.
  En rad per par av token och fil. "Oförändrat" var fel: prövningen nedan kräver
  fil och rad. Genomfört i P2, inget kvar att göra.

**Vilken legitim ändring får fälla grinden? Ingen.** Ett nytt token som används
utan deklaration är felet grinden finns för. En kommandoradsflagga skrivs inte med
två bindestreck i en kommentar i `scripts/`, eftersom den då läses som ett token.
Det är en skrivregel för byggare och påverkar inte Jelals filer. **Prövning i P2:**
ett påhittat namn larmar med fil och rad, tiger när det rättats, och ett gammalt
`--color-*`-namn i en kommentar larmar.

#### M5h — Tokengrinden fäller också en deklaration utan konsument (G1-rättningen, R5)

G1 hittade sex tokens utan konsument, och grinden ovan ser bara åt ena hållet.
Lärdomen 2026-11-07 föreskriver en grep före varje paket. En grind gör det åt
byggaren, och projektet har betalat för varje kontroll som bara stod i prosa
(LARDOMAR 2026-10-05).

- **Regeln:** varje `--namn:` i `:root` i `tokens.css` (utanför kommentarer) ska ha
  minst en förekomst av `var(--namn` utanför kommentarer i `src/**/*.{css,jsx,js}`.
  En förekomst i `tokens.css` räknas, eftersom `--header-height` konsumerar
  `--nav-offset` och `--nav-height` där. En kommentar räknas **inte** som
  konsument.
- **Meddelandet:** `validate-tokens.mjs: tokenet har ingen konsument ("--x" deklarerat i src/styles/tokens.css:<rad>)`.
  En rad per token.
- **Följd för kommentarer i `tokens.css`:** ett borttaget token får inte nämnas i en
  kommentar, eftersom M5g då fäller det som odeklarerat. Kommentaren som pekar
  fram mot P9, P10 och P12 skrivs utan tokennamn ("tokens för chips, reveal och
  nyckeltal deklareras i det paket som bygger dem").
- **Vilken legitim ändring får fälla grinden?** Att en konsument tas bort medan
  tokenet står kvar. Åtgärden är att ta bort tokenet, och då tiger grinden.
- **Prövas i G1-rättningen, i denna ordning:**
  1. Grinden byggs **innan** de sex tas bort. Den ska då ge **exakt sex** rader,
     en per token i fynd 7. Det visar att den larmar av rätt skäl.
  2. De sex tas bort: tyst.
  3. `--x-test: 0;` läggs till i `:root`: en rad, med rätt radnummer. Borttaget: tyst.

### M6 — Headerns höjd med svävande nav (P3)

**Två token, en härledd summa.** `--nav-offset: 16px` är avståndet från toppen och
`--nav-height: 58px` är pillens höjd (40 px CTA + 2 × 8 px padding + 2 × 1 px
kant, med `box-sizing: border-box`). `--header-height` är **härledd** som deras
summa, 74 px, och är det `scroll-margin-top` och heros `min-height` räknar med.
Ingen av dem står som tal någon annanstans.

**`Header.module.css` (P3), tecken för tecken:**

```css
.header {
  position: sticky;
  top: var(--nav-offset);
  margin-top: var(--nav-offset);
  z-index: var(--z-header);
  pointer-events: none;
}

.pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  height: var(--nav-height);
  max-width: var(--content-max);
  margin-inline: auto;
  padding: 8px 8px 8px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background-color: rgba(20, 20, 20, .62); /* UPPHÄVT 2026-11-08, se M23 punkt 3: rgba(20, 20, 20, .9), i P18b */
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  pointer-events: auto;
}

@supports not ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
  .pill { background-color: rgba(20, 20, 20, .94); }
}
```

- **Sticky, inte fixed.** Headern ligger i flödet med `margin-top` och tar exakt
  `--header-height` i anspråk ovanför hero. Det är skälet till att heros
  `min-height: calc(100svh - var(--header-height))` fortsätter att stämma utan att
  hero behöver veta något om naven.
- **`pointer-events: none` på det genomskinliga omslaget**, och `auto` på pillen.
  Annars blockerar de genomskinliga sidorna klick på innehåll som rullar under.
- **Utan `backdrop-filter`** blir bakgrunden nästan opak. Texten ska vara läsbar
  oavsett vad som rullar under.
- **Headerns `border-bottom` och det gråa bandet utgår.** Pillens egen kant är
  gränsen. Det upphäver "Headern är enfärgad" och kraven på `--color-header-border`.
- **Mätningen (P3):** pillens `getBoundingClientRect()` har `top === 16` och
  `height === 58` vid scroll 0 och vid scroll till botten.
  `getComputedStyle(section).scrollMarginTop` är `90px` (74 + `--space-4`). Varje
  ankarhopp landar med sektionens överkant **under pillens `bottom`**. Kontrast:
  `--ink` på pillen mot den ljusaste punkt som kan rulla under (porträttets vägg
  och en vit pixel i projektbilden) mäts. Mitt överslag för en helvit underyta är
  ca 4,6:1 före blur, alltså knappt. Faller det höjs pillens alfa, och det beslutet
  lämnas tillbaka hit.
- **A16:s nämnare:** med margin ovanför headern är `header.getBoundingClientRect().height`
  58, inte 74. Nämnaren läses därför som **headerns `bottom` vid scroll 0**. A16 är
  märkt.

### M7 — Aktiv länk (P3)

**Bekräftat:** `useCurrentSection` med läsraden behålls oförändrad. Den läser
bandets läge ur sektionernas `scrollMarginTop` och följer därför med M6 av sig
själv. **Tillägg 2026-11-07 (M12b punkt 2, P9b):** utan `IntersectionObserver`
returnerar effekten direkt. Då markeras ingen länk, ingen lyssnare registreras,
och sidan kraschar inte. Understrykningen läggs på det befintliga attributet, tecken för tecken:

```css
.navLink {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  color: var(--ink);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  white-space: nowrap;
}

.navLink:hover {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}

.navLink[aria-current='true'] {
  text-decoration-line: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}
```

`min-height: 40px` stänger den öppna punkten om navlänkarnas träffyta på 19 px.

**Hover byter inte färg (ändrat efter P4, genomförs i P4b).** Orange text
(`--accent-hover` som byggaren mätte, och `--accent` som stod här) på pillen
ovanför vitt innehåll ger 2,20:1, alltså under AA. Hover ger därför bara en
understrykning i textens egen färg, `--ink`, som håller pillens kontrast
oberoende av vad som rullar under. Den aktiva länken skiljs från hover av
understrykningens **färg** (orange mot vit). Hover är ett övergående
pekartillstånd, och användaren vet var pekaren står.

- **Ordningen i filen är bindande:** `[aria-current='true']` står **efter**
  `:hover`. Båda har specificiteten (0,2,0), så den senare vinner, och en aktiv
  länk under pekaren behåller sin orange understrykning.
- **Gäller bara pillen.** Panelens `.link:hover { color: var(--accent); }` i
  `MobileMenu.module.css` står kvar. Panelen är opak `--bg`, och där är kvoten
  6,664:1 (`tokens.css`).
- **P4b mäter:** med pekaren över en icke-aktiv navlänk är `getComputedStyle(a).color`
  lika med det beräknade värdet av `--ink` och `textDecorationLine` är `underline`.
  Över den aktiva länken är `textDecorationColor` det beräknade värdet av `--accent`.

**CTA "Kontakta mig" (P3), tecken för tecken.** Texten står som konstanten
`ctaText = 'Kontakta mig'` i `Header.jsx`. Målet är `CONTACT_ID`, och CTA:n
renderas bara om `sections.some((s) => s.id === CONTACT_ID)`:

```css
.cta {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-pill);
  background-color: var(--accent);
  color: var(--ink-inverse);
  font-weight: var(--weight-semibold);
  white-space: nowrap;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.cta:hover {
  background-color: var(--accent-hover);
}
```

Ordningen i DOM och för Tab: logga, de fyra navlänkarna, CTA.

### M8 — Mobilmenyn (P4)

- **Brytpunkt: under 900 px.** Mobil först: basen är hamburgern, och
  `@media (min-width: 900px)` visar navlistan och CTA:n och döljer hamburgern med
  `display: none`. Navlistans fyra länkar plus CTA:n och loggan behöver ca 580 px.
  Vid 600 px finns ca 550, så 600 är för smalt. 900 är en befintlig brytpunkt.
- **Hamburgern:** `<button type="button" aria-expanded={open} aria-controls="mobile-menu">`
  med `MenuIcon` och den visuellt dolda texten "Öppna meny". Mått 40 × 40 px,
  `border-radius: var(--radius-pill)`, `border: 1px solid var(--line-strong)`.
- **Panelen:** `<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Meny">`,
  `position: fixed; inset: 0;`, bakgrund `--bg` (opak). Den renderas **bara när
  den är öppen**, så att två navlistor aldrig står i tillgänglighetsträdet samtidigt.
  Den ligger inuti `<header>` och ärver headerns lagernivå, så inget nytt z-index
  behövs. Innehåll i DOM-ordning: stängknappen (`CloseIcon` + "Stäng meny", på
  samma plats som hamburgern), `<nav aria-label="Huvudnavigering">` med samma länkar
  ur `sections` i `--font-heading` och `--text-2xl`, och sist CTA:n.
- **Fokus:** vid öppning flyttas fokus till första navlänken. Tab och Shift+Tab
  cirkulerar inom panelen (första ↔ sista). Esc stänger. Vid stängning med Esc
  eller stängknappen går fokus tillbaka till hamburgern. **Vid ett länkklick
  bestämmer webbläsarens ankarhopp var Tab fortsätter**, alltså i målsektionen
  (avgjort efter P4, se M8b). Den som valde en sektion ska fortsätta där, inte
  längst upp i headern.
- **Scroll-lås:** `document.documentElement.style.overflow = 'hidden'` vid
  öppning, och det tidigare värdet återställs vid stängning och avmontering. Ingen
  global klass. **Vid klick på en navlänk hävs låset synkront i klickhanteraren,
  före webbläsarens ankarhopp**, och därefter stängs panelen. Låset får inte
  ändra layoutbredden: rullningslistens plats hålls av `scrollbar-gutter: stable`
  på `html` i `global.css` (beslutat 2026-11-07, se M10b punkt 3).
- **Stängs av sig själv** om vyporten passerar 900 px medan den är öppen
  (`matchMedia('(min-width: 900px)')`-lyssnare).
- **CTA:n ligger i panelen**, och i pillen bara från 900 px.

#### M8b — De öppna markeringarna från P3 och P4, avgjorda (genomförs i P4b)

Varje rad godkänner byggarens lösning **som den står i koden** om inget annat
sägs. P4b tar bort varje `EJ I ARKITEKTUR` + `OPEN-KEY` nedan i samma ändring och
ersätter den med `/* Beslutat i ARKITEKTUR.md: M8b */` eller, för hover, `M7`
(LARDOMAR 2026-10-02). Kvarvarande text i kommentaren skrivs som invariant, utan
uppmätta tal.

| Nyckel | Fil | Beslut |
|--------|-----|--------|
| `pill-right-group` | `Header.module.css` | Godkänd: `.nav { margin-inline-start: auto; }`. Länkarna och CTA:n samlas till höger med pillens `gap` emellan |
| `menu-button-hit-area` | `Header.module.css`, `MobileMenu.module.css` | Godkänd: synligt 40 × 40, `::after { content: ''; position: absolute; inset: -4px; }`. Träffytan blir minst 44 × 44 (byggaren mätte 46,5) och lagret ryms i pillens inre marginal. P4b visar med `document.elementFromPoint(rect.left - 2, rect.top + rect.height / 2)` att punkten utanför den synliga kanten träffar knappen, i pillen och i panelen |
| `menu-close-placement` | `MobileMenu.module.css` | Godkänd: `.bar` återger pillens geometri. P4b mäter att stängknappens `getBoundingClientRect()` är lika med hamburgerns (±0,5 px) vid 360, 600 och 899 px |
| `menu-panel-overflow` | `MobileMenu.module.css` | Godkänd: `overflow-y: auto` på `.panel`. CTA:n ska gå att nå även i liggande läge. P4b mäter vid 640 × 360 att CTA:n går att rulla fram i panelen |
| `menu-link-focus` | `MobileMenu.jsx` | Godtas: efter länkklick fortsätter Tab i målsektionen, inte på hamburgern (M8, punkten "Fokus"). Ingen kod ändras, bara kommentaren. P4b mäter: klick på varje länk, sedan ett Tab, och `document.activeElement` ligger i målsektionen eller efter den i DOM, aldrig i `<header>` |
| `menu-panel-spacing` | `MobileMenu.module.css` | Godkänd: `.nav { margin-top: var(--space-6); }`, `.list { gap: var(--space-3); }`, `.link { min-height: 44px; }` |
| `menu-cta-size` | `MobileMenu.module.css` | Godkänd: `min-height: 44px`, `margin-block: var(--space-6)`, `padding: 0 var(--space-5)`, `align-self: flex-start`, `max-width: 100%` |
| `profile-export-saknas` | `scripts/validate-data.mjs` | Godkänd: `profile.js: profile saknas eller är inte ett objekt`, samma form som `skills.js: skillGroups saknas eller är inte en array` (A1). ~~**Genomförs i P4b men först när P6 är överlämnat**~~ — **ändrat 2026-11-07 (R6): genomförs i G1-rättningen**, som tar bort markeringen tillsammans med de fyra andra exportmarkeringarna. Uppskjutningen hade ingen ägare (LARDOMAR 2026-11-07). G1 prövade redan raden med tre indata. G1-rättningen prövar om den efter borttagningen |
| Hover på navlänkarna | `Header.module.css` | Ändrad: understrykning i `--ink`, ingen färgändring. Deklarationerna står i M7 |

### M9 — Ikonerna: tre egna inline-SVG (P4, P9)

Inget beroende. A3 avvisade ikoner för att de skulle säga det rubriken redan sa.
Här bär ikonerna en **funktion** (öppna, stäng, sök) och står alltid tillsammans
med en dold text eller etikett. En komponent per fil, `export default`, utan
stilfil. Alla har `aria-hidden="true" focusable="false" width="20" height="20"
viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
stroke-linecap="round"`:

| Fil | Paket | Innehåll |
|-----|-------|----------|
| `src/components/MenuIcon.jsx` | P4 | `<path d="M4 7h16M4 12h16M4 17h16" />` |
| `src/components/CloseIcon.jsx` | P4 | `<path d="M6 6l12 12M18 6L6 18" />` |
| `src/components/SearchIcon.jsx` | P9 | `<circle cx="11" cy="11" r="6.5" />` och `<path d="M16 16l4 4" />` |

### M10 — Hero (P5)

**Texterna.** Hero.jsx har dem som namngivna konstanter (A15):

| Konstant | Text | Status |
|----------|------|--------|
| `eyebrowText` | `Portfolio` (versaler via `.eyebrow`, inte i DOM) | Uppdragets |
| `headline` | `Jag bygger webb- och mobilappar, från gränssnitt till API.` (**RÄTTAT 2026-11-18:** strängen i koden är `Jag bygger webbappar och mobilappar, från gränssnitt till API.`) | ~~**FÖRSLAG.** Uppdragets "t.ex."-text. Står med kommentaren att den väntar på Jelals svar. Ingen agent ändrar den utan svar~~ **BESVARAD 2026-11-18: GODKÄND ordagrant av Jelal.** Jelals. Byggaren tar bort FÖRSLAG-märkningen i `src/components/Hero.jsx:12-14`. Ingen annan kod ändras |
| `intro` | oförändrad, Jelals exakta från 2026-10-07 | Jelals |
| `primaryActionText`, `secondaryActionText` | oförändrade | Jelals |
| `name`, `role` | flyttar till `src/data/profile.js` (nedan) | Jelals |

DOM-ordning: eyebrow (`<p className={typeStyles.eyebrow}>`),
`<h1 className={styles.headline}>{headline}</h1>`, rollraden
(`<p className={typeStyles.meta}>`), ingressen, knapparna, och porträttet sist.
(**Porträttets plats ändrad 2026-11-07, se M10c:** bilden är sektionens sista
barn, efter `.inner`, och inte längre ett element i `.inner`.)
Modulklasserna `.eyebrow` och `.role` i `Hero.module.css` tas bort (M1, "Hur
stilen når elementet"; avgjort efter P5). **Sidans enda `h1` är `headline`.**
Namnet syns då inte längre som rubrik. Logga-länkens dolda text, `<title>` och
footern bär det. ~~Det är fråga 2 till Jelal.~~ **BESVARAD 2026-11-18:** Jelal vill
inte ha namnet i hero. Överraden "Portfolio" står kvar, och namnet syns i loggan,
fliken och footern.

**`src/data/profile.js` (P5)**, eftersom `role` nu läses av både hero och footern
(M16) och står i `<title>`:

```js
/** @typedef {Object} Profile
 *  @property {string} name  OBLIGATORISK.
 *  @property {string} role  OBLIGATORISK. Samma sträng står i <title> i index.html. */
export const profile = { name: 'Jelal Qaiumi', role: 'Systemutvecklare · Fullstack' };
```

`validate-data.mjs`: `profile` läggs i `ACTIVE`, och `checkProfile` fäller `name`
och `role` som är borttagna, `''` eller `'   '`. Kommentaren i `index.html` som
pekar på `Hero.jsx` skrivs om till att peka på `profile.js`.

> **`.hero`-regeln och `.inner`-blocket från 900 px nedan är UPPHÄVDA 2026-11-07,
> se M10c.** Där står `.hero`, `.hero::before`, `.backdrop` och `.inner` tecken för
> tecken. Glöden utgår och bildspåret `minmax(0, 420px)` blir `minmax(0, 1fr)`.
> `.intro` nedan gäller oförändrad. Blocket står kvar som historik.

**Glöden och layouten, `Hero.module.css`, tecken för tecken — glöden och bildspåret UPPHÄVDA 2026-11-07, se M10c (`.intro` gäller).** K-blocket ("Hero
fyller första skärmen på dator") står kvar:

```css
.hero {
  background-color: var(--bg);
  background-image: radial-gradient(60% 70% at 100% 35%, rgba(255, 107, 0, .16), rgba(255, 107, 0, 0) 70%);
}

@media (min-width: 900px) {
  .inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
    gap: var(--space-7);
    align-items: center;
    width: 100%;
  }
}

.intro {
  font-size: var(--text-lg);
  max-width: 560px;
  color: var(--ink-muted);
}
```

> Rättat 2026-11-07 (M10b punkt 2 och 2b): `width: 100%;` i `.inner` och
> `font-size: var(--text-lg);` i `.intro` saknades i blocket. Blocket ovan är det
> gällande.

~~Glödens ljusaste punkt över `--bg` blir ca `#361F0D`. Mot den ger `--ink-muted`
ca 6,2:1. **P5 mäter det** (P5:3), men marginalen är stor.~~ **UPPHÄVT
2026-11-07, se M10c:** glöden finns inte. Kontrasten mäts mot bildens pixlar under
toningen. "På två rader" i
uppdraget gäller dess exempeltext vid dess bredd. Ingen radbrytning tvingas fram.

**Knapparna (A5 står kvar i sak, stilarna ersätts), tecken för tecken:**

```css
.actionPrimary,
.actionSecondary {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-pill);
  font-weight: var(--weight-semibold);
  transition: background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.actionPrimary {
  background-color: var(--accent);
  border: 1px solid transparent;
  color: var(--ink-inverse);
}

.actionPrimary:hover {
  background-color: var(--accent-hover);
}

.actionSecondary {
  background-color: transparent;
  border: 1px solid var(--line-strong);
  color: var(--ink);
}

.actionSecondary:hover {
  border-color: var(--ink);
}
```

**Heros fyra `EJ I ARKITEKTUR`-markeringar, avgjorda. Tas bort i P5 — tre av fyra rader UPPHÄVDA 2026-11-07, se M10c (`alt` gäller):**

| Markering | Beslut |
|-----------|--------|
| `IMAGE_SIZES` | **UPPHÄVT, se M10c (`HERO_IMAGE_SIZES`).** ~~`'(min-width: 900px) 420px, 360px'`. Cirkelns renderade bredd är som mest dess tak ("Diametern"), så taket är rätt `sizes`. Ett överslag uppåt kostar en större fil vid 1×, aldrig en suddig bild~~ |
| Profilbildens `alt` | `"Porträtt av Jelal Qaiumi"` står kvar. Bilden bär information om vem sidan handlar om. **Bekräftat i M10c** |
| `.inner` | **UPPHÄVT, se M10c (två lika spår, det högra tomt).** ~~Gridden ovan. Textspåret är flexibelt och bildspåret har cirkelns tak~~ |
| `contrast(1.05)` | **UPPHÄVT, se M10c (gråskalan i bildskriptet, inget CSS-filter).** ~~Står kvar tillsammans med gråskalan. Uppdraget säger "svartvita porträtt"~~ |

Porträttet laddas **inte** lazy: ~~det ligger i första skärmen från 900 px~~ det
ligger i första skärmen i alla bredder och är LCP-elementet (M10c: dessutom
`fetchPriority="high"` och preload). `width`/`height` står kvar.

#### M10b — Knapparna under skärmkanten: besluten efter P5:s första omgång (genomförs i P5, omgång 2)

**Fynden** (P5, omgång 1): "Kontakta mig" slutade på 651,875 vid 360 × 640, och
båda knapparna på 824,047 vid 900 × 700. Vid 900 × 700 är h1 72 px och bryts på
sex rader (423 px) i ett textspår på 369 px. Två orsaker, två åtgärder.

**1. Heros `padding-block` vinner nu på specificitet, i alla bredder.** A5 steg 1
skrevs som `.hero { … }` (0,1,0) och förlorar mot `section[id]` (0,1,1) i
`global.css`. Byggaren visade att det blev 64 px trots regeln. `section.hero` har
samma specificitet som `section[id]` och vinner bara på buntordning, och det är
inget beslut. Selektorn får därför ett attribut till och vinner oberoende av
ordningen. Värdet gäller **i alla bredder**, inte bara under 600 px: från 900 px
ger `min-height` plus `align-content: center` luften ovanför och under innehållet,
så den stora paddingen syns bara när innehållet är högre än skärmen, och det är
just då den trycker ner knapparna. Tecken för tecken, direkt efter `.hero`-regeln
i `Hero.module.css`:

```css
section.hero[id] {
  padding-block: var(--space-6);
}
```

`padding-inline` rörs inte och kommer fortfarande från `global.css`. Kommentarerna
överst i `Hero.module.css` som säger att `padding-block` aldrig får stå i modulen
skrivs om i samma ändring: sidomarginalen bor i `global.css`, medan hero har en
egen vertikal luft och därför en selektor som slår den globala regeln på
specificitet.

**2. h1:s grad beror på textspårets bredd från 900 px.** `--text-3xl` växer med
**vyporten**, men från 900 px är det **textspåret** som avgör radbrytningen, och
det är som smalast precis vid brytpunkten (369 px med reserverad rullningslist,
alltså vyporten minus marginaler, gap och bildspårets 420 — **bildspåret UPPHÄVT
2026-11-07, se M10c:** spåret är halva `.inner` minus halva gapet, och blocket
nedan gäller oförändrat). Graden får därför en
`clamp()` i containerenheter. Tecken för tecken, som ett eget block efter `.text`:

```css
@media (min-width: 900px) {
  .text {
    container-type: inline-size;
  }

  .headline {
    font-size: clamp(2.75rem, 11cqi, var(--text-3xl));
  }
}
```

- **Golvet 2,75rem (44 px)** är heros eget golv och det mått byggaren redan mätt
  godkänt vid 900 × 700 (591,6). **Taket är `--text-3xl`**, så h1 blir aldrig
  större än i dag. Från ca 1190 px vyport når `11cqi` taket, och vid 1280 och
  1600 är graden oförändrad 72 px. Mätserierad 5 påverkas alltså inte.
  **Talen i denna punkt UPPHÄVDA 2026-11-07, se M10c:** med två lika spår når
  spåret aldrig 655 px, så `11cqi` når inte taket och h1 är mindre än 72 px även
  vid 1280 och 1600. Golvet, taket och formeln gäller.
- **Under 900 px rörs h1 inte.** Blocket gäller bara tvåspaltsläget, och i
  enspaltsläget är textspåret nästan hela vyporten och `--text-3xl` fungerar.
  Följden är ett hopp i grad vid brytpunkten (72 px vid 899, 44 px vid 900). Det
  är avsiktligt: layouten byter där från en spalt till två.
- **`container-type` kräver att `.inner` har full bredd från 900 px (rättat
  2026-11-07, efter P5 omgång 2).** Från 900 px är `.hero` en grid och `.inner`
  ett griditem med `margin-inline: auto`. Auto-marginaler tar upp det fria
  utrymmet, så `.inner` sträcks inte ut utan får sin bredd från innehållet.
  `inline-size`-inneslutningen gör att `.text` bidrar med 0, och då blir
  textspåret 0 px (uppmätt: h1 44 px och 2155 px hög, knapparna på y 5883).
  Rättelsen är en rad i M10:s `.inner`-block från 900 px, tecken för tecken som
  sista deklaration:

  ```css
      width: 100%;
  ```

  Blocket i sin helhet står i M10 ("Glöden och layouten"). Under 900 px är `.hero`
  inte en grid och `.inner` fyller redan bredden, så raden står bara i
  tvåspaltsläget och 899 px och nedåt är oförändrade. `max-width: var(--content-max)`
  och `margin-inline: auto` står kvar, så `.inner` blir 1180 px och centreras
  när vyporten är bredare. Kodkommentaren ovanför blocket får invarianten:
  `.inner` är ett griditem med auto-marginaler och sträcks inte ut av sig själv,
  och utan full bredd kollapsar textspåret eftersom `.text` är innesluten. Inga
  tal i kommentaren (LARDOMAR 2026-10-02).
  - Avvisat: `justify-self: stretch` på `.inner`. Auto-marginaler har företräde
    framför stretch, så det gör ingen skillnad.
  - Avvisat: att ta bort `margin-inline: auto`. Varje sektion ska ha ett
    centrerande innerelement (LARDOMAR 2026-10-02, "hero-platshållaren saknar
    `.inner`").
  - Avvisat: att ta bort `display: grid` på `.hero`. Det är K-blocket, som är
    bindande tecken för tecken, och `align-content: center` behöver det.
  - Avvisat: att flytta `container-type` till `.inner`. Den har samma
    krympbeteende och kollapsar på samma sätt.
- **2b. `.intro` har `font-size: var(--text-lg)`.** Koden gäller. M10:s block
  saknade raden, och den är nu inskriven där som första deklaration. A5 steg 2
  förutsätter raden och gäller oförändrat. Ingen kodändring.
- **UPPHÄVT 2026-11-07, se M10c (cirkeln finns inte, och textspåret är nu halva `.inner`):**
  **Avvisat: mer bredd åt textspåret mellan 900 och 1100 px.** Det kräver ett
  smalare bildspår, och då krymper cirkeln vid brytpunkten. Diameterserien ska
  vara icke-avtagande ("Diametern"). Ett mindre gap (48 → 24 px) ger för lite för
  att ta bort en rad.
- **Avvisat: en kortare rubrik.** Texterna kortas aldrig.

**Hero.jsx:** `<h1 className={styles.headline}>`. Kommentaren "h1 behöver ingen
egen klass" i `Hero.module.css` ersätts med invarianten: graden följer textspårets
bredd i tvåspaltsläget, och golvet och taket hindrar den från att bli mindre än det
uppmätta golvet eller större än sidans display-grad.

**A5:s ordning för vad som får vika, efter detta:** steg 1 är genomfört enligt
punkt 1 ovan. Steg 2 (ingressens grad till `--text-base` under 600 px) tas
**bara** om rad 1 fortfarande faller efter punkt 1 och 2. Därefter stopp och
tillbaka hit. Texterna kortas aldrig.

> **Mätserien nedan är UPPHÄVD 2026-11-07 där den förutsätter bildspåret, se
> M10c ("Mätserien utan bildspåret").** Vyporterna, villkoret, mätvillkoret,
> spårgrinden `>= 300` och dess negativa kontroll gäller och står omskrivna i
> M10c. UPPHÄVT här: GRIND-raden "`fontSize` är `72px`" vid 1280 och 1600,
> motiveringen "369 … bildspåret" för talet 300, 72 px-grinden i den negativa
> kontrollen och hela raden "Förväntat efter rättelsen". Texten står kvar som
> historik.

**Mätserien efter detta (P5 omgång 2), rad 1 och 2 i A5 — delvis UPPHÄVD 2026-11-07, se M10c — rad 1 och vyporterna 600 × 640 och 899 × 700 i rad 2 UPPHÄVDA 2026-11-07 av Jelal, se M10d (rad 1d):**

| Rad | Vyporter (bredd × höjd) |
|-----|--------------------------|
| 1 | 360 × 640, 360 × 667, 360 × 740, 390 × 844 (oförändrad) |
| 2 | 600 × 640, **899 × 700**, 900 × 700, **1000 × 700**, **1100 × 700**, **1200 × 700**, 1280 × 800, 1600 × 900 |

- **Villkor:** båda knapparnas `bottom <= window.innerHeight` i samtliga tolv.
- **Mätvillkor:** rullningslist reserverad (det strängare, eftersom spåret blir
  smalare). Före serien skrivs `window.innerWidth - document.documentElement.clientWidth`
  ut, och talet ska vara 15 (LARDOMAR 2026-10-08).
- **Varför de nya:** 899 och 900 ligger på var sin sida om brytpunkten och
  graden hoppar där. 1000, 1100 och 1200 × 700 täcker bandet där textspåret är
  smalt och `11cqi` styr graden, på en låg datorskärm.
- **UPPLYSNING per rad från 900 px:** `getComputedStyle(h1).fontSize`. ~~**GRIND** vid
  1280 × 800 och 1600 × 900: `fontSize` är `72px`.~~ **UPPHÄVT 2026-11-07, se M10c
  (grinden är formeln `clamp(44, 0,11 × spåret, 72)`).**
- **GRIND per rad från 900 px (tillagd 2026-11-07, punkt 2):** textspåret, mätt som
  `document.querySelector('section#hero h1').parentElement.clientWidth`, är
  `>= 300` vid 900, 1000, 1100, 1200, 1280 och 1600. Utskriften anger talet och
  rullningslistvillkoret i samma rad. (**Motiveringen nedan UPPHÄVD 2026-11-07,
  se M10c:** grinden och talet 300 gäller, motiveringen står där.) Varför 300: det minsta riktiga värdet är
  369 vid 900 × 700 med reserverad rullningslist, och kollapsen ger 0. En legitim
  ändring som kan fälla grinden är ett bredare bildspår, ett större gap eller en
  mindre `--content-max`. Alla tre kräver ett nytt beslut här, och diameterserien
  mäts då om ändå. Felmeddelande: `hero: textspåret är <n> px vid <b> × <h>, under 300 (M10b punkt 2: .inner måste ha full bredd)`.
- **Negativ kontroll för spårgrinden:** injicera `section#hero > div { width: auto; }`
  (bekräfta att `querySelectorAll('section#hero > div').length === 1`, att träffen
  är `.inner` och att den vinner på specificitet). Spårgrinden ska larma vid
  samtliga sex vyporter från 900 px, och ~~72 px-grinden vid 1280 och 1600~~
  (**UPPHÄVT 2026-11-07, se M10c**). När
  injektionen tas bort ska båda tiga. Prövas med de tre indata som LARDOMAR
  kräver: korrekt (tiger), injektionen (larmar), injektionen borttagen (tiger).
- **UPPHÄVT 2026-11-07, se M10c (talen gällde bildspåret):** **Förväntat efter rättelsen** (byggarens diagnos, rullningslist reserverad 15 px):
  spåret är 369, 469, 569, 669, 712 och 712 px, h1 är 44, 51,6, 62,6, 72, 72 och
  72 px, och knapparnas underkant är 591,6, 566,8, 583,0, 596,8, 646,8 och
  696,8. Mätningen avgör, inte tabellen.
- **Negativ kontroll (rad 6):** ta bort `container-type` på `.text` genom den
  smalaste selektorn (`section#hero h1` ska ge `querySelectorAll(...).length === 1`
  och `.text` likaså). Då räknas `cqi` mot vyporten, h1 når taket och rad 2 ska
  falla vid 900 × 700 med h1 som det element som bär avvikelsen. Larmet ska upphöra
  när injektionen tas bort.
- Rad 3–5 körs om oförändrade. Rad 4:s synteststräng sätts in i h1 även vid
  900 × 700.

**3. Rullningslisten hoppar inte när menyn öppnas (genomförs i P5 omgång 2).**
Fyndet kommer från P4b. Låset sätter `overflow: hidden` på `html`, den reserverade
rullningslisten försvinner, och stängknappen hoppar 15 px på datorer där
rullningslisten tar plats. `global.css`, i den befintliga `html`-regeln, tecken för
tecken direkt efter `scroll-behavior: smooth;`:

```css
  scrollbar-gutter: stable;
```

- **Varför P5 omgång 2:** omgången rör redan bara `Hero.module.css`, och raden rör
  bara `global.css`. Ingen av filerna ägs av P7. `MobileMenu.jsx` rörs inte, och
  låset står kvar som M8 beskriver det.
- **Kommentaren i `global.css`** anger invarianten: låset får inte ändra
  layoutbredden, så rullningslistens plats hålls även när `overflow` är `hidden`.
  Hänvisning: "Beslutat i ARKITEKTUR.md, M10b punkt 3". Inga tal.
- **Följd för M18 vid 360 px:** ingen ändring av måtten. Sidan går alltid att
  rulla, så rullningslisten finns redan i vanligt läge, och raden ändrar bara
  läget med menyn öppen. Spalten är fortfarande **297 px med reserverad
  rullningslist på 15 px** och **312 px utan rullningslist**.
  `innerWidth - clientWidth` är 15 respektive 0 **med menyn stängd**.
  ~~"och nu också med menyn öppen"~~ — **rättat 2026-11-07 efter G1 (R4):** med
  `overflow: hidden` räknar Chrome inte in den reserverade rännan i rotens
  `clientWidth`. Uppmätt av G1 med reserverad rullningslist 15 px: `clientWidth`
  går 345 → 360, 585 → 600 och 884 → 899 vid 360, 600 och 899 px när menyn
  öppnas, medan layouten står still. Villkorskontrollen i LARDOMAR 2026-10-08
  (`innerWidth - clientWidth`) görs därför **alltid med menyn stängd**.
  På pekskärmar med överliggande rullningslist är bredden på rännan 0, och där
  märks ingen skillnad. Med menyn öppen syns rännan som en remsa i sidans
  bakgrund. Panelen är `--bg` och opak, så remsan har samma färg.
- **Grindarna — omskrivna 2026-11-07 efter G1 (R4), genomförs i G1-rättningen.**
  Med reserverad rullningslist (15 px, kontrollerat **med menyn stängd** före
  serien), vid 360 × 640, 600 × 640 och 899 × 700, före öppning och med menyn
  öppen:
  1. **GRIND:** hamburgerns `getBoundingClientRect()` före öppning är lika med
     stängknappens med menyn öppen (±0,5 px), i `x`, `y`, `width` och `height`.
     Oförändrad. Uppmätt av G1: x 272, y 25, 40 px vid 360.
  2. **GRIND:** `document.documentElement.getBoundingClientRect().width` är samma
     före öppning och med menyn öppen (±0,5 px). Uppmätt av G1: 345, 585 och 884
     både före och med menyn öppen.
  3. **GRIND:** `document.querySelector('section#projects').getBoundingClientRect().width`
     är samma före och med menyn öppen (±0,5 px). Sektionen står för innehållet
     bakom panelen, och den är vad besökaren ser hoppa. Uppmätt av G1: oförändrad.
  4. **GRIND:** med menyn öppen är panelens (`document.getElementById('mobile-menu')`)
     `getBoundingClientRect().width` lika med rotens (±0,5 px). Panelen är
     `position: fixed` och ska respektera rännan. Uppmätt av G1: 345, 585 och 884.
  - ~~`document.documentElement.clientWidth` är samma före öppning och med menyn
    öppen~~ — **UPPHÄVT 2026-11-07 (R4):** grinden mätte rullningslisten, inte
    layouten, och föll med korrekt layout.
  - Varje utskriftsrad anger vyport, tal före, tal med menyn öppen och
    rullningslistvillkoret. Faller grind 4 för att panelen inte respekterar
    rännan stoppar byggaren och lämnar tillbaka hit. Ingen kompensation med
    `padding-right` i JS.
- **Negativ kontroll (R4):** injicera `html { scrollbar-gutter: auto !important; }`
  sist (bekräfta att `getComputedStyle(document.documentElement).scrollbarGutter`
  är `auto`). Med menyn öppen försvinner rännan, och **min förutsägelse, som inte
  är uppmätt**, är att grind 1, 2 och 3 larmar med 15 px vid alla tre vyporterna
  (roten 360, 600, 899), och att grind 4 tiger, eftersom panelen och roten växer
  lika. G1-rättningen mäter det och skriver de uppmätta talen i sin överlämning.
  Larmar grind 2 inte stoppar byggaren och lämnar tillbaka hit: då mäter grinden
  inte layoutbredden. Alla fyra ska tiga när injektionen tas bort. Prövas med
  korrekt (tyst), injektionen (larmar) och injektionen borttagen (tyst).
- **Avvisat: att kompensera i `MobileMenu.jsx`** genom att mäta rullningslisten och
  sätta `padding-right`. Det ger ett tal i JS som måste hållas i synk med CSS, och
  en ren CSS-rad räcker.

#### M10c — Porträttet blir heros svartvita bakgrund och profilbild (Jelal 2026-11-07, genomförs i P5 omgång 4)

**Jelals besked 2026-11-07, bindande:** *"Lägg in bilden i hero-sektionen, det är
en bild på mig men den ska föreställa en profilbild samt täcka bakgrunden, gör
bilden svartvit."*

**Källan:** `assets-source/hero-portrait.jpg`, 1672 × 941 px, JPEG, sRGB (uppgivet
av samordnaren; P5 omgång 4 läser måtten med `sharp().metadata()` som grind).
Porträtt mot grå studiobakgrund, svart kavaj och skjorta. **Ansiktsrutan i källan,
uppskattad av mig visuellt** (ögonbrynen till munnen, kind till kind):
`FACE = { x0: 715, x1: 1065, y0: 240, y1: 500 }`. Huvudet med håret går ungefär från
x 680 till 1130 och y 15 till 650. Filen är **otrackad** i git och läggs till i
samma incheckning.

**Besluten i en rad var:**

| # | Beslut |
|---|--------|
| 1 | Porträttet ÄR heros profilbild och bakgrund. Den runda cirkeln, strecket, tonplattan och bildspåret tas bort |
| 2 | ~~Under 900 px täcker bilden hela hero.~~ **UPPHÄVT under 900 px 2026-11-07, se M10d (bilden är ett block överst, texten under).** **Från 900 px täcker den de högra 70 %** och tonar in i `--bg` till vänster. Avvikelse från "full bredd", motiverad nedan |
| 3 | Gråskalan bakas in i filerna av `optimize-images.mjs` med sharp `grayscale()`. Inget CSS-`filter`, inget `contrast()` |
| 4 | Tre webp: 960, 1440 och 1672 px breda, ingen uppskalning, ingen JPEG-reserv, ingen `<picture>` |
| 5 | **UPPHÄVT 2026-11-07, se M10d (`'(min-width: 900px) 100vw, 178vw'`).** ~~`sizes` är `'(min-width: 900px) 100vw, 300vw'`, eftersom `cover` ritar bilden bredare än lådan~~. Invarianten (sizes = den ritade bredden) gäller |
| 6 | Ett riktigt `<img>`, `object-fit: cover`. ~~sektionens sista barn, `position: absolute`, `object-position: 50% 0%`~~ **UPPHÄVT 2026-11-07, se M10d:** sektionens FÖRSTA barn. `position: absolute` och `object-position: 50% 0%` gäller bara från 900 px |
| 7 | LCP: ~~ingen `loading`~~ **`loading="eager"`, se M10d**, `fetchPriority="high"`, och en `<link rel="preload">` med `imagesrcset`/`imagesizes` i `index.html` |
| 8 | `alt="Porträtt av Jelal Qaiumi"`, alltså informativ. Bilden är profilbilden och namnet syns inte som rubrik |
| 9 | Toningen är `.hero::before`: från vänster från 900 px~~, uppifrån och ner under 900 px~~ (**UPPHÄVT under 900 px 2026-11-07, se M10d:** ingen `::before` under 900 px, bildens nederkant tonas med `mask-image`). Inga hårdkodade färger, bara `color-mix()` på `--bg` |
| 10 | Den orange glöden tas bort. Bilden täcker platsen där den låg, och en orange ton över bilden motsäger "svartvit" |
| 11 | Från 900 px har `.inner` två lika spår och texten står i det vänstra. Det högra är tomt, och där syns ansiktet |
| 12 | **UPPHÄVT 2026-11-07, se M10d (Jelal: bilden överst, texten under på `--bg`).** ~~Under 900 px ligger ansiktet bakom eyebrow och h1 under en lätt toning. Rollrad, ingress och knappar står på den mörka delen~~ |
| 13 | `public/assets/profile/` (sex filer), `assets-source/profile.jpg` och `--overlay-grey` tas bort. Skriptets profildel ersätts av heros del. Skriptet och scriptraden behålls, eftersom ikondelen lever |
| 14 | `HERO_IMAGE_WIDTHS` exporteras ur `src/data/profile.js` och läses av både skriptet och `Hero.jsx` (samma mönster som `PROJECT_IMAGE_WIDTHS`) |
| 15 | Mätserien skrivs om utan bildspåret, med nya rader för kontrast mot pixlarna, ansiktets läge och bildladdningen |
| 16 | Kommentaren vid `<noscript>` i `index.html` skrivs om till invarianten |

##### Varför 70 % från 900 px, och inte full bredd

Ansiktets mitt ligger på ca 54 % av källans bredd och huvudets vänsterkant på ca
41 %. Med `cover` i full bredd hamnar huvudets vänsterkant aldrig längre in än ca
41 % av heros bredd på en datorskärm, eftersom bilden där skalas efter höjden och
bara har några få pixlar att förskjuta i sidled. Texten måste då sluta före ca
38 %, alltså ett textspår på ca 320 px vid 900 och ca 410 px vid 1600. Det ger en
mindre rubrik på en stor skärm än på en mobil. Med lådan förankrad till höger på
70 % av bredden får bilden spelrum i sidled, och `object-position: 50%` lägger
huvudets vänsterkant på ca 52–56 % av heros bredd vid 900, 1280 och 1600. **Uträknat
av mig, inte uppmätt. Rad 8 i mätserien avgör.** Toningen är heltäckande `--bg`
fram till 30 %, alltså exakt där lådan börjar. Övergången syns därför inte som en
kant, och bilden uppfattas fortfarande som heros bakgrund.

- Avvisat: full bredd och ett textspår som slutar vid 38 %. h1 hade blivit mindre
  vid 1600 än vid 360.
- Avvisat: `background-image`. Den kan inte få `srcset`, och den hade inte varit
  ett element med `alt`.
- Avvisat: att låta texten ligga över ansiktet på dator med kraftig toning. Då
  syns inte profilbilden.

##### Smal skärm (under 900 px) — HELA STYCKET UPPHÄVT 2026-11-07 av Jelal, se M10d

> Jelal har valt det alternativ som avvisas nedan: bilden överst och texten under,
> och han accepterar att knapparna kan hamna under skärmkanten. Texten nedan är
> historik.

Vid 360 × 640 tar texten nästan hela första skärmen, och knapparna ska ligga
ovanför skärmkanten (rad 1). Det finns alltså inget utrymme för ett fält med
ansiktet ovanför texten. Bilden skalas efter heros höjd, och ansiktet hamnar i
heros övre halva, bakom eyebrow och h1. **Toningen går uppifrån och ner:** lätt där
h1 ligger, eftersom h1 är stor text och bara behöver 3:1, och nästan heltäckande
från drygt halva höjden, där rollraden (12 px, `--ink-subtle`), ingressen och
knapparna står. Överst är den något tätare igen, för eyebrow-raden (12 px,
`--accent`). Ansiktet syns alltså genom rubriken, och resten av texten står på
mörk botten.

- Avvisat: texten under ansiktet med `align-content: end` och ett höjdgolv. Rad 1
  faller vid 360 × 640.
- Avvisat: en mindre h1 under 900 px för att få plats. Det är ett typografibeslut
  som Jelal inte bett om, och M10b låter h1 vara orörd under brytpunkten.

##### `Hero.module.css`, tecken för tecken

**`.hero`-regeln ersätts** (glöden tas bort, `position` och `isolation` läggs
till). Kommentarsblocket ovanför skrivs om till invarianten: bilden och toningen
ligger under innehållet i sektionens egen staplingskontext, och sektionens
bakgrund är det som syns innan bilden laddats och till vänster om bilden från
900 px.

```css
.hero {
  position: relative;
  isolation: isolate;
  background-color: var(--bg);
}
```

**Direkt efter `section.hero[id]`-regeln, före K-blocket**, två nya regler
(**BÅDA UPPHÄVDA 2026-11-07, se M10d:** basregeln `.hero::before` tas bort och
flyttar in i 900 px-blocket, och basregeln `.backdrop` ersätts av bildblocket
under 900 px. Blocket nedan är historik):

```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(180deg, color-mix(in srgb, var(--bg) 80%, transparent) 0%, color-mix(in srgb, var(--bg) 45%, transparent) 15%, color-mix(in srgb, var(--bg) 45%, transparent) 40%, color-mix(in srgb, var(--bg) 92%, transparent) 52%, color-mix(in srgb, var(--bg) 92%, transparent) 100%);
}

.backdrop {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
}
```

**Direkt efter K-blocket** (som står orört och för sig, A13), ett eget block
(**UPPHÄVT 2026-11-07, se M10d:** blocket står kvar på samma plats men får
fullständiga regler, eftersom basreglerna inte längre bär `content`, `position`
och `inset`. Det beräknade resultatet från 900 px är oförändrat):

```css
@media (min-width: 900px) {
  .hero::before {
    background-image: linear-gradient(90deg, var(--bg) 0%, var(--bg) 30%, color-mix(in srgb, var(--bg) 80%, transparent) 45%, transparent 75%);
  }

  .backdrop {
    left: auto;
    width: 70%;
  }
}
```

**`.inner` (basregeln):** raden `gap: var(--space-7);` tas bort. Under 900 px har
`.inner` ett enda barn, så raden påverkar ingenting (LARDOMAR 2026-10-02: data
utan verkan tas bort). Övriga rader står kvar.

**`.inner` från 900 px:** en rad byts, tecken för tecken:

```css
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
```

Övriga fyra deklarationer i blocket (`display`, `gap`, `align-items`,
`width: 100%`) står kvar. `.text` placeras automatiskt i det vänstra spåret.
Kommentaren ovanför blocket skrivs om: det högra spåret är tomt med avsikt, och
där syns ansiktet. Halva `.inner` är textens bredd i alla datorbredder. Inga tal.

**Tas bort helt:** `.media`, `@media (min-width: 900px) { .media { … } }`, `.image`
och `.media::after` med sina kommentarsblock.

**Står kvar oförändrade:** `section.hero[id]`, K-blocket, `.text`, h1-blocket från
900 px, `.intro`, `.actions` och de fyra knappreglerna.

Varför `isolation: isolate` och negativa `z-index` (**gäller från 900 px, se
M10d. Under 900 px ligger bilden i flödet och har inget `z-index`**): bilden (−2) och toningen (−1)
ritas ovanpå sektionens bakgrund men under `.inner`, utan att `.inner` behöver ett
eget `z-index`. Absolut positionerade barn deltar inte i K-blockets grid, så
`align-content: center` påverkar bara `.inner`.

Varför `color-mix(in srgb, var(--bg) N%, transparent)`: toningen är `--bg` med
alfa. Ingen hårdkodad färg utanför `tokens.css` och inget nytt token. Stöds i
Chrome 111, Safari 16.2 och Firefox 113.

##### `Hero.jsx`, tecken för tecken

Importen blir `import { profile, HERO_IMAGE_WIDTHS } from '../data/profile.js';`.
`IMAGE_SIZES` och hela `<div className={styles.media}>…</div>` med `<picture>` tas
bort. På modulnivå, i stället för `IMAGE_SIZES`:

```js
const HERO_IMAGE_SIZES = '(min-width: 900px) 100vw, 300vw';
const heroImageSrc = (width) => `/assets/hero/hero-${width}.webp`;
```

(**`HERO_IMAGE_SIZES` UPPHÄVT 2026-11-07, se M10d:** strängen är
`'(min-width: 900px) 100vw, 178vw'`. `heroImageSrc` gäller.)

Kommentaren ovanför anger invarianten: `cover` ritar bilden bredare än lådan när
lådan är smalare än bildens format, så `sizes` beskriver den ritade bredden och
inte lådans. Strängen står också i preloaden i `index.html` och ändras på båda
ställena i samma redigering. Inga tal.

~~Bilden är **sektionens sista barn**, efter `.inner`:~~ **UPPHÄVT 2026-11-07, se
M10d:** bilden är sektionens FÖRSTA barn, före `.inner`, och har `loading="eager"`.
Blocket nedan och stycket under det är historik:

```jsx
<img
  className={styles.backdrop}
  src={heroImageSrc(HERO_IMAGE_WIDTHS[1])}
  srcSet={HERO_IMAGE_WIDTHS.map((w) => `${heroImageSrc(w)} ${w}w`).join(', ')}
  sizes={HERO_IMAGE_SIZES}
  width="1672"
  height="941"
  alt="Porträtt av Jelal Qaiumi"
  fetchPriority="high"
/>
```

Inget `loading` och inget `decoding`. Sista barnet, så att läsordningen är
densamma som förut: rubriken först och porträttet sist. `section#hero > div` är
fortfarande exakt ett element, `.inner`, och M10b:s negativa kontroll gäller
oförändrad.

##### `src/data/profile.js`

Efter `profile`, tecken för tecken:

**Kommentaren ovanför exporten UPPHÄVD 2026-11-08, se M22 punkt 5:** den sade
att bredderna bara ändras här, och det var falskt, eftersom preloaden i
`index.html` har samma bredder. Den gällande kommentaren står tecken för tecken i
M22 punkt 5. Exporten är oförändrad:

```js
export const HERO_IMAGE_WIDTHS = [960, 1440, 1672];
```

`validate-data.mjs` ändras inte. Exporten valideras av bildskriptets grindar.

##### `index.html`

**Preload**, direkt efter `<title>`, tecken för tecken (**`imagesizes` UPPHÄVT
2026-11-07, se M10d:** värdet är `(min-width: 900px) 100vw, 178vw`. Resten av
raden och kommentaren gäller):

```html
    <!-- Heros bild hämtas innan JavaScript har renderat sidan, eftersom den är
         det största elementet i första skärmen. imagesrcset och imagesizes ska
         vara exakt samma som srcSet och sizes på bilden i
         src/components/Hero.jsx - annars hämtar webbläsaren bilden två gånger.
         Ändras det ena ändras det andra, i samma redigering. -->
    <link rel="preload" as="image" type="image/webp" href="/assets/hero/hero-1440.webp" imagesrcset="/assets/hero/hero-960.webp 960w, /assets/hero/hero-1440.webp 1440w, /assets/hero/hero-1672.webp 1672w" imagesizes="(min-width: 900px) 100vw, 300vw" fetchpriority="high" />
```

**Kommentaren vid `<noscript>`:** de två sista meningarna (från "En inline-färg
hade varit …" till slutet av kommentaren) ersätts, tecken för tecken, med:

```html
         vitt. Båda är läsbara. En inline-färg hade varit sidans enda
         hårdkodade färg, och en egen klass för meddelandet hade lagt stil i
         global.css för ett element som redan är läsbart i båda lägena. -->
```

Kommentaren beskriver invarianten och inte vad ARKITEKTUR.md säger (LARDOMAR
2026-10-02 och 2026-11-07 "`index.html` hävdar fortfarande"). Före överlämning:
`grep -rn "tredje global\|global klass" src scripts index.html` ger 0 träffar.

##### `scripts/optimize-images.mjs` — ikondelen och `LOGO_SOURCE` UPPHÄVDA 2026-11-07, se M20 (heros del gäller)

> **Gäller i stället för ikondelen:** M20 punkt 1 och 2. `LOGO_SOURCE` är
> `assets-source/jq-logo-light.png`, och ikondelen ersätts av logodelen i P14c.
> Raderna om heros del nedan gäller som de står.

**Profildelen ersätts av heros del. ~~Ikondelen rörs inte.~~ (UPPHÄVT 2026-11-07,
se M20: ikondelen ersätts i P14c.)** Skriptet behåller
namnet och scriptraden `optimize:images`, eftersom ikonerna fortfarande genereras
där. Ett nytt skript hade dubblerat skyddsräcket och kökedjan (LARDOMAR 2026-10-02,
"parallell dubblering").

| Konstant | Värde |
|----------|-------|
| `SOURCE` (profilen) | **tas bort**, ersätts av `HERO_SOURCE = resolve(ASSETS_SOURCE_DIR, 'hero-portrait.jpg')` |
| `SOURCES` | `[HERO_SOURCE, LOGO_SOURCE]` |
| `OUT_DIR` | `resolve(ROOT, 'public/assets/hero')`, genom `assertSafeOutput` |
| `EXPECTED_WIDTH` / `EXPECTED_HEIGHT` | `1672` / `941` |
| `CROP`, `JPEG_OPTIONS`, profilens `WIDTHS` och `SIZE_LIMIT_KB` | **tas bort**. Ingen beskärning, bilden används hel |
| bredderna | `HERO_IMAGE_WIDTHS`, importerad ur `../src/data/profile.js` |
| `HERO_SIZE_LIMIT_KB` | `{ 960: 60, 1440: 110, 1672: 140 }` |
| `WEBP_OPTIONS` | `{ quality: 72 }`, oförändrad |

Kedjan per bredd: `sharp(HERO_SOURCE).rotate().resize({ width, withoutEnlargement: true }).grayscale().webp(WEBP_OPTIONS).toBuffer()`,
följt av `queueWrite`. Ingenting skrivs innan alla grindar har passerat
(LARDOMAR 2026-10-02).

Grindarna, var och en märkt `GRIND:` med `fail()`:

1. Källans mått efter `rotate()` är 1672 × 941.
2. `HERO_IMAGE_WIDTHS` är heltal i stigande ordning utan dubbletter, och den
   största är högst källans bredd.
3. Varje utdata har bredden `w` och höjden `h` med `|h − w × 941 / 1672| < 1`
   (uträknat 540, 810 och 941).
4. Varje utdata är högst `HERO_SIZE_LIMIT_KB[w]`.
5. Varje utdata är gråskala: avkodad till rå RGB är `max(|R−G|, |G−B|, |R−B|) <= 2`
   över alla pixlar. Gränsen 2 är för webp:s avrundning i YUV.
6. Källan är orörd (storlek och mtime före och efter), med samma funktion som
   logotypen. Lyft till en funktion om den inte redan är en (LARDOMAR 2026-10-02).

**Storleksgränserna och gråskalegränsen är inte uppmätta.** Legitim ändring som
får fälla grind 4: en ny källa med mer detalj. Fäller grind 4 eller 5 på den
korrekta källan stoppar byggaren och lämnar tillbaka hit. Gränsen lossas inte, och
kvaliteten ändras inte.

Kommentaren överst i skriptet och varje kommentar om profilen, 4:5, beskärningen
och JPEG skrivs om i samma ändring. Före överlämning körs
`grep -n "profile\|4:5\|CROP\|jpeg\|JPEG" scripts/optimize-images.mjs`, och varje
träff utom importen av `profile.js` ska vara borta.

##### Filerna som tas bort

| Fil | Varför |
|-----|--------|
| `public/assets/profile/profile-{400,800,1200}.{webp,jpg}` (sex filer) och katalogen | Ingen referens efter `Hero.jsx`. Orefererade filer i `dist/` är förbjudna |
| `assets-source/profile.jpg` | Ingen läsare efter skriptändringen. Finns i git-historiken (`64dbaac` och tidigare) |
| `--overlay-grey` i `src/styles/tokens.css`, med sin kvotkommentar om den finns | Konsumenten `.media::after` utgår. M5h fäller annars bygget |

`README.md` och `GUIDE.md` nämner profilfilerna och `optimize:images`. De är
dokumentatorns och rörs inte i detta paket.

##### Mätserien utan bildspåret (ersätter M10b:s rad 1–2-tillägg och A5:s rad 1–6 där de förutsätter bildspåret) — UNDER 900 px DELVIS UPPHÄVD 2026-11-07, se M10d

> **Från P5 omgång 5:** rad 1, rad 2:s vyporter 600 × 640 och 899 × 700, rad 7:s
> och rad 8:s villkor under 900 px, rad 9:s `loading`-villkor, "Mitt underlag"
> under 900 px, "Om rad 7 faller" under 900 px och negativ kontroll 1 under
> 900 px är UPPHÄVDA. Det som gäller står i M10d ("Mätserien under 900 px").
> Övriga rader och allt från 900 px gäller som det står.

**Mätvillkor för hela serien:** `vite preview` av ett färskt bygge. Rullningslisten
är reserverad: `window.innerWidth - document.documentElement.clientWidth` skrivs ut
med menyn stängd före serien och ska vara 15 (LARDOMAR 2026-10-08 och R4).
`deviceScaleFactor: 1` för skärmbilderna. Scroll 0 om inget annat anges. Varje
rad redovisar vyport och rullningslistvillkor.

| # | Mätning | Villkor |
|---|---------|---------|
| 1 | **UPPHÄVD 2026-11-07, se M10d rad 1d.** ~~Båda knapparnas `getBoundingClientRect().bottom` vid 360 × 640, 360 × 667, 360 × 740, 390 × 844~~ | ~~`<= window.innerHeight` i samtliga~~ |
| 2 | Samma vid ~~600 × 640, 899 × 700,~~ (**UPPHÄVDA, se M10d rad 1d**) 900 × 700, 1000 × 700, 1100 × 700, 1200 × 700, 1280 × 800, 1600 × 900 | Samma |
| 3 | Vid 360 × 640: `section#hero .inner` `scrollWidth === clientWidth`, och `document.documentElement.scrollWidth <= clientWidth` | Båda håller. Bilden är absolut positionerad och får inte ge horisontell scroll |
| 4 | Rad 3 med `verksamhetsutvecklingsprojektledningsarbete` insatt i h1, rollraden, ingressen och båda knapptexterna, vid 360 × 640 och 900 × 700 | Samma |
| 5 | A16:s höjdkvot vid 1280 × 800 och 1280 × 900 | Oförändrad: 0,80–1,15 |
| 5b | **Spårgrind** från 900 px: `document.querySelector('section#hero h1').parentElement.clientWidth` vid 900, 1000, 1100, 1200, 1280 och 1600 | `>= 300`. Utskriften anger talet och villkoret. Meddelande: `hero: textspåret är <n> px vid <b> × <h>, under 300 (M10b punkt 2: .inner måste ha full bredd)` |
| 5c | **h1-grind** från 900 px, samma sex vyporter: `parseFloat(getComputedStyle(h1).fontSize)` mot `Math.min(72, Math.max(44, 0.11 * spår))` | Skillnad `<= 0,5` px |
| 7 | **Kontrast mot pixlarna.** Se metoden nedan. Vid 360 × 640, 390 × 844, 600 × 640, 899 × 700, 900 × 700, 1280 × 800, 1600 × 900 | Varje element i tabellen nedan klarar sitt krav. **Under 900 px UPPHÄVT 2026-11-07, se M10d rad 7d** |
| 8 | **Ansiktet.** Se metoden nedan. Samma sju vyporter | Från 900 px: hela ansiktsrutan ligger inom heros rektangel, och `.text`:s `right` är mindre än rutans vänsterkant. ~~Under 900 px: rutans `x0 >= 0` och `x1 <=` heros bredd, och ögonlinjen (källans y 300) ligger mellan 15 % och 40 % av heros höjd~~ **Under 900 px UPPHÄVT 2026-11-07, se M10d rad 8d** |
| 9 | **Bildladdningen** vid 360 × 640 och 1280 × 800, med tom cache | `performance.getEntriesByType('resource')` har **exakt en** post vars namn innehåller `/assets/hero/`, och dess `initiatorType` är `link`. Bilden har `fetchPriority === 'high'` och `loading === 'eager'` (**rättat 2026-11-07, se M10d:** villkoret håller först när attributet `loading="eager"` är satt. Utan attribut rapporterar Chrome `'auto'`). UPPLYSNING: `currentSrc`, och vilket element `largest-contentful-paint` anger |
| 10 | **Pillen över bilden** vid 360 × 640 och 1280 × 800, rullat så att pillens överkant ligger vid heros överkant plus 0, 25, 50 och 75 % av heros höjd | `--ink` i navlänkarna (och i pillens CTA-text) mot den ljusaste pixeln bakom texten, mätt med samma metod som rad 7: `>= 4,5`. Faller den stoppar byggaren och lämnar tillbaka hit (M6) |
| 6 | Negativa kontroller | Se "Rad 6" nedan |

**Rad 7, metoden.** Mät först textrektanglarna: för varje element nedan,
`Range.getClientRects()` över elementets textnoder (en rektangel per radruta). Sätt
sedan `section#hero .inner { visibility: hidden }` (bekräfta att selektorn träffar
exakt ett element), ta en skärmbild, och läs pixlarna inom varje rektangel. Det
som syns är bilden under toningen, alltså exakt det texten står på. Räkna
relativ luminans per pixel med sRGB-formeln, ta **den ljusaste pixeln** i
rektangeln och räkna kvoten mot textfärgen. Skriv ut den ljusaste pixelns värde,
kvoten och kravet på samma rad, märkt `GRIND:`. 99:e percentilen skrivs ut som
`UPPLYSNING:`.

| Element | Färg | Krav |
|---------|------|------|
| eyebrow (`.eyebrow`, 12 px) | `--accent` | 4,5:1 |
| h1 (minst 44 px) | `--ink` | 3:1, stor text |
| rollraden (`.meta`, 12 px) | `--ink-subtle` | 4,5:1 |
| ingressen | `--ink-muted` | 4,5:1 |
| sekundärknappens text | `--ink` | 4,5:1 |
| sekundärknappens ram: ett 2 px band direkt utanför knappens rektangel | `--line-strong` | 3:1, 1.4.11 |
| primärknappens fyllnad: samma band runt primärknappen | `--accent` | 3:1, 1.4.11 |

Primärknappens text står på sin egen opaka fyllnad och mäts inte här.

**Mitt underlag för toningens tal, uträknat och inte uppmätt.** Bakgrunden under
texten får som ljusast vara ungefär grå 58 för ingressen, 50 för eyebrow, 46 för
sekundärknappens ram, 33 för rollraden och 139 för h1, räknat i 0–255. Toningen är
dimensionerad efter det mot en studiobakgrund kring grå 95. Från 900 px står
eyebrow och rollraden i den heltäckande zonen till vänster om 30 %. ~~Under 900 px
står rollraden i zonen med 92 %.~~ (**UPPHÄVT 2026-11-07, se M10d:** under 900 px
står all text på `--bg`.) Mätningen avgör.

**Om rad 7 faller, i denna ordning och bara så långt mätningen kräver** (**gäller
bara från 900 px sedan 2026-11-07, se M10d.** Under 900 px finns ingen toning att
höja. Ordningen tog slut vid 95 % i omgång 4):

1. Höj alfa i det stopp som ligger närmast under det fallerande elementet med 5
   procentenheter, till högst 95 %. Upprepa och kör om rad 7 **och** rad 8 vid
   alla sju vyporterna efter varje steg. Varje steg redovisas med stopp, värde och
   utfall.
2. Faller rad 7 fortfarande vid 95 %, eller tvingar höjningen fram ett läge där
   ansiktet inte längre syns (byggaren bifogar skärmbilden): stopp, och tillbaka
   hit. Färgerna, texterna och layouten ändras inte.

**Rad 8, metoden** (gäller också M10d rad 8d)**.** För `section#hero img`: lådan är `getBoundingClientRect()`,
skalan är `s = Math.max(låda.width / 1672, låda.height / 941)`, förskjutningen är
`dx = (låda.width - 1672 * s) * 0.5` och `dy = (låda.height - 941 * s) * 0`
(läs `object-position` ur `getComputedStyle` och använd dess värden, inte talen
här). Ansiktsrutan på skärmen är `låda.left + dx + FACE.x0 * s` och så vidare.
Byggaren kontrollerar en gång mot en skärmbild att rutan täcker ögonbrynen till
munnen. Är min uppskattning fel rättas `FACE` i mätskriptet, och de rättade talen
skrivs i överlämningen. UPPLYSNING: medelluminansen i ansiktsrutan i skärmbilden
från rad 7.

**Rad 6, negativa kontroller.** Alla tre prövas som korrekt (tyst), injektion
(larmar, med det element som bar avvikelsen utskrivet) och injektion borttagen
(tyst). Bekräfta träffmängden med `querySelectorAll(sel).length` före varje
injektion.

1. **Toningen:** `section#hero::before { background-image: none !important; }`.
   Rad 7 ska larma ~~på minst ingressen vid varje vyport under 900 px och~~ vid minst en
   från 900 px. **Förutsägelse, inte uppmätt.** (**Under 900 px UPPHÄVT 2026-11-07,
   se M10d:** där finns ingen `::before`.)
2. **Ansiktet från 900 px:** `section#hero > img { width: 100% !important; }`. Rad
   8 ska larma vid 900 × 700, 1280 × 800 och 1600 × 900 med `.text` som elementet
   vars `right` överlappar rutan. **Förutsägelse, inte uppmätt.**
3. **Spåret:** M10b:s injektion `section#hero > div { width: auto; }`. Rad 5b ska
   larma vid alla sex vyporter från 900 px.

**Förväntade tal, uträknade och inte uppmätta** (rullningslist reserverad 15 px):
spåret 394,5, 444,5, 494,5, 544,5, 566 och 566 px vid 900, 1000, 1100, 1200, 1280
och 1600, och h1 44, 48,9, 54,4, 59,9, 62,3 och 62,3 px. Mätningen avgör, inte
tabellen.

##### Bildskriptet och bygget

12. `npm run optimize:images` en gång. Redovisa varje `GRIND:`-rad.
13. **Tvinga en grind att fallera** (sätt `EXPECTED_WIDTH` till 1673 i en isolerad
    kopia) och visa att `public/assets/hero/` och `public/assets/` är orörda,
    jämfört med en fillista med sha256 före och efter (LARDOMAR 2026-10-02).
14. ~~**Ikonerna är oförändrade:** sha256 för de fem `logo-mark-*.png` är identiska
    före och efter körningen. Annars har profilborttagningen rört ikondelen.~~
    **UPPHÄVT 2026-11-07, se M20:** filerna tas bort i P14c. Den spegelvända
    grinden gäller där: heros filer är byte-identiska före och efter (M20, grind 3).
15. `grep -c` på varje `fail(`-meddelande i skriptet. Inget meddelande förekommer
    mer än en gång (LARDOMAR 2026-10-02).
16. Bygg om och mät `dist/` i samma körning (LARDOMAR 2026-10-05): totalt `<= 1 MB`,
    ingen fil över 300 kB, de tre största filerna redovisade, och varje fil i
    `dist/` har en referens i `src/` eller `index.html` (**RÄTTAT 2026-11-18, se M24
    punkt 6:** fyra referenskällor och undantaget `robots.txt`). Bygget och tidsstämpeln för
    den senast ändrade filen under `src/` står i överlämningen.

##### Grindar före överlämning

17. `npm run validate:data`, `npm run validate:tokens`, `npm run build` och
    `npm run lint` är gröna. Tokengrinden är tyst efter att `--overlay-grey` tagits
    bort.
18. Tabellen över förbjudna strängar körs mot `src/`, `scripts/` och `index.html`
    (LARDOMAR 2026-11-07), särskilt raderna under "Tillagt 2026-11-07, M10c".
    `grep -rn "overlay-grey\|/assets/profile\|profile-[0-9]\|grayscale(1)\|const IMAGE_SIZES\|styles\.media" src/components/Hero.jsx src/components/Hero.module.css src/styles scripts index.html`
    ger 0 träffar.
19. `grep -rnE "[0-9]+ px|cirkel|tonplatta|glöd|bildspår" src/components/Hero.jsx src/components/Hero.module.css`:
    varje träff i en kommentar skrivs om till invarianten och redovisas med
    fil:rad (LARDOMAR 2026-11-07, "moderniseringen gjorde fem kommentarer
    falska"). Läs om hela kommentarsblocket ovanför varje ändrad rad.
20. För varje `OPEN-KEY: <nyckel>` i `src/` och `scripts/`: `grep -c "<nyckel>" ARKITEKTUR.md`.
21. Varje deklaration i M10c besvaras i överlämningen med `fil:rad` (LARDOMAR
    2026-10-05).
22. Skärmbilder vid 360 × 640, 390 × 844, 1280 × 800 och 1600 × 900, med absoluta
    sökvägar i överlämningen. Jelal ska se resultatet innan omgången räknas som
    klar.

##### P5 omgång 4 — exakt vad som ändras

| Fil | Ändring |
|-----|---------|
| `src/components/Hero.module.css` | Enligt "tecken för tecken" ovan |
| `src/components/Hero.jsx` | Bilden, `HERO_IMAGE_SIZES`, `heroImageSrc`, importen. Kommentarerna om bilden skrivs om |
| `src/data/profile.js` | `HERO_IMAGE_WIDTHS` |
| `src/styles/tokens.css` | `--overlay-grey` bort |
| `index.html` | Preloaden och `<noscript>`-kommentaren |
| `scripts/optimize-images.mjs` | Profildelen ersätts av heros del |
| `public/assets/hero/` | Ny, tre genererade filer |
| `public/assets/profile/` | Tas bort |
| `assets-source/hero-portrait.jpg` | Läggs till i git |
| `assets-source/profile.jpg` | Tas bort |

**Rörs inte:** `Projects*`, `ProjectFilter*`, `Chip*`, `global.css`, `Header*`,
`MobileMenu*`, `validate-data.mjs`, `validate-tokens.mjs`, `package.json`.

**Samordning med P8:** omgången rör `tokens.css`. Startar den medan P8 pågår ska
samordnaren först bekräfta att P8 inte rör `tokens.css`. Annars startar omgången
när P8 är överlämnat. **`PLAN.md`:** P5 omgång 4 står inte där. Det är
projektledarens att lägga in, med `Ingår:` enligt tabellen ovan.

#### M10d — Bilden överst och texten under, under 900 px (Jelal 2026-11-07, genomförs i P5 omgång 5)

**Läget efter P5 omgång 4 (byggarens mätning, `vite preview`, rullningslist
reserverad 15 px):** från 900 px håller allt, också rad 7 vid 900 × 700, 1280 × 800
och 1600 × 900. Under 900 px faller rad 7: eyebrow 4,169:1 vid 360 × 640 och
4,425:1 vid 390 × 844, rollraden 3,300:1 vid 390 × 844. M10c:s ordning tog slut med
52 %-stoppet på 95 %, och rollraden gav då 3,452. Rad 9 förutsade
`loading === 'eager'`, men en bild utan attribut rapporterar `'auto'` i Chrome.

**Jelals beslut 2026-11-07, bindande:** på mobil ligger bilden överst och texten
under. Ansiktet syns fritt överst, och texten står på mörk botten under bilden. Han
accepterar att knapparna på små telefoner kan ligga under skärmkanten.

**Vad som gäller i stället för A5/M10b rad 1 under 900 px:** knapparna har inget
krav på att ligga ovanför skärmkanten under 900 px. I stället ska **rubrikens
överkant** ligga ovanför skärmkanten (rad 1d), så att första skärmen alltid visar
att det finns text under bilden. Från 900 px gäller rad 2 som förut.

| # | Beslut |
|---|--------|
| 1 | Under 900 px är bilden ett block i flödet överst i hero, i sektionens fulla bredd (utfallande genom sidmarginalen). `aspect-ratio: 1 / 1`, högst `60svh`, `object-position: 53% 0%` |
| 2 | Bildens nederkant tonas mot sektionens botten med `mask-image`: opak till 70 % av höjden, genomskinlig vid 100 %. Ingen `::before` under 900 px. Texten står på helt `--bg` |
| 3 | `<img>` är sektionens **första** barn i DOM, före `.inner`. Ingen `order` |
| 4 | `sizes` är `'(min-width: 900px) 100vw, 178vw'`, i `Hero.jsx` och i preloaden |
| 5 | `loading="eager"` sätts på bilden. Rad 9:s villkor `loading === 'eager'` står kvar |
| 6 | Från 900 px är det beräknade resultatet oförändrat. Reglerna skrivs om för att basregeln nu är mobilens, och rad 12d mäter att ingenting flyttat sig |
| 7 | Mätserien under 900 px skrivs om: rad 1d, 3d, 7d, 8d, 11d, 12d och negativa kontroller 4–7 |

##### Varför dessa tal

- **`aspect-ratio: 1 / 1`.** Källan är 1672 × 941. Ansiktet ligger på ca x 53 % och
  huvudet med håret på x 680–1130 och y 15–650. En kvadratisk låda visar källans
  hela höjd och ett utsnitt på 941 källpixlar i bredd. Med `object-position: 53%`
  börjar utsnittet på ca x 387 och slutar på ca 1328, så hela huvudet ryms och
  ansiktet hamnar nära mitten. **Uträknat av mig, inte uppmätt. Rad 8d avgör.**
  Bildens eget format (16:9) hade gett ett ansikte på ca 100 px vid 360 px bredd.
- **Högst `60svh`.** Mellan 600 och 899 px bredd hade en kvadrat blivit högre än
  vyporten. Taket håller bilden kortare än skärmen, och `cover` fyller då lådan
  efter bredden i stället. `60vh` står först som reserv, samma reservkedja som
  K-blocket.
- **Toningen 70 % → 100 %.** Ansiktsrutans underkant (källans y 500) hamnar på ca
  53 % av lådans höjd i en kvadrat och ca 64 % vid 899 × 700. Uttoningen börjar
  under ansiktet. Rad 8d grindar på det.
- **`mask-image` och inte ett överlägg.** Masken läser bara alfa, så gradienten
  skrivs med `var(--bg)` och `transparent` och ingen färg utanför `tokens.css`. Ett
  överlägg hade krävt ett omslag runt bilden, och då är `section#hero > div` inte
  längre exakt ett element (M10b:s negativa kontroll). `-webkit-mask-image` står
  först som reserv för Chrome 111–119, samma golv som `color-mix()`.
- **Utfallande bredd.** `width: calc(100% + 2 * var(--content-padding))` med
  negativ `margin-inline` av samma uttryck ger exakt sektionens bredd. Sidmarginalen
  bor fortfarande bara i `global.css`, och modulen sätter ingen `padding-inline`.
  `max-width: none` behövs eftersom `global.css` ger `img` `max-width: 100%`.
- **Negativ `margin-block-start`.** `section.hero[id] { padding-block: var(--space-6); }`
  gäller i alla bredder (M10b). Bilden drar sig upp med samma token till sektionens
  överkant i stället för att regeln ändras. Under bilden står `var(--space-4)`,
  samma avstånd som i `.text`-gridden.
- **`178vw`.** Lådan är under 900 px aldrig smalare i förhållande till höjden än en
  kvadrat. `cover` ritar då bilden som mest `1672 / 941 ≈ 1,777` gånger lådans
  bredd, och lådans bredd är vyportens. `100vw` hade valt för liten fil vid 2× och
  3×. Vid 1× ger båda strängarna 960-filen vid 360 och 390 px.
- **`loading="eager"` i stället för villkoret `!== 'lazy'`.** Attributet gör
  avsikten läsbar i markupen, och grinden kan då larma om någon tar bort det
  (negativ kontroll 6). `!== 'lazy'` hade tigit både med och utan attribut.

##### DOM-ordningen och skärmläsaren

Bilden läggs **först i DOM**, inte med `order`. Under 900 px är `.hero` inte en
flex- eller gridbehållare, så `order` verkar inte där. Och om det hade verkat hade
läsordningen skilt sig från den visuella (WCAG 1.3.2). Med bilden först läser en
skärmläsare "Porträtt av Jelal Qaiumi" och sedan rubriken, i samma ordning som
bilden och texten syns på mobil. Från 900 px är bilden absolut positionerad till
höger, och ordningen bild–rubrik är fortfarande begriplig. `alt` är oförändrad och
informativ. Bilden är fortfarande LCP, och preloaden står kvar.
`section#hero > div` är fortfarande exakt ett element, `.inner`.

##### `Hero.module.css`, tecken för tecken

**Basregeln `.hero::before` tas bort**, med sitt kommentarsblock. Under 900 px finns
ingen toning.

**Basregeln `.backdrop` ersätts**, på samma plats (direkt efter `section.hero[id]`,
före K-blocket):

```css
.backdrop {
  width: calc(100% + 2 * var(--content-padding));
  max-width: none;
  height: auto;
  aspect-ratio: 1 / 1;
  max-height: 60vh;
  max-height: 60svh;
  margin-inline: calc(-1 * var(--content-padding));
  margin-block: calc(-1 * var(--space-6)) var(--space-4);
  object-fit: cover;
  object-position: 53% 0%;
  -webkit-mask-image: linear-gradient(180deg, var(--bg) 70%, transparent 100%);
  mask-image: linear-gradient(180deg, var(--bg) 70%, transparent 100%);
}
```

`height: auto` behövs: attributet `height="941"` blir annars en CSS-höjd och
`aspect-ratio` verkar inte. `display: block` kommer från `global.css`.

**900 px-blocket direkt efter K-blocket ersätts**, på samma plats:

```css
@media (min-width: 900px) {
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: linear-gradient(90deg, var(--bg) 0%, var(--bg) 30%, color-mix(in srgb, var(--bg) 80%, transparent) 45%, transparent 75%);
  }

  .backdrop {
    position: absolute;
    inset: 0 0 0 auto;
    z-index: -2;
    width: 70%;
    height: 100%;
    max-height: none;
    margin: 0;
    object-position: 50% 0%;
    -webkit-mask-image: none;
    mask-image: none;
  }
}
```

`aspect-ratio` återställs inte: med både `width` och `height` satta på ett absolut
positionerat element har den ingen verkan (data utan verkan skrivs inte,
LARDOMAR 2026-10-02). Rad 12d belägger att resultatet är detsamma som i omgång 4.

**`.hero`, K-blocket, `.inner`, `.text`, h1-blocket, `.actions` och knapparna
står kvar oförändrade.**

**Kommentarerna som skrivs om, till invarianter och utan tal:**

- Över `.hero`: bilden ligger i flödet överst under 900 px och texten under den
  på sektionens botten. Från 900 px ligger bilden och toningen under innehållet i
  sektionens staplingskontext. Sektionens bakgrund är det som syns innan bilden
  laddats och där bilden tonats ut.
- Över `.backdrop`: bilden är ett eget block under brytpunkten och fyller
  sektionens bredd utan att sätta sidmarginalen. Lådan är så hög att ansiktet ryms
  helt, och aldrig högre än att rubriken börjar i första skärmen. Masken tonar
  bilden mot sektionens botten under ansiktet. Hänvisning: M10d.
- Över 900 px-blocket: dagens text, plus att blocket bär fullständiga regler
  eftersom basreglerna är mobilens. Hänvisning: M10c och M10d.
- Över `.intro`: andra meningen ("Den är det andra som får vika under 600 px …")
  tas bort. Knapparna har inget krav på första skärmen under 900 px (M10d).

##### `Hero.jsx`, tecken för tecken

```js
const HERO_IMAGE_SIZES = '(min-width: 900px) 100vw, 178vw';
```

Kommentaren ovanför står kvar (invarianten "den ritade bredden" gäller), men
hänvisningen blir "M10c och M10d".

Bilden flyttas till **första barnet** i `<section>`, före `<div className={styles.inner}>`:

```jsx
<img
  className={styles.backdrop}
  src={heroImageSrc(HERO_IMAGE_WIDTHS[1])}
  srcSet={HERO_IMAGE_WIDTHS.map((w) => `${heroImageSrc(w)} ${w}w`).join(', ')}
  sizes={HERO_IMAGE_SIZES}
  width="1672"
  height="941"
  alt="Porträtt av Jelal Qaiumi"
  loading="eager"
  fetchPriority="high"
/>
```

Kommentaren ovanför bilden skrivs om: bilden står först så att läsordningen är
densamma som den visuella på mobil. Den hämtas direkt eftersom den är det största
elementet i första skärmen. `width`/`height` är källans format. Meningarna "SISTA
barn", "absolut positionerad … deltar inte i layouten" och "Ingen loading" tas bort.

##### `index.html`

I preloaden byts ett värde, tecken för tecken:

```html
imagesizes="(min-width: 900px) 100vw, 178vw"
```

Resten av raden och kommentaren står kvar.

##### Mätserien under 900 px (P5 omgång 5)

Mätvillkoret är M10c:s: `vite preview` av ett färskt bygge, rullningslist reserverad
(`innerWidth - clientWidth` = 15 skrivs ut före serien), `deviceScaleFactor: 1`,
scroll 0. **Vyporterna under 900 px:** 360 × 640, 360 × 667, 360 × 740, 390 × 844,
600 × 640 och 899 × 700. Från 900 px gäller M10c:s rader oförändrade (2, 3–5c, 7, 8,
9, 10 och negativa kontroller 1–3). Inga förväntade tal skrivs här, eftersom inget av
dem är uppmätt (LARDOMAR 2026-11-07, `clientWidth`-grinden). Villkoren är
invarianter.

| # | Mätning | Villkor |
|---|---------|---------|
| 1d | `section#hero h1` `getBoundingClientRect().top` vid de sex vyporterna | `GRIND:` `< window.innerHeight`. `UPPLYSNING:` knapparnas `bottom`, utan gräns |
| 3d | Vid 360 × 640 och 390 × 844: M10c rad 3, plus bildens `getBoundingClientRect()` mot `section#hero`:s | `left` och `width` lika ±0,5 (bilden fyller exakt sektionens bredd), och `document.documentElement.scrollWidth <= clientWidth` |
| 4 | M10c rad 4 (syntessträngen) vid 360 × 640 och 899 × 700 | Rad 3d och rad 11d håller |
| 7d | M10c:s metod (`.inner` dold, ljusaste pixeln per textrektangel), samma sju element, vid de sex vyporterna | `GRIND:` den ljusaste pixeln i varje rektangel har varje kanal inom ±1 av `--bg`, och kvoten klarar elementets krav. Kvoterna ska då vara tokens.css-kvoterna mot `--bg` |
| 8d | M10c:s metod för ansiktsrutan, med `FACE` som rättat i omgång 4 om det rättades, vid de sex vyporterna | `GRIND:` rutans `x0 >= låda.left`, `x1 <= låda.right`, `y0 >= låda.top` och `y1 <= låda.top + 0,70 × låda.height` (ovanför uttoningen). Rutan ligger därmed ovanför all text (rad 11d) |
| 9 | M10c rad 9 | Oförändrat villkor. Håller nu eftersom attributet är satt |
| 10 | M10c rad 10 | Oförändrat. Under 900 px står pillen nu över den otonade bilden. Faller den: stopp, tillbaka hit |
| 11d | **Ingen text över bilden.** För varje rektangel ur `Range.getClientRects()` över textnoderna i `section#hero .inner`, och för båda knapparnas rektanglar, vid de sex vyporterna | `GRIND:` `top >= bild.getBoundingClientRect().bottom - 0,5`. Meddelande: `hero: <element> överlappar bilden vid <b> × <h> (top <t>, bildens bottom <u>) (M10d)` |
| 12d | **Från 900 px oförändrat.** Bildens och `.text`:s `getBoundingClientRect()`, och `getComputedStyle(section, '::before').backgroundImage`, vid 900 × 700, 1280 × 800 och 1600 × 900. Mäts en gång på omgång 4:s kod FÖRE ändringen och en gång efter | `GRIND:` rektanglarna lika ±0,5 och strängen identisk |

**Vilken legitim ändring som får fälla en grind** (LARDOMAR 2026-10-05): rad 1d
och 8d en ny källbild med annat format eller annat ansiktsläge, rad 7d och 11d
ingen (ett fall betyder att bilden eller masken ligger bakom text), rad 12d ingen.

**Negativa kontroller, utöver M10c:s 1–3** (nr 1 bara från 900 px). Varje kontroll
redovisas som tyst, larmar med elementet utskrivet, och tyst igen.
`document.querySelectorAll('section#hero > img').length === 1` före varje injektion.

4. **Överlapp:** `section#hero > img { margin-block-end: -50% !important; }`. Rad 11d
   ska larma vid alla sex vyporterna med eyebrow-raden som första element.
   **Förutsägelse, inte uppmätt.**
5. **Ansiktet under 900 px:** `section#hero > img { object-position: 0% 0% !important; }`.
   Rad 8d ska larma vid 360 × 640 och 390 × 844 med `x1 > låda.right`.
   **Förutsägelse, inte uppmätt.**
6. **Laddningen:** `document.querySelector('section#hero > img').removeAttribute('loading')`
   före avläsningen. Rad 9:s `loading`-villkor ska larma med värdet `'auto'`.
7. **360-golvet:** `section#hero > img { width: calc(100% + 4 * var(--content-padding)) !important; }`.
   Rad 3d ska larma vid 360 × 640 med bilden som elementet med största `right`.

**Om en rad faller:** rad 8d horisontellt (bara `x0` eller `x1`) får byggaren flytta
`object-position` i steg om 1 procentenhet inom 48–58 %, och kör om rad 8d vid alla
sex vyporterna efter varje steg och redovisar steg och utfall. Allt annat: stopp,
tillbaka hit. Färger, texter, h1:s grad och höjdtaket ändras inte.

##### Grindar före överlämning

1. `npm run validate:data`, `npm run validate:tokens`, `npm run build` och
   `npm run lint` är gröna.
2. `grep -rn "300vw\|var(--bg) 92%\|var(--bg) 45%" src/components/Hero.jsx src/components/Hero.module.css index.html`
   ger 0 träffar.
3. `grep -rnE "[0-9]+ px|sista|SISTA|uppifrån|Ingen loading|får vika" src/components/Hero.jsx src/components/Hero.module.css`:
   varje träff i en kommentar skrivs om till invarianten och redovisas med fil:rad.
   Läs om hela kommentarsblocket ovanför varje ändrad rad.
4. Varje deklaration i M10d besvaras med `fil:rad`.
5. För varje `OPEN-KEY` i `src/` och `scripts/`: `grep -c "<nyckel>" ARKITEKTUR.md`.
6. Skärmbilder vid 360 × 640, 390 × 844, 600 × 640, 899 × 700, 1280 × 800 och
   1600 × 900, med absoluta sökvägar. Jelal ser dem innan omgången räknas som klar.

##### P5 omgång 5 — exakt vad som ändras

| Fil | Ändring |
|-----|---------|
| `src/components/Hero.module.css` | Basregeln `.hero::before` bort. Basregeln `.backdrop` ersätts. 900 px-blocket efter K-blocket ersätts. Fyra kommentarer skrivs om. Allt enligt "tecken för tecken" ovan |
| `src/components/Hero.jsx` | `HERO_IMAGE_SIZES` till `178vw`. `<img>` flyttas till sektionens första barn och får `loading="eager"`. Två kommentarer skrivs om |
| `index.html` | `imagesizes` i preloaden till `(min-width: 900px) 100vw, 178vw` |

**Rörs inte:** P9b:s filer (`Projects*`, `ProjectFilter*`, `projectRules.js`,
`global.css`, `ProjectCard.jsx`, `Header.jsx`, `Reveal.jsx`, `main.jsx`), `Chip*`,
`MobileMenu*`, `tokens.css`, `src/data/`, `scripts/`, `public/assets/hero/` (inga nya
bildfiler) och `package.json`. Ingen fil överlappar P9b, så omgången kan köras
parallellt med den.

### M11 — Filtrets regler (P8, P9)

**State och signaturer.** `Projects.jsx` äger filtret, och `ProjectFilter.jsx` är
kontrollerad:

```js
// src/lib/projectRules.js
/** @typedef {{ category: string|null, tech: string[], query: string }} ProjectFilterState */
export const EMPTY_FILTER = { category: null, tech: [], query: '' };              // P8
/** @returns {Record<string, number>} en nyckel per värde i PROJECT_CATEGORIES */
export function countByCategory(projects)                                          // P8
/** @returns {string[]} unika, flest projekt först, sedan localeCompare(…, 'sv') */
export function collectTech(projects)                                              // P9
/** @returns {string} toLocaleLowerCase('sv-SE') och trim() */
export function normalizeText(text)                                                // P9
/** @returns {Project[]} i datans ordning */
export function filterProjects(projects, filter)                                   // P8 kategori, P9 tech och query

// src/components/ProjectFilter.jsx
function ProjectFilter({ counts, total, techOptions, filter, onChange, allRef })  // P8, P9; allRef i P9b (M11b punkt 11)
```

Varje funktion får **redan kompletta** projekt (`projects.filter(isComplete)`).
`null` som kategori betyder "Alla".

| Fråga | Beslut |
|-------|--------|
| Var kommer chipsen ifrån? | **Ur datan** (`collectTech`). Ingen chip kan då ge noll träffar på egen hand. Uppdragets exempel (React Native, C#, Blazor) finns inte på något projekt i dag och visas därför inte |
| Visas segment med antal 0? | **Ja, alla fyra, men ett segment vars antal i hela datan är 0 får `disabled`.** Uppdraget ritar fyra segment, och ett segment som bara kan ge tomt resultat ska inte gå att välja. Med enbart Awle: "Alla 1", "Fullstack 1", "Frontend 0" (inaktiv), "Backend 0" (inaktiv) |
| Vad räknar segmentens antal? | **Hela datan**, oberoende av chips och sök. Antalen hoppar alltså inte medan man skriver. Live-raden visar det kombinerade utfallet |
| Kombination | **OCH genom hela kedjan:** kategori OCH varje vald chip finns i `tech` OCH sökordet. Varje val smalnar av, aldrig breddar |
| Sökningen | Delsträng i `normalizeText(title + ' ' + description + ' ' + category + ' ' + tech.join(' '))`. Tom eller bara blanksteg = inget villkor. `å`, `ä` och `ö` jämförs som sig själva. Ingen diakritvikning |
| Noll träffar | Live-raden "Visar 0 av N projekt", stycket "Inga projekt matchar filtret." och knappen "Rensa filter", som återställer `EMPTY_FILTER` **och flyttar fokus till segmentet "Alla" (M11b, punkt 11, P9b)**. Texterna är gränssnittstext, inte påståenden om Jelal |
| Ingen komplett post alls | Filterpanelen och live-raden renderas **inte**. Dagens tomma läge står kvar |
| Live-raden | `<p aria-live="polite" aria-atomic="true">` med DOM-texten `Visar {x} av {y} projekt`, där `x` är **den visade listans** längd (`displayed.length`, M12b punkt 4, P9b). Versalerna kommer från CSS (`.meta`), så skärmläsaren läser ord och inte bokstäver. Uppläsningen följer korten, inte inmatningen. `polite` låter skärmläsaren slå ihop snabba ändringar |
| Semantik | Segmenten: `<div role="group" aria-label="Kategori">` med `<button type="button" aria-pressed>`. Chipsen: `<div role="group" aria-label="Teknik">` med `Chip` (M15). Sök: `<label className="visually-hidden" htmlFor={PROJECT_SEARCH_ID}>Sök projekt</label>` + `<input type="search" id={PROJECT_SEARCH_ID} placeholder="Sök projekt">` med `SearchIcon`. `PROJECT_SEARCH_ID = 'project-search'` är en export i `sections.js` (R2, M11b punkt 9). Tangentbord: Tab mellan knapparna, inga piltangenter (M11b punkt 3). Klick på ett redan valt segment gör ingenting (M11b punkt 4). Teknikgruppen renderas inte alls när `techOptions` är tom (M11b punkt 10). DOM-ordningen är segment, sök, chips (M11b punkt 5) |

**Panelens och kontrollernas deklarationer (`ProjectFilter.module.css`), tecken
för tecken:**

```css
.panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}

.segments,
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  min-width: 0;
}

.segment {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: 40px;
  padding: 0 var(--space-4);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  background-color: transparent;
  color: var(--ink-muted);
  font: inherit;
  font-weight: var(--weight-semibold);
  max-width: 100%;           /* M11b punkt 1 */
  min-width: 0;
  white-space: nowrap;
}

/* UPPHÄVT 2026-11-08, se M23 punkt 3: ytan är var(--accent-fill) och ramen
   var(--accent), i P18b. Deklarationen nedan är historik. */
.segment[aria-pressed='true'] {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--ink-inverse);
}

.segment:disabled {
  color: var(--ink-subtle);
  border-color: var(--line);
}

.label {                     /* M11b punkt 1 */
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.count {                     /* M11b punkt 1 */
  flex-shrink: 0;
}

.search {
  position: relative;
  min-width: 0;
}

.search > svg {              /* M11b punkt 6 */
  position: absolute;
  inset-block: 0;
  left: var(--space-3);
  margin-block: auto;
  color: var(--ink-muted);
  pointer-events: none;
}

.searchInput {
  width: 100%;
  height: 40px;
  padding: 0 var(--space-4) 0 40px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  background-color: var(--bg);
  color: var(--ink);
  font: inherit;
}

.searchInput::placeholder {  /* M11b punkt 7 */
  color: var(--ink-subtle);
  opacity: 1;
}

@media (min-width: 900px) {
  .panel {
    grid-template-columns: minmax(0, 1fr) minmax(0, 280px);
    align-items: start;
  }
}
```

- **Avvikelse från uppdraget: sökfältets kant är `--line-strong`, inte `--line`.**
  `--line` mot `--surface` är ca 1,3:1, och uppdraget kräver också WCAG AA. Ett
  inmatningsfälts avgränsning omfattas av 1.4.11:s 3:1. Samma skäl som
  formulärramen.
- Från 900 px står segmenten och chipsen i vänsterspåret och sökfältet i högerspåret
  ("Sökfält till höger"). Under 900 px staplas de i DOM-ordningen **segment, sök,
  chips** (M11b punkt 5).
- Live-raden står **under panelen**, utanför den, och har `typeStyles.meta` i JSX
  (M1, "Hur stilen når elementet"). Dess marginaler och noll-träff-blocket står i
  M11b (punkt 2 och 8).

#### M11b — De öppna markeringarna från P8 och P9, avgjorda (genomförs i P9b, efter P10)

Varje rad godkänner byggarens lösning **som den står i koden** om inget annat sägs.
Deklarationerna i `ProjectFilter.module.css` står nu tecken för tecken i M11:s
CSS-block ovan. **P10 rör inte dessa markeringar**, även om `OPEN-KEY`-grepen
(LARDOMAR 2026-11-07) ger träff på dem under P10. De är besvarade och har en ägare,
P9b. P10:s överlämning listar dem som "besvarade i M11b, tas bort i P9b". P9b tar
bort varje `EJ I ARKITEKTUR` + `OPEN-KEY` nedan i samma ändring och ersätter den med
`/* Beslutat i ARKITEKTUR.md: M11b */`. Kvarvarande kommentarstext skrivs som
invariant, utan uppmätta tal (LARDOMAR 2026-10-02).

| # | Nyckel / fråga | Fil | Beslut | Paket |
|---|----------------|-----|--------|-------|
| 1 | `segment-overflow` | `ProjectFilter.module.css` | Godkänd. Knappen har fast höjd, så den får inte radbryta (LARDOMAR 2026-11-07, "fast `height`"). Etiketten klipps med ellips, antalet krymper aldrig, och hela namnet står kvar i knappens tillgängliga namn. Markeringen står på två ställen (`.segment` och kommentaren över `.label`), och båda tas bort | P9b |
| 2 | `live-row-spacing` | `Projects.module.css` | Godkänd: `.liveRow { margin-top: var(--space-4); margin-bottom: var(--space-5); }`. Raden hör till panelen och står närmare den än korten | P9b |
| 3 | Piltangenter i segmentkontrollen | `ProjectFilter.jsx` | **Tab räcker. Ingen roving tabindex.** Segmenten är växlingsknappar med `aria-pressed` i en `role="group"`, inte `radiogroup` eller `tablist`, och för en knappgrupp förväntas inga piltangenter. Roving tabindex hade krävt egen tangenthantering som också måste hoppa över inaktiva segment. Ingen kod ändras | — |
| 4 | Klick på redan valt segment | `ProjectFilter.jsx` | **Bekräftat: inget händer.** Kategorin har exakt ett värde, och vägen tillbaka är "Alla". Avmarkering hade gett ett läge utan valt segment, och det läget finns inte i datamodellen (`null` = "Alla"). **"Inget händer" ska gälla även efter P10.** Ändrat 2026-11-07 (M12b punkt 5): invarianten bärs av villkoret i `Projects.jsx`, som bara startar en fas när mängden slugs ändras. **`ProjectFilter.jsx` får ingen egen vakt**, och segmentets `onClick` ändras inte. Mäts: klick på det valda segmentet, och rutnätet får aldrig `data-phase="out"` (M12b punkt 5, prov 2) | P9b (bara mätningen) |
| 5 | `search-dom-order` | `ProjectFilter.jsx` | **Godtas.** Ordningen är segment, sök, chips i DOM och i båda layouterna. DOM-ordningen är den visuella ordningen, och tabbordningen följer den. En inslagning av segment och chips i ett gemensamt vänsterelement väljs bort. Den hade lagt till ett element bara för att flytta sökfältet sist på smal skärm, och den ordningen är inte bättre | P9b (bara markeringen) |
| 6 | `search-icon-position` | `ProjectFilter.module.css` | Godkänd: absolut, `left: var(--space-3)`, lodrätt centrerad med `inset-block: 0; margin-block: auto`, `--ink-muted`, `pointer-events: none`. Ikonen på 20 px ryms i fältets vänstra utfyllnad på 40 px | P9b |
| 7 | `search-placeholder-color` | `ProjectFilter.module.css` | Godkänd: `--ink-subtle` med `opacity: 1`. Mot fältets `--bg` är kvoten 5,355:1 (tokens.css), alltså AA, och samma token som kontaktformulärets platshållare (M16) | P9b |
| 8 | `no-match-style` | `Projects.module.css` | Godkänd: `.noMatch { display: grid; justify-items: start; gap: var(--space-4); }` och `.clear` som pill, `height: 40px`, `padding: 0 var(--space-4)`, kant `--line-strong`, text `--ink`, `--weight-semibold`. Fast höjd är tillåten här eftersom texten är en konstant och inte data | P9b |
| 9 | `PROJECT_SEARCH_ID` | `sections.js` | Godkänd: `export const PROJECT_SEARCH_ID = 'project-search';`. Den slutar på `_ID`, så R2:s grind läser den utan ändring i `validate-data.mjs`. Införd i Datamodell och komponenttabellen. P9b prövar grinden med `slug: 'project-search'`: kod 1 och exakt en rad `sidans id: "project-search" sätts av både sections.js PROJECT_SEARCH_ID och projects.js projekt "project-search"`, och rättat ger kod 0 | P9b (provet) |
| 10 | Tom `techOptions` | `ProjectFilter.jsx` | **Bekräftat: gruppen renderas inte.** En tom `role="group"` hade varit ett namngivet landmärke utan innehåll (LARDOMAR 2026-10-02, "rendera inget element alls") | — |
| 11 | Fokus efter "Rensa filter" | `Projects.jsx`, `ProjectFilter.jsx` | **Fokus flyttas till segmentet "Alla".** Det är alltid aktivt (panelen finns bara när minst ett projekt är komplett), dess `aria-pressed="true"` bekräftar återställningen, och fokus hamnar före live-raden i läsordningen. Sökfältet väljs bort: programmatiskt fokus på ett inmatningsfält i en klickhanterare öppnar tangentbordet på mobil. **Byggs med en ref, inte med ett id:** se signaturerna under tabellen | P9b |
| 12 | Sökfältets kant | `ProjectFilter.module.css` | **Bekräftat: `--line-strong`, inte uppdragets `--line`.** Fältets gräns omfattas av WCAG 1.4.11 (3:1). `--line` mot `--surface` är ca 1,3:1. `--line-strong` ger 3,891:1 mot `--surface` och 4,169:1 mot `--bg` (tokens.css). Avvikelsen från uppdraget står redan under M11:s CSS-block. Ingen kod ändras | — |

**Punkt 11, signaturerna (React 19, `ref` som vanlig prop, ingen `forwardRef`):**

```js
// src/components/ProjectFilter.jsx — ny prop, första konsumenten i P9b
function ProjectFilter({ counts, total, techOptions, filter, onChange, allRef })
// allRef sätts som ref på segmentet "Alla" (category === null), och bara där:
//   ref={category === null ? allRef : undefined}

// src/components/Projects.jsx
const allSegmentRef = useRef(null);          // import { useRef } ur 'react'
// <ProjectFilter … allRef={allSegmentRef} />
// "Rensa filter": onClick={() => { <återställ till EMPTY_FILTER>; allSegmentRef.current?.focus(); }}
```

- Fokus sätts **synkront i klickhanteraren**, efter återställningen. Knappen "Alla"
  finns redan i DOM, eftersom panelen inte avmonteras vid noll träffar. Ingen
  `useEffect` och ingen `setTimeout`, och P10:s uttoning påverkar inte panelen.
- Återställningen sker på samma väg som P10 har byggt filterändringar (M12, "In-
  och uttoning vid filtrering"). P9b byter inte ut den vägen, utan lägger bara till
  fokusraden efter den.
- **Mäts i P9b, med negativ kontroll:** fyll sökfältet med `zzz` (noll träffar),
  Tab till "Rensa filter", tryck Enter. Då ska `document.activeElement` vara en
  `button` vars `aria-pressed` är `"true"` och vars `textContent` börjar med
  `Alla`. Samma prov med musklick. Negativ kontroll: kommentera bort fokusraden. Då
  ska `document.activeElement.tagName === 'BODY'`, alltså det uppmätta felet.
  Därefter återställs raden.

**P9b — exakt vad som ändras (M11b + M12b, ett paket).** Körs efter P10, eftersom
P10 ändrar `Projects.jsx`. Kan gå parallellt med P5 omgång 4: ingen fil nedan
ändras där. Inga andra filer.

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/ProjectFilter.module.css` | Ta bort `EJ I ARKITEKTUR` och `OPEN-KEY` för `segment-overflow` (i `.segment` och över `.label`), `search-icon-position` och `search-placeholder-color`. Ersätt var och en med `/* Beslutat i ARKITEKTUR.md: M11b */` plus invarianten. Inga deklarationer ändras | M11b 1, 6, 7 |
| `src/components/ProjectFilter.jsx` | Ta bort `EJ I ARKITEKTUR` och `OPEN-KEY: search-dom-order`, och ersätt med `Beslutat i ARKITEKTUR.md: M11b` plus invarianten "DOM-ordningen är den visuella ordningen i båda lägena". Lägg till propen `allRef` och `ref` på "Alla" enligt signaturen. **Segmentets `onClick` ändras inte** (M12b punkt 5). Komponentens kommentar får en mening om att Tab är tangentmodellen och att ett valt segment inte kan avmarkeras | M11b 3, 5, 11 |
| `src/components/Projects.module.css` | Ta bort `EJ I ARKITEKTUR` och `OPEN-KEY` för `live-row-spacing` och `no-match-style`, och ersätt dem på samma sätt. Inga deklarationer ändras | M11b 2, 8 |
| `src/components/Projects.jsx` | `allSegmentRef`, `allRef={allSegmentRef}` och fokusraden i "Rensa filter". `displayed` med lat startvärde, och `shown` tas bort ur renderingen. `pending`-ref och `changeFilter` i sju steg. Importera `sameSlugs`. Live-raden blir `displayed.length`. Kommentaren om de två listorna får invarianten "en fas startar bara när mängden projekt ändras" | M11b 11, M12b 4, 5 |
| `src/lib/projectRules.js` | `export function sameSlugs(a, b)` enligt signaturen | M12b 5 |
| `src/styles/global.css` | Reveal-regeln delas i två: opacitet på alla, `transform` bara `:not([id])`. Kommentaren får invarianten om ankarmål | M12b 1 |
| `src/components/ProjectCard.jsx` | Kommentaren ovanför `<Reveal as="li" …>` får en mening: id:t på detta element gör att det bara tonas i opacitet, så ett ankarhopp landar rätt (M12b) | M12b 1 |
| `src/components/Header.jsx` | Skyddsraden först i effekten i `useCurrentSection`, med kommentar | M12b 2 |
| `src/components/Reveal.jsx` | Ta bort `enableReveal`, `oxlint-disable`-raden och `EJ I ARKITEKTUR` + `OPEN-KEY: reveal-lint-export`. Den inledande kommentaren säger att `main.jsx` sätter attributet | M12b 3 |
| `src/main.jsx` | Lokal `function enableReveal()` utan export. Importen ur `Reveal.jsx` tas bort | M12b 3 |

**Grindar före överlämning:**

1. `grep -rn "segment-overflow\|live-row-spacing\|search-dom-order\|search-icon-position\|search-placeholder-color\|no-match-style\|reveal-lint-export" src`
   ger noll träffar. `grep -rn "oxlint-disable\|eslint-disable" src` ger noll.
2. M11b: provet i punkt 9, och mätningen i punkt 11 med negativ kontroll.
3. M12b: mätningarna i punkt 1–5, var och en med sin negativa kontroll, med vyport
   och rullningslistvillkor.
4. Det befintliga 360 px-provet för panelen och P10:s reveal-mätningar (med och
   utan reducerad rörelse) körs om oförändrade.
5. `npm run lint` utan varningar för `only-export-components`. `npm run validate:data`
   och `npm run build` är gröna, och tokengrinden tiger.
6. Kommentarer: `grep -rn "reveal\|enableReveal\|shown\|[0-9]\+ px" src` läses, och
   varje kommentar som beskriver det gamla beteendet skrivs om till invarianten.
7. För varje `OPEN-KEY: <nyckel>` i `src/` och `scripts/`: `grep -c "<nyckel>" ARKITEKTUR.md`.

### M12 — Animationerna (P7 hover, P10 resten)

**A11 är upphävt av Jelals beslut 4.** Uppdraget beställer nu animation.

- **`.reveal` är den tredje sanktionerade globala klassen** (efter
  `.visually-hidden`). Den ligger i `global.css`. Skälet: mekanismen går genom
  sektioner i flera moduler, och uppdraget namnger klassen. Dörren stängs igen
  efter den.
- **Komponenten `src/components/Reveal.jsx`:**
  `function Reveal({ as = 'div', index = 0, className, children, ...rest })`
  renderar elementet med klassen `reveal` (plus `className`) och
  `style={{ '--reveal-index': index }}`. Den registrerar elementet i **en
  gemensam** `IntersectionObserver` på modulnivå
  (`{ threshold: 0, rootMargin: '0px 0px -10% 0px' }`), sätter
  `data-revealed="true"` vid första skärning och slutar observera elementet. Den
  avregistrerar vid avmontering.
- **`function enableReveal()`** är en **lokal, icke-exporterad** funktion i
  `src/main.jsx` (ändrat i M12b punkt 3, P9b; tidigare en export i `Reveal.jsx`).
  Den anropas **före första renderingen** (ändrat 2026-11-08, M21 punkt 5: före
  `hydrateRoot` i bygget, före `createRoot` i dev) och sätter
  `document.documentElement.dataset.revealReady = 'true'` **bara om**
  `'IntersectionObserver' in window` och
  `!matchMedia('(prefers-reduced-motion: reduce)').matches`.
- **Innehållet kan aldrig bli kvar osynligt utan observer.** Döljandet villkoras på
  attributet, tecken för tecken (transformen bara på element utan `id`, rättat i
  M12b punkt 1, P9b):

```css
.reveal {
  transition: opacity var(--duration-reveal) var(--ease-out),
    transform var(--duration-reveal) var(--ease-out);
  transition-delay: calc(var(--reveal-index) * var(--reveal-stagger));
}

:root[data-reveal-ready] .reveal:not([data-revealed]) {
  opacity: 0;
}

:root[data-reveal-ready] .reveal:not([data-revealed]):not([id]) {
  transform: translateY(24px);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }

  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- **Var `Reveal` sitter:** sektionsrubriken i `Section.jsx` (etikett + `h2`),
  filterpanelen, varje projektkort (`as="li"`, `index`, och `className={styles.item}`
  plus `id` ur `cardIds`, så att ankarmålet och scroll-marginalen följer med, R1
  och R2. Eftersom kortet bär `id` tonas det bara i opacitet och flyttas aldrig,
  M12b punkt 1), varje kompetenskort
  (`index`), Om mig-texten och nyckeltalsraden, och kontaktens två spalter
  (`index` 0 och 1). **Hero är inte `reveal`.** Den är LCP och ska inte vänta på
  en observer. Footern är det inte heller.
- **Staggern:** 70 ms per steg, och `index` sätts till `Math.min(i, REVEAL_INDEX_MAX)`
  med `export const REVEAL_INDEX_MAX = 5` i `Reveal.jsx`. Längsta fördröjningen
  blir 350 ms, oavsett antal kort.
- **In- och uttoning vid filtrering (P10):** `Projects.jsx` håller två listor, den
  filtrerade och den visade. Vid ändring sätts `data-phase="out"` på rutnätet
  (`opacity: 0`, `transition: opacity var(--duration-fast) var(--ease-out)`).
  Efter `--duration-fast` (160 ms, en `setTimeout`) byts den visade listan och
  `data-phase` tas bort (`opacity: 1`, `transition: opacity var(--duration-base)
  var(--ease-out)`). Kort som monteras på nytt passerar `Reveal` och tonar in med
  stagger. **Snabba klick:** varje ändring rensar föregående timeout, så den
  visade listan blir alltid den senaste. **Med reducerad rörelse byts listan
  direkt**, utan timeout. **Villkoret för en fas (M12b punkt 5, P9b):** en
  filterändring startar en uttoning bara när mängden slugs skiljer sig från den
  lista som annars skulle visas härnäst. Live-raden räknar den **visade** listan
  (M12b punkt 4, P9b).
- **`prefers-reduced-motion` stänger av:** varje transition och animation (blocket
  ovan), reveal-döljandet (`enableReveal` i `main.jsx` sätter inget attribut), kortens lyft och
  bildzoom (M4), filtrets fördröjning, och `scroll-behavior: smooth` (befintlig
  regel).

#### M12b — Fem fynd från P10, avgjorda (genomförs i P9b, 2026-11-07)

Byggaren av P10 hittade fem saker som M12 inte löste. Varje beslut står också på
sin gamla plats, rättat där: M7, M11 (live-raden), M11b punkt 4 och P9b-tabellen,
M12 (CSS-blocket, `enableReveal`, "Var `Reveal` sitter", uttoningen), M4:s markup,
A4, komponenttabellen, Mappstruktur och tabellen över förbjudna strängar.
**Allt genomförs i P9b**, som slås ihop med M11b:s P9b till ett paket (tabellen
"P9b — exakt vad som ändras" under M11b). Skälet är att båda ändrar `Projects.jsx`.
Inget av det rör `Hero*`, `index.html`, `profile.js` eller `optimize-images.mjs`,
så P9b kan gå parallellt med P5 omgång 4.

| # | Fynd | Beslut i en mening |
|---|------|--------------------|
| 1 | Ankarhoppet till ett kort som inte tonats in landar 24 px för högt | **(c): ett `.reveal` som bär `id` tonas bara i opacitet.** Transformen villkoras på `:not([id])` i `global.css`. Id:t, `cardIds` och `.item` rörs inte |
| 2 | `Header.jsx` anropar `new IntersectionObserver` utan skydd | Utan observer markeras **ingen** navlänk. Effekten returnerar innan den läser element eller registrerar lyssnare |
| 3 | `oxlint-disable` för `enableReveal` i `Reveal.jsx` | **Ingen avstängd lintregel.** `enableReveal` blir en lokal, icke-exporterad funktion i `main.jsx`. Inte `src/lib/`, eftersom den rör `document` och `window` |
| 4 | Live-raden byter siffra upp till 160 ms före korten | Live-raden räknar **den visade listan** (`displayed.length`) |
| 5 | Varje tangenttryckning startar en ny uttoning | En fas startar **bara när mängden slugs ändras** jämfört med den lista som annars visas härnäst. Det gäller alla filterändringar. M11b punkt 4:s särskilda vakt i `ProjectFilter.jsx` utgår, eftersom den här regeln täcker den |

##### Punkt 1 — varför (c), och varför inte (a) eller (b)

- **(c) väljs.** Med enbart opacitet ligger ankarmålets ruta på sin slutliga plats
  hela tiden, så webbläsaren räknar hoppet mot rätt ruta redan vid första hoppet.
  Det är en CSS-ändring i en fil. Kortets `<li id>` behåller `className={styles.item}`
  och `id={ids.item}`, så **R2-grinden** (källa 4, `cardIds(slug)`), **`cardIds`** och
  **`.item { scroll-margin-top: … }` (A4/R1)** gäller oförändrade. Uppdragets
  `translateY(24px)` står kvar på alla andra `.reveal`.
- **(a) väljs bort.** Ett yttre `<li id>` med `Reveal` inuti ger ett element till per
  kort och kräver `height: 100%` på omslaget för att korten i en rad ska förbli lika
  höga (M4). Det blir mer markup och CSS för samma invariant.
- **(b) väljs bort.** Den kräver en JS-hanterare för ankarklick, `hashchange` och
  sidladdning med hash. "Ankarnavigering — exakt mekanik" punkt 2 säger "ingen
  JS-scrollhanterare", och `hashchange` kommer efter scrollen.
- **Skillgruppernas `h3 id`:** ingen länk på sidan pekar på dem (`grep` på `href`
  i `src`: bara sektionerna, `MAIN_ID`, `HERO_ID`, `CONTACT_ID` och projektets slug
  i `About.jsx`). De rörs inte nu. Grinden nedan fäller i stället varje framtida
  länk till ett mål som ligger inuti ett `.reveal` som inte är målet självt. Den
  som lägger till en sådan länk måste då flytta `id` till kortet och ge kortet
  scroll-marginalen.

**`global.css`, tecken för tecken** (ersätter regeln
`:root[data-reveal-ready] .reveal:not([data-revealed]) { opacity: 0; transform: translateY(24px); }`):

```css
:root[data-reveal-ready] .reveal:not([data-revealed]) {
  opacity: 0;
}

:root[data-reveal-ready] .reveal:not([data-revealed]):not([id]) {
  transform: translateY(24px);
}
```

Kommentaren ovanför blocket får invarianten: "ett element som är ankarmål får
aldrig flyttas av reveal, eftersom webbläsaren räknar hoppet mot den flyttade
rutan. Därför flyttas bara element utan id." Inga tal står i kommentaren.
Blocket för `prefers-reduced-motion` rörs inte.

**Mäts** i `vite preview` av ett färskt bygge, vid 360 × 640 och 1280 × 800 med
reserverad rullningslist 15 px (`innerWidth - clientWidth` skrivs ut först):

1. Ladda sidan utan hash, `scrollY` 0. Bekräfta att `#awle` saknar `data-revealed`
   och att `getComputedStyle(#awle).transform === 'none'` och `opacity === '0'`.
2. Klicka länken i Om mig (`href="#awle"`). Vänta tills `scrollY` har stått still i
   500 ms och `data-revealed` är satt. **Grind:** `#awle.getBoundingClientRect().top`
   = `parseFloat(getComputedStyle(#awle).scrollMarginTop)` ±0,5 px (förväntat
   90 = 74 + 16, och P10 mätte 89,8 vid andra hoppet). Ett andra hopp ger samma tal
   ±0,5.
3. **Strukturgrind:** för varje `a[href^="#"]` med mer än `#` i `href`: målet `T`
   finns, och `T.closest('.reveal')` är `null` eller `T`. Antalet länkar skrivs ut.
4. **Negativ kontroll för 2:** injicera
   `:root[data-reveal-ready] .reveal[id]:not([data-revealed]) { transform: translateY(24px); }`
   som en `<style>` via `Page.addScriptToEvaluateOnNewDocument` (vid
   `DOMContentLoaded`), så att den finns innan kortet tonas in. Ladda om.
   Kontrollera att `document.querySelectorAll('.reveal[id]').length` är lika med
   antalet kort, och gör om steg 1 och 2. Det ska ge det uppmätta felet: `top` ca 65,5–66, och
   elementet som bär avvikelsen är `#awle`. Ta bort skriptet och ladda om, och
   då är talet 90 ±0,5 igen.
5. **Negativ kontroll för 3:** lägg till en tillfällig
   `<a href="#<första skillgruppens id>">` i DOM. Grinden ska fälla den och namnge
   `h3#<id>` med kortet som `.reveal`-förfader. Ta bort länken, och grinden tiger.
6. Sektionsankarna: hopp till `#projects` och `#contact` landar som före (90 ±0,5).

##### Punkt 2 — `Header.jsx` utan IntersectionObserver

- Första raden i effekten i `useCurrentSection`, före `getElementById` och före
  `addEventListener`:
  `if (!('IntersectionObserver' in window)) return undefined;`
- `currentId` förblir `null`. Ingen navlänk får `aria-current`, och ingen scroll-
  eller resize-lyssnare registreras, inte heller undantaget för botten. Att bara
  markera vid botten hade varit en halv markering, och en felaktig markering är
  värre än ingen. Navlänkarna fungerar som vanliga ankare.
- Ingen reservlösning med `getBoundingClientRect` på scroll. Varje webbläsare som
  sidan stöder har IntersectionObserver. Skyddet finns för att sidan aldrig ska
  krascha, inte för att markeringen ska fungera där.
- Kommentaren får invarianten: "utan observer markeras ingen länk, och sidan
  fungerar."

**Mäts:** CDP `Page.addScriptToEvaluateOnNewDocument({ source: 'delete window.IntersectionObserver' })`.
Bekräfta i sidan att `typeof window.IntersectionObserver === 'undefined'`. Därefter
ska följande gälla: noll `Runtime.exceptionThrown`, `#root` har barn, exakt ett
`h1`, och `document.querySelectorAll('[aria-current]').length === 0` vid `scrollY`
0, efter klick på "Projekt" och längst ned. Klicket på "Projekt" landar
`#projects` på 90 ±0,5. Roten saknar `data-reveal-ready`, och varje `.reveal` har
`opacity` `1`. **Negativ kontroll:** kommentera bort skyddsraden. Då ska minst ett
`exceptionThrown` nämna `IntersectionObserver`, och felbilden (barn i `#root`)
skrivs in i överlämningen som uppmätt. Återställ raden och kör om.

##### Punkt 3 — `enableReveal` utan avstängd lintregel

- `src/main.jsx` definierar `function enableReveal()` lokalt, utan `export`, med
  samma villkor som i M12, och anropar den före första renderingen (ändrat
  2026-11-08, M21 punkt 5: före `hydrateRoot` eller `createRoot`). Importen ur
  `Reveal.jsx` tas bort.
- `Reveal.jsx` exporterar bara `default Reveal` och `REVEAL_INDEX_MAX`. Raden
  `// oxlint-disable-next-line react/only-export-components` och markeringen
  `EJ I ARKITEKTUR` + `OPEN-KEY: reveal-lint-export` tas bort. Filens inledande
  kommentar säger att attributet sätts av `main.jsx` före första renderingen.
- **Inte `src/lib/reveal.js`.** `src/lib/` får inte röra `document` eller `window`
  (Mappstruktur), och `enableReveal` gör båda. `main.jsx` exporterar ingenting,
  så regeln kan inte slå till där.
- Media-strängen `(prefers-reduced-motion: reduce)` står då i `main.jsx`,
  `Projects.jsx` och `global.css`. Den godtas. Strängen är plattformens namn på
  frågan, inte ett projektvärde, och den kan inte glida isär utan att brytas mot
  CSS-standarden.

**Mäts:** `npm run lint` ger noll rader med `only-export-components`.
`grep -rn "oxlint-disable\|eslint-disable" src` ger noll träffar, och
`grep -rn "reveal-lint-export" src` ger noll. **Negativ kontroll:** lägg till en
tillfällig `export function probe() {}` i `Reveal.jsx`. Då ska lint ge
`only-export-components` för `Reveal.jsx`, vilket visar att regeln är aktiv. Ta
bort exporten. P10:s reveal-mätningar körs om oförändrade: med normal rörelse har
roten `data-reveal-ready="true"` innan något `.reveal` målas. Med emulerad
`prefers-reduced-motion: reduce` saknas attributet.

##### Punkt 4 — live-raden följer den visade listan

`<p aria-live="polite" aria-atomic="true">` får texten
`Visar {displayed.length} av {visible.length} projekt`. Siffran byts i samma
rendering som korten. Uppläsningen kommer upp till `--duration-fast` senare, men
den stämmer med det som syns. Med reducerad rörelse byts båda direkt.
`shown` försvinner ur renderingen (se punkt 5).

**Mäts:** med Awle som enda projekt skriver du in en söksträng som ger noll
träffar (byggaren bekräftar först att `filterProjects` ger `[]`). Läs med
`requestAnimationFrame` under 300 ms siffran i live-raden och antalet
`ul.grid > li` (0 när noll-träff-blocket visas). **Grind:** de två är lika i varje
prov. Antalet prov skrivs ut. **Negativ kontroll:** återställ `shown.length`. Då
finns minst ett prov där raden säger 0 och rutnätet har 1 `li`. Återställ.

##### Punkt 5 — när en fas startar

```js
// src/lib/projectRules.js — P9b
/** Samma projekt i samma ordning, jämfört på slug. filterProjects behåller datans
 *  ordning, så lika mängder slugs ger alltid lika ordning. */
/** @param {Project[]} a  @param {Project[]} b  @returns {boolean} */
export function sameSlugs(a, b)

// src/components/Projects.jsx — P9b
const [displayed, setDisplayed] = useState(() => filterProjects(visible, EMPTY_FILTER));
const pending = useRef(null);   // Project[] | null: listan som den pågående timeouten kommer att visa
function changeFilter(next)     // signaturen oförändrad
```

`changeFilter(next)`, i den här ordningen:

1. `setFilter(next)`, alltid, så att kontrollerna följer inmatningen.
2. `nextShown = filterProjects(visible, next)` och `target = pending.current ?? displayed`.
3. `sameSlugs(nextShown, target)`: **return**. En pågående timeout fortsätter
   orörd, och ingen ny fas startar.
4. Annars `clearTimeout(timer.current)` och `pending.current = null`.
5. `sameSlugs(nextShown, displayed)`: `setFading(false)` och **return**. Man har
   ångrat sig tillbaka till det som syns. Inget byte görs, och rutnätet tonar in
   igen.
6. `delay = prefersReducedMotion() ? 0 : fadeOutMs()`. Om `delay === 0`:
   `setDisplayed(nextShown)`, `setFading(false)`, **return**.
7. `pending.current = nextShown`, `setFading(true)`, och
   `timer.current = setTimeout(() => { pending.current = null; setDisplayed(nextShown); setFading(false); }, delay)`.

- Regeln gäller **varje** väg in i `changeFilter`: sök, segment, chips och "Rensa
  filter". Ett chip som inte ändrar resultatet startar alltså ingen fas.
- **Avstämt mot M11b punkt 4:** "klick på valt segment gör ingenting" gäller
  fortfarande, men bärs nu av steg 3. Vakten `filter.category !== category` i
  `ProjectFilter.jsx` **utgår**. Två mekanismer för samma invariant gör att den
  negativa kontrollen av den ena inte visar något (LARDOMAR 2026-10-05, vaktrader
  som inte går att få att larma).
- "Rensa filter" från noll träffar ger en fas, eftersom mängden ändras. Fokusraden
  (M11b punkt 11) står synkront efter anropet, som förut.

**Mäts**, med en `MutationObserver` på `ul.grid` för attributet `data-phase` som
räknar varje övergång till `"out"`:

1. Skriv `a`, `aw`, `awl`, `awle` i sökfältet. Awle matchar hela tiden: 0 `out`.
2. Klicka det valda segmentet "Alla": 0 `out`.
3. Slå på ett chip som Awle har: 0 `out`. Slå av det: 0 `out`.
4. Skriv en sträng med noll träffar: exakt 1 `out`.
5. A→B→A: skriv en sträng med noll träffar och töm fältet inom 100 ms. Då ska
   samma `li#awle`-nod sitta kvar (`isConnected`, samma referens), live-raden
   aldrig visa 0, och `data-phase` vara borta efter högst `--duration-fast`.
6. **Negativ kontroll:** ta bort steg 3 och 5. Då ger prov 1 minst 4 `out` och
   prov 2 minst 1. Återställ, och då ger prov 1 och 2 noll igen.

##### Beslutslogg — M12b

Står i "Beslutslogg — M12b, fynden från P10, 2026-11-07" sist i beslutsloggen.

### M13 — Sektionsetiketterna (P11)

- Formatet `01 / 04 · PROJEKT`: nummer och nämnare räknas ur **`sections`**
  (de navigerbara sektionerna). **Hero räknas inte.** Den är ingen post i listan
  och har ingen `h2`.
- `src/lib/sectionLabel.js`:
  `export function sectionIndexLabel(sections, id)` → `'01 / 04'`, eller `null` om
  `id` inte finns. Siffrorna fylls ut till två tecken.
- `Section.jsx` behåller signaturen ~~`function Section({ id, title, children, className })`~~
  (**signaturen UPPHÄVD 2026-11-08, se M23 punkt 1:** `function Section({ id, title, children, className, surface })`, i P18a. Etiketten nedan gäller).
  Ovanför `h2` renderas `<p className={styles.label} aria-hidden="true">{indexLabel} · {title}</p>`,
  där `className` är `` `${typeStyles.meta} ${styles.label}` `` (M1, "Hur stilen
  når elementet"). Versalerna kommer från CSS.
- **Avståndet till `h2` (avgjort efter P11, M15b punkt 2):** i `Section.module.css`,
  tecken för tecken, `.label { margin-bottom: var(--space-3); }`. Etiketten hör
  till rubriken under sig och står därför tätare än `.title` mot innehållet
  (`--space-5`). Det är P11:s värde, godkänt som byggt.
- **Nämnaren (avgjort efter P11, M15b punkt 5):** `sections.length`, alltså alla
  poster. Varken komponenten eller funktionen räknar bara de sektioner som
  renderas. I ett godkänt bygge är de lika många: `validate-data.mjs` fäller en
  post utan `id` eller `label`, och verifieringspunkten i `App.jsx` fäller ett id
  utan komponent.
- **Skärmläsare:** etiketten är `aria-hidden`. Den upprepar `h2` med ett nummer, och
  numret säger inget som rubriknavigeringen inte redan ger.

### M14 — Nyckeltalen (P12)

- **Två tal, båda härledda:**
  `export function keyFigures({ projects, skillGroups })` i `src/lib/keyFigures.js`
  ger `[{ key: 'projects', value, label: 'Projekt' }, { key: 'skills', value, label: 'Kompetenser' }]`.
  `projects` räknas med `isComplete`. `skills` är **antalet chips som
  kompetenssektionen renderar**, räknat ur `renderedSkillGroups(skillGroups)` i
  `src/lib/skillRules.js` (rättat 2026-11-07, M14b punkt 1. Tidigare stod "antalet
  unika namn", vilket är samma tal bara så länge `validate-data.mjs` fäller dubbla
  namn). Ett tal med värdet 0 tas inte med i listan (M14b punkt 6).
- **"År i branschen" utgår** ~~tills Jelal har gett talet (fråga 3)~~. Det är ett
  påstående om honom. **BESVARAD 2026-11-18:** Jelal vill inte ha nyckeltalet, så
  det läggs inte till.
- **"Teknologier" byts mot "Kompetenser".** Projektdatan har sex tekniker från ett
  projekt, och kompetenslistan blandar tekniker och arbetssätt. Etiketten ska säga
  vad som faktiskt räknas.
- **Placering:** i Om mig, under texten. Den hör till personen, och i hero hade
  den tryckt knapparna under vikningen på mobil (A5).
- **Komponenten:** `src/components/KeyFigures.jsx`, `function KeyFigures()`, som en
  `<dl>` med en `<div>` per tal: `<dt>` (etiketten, `typeStyles.meta` i JSX) och `<dd>`
  (siffran i `--font-heading`, `--text-figure`, `--weight-bold`). Visuellt står
  siffran överst (`flex-direction: column-reverse`). Uppläsningen blir
  "Projekt, 1". `KeyFigures` äger sin `<Reveal as="dl">` och renderar `null` när
  listan är tom (M14b punkt 5 och 6).

#### M14b — Sju punkter från P12, avgjorda (genomförs i P12b, efter P13 och före G2)

| # | Fråga | Beslut | Paket |
|---|-------|--------|-------|
| 1 | `OPEN-KEY: kompetensurvalet-pa-ett-stalle` | **Ja, urvalet lyfts till `src/lib/skillRules.js`.** Både `Skills.jsx` och `keyFigures.js` läser samma funktion, och ingen av dem har kvar ett eget filter. Grinden står under "Verifiering i P12b", punkt 3 | P12b |
| 2 | `OPEN-KEY: nyckeltal-avstand` | **Godkänd som byggd:** `.list { display: flex; flex-wrap: wrap; gap: var(--space-5) var(--space-7); margin-top: var(--space-7); }`. Markeringen tas bort | P12b |
| 3 | `OPEN-KEY: nyckeltal-etikett-avstand` | **Godkänd som byggd:** `.item { gap: var(--space-2); }`. Markeringen tas bort | P12b |
| 4 | `OPEN-KEY: nyckeltal-radhojd` | **Godkänd som byggd:** `.value { line-height: var(--leading-tight); }`. Markeringen tas bort | P12b |
| 5 | `<Reveal as="dl">` inne i `KeyFigures` | **Bekräftat.** Raden tonar in som en enhet (M12 "Var `Reveal` sitter"), och `About.jsx` lägger ingen egen `Reveal` runt `<KeyFigures />` | ingen |
| 6 | Talet 0 när inget projekt är komplett | **Bara det talet döljs.** `keyFigures` tar inte med ett tal vars `value` är 0. Är båda 0 blir listan tom, och `KeyFigures` renderar `null`, alltså ingen tom `<dl>` (LARDOMAR.md 2026-10-02, "rendera inget element hellre än ett tomt"). "0 projekt" är sant men säger ingenting om Jelal, och det andra talet är fortfarande sant. Att dölja hela raden valdes bort, eftersom det tar bort ett giltigt tal för att ett annat saknas | P12b |
| 7 | `dt`-texterna läses i versaler i Chromes tillgänglighetsträd | **Godtas**, av samma skäl som M15b punkt 4. Källtexten i `keyFigures.js` står kvar som `'Projekt'` och `'Kompetenser'`. G2 lyssnar på raden | ingen |

**Signaturen, punkt 1:**

```js
// src/lib/skillRules.js — ren JS, ingen React, JSX eller DOM
/** Grupperna som kompetenssektionen renderar, i datans ordning, var och en med
 *  bara de kompetenser som blir chips. En grupp renderas om id och title har
 *  text och minst en kompetens har ett name med text. Ej array in ger []. */
/** @param {unknown} skillGroups  @returns {{ id: string, title: string, skills: { name: string }[] }[]} */
export function renderedSkillGroups(skillGroups)
```

- Den returnerade gruppen är en ny `{ ...group, skills }` där `skills` redan är
  filtrerad. Indata ändras inte.
- `hasText` är en lokal, icke-exporterad funktion i filen, som i `projectRules.js`.
- `Skills.jsx` gör `const groups = renderedSkillGroups(skillGroups);` och mappar
  `group.skills` direkt, utan `.filter`. Dess lokala `hasText` tas bort.
- `keyFigures.js` räknar `skills` som summan av `group.skills.length` över
  `renderedSkillGroups(skillGroups)`. `countRenderedSkills` och den lokala `hasText`
  tas bort. Summan och inte ett `Set`: talet ska vara antalet chips, och chipsen
  dedupliceras inte.
- `keyFigures` behåller signaturen och returtypen i M14. Ordningen är
  `projects`, `skills`, med de tal som har `value === 0` bortfiltrerade.

**Exakt vad P12b ändrar.** Inga andra filer. `Contact*` och `ContactForm*` rörs
inte (P13):

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/lib/skillRules.js` | **Ny.** `export function renderedSkillGroups(skillGroups)` enligt signaturen. Inledande kommentar: "Beslutat i ARKITEKTUR.md: M14b", och invarianten "kompetenssektionen och nyckeltalen frågar samma funktion, så att talet och chipsen inte kan glida isär" | 1 |
| `src/components/Skills.jsx` | Importera `renderedSkillGroups`. Ersätt `skillGroups.filter(...)` och `.filter((skill) => hasText(skill?.name))` med funktionen. Ta bort den lokala `hasText` och dess kommentar. Kommentaren ovanför urvalet skrivs om: regeln bor i `src/lib/skillRules.js`, och komponenten renderar det den får | 1 |
| `src/lib/keyFigures.js` | Importera `renderedSkillGroups` och räkna enligt ovan. Ta bort `countRenderedSkills`, den lokala `hasText` och `EJ I ARKITEKTUR` + `OPEN-KEY: kompetensurvalet-pa-ett-stalle`. Filtrera bort tal med `value === 0`. Läs om filens inledande kommentar så att den stämmer | 1, 6 |
| `src/components/KeyFigures.jsx` | `if (figures.length === 0) return null;` före `return`. Kommentaren får en mening om att ett tal som är 0 inte visas, och att en tom rad inte renderas alls | 6 |
| `src/components/KeyFigures.module.css` | Ta bort de tre `EJ I ARKITEKTUR` + `OPEN-KEY`-paren (`nyckeltal-avstand`, `nyckeltal-etikett-avstand`, `nyckeltal-radhojd`). Ersätt vart och ett med `/* Beslutat i ARKITEKTUR.md: M14b */` och behåll invarianten som står där. Inga deklarationer ändras | 2, 3, 4 |

**Verifiering i P12b, utdata klistras in i överlämningen:**

1. `grep -rn "OPEN-KEY" src scripts`: ingen av de fyra nycklarna i M14b finns kvar.
   `grep -rn "countRenderedSkills" src` och `grep -rn "hasText(skill" src`: noll
   träffar utanför `src/lib/skillRules.js`.
2. `grep -rn "renderedSkillGroups" src`: exakt tre filer, `skillRules.js`,
   `Skills.jsx` och `keyFigures.js`.
3. **Grinden för punkt 1, i webbläsaren mot `npm run build` + `preview`:**
   `document.querySelectorAll('#skills li').length` är lika med talet i den `dd` vars
   `dt` har texten `Kompetenser`. Utdata visar båda talen.
   - **Legitim ändring som får fälla grinden: ingen.** Att Jelal lägger till eller
     tar bort en kompetens, eller en hel grupp, ska aldrig fälla den.
   - **Korrekt indata (ska tiga):** datan som den står.
   - **Felaktigt (ska larma), i dev-servern:** ersätt tillfälligt räkningen i
     `keyFigures.js` med `skillGroups.flatMap((g) => g.skills).length` och lägg en
     kompetens `{ name: '  ' }` i en grupp i `skills.js`. Redovisa båda talen och att
     skillnaden är exakt 1. Återställ båda filerna.
   - **Samma kompetens med blankt namn, med rätt kod (ska tiga):** bara
     `{ name: '  ' }` tillagd. Talen är lika. Återställ.
4. **Punkt 6, i dev-servern:** med `projects` tillfälligt tömt i `projects.js` har
   raden bara `Kompetenser`. Med även `skillGroups` tömt finns ingen `dl` i
   `#about` (`document.querySelectorAll('#about dl').length === 0`). Återställ, och
   bekräfta med `git diff --stat src/data` att datafilerna är orörda.
5. `npm run validate:data` och `npm run validate:tokens` tiger. `npm run build` grön.

### M15 — Kompetenschipsen (P9, P11)

> **RÄTTAT 2026-11-18, Jelals beslut "Tillbaka till grå": M15 gäller som skrivet
> nedan, utan tillägg.** Koden är återställd till 9cb309b och stämmer tecken för
> tecken med signaturerna och CSS:en här (kontrollerat i `Chip.jsx`,
> `Chip.module.css` och `SkillChip.jsx`). Kompetens-chipsen ser ut som
> filterchipsen, grå kant (`--line-strong`) och grå text (`--ink-muted`), men är
> text och inte knappar. Historik, UPPHÄVD: ~~M25: `surface`,
> `data-surface="light"`, fyllningen `#f6f4f0`~~, ~~M26: `filled`, ifyllt orange~~,
> ~~M26 rättad: `accent`, orange kant och text~~.

- **En gemensam komponent:** `src/components/Chip.jsx`,
  `function Chip({ children, pressed, onToggle })` (**RÄTTAT 2026-11-18:** gäller.
  ~~`accent`, `filled` (M26), `surface` (M25)~~ UPPHÄVDA). Med `onToggle` blir den
  `<button type="button" aria-pressed={pressed} onClick={onToggle}>`, och utan blir
  den `<span>`. Stilen bor i `Chip.module.css`. Skapas i P9 (filtret är första
  konsumenten).
- **`SkillChip.jsx`** behåller signaturen `function SkillChip({ name })` och
  renderar `<li><Chip>{name}</Chip></li>` (P11) (**RÄTTAT 2026-11-18:** gäller.
  ~~`<Chip accent>`, `<Chip filled>` (M26), `<Chip surface={SURFACE_LIGHT}>` (M25)~~
  UPPHÄVDA). `SkillChip.module.css` tas bort.
- **`Chip.module.css`, tecken för tecken** (**RÄTTAT 2026-11-18:** filen är exakt de
  två reglerna nedan. ~~`.chip.accent`, `.chip.filled` (M26),
  `.chip[data-surface='light']` (M25)~~ UPPHÄVDA och borttagna):

```css
.chip {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-chip);
  background-color: transparent;
  color: var(--ink-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-mono);
}

button.chip[aria-pressed='true'] {
  border-color: var(--accent);
  color: var(--accent);
}
```

`min-height` och inte `height`: en lång kompetens får radbryta inuti chipset
("välj det felläge som syns").

- **Kompetenskortet (A6) står kvar** med nya tokennamn. Gruppens `h3` får
  mono-eyebrow-stilen: `` className={`${typeStyles.meta} ${styles.cardTitle}`} ``
  i JSX, och `.cardTitle` bär då bara `margin-bottom: var(--space-4)`.
  Elementet är fortfarande `h3`, så rubrikordningen ändras inte.
- **Vikten (avgjort efter P11, M15b punkt 3):** `h3` ärver `--weight-semibold` från
  den globala regeln, men mono-filen finns bara i vikt 400. `.meta` sätter därför
  `font-weight: var(--weight-regular)` (M1, genomförs i P11b). `.cardTitle` får
  **inte** sätta vikten (M1:s invariant).
- **Versalerna i tillgänglighetsträdet (M15b punkt 4):** godtas. Chrome läser
  `h3`-namnet med versaler på grund av `text-transform`. Källtexten i `skills.js`
  står kvar i gemener och versaler.

#### M15b — Fem fynd från P11, avgjorda (genomförs i P11b, före G2)

| # | Fråga | Beslut | Paket |
|---|-------|--------|-------|
| 1 | `--space-1` togs bort i P11 | **Godkänt.** M5h fällde tokenet när `SkillChip.module.css` försvann, och byggaren följde grinden. Felet låg i dokumentet. M5 och tabellen under "Spacing" är rättade, och strängen står i tabellen över förbjudna strängar. Koden ändras inte | ingen kodändring (dokumentet rättat nu) |
| 2 | `OPEN-KEY: sektionsetikett-avstand` | **Godkänd som byggd:** `.label { margin-bottom: var(--space-3); }` (M13). Markeringen tas bort | P11b |
| 3 | Kompetensernas `h3` ritas med syntetisk fetstil | **`.meta` sätter vikten**, och `.tag` gör det också: `font-weight: var(--weight-regular);` (M1). Alternativet att `.cardTitle` sätter vikten valdes bort, eftersom det bryter M1:s invariant (`font-weight` står i listan) och lämnar varje framtida `h3`/`strong` med `.meta` öppen för samma fel. Alternativet att ladda en vikt till valdes bort, eftersom det ger en fil till i `dist/` och en fil till för teckengrinden (M1d) att mäta, bara för att visa en vikt som designen inte har | P11b |
| 4 | `h3`-namnen har versaler i Chromes tillgänglighetsträd | **Godtas.** Versalerna är en visuell stil över en källtext i gemener och versaler, och samma sak gäller redan rollraden och kategorin (`.meta`). Att ändra det kräver dold text eller `aria-label` på rubriken, och A6 håller rubrikraden till enbart `h3`-texten. G2 lyssnar på kompetensrubrikerna i en skärmläsare. Läses ett namn bokstav för bokstav tas frågan upp igen | ingen |
| 5 | Nämnaren i `01 / 04` räknar alla poster i `sections` | **Godtas** (M13). Att räkna bara de renderade sektionerna kräver att `Section.jsx` får en kopia av sin egen spärr (`id` + `label`) för grannarna. Det blir två uttryck för samma regel. I ett godkänt bygge är antalen lika, eftersom de två grindarna i M13 fäller skillnaden | ingen |

**Exakt vad P11b ändrar.** Inga andra filer. `About*` och `tokens.css` rörs inte
(P12):

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/Section.module.css` | Ta bort de två raderna `EJ I ARKITEKTUR` + `OPEN-KEY: sektionsetikett-avstand` ovanför `.label`. Ersätt dem med `/* Beslutat i ARKITEKTUR.md: M13 */` och invarianten "etiketten hör till rubriken under sig och står tätare mot den än rubriken mot innehållet". `.label` och `.title` ändras inte | 2 |
| `src/styles/type.module.css` | Lägg till `font-weight: var(--weight-regular);` i `.meta` och `.tag`, direkt efter `font-size`, så att ordningen blir som i M1. Lägg till en mening i filens inledande kommentar: "En klass med mono-typsnittet sätter vikten själv, eftersom typsnittet bara finns i en vikt". Ingen siffra i kommentaren | 3 |

**Verifiering i P11b, utdata klistras in i överlämningen:**

1. `grep -rn "OPEN-KEY" src scripts`. För varje nyckel: `grep -c "<nyckel>" ARKITEKTUR.md`
   ger 0. `sektionsetikett-avstand` finns inte längre i `src/`.
2. `grep -rn "EJ I ARKITEKTUR" src`: varje kvarvarande träff redovisas som "ännu
   obesvarad av arkitekten".
3. I webbläsaren, mot `npm run build` + `preview`: för **varje** element på sidan
   där `getComputedStyle(el).fontFamily` börjar med `"JetBrains Mono"` ska
   `fontWeight` vara `'400'`. Utdata visar antalet element och noll avvikelser.
   **Negativt prov:** ta bort raden ur `.meta`, och provet ska då larma på varje
   `h3` i `#skills` och på inget annat. Lägg tillbaka raden, och provet ska tiga.
4. `npm run validate:data` och `npm run validate:tokens` tiger (bland dem
   teckengrinden M1d och tokengrinden M5g och M5h). Utdata från `npm run build`
   innehåller inte `did not pass the`.
5. `grep -rn "composes" src`: noll träffar.

### M16 — Kontakt och footer (P13, P14)

**Kontakt (P13), uppdraget gäller före Jelals val 2026-10-07:** uppgifterna
**till vänster och först i DOM**, formuläret i en `--surface`-panel till höger.
Visuell ordning och Tab-ordning är då densamma, alltså samma princip som förut.

- Vänster spalt: `h3` "Kontaktuppgifter" (**GODKÄND ordagrant av Jelal
  2026-11-18.** Byggaren tar bort märkningen "TEXT SOM JELAL SKA GODKÄNNA" i
  `src/components/Contact.jsx:49-53`. Strängen på `:54` ändras inte), e-posten som `mailto:` i klartext, och
  `contact.links.filter((l) => l.url !== null)`. Det ger LinkedIn i dag.
- **Rutnätet, tecken för tecken:**

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-7);
  align-items: start;
}

@media (min-width: 900px) {
  .grid { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }
}

.formPanel {
  min-width: 0;
  padding: var(--space-5);
  background-color: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}
```

- **hCaptcha får `size="compact"`.** Den normala widgeten är 302 px och går inte
  att krympa. Med 24 px sidmarginal (M18) och 24 px panelpadding finns ca 247 px
  vid 360 px vyport med reserverad rullningslist. Den kompakta är 164 px. Det är en
  presentationsprop, inte ändrad formulärlogik, och P13 får göra den.
- Formulärets `max-width: var(--measure)` tas bort. Panelen begränsar bredden.
- Fälten: `background-color: var(--bg)`, `border: 1px solid var(--line-strong)`.
  Formulärknappen får heros `.actionPrimary`-deklarationer (M10) i sin egen
  modul.
- **Markeringarna i `Contact.module.css` och `ContactForm.module.css` avgörs så
  här och tas bort i P13:** `.linkHeading { margin-bottom: var(--space-4); }`,
  länklistan lodrät med `gap: var(--space-3)`, länkarna i `--accent` med
  understrykning, formulärrubrikens `margin-bottom: var(--space-2)`. De beslutas
  som de står. **Tillagt 2026-11-07, M19:** avståndet mellan fälten
  (`.field { margin-bottom: var(--space-5); }`) och det dämpade läget på knappen är
  godkända som byggda, och kontaktsektionens externa länkar följer `rel`-mönstret i
  M19 punkt 3.

**Footer (P14):**

- Överst `border-top: 1px solid var(--line)`. Därefter ~~JQ-märket (samma tajta PNG
  som headern, `alt=""` + `aria-hidden="true"`)~~ (**märket UPPHÄVT 2026-11-07, se
  M20:** hela loggan `jq-logo-*.png`, 34 px hög, fortfarande `alt=""` +
  `aria-hidden="true"`) med taglinen **`profile.role`** (står kvar, M20 punkt 4).
  Det är Jelals egen godkända text och ingen ny påhittad. Sedan en länkkolumn
  "Kontakt" med `contact.links` där `url !== null` och e-posten, och sist
  copyright-raden `© {år} {profile.name}`, där året är `new Date().getFullYear()`.
  **Rättat 2026-11-07, M19:** kolumnens etikett "Kontakt" är ett `<p>` med
  `typeStyles.meta`, ingen rubrik (sidan har redan h2 "Kontakt"). E-posten visas
  som adressen i klartext, inte som ett eget ord. Externa länkar följer `rel`-mönstret
  i M19 punkt 3.
- **GitHub renderas inte så länge `url` är `null`.** Det bekräftas: Jelal har
  sagt "ta bort github", och `contact.js` har `null`. Datadriven rendering tar bort
  länken av sig själv.
- Text: `--ink-muted` på `--bg` (ca 7,6:1). P14 mäter.

### M17 — Slutkontrollens verktyg: Lighthouse (P15)

- **Verktyg:** `npx --yes lighthouse@12` mot `npm run preview` på en fast port,
  med installerad Chrome (`CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe`).
  **Inget läggs i `package.json`.** Det är ett engångsverktyg för mätning, inte en
  del av bygget, och 90+ är ett leveranskrav, inte en grind.
- **Prövas först:** P15 kör `npx --yes lighthouse@12 --version` och klistrar in
  utfallet. Faller det (inget nätverk, blockerat) stannar P15 för den punkten och
  lämnar tillbaka hit. Ingen siffra uppskattas.
- **Inställningar — ÄNDRADE 2026-11-08, se M21 punkt 0** (antal körningar,
  kategorier och accessibility-kravet). Gäller oförändrat: `--chrome-flags="--headless=new"`,
  `--output=json`, två lägen: standard (mobil, simulerad strypning) och
  `--preset=desktop`. ~~`--only-categories=performance,accessibility`~~ ~~Tre
  körningar per läge, medianen redovisas.~~ ~~Kravet ≥ 90 gäller båda kategorierna i
  båda lägena.~~
- Servern startas och stoppas enligt `netstat`-regeln (LARDOMAR 2026-10-02 och
  2026-10-05). Ingen flagga sätts med `=false`.

### M18 — Maxbredd och sidmarginal (P2)

`--content-max: 1180px` och `--content-padding: 1.5rem` (24 px i alla bredder.
Över ca 1228 px vyport binder maxbredden ändå). Mekanismen i "Var sidmarginalen
bor" står kvar. Bara värdena byts.

**Följd för 360 px-golvet:** spaltbredden vid 360 px vyport blir **297 px med
reserverad rullningslist på 15 px** och **312 px utan rullningslist** (tidigare 309
respektive 324). Varje bredduppmätning anger sitt villkor (LARDOMAR 2026-10-08).
Villkoret (`innerWidth - clientWidth`, 15 eller 0) läses **med menyn stängd**: med
menyn öppen är rotens `clientWidth` lika med `innerWidth` fast layouten står still
(rättat 2026-11-07, R4, se M10b punkt 3). Layoutbredden med menyn öppen mäts med
`getBoundingClientRect().width`.

### Markeringarna från före P2 — vilka ett M-beslut redan besvarar (inventerat efter P2)

De 23 `EJ I ARKITEKTUR`-markeringar som fanns före P2. Ingen ny fråga avgörs
här. Tabellen säger bara vilka som redan är besvarade, och vilket paket som tar
bort markeringen i samma ändring som beslutet genomförs (LARDOMAR 2026-10-02).
Radnumren gäller efter P2.

| Markering | Besvarad av | Tas bort i |
|-----------|-------------|------------|
| `scripts/validate-data.mjs:285`, om url och repoUrl ska grindas | M3, grindtabellen (`liveUrl`/`githubUrl`) | P6 |
| `src/components/Hero.jsx:26` (`sizes`), `:100` (alt) | M10, heros fyra markeringar | P5 |
| `src/components/Hero.module.css:48` (layout), `:249` (`contrast`) | M10, heros fyra markeringar | P5 |
| `src/components/Projects.module.css:15`, spårets 280px och avståndet | M4, rutnätet | P7 |
| `src/components/Contact.module.css:53`, `:62`, `:79` | M16 | P13 |
| `src/components/ContactForm.module.css:14` (rubriken), `:116` (knappen) | M16 | P13 |
| `src/components/ContactForm.module.css:36`, maxbredden | M16 (`max-width` tas bort). **Bara delvis:** avstånden mellan fälten är obesvarade. P13 tar bort maxbredden och skriver om markeringen till enbart den frågan | P13 (delvis) |

**Obesvarade, inget M-beslut rör dem:** `scripts/validate-data.mjs:61`, `:68`,
`:233`, `:350`, `:467`, `:489` och `:806`, `src/components/About.module.css:26`,
`src/styles/global.css:17` och `:200`, samt `src/components/Projects.module.css:5`.
De står kvar som öppna frågor.

**Besvarade 2026-11-07 av M19:** `About.module.css:26`, `global.css:17` och
`:200` (i dag `:21` och `:247`), `Projects.module.css:5`, och de tre kvarvarande i
`validate-data.mjs` (i dag `:70`, `:556` och `:998`). Liksom avståndet mellan
fälten i `ContactForm.module.css` (raden ovan, "Bara delvis"). Alla tas bort i P14b.

**Rättat 2026-11-07 (R6):** `validate-data.mjs:61` ovan är exportmarkeringen i
`checkSections` (`:64` före G1-rättningen) och är **besvarad av R6**. Den tas bort
i G1-rättningen tillsammans med exportmarkeringarna i `checkProjects`,
`checkAbout`, `checkContact` och `checkProfile`.

### Komponenter och signaturer efter moderniseringen

Gäller före tabellen "Komponenter och exakta signaturer" för de rader som är
märkta där.

| Fil | Signatur | Paket | Ansvar |
|-----|----------|-------|--------|
| `src/components/Header.jsx` | `function Header()` | P3, P4, P9b, P14c | Pill-naven (M6), logga (M20: hela loggan, `alt="Jelal Qaiumi"`, ingen dold text), navlänkar ur `sections` med `aria-current` (M7, och utan observer ingen markering, M12b punkt 2), CTA, hamburgern och `MobileMenu` (M8) |
| `src/components/MobileMenu.jsx` | `function MobileMenu({ id, open, onClose, links, currentId, cta, triggerRef })` | P4 | Panelen i M8. `links` är `{ id, label }[]`, `cta` är `{ href, text }` eller `null` |
| `src/components/MenuIcon.jsx`, `CloseIcon.jsx`, `SearchIcon.jsx` | `function MenuIcon()` etc. | P4, P9 | M9 |
| `src/components/Hero.jsx` | `function Hero()` | P5, P5 omgång 4, P5 omgång 5 | M10, M10b. Bakgrundsbilden och profilbilden enligt M10c, bilden överst på mobil enligt M10d |
| `src/components/Section.jsx` | ~~`function Section({ id, title, children, className })`~~ **UPPHÄVT 2026-11-08, se M23 punkt 1:** `function Section({ id, title, children, className, surface })` och `export const SURFACE_LIGHT = 'light'` | P11, **P18a** | Etiketten i M13 och `Reveal` runt rubriken (P10). `surface` sätter `data-surface` på roten (M23) |
| `src/components/Projects.jsx` | `function Projects()` | P7–P10, P9b | Filtrets state, live-raden (räknar `displayed`, M12b punkt 4), rutnätet, tomma lägen, faserna i M12 med villkoret i M12b punkt 5 (`pending`-ref, `sameSlugs`). Äger `allSegmentRef` och fokus efter "Rensa filter" (M11b punkt 11, P9b) |
| `src/components/ProjectFilter.jsx` | `function ProjectFilter({ counts, total, techOptions, filter, onChange })` i P8–P9. **`allRef` läggs till i P9b**, som `function ProjectFilter({ counts, total, techOptions, filter, onChange, allRef })`, när fokusflytten (M11b punkt 11) är dess första konsument | P8, P9, P9b | M11, M11b |
| `src/components/ProjectCard.jsx` | `function ProjectCard({ project })` i P7. **`index` läggs till i P10**, som `function ProjectCard({ project, index })`, när `Reveal` (M12) är dess första konsument (rättat 2026-11-07, R1) | P7, P10 | M4. `isComplete` finns inte längre här. Kortets id hämtas ur `cardIds(slug)` från G1-rättningen (R2) |
| `src/components/Chip.jsx` | `function Chip({ children, pressed, onToggle })` (**RÄTTAT 2026-11-18, återställd:** ~~`surface` (M25)~~, ~~`accent`/`filled` (M26)~~ UPPHÄVDA) | P9 | M15 |
| `src/components/SkillChip.jsx` | `function SkillChip({ name })` | P11 | `<li><Chip>{name}</Chip></li>` (**RÄTTAT 2026-11-18, återställd:** ~~`<Chip surface={SURFACE_LIGHT}>` (M25)~~, ~~`<Chip accent>`/`<Chip filled>` (M26)~~ UPPHÄVDA) |
| `src/components/Reveal.jsx` | `function Reveal({ as, index, className, children, ...rest })` (default) + `export const REVEAL_INDEX_MAX`. **Ingen annan export** (M12b punkt 3) | P10, P9b | M12 |
| `src/main.jsx` | Lokal `function enableReveal()`, ingen export | P10, P9b, P15-fix | M12, M12b punkt 3. **M21 punkt 5:** `hydrateRoot` när `#root` har ett barnelement (bygget), annars `createRoot` (dev) |
| `src/prerender.jsx` | `export function render()` → `string`. **Ingen annan export** | P15-fix | M21 punkt 5. Importeras bara av `scripts/prerender.mjs`, aldrig av något i `src/` |
| `src/components/ContactForm.jsx` | `function ContactForm()` (oförändrad) | P13, P15-fix | M16. **M21 punkt 1:** `HCaptcha` laddas med `lazy` och monteras först när platsen närmar sig vyn eller formuläret får fokus |
| `src/components/KeyFigures.jsx` | `function KeyFigures()` | P12 | M14 |
| `src/components/About.jsx` | `function About()` | P6, P12 | Importerar `isComplete` ur `src/lib/projectRules.js` och läser `about.link.projectSlug`. Renderar `KeyFigures` |
| `src/components/Contact.jsx` | `function Contact()` | P13 | M16 |
| `src/components/Footer.jsx` | `function Footer()` | P14, P14b, P14c | M16, M19, M20 (loggan). Importerar `typeStyles` ur `src/styles/type.module.css` från P14b |
| `src/lib/projectRules.js` | `isComplete`, `projectHref` (P6), `cardIds` (G1-rättningen, R2), `EMPTY_FILTER`, `countByCategory`, `filterProjects` (P8), `collectTech`, `normalizeText` (P9), `sameSlugs` (P9b, M12b punkt 5) | P6–P9, P9b | Ren JS, ingen React |
| `src/data/sections.js` | `HERO_ID`, `PROJECTS_ID`, `SKILLS_ID`, `ABOUT_ID`, `CONTACT_ID`, `MAIN_ID`, `MENU_ID`, `ROOT_ID`, `PROJECT_SEARCH_ID`, `sections` | G1-rättningen (`MENU_ID`, `ROOT_ID`), P9 (`PROJECT_SEARCH_ID`) | Varje fast id på sidan (R2). `Header.jsx` importerar `MENU_ID`, `main.jsx` importerar `ROOT_ID`, `ProjectFilter.jsx` importerar `PROJECT_SEARCH_ID` (M11b punkt 9) |
| `src/lib/sectionLabel.js` | `sectionIndexLabel(sections, id)` | P11 | M13 |
| `src/lib/keyFigures.js` | `keyFigures({ projects, skillGroups })` | P12, P12b | M14, M14b. Räknar kompetenserna ur `renderedSkillGroups` |
| `src/lib/skillRules.js` | `renderedSkillGroups(skillGroups)` | P12b | M14b. Läses av `Skills.jsx` och `keyFigures.js` |
| `src/data/profile.js` | `export const profile`, `export const HERO_IMAGE_WIDTHS` (P5 omgång 4) | P5, P5 omgång 4 | M10, M10c. Bredderna läses av `Hero.jsx` och `scripts/optimize-images.mjs` |

**`src/lib/`** är en ny mapp: ren JavaScript utan React, JSX och DOM. Den importeras
av komponenterna **och** av `scripts/validate-data.mjs`, så att en regel bara står
på ett ställe.

### Besluten efter G1 (2026-11-07): R1–R6, genomförs i paketet G1-rättningen

G1 gav EJ GODKÄND med sju fynd (`LARDOMAR.md`, posterna 2026-11-07). Fynd 1 och 2
är byggarens (kommentarerna). Fynd 3–7 och de fem exportmarkeringarna avgörs här.
Varje beslut står också på sin gamla plats, rättat där. **Allt genomförs i ett
paket, G1-rättningen**, som byggaren kör direkt efter detta och efter att
kommentarsrättningen är klar. Ingen punkt skjuts upp till ett senare paket utom de
som är namngivna i P9, P10 och P12.

| # | Fynd | Beslut i en mening | Rättat på plats |
|---|------|--------------------|-----------------|
| R1 | 3 | Scroll-marginalen ligger på `<li>` (`.item`), godkänd som byggd. `kortets-li-scroll-marginal` är stängd. `index` läggs till i `ProjectCard` i P10 | A4, M4 (markup och CSS-block), komponenttabellen |
| R2 | 4 | En grind för alla id på sidan, härledd ur `*_ID`-exporterna i `sections.js`, `sections[].id`, skillgruppernas `id` och kortens id ur `cardIds(slug)`. Plus en grind mot dubbla tekniker | M3 (typedef och grindtabell), `sections.js` i Datamodell, komponenttabellen |
| R3 | 5 | Brickan blir `display: block` med `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis` och `padding: 9px var(--space-3)`. Golvet mäts mot `.media`, och `scrollHeight <= clientHeight` är en grind | M4 (CSS-blocket och punkterna under det) |
| R4 | 6 | Grinden på rotens `clientWidth` med menyn öppen utgår. I stället mäts rotens, `#projects` och panelens `getBoundingClientRect().width`, med negativ kontroll `scrollbar-gutter: auto` | M10b punkt 3, M18 |
| R5 | 7 | De sex tas bort nu. `--radius-chip` kommer tillbaka i P9, `--duration-reveal`, `--reveal-index` och `--reveal-stagger` i P10 och `--text-figure` i P12. `--space-9` kommer inte tillbaka. Tokengrinden fäller en deklaration utan konsument (M5h) | M5, M5h, Spacing |
| R6 | — | Samma form gäller alla fem exportmarkeringar: `<fil>.js: <export> saknas eller är inte <en array \| ett objekt>`. De fyra i `validate-data.mjs` är godkända som de står, och `profile-export-saknas` genomförs nu | M8b, och här |

#### R2 — Sidans id: en grind, och listan skrivs aldrig två gånger

**Källorna, i denna ordning.** Ordningen gör att `<källa 2>` i meddelandet alltid
är den fil som ska ändras, alltså Jelals datafil när krocken gäller hans data.

| # | Källa | Hur den läses | `<källa>` i meddelandet |
|---|-------|---------------|-------------------------|
| 1 | Varje export i `sections.js` vars namn slutar på `_ID` och vars värde är en sträng | `Object.entries(mod)` | `sections.js <NAMN>`, t.ex. `sections.js CONTACT_ID` |
| 2 | `sections[i].id` vars värde **inte** redan är ett `*_ID`-värde | `mod.sections` | `sections.js sections[<i+1>]` |
| 3 | Varje unik `skillGroups[].id` (`<h3 id>` i `Skills.jsx`) | `mod.skillGroups` | `skills.js grupp "<id>"` |
| 4 | För varje unik slug som matchar `a-z0-9-`: varje värde i `cardIds(slug)` | `mod.projects` och `cardIds` ur `src/lib/projectRules.js` | `projects.js projekt "<slug>"` |

- **Varför 2 hoppar över värden som redan är konstanter:** `sections` byggs av
  konstanterna (`{ id: PROJECTS_ID, … }`), och samma värde är samma element. Bara ett
  id som skrivits som literal i listan är en egen källa.
- **Varför bara unika värden i 3 och 4:** dubbletter inom en fil fälls redan av
  sin egen grind. Att ta med dem hade gett två rader för samma fel (M3b, "Dubbla
  larm").
- **Varför alla poster i 4, inte bara de som `isComplete` släpper igenom:** ett
  ofullständigt projekt får ett id i samma stund som Jelal fyller i det sista
  fältet. Krocken ska synas innan dess.
- **Utanför grinden, med skäl:** id:n ur `useId()` i `ContactForm.jsx` innehåller
  kolon eller `«»` och kan aldrig vara lika med en sträng som matchar `a-z0-9-`.
- **Varje fast id i en komponent ska vara en `*_ID`-export i `sections.js`.**
  `MENU_ID` flyttar dit ur `Header.jsx`, och `ROOT_ID = 'root'` läggs till och läses
  av `main.jsx`. Verifiering i G1-rättningen: `grep -rnE "id=\"|id=\{'|getElementById\('" src --include=*.jsx`
  ger noll träffar utanför kommentarer.

**Signaturer:**

```js
/* src/lib/projectRules.js — ProjectCard och valideringen läser samma funktion,
 * så att suffixen bara står på ett ställe. */
/** Varje id ett projektkort sätter i DOM. */
/** @param {string} slug  @returns {{ item: string, title: string, desc: string, newTab: string }} */
export function cardIds(slug)
// item === slug, title === `${slug}-title`, desc === `${slug}-desc`, newTab === `${slug}-newtab`

/* scripts/validate-data.mjs — körs EFTER loopen över ACTIVE, före utskriften. */
/** Fäller varje id som sidan sätter mer än en gång. */
/** @param {{ sections?: object, skills?: object, projects?: object }} loaded  Modulerna som gick att importera, nycklade på namnet i ACTIVE. */
/** @returns {Promise<void>} */
async function checkPageIds(loaded)
```

- `ProjectCard.jsx` ersätter sina tre mallsträngar med `cardIds(slug)`. `<li>` får
  `id={ids.item}`.
- Loopen över `ACTIVE` sparar varje importerad modul i `loaded[name]`. Saknas
  `sections`, `skills` eller `projects` i `loaded`, eller är dess lista inte en
  array, hoppar `checkPageIds` över **den källan**. Felet är då redan rapporterat
  av filens egen grind, och bygget är rött.
- `cardIds` importeras på samma sätt som `isComplete` i `checkProjects`. Gick
  importen inte att göra är felet redan rapporterat, och källa 4 hoppas över.
- **Meddelandet**, en rad per krock:
  `sidans id: "<id>" sätts av både <källa 1> och <källa 2>`.
  Exempel: `sidans id: "contact" sätts av både sections.js CONTACT_ID och projects.js projekt "contact"`.
- **Dubbla tekniker** fälls i `checkProjects`, i samma block som tech-grinden och
  bara när `tech` är en giltig lista. En rad per teknik som upprepas, med värdet så
  som det står första gången:
  `projects.js: tekniken "<värde>" står mer än en gång i tech (post <n>, "<slug>")`.
  Raden räknas som en fälld post för teckengrinden (M3b), automatiskt genom
  `errorsBefore`.
- **Vilken legitim ändring får fälla grinden?** En ny sektion, grupp eller projekt
  vars id redan finns. Åtgärden är att byta id i den fil meddelandet nämner sist,
  och då tiger grinden.

**Prövas i G1-rättningen, i en isolerad kopia, med exit-kod och utskrift:**

1. Korrekt data: kod 0, OK-raden oförändrad.
2. `slug` lika med varje fast id i tur och ordning: `hero`, `projects`, `skills`,
   `about`, `contact`, `main`, `mobile-menu`, `root`. Varje ger kod 1 och **exakt
   en** rad `sidans id: …`, med rätt `<NAMN>`.
3. `slug: 'backend'` (en skillgrupp): en rad med `skills.js grupp "backend"`.
4. Två projekt, `awle` och `awle-title`: en rad med `projects.js projekt "awle"` och
   `projects.js projekt "awle-title"`.
5. En skillgrupp med `id: 'contact'`: en rad med `skills.js grupp "contact"`.
6. `tech: [..., 'Zod', 'Zod']` och `tech: [..., 'Zod', 'zod']`: var sin rad
   `tekniken "Zod" …`, och ingen rad `saknar typsnittsroll`.
7. Rättat: kod 0.

#### R6 — Exportmarkeringarna: samma form för alla fem

**Ja, M8b:s form gäller alla fem.** Formen är `<fil>.js: <exportnamn> saknas eller är
inte <en array | ett objekt>`, samma som A1:s `skills.js: skillGroups saknas eller
är inte en array`. Den namnger filen, exporten och den typ som krävs, och det är
allt Jelal behöver för att hitta felet. Alla fem står redan i den formen i koden
och godkänns **som de står**:

| Markering | Meddelandet, godkänt |
|-----------|----------------------|
| `validate-data.mjs:64` (`checkSections`) | `sections.js: sections saknas eller är inte en array` |
| `validate-data.mjs:256` (`checkProjects`) | `projects.js: projects saknas eller är inte en array` |
| `validate-data.mjs:403` (`checkAbout`) | `about.js: about saknas eller är inte ett objekt` |
| `validate-data.mjs:520` (`checkContact`) | `contact.js: contact saknas eller är inte ett objekt` |
| `validate-data.mjs:598-600`, `profile-export-saknas` (`checkProfile`) | `profile.js: profile saknas eller är inte ett objekt` (M8b) |

- Radnumren gäller före G1-rättningen. Markeringen hittas på meddelandets text.
- Varje markering tas bort och ersätts med `/* Beslutat i ARKITEKTUR.md: R6 */`.
  För profile står även raden `OPEN-KEY: profile-export-saknas`, och den tas bort i
  samma ändring.
- **Utanför R6, och fortfarande öppna:** `validate-data.mjs:71` (`HERO_ID`
  saknas), `:542` (url i `contact.js`) och `:888` (ett namn i `ACTIVE` utan
  kontroll). De är inte exportmarkeringar, och ingen har bett om dem här. De står
  kvar. **Besvarade 2026-11-07 av M19 punkt 7, och tas bort i P14b.**
- Prövas: för var och en av de fem exporterna, i en isolerad kopia, (a) exporten
  borttagen, (b) satt till `null`, (c) rättad. (a) och (b) ger exakt den raden,
  (c) tiger.

#### Exakt vad G1-rättningen ändrar

Förutsättning: byggarens kommentarsrättning (fynd 1 och 2) i `Header.jsx`,
`global.css`, `Hero.module.css`, `tokens.css`, `Projects.module.css` och
`validate-data.mjs` är klar och överlämnad. Annars ändrar två agenter samma filer.

| Fil | Ändring | Beslut |
|-----|---------|--------|
| `src/components/ProjectCard.module.css` | Ta bort `EJ I ARKITEKTUR` + `OPEN-KEY: kortets-li-scroll-marginal` ovanför `.item`, ersätt med `/* Beslutat i ARKITEKTUR.md: A4 (R1) */`. `.item` rörs inte | R1 |
| `src/components/ProjectCard.module.css` | `.brand`: `display: inline-flex` → `display: block`, ta bort `align-items: center`, `padding: 0 var(--space-3)` → `padding: 9px var(--space-3)`, lägg till `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis` sist. Kommentar: invarianten (en rad, klipps med ellips, hela titeln står i `h3`), inga tal | R3 |
| `src/lib/projectRules.js` | Lägg till `export function cardIds(slug)` enligt signaturen i R2 | R2 |
| `src/components/ProjectCard.jsx` | Importera `cardIds`. Ersätt `titleId`, `descId`, `newTabId` och `id={slug}` med värdena ur `cardIds(slug)`. Signaturen förblir `ProjectCard({ project })` | R1, R2 |
| `src/data/sections.js` | Lägg till `export const MENU_ID = 'mobile-menu';` och `export const ROOT_ID = 'root';`. Kommentaren: varje fast id på sidan är en `*_ID`-export här, och valideringen läser dem | R2 |
| `src/components/Header.jsx` | Ta bort den lokala `const MENU_ID`, importera `MENU_ID` ur `sections.js` | R2 |
| `src/main.jsx` | `document.getElementById(ROOT_ID)`, med `ROOT_ID` importerad ur `sections.js` | R2 |
| `index.html` | Kommentar vid `<div id="root">`: värdet är `ROOT_ID` i `src/data/sections.js` och ändras på båda ställena | R2 |
| `scripts/validate-data.mjs` | Spara modulerna i `loaded`, lägg till `checkPageIds(loaded)` efter loopen, lägg till grinden för dubbla tekniker i `checkProjects` | R2 |
| `scripts/validate-data.mjs` | De fem exportmarkeringarna: ta bort och ersätt med `/* Beslutat i ARKITEKTUR.md: R6 */`, inklusive `OPEN-KEY: profile-export-saknas` | R6 |
| `scripts/validate-tokens.mjs` | Lägg till grinden i M5h, **innan** tokens tas bort, och visa att den ger exakt sex rader | R5 |
| `src/styles/tokens.css` | Ta bort `--radius-chip`, `--duration-reveal`, `--text-figure`, `--reveal-index`, `--reveal-stagger` och `--space-9`. Ingen kommentar får nämna dem (M5h) | R5 |

**Mäts i G1-rättningen** (varje mått med vyport och rullningslistvillkor):

1. R2:s sju prövningar och R6:s tre indata per export, med utskrift.
2. M5h:s tre steg.
3. R3:s fem grindar och två negativa kontroller vid de fem vyporterna, med Awles
   riktiga titel **och** syntessträngarna. Med Awle ska brickan se ut som före
   (bredd och höjd ±0,5 px mot ett mått taget före ändringen).
4. R4:s fyra grindar och den negativa kontrollen. De uppmätta talen med
   `scrollbar-gutter: auto` skrivs in i överlämningen, eftersom min förutsägelse
   inte är mätt.
5. Ett hopp till `#awle` landar på samma avstånd som före (90 px vid 360 och 1280).
6. För varje `OPEN-KEY: <nyckel>` i `src/` och `scripts/`: `grep -c "<nyckel>" ARKITEKTUR.md`.
   `kortets-li-scroll-marginal` och `profile-export-saknas` ska inte längre finnas
   i koden.
7. `npm run validate:data`, `npm run build` gröna, och tokengrinden tyst.

**PLAN.md:** paketet G1-rättningen står inte där. Det är projektledarens att lägga
in, mellan G1 och P8, med `Ingår:` enligt tabellen ovan. P9, P10 och P12 får var
sin punkt i `Ingår:` om tokens de deklarerar (R5) och P10 om `index` (R1), enligt
lärdomen 2026-11-07 om uppskjutna beslut. Jag rör inte `PLAN.md`.

### M19 — sista öppna punkterna före G2

Underlag: `grep -rn "EJ I ARKITEKTUR\|OPEN-KEY" src scripts index.html` efter P14
gav 16 träffrader, alltså elva frågor (fem av dem bär en `OPEN-KEY`). Varje träff
avgörs här. Dessutom footern mot M16 och A8, `rel`-mönstret, knappens dämpade läge
och kommentarerna med uppmätta tal. **Allt genomförs i ett paket, P14b, före P15.**
Jelals beslut 7 (inga streck i synlig text) gäller varje text nedan.

| # | Fråga (fil i dag) | Beslut i en mening |
|---|-------------------|--------------------|
| 1 | `footer-kolumnrubrik` (`Footer.jsx:53`) | Ingen rubrik i footern: etiketten blir ``<p className={`${typeStyles.meta} ${styles.columnLabel}`}>Kontakt</p>``, och sidans rubriklista får bara ett "Kontakt" |
| 2 | E-postlänkens text (`Footer.jsx:21`, `emailLabel = 'Mejl'`) | Adressen i klartext, `{contact.email}`, som i kontaktsektionen. Ingen ny text hittas på |
| 3 | `rel` på externa länkar (`Footer.jsx:59`, `Contact.jsx:71`) | Ett mönster för hela sidan: varje `target="_blank"` har `rel="noopener noreferrer"` och en `visually-hidden`-text "(öppnas i ny flik)", som projektkortet |
| 4 | `about-inline-link` (`About.module.css:26`) | Godkänd som byggd |
| 5 | `kontaktfaltens-avstand` (`ContactForm.module.css:37`) | Godkänd som byggd: `.field { margin-bottom: var(--space-5); }` |
| 6 | `footer-kolumnlayout` och `footer-lankhover` (`Footer.module.css:23`, `:67`) | Godkända som byggda |
| 7 | `validate-data.mjs:70`, `:556`, `:998` | Godkända som byggda, meddelandena som de står |
| 8 | `Projects.module.css:5`, det tomma lägets typografi | Godkänd som byggd |
| 9 | `global.css:21`, textuppskalningen | Godkänd som byggd: `-webkit-text-size-adjust: 100%` |
| 10 | `global.css:247`, skip-länkens mått, placering och lagernivå | Godkända som byggda |
| 11 | Knappens dämpade läge (`ContactForm.module.css:157`) | Godtas som byggt |
| 12 | Kommentarer med uppmätta tal | Sju skrivs om till invarianten, uppräknade nedan. Kontrastkvoterna i `tokens.css` står kvar |
| 13 | `profile.js`, kommentaren efter P14 | Två rader rättas |

#### Punkt 1 — footerns kolumnetikett: ett `p`, ingen rubrik och ingen `nav`

- **Varför ingen rubrik:** sektionen ovanför heter redan "Kontakt" (`h2`). Två
  rubriker med samma text ger två likadana poster i skärmläsarens rubriklista, och
  den andra leder till en lista med samma länkar som den första. Footern har ingen
  egen rubriknivå att vara på: den ligger utanför `<main>` och är ingen sektion.
- **Varför inte `nav aria-label`:** `nav` är för navigation inom webbplatsen.
  Länkarna går till LinkedIn och e-post, alltså ut från sidan. Ett landmärke till
  hade lagt en till post i landmärkeslistan utan att hjälpa någon.
- **Markupen, tecken för tecken:**

```jsx
<p className={`${typeStyles.meta} ${styles.columnLabel}`}>Kontakt</p>
```

- `typeStyles` importeras ur `../styles/type.module.css`, som i `Section.jsx`.
  Typklassen står först (M1, "Hur stilen når elementet").
- Modulklassen heter `.columnLabel` (inte `.columnHeading`, för den är ingen
  rubrik) och får **bara** marginalen. Färg, grad och vikt kommer ur typklassen
  och får inte deklareras i modulen (M1):

```css
.columnLabel {
  margin-bottom: var(--space-3);
}
```

- Kontrast: `.meta` är `--ink-subtle` på `--bg`, 5,355:1 i `tokens.css`, AA för
  normal text. P14b mäter den renderade graden och kvoten.

#### Punkt 2 — e-posten i klartext

`emailLabel` och dess kommentar tas bort. Länktexten blir `{contact.email}`, och
`href` är oförändrad. Skäl: "Mejl" är en text ingen har godkänt (LARDOMAR
2026-10-02: hittas en text på ska den flaggas), och M16 säger "e-posten". Adressen
är Jelals egen, finns redan synlig i kontaktsektionen och har inget streck.
Radbrytningen vid 360 px ärvs av `body` (`overflow-wrap: anywhere`), och spåren i
`.top` har minimum 0.

#### Punkt 3 — externa länkar: ett mönster för hela sidan

Varje `<a target="_blank">` på sidan har:

```jsx
<a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
  {link.label}
  <span className="visually-hidden"> (öppnas i ny flik)</span>
</a>
```

- `noreferrer` innebär `noopener` i dagens webbläsare, men båda skrivs ut. Det är
  M4:s mönster, och en granskare ska inte behöva veta vilka webbläsare som tolkar
  vad för att se att två länkar är likadana.
- Texten "(öppnas i ny flik)" är samma som projektkortets (M4). Där bärs den av
  `aria-describedby`, eftersom kortet har en egen beskrivning. Här står den inne i
  länken, eftersom länken bara har en etikett och inget id behövs (R2).
- Gäller `Footer.jsx` och `Contact.jsx`. `ProjectCard.jsx` följer redan mönstret
  och rörs inte. `mailto:` öppnas inte i ny flik och får inget av detta.

#### Punkt 4 — länken i "Om mig"

Godkänd som byggd: `--accent` med understrykning och `text-underline-offset:
0.2em`, hover `--accent-hover`, ingen egen grad. Kvoterna mot `--bg` står i
`tokens.css` (6,664:1 och 8,114:1). Understrykningen gör att färgen inte är ensam
bärare (WCAG 1.4.1). Samma utseende som länkarna i kontaktsektionen (M16).

Att länken inte syns i dag är rätt beteende och inget fel: `about.link.projectSlug`
är `hem-och-ekonomi`, inget projekt har den slugen, och A4 säger att frasen då är
vanlig text. Ingenting ändras i `about.js`. Frågan om Hem och Ekonomi står redan
bland Jelals frågor vid G2 (`PLAN.md`, P16).

#### Punkt 5 och 6 — fälten och footerns layout

- Fälten: `--space-5` mellan fälten är samma steg som under förklaringen av
  asterisken och under captchan. Formuläret har alltså ett vertikalt steg mellan
  sina block.
- Footerns kolumner: en kolumn under 600 px, `minmax(0, 1fr) minmax(0, auto)` från
  600 px, `gap: var(--space-6)`. Brytpunkten är `sm` ur `tokens.css`. Spåren har
  minimum 0 (360 px-golvet och grid).
- Footerns länkar: `--ink-muted`, hover `--ink` med understrykning. Länkarna står i
  en lista och inte i löptext, så färgen behöver ingen understrykning i viloläge.
  Hovern är samma signal som navlänkarna (M7).

#### Punkt 7 — de tre meddelandena i `validate-data.mjs`

Godkända som de står, utan ändrad text:

| Rad i dag | Meddelandet |
|-----------|-------------|
| `:70` | `sections.js: HERO_ID saknas eller är inte en sträng`. Samma form som R6 |
| `:556` | `contact.js: url måste vara en adress eller null (label "…", fick "…")` och `contact.js: url får inte vara "#" - skriv null när länken saknas (label "…")` |
| `:998` | `<namn>.js: står i ACTIVE men har ingen kontroll i scripts/validate-data.mjs` |

Beslut 7 gäller det som syns på sidan, i `<title>` och i `noscript`. Utskriften från
`npm run build` syns inte på sidan, så strecket i `:556` står kvar.

#### Punkt 8, 9 och 10 — tomma läget, textuppskalningen och skip-länken

- **Tomma läget** (`.empty`): `--text-base`, `--ink-muted`, `max-width:
  var(--measure)`. Samma som brödtexten i "Om mig". Godkänt.
  **Tillägg 2026-11-18:** texten, `EMPTY_TEXT` =
  `'Här lägger jag upp projekt jag har byggt. Än är listan tom.'` i
  `src/components/Projects.jsx:27`, är **GODKÄND ordagrant av Jelal 2026-11-18**.
  Byggaren tar bort märkningen "TEXT SOM JELAL SKA GODKÄNNA" och meningen om att
  texten är ett förslag (`Projects.jsx:19-22`). Meningen om att inget löfte om en
  tidpunkt ges (`:24-25`) står kvar. Strängen ändras inte.
- **Textuppskalningen:** `-webkit-text-size-adjust: 100%` behålls. Värdet `100%`
  och inte `none`: `100%` stänger bara av den automatiska uppblåsningen i liggande
  läge, medan användarens egen zoom fungerar. Ingen oprefixad rad läggs till.
- **Skip-länken** (`a.visually-hidden:focus`): `position: fixed`, överst till
  vänster med `--space-2`, `z-index: calc(var(--z-header) + 1)`, mörk panel med
  `--ink`. Godkänd. Fokusringen är orange och står mot mörk botten.

#### Punkt 11 — knappens dämpade läge

Godtas. Panelen och den dämpade knappen har samma yta (`--surface`), och knappen
avgränsas av ramen `--line-strong`, 3,891:1 mot `--surface` (WCAG 1.4.11 kräver
3:1). Texten är `--ink-muted` mot `--surface`, 7,089:1. Att knappen ser ut att höra
till panelen är signalen "inte redo än". Klickar man visas felen. När formuläret
är redo får knappen orange yta. P14b ändrar ingenting här.

#### Punkt 12 — kommentarer med uppmätta tal (LARDOMAR 2026-10-02 och 2026-11-07)

Skrivs om till invarianten i P14b, med hänvisning till avsnittet här:

| Fil:rad i dag | Talet | Skrivs om till |
|---------------|-------|----------------|
| `Header.jsx:47-50` | `scrollY 676`, `351 px`, `485` | Felet: med sektioner av olika höjd vann den sektion som täckte mest av vyporten, inte den man läste. Man klickade "Projekt" och navet lyste "Kompetenser". Inga tal |
| `Header.jsx:142` | `8 px-band` | "det tunna bandet (`READING_BAND`)" |
| `Header.jsx:157` | `minus 64 px` | "minus headerns höjd" (64 är ett upphävt värde, M6) |
| `Header.jsx:257` | `44 px` | "dess ordbild var oläslig i ikonens storlek" — **UPPHÄVT 2026-11-07, se M20:** hela kommentarsblocket ersätts i P14c |
| `Header.jsx:260-262` | `96 x 72`, `36 px`, `48 x 36 px` | Samma form som `Footer.jsx`: width/height är filens egna mått, så att ingen layout shift uppstår. CSS sätter höjden ("Ikonens optiska storlek") — **UPPHÄVT 2026-11-07, se M20:** ersätts i P14c |
| `Header.jsx:274-277` | `48px`, `48`, `96`, `144-192 px` | "sizes = ikonens CSS-bredd ("Ikonens optiska storlek"). Utan sizes antar webbläsaren 100vw och hämtar alltid den största filen." — **UPPHÄVT 2026-11-07, se M20:** `sizes` och kommentaren tas bort i P14c |
| `global.css:47-49` | `60 tecken`, `scrollWidth 398`, `clientWidth 345` | En uppräkning täcker bara de element vi räknar upp, och en lång obruten sträng i ett element utanför listan (till exempel ett `<span>`) spräckte golvet. Inga tal |

**Står kvar, med skäl:**

- `tokens.css:36-70`, kontrastkvoterna. LARDOMAR 2026-10-08 **kräver** dem vid
  tokenet. De är regeln, inte en motivering.
- `Header.jsx:191`, `-2 px tolerans`. Talet beskriver koden på raden under
  (`- 2`), inte en mätning.
- Brytpunkterna (`600 px`, `900 px`) och "360 px-golvet". Det är namn på beslut,
  inte mätningar.
- `global.css:170` ("från 600 px"). Historik om en borttagen klass och en
  brytpunkt, inget mätt värde.

P14b kör `grep -rnE "[0-9]+ ?(px|x [0-9])" src --include=*.css --include=*.jsx` och
läser varje träff i en kommentar. Hittas ett **uppmätt** tal utöver tabellen
lämnas det tillbaka hit och skrivs inte om på eget beslut.

#### Punkt 13 — `profile.js`, kommentaren

P14 gjorde `role` till footerns tagline, men kommentaren rördes inte färdigt:

- "texten efter tankstrecket i `<title>`" → "texten efter första mittpunkten i
  `<title>`". `<title>` har mittpunkter, inget tankstreck, och `index.html:18`
  säger redan så.
- Under "VAR DE SYNS": `role` syns i rollraden i hero **och** som taglinen i
  footern. `name` syns i copyrightraden i footern. Parentesen "(läses därifrån
  från paket P14)" stryks: den beskriver ett paket, inte filen.

`global.css` och `tokens.css` har inget P14 behöver ändra: footern får sidmarginalen
ur `header, footer, section[id]` ("Var sidmarginalen bor"), och varje textfärg
footern använder har sin kvot mot `--bg` i `tokens.css` (A8:s regel). **Inte
kontrollerat av mig:** vilka rader P14 ändrade i de tre filerna (`git diff`). Jag
har läst filernas innehåll, inte diffen. G2 jämför mot diffen.

#### Exakt vad P14b ändrar

Förutsättning: P14 är överlämnat, ingen `GRANSKNING-PAGAR` finns. Inga andra filer
än dessa rörs.

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/Footer.jsx` | Importera `typeStyles` ur `../styles/type.module.css`. Ersätt markeringen och `<h2 className={styles.columnHeading}>Kontakt</h2>` med ``<p className={`${typeStyles.meta} ${styles.columnLabel}`}>Kontakt</p>`` och kommentaren `{/* Beslutat i ARKITEKTUR.md: M19 punkt 1 */}` | 1 |
| `src/components/Footer.jsx` | Ta bort `emailLabel` och kommentaren ovanför. E-postlänkens text blir `{contact.email}` | 2 |
| `src/components/Footer.jsx` | Den externa länken: `rel="noopener noreferrer"` och `<span className="visually-hidden"> (öppnas i ny flik)</span>` efter `{link.label}` | 3 |
| `src/components/Contact.jsx` | Samma ändring som raden ovan på `:71` | 3 |
| `src/components/Footer.module.css` | `.columnHeading` byter namn till `.columnLabel` och behåller bara `margin-bottom: var(--space-3);` | 1 |
| `src/components/Footer.module.css` | Ta bort `EJ I ARKITEKTUR` + `OPEN-KEY: footer-kolumnlayout` (`:23-24`) och `EJ I ARKITEKTUR` + `OPEN-KEY: footer-lankhover` (`:67-68`). Ersätt med `/* Beslutat i ARKITEKTUR.md: M19 punkt 6 */` | 6 |
| `src/components/About.module.css` | `:26-27`: ersätt markeringen och `OPEN-KEY: about-inline-link` med `/* Beslutat i ARKITEKTUR.md: M19 punkt 4 */`. Invarianterna under står kvar | 4 |
| `src/components/ContactForm.module.css` | `:37-38`: ersätt markeringen och `OPEN-KEY: kontaktfaltens-avstand` med `Beslutat i ARKITEKTUR.md: M19 punkt 5.` Raderna 34-35 står kvar | 5 |
| `src/components/Projects.module.css` | `:5`: `EJ I ARKITEKTUR: vilken typografi det tomma läget ska ha.` → `Beslutat i ARKITEKTUR.md: M19 punkt 8.` Raderna 6-7 står kvar | 8 |
| `src/styles/global.css` | `:21`: frågan → `Webbläsarens egen textuppskalning stängs av. Beslutat i ARKITEKTUR.md: M19 punkt 9.` Skälet under står kvar | 9 |
| `src/styles/global.css` | `:247-248`: markeringen → `Måtten, placeringen och lagernivån: beslutat i ARKITEKTUR.md, M19 punkt 10.` | 10 |
| `src/styles/global.css` | `:47-49` enligt tabellen i punkt 12 | 12 |
| `src/components/Header.jsx` | De sex raderna i tabellen i punkt 12 | 12 |
| `scripts/validate-data.mjs` | `:70`, `:556`, `:998`: första raden i markeringen → `Beslutat i ARKITEKTUR.md: M19 punkt 7.` Skälet under står kvar. Inget meddelande ändras | 7 |
| `src/data/profile.js` | De två rättelserna i punkt 13 | 13 |

**Grindar för P14b** (varje mått med vyport och rullningslistvillkor, färskt bygge,
servern startad och stoppad enligt `netstat`-regeln):

1. `grep -rn "EJ I ARKITEKTUR\|OPEN-KEY" src scripts index.html` ger **0** träffar.
2. `grep -rn 'rel="noreferrer"' src` ger 0. Antalet rader med `target="_blank"` i
   `src` är lika med antalet med `rel="noopener noreferrer"`.
3. ~~`grep -rn "columnHeading\|emailLabel\|Mejl" src` ger 0.~~ **RÄTTAT 2026-11-07,
   se M20 punkt 7:** `grep -rn "columnHeading\|emailLabel" src` ger 0, och
   `grep -n "Mejl" src/components/Footer.jsx` ger 0. "Mejl" är formulärets etikett
   (Jelals beslut 7) och får stå i `ContactForm.jsx`.
4. Renderad sida vid 360 × 640 och 1280 × 800: `h1`–`h6` på sidan har texten
   "Kontakt" **exakt en gång**. `footer` har inget `h1`–`h6`. Footerns
   e-postlänk har adressen som text. Varje `a[target="_blank"]` i `footer` och
   `#contact` har `rel` lika med `noopener noreferrer` och en text som slutar på
   "(öppnas i ny flik)".
5. **Beslut 7:** `document.title`, `document.body.innerText` och texten i
   `noscript` innehåller inget `-`, `–` eller `—`, vid 360 och 1280, en gång med
   tomt formulär och en gång efter klick på den dämpade knappen (felmeddelandena
   synliga). Visas en träff: utskrift av elementet och texten.
6. Kontrast: footerns etikett, länkar, tagline och copyright mätta med
   `getComputedStyle` mot `--bg`, med renderad px-storlek, varje ≥ 4,5:1.
7. 360 px-golvet: syntessträngen i footerns e-postlänk och i etiketten,
   `documentElement.scrollWidth <= clientWidth`, med villkoret `innerWidth -
   clientWidth` utskrivet.
8. `grep -rnE "scrollY 676|351|485|96 x 72|48 x 36|144-192|minus 64|i 44 px|398" src`
   ger 0 (`scrollY 0` på `Header.jsx:61` beskriver sidans topp, inte en mätning,
   och står kvar). Den bredare sökningen i punkt 12 är redovisad, träff för träff.
9. `grep -n "tankstreck\|paket P14" src/data/profile.js` ger 0.
10. `npm run validate:data`, `npm run build` och `npm run lint` gröna, och
    tokengrinden tyst.

**PLAN.md:** P14b står inte där. Det är projektledarens att lägga in mellan P14
och P15, med `Ingår:` enligt tabellen ovan och grindarna ovan som `Godkänt när:`.
P15:s förutsättning får P14b. Jag rör inte `PLAN.md`.

### M20 — ny logga (Jelal 2026-11-07, genomförs i P14c före P15)

**Jelals beslut 2026-11-07, bindande: "Kör på B".** Naven och footern visar den
**hela loggan**: den orange JQ-rutan plus ordmärket "JELAL QAIUMI" i ljus text på
genomskinlig botten. **JQ-rutan ensam** är favicon och apple-touch-icon. Det
upphäver Jelals beslut 2026-10-02 (alternativ (b), monogram plus dold HTML-text)
och 2026-10-07 ("namnet döljs i alla bredder"). Varje äldre stycke som krockar är
märkt `UPPHÄVT 2026-11-07, se M20` på sin egen rubrik eller rad.

**Källan, kontrollerad av mig 2026-11-07:** `assets-source/jq-logo-light.png` finns
(otrackad i git), och bilden visar rutan till vänster och ordmärket till höger på
ljus botten. ~~Måtten och färgerna nedan är **samordnarens mätning**, inte min.~~
**RÄTTAT 2026-11-08:** samordnarens stickprov stämde inte med källan (P14c steg 1
stoppades vid S2). Tabellen nedan är **byggarens mätning med sharp**, och P14c:s
källgrindar (S1–S6) prövar varje tal innan något genereras.

| Del i källan | Läge (inklusive ändpunkter) | Färg |
|--------------|-----------------------------|------|
| Hela bilden | 2000 × 774, PNG, alfakanal. ~~opak~~ **RÄTTAT 2026-11-08:** rad 0 har alfa 55 och rad 773 alfa 154 på alla 2000 pixlar. Rad 1–772 är opaka | botten `rgb(246,244,240)` |
| JQ-rutan, ren yta | ~~x 219–553, y 219–553 (335 × 335)~~ **RÄTTAT 2026-11-08:** x 219–553, y 220–553 (335 × 334) | `rgb(255,107,0)` = `--accent` `#ff6b00`, "JQ" i `rgb(20,20,20)` = `--ink-inverse` |
| JQ-rutans kant (**tillagt 2026-11-08**) | 1 px utanför den rena ytan: rad 219 och rad 554 (x 218–554), kolumn 218 och kolumn 554 (y 219–554) | blandning botten–accent: rad 219 `250,188,141`, rad 554 `253,134,47`, kolumn 218 `248,216,192`, kolumn 554 `246,242,236` |
| Mellanrummet | ~~x 554–647~~ **RÄTTAT 2026-11-08:** x 555–647 (kolumn 554 är rutans kant) | botten |
| Ordmärket | ~~ca x 648–1782, y 344–432~~ **RÄTTAT 2026-11-08:** x 648–1781, y 343–435 | `rgb(20,20,20)` |

**Samordnarens test, variant B (godkänt av Jelal):** skärmbilderna
`nav-B-1280.png` och `nav-B-390.png` i
`C:\Users\qaium\AppData\Local\Temp\claude\C--Users-qaium-source-repos-Portfoolie-Jelalq\2976d642-d53a-4f4f-b63b-0cbef3977385\scratchpad\logo-test\`.
Jag har sett 390-bilden: rutan, ordmärket och hamburgern ryms i pillen.

| # | Fråga | Beslut i en mening |
|---|-------|--------------------|
| 1 | Generering | `scripts/optimize-images.mjs` byter ikondelen mot en logodel: PNG med alfa i höjderna 34, 68 och 102 (1x, 2x, 3x), `srcSet` med x-deskriptorer, luminansformeln med uppmätta ändpunkter, och grindar på källa, mått, storlek, rutans färg och ordmärkets färg |
| 2 | Favicon och apple-touch-icon | JQ-rutan rakt ur källan i 32, 96 och 192, **opak och utan luft** |
| 3 | Markup | Ett `<img alt="Jelal Qaiumi">` ensamt i headerns länk, ingen dold text och ingen `aria-label`. `width="159" height="34"`, CSS `height: 34px; width: auto`. Naven behåller sin låsta höjd. Vid 360 px ryms loggan bredvid hamburgern med 48 px över (**uppmätt i P14c, med och utan rullningslist. RÄTTAT 2026-11-08, se M22 punkt 2**) |
| 4 | Footerns tagline | Står kvar under loggan |
| 5 | Gamla filer | `assets-source/logo.png` och de fem `public/assets/logo-mark*.png` tas bort |
| 6 | Kontrast | Ordmärket i `--ink` mäts mot pillen med samma metod och krav som navlänkarna (≥ 4,5:1). I footern 16,890:1 ur `tokens.css`. Rutan mot `--bg` 6,664:1 |
| 7 | Formulärtexterna | "E-post" rättas till "Mejl" med Jelals platshållare och felmeddelanden där de står |

#### Punkt 1 — genereringen i `scripts/optimize-images.mjs`

**Format: PNG med alfa, inte webp.** Loggan är platt grafik med skarpa kanter och
liten text. PNG är förlustfri, så grinden "rutan är `--accent` ±2" mäter källans
färg och inte en kodares avrundning. Lossy webp lagrar färg i YUV och flyttar en
mättad orange flera steg (heros grind 5 behövde tolerans 2 för grått). Lossless
webp hade gett ett andra format för samma sak utan uppmätt vinst. Inget nytt
beroende: sharp finns.

**Storlekarna: tre filer på höjd, x-deskriptorer.** Loggan visas alltid med CSS-höjd
34 px, i naven och i footern. Bredden följer av proportionen ~~1571 : 335~~
**1565 : 334 (RÄTTAT 2026-11-08, uttaget nedan)**. Med fast
CSS-storlek är `1x/2x/3x` exakt, och inget `sizes` behövs. 3x tas med: telefoner med
pixeltäthet 3 är vanliga, och liten text blir annars mjuk.

| Fil | Höjd × bredd | Täthet | Tak (inte uppmätt) |
|-----|--------------|--------|--------------------|
| `public/assets/jq-logo-34.png` | 34 × 159 | 1x | ≤ 6 kB |
| `public/assets/jq-logo-68.png` | 68 × 319 | 2x | ≤ 14 kB |
| `public/assets/jq-logo-102.png` | 102 × 478 | 3x | ≤ 24 kB |
| `public/assets/jq-icon-32.png` | 32 × 32 | favicon | ≤ 2 kB |
| `public/assets/jq-icon-96.png` | 96 × 96 | favicon | ≤ 6 kB |
| `public/assets/jq-icon-192.png` | 192 × 192 | apple-touch-icon | ≤ 14 kB |

Bredden är ~~`Math.round(h × 1571 / 335)`~~ **`Math.round(h * LOGO_CROP.width / LOGO_CROP.height)` = `Math.round(h * 1565 / 334)` (RÄTTAT 2026-11-08; ger samma 159, 319 och 478)**. Skriptet räknar ut den och jämför med
tabellen (grind L1). Nya namn (`jq-`) i stället för `logo-mark-` så att en sökning
på det gamla namnet ger 0 träffar när bytet är klart.

**Konstanter** (ersätter hela ikondelens konstanter, se "Tas bort ur skriptet"):

| Konstant | Värde |
|----------|-------|
| `LOGO_SOURCE` | `resolve(ASSETS_SOURCE_DIR, 'jq-logo-light.png')` |
| `SOURCES` | `[HERO_SOURCE, LOGO_SOURCE]` |
| `LOGO_EXPECTED_WIDTH` / `LOGO_EXPECTED_HEIGHT` | `2000` / `774` |
| `LOGO_BG_RGB` | `{ r: 246, g: 244, b: 240 }` |
| `LOGO_TEXT_RGB` | `{ r: 20, g: 20, b: 20 }` |
| `LOGO_OPAQUE_ROWS` (**tillagt 2026-11-08**) | `{ top: 1, bottom: 772 }` (inklusive; rad 0 och 773 läses aldrig) |
| `LOGO_SQUARE` | ~~`{ left: 219, top: 219, side: 335 }`~~ **RÄTTAT 2026-11-08:** `{ left: 219, top: 220, width: 335, height: 334 }`, rutans rena yta (x 219–553, y 220–553). Kanten är ringen 1 px utanför den, x 218–554 × y 219–554, och räknas ut ur `LOGO_SQUARE` i skriptet, ingen egen konstant |
| `LOGO_GAP_END` | `648` (första kolumnen efter mellanrummet, i källans koordinater) |
| `LOGO_CROP` | ~~`{ left: 219, top: 219, width: 1571, height: 335 }` (x 219–1789, y 219–553)~~ **RÄTTAT 2026-11-08:** `{ left: 219, top: 220, width: 1565, height: 334 }` (x 219–1783, y 220–553). Vänster, topp och botten är rutans rena yta, så kantringen ligger utanför uttaget. Höger: ordmärket slutar på 1781, 2 px luft |
| `ICON_CROP` (**tillagt 2026-11-08**) | `{ left: 220, top: 220, width: 334, height: 334 }` (x 220–553, y 220–553), kvadraten inom den rena ytan |
| `LANCZOS_REACH` (**tillagt 2026-11-08**) | `3` (sharps standardkärna `lanczos3` når 3 utdatapixlar åt varje håll. `kernel` sätts inte i `resize()`) |
| `LOGO_HEIGHTS` | `[34, 68, 102]` |
| `LOGO_EXPECTED_WIDTHS` | `{ 34: 159, 68: 319, 102: 478 }` |
| `ICON_SIZES` | `[32, 96, 192]` |
| `LOGO_SIZE_LIMIT_KB` / `ICON_SIZE_LIMIT_KB` | taken i tabellen ovan, nycklade på höjd respektive sida |
| `COLOR_TOLERANCE` | `2` (per kanal) |
| `TOKENS_FILE` | `resolve(ROOT, 'src/styles/tokens.css')` |

**Färgerna läses ur `tokens.css`, aldrig skrivna i skriptet.** En funktion,
`readTokenHex(name)`, läser filen (i `try/catch`, LARDOMAR 2026-10-05) och
returnerar `{ r, g, b }` för `--<name>: #rrggbb;`. Den anropas för `accent` och
`ink`. Saknas tokenet eller är värdet inte sex hexsiffror:
`tokens.css: --<name> saknas eller är inte #rrggbb`. Ändrar Jelal `--accent` fäller
grind L4 och I4, och det är rätt: då matchar loggan inte längre sidan.

**Transparensen: testets form, men med uppmätta ändpunkter.** Testet räknade
`alpha = clamp((245 − lum) / (245 − 20))`. Med bottnens luminans 244,14 blir det
0,0038, alltså alfa 1 av 255 efter avrundning **på varje bottenpixel**. Hela
rektangeln hade fått en osynlig men inte genomskinlig botten, och grind L7 hade
fallit på korrekt utdata. Därför:

```
lum(rgb)   = 0.2126 * r + 0.7152 * g + 0.0722 * b      (8-bitarsvärden, ingen linjärisering)
LUM_BG     = lum(LOGO_BG_RGB)     // 244,14, räknas i skriptet
LUM_TEXT   = lum(LOGO_TEXT_RGB)   // 20
alpha      = clamp((LUM_BG - lum(pixel)) / (LUM_BG - LUM_TEXT), 0, 1)
a          = Math.round(alpha * 255)
```

Bottnen får exakt 0, texten exakt 255, och skillnaden mot testet är högst 0,4 %
alfa. Det syns inte, och Jelals godkännande gäller utseendet.

**Kedjan, i denna ordning:**

1. Källgrindarna ~~S1–S5~~ **S1–S6 (RÄTTAT 2026-11-08)** (nedan). ~~på hela källan~~
   De läser bara rad `LOGO_OPAQUE_ROWS.top`–`LOGO_OPAQUE_ROWS.bottom`.
2. `sharp(LOGO_SOURCE).extract(LOGO_CROP).ensureAlpha().raw()`.
3. Per pixel i uttaget: x < ~~`LOGO_SQUARE.side`~~ **`LOGO_SQUARE.width` (335; RÄTTAT
   2026-11-08)** (rutan) behåller sina RGB och får alfa 255. Övriga får RGB = `--ink`
   och alfa enligt formeln. **Rutans kantpixlar (tillagt 2026-11-08):** de behålls
   inte och får ingen alfa ur andelen accent. De ligger utanför uttaget på vänster
   sida, topp och botten (en kant på 25–88 % accent är under 0,13 utdatapixel i 1x,
   och behållen hade den gett en blek ram mot pillen). Höger kantkolumn 554 (≈ 2 %
   accent) är uttagets x 335 och går genom formeln som mellanrummet: alfa ≈ 2, och
   steg 5 färgar den.
4. ~~`sharp(rgba, { raw: { width: 1571, height: 335, channels: 4 } })`~~
   **`sharp(rgba, { raw: { width: LOGO_CROP.width, height: LOGO_CROP.height, channels: 4 } })` (RÄTTAT 2026-11-08)**`.resize({ width: w, height: h, fit: 'fill' }).raw()`
   per höjd. `fill` med tabellens bredd ger exakt mått. Proportionsfelet är under
   0,3 % och syns inte.
5. **Återställ ordmärkets färg efter `resize()`** (samma skäl som steg 8 i det gamla
   ikonbeslutet: `resize()` interpolerar RGB). Varje pixel med
   `x >= squareEnd`, där ~~`squareEnd = Math.ceil(335 * w / 1571)`~~
   **`squareEnd = Math.ceil(LOGO_SQUARE.width * w / LOGO_CROP.width)` (RÄTTAT 2026-11-08)**,
   får RGB = `--ink`. Alfa rörs inte. Rutans pixlar rörs inte.
6. `png({ compressionLevel: 9 })`, sedan `queueWrite`.

Ikonerna: ~~`sharp(LOGO_SOURCE).extract({ left: 219, top: 219, width: 335, height: 335 })`~~
**`sharp(LOGO_SOURCE).extract(ICON_CROP)` (RÄTTAT 2026-11-08)**`.removeAlpha().resize(n, n).png({ compressionLevel: 9 })`.
Ingen alfa, ingen utfyllnad. Uttaget ligger helt i den rena ytan, så ingen blek kant
följer med.

**Funktioner** (LARDOMAR 2026-10-02, "parallell dubblering": en kontroll som behövs
två gånger är en funktion):

```js
/** @returns {{ r: number, g: number, b: number }} */
function readTokenHex(name) {}
/** Luminansen ovan. */
function lum(r, g, b) {}
/** true om varje kanal ligger inom tol. */
function nearRgb(actual, expected, tol) {}
/** Vanligaste RGB bland pixlar i rektangeln med alfa === 255. raw har 3 eller 4 kanaler. */
function modeRgb(raw, { x0, y0, x1, y1 }) {}
/** Distinkta RGB bland pixlar med alfa > 0 i rektangeln. */
function distinctVisibleRgb(raw, { x0, y0, x1, y1 }) {}
/** Mått, kanaler, hasAlpha och storlek för en kodad buffert. Skriver GRIND-raderna, returnerar antal fel. */
async function checkPng(name, buffer, { width, height, hasAlpha, limitKb }) {}
/** Tillagt 2026-11-08 (byggarens tillägg, godkänt). Pixeln (x, y) i en raw-buffert
 *  med sharps info. a = 255 när channels === 3. */
function pixelAt(raw, { width, channels }, x, y) {} // → { r, g, b, a }
/** Tillagt 2026-11-08 (byggarens tillägg, godkänt). "r,g,b" för GRIND-raderna. */
function rgbText({ r, g, b }) {} // → string
```

`assertSafeOutput`, `queueWrite`, `readSourceStat` och `sourceUntouched` står kvar
oförändrade och används för den nya källan. **Godkänt 2026-11-08:** `sourceUntouched`
körs för båda källorna (`SOURCES`). Har byggarens `pixelAt` en annan parameterform
skrivs den om till formen ovan.

**Källgrindarna**, var och en `GRIND:` följd av `fail()`:

**RÄTTAT 2026-11-08:** S2–S5 byggde på stickprovet och fälls av den korrekta
källan. Tabellen är omskriven efter byggarens mätning, och S6 är tillagd. Gamla
lydelser står överstrukna.

| # | Kontroll | Legitim ändring som får fälla den |
|---|----------|-----------------------------------|
| S1 | Källan är 2000 × 774 | En ny loggfil. Då ses M20 över först |
| S2 | ~~Har källan alfa är **varje** pixels alfa 255~~ **RÄTTAT:** `LOGO_CROP`, `ICON_CROP` och kantringen ligger inom `LOGO_OPAQUE_ROWS`, och har källan alfa är varje pixel i rad 1–772 alfa 255. Rad 0 och 773 prövas inte och läses av ingen annan grind | En ny källa med verklig transparens i bildytan. Formeln förutsätter opak botten |
| S3 | ~~Varje pixel **utanför** `LOGO_CROP` är `LOGO_BG_RGB` ±2~~ **RÄTTAT:** varje pixel i rad 1–772 som ligger utanför `LOGO_CROP` och utanför kantringen är `LOGO_BG_RGB` ±2. Bevisar att uttaget inte klipper ordmärket | En ny källa |
| S4 | ~~Rutans fyra kantlinjer (rad 219 och 553 …) … botten ±2~~ **RÄTTAT:** den rena ytans fyra yttre linjer (rad 220 och 553 för x 219–553, kolumn 219 och 553 för y 220–553) är `--accent` ±2. Bevisar rutans läge på pixeln, och att `ICON_CROP`:s hörn är rena | En ny källa eller ett ändrat `--accent` |
| S5 | ~~Kolumnerna 554–647, rad 219–553, är botten ±2~~ **RÄTTAT, ny innebörd:** varje pixel i kantringen (rad 219 och 554 för x 218–554, kolumn 218 och 554 för y 219–554) är en blandning av botten och accent: med `c = clamp((LOGO_BG_RGB.b − p.b) / (LOGO_BG_RGB.b − accent.b), 0, 1)` ligger varje kanal inom ±2 från `Math.round(bg + c * (accent − bg))`. Med S3 (utanför ringen är botten) och S4 (innanför är accent) bevisar det att kanten är högst 1 px bred | En ny källa eller ett ändrat `--accent` |
| S6 (**tillagt 2026-11-08**, var S5) | Kolumnerna 555–647, rad 220–553, är botten ±2. Bevisar att ruta och ordmärke är åtskilda, så att delningen i steg 3 och 5 är giltig | En ny källa |

**Utdatagrindarna för loggan**, per fil:

| # | Kontroll |
|---|----------|
| L1 | Mått = `LOGO_EXPECTED_WIDTHS[h]` × `h`, och ~~`Math.round(h * 1571 / 335)`~~ **`Math.round(h * LOGO_CROP.width / LOGO_CROP.height)` (RÄTTAT 2026-11-08)** = samma bredd |
| L2 | 4 kanaler, `hasAlpha === true` |
| L3 | Storlek ≤ taket |
| L4 | `modeRgb` i rutans inre ~~(x 1 till `squareEnd − 2`, y 1 till `h − 2`)~~ **(RÄTTAT 2026-11-08:** x 1 till `innerEnd`, y 1 till `h − 2`, där `innerEnd = Math.floor(LOGO_SQUARE.width * w / LOGO_CROP.width - LANCZOS_REACH - 0.5)`, dvs. 30, 64 och 98) är `--accent` ±2 |
| L5 | Varje pixel i samma rektangel har alfa 255. **RÄTTAT 2026-11-08:** rektangeln slutar `LANCZOS_REACH` utdatapixlar före rutans högra kant. Orsaken till fallet var lanczos3:s negativa lob vid en verklig kant mot den genomskinliga luckan (alfa strax under 255, osynligt), inte ett hål i rutan. Grinden skyddar mot att steg 3 gör rutan genomskinlig, och det fångar rektangeln fortfarande |
| L6 | `distinctVisibleRgb` för x ≥ `squareEnd` är **exakt en** färg och den är `--ink` |
| L7 | Pixlarna (`w − 1`, 0) och (`w − 1`, `h − 1`) har alfa 0, och minst en hel kolumn mellan `squareEnd` och ~~`Math.floor(429 * w / 1571)`~~ **`Math.floor(429 * w / LOGO_CROP.width)` (RÄTTAT 2026-11-08)** har alfa 0 i alla rader (429 = `LOGO_GAP_END − LOGO_CROP.left`, oförändrat) |
| L8 | Antal pixlar med 0 < alfa < 255 för x ≥ `squareEnd` är > 0 (mjuk kant, inte trappad) |

**Utdatagrindarna för ikonerna**, per fil: I1 mått n × n, I2 3 kanaler och
`hasAlpha === false`, I3 storlek ≤ taket, I4 ~~pixeln (0, 0) är `--accent` ±2~~
**RÄTTAT 2026-11-08: alla fyra hörnpixlarna, (0, 0), (n − 1, 0), (0, n − 1) och
(n − 1, n − 1), är `--accent` ±2** (rutan går ut i kanten, ingen luft och ingen blek
kant. Gäller med `ICON_CROP`), I5 `modeRgb` över hela bilden är `--accent` ±2.

**Grundkörningen (tillagt 2026-11-08):** skriptet körs först en gång på den korrekta
källan, och varje grind S1–S6, L1–L8 och I1–I5 ska gå igenom. Först därefter görs de
negativa kontrollerna. Faller en grind i grundkörningen stoppar byggaren och lämnar
tillbaka hit med de uppmätta värdena. Ingen konstant, tolerans eller rektangel
justeras på eget beslut.

Sist, före skrivfasen: `sourceUntouched` för båda källorna. Skrivfasen är
oförändrad: ingenting skrivs innan alla grindar passerat.

**Taken är inte uppmätta.** Faller L3 eller I3 på den korrekta källan i första
körningen stoppar byggaren och lämnar tillbaka hit med de uppmätta storlekarna.
Taket lossas inte på eget beslut, och komprimeringen ändras inte.

**Tas bort ur skriptet:** `LOGO_EXPECTED_WIDTH = 1254`, `ORANGE_ROW_GAP`,
`ORANGE_MIN_DELTA`, `ORANGE_MIN_RED`, `isOrange`, `EXPECTED_BLOCKS`,
`EXPECTED_MARK_BBOX`, `ICON_SIDE`, `ACCENT` (`252, 111, 3`), `LOGO_BASE_R`,
`ALPHA_SPAN`, den gamla `ICON_SIZE_LIMIT_KB`, `TIGHT_SIZES`, blockdetekteringen,
`MARK_CROP`, `WORDMARK_TOP_ROW`, `STREAK_TOP_ROW`, `extend()`-steget, kontrollen
"KRITISK KONTROLL PÅ 672-UNDERLAGET", `resetAccentRgb` och varje kommentar om
monogrammet, 672, `#FC6F03`, blocken och de tajta filerna. Kommentaren överst i
skriptet skrivs om: "genererar heros svartvita bild, loggan och ikonerna".
Heros del rörs inte.

**Källorna skyddas** av samma `assertSafeOutput` som i dag, nu med
`jq-logo-light.png` i `SOURCES`, och `sourceUntouched` bevisar efteråt att den är
orörd (storlek och mtime).

#### Punkt 2 — favicon och apple-touch-icon

**Ingen luft runt rutan, i någon storlek.** iOS rundar själv hörnen på
apple-touch-icon och fyller genomskinliga pixlar med svart, så ikonen ska vara
opak och fylla hela ytan. Bokstäverna ligger ca 14 % av sidan in från kanten
(x 267–506 i en ruta som ~~börjar på 219~~ **i ikonen börjar på 220, `ICON_CROP`, RÄTTAT 2026-11-08; bokstävernas läge är stickprov, inte uppmätt**), och iOS-hörnens kurva når ca 7 % in vid
diagonalen, så "JQ" klipps inte. En luftkant i 192 hade gjort rutan mindre på
hemskärmen utan att skydda något. Favicon får samma regel: rutan är märket.

```html
<link rel="icon" type="image/png" sizes="32x32" href="/assets/jq-icon-32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/assets/jq-icon-96.png" />
<link rel="apple-touch-icon" href="/assets/jq-icon-192.png" />
```

Kommentaren ovanför i `index.html` skrivs om till invarianten: ikonen är JQ-rutan
ur loggan, opak och utan luft, och varje genererad ikonfil refereras här eftersom
`dist/` inte får ha orefererade filer.

#### Punkt 3 — markupen i Header och Footer

**`Header.jsx`, tecken för tecken** (ersätter `<a className={styles.logoLink} …>`
till och med `</a>`, inklusive bilden, `<span className="visually-hidden">Jelal Qaiumi</span>`
och de två kommentarsblocken):

```jsx
        {/* Bilden ÄR namnet i text, så alt är namnet, och länkens tillgängliga
            namn kommer ur alt. Ingen dold text och ingen aria-label: båda hade
            gett namnet två gånger. width/height är 1x-filens mått, så att ingen
            layout shift uppstår. CSS sätter höjden. Hero renderas alltid av App,
            så ankaret har alltid ett mål. Beslutat i ARKITEKTUR.md: M20. */}
        <a className={styles.logoLink} href={`#${HERO_ID}`}>
          <img
            className={styles.logo}
            src="/assets/jq-logo-34.png"
            srcSet="/assets/jq-logo-34.png 1x, /assets/jq-logo-68.png 2x, /assets/jq-logo-102.png 3x"
            alt="Jelal Qaiumi"
            width="159"
            height="34"
          />
        </a>
```

- `alt="Jelal Qaiumi"`, inte "Jelal Qaiumi, till startsidan": länken går till
  sidans topp, inte till en startsida, och loggans namn är webbplatsens namn.
  WCAG 1.1.1 för bild av text: alt är texten i bilden.
- Länkens namn har fortfarande **en** bärare, nu alt. Den degraderar till synlig
  text om bilden inte laddas, vilket den dolda texten gjorde om CSS inte laddades.
  Distinktionsregistret är rättat.

**`Header.module.css`, tecken för tecken:**

```css
/* EN länk, ett barn: loggan. */
.logoLink {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  /* TRÄFFYTAN. Loggan är lägre än WCAG 2.5.5:s 44 px; blocket över och under
   * ger länken den höjden utan att något syns. Ta inte bort raden med
   * motiveringen att den inte syns. */
  padding-block: 5px;
}

/* Loggan renderas på HÖJD; bredden följer av filens proportion. Höjden hör
 * ihop med de genererade filerna (1x, 2x, 3x), så den ändras bara tillsammans
 * med dem. Beslutat i ARKITEKTUR.md: M20. */
.logo {
  height: 34px;
  width: auto;
  flex-shrink: 0;
}
```

`gap` tas bort ur `.logoLink`: länken har ett barn. **Inget token för 34 px:** talet
är bundet till filernas höjder i skriptet och till `height="34"` i JSX, och ett
token hade sett ut att gå att ändra ensamt.

**Naven har låst höjd och den ändras inte:** `.pill { height: var(--nav-height) }`
står kvar. Loggan (34) ryms i pillens innerhöjd (58 − 2 × 8 − 2 = 40). Länken blir
44 px hög och går 2 px ut i pillens padding på var sida, precis som i dag (36 + 8).

**`Footer.jsx`:** bilden byts, attributen i övrigt är oförändrade (`alt=""` och
`aria-hidden="true"`: namnet står i copyrightraden, så loggan är dekor där):

```jsx
            {/* Samma logga som headern. Den är dekor här: namnet står i
                copyrightraden. width/height är 1x-filens mått, så att ingen
                layout shift uppstår. CSS sätter höjden. Beslutat i
                ARKITEKTUR.md: M20. */}
            <img
              className={styles.logo}
              src="/assets/jq-logo-34.png"
              srcSet="/assets/jq-logo-34.png 1x, /assets/jq-logo-68.png 2x, /assets/jq-logo-102.png 3x"
              alt=""
              aria-hidden="true"
              width="159"
              height="34"
            />
```

**`Footer.module.css`:** `.logo { height: 34px; width: auto; }`.

~~**360 px, uträknat (inte uppmätt, P14c mäter och grinden är olikheten, inte
talet):**~~ **360 px, uppmätt 48 px i P14c (RÄTTAT 2026-11-08; uträkningen nedan
står kvar som förklaring, och grinden är olikheten, inte talet):** vyport 360, rullningslist 15 reserverad → `clientWidth` 345, minus
sidmarginal 2 × 24 → pillen 297, minus ram 2 och padding 24 + 8 → innerbredd 263.
Loggan 159 + `gap` 16 + hamburgern 40 = 215. **Kvar: 48 px.** ~~Utan rullningslist
63 px~~ **RÄTTAT 2026-11-08, se M22 punkt 2: uppmätt 48 px i P14c, även utan
rullningslist.** `scrollbar-gutter: stable` på `html` (M10b punkt 3) reserverar
rännan, så `clientWidth` är 345 i båda fallen. Vid 390 px 78 px (uträknat på samma
sätt, inte uppmätt). Från 900 px: innerbredd 803 vid 900 × 700, och loggan tar
111 px mer än det gamla märket (159 mot 48). Navlänkarna och CTA:n mäts, de
uppskattas inte.

#### Punkt 4 — footerns tagline

**Står kvar under loggan.** Taglinen är `profile.role` ("Systemutvecklare ·
Fullstack"), inte namnet, så den upprepar inte ordmärket. Den säger vad Jelal gör,
och det gör inte loggan. M16 och M19 gäller oförändrade för den.

#### Punkt 5 — de gamla filerna

| Fil | Beslut | Skäl |
|-----|--------|------|
| `assets-source/logo.png` | **Tas bort** ur trädet | Ingen läsare efter skriptbytet. Finns i git-historiken. Samma väg som `profile.jpg` i M10c |
| `public/assets/logo-mark-{32,96,192}.png` | **Tas bort** | Ingen referens efter `index.html`. Orefererade filer i `dist/` är förbjudna |
| `public/assets/logo-mark-tight-{96,192}.png` | **Tas bort** | Ingen referens efter `Header.jsx` och `Footer.jsx` |
| `assets-source/jq-logo-light.png` | **Läggs till** i git | Källan. Läses, skrivs aldrig över |

`README.md` och `BRIEF.md` nämner de gamla filerna och `#FC6F03`. De är
dokumentatorns (P17) respektive projektledarens och rörs inte i P14c.

#### Punkt 6 — kontrast

| Par | Kvot | Källa | Krav |
|-----|------|-------|------|
| Ordmärket `--ink` mot pillen över heros bild | mäts | M10c rad 10:s metod, ordmärkets rektangel (utan rutan) som textrektangel | `>= 4,5`, GRIND. Logotyper är undantagna i WCAG 1.4.3, men ordmärket står bredvid navlänkarna i samma färg och ska hålla samma krav |
| Ordmärket `--ink` mot `--bg` i footern | 16,890:1 | `tokens.css` | AA |
| Rutan `--accent` mot `--bg` | 6,664:1 | `tokens.css` | ≥ 3:1 (1.4.11) |
| "JQ" `rgb(20,20,20)` mot rutan | 6,452:1 | `--ink-inverse` mot `--accent` i `tokens.css` | AA |

Legitim ändring som får fälla grinden i rad 1: en ljusare hero-bild, och den fäller
då navlänkarna i rad 10 också. Ordmärkets versalhöjd blir ca 9 px i 1x (~~89 av 335~~
**93 av 334, RÄTTAT 2026-11-08: ordmärket y 343–435**
källpixlar). UPPLYSNING, ingen grind: Jelal har godkänt utseendet i 34 px.

#### Punkt 7 — formulärtexterna efter Jelals beslut 7

Rättat på plats i "Fälten: fem, varav fyra obligatoriska" och i "Validering: båda,
i lager": etiketten är **"Mejl"**, platshållaren **"Skriv in din mejladress"**,
och felmeddelandena är **`Skriv din mejladress.`** (tomt) och
**`Kontrollera mejladressen. Den ska se ut som namn@exempel.se.`** (ogiltigt).
Texterna står redan så i `ContactForm.jsx:24`, `:51` och `:53`, så P14c ändrar ingen
kod för detta. P14b:s grind 3 sökte på `Mejl` i hela `src` och hade fällts av
etiketten. Den är rättad på plats.

#### Exakt vad P14c ändrar

Förutsättning: P14b är överlämnat, ingen `GRANSKNING-PAGAR` finns. Inga andra filer
än dessa rörs.

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `scripts/optimize-images.mjs` | Ikondelen ersätts av logodelen enligt punkt 1. Heros del rörs inte | 1, 2 |
| `index.html` | De tre ikonraderna och kommentaren ovanför enligt punkt 2 | 2 |
| `src/components/Header.jsx` | Logglänken enligt punkt 3, tecken för tecken | 3 |
| `src/components/Header.module.css` | `.logoLink` och `.logo` enligt punkt 3 | 3 |
| `src/components/Footer.jsx` | Bilden och kommentaren enligt punkt 3 | 3 |
| `src/components/Footer.module.css` | `.logo { height: 34px; width: auto; }` | 3 |
| `src/styles/global.css` | Kommentaren vid `.visually-hidden` (`:157-160`): "beslutat i ARKITEKTUR.md, 'Headerns logotyp': mönstret behövs igen av skip-länken i paket 7" → "beslutat i ARKITEKTUR.md, 'Fyra noteringar från paket 2B' och M20 (klassen står kvar)". **Godkänt 2026-11-08 (byggarens tillägg):** kommentaren om skip-länken skrivs om till "den döljs med .visually-hidden och blir synlig vid :focus", eftersom den gamla texten blev falsk när headerns dolda namn försvann (LARDOMAR 2026-11-07, "falsk kommentar"). Ingen regel ändras | 3 |
| `public/assets/jq-logo-{34,68,102}.png`, `jq-icon-{32,96,192}.png` | Nya, genererade | 1, 2 |
| `public/assets/logo-mark-*.png` (fem filer) | Tas bort | 5 |
| `assets-source/logo.png` | Tas bort | 5 |
| `assets-source/jq-logo-light.png` | Läggs till i git | 5 |

**Rörs inte:** `tokens.css`, `MobileMenu*`, `Hero*`, `Contact*`, `validate-*.mjs`,
`package.json`, `README.md`, `BRIEF.md`.

**Grindar för P14c** (färskt bygge, `vite preview`, servern startad och stoppad
enligt `netstat`-regeln, varje mått med vyport och `innerWidth - clientWidth`
utskrivet med menyn stängd):

1. `npm run optimize:images` en gång, **grundkörningen** (punkt 1). Varje `GRIND:`-rad
   redovisas, ~~S1–S5~~ **S1–S6 (RÄTTAT 2026-11-08)**, L1–L8 per logofil och I1–I5
   per ikonfil, med uppmätt storlek. Alla ska gå igenom innan punkt 2 påbörjas.
2. **Negativa kontroller i en isolerad kopia** av repot, med sha256-lista över
   `public/assets/` och `assets-source/` före och efter varje körning (ska vara
   identiska). Varje kontroll prövas korrekt (tyst), injicerad (larmar med rätt
   meddelande) och återställd (tyst):
   a. `LOGO_EXPECTED_WIDTH = 2001` → S1.
   b. `--accent: #ff7000` i kopians `tokens.css` → S4, L4 och I4.
   c. `LOGO_CROP.width = 1500` → S3.
   d. Steg 5 (återställningen till `--ink`) bortkommenterat → L6.
   e. En utdatasökväg satt till `LOGO_SOURCE` → `assertSafeOutput`, och källan orörd.
   f. (**Tillagt 2026-11-08**) `LOGO_SQUARE.top = 219`, övriga konstanter orörda → S4 (rad 219 är kant, inte accent).
   g. (**Tillagt 2026-11-08**) `ICON_CROP.left = 219, top = 219` → I4 (blek hörnpixel).
3. **Heros filer är oförändrade:** sha256 för `public/assets/hero/*` identiska före
   och efter körningen.
4. `grep -c` på varje `fail(`-meddelande i skriptet: inget förekommer mer än en gång.
5. `grep -rn "logo-mark\|logo\.png\|MARK_CROP\|EXPECTED_MARK_BBOX\|TIGHT_SIZES\|ORANGE_MIN\|FC6F03\|252, 111, 3\|sizes=\"48px\"" src scripts index.html`
   ger **0**.
6. **Logglänkens namn**, vid 360 × 640 och 1280 × 800: `header a[href="#hero"]` finns
   exakt en gång, har inget `aria-label`, `textContent.trim() === ''`, exakt ett
   `img` med `alt === 'Jelal Qaiumi'`, och inget `.visually-hidden`. Det beräknade
   namnet ur CDP `Accessibility.getPartialAXTree` är exakt `Jelal Qaiumi`.
7. **Naven, under 900 px**, vid 360 × 640, 390 × 844 och 899 × 700, med
   rullningslist 15 och vid 360 × 640 också med 0: loggans rektangel är 34 ± 0,5
   hög och ~~159 ± 0,5 bred~~ **RÄTTAT 2026-11-08, se M22 punkt 2:** bredden är
   ~~`img.naturalWidth / img.naturalHeight × rect.height` ± 0,5~~ **RÄTTAT
   2026-11-08, se M22 punkt 2:** `filB / filH × rect.height` ± 0,5 med filens
   verkliga pixelmått (läses ur en fristående `new Image()` med
   `src = img.currentSrc`, eftersom `naturalWidth` vid DPR 2 avrundas nedåt),
   alltså bredden för den fil som faktiskt laddats. Grinden körs vid DPR 1 och DPR 2
   (`deviceScaleFactor` i `Emulation.setDeviceMetricsOverride`), och `currentSrc`,
   DPR och den väntade bredden skrivs ut för varje mätning (vid DPR 2 är filen
   319 × 68, och då väntas 159,5). `logo.right + 16 <= knapp.left + 0,5`. Loggans vänsterkant
   och knappens högerkant ligger inom pillens content-box (rektangeln minus ram och
   padding ur `getComputedStyle`) ±0,5. Utskrift: luften `knapp.left − logo.right − 16`
   (~~förväntat ca 48 vid 360 med rullningslist, uträknat~~ **uppmätt 48 vid 360 i
   P14c, med och utan rullningslist. RÄTTAT 2026-11-08, se M22 punkt 2**).
8. **Naven, från 900 px**, vid 900 × 700, 1000 × 700 och 1280 × 800: `logo.right <= nav.left`,
   `nav.right + 16 <= cta.left + 0,5`, `cta.right` inom pillens content-box ±0,5,
   och `.navList` har `scrollWidth === clientWidth`.
9. **Låst höjd**, vid samma vyporter: pillens höjd är 58 ± 0,5 och headerns
   `--header-height` (74) enligt LARDOMAR 2026-10-02. Loggans `bottom <= pill.bottom`.
10. **Negativa kontroller i sidan**, var och en korrekt, injicerad och borttagen,
    med `querySelectorAll(sel).length === 1` bekräftat före injektionen:
    a. `header a[href="#hero"] img { width: 300px !important; height: 34px !important }`
       vid 360 × 640 → grind 7 larmar med loggan utskriven.
    b. `header a[href="#hero"] img { height: 60px !important }` → grind 9 larmar.
    c. `img.alt = ''` på loggan → grind 6 larmar.
11. **Kontrast:** punkt 6 rad 1 vid 360 × 640 och 1280 × 800, rullat som M10c rad 10.
12. **Footern** vid 360 × 640 och 1280 × 800: loggan 34 ± 0,5 hög, taglinen står
    under den, och `documentElement.scrollWidth <= clientWidth`.
13. **Favicon:** `document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')`
    ger tre element vars `href` hämtas med status 200 i `vite preview`.
14. **Bygget:** `npm run validate:data`, `npm run validate:tokens`, `npm run build`
    och `npm run lint` gröna. `dist/` ≤ 1 MB, ingen fil över 300 kB, de tre största
    redovisade, inget `logo-mark` i `dist/`, och varje fil i `dist/` har en referens
    i `src/` eller `index.html` (**UPPHÄVT i den delen 2026-11-08, se M21 punkt 4:**
    undantaget `robots.txt`. **RÄTTAT 2026-11-18, se M24 punkt 6:** referenskällorna
    är också `scripts/seo.mjs` och `public/robots.txt`).
15. `grep -rnE "[0-9]+ ?px" src/components/Header.jsx src/components/Header.module.css src/components/Footer.jsx src/components/Footer.module.css`:
    varje träff i en kommentar läses, och ett uppmätt tal skrivs om till
    invarianten (LARDOMAR 2026-10-02 och 2026-11-07).
16. Varje deklaration och markup i M20 besvaras i överlämningen med `fil:rad`
    (LARDOMAR 2026-10-05). Skärmbilder vid 360 × 640, 390 × 844, 1280 × 800 och
    footern vid 1280 × 800, med absoluta sökvägar.

**PLAN.md:** P14c står inte där. Det är projektledarens att lägga in efter P14b och
före P15, med `Ingår:` enligt tabellen ovan och grindarna som `Godkänt när:`. P15:s
förutsättning får P14c. Jag rör inte `PLAN.md`.

### M21 — prestanda före G2 (2026-11-08, genomförs i P15-fix)

**Varför:** P15 del A föll. Mobilens median var performance **86** (78/86/97),
accessibility 100, LCP 3,99 s. Kravet är 90+ (Jelals uppdrag). Datorn var 98.

**Diagnosen, läst ur rapporterna** (`p15a/mobile-1..3.json` i samordnarens
scratchpad). Inget av följande är antaget:

- LCP-elementet är heros `<img>` (`section#hero > img`). Bilden är hämtad efter
  ca 60 ms (observerat i `network-requests`), men **render delay är 74–80 % av
  LCP**. Skälet är att `#root` är tom tills bundlen har körts.
- hCaptchas `api.js` begärs efter ca 100 ms, alltså **före** LCP. Den drar med sig
  `hcaptcha.html` (214 kB överfört) och 280 ms skripttid i simulerad strypning, och
  ligger därmed i LCP:s beroendegraf. Paketet sätter in skriptet i
  `componentDidMount`, utan villkor. `loadAsync` styr bara `script.async`, inte NÄR
  skriptet laddas (läst i `node_modules/@hcaptcha/react-hcaptcha/lib/dist/esm/index.js`).
  Skriptet går alltså bara att skjuta upp genom att komponenten inte monteras.
- Den renderblockerande CSS:en är 5,3 kB. Den rörs inte i M21 (punkt 6).

#### Punkt 0 — Mätkravet (ersätter M17:s antal körningar och kategorier)

- **Fem körningar per läge**, mobil och dator. Körningarna görs i följd, en åt
  gången, mot samma `vite preview` av samma färska bygge. Redovisa **medianen per
  kategori, alla fem värdena och spridningen (min–max)**.
- **Krav:** performance-medianen ska vara **≥ 90** i båda lägena, och
  accessibility ska vara **100 i alla fem körningarna** i båda lägena.
  Best practices och SEO körs med och redovisas som UPPLYSNING. De har inget krav.
- **Varför fem:** med tre körningar och spridningen 78–97 räcker en avvikande
  körning för att flytta medianen. Med fem krävs tre avvikande.
- **Kommandot:** `npx --yes lighthouse@12 http://localhost:<port>/ --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --output=json --output-path=<scratchpad>/p15fix/mobile-<n>.json`.
  För datorn läggs `--preset=desktop` till, och filen heter `desktop-<n>.json`.
- **Ogiltig körning:** en rapport med `runtimeError`, eller med
  `categories.performance.score === null`, räknas inte. Körningen görs om, och den
  ogiltiga redovisas.
- Servern sköts enligt `netstat`-regeln (LARDOMAR 2026-10-02 och 2026-10-05).

#### Punkt 1 — hCaptcha monteras först när den behövs

**Filer:** `src/components/ContactForm.jsx`, `src/components/ContactForm.module.css`.

Den statiska importen av `HCaptcha` tas bort.
Modulnivå i `ContactForm.jsx`, tecken för tecken:

```js
import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react';

const HCaptcha = lazy(() =>
  import('@hcaptcha/react-hcaptcha').catch(() => ({ default: CaptchaUnavailable })),
);

const CAPTCHA_ROOT_MARGIN = '600px 0px';

function CaptchaUnavailable() { /* returnerar null */ }
```

I `ContactForm()`:

- `const [captchaWanted, setCaptchaWanted] = useState(false);`
- `const captchaSlotRef = useRef(null);`
- `function wantCaptcha()` anropar `setCaptchaWanted(true)` och gör inget annat.
- En `useEffect(..., [])`. Saknas `'IntersectionObserver' in window` köas
  `wantCaptcha` i en mikrotask (**ändrat 2026-11-08, P15-fix steg 1:** state sätts
  aldrig synkront i effektens kropp, regeln `react(set-state-in-effect)`). Grenen
  är tecken för tecken:

  ```js
  if (!('IntersectionObserver' in window)) {
    queueMicrotask(wantCaptcha);
    return undefined;
  }
  ```

  Ingen städfunktion i den grenen: en köad `setCaptchaWanted(true)` efter
  avmontering gör ingenting, och två körningar i StrictMode ger samma värde.
  Kommentaren ovanför effekten får invarianten "effekten sätter aldrig state
  synkront, därför köas anropet". **Valt bort:** ett lat startvärde i `useState`
  (servern saknar `window` och ger `false`, så en klient utan observer hade fått
  en skillnad vid hydreringen, M21 punkt 5), `setTimeout` (gav `no-unreachable`)
  och `oxlint-disable` (M12b punkt 3).
  Annars skapas en `IntersectionObserver` med
  `{ rootMargin: CAPTCHA_ROOT_MARGIN }` som observerar `captchaSlotRef.current`.
  Vid första `isIntersecting` anropas `wantCaptcha()` och observern kopplas från
  (`disconnect()`). Städfunktionen gör `disconnect()`.

Markup. Allt annat i formuläret är oförändrat:

```jsx
<form onSubmit={handleSubmit} onFocus={wantCaptcha} noValidate aria-busy={sending}>
  ...
  <div className={styles.captcha} ref={captchaSlotRef}>
    {captchaWanted && (
      <Suspense fallback={null}>
        <HCaptcha /* exakt dagens props: ref, sitekey, size, reCaptchaCompat, onVerify, onExpire, onError */ />
      </Suspense>
    )}
  </div>
```

- `onFocus` på `<form>`: React:s `onFocus` bubblar (focusin), så fokus i vilket
  fält som helst räcker.
- `resetCaptcha()` är oförändrad. Den anropar redan `captchaRef.current?.`, så den
  tål att widgeten inte är monterad.
- **Platsen reserveras:** `.captcha { margin-bottom: var(--space-5); min-height: <H>px; }`.
  **H mäts före ändringen** i dagens bygge, med `vite preview`, vid 360 × 640 och
  1280 × 800, sedan widgeten har laddats: `document.querySelector('form iframe').closest('div[class*="captcha"]').getBoundingClientRect().height`,
  avrundat uppåt till heltal. Skiljer sig de två värdena åt stannar steget och
  lämnas tillbaka hit. Talet står i CSS-deklarationen, aldrig i en kommentar
  (LARDOMAR 2026-10-02). Skälet: "Kontakta mig" hoppar rakt till `#contact`, och
  utan reserverad plats knuffar widgeten knappen och statusraden nedåt medan
  de syns.
- Kommentarer skrivs som invarianter: "laddas en bit innan formuläret syns, eller
  när det får fokus". Ingen px-siffra.

**Risk:** att chunken inte går att ladda. `CaptchaUnavailable` renderar då ingenting,
och ett inskick ger "Bekräfta att du är människa …". Det är samma utfall som
när `api.js` inte går att ladda i dag, och en Suspense utan felgräns hade
annars rivit hela sidan. En andra risk är att `ref` inte når klasskomponenten
genom `lazy`. Den prövas i 1g.

**Mätning** (färskt bygge, `vite preview`, vyport 412 × 823 om inget annat sägs):

| # | Kontroll | Godkänt | Negativ kontroll |
|---|----------|---------|------------------|
| 1a | Den JS-fil i `dist/assets/` som innehåller `hCaptchaOnLoad` | Exakt en fil, och det är **inte** filen som `index.html` laddar | Före ändringen: entryfilen innehåller strängen |
| 1b | Färsk laddning överst, vänta 5 s: `performance.getEntriesByType('resource')` med `hcaptcha.com`, och `form iframe` | 0 och 0 | Före ändringen: ≥ 1 och 1 |
| 1c | Rulla tills `.captcha` ligger 600 px under vyportens underkant eller närmare | `form iframe` finns inom 3 s | — |
| 1d | Färsk laddning, `document.querySelector('form input').focus({ preventScroll: true })` | `form iframe` finns inom 3 s, och `scrollY` är 0 | Utan `onFocus` på `<form>` (isolerad ändring, återställs): ingen iframe |
| 1e | `delete window.IntersectionObserver` via `Page.addScriptToEvaluateOnNewDocument` | `form iframe` finns utan att man rullat. **Mäts om efter `queueMicrotask` (2026-11-08), och `npx oxlint` ger 0 varningar och 0 fel** | Lint före ändringen: 1 varning, `react(set-state-in-effect)` |
| 1f | Höjden på `.captcha` före och efter att widgeten laddats, vid 360 × 640 och 1280 × 800 | Lika, ±0,5 px | Utan `min-height` (isolerad ändring, återställs): olika |
| 1g | Formulärflödet: tomt inskick, ifyllt inskick utan captcha, och captcha med hCaptchas testnyckel `10000000-ffff-ffff-ffff-000000000001` i ett **separat bygge** (`vite build --outDir <scratchpad>/p15fix/testkey`, nyckeln ändrad tillfälligt och återställd, `git diff --exit-code src/data/contact.js` efteråt) med ändpunkten blockerad (`Network.setBlockedURLs`) | Fyra fältfel och fokus på Namn. Statusen "Bekräfta att du är människa innan du skickar.". Med testnyckeln: iframens `data-hcaptcha-response` är ifylld efter klicket, felstatusen visas efter inskicket, och attributet är tomt igen, vilket bevisar att `resetCaptcha` nådde widgeten genom `lazy` | — |

#### Punkt 2 — projektbildens `sizes`

**Fil:** `src/components/ProjectCard.jsx`, attributet på `<img>`:

```jsx
sizes="(min-width: 900px) 380px, (min-width: 600px) 50vw, calc(100vw - 3rem)"
```

- Under 600 px är kortet en kolumn innanför sidmarginalerna, som är
  2 × `--content-padding` = 3rem. I `mobile-1` var bilden 362 px bred vid 412 px
  vyport, alltså 100vw − 50 px (de 2 px som skiljer är kortets kant). `sizes` får
  överskatta men aldrig underskatta, och 3rem överskattar med 2 px. Grenarna från
  600 px och uppåt överskattar redan och ändras inte.
- **Ingen ny bredd (t.ex. 800).** Bilden laddas lazy under vecket, och
  Lighthouse uppskattar själv effekten på LCP till högst 50 ms.
- **Mätning:** vid 360 × 640, DPR 1,75, `mobile: true` (CDP `Emulation.setDeviceMetricsOverride`),
  kortet inrullat och bilden laddad, ska `img.currentSrc` sluta på `awle-600.webp`.
  **Negativ kontroll:** med den gamla strängen blir det `awle-1200.webp`.
  **UPPLYSNING:** `currentSrc` vid 412 × 823 och DPR 1,75 (Lighthouse-läget). Där
  väntas `awle-1200`, eftersom 364 × 1,75 > 600. Inget krav.

#### Punkt 3 — `<meta name="description">` — ~~(FÖRSLAG, väntar på Jelal)~~ GODKÄND ordagrant av Jelal 2026-11-18, se M24 punkt 8

**Fil:** `index.html`, raden direkt efter `<title>`:

```html
<meta name="description" content="Jelal Qaiumi, systemutvecklare. Jag bygger webbappar och mobilappar i React, React Native och .NET, hela vägen från databas till app." />
```

- **Tillägg 2026-11-18, M24 punkt 3 och 8:** raden är enda källan för
  sidbeskrivningen. `prerender.mjs` kopierar dess `content` oförändrat till
  `og:description` vid bygget. **BESVARAD 2026-11-18:** Jelal godkände texten
  ordagrant (fråga A, stängd). Raden ändras inte.
- Texten är Jelals egen ingress ur `Hero.jsx`, med namnet och rollordet ur
  `profile.js` framför. Den innehåller inget streck (Jelals beslut 7).
  ~~**⚠️ FÖRSLAG.** Kommentaren ovanför raden säger att texten väntar på Jelals
  godkännande~~ **RÄTTAT 2026-11-18, se M24 punkt 8:** texten är godkänd, och P19c
  tar bort meningen om att den väntar på godkännande ur kommentaren. Att den
  bygger på heros ingress och ska läsas om när ingressen ändras står kvar.
  Ingressen återges inte i kommentaren.
- **Mätning:** Lighthouse-granskningen `meta-description` har `score` 1, och
  `grep -n 'name="description"' index.html | grep -P '[-\x{2010}-\x{2015}]'` ger
  0 träffar. **Negativ kontroll:** samma grep mot en kopia av raden där
  `React Native` är skrivet med bindestreck ger 1 träff.

#### Punkt 4 — `public/robots.txt` — innehållet och referensregeln RÄTTADE 2026-11-18, se M24 punkt 5 och 6

**Gäller från P19c (M24):** `robots.txt` har innehållet `robotsTxt(site.url)` ur
`scripts/seo.mjs`, alltså de två raderna nedan, en tomrad och raden
`Sitemap: https://jelalqaiumi.se/sitemap.xml`, och V8 i `validate-data.mjs`
jämför filen byte för byte. Referensregeln har fyra källor och ett undantag,
`robots.txt` (M24 punkt 6). Texten nedan beskriver P15-fix och är historik där
den är överstruken.

~~Exakt innehåll~~ (**RÄTTAT 2026-11-18, se M24 punkt 5:** de två första raderna),
LF-radslut, med radslut efter sista raden (**tillagt 2026-11-08,
se M22 punkt 4:** LF garanteras av `.gitattributes`, inte av hur filen skrevs):

```
User-agent: *
Allow: /
```

- **RÄTTAT 2026-11-18:** ~~Ingen `Sitemap`-rad, eftersom det inte finns någon sitemap och ingen fastställd
  domän.~~ **Se M24 punkt 5:** domänen är fastställd
  (`site.url`), sitemapen finns, och raden står sist i filen. Genomförs i P19c.
- **Undantag från regeln "varje fil i `dist/` har en referens"** (Leveransens
  storlek): `robots.txt` läses av sökrobotar på en fast adress och refereras
  aldrig. ~~Det är det **enda** undantaget.~~ **RÄTTAT 2026-11-18, se M24 punkt 6:**
  `robots.txt` är fortfarande den fil som ingen annan fil refererar, men
  referenskällorna är nu `src/`, `index.html`, `scripts/seo.mjs` och
  `public/robots.txt`. Regeln i LARDOMAR 2026-10-02 bör skrivas
  om med undantaget av den som äger filen. Jag rör den inte.
- **Mätning:** `curl -i http://localhost:<port>/robots.txt` ger 200,
  `Content-Type: text/plain` och exakt ~~de två raderna~~ (**RÄTTAT 2026-11-18:**
  innehållet i M24 punkt 5). Lighthouse-granskningen
  `robots-txt` har `score` 1. **Negativ kontroll:** före ändringen är kroppen
  `index.html` (börjar med `<!doctype html>`).

#### Punkt 5 — förrendering vid bygget

**Filer:** `src/prerender.jsx` (ny), `scripts/prerender.mjs` (ny), `src/main.jsx`,
`package.json`, `index.html`. **Inget nytt beroende.** `react-dom/server` ingår i
`react-dom`, och SSR-bygget är en del av `vite`.

**`src/prerender.jsx`:** importerar `StrictMode` ur `react`, `renderToString` ur
`react-dom/server` och `App` ur `./App.jsx`. Den enda exporten är
`export function render()`, som returnerar `renderToString(<StrictMode><App /></StrictMode>)`
(en `string`). Ingen CSS-import. Ingenting i `src/` importerar filen.

**`scripts/prerender.mjs`:** inga exporter. Körs som `node scripts/prerender.mjs`.
Alla fel skrivs som `prerender: <vad som är fel>` och ger exitkod 1. Varje läsning,
`build()` och `import()` ligger i `try/catch` och översätts till det formatet
(LARDOMAR 2026-10-05). Ordningen:

1. Läs `dist/index.html`. Saknas filen: `prerender: dist/index.html saknas (kör vite build först)`.
2. Markören är `` `<div id="${ROOT_ID}"></div>` ``, där `ROOT_ID` importeras ur
   `src/data/sections.js`. Dela filen med `split(markör)`. Blir det inte exakt 2
   delar: `prerender: dist/index.html: markören <div id="…"></div> finns N gånger, ska finnas 1`.
3. Kör SSR-bygget med Vites JS-API `build()`:
   `{ logLevel: 'warn', build: { ssr: 'src/prerender.jsx', outDir: 'node_modules/.cache/prerender', emptyOutDir: true, copyPublicDir: false, minify: false } }`.
   Projektets `vite.config.js` läses som vanligt. Utkatalogen ligger under
   `node_modules` så att `react` och `react-dom` hittas därifrån, och den är redan
   git-ignorerad.
4. Utkatalogens rot ska innehålla exakt en `.js`- eller `.mjs`-fil. Den importeras
   med `pathToFileURL`, och `render()` anropas.
5. GRINDAR mot den renderade strängen `html`:
   - **G1:** exakt ett `<h1`.
   - **G2:** `` `id="${HERO_ID}"` `` förekommer exakt en gång.
   - **G3:** varje klassnamn i varje `class="…"` finns som selektor `.<namn>`,
     följt av ett tecken som inte får ingå i ett klassnamn, i den sammanlagda
     texten av `dist/assets/*.css`. Annars:
     `prerender: klassen <namn> finns inte i bygget CSS (SSR- och klientbygget har olika klassnamn)`,
     med högst tio namn. Grinden fångar att SSR-bygget hashar CSS Modules
     annorlunda än klientbygget. **Legitim ändring som får fälla den:** en klass
     utan regel, och det är ett dött klassnamn som ska bort.
   - **G4:** `html` innehåller inte `hcaptcha` (skiftlägesokänsligt).
6. Ny fil = `delar[0] + '<div id="' + ROOT_ID + '">' + html + '</div>' + delar[1]`.
   **Aldrig `String.replace` med en sträng som ersättning**, eftersom `$` i den
   renderade texten då tolkas som mönster.
7. Skriv till `node_modules/.cache/prerender/index.html` och flytta sedan till
   `dist/index.html` med `renameSync` (LARDOMAR 2026-10-02: skriv till en
   temporärkatalog och flytta först när allt har gått igenom).
8. `finally`: `rmSync('node_modules/.cache/prerender', { recursive: true, force: true })`.

UPPLYSNING-raden: antalet tecken i `html`. Fallerar något steg är `dist/index.html`
byte-identisk med hur den var före körningen.

**`package.json`**, scriptet `build`, tecken för tecken:

```json
"build": "node scripts/validate-data.mjs && node scripts/validate-tokens.mjs && vite build && node scripts/prerender.mjs"
```

Inget nytt npm-script.

**`src/main.jsx`:** `import { createRoot, hydrateRoot } from 'react-dom/client';`.
`enableReveal()` anropas först, som i dag. Därefter
`const container = document.getElementById(ROOT_ID);`. Är
`container.firstElementChild !== null` anropas `hydrateRoot(container, <StrictMode><App /></StrictMode>)`,
annars `createRoot(container).render(<StrictMode><App /></StrictMode>)`. I bygget
är roten fylld och hydreras. I `npm run dev` är den tom och renderas som i dag.

**`index.html`:** `<noscript>` står kvar på sin plats med den nya texten, tecken
för tecken:

> Menyn, projektfiltret och kontaktformuläret behöver JavaScript. Slå på
> JavaScript i webbläsaren och ladda om sidan.

Kommentarsblocket ovanför skrivs om till invarianten: sidan förrenderas och syns
utan JavaScript, men det som är interaktivt kräver JavaScript. Ingen mening om
att sidan "blir blank". Preloaden av heros bild står kvar oförändrad.

**Hydreringens villkor:** varje komponents rendering ska vara ren. `window`,
`document` och `matchMedia` får bara läsas i effekter och händelsehanterare,
aldrig i rendering eller i en `useState`-initierare. Så är det i dag. Sökt med
`grep -rn "window\.\|document\.\|matchMedia" src`: varje träff ligger i en
effekt, en hanterare eller i `main.jsx`.

**Risker:** en hydreringsavvikelse, som React 19 tar igen genom att rendera om
på klienten med ~~ett konsolfel~~ ett okastat fel (**RÄTTAT 2026-11-08, se M22
punkt 1:** i produktion kommer det som `Runtime.exceptionThrown`,
`Minified React error #418`, och inte i konsolen). Mäts i 5c. Ett `.reveal`-element i första vyn
som blinkar, eftersom det syns i den förrenderade sidan och döljs när
`enableReveal()` körs. Mäts i 5e. Och ett SSR-bygge som hashar klassnamnen
annorlunda. Fångas av G3.

**Mätning:**

| # | Kontroll | Godkänt | Negativ kontroll |
|---|----------|---------|------------------|
| 5a | `npm run build` | Grön. `dist/index.html` har exakt ett `<h1` och `hero-1440.webp` inuti `#root` | — |
| 5b | JS avstängt (`Emulation.setScriptExecutionDisabled({ value: true })`) | `h1` har höjd > 0, heros `img.complete && naturalWidth > 0`, `<noscript>`-texten syns, inget `.reveal` har `opacity` 0 | Ett bygge utan prerender-steget: `#root` är tom |
| 5c | **UPPHÄVD 2026-11-08, se M22 punkt 1** (grinden kunde inte larma i produktion). ~~JS på. `Runtime.consoleAPICalled` och `Log.entryAdded` samlas från navigeringen tills sidan rullats till botten~~ | ~~0 poster av typen error, och 0 poster på någon nivå som matchar `/hydrat\|did not match\|mismatch/i`~~ | ~~En kopia av `dist/` … ≥ 1 träff~~. Den gällande grinden, med tre källor och den negativa kontrollen, står i M22 punkt 1 |
| 5d | Nätverket vid en laddning | Exakt en begäran mot `/assets/hero/` | — |
| 5e | JS avstängt, `scrollY` 0, vid 360 × 640, 412 × 823, 1280 × 800, 1350 × 940 och 1600 × 900: antalet `.reveal` med `getBoundingClientRect().top < innerHeight` | 0 i varje vyport. Annars stannar steget och lämnas tillbaka hit | — |
| 5f | Grindarna, var och en med tre indata (LARDOMAR 2026-10-05): korrekt, fel och åtgärden som felmeddelandet föreskriver | Markören borttagen ur `dist/index.html` efter `vite build`: körningen fallerar och sha256 för `dist/index.html` är oförändrad. `vite build` igen: tyst. G1 och G3 prövas i en isolerad kopia av skriptet, som lägger till `<h1>x</h1>` respektive `<span class="zz-saknas">`: körningen fallerar och felet nämner `zz-saknas` | (detta är den negativa kontrollen) |
| 5g | Efter körningen, både lyckad och fallerad | `node_modules/.cache/prerender` finns inte. Fillistan i `dist/` är densamma som före P15-fix, plus `robots.txt` | — |
| 5h | Lighthouse `largest-contentful-paint-element` | Render delay < 30 % av LCP i medianrapporten (UPPLYSNING, ger skälet om punkt 0 faller) | Rapporterna i `p15a`: 74–80 % |

#### Punkt 6 — avvisat nu

- **Inlinad eller kritisk CSS.** Vite har inget inbyggt för det, och det behövs
  inte förrän mätningen visar det. Faller punkt 0 efter steg 4 lämnas
  rapporterna tillbaka hit. Inlinad CSS är då nästa kandidat, men den är inte
  beslutad.
- **`hero-1440` "13 kB för stor".** `sizes` beskriver den ritade bredden, eftersom
  `object-fit: cover` ritar bilden bredare än lådan (M10c, M10d). Lighthouse mäter
  lådan. Ingen ändring.
- **Statisk kopia av hero i `index.html`, och heros `<img>` utanför `#root`.** Se
  Teknikval, raden "Förrendering vid bygget".
- **`sentry={false}` och andra hCaptcha-props.** De behövs inte för kravet.

#### Punkt 7 — paketet P15-fix, fyra steg

Varje steg är ett eget byggaruppdrag och slutar med `npm run build` och
`npm run lint` gröna, `netstat` före start och efter stopp, en `grep` efter
`[0-9]+ ?px` i de kommentarer steget har rört (LARDOMAR 2026-11-07), och
`fil:rad` för varje deklaration i sin punkt (LARDOMAR 2026-10-05).

| Steg | Innehåll | Filer | Klart när |
|------|----------|-------|-----------|
| 1 | hCaptcha (punkt 1). H mäts **först**, i dagens bygge | `ContactForm.jsx`, `ContactForm.module.css` | 1a–1g redovisade |
| 2 | `sizes`, `description`, `robots.txt` (punkt 2–4) | `ProjectCard.jsx`, `index.html`, `public/robots.txt` | Mätningarna i punkt 2–4 redovisade |
| 3 | Förrendering (punkt 5) | `src/prerender.jsx`, `scripts/prerender.mjs`, `package.json`, `src/main.jsx`, `index.html` | 5a–5g redovisade |
| 4 | Lighthouse enligt punkt 0 | inga | Kravet i punkt 0 uppfyllt, och 5h redovisad. Annars lämnas rapporterna tillbaka hit |

Därefter körs **resten av P15 (punkt 1–3 och 5–7)** på det färska bygget från
steg 4, eftersom steg 3 ändrar `index.html` och `main.jsx`.
`PLAN.md` är projektledarens. Jag rör den inte.

### M22 — rättningar efter G2 (2026-11-08, genomförs i G2-rättning)

**Varför:** G2 gav EJ GODKÄND. Fynden står i `LARDOMAR.md`, posterna daterade
2026-11-08. Fyndet om de sex kommentarerna rättas av en byggare för sig och står
inte här. `PLAN.md` rättas av projektledaren. Varje äldre stycke som krockar är
rättat eller märkt på sin plats (se M-översikten, raden M22).

Samordnarens scratchpad, där all utdata i detta avsnitt sparas under `g2fix\`:
`C:\Users\qaium\AppData\Local\Temp\claude\C--Users-qaium-source-repos-Portfoolie-Jelalq\2976d642-d53a-4f4f-b63b-0cbef3977385\scratchpad`.
Granskarens prov ligger i `g2\hyd.mjs` där, och 5c utgår från det.

#### Punkt 1 — grinden 5c lyssnar på tre källor (ersätter M21 5c)

I produktion rapporterar React 19 en hydreringsavvikelse med `reportError`. Den når
bara `Runtime.exceptionThrown`, som `Minified React error #418`. Den gamla grinden
lyssnade inte där.

**Upplägget** (färskt bygge, `vite preview`, `netstat`-regeln):

- `Runtime.enable`, `Log.enable`, `Network.enable` och `Page.enable` skickas **före**
  `Page.navigate`. Cachen är avstängd (`Network.setCacheDisabled`).
- ~~`Fetch.enable` med mönstren `*hcaptcha*` och `*web3forms*`~~ **RÄTTAT
  2026-11-08:** `Fetch.enable` med **bara** mönstret `*web3forms*`, och varje
  `Fetch.requestPaused` får `Fetch.failRequest` med `BlockedByClient`, som i
  `hyd.mjs`. hCaptcha blockeras inte. Med `*hcaptcha*` blockerat monteras widgeten
  vid botten, `api.js` saknas, och `@hcaptcha/react-hcaptcha` skriver
  `console.error "Failed to send event to Sentry"`. Det fäller villkor 2 på ett fel
  som provet självt har skapat och som inte finns på den riktiga sidan. Uppmätt:
  med bara `*web3forms*` blockerat är alla fem talen 0
  (`g2fix\5c-diag-hcaptcha-oblockerad-412.json`).
- **Tillagt 2026-11-08, giltighetsvillkor:** i varje vyport ska utdata visa att
  hCaptchas `api.js` laddades (`Network.responseReceived` med status 200 för en
  `url` som innehåller `hcaptcha.com` och `api.js`). Saknas det är körningen
  **ogiltig**, varken godkänd eller underkänd, och körs om. Så skiljs ett
  nätverksfel hos tredje part från ett fel i koden.
- Tre källor samlas från navigeringen tills sidan rullats till botten och 3 s har
  gått: `Runtime.exceptionThrown` (texten är
  `exceptionDetails.exception?.description ?? exceptionDetails.text`),
  `Runtime.consoleAPICalled` (argumentens `value ?? description`) och
  `Log.entryAdded` (`entry.text`).
- Mönstret, enligt LARDOMAR 2026-11-08: `/hydrat|did not match|mismatch|#41[89]|#42[1-5]/i`.
  Det täcker #418, #423 och #425.
- Vyporter: 412 × 823 (`mobile: true`) och 1280 × 800.

**Godkänt**, i varje vyport:

1. 0 `Runtime.exceptionThrown`, oavsett text.
2. 0 `Runtime.consoleAPICalled` av typen `error`.
3. 0 `Log.entryAdded` på nivån `error`, utom poster med `source: 'network'` vars
   `url` matchar ~~något av de två avbrutna mönstren~~ **RÄTTAT 2026-11-08:** det
   avbrutna mönstret `*web3forms*`. De undantagna räknas upp i utdata.
4. 0 poster i någon av de tre källorna, på någon nivå, som matchar mönstret.
5. `h1.textContent` efter laddningen är samma som i den förrenderade
   `dist/index.html`.

Utdata: `g2fix\5c-real-412.json` och `g2fix\5c-real-1280.json`, med de tre
källorna, de fem talen och undantagen.

**Negativ kontroll** (detta är det som saknades): kopiera `dist/` till
`g2fix\dist-neg\`. Ändra `h1`-texten inuti `#root` i kopians `index.html` (lägg
till ` X` sist i rubriken). Servera med
`npx vite preview --outDir <kopia> --port 4347`, och kör samma prov vid 412 × 823
(**RÄTTAT 2026-11-08:** med samma blockering som det riktiga provet, bara
`*web3forms*`, så att kontrollen prövar just den uppställning som ska godkännas).
**Godkänt:** villkor 1 och 4 fäller (≥ 1 `exceptionThrown` som matchar mönstret,
väntat `#418`), och utdata anger den posten. `h1` efter laddningen är källtexten,
utan ` X`. Utdata: `g2fix\5c-neg.json`. Därefter stoppas servern, porten bekräftas
fri med `netstat`, och kopian raderas.

#### Punkt 2 — de orättade talen i M20

- **Uträkningen i M20 punkt 3:** "utan rullningslist 63 px" är ersatt på plats av
  det uppmätta 48 px. Rännan är reserverad av `scrollbar-gutter: stable`, så
  `clientWidth` är 345 med och utan rullningslist. M20-tabellens rad 3 och grind 7:s
  utskrift är rättade på samma sätt.
- **M20 grind 7:** ~~bredden jämförs med
  `img.naturalWidth / img.naturalHeight × rect.height` ± 0,5~~ **RÄTTAT
  2026-11-08:** bredden jämförs med `filB / filH × rect.height` ± 0,5, där `filB`
  och `filH` är filens verkliga pixelmått för den fil som faktiskt laddats
  (`currentSrc`). De läses med en fristående bild utan `srcset`:
  `const probe = new Image(); probe.src = img.currentSrc; await probe.decode();`,
  och `filB = probe.naturalWidth`, `filH = probe.naturalHeight`. Utan `srcset` har
  bilden densiteten 1, så måtten är filpixlar. Grinden körs vid DPR 1 och DPR 2,
  och utskriften visar `currentSrc`, `filB × filH`, `img.naturalWidth` och den
  väntade bredden. ~~Kvoten är densamma oavsett om webbläsaren redovisar
  `naturalWidth` i filpixlar eller delat med densiteten, eftersom båda måtten
  delas på samma sätt.~~ **RÄTTAT 2026-11-08, påståendet var falskt:** Chrome
  avrundar det densitetskorrigerade måttet nedåt till heltal. För
  `jq-logo-68.png` (319 × 68) vid DPR 2 redovisas `naturalWidth` 159 och
  `naturalHeight` 34, så kvoten blir 159/34 och den väntade bredden 159,0 mot en
  rect på 159,5. Skillnaden 0,5 låg exakt på gränsen. Med filens mått väntas
  319/68 × 34 = 159,5. **Valt bort:** en tolerans per DPR, eftersom den måste
  skrivas om varje gång en ny fil genereras, och en vidgad tolerans
  ±(0,5 + 1/DPR), eftersom den mäter samma felaktiga kvot och bara gömmer
  avrundningen i en bredare marginal.
- **Mätningen i G2-rättning:** grind 7 körs om vid 360 × 640, 390 × 844 och
  899 × 700, DPR 1 och 2, och `currentSrc` slutar på `jq-logo-34.png` respektive
  `jq-logo-68.png`. **Negativ kontroll:** M20 grind 10a (bredden 300 px) larmar
  vid båda DPR-värdena.

#### Punkt 3 — honeypoten läses, och stoppar inskicket tyst

**Beslut:** i `handleSubmit` i `src/components/ContactForm.jsx` läses rutan
**direkt efter captcha-kontrollen** (efter `if (captchaToken === '') { … return; }`,
före `setErrors({}); setState('sending');`). Villkoret är tecken för tecken:

```js
if (event.currentTarget.elements.botcheck.checked) {
```

Är rutan ikryssad görs exakt detta och inget annat: `setErrors({})`,
`setState('sent')`, `setValues(EMPTY)` och `resetCaptcha()`, sedan `return`.
Ingen `fetch`. Läsningen sker före varje `await`, så `event.currentTarget` är
fortfarande formuläret.

- **`botcheck` tas bort ur JSON-kroppen.** När ett ikryssat inskick aldrig skickas
  är fältets värde i kroppen alltid falskt, och då vore det åter en konstant
  (LARDOMAR 2026-11-08).
- **Kryssrutan är oförändrad**, med `name="botcheck"`, `tabIndex={-1}`,
  `aria-hidden="true"` och klassen `.honeypot`. Den förblir okontrollerad (inget
  `checked` eller `onChange`), eftersom den läses ur DOM.
- **Kommentaren** på `:209-211` tas bort med fältet. Ovanför den nya grenen står
  invarianten: "Honeypoten läses ur formuläret vid inskicket. Är den ikryssad
  skickas ingenting, och formuläret visar samma tack som efter ett lyckat
  inskick, så att den som fyllt i den inte får veta något. Beslutat i
  ARKITEKTUR.md: M22 punkt 3." Kommentaren vid rutan (`:313-316`) behålls och får
  meningen "Den läses i handleSubmit."
- **Varför tyst stopp och inte `botcheck: true` i kroppen:** Web3Forms
  dokumenterar `botcheck` för ett vanligt HTML-formulär. Hur tjänsten tolkar ett
  JSON-booleskt värde har ingen här prövat. Ett stopp i klienten beror inte på
  det, och det drar inte heller av på månadstaket på 250 meddelanden. **Varför
  "tack" och inte ett fel:** ett fel lär roboten att något stoppade den.
- **Varför efter captcha-kontrollen:** fram till nätverket ser flödet likadant ut
  för en robot och en människa. Det skiljer sig först där inskicket skulle ha gått
  iväg.

**Mätning**, i ett separat bygge med hCaptchas testnyckel, som i M21 1g
(`npx vite build --outDir <scratchpad>\g2fix\testkey`, nyckeln i
`src/data/contact.js` ändrad tillfälligt och återställd, och
`git diff --exit-code src/data/contact.js` efteråt). Servera med
`vite preview --outDir`. `Fetch.enable` med mönstret `*api.web3forms.com*`, och varje
`Fetch.requestPaused` räknas, dess `request.postData` sparas och begäran får
`Fetch.failRequest`. **RÄTTAT 2026-11-08:**
formuläret skickar JSON till en annan origin, så den första avlyssnade begäran är
en CORS-preflight (`OPTIONS`) utan kropp. Följs texten ordagrant avbryts
preflighten och någon `POST` skickas aldrig. Varje `Fetch.requestPaused` delas
därför upp efter `request.method`: **`OPTIONS`** besvaras lokalt med
`Fetch.fulfillRequest`, `responseCode: 204` och huvudena
`Access-Control-Allow-Origin: http://localhost:<port>`,
`Access-Control-Allow-Methods: POST` och
`Access-Control-Allow-Headers: Content-Type, Accept`. **`POST`** får
`Fetch.failRequest` med `errorReason: 'BlockedByClient'`, och dess
`request.postData` sparas. "1 avlyssnad begäran" i tabellen nedan räknas **bara
på `POST`**, och preflighten räknas inte. Byggarens `scratchpad\g2fix\hp.mjs` gör
så. Fälten fylls med det inbyggda `value`-settern och en
bubblande `input`-händelse. Captchan löses med testnyckelns klick. Svar läses
3 s efter klicket på knappen.

| # | Prov | Godkänt |
|---|------|---------|
| H0 | **Negativ kontroll, före ändringen:** dagens kod i testkey-bygget, rutan kryssad med `document.querySelector('form input[name="botcheck"]').checked = true`, fälten ifyllda, captchan löst, inskick | 1 avlyssnad begäran, och `postData` innehåller `"botcheck":""`. Det visar att proven ser en begäran och att rutan inte lästes |
| H1 | Efter ändringen, rutan **inte** kryssad, samma flöde | 1 avlyssnad begäran. `JSON.parse(postData)` saknar nyckeln `botcheck`. Statusen är felmeddelandet, eftersom begäran avbröts |
| H2 | Efter ändringen, rutan kryssad via DOM som i H0, samma flöde | **0** avlyssnade begäranden. Statusen är exakt `Tack! Jag återkommer så snart jag kan.`, och alla fem fälten är tomma |
| H3 | Tangentbord från Namn och framåt med Tab | Rutan får aldrig fokus (oförändrat krav ur kontaktformulärets "Verifiering", punkten "Honeypot") |

Utdata: `g2fix\honeypot-H0.json` till `H2.json`. Testkey-byggena raderas efteråt.

#### Punkt 4 — `.gitattributes`

**Ny fil i repots rot**, exakt innehåll, LF-radslut:

```
# Radslut och binarfiler. Beslutat i ARKITEKTUR.md: M22 punkt 4.
# robots.txt levereras med LF oavsett core.autocrlf (M21 punkt 4).
public/robots.txt text eol=lf
*.webp binary
*.png binary
*.jpg binary
*.woff2 binary
```

- **Ingen `* text=auto eol=lf`.** Den hade ändrat attributen för varje textfil i
  repot, och varje fil som ligger med CRLF i indexet hade då visats som ändrad och
  krävt en omnormalisering. Inget krav i projektet gäller radslutet i andra filer
  än `robots.txt` (**RÄTTAT 2026-11-18, se M24 punkt 5:** och `sitemap.xml`, som
  får en egen rad i `.gitattributes`. Filens nya exakta innehåll står där, och
  blocket ovan är historik från G2-rättning).
- **`binary` på bildfilerna och typsnitten** gör uttryckligt det git i dag gissar.
  Det ändrar inga befintliga filer, eftersom git redan behandlar dem som binära.
  `*.jpg` tas med för källbilderna i `assets-source/`.
- Kommentarerna saknar å, ä och ö med avsikt (`binarfiler`): filen läses av git
  och ska vara ren ASCII.

**Mätning:**

1. `git ls-files --eol public/robots.txt` visar `i/lf`, `w/lf` och
   `attr/text eol=lf`.
2. `git check-attr binary public/assets/jq-logo-34.png public/assets/hero/hero-960.webp assets-source/hero-portrait.jpg src/styles/fonts/manrope-latin-var.woff2`
   ger `binary: set` för alla fyra.
3. `git status --porcelain` före och efter att filen lagts till skiljer sig bara
   på raden `?? .gitattributes`. Ingen befintlig fil blir ändrad av attributen.
4. **Färsk utcheckning:** `git clone -c core.autocrlf=true . <scratchpad>\g2fix\clone`.
   Kopiera `.gitattributes` in i klonen, radera klonens `public/robots.txt` och kör
   `git -C <klon> checkout -- public/robots.txt`. `od -c` på filen visar inget `\r`.
   **Negativ kontroll:** samma steg utan `.gitattributes` i klonen ger `\r\n` på båda
   raderna. Klonen raderas efteråt.
5. När ändringen är incheckad (av den som checkar in, inte av byggaren) körs
   steg 4 utan att kopiera filen: en färsk klon ger `robots.txt` utan `\r`.

#### Punkt 5 — bygget jämför heros preload med `HERO_IMAGE_WIDTHS`

**Valt:** en grind i `scripts/validate-data.mjs`, inte bara en uppräkning i
kommentaren. Med enbart en kommentar hade preloaden kunnat glida isär utan att
något larmar, och då hämtas bilden två gånger. **Valt bort:** `prerender.mjs`, som
körs först efter `vite build`. Felet ska stoppa bygget innan något byggs, och
`validate-data.mjs` läser redan `profile.js`.

**Ny funktion** i `scripts/validate-data.mjs`, intill `checkProfile`:

```js
/** @param {unknown} widths  HERO_IMAGE_WIDTHS ur profile.js. */
function checkHeroPreload(widths) /* : void */
```

Den anropas som **första rad** i `checkProfile`, med
`checkHeroPreload(mod.HERO_IMAGE_WIDTHS)`, så att den körs även när `profile`
fälls. Ordningen, och varje meddelande tecken för tecken:

1. `widths` ska vara en lista med minst två element, och varje element ett
   positivt heltal (`Number.isInteger(w) && w > 0`). Annars
   `profile.js: HERO_IMAGE_WIDTHS saknas eller är inte en lista med minst två positiva heltal`,
   och funktionen avslutas utan följdfel. Minst två, eftersom `Hero.jsx` läser
   `HERO_IMAGE_WIDTHS[1]`.
2. Läs `join(PROJECT_ROOT, 'index.html')` med `readFileSync` i `try/catch`. Vid fel:
   `index.html: filen kunde inte läsas (${error.message})`, och avsluta.
3. Hitta varje tagg som matchar `/<link\b[^>]*>/g` och som innehåller både
   `rel="preload"` och `as="image"`. Är antalet inte exakt 1:
   `index.html: heros preload (<link rel="preload" as="image">) finns ${n} gånger, ska finnas 1`,
   och avsluta.
4. Väntad `imagesrcset`:
   `` widths.map((w) => `/assets/hero/hero-${w}.webp ${w}w`).join(', ') ``. Den
   faktiska läses med `/\bimagesrcset="([^"]*)"/`, och saknas attributet är den
   `(saknas)`. Är de inte exakt lika:
   `index.html: preloadens imagesrcset är "${faktisk}", men HERO_IMAGE_WIDTHS i profile.js ger "${väntad}". Skriv in den väntade strängen i imagesrcset i index.html.`
5. Väntad `href`: `` `/assets/hero/hero-${widths[1]}.webp` ``. Den faktiska läses
   med `/\shref="([^"]*)"/`, och saknas attributet är den `(saknas)`. Är de inte lika:
   `index.html: preloadens href är "${faktisk}", men Hero.jsx laddar "${väntad}" (HERO_IMAGE_WIDTHS[1]). Skriv in den väntade sökvägen i href i index.html.`
6. Går allt igenom: `summary.push('heros preload stämmer med HERO_IMAGE_WIDTHS')`.

Sökvägsmönstret `/assets/hero/hero-<w>.webp` står nu både i `Hero.jsx`
(`heroImageSrc`) och i grinden. Byts det i `Hero.jsx` utan att grinden ändras
fäller grinden bygget, så att glida isär larmar i stället för att tiga.
`imagesizes` jämförs inte. Den står i `Hero.jsx` (`HERO_IMAGE_SIZES`) och kan
inte läsas av ett Node-skript utan JSX. Kommentarerna fortsätter att bära den
regeln. `width="1672" height="941"` i `Hero.jsx` är källbildens format och inte
en av bredderna, så de ingår inte i löftet.

**Kommentaren i `src/data/profile.js:26-27`**, tecken för tecken:

```js
/* Bredderna som bildskriptet genererar och som hero läser. Samma bredder står i
 * preloaden i index.html (imagesrcset och href). Ändra båda i samma redigering,
 * och kör sedan npm run optimize:images. Bygget stannar om preloaden inte
 * stämmer med listan. Skälet står i ARKITEKTUR.md, M10c och M22 punkt 5. */
```

**Kommentaren i `index.html:22-26`** får en sista mening: "Bygget stannar om
imagesrcset eller href inte stämmer med HERO_IMAGE_WIDTHS i src/data/profile.js.
imagesizes kontrolleras inte." **Kommentaren i `Hero.jsx:35-36`** får samma
mening.

**Mätning**, med `node scripts/validate-data.mjs`. Varje ändring görs i
arbetsträdet och återställs, och `git diff --exit-code src/data/profile.js index.html`
ger 0 efteråt. Varje prov med tre indata: korrekt, fel och åtgärden som
meddelandet föreskriver (LARDOMAR 2026-10-05):

| # | Indata | Godkänt |
|---|--------|---------|
| V1 | Oförändrat | Exitkod 0, och raden `heros preload stämmer med HERO_IMAGE_WIDTHS` står i OK-utskriften |
| V2 | `HERO_IMAGE_WIDTHS = [960, 1440, 1600]` | Exitkod 1, och imagesrcset-meddelandet med båda strängarna. **Åtgärden:** den väntade strängen inskriven i `imagesrcset` i `index.html` → exitkod 0. `npm run build` med bara `profile.js` ändrad stannar med exitkod 1, och `dist/` har samma mtime som före |
| V3 | `href` i preloaden ändrad till `/assets/hero/hero-960.webp` | Exitkod 1, och href-meddelandet. Återställd → exitkod 0 |
| V4 | Preloadraden kopierad, så att den står två gånger | Exitkod 1, och `finns 2 gånger, ska finnas 1` |
| V5 | `HERO_IMAGE_WIDTHS = [960]` | Exitkod 1, exakt ett meddelande från grinden (listmeddelandet), inget imagesrcset-meddelande |

#### Punkt 6 — brytpunktslistan i `tokens.css` (tillagd 2026-11-08 på samordnarens begäran)

`src/styles/tokens.css:14-15` säger att `sm` ger "större hero-typografi", men
`Hero.module.css` har ingen fråga på 600 px (rubriken skalas med `clamp()`). Vid
600 byter i stället `Footer`, `Projects` och `Skills` läge. Listan var föreskriven
här, i "Brytpunkter", och är rättad där.

**Beslut:** listan anger brytpunktens **avsikt** och räknar inte upp vilka
moduler som använder den. Det var uppräkningen som blev falsk.

**`src/styles/tokens.css:10-16` ersätts**, tecken för tecken (raderna `*` och
`Golvet är …` under står kvar):

```css
 * Brytpunkter: CSS-variabler fungerar inte i @media, så dessa är fasta tal.
 * Använd exakt dessa, inga andra. Vilka moduler som byter läge vid en
 * brytpunkt står i modulerna själva (sök på "@media" i src/components) och
 * räknas inte upp här: en uppräkning blir fel så fort en modul ändras.
 *
 *   (bas)                              360-599 px. En kolumn överallt.
 *   @media (min-width: 600px)    sm    Första breddsteget: rutnät och rader får gå från en kolumn till två
 *   @media (min-width: 900px)    md    Andra breddsteget: naven visas i stället för menyknappen, sektionerna får sin breda layout
 *   @media (min-width: 1200px)   lg    Reserverad. Maxbredden kommer från sitt token, inte från en brytpunkt
```

**Mätning:**
- `grep -rn "hero-typografi" src ARKITEKTUR.md` ger bara den överstrukna raden i
  "Brytpunkter", denna punkt och M22:s beslutslogg. Ingen träff i `src`.
- `grep -rnE "min-width: [0-9]+px" src --include=*.css` ger bara `600px` och
  `900px` i modulerna, och `600px`, `900px` och `1200px` i kommentaren i
  `tokens.css`. Ett annat tal är ett fynd.
- Sanningen i `sm`-raden: varje träff på `min-width: 600px` i `src/components`
  ändrar `grid-template-columns` från en kolumn till fler. Redovisas med `fil:rad`.

#### Exakt vad G2-rättning ändrar

Förutsättning: byggarens kommentarsrättning (LARDOMAR 2026-11-08, "sex
kommentarer") är överlämnad, eller görs av samma byggare i samma pass.
`ContactForm.jsx` och `Hero.jsx` rörs av båda, och två byggare redigerar aldrig
samma fil samtidigt.

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/ContactForm.jsx` | Honeypot-grenen efter captcha-kontrollen, `botcheck` och dess kommentar ur kroppen, kommentaren vid rutan kompletterad | 3 |
| `scripts/validate-data.mjs` | `checkHeroPreload(widths)`, anropad först i `checkProfile` | 5 |
| `src/data/profile.js` | Kommentaren `:26-27`, tecken för tecken | 5 |
| `index.html` | En mening sist i kommentaren `:22-26` | 5 |
| `src/components/Hero.jsx` | En mening sist i kommentaren `:35-36` | 5 |
| `.gitattributes` | Ny, exakt innehåll | 4 |
| `src/styles/tokens.css` | Kommentaren `:10-16`, brytpunktslistan, tecken för tecken | 6 |

**Rörs inte:** `public/robots.txt` (den är redan LF i arbetsträdet), `package.json`,
`prerender.mjs`, `ContactForm.module.css`, `PLAN.md`, `LARDOMAR.md`. Punkt 1 och 2
ändrar ingen kod, bara grindarna, och körs mot det färska bygget efter ändringarna.

**Grindar för G2-rättning:**

1. Punkt 1: 5c godkänt i båda vyportarna, och den negativa kontrollen larmar. Sökvägarna
   till de tre JSON-filerna anges.
2. Punkt 2: M20 grind 7 vid DPR 1 och 2 med `currentSrc` utskriven, och grind 10a
   larmar.
3. Punkt 3: H0–H3.
4. Punkt 4: mätningens steg 1–4. Steg 5 redovisas av den som checkar in.
5. Punkt 5: V1–V5. Punkt 6: de tre mätningarna där.
6. `npm run validate:data`, `npm run validate:tokens`, `npm run build` och
   `npm run lint` gröna. Servern startad och stoppad enligt `netstat`-regeln.
7. ~~`grep -rn "ändra bara här" src index.html`~~ **RÄTTAT 2026-11-08:**
   `grep -n "ändra bara här" src/data/profile.js index.html src/components/Hero.jsx`
   och `grep -rn "botcheck: ''" src` ger 0. Greppet gäller bara de filer som bär
   heros löfte, alltså de som M22 punkt 5 ändrar. Träffen i `src/data/projects.js`
   (löftet om `PROJECT_IMAGE_WIDTHS`) är ett annat löfte, prövat sant i
   G2-rättning (bredderna läses bara via import och står inte för hand någon
   annanstans), och den ingår inte i grinden. Kommentarsgrepen ur LARDOMAR 2026-11-08 ("sex kommentarer") körs mot de
   ändrade filerna, och varje träff redovisas med `fil:rad`.
8. `grep -n "63 px\|159 ± 0,5\|did not match\|avvisar inlägg där" ARKITEKTUR.md PLAN.md`:
   varje träff i `ARKITEKTUR.md` ligger i M22 eller dess beslutslogg, eller är
   överstruken och märkt `RÄTTAT` eller `UPPHÄVD` 2026-11-08. En träff i `PLAN.md` lämnas till projektledaren (LARDOMAR 2026-11-08,
   "en rättad grind står orättad").
9. Varje beslut i M22 besvaras i överlämningen med `fil:rad` (LARDOMAR 2026-10-05).

### M23 — ljusa sektioner efter loggan (Jelals beslut 9, 2026-11-08, genomförs i P18)

**Underlag:** `UPPDRAG-2026-11-07.md`, beslut 9, som är bindande: ljusa sektioner
växlar med mörka. Nav och hero förblir mörka. **Projekt** och **Om mig** får
loggans varma ljusa botten `#f6f4f0` (uppmätt i `assets-source/jq-logo-light.png`)
och mörk text `#141414`. Kompetenser, kontakt och footer förblir mörka. Sidans
ordning är hero, projekt, kompetenser, om mig, kontakt, alltså mörk, ljus, mörk,
ljus, mörk.

**Detta avsnitt upphäver**, märkt på sin plats: M2 (premissen "mörk rakt igenom"
och följden för sektionsavgränsarna), raderna om `surface-light` och `#D9D9DE` i
tabellen över förbjudna strängar, M-översiktens rad M2, M6:s deklaration av
pillens bakgrund, M11:s deklaration av `.segment[aria-pressed='true']`, M13:s och
komponenttabellernas signatur för `Section`, "Sektionsavgränsare" (linjen vid
ytbyte), den öppna punkten om den ljusa ytans placering och M2:s rad i
beslutsloggen för P1. Den gamla `.surface-light` blir **inte** tillbaka: namnet
förblir förbjudet, och mekanismen nedan är en annan.

~~**Alla kvoter nedan är räknade** med WCAG 2.x relativ luminans ur hexvärdena,
inte mätta i webbläsaren. P18d mäter dem i den renderade sidan (punkt 8), och en
avvikelse större än 0,01 är ett fynd mot detta avsnitt.~~ **RÄTTAT 2026-11-08:**
kvoterna nedan räknades först ur hexvärdena och är nu **uppmätta** i den renderade
sidan (beräknad förgrund mot beräknad botten, WCAG 2.x), vid 1280 och 360 px.
Varje avvikelse mot talen i punkt 2 och 3 var under 0,01, så talen står kvar som de
är och gäller som mätvärden. Mätningen: `#projects` i P18b,
`scratchpad\p18b\k-normal-1280.json` och `k-normal-360.json` (till exempel `h2`
16,771 och sektionsetiketten 4,941 mot `rgb(246, 244, 240)`), och `#about` i P18c,
`scratchpad\p18c\result.json` (stycket 7,037, `h2` och nyckeltalen 16,77,
etiketterna 4,94). Scratchpad är sessionens:
`C:\Users\qaium\AppData\Local\Temp\claude\C--Users-qaium-source-repos-Portfoolie-Jelalq\2976d642-d53a-4f4f-b63b-0cbef3977385\scratchpad`.
En senare avvikelse större än 0,01 är fortfarande ett fynd mot detta avsnitt.

#### Punkt 1 — mekanismen: attributet `data-surface="light"` på sektionen, satt av `Section`

| Fråga | Beslut |
|-------|--------|
| Klass eller attribut | **Attributet `data-surface="light"`.** En global klass hade blivit en fjärde global klass, och M12 stängde dörren efter `.reveal`. En modulklass går inte att nå från `tokens.css` |
| Namnet | `data-surface`, värdet `light`. `surface-light` förblir en förbjuden sträng (tabellen är rättad, se raden). Inget annat värde finns. Standardytan har inget attribut alls |
| Var tokens binds om | I `src/styles/tokens.css`, i ett block **direkt efter** `:root`. Blocket målar också sektionens botten och text (se nedan) |
| Var attributet sätts | **Av `Section`, via en ny prop `surface`.** `Projects.jsx` och `About.jsx` skickar `surface={SURFACE_LIGHT}`. Inte ur `sections.js`: det är Jelals fil, ett fält där hade krävt nya grindar i `validate-data.mjs`, och ytan är ett designbeslut, inte innehåll. Inte som `className`: en modulklass når inte tokens. ~~**Tillägg 2026-11-18, se M25:** kompetens-chipsets `span` bär också attributet, satt av `Chip` via propen `surface`.~~ **RÄTTAT 2026-11-18, M25 och M26 upphävda:** bara `Section` sätter attributet. Kompetens-chipsen har M15:s ursprungliga stil och bär inget `data-surface` (~~orange via `.accent`, ifyllda via `.filled`, M26~~ UPPHÄVDA) |
| Ordningen ändras | Ytan följer sektionen, inte platsen. Flyttar Jelal sektionerna kan två ljusa hamna intill varandra. Det är godtaget, och då står linjen kvar mellan dem i den ljusa `--line` |

**`src/components/Section.jsx`, signaturen och attributet:**

```jsx
/* Det enda värdet utöver standardytan. Beslutat i ARKITEKTUR.md: M23. */
export const SURFACE_LIGHT = 'light';

function Section({ id, title, children, className, surface })
```

Roten renderas som
`<section id={id} className={className} data-surface={surface === SURFACE_LIGHT ? SURFACE_LIGHT : undefined}>`.
Ett annat värde på `surface` ger inget attribut, alltså den mörka ytan. Resten av
komponenten är oförändrad. `Reveal.jsx` har redan en namngiven export bredvid
komponenten, så mönstret finns och lintet är grönt med det.

**`src/components/Projects.jsx` och `src/components/About.jsx`:** importen blir
`import Section, { SURFACE_LIGHT } from './Section.jsx';`, och `<Section …>` får
`surface={SURFACE_LIGHT}` sist bland sina props. Inget annat ändras i JSX.

**Blocket måste måla, inte bara binda om.** `body` sätter `color: var(--ink)`, och
ett färdigt beräknat `color` ärvs som värde, inte som variabel. Utan
`background-color` och `color` i blocket står `h2`, kortets `h3` och nyckeltalen
kvar i den ljusa mörka-läges-texten på ljus botten. Samma lärdom som den gamla
klassen fick lära sig ("Mekanismen", historik).

**Invariant:** inget token i `:root` får definieras med `var()` på ett färgtoken som
binds om. Ett sådant värde räknas ut i `:root` och följer inte med in i sektionen.
I dag finns inget, och P18a bekräftar det med
`grep -n "var(--\(bg\|surface\|line\|ink\|accent\|positive\|shadow\)" src/styles/tokens.css`,
som bara får träffa blocket nedan.

**`validate-tokens.mjs` tål ombindningen och fäller ett felstavat ombundet namn.**
Före P18a räknades varje `--namn:` i hela `tokens.css` som deklarerat, så ett
`--ink-mutted:` i blocket hade gått igenom tyst och aldrig larmat. Ändringen, som
P18a har genomfört (**RÄTTAT 2026-11-08**, tidigare "i dag"):

1. **Deklarerat** betyder deklarerat **i `:root`**. Mängden `declared` byggs bara ur
   `:root`-blocket (samma utsnitt som M5h redan använder). OK-radens antal är
   oförändrat, eftersom varje ombundet namn också finns i `:root`.
2. **Ny grind:** varje `--namn:` i `tokens.css` utanför `:root` och utanför
   kommentarer ska finnas i `declared`. Meddelandet, tecken för tecken:
   `validate-tokens.mjs: ombindningen gäller ett token som inte finns i :root ("--x" i src/styles/tokens.css:<rad>)`.
   En rad per namn och rad.
3. Kontrollen av `var()` i `tokens.css` och M5h är oförändrade. `var(--bg)` och
   `var(--ink)` i blocket pekar på deklarerade namn.
4. Huvudkommentaren i skriptet får ett stycke om den nya halvan, utan tokennamn
   (skriptet genomsöker sig självt), med raden "VILKEN LEGITIM ÄNDRING FÅR FÄLLA
   DEN? Ingen. Ett namn som binds om utan att finnas i :root är ett felstavat eller
   borttaget token, och åtgärden är att rätta namnet."

**Prövas i P18a, i denna ordning:** (a) rätt block: tyst, OK-raden. (b)
`--ink-mutted: #57524c;` tillagt i blocket: **exakt en** rad, den nya, med rätt
radnummer. (c) borttaget: tyst. (d) `--x-test: 0;` **bara** i blocket och
`width: var(--x-test);` i `Section.module.css`: två rader, den nya grinden och
"tokenet finns inte i tokens.css". Det visar att `declared` är `:root` ensam. (e)
borttaget: tyst. Utskriften av (b) och (d) sparas i scratchpad under `p18\`.

#### Punkt 2 — den ljusa paletten, tecken för tecken

**`src/styles/tokens.css`, direkt efter `:root`** (~~**RÄTTAT 2026-11-18, se M25
punkt 4:** "Section och kompetens-chipset sätter attributet (ARKITEKTUR.md, M23 och
M25)"~~ **RÄTTAT 2026-11-18, M25 och M26 upphävda, koden återställd till 9cb309b:**
kommentaren lyder "Section sätter attributet", som i blocket nedan
(kontrollerat i `tokens.css:167`). Blocket nedan gäller tecken för
tecken):

```css
/* Ljus sektion, loggans varma botten. Section sätter attributet, och blocket
 * binder om ärvda färgtokens för allt inuti sektionen. Det målar också
 * sektionens botten och text, eftersom en färg som body redan räknat ut ärvs
 * som färdigt värde och inte följer en ombindning. Varje namn här ska finnas i
 * :root, och validate-tokens.mjs fäller ett som inte gör det. Tokens som inte
 * binds om har samma värde som i :root. Beslutat i ARKITEKTUR.md: M23. */
[data-surface='light'] {
  --bg: #f6f4f0;
  /* Kort och paneler ligger ljusare än botten. */
  --surface: #ffffff;
  --surface-2: #ebe8e2;

  /* Dekorativ linje. Duger inte som avgränsning av en gränssnittskomponent. */
  /* --line mot --bg: 1,221:1 och mot --surface: 1,341:1 — dekorativ */
  --line: #e2ded7;

  /* --line-strong binds inte om. Mot --bg här: 4,154:1 — 1.4.11 uppfyllt */
  /* --line-strong mot --surface här: 4,564:1 — 1.4.11 uppfyllt */

  /* --ink mot --bg: 16,771:1 — AA normal */
  /* --ink mot --surface: 18,423:1 — AA normal */
  /* --ink mot --surface-2: 15,066:1 — AA normal */
  --ink: #141414;

  /* --ink-muted mot --bg: 7,037:1 — AA normal */
  /* --ink-muted mot --surface: 7,730:1 — AA normal */
  --ink-muted: #57524c;

  /* --ink-subtle mot --bg: 4,941:1 — AA normal */
  /* --ink-subtle mot --surface: 5,428:1 — AA normal */
  --ink-subtle: #6f6961;

  /* Orange som text, linje och fokusring. Aldrig som yta under mörk text:
   * en sådan yta använder --accent-fill, som inte binds om. */
  /* --accent mot --bg: 4,758:1 — AA normal */
  /* --accent mot --surface: 5,227:1 — AA normal */
  --accent: #b84a00;

  /* Hover rör sig bort från underlaget: på ljus botten mörknar den. */
  /* --accent-hover mot --bg: 6,285:1 — AA normal */
  /* --accent-hover mot --surface: 6,904:1 — AA normal */
  --accent-hover: #9a3d00;

  /* --positive mot --surface: 4,305:1 — 1.4.11 uppfyllt */
  --positive: #2f8a52;

  /* Samma lyft som på mörk botten, med en skugga som syns på ljus. */
  --shadow-lift: 0 24px 60px rgba(20, 20, 20, .16);

  background-color: var(--bg);
  color: var(--ink);
}
```

**Nytt i `:root` (P18b, samma steg som konsumenten, M5h), direkt efter `--accent`:**

```css
  /* Orange YTA under mörk text. Binds aldrig om, så att mörk text på orange
   * håller sin kvot i varje sektion. */
  /* --ink-inverse mot --accent-fill: 6,452:1 — AA normal */
  --accent-fill: #ff6b00;
```

Värdet är detsamma som `--accent` i `:root`. Det är inget alias i M5:s mening: i en
ljus sektion är de två olika, och det är skälet till att namnet finns. Konsumenten
är segmentet i punkt 3. De mörka sektionernas knappar (`Header`, `Hero`,
`MobileMenu`, `ContactForm`) behåller `--accent` och rörs inte, eftersom ingen av
dem renderas i en ljus sektion. Det mäts i punkt 8 (K5).

**Kvoterna, och varför varje värde:**

| Token | Ljust värde | Mot `--bg` `#f6f4f0` | Mot `--surface` `#ffffff` | Krav |
|-------|-------------|----------------------|---------------------------|------|
| `--ink` | `#141414` | 16,771 | 18,423 | 4,5 |
| `--ink-muted` | `#57524c` | 7,037 | 7,730 | 4,5 |
| `--ink-subtle` | `#6f6961` | 4,941 | 5,428 | 4,5 |
| `--accent` (text, länk, ring) | `#b84a00` | 4,758 | 5,227 | 4,5 text, 3 ring |
| `--accent-hover` | `#9a3d00` | 6,285 | 6,904 | 4,5 |
| `--line-strong` (oförändrad `#7a756f`) | — | 4,154 | 4,564 | 3 (1.4.11) |
| `--line` | `#e2ded7` | 1,221 | 1,341 | dekorativ |
| `--positive` | `#2f8a52` | 3,919 | 4,305 | 3 (pricken) |
| `--ink-inverse` på `--accent-fill` | `#141414` på `#ff6b00` | — | — | 6,452, 4,5 |

- **`#ff6b00` mot `#f6f4f0` är 2,599:1** (inte 2,7) och mot `#ffffff` 2,855:1. Det
  klarar varken text eller 1.4.11. Därför `#b84a00`: kulören 24° mot `#ff6b00`:s
  25°, alltså samma orange, mörkare. Mörk text på `#b84a00` ger 3,524:1 och
  faller, och det är skälet till `--accent-fill`.
- **`--line-strong` binds inte om.** Dagens `#7a756f` ger 4,154:1 mot den ljusa
  botten, över 3:1 med marginal och nästan samma tyngd som på mörk (4,169:1).
- **`--ink-inverse`, `--accent-fill` och `--error` binds inte om.** `--ink-inverse`
  är redan `#141414`. `--error` har ingen konsument i Projekt eller Om mig.
- **Fokusringen** är `outline: 2px solid var(--accent)` i `global.css` och
  `a.card:focus-visible` i `ProjectCard.module.css`. Den följer ombindningen:
  4,758:1 mot botten, 5,227:1 mot panelens och kortets vita yta. Ingen fil ändras
  för den.

#### Punkt 3 — projektkortet och filtret på ljus botten

**Inga ändringar i `ProjectCard.module.css`, `Chip.module.css` eller
`Projects.module.css`.** Allt följer ombindningen:

| Del | Resultat på ljus botten |
|-----|--------------------------|
| Kortets yta och ram | `--surface` `#ffffff` med `--line` `#e2ded7`, som på mörk: kortet skiljs från botten av ytan och ramen är dekorativ (hela kortet är länken) |
| Hover | Ramen blir `--line-strong` (4,564:1 mot kortet, 4,154:1 mot botten), lyftet är oförändrat och skuggan är den ljusa `--shadow-lift` |
| Fokus | Ringen `#b84a00`, 4,758:1 mot botten |
| Bild och bildyta | Bilden oförändrad. `--surface-2` `#ebe8e2` syns bara om bilden saknas |
| Logobrickan | Oförändrad: `rgba(255, 255, 255, .92)` med `--ink-inverse`. Den ligger på bilden och är byggd för det |
| Statusbadgen | Ram `--line-strong`, text `--ink-muted` 7,730:1 mot kortet |
| Live-pricken | `--positive` `#2f8a52`, 4,305:1 mot kortet. Övriga statusar `--ink-subtle` 5,428:1. Pricken är dekorativ bredvid texten, men den ska synas |
| Text i kortet | `h3` ärver `--ink` 18,423:1, beskrivningen `--ink-muted` 7,730:1, kategori och taggar `--ink-subtle` 5,428:1 |
| Filterpanelen | `--surface` med `--line`, som kortet |
| Segmenten | Text `--ink-muted` 7,730:1, ram `--line-strong` 4,564:1. Inaktiva `--ink-subtle` och `--line` (inaktiva kontroller är undantagna i 1.4.3 och 1.4.11) |
| Chipsen | Text `--ink-muted` 7,730:1, ram 4,564:1. Valt chip: text och ram `--accent` 5,227:1 |
| Sökfältet | Botten `--bg` inne i den vita panelen, ram `--line-strong` 4,154:1 mot fältet och 4,564:1 mot panelen, text `--ink` 16,771:1, platshållare `--ink-subtle` 4,941:1, ikon `--ink-muted` 7,037:1 |
| Live-raden, "Inga projekt matchar filtret.", "Rensa filter" | `--ink-subtle` 4,941:1, `--ink-muted` 7,037:1 respektive `--ink` 16,771:1 med ram `--line-strong` 4,154:1 |

**Enda ändringen: det valda segmentet.** Före P18b var det `--accent` som yta och
ram (**RÄTTAT 2026-11-08**, tidigare "i dag"). I en ljus sektion hade det blivit `#b84a00` under mörk text, 3,524:1. **`src/components/ProjectFilter.module.css`,
tecken för tecken:**

```css
.segment[aria-pressed='true'] {
  background-color: var(--accent-fill);
  border-color: var(--accent);
  color: var(--ink-inverse);
}
```

Texten får 6,452:1. Ytan `#ff6b00` mot den vita panelen är 2,855:1, under 3:1, så
ytan ensam får inte bära läget. Det gör ramen: `#b84a00` mot panelen är 5,227:1.
På mörk botten är `--accent` och `--accent-fill` samma värde, så segmentet är
pixelidentiskt där.

**Headern över en ljus sektion.** Pillen var före P18 `rgba(20, 20, 20, .62)` med
blur (**RÄTTAT 2026-11-08**, tidigare "i dag"). Över vit yta (panelen och korten)
hade den blivit en mellangrå `rgb(109, 109, 109)`.
Navtexten hade då fått 4,573:1, den orange understrykningen för aktiv länk och
fokusringen 1,804:1, och menyknappens ram 1,129:1. Ringen hade fallit på 1.4.11, och
pillen hade inte längre varit mörk, vilket beslut 9 kräver. **`src/components/Header.module.css`,
`.pill`, en rad, tecken för tecken:**

```css
  background-color: rgba(20, 20, 20, .9);
```

Över vitt blir pillen `rgb(44, 44, 44)` (43,5): navtexten 12,482:1, orange ring och
understrykning 4,925:1, menyknappens ram 3,081:1. Reservregeln utan blur (`.94`)
är oförändrad. Över mörk botten blir pillen ett steg mörkare (19,6 mot 18,5 per
kanal). Inget mått, ingen höjd och ingen annan regel i Header ändras.
**Mobilmenyns panel** renderas av `Header`, utanför varje `<section>`, och läser
`:root`. Den är mörk och fast oberoende av sektion, och ingen fil i menyn ändras.

#### Punkt 4 — Om mig

**Inga ändringar i `About.module.css` eller `KeyFigures.module.css`** utom
kommentaren i punkt 9. Styckena `--ink-muted` 7,037:1, länken `--accent` 4,758:1
med understrykning, hover `--accent-hover` 6,285:1, fokus 4,758:1. Nyckeltalen
ärver `--ink` 16,771:1 och etiketterna är `--ink-subtle` 4,941:1.

#### Punkt 5 — övergången mellan sektionerna och etiketten

**Ingen synlig linje där ytan byter.** Färgskiftet är gränsen. Linjen blir
**genomskinlig**, inte borttagen, så att ingen sektion byter höjd och de mörka
sektionerna kan jämföras pixel för pixel. **`src/styles/global.css`, direkt efter
regeln `section[id] + section[id]`, tecken för tecken:**

```css
/* Där ytan byter mellan två sektioner är färgskiftet gränsen, och linjen görs
 * genomskinlig. Den behåller sin bredd, så att ingen sektion byter höjd.
 * Beslutat i ARKITEKTUR.md: M23. */
section[id]:not([data-surface='light']) + section[id][data-surface='light'],
section[id][data-surface='light'] + section[id]:not([data-surface='light']) {
  border-top-color: transparent;
}
```

Med dagens ordning byter ytan vid varje gräns, så ingen linje syns. Den översta
pixelraden i Kompetenser och Kontakt blir sidans `--bg` `#101010` i stället för
`--line` `#2e2e2e`. Det är den enda tillåtna pixelskillnaden i en mörk sektion
(punkt 8, P2). Footerns egen `border-top` rörs inte.

**Sektionsetiketten** ("01 / 04 · PROJEKT") är `typeStyles.meta`, alltså
`--ink-subtle`: 4,941:1 mot den ljusa botten. `h2` ärver `--ink` 16,771:1. Ingen
ändring.

#### Punkt 6 — reveal, animationer och mobilmenyn

**Bekräftat, ingen ändring.** `.reveal` och filtrets faser ändrar bara `opacity`
och `transform`, ingen färg. Kortets hover-övergång gäller `transform`,
`box-shadow` och `border-color` och tar de ombundna värdena. Mobilmenyn: se punkt 3.

#### Punkt 7 — bilderna

**Hero-bilden och projektbilden ändras inte.** Inga filer under `assets-source/`,
`public/assets/` eller `src/data/` rörs, och `optimize-images.mjs` och
`optimize-project-images.mjs` körs inte.

#### Punkt 8 — mätningen (P18d)

Färskt bygge, `vite preview`, `netstat`-regeln (LARDOMAR 2026-10-02 och
2026-10-05), DPR 1. ~~rullningslisten reserverad (`innerWidth - clientWidth` = 15
utskrivet före varje serie, LARDOMAR 2026-10-08)~~

**RÄTTAT 2026-11-09 (LARDOMAR 2026-11-09):** Villkoret "`innerWidth -
clientWidth` = 15" gäller inte i P, eftersom P fotograferar med
`captureBeyondViewport: true`. Den första sådana skärmbilden tar bort
rullningslisten. Utan uppvärmning ändrar sig layouten mitt i mätningen: varje
sektion blir 3 px högre vid 1280 (`scratchpad\p18d\neg\dbg.txt`), och P4 larmar
falskt på den korrekta sidan med `stable=false/false`
(`scratchpad\p18d\neg\n2-correct-nowarm.log`). Därför gäller detta i P:
1. Efter injektionerna i P2 tas alltid en första skärmbild innan rektanglarna
   mäts: `Page.captureScreenshot` med `clip { x: 0, y: 0, width: 10, height: 10,
   scale: 1 }` och `captureBeyondViewport: true`, följd av 300 ms väntan.
2. Efter den skärmbilden skrivs `innerWidth - document.documentElement.clientWidth`
   ut för varje sida och bredd. Förväntat värde är **0**, inte 15.
3. Reservationen syns i stället i sektionernas bredd: varje rektangel i P3 är
   **345** px bred vid 360 och **1265** px vid 1280 (`scratchpad\p18d\result.json`).
   En annan bredd skrivs ut och fäller körningen.
4. Rektanglarna mäts före och efter fotograferingen. Skiljer de sig
   (`stable=false`) fälls hela körningen, inte bara jämförelsen.

K-serien fotograferar inte och behåller rullningslisten reserverad
(`innerWidth - clientWidth` = 15 utskrivet före varje serie, LARDOMAR 2026-10-08).
Skripten och utdata ligger i
scratchpad under `p18\`. `sharp` laddas ur projektets `node_modules` med
`createRequire(<projektrot>/package.json)`. Inget nytt beroende.

**K — kontrast i de två ljusa sektionerna, vid 360 × 640 och 1280 × 800.**

| # | Läge | Villkor |
|---|------|---------|
| K1 | Vila. Varje textnod med synlig text i `#projects` och `#about`, också `aria-hidden` | Förgrund = beräknat `color`. Bakgrund = första förfader med en icke genomskinlig `background-color`, sammansatt. Logobrickan sätts samman mot svart (värsta fallet). `GRIND:` varje kvot ≥ 4,5. Lägsta kvot och dess element skrivs ut |
| K2 | Hover. Pekaren flyttas med `Input.dispatchMouseEvent` till mitten av varje `a.card` och varje länk i `#about`, och väntan är `--duration-base` + 50 ms | `GRIND:` K1 för texten i elementet, och kortets `border-color` mot botten ≥ 3 |
| K3 | Fokus. Tab genom varje fokuserbart element i `#projects` och `#about`, med riktiga tangenthändelser | `GRIND:` `outline-color` mot förälderns sammansatta botten ≥ 3, och K1 för elementets text |
| K4 | Aktivt. Ett segment med antal > 0 utöver "Alla" klickat, ett chip klickat, och sökfältet med en sträng som ger noll träffar | `GRIND:` text på segmentet mot `--accent-fill` ≥ 4,5, segmentets och chipsets ram mot panelen ≥ 3, chipsets text ≥ 4,5, "Inga projekt matchar filtret." och "Rensa filter" enligt K1 |
| K5 | Inga orange ytor under mörk text i en ljus sektion | `GRIND:` inget element i `[data-surface='light']` har beräknad `background-color` `rgb(184, 74, 0)` |
| K6 | Headern, 1280 och 360, sidan rullad så att pillen ligger över `#projects` | Pillens beräknade bakgrund sätts samman mot vitt (värsta fallet). `GRIND:` navlänkens text ≥ 4,5, `--accent` (understrykning och ring) ≥ 3, menyknappens ram ≥ 3 vid 360 |
| K7 | Mobilmenyn öppen vid 360, sidan rullad till `#projects` | `GRIND:` panelens `background-color` är `rgb(16, 16, 16)` och länkarnas `color` `rgb(244, 241, 236)` |

Förväntad lägsta textkvot i K1–K4: 4,758 (länken i Om mig mot botten). Förväntad
lägsta ring- och ramkvot: 4,154 (`--line-strong` mot botten).
En kvot som avviker mer än 0,01 från tabellen i punkt 2 är ett fynd, även om den
klarar kravet.

**P — inget läcker: pixeljämförelse mot dagens bygge, vid 360 × 640 och 1280 × 800.**

1. Före-bygget: `git worktree add <scratchpad>\p18\before <commit före P18a>`,
   `npm ci` och `npm run build` där, `vite preview` på 4361. Efter-bygget på 4362.
2. I båda: `Emulation.setEmulatedMedia` med `prefers-reduced-motion: reduce` (alla
   `.reveal` synliga), `Network.setBlockedURLs` för `*hcaptcha.com*` (widgeten
   renderas likadant i båda, och denna körning mäter inga konsolfel),
   `header { visibility: hidden !important; }` injicerat (pillen ändras med avsikt
   i punkt 3 och är ingen sektion), `document.fonts.ready` och varje `img.complete`.
3. **RÄTTAT 2026-11-09:** Först uppvärmningsskärmbilden (10 × 10 px,
   `captureBeyondViewport: true`) och utskriften av rullningslistens bredd (0),
   enligt rättelsen överst i punkt 8. Därefter mäts rektanglarna.
   `GRIND:` `document.documentElement.scrollHeight` och rektangeln för `#hero`,
   `#skills`, `#contact` och `footer` är lika före och efter, ± 0, och bredden är
   345 vid 360 och 1265 vid 1280.
4. Varje rektangel tas med `Page.captureScreenshot` (`clip` i dokumentkoordinater,
   `scale: 1`, `captureBeyondViewport: true`) och jämförs pixel för pixel.
   **RÄTTAT 2026-11-09:** Rektanglarna mäts om efter fotograferingen. `GRIND:`
   `stable=true` för båda sidorna. `stable=false` fäller körningen.
   Byggaren redovisar varje avvikelse från denna metod i överlämningen med
   `fil:rad` i skriptet.
   `GRIND:` `#hero` och `footer` har 0 skilda pixlar. `#skills` och `#contact` har
   0 skilda pixlar från rad 1 och nedåt, och rad 0 är `rgb(46, 46, 46)` före och
   `rgb(16, 16, 16)` efter i hela bredden (punkt 5).

**L — Lighthouse:** M21 punkt 0, kategorin tillgänglighet, mobil och dator, fem
körningar per läge. `GRIND:` alla tio är 100.

**S — beslut 7:** M19:s grind 5 (`document.title`, `document.body.innerText` och
`noscript`), vid 360 och 1280. `GRIND:` inget `-`, `–` eller `—`. P18 lägger inte
till någon synlig text.

**D — dokument och kommentarer:** `grep -rn "surface-light" src scripts index.html`
ger 0. Tabellen över förbjudna strängar körs mot `src`, `scripts` och `index.html`.
Kommentarsgrepen ur LARDOMAR 2026-11-08 ("sex kommentarer") körs mot varje ändrad
fil, plus `grep -n "mörk\|ljus\|ingen ombindning" <ändrade filer>`, och varje träff
läses med hela sitt kommentarsblock och redovisas med `fil:rad`.
`git diff --stat <commit före P18a> -- assets-source public src/data` är tomt.

**Negativa kontroller.** Varje kontroll redovisar att den larmade, vilket element
som bar larmet, och att larmet upphörde när injektionen togs bort (LARDOMAR
2026-10-05).

| # | Injektion | Förväntat larm |
|---|-----------|----------------|
| N1 | `[data-surface='light'] { --ink-subtle: #8d8780; }` i efter-sidan | K1 fäller etiketten över Projekt, live-raden och nyckeltalens etiketter, ca 3,235:1 |
| N2 | `document.getElementById('skills').setAttribute('data-surface', 'light')` i efter-sidan | P4 fäller `#skills` med fler än 0 skilda pixlar |
| N3 | Pillens bakgrund satt tillbaka till `rgba(20, 20, 20, .62)` på elementet (`header [class*="pill"]`, träffmängden 1 utskriven) | K6 fäller ringen och understrykningen, 1,804:1 |
| N4 | En kopia av `dist/` där regeln för valt segment i den byggda CSS-filen har `background-color: var(--accent)` | K4 fäller segmentets text (3,524:1), och K5 fäller segmentet |
| N5 | En kopia av `dist/` med samma ändring som N1 | L ger under 100 på mobil, med `color-contrast` som orsak |
| N6 | En textnod `a-b` tillagd i `#about` | S fäller den, med elementet utskrivet |

Tokengrindens negativa kontroller står i punkt 1 och körs i P18a.

#### Punkt 9 — kommentarer som blir falska

Rättas i samma steg som filen ändras, till invarianten och utan uppräkning
(LARDOMAR 2026-10-08 och 2026-11-08):

| Fil | Stycke | Blir |
|-----|--------|------|
| `src/styles/tokens.css:24-25` | "Sidan har ingen ljus yta och ingen ombindning av färgtokens." | "Färgerna här är sidans mörka bas. En ljus sektion binder om en del av dem i blocket efter :root (ARKITEKTUR.md, M23)." (P18a) |
| `src/components/Section.jsx:21-26` | Kommentaren om sektionsroten | En mening till: "Ytan sätts som attribut på roten, inte som klass, och tokens.css binder om färgerna för den (ARKITEKTUR.md, M23)." (P18a) |
| `src/components/About.module.css:5` | "Sektionen ligger på sidans mörka bakgrund, som hela sidan." | "Sektionens yta och färger kommer från Section (ARKITEKTUR.md, M23)." (P18c) |

Byggaren läser dessutom hela kommentarsblocket kring varje redigerad rad, och
särskilt sektionsavgränsarens block i `global.css`.

#### Punkt 10 — paketet P18, fyra steg

Ett steg i taget, och nästa startar först när föregående är överlämnat med sina
grindar gröna. Varje steg avslutas med `npm run validate:data`,
`npm run validate:tokens`, `npm run build` och `npm run lint`.

| Steg | Filer | Klart när |
|------|-------|-----------|
| **P18a — tokens och mekanism** | `tokens.css` (blocket i punkt 2 och kommentaren i punkt 9), `validate-tokens.mjs` (punkt 1), `Section.jsx` (prop, export och attribut, punkt 1 och 9), `global.css` (regeln i punkt 5) | Tokengrindens prov (a)–(e). Invarianten om `var()` i `:root`. Ingen sektion har attributet än, så **P-jämförelsen i punkt 8 ger 0 skilda pixlar i hela sidan**, även Projekt och Om mig, med headern synlig. Det visar att mekanismen inte läcker innan den används |
| **P18b — projektsektionen** | `Projects.jsx` (`surface`), `tokens.css` (`--accent-fill`), `ProjectFilter.module.css` (segmentet, punkt 3), `Header.module.css` (`.pill`, punkt 3) | K1–K7 för `#projects` vid 360 och 1280. M5h tyst (`--accent-fill` har sin konsument) |
| **P18c — Om mig** | `About.jsx` (`surface`), `About.module.css` (kommentaren, punkt 9) | K1–K3 för `#about` vid 360 och 1280 |
| **P18d — mätningen** | Inga filer i `src/` eller `scripts/` | K, P, L, S, D och N1–N6 enligt punkt 8, med sökvägar till utdata. Varje beslut i M23 besvaras med `fil:rad` (LARDOMAR 2026-10-05) |

**Rörs inte i P18:** `ProjectCard.*`, `Chip.*`, `Projects.module.css`,
`KeyFigures.*`, `Skills.*`, `Contact.*`, `ContactForm.*`, `Footer.*`, `Hero.*`,
`MobileMenu.*`, `Header.jsx`, `App.jsx`, `type.module.css`, `src/data/`,
`src/lib/`, bilderna, `validate-data.mjs`, `prerender.mjs`, `package.json`.
`PLAN.md` får paketet av projektledaren.

### M24 — full SEO: canonical, delningskort, JSON-LD och sitemap (2026-11-18, genomförs i P19c)

**Underlag:** `PLAN.md` avsnittet "P19", `LARDOMAR.md`, och miljön kontrollerad
2026-11-18: `index.html`, `public/robots.txt` (två rader), `.gitattributes`,
`src/data/profile.js`, `src/data/contact.js` (GitHub `url: null`, LinkedIn
märkt härledd i kommentaren, bekräftad av Jelal 2026-11-18), `scripts/prerender.mjs`, `scripts/optimize-images.mjs`,
`scripts/optimize-project-images.mjs` (mönstret `mkdtemp` + `rename`/`copyFile`
som återanvänds här), `scripts/font-coverage.mjs` (förebilden för en importerad
hjälpmodul i `scripts/`), `assets-source/hero-portrait.jpg` (1672 × 941),
`package.json` (`sharp` 0.35.5 som devDependency, `jpeg({ mozjpeg })` finns i
`node_modules/sharp/dist/output.mjs`). `grep -rn "jelalqaiumi.se" src scripts public index.html`
gav **0 träffar**: domänen står i dag ingenstans i koden. Lighthouse 12:s
`canonical`-granskning (`core/audits/seo/canonical.js` i npx-cachen) fäller inte
en canonical till en annan domän, så mätningen mot `localhost` påverkas inte.

**Inget nytt beroende.** Allt löses med Node, `sharp` (finns) och det
förrenderingssteg som redan finns.

#### Punkt 1 — en källa per värde

| Värde | Enda källa | Står dessutom i | Skydd när ställena glider isär |
|-------|------------|-----------------|--------------------------------|
| Domänen | `src/data/site.js`, `site.url` = `'https://jelalqaiumi.se/'` | `public/robots.txt`, `public/sitemap.xml` (statiska filer, punkt 5) | Grind V8 i `validate-data.mjs`: båda filerna jämförs byte för byte med vad `site.url` ger. Bygget stannar och skriver ut det väntade innehållet |
| Canonical, `og:url`, `og:image`, JSON-LD `url` och `image` | Härleds ur `site.url` vid bygget (punkt 3) | ingenstans | Kan inte glida: skrivs aldrig för hand. Grind P2 fäller bygget om någon skriver dem i `index.html` |
| Namnet | `profile.name` i `src/data/profile.js` | `<title>` i `index.html` | Grind V9: `<title>` ska vara exakt `pageTitle(profile)` |
| Rollen | `profile.role` | `<title>` | Grind V9 (samma) |
| `og:title` | `pageTitle(profile)`, alltså `` `${name} · ${role}` `` | ingenstans | Härleds |
| Sidbeskrivningen | `<meta name="description">` i `index.html` (godkänd av Jelal 2026-11-18, punkt 8) | ingenstans | `prerender.mjs` kopierar attributvärdet till `og:description` vid bygget |
| sameAs | `contact.links[].url` som inte är `null`, följt av `site.sameAsExtra` (Jelals svar 2026-11-18, punkt 7) | ingenstans | Härleds |
| Delningsbildens sökväg och mått | `SHARE_IMAGE` i `scripts/seo.mjs` | ingenstans | Bildskriptet och `prerender.mjs` importerar konstanten. Grind P4: filen finns i `dist/` |

Inget löfte om "ändra bara här" skrivs för domänen, eftersom den står i tre filer.
Kommentaren i `site.js` räknar upp de två andra och säger att bygget stannar
och skriver ut vad som ska stå där (LARDOMAR 2026-11-08, "`profile.js` lovar").

**`src/data/site.js`** (ny), exakt form:

```js
/** @typedef {Object} Site
 *  @property {string}   url          OBLIGATORISK. Sidans adress: https, gemener, ett snedstreck sist, ingen sökväg.
 *  @property {string[]} sameAsExtra  OBLIGATORISK, får vara tom. Profiladresser som står i JSON-LD:s sameAs men INTE visas på sidan. */
export const site = { url: 'https://jelalqaiumi.se/', sameAsExtra: ['https://github.com/Jelalqaiumi'] };
```

Adressen i `sameAsExtra` skrivs exakt så, med versalt `J`, som Jelal gav den.
Kravet på gemener gäller bara `url` (V6), inte `sameAsExtra` (V7).

Filhuvudet följer `profile.js`: "SÅ ÄNDRAR DU NÅGOT" (domänen: byt `url`, kör
`npm run build`, och skriv in det innehåll bygget skriver ut i `public/robots.txt`
och `public/sitemap.xml`; en profil som bara ska stå i sameAs: lägg adressen i
`sameAsExtra`), "VAR DE SYNS" (inte på sidan, bara i sidans `<head>` och i de två
filerna) och "REGLER SOM BYGGET KONTROLLERAR" (grindarna V6 och V7). Värdet
`sameAsExtra` är Jelals svar 2026-11-18: GitHub bara i sameAs (punkt 7).

**`scripts/seo.mjs`** (ny). En hjälpmodul utan sidoeffekter och utan
filåtkomst, som `font-coverage.mjs`. Den importerar ingenting. Den körs aldrig
direkt och får inget npm-script. Exporterna, med exakt dessa signaturer:

```js
/** Delningsbildens plats under public/ och dist/, och dess mått. */
export const SHARE_IMAGE = { path: 'assets/share/share-1200x630.jpg', width: 1200, height: 630 };

/** @param {string} siteUrl  @returns {string}  Exakt innehåll i robots.txt (punkt 5). */
export function robotsTxt(siteUrl)

/** @param {string} siteUrl  @returns {string}  Exakt innehåll i sitemap.xml (punkt 5). */
export function sitemapXml(siteUrl)

/** @param {{ name: string, role: string }} profile  @returns {string}  `${name} · ${role}`, rå text, inte escapad. */
export function pageTitle(profile)

/** @param {{ name: string }} profile  @returns {string}  `Porträtt av ${name}`, rå text. */
export function shareImageAlt(profile)

/** @param {{ sameAsExtra: string[] }} site  @param {{ links: { url: string|null }[] }} contact  @returns {string[]}
 *  Varje links[].url som är en sträng, i listans ordning, därefter sameAsExtra. En adress som redan finns tas inte med igen. */
export function sameAsList(site, contact)

/** @param {string} text  @returns {string}  & < > " som &amp; &lt; &gt; &quot;, & först. För attributvärden och <title>. */
export function escapeHtml(text)

/** @param {string} text  @returns {string}  & < > som &amp; &lt; &gt;. För <loc> i sitemap.xml. */
export function escapeXml(text)

/** @param {unknown} value  @returns {string}
 *  JSON.stringify(value), därefter varje < > & U+2028 U+2029 ersatt med sin JSON-escape: ett omvänt
 *  snedstreck följt av u003c, u003e, u0026, u2028 respektive u2029 (sex ASCII-tecken per tecken).
 *  Resultatet tolkas av JSON.parse till samma värde, och kan aldrig innehålla "</script". */
export function jsonForScript(value)

/** @param {{ site: object, profile: object, contact: object, description: string }} input
 *  description är attributvärdet ur <meta name="description"> SOM DET STÅR i filen, redan HTML-escapat.
 *  Det skrivs in oförändrat och escapas INTE igen.
 *  @returns {string[]}  Taggarna i punkt 3, en per element, i den ordningen, utan indrag. */
export function headTags(input)
```

Adresser byggs med `new URL(relativ, siteUrl).href`, aldrig med
strängsammanfogning: `new URL(SHARE_IMAGE.path, siteUrl).href` och
`new URL('sitemap.xml', siteUrl).href`.

#### Punkt 2 — grindarna i `validate-data.mjs` (före bygget)

Felet ska stoppa bygget innan något byggs, och skriptet läser redan
`profile.js` och `index.html` (samma skäl som M22 punkt 5). Ändringar:

- `ACTIVE` får `'site'` sist, och `CHECKS` får `site: checkSite`.
- `FONT_ROLES` får `'site.url': []` och `'site.sameAsExtra[]': []`. Inget av dem
  renderas som text.
- **Tillagt 2026-11-18 efter P19d (LARDOMAR 2026-11-18, "`sameAsExtra` som
  sträng ger ett följdfel"):** i `checkFontSubset` gäller, före meddelandet om
  saknad typsnittsroll: är `fontRolesFor(fileName, path)` `undefined` men
  `fontRolesFor(fileName, `${path}[]`)` inte `undefined`, står en sträng där
  datan ska ha en lista. Fältet hoppas då över utan meddelande, eftersom fältets
  egen grind (här V7) redan har fällt det. Regeln gäller varje datafil, inte bara
  `site.js`. Meddelandet om saknad roll ges som i dag när ingen av nycklarna finns.
  **Prov N2b:** `sameAsExtra: 'x'` ger exakt ett meddelande, V7:s
  `site.js: sameAsExtra ska vara en lista (skriv [] om den är tom)`, och inget om
  `FONT_ROLES`. Åtgärden, `['https://github.com/Jelalqaiumi']`, tiger. Samma prov
  med `paragraphs: 'text'` i `src/data/about.js` visar att regeln gäller
  generellt: bara `about.js` egen grind larmar. (Projektposter omfattas redan av
  M3b, där en fälld post inte läses av typsnittsgrinden alls.)
- `import { robotsTxt, sitemapXml, pageTitle, escapeHtml } from './seo.mjs';`

Nya funktioner, intill `checkProfile`:

```js
/** @param {object} mod  Modulen site.js. */
function checkSite(mod) /* : void */
/** @param {string} siteUrl  Ett site.url som klarat V6. */
function checkSeoFiles(siteUrl) /* : void */
/** @param {{ name: string, role: string }} profile  Ett profile med name och role som klarat sina grindar. */
function checkPageTitle(profile) /* : void */
```

`checkSite` anropar `checkSeoFiles(site.url)` bara när V6 gått igenom.
`checkProfile` anropar `checkPageTitle(profile)` sist, och bara när både `name`
och `role` har text. Meddelandena, tecken för tecken:

| # | Grind | Meddelande | Legitim ändring som får fälla den |
|---|-------|------------|-----------------------------------|
| V6 | `site` är ett objekt, `hasText(site.url)`, `new URL(site.url)` kastar inte, `protocol === 'https:'`, `pathname === '/'`, `search === ''`, `hash === ''` och `new URL(site.url).href === site.url` | `site.js: site saknas eller är inte ett objekt`, respektive `site.js: url "${url}" ska vara en https-adress till startsidan, med gemener och ett snedstreck sist (till exempel https://exempel.se/)` | Ingen. Varje ny domän som skrivs rätt tiger |
| V7 | `Array.isArray(site.sameAsExtra)`, och varje element en sträng som `new URL` tolkar med `protocol === 'https:'` | `site.js: sameAsExtra ska vara en lista (skriv [] om den är tom)`, respektive `site.js: sameAsExtra[${n}] "${v}" är inte en https-adress` (n räknas från 1) | Ingen |
| V8 | `public/robots.txt` och `public/sitemap.xml` läses med `readFileSync(…, 'utf8')` i `try/catch`, och var och en ska vara exakt `robotsTxt(url)` respektive `sitemapXml(url)` | Läsfel: `public/<fil>: filen kunde inte läsas (${error.message})`. Bara radsluten skiljer (`actual.replace(/\r\n/g, '\n') === expected`): `public/<fil>: filen har CRLF-radslut, ska ha LF (.gitattributes, ARKITEKTUR.md M24 punkt 5)`. Annars: `` `public/<fil>: innehållet stämmer inte med url i src/data/site.js. Skriv in exakt detta, med LF-radslut och en radbrytning sist:\n${expected}` `` | En ny domän i `site.js`. Åtgärden meddelandet föreskriver, det utskrivna innehållet inskrivet, får den att tiga. Det är avsikten: domänen kan inte ändras på ett ställe utan att bygget säger var mer |
| V9 | Exakt en `/<title>([^<]*)<\/title>/g` i `index.html`, och dess text lika med `escapeHtml(pageTitle(profile))` | `` `index.html: <title> finns ${n} gånger, ska finnas 1` ``, respektive `` `index.html: <title> är "${faktisk}", men profile.js ger "${väntad}" (name · role). Skriv in den väntade texten i <title> i index.html.` `` | Ett nytt namn eller en ny roll i `profile.js`. Åtgärden, den väntade texten inskriven i `<title>`, får den att tiga |

`index.html` läses en gång per körning: `checkHeroPreload` och `checkPageTitle`
får samma sträng, läst av en ny funktion `readIndexHtml()` (returnerar
`string | null`, och lägger själv meddelandet `index.html: filen kunde inte läsas (${error.message})`
en gång). Läsningen i `checkHeroPreload` flyttar dit, så att meddelandet står en
gång i skriptet (LARDOMAR 2026-10-02, "en kontroll som behövs två gånger").

OK-raderna, en per grind som gått igenom: `site med adress och ${n} extra sameAs`,
`robots.txt och sitemap.xml stämmer med site.url`, `titeln stämmer med namn och roll`.

#### Punkt 3 — taggarna och JSON-LD förs in av `prerender.mjs`

**Valt:** `prerender.mjs` skriver in taggarna i `<head>` i samma körning som den
fyller roten, i samma temporärfil och med samma `renameSync`. **Valt bort:** taggar
skrivna för hand i `index.html` (domänen på fem ställen och namnet i JSON-LD utan
källa), och ett eget skript efter `prerender.mjs` (två skript som skriver om samma
fil, och två flyttar som kan halvlyckas).

`index.html` får **inga** sådana taggar. I `npm run dev` saknas de alltså, och det
är avsikten: canonical och delningskort gäller den levererade sidan.

**Nya steg i `main()`**, direkt efter steg 2 (delningen vid roten) och före
SSR-bygget, så att ett fel stoppar körningen innan något renderas. `parts[0]` är
allt före roten och innehåller `<head>`:

- **2a.** Läs `site.js`, `profile.js` och `contact.js`. Importen med `try/catch`
  som `readIds()` gör i dag lyfts till en funktion
  `async function importData(file) /* : Promise<object> */`, som både `readIds()`
  och 2a anropar, med meddelandet `${file}: filen går inte att tolka som JavaScript (${reason(error)})`
  på ett ställe. Innehållet är redan grindat av `validate-data.mjs`, som körs
  först i `build`.
- **2b. Grindarna P1–P4** nedan, mot `parts[0]` och `dist/`.
- **2c.** `const tags = headTags({ site, profile, contact, description })`.
- **2d. Grind P5** mot `tags`.
- **2e.** `const head = parts[0].split('</head>')`. Ny `parts[0]` =
  `head[0] + tags.map((tag) => '    ' + tag + '\n').join('') + '  </head>' + head[1]`,
  där `head[0]` först trimmas i slutet (`trimEnd()`) och får `'\n'`. **Aldrig
  `String.replace`** med en sträng som ersättning (samma skäl som steg 6).
- Därefter steg 3–8 oförändrade. Roten, markören och G1–G4 rörs inte.

**Taggarna, i denna ordning**, med `U` = `site.url`, `I` = `new URL(SHARE_IMAGE.path, U).href`,
`T` = `escapeHtml(pageTitle(profile))`, `D` = `description` oförändrad och
`A` = `escapeHtml(shareImageAlt(profile))`:

```html
<link rel="canonical" href="U" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="sv_SE" />
<meta property="og:url" content="U" />
<meta property="og:title" content="T" />
<meta property="og:description" content="D" />
<meta property="og:image" content="I" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="A" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">PERSON</script>
<script type="application/ld+json">WEBSITE</script>
```

`U` och `I` går genom `escapeHtml` som allt annat i ett attribut. Bredd och höjd
skrivs ur `SHARE_IMAGE.width` och `SHARE_IMAGE.height`, inte som literaler.
`PERSON` = `jsonForScript(…)` av objektet nedan, med nycklarna i denna ordning:

```js
{ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.role,
  url: U, image: I, sameAs: sameAsList(site, contact) }
```

`WEBSITE` = `jsonForScript(…)` av:

```js
{ '@context': 'https://schema.org', '@type': 'WebSite', name: profile.name, url: U, inLanguage: 'sv' }
```

- **Två block, inte ett med `@graph`.** Varje block är ett objekt med en `@type`,
  så att "exakt en Person och exakt en WebSite" kan räknas utan att tolka ett
  nästlat schema.
- **`image` är delningsbilden**, inte heros webp. Den är ett porträtt, den har en
  fast adress, och den hänger inte på `HERO_IMAGE_WIDTHS`.
- **`sameAs` står alltid med**, även som `[]`.
- **`og:image:alt`, "Porträtt av Jelal Qaiumi"**, är härledd text och inte
  Jelals. Samordnaren visar den för Jelal tillsammans med bilden (PLAN.md,
  risken "fel beskuren").

**Escapningen av `</script>`:** `jsonForScript` ersätter varje `<` i den
serialiserade JSON-texten med JSON-escapet, ett omvänt snedstreck följt av
`u003c` (och `>`, `&`, U+2028, U+2029 likaså, punkt 1). I JSON betyder escapet
samma tecken, så `JSON.parse` ger tillbaka exakt det namn
som står i `profile.js`, men texten mellan `<script>` och `</script>` kan aldrig
innehålla `</script`. Ett namn med citattecken eller omvänt snedstreck hanteras
av `JSON.stringify` själv. Attributvärden går genom `escapeHtml`.

**Grindarna i `prerender.mjs`** (meddelandeformatet `prerender: …` som i dag, och
alla samlas och skrivs tillsammans som i `checkGates`):

| # | Grind | Meddelande | Legitim ändring som får fälla den |
|---|-------|------------|-----------------------------------|
| P1 | `</head>` förekommer exakt en gång i `parts[0]` | `prerender: dist/index.html: </head> finns ${n} gånger före roten, ska finnas 1` | Ingen |
| P2 | **RÄTTAT 2026-11-18 efter P19d (LARDOMAR 2026-11-18, "P2 släpper igenom enkla citattecken"):** två skiftlägesokänsliga mönster mot `parts[0]`, oberoende av citattecken och blanksteg, som konstanter i `prerender.mjs`: `HAND_TAG_ATTR = /\b(?:rel\|property\|name)\s*=\s*["']?\s*(?:canonical\|og:\|twitter:)/gi` och `HAND_TAG_LDJSON = /\btype\s*=\s*["']?\s*application\/ld\+json/gi`. Varje träff är ett fel. ~~Ingen av strängarna `rel="canonical"`, `property="og:`, `name="twitter:` och `application/ld+json` finns i `parts[0]`~~ | **RÄTTAT 2026-11-18:** ett meddelande per träff, med den matchade texten ordagrant: `prerender: dist/index.html: ${träff} står redan i index.html. Taggen skrivs av prerender.mjs ur src/data/ (ARKITEKTUR.md M24), ta bort den ur index.html.` (~~`${sträng}`~~ var en av de fyra fasta strängarna) | Ingen. En handskriven tagg är en andra källa, och åtgärden (ta bort den) får grinden att tiga. `name="description"` och `name="viewport"` matchar inte, eftersom värdet måste börja med `canonical`, `og:` eller `twitter:` |
| P3 | Exakt en `/<meta name="description" content="([^"]*)"/g` i `parts[0]`, och värdet har text (`trim() !== ''`) | `prerender: dist/index.html: <meta name="description"> finns ${n} gånger, ska finnas 1`, respektive `prerender: dist/index.html: <meta name="description"> är tom` | Ingen. En ny beskrivning ändrar bara texten |
| P4 | `existsSync('dist/' + SHARE_IMAGE.path)` | `prerender: dist/${SHARE_IMAGE.path} saknas (kör npm run optimize:share-image och checka in bilden)` | Ingen. Bilden är incheckad, och Vite kopierar den |
| P5 | Var och en av de två JSON-texterna saknar `<`, och `JSON.parse` av den kastar inte. `tags` innehåller exakt 2 `<script` och 2 `</script>` | `prerender: JSON-LD-block ${n} går inte att tolka eller innehåller "<" (${orsak})`, respektive **RÄTTAT 2026-11-18 efter P19d (LARDOMAR 2026-11-18, "P5:s meddelande säger emot sig självt"):** `prerender: taggarna i <head> har ${opening} <script och ${closing} </script>, ska ha 2 av vardera` (~~`prerender: taggarna i <head> har ${k} <script, ska ha 2`~~ skrev bara ut det ena talet) | Ingen. Grinden skyddar escapningen, och kan bara fällas av en ändring i `seo.mjs` |

**Kommentarer i `index.html`**, skrivna som invarianter (LARDOMAR 2026-10-02 och
2026-11-07, ÅTERFALL). Ingen av dem får ge en träff på mönstren i P2
(~~strängarna i P2~~ RÄTTAT 2026-11-18), eftersom kommentaren ligger i `parts[0]`:

- Över `<title>` (ersätter `:14-16`): "Titeln är namnet och rollen ur
  src/data/profile.js med en mittpunkt emellan. Bygget stannar om de skiljer sig.
  Beslutat i ARKITEKTUR.md: M24."
- Över `description` (`:18-20`) läggs en mening till: "Samma text blir
  delningskortets beskrivning vid bygget." Meningen om att texten väntar på
  Jelals godkännande tas bort, eftersom han godkände den 2026-11-18 (punkt 8).
- Ny kommentar direkt före `</head>`: "Canonical, delningskortet och den
  strukturerade datan skrivs in här av scripts/prerender.mjs vid bygget, ur
  src/data/. Skriv dem inte för hand: bygget stannar om de finns. Beslutat i
  ARKITEKTUR.md: M24."

**Kommentaren i `src/data/profile.js`** skrivs om i samma redigering: under "SÅ
ÄNDRAR DU NÅGOT" står att både namnet och rollen också står i `<title>` i
`index.html`, och att bygget stannar och skriver ut den väntade titeln om de
skiljer sig. Under "VAR DE SYNS" läggs till: fliktiteln, delningskortet och den
strukturerade datan för sökmotorer. Under "REGLER" läggs V9 till. **Kommentaren i
`src/data/contact.js`**, punkten "En länk": varje länk med en adress står också i
sameAs i sidans strukturerade data, och en profil som bara ska stå där skrivs i
`sameAsExtra` i `src/data/site.js`. "Ingen annan fil behöver röras" står kvar,
eftersom det fortfarande är sant (prövas med greppet i punkt 9). Kommentaren över
LinkedIn-raden skrivs om: adressen är **bekräftad av Jelal 2026-11-18**, och
orden "HÄRLEDD, inte verifierad" och uppmaningen att klicka och byta raden tas
bort. Kommentaren över GitHub-raden får en mening: GitHub står i sameAs via
`sameAsExtra` i `src/data/site.js` men visas inte på sidan. **Datan i `contact.js`
rörs inte**, bara kommentarerna (Jelals svar 2026-11-18, punkt 7).

#### Punkt 4 — delningsbilden

- **Källa:** `assets-source/hero-portrait.jpg`, porträttet. Loggan valdes bort:
  den är 2000 × 774 och hade krävt utfyllnad till 1200 × 630, alltså ny design,
  vilket "Ingår inte" utesluter.
- **Skript:** `scripts/optimize-share-image.mjs` (nytt), npm-scriptet
  `"optimize:share-image": "node scripts/optimize-share-image.mjs"`, tillagt i
  samma ändring som filen. Körs manuellt och ingår **inte** i `build`, som
  `optimize:images`. Ett eget skript och inte ett tillägg i `optimize-images.mjs`:
  den filen bär heros och loggans grindar, och en omkörning av den för en ny bild
  hade skrivit om elva verifierade filer.
- **Utdata:** `public/assets/share/share-1200x630.jpg`, sökvägen ur
  `SHARE_IMAGE.path`. Bilden checkas in, som övriga genererade bilder.
- **Kedjan, exakt:** `sharp(SOURCE).rotate().resize(SHARE_IMAGE.width, SHARE_IMAGE.height, { fit: 'cover', position: 'top' }).grayscale().toColourspace('srgb').jpeg({ quality: 82, mozjpeg: true })`.
- **Beskärning:** hela bredden behålls, och det som skärs bort tas nederst
  (`position: 'top'`). Källan är 1672 × 941 och målet 1,905:1, så skalningen
  ger 1200 × 675 och 45 rader nederst försvinner, i kavajen. Håret överst står kvar.
- **Svartvit**, som heros bild på sidan (M10c). Det är sidans befintliga
  behandling av samma material, ingen ny design. Vill Jelal ha färg är det en rad
  (`.grayscale()` tas bort) och en omkörning.
- **JPEG och inte webp:** delningskortet läses av andra tjänsters robotar, och
  JPEG är det format alla läser. `toColourspace('srgb')` ger tre kanaler, inte en
  gråskalefil med en kanal.
- **Storlekstak: 150 kB**, en `GRIND:`. Det är hälften av taket per fil i
  "Leveransens storlek" och samma tak som projektbilderna. Taket är en gräns, inte
  ett väntat värde: det uppmätta talet skrivs ut som `UPPLYSNING:` och redovisas i
  överlämningen. Fäller taket på kvalitet 82 lämnas det tillbaka hit, och
  kvaliteten sänks inte i tysthet.

**Skriptets ordning**, efter mönstret i `optimize-project-images.mjs`: `fail()`
kastar ett `GateError`, och `finally` tar bort temporärkatalogen.

1. `assertSafeOutput(target)`: målet får inte vara källan, inte ligga under
   `assets-source/`, och ska ligga under `public/assets/`. EN funktion, som prövar
   mot alla källor (LARDOMAR 2026-10-02).
2. Källan läses med `stat` (storlek och `mtimeMs` sparas), och dess mått efter
   `.rotate()` ska vara 1672 × 941.
3. Bilden skrivs till `mkdtemp(join(tmpdir(), 'share-image-'))`.
4. Grindarna mot filen i temporärkatalogen: `sharp(tmp).metadata()` ger
   `width` 1200, `height` 630, `format` `'jpeg'` och `channels` 3, och storleken
   är högst 150 kB. Källan är orörd (samma storlek och `mtimeMs`).
5. Först därefter `mkdir(dirname(target), { recursive: true })` och
   `rename(tmp, target)`, med `copyFile` om `rename` fallerar mellan enheter.

Varje utskriven kontroll märks `GRIND:` eller `UPPLYSNING:` (LARDOMAR 2026-10-02),
och varje `fail()`-meddelande förekommer en gång (`grep -c` redovisas).

#### Punkt 5 — `robots.txt`, `sitemap.xml` och radsluten

Båda filerna är **statiska** i `public/`, handskrivna och grindade byte för byte
av V8. **Valt bort:** att generera dem i bygget. Det hade gett domänen en enda
plats, men flyttat `robots.txt` ur `public/` och gjort om M22 punkt 4 för en
domän som inte väntas ändras. Med grinden kan de inte glida isär utan att bygget
stannar och säger vad som ska stå.

`robotsTxt(U)` ger exakt, LF och en radbrytning efter sista raden:

```
User-agent: *
Allow: /

Sitemap: https://jelalqaiumi.se/sitemap.xml
```

där sista raden är `` `Sitemap: ${new URL('sitemap.xml', U).href}` ``.

`sitemapXml(U)` ger exakt, LF, två blanksteg per nivå och en radbrytning sist:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jelalqaiumi.se/</loc>
  </url>
</urlset>
```

där `<loc>` är `escapeXml(U)`. **Ingen `lastmod`:** ett handskrivet datum blir fel
vid nästa ändring, och en sida utan datum läses ändå.

**`.gitattributes`**, exakt nytt innehåll (ren ASCII, som i M22 punkt 4):

```
# Radslut och binarfiler. Beslutat i ARKITEKTUR.md: M22 punkt 4 och M24.
# robots.txt och sitemap.xml levereras med LF oavsett core.autocrlf.
public/robots.txt text eol=lf
public/sitemap.xml text eol=lf
*.webp binary
*.png binary
*.jpg binary
*.woff2 binary
```

`*.jpg binary` täcker redan delningsbilden. V8 fäller dessutom en CRLF-fil med ett
eget meddelande, så ett fel radslut stoppar bygget även om attributet saknas.

#### Punkt 6 — regeln om referenser i `dist/`, omskriven

**Gäller från P19c:** varje fil i `dist/` har en referens i `src/`, `index.html`,
`scripts/seo.mjs` (delningsbilden, som bara refereras ur `SHARE_IMAGE`) eller
`public/robots.txt` (sitemapen). **Ett undantag:** `robots.txt`, som läses av
sökrobotar på en fast adress och inte refereras av någon fil. Regeln i
`LARDOMAR.md` 2026-10-02 ("Ingen fil i `dist/` får sakna en referens i `src/`
eller `index.html`") bör skrivas om av den som äger filen. Jag rör den inte.

#### Punkt 7 — GitHub i sameAs: BESVARAD av Jelal 2026-11-18

**Svaret:** GitHub ska **bara** stå i sameAs, inte på sidan. Adressen är
`https://github.com/Jelalqaiumi`. LinkedIn-adressen
`https://www.linkedin.com/in/jelalqaiumi` är **bekräftad** av Jelal.

**Genomförs i P19c, en datarad:** `site.js` får
`sameAsExtra: ['https://github.com/Jelalqaiumi']`. Datan i `contact.js` rörs inte:
GitHub står kvar som `url: null` och renderas inte, och LinkedIn står kvar som den
är. Bara kommentarerna i `contact.js` ändras (punkt 3). `sameAs` i Person-blocket
blir alltså exakt, i denna ordning:

```js
['https://www.linkedin.com/in/jelalqaiumi', 'https://github.com/Jelalqaiumi']
```

Mekanismen står kvar oförändrad. Ändrar Jelal sig senare är det fortfarande en
rad: GitHub tillbaka på sidan betyder adressen i `contact.js` och `[]` i
`sameAsExtra`. En dubblett tas ändå bort av `sameAsList`.

#### Punkt 8 — sidbeskrivningen: GODKÄND av Jelal 2026-11-18

**Svaret:** beskrivningen i `index.html` är godkänd ordagrant. Raden
`description` ändras inte, och `og:description` blir samma text. P19c tar bort
meningen om att texten väntar på Jelals godkännande ur kommentaren ovanför
(punkt 3). Rubriken på M21 punkt 3 är rättad på sin plats. Strecksökningen i M21
punkt 3 körs ändå en gång i P19c, eftersom `og:description` är ny.

#### Punkt 9 — mätningen (P19c och P19d)

Mot ett `npm run build` som körts omedelbart före. Varje grind prövas med tre
indata, korrekt (tiger), fel (larmar) och åtgärden meddelandet föreskriver
(tiger), med sökväg till utdata i scratchpad. Ändringar görs i en kopia av
projektet eller återställs, och `git diff --exit-code` på de rörda filerna ger 0
efteråt.

| # | Fel indata | Väntat larm | Åtgärden |
|---|------------|-------------|----------|
| N1 (V6) | `url: 'https://Jelalqaiumi.se'` | V6-meddelandet | `'https://jelalqaiumi.se/'` |
| N2 (V7) | `sameAsExtra: ['http://github.com/Jelalqaiumi']` | V7, element 1 | `['https://github.com/Jelalqaiumi']` |
| N3 (V8) | `url: 'https://exempel.se/'` | V8 för båda filerna, med det väntade innehållet | Det utskrivna innehållet inskrivet i båda filerna, och bygget går igenom. **Detta är provet "domänen ändrad på ett ställe"** i PLAN.md punkt 7: `dist/` har den nya domänen i canonical, `og:url`, `og:image`, båda JSON-LD-blocken, robots.txt och sitemap.xml, och den gamla ingenstans |
| N4 (V8) | `public/robots.txt` med CRLF | CRLF-meddelandet | LF |
| N5 (V9) | `role: 'Utvecklare'` i `profile.js` | V9 med båda titlarna. **Provet "samma för rollen"** | Den väntade titeln i `<title>` |
| N6 (P2) | `<link rel="canonical" href="https://jelalqaiumi.se/" />` för hand i `index.html` | P2, och `dist/index.html` har samma sha256 som efter `vite build` | Raden borttagen |
| N6b (P2, tillagd 2026-11-18 efter P19d) | Var för sig, före `</head>` i `index.html`: `<link rel='canonical' href='https://annan.se/' />`, `<meta property='og:title' content='Fel' />`, `<link rel=canonical href=https://annan.se/>`, `<META PROPERTY = "og:title" content="Fel">`, `<meta name='twitter:card' content='summary'>` och `<script type='application/ld+json'>{}</script>` | P2 för var och en, med den matchade texten utskriven, och `dist/index.html` har samma sha256 som efter `vite build` | Raden borttagen: bygget går igenom. **Dessutom tiger P2** med de befintliga `name="description"` och `name="viewport"` (det korrekta indatat) |
| N7 (P3) | `description`-raden dubblerad | P3, `finns 2 gånger` | En rad |
| N8 (P4) | `public/assets/share/` borttagen | P4 | `npm run optimize:share-image` |
| N9 (P5) | I en isolerad kopia av `seo.mjs`: `jsonForScript` = rena `JSON.stringify`, och namnet `Jelal</script><script>x` | P5 | Den riktiga `seo.mjs`: bygget går igenom, båda blocken tolkas av `JSON.parse`, `Person.name` är tecken för tecken det inskrivna namnet, och antalet `<script` i `dist/index.html` är detsamma som med det vanliga namnet. **Detta är den negativa kontrollen i PLAN.md punkt 4** |
| N9b (P5, tillagd 2026-11-18 efter P19d) | Isolerade kopior av `seo.mjs` med rena `JSON.stringify`: (a) namnet `Jelal</script>x`, så att bara antalet `</script>` är fel (2 och ~~3~~ 4), och (b) namnet `Jelal<script>x`, så att bara antalet `<script` är fel (~~3~~ 4 och 2) | P5:s räknemeddelande med båda talen: (a) ~~`har 2 <script och 3 </script>, ska ha 2 av vardera`~~ `har 2 <script och 4 </script>, ska ha 2 av vardera`, (b) ~~`har 3 <script och 2 </script>, ska ha 2 av vardera`~~ `har 4 <script och 2 </script>, ska ha 2 av vardera`. **RÄTTAT 2026-11-18 efter byggarens mätning (`scratchpad\prov\N9b.txt`):** `profile.name` står i både Person- och WebSite-blocket, så namnet ger två extra taggar och inte en. I båda fallen står också JSON-LD-meddelandet om `"<"`, eftersom grindarna samlas, och det är väntat | Den riktiga `seo.mjs`: bygget går igenom med samma två namn |
| N10 (bild) | `SIZE_LIMIT_KB` = 1, isolerad ändring | Storleksgrinden. Målfilens sha256 oförändrad (eller filen fortfarande frånvarande vid första körningen), och ingen `share-image-*` kvar i `tmpdir()` | Återställd: körningen går igenom. Två körningar i följd ger samma sha256 |

Utöver tabellen gäller "Godkänt när" i `PLAN.md` P19 punkt 1–10 ordagrant. Måtten
på delningsbilden läses ur filen själv (`sharp(...).metadata()` eller filens
SOF-segment), inte ur skriptets utskrift. Greppet `grep -rn "jelalqaiumi.se" src scripts public index.html`
ska efter P19c ge träffar bara i `src/data/site.js`, `public/robots.txt` och
`public/sitemap.xml`. Greppet `grep -rn "ändra bara här\|Ingen annan fil" src`
redovisas, och varje träff prövas mot tabellen i punkt 1.

#### Punkt 10 — vad P19c ändrar

Ett steg, en byggare (PLAN.md: paketet är litet). Jelal har svarat på A och B
(2026-11-18, punkt 7 och 8). P19c startar när svaren står ordagrant i `PLAN.md`
(LARDOMAR 2026-11-08, "P18 byggdes utan post i `PLAN.md`").

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/data/site.js` | Ny, med filhuvud. `sameAsExtra: ['https://github.com/Jelalqaiumi']` | 1, 7 |
| `scripts/seo.mjs` | Ny, exporterna i punkt 1 | 1, 3, 5 |
| `scripts/validate-data.mjs` | `ACTIVE`, `CHECKS`, `FONT_ROLES`, `checkSite`, `checkSeoFiles`, `checkPageTitle`, `readIndexHtml` | 2 |
| `scripts/prerender.mjs` | `importData`, steg 2a–2e, P1–P5, filhuvudets beskrivning av vad skriptet gör | 3 |
| `scripts/optimize-share-image.mjs` | Ny | 4 |
| `package.json` | `"optimize:share-image"`. `build` är oförändrad | 4 |
| `public/assets/share/share-1200x630.jpg` | Genererad | 4 |
| `public/robots.txt` | Exakt `robotsTxt(U)` | 5 |
| `public/sitemap.xml` | Ny, exakt `sitemapXml(U)` | 5 |
| `.gitattributes` | Exakt innehåll i punkt 5 | 5 |
| `index.html` | Tre kommentarer (punkt 3). Meningen om att beskrivningen väntar på godkännande tas bort. Raden `description` rörs inte | 3, 8 |
| `src/data/profile.js`, `src/data/contact.js` | Bara kommentarerna (punkt 3). I `contact.js` försvinner "HÄRLEDD, inte verifierad" över LinkedIn. Datan i `contact.js` rörs inte | 3, 7 |

**Rörs inte:** `src/components/`, `src/prerender.jsx`, `src/main.jsx`,
`vite.config.js`, `scripts/optimize-images.mjs`, `scripts/optimize-project-images.mjs`,
`validate-tokens.mjs`, `LARDOMAR.md`, `PLAN.md`. Byggaren besvarar varje punkt i
M24 med `fil:rad` (LARDOMAR 2026-10-05). Varje `.md` som beskriver en grind som
ändrats (`grep -n "validate-data\|prerender\|robots" README.md GUIDE.md`) lämnas
till dokumentatorn med `fil:rad` (LARDOMAR 2026-11-08, "README beskriver
tokengrinden").

### M25 — kompetens-chipsen ifyllda i varmvitt med mörk text (Jelal 2026-11-18, genomförs i P20b) — UPPHÄVT 2026-11-18 i sin helhet (Jelals beslut: chipsen behåller sin ursprungliga stil)

> **UPPHÄVT 2026-11-18.** Jelal valde bort varmvitt, därefter ifyllt orange och
> orange kant (M26), och till sist "Tillbaka till grå". Chipsen har M15:s
> ursprungliga stil, och koden är återställd till commit 9cb309b
> (`git diff 9cb309b -- src` är tom). Inget i detta avsnitt gäller: varken
> `surface`, `data-surface` på chipset, regeln `.chip[data-surface='light']`,
> mätningarna K1–K8 eller N1–N4. Avsnittet är historik.

**Underlag:** `PLAN.md` avsnittet "P20", och miljön kontrollerad 2026-11-18:
`src/components/Chip.jsx` (`span` utan `onToggle`, `button` med),
`src/components/Chip.module.css` (`.chip` och `button.chip[aria-pressed='true']`),
`src/components/SkillChip.jsx`, `src/components/Section.jsx` (exporterar
`SURFACE_LIGHT`), `src/styles/tokens.css`. `grep -rn "f6f4f0\|141414" src scripts index.html`
gav tre träffar, alla i `tokens.css`: `--ink-inverse: #141414` i `:root`, och
`--bg: #f6f4f0` och `--ink: #141414` i `[data-surface='light']`.

#### Punkt 1 — mekanismen: chipset bär den ljusa ytans attribut

**Valt:** kompetens-chipsets `span` får attributet `data-surface="light"`, samma
attribut som Projekt och Om mig har (M23). Blocket `[data-surface='light']` i
`tokens.css` binder då om `--bg` till `#f6f4f0` och `--ink` till `#141414` **på
chipset självt**, och chipsets egna deklarationer läser dem med `var()`. Värdena
står kvar på ett ställe, och **inget nytt token** deklareras, så regeln om att
ett token deklareras med sin första konsument berörs inte.

**Valt bort:**
- Ett nytt token, till exempel `--chip-fill: #f6f4f0` i `:root`. Det hade
  dubblerat värdet från det ljusa blocket, och två ställen glider isär.
- `--chip-fill: var(--bg)` i det ljusa blocket. Ett namn som bara står i blocket
  fäller `validate-tokens.mjs` (M23 punkt 1), och i `:root` hade det pekat på den
  mörka `--bg`.
- `--ink-inverse` som textfärg. Värdet är rätt, men tokenet är "mörk text på
  orange yta" och dess kvoter gäller orange. En kvot mot `#f6f4f0` hade då stått
  under ett token som inte betyder det (LARDOMAR 2026-10-08, ett tokennamn är
  ingen motivering för ett kontrastvärde).
- En variantklass utan attributet, med `#f6f4f0` utskrivet i modulen. Det är
  dubbleringen planen varnar för.

**`src/components/Chip.jsx`**, ny signatur:

```jsx
function Chip({ children, pressed, onToggle, surface })
```

- `surface` läses **bara i `span`-grenen**: `<span className={styles.chip} data-surface={surface === SURFACE_LIGHT ? SURFACE_LIGHT : undefined}>`.
  Knappgrenen (`onToggle`) ignorerar `surface` och är oförändrad. Det är det som
  garanterar att filterchipsen aldrig får ytan, även om någon skickar propen.
- `import { SURFACE_LIGHT } from './Section.jsx';`. Värdet står en gång, i
  `Section.jsx`, som M23 bestämde.

**`src/components/SkillChip.jsx`:** signaturen är oförändrad,
`function SkillChip({ name })`. Den renderar
`<li><Chip surface={SURFACE_LIGHT}>{name}</Chip></li>`, med
`import { SURFACE_LIGHT } from './Section.jsx';`.

#### Punkt 2 — CSS, tecken för tecken

**`src/components/Chip.module.css`**, en ny regel efter `button.chip[aria-pressed='true']`.
`.chip` och knappregeln är oförändrade:

```css
.chip[data-surface='light'] {
  border-color: transparent;
  background-color: var(--bg);
  color: var(--ink);
}
```

- **Specificiteten är 0,2,0.** Den vinner över `.chip` (0,1,0) och över blocket
  `[data-surface='light']` (0,1,0) oavsett i vilken ordning Vite lägger
  stilmallarna. Blocket målar redan samma två värden, men ordningen mellan
  `tokens.css` och `Chip.module.css` är inget kontrakt, och `.chip` sätter
  `transparent` och `--ink-muted`.
- **`--ink-muted` används inte av kompetens-chipsen längre.** Texten är `--ink`,
  som Jelal bad om (`#141414`). Tokenet `--ink-muted` och dess värden ändras inte,
  och filterchipsen läser det som förut.
- **Kanten:** `border-color: transparent`, och bredden 1 px står kvar. 1.4.11
  gäller inte, eftersom kompetens-chipset är text och ingen kontroll, och
  fyllningen avgränsar chipset mot den mörka sektionen. En grå kant
  (`--line-strong`) runt en varmvit fyllning hade sett ut som en ram och inte som
  en fylld bricka. Kanten tas **inte** bort: då krymper chipset med 2 px på höjd
  och bredd, och "Ingår inte" utesluter storleksändringar. Fyllningen målas under
  den genomskinliga kanten (`background-clip` är `border-box` som standard), så
  chipset ser fyllt ut ända ut till kanten.

#### Punkt 3 — kontrasten

Text `--ink` `#141414` mot fyllningen `--bg` `#f6f4f0` i den ljusa ytan:
**16,771:1, AA normal.** Kvoten är uppmätt i M23 och står redan i `tokens.css`, i
det ljusa blocket: `/* --ink mot --bg: 16,771:1 — AA normal */`. Ingen ny
kvotrad skrivs, eftersom paret är detsamma. Blockets huvudkommentar får i stället
meningen i punkt 4, så att den som läser kvoten vet att den också gäller
kompetens-chipset. P20b mäter kvoten på renderade värden (punkt 5).

#### Punkt 4 — kommentarer som blir falska, skrivna som invarianter

| Fil:rad | I dag | Blir |
|---------|-------|------|
| `src/components/SkillChip.jsx:4-6` | "Utseendet är det gemensamma chipsets, utan växlingsläge, så kompetenserna ser ut som filterchipsen men är text och inte knappar." | "Formen är det gemensamma chipsets, och ytan är den ljusa (attributet data-surface), så att kompetenserna står ifyllda på den mörka sektionen. De är text och inte knappar. Beslutat i ARKITEKTUR.md, M15 och M25." |
| `src/components/Chip.jsx:3-7` | Säger bara att chipset är en knapp med `onToggle` och text utan | En mening läggs till: "Ytan (surface) gäller bara chipset som text: en knapp får aldrig den ljusa ytan. Beslutat i ARKITEKTUR.md: M25." |
| `src/components/Chip.module.css:1-4` | Ingen mening om ytan | En mening läggs till: "Ett chip med den ljusa ytan läser fyllning och text ur de ombundna tokens, så att värdena står på ett ställe (ARKITEKTUR.md, M25)." |
| `src/styles/tokens.css:167` | "Section sätter attributet" | "Section och kompetens-chipset sätter attributet (ARKITEKTUR.md, M23 och M25)". Resten av blockets kommentar står kvar |

`README.md:183-184` beskriver attributet som sektionens. Den lämnas till
dokumentatorn med `fil:rad`.

#### Punkt 5 — verifieringen (P20b)

Mot `vite preview` av ett färskt `npm run build`, med vyport, DPR och
rullningslistvillkor redovisade för varje mätning.

| # | Kontroll | Godkänt |
|---|----------|---------|
| K1 | **Före P20b**: `getComputedStyle` på det första filterchipset i `#projects` (`button` utan `aria-pressed='true'`) och på det valda (`aria-pressed='true'`): `background-color`, `color`, `border-color`, `padding`, `min-height`, `border-width`. Sparas i scratchpad | Filen finns, med sökväg |
| K2 | Samma mätning **efter** P20b | Identisk med K1, tecken för tecken (PLAN.md punkt 2) |
| K3 | Ett kompetens-chip i `#skills`: `getComputedStyle(span).backgroundColor` och `.color` | `rgb(246, 244, 240)` och `rgb(20, 20, 20)`. Kvoten räknad ur de två värdena med WCAG:s formel är 16,771:1 ± 0,001 |
| K4 | Varje kompetens-chip: `span.dataset.surface === 'light'`. Varje `button` i `#projects`: `!button.hasAttribute('data-surface')` | Sant för alla, och antalen redovisas |
| K5 | Storleken: för varje kompetens-chip `getBoundingClientRect()` före och efter P20b, vid 360 × 640 och 1280 × 800 | Lika ± 0,5 px |
| K6 | 360 px-golvet med det längsta namnet i `skills.js` | Inget kompetens-chip har `scrollWidth > clientWidth` eller `scrollHeight > clientHeight`, och sidan har inget vågrätt överflöde (PLAN.md punkt 3) |
| K7 | `grep -rn "f6f4f0\|141414" src scripts index.html` | Samma tre träffar som före, alla i `tokens.css` |
| K8 | `node scripts/validate-tokens.mjs`, `npm run build`, `npm run lint` | Kod 0. Lighthouse tillgänglighet 100 mobil och dator (PLAN.md punkt 5) |

**Negativa kontroller**, var och en en isolerad ändring som återställs, med
`git diff --exit-code` på filen efteråt och utdata i scratchpad:

| # | Ändring | Väntat larm |
|---|---------|-------------|
| N1 | `SkillChip.jsx` utan `surface` | K3 ger `rgba(0, 0, 0, 0)` och `rgb(168, 163, 156)`, och K4 larmar |
| N2 | `Chip.jsx` sätter `data-surface` även i knappgrenen | ~~K2 skiljer från K1 på `background-color` och `color`~~ **RÄTTAT 2026-11-18 efter P20c:** för det **vilande** filterchipset skiljer K2 från K1 på `background-color`, `color` och `border-color`. För det **valda** skiljer bara `background-color`, eftersom `button.chip[aria-pressed='true']` (0,2,1) vinner över `.chip[data-surface='light']` (0,2,0) för `color` och `border-color`. K4 larmar i båda. Det visar att K2 kan se en läcka till filterchipsen |
| N3 | Regeln i punkt 2 skriven som `[data-surface='light'] { … }` utan `.chip` och placerad före `.chip` i modulen | K3 ger `rgba(0, 0, 0, 0)` som bakgrund, eftersom `.chip` vinner. Det visar varför specificiteten 0,2,0 behövs |
| N4 | `#f6f4f0` utskrivet i stället för `var(--bg)` i regeln | K7 ger en fjärde träff |

#### Punkt 6 — vad P20b ändrar

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/Chip.jsx` | `surface` i signaturen, attributet i `span`-grenen, importen, kommentaren | 1, 4 |
| `src/components/SkillChip.jsx` | `surface={SURFACE_LIGHT}`, importen, kommentaren | 1, 4 |
| `src/components/Chip.module.css` | Regeln i punkt 2, kommentaren | 2, 4 |
| `src/styles/tokens.css` | Bara kommentaren på rad 167. Inga värden, inga nya token | 4 |

**Rörs inte:** `ProjectFilter.jsx`, `Section.jsx`, `Skills.jsx`,
`Skills.module.css`, `validate-tokens.mjs`, `global.css`, alla värden i
`tokens.css`. Byggaren besvarar varje punkt med `fil:rad` (LARDOMAR 2026-10-05).

### M26 — kompetens-chipsen med orange kant och orange text (Jelal 2026-11-18, genomförs i P21, ersätter M25) — ~~ifyllda orange~~ RÄTTAT 2026-11-18 — UPPHÄVT 2026-11-18 i sin helhet (Jelals beslut "Tillbaka till grå")

> **UPPHÄVT 2026-11-18.** Jelal såg orange kant och text och valde "Tillbaka till
> grå". Chipsen behåller M15:s ursprungliga stil. Samordnaren har återställt
> `Chip.jsx`, `Chip.module.css`, `SkillChip.jsx`, `tokens.css` och `README.md` till
> commit 9cb309b. Inget i detta avsnitt gäller: varken propen `accent` eller
> `filled`, klasserna `.chip.accent` och `.chip.filled`, kvotraden
> `--accent som text mot --surface` (den finns inte i `tokens.css`, kontrollerat),
> mätningarna K1–K8 eller N1–N4. Avsnittet är historik.

> **RÄTTAT 2026-11-18 efter Jelals besked om P21b ("För starkt"):** kompetens-chipsen
> får **orange kant och orange text utan fyllning**, som ett valt filterchip.
> Propen heter `accent` och klassen `.accent` (~~`filled`/`.filled`~~, namnet hade
> blivit missvisande). Mekanismen är densamma: en boolesk prop som bara
> `span`-grenen läser. Punkterna nedan är skrivna om på plats. Den ifyllda
> varianten står överstruken där den var normativ.

**Underlag:** Jelals besked efter P20 ("vit passade inte alls", ifyllt orange
framför orange kant och text), `PLAN.md` avsnittet "P21", och koden efter P20b,
kontrollerad 2026-11-18: `Chip.jsx:1` importerar `SURFACE_LIGHT`, `Chip.jsx:24`
sätter `data-surface` på `span`, `Chip.module.css:28-32` har
`.chip[data-surface='light']`, `SkillChip.jsx:2` och `:16` skickar
`surface={SURFACE_LIGHT}`, och `tokens.css:167-168` säger att kompetens-chipset
sätter attributet. `--accent-fill` (`#ff6b00`, `tokens.css:67`) och
`--ink-inverse` (`#141414`, `tokens.css:59`) deklareras bara i `:root`.

#### Punkt 1 — M25:s mekanism tas bort helt, och en klass ersätter den

**Valt:** `Chip` får en boolesk prop `accent` (~~`filled`~~ RÄTTAT 2026-11-18). Den
läses **bara i `span`-grenen** och lägger till modulklassen `.accent`
(~~`.filled`~~). Chipset bär inget attribut och binder inte om några tokens.
**Skälet:** M25 använde den ljusa ytans attribut för att låna dess värden. Orange
finns redan som tokenet `--accent` (~~`--accent-fill`, `--ink-inverse`~~), och
ingen ombindning behövs. Ett attribut
som också betyder "ljus sektion" på ett orange chip hade varit en falsk
signal, och det hade bundit om `--accent`, `--line` och `--ink` inuti chipset
utan skäl.

**Valt bort:** att behålla `surface` och ändra regelns värden (attributet
betyder "ljus yta"), en ny global klass (M12 stängde dörren efter `.reveal`) och
ett nytt token (värdena finns redan, och ett token utan nytt värde är
dubblering).

**`src/components/Chip.jsx`:**

```jsx
function Chip({ children, pressed, onToggle, accent })
```

(~~`filled`~~ RÄTTAT 2026-11-18.)

- `import { SURFACE_LIGHT } from './Section.jsx';` tas bort.
- Knappgrenen är oförändrad och läser inte `accent`.
- `span`-grenen, tecken för tecken:

  ```jsx
  <span className={accent === true ? `${styles.chip} ${styles.accent}` : styles.chip}>{children}</span>
  ```

  Inget `data-surface`. (~~`filled === true ? … styles.filled …`~~ RÄTTAT 2026-11-18.)

**`src/components/SkillChip.jsx`:** `function SkillChip({ name })` som förut.
Importen av `SURFACE_LIGHT` tas bort, och den renderar
`<li><Chip accent>{name}</Chip></li>` (~~`<Chip filled>`~~ RÄTTAT 2026-11-18).

#### Punkt 2 — CSS, tecken för tecken

**`src/components/Chip.module.css`:** regeln `.chip[data-surface='light']`
(`:28-32`) tas bort (finns `.chip.filled` från P21b tas den också bort). I
stället, sist i filen (**RÄTTAT 2026-11-18**):

```css
.chip.accent {
  border-color: var(--accent);
  color: var(--accent);
}
```

~~`.chip.filled { border-color: transparent; background-color: var(--accent-fill); color: var(--ink-inverse); }`~~
UPPHÄVT 2026-11-18, "För starkt".

- **Ingen `background-color` i regeln.** Bakgrunden ärvs från `.chip`
  (`transparent`), så kortets `--surface` syns genom chipset. Att skriva den igen
  hade varit en andra källa till samma värde.
- **Samma två deklarationer som `button.chip[aria-pressed='true']`**, med samma
  token. Kompetens-chipset ser ut som ett valt filterchip, vilket Jelal bad om,
  men är text och ingen knapp.
- **`.chip.accent` och inte `.accent`:** specificiteten 0,2,0 vinner över `.chip`
  (0,1,0) oberoende av ordningen i filen. N3 visar varför.
- **Kanten:** bredden 1 px från `.chip` står kvar, nu i `--accent`. Mot kortets
  `--surface` ger den samma kvot som texten (punkt 3), alltså över 3:1, även om
  1.4.11 inte gäller text som inte är en kontroll. ~~`border-color: transparent`~~
  RÄTTAT 2026-11-18.
- `.chip` och `button.chip[aria-pressed='true']` är oförändrade. Ingen hover,
  ingen fokusstil: chipset är inte en kontroll.

#### Punkt 3 — tokens och kontrast

**RÄTTAT 2026-11-18.** Gäller nu:

- **Bakgrunden är kortet.** Kompetens-chipsen ligger i `.card` i
  `Skills.module.css:36`, med `background-color: var(--surface)`, alltså
  `#181818` i den mörka sektionen.
- **Kvoten `--accent` mot `--surface`: 6,219:1, AA normal.** Talet är
  **uträknat** med WCAG:s formel (`#ff6b00` ger L 0,31775, `#181818` ger L
  0,00913), **inte uppmätt**. Kontrollen: samma formel mot `--bg` ger 6,664:1, som
  är den uppmätta raden i `tokens.css`. K3 mäter kvoten på renderade värden.
- **Ny kvotrad i `tokens.css`**, i `:root` direkt efter
  `/* --accent som text mot --bg: 6,664:1 — AA normal */`, med det tal K3 mäter
  (väntat 6,219):

  ```css
  /* --accent som text mot --surface: 6,219:1 — AA normal */
  ```

  Raden saknas i dag, och regeln är en rad per bakgrund tokenet faktiskt står mot
  (LARDOMAR 2026-10-08). Skiljer det uppmätta talet från 6,219 skrivs det
  uppmätta, och skillnaden redovisas.
- **Kanten mot kortet:** samma färgpar, 6,219:1.
- **`--accent` binds om i `[data-surface='light']`** (till `#b84a00`). Det berör
  inte kompetens-chipsen, eftersom sektionen Kompetenser är mörk. Skulle sektionen
  bli ljus följer chipset med till det ljusa värdet, vars kvot mot den ljusa
  `--surface` redan står i blocket (5,227:1). Det är avsikten: text i `--accent`
  ska följa ytan, till skillnad från `--accent-fill`.
- **Inget nytt token, och inget värde ändras.** `validate-tokens.mjs` berörs inte.
  `--accent-fill` och `--ink-inverse` används inte av chipsen.

~~`--accent-fill` och `--ink-inverse` binds inte om … Kvoten `--ink-inverse` mot
`--accent-fill` 6,452:1~~ UPPHÄVT 2026-11-18, eftersom chipset inte längre är
ifyllt.

#### Punkt 4 — kommentarer

| Fil:rad | Blir |
|---------|------|
| `src/components/Chip.jsx:4-9` | **RÄTTAT 2026-11-18:** meningen om ytan ersätts med "Accenten (accent) gäller bara chipset som text: en knapp får den aldrig, utan visar sitt valda läge med aria-pressed. Beslutat i ARKITEKTUR.md: M26." ~~"Fyllningen (filled) …"~~ |
| `src/components/Chip.module.css:6-7` | **RÄTTAT 2026-11-18:** "Ett chip med accent har orange kant och orange text och samma genomskinliga bakgrund som chipset, alltså ser det ut som ett valt filterchip utan att vara en knapp (ARKITEKTUR.md, M26)." ~~"Ett ifyllt chip har orange yta …"~~ |
| `src/components/SkillChip.jsx:5-7` | **RÄTTAT 2026-11-18:** "Formen är det gemensamma chipsets, och kompetenserna har orange kant och text. De är text och inte knappar. Beslutat i ARKITEKTUR.md, M15 och M26." ~~"… ifyllda orange med mörk text …"~~ |
| `src/styles/tokens.css` (`:root`, efter `--accent som text mot --bg`) | **Tillagt 2026-11-18:** kvotraden i punkt 3 |
| `src/styles/tokens.css:167-168` | Tillbaka till M23:s lydelse: "Section sätter attributet (ARKITEKTUR.md, M23)". Ingen mening om chipset |

`README.md:184` beskriver `surface={SURFACE_LIGHT}` på kompetens-chipsen. Den
lämnas till dokumentatorn med `fil:rad`.

#### Punkt 5 — verifieringen

Mot `vite preview` av ett färskt `npm run build`, med vyport, DPR och
rullningslistvillkor redovisade. **K1 görs innan någon fil ändras.**

| # | Kontroll | Godkänt |
|---|----------|---------|
| K1 | **Före första ändringen:** `getComputedStyle` på det vilande och det valda filterchipset i `#projects` (`background-color`, `color`, `border-color`, `padding`, `min-height`, `border-width`), och `getBoundingClientRect()` för varje kompetens-chip vid 360 × 640 och 1280 × 800. Sparas i scratchpad | Filen finns, med sökväg |
| K2 | Filterchipsen efter P21 | Identiska med K1, tecken för tecken |
| K3 | Ett kompetens-chip i `#skills` och dess `.card` | **RÄTTAT 2026-11-18:** chipsets `background-color` `rgba(0, 0, 0, 0)`, `color` `rgb(255, 107, 0)` och `border-top-color` `rgb(255, 107, 0)`. Kortets `background-color` `rgb(24, 24, 24)`. Kvoten räknad ur chipsets `color` och kortets bakgrund är 6,219:1 ± 0,001, och den skrivs i `tokens.css` (punkt 3). ~~`rgb(255, 107, 0)` som bakgrund, `rgb(20, 20, 20)` som text, 6,452:1~~ |
| K4 | `document.querySelectorAll('[data-surface]')` | Exakt två element, `section#projects` och `section#about`. Inget `span` och ingen `button` |
| K5 | Kompetens-chipsens `getBoundingClientRect()` | Lika med K1 ± 0,5 px |
| K6 | 360 px-golvet med det längsta namnet i `skills.js` | Inget kompetens-chip har `scrollWidth > clientWidth` eller `scrollHeight > clientHeight`, och sidan har inget vågrätt överflöde |
| K7 | `grep -rn "SURFACE_LIGHT" src`, `grep -rn "ff6b00\|f6f4f0" src` och **(tillagt 2026-11-18)** `grep -rn "filled\|accent-fill\|ink-inverse" src/components/Chip.jsx src/components/Chip.module.css src/components/SkillChip.jsx` | `SURFACE_LIGHT` bara i `Section.jsx`, `Projects.jsx` och `About.jsx`. Färgvärdena bara i `tokens.css`. Den tredje sökningen ger 0 träffar |
| K8 | `node scripts/validate-tokens.mjs`, `npm run build` och `npm run lint` | Kod 0. Lighthouse tillgänglighet 100 mobil och dator. ~~och invarianten i punkt 3, en träff var~~ RÄTTAT 2026-11-18: invarianten om `--accent-fill` gäller inte längre chipset |

**Negativa kontroller**, var och en isolerad, återställd, med
`git diff --exit-code` på filen och utdata i scratchpad:

| # | Ändring | Väntat larm |
|---|---------|-------------|
**RÄTTAT 2026-11-18** för kant och text i orange (de ifyllda värdena står överstrukna):

| # | Ändring | Väntat larm |
|---|---------|-------------|
| N1 | `SkillChip.jsx` utan `accent` | K3 ger `color` `rgb(168, 163, 156)` (`--ink-muted`) och `border-top-color` `rgb(122, 117, 111)` (`--line-strong`). ~~`rgba(0, 0, 0, 0)` som bakgrund~~ |
| N2 | `Chip.jsx` lägger `.accent` även i knappgrenen | K2 skiljer för det **vilande** filterchipset på `color` och `border-color`, båda `rgb(255, 107, 0)`. För det **valda** skiljer **ingenting**, eftersom `button.chip[aria-pressed='true']` sätter samma två värden. N2 bevisas alltså med det vilande chipset, och utfallet för det valda redovisas som väntat lika. ~~bakgrund, text och kant vilande; bara bakgrund valt~~ |
| N3 | Regeln skriven som `.accent { … }` och placerad före `.chip` | K3 ger `rgb(168, 163, 156)` som `color` och `rgb(122, 117, 111)` som kant: `.chip` kommer senare med samma specificitet och vinner. ~~`rgba(0, 0, 0, 0)` som bakgrund~~ |
| N4 | `#ff6b00` utskrivet i stället för `var(--accent)` | K7 ger en träff utanför `tokens.css`. ~~`var(--accent-fill)`~~ |

#### Punkt 6 — vad P21 ändrar

| Fil | Ändring | Punkt |
|-----|---------|-------|
| `src/components/Chip.jsx` | `surface` och importen bort, `accent` (~~`filled`~~) i signaturen och i `span`-grenen, kommentaren | 1, 4 |
| `src/components/SkillChip.jsx` | Importen bort, `<Chip accent>` (~~`<Chip filled>`~~), kommentaren | 1, 4 |
| `src/components/Chip.module.css` | `.chip[data-surface='light']` och `.chip.filled` bort, `.chip.accent` till, kommentaren | 2, 4 |
| `src/styles/tokens.css` | Kommentaren på rad 167-168, och **(RÄTTAT 2026-11-18)** kvotraden `--accent som text mot --surface` i `:root`. Inga värden, inga nya token | 3, 4 |

**Rörs inte:** `ProjectFilter.*`, `Section.jsx`, `Projects.jsx`, `About.jsx`,
`Skills.*`, `global.css`, `validate-tokens.mjs`, alla värden i `tokens.css`.
Byggaren besvarar varje punkt med `fil:rad` (LARDOMAR 2026-10-05).

---

## Paket A — besluten för innehållsuppdraget 2026-10-08, och var de står

Dokumentet är stort. Detta är enda stället som listar paket A:s beslut; varje
beslut står på den plats där det gamla beslutet stod, enligt konventionen ovan.
**Ingen byggare behöver läsa dokumentet uppifrån och ner.**

| # | Beslut | Avsnitt | Blockerar paket |
|---|--------|---------|-----------------|
| A1 | Grinden för `skills.js` blir strukturell; korsreferensen och `MERGED` utgår | "A1 — Grinden för `skills.js` är strukturell" (i "Validering av datafilerna") | D |
| A2 | `filled`, den orange fyllningen och teckenförklaringen tas bort | "A2 — `filled`, den orange fyllningen och teckenförklaringen" (i "`src/data/skills.js`") | D, E |
| A3 | ~~Inga ikoner~~, inget nytt beroende — **"inga ikoner" UPPHÄVT 2026-11-07, se M9** (inget nytt beroende gäller) | "A3 — Inga ikoner" | E |
| A4 | "Hem och Ekonomi" som länk, båda lägena, via `about.link` | "A4 — Hem och Ekonomi som länk" (i "`src/data/about.js`") | F |
| A5 | Heros två knappar, stilarna och mätserien — **stilarna UPPHÄVDA 2026-11-07, se M10** (knapparna och mätserien gäller) | "A5 — Hero: knapparna, mätserien och 360 px" | B, C |
| A6 | Kortet, chipset och rutnätet 3/2/1 — **chipset UPPHÄVT 2026-11-07, se M15** (kortet och rutnätet gäller, med nya tokennamn) | "A6 — Kortet, chipset och rutnätet" (i "Skills — rendering") | E |
| A7 | Rollraden `Systemutvecklare · Fullstack` och `<title>` | "A7 — Rollraden" | B |
| A8 | Footerns kontrast: `--color-text-dim` tas bort | "A8 — Footerns kontrast" (i "Färger") | eget paket |
| A9 | Grind mot kvarglömda tokenreferenser; grinden mot uppräknande kommentarer avfärdad | "A9 — Kommentarer som räknar upp tokens" | eget paket |
| A10 | Inga ikonlänkar i hero — inte GitHub, inte LinkedIn | "A10 — Inga ikonlänkar i hero" | B |
| A11 | ~~Ingen animation införs~~ — **UPPHÄVT 2026-11-07, se M12** | "A11 — Ingen animation införs" | E |
| A12 | Uppdragstexten måste in i repot innan paket B startar | "A12 — Uppdragstexten måste bo i repot" | B, D, F |
| A13 | `.hero`-blocket (hero fyller första skärmen) genomförs i **ett eget paket K**, mellan B och C | "A13 — blocket genomförs i ett eget paket K" (i "A5 … Hero fyller första skärmen på dator") | **K**, och K blockerar C |
| A14 | Citattecknen i uppdragsfilen är avgränsare, inte innehåll — gäller ingressen OCH "Om mig" | "A14 — Citattecknen i `UPPDRAG-2026-10-07.md` är avgränsare" | F (B är redan rätt byggt) |
| A15 | Varje Jelal-ägd text i en komponent står som namngiven konstant, aldrig som JSX-literal | "A15 — Varje text Jelal äger står som en namngiven konstant" (i "A5") | E, F (B är redan rätt byggt) |
| A16 | Heros höjdkvot har **en** formel (nämnaren mäts), och bandet gäller bara från 900 px bredd | "A16 — Höjdkvoten har EN formel" (i "A5 … Mätserien") | **C** (låste C fram till detta beslut) |
| A17 | Stycket om nästlad struktur rättat: `filled`-formatexemplet och antalet stryks; en rad per skill står fast | "A17 — Detta stycke motsade A2" (i "`src/data/skills.js`") | inget — D är redan rätt byggt |
| A18 | Engångsjämförelsen görs mot `UPPDRAG-2026-10-07.md` i repot, aldrig mot en scratchpad-sökväg | "A18 — scratchpad-filen är upphävd" (i A1, punkt 2) | inget — D är redan rätt byggt |
| A19 | OK-raden är ett format och en UPPLYSNING; teckentalet står först, Om mig-delen ägs av F | "A19 — OK-raden är ett FORMAT" (i A1) | inget — D är redan rätt byggt; F äger Om mig-delen |
| A20 | `OPEN-KEY`-grinden (tre delgrindar, utskrivna) bärs av ett eget paket **efter LEVERANS och G**, inte av D och inte av J | "A20 — `OPEN-KEY`-grinden" (i "Validering av datafilerna") | inget pågående paket; **ett nytt paket efter LEVERANS** (`PLAN.md` äger bokstaven) |
| A21 | Grupp utan `id`: en rad med postens plats, resten av gruppen hoppas över, kompetenserna räknas inte | "A21 — En grupp utan `id`" (i A1) | inget — D är redan rätt byggt |

**A16–A21 tillkom 2026-10-08 efter att paket D och K lämnade tillbaka sex
punkter.** Fyra av dem (A17, A18, A19, A21) är rättelser av **mina egna** stycken,
där byggaren hade följt det senast daterade beslutet och **rapporterat
motsägelsen i stället för att tolka den** — exakt det `LARDOMAR.md` kräver. De
kräver därför ingen ändring i koden. **A16 är det enda som låste ett paket: C
kunde inte starta förrän höjdkvoten hade en enda formel.** A20 pekar ut ett paket
efter LEVERANS och lägger ingenting på något pågående paket. Varje rättelse står
på det gamla beslutets ursprungliga plats, inte som en motsägelse längre ner.

**A13–A15 tillkom 2026-10-08 efter att paket B lämnade tillbaka tre punkter.**
Två av dem bekräftar det byggaren redan gjort i `4defa9f` (A14, A15) och kräver
alltså ingen ändring i hero; den tredje (A13) är ett bygge som inget paket bar.
Numreringen fortsätter på A-serien därför att `PLAN.md` säger att arkitektens
nummer används överallt — de är beslut i samma uppdrag, inte ett nytt uppdrag.

> **UPPHÄVT 2026-11-07, se M1:** stycket nedan mätte filen för ett typsnitt som tas
> bort i P2. Teckengrinden mäter nu tre familjer, var och en mot sina fält.

**Teckentäckningen (punkt 8 i uppdraget till mig) behövde inget beslut:** varje
tecken uppdragets nya texter innehåller finns i
`src/styles/fonts/didact-gothic-latin-400.woff2` — uppmätt 2026-10-08 ur filens
`cmap`, inklusive `U+00B7` i rollraden, `#`, `/`, `+` och parenteserna.
Teckengrinden körs ändå om i paket B och D mot de strängar byggaren faktiskt
skriver; mätningen gällde de strängar jag kunde läsa.

---

## Mappstruktur

> **Trädet nedan är skrivet om 2026-11-07 (moderniseringen, M1, M3, M5, M9, M12–M15).**
> De rader som är tillagda eller ändrade bär paketnumret. Mappreglerna under trädet
> gäller, med de två tillägg som står där.

```
Portfoolie-Jelalq/
├─ index.html                     Vites entry. <html lang="sv">, <title>, <meta name="description"> (M21, P15-fix), favicon → /assets/jq-icon-32.png (M20, P14c; var logo-mark-32.png). <div id="root"></div> är markören som scripts/prerender.mjs fyller i dist/ (M21). Canonical, delningskort och JSON-LD står INTE här: prerender.mjs skriver in dem före </head> i dist/ (M24, P19c).
├─ package.json                   Scripts: dev, build, preview (paket 1) + optimize:images (läggs till i paket 2). build slutar med node scripts/prerender.mjs (M21, P15-fix). optimize:share-image (M24, P19c).
├─ vite.config.js                 Enbart @vitejs/plugin-react. Ingen extra konfiguration.
├─ .gitattributes                 robots.txt och sitemap.xml med LF, bildfiler och woff2 binära. Ingen normalisering av resten (M22 punkt 4, G2-rättning; sitemap.xml M24, P19c).
├─ ARKITEKTUR.md                  Detta dokument
├─ BRIEF.md / PLAN.md / skills.txt
├─ scripts/
│  ├─ optimize-images.mjs         Heros bild, svartvit webp (M10c, P5 omgång 4), och loggan och ikonerna ur jq-logo-light.png (M20, P14c; ersätter logoikonerna från paket 2B). Körs manuellt, ingår INTE i build.
│  ├─ validate-data.mjs           Grindar src/data/. Första steget i build. Jämför också heros preload i index.html med HERO_IMAGE_WIDTHS (M22 punkt 5), <title> med namn och roll, och robots.txt och sitemap.xml med site.url (M24, P19c).
│  ├─ seo.mjs                     Hjälpmodul utan sidoeffekter: SHARE_IMAGE, robots- och sitemaptexten, titeln, taggarna och JSON-LD. Importeras av validate-data.mjs, prerender.mjs och optimize-share-image.mjs (M24, P19c).
│  ├─ optimize-share-image.mjs    Delningsbilden 1200x630 JPEG ur hero-portrait.jpg (M24, P19c). Manuellt, inte i build.
│  ├─ font-coverage.mjs           Läser cmap ur en woff2-fil. Anropas av validate-data.mjs, en gång per fil (M1d).
│  ├─ optimize-project-images.mjs Projektbilder 4:3, webp, vänsterförankrad beskärning (M4, P6). Manuellt, inte i build.
│  ├─ validate-tokens.mjs         Grindar att varje custom property som nämns är deklarerad i :root i tokens.css (M5g, P2), att varje deklaration har en konsument (M5h) och att varje ombundet namn finns i :root (M23, P18a). I build.
│  └─ prerender.mjs               Förrenderar <App /> in i dist/index.html efter vite build (M21, P15-fix), och skriver in canonical, delningskort och JSON-LD i <head> (M24, P19c). Sista steget i build.
├─ assets-source/                 KÄLLBILDER. Publiceras ALDRIG — ligger utanför public/.
│  ├─ jq-logo-light.png           ORIGINAL 2000x774 — läses, skrivs aldrig över (M20, P14c)
│  │                              (logo.png UPPHÄVD 2026-11-07, se M20: tas bort i P14c)
│  ├─ hero-portrait.jpg           ORIGINAL 1672x941 — läses, skrivs aldrig över (M10c, P5 omgång 4)
│  │                              (profile.jpg UPPHÄVD 2026-11-07, se M10c: tas bort i P5 omgång 4)
│  └─ projects/                   En PNG per projekt, t.ex. awle.png (M4)
├─ public/                        Allt här kopieras rakt ut i dist/. Endast genererat, med två handskrivna filer som bygget grindar mot site.url: robots.txt (M21) och sitemap.xml (M24). ~~ETT undantag: robots.txt~~ RÄTTAT 2026-11-18, se M24 punkt 5.
│  ├─ robots.txt                  Handskriven, exakt robotsTxt(site.url): två rader, tomrad, Sitemap-raden (M21 punkt 4, P15-fix; Sitemap-raden M24, P19c). ~~två rader~~ RÄTTAT 2026-11-18
│  ├─ sitemap.xml                 Handskriven, exakt sitemapXml(site.url), en <loc> (M24, P19c)
│  └─ assets/
│     ├─ share/                   share-1200x630.jpg, delningsbilden, genererad (M24, P19c)
│     ├─ hero/                    hero-{960,1440,1672}.webp, svartvita (M10c, P5 omgång 4)
│     │                           (profile/ UPPHÄVD 2026-11-07, se M10c: tas bort i P5 omgång 4)
│     ├─ projects/                <namn>-{600,1200}.webp (M4, P6)
│     ├─ jq-logo-{34,68,102}.png  Hela loggan, 1x/2x/3x, naven och footern (M20, P14c)
│     └─ jq-icon-{32,96,192}.png  JQ-rutan, opak: favicon och apple-touch-icon (M20, P14c)
│                                 (logo-mark-*.png och logo-mark-tight-*.png UPPHÄVDA 2026-11-07, se M20: tas bort i P14c)
└─ src/
   ├─ main.jsx                    Monterar <App />: hydrateRoot om #root har innehåll (bygget), annars createRoot (dev) (M21, P15-fix). Importerar fonts.css, tokens.css, global.css i den ordningen. Definierar och anropar den lokala enableReveal() före första renderingen (M12, P10; flyttad hit i M12b punkt 3, P9b).
   ├─ prerender.jsx               export function render(): renderToString av <App /> för scripts/prerender.mjs (M21, P15-fix). Importeras inte av något i src/.
   ├─ App.jsx                     Komponerar sidan: Header, <main> med Hero och sections.map(...), Footer.
   ├─ components/                 En komponent per fil + en .module.css per komponent (ikonerna har ingen, M9)
   ├─ data/                       Ren data. Innehåll som Jelal redigerar. Ingen JSX här. Ny: profile.js (M10, P5). Ny: site.js, sidans adress och sameAsExtra (M24, P19c).
   ├─ lib/                        NY (M3, P6). Ren JavaScript utan React/JSX/DOM: projectRules.js, sectionLabel.js, keyFigures.js, skillRules.js (P12b, M14b).
   └─ styles/                     fonts.css, tokens.css, global.css, type.module.css (M1). tokens.css har :root och, direkt efter, ombindningen [data-surface='light'] (M23, P18a).
      └─ fonts/                   urbanist-latin-var.woff2, manrope-latin-var.woff2, jetbrains-mono-latin-400.woff2 + OFL-*.txt (M1, P2).
```

Regler för mapparna:

- `src/components/` — presentations­komponenter. Får läsa från `src/data/` men
  får aldrig innehålla innehållsdata (skill-namn, projekt, kategorier) hårdkodad.
- `src/data/` — innehåller endast `export const`-arrayer/objekt. Ingen import av
  React, ingen logik, inga funktioner.
- `src/styles/` — innehåller bara `fonts.css`, `tokens.css`, `global.css`,
  `type.module.css` (tillagd 2026-11-07, M1) och mappen `fonts/`. All
  komponentspecifik CSS bor i respektive `.module.css`.
- `src/lib/` — **tillagd 2026-11-07 (M3).** Rena funktioner och konstanter. Ingen
  import av React, ingen JSX, ingen åtkomst till `document` eller `window`. Läses av
  både komponenter och `scripts/`.
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
| Profilbilden (**UPPHÄVD 2026-11-07, se M10c:** källan är `assets-source/hero-portrait.jpg`, och `profile.jpg` tas bort) | `public/assets/profile.jpg` | `assets-source/profile.jpg` |
| Loggan (**källan UPPHÄVD 2026-11-07, se M20:** `assets-source/jq-logo-light.png`, och `logo.png` tas bort i P14c. Regeln att källor bor utanför `public/` gäller) | `public/assets/logo.png` | `assets-source/logo.png` |

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
| Filer i `dist/` som ingen kod refererar | **0**. **Ett undantag sedan 2026-11-08 (M21 punkt 4):** `robots.txt`, som läses av sökrobotar på en fast adress och därför aldrig refereras. **RÄTTAT 2026-11-18, se M24 punkt 6:** en referens kan stå i `src/`, `index.html`, `scripts/seo.mjs` (delningsbilden) eller `public/robots.txt` (sitemapen) |

Förväntat utfall efter flytten: ca 0,4–0,5 MB totalt (bildvarianter ~177 kB,
ikoner ~10 kB, JS och CSS resten). Hamnar siffran nära 1 MB är något fel även om
gränsen formellt hålls — mät vad som växt innan paketet lämnas.

Kontrollen körs i **varje** paket från och med nu, inte bara i paket 7. En
regression som upptäcks fyra paket senare är dyr att spåra.

---

## Teknikval

| Val | Varför | Vad vi valde bort |
|-----|--------|-------------------|
| React 19 + Vite (mall `react`, JavaScript) | Beslutat i briefen. Portfolion demonstrerar den stack som står i kompetenslistan. Mallen `react` (Babel-plugin) framför `react-swc` eftersom skillnaden bara är byggtid på ett projekt av den här storleken och Babel-varianten är den som är bäst dokumenterad. | TypeScript (inte efterfrågat, Jelals lista säger JavaScript), Next.js (ingen ~~SSR eller~~ routing behövs för en one-pager. **Skälet ändrat 2026-11-08, M21:** sidan förrenderas vid bygget, men det kräver ingen server och inget ramverk, se raden "Förrendering vid bygget") |
| **Förrendering vid bygget** med `react-dom/server` (`renderToString`) och Vites inbyggda SSR-bygge (tillagt 2026-11-08, M21) | Mobilens LCP väntade på att bundlen kört, eftersom `#root` var tom. Båda verktygen finns redan: `react-dom` är ett beroende och SSR-bygget är en del av `vite`. **Noll nya beroenden** | Next.js, `vite-plugin-ssr`/Vike, `react-snap` (nya beroenden, `react-snap` drar in en webbläsare), en handskriven kopia av hero i `index.html` (CSS Modules hashar klassnamnen, och två kopior av samma markup glider isär), heros `<img>` utanför `#root` (två bilder, två `alt`, layouten ägs av två ställen) |
| **CSS Modules** (`*.module.css`), inbyggt i Vite | Noll nya beroenden — Vite kompilerar `.module.css` direkt. Klassnamn skopas automatiskt, så sex komponenter kan använda `.title` utan att krocka och utan att vi måste upprätthålla en namnkonvention med disciplin. Stilen ligger bredvid komponenten, vilket gör den lätt att hitta och lätt att ta bort. | Global BEM-fil (växer till en enda lång fil, kräver mänsklig disciplin för att inte läcka), Tailwind/UI-ramverk (förbjudet i briefen), CSS-in-JS (runtime-beroende utan nytta här) |
| Designtokens som CSS-variabler i `:root` i `styles/tokens.css` | Variabler kaskaderar rakt in i CSS Modules, så de två strategierna krockar inte. Ett ställe att ändra färg/spacing på. | SASS-variabler (hade krävt `sass` som beroende och tappat runtime-kaskaden) |
| ~~Systemfont-stack, ingen webbfont~~ — **UPPHÄVT 2026-11-07, se M1.** Gäller: tre självhostade woff2 (Urbanist, Manrope, JetBrains Mono), latin, i `src/styles/fonts/`. Inget beroende, inget externt anrop | ~~Noll nätverksbegäran, ingen FOUT, inget beroende. Loggan bär den grafiska identiteten — texten ska vara neutral och lugn.~~ | Google Fonts CDN (externt anrop, render-blockerande, och ingen fil för teckengrinden att mäta), `@fontsource/*` via npm (tre nya beroenden för filer som kan hämtas en gång) |
| `sharp` som **devDependency** | ImageMagick saknas på maskinen (verifierat i briefen). sharp är standardverktyget i Node för detta, körs en gång manuellt och hamnar aldrig i bundlen. | Manuell export i bildprogram (går inte att upprepa eller verifiera), `vite-imagetools` (pluggar in sig i byggkedjan för en enda bild) |
| **oxlint** — mallens egen linter behålls som den levereras | Dev-beroende, noll runtime-kostnad. Vite-mallen `react` ger i dag (vite 8.3.0) `.oxlintrc.json` + `oxlint`, **inte** ESLint. Regeln `react/rules-of-hooks: error` finns med, vilket är exakt det skydd vi ville ha. | Att byta ut mallens linter mot ESLint (nytt beroende och ny konfiguration för ett skydd vi redan har), att strippa lintern helt (tar bort ett verkligt skyddsnät gratis) |
| Inga andra runtime-beroenden | Briefen: "Inga externa beroenden utöver React/Vite om det inte är motiverat". Ankarnavigering, pills, grid och gråskala löses med plattformen. **Tillägg 2026-11-07:** filtret, mobilmenyn, scroll-reveal och ikonerna löses också med plattformen (M8, M9, M11, M12) | react-router (one-pager använder ankare, och Jelals beslut 1: inga detaljsidor), framer-motion (~~ingen animation är beställd~~ — **skälet UPPHÄVT 2026-11-07:** animation är beställd, men CSS-transitions och en `IntersectionObserver` räcker, M12), ikonbibliotek (~~inga ikoner är beställda~~ — **skälet UPPHÄVT 2026-11-07:** tre ikoner behövs, och tre inline-SVG kostar mindre än ett beroende, M9) |
| **Lighthouse via `npx`, inte i `package.json`** (tillagt 2026-11-07, M17) | Ett engångsverktyg för slutkontrollen. Det hör inte till bygget och ska inte installeras med det | `lighthouse` som devDependency (ett stort beroendeträd för en mätning per leverans), PageSpeed Insights (kräver en publik adress) |
| **Canonical, delningskort och JSON-LD skrivs in av `prerender.mjs`, ur `src/data/` och `scripts/seo.mjs`. Delningsbilden görs med `sharp`** (tillagt 2026-11-18, M24) | **Noll nya beroenden.** Förrenderingssteget finns redan och skriver redan `dist/index.html` atomiskt, och `sharp` finns redan som devDependency | `react-helmet` och liknande (runtime-beroende för taggar som aldrig ändras), `vite-plugin-sitemap` (ett beroende för en fil med en `<loc>`), taggarna för hand i `index.html` (domänen på fem ställen och namnet i JSON-LD utan källa) |

| **`@hcaptcha/react-hcaptcha`** | hCaptchas **officiella** React-paket. Sköter skriptladdning, livscykel i React:s modell, skydd mot omrendering och — avgörande — `resetCaptcha()`, som arkitekturen kräver i två lägen. hCaptchas JavaScript laddas externt i **alla** alternativ, så frågan är inte "beroende eller inte" utan vem som skriver limmet. | Web3Forms klientskript som fyller en `div` React äger, **utan dokumenterad återställning**; och att ladda `api.js` själva, vilket flyttar hela livscykeln till oss att underhålla |

**Runtime-beroenden totalt: `react`, `react-dom`, `@hcaptcha/react-hcaptcha`.
Inget mer.**

---

## Designtokens

### Accentfärg — mätning — accenttokenets värde UPPHÄVT 2026-11-07, se M5 — källan `logo.png` och `#FC6F03` som loggans färg UPPHÄVDA 2026-11-07, se M20 (loggans ruta är `--accent` `#ff6b00`)

> Mätningen av loggans orange står kvar som fakta om loggan. **Sidans accenttoken
> är `--accent: #ff6b00`** enligt uppdraget och Jelals beslut 4. Raden "Ändra den
> inte" i `tokens.css` skrivs om i P2.

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

### Färger — UPPHÄVT 2026-11-07, se M5

**Gäller i stället:** `:root` och översättningstabellen i "M5 — Tokens". Tabellen
nedan är historik, och inget av dess namn finns efter P2.

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
| ~~`--color-text-dim`~~ | ~~`#6E6E76`~~ | **BORTTAGET 2026-10-08.** Föll på WCAG AA: 3,893:1 mot `--color-bg` där kravet är 4,5:1. Footern använder `--color-text-muted`. Se "A8 — Footerns kontrast" nedan. |
| `--color-accent` | `#FC6F03` | **Enda accentfärgen.** Ifyllda pills, länkhover, fokusring, streck |
| `--color-accent-hover` | `#FD9140` | Hover/aktivt läge på accentytor. Samma kulör, ljushet 50 % → 62 %. |
| ~~`--color-accent-soft`~~ | — | **BORTTAGET.** Noll användningar i `src/`. Infördes "vid behov" — alltså utan behov. Se noten under tabellen. |
| `--color-on-accent` | `#0B0B0C` | **Text ovanpå orange yta.** Mörk text, inte vit. |
| `--color-overlay-grey` | `rgba(32, 32, 36, 0.45)` | Grå tonplatta över profilbilden (paket 3) |
| `--color-focus` | `#FC6F03` | Fokusring. Binds om i `.surface-light` — se "Fokusringen". |
| `--color-error` | `#F85149` | **Formulärets uppmärksamhetsfärg**: obligatorisk-asterisken och felmeddelandena. 5,87:1 mot `--color-bg`. Binds om i `.surface-light` till `#C0271E`. Jelals beslut 2026-10-07 — se "Asterisken är röd". |
| `--color-field-border` | `#606068` | Ram på formulärfält. **3,16:1** mot `--color-bg` — WCAG 1.4.11 kräver 3:1 för gränssnittskomponenters avgränsning, och `--color-border` (1,38:1) duger inte. |

### A8 — Footerns kontrast: `--color-text-dim` tas bort — beslutat 2026-10-08 — tokennamn och kvoter UPPHÄVDA 2026-11-07, se M5

> Principen gäller: varje texttoken bär sin uppmätta kvot mot varje bakgrund det
> står på. Namnen och talen nedan gäller den gamla paletten. De nya kvoterna mäts i
> P2 (M5).

Uppmätt (`LARDOMAR.md` 2026-10-08, incheckat som `ee67b2e`):
`Footer.module.css:20` sätter `color: var(--color-text-dim)` på text i
`--text-sm` (14 px) mot `--color-bg`. **3,893:1 mot AA-kravet 4,5:1** — ett brott
mot WCAG 1.4.3. Tröskeln 3,0:1 gäller bara stor text (≥ 24 px, eller ≥ 18,66 px
fet) och är inte tillämplig; teckensnittet har dessutom bara vikt 400, så "fet"
finns inte som utväg någonstans i projektet.

| Token | Värde | Kvot mot `--color-bg` | Utfall |
|-------|-------|----------------------|--------|
| `--color-text` | `#EDEDEF` | 16,827:1 | OK |
| `--color-text-muted` | `#A1A1A8` | 7,662:1 | OK |
| `--color-text-dim` | `#6E6E76` | **3,893:1** | **FALLER** |

**Beslut: footern använder `--color-text-muted`, och `--color-text-dim` tas bort
ur `:root`.**

Två vägar fanns. Den avfärdade först: **höja värdet.** Lägsta ton som räcker med
`#6E6E76`:s karakteristik behållen är `#797981` (4,558:1) — 0,058 marginal, mindre
än projektet accepterat någon annanstans. Kandidater med marginal fanns
(`#8A8A92` 5,744:1, `#909098` 6,210:1, `#95959D` 6,618:1, `#9A9AA2` 7,043:1), men
de leder alla till **ett token vars namn fortfarande säger `dim`** och vars enda
konsument är en rad i footern. Och det är just namnet som är rotorsaken: lärdomen
säger att tokenet fick ligga kvar genom varje tidigare kontrastmätning därför att
namnet förklarade sitt eget låga värde. Ett nytt hexvärde lämnar den mekanismen
kvar, laddad.

Den valda vägen tar bort mekanismen: **tokenet vars namn var skälet försvinner ur
projektet.** `--color-text-muted` är enda läsaren efter detta, uppmätt 7,662:1,
och footern skiljs redan från sidan av sin `border-top` och av `--text-sm` — den
behöver inte en tredje svagare ton för att läsas som underordnad. Kostnaden är
verklig och skrivs ut: **footern får samma ton som annan dämpad text och tappar
sin egen nivå i texthierarkin.** Behövs en tredje nivå någon gång införs den av en
komponent som har ett krav, med kvoten mätt först — inte i väntan på en.

**Fyra följdändringar, alla i samma ändring** (`LARDOMAR.md` 2026-10-08: en
borttagning är inte klar förrän `grep` på tokennamnet är gjord och redovisad):

| Fil | Åtgärd |
|-----|--------|
| `src/components/Footer.module.css:20` | `color: var(--color-text-muted);` |
| `src/styles/tokens.css:95` | Deklarationen tas bort |
| `src/styles/tokens.css:219-226` | Kommentarsblocket om den borttagna `.surface-light`-ombindningen tas bort — det beskriver ett token som inte finns |
| `src/components/ContactForm.module.css:90` | Kommentaren namnger `--color-text-dim` som det avfärdade alternativet. Skrivs om utan tokennamnet: fältets hjälptext ligger på `--color-surface` och kvoten är kravet |

**Och varje `--color-text*`-token bär sin uppmätta kvot i `tokens.css`** efter
detta, i formen `/* <token> mot <bakgrund>: X,XXX:1 — AA <normal|stor> */`, mot
**varje** bakgrund det faktiskt används mot. Det är lärdomens bindande regel, och
den gäller också de ytor A5 och A6 inför: `--color-text` mot `--color-surface`
(chips) och mot `--color-bg-top` (konturknappens text).

**Två av dem är redan uppmätta — av paket B, i webbläsaren, mot hero:s yta.** De
skrivs in i `tokens.css` av **paket J**, som äger filen; paket B mätte dem och
lämnade dem här, vilket var rätt eftersom `tokens.css` inte ligger i B.
Deklarationerna, som ska stå tecken för tecken:

```css
/* --color-text mot --color-bg-top: 12,226:1 — AA normal */
/* --color-text-muted mot --color-bg-top: 5,567:1 — AA normal */
```

Kvoten för `--color-text` mot `--color-surface` (chipsen) mäts i **paket E** och
förs in av J på samma sätt. Saknas en mätning när J körs är raden inte
byggarens att uppskatta — den hämtas ur det paket som äger ytan.

> **Två token har tagits bort för att de saknade konsument, och det skälet är värt
> att minnas.** (`--color-text-dim` är ett tredje borttaget token, men av ett annat
> skäl — se A8 ovan: det hade en konsument och en otillräcklig kvot.)
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
| ~~`--space-1`~~ | ~~`0.25rem` (4px)~~ — **UPPHÄVT 2026-11-07, se M15b punkt 1:** konsumenten `SkillChip.module.css` togs bort i P11, och M5h fällde tokenet |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.5rem` (24px) |
| `--space-6` | `2rem` (32px) |
| `--space-7` | `3rem` (48px) |
| `--space-8` | `4rem` (64px) |
| ~~`--space-9`~~ | ~~`6rem` (96px)~~ — **UPPHÄVT 2026-11-07, se R5:** ingen konsument, tas bort i G1-rättningen |
| `--space-10` | `8rem` (128px) |

Sektionernas vertikala luft: `padding-block: clamp(var(--space-8), 10vw, var(--space-10))`.
Det ger de generösa marginalerna som förebilden har, utan att spräcka 360 px.

### Typografi — UPPHÄVT 2026-11-07, se M1 och M5

**Gäller i stället:** typsnittstokens och grundtypografi i M1, och textskalan,
radhöjderna, spärrningarna och vikterna i M5. Det nedan är historik.

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

### Typsnittet — Didact Gothic, en enda vikt — UPPHÄVT 2026-11-07, se M1

> Hela avsnittet och dess fem underavsnitt är historik. Varje underavsnitt bär sin
> egen märkning. Principerna som lever vidare står i M1: självhostat, ingen preload,
> `font-display: swap` och mät artefakten.

Jelals val 2026-10-03. Teckensnittet finns **bara i vikt 400**. Begäran om
`wght@100..900` returnerar enbart `font-weight: 400`-deklarationer.

Det är inte en detalj. Det tar bort ett av typografins två huvudverktyg, och allt
nedan följer av det.

#### 1. Vikt är inte längre en designparameter — UPPHÄVT 2026-11-07, se M1 (vikterna 400/600/700 och grundtypografin)

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

#### 2. Hierarkin bärs av storlek, färg, versaler, spärrning och luft — UPPHÄVT 2026-11-07, se M1 och M5

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

#### 3. Självhostad woff2, inte Google Fonts CDN — filen och placeringen UPPHÄVDA 2026-11-07, se M1 (principen gäller)

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

#### 4. Delmängd, visning och reserv — grinden och filen UPPHÄVDA 2026-11-07, se M1 och M1d (latin, `swap` och ingen preload gäller)

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

#### 5. Vad byggaren måste mäta om efter bytet — UPPHÄVT 2026-11-07, se M1 och M6 (mätningarna efter bytet står i P2 och P3)

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

### Layout, radier och övrigt — UPPHÄVT 2026-11-07, se M5, M6 och M18

**Gäller i stället:** `--content-max: 1180px`, `--content-padding: 1.5rem`,
`--header-height: calc(var(--nav-offset) + var(--nav-height))`, radierna
`3px`/`4px`/`8px`/`14px`/`999px` och tiderna `--duration-*` med `--ease-out`.
`--transition` finns inte. `--z-header: 10` står kvar. Tabellen nedan är historik.

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
| sm | `@media (min-width: 600px)` | ~~Två kolumner skills, större hero-typografi~~ **RÄTTAT 2026-11-08, se M22 punkt 6:** första breddsteget, där rutnät och rader får gå från en kolumn till två. Hero har ingen fråga här (rubriken skalas med `clamp()`) |
| md | `@media (min-width: 900px)` | ~~Hero blir två kolumner (text + bild), nav alltid synlig, tre kolumner skills~~ **RÄTTAT 2026-11-08, se M22 punkt 6:** andra breddsteget, där naven visas i stället för menyknappen (M8) och sektionerna får sin breda layout |

Vilka moduler som byter läge vid varje brytpunkt räknas **inte** upp, varken här
eller i `tokens.css`. Det står i modulerna själva och hittas med `grep -rn "@media" src/components`.
En uppräkning blir fel så fort en modul ändras (LARDOMAR 2026-11-08, "sex
kommentarer", och M22 punkt 6).
| lg | `@media (min-width: 1200px)` | Max bredd slår in. ~~Fyra kolumner skills~~ — **UPPHÄVT av A6:** kompetenserna har kortrutnät 3/2/1 och ingen brytpunkt vid 1200 px. Genomfört i paket E |

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
.navList, .navLink { white-space: nowrap; }   /* .logoName utgår — visuellt dold */

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

Motivering: JSON tillåter inga kommentarer och ingen avslutande komma — med ~~93~~
**(antalet är upphävt av A1 och skrivs inte i prosa)** rader att redigera för hand
är det precis där en ovan redigerare går sönder, och
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
export const PROJECTS_ID = 'projects';
export const SKILLS_ID   = 'skills';
export const ABOUT_ID    = 'about';
export const CONTACT_ID  = 'contact';
export const MAIN_ID     = 'main';   // <main id>, mål för skip-länken
export const MENU_ID     = 'mobile-menu'; // mobilmenyns panel (G1-rättningen, R2)
export const ROOT_ID     = 'root';   // <div id> i index.html, monteringspunkten (G1-rättningen, R2)
export const PROJECT_SEARCH_ID = 'project-search'; // sökfältet i projektfiltret, mål för dess etikett (P9, M11b punkt 9)

export const sections = [ /* se tabellen nedan, id hämtas ur konstanterna ovan */ ];
```

Id:na exporteras som namngivna konstanter eftersom kod ibland behöver ett enskilt
id (logga-länken, heros egen `<section id>`). **Ett sektions-id får aldrig
förekomma som bokstavlig sträng i en `.jsx`-fil** — se "Rättelser efter
granskningen av paket 1".

**Tillägg 2026-11-07 (R2): varje id som sidan sätter med ett fast värde är en
`export const <NAMN>_ID` i denna fil, och bara här.** Det gäller inte bara
sektionerna: `MENU_ID` flyttar hit ur `Header.jsx`, och `ROOT_ID` läses av
`main.jsx`. Valideringen hämtar listan över sidans fasta id genom att läsa varje
export vars namn slutar på `_ID`, så att listan aldrig skrivs två gånger. Ett nytt
fast id i en komponent läggs alltså till här, och då omfattas det av grinden utan
att någon minns att lägga in det. Undantaget är `index.html`, som inte
kan importera. Där står `root` som literal, med en kommentar som pekar på
`ROOT_ID`.

Innehållet är beslutat och ska vara exakt detta, i denna ordning:

| # | `id` | `label` |
|---|------|---------|
| 1 | `projects` | `Projekt` |
| 2 | `skills` | `Kompetenser` |
| 3 | `about` | `Om mig` |
| 4 | `contact` | `Kontakt` |

Båda fälten är obligatoriska på **varje** post. Inga undantag, inga valfria fält.
Footern är inget navmål och får inget `id`.

**Ordningen är Jelals, beslutad 2026-10-07:** *"Lägg projekt sektionen över
kompetenser så att mina projekter syns, sen ska de vara en liten sektion 'om mig'
längre ner men över kontakt sektionen."* Sidans ordning blir alltså
**hero → projekt → kompetenser → om mig → kontakt**.

Skälet står i hans egen mening: kompetenssektionen är 2338 px hög på desktop och
betydligt mer på mobil, så projekten låg bakom en vägg.

#### `sections.js` blir åter enda källan för sidans ordning

Granskaren har påpekat att `sections.js` **lovar** att listans ordning är sidans
ordning, men att `App.jsx` renderar namngivna komponenter i en egen fast ordning.
Ordningen bodde alltså på två ställen.

**Den här ändringen är precis det fall där de glider isär.** Att flytta projekt
före kompetenser kräver en redigering på båda ställena, och den som bara gör den
ena får en sida vars nav och innehåll säger olika saker.

**Beslut: `App.jsx` mappar över `sections` och slår upp komponenten.**

```jsx
const SECTION_COMPONENTS = {
  [PROJECTS_ID]: Projects,
  [SKILLS_ID]:   Skills,
  [ABOUT_ID]:    About,
  [CONTACT_ID]:  Contact,
};
```

Hero ligger kvar utanför listan och renderas först, som tidigare.

**Att ändra ordning blir då en redigering på ett ställe.** Att lägga till en
sektion kräver fortfarande två — posten i `sections.js` och raden i uppslaget —
men det är en sällsynt operation, medan omordning är den som just hänt och som
kommer att hända igen.

> **Uppslaget är konfiguration, inte logik.** Min regel att `App.jsx` inte ska ha
> egen logik gäller fortfarande: det här är en tabell som kopplar ett id till en
> komponent, utan villkor och utan beräkning.

**Och den kvarvarande tvåställeskopplingen görs mekanisk, inte ihågkommen.** Ny
verifieringspunkt: den renderade sidan ska innehålla **exakt** de sektioner som
står i `sections.js`, **i samma ordning**. Kontrollen mäter utdata, inte markup —
den fångar både en post utan komponent och en komponent som renderas i fel
ordning.

En statisk grind i `validate-data.mjs` övervägdes och valdes bort: den hade behövt
läsa `App.jsx` som text och gissa sig till uppslagets innehåll. **Att mäta den
renderade sidan är både enklare och svårare att lura.**

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

Formen är omgjord 2026-10-08 (beslut **A2**). Kategoriindelningen är de nio
grupperna i "Kompetenssektionen görs om från grunden".

```js
/**
 * @typedef {Object} Skill
 * @property {string} name   OBLIGATORISK. Visas som text i chipset. Unikt i HELA filen (React-key).
 *
 * @typedef {Object} SkillGroup
 * @property {string}  id      OBLIGATORISK. Unikt, gemener, bara a-z0-9-. React-key och rubrik-id.
 * @property {string}  title   OBLIGATORISK. Svensk gruppubrik.
 * @property {Skill[]} skills  OBLIGATORISK. Minst en post.
 */
export const skillGroups = [ /* de nio grupperna, skrivs i paket D */ ];
```

En **skill-post ser exakt ut så här**, inget mer:

```js
{ name: 'React (Hooks, Context)' },
```

#### A2 — `filled`, den orange fyllningen och teckenförklaringen, beslutat 2026-10-08 — tokennamnen UPPHÄVDA 2026-11-07, se M5 (beslutet gäller)

**`filled` TAS BORT. Det får inte stå kvar, inte ens med en kommentar om ett
framtida paket.** Den nya listan har ingen ifylld/dämpad-dimension — allt i den är
sådant Jelal kan — och ett fält utan verkan är död data (`LARDOMAR.md`
2026-10-02). Det finns inget framtida paket som läser det.

Följderna, alla tre beslutade här och genomförda i paket D och E:

| Vad | Beslut |
|-----|--------|
| `filled` på varje skill | **Borta** ur typedef, ur datan och ur grinden. Ett kvarglömt `filled` fälls av grinden "okänt fält på skill" i A1 |
| Chipsets två tillstånd (orange fylld / dämpad outline) | **Ett enda tillstånd.** Chipset ser likadant ut för varje post |
| Raden `De orange har jag arbetat med.` | **Borta.** `LEGEND`-konstanten, `<p className={styles.legend}>` och `.legend`-regeln tas bort i samma ändring. En teckenförklaring som förklarar en skillnad som inte finns är inte neutral, den är vilseledande |
| `--color-accent` i kompetenssektionen | **Används inte där längre.** Orange bor kvar i fokusringen, headerns märke, formulärknappen och heros primärknapp (A5) |
| `--color-on-accent` | **Står kvar.** Heros primärknapp är dess konsument efter detta (A5). Ta inte bort tokenet med hänvisning till att de fyllda chipsen försvann |

**De 270 markeringarna försvinner.** Det är Jelals att godkänna, inte mitt — det
står som öppen punkt i `PLAN.md`. Mekanismen är min, och den är: inget halvt läge.
Att behålla `filled` "i väntan på" en framtida återinföring hade gett ett fält som
inte renderar något, alltså exakt den döda datan som posten 2026-10-02 handlar om.
Listan ligger kvar i git-historiken.

Regler som byggaren måste följa:

- **Inga andra fält.** Ingen nivå, inget procenttal, ingen ikon, ingen
  sorteringsvikt, ingen `filled`. Uppdraget förbjuder uttryckligen nivåmätare, och
  grinden i A1 fäller varje okänt fält.
- Varje namn skrivs **tecken för tecken som i Jelals uppdrag 2026-10-07** —
  inklusive parenteser, snedstreck, plus och versaler. `JavaScript (ES6+)`,
  `Swagger/OpenAPI`, `CSS (Grid, Flexbox, responsiv design)`, `MFA (TOTP)`,
  `CI/CD-pipelines (YAML)` och `Hotmodellering (STRIDE)` är de som är lättast att
  råka städa i. Det är Jelals lista, inte vår. **Källistorna `skills.txt` och
  `skills-full.txt` är INTE längre stavningsnorm** — där står `Swagger` och
  `Testdriven utveckling (TDD)`, och den som "rättar" efter dem bryter uppdraget.
- **Inget fast totalantal.** Se A1: antalet är en upplysning, strukturen är
  grinden.
- En skill per rad, `{ name: '...' },`, så att Ctrl+F på namnet hamnar på den rad
  som ska ändras. Byggaren formaterar inte om filen till flerradiga objekt.
- Filen inleds med en kommentar på svenska som förklarar just detta. **Den gamla
  kommentaren lovar saker om 307 poster och om att ändra `false` till `true` — den
  skrivs om i paket D, i samma ändring.** Ett löfte i en fil Jelal redigerar får
  aldrig vara osant (`LARDOMAR.md` 2026-10-05).

#### Nästlad struktur, inte platt lista med kategorifält — formatregeln rättad av A17

**Beslut: nästlad.** Kategorin är `skillGroups`-postens plats i trädet, inte ett
värde på varje skill.

Det avgörande skälet är **inte** läsbarhet utan felläge. En platt lista hade krävt
ett `category: 'frontend'`-fält per post, alltså en handskriven sträng per
kompetens som var och en måste matcha en kategoridefinition. En felstavning där
ger antingen en skill som tyst försvinner eller en spök-kategori som tyst dyker
upp — exakt den sortens tysta fel som detta projekt redan har flera nedtecknade
exempel på. I den nästlade formen är en skill i en kategori **därför att den står
där**, och det går inte att placera den i en kategori som inte finns.

Invändningen mot nästlat är att det är svårare att söka i en lång fil. Den faller
på en formateringsregel:

> **En skill per rad, och hela posten på den raden:**
> `{ name: 'React (Hooks, Context)' },`

Då räcker Ctrl+F på namnet för att hamna på exakt den rad som ska ändras — Jelal
söker namnet och rättar stavningen, flyttar raden till en annan grupp eller
raderar den. Han behöver aldrig förstå strukturen. Filens ordning följer dessutom
sidans ordning, så listan och sidan går att ha sida vid sida.

Byggaren ska **inte** formatera om filen till flerradiga objekt, och inte låta en
formaterare bryta raderna.

##### A17 — Detta stycke motsade A2 och är rättat här, inte längre ner — beslutat 2026-10-08

Stycket skrev till och med 2026-10-08 ut `{ name: 'React', filled: false },` som
bindande format, kallade `filled` på samma rad som `name` för den regel som räddar
läsbarheten, och instruerade Jelal att "söka, byta `false` mot `true`, spara". Det
angav också ett antal handskrivna strängar. **Allt tre är upphävt:** `filled` är
borta ur typedef, data och grind (**A2**), och antal skrivs inte i prosa (**A1**).

**Byggaren i paket D följde A2 och rapporterade motsägelsen i stället för att
tolka den. Det var rätt** — `LARDOMAR.md` har tre poster om motsatsen, och regeln
säger uttryckligen att det senast daterade gäller och att motsägelsen lämnas
tillbaka till mig. Felet var mitt: **ett nytt beslut ska ändra varje äldre stycke
om samma sak i samma redigering**, och A2 lades till utan att detta stycke rördes.
Rättelsen står därför här, på beslutets ursprungliga plats, och inte som en
motsägelse längre ner i dokumentet.

Formatregeln i sig står fast: **en rad per skill**, hela posten på raden. Den
regeln hängde aldrig på att `filled` fanns — den hänger på att Ctrl+F landar på
den rad som ska ändras.

### Kompetenssektionen görs om från grunden — beslutat av Jelal 2026-10-07

**Från 307 kompetenser i 18 grupper till ungefär 60 i nio grupper.** Det är ett
beslut, inte en rättelse: Jelal har sett vad som försvinner och valt ändå.

De nio grupperna, i denna ordning, med id:

| # | `id` | `title` |
|---|------|---------|
| 1 | `backend` | Backend |
| 2 | `frontend` | Frontend |
| 3 | `mobil` | Mobil |
| 4 | `databaser` | Databaser |
| 5 | `sakerhet` | Säkerhet |
| 6 | `testning-och-kvalitet` | Testning och kvalitet |
| 7 | `devops` | DevOps |
| 8 | `arbetssatt` | Arbetssätt |
| 9 | `ai-i-utveckling` | AI i utveckling |

Innehållet skrivs av **exakt** ur Jelals meddelande, tecken för tecken.

#### Vad som utgår, uppräknat — tokennamn och `.surface-light` UPPHÄVDA 2026-11-07, se M2 och M5 (uppräkningen gäller)

Det här är en betydande mängd verifierat arbete, och det ska stå utskrivet vad som
faller — inte försvinna tyst.

| Utgår | Varför |
|-------|--------|
| **`filled`-fältet på varje skill** | Den nya listan har ingen sådan dimension |
| **Pillarnas två tillstånd** — orange fylld mot dämpad outline | Följer av ovan |
| **`SkillPill`s `filled === true`-gren** | Död kod |
| **Teckenförklaringen** "De orange har jag arbetat med…" | Förklarar en skillnad som inte finns |
| **De 270 markeringar Jelal gjort** | Ingen plats att bo på |
| **Indelningen i 18 grupper**, dubblettlösningen, de tolv nära-dubbletterna, `MERGED`-tabellen | Ersätts av nio grupper med nytt innehåll |
| **Fyra korsreferensgrindar** mot `skills.txt` och `skills-full.txt` | Källistorna är inte längre källa |
| **Flerkolumnlayouten** (`columns: 1/2/3/4`) | Ersätts av ett kortrutnät |

**Det här står kvar och ska inte röras:**

- **Teckengrinden** — varje tecken i `src/data/` måste täckas av typsnittsfilen.
  Den är inte knuten till källistorna och gäller oförändrat.
- **`--color-on-accent`** överlever trots att de fyllda pillarna försvinner: heros
  primärknapp blir en orange yta med mörk text och behöver tokenet.
- **`--color-error` och dess ombindning i `.surface-light`** hör till formuläret,
  inte till skills. Opåverkade.

#### `skills.txt` och `skills-full.txt` — historik, inte källa

**Filerna står kvar i arkivet, men är inte längre källa för någon grind.**

Att radera dem avfärdas. De är Jelals egna ord, de dokumenterar vad sektionen var,
och arkivet är publikt. Att ersätta dem med den nya listan avfärdas också — då
förlorar vi historiken utan att vinna något, eftersom den nya listan redan bor i
`skills.js`.

**Den nya listan är sin egen källa.** Det finns ingen andra lista att jämföra mot,
och därmed ingen korsreferens att göra.

#### Vad som ersätter korsreferensgrindarna

De fyra grindarna fanns för att inget av Jelals skulle falla bort tyst. Med en
lista i stället för två försvinner den mekanismen, och ett hårdkodat antal är
uttryckligen bortvalt sedan tidigare — det fallerar av fel skäl så fort han ändrar
något.

> **~~Ersättning: en grind på gruppernas id och ordning.~~ UPPHÄVT 2026-10-08,
> samma dag jag skrev den.** Nio namngivna id i en fastlåst ordning är
> **innehåll**, inte struktur. Lägger Jelal till en tiondegrupp, byter ordning
> eller döper om en grupp — tre ändringar han äger — fäller grinden bygget på helt
> korrekt data, och det är exakt det fel som gjorde korsreferensen oanvändbar.
> Jag upprepade felet jag just rättade, en nivå upp.
>
> Ordningen och de nio id:na verifieras i stället **en gång**, maskinellt, i
> paket D mot uppdragstexten. Gällande grind står i **"A1 — Grinden för
> `skills.js` är strukturell"**, i avsnittet "Validering av datafilerna".

Kvar gäller också: varje namn unikt i hela filen, varje grupp minst en post, varje
grupp har `title`.

#### Ny struktur: kort med chips

```css
.grid { display: grid; gap: var(--space-6); grid-template-columns: minmax(0, 1fr); }
@media (min-width: 600px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 900px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
```

**Inget spår skrivs som bara `1fr`.** Regeln har bitit två gånger.

- Varje grupp är ett **kort** med `h3`-rubrik.
- Kompetenserna är **chips i en riktig `<ul>` med `<li>`** — en lista ska vara en
  lista, och skärmläsaren annonserar antalet.
- `align-items: start` på rutnätet, så att ett kort inte sträcks av sin granne.
- Ingen procentstapel, ingen nivåmätare, ingen sortering på kunnande.

Rubrikordningen håller: ett `h1` (namnet), `h2` per sektion ur `sections.js`, `h3`
per kompetensgrupp.

#### Chipsens färg — ett utseendeval att lägga fram — UPPHÄVT 2026-11-07, se M15 (chipsen får filterchipsens stil) — RÄTTAT 2026-11-18: M15 gäller, chipsen har filterchipsens grå stil (~~ifyllda `#f6f4f0`, M25~~, ~~ifyllda orange, M26~~, ~~kant och text i `--accent`, M26~~ UPPHÄVDA, Jelals beslut "Tillbaka till grå")

Med `filled` borta finns ingen skillnad kvar för orange att bära.

| Alt | Chips | Följd |
|-----|-------|-------|
| **A** | neutrala: `--color-surface` botten, `--color-border` ram, `--color-text` text | Orange försvinner ur sektionen. Accenten blir heros primärknapp och fokusringen. |
| B | orange fyllda, `--color-on-accent` text | Närmast dagens utseende, men 60 täta orange ytor i nio kort är betydligt kompaktare än 270 utspridda över 2338 px |

**Byggt: A.** Skälet är att orange hittills har *betytt* något — "den här behärskar
jag" — och när betydelsen försvinner blir färgen dekoration. En accent som används
på allt accentuerar inget.

**Men det är en synlig förändring Jelal inte har bett om, och den ska läggas fram.**
Hans specifikation säger "chips" utan att nämna färg.

#### Fem punkter i specifikationen som inte stämde

Lösta i förväg, och skrivna här så att ingen försöker igen:

| Specifikationen sa | Vad som gäller |
|---------------------|----------------|
| `src/data/skills.ts` | **`.js`** — projektet är inte TypeScript |
| `#projekt`, `#kontakt` | **`#projects`, `#contact`** — våra befintliga id. Att döpa om dem bryter nav, `aria-current`, sektionsavgränsarna och `sections.js` |
| "använd ikonbiblioteket som redan finns" | **Det finns inget.** Se nedan |
| "lugn in-animation om sidan redan använder animationer" | Sidan gör inte det, och specifikationen säger då själv "annars ingen". **Ingen animation.** |
| "kontrollera även undersidor" | **Det finns inga.** Sidan är en enda |

#### A3 — Inga ikoner, bekräftat som beslut 2026-10-08 — UPPHÄVT 2026-11-07, se M9

> **Gäller i stället:** tre egna inline-SVG (meny, stäng, sök), som var och en har
> en funktion och står med en dold text eller etikett. **Inget nytt beroende
> gäller fortfarande**, och den raden i tabellen nedan står fast. Kompetenskorten
> får fortfarande inga ikoner. Det skälet ("en gissad symbol är sämre än ingen")
> gäller, och uppdraget 2026-11-07 ber inte om dem. Det som upphävs är "inga
> ikoner" som regel för hela sidan.

Premissen var fel — projektet har noll ikonberoenden, och det är ett medvetet
läge: jag har avvisat ikonbibliotek tidigare med motiveringen att inga ikoner är
beställda. Uppmätt 2026-10-08: körtidsberoendena är `react`, `react-dom` och
`@hcaptcha/react-hcaptcha`. **"Ikonbiblioteket som redan finns i projektet" finns
inte.**

Alternativet vore nio inline-SVG:er att rita, namnge och underhålla. **Och de
skulle tillföra mindre än orden de står bredvid** — "Arbetssätt" och "Testning och
kvalitet" är begrepp utan självklar bild, och en gissad symbol är sämre än ingen.

**Beslut: inga ikoner. Tre vägar är stängda, alla tre uttryckligen:**

| Väg | Varför stängd |
|-----|---------------|
| Nytt körtidsberoende (`react-icons`, `lucide-react`, `@heroicons`) | Det vore projektets första beroende tillagt för utseendets skull. Linjen "minsta möjliga antal beroenden" har hållit genom åtta paket, och ett ikonbibliotek för nio dekorativa symboler är inte skälet att bryta den. Byggaren får **inte** lägga till det, och `package.json` jämförs före och efter paket E |
| Nio egna inline-SVG:er | Nio symboler att rita, namnge, underhålla och tillgänglighetsmärka — för att säga samma sak som rubriken redan säger. Fyra av nio grupper (Arbetssätt, Testning och kvalitet, AI i utveckling, DevOps) har ingen självklar bild |
| Emoji eller ett tecken i ett `::before` | En emoji renderas i systemets eget teckensnitt, utanför både Didact Gothic och teckengrinden, och ser olika ut i varje operativsystem. Ett dingbat-tecken finns inte i delmängden |

**Kortets rubrikrad innehåller alltså bara `h3`-texten.** Inget `<svg>`, inget
`aria-hidden`-span, inget `::before`-innehåll, och inget `icon`-fält i
`skills.js` — grinden i A1 fäller ett sådant fält som okänt.

Detta är en **avvikelse från uppdragets bokstav** och ska sägas vid LEVERANS, inte
döljas: Jelal bad om "en liten ikon" per kort. Vill han ha dem är det ett eget
beslut och ett eget paket, och då ritar vi dem själva — beroendet läggs inte till.

### Skills — kategoriindelning

> **UPPHÄVT i sin helhet 2026-10-07.** De 18 grupperna, dubblettlösningen, de tolv
> nära-dubbletterna och korsreferensen mot källistorna gäller inte längre. Se
> "Kompetenssektionen görs om från grunden" ovan. Avsnittet står kvar som historik
> över hur den gamla listan hanterades — **bygg inget efter det.**
>
> **Städat 2026-10-08 (paket M):** märkningen på denna rubrik räckte inte. Varje
> `####` nedan bär nu sin **egen** märkning, eftersom läsaren kommer via Ctrl+F på
> en sträng och inte uppifrån. Genomförandet av det som gäller i stället ligger i
> **paket D** (datan och grindarna) och **paket E** (renderingen), båda klara.

#### Hur abstraktionsnivån hanteras — principen gäller, exemplen är ur den gamla listan

Listan är inte homogen. Den innehåller breda yrkesbegrepp (`Systemutveckling`),
ramverk (`React`), finkorniga API-ytor (`TouchableOpacity`), arbetssätt
(`Kodgranskning`) och ett sammanhållet AI-block. Att visa `Systemutveckling` och
`TouchableOpacity` som likvärdiga pills bredvid varandra säger något oavsiktligt
om nivån.

**Beslut: indelningen är ämnesmässig, men kategorinamnen är valda så att
abstraktionsnivån framgår av namnet.** Ingen separat nivådimension, inget extra
fält, ingen rangordning.

**De gruppnamn som nämns som exempel i detta stycke är UPPHÄVDA** — de hör till de
18 gamla grupperna (se tabellen över förbjudna strängar, raden om de gamla
gruppubrikerna). Principen att rubriken ska bära abstraktionsnivån står kvar och
prövas mot den nya listan i styckets sista avsnitt.

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

#### Så specificeras indelningen — deltan, inte en ny lista — ~~gällande~~ UPPHÄVT 2026-10-08, se A1

> **UPPHÄVT av A1.** `skills-full.txt` och `skills.txt` är inte längre källa för
> något, och det finns ingen indelning att specificera som delta — den nya listan
> är sin egen källa. Antalen `292` och `267` är den gamla listans. **Genomfört i
> paket D.**

`skills-full.txt` **innehåller redan en placering för var och en av sina 292
poster**. Att skriva av alla 267 namnen hit vore att skapa en andra sanning som
kan glida isär från hans fil, och att införa ~300 tillfällen att stava fel.

**Därför specificeras bara avvikelserna:** vilka kategorier som slås ihop, delas
eller löses upp, var de 56 gamla posterna hamnar, och hur varje dubblett och
nära-dubblett avgörs. **Allt annat behåller Jelals placering ur `skills-full.txt`.**

#### Grupperna — 18 stycken — ~~gällande~~ UPPHÄVT 2026-10-07, se "Kompetenssektionen görs om från grunden"

> **UPPHÄVT.** Gällande är **nio** grupper med de id och titlar som står i
> "Kompetenssektionen görs om från grunden" ovan. Varje grupp-id och varje
> gruppubrik i detta underavsnitt är en **förbjuden sträng** enligt tabellen högst
> upp. **Genomfört i paket D.**

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

#### De 56 gamla posterna — var var och en hamnar — ~~gällande~~ UPPHÄVT 2026-10-08, se A1 och A2

> **UPPHÄVT.** De 56 posterna kommer ur den gamla listan, som inte längre är
> källa (A1), och fältet `filled` finns inte (A2). **Genomfört i paket D:**
> `src/data/skills.js` innehåller nio grupper med uppdragets egna punkter, varje
> post med `name` som enda fält.

~~Dessa är `filled: false`.~~ **UPPHÄVT av A2** — fältet finns inte. Ingen av dem
byter namn.

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

~~Summa: 2+10+5+7+11+6+8+1 = **50 `filled: false`**.~~ **UPPHÄVT av A1 och A2** —
inget antal grindas och fältet finns inte. De återstående 6 av de 56 är
nära-dubbletter: `JavaScript (ES6+)`, `CSS3`, `Dependency injection`,
`Pull requests`, `Controllers`, `HTTP-metoder (GET, POST, PUT, DELETE)`.

> ~~Av dessa 6 blir **två egna poster med `filled: true`** (`JavaScript (ES6+)` och
> `HTTP-metoder (GET, POST, PUT, DELETE)`, eftersom de är `MERGED`-mål) och **fyra
> stryks helt**. Se "De två `MERGED`-målen" nedan.~~
>
> **UPPHÄVT av A1 och A2.** Det finns inga sammanslagningar och alltså inga
> `MERGED`-mål, och `filled` är borta. Ingen av de sex posterna står på sidan.
> **Genomfört i paket D.**

#### De 25 exakta dubbletterna — en hemvist var — ~~gällande~~ UPPHÄVT 2026-10-07, se A1

> **UPPHÄVT.** Dubblettlösningen gällde två källistor som inte längre är källa.
> **Genomfört i paket D.**

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

#### Nära-dubbletterna — regeln och de tolv fallen — ~~gällande~~ UPPHÄVT 2026-10-08, se A1

> **UPPHÄVT.** De tolv fallen uppstod när 307 rader plockades ur två källistor för
> hand. Med en kurerad lista finns inga nära-dubbletter att avgöra, och ingen av
> de strukna eller behållna strängarna står på sidan. **Genomfört i paket D.**
> Regeln i sig (svenskt före engelskt, annars mest information, annars senaste
> ordet) är ingen gällande grind — den var ett engångsverktyg.

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

#### Förväntat antal: 307 — ~~gällande~~ UPPHÄVT 2026-10-08, se A1 och A19

> **Vad som gäller i stället:** **inget antal är ett arkitekturtal och inget antal
> grindas.** Antalet grupper och kompetenser redovisas som **UPPLYSNING** i
> valideringens OK-rad, med uppmätta tal — formatet står i "A19 — OK-raden är ett
> FORMAT". **Genomfört i paket D.**
>
> Allt nedan i detta underavsnitt, inklusive talen `307`, `267`, `257` och `12`
> och hela uträkningen, är **UPPHÄVT** och står kvar som historik över hur den
> gamla listans summa räknades fram. **Bygg och grinda inget efter det.**

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
| + `MERGED`-mål som bara finns i den gamla listan och därför måste vara egna poster (UPPHÄVT, A1 — inga sammanslagningar finns) | +2 |
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

#### De två `MERGED`-målen ur den gamla listan — ~~gällande~~ UPPHÄVT 2026-10-08, se A1 och A2

**Vad som gäller i stället:** `skills.js` innehåller **nio grupper** med
uppdragets egna punkter, och **varje post har `name` som enda fält**. Det finns
ingen sammanslagningstabell, inget `MERGED`-mål och inget `filled` — grinden
"okänt fält på skill" i **A1** fäller båda om de kommer tillbaka. Ingen av de två
strängarna nedan står på sidan. **Genomfört i paket D.**

Hela stycket nedan är **UPPHÄVT** och står kvar därför att frågan en gång var
avgjord åt andra hållet: de två posterna *skulle* ha funnits, och de *skulle* ha
varit ifyllda. Den som läser A2 ska kunna se vad A2 tog bort.

> ~~**Dokumentet motsade sig självt här:** avsnittet om de 56 gamla posterna sa att
> de 6 nära-dubbletterna löses upp "i stället för att läggas till som egna poster",
> medan nära-dubblettabellen gör två av dem till `MERGED`-mål. Ett mål som inte är
> en post bryter grinden "varje `MERGED`-mål finns i `skills.js`".~~
>
> ~~**Byggarens tolkning är rätt och är nu beslutet:**~~
>
> | Post | `filled` | Varför |
> |------|----------|--------|
> | `JavaScript (ES6+)` | ~~`true`~~ | ~~Bär `JavaScript` ur `skills-full.txt`~~ |
> | `HTTP-metoder (GET, POST, PUT, DELETE)` | ~~`true`~~ | ~~Bär `HTTP-metoder`, `GET`, `POST`, `PUT` ur `skills-full.txt`~~ |
>
> ~~`filled: true` därför att strängen bär namn Jelal uttryckligen sagt att han har.
> Hade de satts `false` skulle en kompetens han äger visas som omarkerad, vilket är
> sämre än att en gammal sträng råkar bli orange. Att de två **också** fanns i den
> gamla listan är en tillfällighet i strängvalet, inte ett påstående om hans nivå.~~
>
> ~~De övriga 4 av de 6 (`CSS3`, `Dependency injection`, `Pull requests`,
> `Controllers`) är **inte** poster — deras `MERGED`-mål finns redan i
> `skills-full.txt`.~~

#### Det som INTE har gjorts — gäller den gamla listan, UPPHÄVD 2026-10-07

Ingen post har omdöpts, omstavats eller fått ändrad versalisering utöver de
nära-dubbletter som räknas upp ovan. Ingen kategori har tagits bort utan att dess
innehåll fått ett namngivet nytt hem.

### Ljus yta — Kompetenser får vit bakgrund, beslutat av Jelal 2026-10-05 — UPPHÄVT 2026-11-07, se M2

> **`.surface-light` tas bort helt i P2.** ~~Den nya designen är mörk rakt igenom
> (Jelals beslut 4).~~ **UPPHÄVT 2026-11-08, se M23:** Projekt och Om mig är ljusa
> igen (Jelals beslut 9), men med en annan mekanism, andra värden och en annan
> sektion än här. Bygg inget ur detta avsnitt. Hela avsnittet och vart och ett av
> dess underavsnitt är historik och bär sin egen märkning.

Jelal: *"sektionen med kompetens sidan ha bakrunden vit."* Varje färg i sektionen
är vald för mörk botten, så det här är ingen enradsändring.

#### Mekanismen: tokenen binds om på en ytklass, inte nya tokennamn — UPPHÄVT 2026-11-07, se M2

```css
/* tokens.css, direkt efter :root */
.surface-light {
  --color-bg:         #F4F4F6;
  --color-bg-top:     #F4F4F6;   /* hindrar läckage om något ärver den */
  --color-text:       #0B0B0C;   /* 17,9:1 */
  --color-text-muted: #4F4F56;   /* 7,40:1 */
  /* --color-text-dim binds INTE om — se noten nedan */
  --color-border:     #CFCFD4;   /* 1,413:1 */
  --color-surface:       #FFFFFF;   /* kortets egen yta, 1,10:1 */
  --color-focus:         #C25102;   /* 4,28:1 — se "Fokusringen" */
  --color-error:         #C0271E;   /* 5,39:1 — se "Det röda binds om" */
  --color-accent:        #AE4802;   /* 5,13:1 — se "Accenten på ljus yta" */
  --color-accent-hover:  #8F3A01;   /* 6,89:1 */
  /* --color-accent binds INTE om. Se "De ifyllda pillarna". */

  /* Utan dessa två målar klassen ingenting. */
  background-color: var(--color-bg);
  color:            var(--color-text);
}
```

Alla kvoter ovan är mot `--color-bg` i samma block, alltså `#F4F4F6`.

> **`--color-text-dim` band tidigare om till `#6E6E76` — exakt rotens värde.** Det
> var en nolloperation, och dess enda konsument är footern som aldrig ligger på
> ljus yta. **Raden är borttagen.**
>
> Jag räknade fram värdet som uppfyllde 4,60:1 mot `#F4F4F6` och det råkade
> sammanfalla med rotens. Att skriva ned ett värde som inte ändrar något är dött
> fält, och den risk raden skulle ha täckt — att roten ändras och ljusa ytan
> spricker tyst — täcks redan av den generella regeln: **ändras ett rotfärgtoken
> ska varje token mätas om mot varje yta.**

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

#### De dämpade pillarna — härledda ur kvoten, inte ur färgen — premissen UPPHÄVD 2026-10-08 av A2, men värdena står kvar — även värdena UPPHÄVDA 2026-11-07, se M2

> **Läs noten "`--color-border` på ljus yta efter A2" nedan innan du rör ett värde
> här.** Pillarnas två tillstånd finns inte längre (A2), så **motiveringen** i
> detta stycke är upphävd. **Värdena i `.surface-light` är det inte** — de har nya
> konsumenter efter A6. Vilka, och varför inget räknas om, står i noten.

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

##### `--color-border` på ljus yta efter A2 — värdet står kvar, motiveringen byts — UPPHÄVT 2026-11-07, se M2

Avgjort i städpasset 2026-10-08. **Frågan:** `--color-border: #cfcfd4` i
`.surface-light` är ett **omräknat** värde, och målkvoten (`#D9D9DE` mot vitt,
1,4065:1) sattes för **de dämpade pillarnas ram**. Den konsumenten finns inte
efter A2. Står värdet kvar utan skäl, eller ska det räknas om?

**Beslut: värdet står kvar oförändrat. Det är motiveringen som är upphävd, inte
talet.** Tre skäl, i ordning:

1. **Konsumenten finns, den har bara bytt namn.** A6 gör `--color-border` till
   ramen på **kortet** (`.card`) och på **chipset** (`.chip`), båda inuti
   `.surface-light`. Dessutom ärver sektionsavgränsaren hero → skills samma
   ombundna token. Tokenet är alltså inte referenslöst — jämför
   `--color-text-dim`, som **var** det och därför togs bort i A8.
2. **Målkvoten gäller fortfarande, för samma invariant.** Kvoten valdes för att en
   ram ska ha **samma upplevda tyngd på båda ytorna** — `#2A2A2E` mot `#0B0B0C` är
   1,38:1, `#CFCFD4` mot `#F4F4F6` är 1,413:1. Den invarianten är inte knuten till
   vad ramen sitter på. Att räkna om värdet mot ett nytt mål vore att **ändra ett
   gällande beslut**, inte att städa ett upphävt.
3. **WCAG 1.4.11 kräver inte 3:1 här.** Kravet gäller grafiska objekt som behövs
   för att förstå innehållet. Efter A2 bär chipsets ram **ingen** information:
   kompetensens namn står som text i ett `<li>` i en `<ul>`, och det finns inget
   tillstånd kvar som ramen skiljer. Ramen är avgränsning, inte signal. Det är
   samma åtskillnad som redan motiverar att fokusringen binds om men inte
   accenten: en **enda** signal måste hålla kontrastkravet, en **redundant** behöver
   inte. Hade chipset saknat text hade svaret varit motsatt.

**Vad som ändå måste göras, och av vem.** Kommentaren i `src/styles/tokens.css`
("RAMEN ÄR OMRÄKNAD, INTE OMVALD. Målet är att de dämpade pillarnas underordning
…") motiverar värdet med en konsument som inte finns. Den är **samma felläge som
A9 del 1** och faller under den bindande regeln från `LARDOMAR.md` 2026-10-05:
skriv invarianten, inte ett tillstånd någon annanstans. **Genomförandet ligger
inte här** — `tokens.css` ägs av **paket J**, och J:s innehåll är enligt `PLAN.md`
bindande rad för rad och utvidgas inte. Punkten lämnas därför tillbaka till
projektledaren: antingen en rad till i J, eller **L del 3** där de övriga
kommentarsrättelserna redan ligger. Invarianten som ska stå i kommentaren är
*"en ram ska ha samma upplevda tyngd på båda ytorna; kvoten är beslutet, hexvärdet
är en härledning"* — utan ordet pill.

Samma fråga gäller `--color-text-muted: #4F4F56` (7,40:1) i samma block: den
kvoten sattes för den dämpade pillens **text** och bärs i dag av annan text på
ljus yta. Värdet står kvar av samma skäl som ovan — kvoten är målet, konsumenten
är utbytbar.

#### De ifyllda pillarna — accenten ändras inte, och kan inte heller räddas — premissen UPPHÄVD 2026-10-08 av A2 — helt UPPHÄVT 2026-11-07, se M2

> **UPPHÄVT som motivering.** Det finns inga ifyllda pillar (A2) och chipsen är
> neutrala (A6), så orange är inte längre en **yta** i kompetenssektionen. Beslutet
> att `--color-accent` är `#FC6F03` överallt står kvar, men det avsteg från WCAG
> 1.4.11 som beskrivs nedan **gäller inte längre i denna sektion** — det bars av
> den orange pillytan. **Genomfört i paket E** (chipsen är neutrala; kontrasterna
> mättes där). Talet 2,58:1 gäller fortfarande för varje **annan** orange yta som
> hamnar på `#F4F4F6`.

Orange `#FC6F03` som **yta** mot den ljusa bakgrunden `#F4F4F6` ger **2,58:1**,
mot 6,95:1 på mörk botten. Det ligger under WCAG:s 3:1 för grafiska objekt.

**Och det går inte att lösa med bakgrunden.** För att nå 3:1 skulle bakgrunden
behöva vara ljusare än rent vitt. Vitt är alltså *bästa möjliga* fall för orangen,
och räcker ändå inte.

| Bakgrund | Orange som yta mot den |
|----------|------------------------|
| `#FFFFFF` | 2,83:1 |
| **`#F4F4F6`** (gällande) | **2,58:1** |
| `#0B0B0C` (sidans mörka) | 6,95:1 |

**Avstegets storlek är alltså 2,58, inte 2,83.** Talet står utskrivet på flera
ställen och ska hållas rätt: ett medvetet avsteg vars storlek är felskriven är på
väg att bli ett omedvetet.

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

#### Var den ljusa ytan sitter efter omordningen — Jelals val — UPPHÄVT 2026-11-07, se M2 (Jelals beslut 4)

Med den nya ordningen blir rytmen:

**hero (grå) → projekt (mörk) → kompetenser (vit) → om mig (mörk) → kontakt (mörk)**

Två mörka sektioner i rad på slutet. **Det är ingen defekt** — sektionerna skiljs
åt av rubriker och avgränsarlinjer oavsett bakgrund, och omväxlingen är estetisk,
inte funktionell. Men den var en följd av den gamla ordningen, och nu när ordningen
ändrats bör placeringen få bekräftas i stället för att ärvas.

| Alt | Ljus yta på | Rytm |
|-----|-------------|------|
| **A** | Kompetenser (som i dag) | grå, mörk, **vit**, mörk, mörk |
| **B** | Om mig | grå, mörk, mörk, **vit**, mörk |
| **C** | Projekt | grå, **vit**, mörk, mörk, mörk |

**Byggt: A.** Det är statusläget och upphäver inget beslut han redan fattat.

Värt att nämna när frågan läggs fram: **C ligger närmast hans eget skäl till
flytten.** Han flyttade projekten "så att mina projekter syns", och en vit yta
direkt efter hero är det mest iögonfallande sidan har. Men det vore att flytta en
bakgrund han valde för kompetenssektionen, så det är hans beslut och inte mitt.

Byter ytan sektion flyttar `.surface-light` med den, och de ombundna tokenen följer
automatiskt — det var hela poängen med att binda om i stället för att införa egna
namn.

#### Accenten på ljus yta — binds om, och det motsäger inte det tidigare beslutet — UPPHÄVT 2026-11-07, se M2

Byggaren mätte på ett riktigt projektkort:

| Vad | Mot `#F4F4F6` | Krav | |
|-----|----------------|------|---|
| Länktext `--color-accent` `#FC6F03` | **2,579:1** | 4,5 (1.4.3) | **faller** |
| Samma länk, hover `#FD9140` | **2,056:1** | 4,5 | **faller** |

**Gällande: `--color-accent: #AE4802` (5,13:1) och `--color-accent-hover: #8F3A01`
(6,89:1) inuti `.surface-light`.** Kulör 24,4° respektive 24,1° mot rotens 26,0° —
samma orange, mörkare valör.

> **`#C25102` duger inte här, trots att den redan finns i projektet.** Den ger
> 4,70:1 mot **rent vitt**, men ytan är `#F4F4F6` och där blir den **4,28:1** —
> under 4,5. Den valdes för fokusringen, som bara kräver 3:1. **Ett token som
> klarar ett krav klarar inte automatiskt ett hårdare.**

**Varför detta inte motsäger att jag avvisade en mörkare orange för pillarna.**
Den frågan gällde stora färgade *ytor* och 1.4.11:s 3:1, och mitt skäl var att
pillarna då inte längre skulle matcha JQ-märket. Här handlar det om **liten text
och 1.4.3:s 4,5:1** — ett hårdare krav — och ingen jämför en länks textfärg med en
logotyp. Framför allt: det förra var ett utseendeval, det här är ett fel.

**Hover går åt motsatt håll på de två ytorna, och det är avsiktligt.** På mörk
botten ljusnar hovern (`#FC6F03` → `#FD9140`), på ljus mörknar den
(`#AE4802` → `#8F3A01`). Regeln är inte "hover är ljusare" utan **"hover rör sig
bort från underlaget"**. Räta inte ut inkonsekvensen — den är poängen.

#### Kortet får en egen yta igen — UPPHÄVT 2026-11-07, se M2 och M4

`--color-surface` band om till `#F4F4F6`, alltså exakt sektionens egen bakgrund:
kortets kontrast mot sektionen blev **1,000:1**. Kortet var inget kort längre.

**Gällande: `--color-surface: #FFFFFF` på ljus yta**, 1,10:1 mot sektionen.

Det speglar läget på mörk botten, där kortet är `#141416` mot `#0B0B0C` — **1,07:1**.
Kortet har alltså aldrig definierats av sin fyllnad utan av fyllnad **plus** ram,
och den balansen är nu densamma på båda ytorna. Vitt framför mörkare för att
tokenets namn betyder upphöjd yta, och på en ljus sektion ligger det upphöjda
ljusare.

> **Kortets ram på 1,413:1 är inget fel.** Den rapporterades mot kravet 3:1, men
> **1.4.11 gäller gränssnittskomponenter och betydelsebärande grafik** — ett
> projektkort är varken, och tekniketiketterna är inte interaktiva. Länkarna
> *inuti* kortet är komponenterna, och de omfattas av 1.4.3 som nu är åtgärdat.
> Ramen är lika subtil som på mörk botten (1,38:1), där den accepterades. **Att
> behandla den som ett fel skulle ge tunga ramar överallt för att lösa ingenting.**

#### Bakgrunden blir `#F4F4F6` — och vad som följde med — UPPHÄVT 2026-11-07, se M2

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

#### Fokusringen binds om — och varför samma tal duger här men inte där — UPPHÄVT 2026-11-07, se M2 och M5 (principen om redundanta signaler gäller)

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

#### Det tysta felet som inte hann bli ett fel — UPPHÄVT 2026-11-07, se M2

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

> **Så mäts en fokusring, och så mäts den inte.** Ett programmatiskt `.focus()`
> utlöser **inte** `:focus-visible` i Chrome — den regeln kräver
> tangentbordsnavigering. En mätning gjord så läser webbläsarens standardkontur,
> inte sidans: första försöket gav `#0B0B0C`, 3 px, vilket är ett värde sidan
> aldrig sätter. Använd `CSS.forcePseudoState` eller verklig tabbning. Rätt värde:
> `rgb(194, 81, 2)`, 2 px solid, offset 3 px.
>
> Samma felklass som `--window-size` mot CSS-vyporten: **rätt verktyg, fel
> utlösare.** Den som mäter ett tillstånd måste försäkra sig om att tillståndet
> faktiskt råder, inte bara att mätningen gav ett tal.

**Fokusringens ombindning är bevisad nödvändig, inte förebyggande.** Mot den
slutliga bakgrunden `#F4F4F6` ger originalringen `#FC6F03` **2,579:1** — under
3:1. Den ombundna `#C25102` ger 4,275:1, uppmätt i renderad sida.

#### Underlag om frågan kommer upp igen — UPPHÄVT 2026-11-07, se M2

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

#### Sektionsavgränsarna löser sig själva — UPPHÄVT 2026-11-07, se M2 (alla gränser ritas i `--line` på mörk yta)

Linjen hör till den **andra** syskonsektionen, så den ritas i skills överkant och
ärver skills ombundna `--color-border`:

| Gräns | Linjens färg | Mot | Kontrast |
|-------|--------------|-----|----------|
| hero → skills | `#CFCFD4` (ljus yta) | `#F4F4F6` | 1,413:1 |
| skills → projects | `#2A2A2E` (mörk yta) | `#0B0B0C` | 1,38:1 |

> **Rättat 2026-10-08 (städpasset).** Raden sa `#D9D9DE` mot `vitt`, 1,41:1. Båda
> värdena är upphävda: `#D9D9DE` var ljusa ytans ram **innan** bakgrunden blev
> `#F4F4F6`, och den räknades då om till `#CFCFD4` ("De dämpade pillarna" nedan).
> Linjen ärver `.surface-light`-ombindningen och kan därför inte ha ett annat
> värde än tokenet. Kvoten är oförändrad i praktiken — det var hexvärdet och
> jämförelseytan som stod fel. Ingen kodändring följer: koden läser tokenet.

Hade jag valt egna tokennamn hade avgränsaren behövt ett specialfall. Nu gör
ombindningen det automatiskt, och **båda linjerna har samma upplevda tyngd**.

Vid hero → skills gör dessutom färgsteget grått → vitt nästan hela jobbet, så
linjen blir knappt synlig där. Det är rätt: jag beslutade tidigare att den gränsen
bär dubbel markering, och viktningen mellan de två signalerna är fri.

#### ~~Till Jelal: rent vitt eller brutet vitt~~ — AVGJORT — UPPHÄVT 2026-11-07, se M2

Sektionen är 2410 px hög på desktop och 6634 px på mobil. Det är en stor ljus yta
att scrolla igenom på en i övrigt nästan svart sida.

| | `#FFFFFF` | **`#F4F4F6`** |
|---|---|---|
| Mörk text mot bakgrunden | 19,7:1 | **17,91:1** |
| Orange pill som yta | 2,83:1 | **2,58:1** |
| Upplevd bländning | hårdast möjliga | mjukare |

**Jelal valde `#F4F4F6`** 2026-10-05, ur `#FAFAFB` / `#F4F4F6` / `#EDEDF0`.

Jag lade fram det här valet med talen och noterade att **orangens 3:1 inte avgör
det**, eftersom båda ligger under — och att det som återstod därför var
bländningen. Det var rätt sätt att ställa frågan: när ett mätbart krav inte
skiljer alternativen åt ska man säga det, så att den som väljer vet att det är
ögonen och inte siffrorna som bestämmer.

### Skills — rendering

> **UPPHÄVT I SIN HELHET 2026-10-08** — allt i detta avsnitt och dess fyra
> underavsnitt ("Pillarnas två tillstånd", "Layout — omdimensionerad för 307
> pills", "360 px — den längsta strängen", "Teckenförklaring — vänd, nu när orange
> är regeln"). Det beskriver 307 pills i 18 grupper med två tillstånd, en
> flerkolumnlayout och en teckenförklaring. **Bygg inget efter det.** Gällande
> rendering står i "A6 — Kortet, chipset och rutnätet" nedan; `filled` och
> teckenförklaringen är avgjorda i A2. Avsnittet står kvar som historik över hur
> den gamla listan renderades.

#### A6 — Kortet, chipset och rutnätet, beslutat 2026-10-08 — chipset UPPHÄVT 2026-11-07, se M15; tokennamnen UPPHÄVDA, se M5

> **Gäller:** rutnätet 3/2/1 och kortet (`.grid`, `.card`, `.chips`), med namnen
> översatta genom M5 (`--surface`, `--line`). **Upphävt:** `.chip`-deklarationen
> nedan. Chipset får filterchipsens stil via `Chip.jsx` (M15; **RÄTTAT 2026-11-18:**
> gäller som skrivet, M25 och M26 är upphävda. ~~orange kant och text~~
> ~~ifylld orange med mörk text~~ ~~den ljusa ytans fyllning~~), och
> `SkillChip.module.css` tas bort i P11. `.cardTitle` byts mot mono-eyebrow-stilen
> på `h3` (M15). **Därmed är också `.cardTitle`-deklarationen nedan och punkten
> "Kortets rubrik är `--text-lg`" UPPHÄVDA 2026-11-07, se M15 och M15b:** rubriken
> har versaler och mono-spärrning, och vikten 400 kommer från typklassen. Punkten "Ingen `transition` och ingen `animation` i Skills-filerna"
> är upphävd av M12. Korten får `Reveal`.

Ett kort per grupp, `h3` som rubrik, kompetenserna som chips i en riktig
`<ul>`/`<li>`. **Dessa deklarationer är bindande tecken för tecken**
(`LARDOMAR.md` 2026-10-05: ett grannvärde är en tyst omröstning om beslutet).
Byggaren svarar på var och en med `fil:rad` i överlämningen.

`Skills.module.css` — klassnamnen byts, de gamla finns i tabellen över förbjudna
strängar:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6);
  align-items: start;
}

@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

.card {
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.cardTitle {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
```

`SkillChip.module.css` — **en enda klass, ett enda utseende** (A2):

```css
.chip {
  padding: var(--space-1) var(--space-3);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  font-size: var(--text-sm);
  max-width: 100%;
}
```

Punkt för punkt, varför:

- **3/2/1 ligger på 900 och 600 px**, projektets befintliga brytpunkter ur
  `tokens.css`. Inga nya tal: uppdraget säger dator/surfplatta/mobil, och de tre
  lägena finns redan definierade.
- **`minmax(0, 1fr)`, aldrig bara `1fr`** — i alla tre lägena, inklusive
  enspaltsläget. Regeln har bitit två gånger och är ett registrerat återfall.
- **`align-items: start`** är mekanismen som gör att ett kort inte sträcks av sin
  granne. **Vaktraderna `align-content: flex-start` / `align-items: flex-start`
  följer INTE med till `.chips`.** De gick inte att få att larma i den layout de
  stod i (`LARDOMAR.md` 2026-10-05), och i den nya layouten är det rutnätets
  `align-items: start` som bär saken — den går att mäta: korthöjd oberoende av
  grannens. En rad som inte går att belägga skrivs inte av.
- **Chipset har ingen `white-space: nowrap` och `max-width: 100%`.** Höjden är fri
  här, så radbrytning är ofarlig, medan utebliven radbrytning ger horisontell
  scroll. Välj det felläge som syns.
- **Graden höjs från `--text-xs` till `--text-sm`.** 12 px valdes för att det var
  den enda åtgärd som bet linjärt på drygt 300 pills. Med 53 chips i nio kort
  finns inte det skälet kvar, och 14 px är läsbart.
- **Kortets rubrik är `--text-lg`, inte `h3`:s globala `--text-xl`.** Nio rubriker
  i ett rutnät ska inte konkurrera med sektionens `h2`. Ingen `text-transform`,
  ingen `letter-spacing`, ingen `--color-text-muted`: uppdraget säger "rubrik", och
  den gamla lilla versala dämpade rubriken hörde till en lista med 18 grupper.
- **Ingen `transition` och ingen `animation` i Skills-filerna** (A11).

Kontraster som ska **mätas** i paket E och skrivas in enligt `LARDOMAR.md`
2026-10-08. Mina framräknade förväntningar, inte beslutet: chipsets text
`--color-text` mot `--color-surface` ca **15,4:1**, kortets yta
`--color-surface` mot `--color-bg` 1,07:1 (dekorativ, kortet skiljs av sin ram).
Avviker en mätning från förväntan rapporteras det, det justeras inte bort.

#### Pillarnas två tillstånd — ~~gällande~~ UPPHÄVT 2026-10-08, se A2 och A6

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

#### Layout — omdimensionerad för 307 pills — ~~gällande~~ UPPHÄVT 2026-10-08, se A6

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

#### 360 px — den längsta strängen — ~~gällande~~ UPPHÄVT 2026-10-08, se A5

> Talen nedan (40 och 27 tecken, `React Native-komponentbaserad utveckling`,
> `Klient–server-kommunikation`) kommer ur den gamla listan och finns inte på
> sidan efter paket D. Gällande teststräng står i A5.

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

#### Teckenförklaring — vänd, nu när orange är regeln — ~~gällande~~ UPPHÄVT 2026-10-08, se A2

> **Det finns ingen teckenförklaring efter paket E.** Raden förklarade skillnaden
> mellan ifylld och dämpad, och den skillnaden finns inte i den nya listan.

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

### `src/data/projects.js` — projekt (fylls av Jelal, tom i paket 5) — UPPHÄVT 2026-11-07, se M3

**Gäller i stället:** typedefen, konstanterna och grindarna i "M3 — Projektdatan"
(`slug`, `title`, `category`, `status`, `description`, `tech`, `image`,
`liveUrl`, `githubUrl`). Genomförs i P6. Typedefen nedan är historik.

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

### Projektkortens bredd — läget med ETT projekt — UPPHÄVT 2026-11-07, se M4

> **Gäller i stället:** rutnätet 3/2/1 med `minmax(0, 1fr)` och gap 24 px, utan tak
> på kortet. Jelals val B (2026-10-05) upphävs av hans eget beslut 4 ("den nya
> designen gäller"), och uppdraget ritar rutnätet. Ett ensamt kort blir en
> tredjedel brett från 900 px. Underavsnitten är historik och bär var sin
> märkning. Genomförs i P7.

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

#### Taket ligger på KORTET, inte på spåret — UPPHÄVT 2026-11-07, se M4

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

#### Två påståenden i mitt eget beslut som inte stämde — UPPHÄVT 2026-11-07, se M4

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

#### De 2 pixlarna från kortets ram — ingen avvikelse — UPPHÄVT 2026-11-07, se M4

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

#### Kort i samma rad får inte sträckas ut — UPPHÄVT 2026-11-07, se M4 (korten i en rad är lika höga med avsikt: `height: 100%`, och innehållet ligger överst via `align-content: start` i `.body`)

Byggaren satte `align-content: flex-start` och `align-items: flex-start` på
teknik-etiketterna **förebyggande**, med samma uppmätta skäl som i skills:
rutnätet gör kort i samma rad lika höga, så utsträckningsrisken är verklig. Mätt
till en enda höjd, 29,19 px, över båda testkorten.

**Det är rätt och generaliseras till en regel:** i varje rutnät av kort gäller att
innehåll inuti kortet aldrig får ärva kortets utsträckta höjd. Ett kort blir högt
av sin granne, inte av sitt eget innehåll, och då ska dess etiketter, knappar och
bilder ligga kvar högst upp. Markeringen `EJ I ARKITEKTUR` kan tas bort.

### `src/data/about.js` — Om mig — fältnamnet `projectId` UPPHÄVT 2026-11-07, se M3

> I typedefen nedan heter fältet `projectSlug` från P6 och pekar på projektets
> `slug`. Allt annat gäller. Om mig får dessutom nyckeltalsraden under texten
> (M14, P12).

Ny sektion, beslutad av Jelal 2026-10-07. Han sa **"en liten sektion"**, och det
är en del av specifikationen, inte en artighet.

```js
/**
 * @typedef {Object} AboutLink
 * @property {string} phrase     OBLIGATORISK när link finns. Måste förekomma EXAKT en gång i något stycke.
 * @property {string} projectId  OBLIGATORISK när link finns. Ett id ur projects.js. Finns projektet inte
 *                               renderas frasen som vanlig text - ingen länk, inget trasigt ankare.
 *
 * @typedef {Object} About
 * @property {string[]}       paragraphs  OBLIGATORISK. Ett stycke per post. Minst ett.
 * @property {AboutLink|null} link        OBLIGATORISK som fält, får vara null. null = ingen länk i texten.
 */
export const about = {
  paragraphs: [
    // Jelals text, ett stycke per post.
  ],
  link: null,
};
```

#### A4 — "Hem och Ekonomi" som länk, båda lägena, beslutat 2026-10-08 — fältnamnen UPPHÄVDA 2026-11-07, se M3 (beslutet gäller)

> `about.link.projectId` heter `about.link.projectSlug` och pekar på projektets
> `slug` (P6). Målet är kortets `<li id={slug}>` (M4), och `isComplete` importeras
> ur `src/lib/projectRules.js`. Mekanismen och båda lägena gäller oförändrade.

Uppdraget säger att frasen **"Hem och Ekonomi" i texten ska vara en länk som
scrollar till projektet**. Två saker i premissen stämmer inte med koden, och båda
är uppmätta:

1. **`projects` är en tom array.** Det finns inget projekt och alltså inget id att
   peka på. En ankarlänk till ett id som inte finns är precis det mönster
   arkitekturen redan förbjudit för logga-länken: *ingenting som pekar på eller
   utger sig för att vara en sektion får finnas utan att sektionen står i datan.*
2. **"längre ner på sidan" är fel riktning.** Sidans ordning är Jelals egen,
   beslutad 2026-10-07: hero, projekt, kompetenser, **om mig**, kontakt. Projektet
   ligger alltså **ovanför** Om mig. Länken fungerar — den scrollar uppåt.
   **Sektionsordningen ändras INTE** för att uppdragets formulering ska stämma;
   ordningen är hans beslut och uppdraget beskriver en sida han inte har framför
   sig. Texten på sidan säger ingenting om riktning, så ingenting ljuger. Det är
   en rad vid LEVERANS, inte en ändring.

**Beslut: ett fält i datan, inte en markering i texten, och inget hårdkodat i
komponenten.**

```jsx
/* About.jsx, det bindande mönstret - inte en implementation */
const target = about?.link;
const linked = target != null && projects.some(
  (project) => isComplete(project) && project.id === target.projectId,
);
/* För varje stycke: linked && stycket innehåller target.phrase exakt en gång
 * -> [före, <a href={'#' + target.projectId}>{target.phrase}</a>, efter]
 * I ALLA andra fall -> stycket oförändrat. */
```

| Läge | Vad som renderas |
|------|------------------|
| Projektet finns **inte** (i dag) | Hela stycket som vanlig text. Frasen "Hem och Ekonomi" syns, men är inte klickbar. **Ingen `href` alls** |
| Projektet finns (när Jelal lägger in det) | Samma stycke, samma tecken, med frasen som `<a href="#hem-och-ekonomi">` |

**Länken tänds av sig själv. Ingen text redigeras om, ingen rad kommenteras in.**
Länkens utseende (`--accent`, understruken, hover `--accent-hover`) är godkänt som
byggt i `About.module.css`, se M19 punkt 4.

Varför ett fält i datan och inte de tre alternativen:

| Avfärdat | Varför |
|----------|--------|
| Frasen skriven i `About.jsx` och sökt i texten | Då står samma sträng på två ställen, i två filer. Skriver Jelal om stycket försvinner länken **tyst** — exakt felläget från 2026-10-02 (`hero` på tre ställen) |
| En markering i texten, `[Hem och Ekonomi](hem-och-ekonomi)` | Inför ett eget mikrospråk i `src/data/`, som är beslutat att innehålla **ren data**, och kräver en parser plus ett undantag i teckengrinden: hakparenteserna renderas aldrig men skulle mätas mot teckensnittets delmängd. En grind som larmar på ett tecken ingen ser är en grind som lärs bort |
| HTML i datan (`dangerouslySetInnerHTML`) | Nej. Aldrig i detta projekt |
| Länk till `#projects` i stället | Den skulle alltid vara klickbar och landa på tomma läget "Än är listan tom". En länk som ser ut att gå till ett projekt och går till ett tomrum är sämre än ingen länk |

**Målets id ligger på kortets `<li>`, och marginalen sitter på samma element —
omskrivet 2026-11-07 (R1), efter M4.** `ProjectCard` sätter `id={slug}` på
`<li className={styles.item}>` (M4, "Kortets markup"). Sedan M4 är `.card` länken
`<a>` **inuti** `<li>`, alltså inte ankarmålet. Invarianten är oförändrad:
**ankarmålet** får samma scroll-marginal som sektionerna, med **samma uttryck ur
samma token** så att de två inte kan driva isär. Tecken för tecken, först i
`ProjectCard.module.css`:

```css
.item {
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}
```

Det besvarar `OPEN-KEY: kortets-li-scroll-marginal`: **godkänd som byggd** i
`ProjectCard.module.css`. Markeringen tas bort i G1-rättningen och ersätts med
`/* Beslutat i ARKITEKTUR.md: A4 (R1) */`. Uppmätt av G1: ett hopp till `#awle`
landar på 90 px med regeln och på 0 px utan den, vid 360 och 1280 px.

> ~~`.card { scroll-margin-top: calc(var(--header-height) + var(--space-4)); }`~~ —
> **UPPHÄVT 2026-11-07 (R1):** skrevs när `.card` var `<li>`. Efter M4 hade regeln
> satt marginalen på länken, som inte är ankarmålet.

Utan marginalen landar kortet under den klibbande headern. Regeln i `global.css` träffar
bara `section[id]` och ska **inte** breddas till `[id]` — den hade då fångat
`main#main` och varje framtida id.

**Tillägg 2026-11-07 (M12b punkt 1):** sedan P10 är `<li>` också ett `.reveal`.
Ankarmålet får aldrig flyttas av en transform innan det tonats in, för då räknar
webbläsaren hoppet mot den flyttade rutan. Därför tonas ett `.reveal` med `id` bara
i opacitet. Mätningen och den negativa kontrollen står i M12b.

**Grind i `validate-data.mjs` (`about.js`), och exakt vad den inte gör:**

| Grind | Meddelande |
|-------|-----------|
| `link` är `null` eller ett objekt | `about.js: link måste vara null eller ett objekt med phrase och projectId` |
| `phrase` icke-tom text när `link` finns | `about.js: link.phrase saknas eller är tom` |
| `projectId` matchar `/^[a-z0-9-]+$/` | `about.js: link.projectId får bara innehålla a-z, 0-9 och bindestreck (fick "Hem och Ekonomi")` |
| `phrase` förekommer **exakt en gång** över alla stycken | `about.js: link.phrase förekommer N gånger i texten, ska vara exakt en (”Hem och Ekonomi”)` |

**Att projektet finns grindas INTE.** Att `projectId` pekar på ett projekt som
ännu inte är inlagt är det **normala, korrekta** läget i dag, och en grind på det
hade fällt bygget på korrekt data — samma fel som A1 handlar om. Det skrivs som
UPPLYSNING i OK-raden i stället:

```
Om mig: 1 stycke, 1 länkfras (0 pekar på ett projekt som finns)
```

**Vilken legitim ändring får fälla grinden?** Att skriva om texten så att frasen
försvinner medan `link` står kvar. Meddelandet säger då vad som ska göras — sätt
`link: null` eller skriv tillbaka frasen — och **den åtgärden får grinden att
tiga**. Det är kravet från `LARDOMAR.md` 2026-10-05, prövat med tre indata.

**Texten ligger i `src/data/`, inte i komponenten.** Hero-texten bor i sin
komponent, och `GUIDE.md` har därför ett avsnitt "Texter som inte ligger i
`src/data/`". **Den listan ska bli kortare, inte längre.** En ny sektion med fri
text som Jelal kommer att vilja ändra hör hemma där han redan letar efter sin
text.

**En array av stycken, inte en sträng med radbrytningar.** Två skäl: en sträng
hade krävt att komponenten delar på `\n` och renderar styckena, alltså logik i en
komponent som ska vara presentation — och varje stycke blir en egen rad att
redigera i stället för ett textblock där radbrytningarna är osynliga.

Rendering: `<p>` per post, `max-width: var(--measure)`. Rubriken kommer från
`sections.js` (`Om mig`) som för alla andra sektioner.

**Formen inbjuder inte till tillväxt.** ~~Inga fält för bild, rubriknivåer eller
länkar.~~ **Ändrat 2026-10-08:** formen har vuxit med **exakt ett** fält, `link`,
därför att uppdraget beställer en länk inne i texten (A4). Det är ett eget beslut,
taget här, med en verklig konsument. Inga fält för bild och inga rubriknivåer —
och nästa fält kräver ett nytt beslut på samma sätt.

**Ingen bild i Om mig.** Uppdraget säger "behåll befintlig bild och layout i
sektionen". **Det finns ingen bild att behålla** — sektionen har aldrig haft en,
och `about.js` har bara haft `paragraphs`. Att lägga till en bild är alltså inte
ett "behåll" utan ett nytt beslut, och det tas inte i detta uppdrag: det kräver en
bildkälla Jelal inte har gett, en plats i `assets-source/`, en körning av
bildskriptet och ett layoutbeslut. **Står kvar som Jelals öppna punkt.**

Validering: `paragraphs` är en icke-tom array av icke-tomma strängar, plus
`link`-grindarna i A4.

> ~~**Innehållet är en öppen punkt.** Jelal ska säga vad som ska stå.~~
> **BESVARAT 2026-10-07/08:** Jelal har skrivit texten ordagrant i sitt uppdrag.
> Den skrivs in tecken för tecken i paket F, som **ett** stycke — texten är ett
> sammanhängande block i uppdraget, och att dela den i tre vore att hitta på
> styckeindelning. `UTKAST`-kommentaren i `about.js` blir falsk i samma stund och
> tas bort i samma ändring.
>
> **Citattecknen runt texten följer inte med in i datan** — de är uppdragsfilens
> avgränsare, avgjort i **A14**. Paket F tolkar alltså inte frågan, den är redan
> avgjord.

### `src/data/contact.js` — kontaktuppgifter (paket 6)

> **Exemplet nedan har GitHub-adressen ifylld. Det är UPPHÄVT sedan Jelal sa "ta
> bort github" (2026-10-06).** I filen står `{ label: 'GitHub', url: null }`, och
> M16 bekräftar 2026-11-07 att länken inte renderas så länge den är `null`.
> Typedefen och reglerna gäller. **Tillägg 2026-11-18, M24 punkt 7:** Jelal vill
> att GitHub-adressen står i sameAs men inte på sidan. Den skrivs därför i
> `site.sameAsExtra`, och `url: null` står kvar här.

Alla uppgifter är nu givna (`BRIEF.md`, 2026-10-06).

```js
/**
 * @typedef {Object} ContactLink
 * @property {string}      label  Svensk etikett som visas
 * @property {string|null} url    Fullständig URL, eller null — då renderas den INTE
 *
 * @typedef {Object} ContactForm
 * @property {string} endpoint         Web3Forms POST-adress
 * @property {string} accessKey        Publik nyckel. Se "Nyckeln är publik".
 * @property {string} hcaptchaSiteKey  Web3Forms delade publika platsnyckel.
 *
 * @typedef {Object} Contact
 * @property {string}        email  OBLIGATORISK. mailto:-länk i klartext.
 * @property {ContactLink[]} links
 * @property {ContactForm}   form
 */
export const contact = {
  email: 'qaiumi@hotmail.com',
  links: [
    { label: 'GitHub',   url: 'https://github.com/Jelalqaiumi' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jelalqaiumi' },
  ],
  form: {
    endpoint:      'https://api.web3forms.com/submit',
    accessKey:     '79f08fa8-8cdf-4841-8392-066feea2a389',
    hcaptchaSiteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2', // Web3Forms delade, publika
  },
};
```

**Formen håller.** `url: null`-mekaniken står kvar även om ingen post använder den
i dag — den är inte dött fält, för den är **beteendet** när en länk saknas, inte
ett värde ingen läser. Tar Jelal bort LinkedIn sätter han `null` och länken
försvinner utan att komponentkod rörs.

**`form` ligger i samma fil som resten.** Endpoint och nyckel är konfiguration för
kontaktsektionen, inte infrastruktur för sidan — och om Jelal någon gång byter
nyckel vill han ha den där han redan letar. Regeln att `src/data/` bara innehåller
data gäller fortfarande: det här är data, inte logik.

Regler som byggaren måste följa:

- E-posten skrivs **i klartext** som `<a href="mailto:qaiumi@hotmail.com">`. Ingen
  obfuskering, ingen entity-kodning, inget `[at]`. Jelals uttryckliga beslut, taget
  med full insikt om skräppost-risken.
- `links` filtreras på `url !== null` före rendering. **Tomma länkar renderas
  aldrig** — ingen grå ikon, ingen "kommer snart", inget `href="#"`.
- **Formuläret ersätter inte länkarna.** Båda ska finnas.
- Att ändra en länk = en rad i denna fil. Ingen komponentfil rörs.
- Filen inleds med en kommentar på svenska som förklarar just detta.

> **BESVARAD 2026-11-18 av Jelal, se M24 punkt 7:** adressen är bekräftad, och P19c
> tar bort märkningen ur kommentaren i `contact.js`. Stycket nedan är historik.
>
> **LinkedIn-adressen är härledd, inte verifierad.** LinkedIn svarar HTTP 999 på
> automatiska anrop, alltså blockerat och inte saknat — den gick varken att
> bekräfta eller avfärda. Slutdelen i en LinkedIn-adress är inte alltid samma som
> visningsnamnet. **Jelal klickar på länken när sektionen är byggd.** Leder den
> fel är det en rad här. Detta är en öppen punkt tills han svarat.

### Kontaktformuläret — beslutat av Jelal 2026-10-06

Tjänst: **Web3Forms**, gratisplan, 250 meddelanden/månad, inget konto.

> **Utbyggt 2026-10-07 enligt Jelals specifikation.** Fem fält, hCaptcha via
> Web3Forms, nya texter. Avsnitten nedan är uppdaterade. Fyra beslut i det
> ursprungliga formuläret krockade med specifikationen och är lösta var för sig —
> **inget av dem är upphävt, tre är förenade och ett är ändrat med skäl.**

#### Fälten: fem, varav fyra obligatoriska

| Fält | Namn i formuläret | Typ | Obligatoriskt | Platshållare |
|------|-------------------|-----|---------------|--------------|
| Namn | `name` | `text` | ja | Skriv in ditt namn |
| Mejl (**rättat 2026-11-07, Jelals beslut 7, se M20 punkt 7**; var "E-post") | `email` | `email` | ja | Skriv in din mejladress |
| Företag/Organisation | `company` | `text` | **nej** | Skriv in ditt företag/organisation |
| Ämne för förfrågan | `subject` | `text` | ja | Skriv in ditt ämne för förfrågan |
| Meddelande | `message` | `textarea` | ja | — |

Rubrik ovanför fälten: **"Fyll i dina uppgifter"**. Knapptext: **"Skicka
förfrågan"**. `textarea` ska gå att förstora: `resize: vertical`, aldrig `none` —
den som skriver långt ska kunna se vad hen skrivit.

#### Varför `company` får vara valfritt när regeln sa motsatsen

Min regel löd: *ett valfritt fält är ett fält man inte har bestämt sig om.*
`company` ser ut som ett undantag men är det inte — **regeln var ofullständig.**

Dess syfte är att stoppa fält som kostar uppmärksamhet utan att ge något. Men
`Företag/Organisation` gäller inte alla: en privatperson har inget företag, och
att kräva det hade stängt ute den som hör av sig som person. **Ett fält som inte
gäller alla ska vara valfritt, inte borttaget.**

Regeln lyder därför nu: *ett fält ska vara obligatoriskt om det gäller alla och
behövs, valfritt om det inte gäller alla, och borttaget om det inte behövs.*
`company` är det enda fältet i mitten.

#### `subject` skrivs nu av besökaren

Den fasta strängen `subject = "Nytt meddelande från portfoliosidan"` **tas bort**.
Fältet heter `subject` så att Web3Forms använder det som ämnesrad — då ser Jelal
direkt i inkorgen vad förfrågan gäller, vilket är hela poängen med att be om det.

**Lämna inte kvar både det dolda fältet och det synliga.** Två fält med samma namn
i samma formulär ger ett godtyckligt utfall beroende på ordning.

Dolda fält: `access_key` och honeypot enligt nedan. Ingen telefon.

#### Asterisken är röd — beslutat av Jelal 2026-10-07 — tokennamnen UPPHÄVDA 2026-11-07, se M5 (beslutet gäller, och tokenet heter `--error`)

~~**Asterisken blir orange, `var(--color-accent)`.** Att införa en ny färg enbart
för den vore att betala mest för det som bär minst.~~

**UPPHÄVT.** Jag lade fram orange mot rött med mina skäl och Jelal höll fast vid
specifikationen. Hans sida, hans beslut.

> **Återinför inte orange med hänvisning till den upphävda punkten, och inte
> heller till regeln "orange är enda accentfärgen".** Den regeln är fortfarande
> sann om *accenten*. Det röda är ingen accent — det är formulärets
> uppmärksamhetsfärg, och Jelal har beslutat att sidan ska ha en.

**`--color-error: #F85149`**

| Krav | Utfall |
|------|--------|
| Mot `--color-bg` `#0B0B0C` | **5,87:1** — AA kräver 4,5 för liten text |
| Kulör | **2,7°** mot accentens **26,0°** |
| Blåkanal | **73** mot accentens **3** |

**Om kulöravståndet, eftersom det är den svåra delen.** Rött och orange är
grannar på färgcirkeln. 26° är i praktiken hela det avstånd som finns att ta ut —
går man längre från orange hamnar man i rosa, inte i "rödare rött".

Separationen bärs därför av tre saker tillsammans, inte av kulören ensam:

- **26° kulörskillnad**, så långt det går utan att glida mot magenta.
- **Blåkanalen, 73 mot 3.** Accenten är en bränd orange med praktiskt taget noll
  blått; det röda är svalare. Det är den skillnaden ögat faktiskt läser när de två
  står i samma formulär.
- **Ljushet**, 0,263 mot 0,321 — det röda är mörkare än orangen.

En mättad `#FF0000` avfärdades: den vibrerar mot nästan svart och läses som larm
snarare än som markering. `#F85149` är en beprövad mörkläges-röd som håller sig
lugn på mörk botten.

**Färgen är ändå inte ensam bärare**, vilket WCAG 1.4.1 kräver: asterisken står
alltid intill etikettens ord, och ovanför formuläret står förklaringen en gång:

> \* obligatoriskt fält

#### Felmeddelandena använder samma röda — tokennamnen UPPHÄVDA 2026-11-07, se M5 (beslutet gäller)

**Ja — förslaget är rätt och jag tar det.**

Jag valde tidigare orange för felmeddelandena med motiveringen att ett rött token
för tre meddelanden blir en andra accent. **Den invändningen har upphört att
gälla**: den andra färgen finns nu oavsett. Kvar blir bara nackdelen av att ha
två olika färger för "det här är fel" i samma formulär, vilket är sämre än en.

`--color-error` bär alltså båda: asterisken och felmeddelandena under fälten.
Testet "vill vi ändra dem tillsammans" ger ja — de är samma signal, formulärets
uppmärksamhetsfärg.

Mot `--color-bg` ger den 5,87:1, vilket räcker för brödtext.

#### Det röda binds om på ljus yta — UPPHÄVT 2026-11-07, se M2

```css
.surface-light { --color-error: #C0271E; }   /* 5,39:1 mot #F4F4F6 */
```

Mot den ljusa ytan ger `#F85149` bara **3,05:1** — under AA för liten text.

**Ingenting använder färgen där i dag**, och det är precis skälet att binda om den
nu: `--color-focus` missades av exakt den anledningen och blev en latent bugg som
upptäcktes först i en läckagekartläggning. Regeln lyder att varje signalbärande
token prövas mot varje yta, inte bara mot de ytor där det råkar användas.

Kulören hålls, 3,3° mot det mörka lägets 2,7°.

#### Platshållare är förenliga med etiketterna — tokennamnen UPPHÄVDA 2026-11-07, se M5 och M16 (platshållaren i `--ink-subtle` på fältets `--bg`, P13 mäter)

Mitt beslut löd "synliga `<label>` ovanför varje fält, **ingen platshållare som
etikett**". Specifikationen vill ha platshållare **som komplement**. Det är inte en
krock — etiketten står kvar permanent ovanför, platshållaren är ett exempel inuti.

Två villkor:

- **Platshållaren får aldrig bära information som inte finns någon annanstans.**
  Den försvinner när man börjar skriva, och den som tappar tråden mitt i ska kunna
  läsa etiketten i stället.
- **Platshållartexten använder `var(--color-text-muted)`**, inte
  `--color-text-dim`. Mot fältets botten `--color-surface` ger `dim` **3,64:1**,
  under AA:s 4,5. `muted` ger **7,17:1**. Platshållare som är för ljusa är ett av
  de vanligaste tillgänglighetsfelen i formulär, och här hade vi gått rakt i det.

#### Skräppostskydd: honeypot, ingenting mer

```html
<input type="checkbox" name="botcheck" tabindex="-1" aria-hidden="true"
       style="display:none" />
```

~~Web3Forms avvisar inlägg där `botcheck` är ikryssad.~~ **RÄTTAT 2026-11-08, se
M22 punkt 3:** premissen gäller ett vanligt HTML-formulär. Formuläret skickas med
`fetch` och en egen JSON-kropp, så rutans läge följer inte med av sig själv. Rutan
läses ur DOM vid inskicket, och är den ikryssad skickas ingenting. Noll friktion
för en människa.

**`tabindex="-1"` och `aria-hidden="true"` är inte valfria.** Ett dolt fält som
går att tabba till eller som läses upp av en skärmläsare är en fälla för de
besökare som har svårast att ta sig igenom formuläret — alltså precis tvärtemot
avsikten. `display: none` ensamt räcker i praktiken, men de två attributen gör
avsikten explicit och överlever att någon byter döljningsteknik.

~~**Ingen CAPTCHA.**~~ **UPPHÄVT av Jelal 2026-10-07: hCaptcha via Web3Forms.**
Mitt skäl — friktion för varje människa, ytterligare en tredje part — står kvar som
en kostnad han känner till och har valt att betala. Honeypot behålls **utöver**
captchan; de stoppar olika sorters robotar och den ena ersätter inte den andra.

#### hCaptcha: `@hcaptcha/react-hcaptcha` införs som tredje körningsberoende

Dokumentationen är nu läst och tre vägar finns. Paketet är **inte nödvändigt** —
och väljs ändå.

| Väg | Vad vi slipper | Vad vi tar på oss |
|-----|----------------|-------------------|
| **A. `@hcaptcha/react-hcaptcha`** ✓ | skriptladdning, livscykel, återställning, skydd mot omrendering | ett körningsberoende |
| B. Web3Forms klientskript + `<div class="h-captcha">` | ett npm-paket | ett externt skript som letar upp en `div` och fyller den — mitt i ett träd React äger. Och **ingen dokumenterad återställning**: vi hade fått nå `window.hcaptcha.reset()` i ett skript vi inte laddat själva. |
| C. hCaptchas `api.js` + explicit rendering | både paketet och Web3Forms skript | mest egen kod: laddning, renderingstajming, uppstädning vid unmount, allt vårt att underhålla |

**Det avgörande är att frågan inte är "beroende eller inte".** hCaptchas egen
JavaScript laddas från en extern domän i **alla tre** vägarna. Tredjepartskostnaden
i runtime är identisk. Det enda som skiljer är **vem som skriver limmet.**

Då blir valet: ett litet, officiellt, underhållet paket från hCaptcha själva —
eller handskriven livscykelkod för en widget vars återställning vi annars når via
ett odokumenterat globalt objekt.

**Återställningen fäller avgörandet.** Arkitekturen kräver att captchan nollställs
i *båda* slutlägena. Paketet har `resetCaptcha()`. Väg B har ingenting dokumenterat.
Att bygga ett krav på en odokumenterad global är att bygga en tyst framtida
felkälla.

Det här bryter inte mot min regel om beroenden, det tillämpar den. Jag har avvisat
router, animationsbibliotek och ikonpaket **för att plattformen redan gör det de
gör**. Att foga in en tredjepartswidget i React:s livscykel gör plattformen inte.

Villkor:

- Exakt `@hcaptcha/react-hcaptcha`, hCaptchas officiella paket. Ingen wrapper av
  tredje part.
- Ligger i `dependencies`, inte `devDependencies` — det körs i webbläsaren.
- `reCaptchaCompat={false}`, så att paketet inte definierar `window.grecaptcha`.
  Vi använder inte reCAPTCHA och vill inte ha dess globala namn på sidan.
- Token skickas som `h-captcha-response`.
- **Bundlens storlek mäts och rapporteras.** Gränserna gäller oförändrat:
  `dist/` ≤ 1 MB, enskild fil ≤ 300 kB.

**Körningsberoenden blir därmed tre: `react`, `react-dom`,
`@hcaptcha/react-hcaptcha`.**

#### Platsnyckeln är Web3Forms egen — och ligger i `contact.js`

```
50b2fe65-b00b-4b9e-ad62-3ba471098be2
```

Web3Forms delade publika platsnyckel för gratisplanen. **Ingen egen
hCaptcha-registrering behövs**, och nyckeln är inte Jelals.

Den läggs i `contact.form` intill `accessKey`. Båda är publika konstanter för
kontaktsektionen och hör ihop.

**Ingen `.env.example`, ingen `VITE_`-variabel.** Skälet är nu enklare än mitt
tidigare: **det finns ingen nyckel av vår som skulle kunna sättas.** Det gamla
skälet står kvar som bakgrund — en `VITE_`-prefixad variabel bakas in i bundlen och
ligger i klartext i den publicerade filen, alltså ingen hemlighet utan bara en
mindre synlig konstant.

#### En förutsättning som inte syns i arkivet

**hCaptcha måste slås på i Web3Forms instrumentpanel.** Görs inte det avvisas
inskicken, och felet går inte att se i någon fil i det här arkivet — koden ser
korrekt ut, bygget är grönt, och meddelanden försvinner.

> **En förutsättning som bor utanför arkivet ska skrivas ned i arkivet.** Den som
> felsöker om ett halvår har inte tillgång till minnet av att någon klickade i en
> ruta. Byggaren ska bekräfta i överlämningen att inställningen är påslagen, och
> verifieringens krav på ett **verkligt levererat meddelande** är det som bevisar
> det — inte en skärmbild av panelen.

#### Tredjepartsskript i runtime

Sidan går från noll externa körningsanrop till flera, och hCaptcha behandlar
besökarens IP. **Jelal tog bort integritetsraden i går och lägger till hCaptcha i
dag — det andra beslutet gör det första mer relevant, inte mindre.** Det är hans
sida och hans val; det ska bara vara ett val och inte en följd han inte sett.

#### Rate limiting utgår — det glömdes inte

Begränsning per IP kräver en server som ser anropen. Jelal har valt en statisk
sida utan backend, och **då finns ingen plats där en sådan regel kan köras.** Det
som återstår är honeypot, hCaptcha och Web3Forms tak på 250 meddelanden i månaden.

Det står utskrivet så att ingen tror att punkten föll bort.

**Domänbegränsning aktiveras INTE.** Den är en betalfunktion, och aktiverad slutar
formuläret fungera på `localhost` — alltså där det utvecklas och testas. Den får
slås på först när sidan ligger live, och då som ett eget beslut.

#### Nyckeln är publik — och det är inte en miss

`accessKey` ligger i klientkoden och arkivet är publikt. Nyckeln säger **"skicka
hit"**, inte "läs härifrån": den kan inte användas för att hämta meddelanden, ändra
inställningar eller läsa Jelals inkorg. Att den syns är tjänstens avsedda
användning.

Det den tillåter är att vem som helst skickar meddelanden till Jelals inkorg. Det
hanteras av honeypot och månadstaket, inte av att gömma nyckeln — en nyckel i
klientkod går inte att gömma.

#### De fyra tillstånden

| Tillstånd | Vad som syns | Vad som läses upp |
|-----------|--------------|-------------------|
| Vilande | formuläret | ingenting |
| Skickar | knappen `aria-disabled`, formuläret `aria-busy="true"` | "Skickar …" |
| Lyckades | formuläret töms, hCaptcha återställs, statusraden visas | "Tack! Jag återkommer så snart jag kan." |
| Misslyckades | statusraden visas, fälten behåller sitt innehåll, **hCaptcha återställs** | "Något gick fel – försök igen, eller mejla qaiumi@hotmail.com direkt." |

**hCaptcha måste återställas i båda slutlägena.** En token är engångs och kortlivad;
återanvänds den avvisas nästa försök, och besökaren ser ett fel som inte har med
hens ifyllnad att göra.

> **Feltexten är Jelals formulering plus en tillagd mening.** Han skrev "Något gick
> fel – försök igen". Jag har lagt till *"eller mejla qaiumi@hotmail.com direkt"*,
> eftersom mitt tidigare beslut kräver att besökaren får veta att meddelandet
> **inte** kom fram och erbjuds en väg som fungerar. "Något gick fel" ensamt lämnar
> öppet om det skickades.
>
> **Tillägget är en synlig ändring av hans text — lägg fram den.** Vill han ha den
> kortare är det hans röst som gäller, men då bör e-postlänken stå tydligt intill
> formuläret i stället.

**Statusraden är ett `<p role="status" aria-live="polite">` som alltid finns i
DOM**, direkt efter knappen, tom i vilande läge.

> **Den får inte renderas villkorat.** En live-region som läggs till samtidigt som
> sitt innehåll annonseras ofta inte alls — skärmläsaren måste observera regionen
> *innan* texten dyker upp i den. Det är den vanligaste orsaken till att ett
> formulär "fungerar men säger inget".

**Vid lyckat inskick töms fälten, vid misslyckat gör de det inte.** Den som fick
ett fel ska kunna trycka igen utan att skriva om allt.

#### Knappen: dämpad men aldrig `disabled`

Specifikationen vill ha knappen "nedtonad/inaktiverad tills alla obligatoriska fält
är ifyllda och hCaptcha är godkänd". Mitt beslut säger att den aldrig får bli
`disabled`. **Båda avsikterna uppfylls samtidigt, och mitt beslut är inte upphävt:**

| Vad | Hur |
|-----|-----|
| Ser inaktiverad ut | dämpad bakgrund och text, `cursor: not-allowed` |
| Är inaktiverad för hjälpmedel | `aria-disabled="true"` |
| Går fortfarande att nå | **inget `disabled`-attribut** — kvar i tabbordningen |
| Gör inget skadligt vid klick | hanteraren vägrar skicka |

`disabled` tar bort elementet ur tabbordningen. En tangentbordsanvändare som
tabbar nedåt hittar då ingen knapp alls och får ingen förklaring till varför.

**Och knappen gör något nyttigt när man trycker på den i dämpat läge:** den kör
valideringen, visar felmeddelandena och flyttar fokus till första felande fält.
Det är bättre än både specifikationens variant och min ursprungliga — en knapp som
inte går att trycka på berättar aldrig *varför*, medan den här gör det i samma
rörelse.

Samma mönster gäller under sändning: `aria-disabled="true"`, hanteraren ignorerar
nya inskick, knappen behåller fokus.

#### Felen är två sorter och ska inte se likadana ut

**Valideringsfel** hör till fältet:
- felmeddelandet står under fältet, kopplat med `aria-describedby`
- fältet får `aria-invalid="true"`
- fokus flyttas till **första** felande fält vid inskicksförsök
- statusraden används **inte** — den är för inskickets utfall, inte för ifyllnad

**Mönstret skalar till fem fält utan ändring**, med två krav:
- varje felmeddelande har ett **unikt `id`** härlett ur fältnamnet, t.ex.
  `error-email`. Ett delat id kopplar fel meddelande till fel fält och syns inte
  vid okulär granskning.
- `aria-describedby` får peka på flera id. Har ett fält både en hjälptext och ett
  felmeddelande ska **båda** stå där — att byta ut beskrivningen mot felet gör att
  hjälptexten försvinner just när den behövs mest.

`company` valideras inte alls. Ett valfritt fält som ger felmeddelanden är i
praktiken obligatoriskt.

**Tjänstefel** hör till statusraden, och meddelandet ska säga tre saker: att det
**inte** gick fram, att man kan försöka igen, och att e-postlänken finns.

> **Besökaren får aldrig lämnas i ovisshet.** Därför också: anropet får en
> **timeout på 15 sekunder** via `AbortController`. Utan den kan ett hängande
> anrop lämna formuläret i "Skickar …" för alltid, och det är det verkliga
> ovisshetsläget — värre än ett tydligt fel. Vid timeout, nätverksfel eller
> svar som inte är `ok` gäller felmeddelandet ovan. **Formuleringen ska vara
> entydig: meddelandet kom inte fram.** Inget "kanske".

#### Validering: båda, i lager

`required` och `type="email"` står kvar på fälten — de bär semantiken till
hjälpmedel och fungerar som sista skyddsnät. Men `<form noValidate>` stänger av
webbläsarens egna bubblor, och valideringen görs i komponenten med **svenska**
meddelanden.

Skälet: webbläsarens inbyggda meddelanden kommer på webbläsarens språk, inte
sidans. En tysk valideringsbubbla på en svensk sida är ett sämre fel än att skriva
tre meddelanden själv.

| Fält | Regel |
|------|-------|
| Namn | icke-tomt efter `trim()` |
| Mejl | icke-tomt, exakt ett `@`, icke-tomma delar på båda sidor, minst en `.` efter `@` |
| Meddelande | icke-tomt efter `trim()`, högst 5000 tecken |

**Mejlfältets meddelanden (rättat 2026-11-07, Jelals beslut 7, se M20 punkt 7):**
tomt fält ger `Skriv din mejladress.`, en adress som inte klarar regeln ger
`Kontrollera mejladressen. Den ska se ut som namn@exempel.se.` Fältet heter "Mejl",
inte "E-post".

**E-postregeln ska vara medvetet tillåtande.** Att avvisa en giltig adress är
värre än att släppa igenom en ogiltig — den ogiltiga studsar bara, den giltiga
besökaren ger upp. **Ingen komplicerad regex.**

Ingen minimilängd på meddelandet. Taket på 5000 finns för att hindra orimliga
inlägg, inte för att styra hur någon skriver.

#### Utseende på mörk yta — UPPHÄVT 2026-11-07, se M16 och M5

> **Gäller i stället:** formuläret ligger i en `--surface`-panel. Fälten har
> `--bg` som botten och `--line-strong` som ram (ca 3,89:1 mot panelen och 4,17:1
> mot `--bg`). Fokusringen är `--accent`. P13 mäter. Tabellen nedan är historik.
> **Synliga `<label>` ovanför varje fält gäller fortfarande.**

Kontaktsektionen ligger på `--color-bg`, **inte** i `.surface-light`.

| Egenskap | Värde | Kontrast mot `#0B0B0C` |
|----------|-------|------------------------|
| Fältets botten | `var(--color-surface)` `#141416` | 1,07:1 — syns knappt, därav ramen |
| **Fältets ram** | **`var(--color-field-border)` `#606068`** | **3,16:1** |
| Fältets text | `var(--color-text)` | — |
| Etikett | `var(--color-text)` | — |
| Fokusring | `var(--color-focus)` `#FC6F03` | **6,95:1** |

**`--color-field-border` är ett nytt token med en verklig konsument.** Ett
inmatningsfälts ram är en gränssnittskomponents avgränsning och omfattas av WCAG
1.4.11:s 3:1 — `--color-border` (1,38:1) duger för dekorativa linjer men inte här.
Det är skillnaden mot de två token jag nyss tog bort: det här införs av en
komponent som behöver det, inte i väntan på en.

Fokusringen klarar sig med marginal på den mörka ytan, 6,95:1. Ingen ombindning
behövs här.

**Synliga `<label>` ovanför varje fält.** Ingen platshållare som etikett — den
försvinner när man börjar skriva, och då vet den som tappat tråden inte längre vad
fältet var.

#### ~~En rad om vart uppgifterna tar vägen~~ — BORTTAGEN av Jelal (UPPHÄVT, ingen rad finns)

~~Under formuläret, i `var(--color-text-muted)`: "Formuläret skickas via tjänsten
Web3Forms. Ditt namn och din e-postadress passerar deras servrar på vägen till
Jelals inkorg."~~

**Jelal har tagit bort integritetsraden. Den ska inte återinföras av någon som
läser detta avsnitt och tror att den fortfarande gäller.** Avsnittet stod kvar som
om texten fanns, vilket var fel i dokumentet och inte i koden.

Texten står kvar ovan **som underlag**, inte som beslut, eftersom frågan kan
återkomma: sidan laddar numera hCaptcha från en extern domän och behandlar
besökarens IP, vilket gör en integritetsrad **mer** relevant än när han tog bort
den, inte mindre. Det är framfört till honom som information. Vill han ha tillbaka
den är formuleringen färdig.

### Kontaktsektionen blir tvåspaltig — beslutat av Jelal 2026-10-07 — sidorna och DOM-ordningen UPPHÄVDA 2026-11-07, se M16

> **Gäller i stället:** kontaktuppgifterna till **vänster och först i DOM**,
> formuläret i en `--surface`-panel till höger, och `minmax(0, 2fr) minmax(0, 3fr)`
> från 900 px. Uppdraget 2026-11-07 är nyare än Jelals val 2026-10-07 och säger
> uttryckligen motsatsen, och hans beslut 4 avgör det. **Principen att visuell
> ordning och Tab-ordning är densamma gäller.** Rubrikerna gäller. Genomförs i
> P13.

Jelal: *"De är nog bättre att kontakt är på högra sidan utav de man fyller i och
inte ovanför."* Formuläret till vänster, kontaktuppgifterna till höger.

#### DOM-ordningen byts också — inte bara den visuella — ordningen UPPHÄVD 2026-11-07, se M16 (principen gäller: DOM-ordning = visuell ordning)

**Beslut: formuläret först i koden, länkarna efter.**

Alternativet — att låta länkarna ligga kvar först i DOM och bara flytta dem
visuellt med grid-placering — **avfärdas.** Det hade gjort tangentbordsordningen
olik den visuella på bred skärm, och att de två stämmer överens har varit en
uttrycklig verifieringspunkt sedan paket 7. Att bryta en mätt regel för en
placeringsändring vore att byta bort något säkert mot något smakmässigt.

**Och ordningen stämmer med Jelals egen prioritering.** Han har sagt att
formuläret ska stå till vänster, alltså läsas först. Att det då också kommer först
på smal skärm är en följd av hans beslut, inte en avvikelse från det.

> **Men följden på mobil ska läggas fram för honom.** I dag står länkarna ovanför
> formuläret, så den som bara vill mejla ser adressen utan att scrolla. Efter
> ändringen ligger de **under** formuläret — fem fält och en captcha bort. Han
> tittar sannolikt på en bred skärm och har inte sett det.
>
> Jag föreslår ingen kompensation. Att upprepa e-posten på två ställen vore två
> ställen att underhålla och adressen uppläst två gånger för en skärmläsare. Vill
> han ha den högre upp på mobil är det hans beslut, och då en egen ändring med en
> egen lösning.

#### Spalterna — UPPHÄVT 2026-11-07, se M16 (rutnätet och `.formPanel` står där tecken för tecken)

```css
.grid {
  display: grid;
  gap: var(--space-7);                 /* 48 px, båda axlarna */
  align-items: start;
}
@media (min-width: 900px) {
  .grid { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
}
```

`minmax(0, …)` på båda spåren, aldrig bara `3fr`. Regeln har bitit två gånger.

`align-items: start` så att länkspalten inte sträcks ut till formulärets höjd —
samma regel som för pills och projektkort.

**Formulärets block får `max-width: var(--measure)`.** Fälten ska inte bli bredare
än en läsbar radlängd; en textarea på 700 px är obekväm att skriva i.

#### Brytpunkten 900 är räknad, inte vald — premissen UPPHÄVD 2026-11-07, se M16 (captchan är `compact`, 164 px. 900 står kvar som brytpunkt men bärs inte längre av widgeten)

Projektet har 600 och 900. **600 går inte**, och skälet är captchan:

| Vid brytpunkten | Innehållsbredd | Formulärspåret (3 av 5, minus 48 px gap) | Captchan ryms? |
|-----------------|----------------|-------------------------------------------|----------------|
| 600 px | 525 px | **286 px** | **nej — widgeten är 302 px** |
| 900 px | 795 px | **448 px** | ja, med 146 px marginal |

> **Rättat tal:** widgeten är **302 px**, inte 320 som jag först skrev. Slutsatsen
> ändras inte — 286 < 302, så 600 faller fortfarande — men talet ska vara rätt.

hCaptcha-widgeten är **302 px bred och går inte att krympa**. Den är sektionens
minst eftergivliga element och bestämmer därför var spalterna får uppstå. Vid 600
hade den spräckt spåret och gett horisontell scroll.

**Det är widgeten som sätter brytpunkten, inte tycke.** Byts captchan eller dess
bredd ut måste talet räknas om.

#### Rubrikerna

| Rubrik | Nivå | Omfattar |
|--------|------|----------|
| "Kontakt" | `h2`, ur `sections.js` | hela sektionen, **ovanför** rutnätet |
| "Fyll i dina uppgifter" | `h3` | **endast** formulärspalten |
| Kontaktuppgifternas rubrik | `h3` | **endast** länkspalten |

`h2` ligger utanför rutnätet och spänner hela bredden — den namnger sektionen,
inte en spalt.

**Länkspalten får en egen `h3`.** Utan den blir högerspalten ett namnlöst block
som svävar bredvid formuläret, och den som hoppar mellan rubriker med skärmläsare
får ingen väg dit. Förvald text: **"Kontaktuppgifter"**. Neutral och beskrivande —
~~**men den är min, inte Jelals, och ska godkännas** som alla texter som talar i
hans namn.~~ **GODKÄND ordagrant av Jelal 2026-11-18, se M16.** Byggaren tar bort
märkningen "TEXT SOM JELAL SKA GODKÄNNA" i `src/components/Contact.jsx`.

#### Verifiering av flytten — UPPHÄVT 2026-11-07, se M16 (P13:s godkännandepunkter gäller)

- **Tangentbordsordningen mot den visuella, i båda lägena.** Tabba igenom
  sektionen vid 360 px och vid 1280 px och jämför med den visuella ordningen.
  **Mät, tolka inte** — det är hela skälet att DOM-ordningen byts.
- **360 px-golvet med captchan.** Den var den trängsta posten senast.
- **Spåret vid exakt 900 px.** Formulärspåret ska vara ≥ 320 px. Mät vid 900, inte
  bara vid 1280 — brytpunkten är den smalaste punkten i tvåspaltigt läge.
- **De sju fokusringarna** — fem i formuläret, två på länkarna — mäts mot sin
  faktiska bakgrund efter flytten. Länkarna byter inte yta men de byter plats, och
  en mätning som inte gjorts om är ingen mätning.
- **Inget annat på sidan ändras.** Jämför renderad utdata för header, hero, skills,
  projekt och footer före och efter.

#### Verifiering — tokennamn och `.surface-light`-punkten UPPHÄVDA 2026-11-07, se M2 och M5 (formulärpunkterna gäller och körs om i P13)

Paket 7 lämnade fyra punkter oprövade **för att kontaktsektionen var tom**. Alla
fyra blir prövbara nu och ska prövas:

1. **Fokusringar på kontaktlänkarna** — sidans första fokuserbara element utanför
   headern.
2. **Tabbordningen efter navlänkarna.**
3. **`aria-current` för "Kontakt"** — kunde aldrig bli aktuell, eftersom projects
   täckte 351 px mot contacts 325 px vid sidans maxrullning. Med formuläret på
   plats växer contact och fallet blir prövbart. Mät om.
4. **`#C25102`-ringen i den ljusa ytan** — fortfarande oprövad på ett verkligt
   element.

Formuläret lägger till fyra fokuserbara element på en gång, plus tre länkar.

> **Räkna upp varje fokuserbart element på sidan och mät fokusringens kontrast på
> vart och ett, mot den yta det står på. Uttömmande, inte stickprov.** Det var
> frånvaron av element som dolde fokusringsfelet förra gången, och ett formulär är
> precis det som ändrar den frånvaron.

Utöver det:

- **Honeypot:** bekräfta att `botcheck` varken går att tabba till eller annonseras.
  Testa med tangentbord **och** med skärmläsare, inte bara genom att läsa CSS.
  **Tillagt 2026-11-08, se M22 punkt 3:** pröva också att den stoppar något, med
  proven H1–H3 där.
- **Knappen i dämpat läge:** bekräfta att den går att tabba till, att ett klick
  visar felmeddelandena och flyttar fokus till första felande fält, och att inget
  inskick sker. En knapp som ser inaktiv ut men är tyst när man trycker är sämre än
  en riktig `disabled`.
- **hCaptcha återställs** i både lyckat och misslyckat läge. Skicka två gånger i
  rad och bekräfta att det andra försöket inte avvisas på en förbrukad token.
- **Platshållarnas kontrast** mot fältbakgrunden: minst 4,5:1. Mät, anta inte —
  `--color-text-dim` ger 3,64 och hade fallit.
- **Den renderade sidan innehåller exakt de sektioner som står i `sections.js`, i
  samma ordning.** Mät utdata, inte markup. Kontrollen fångar både en post utan
  komponent och en komponent som renderas i fel ordning — den ersätter en statisk
  grind som hade behövt läsa `App.jsx` som text.
- **`aria-current` täcker alla fem sektionerna**, inklusive den nya, och hero
  observeras fortfarande utan att ha en navlänk. **Mät om vilken sektion som vinner
  vid sidans maxrullning** — ordningen har ändrats, och det tidigare utfallet
  (projekt slog kontakt) gällde en annan sidstruktur.
- **Logga-länken har ett tillgängligt namn vid samtliga bredder.** Mät med
  tillgänglighetsträdet, inte genom att läsa markup. Detta är projektets enda
  signal med en enda bärare — se distinktionsregistret.
- **Logga-länkens träffyta är minst 44 × 44 px.** Mät den renderade rektangeln.
  Den krympte när den synliga texten togs bort, och det är den sortens försämring
  som inte får något larm att gå.
- **Asterisken och ett felmeddelande ska stå samtidigt synliga som accenten** —
  knappen eller fokusringen i samma vy. Bekräfta okulärt att de inte läses som
  samma färg. Kvoterna säger att de är olika; bara ögat kan säga att skillnaden
  syns.
- **Ändringar utanför kontaktsektionen: noll.** Jelal har sagt "ändra inget annat
  på sidan". Jämför renderad utdata före och efter för hero, skills, projekt,
  header och footer. Det enda som får tillkomma utanför sektionen är
  `--color-field-border` i `tokens.css`.
- **Timeout:** tvinga den att fallera — blockera anropet och bekräfta att
  felmeddelandet kommer efter 15 sekunder och att "Skickar …" inte blir kvar.
- **Statusraden:** bekräfta att alla fyra tillstånden faktiskt annonseras, inte
  bara att texten byts i DOM.
- **360 px:** fälten får inte spräcka golvet. `width: 100%` och `box-sizing:
  border-box`, aldrig en fast pixelbredd.
- **Ett riktigt meddelande ska skickas** och landa i `qaiumi@hotmail.com`. Ett
  formulär som inte har levererat ett meddelande är inte verifierat.
- **Tillägg 2026-11-18, M24:** varje länk vars `url` inte är `null` står också i
  sameAs i sidans JSON-LD. En profil som bara ska stå i sameAs skrivs i
  `site.sameAsExtra`, inte här.

### `src/data/site.js` — sidans adress och sameAsExtra (tillagd 2026-11-18, M24, P19c)

Form, typedef, grindar (V6, V7) och vilka andra filer som följer domänen står i
**M24 punkt 1 och 2**. `sameAsExtra` är
`['https://github.com/Jelalqaiumi']`, Jelals svar 2026-11-18: GitHub bara i
sameAs, inte på sidan (M24 punkt 7).

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

### Komponenter och exakta signaturer — tio rader UPPHÄVDA 2026-11-07, se M-avsnittets komponenttabell

> **UPPHÄVT 2026-11-07 för raderna Header, Section, Hero, Skills, SkillChip,
> Projects, ProjectCard, Contact, About och Footer, se "Komponenter och signaturer
> efter moderniseringen" i M-avsnittet.** Den tabellen gäller för dem. Raderna
> nedan gäller för `App.jsx` och `ContactForm.jsx` och är historik för resten.
> `isComplete` ligger i `src/lib/projectRules.js` från P6, inte i `ProjectCard.jsx`.

| Fil | Signatur | Ansvar |
|-----|----------|--------|
| `src/App.jsx` | `function App()` | Renderar `<Header />`, `<main>` med `<Hero />` följt av `sections.map(...)` som slår upp komponenten i `SECTION_COMPONENTS`, och `<Footer />`. Uppslaget är konfiguration, inte logik — se "`sections.js` blir åter enda källan". |
| `src/components/Header.jsx` | `function Header()` | Sticky header. JQ-märket (`logo-mark-tight-96/192.png`, `alt=""` + `aria-hidden="true"`) plus namnet som HTML-text, tillsammans **en** länk till `HERO_ID`, utan platta eller ram runt märket. Headerbandet är grått (`--color-bg-top`). Navlänkar genereras från hela `sections`. Tar inga props. Detaljerna står i "Headerns uppbyggnad" — den som bara läser denna rad har inte hela beslutet. |
| `src/components/Section.jsx` | ~~`function Section({ id, title, children, className })`~~ **UPPHÄVT 2026-11-08, se M23 punkt 1:** `function Section({ id, title, children, className, surface })` | Återanvänd ram för skills/projects/contact. Renderar `<section id={id}>` med `<h2>{title}</h2>` och innehållet. `className` är valfri och läggs till efter modulens egen klass. Används **inte** av Hero. |
| `src/components/Hero.jsx` | `function Hero()` | Renderar sin egen `<section id="hero">` med `<h1>`, rollrad, ingress, **de två knapparna** (A5) och profilbilden. Egen, eftersom hero har `h1` och ingen `h2`-rubrik. Knapparnas mål hämtas ur `PROJECTS_ID` och `CONTACT_ID` — aldrig som literal. |
| `src/components/Skills.jsx` | `function Skills()` | Läser `skillGroups` från `src/data/skills.js`. Renderar **ett kort per grupp** med `h3` och en `<ul>` av `<SkillChip />` (A6). Ingen teckenförklaring, ingen skill-data i filen. |
| `src/components/SkillChip.jsx` | `function SkillChip({ name })` | Renderar en `<li className={styles.chip}>` med namnet. **Ett enda utseende** (A2). Ren presentation, inget state. Hette `SkillPill.jsx` före 2026-10-08. |
| `src/components/Projects.jsx` | `function Projects()` | Läser `projects`. Inga kompletta poster → tomt läge på svenska. Annars en lista av `<ProjectCard />`. Importerar `isComplete` ur `ProjectCard.jsx`. |
| `src/components/ProjectCard.jsx` | `function ProjectCard({ project })` plus `export function isComplete(project)` | Tar hela project-objektet. Renderar `url`/`repoUrl` endast när de inte är `null`. Sätter `id={project.id}` på kortet (A4) så att Om mig-länken har ett mål. **`isComplete` är en namngiven export** — kortets krav på en post bor hos kortet, och både `Projects.jsx` och `About.jsx` läser samma predikat i stället för två kopior som kan glida isär. |
| `src/components/Contact.jsx` | `function Contact()` | Läser `contact`. Renderar e-posten som `mailto:`-länk, `contact.links.filter(l => l.url !== null)`, och `<ContactForm />`. Inga adresser eller URL:er hårdkodade. |
| `src/components/ContactForm.jsx` | `function ContactForm()` | Läser `contact.form`. Äger de fyra tillstånden, valideringen och statusraden. **Projektets första komponent med `useState`** — tre fältvärden, ett tillstånd, ett felobjekt. Se "Kontaktformuläret". |
| `src/components/About.jsx` | `function About()` | Läser `about.paragraphs` och renderar ett `<p>` per stycke, `max-width: var(--measure)`. Rubriken kommer från `sections.js`. Ingen text i komponenten. Äger dessutom **länkläget** i A4: `about.link` + `isComplete` ur `ProjectCard.jsx` avgör om frasen blir en `<a>` eller vanlig text. |
| `src/components/Footer.jsx` | `function Footer()` | `<footer>` med namn och årtal. Inget `id`, inget navmål. |

Alla komponenter är funktionskomponenter utan `useState`/`useEffect` i paket 1–6.
Den mobila navigationens eventuella toggle hör till paket 7. **(Historik. Mobilmenyn
är beslutad i M8 och byggs i P4.)**

### Ankarnavigering — exakt mekanik — punkt 6 UPPHÄVD och punkt 4 ändrad 2026-11-07, se M5 och M6

> Punkt 4: formeln står kvar, men `--header-height` är nu
> `calc(var(--nav-offset) + var(--nav-height))` (M6). Punkt 6 är UPPHÄVD: fokus är
> `outline: 2px solid var(--accent); outline-offset: 2px;` (M5). Punkt 1–3 och 5
> gäller oförändrade.

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

### Var sidmarginalen bor — beslutat efter paket 1 — värdet UPPHÄVT 2026-11-07, se M18 (mekanismen gäller)

> `--content-padding` är `1.5rem`, inte `clamp(1rem, 5vw, 3rem)`. Allt annat i
> avsnittet gäller: marginalen ägs globalt, och modulerna äger bara centreringen.

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

### Hero får grå bakgrund — beslutat av Jelal 2026-10-05 — UPPHÄVT 2026-11-07, se M10

> **Gäller i stället:** hero har `--bg` med ~~den orange glöden från höger kant
> (M10)~~ det svartvita porträttet och en toning (**glöden UPPHÄVD 2026-11-07, se
> M10c**), och det gråa övre fältet utgår helt (M5, M6). Underavsnitten är historik
> och bär var sin märkning.

Jelal har valt att **hero**, inte Kompetenser, är "första sektionen" och ska ha
samma grå ton som headern. Header och hero blir alltså **ett sammanhängande grått
fält**, och den mörka bottnen börjar först vid Kompetenser.

#### Var bakgrunden sätts — bakgrunden UPPHÄVD 2026-11-07, se M10 (platsen gäller: heros egen sektionsklass)

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

#### Varför tokenet delas — UPPHÄVT 2026-11-07, se M5 (testet "vill vi ändra dem tillsammans" gäller som princip)

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

#### Gränsen hero → Kompetenser bär dubbel markering — avsiktligt — UPPHÄVT 2026-11-07, se M10 (inget färgsteg finns längre, bara linjen)

Där möts nu både `section[id] + section[id]`-linjen och ett färgsteg från grått
till mörkt, medan de två andra sektionsgränserna bara har linjen.

**Det är rätt, och det är ett val.** Gränsen mellan presentation och innehåll är
en annan sorts gräns än den mellan två innehållssektioner. Att den starkaste
gränsen på sidan också är den tydligast markerade är hierarki, inte slump.

Alternativet — att släcka linjen just där med `#hero + section[id]` — avfärdas på
två grunder: det inför ett id-specifikt undantag i en regel som i dag är
id-oberoende, och det hade gett sidans viktigaste gräns dess svagaste markering.

#### Cirkeln mot grå botten — UPPHÄVT 2026-11-07, se M10 (cirkeln står mot `--bg` och glöden. P5 mäter om strecket och tonplattan) — även det UPPHÄVT 2026-11-07, se M10c (ingen cirkel, inget streck, ingen tonplatta)

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

### A5 — Hero: knapparna, mätserien och 360 px — beslutat 2026-10-08 — kravet "knapparna utan scroll på mobil" UPPHÄVT 2026-11-07 av Jelal, se M10d

Uppdraget lägger till **två knappar** i hero och ställer två mätbara krav: "hero
ska fylla ungefär första skärmen på dator" och "knapparna ska synas utan scroll på
mobil". Det senare är uppdragets hårdaste krav, och därför är det ett eget paket
(C) med en **mätserie** — inte en mening i någon annans verifiering
(`LARDOMAR.md` 2026-10-05: går ett "får aldrig" att mäta är mätningen beslutet och
prosan bara förklaringen).

#### Vad knapparna är

**Två `<a>`-element, inte `<button>`.** De navigerar till en sektion på samma sida;
det är en länk. `<button>` hade krävt JS för att göra något, och
`scroll-behavior: smooth` i `global.css` gör redan scrollningen mjuk, med
`prefers-reduced-motion`-undantag. **Ingen `scrollIntoView`, ingen scrollhanterare,
ingen ny JS alls.**

| Ordning | Text (exakt ur uppdraget) | Mål | Stil |
|---------|---------------------------|-----|------|
| 1 | `Se mina projekt` | `PROJECTS_ID` | primär, fylld |
| 2 | `Kontakta mig` | `CONTACT_ID` | sekundär, kontur |

Målen hämtas ur de **namngivna konstanterna** i `sections.js`. Ett sektions-id får
aldrig stå som literal i en `.jsx`-fil (`LARDOMAR.md` 2026-10-02). Uppdragets
`#projekt` och `#kontakt` uppfylls som **funktion**, inte som sträng: id:na är
`projects` och `contact` och byts inte — navet, `aria-current`-observern,
sektionsavgränsarna och varje befintlig länk hänger på dem.

#### Knappstilarna — bindande deklarationer — UPPHÄVT 2026-11-07, se M10

> **Gäller i stället:** pill-knapparna i M10, tecken för tecken. Knapparnas antal,
> texter, mål och ordning gäller oförändrade. Deklarationerna och kvoterna nedan är
> historik, eftersom de bygger på det gråa fältet och den gamla paletten. Meningen
> "Ingen tredje global klass införs" är upphävd av M12 för `.reveal` och ingenting
> annat.

De bygger på **det som redan finns**: formulärets `.button` har sedan paket 6 den
fyllda orangen med `--color-on-accent`, och den paret är sidans "primära
handling". Deklarationerna skrivs ändå ut i `Hero.module.css`, för
`ContactForm.module.css` tillhör en `<button>` med tre tillstånd (`data-muted`,
`Skickar …`) som hero inte har. **Ingen tredje global klass införs** — den dörren
är stängd i "Headerns logotyp", och den gäller.

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.actionPrimary {
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-accent);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--color-on-accent);
  font-size: var(--text-base);
  transition: background-color var(--transition);
}

.actionPrimary:hover {
  background-color: var(--color-accent-hover);
}

.actionSecondary {
  padding: var(--space-3) var(--space-5);
  background-color: transparent;
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: var(--text-base);
  transition: border-color var(--transition);
}

.actionSecondary:hover {
  border-color: var(--color-text);
}
```

- **`flex-wrap: wrap` är hela mobilhanteringen.** "Staplade på mobil" kräver ingen
  brytpunkt: knapparna radbryter av sig själva när de inte får plats på 309 px
  användbar bredd. En brytpunkt hade varit ett andra tal att hålla i synk med
  texternas längd.
- **`border: 1px solid transparent` på den primära** så att de två knapparna får
  **exakt samma höjd**. Samma skäl som den gamla ifyllda pillen hade, och det är
  det enda som överlever av den regeln.
- **Konturknappens ram är `--color-text-muted`, INTE `--color-border`.** Hero
  ligger på `--color-bg-top` (`#2A2A2E`) och `--color-border` har **samma
  hexvärde** — ramen hade mätt 1,00:1 mot sin egen bakgrund, alltså en osynlig
  kant. Det är exakt samma fel som headerns kant hade innan
  `--color-header-border` infördes. En knapps ram är en gränssnittskomponents
  avgränsning och omfattas av WCAG 1.4.11:s **3:1**.
- **Hover rör sig bort från underlaget** i båda fallen — den etablerade regeln.

Kvoterna mot hero:s `#2A2A2E` är **uppmätta i paket B** (åtta mätningar, störst
avvikelse 0,046 från mina överslag, och ingen avvikelse ändrar ett utfall — mina
tal var förväntan, mätningen är det som gäller):

| Par | Uppmätt | Krav |
|-----|---------|------|
| `--color-text` mot `--color-bg-top` | **12,226:1** | 1.4.3 normal 4,5:1 ✓ |
| `--color-text-muted` mot `--color-bg-top` | **5,567:1** | 1.4.3 normal ✓, 1.4.11 ram 3:1 ✓ |
| `--color-border` mot `--color-bg-top` | **1,000:1** | Bekräftar att en ram i `--color-border` är osynlig på hero — därför konturknappens ram är `--color-text-muted` |

De två **textkvoterna skrivs in i `tokens.css`** i lärdomens format
(`/* <token> mot <bakgrund>: X,XXX:1 — AA normal */`) — det hör till **paket J**,
som äger filen, och talen finns nu att föra in därifrån. Paket B mätte dem men
skrev dem inte in, och det var rätt: `tokens.css` ligger inte i B.

Fokusringen är oförändrat orange och mätte 5,047:1 mot samma grå band när
skip-länken byggdes.

#### Var knapparna står i DOM

Inuti `.text`-gridden, **efter ingressen**, som ett eget element:
`h1` → rollrad → ingress → `.actions`. Då ärver de `.text { gap: var(--space-4) }`
och behöver ingen egen marginal. Profilbilden ligger kvar **efter** texten i DOM,
~~alltså under den på mobil och vid sidan från 900 px~~ — det är redan uppdragets
önskade ordning och ingenting behöver flyttas. (**Placeringen UPPHÄVD 2026-11-07,
se M10c:** bilden är fortfarande sist i DOM men ligger bakom texten som heros
bakgrund i alla bredder. **Även det UPPHÄVT 2026-11-07, se M10d:** bilden är
först i DOM, överst under 900 px och bakom till höger från 900 px.)

**Ingressen skrivs som EN sträng**, inte som två med `+`. Nuvarande kod
konkatenerar, och en konkatenering är det enklaste sättet att tappa ett mellanslag
mitt i en text som ska vara exakt.

#### A15 — Varje text Jelal äger står som en namngiven konstant, inte som JSX-literal — beslutat 2026-10-08

Byggaren lade knapptexterna som `primaryActionText` och `secondaryActionText` i
`Hero.jsx`, intill `name`, `role` och `intro`. **Formen är rätt och blir regel.**
Namnen är bindande precis som de står — de byts inte, eftersom en omdöpning av en
incheckad fil inte ger något mätbart.

```js
const primaryActionText = 'Se mina projekt';
const secondaryActionText = 'Kontakta mig';
```

**Skälet är verifieringspunkten, inte smaken.** B1, D1, F1 och A1:s
engångsjämförelse är maskinella jämförelser mot `UPPDRAG-2026-10-07.md`. Står två
av heros fem Jelal-ägda strängar som JSX-literaler täcker den jämförelsen tre av
fem, och de två som faller utanför är de som uppdraget dessutom skriver med
citattecken — alltså just de strängar A14 behövde avgöras för. En
verifieringspunkt som bara räcker till en del av det den uttalar sig om är samma
felläge som teckengrinden hade: den mäter det som var lätt att läsa.

**Regeln, för B, E, F och varje framtida paket:** en text som är Jelals egna ord
och som bor i en komponent (inte i `src/data/`) står som en modulnivåkonstant med
ett namn, med invariantkommentaren ovanför, och renderas som `{konstanten}`.
Ingen Jelal-ägd text skrivs som literal i JSX. Texter som bor i `src/data/` är
redan maskinellt jämförbara och berörs inte.

**Ingen `EJ I ARKITEKTUR`-markering skulle ha satts, och byggarens skäl är rätt:**
markeringen är för öppna frågor om utseende och värden, inte för kodstruktur. Och
från och med detta beslut vore den dessutom förbjuden — en besvarad fråga får
ingen markering (`LARDOMAR.md` 2026-10-05, ÅTERKOMMANDE).

#### Heros `EJ I ARKITEKTUR`-markeringar — vilka som är besvarade nu — UPPHÄVT 2026-11-07, se M10 (alla fyra kvarvarande är avgjorda där och tas bort i P5)

Två av dem blir besvarade av detta beslut, eftersom A5 bygger på dem. De tas bort
i samma ändring som genomförandet (`LARDOMAR.md` 2026-10-05, ÅTERKOMMANDE):

| Markering | Status |
|-----------|--------|
| `.text`-gridden: de inre avstånden | **BESLUTAT:** `gap: var(--space-4)`. Knapparnas avstånd till ingressen kommer därifrån och ska inte sättas separat |
| `.text`: hur rollraden skiljs från ingressen | **BESLUTAT:** med **färg**, `--color-text` mot `--color-text-muted`, inte med en fjärde typografisk nivå. Vikt går inte att använda — teckensnittet har en enda |
| `.inner`: layoutmekanism och spårbredder | **BESLUTAT för `.hero`** (gridden i A5 ovan). För `.inner` står de två lika breda spåren från 900 px kvar som byggarens val, **ännu obesvarad av arkitekten** |
| `IMAGE_SIZES`-värdet | Ännu obesvarad av arkitekten |
| Profilbildens `alt`-text | Ännu obesvarad av arkitekten |
| `contrast(1.05)` i gråskalan | Ännu obesvarad av arkitekten |

#### Hero fyller första skärmen på dator

```css
@media (min-width: 900px) {
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: center;
    min-height: calc(100vh - var(--header-height));
    min-height: calc(100svh - var(--header-height));
  }
}
```

- **Bara från 900 px.** Ett golv på mobilhöjden hade tvingat fram tomrum på en låg
  telefon, alltså motverkat det andra kravet.
- **`minmax(0, 1fr)` även här.** `.hero` blir en grid-container, och regeln gäller
  varje grid-container utan undantag — ett registrerat återfall.
- **Två `min-height`-rader i den ordningen.** `100svh` vinner där den stöds,
  `100vh` är reserven. Det är en reservkedja, inte en dubblett.
- **`--header-height`, samma token som `scroll-margin-top`**, så att de inte kan
  driva isär. Headern har låst höjd till samma token.

##### A13 — blocket genomförs i ett eget paket K, inte i B och inte i C — beslutat 2026-10-08

Blocket ovan låg i inget paket. `PLAN.md`:s "Ingår" för paket B räknar upp
texterna, knapparna, rollkommentaren och `<title>`; paket C **mäter** kravet.
Byggaren byggde därför inte blocket, och det var rätt — ett paket bygger inte
utanför sin egen uppräkning.

**Följden är uppmätt:** `min-height` fanns inte någonstans i `Hero.module.css`,
och hero var 676 px — **0,918** mot mätserierad 5:s nämnare vid 1280 × 800 och
**0,809** vid 1280 × 900, alltså **inne** i bandet 0,80–1,15. Mobilsidan av kravet
håller redan utan blocket (båda knapparnas underkant på 387 px vid 390 × 844).

**Mitt tidigare tal här — "0,75", räknat som `676 / 900` — är upphävt**, se
**A16** ovan: det var kvoten mot hela vyporten, inte mot mätseriens nämnare.
**Rätt skäl till att paketet finns är därför inte en fälld mätning utan att
blocket var en utskriven deklaration som låg i inget pakets "Ingår"** — och ett
beslut i detta dokument får bara lämnas ogenomfört genom att jag skriver om
punkten (`LARDOMAR.md` 2026-10-02). K var rätt att bygga, och efter K är kvoten
1,000 vid både 1280 × 800 och 1280 × 900.

**Beslut: ett eget paket, `K`.** Tre vägar fanns och två är stängda:

| Väg | Varför inte |
|-----|-------------|
| Paket C | C är grinden. En grind som mäter sitt eget bygge är ingen grind — projektets regel, och den gäller utan undantag |
| Paket B återöppnas | B är levererat och incheckat som `4defa9f`. "Paket B klart" skulle då betyda två olika saker beroende på datum, och det är precis det felläge `LARDOMAR.md` registrerat tre gånger: ett dokument eller en kommentar som beskriver ett tillstånd som hunnit bytas. Ett levererat paket får inte få nytt innehåll |
| **Eget paket K** | **Valt.** Ett bygge, en incheckning, en betydelse. K ligger mellan B och C och **blockerar C** |

Bokstaven: A–H och J är tagna, `I` undviks av samma skäl som `PLAN.md` anger.
Alltså **K**.

**K:s omfattning — exakt detta och inget mer:** `@media (min-width: 900px)`-blocket
ovan, skrivet tecken för tecken i `Hero.module.css`, båda `min-height`-raderna i
den ordningen. Ingenting annat i hero rörs: inga texter, inga knappstilar (de är
genomförda i B med 19 av 19 deklarationer identiska), ingen av de fyra kvarvarande
`EJ I ARKITEKTUR`-markeringarna i hero-filerna — de är ännu obesvarade av mig och
ska stå kvar orörda.

**Fallerar en mätning i C går fyndet tillbaka till K.** A5:s ordning för vad som
får vika (`padding-block`, sedan ingressens grad, sedan stopp) är ett
**genomförande** och genomförs därför i K, aldrig av C. C mäter, redovisar och
lämnar tillbaka. Det är samma gräns som gjorde detta beslut nödvändigt.

#### Mätserien — detta ÄR kravet (paket C) — rad 2:s vyporter UTÖKADE 2026-11-07, se M10b — serien OMSKRIVEN 2026-11-07, se M10c — rad 1 och knappkravet under 900 px UPPHÄVDA 2026-11-07 av Jelal, se M10d (rad 1d)

> Rad 2 mäts sedan P5 på åtta vyporter i stället för fyra, med rullningslisten
> reserverad. Listan står i M10b. Raderna 1 och 3–6 gäller som de står.
>
> **Från P5 omgång 4 gäller "Mätserien utan bildspåret" i M10c.** Den har samma
> rad 1–6 (rad 3 och 4 utökade) plus spår- och h1-grinden och raderna 7–10 för
> kontrast mot bildens pixlar, ansiktet, bildladdningen och pillen. Tabellen nedan
> är historik.

Varje rad mäts på **elementens egna rektanglar** (`getBoundingClientRect()`), med
**bevisad vyport**, aldrig genom att titta på sidan.

| # | Mätning | Villkor |
|---|---------|---------|
| 1 | Båda knappelementens `bottom` vid 360 × 640, 360 × 667, 360 × 740, 390 × 844 | `bottom <= window.innerHeight` i **samtliga** fall. 640 är golvet och får inte utelämnas för en bekvämare höjd |
| 2 | Samma mätning vid de åtta vyporterna i M10b (före 2026-11-07: 600 × 640, 900 × 700, 1280 × 800, 1600 × 900) | Samma villkor. Serien gör att en framtida brytpunkt inte kan smyga sönder kravet |
| 3 | `section#hero .inner` `scrollWidth` mot `clientWidth` vid 360 px | Lika. Mätt mot **hero:s egen behållare**, inte mot sidan — slack absorberar fel, och absorberade fel larmar inte |
| 4 | Samma, med `verksamhetsutvecklingsprojektledningsarbete` (43 tecken) programmatiskt insatt i `h1`, rollraden, ingressen **och båda knapptexterna** | Lika. En synteststräng, inte dagens text: dagens text bevisar ingenting om morgondagens. **Den gamla listans längsta strängar är inte längre måttet** |
| 5 | `section#hero` höjd vid **1280 × 800** och **1280 × 900** | Kvoten `hero.getBoundingClientRect().height / (window.innerHeight - headerHöjd)` ligger mellan **0,80 och 1,15** i båda fallen. `headerHöjd` mäts i samma körning på `header`-elementets egen rektangel. **Exakt en kvot per rad** — kvoten mot hela vyporten är inget kriterium och redovisas inte. Formeln och bandets giltighetsområde är avgjorda i **A16** nedan |
| 6 | Negativ kontroll | Tvinga fram ett överskridande genom den smalaste selektor som träffar det som prövas, redovisa **vilket element** som bar avvikelsen (`scrollWidth` plus elementet med största `right`), kontrollera `querySelectorAll(sel).length`, och visa att larmet upphörde när injektionen togs bort |

##### A16 — Höjdkvoten har EN formel, och bandet gäller bara från 900 px — beslutat 2026-10-08 — nämnarens mätpunkt ändrad 2026-11-07, se M6

> Headern har `margin-top: var(--nav-offset)` sedan M6, så
> `header.getBoundingClientRect().height` är 58 och inte de 74 px headern tar i
> flödet. **Nämnaren mäts som `window.innerHeight - header.getBoundingClientRect().bottom`
> vid scroll 0.** Det är samma tanke (vyporten minus det headern tar) med en
> mätpunkt som stämmer med den svävande naven. GRIND-raden jämför `bottom` med det
> beräknade värdet av `--header-height`. Resten av A16 gäller.

Paket D och K lämnade tillbaka att bandet mättes på två oförenliga sätt: mätserien
rad 5 skrev nämnaren `(window.innerHeight - 64)`, medan A13 nedan räknade
`676 / 900` — alltså mot hela vyporten. Byggaren redovisade **båda** kvoterna i
varje mätrad i stället för att välja, och det är inte försiktighet: två kvoter
intill varandra lämnar valet till läsaren, och det är precis så de två läsningarna
kunde leva sida vid sida i fyra mätrader. **Detta avgör det.**

**Del 1 — formeln, och ingen annan:**

```js
const hero = document.querySelector('section#hero');
const headerHojd = document.querySelector('header').getBoundingClientRect().height;
const kvot = hero.getBoundingClientRect().height / (window.innerHeight - headerHojd);
```

- **Nämnaren är vyporten minus headern.** `.hero`-blockets `min-height` ÄR
  `calc(100svh - var(--header-height))`, så kravets naturliga värde är **1,00** och
  bandet 0,80–1,15 ligger symmetriskt kring det. Mot hela vyporten kan kvoten
  aldrig nå 1,00 så länge headern tar plats — ett band kring 1,00 mot hela
  vyporten hade grindat en omöjlighet.
- **Nämnaren mäts, den skrivs inte.** `64` är värdet på `--header-height` och får
  aldrig stå som konstant i formeln: headerns höjd har redan en gång varit
  definierad på två oberoende ställen (`LARDOMAR.md` 2026-10-02). Headern är låst
  till tokenet (`height: var(--header-height)`), så den uppmätta höjden **ska**
  vara 64 px — det skrivs ut som en **GRIND** i samma mätrad, och fäller om den
  avviker från tokenvärdet.
- **En kvot per rad.** Kvoten mot hela vyporten är inte ett kriterium, är inte ett
  jämförelsetal och redovisas inte alls. Står två kvoter i en mätrad är mätraden
  fel skriven, inte generös.
- **Vilken LEGITIM ändring får fälla raden:** ingen. Ändras `--header-height`
  följer nämnaren med av sig själv — det är hela skälet till att den mäts.

**Rättelse av mitt eget tal i A13 nedan.** Under den nu enda formeln var kvoten
**före** paket K **0,918** vid 1280 × 800 (mätseriens egen föreskrivna vyport) och
**0,809** vid 1280 × 900 — **båda inne i bandet**. Läst bokstavligt föll rad 5
alltså aldrig vid den vyport den föreskriver. Talet `0,75` var `676 / 900`, alltså
den andra läsningen, och är upphävt. **Paket K:s skäl är att en utskriven
deklaration i A5 låg i inget pakets "Ingår"** (`LARDOMAR.md` 2026-10-02: ett
beslut får bara lämnas ogenomfört genom att jag skriver om punkten) — inte en
fälld mätning. K var alltså rätt att bygga, och efter K är kvoten **1,000** vid
både 1280 × 800 och 1280 × 900.

**Del 2 — bandet gäller från 900 px bredd, och ingen annanstans.** `899 × 700`
ligger utanför bandet (hero högre än vyporten) och det är **inte ett fynd**:

- Blocket som bär golvet är `@media (min-width: 900px)`. Under 900 px finns inget
  höjdgolv, **avsiktligt**: ett golv på mobilhöjden tvingar fram tomrum på en låg
  telefon och motverkar uppdragets hårdaste krav. A5 skriver bandet "på dator", och
  **dator = från 900 px**, samma brytpunkt som blocket.
- ~~Under 900 px är kravet uteslutande mätserierad **1 och 2** — båda knapparnas
  underkant inom vyporten.~~ **UPPHÄVT 2026-11-07, se M10d:** under 900 px är
  kravet att rubrikens överkant ligger inom vyporten (rad 1d). Resten av punkten är historik. Vid 899 × 700 är den uppmätt till **418,984 ≤ 700**, och
  utfallet är **oförändrat av K**. Hero får vara högre än vyporten där; det är
  enspaltsläget som gör den hög, och sidan rullar.
- **Mätserien får därför inte utvidgas med en höjdrad under 900 px.** Vill någon
  ha ett höjdkrav strax under brytpunkten är det ett nytt beslut av mig, med ett
  eget paket som genomför det — aldrig en rad som C lägger till under mätningen.
- **Och inte utvidgas uppåt heller.** Kravet är rad 5:s **två** vyportar,
  1280 × 800 och 1280 × 900. Bandets giltighetsområde ("från 900 px") säger var ett
  framtida höjdkrav **får** bo, inte att C ska mäta fler vyportar. C mäter exakt de
  sex raderna; en sjunde rad är ett beslut av mig, inte ett initiativ under
  mätningen. Knapparnas underkant mäts däremot vid alla vyportar i rad 1
  och 2 (tolv sedan 2026-11-07, se M10b), inklusive 900 × 700 — det är en annan
  mätning än höjdkvoten.

#### Vad som får vika, i denna ordning, och bara om mätningen kräver det — steg 1 UPPHÄVT 2026-11-07, se M10b — steg 3:s meningar om profilbilden UPPHÄVDA 2026-11-07, se M10c — HELA AVSNITTET UPPHÄVT 2026-11-07, se M10d (knapparna har inget krav på första skärmen under 900 px, så ingenting ska vika för dem. Att texterna aldrig kortas gäller)

> Steg 1 är genomfört med selektorn `section.hero[id]` och gäller i alla bredder,
> inte bara under 600 px: `.hero` förlorade på specificitet mot `section[id]`.
> Dessutom har h1 en egen grad från 900 px. Steg 2 och 3 gäller.

Mina överslag säger att allt ryms vid 360 × 640 utan åtgärd (summerat ca 478 px
från dokumentets överkant till knapparnas underkant). **Mätningen avgör, inte
överslaget.** Behövs en åtgärd tas de i exakt denna ordning, och varje steg
redovisas:

1. `.hero { padding-block: var(--space-6); }` **under 600 px**, som undantag från
   `global.css`. Modulen får röra `padding-block` på sin egen sektionsrot —
   förbudet gäller `padding-inline`, som är sidomarginalen.
2. Ingressens grad från `--text-lg` till `--text-base` **under 600 px**. Det är
   hero:s egen grad, inte sidans typografi.
3. Stopp. **Texterna kortas aldrig** — de är Jelals exakta ord. ~~Profilbilden tas
   inte bort och krymps inte, och dess tak (360/420 px) och den icke-avtagande
   serien står fast.~~ **UPPHÄVT 2026-11-07, se M10c:** profilbilden är heros
   bakgrund och tar ingen plats i flödet. Den har egen ordning för vad som får vika
   (toningens alfa), och den står i M10c.

### A7 — Rollraden: `Systemutvecklare · Fullstack` — beslutat 2026-10-08 — platsen och teckensnittsmätningen UPPHÄVDA 2026-11-07, se M10 och M1

> Rollraden gäller ordagrant. Den flyttar från en konstant i `Hero.jsx` till
> `profile.role` i `src/data/profile.js` (P5), och `<title>`-kommentaren pekar dit.
> Mätningen nedan gällde Didact Gothic. Att `·` finns i alla tre nya familjerna
> grindas av grundmängden i M1d.

**Uppdraget gäller.** Jelal sa 2026-10-07, tidigare samma vecka, "ta bort
systemutvecklare längst upp och ersätt det med Fullstackutvecklare". Uppdraget är
**nyare och uttryckligt**, och skriver ut raden ordagrant. Hans senaste ord
vinner.

```js
const role = 'Systemutvecklare · Fullstack';
```

**Mittpunkten är `U+00B7`**, och den **finns** i
`src/styles/fonts/didact-gothic-latin-400.woff2` — uppmätt 2026-10-08 ur filens
`cmap`, inte ur `unicode-range` (`LARDOMAR.md` 2026-10-05: mät artefakten). Ingen
reservlösning behövs, och raden skrivs som uppdraget anger. Teckengrinden körs
ändå om i paket B när de exakta strängarna står i koden — jag har mätt de tecken
jag kunde läsa, inte de tecken byggaren faktiskt skriver.

**`<title>` i `index.html` följer med i samma ändring.** Den lyder i dag
`Jelal Qaiumi — Fullstackutvecklare`. Ny text:
`Jelal Qaiumi — Systemutvecklare · Fullstack`. Tankstrecket `—` behålls som
avgränsare mellan namn och roll; mittpunkten hör till rollen.

**Den daterade kommentaren i `Hero.jsx` skrivs om, inte uppdateras.** Den säger i
dag att Jelal *bytte bort* "Systemutvecklare" och att raden därför inte härleds ur
`BRIEF.md`. Efter detta beslut är påståendet falskt, och en kommentar som berättar
en historik blir falsk varje gång historiken får ett nytt kapitel
(`LARDOMAR.md` 2026-10-05, registrerat återfall). Den ersätts med **invarianten**:

```js
/* Rollraden är Jelals egna ord och bara hans att ändra. Samma sträng står i
 * <title> i index.html - ändras den här ändras den där, i samma redigering. */
```

Ingen årtalsstämpel, ingen uppräkning av vad han sagt tidigare, ingen hänvisning
till vad `BRIEF.md` säger. Hela omsvängningen är nedtecknad **här**, och det är
den enda plats som ska bära den.

**Detta är en medveten omsvängning och ska sägas vid LEVERANS**, inte smygas in.
`PLAN.md` har den som en egen punkt.

### A10 — Inga ikonlänkar i hero: inte GitHub, inte LinkedIn — beslutat 2026-10-08

Uppdraget listar dem som **valfria** ("platshållare för länkarna"), och valfritt
betyder att det går att avstå.

- **GitHub återinförs inte.** Jelal har sagt "Ta bort github", och `contact.js`
  har `url: null` med en daterad kommentar. Ett uppdrag som nämner GitHub i en
  valfri punkt upphäver inte ett uttryckligt borttagande.
- **LinkedIn läggs inte till i hero.** Länken finns redan i kontaktsektionen, dit
  heros andra knapp går. En andra väg till samma adress, 400 px ovanför den
  första, tillför inget — och "platshållare för länkarna" betyder en länk utan
  mål, vilket är det mönster arkitekturen förbjudit genomgående.

**Avstår vi, och Jelal ber om den, är det en avgränsad ändring:** en `<a>` i
`.actions`-raden med adressen ur `contact.links`, aldrig som literal. Det står som
öppen punkt i `PLAN.md`.

### A11 — Ingen animation införs — avtryck 2026-10-08 — UPPHÄVT 2026-11-07, se M12

> **Uppdraget 2026-11-07 beställer animation** (scroll-reveal, stagger, hover-lyft,
> in- och uttoning vid filtrering), och Jelals beslut 4 avgör det. Avtrycket nedan
> var riktigt för det dåvarande uppdraget och står kvar som historik. Tabellen
> "Tillåtet / Inte tillåtet" gäller inte.

Uppdraget säger: *"Lugn in-animation när sektionen scrollas in, **om sidan redan
använder animationer. Annars ingen.**"* Uppmätt: sidan har **två
färgövergångar på 150 ms** (`a { transition: color }` och formulärknappens
bakgrund) och **noll** in-animationer. Uppdragets egen regel ger därmed **ingen
animation**, och det är ett avtryck, inte ett val.

Avtrycket finns för att en framtida läsare annars ser "lugn in-animation" i
uppdraget och tror att den saknas av slarv.

Konkret, så att ingen behöver tolka:

| Tillåtet | Inte tillåtet |
|----------|---------------|
| `transition` på **hover** i A5:s två knappar, med `var(--transition)` — samma 150 ms som sidans övriga två | Varje `@keyframes`, varje `animation`, varje `transition` som utlöses av att ett element kommer in i vyn |
| | `IntersectionObserver` för utseende. Observern i projektet finns för `aria-current` och rör inget utseende |
| | `transition` eller `animation` i Skills-filerna. Paket E:s grep-räkning gäller **just de filerna** och ska inte läsas som ett förbud mot heros hover-övergångar |

### A12 — Uppdragstexten måste bo i repot, inte i en scratchpad — beslutat 2026-10-08

Fyra verifieringspunkter (B1, D1, F1 och engångsjämförelsen i A1) jämför koden
**tecken för tecken mot uppdragstexten**. Den texten ligger i dag bara i en
sessionsbunden scratchpad-fil, som försvinner. Då finns ingen norm kvar att mäta
mot nästa gång någon undrar om en sträng är rätt, och "exakt som Jelal skrev" blir
ett minne.

**Beslut: uppdragstexten läggs in i repot innan paket B startar**, ordagrant och
oformaterad. `BRIEF.md` är **inte min fil att ändra** — det är projektledarens
åtgärd, och den blockerar B, D och F. Varje jämförelse görs mot den filen, aldrig
mot en scratchpad-sökväg, och varje verifieringsrad i överlämningen anger vilken
fil den jämförde mot.

### A14 — Citattecknen i `UPPDRAG-2026-10-07.md` är avgränsare, inte innehåll — beslutat 2026-10-08

Fyra verifieringspunkter jämför **tecken för tecken** mot uppdragsfilen. Då måste
det stå skrivet vilka tecken i filen som är text och vilka som är filens egen
notation, annars avgörs varje jämförelse av vem som läser den.

**Beslut, som en mekanisk regel:** ett `U+0022` först i en citerad text som
avslutas av ett `U+0022`, där paret omsluter **hela** strängen, är en
**avgränsare och ingår inte i texten**. Ett citattecken **inuti** strängen är
innehåll och skrivs av.

**Svaret på båda frågorna är därmed nej:**

| Sträng | Renderas med citattecken? |
|--------|---------------------------|
| Heros ingress (uppdragets rad 22) | **Nej.** Byggarens rendering i `4defa9f` är rätt och ska inte ändras |
| "Om mig"-texten (uppdragets rad 43, paket F) | **Nej.** Samma regel, avgjord nu och inte i paket F |

Tre skäl, och det tredje är det bindande:

1. **Filen använder samma notation för knapptexterna** (`"Se mina projekt"
   (primär, fylld)`), där citattecknen omöjligt kan vara innehåll — en knapp som
   renderar sina egna citattecken är ingen knapp. Samma notation i samma fil kan
   inte betyda två saker.
2. **Namnet och rollraden står utan citattecken** på raderna intill ingressen. Hade
   citattecknen varit innehåll skulle ingressen vara den enda av tre
   hero-strängar som bär dem — en skillnad uppdraget inte nämner någonstans.
3. **Vore de innehåll är de dessutom fel tecken.** Svensk brödtext citeras med
   `”` (`U+201D`), inte med ASCII-dubbelfnutt. Ett stycke som öppnar med `"` är
   inte en designavsikt, det är en notation.

**"Inga stavfel. Texterna ska vara exakt som ovan." gäller fullt ut** — den gäller
bokstäverna, interpunktionen och mellanslagen inne i strängen, inte filens
avgränsare. Byggarens tecken-för-tecken-kontroll av ingressen (enbart `U+0020` som
blanksteg, inga dubbla mellanslag) är alltså godkänd som den står.

**Är ett fall otydligt är det inte byggarens att tolka.** En sträng där paret inte
omsluter hela texten, eller där det står ett ensamt citattecken, lämnas tillbaka
hit. Regeln ovan ska kunna tillämpas utan bedömning; kan den inte det är det ett
nytt beslut.

### Sektionsavgränsare — beslutat av Jelal 2026-10-03 — tokennamn, headerlinjen och den ljusa ytan UPPHÄVDA 2026-11-07, se M2, M5 och M6

> **Regeln gäller** (`section[id] + section[id]`, full bredd). Färgen är `--line`.
> Gränsen header → hero finns inte längre som linje, eftersom headern är en
> svävande pill med egen kant (M6). Tabellens rad med den ljusa ytan utgår (M2).
>
> **Linjen vid ytbyte UPPHÄVD 2026-11-08, se M23 punkt 5:** där en mörk och en
> ljus sektion möts är linjen genomskinlig (`border-top-color: transparent`, bredden
> står kvar). Den syns bara mellan två sektioner med samma yta. Med dagens ordning
> byter ytan vid varje gräns, så ingen linje syns. Antalet skrivs fortfarande inte i
> prosa.

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

`section[id] + section[id]` träffar varje sektion **som följer på en annan**, och
ger därmed **en linje mellan varje par av renderade sektioner** — hero undantaget,
eftersom den är först. Det är ordagrant vad Jelal bad om, utan ett hårdkodat
undantag för hero och utan att regeln behöver känna till något id.

**Antalet står inte skrivet här, och ska inte skrivas någonstans i prosa.** Det är
alltid `antalet renderade section[id]` minus ett, och varje plats som i stället
skriver ut en siffra blir falsk nästa gång en sektion tillkommer — vilket redan
hänt: sidan renderar i dag **fem** `section[id]`, alltså **fyra** linjer, medan
äldre texter säger tre. Tabellen nedan räknar upp gränserna, och den är den enda
uppräkningen.

| Gräns | Linje kommer från | Ritas i |
|-------|-------------------|---------|
| header → hero | headerns egen `border-bottom` | `--color-header-border` |
| hero → projekt | `section[id] + section[id]` | mörk yta, 1,38:1 |
| projekt → kompetenser | `section[id] + section[id]` | **ljus yta**, 1,413:1 |
| kompetenser → om mig | `section[id] + section[id]` | mörk yta, 1,38:1 |
| om mig → kontakt | `section[id] + section[id]` | mörk yta, 1,38:1 |
| kontakt → footer | footerns egen `border-top` | mörk yta |

**Regeln håller oförändrad när antalet sektioner ändras**, och behöver därför inte
skrivas om när en sektion tillkommer eller faller bort. Linjen hör till den
**andra** syskonsektionen och ärver därför den sektionens `--color-border`, så
varje linje ritas automatiskt i sin egen ytas ton.

Gränsen **kompetenser → om mig** är den som byter karaktär: där möter vitt mörkt,
och linjen tillhör den mörka sektionen. Den ligger alltså som en mörk hårfin linje
med vitt ovanför och mörkt under. Det spelar ingen roll — färgsteget mellan vitt
och `#0B0B0C` är omkring 17,9:1 och gör hela arbetet. Linjen varken stör eller
behövs där, och att den finns är billigare än ett id-specifikt undantag.

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

1. Räkna linjerna i renderad sida: **en färre än antalet sektioner** — med fem
   sektioner alltså **fyra** mellan dem, plus footerns. Formuleringen är avsiktligt
   relativ: talet ändrades när Om mig tillkom och ska inte behöva rättas nästa
   gång.
2. Bekräfta att det inte finns någon dubbellinje under headern.
3. Syskonselektorn förutsätter att sektionerna är direkta syskon utan främmande
   element emellan. Läggs något in mellan dem i `<main>` bryts kedjan **tyst** —
   linjen försvinner utan felmeddelande. Kontrollera punkt 1 på nytt varje gång
   `App.jsx` ändras.

### Headerns logotyp — beslutat efter paket 1 — UPPHÄVT 2026-11-07 av Jelal, se M20 (hela loggan i naven, ingen dold text; mätmetoden för naven och regeln om låst höjd gäller)

> **Gäller i stället:** M20. Naven visar hela loggan `jq-logo-*.png` (JQ-rutan och
> ordmärket), 34 px hög, som enda barn i länken till `#hero`, med
> `alt="Jelal Qaiumi"`. Monogrammet, den dolda texten, det tajta märket och
> ikongenereringen nedan är historik. Varje underavsnitt bär sin egen märkning.

`logo.png` är en **lockup**, inte ett rent monogram: JQ-märket, texten
"JelalQaiumi" i vitt och ett kort orange streck. I 44 × 44 px blir ordbilden en
suddig rad som varken går att läsa eller att markera.

**Beslut av Jelal 2026-10-02 (se `BRIEF.md`, "Loggan i headern"): alternativ (b).**
Headern visar JQ-**monogrammet** som beskuren ikon, och namnet "Jelal Qaiumi"
sätts bredvid som riktig HTML-text. Detta är Jelals eget beslut och omprövas inte.

Vinsten: ordbilden blir läsbar i stället för suddig, texten skalar med
användarens egen typsnittsstorlek, den går att markera och söka i, och
skärmläsaren får en riktig textnod i stället för att vara utlämnad åt en alt-text.

#### Headerns uppbyggnad — UPPHÄVT 2026-11-07, se M20 punkt 3

> **Gäller i stället:** `<a href="#hero">[img jq-logo-34/68/102, alt="Jelal Qaiumi", 159 × 34]</a>`,
> `.logo { height: 34px; width: auto; }`, `srcSet` med `1x/2x/3x` och inget
> `sizes`, träffytan 159 × 44 via `padding-block: 5px`. Markupen står tecken för
> tecken i M20. Tabellen nedan är historik.

Loggan är **en enda länk** till `#hero` som innehåller två saker: ikonen och
namnet.

```
<a href="#hero">  [ikon 48×36]  [span: Jelal Qaiumi]  </a>
```

| Egenskap | Beslut |
|----------|--------|
| Ikonens storlek | **48 × 36 px** — se "Ikonens optiska storlek" nedan. `height: 36px; width: auto;` i CSS, och `width`/`height` på `<img>` satta till filens egna mått så att ingen layout shift uppstår |
| Ikonens `sizes` | **`sizes="48px"`** tillsammans med `srcset`. Utan `sizes` antar webbläsaren `100vw` och hämtar alltid den största filen — det är inte ett påhitt utan en nödvändig följd av att `srcset` anges i bredder |
| Länkens träffyta | **48 × 44 px** via `padding-block: 4px`. Se "Följderna av att namnet försvinner". |
| ~~Avstånd ikon → text~~ | **UTGÅR** — ingen synlig text att hålla avstånd till |
| ~~Namnets grad, vikt, spärrning, färg, radbrytning~~ | **UTGÅR.** Namnet är visuellt dolt i alla bredder; visuella regler på klippt text har ingen verkan och är död CSS. Se "Namnet döljs i alla bredder". |

#### Headern är enfärgad — beslutat 2026-10-05 — UPPHÄVT 2026-11-07, se M6 och M7 (navlänkarna är fortfarande `--ink`, alltså vita)

> **Efterskrift 2026-10-07.** Hela detta avsnitt handlar om hur namnet skulle
> skiljas från navlänkarna. **Frågan är nu utan föremål** — namnet syns inte
> längre, se "Namnet döljs i alla bredder". Avsnittet står kvar som bakgrund till
> varför navlänkarna är vita, vilket fortfarande gäller.

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

#### Hover — mätningen säger tvärtom mot magkänslan — UPPHÄVT 2026-11-07, se M7 (hover på navlänkarna i pillen byter inte längre färg utan får en understrykning i `--ink`: orange text på den genomskinliga pillen över vitt innehåll gav 2,20:1)

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

#### Distinktionsregister — vilket verktyg bär vilken skillnad — tokennamnen UPPHÄVDA 2026-11-07, se M5 (registret gäller)

> **Tillägg 2026-11-07:** rubriknivå mot brödtext bärs nu av familj (Urbanist
> mot Manrope), storlek, vikt och spärrning. Aktiv navlänk mot övriga bärs av
> understrykning och `aria-current`. Det aktiva segmentet och den aktiva chipen bärs
> av fyllning eller kantfärg och `aria-pressed`. Pills-raderna är historik.

Namn-mot-nav-skillnaden flyttade från vikt till färg utan att någon skrev ner det,
och bröts därför av nästa färgändring utan förvarning. Den sortens följdbeslut är
osynliga för Jelal tills de spricker.

**Regel: när ett designverktyg tas bort eller ändras, skriv ner vilka
distinktioner som flyttade till vilket verktyg.** Då vet nästa ändring vad den
bär.

| Skillnad eller signal | Bärs i dag av | Bars tidigare av |
|-----------------------|---------------|------------------|
| ~~Namn mot navlänkar~~ | **utgår** — namnet syns inte längre | vikt (500) → färg → placering |
| **Logga-länkens tillgängliga namn** | ~~enbart den visuellt dolda texten~~ **enbart `alt="Jelal Qaiumi"` på loggans bild** ⚠ (M20, 2026-11-07). Fortfarande en bärare, men den degraderar till synlig text om bilden inte laddas, och P14c:s grind 6 mäter namnet | den visuellt dolda texten (2026-10-07 – 2026-11-07), synlig text före det |
| Navlänk viloläge mot hover | kulör **och** ljushet (vit → orange) | enbart kulör (grått → orange) |
| Rubriknivå mot brödtext | storlek + spärrning + luft | vikt + storlek |
| Grupprubrik mot pills | versaler + spärrning + grad + dämpad färg | samma, plus vikt |
| Ifylld mot ej ifylld pill | fylld orange mot genomskinlig med ram | samma |
| Formulärfel mot vanlig text | `--color-error` + text + `aria-invalid` | — |

Tabellen uppdateras varje gång ett verktyg tas bort eller tas i anspråk. **Står en
skillnad kvar med bara en bärare är den sårbar.**

> **Raden med ⚠ är projektets enda enbärarsignal, och den är ny.** När den synliga
> texten togs bort blev den visuellt dolda `<span>`-en det *enda* som ger
> logga-länken ett namn. Den ser ut som död markup för den som läser `Header.jsx`
> — och tas den bort blir sidans första fokuserbara element efter skip-länken en
> namnlös länk.
>
> **Därför verifieringspunkten nedan, och därför denna rad.** Registret spårar
> numera inte bara synliga skillnader utan **varje signal med en enda bärare**.

Registret har redan bevisat sitt värde: namn-mot-nav-raden var det som gjorde att
den här ändringens följd upptäcktes innan den byggdes, i stället för efteråt. Det
är tredje gången den distinktionen flyttar — vikt, färg, och nu bort helt.

#### Namnet döljs i alla bredder — beslutat av Jelal 2026-10-07 — UPPHÄVT 2026-11-07 av Jelal, se M20 (namnet syns i loggans ordmärke, och `alt` bär länkens namn. Ingen `aria-label` gäller fortfarande)

> **Gäller i stället:** den dolda `<span>`-en tas bort i P14c, och bilden får
> `alt="Jelal Qaiumi"`. Skälet mot `aria-label` nedan gäller: den hade gett namnet
> två gånger. Punktlistan "Kvar gäller" är historik.

Jelal: *"Bredvid loggan står det jelalqaiumi, den kan du plocka bort."* Han menar
den synliga texten.

~~Under `600px` döljs namnet med `.visually-hidden-until-sm`.~~ **Klassen byts mot
`.visually-hidden` rakt av.** Texten försvinner från skärmen i alla bredder och
stannar i tillgänglighetsträdet.

**Texten tas inte bort ur DOM.** Den bär logga-länkens tillgängliga namn, och utan
den blir sidans första fokuserbara element efter skip-länken en namnlös länk som
annonseras som enbart "länk".

Två alternativ avfärdades:

| Väg | Varför inte |
|-----|-------------|
| `aria-label` på länken, texten bort ur DOM | Mitt gamla skäl — att namnet skulle läsas två gånger — faller när texten är borta. Men `aria-label` **degraderar till ingenting** om något går fel, medan visuellt dold text degraderar till *synlig text* om CSS inte laddas. En länk utan namn är ett sämre felläge än en länk med ett namn som syns. |
| `alt` på ikonen i stället | Gör ikonen till innehåll i stället för dekoration och upphäver ett fungerande beslut, utan att lösa något den dolda texten inte redan löser. |

Vald väg **upphäver ingenting**. Den återanvänder en primitiv som redan finns,
redan är mätt och redan är sanktionerad.

Kvar gäller:

- Ikonen får **`alt=""` och `aria-hidden="true"`**, alltid, i alla bredder.
- Länkens tillgängliga namn kommer helt från `<span>`-texten — exakt en gång,
  aldrig två, aldrig noll.
- Ingen `aria-label` på länken.

#### Följderna av att namnet försvinner — UPPHÄVT 2026-11-07, se M20 (principen att träffytan hålls på 44 px gäller: `padding-block: 5px` runt 34 px)

**1. Träffytan krymper, och det ska kompenseras.** Länkens box var tidigare ikon
plus text; nu är den bara ikonen, 48 × 36 px. Det klarar WCAG 2.5.8:s 24 × 24 men
inte 2.5.5:s 44 × 44.

```css
/* Header.module.css, på logga-länken */
padding-block: 4px;   /* 36 + 8 = 44 px hög träffyta */
```

Bakgrunden är genomskinlig, så det syns inte — men träffytan blir 48 × 44.
**Det här är den sortens försämring som smyger in när något tas bort:** ingen
mätning går sönder, inget larmar, och knappen blir bara lite svårare att träffa
för den som har skakiga händer.

#### Navlänkarnas träffyta — 19 px, och det är en egen ändring — UPPHÄVT 2026-11-07, se M7 (`min-height: 40px` på `.navLink`, genomförs i P3)

Byggaren har mätt navlänkarna till **19 px höga**, och de har alltid varit det.

WCAG 2.5.8 kräver 24 × 24 px, med undantag för underdimensionerade mål som ligger
tillräckligt glest. Med ~70 px mellan länkarnas mittpunkter håller undantaget
sannolikt, så det är troligen inget formellt fel. **Men 19 px är en dålig träffyta
på en pekskärm**, och åtgärden är densamma som för logga-länken: `padding-block`
tills den renderade rektangeln är minst 44 px hög. Det ryms i en 64 px hög header.

**Jag bakar inte in den här.** Två skäl:

1. Jelal har sagt *"ändra inget annat på sidan"*, och navlänkarna ligger utanför
   kontaktsektionen.
2. Padding är osynlig — men **fokusringen växer med träffytan**, och det syns. Det
   är alltså inte en osynlig rättelse.

Den ska göras, men som en egen punkt med eget godkännande, och med ommätning av att
headern fortfarande är exakt 64,00 px. Att smyga in den i en annan ändring vore
precis det jag avvisade när utrymmet i headern frigjordes.

**2. `.logoName` tappar sina visuella regler.** `color`, `font-size`,
`letter-spacing`, `font-weight` och `white-space: nowrap` har ingen verkan på text
som är klippt till 1 px. **Ta bort dem.** Klassen ska bara vara den visuellt dolda
texten — en deklaration utan observerbar effekt är död CSS, samma regel som fällde
de två döda tokenen.

Skulle namnet någon gång visas igen återställs de då, med värden som passar det
läget.

**3. Utrymmet på bred skärm frigörs — och lämnas tomt.** Navets budget vid 360 px
räknade aldrig med namnet, det var redan dolt där, så **golvet påverkas inte**. På
bred skärm blir det mer luft mellan märket och navet.

**Inget flyttas.** Jelal bad om att ta bort en text, inte att göra om headern. Att
passa på att omfördela utrymmet vore en andra ändring han inte bett om, och den
sortens tillägg är hur en enkel begäran blir en omdesign.

#### Ikonens optiska storlek — rättat efter paket 2B — headerhöjden UPPHÄVD 2026-11-07, se M6 — HELT UPPHÄVT 2026-11-07, se M20 (ingen tajt ikon: hela loggan, 159 × 34 px, ryms i pillens 40 px)

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

#### Navigeringen på smal skärm — förebyggande regel, inte en felrättning — UPPHÄVT 2026-11-07, se M8

> **Gäller i stället:** under 900 px tar hamburgermenyn över (M8). Alternativ (d)
> nedan, som avfärdades 2026-10, är nu beställt av uppdraget. Regeln "ingenting i
> en låst höjd får radbryta" (`nowrap` på `.navLink`) gäller fortfarande för
> pillen. Budgettabellen och 360-mätningarna är historik.

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

> **En fjärde navlänk 2026-10-07: "Om mig".** Budgeten hade enligt byggarens
> mätning **66,84 px ledigt** med tre länkar. En fjärde kostar etiketten plus ett
> `gap` på 16 px — "Om mig" är sju tecken och landar vid 14 px grad på omkring
> 50 px, alltså **cirka 66 px totalt**.
>
> **Det är inom en pixel från taket, och det får inte avgöras av min uppskattning.**
> Byggaren mäter. Ryms den inte är åtgärden att sänka navets grad till
> `--text-xs` under 600 px — **inte** att korta Jelals etikett. Storleken är
> presentation, etiketten är innehåll.
>
> ~~Felläget är ändå tryggt: `flex-wrap: nowrap` gör ett överskridande till
> horisontell scroll, som golvkontrollen fångar.~~ **Det påståendet var fel. Se
> nedan.**
>
> **Navet är nu sidans trängsta element vid 360 px. En femte länk ryms inte**, och
> det är värt att veta innan någon föreslår en.

#### Det "trygga fälläget" fanns inte — en blind zon på 18 px — talen UPPHÄVDA 2026-11-07, se M8 och M18 (regeln "mät mot den egna behållaren" gäller)

Min uppskattning av den fjärde länken låg inom en pixel och hamnade på fel sida.
Det var väntat och ofarligt, eftersom jag skrev att byggaren skulle mäta.

**Det som inte var väntat är att ingen grind larmade.** Byggarens mätning:

> Alla fyra länkar låg inom headerns rektangel och golvkontrollen passerade — men
> navlistan låg utanför sin box och åt 11,2 av högermarginalens 18 px.

**Mellan "spiller över sin box" och "spiller över sidan" ligger hela sidmarginalen,
och där tiger varje kontroll vi har.** Vid 360 px är det 18 px. Jag trodde att
`nowrap` omvandlade ett överskridande till horisontell scroll; i själva verket
omvandlar det ett överskridande till **tyst intrång i marginalen**, och först när
marginalen är uppäten blir det scroll.

**Regel: ett överskridande mäts mot sin egen behållare, aldrig mot sidan.**

En sidnivåkontroll som `scrollWidth === clientWidth` kan per definition inte se
ett överskridande som är mindre än all padding mellan elementet och vyportens
kant. Den är ett sista skyddsnät, inte en kontroll.

**Ny kontroll för navet:** mät navlistans högerkant mot headerns **innerkant**,
alltså dess content-box. Den ska ligga innanför. `scrollWidth` räcker inte.

Det är tredje gången ett antaget "tryggt felläge" visat sig ha en blind zon, och
mönstret är detsamma varje gång: **jag resonerade om var felet skulle ta vägen i
stället för att mäta var det faktiskt tar vägen.** Slack — padding, marginal,
clamp-golv — absorberar fel, och absorberade fel larmar inte.

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

#### Verifiering av navigeringen — "ingen horisontell scroll" räcker INTE — bredderna UPPHÄVDA 2026-11-07, se M8 (metoden gäller och används i P3 och P4)

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

#### Fyra noteringar från paket 2B — tokennamnen UPPHÄVDA 2026-11-07, se M5 — logga-namnet som konsument av `.visually-hidden` UPPHÄVT 2026-11-07, se M20 (klassen och dess motivering gäller, och noteringen om React 19:s preload gäller nu loggan)

- ~~**`apple-touch-icon`** hör hemma i paket 7 tillsammans med `<noscript>`.~~
  **UPPHÄVT** — läggs in **nu**, tillsammans med de två `rel="icon"`-raderna. Se
  "Utdatafiler för ikonen" för skälet: placeringen i paket 7 gjorde två genererade
  filer orefererade i `dist/` i tre paket.
- ~~**`.visually-hidden-until-sm` i `global.css` godkänns.**~~ **BORTTAGEN
  2026-10-07 — noll konsumenter** sedan namnet döljs i alla bredder. Klassen var
  motiverad så länge något använde den; en global klass utan användning är dött
  fält, samma regel som fällde `--color-surface-raised` och `--color-accent-soft`.
  `.visually-hidden` står kvar och används av ~~logga-namnet och~~ skip-länken
  (**logga-namnet UPPHÄVT 2026-11-07, se M20:** loggan har `alt`, ingen dold text).
  Ursprunglig motivering, nu utan föremål: en CSS-modul kan varken
  `composes` inuti en media query eller nå en global klass, så mönstret hade annars
  behövt stå på ett ställe och hävningen på ett annat. Markeringen
  `EJ I ARKITEKTUR` kan tas bort.
- **React 19:s automatiska `<link rel="preload" as="image">`** för ikonen är
  väntat beteende från ramverket, inte något byggaren skrivit. Ingen åtgärd, och
  den ska inte tas bort.
- **Mätta filstorlekar** är införda i tabellen över utdatafiler.

Mönstret "visually hidden" läggs som klassen `.visually-hidden` i `global.css`.
Det är ett **medvetet undantag** från regeln att `global.css` bara innehåller
reset och baselement: det är en tillgänglighetsprimitiv som paket 7 med stor
sannolikhet behöver igen, och den ska inte kopieras in i varje modul.

#### Beskärningen — blockdetektering, inte en höjdtröskel — UPPHÄVT 2026-11-07, se M20 (ingen blockdetektering: uttaget är `LOGO_CROP`, och källgrindarna ~~S1–S5~~ S1–S6 (rättat 2026-11-08) bevisar läget)

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

#### Kvadratisk form skapas med genomskinlig utfyllnad, inte mot källan — UPPHÄVT 2026-11-07, se M20 punkt 2 (JQ-rutan är redan kvadratisk och tas rakt ur källan, opak och utan utfyllnad)

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

#### Förväntat utfall — byggaren jämför mot detta — UPPHÄVT 2026-11-07, se M20

> **Gäller i stället:** källgrindarna S1–S5 och utdatagrindarna L1–L8 och I1–I5 i
> M20 punkt 1. Utskriften nedan gäller en källa som tas bort i P14c och är historik.
> Regeln "avviker utdraget: stanna och lämna tillbaka, justera inte talen för hand"
> gäller.

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

#### Verifiering som fångar just detta fel — UPPHÄVT 2026-11-07, se M20 (motsvarigheten är S3 och L7: inget innehåll utanför uttaget, och genomskinlig botten)

I den färdiga 672 × 672-bilden upptar märket raderna y 115–557 (`115 + 442 = 557`).

**Inga pixlar med alfa > 0 får finnas nedanför rad 557.** Finns det pixlar där har
ordbilden kommit med. Kontrollen körs på den genererade bilden, inte på källan,
och är det enda steget som skiljer en korrekt ikon från en som ser rimlig ut i
alla andra kontroller.

#### Utdatafiler för ikonen — filerna, taken och favicon-raderna UPPHÄVDA 2026-11-07, se M20 (regeln "alla genererade filer refereras från `index.html`, noll orefererade filer i `dist/`" och "ingen `.ico`" gäller)

> **Gäller i stället:** `jq-icon-{32,96,192}.png`, opaka, med taken och
> favicon-raderna i M20 punkt 1 och 2. Tabellen, html-raderna och "Endast PNG …
> `96w`/`192w`" nedan är historik.

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
(**RÄTTAT 2026-11-08, se M21 punkt 4, och 2026-11-18, se M24 punkt 6:** ett
undantag, `robots.txt`, och fyra referenskällor.)

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

#### Ikonen genereras med genomskinlig botten — tokennamnen UPPHÄVDA 2026-11-07, se M5 — HELT UPPHÄVT 2026-11-07, se M20 (ikonen är opak. Loggans ordmärke får genomskinlig botten med luminansformeln i M20 punkt 1. Principen att återställa färgen efter `resize()` gäller där)

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

#### Känd skuld från paket 1 — historik, betald i paket 2B och 3 — UPPHÄVT 2026-11-07, se M20 (lockupen är tillbaka i naven, nu som den nya loggan)

Paket 1:s header är byggd med **hela lockupen** `logo.png` i 44 × 44 px. Det var
rätt enligt arkitekturen som den såg ut då, och det är **inte ett nytt fel** —
granskaren ska inte rapportera det som ett sådant.

Skulden betalas i **paket 2B**, i samma svep som ikonen genereras: `Header.jsx` och
`Header.module.css` byggs om till ikon + textnod enligt tabellen ovan. Byggaren
vet alltså att den ska tillbaka till headern. Är ikonen av något skäl inte klar i
paket 2B flyttas ombyggnaden till paket 3, men inte längre än så — lockupen får
inte stå kvar till Leverans 1, eftersom det är just headern Jelal kommer att titta
på först.

### Rättelser efter granskningen av paket 1 — tokennamn, `.surface-light`, Didact och kortets rutnät UPPHÄVDA 2026-11-07, se M1, M2, M4 och M5 (rättelserna i övrigt gäller)

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
| "asterisken är orange" / orange felmeddelanden | `--color-error` `#F85149` (Jelal 2026-10-07) | "Asterisken är röd" |
| `--color-accent-soft` | borttaget, ingen konsument | tokentabellen |
| `257 ifyllda` / `50 dämpade` som fast tal | levande data — läs filen | "Förväntat antal: 307" |
| `.surface-light` bakgrund `#FFFFFF` | `#F4F4F6` (Jelal 2026-10-05) | "Bakgrunden blir `#F4F4F6`" |
| `#D9D9DE` / `#55555C` / `#76767E` i `.surface-light` | `#CFCFD4` / `#4F4F56` / `#6E6E76` | samma avsnitt |
| "avsteget är 2,83:1" | **2,58:1** mot den gällande bakgrunden | "De ifyllda pillarna" |
| `.surface-light` utan `background-color`/`color` | klassen måste måla, inte bara binda om | "Mekanismen" |
| `--weight-medium` / `--weight-bold` / `--weight-regular` | tokenen är borttagna, vikten är alltid 400 | "Typsnittet" |
| `font-weight: 500` / `600` / `700` | `font-weight: inherit`, aldrig syntetisk fetning | "Typsnittet" |
| `system-ui` som första typsnitt | `'Didact Gothic'` först, systemstacken som reserv | tokentabellen |
| navlänkar i `--color-text-muted` | `--color-text` (Jelal 2026-10-05) | "Headern är enfärgad" |
| "namnet skiljs från navlänkarna med färg" | ingen färgskillnad; placering + spärrning | "Headern är enfärgad" |
| `z-index: 10` på headern | Avgjort — blir token `--z-header: 10` | Rättelse 7 ovan + tokentabellen |
| `padding-inline` globalt | Avgjort — **ligger kvar globalt** | "Var sidmarginalen bor" |
| Loggans visningsstorlek | Avgjort — ~~**48 × 36 px**, tajt märke~~ **UPPHÄVT 2026-11-07:** hela loggan, **159 × 34 px** | ~~"Ikonens optiska storlek"~~ M20 |
| `<title>`-texten | Avgjort — `Jelal Qaiumi — Systemutvecklare` | "Bekräftat från paket 1" |

De fyra återstående markeringarna rör värden jag ännu inte tagit ställning till.
De ska stå kvar tills de finns i detta dokument.

### Validering av datafilerna — beslutat inför paket 4

Problemet är verkligt: granskaren hittade att en dubblett av ett sektions-`id` och
en post utan obligatoriskt fält båda renderas **tyst**, och det var med fyra
poster. Datafilerna är handskrivna och Jelal redigerar dem själv — antalet poster
är hans att ändra och skrivs därför inte här (~~"93 handskrivna poster"~~,
**UPPHÄVT av A1 och A17**). Att lita på att någon tittar räcker inte.

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
| `skills.js` | paket 4, omgjord i paket D | Se **"A1 — Grinden för `skills.js` är strukturell"** nedan. Ingen korsreferens, inget antal, inget `filled` — struktur, unikhet, slug-format och okända fält |
| `projects.js` | **paket 5** | `id` unika, `id`/`title`/`description` finns, `tech` är en array |
| `contact.js` | **paket 6** | `email` finns, varje `links`-post har `label`, och `form.endpoint`, `form.accessKey`, `form.hcaptchaSiteKey` är icke-tomma strängar |
| `about.js` | vid omordningen, utökad i paket F | `paragraphs` är en icke-tom array av icke-tomma strängar, plus de fyra `link`-grindarna i **A4** |

Felmeddelanden skrivs på svenska, namnger filen och det värde som är fel, och
skriptet avslutas med nollskild kod. Inga nya beroenden — ren Node.

#### Exakta felmeddelanden — skills-delen är UPPHÄVD av A1, se nedan

**Vad som gäller för `skills.js`:** meddelandetabellen i **"A1 — Grinden för
`skills.js` är strukturell"**, och ingenting annat. Elva grindar, exakt de som
står där. **Genomfört i paket D.** Meddelandena för `sections.js`, `projects.js`,
`contact.js` och `about.js` i detta avsnitt **gäller oförändrat**.

Formatet gäller också oförändrat: `<fil>: <vad som är fel> (<det felaktiga
värdet>)`. Alla fel samlas och skrivs ut tillsammans — skriptet stannar **inte**
på det första, eftersom den som redigerat en lång datafil vill se alla sina
misstag i en körning.

> **UPPHÄVT av A1 2026-10-08 — de fem raderna nedan är inte längre skriptets
> meddelanden.** De står kvar därför att fyra av dem namnger grindar som en gång
> var beslutade och som `PLAN.md` uttryckligen kräver att ingen skriver tillbaka
> som döda strängar. Gällande lydelser står i A1:s tabell.
>
> ```
> skills.js: namn ur skills-full.txt saknas och är inte sammanslaget ("Mocking")
> skills.js: namn ur skills.txt saknas och är inte sammanslaget ("Flexbox")
> skills.js: sammanslagning pekar på ett namn som inte finns ("CSS3" -> "CSS")
> skills.js: namnet finns varken i skills.txt eller skills-full.txt ("Reakt")
> skills.js: filled måste vara true eller false ("React", fick "false")
> ```
>
> De fem övriga raderna — `skill-namnet förekommer mer än en gång`,
> `skill saknar name`, `grupp-id förekommer mer än en gång`, `grupp saknar title`
> och `grupp saknar skills eller är tom` — lever vidare i A1:s tabell, men med
> **nya exempelvärden** (de gamla exemplen `react-byggstenar` och
> `webbutveckling-och-fullstack` är upphävda grupp-id).

```
sections.js: id förekommer mer än en gång ("skills")
sections.js: label saknas (id "contact")

projects.js: id förekommer mer än en gång ("portfolio")
projects.js: projekt saknar obligatoriskt fält (id "portfolio", fält "description")
projects.js: tech måste vara en array (id "portfolio")

contact.js: email saknas
contact.js: länk saknar label (post 2)
contact.js: form.accessKey saknas eller är tom
contact.js: form.endpoint saknas eller är tom
contact.js: form.hcaptchaSiteKey saknas eller är tom

about.js: paragraphs saknas eller är inte en array
about.js: paragraphs är tom
about.js: stycke 2 är tomt

Valideringen hittade 3 fel. Bygget avbryts.
```

> **UPPHÄVT av A1 och A2 2026-10-08.** Båda punkterna nedan beskrev grindar som
> inte finns: `filled` är borta ur datan (A2) och **inget antal grindas** (A1).
> **Genomfört i paket D.**
>
> ~~Två saker som är lätta att få fel och därför ska stå uttryckligen:~~
>
> - ~~**`filled måste vara true eller false`** gäller också strängen `"false"`. Det
>   är det troligaste misstaget när en icke-utvecklare redigerar, och det är ett fel
>   som annars renderar som `true` eftersom en icke-tom sträng är sanningsvärd. Just
>   därför visar meddelandet det mottagna värdet inom citattecken.~~
> - ~~**Antalskontrollen 93** gäller summan över alla grupper, inte per grupp.~~
>
> **Det som överlevde av den första punkten** är den allmänna regeln, och den står
> kvar i A1: ett fällt värde visas **inom citattecken** i meddelandet, så att
> `"false"` går att skilja från `false`. Regeln hängde aldrig på fältet `filled`.

Vid godkänd körning skrivs en rad, så att det syns att kontrollen faktiskt körts
och inte bara teg. **Raden är en UPPLYSNING och ett FORMAT — gällande lydelse och
de tre reglerna står i "A19 — OK-raden är ett FORMAT", och talen är uppmätta.**

> ~~`Validering OK: 4 sektioner, 18 grupper, 307 skills (265 ifyllda, 42 dämpade).`~~
>
> **UPPHÄVT av A1, A2 och A19 2026-10-08.** Raden grindade inget, men den stod
> utskriven som en sträng, den innehöll två antal som inte längre finns
> (`18 grupper`, `307 skills`) och en uppdelning i ifyllda och dämpade som
> upphävdes med `filled`. **Genomfört i paket D.**

Den raden är inte kosmetisk. En validering som är tyst när allt är bra går inte
att skilja från en som inte kördes alls.

#### A1 — Grinden för `skills.js` är strukturell, beslutat 2026-10-08

Detta är det mest blockerande beslutet i paket A. **Uppmätt 2026-10-08: 17 av
uppdragets 53 namn fäller bygget**, och inget av dem är påhittat eller felstavat —
varje enda är en rimlig omskrivning eller sammanslagning av namn som finns i
källistorna (`Swagger/OpenAPI` mot `Swagger`, `TDD` mot
`Testdriven utveckling (TDD)`, `Git och GitHub` mot `Git` + `GitHub`, och så
vidare). Grinden fälls alltså av en **legitim** ändring, och `LARDOMAR.md`
2026-10-05 säger att en sådan grind ska göras om, inte kringgås.

**Vad korsreferensen skyddade mot:** att något Jelal hade sagt att han kan tyst
föll bort när **307 rader plockades ur två källistor för hand**. Mekanismen var
rätt för det problemet: det fanns två listor, och grinden jämförde dem.

**Vad problemet är nu:** 53 namn som Jelal har **kurerat själv i ett uttryckligt
uppdrag**. Det finns ingen andra, **oberoende** lista att jämföra mot:
`UPPDRAG-2026-10-07.md` **är** normen och inte en andra mätpunkt, och hans
källistor är inte längre vad han vill visa. Ett bortfall kan därför inte upptäckas
genom löpande jämförelse mellan två listor. Det kan bara upptäckas **en gång**,
när listan skrivs in.

**Beslut, i tre delar:**

**1. Korsreferensen utgår helt.** `SKILL_SOURCES`, `readSkillSource()` och hela
`MERGED`-tabellen tas bort ur `scripts/validate-data.mjs`, tillsammans med de
fyra grindar som läser dem. `skills.txt` och `skills-full.txt` ligger kvar i
repot som historik och **läses inte av något skript** (se "`skills.txt` och
`skills-full.txt` — historik, inte källa").

**2. Engångsjämförelsen flyttas till paket D och är inte en grind.** Att de nio
grupperna och de 53 punkterna står tecken för tecken som i uppdraget verifieras
**maskinellt en gång**, i paket D, mot **`UPPDRAG-2026-10-07.md` i projektroten**
(incheckad `5c62ac4`) — aldrig mot en scratchpad-sökväg, och
verifieringsraden anger filnamnet. Det är skillnaden som gör hela beslutet: en
engångsverifiering får vara exakt mot ett innehåll, en permanent grind får aldrig
vara det, eftersom innehållet är Jelals att ändra i morgon.

**A18 — "scratchpad-filen" i punkt 2 är upphävd — beslutat 2026-10-08.** Punkten
skrevs innan **A12** var uppfyllt, när texten bara fanns utanför repot. I dag
ligger den i repot (`cp` + sha256-verifierad, `5c62ac4`), och `PLAN.md` kräver
uttryckligen att varje sådan jämförelse görs mot repots fil. **Byggaren i paket D
jämförde mot repots fil och gjorde rätt**; min formulering var överspelad, och den
är rättad här på sin ursprungliga plats. En scratchpad-sökväg får aldrig vara norm
för en verifiering: den är sessionslokal och går inte att pröva om av granskaren.

**3. Det som står kvar är strukturgrindar — invarianter som ingen legitim
redigering bryter.** Exakt dessa, och inga andra:

| Grind | Meddelande | Vilken LEGITIM ändring får fälla den |
|-------|-----------|--------------------------------------|
| `skillGroups` är en array | `skills.js: skillGroups saknas eller är inte en array` | Ingen |
| Grupp har `id`, icke-tom text | `skills.js: grupp saknar obligatoriskt fält (post N, fält "id")` | Ingen |
| Grupp-`id` matchar `/^[a-z0-9-]+$/` | `skills.js: grupp-id får bara innehålla a-z, 0-9 och bindestreck (id "AI i utveckling")` | Ingen — id:t blir ett `h3`-ankare, och blanksteg eller versaler ger ett ankare som inte går att länka till. Den åtgärd meddelandet föreskriver får grinden att tiga |
| Grupp-`id` unikt | `skills.js: grupp-id förekommer mer än en gång ("backend")` | Ingen — id:t är React-nyckel |
| Grupp har `title`, icke-tom text | `skills.js: grupp saknar title (id "backend")` | Ingen |
| Grupp har minst en skill | `skills.js: grupp saknar skills eller är tom (id "backend")` | Ingen — en rubrik utan innehåll |
| Skill har `name`, icke-tom text | `skills.js: skill saknar name (grupp "backend", post 4)` | Ingen |
| Skill-`name` unikt i HELA filen | `skills.js: skill-namnet förekommer mer än en gång ("React")` | Ingen — namnet är React-nyckel |
| **Okänt fält på en skill** | `skills.js: okänt fält på skill ("React", fält "filled") - tillåtet fält är endast name` | Ingen. Detta är grinden som fångar en kvarglömd rad ur den gamla listan, och den enda som ersätter något av korsreferensens skydd |
| **Okänt fält på en grupp** | `skills.js: okänt fält på grupp (id "backend", fält "icon") - tillåtna fält är id, title, skills` | Ingen. Fångar också en återinförd ikon, se A3 |
| Teckengrinden (oförändrad) | `skills.js: tecken utanför teckensnittets delmängd (...)` | Ingen |

##### A21 — En grupp utan `id`: en rad, postens plats, och resten av gruppen hoppas över — beslutat 2026-10-08

Meddelandetabellen ovan namnger varje grupp med sitt `id`. En grupp **utan** `id`
kan därför inte bära något av de id-nycklade meddelandena, och tabellen sa inget
om det fallet. Paket D följde mönstret i `checkSections`. **Jag bekräftar
byggarens lösning, och den är nu beslutad här:**

1. Grinden fäller med **postens plats**, inte med ett påhittat id:
   `skills.js: grupp saknar obligatoriskt fält (post N, fält "id")`, där `N` är
   gruppens 1-baserade plats i `skillGroups`.
2. **Resten av den gruppen hoppas över** (`continue`). Följden är avsiktlig: en
   grupp utan `id` ger **en** rad i stället för flera, och varje id-nycklat
   meddelande i hela skriptet bär därmed alltid ett **verkligt** id. Ett meddelande
   som säger `(id "undefined")` är värre än inget meddelande.
3. **Gruppens kompetenser räknas inte in i upplysningen.** En fälld eller
   bortfiltrerad post får aldrig räknas (`LARDOMAR.md` 2026-10-05), och
   komponenten hoppar över posten ändå. Samma gäller en grupp som fälls på `title`
   eller på tom `skills`: upplysningen räknar bara grupper som passerat **samtliga**
   gruppgrindar, och bara kompetenserna i dem.
4. **Namnen i den överhoppade gruppen deltar inte i unikhetskontrollen i den
   körningen.** Det är en följd jag tar ställning till och accepterar: filen är
   ogiltig, körningen slutar med kod 1, och den åtgärd meddelandet föreskriver
   (skriv ett `id`) tar in gruppen i varje kontroll vid nästa körning. En grind ska
   inte stapla följdfel på en post som redan är fälld — följdfel lär läsaren att
   läsa bort larm.
5. **Skippningen gäller bara `id`.** Saknar gruppen `title` men har `id` fälls den
   raden och kontrollen går **vidare in** i gruppens skills, eftersom de
   meddelandena kan bära id:t. Jelal ska se alla fel han kan rätta i ett svep.

**Antal grindas inte, varken totalt eller per grupp.** Antalet grupper och
antalet skills skrivs som **UPPLYSNING** i OK-raden, och upplysningen räknar bara
poster som faktiskt renderas (`LARDOMAR.md` 2026-10-05: en fälld eller
bortfiltrerad post får aldrig räknas med).

##### A19 — OK-raden är ett FORMAT, inte en sträng som matchas tecken för tecken — beslutat 2026-10-08

Paket D lämnade tillbaka att min tidigare utskrivna OK-rad inte gick att uppfylla
tecken för tecken. **Byggaren har rätt, och dess faktiska rad är godkänd som den
står.** Raden nedan är **utfallet av körningen i paket D**, inte en sträng att
matcha mot: talen är uppmätta värden och ändras med datan.

```
Validering OK: 225 tecken i teckensnittet (387 deklarerade), 4 sektioner, 9 grupper, 53 kompetenser, 0 projekt, 3 stycken i Om mig, 2 kontaktlänkar.
```

Tre regler, som gör frågan avgjord en gång för alla:

1. **Ordningen är `summary.push`-anropens ordning, och den flyttas inte.**
   `FONT_COVERAGE` beräknas före `ACTIVE`-loopen — beslutat i paket 4 och orört —
   därför står teckentalet **först**. Min gamla rad hade teckentalet sist och var
   därmed en beskrivning av en kodordning som inte finns. **En omflyttning av
   `summary.push` rör varje datafils utskrift och ligger utanför D:** den vore ett
   eget beslut av mig, inte ett genomförande, och behövs inte.
2. **A1 äger bara skills-delen av raden:** `9 grupper, 53 kompetenser`. Den är
   bindande som **förväntat värde**, inte som grind, och byggaren i D har den
   exakt. `4 sektioner`, `0 projekt` och `2 kontaktlänkar` ägs av sina egna
   avsnitt; `4 sektioner` saknades i min gamla rad och det var mitt fel, inte
   byggarens.
3. **Om mig-delen ägs av paket F (A4)**, inte av D. Antalet stycken är
   **databeroende** och får aldrig stå som en literal här — `3 stycken` i dag är
   lika rätt som `1 stycke` efter F, beroende på vad datan innehåller. Tillägget
   `(N länkfraser, M pekar på ett projekt som finns)` är en **upplysning som införs
   i paket F om den införs**, eftersom länkfrasen är A4:s mekanism. D ska inte
   skriva den.

Hela raden är **en UPPLYSNING**, aldrig en grind: inget tal i den fäller något.
Avviker ett tal från det förväntade **rapporteras** det — det justeras inte bort,
och raden skrivs inte om för att talet ska stämma.

**De gamla felmeddelandena utgår** och får inte stå kvar som döda strängar:
`namn ur <fil> saknas och är inte sammanslaget`, `sammanslagning pekar på ett
namn som inte finns`, `namnet är sammanslaget och får inte stå som egen post`,
`namnet finns varken i skills.txt eller skills-full.txt`, `filled måste vara true
eller false`.

#### A20 — `OPEN-KEY`-grinden: vilket paket som bär den — beslutat 2026-10-08

`LARDOMAR.md` 2026-10-05, märkt **ÅTERKOMMANDE (3+)**, kräver en grind i
`scripts/validate-data.mjs` på `OPEN-KEY`-nyckelord och på fraserna
"ARKITEKTUR.md säger/anger/nämner" och "tar inte ställning" **inuti en
markering**. **Paket D uppfann ingen grind och lämnade tillbaka. Det var rätt** —
A1 säger "exakt dessa elva, och inga andra", och en byggare som uppfinner en
tolfte grind har tagit ett arkitektbeslut i kod.

**Läget, uppmätt av mig 2026-10-08:**

| Vad | Tal |
|-----|-----|
| `OPEN-KEY`-rader i hela projektet | **0** |
| `EJ I ARKITEKTUR`-markeringar i `scripts/validate-data.mjs` | 8 (rad 61, 68, 233, 275, 312, 356, 378, 564 — samtliga om `sections.js`, `projects.js`, `about.js`, `contact.js` och `ACTIVE`, **ingen** om skills, alltså orörda av D) |
| `EJ I ARKITEKTUR`-markeringar i `src/` | 19 vid min mätning, varav **exakt fyra i hero-filerna** (`Hero.jsx` två, `Hero.module.css` två) som rundan vid LEVERANS ska avgöra. **Talet är rörligt:** paket E pågår och skriver om Skills-filerna, så paketet räknar om det själv i stället för att lita på denna rad |
| De förbjudna fraserna **inuti** en markering | **0** |
| De förbjudna fraserna **utanför** en markering | 7 — `src/data/about.js:31`, `src/components/Projects.jsx:9`, `src/components/ProjectCard.module.css:39` och fyra rader i `scripts/optimize-images.mjs` |

De åtta markeringarna i `validate-data.mjs` formulerar **frågan** ("vad
meddelandet ska lyda när exporten är borta") och innehåller ingen av de förbjudna
fraserna — grepen visar det. De sju träffarna ovan ligger i vanliga
kommentarsblock, inte i markeringar, och grindas därför inte av denna grind.

**Beslut: grinden bärs varken av D eller av J, utan av ett eget paket EFTER
LEVERANS och efter G — samma paket som genomför beslutsrundan för heros fyra
markeringar.** Fyra skäl:

1. **Grindens enda del med tänder kräver en rad i varje befintlig markering.** Med
   noll nyckelord i projektet kontrollerar nyckelordsgrinden ingenting; den måste
   alltså paras med att varje öppen markering får sin `OPEN-KEY`-rad. Det rör
   hero-filerna, och **A13 förbjuder K och varje paket före LEVERANS att röra
   dem**. Grinden kan därför inte komma före rundan utan att tvinga fram ett
   registrerat felläge.
2. **En grind som inte kan fälla är sämre än ingen grind** (`LARDOMAR.md`
   2026-10-05). Införd i dag, utan nyckelord, hade den tigit i varje körning och
   sett ut som ett skydd.
3. **En ny grind i `build`-kedjan ger varje annat pakets verifiering ett rött
   bygge som inte hör till det.** Det är exakt skälet till att J körs sist av
   byggpaketen, och J:s innehåll är redan bindande rad för rad — det utvidgas inte
   här.
4. **Inte paket D.** A1:s elva grindar är grindar på **innehållet i `skills.js`**.
   Denna grind läser ingen datafil alls: den läser `src/`, `scripts/` och
   `ARKITEKTUR.md`. Den räknas alltså inte in bland de elva och motsäger inte A1 —
   men den hör inte heller hemma i ett datapaket.

**Grindens exakta innehåll, så att paketet inte behöver gissa.** Tre delgrindar i
`scripts/validate-data.mjs`, efter datakontrollerna och före OK-raden. Varje rad
märks `GRIND:` och varje meddelande följer formatet `<fil>:<rad>: <vad som är
fel>`:

| # | Villkor som fäller | Meddelande |
|---|--------------------|------------|
| G1 | Ett kommentarsblock innehåller `EJ I ARKITEKTUR` men saknar raden `OPEN-KEY: <nyckelord>` | `<fil>:<rad>: EJ I ARKITEKTUR-markering saknar rad OPEN-KEY: <nyckelord>` |
| G2 | Ett nyckelord ur en `OPEN-KEY`-rad förekommer i `ARKITEKTUR.md` | `<fil>:<rad>: OPEN-KEY "<nyckelord>" finns i ARKITEKTUR.md - frågan är besvarad, ta bort markeringen i samma ändring som beslutet genomförs` |
| G3 | Inuti ett block med `EJ I ARKITEKTUR` står "ARKITEKTUR.md säger", "ARKITEKTUR.md anger", "ARKITEKTUR.md nämner" eller "tar inte ställning" | `<fil>:<rad>: markeringen beskriver vad ARKITEKTUR.md säger - skriv bara frågan` |

- **Sökmängd:** `src/` och `scripts/`, rekursivt. Aldrig `node_modules/` eller
  `dist/`. `ARKITEKTUR.md` läses enbart av G2, och enbart som söktext.
- **G2 jämför skiftesokänsligt och på hela ord.** Nyckelordet ska vara minst fyra
  tecken och skrivas så att det inte kan dyka upp i löpande text av annan
  anledning — formen är `<filnamn utan ändelse>-<frågan i två ord>`, med bindestreck
  och utan å, ä, ö. Ett nyckelord som `grid` hade fällt på varje omnämnande av
  grid och är därmed fel valt, inte strängt.
- **Jag skriver medvetet inget exempel på ett nyckelord i detta dokument.** Ett
  nyckelord som står här fäller G2 i samma stund markeringen får sin rad — det är
  grindens hela mekanik, och den gäller också mig.
- **Vilken LEGITIM ändring får fälla respektive delgrind:** G1 — ingen; den åtgärd
  meddelandet föreskriver (lägg till raden) får den att tiga. G2 — ingen; att
  nyckelordet dyker upp i `ARKITEKTUR.md` **är** felet, och den föreskrivna
  åtgärden (ta bort markeringen) får den att tiga. G3 — ingen.
- **Tre indata ska redovisas för varje delgrind:** korrekt kod (tyst), en
  framtvingad överträdelse (larm, med fil och rad utskriven), och den åtgärd
  meddelandet föreskriver (tyst igen).

**Vad paketet gör i samma svep:** sätter `OPEN-KEY`-raden på varje markering som
fortfarande är öppen, och **tar bort** de markeringar vars fråga rundan vid
LEVERANS besvarar — i samma ändring som beslutet genomförs. Inga värden ändras.

**Vad som INTE ingår:** de sju fraserna utanför markeringar. De är ett eget fynd
för granskaren (`about.js:31` skrivs dessutom om i paket F), och grinden fäller
inte på dem eftersom den bara läser inuti markeringar. Att vidga G3 till all
kommentarstext är ett nytt beslut som ingen har fattat.

**Bokstaven på paketet ägs av `PLAN.md`,** inte av mig: A–H, J och K är tagna och
`I` undviks, så nästa fria är **L**. Jag pekar ut behovet, innehållet och platsen
i ordningen — projektledaren skriver in paketet.

#### A9 — Kommentarer som räknar upp tokens: en grind som fångar borttagningen, inte uppräkningen — mönstret och `.surface-light` UPPHÄVDA 2026-11-07, se M5g och M2 (grindens syfte gäller)

> Grinden gäller nu **varje** custom property och inte bara `--color-*`, och
> `.surface-light` finns inte. Regeln står i M5g. Resonemanget nedan om att
> kommentarer räknas som förekomster gäller oförändrat.

Beslutat 2026-10-08. Bakgrunden är `LARDOMAR.md`-posten från samma dag, märkt
**ÅTERKOMMANDE (3+)** med uppmaningen att göra om felet till ett automatiskt test:
`Projects.jsx:51` och `Skills.jsx:68` räknar båda upp fem tokens som ombundna i
`.surface-light`, och ett av de fem (`--color-text-dim`) binds inte om längre.

**Del 1 — de två kommentarerna rättas, oberoende av grinden.**

| Fil | Åtgärd |
|-----|--------|
| `Projects.jsx:51` | Uppräkningen av de fem tokennamnen stryks. Ersätts av konsekvensen: *"Klassen binder om flera ärvda färgtokens för allt inuti sektionen — uppräkningen står i `.surface-light` i `tokens.css` och ska bara stå där."* |
| `Skills.jsx:68` | Hela stycket om `surface-light` utgår. Det är historik om en yta som flyttades, i en fil som skrivs om från grunden i paket E, och det uppmanar dessutom nästa läsare att fatta ett beslut på fel underlag |

**Del 2 — grinden. Jag inför EN och avfärdar den som efterfrågades.**

**Avfärdat: en grind som fäller bygget när en kommentar räknar upp tokens ur ett
annat block.** Jag har prövat tre formuleringar och ingen håller:

| Formulering | Varför den inte håller |
|-------------|------------------------|
| "Högst ett `--color-*`-namn per kommentar utanför `tokens.css`" | Fäller en helt legitim kommentar som motiverar ett val genom att ställa två tokens mot varandra — `ContactForm.module.css:90` gör precis det, korrekt. En grind som fäller korrekt kod lär sin läsare att larm betyder "något är konstigt med grinden" |
| "Högst N namn", N = 3 eller 4 | Ett tröskeltal utan härledning. Det är samma konstruktion som det hårdkodade `93`, och det fälls eller släpper igenom beroende på hur någon råkar formulera sig |
| "Namn i samma kommentar som `surface-light` måste vara deklarerade i det blocket" | Fäller satsen *"X binds medvetet INTE om här"*, som är en sann och nyttig kommentar. Enda utvägen vore en undantagsmarkering i kommentaren, och lärdomen 2026-10-05 säger att ett undantag inte är en lösning |

**Grundskälet:** uppräkningen är ett *stilproblem* i en text, och det går inte att
skilja en felaktig uppräkning från en riktig jämförelse utan att läsa meningen.
Det är en granskaruppgift, inte en maskinuppgift.

**Infört i stället: en grind på kvarglömda tokenreferenser.**
`scripts/validate-tokens.mjs`, kopplad in i `build` efter `validate-data.mjs` —
scriptet och raden i `package.json` läggs till i samma paket, enligt regeln från
2026-10-02:

```json
"validate:tokens": "node scripts/validate-tokens.mjs",
"build": "node scripts/validate-data.mjs && node scripts/validate-tokens.mjs && vite build"
```

> Varje `--color-*`-namn som förekommer i `src/**/*.{css,jsx,js}` eller
> `scripts/*.mjs` måste vara **deklarerat i `tokens.css`** (i `:root` eller i
> `.surface-light`). `tokens.css` själv undantas från sökningen, eftersom det är
> där uppräkningen får bo — det är lärdomens egen regel.
>
> `validate-tokens.mjs: tokenet finns inte i tokens.css ("--color-text-dim" i src/components/ContactForm.module.css)`

Varför den är rätt grind:

- **Den fångar det som faktiskt gick fel i alla tre återfallen: en borttagning som
  lämnade en referens kvar.** Kommentaren blev falsk därför att något togs bort på
  ett ställe medan två andra filer talade om det.
- **Den har inget tröskeltal och ingen tolkning.** Ett namn finns eller finns
  inte.
- **Den kan inte larma falskt.** Vilken legitim ändring får fälla den? *Att byta
  namn på eller ta bort ett token utan att röra dess referenser* — vilket inte är
  en legitim ändring. Läggs tokenet till i `tokens.css` först tiger grinden. Den
  åtgärd meddelandet föreskriver får den att tiga, vilket är kravet från
  2026-10-05.
- **Den bevisar sig själv i samma leverans.** A8 tar bort `--color-text-dim`, och
  grinden **ska** då fälla bygget på `ContactForm.module.css:90` till dess att den
  kommentaren är omskriven. Det är en negativ kontroll som inte behöver
  konstrueras: redovisa larmet, vilken fil och rad som bar det, och att det
  upphörde när kommentaren rättades.
- **Den fångar inte uppräkningen i `Projects.jsx`**, och det ska stå utskrivet.
  Alla fem namn där finns i `tokens.css`. Uppräkningen rättas av del 1 ovan, av en
  människa, och nästa gång samma fel uppstår fångas det bara om det handlar om ett
  **borttaget** namn. Den halvan är inte automatiserad, och det är ett medvetet
  avstånd mellan vad lärdomen ber om och vad som går att bygga.

**A8 och A9 ligger INTE i paket B–F.** De rör `Footer.module.css`, `tokens.css`,
`ContactForm.module.css` och `Projects.jsx` — filer som Jelals innehållsuppdrag
inte nämner. De ska ligga i ett **eget paket**, numrerat av projektledaren. Blandas
de in i paket E går det inte att läsa ut vilken ändring som bar vilket fynd, och
uppdragets egen rad "Resten av portfolion är oförändrad" blir omätbar.
(`Skills.jsx`-kommentaren i del 1 är undantaget: den filen skrivs om i paket E
ändå, och stycket ska inte skrivas av till den nya filen.)

> #### UPPHÄVT — korsreferens i stället för ett fast tal
>
> Allt nedan i detta underavsnitt gällde den gamla listan på 307 poster plockade
> ur två källistor. **Bygg inget efter det.** Gällande beslut står i "A1 — Grinden
> för `skills.js` är strukturell" ovan.

**UPPHÄVT — hela stycket.** Ett hårdkodat `93` var rätt när listan var frusen. Nu
växer den, och **ett tal som måste ändras varje gång Jelal lägger till en
kompetens är en grind som kommer att fallera av fel skäl.** Den lär oss att
ignorera den. (Slutsatsen står kvar som gällande i A1; det är **ersättningen**
nedan som är upphävd.)

**~~Beslut: totalantalet är en upplysning. Grinden är korsreferens mot
källistorna.~~ UPPHÄVT 2026-10-08 av A1. Genomfört i paket D.**

~~Skriptet läser `skills.txt` och `skills-full.txt` — de ligger i repot och är
Jelals egna — och kontrollerar:~~ **Det gör det inte. Båda filerna är historik och
läses av inget skript.**

**Tabellen nedan är UPPHÄVD i varje rad — ingen av dessa sju grindar finns:**

| Grind (UPPHÄVD) | Innebörd |
|-------|----------|
| Varje namn i `skills-full.txt` finns i `skills.js`, **eller** står i `MERGED` | Inget av det Jelal sagt att han har kan tyst falla bort |
| Varje namn i `skills.txt` finns i `skills.js`, **eller** står i `MERGED` | Detsamma för den gamla listan |
| Varje `MERGED`-målnamn finns i `skills.js` | En sammanslagning kan inte peka i tomma luften |
| Varje namn i `skills.js` finns i någon av källistorna | Inget uppfunnet eller felstavat namn kan smyga in |
| Alla namn unika över hela filen | React-key och renderingen |
| Varje grupp: unikt `id`, `title` finns, minst en skill | |
| `filled` är `true` eller `false` | Inte strängen `"false"` |

~~`MERGED` är en uttrycklig tabell i skriptet över varje medvetet struken
nära-dubblett och vad den ersätts av:~~ **UPPHÄVT av A1 — tabellen är borttagen ur
`scripts/validate-data.mjs`, tillsammans med de fyra grindar som läste den.
Genomfört i paket D.**

```js
// UPPHÄVT 2026-10-08 av A1. Denna tabell finns INTE i scripts/validate-data.mjs
// och ska inte skrivas tillbaka. Den står kvar här som historik.
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

**UPPHÄVT av A1.** ~~Det här är kärnan i beslutet. Varje struken post står i koden
med sin ersättare bredvid sig, inte bara i ett dokument. Den dag någon undrar vart
`GET` tog vägen finns svaret på raden. Och den dag Jelal lägger till en kompetens
behöver ingen röra en siffra — han lägger till den i `skills-full.txt` och i
`skills.js`, och grinden säger till om han bara gjorde det ena.~~ Svaret på "vart
tog `GET` vägen" står i stället i detta dokument och i git-historiken, och
mekanismen föll på att den fällde 17 av 53 korrekta namn.

**UPPHÄVT av A1.** ~~Säger Jelal nej till HTTP-sammanslagningen tas de fyra raderna
bort ur `MERGED`, `GET`/`POST`/`PUT`/`HTTP-metoder` läggs in som egna poster och
den gamla strängen stryks. Det är en avgränsad ändring på ett ställe.~~ Frågan är
**förfallen** — ingen av posterna står på sidan. Se den sista punkten under
"Öppna punkter som INTE är arkitektens att besluta".

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

#### Det gråa fältet ljusnar till `#2A2A2E` — och kanten måste byta riktning — UPPHÄVT 2026-11-07, se M5 och M6

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

#### Vad ljusningen gör med allt annat — uträknat — UPPHÄVT 2026-11-07, se M5 och M6

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

#### Kanten behålls — och mitt tidigare skäl var fel fråga — UPPHÄVT 2026-11-07, se M6 (headerns underkant utgår, pillens kant är gränsen)

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

**1. `<noscript>` — ja, i paket 7. Texten och skälet UPPHÄVDA 2026-11-08, se M21
punkt 5** (sidan förrenderas och syns utan JavaScript; platsen direkt före
`<div id="root">` gäller).
~~Sidan är helt klientrenderad och blir blank utan JavaScript.~~ Det är en känd följd
av stackvalet, inte ett fel, men ett meddelande kostar ingenting. Läggs i
`index.html` direkt före `<div id="root">`. ~~Exakt text, så att ingen formulerar
om den:~~

> ~~Den här sidan behöver JavaScript för att visas. Slå på JavaScript i
> webbläsaren och ladda om sidan.~~ UPPHÄVT, se M21 punkt 5.

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
  sida).

#### `aria-current` byter regel: läsraden, inte störst yta

**Felet:** man klickar "Projekt", scrollar dit, och navet lyser "Kompetenser".
Uppmätt vid scrollY 676 visar projects 351 px och skills 485 px, så skills vinner.

Regeln följde sin egen logik. **Logiken var fel.** "Störst synlig yta" fungerar så
länge sektionerna är ungefär lika höga, och slutar fungera i samma stund en kort
sektion ligger före en på 2338 px. Omflyttningen skapade precis det läget.

**Gällande regel: den sektion som skär en tunn läsrad strax under headern är
aktuell.**

```
IntersectionObserver med rootMargin som lämnar ett band på några pixel
direkt under --header-height. Den sektion som skär bandet är current.
```

Den är **oberoende av sektionshöjd** och motsvarar vad en läsare menar med "var är
jag" — det som står överst, inte det som råkar täcka flest pixlar.

**Specialfall:** är sidan scrollad längst ned kan en kort sista sektion aldrig nå
bandet. Då markeras den sista sektionen. Det är ett undantag som ska stå i koden,
inte upptäckas.

> Jag avfärdar att vänta ut problemet. Det skulle troligen döljas när Jelal lägger
> in riktiga projekt och sektionen växer — **men att låta innehåll dölja ett
> logikfel är precis mönstret "fungerar i dag" som redan kostat oss två omtag.**

Observern är **projektets första `useEffect`**, vilket var ett medvetet val och
inte något som smugit in.

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
  ~~**48 × 36 px** med det tajta märket, se "Ikonens optiska storlek"~~
  **159 × 34 px, hela loggan, se M20 (UPPHÄVT 2026-11-07)**. Principen som
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

### Vilka filer som skapas i vilket paket — historik, tokennamnen UPPHÄVDA 2026-11-07, se M5 (filerna i moderniseringen står i M-avsnittets komponenttabell)

Skapa inga tomma filer i förväg.

| Paket | Filer |
|-------|-------|
| 1 | `index.html`, `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/styles/tokens.css`, `src/styles/global.css`, `src/data/sections.js`, `Header.jsx` + modul, `Section.jsx` + modul, `Footer.jsx` + modul, samt platshållar­rubriker för hero/skills/projects/contact |
| 2 | `scripts/optimize-images.mjs`, scriptraden `optimize:images` i `package.json`, `sharp` som devDependency, `public/assets/profile/*`, `public/assets/logo-mark-{32,96,192}.png`, `.visually-hidden` i `global.css` + ombyggnaden av `Header.jsx` + modul till ikon + textnod |
| 3 | `Hero.jsx` + `Hero.module.css` |
| 4 | `src/data/skills.js`, `Skills.jsx` + modul, `SkillPill.jsx` + modul, `scripts/validate-data.mjs` + `validate:data` i `package.json` + inkoppling i `build` |
| 5 | `src/data/projects.js`, `Projects.jsx` + modul, `ProjectCard.jsx` + modul, **`'projects'` aktiveras i `ACTIVE`** |
| 6 | `src/data/contact.js`, `Contact.jsx` + modul, `ContactForm.jsx` + modul, `--color-field-border` i `tokens.css`, **`'contact'` aktiveras i `ACTIVE`** |

**Tabellen gäller paket 1–6, bygget av sidan.** Innehållsuppdragets paket (B–K)
skapar bara två filer — `SkillChip.jsx` + modul i E och `scripts/validate-tokens.mjs`
i J — och ändrar i övrigt befintliga filer. Vilket paket som äger vilken ändring
står i "Paket A"-tabellen högst upp, inte här.

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

### Källa och beskärning — UPPHÄVT 2026-11-07, se M10c (källan är `hero-portrait.jpg`, ingen beskärning)

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

### Utdatafiler — UPPHÄVT 2026-11-07, se M10c (`public/assets/hero/hero-{960,1440,1672}.webp`, inga JPEG)

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

### Profilbilden är rund — beslutat av Jelal 2026-10-05 — UPPHÄVT 2026-11-07 av Jelal, se M10c

> **Gäller i stället:** Jelal 2026-11-07, "den ska föreställa en profilbild samt
> täcka bakgrunden". Porträttet är heros svartvita bakgrund, utan cirkel och utan
> streck. Varje underavsnitt nedan är historik och bär sin egen märkning.

Jelals ord: *"Kan du göra profilbilden som en rund ring så ansiktet syns och att
bilden inte är 4 kantigt?"*, förtydligat till **"bilden ska vara rund men en vit
kant utanför ringen"**. Alltså rund urklippning **plus en synlig vit ram**.

#### Beskärningen görs i CSS, inte med nya filer — tokennamnen UPPHÄVDA 2026-11-07, se M5 — helt UPPHÄVT 2026-11-07, se M10c

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

#### Diametern — och felet att den krympte när skärmen växte — sidmarginalens värde UPPHÄVT 2026-11-07, se M18 — taken 360/420 och den icke-avtagande serien UPPHÄVDA 2026-11-07, se M10c (ingen cirkel. Lärdomen om att mäta en serie gäller)

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

#### Gråskalan och tonplattan följer med in i cirkeln — UPPHÄVT 2026-11-07, se M10c

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

#### Det vita strecket — tokennamnen UPPHÄVDA 2026-11-07, se M5 — helt UPPHÄVT 2026-11-07, se M10c (inget streck)

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

#### Mekanismen: `border`, inte `outline` eller `box-shadow` — UPPHÄVT 2026-11-07, se M10c (inget streck. Att `outline` är reserverad för `:focus-visible` gäller)

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

#### Verifiering — UPPHÄVT 2026-11-07, se M10c (rad 8: ansiktet, och rad 3: 360 px-golvet)

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

### Vad som INTE görs i bildskriptet — tokennamnen UPPHÄVDA 2026-11-07, se M5 — gråskalan och tonplattan UPPHÄVDA 2026-11-07, se M10c — stycket om loggan UPPHÄVT 2026-11-07, se M20 (källan är `jq-logo-light.png`, som läses och aldrig skrivs över)

> **Gäller i stället:** gråskalan bakas in i filerna med sharp `grayscale()`, och
> tonplattan finns inte. Jelal bad uttryckligen om en svartvit bild, och en bild
> som alltid ska vara svartvit ska inte hämtas i färg och avfärgas i webbläsaren.
> Skälet nedan, att tonen kunde justeras efter Leverans 1, är förbrukat.

Gråskalan och den grå tonplattan bakas **inte** in i filerna. De görs i CSS i
paket 3 (`filter: grayscale(1) contrast(…)` plus ett overlay-lager med
`--color-overlay-grey`). Skälet: då går tonen att justera efter Jelals synpunkter
vid Leverans 1 utan att någon bild behöver genereras om.

`assets-source/logo.png` **skrivs aldrig över** — den läses, precis som
`assets-source/profile.jpg`. Däremot härleds monogram-ikonen ur den i paket 2B, se "Headerns
logotyp". En tidigare rad här sa att loggan inte rörs alls, med hänvisning till
den gamla PLAN.md; den var i direkt konflikt med ikonbeslutet och är struken.

---

## Beslutslogg — historik. Varje rad som nämner ett `--color-*`-namn, Didact Gothic, `.surface-light`, det gråa fältet, ingen animation eller inga ikoner är UPPHÄVD 2026-11-07, se M-avsnittet

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
  avslutande komma, och det är den vanligaste fällan när en människa redigerar en
  lång datafil för hand (~~93 rader~~, antalet är upphävt av A1). `.js` låter oss skriva instruktionen till Jelal överst i den fil
  Jelal faktiskt öppnar. (påverkat av lärdom: nej)
- **`sections.js` som enda källa för både `id` och navlänk** — PLAN.md:s
  verifiering i paket 1 är att varje navlänk scrollar rätt. Två separata listor
  hade gjort det möjligt att stava fel på ett ställe. (påverkat av lärdom: nej)
- **~~Skill-posten har exakt två fält, `name` och `filled`~~ — UPPHÄVT 2026-10-08
  av A2, genomfört i paket D: posten har `name` som ENDA fält.** Skälet nedan
  gällde ett tillstånd som inte finns längre, men regeln "varje extra fält är ett
  till ställe att göra fel på" bar A2 lika mycket som den bar detta beslut.
  ~~Briefens viktigaste krav är att Jelal ändrar ett tillstånd på ETT ställe. Varje
  extra fält är ett till ställe att göra fel på, och nivåangivelser är uttryckligen
  bortvalda i PLAN.md paket 4.~~ (påverkat av lärdom: nej)
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
- **UPPHÄVT 2026-11-07 av Jelal, se M20 (hela loggan, `alt="Jelal Qaiumi"`):**
  **Headern: beskuret JQ-monogram som bild + namnet som HTML-text** — Jelals eget
  beslut 2026-10-02. Lockupens ordbild blir oläslig i 44 px. Texten blir läsbar,
  markerbar och skalar med användarens typsnittsstorlek. Ikonen får `alt=""` +
  `aria-hidden`, så att namnet läses upp exakt en gång. (påverkat av lärdom: nej)
- **UPPHÄVT 2026-11-07, se M20:**
  **Namnet döljs med "visually hidden", inte `display: none`, under 600 px** — på
  360 px finns inte plats för ikon, namn och tre navlänkar, men länken får inte
  bli namnlös för en skärmläsare just på den smalaste skärmen. (påverkat av
  lärdom: nej)
- **UPPHÄVT 2026-11-07, se M20 (fast uttag bevisat av källgrindar):**
  **Ikonens beskärning hittas med blockdetektering, inte med en höjdtröskel** —
  en första version av regeln sa "översta 60 %", men monogrammets botten ligger på
  62,1 %. Q:ets svans hade klippts av utan att något larmat. Blockdetektering
  vilar bara på att monogrammet är det största sammanhängande oranga partiet.
  Förväntat utfall står utskrivet så att avvikelse syns direkt. (påverkat av
  lärdom: se mönstret nedan)
- **UPPHÄVT 2026-11-07, se M20 (ikonen är opak):**
  **Ikonen genereras med genomskinlig botten, `--color-bg` förblir `#0B0B0C`** —
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
- **Datavalidering som script i `scripts/`, inkopplat i `build`** — ~~93~~
  **(antalet upphävt av A1)**
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
- **[Metoden gäller, konsumenten är UPPHÄVD av A2. Se noten "`--color-border` på
  ljus yta efter A2" — värdena står kvar, pillarna gör det inte.]** **De dämpade
  pillarnas ljusa värden härleds ur kvoten, inte ur färgen** — ram
  1,413:1 mot `#F4F4F6` mot 1,38:1 mot mörkt, text 7,40:1 mot ca 7:1. Underordningen
  blir exakt lika stark på båda ytorna. Samma metod gör att sektionsavgränsaren löser
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
- **`@hcaptcha/react-hcaptcha` införs — projektets tredje körningsberoende.**
  Dokumentationen visade att paketet **inte** är nödvändigt; det väljs ändå.
  **Frågan är inte "beroende eller inte": hCaptchas JavaScript laddas externt i
  alla tre vägarna, så tredjepartskostnaden är identisk och det enda som skiljer är
  vem som skriver limmet.** Återställningen fäller avgörandet — arkitekturen kräver
  `resetCaptcha()` i två lägen, och den skriptbaserade vägen har ingen dokumenterad
  sådan. Att bygga ett krav på ett odokumenterat globalt objekt är att bygga en
  tyst framtida felkälla. Regeln om beroenden bryts inte utan tillämpas: jag har
  avvisat router och ikonpaket **för att plattformen redan gör det de gör**, och
  att foga in en tredjepartswidget i React:s livscykel gör plattformen inte.
  (påverkat av lärdom: nej)
- **Jag lät bli att gissa, och det var rätt** — mitt tidigare beslut var en
  bevisbörda i stället för ett påstående om ett api jag inte kunde läsa. Underlaget
  kom sedan från någon som faktiskt hade åtkomst. **Ett beslut formulerat som
  "detta gäller tills någon mäter" är inte ett svagare beslut, det är ett ärligare.**
  (påverkat av lärdom: ja)
- **Ingen `.env.example`, ingen `VITE_`-variabel** — skälet är nu enklare än mitt
  första: **det finns ingen nyckel av vår att sätta.** Platsnyckeln är Web3Forms
  delade publika. Det gamla skälet står kvar som bakgrund: en `VITE_`-variabel
  bakas in i bundlen och är ingen hemlighet, bara en mindre synlig konstant.
  (påverkat av lärdom: nej)
- **En förutsättning som bor utanför arkivet skrivs ned i arkivet** — hCaptcha
  måste slås på i Web3Forms instrumentpanel, annars avvisas inskicken utan att
  någon fil i arkivet visar varför: koden ser rätt ut, bygget är grönt, och
  meddelanden försvinner. Den som felsöker om ett halvår har inte minnet av att
  någon klickade i en ruta. (påverkat av lärdom: ja — tysta fel ska göras synliga)
- **Knappen dämpas visuellt men får aldrig `disabled`** — specifikationen och mitt
  tidigare beslut är **förenade, inte det ena upphävt**: dämpad yta,
  `aria-disabled`, kvar i tabbordningen, hanteraren vägrar. Och ett klick i dämpat
  läge **kör valideringen och flyttar fokus till första felande fält**, vilket är
  bättre än båda utgångspunkterna — en knapp som inte går att trycka på berättar
  aldrig varför. (påverkat av lärdom: ja)
- **`--color-accent` och `--color-accent-hover` binds om på ljus yta** till
  `#AE4802` (5,13:1) och `#8F3A01` (6,89:1). Länktexten föll på **2,579:1** mot
  kravet 4,5. **Det motsäger inte att jag avvisade en mörkare orange för pillarna:**
  det var stora ytor, 1.4.11 och ett utseendeval — detta är liten text, 1.4.3 och
  ett fel. `#C25102` dög inte trots att den finns i projektet; den ger 4,70:1 mot
  rent vitt men 4,28:1 mot `#F4F4F6`. **Ett token som klarar ett krav klarar inte
  automatiskt ett hårdare.** (påverkat av lärdom: ja)
- **Hover rör sig bort från underlaget, inte alltid mot ljusare** — på mörk botten
  ljusnar den, på ljus mörknar den. Inkonsekvensen är regeln, inte ett fel att
  räta ut. (påverkat av lärdom: nej)
- **`--color-surface: #FFFFFF` på ljus yta** — kortet hade 1,000:1 mot sektionen
  och var inget kort längre. Kvoten speglar nu den mörka ytans 1,07:1. **Kortet
  har aldrig definierats av sin fyllnad utan av fyllnad plus ram**, och ramens
  1,413:1 är därför inget fel: 1.4.11 gäller komponenter och betydelsebärande
  grafik, och ett kort är varken. (påverkat av lärdom: ja)
- **`aria-current` byter från "störst synlig yta" till "skär läsraden under
  headern"** — den gamla regeln fungerade bara så länge sektionerna var ungefär
  lika höga. Att vänta ut felet tills Jelal lägger in projekt avfärdas: **att låta
  innehåll dölja ett logikfel är mönstret "fungerar i dag".**
  (påverkat av lärdom: ja)
- **Det "trygga fälläget" för navet fanns inte** — jag skrev att `nowrap` gör ett
  överskridande till horisontell scroll som golvkontrollen fångar. I själva verket
  blir det **tyst intrång i sidmarginalen**, och först när de 18 pixlarna är
  uppätna blir det scroll. **Ett överskridande mäts mot sin egen behållare, aldrig
  mot sidan.** Slack absorberar fel, och absorberade fel larmar inte. Tredje gången
  ett antaget felläge visat sig ha en blind zon. (påverkat av lärdom: ja)
- **Sidans ordning blir hero → projekt → kompetenser → om mig → kontakt** — Jelals
  val 2026-10-07, med hans eget skäl: kompetenssektionen är 2338 px hög och
  projekten låg bakom den. (påverkat av lärdom: nej)
- **`App.jsx` mappar över `sections` och slår upp komponenten** — ordningen bodde
  på två ställen, och **den här ändringen är precis det fall där de glider isär**.
  Uppslaget är konfiguration, inte logik, så regeln om att `App.jsx` saknar logik
  står kvar. Den kvarvarande tvåställeskopplingen görs mekanisk genom att den
  renderade sidan jämförs mot `sections.js` — en statisk grind hade behövt läsa
  `App.jsx` som text. **Mät utdata, inte källkod.** (påverkat av lärdom: ja)
- **Om mig-texten ligger i `src/data/about.js`, inte i komponenten** — `GUIDE.md`
  har ett avsnitt "Texter som inte ligger i `src/data/`", och **den listan ska bli
  kortare, inte längre**. En array av stycken i stället för en sträng med
  radbrytningar: annars krävs delningslogik i en komponent som ska vara
  presentation. Formen inbjuder inte till tillväxt — Jelal sa "en liten sektion",
  och det är specifikation. (påverkat av lärdom: ja)
- **Den ljusa ytan ligger kvar på Kompetenser, men placeringen läggs fram** — tre
  alternativ med sin rytm. Att två mörka sektioner hamnar i rad är ingen defekt,
  och det ska sägas så att ingen tror att något är trasigt. Noterat att alternativ
  C ligger närmast Jelals eget skäl till flytten, utan att jag förordar det.
  (påverkat av lärdom: ja — utseendeval läggs fram)
- **Kontaktsektionen blir tvåspaltig, och DOM-ordningen byts med den** — Jelals val
  2026-10-07. Att bara flytta visuellt med grid-placering avfärdades: det hade
  gjort tangentbordsordningen olik den visuella, vilket varit en mätt
  verifieringspunkt sedan paket 7. **Att bryta en mätt regel för en
  placeringsändring vore att byta bort något säkert mot något smakmässigt.**
  Följden att länkarna hamnar under formuläret på mobil läggs fram för Jelal — den
  stämmer med hans prioritering men han har inte sett den. (påverkat av lärdom: ja)
- **Brytpunkten 900 är räknad ur captchans 320 px, inte vald** — vid 600 hade
  formulärspåret blivit 286 px och widgeten spräckt golvet. **Sektionens minst
  eftergivliga element bestämmer var spalterna får uppstå.** Byts captchan måste
  talet räknas om. (påverkat av lärdom: ja — härled tal, välj dem inte)
- **Navlänkarnas 19 px träffyta rättas, men som en egen ändring** — padding är
  osynlig, men fokusringen växer med träffytan och det syns. Att bunta ihop den
  med kontaktflytten vore precis det jag avvisade när headerns utrymme frigjordes.
  (påverkat av lärdom: ja)
- **UPPHÄVT 2026-11-07, se M20 (ingen dold text, `alt` på loggan):**
  **Namnet bredvid märket döljs i alla bredder, men tas inte ur DOM** — Jelals val
  2026-10-07. `.visually-hidden-until-sm` blir `.visually-hidden`. `aria-label`
  avfärdades trots att mitt gamla skäl mot den fallit: **`aria-label` degraderar
  till ingenting om något går fel, medan visuellt dold text degraderar till synlig
  text om CSS inte laddas.** En namnlös länk är ett sämre felläge än ett synligt
  namn. Vald väg upphäver ingenting och återanvänder en primitiv som redan är mätt.
  (påverkat av lärdom: ja)
- **UPPHÄVT 2026-11-07, se M20 (159 × 44 px med `padding-block: 5px`):**
  **Träffytan kompenseras till 48 × 44 px med `padding-block: 4px`** — länkens box
  var tidigare ikon plus text och är nu bara ikonen, 48 × 36, vilket faller under
  WCAG 2.5.5. **Det är den sortens försämring som smyger in när något tas bort:
  ingen mätning går sönder och ingenting larmar.** (påverkat av lärdom: ja)
- **Det frigjorda utrymmet på bred skärm lämnas tomt** — Jelal bad om att ta bort
  en text, inte att göra om headern. Att passa på att omfördela utrymmet vore en
  andra ändring han inte bett om. (påverkat av lärdom: nej)
- ~~**Asterisken blir orange, inte röd**~~ **UPPHÄVT av Jelal 2026-10-07: röd.**
  `--color-error: #F85149`, 5,87:1 mot `--color-bg`. **Regeln "orange är enda
  accentfärgen" är inte bruten** — det röda är ingen accent utan formulärets
  uppmärksamhetsfärg, och Jelal har beslutat att sidan ska ha en. Kulöravståndet
  till accenten är 26°, vilket är praktiskt taget allt som finns att ta ut innan
  man glider mot rosa; separationen bärs därför lika mycket av blåkanalen (73 mot
  3) och ljusheten. (påverkat av lärdom: ja — mät separationen, anta den inte)
- **Felmeddelandena får samma röda** — min invändning mot ett rött token var att
  det blir en andra accent. **Den invändningen har upphört att gälla eftersom den
  andra färgen finns oavsett**, och kvar blir bara nackdelen av två olika färger
  för "det här är fel" i samma formulär. Ett skäl som vilar på en förutsättning
  ska omprövas när förutsättningen faller, inte försvaras. (påverkat av lärdom: ja)
- **`--color-error` binds om i `.surface-light` fastän ingenting använder den där**
  — `#F85149` ger bara 3,05:1 mot den ljusa ytan. Att ingenting använder färgen
  där är **precis** skälet att göra det nu: `--color-focus` missades av exakt den
  anledningen och blev en latent bugg. (påverkat av lärdom: ja)
- **`company` får vara valfritt — regeln var ofullständig, inte bruten** — mitt
  "ett valfritt fält är ett fält man inte bestämt sig om" täckte inte fält som
  **inte gäller alla**. En privatperson har inget företag. Regeln lyder nu:
  obligatoriskt om det gäller alla och behövs, valfritt om det inte gäller alla,
  borttaget om det inte behövs. (påverkat av lärdom: ja)
- **Rate limiting utgår och det skrivs ut** — en IP-regel kräver en server som ser
  anropen, och Jelal har valt en statisk sida. Kvar: honeypot, hCaptcha och
  månadstaket. Utskrivet så att ingen tror att punkten föll bort.
  (påverkat av lärdom: ja — ett medvetet bortval ska synas)
- **Kontaktformulär med Web3Forms, tre obligatoriska fält** — Jelals val
  2026-10-06. Alla tre obligatoriska enligt regeln att **ett valfritt fält är ett
  fält man inte har bestämt sig om**: behövs det, gör det obligatoriskt; behövs det
  inte, ta bort det. Honeypot utan CAPTCHA, eftersom CAPTCHA lägger friktion på
  varje människa för att stoppa en robot. Domänbegränsning aktiveras inte — den
  skulle slå ut `localhost`. (påverkat av lärdom: nej)
- **Statusraden finns alltid i DOM, knappen förblir fokuserbar** — en live-region
  som läggs till samtidigt som sitt innehåll annonseras ofta inte alls, och
  `disabled` på knappen kastar fokus till `<body>` mitt i en åtgärd. Två fel som
  båda är osynliga för den som bara tittar på skärmen. (påverkat av lärdom: ja)
- **Timeout på 15 sekunder via `AbortController`** — det verkliga ovisshetsläget är
  inte ett felmeddelande utan ett "Skickar …" som aldrig tar slut. Felmeddelandet
  ska dessutom vara entydigt: meddelandet kom **inte** fram, inget "kanske".
  (påverkat av lärdom: ja — välj det felläge som syns)
- **`noValidate` plus egen validering på svenska** — webbläsarens inbyggda
  meddelanden kommer på webbläsarens språk, inte sidans. `required` och
  `type="email"` står kvar för semantiken. E-postregeln är medvetet tillåtande:
  **att avvisa en giltig adress är värre än att släppa igenom en ogiltig.**
  (påverkat av lärdom: nej)
- **`--color-field-border` `#606068` införs** — ett inmatningsfälts ram omfattas av
  WCAG 1.4.11:s 3:1, och `--color-border` ger 1,38:1. Skillnaden mot de två token
  jag nyss tog bort är att detta **införs av en komponent som behöver det**.
  (påverkat av lärdom: ja)
- **Ljus yta: `#F4F4F6`, och tre härledda värden räknades om** — Jelals val
  2026-10-05. Ett bakgrundsbyte på en yta vars alla färger är **härledda ur
  bakgrunden** är aldrig en radändring: ram, dämpad text och svagaste text tappade
  alla sin målkvot. `--color-text-dim` föll dessutom till 4,10:1, **under AA**.
  Det var det tredje tokenet jag missade på samma yta, efter `--color-focus`.
  (påverkat av lärdom: ja)
- **Den dämpade texten kompenseras, trots att 6,73:1 klarar AA** — avvikelsen från
  "exakt lika stark" vore inte värd en ändring i sig. Men 6,73 faller under AAA
  medan den mörka ytan ligger över, och **att den ljusa ytan blir mätbart sämre
  tillgänglig än den mörka är en asymmetri som inte går att försvara.**
  (påverkat av lärdom: nej)
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
- **[UPPHÄVT 2026-10-08 av A1 och A2 — det finns ingen fördelning, och **inget**
  antal är strukturellt. Genomfört i paket D.]** **Fördelningen ifyllda/dämpade är
  levande data, inte ett arkitekturtal** — ~~bara
  totalen 307 är strukturell.~~ Antalet ändras varje gång Jelal markerar ett skill,
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
- **UPPHÄVT 2026-11-07, se M20 (rutan tas rakt ur källan, ingen utfyllnad):**
  **Ikonen görs kvadratisk med `extend()` och genomskinlig utfyllnad, inte med en
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
- **[UPPHÄVT 2026-10-08 av A1 — genomfört i paket D.]** **Kategoriindelningen
  specificeras som delta mot `skills-full.txt`, inte som en
  avskrift** — Jelals fil innehåller redan en placering för var och en av sina 292
  poster. Att skriva av 267 namn hit hade skapat en andra sanning som kan glida
  isär från hans, plus ~300 tillfällen att stava fel. Bara avvikelserna
  specificeras. (påverkat av lärdom: ja — två sanningar om samma sak)
- **[UPPHÄVT 2026-10-07 — de 18 grupperna ersattes av nio. Genomfört i paket D.]**
  **Fyra ingrepp i Jelals 17 kategorier, inga fler** — `Utvecklingsprocess` löses
  upp (13 av 19 var dubbletter), `Övrigt` löses upp (en portfolio ska inte ha den
  rubriken och posterna hade riktiga hem), `Säker webbutveckling` delas och tar upp
  `Autentisering`, och React/mobil bryts ut i tre grupper. Varje upplöst kategoris
  innehåll har ett namngivet nytt hem. (påverkat av lärdom: nej)
- **[UPPHÄVT 2026-10-08 av A1 — det finns inga nära-dubbletter att avgöra.
  Genomfört i paket D.]** **Nära-dubbletter avgörs av en tregradig regel, inte från
  fall till fall** —
  svenskt före engelskt, annars mest korrekt information, annars nya listan. Utan
  en regel blir tolv enskilda smakbeslut som ingen kan granska. (påverkat av
  lärdom: nej)
- **[UPPHÄVT 2026-10-08 av A1 — korsreferensen och `MERGED` utgår helt, grinden är
  strukturell. Genomfört i paket D.]** **Totalantalet skills blir en upplysning,
  korsreferens mot källistorna blir
  grinden** — ett hårdkodat tal måste ändras varje gång Jelal lägger till en
  kompetens och skulle fallera av fel skäl, vilket lär oss att ignorera det.
  `MERGED`-tabellen i skriptet gör dessutom varje struken nära-dubblett synlig i
  koden med sin ersättare bredvid sig. (påverkat av lärdom: ja — en grind som
  fallerar av fel skäl är värre än ingen)
- **[UPPHÄVT 2026-10-08 av A6 — kortrutnät 3/2/1, inga `columns`. Genomfört i
  paket E.]** **Flerkolumn i stället för grid för de 18 grupperna** — grid gör alla kolumner
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
- **[UPPHÄVT 2026-10-08 av A2 — det finns ingen teckenförklaring. Genomfört i
  paket E.]** **Teckenförklaringen vänds** — med de allra flesta orange är det dämpade undantaget,
  och en text om att "listan fylls i efter hand" beskriver inte längre det man ser.
  (påverkat av lärdom: nej)
- **Skills grupperas nästlat, inte platt med kategorifält** — ett `category`-fält
  per post hade varit **en handskriven sträng per kompetens** (~~93~~, antalet är
  upphävt av A1) som var och en kan stavas fel, och
  en felstavning ger en skill som tyst försvinner eller en spök-kategori. Nästlat
  gör kategoritillhörigheten strukturell och därmed omöjlig att stava fel.
  Sökbarheten löses i stället av formateringsregeln "en skill per rad" — ~~`filled`
  på samma rad som `name`~~, **UPPHÄVT av A2 och A17: posten har bara `name`, och
  regeln hängde aldrig på att `filled` fanns.** Antalet handskrivna strängar som
  stod i detta stycke är upphävt av A1. (påverkat av lärdom: ja — tysta fel i
  handredigerad data)
- **[Principen gäller. Exemplet är UPPHÄVT: "React Native — komponenter och
  API:er" är ett av de 18 gamla gruppnamnen, se A6.]** **Kategorinamnen bär
  abstraktionsnivån, ingen separat nivådimension** — "React
  Native — komponenter och API:er" säger redan vad `TouchableOpacity` är, utan att
  vi behöver rangordna Jelals poster. En uttrycklig nivåindelning hade i praktiken
  varit en nivåangivelse, vilket är bortvalt i både briefen och PLAN.md.
  (påverkat av lärdom: nej)
- **[Gäller, men läs "chipset" där det står "pillen" — A6 bytte komponenten och
  behöll regeln (`max-width: 100%`, ingen `nowrap`). Genomfört i paket E.]**
  **Pillen får radbryta inuti sig själv, till skillnad från navlänken** — i
  headern är höjden låst, så radbrytning klipper bort innehåll tyst; i
  skills-sektionen är höjden fri, så radbrytning är ofarlig medan utebliven
  radbrytning spräcker 360 px-golvet. Samma underliggande regel i båda fallen:
  **välj det felläge som syns.** (påverkat av lärdom: ja)
- **[UPPHÄVT 2026-10-08 av A2 — raden är borttagen, det finns inget att förklara.
  Genomfört i paket E.]** **Förklarande rad under skills-rubriken, alltid
  renderad** — med noll ifyllda
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
- **UPPHÄVT 2026-11-07, se M20 (hela loggan, och en opak ruta som favicon):**
  **Headerns ikon blir tajt och icke-kvadratisk, 48 × 36** — den kvadratiska
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

### Beslutslogg — paket A, innehållsuppdraget 2026-10-08 — historik, och varje rad som nämner ett `--color-*`-namn, Didact Gothic, `.surface-light`, ingen animation eller inga ikoner är UPPHÄVD 2026-11-07, se M-avsnittet

- **A1: skills-grinden blir strukturell, korsreferensen utgår** — uppmätt fällde
  den 17 av 53 kurerade namn, och inget av dem var fel. En grind som larmar på
  korrekt indata lär sin läsare att ignorera den. Det som ersätter den är
  invarianter ingen legitim redigering bryter, plus en engångsjämförelse mot
  uppdragstexten i paket D. (påverkat av lärdom: **ja** — 2026-10-05 "en grind som
  fälls av fel skäl", och 2026-10-05 "ett fält som en typedef märker OBLIGATORISK
  ska ha en egen grind")
- **A1b: jag upphävde min egen ordningsgrind från 2026-10-07 samma vecka den
  skrevs** — nio namngivna id i fastlåst ordning är innehåll, inte struktur, och
  hade fällt bygget den dag Jelal lägger till en tiondegrupp. Jag upprepade felet
  jag just rättade, en nivå upp. (påverkat av lärdom: **ja** — samma post)
- **A2: `filled` tas bort helt, inte bevaras "för framtiden"** — fältet har ingen
  dimension att bära i den nya listan, och data utan verkan är död data. Att det
  skulle kunna behövas igen är inte ett skäl: då återinförs det av en komponent som
  behöver det. (påverkat av lärdom: **ja** — 2026-10-02 "hero-posten i
  `sections.js` är död data")
- **A3: inga ikoner, och inget nytt beroende** — uppdragets premiss om ett
  befintligt ikonbibliotek är osann, och nio gissade symboler säger mindre än
  rubrikerna de står bredvid. Avvikelsen från uppdragets bokstav läggs fram, den
  döljs inte. (påverkat av lärdom: nej — men den etablerade linjen om minsta antal
  beroenden är äldre än dokumentet)
- **A4: Om mig-länken styrs av ett fält i datan, inte av en fras i komponenten** —
  en fras skriven på två ställen tappar länken tyst när Jelal skriver om stycket,
  och en markering i texten hade infört ett mikrospråk i `src/data/` plus ett
  undantag i teckengrinden. Länken tänds av sig själv när projektet läggs in.
  (påverkat av lärdom: **ja** — 2026-10-02 "sektions-id:t `hero` står skrivet på
  tre ställen" och 2026-10-02 "en länk får bara renderas om sektionen finns i
  datan")
- **A5: knapparnas krav skrivs som en mätserie, inte som en mening** — "syns utan
  scroll på mobil" mäts på elementens egna rektanglar vid 360 × 640 och sju andra
  vyportar, mot hero:s egen behållare. Och konturknappens ram blev
  `--color-text-muted`, för `--color-border` har samma hexvärde som hero:s
  bakgrund och hade mätt 1,00:1. (påverkat av lärdom: **ja** — 2026-10-05 "en
  invariant som bara står i prosa försvaras av att någon läser den", och
  2026-10-08 om tokennamn som motivering)
- **A6: kortrutnätet 3/2/1 med `minmax(0, 1fr)` i alla tre lägena, och vaktraderna
  följer inte med** — de gick inte att få att larma i den layout de stod i, och i
  den nya bär rutnätets `align-items: start` saken mätbart. En rad som inte går att
  belägga skrivs inte av. (påverkat av lärdom: **ja** — 2026-10-02 ÅTERFALL om
  grid och min-content, och 2026-10-05 om vaktrader)
- **A7: `Systemutvecklare · Fullstack`, och den daterade kommentaren skrivs om till
  en invariant** — uppdraget är nyare än hans tidigare instruktion och vinner. En
  kommentar som berättar historik blir falsk varje gång historiken får ett nytt
  kapitel. (påverkat av lärdom: **ja** — 2026-10-05 ÅTERFALL om kommentarer som
  bär påståenden dokumentet tagit tillbaka)
- **A8: `--color-text-dim` tas bort i stället för att få ett nytt hexvärde** —
  3,893:1 mot AA:s 4,5. Ett högre värde hade lämnat kvar ett token vars namn
  förklarar sitt eget låga värde, och det var rotorsaken. Kostnaden — footern
  tappar sin egen nivå i texthierarkin — skrivs ut i stället för att förnekas.
  (påverkat av lärdom: **ja** — 2026-10-08 om footerns kontrast)
- **A9: jag avfärdar grinden mot uppräknande kommentarer och inför en grind mot
  kvarglömda tokenreferenser i stället** — uppräkningen går inte att skilja från en
  riktig jämförelse utan att läsa meningen, och varje formulering jag prövade fällde
  antingen korrekt kod eller krävde ett tröskeltal. Den grind jag inför fångar det
  som faktiskt gick fel alla tre gångerna: en borttagning som lämnade en referens
  kvar. Att den inte täcker hela lärdomen står utskrivet. (påverkat av lärdom:
  **ja** — 2026-10-08 ÅTERKOMMANDE, och 2026-10-05 om grindar som larmar fel)
- **A10: inga ikonlänkar i hero** — GitHub är uttryckligen borttagen av Jelal, och
  en andra väg till samma LinkedIn-adress 400 px ovanför den första tillför inget.
  "Platshållare för länkarna" är en länk utan mål. (påverkat av lärdom: nej)
- **A11: ingen animation** — uppdragets egen regel ger noll, eftersom sidan bara har
  två färgövergångar på 150 ms. Avtrycket finns för att nästa läsare inte ska tro
  att animationen saknas av slarv. Heros hover-övergångar är inte en in-animation
  och får inte läsas bort av paket E:s grep-räkning. (påverkat av lärdom: nej)
- **A12: uppdragstexten måste in i repot innan paket B startar** — fyra
  verifieringspunkter jämför tecken för tecken mot en fil som försvinner med
  sessionen. Projektledarens åtgärd, och den blockerar B, D och F. (påverkat av
  lärdom: **ja** — 2026-10-05 "mät artefakten, inte deklarationen", i dess
  allmänna form: mät mot något som finns kvar)

**A13–A15, beslutade 2026-10-08 efter att paket B lämnade tillbaka tre punkter:**

- **A13: `.hero`-blocket får ett eget paket K, och paket C rör det inte** — mitt
  eget beslut i A5 låg i inget pakets "Ingår", och byggaren gjorde rätt i att inte
  bygga utanför sitt paket. Jag lade det inte i C, eftersom en grind som mäter sitt
  eget bygge inte är en grind, och inte i ett återöppnat B, eftersom "paket B
  klart" då skulle betyda två saker beroende på datum. Felet är mitt: ett beslut i
  ARKITEKTUR.md utan ett paket är ett beslut som inte blir av. **Lärdomen framåt:
  varje CSS-block jag skriver ut ska namnge det paket som genomför det, i samma
  stycke.** (påverkat av lärdom: **ja** — 2026-10-02 "tre av sju bindande beslut i
  rättelselistan saknas i koden", och 2026-10-05 om grindar som fälls eller tiger
  av fel skäl)
- **A14: citattecknen i uppdragsfilen är avgränsare, inte innehåll** — svaret är
  nej för både ingressen och "Om mig", och det skrevs som en mekanisk regel
  (omslutande par = notation, inre tecken = innehåll) just för att nästa jämförelse
  ska vara en regel och inte en bedömning. Byggaren läste rätt; det saknade var ett
  beslut, inte en rättelse. (påverkat av lärdom: **ja** — 2026-10-05 "mät
  artefakten, inte deklarationen": en norm som kräver tolkning är ingen norm)
- **A15: Jelals texter står som namngivna konstanter, aldrig som JSX-literaler** —
  byggarens form behålls och blir regel, med namnen oförändrade. Skälet är
  mätbarhet: en tecken-för-tecken-jämförelse som bara når tre av fem strängar är
  samma felläge som en grind som mäter det lätta i stället för det den uttalar sig
  om. Ingen `EJ I ARKITEKTUR`-markering ska sättas på kodstruktur. (påverkat av
  lärdom: **ja** — 2026-10-05 ÅTERKOMMANDE om markeringen, och 2026-10-05 om att
  mäta artefakten)

**A16–A21, beslutade 2026-10-08 efter att paket D och K lämnade tillbaka sex
punkter:**

- **A16: höjdkvoten får en formel, nämnaren mäts, och bandet gäller bara från
  900 px** — jag hade skrivit kravet på två sätt (`(window.innerHeight - 64)` i
  mätserien, `676 / 900` i A13), och byggaren redovisade båda kvoterna i varje
  mätrad i stället för att välja. Det var rätt av byggaren och fel av mig: två
  kvoter intill varandra lämnar valet till läsaren. Rättelsen visade också att
  kravet **aldrig föll** vid mätseriens egen vyport — K:s rätta skäl är ett
  ogenomfört beslut, inte en fälld mätning, och mitt tal 0,75 är upphävt. Nämnaren
  mäts i stället för att skrivas, så att den inte kan driva isär från
  `--header-height`. (påverkat av lärdom: **ja** — 2026-10-02 "headerns höjd är
  definierad på två oberoende ställen", och 2026-10-05 "en invariant som bara står
  i prosa")
- **A17: stycket om nästlad struktur rättas på sin egen plats** — det skrev
  `filled: false` som bindande format och instruerade Jelal att byta `false` mot
  `true`, tre veckor efter att A2 tog bort fältet. Byggaren följde A2 och
  rapporterade motsägelsen i stället för att tolka den. Felet är mitt och av exakt
  den sort filen har tre poster om: ett nytt beslut måste ändra varje äldre stycke
  om samma sak i samma redigering. (påverkat av lärdom: **ja** — 2026-10-02 och
  2026-10-05 ÅTERFALL om överspelade stycken som står kvar)
- **A18: engångsjämförelsen görs mot repots fil, inte mot en scratchpad** — min
  formulering överlevde A12:s genomförande. En scratchpad-sökväg kan inte prövas om
  av granskaren, alltså kan den inte vara norm. (påverkat av lärdom: **ja** —
  2026-10-05 "mät artefakten", i formen: mät mot något som finns kvar)
- **A19: OK-raden är ett format och en upplysning, inte en sträng** — jag skrev ut
  en rad som inte gick att uppfylla tecken för tecken: teckentalet beräknas före
  `ACTIVE`-loopen och står därför först, `4 sektioner` saknades i min rad, och
  Om mig-delen hör till paket F. Byggaren flyttade inte `summary.push`, eftersom det
  låg utanför paketet — rätt. En utskriven exempelrad som beskriver en kodordning
  som inte finns är samma felläge som en kommentar som bär ett upphävt värde.
  (påverkat av lärdom: **ja** — 2026-10-02 om `GRIND:`/`UPPLYSNING:`, och
  2026-10-05 om att inte räkna fällda poster)
- **A20: `OPEN-KEY`-grinden bärs av ett paket efter LEVERANS, inte av D och inte av
  J** — grindens enda del med tänder kräver en rad i varje öppen markering, och
  hero-filerna får inte röras före beslutsrundan. Med noll nyckelord i projektet
  hade grinden dessutom tigit i varje körning och sett ut som ett skydd. Jag skriver
  ut alla tre delgrindarna, deras meddelanden och deras legitima fällningsfall, men
  **inget nyckelord** — ett nyckelord i detta dokument fäller grinden i samma stund
  markeringen får sin rad. (påverkat av lärdom: **ja** — 2026-10-05 ÅTERKOMMANDE om
  markeringen, och 2026-10-05 "en grind som fälls av fel skäl")
- **A21: en grupp utan `id` ger en rad med postens plats, och resten hoppas över** —
  byggarens lösning bekräftad. Varje id-nycklat meddelande bär då alltid ett
  verkligt id, gruppens kompetenser räknas inte i upplysningen, och skriptet staplar
  inga följdfel på en post som redan är fälld. Priset — namnen i den gruppen deltar
  inte i unikhetskontrollen den körningen — står utskrivet i stället för att
  förbigås. (påverkat av lärdom: **ja** — 2026-10-05 "en sektion utan `id` passerar
  tyst och räknas med i OK-raden")

### Beslutslogg — paket P1, moderniseringen 2026-11-07

- **M1: självhostade woff2, en variabel fil per familj, och teckengrinden per
  familj** — CDN hade tagit bort filen grinden mäter, lagt till ett externt anrop
  och gett render-blockerande CSS. Variabla filer eftersom statiska per vikt inte
  går att hämta utan ett nytt konverteringsverktyg. Grinden per familj eftersom
  unionen släpper igenom ett tecken som saknas i just den familj det renderas i.
  (påverkat av lärdom: **ja** — 2026-10-05 "mät artefakten, inte deklarationen",
  2026-10-05 "en grind som fälls av fel skäl", 2026-10-02 "namnge inget
  okontrollerat")
- **M2: `.surface-light` bort helt** — ~~designen är mörk rakt igenom~~ (**premissen
  UPPHÄVD 2026-11-08, se M23:** ljusa sektioner finns igen, med attributet
  `data-surface`), och en klass
  "för framtiden" är dött fält. (påverkat av lärdom: **ja** — 2026-10-08 "två
  kommentarer räknar upp en ombindning som togs bort": varje kommentar som nämner
  klassen skrivs om i samma ändring)
- **M3: uppdragets fältnamn, `logo` utgår, länkregeln och `isComplete` i
  `src/lib/`** — en regel på ett ställe, som valideringen och kortet läser
  gemensamt så att OK-raden räknar det som renderas. (påverkat av lärdom: **ja** —
  2026-10-05 "en sektion utan id räknas med i OK-raden", 2026-10-05 "ett löfte i
  en fil Jelal redigerar får aldrig vara osant")
- **M4: 4:3, vänsterförankrad beskärning, [600, 1200], lazy** — beskärningen är
  vald efter var Awles logga faktiskt ligger i källbilden, inte efter en
  standardregel. 1200 är det största källan ger. (påverkat av lärdom: **ja** —
  2026-10-02 "källbilder i `public/`", 2026-10-05 "mät artefakten")
- **M5: ersätt tokennamnen, alias inte** — två namn för samma sak är exakt den
  sortens glidning som tre lärdomar handlar om. Grinden utvidgas till varje custom
  property, så att varje kvarglömt gammalt namn fälls. (påverkat av lärdom:
  **ja** — 2026-10-08 ÅTERKOMMANDE, kommentarer om borttagna tokens, och
  2026-10-08 "tokennamnet är ingen motivering")
- **M6: `--header-height` härledd ur två token, sticky med `margin-top`** — en
  sanning för höjden, och hero behöver inte veta att naven svävar. (påverkat av
  lärdom: **ja** — 2026-10-02 "headerns höjd har två sanningar")
- **M8: hamburger under 900 px** — 2026-10-07 avfärdade jag den som för dyr för ett
  hypotetiskt problem. Uppdraget beställer den nu, och budgeten vid 600 px räcker
  inte för fyra länkar plus CTA. (påverkat av lärdom: nej)
- **M10: h1 som markerat förslag, inte som beslut** — texten är Jelals att ge.
  Bygget får inte stå still, men förslaget får inte se ut som ett beslut. (påverkat
  av lärdom: **ja** — 2026-10-02 "sidans enda h1", och projektets regel att inga
  texter om Jelal hittas på). **BESVARAD 2026-11-18:** Jelal godkände h1 ordagrant,
  och FÖRSLAG-märkningen tas bort ur `Hero.jsx`
- **M11: sökfältets kant `--line-strong` i stället för uppdragets `--line`** — en
  medveten avvikelse, eftersom uppdragets eget AA-krav fäller `--line`. (påverkat
  av lärdom: **ja** — 2026-10-08 "kontrast: tokennamnet är ingen motivering")
- **M12: döljandet villkoras på ett attribut som bara sätts när observern finns**
  — innehållet kan inte bli kvar osynligt i något felläge. (påverkat av lärdom:
  **ja** — 2026-10-05 "en invariant som bara står i prosa": P10 mäter det med
  observern borttagen)
- **M14: "Kompetenser" i stället för "Teknologier", och inget "år i branschen"** —
  etiketten ska säga vad som räknas, och ett påhittat tal är ett påstående om
  Jelal. (påverkat av lärdom: nej, projektets regel om texter om Jelal).
  **BESVARAD 2026-11-18:** Jelal valde att utelämna "år i branschen"
- **M16: kontakten vänds, och hCaptcha blir `compact`** — den nya sidmarginalen gör
  att den normala widgeten (302 px) inte ryms vid 360 px. Det upptäcktes när
  sidmarginalens följder räknades igenom, inte i uppdragstexten. (påverkat av
  lärdom: **ja** — 2026-10-02 ÅTERFALL "360 px-golvet spricker genom grid")
- **M17: Lighthouse via `npx`, inte devDependency** — minsta möjliga beroenden, och
  verktyget prövas i miljön innan något mäts. (påverkat av lärdom: **ja** —
  2026-10-02 "ARKITEKTUR.md beskrev verktyg som inte finns")
- **Märkningen gjordes på varje stycke, inte i ett rättelseavsnitt** — varje
  `###`, `####` och `#####` som nämner ett upphävt namn bär sin egen märkning.
  (påverkat av lärdom: **ja** — 2026-10-02 ÅTERFALL ×3 "överspelade stycken står
  kvar")

### Beslutslogg — efter P5 omgång 1 och P4, 2026-11-07

- **M10b: `section.hero[id] { padding-block: var(--space-6); }` i alla bredder** —
  `.hero` förlorade på specificitet mot `section[id]`, och `section.hero` vinner
  bara på buntordning. Från 900 px ger `min-height` och centreringen luften ändå.
  (påverkat av lärdom: **ja** — 2026-10-05 "en invariant som bara står i prosa":
  att regeln vinner ska följa av selektorn, inte av ordningen)
- **M10b: h1 `clamp(2.75rem, 11cqi, var(--text-3xl))` från 900 px, i containerenheter
  mot `.text`** — det är textspåret och inte vyporten som avgör radbrytningen, och
  spåret är smalast vid brytpunkten. Ett bredare textspår avvisades eftersom
  cirkeln då krymper vid brytpunkten (**premissen UPPHÄVD 2026-11-07, se M10c:
  ingen cirkel**). (påverkat av lärdom: **ja** — 2026-10-05
  "mät invarianten": mätserien utökas med 899, 1000, 1100 och 1200 × 700, där
  felet annars kunde gömma sig)
- **M10b punkt 2, rättad efter P5 omgång 2: `width: 100%` på `.inner` från 900 px,
  och en spårgrind `>= 300` från 900 px** — påståendet att inneslutningen var
  ofarlig var fel. `.inner` är ett griditem med auto-marginaler och krymper till
  innehållet, och med `inline-size` på `.text` blev spåret 0. Meningen är struken
  och rättelsen står på samma plats. (påverkat av lärdom: **ja** — 2026-10-02
  "360 px-golvet sprack igen, nu genom hero-gridden": varje gridnivå ovanför ett
  spår ska prövas, inte bara spåret. Och "överspelade stycken står kvar": M10:s
  block är rättat i samma ändring)
- **M10b punkt 2b: `.intro` behåller `font-size: var(--text-lg)`** — koden och A5
  steg 2 stämde, och det var M10:s block som saknade raden. (påverkat av lärdom:
  **ja** — 2026-10-05 "två bindande avståndsbeslut genomfördes med andra tokens":
  ett block som är bindande tecken för tecken måste vara fullständigt, annars
  ställs byggaren inför ett val mellan block och kod)
- **M10b punkt 3: `scrollbar-gutter: stable` på `html`, i P5 omgång 2** — låset
  tog bort den reserverade rullningslisten och stängknappen flyttade sig 15 px. En
  CSS-rad i stället för en kompensation i JS. Måtten i M18 är oförändrade.
  (påverkat av lärdom: **ja** — 2026-10-08: mät i det villkor där felet syns,
  alltså med reserverad rullningslist, och skriv ut villkoret)
- **M1: textstilarna sätts i JSX, `composes` utgår** — en varning i varje bygge som
  alla lär sig läsa förbi. (påverkat av lärdom: **ja** — 2026-10-05 "Grindar")
- **M1: `.meta` skapas i P5, inte P7** — rollraden är första konsumenten.
  Texten rättad där den stod. (påverkat av lärdom: **ja** — 2026-10-02 ÅTERFALL
  "överspelade stycken står kvar")
- **M7: hover i pillen blir understrykning i `--ink`** — orange på en genomskinlig
  pill över vitt innehåll gav 2,20:1. (påverkat av lärdom: **ja** — 2026-10-08
  "kontrast mäts mot den faktiska bakgrunden")
- **M8/M8b: efter länkklick fortsätter Tab i målsektionen; P4:s övriga markeringar
  godkända som byggda** — den som valde en sektion ska fortsätta där.
  ~~`profile-export-saknas` väntar på att P6 lämnar `validate-data.mjs`.~~
  **UPPHÄVT 2026-11-07, se R6:** genomförs i G1-rättningen. (påverkat av
  lärdom: **ja** — 2026-10-02 "godkända markeringar står kvar", ÅTERKOMMANDE)

### Beslutslogg — efter G1, 2026-11-07

- **R1: scroll-marginalen på `.item` (`<li>`), godkänd som byggd, och `index` i
  `ProjectCard` först i P10** — A4:s invariant är att ankarmålet får marginalen,
  och efter M4 är ankarmålet `<li>`, inte `.card`. Jag sökte på `.card {` i hela
  dokumentet och rättade den enda träff som gällde projektkortet. (påverkat av
  lärdom: **ja** — 2026-11-07 "A4:s deklaration pekar på fel element", ÅTERFALL:
  ett klassnamn i en deklaration är ett påstående om markupen, och en signatur
  anges med paketet där parametern får sin konsument)
- **R2: en grind för alla id på sidan, med listan härledd ur `*_ID`-exporterna i
  `sections.js`, och `cardIds(slug)` i `src/lib/`** — en lista som skrivs i
  valideringen hade blivit inaktuell vid nästa fasta id. Därför flyttar `MENU_ID`
  till `sections.js` och `ROOT_ID` läggs till. Kortets id-suffix står i en funktion
  som både kortet och valideringen läser. Skillgruppernas id ingår, eftersom de
  också är data som blir id. Avvisat: att läsa id ur JSX-källan med regex. Det är
  skört och fångar inte beräknade id. (påverkat av lärdom: **ja** — 2026-11-07
  "en slug som krockar med sidans egna id passerar", och 2026-10-02 "`hero` står
  skrivet på tre ställen": ett id står på ett ställe)
- **R2: dubbla tekniker fälls, jämförda utan skiftläge** — listan blir React-nycklar
  och filterchips. `Zod` och `zod` är samma teknik för en läsare. (påverkat av
  lärdom: **ja** — 2026-11-07, "varje lista vars element blir en React-nyckel ska ha
  en unikhetsgrind")
- **R3: brickan är en rad med ellips, `display: block` och `padding-block: 9px`**
  — fast höjd med data i kräver ett angivet överflöde. Ellipsen ritas inte i en
  flexcontainer, därför `block`. Golvet mäts mot `.media` och med
  `scrollHeight <= clientHeight`, eftersom `scrollWidth` på brickan är större än
  `clientWidth` med avsikt. (påverkat av lärdom: **ja** — 2026-11-07 "logo-brickans
  fasta höjd")
- **R4: layoutgrinden mäter `getBoundingClientRect().width` på roten, `#projects`
  och panelen, inte rotens `clientWidth`** — `clientWidth` beskriver
  rullningslisten och faller med `overflow: hidden` fast layouten står still.
  Talen i grindarna är G1:s mätning. Talen för den negativa kontrollen är
  **inte** uppmätta, och det står vid dem. (påverkat av lärdom: **ja** — 2026-11-07
  "grinden larmar av fel skäl": en förväntad siffra skrivs in först när den är
  mätt, och 2026-10-08 "Ett larm är inte ett kvitto")
- **R5: de sex tokens tas bort nu och kommer tillbaka i P9, P10 och P12, utom
  `--space-9`. Tokengrinden fäller en deklaration utan konsument (M5h)** — M1:s
  princip om döda fält gäller tokens. Avvisat: att låta dem stå med en kommentar om
  framtiden, eftersom det är exakt det påstående om nuläget som var fel. Grinden
  byggs före borttagningen så att den visar att den hittar just de sex. (påverkat
  av lärdom: **ja** — 2026-11-07 "sex tokens utan konsument", och 2026-10-05 "en
  invariant som bara står i prosa")
- **R6: M8b:s form gäller alla fem exportmarkeringar, och alla genomförs i
  G1-rättningen** — de fyra stod redan i samma form. Att ge profile ett eget
  villkor var det som lät den bli kvar. (påverkat av lärdom: **ja** — 2026-11-07
  "`profile-export-saknas` står kvar": ett uppskjutet genomförande ska ha ett
  namngivet paket)

### Beslutslogg — M10c, heros bild, 2026-11-07

- **Porträttet är heros bakgrund och profilbild, och cirkeln, strecket,
  tonplattan och bildspåret utgår** — Jelals besked. Varje äldre stycke om
  cirkeln är märkt på sin egen rubrik, och tabellen över förbjudna strängar har
  fått elva rader. (påverkat av lärdom: **ja** — 2026-10-02 ÅTERFALL ×3
  "överspelade stycken står kvar")
- **Från 900 px täcker bilden högra 70 %, inte full bredd** — ansiktet sitter mitt
  i en 16:9-bild, och med full bredd hade texten fått sluta vid ca 38 %. Lådan
  till höger ger bilden spelrum i sidled, och toningen döljer skarven. Talen är
  uträknade, och rad 8 mäter dem. (påverkat av lärdom: **ja** — 2026-10-05 "mät
  invarianten": ansiktets läge är en grind, inte en beskrivning)
- **Gråskalan i bildskriptet, inte i CSS** — en bild som alltid ska vara svartvit
  hämtas inte i färg. Skälet till CSS-filtret (justera tonen efter Leverans 1) är
  förbrukat. (påverkat av lärdom: nej)
- **`optimize-images.mjs` behålls och profildelen byts mot heros** — ikondelen
  lever, och ett tredje bildskript hade dubblerat skyddsräcket och kökedjan.
  (påverkat av lärdom: **ja** — 2026-10-02 "parallell dubblering" och "grindar
  efter skrivning")
- **UPPHÄVT 2026-11-07, se M10d (`178vw`):** **`sizes` är `'(min-width: 900px) 100vw, 300vw'`** — `cover` ritar bilden efter
  höjden, alltså bredare än lådan. Lådans bredd i `sizes` hade gett en suddig bild
  på mobil. (påverkat av lärdom: **ja** — 2026-10-05 "mät artefakten, inte
  deklarationen")
- **Preload i `index.html` med samma `imagesrcset`/`imagesizes` som bilden** —
  sidan är klientrenderad, så bilden upptäcks annars först efter JavaScript.
  (**Skälet UPPHÄVT 2026-11-08, se M21 punkt 5:** sidan förrenderas. Preloaden
  behålls och kravet "hämtas exakt en gång" gäller.)
  Strängen står på två ställen, och därför grindar rad 9 på att bilden hämtas
  exakt en gång. (påverkat av lärdom: **ja** — 2026-10-02 "`hero` står skrivet på
  tre ställen": går dubbleringen inte att undvika ska den mätas)
- **Kontrasten mäts mot den ljusaste pixeln bakom varje textrad, med texten
  dold** — inte mot `--bg`. Toningens alfa får höjas i steg enligt en angiven
  ordning, och därefter kommer frågan tillbaka hit. (påverkat av lärdom: **ja** —
  2026-10-08 "footerns text faller på AA": kvoten mäts mot den faktiska
  bakgrunden)
- **`--overlay-grey` tas bort i samma paket som dess konsument** (påverkat av
  lärdom: **ja** — 2026-11-07 "sex tokens utan konsument")
- **`<noscript>`-kommentaren skrivs om till invarianten, och `grep` på
  `tredje global` och `global klass` körs mot `index.html`** (påverkat av lärdom:
  **ja** — 2026-11-07 "`index.html` hävdar fortfarande", ÅTERFALL)

### Beslutslogg — M10d, bilden överst på mobil, 2026-11-07

- **Under 900 px är bilden ett block i flödet, och texten står på `--bg`** —
  Jelals beslut. M10c:s toning tog slut vid 95 % utan att rollraden klarade AA,
  så kontrasten kan inte lösas med alfa. (påverkat av lärdom: **ja** — 2026-10-08
  "footerns text faller på AA": kvoten mot den faktiska botten, nu `--bg`)
- **Kvadratisk låda med tak på `60svh`, `object-position: 53% 0%`** — visar hela
  huvudet utan att bilden blir högre än skärmen. Talen är uträknade, och rad 8d och
  1d grindar dem. (påverkat av lärdom: **ja** — 2026-10-05 "mät invarianten")
- **Uttoningen med `mask-image`, inte ett omslag** — ingen färg utanför
  `tokens.css`, och `section#hero > div` förblir exakt ett element. (påverkat av
  lärdom: **ja** — 2026-10-05 "ett larm är inte ett kvitto": M10b:s negativa
  kontroll ska fortsätta träffa rätt element)
- **Bilden först i DOM, inte `order`** — `order` verkar inte i ett block, och
  läsordningen ska vara den visuella. (påverkat av lärdom: nej)
- **`sizes` `178vw` under 900 px, inte `100vw`** — invarianten "den ritade
  bredden" står kvar från M10c. `cover` ritar som mest 1,777 lådbredder.
  (påverkat av lärdom: **ja** — 2026-10-05 "mät artefakten, inte deklarationen")
- **`loading="eager"` i stället för `!== 'lazy'`** — grinden ska kunna larma när
  avsikten försvinner. (påverkat av lärdom: **ja** — 2026-10-05 "varje grind prövas
  med tre indata")
- **Knappkravet under 900 px ersätts av rubrikens överkant i första skärmen** —
  Jelal har släppt knapparna. Ett krav finns kvar så att bildens höjd inte kan
  växa förbi skärmen i tysthet. (påverkat av lärdom: **ja** — 2026-10-05 "en
  invariant som bara står i prosa")
- **Rad 12d mäter att ingenting ändrats från 900 px, före och efter** — basreglerna
  skrivs om, och då ska det oförändrade beläggas och inte antas. (påverkat av
  lärdom: **ja** — 2026-11-07 "förväntad mätsiffra ska ha mätts")
- **Äldre stycken märkta i samma redigering:** M10c:s tabellrader 2, 5, 6, 7, 9 och
  12, "Smal skärm", CSS- och JSX-blocken, preloaden, mätseriens rad 1, 2, 7, 8, 9,
  "Om rad 7 faller" och negativ kontroll 1, A5:s mätserie, A16 del 2, "Vad som får
  vika", M10b:s mätserie, profilbildens placering, tabellen över förbjudna
  strängar, M10c:s `sizes`-logg, den öppna frågan och komponenttabellen.
  (påverkat av lärdom: **ja** — 2026-10-02 "överspelade stycken står kvar",
  ÅTERKOMMANDE)

### Beslutslogg — M11b, filtrets markeringar efter P8 och P9, 2026-11-07

- **Byggarens lösningar godkänns som de står, och deklarationerna skrivs in i M11:s
  CSS-block** så att koden och dokumentet säger samma sak tecken för tecken
  (påverkat av lärdom: **ja**, 2026-10-05 "två avståndsbeslut med andra tokens")
- **Följdpaketet P9b körs efter P10, och P10 rör inte markeringarna** eftersom
  båda ändrar `Projects.jsx` samtidigt. Uppskjutningen måste stå i `Ingår:` för
  P9b i `PLAN.md`, och den raden skriver projektledaren (påverkat av lärdom:
  **ja**, 2026-11-07 "`profile-export-saknas` står kvar": en uppskjutning utan
  ägare)
- **Tab räcker i segmentkontrollen.** En knappgrupp med `aria-pressed` förväntar
  inga piltangenter, och roving tabindex är kod utan beställare (påverkat av
  lärdom: nej)
- ~~**Klick på valt segment anropar inte `onChange`**~~ — **UPPHÄVT 2026-11-07, se
  M12b punkt 5:** villkoret på mängden slugs i `Projects.jsx` bär invarianten för
  alla filterändringar, och vakten i `ProjectFilter.jsx` utgår (påverkat av lärdom: nej)
- **Fokus efter "Rensa filter" går till "Alla" via en ref**, och inte till
  sökfältet, eftersom fokus på ett inmatningsfält öppnar tangentbordet på mobil.
  Ett id via `getElementById` väljs bort: en ref är Reacts väg, och det hade
  krävt ännu en `*_ID` bara för fokus (påverkat av lärdom: **ja**, R2 "varje fast
  id är en `*_ID`-export": ingen ny id-källa skapas)
- **Ingen inslagning för sökfältets ordning.** DOM-ordningen är redan den visuella
  ordningen (påverkat av lärdom: nej)
- **Sökfältets kant förblir `--line-strong`** av WCAG 1.4.11 (påverkat av lärdom:
  nej)

### Beslutslogg — M12b, fynden från P10, 2026-11-07

- **Ankarmål tonas bara i opacitet (c), inte med omslag (a) eller JS-scroll (b).**
  Det är en CSS-ändring som lämnar id:t, `cardIds`, R2-grinden och `.item`:s
  scroll-marginal orörda. (b) bryter "ingen JS-scrollhanterare". Grinden mäter
  invarianten för varje länk på sidan, inte bara `#awle` (påverkat av lärdom:
  **ja**, 2026-10-05 "en invariant som bara står i prosa", och 2026-11-07 "A4:s
  deklaration pekar på fel element": `.item` flyttas inte en gång till)
- **Headern utan observer markerar ingenting** i stället för att få en reservlösning
  på scroll. Skyddet finns för att sidan inte ska krascha (påverkat av lärdom: nej)
- **`enableReveal` flyttar till `main.jsx`, inte till `src/lib/`.** Inga
  lintundantag, och `lib/` förblir fri från DOM (påverkat av lärdom: **ja**,
  2026-11-07 "`profile-export-saknas` står kvar": `reveal-lint-export` besvaras
  och tas bort i ett namngivet paket, P9b)
- **Live-raden räknar `displayed`.** Siffran ska beskriva det som syns (påverkat
  av lärdom: nej)
- **En fas startar bara när mängden slugs ändras, och M11b punkt 4:s vakt utgår.**
  Två mekanismer för samma invariant gör den ena omöjlig att få att larma
  (påverkat av lärdom: **ja**, 2026-10-05 "vaktraderna går inte att få att larma")
- **P9b och M12b blir ett paket** eftersom båda ändrar `Projects.jsx`. Raden i
  `PLAN.md` skrivs av projektledaren (påverkat av lärdom: **ja**, 2026-11-07
  "uppskjutet beslut utan ägare")
- **Äldre stycken rättade i samma redigering:** M7, M11 live-raden, M11b punkt 4
  och P9b-tabellen, M12, M4:s markup, A4, komponenttabellen, Mappstruktur,
  översiktstabellen och tabellen över förbjudna strängar (påverkat av lärdom:
  **ja**, 2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M15b, fynden från P11, 2026-11-07

- **`--space-1` godkänns som borttaget, och dokumentet rättas, inte koden.**
  Grinden gjorde sitt jobb (påverkat av lärdom: **ja**, 2026-11-07 "sex tokens
  utan konsument": ett token lever bara så länge det har en konsument)
- **`.label` får `--space-3`, godkänt som byggt** (påverkat av lärdom: **ja**,
  2026-10-05 "två avståndsbeslut genomfördes med andra tokens": värdet står nu
  utskrivet i M13 som deklaration)
- **Vikten sätts i `.meta` och `.tag`, inte i `.cardTitle` och inte som en ny
  fil.** Modulklassen får inte röra en typklassegenskap, och en ny vikt kostar
  bytes och en fil till för teckengrinden (påverkat av lärdom: **ja**, M1:s
  invariant om buntordning, och 2026-10-05 "en invariant som bara står i prosa":
  provet i P11b mäter vikten på varje mono-element och har ett negativt prov)
- **Versalerna i tillgänglighetsträdet godtas.** G2 lyssnar på dem (påverkat av
  lärdom: nej)
- **Nämnaren förblir `sections.length`.** En andra kopia av spärren skulle ge två
  uttryck för samma regel (påverkat av lärdom: **ja**, 2026-10-02 "`hero` står
  skrivet på tre ställen")
- **P11b är ett eget paket före G2, och raden i `PLAN.md` skrivs av
  projektledaren** (påverkat av lärdom: **ja**, 2026-11-07 "uppskjutet beslut
  utan ägare")
- **Äldre stycken rättade i samma redigering:** M1:s typklassblock, M5 under
  tokenblocket, Spacing-tabellen, A6:s inledande ruta, översiktstabellen och
  tabellen över förbjudna strängar (påverkat av lärdom: **ja**, 2026-10-02
  "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M14b, punkterna från P12, 2026-11-07

- **Kompetensurvalet lyfts till `renderedSkillGroups` i `src/lib/skillRules.js`.**
  Två kopior av samma filter glider isär så fort den ena ändras (påverkat av lärdom:
  **ja**, 2026-10-02 "`hero` står skrivet på tre ställen" och "headerns höjd är
  definierad på två oberoende ställen")
- **Talet är summan av renderade chips, inte antalet unika namn.** Det är chipsen
  talet påstår sig räkna, och unikheten är en annan grinds sak (`validate-data.mjs`)
- **Grinden jämför DOM mot DOM och har ett negativt prov.** Ingen ändring i
  Jelals data får fälla den (påverkat av lärdom: **ja**, 2026-10-05 "en grind som
  fälls av fel skäl", "ett larm är inte ett kvitto" och "en invariant som bara står i
  prosa")
- **De tre avstånden och radhöjden godkänns som byggda.** Markeringarna tas bort i
  P12b (påverkat av lärdom: **ja**, 2026-10-05 "markeringar står kvar på frågor
  arkitekturen avgjort", ÅTERFALL)
- **Ett tal som är 0 döljs, och en tom rad renderar ingen `<dl>`** (påverkat av
  lärdom: **ja**, 2026-10-02 "rendera inget element hellre än ett tomt")
- **Versalerna i `dt` godtas**, som M15b punkt 4 (påverkat av lärdom: nej)
- **P12b är ett eget paket efter P13 och före G2.** Filerna överlappar inte P13,
  men ett paket i taget gäller. Raden i `PLAN.md` skrivs av projektledaren
  (påverkat av lärdom: **ja**, 2026-10-05 "arbetsträdet var inte fryst under
  granskningen", och 2026-11-07 "uppskjutet beslut utan ägare")
- **Äldre stycken rättade i samma redigering:** M14:s räkneregel, översiktstabellen,
  komponenttabellen och Mappstruktur (påverkat av lärdom: **ja**, 2026-10-02
  "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M19, sista öppna punkterna före G2, 2026-11-07

- **Footerns "Kontakt" är ett `p` med `.meta`, ingen rubrik och ingen `nav`.** Två
  rubriker "Kontakt" i rubriklistan leder till samma länkar (påverkat av lärdom:
  **ja**, 2026-10-02 "sidans enda `<h1>` lyder Start": en rubrik ska namnge det den
  står över)
- **E-posten visas som adressen, inte som "Mejl".** Ordet var påhittat och
  oflaggat (påverkat av lärdom: **ja**, 2026-10-02 "beslut som saknas uppfinns i
  koden")
- **`rel="noopener noreferrer"` och "(öppnas i ny flik)" på varje extern länk.** Ett
  mönster, M4:s, i stället för två (påverkat av lärdom: nej)
- **Tio markeringar och knappens dämpade läge godkända som byggda.** Inga nya värden
  införs före slutkontrollen (påverkat av lärdom: **ja**, 2026-10-05 "markeringar
  står kvar på frågor arkitekturen avgjort", ÅTERKOMMANDE, och 2026-11-07
  `profile-export-saknas`: varje nyckel står nu här, så varje markering är besvarad)
- **Sju kommentarer med uppmätta tal skrivs om, kontrastkvoterna står kvar.**
  Kvoterna är vad lärdomen 2026-10-08 kräver (påverkat av lärdom: **ja**, 2026-10-02
  "kodkommentaren bevarar en mätning", 2026-11-07 "moderniseringen gjorde fem
  kommentarer falska", ÅTERKOMMANDE)
- **Allt i ett paket, P14b, före P15.** P15 bygger ingenting, så städningen kan inte
  ligga där (påverkat av lärdom: **ja**, 2026-11-07 "uppskjutet beslut utan ägare")
- **Äldre stycken rättade i samma redigering:** M16 (kontakt och footer),
  M-översikten, "Markeringarna från före P2", R6, M3:s länkattribut, A4 och
  komponenttabellen, plus tre rader i tabellen över förbjudna strängar (påverkat av
  lärdom: **ja**, 2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M20, ny logga, 2026-11-07

- **PNG med alfa, inte webp.** Förlustfri färg gör att rutans grind mäter källan och
  inte kodaren; inget nytt beroende (påverkat av lärdom: nej)
- **Tre höjder, 34/68/102, med `1x/2x/3x` och inget `sizes`.** Fast CSS-höjd gör
  x-deskriptorer exakta; `sizes` var en följd av breddeskriptorer och försvinner
  med dem (påverkat av lärdom: nej)
- **Testets transparens, men ändpunkterna är bottnens och textens uppmätta
  luminans.** Med 245 fick varje bottenpixel alfa 1 (påverkat av lärdom: **ja**,
  2026-10-05 "en grind som fälls av fel skäl": grind L7 hade fallit på korrekt utdata)
- **Färgerna läses ur `tokens.css`, och ordmärkets RGB återställs efter `resize()`.**
  Den gamla ikonen bar en egen accent (`#FC6F03`) som gled från tokenet (påverkat av
  lärdom: **ja**, 2026-10-02 "definierad på två oberoende ställen")
- **Källgrindar på varje uppmätt läge (S1–S5) innan något genereras.** Talen är
  samordnarens, inte mina (påverkat av lärdom: **ja**, 2026-10-02 "inget namnges
  okontrollerat" och 2026-11-07 "mät innan en siffra skrivs in")
- **Funktioner i stället för upprepade kontroller** (`checkPng`, `modeRgb`,
  `distinctVisibleRgb`, `readTokenHex`) (påverkat av lärdom: **ja**, 2026-10-02
  "parallell dubblering")
- **Favicon och apple-touch-icon opaka och utan luft.** iOS rundar hörnen själv och
  fyller genomskinligt med svart, och "JQ" ligger 14 % in (påverkat av lärdom: nej)
- **`alt="Jelal Qaiumi"`, ingen dold text, ingen `aria-label`.** Bild av text får
  textens alt, och en andra bärare hade läst namnet två gånger (påverkat av lärdom:
  **ja**, 2026-10-02 "logga-länken": länken ska ha exakt ett namn)
- **Inget token för 34 px.** Talet är bundet till de genererade filerna (påverkat av
  lärdom: **ja**, 2026-11-07 "token deklareras med sin konsument": ett token hade
  sett ut att gå att ändra ensamt)
- **Naven behåller sin låsta höjd, och 360 px mäts mot pillens content-box.**
  Uträknat 48 px luft, mätt i P14c (påverkat av lärdom: **ja**, 2026-10-02
  "headerns höjd" och "mät mot den egna behållaren")
- **Taglinen står kvar.** Den säger rollen, loggan säger namnet (påverkat av lärdom:
  nej)
- **`logo.png` och de fem `logo-mark`-filerna tas bort, nya namn med `jq-`.** Så går
  bytet att grinda med en sökning (påverkat av lärdom: **ja**, 2026-10-02
  "`dist/` levererar oanvända bilder")
- **Formulärtexterna rättade på plats, och P14b:s grind 3 rättad.** Den hade fällts
  av Jelals egen etikett "Mejl" (påverkat av lärdom: **ja**, 2026-10-05 "en grind som
  fälls av fel skäl")
- **Äldre stycken märkta på sina egna rubriker:** "Headerns logotyp" och varje
  underavsnitt, M10c:s skriptdel och rad 14, M16, M19 punkt 12 och grind 3,
  mappstrukturen, källbildstabellen, "Accentfärg — mätning", "Bekräftat från
  paket 1", rättelsetabellen, "Vad som INTE görs i bildskriptet", Öppen punkt 5,
  underlagsraden och tabellen över förbjudna strängar (påverkat av lärdom: **ja**,
  2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M20 rättad efter byggarens mätning, 2026-11-08

- **Källtabellen, konstanterna och S2–S5 rättade på plats, gamla lydelser
  överstrukna.** Stickprovet var aldrig uppmätt, och P14c stoppades vid S2 (påverkat
  av lärdom: **ja**, 2026-11-07 "mät innan en siffra skrivs in", och 2026-10-02
  "överspelade stycken står kvar")
- **S2 prövar rad 1–772, och varje uttag ska ligga där.** Rad 0 och 773 läses inte av
  någon grind eller något uttag (påverkat av lärdom: **ja**, 2026-10-05 "en grind som
  fälls av fel skäl")
- **Uttaget börjar på rutans rena yta, `LOGO_CROP` x 219–1783, y 220–553.** Kantpixlarna
  varken behålls eller får alfa: de hamnar utanför uttaget och är under 0,13
  utdatapixel. Kanten blir skarp utan blek ram, och bredderna blir oförändrade 159,
  319 och 478 (påverkat av lärdom: nej)
- **Ikonerna ur `ICON_CROP` x 220–553, y 220–553, och I4 prövar alla fyra hörnen.**
  Ett hörn hade bara bevisat två av fyra kanter (påverkat av lärdom: nej)
- **S5 mäter kantringen mot linjen botten–accent, och S6 är det gamla mellanrumsprovet.**
  Med S3 och S4 bevisar det att kanten är högst 1 px (påverkat av lärdom: nej)
- **L5: rektangeln ändras, kärnan behålls.** Fallet var lanczos3:s lob vid en verklig
  kant. Att byta kärna hade mjukat upp ordmärket, och alfa efter skalningen krockar
  med "JQ" i rutan (påverkat av lärdom: **ja**, 2026-10-05 "en grind som fälls av fel
  skäl")
- **Grundkörningen före de negativa kontrollerna, och ett fall i den lämnas tillbaka.**
  (påverkat av lärdom: **ja**, 2026-10-05 "korrekt indata ska tiga")
- **Byggarens tillägg godkända:** skip-länkens kommentar i `global.css`, `pixelAt()`,
  `rgbText()` och `sourceUntouched` för båda källorna (påverkat av lärdom: **ja**,
  2026-11-07 "falsk kommentar" och 2026-10-02 "parallell dubblering")

### Beslutslogg — M21, prestanda före G2, 2026-11-08

- **ARKITEKTUR.md ändras under P15.** `PLAN.md` fryser dokumentet under P15, men
  P15 del A föll, och enligt P15 går fyndet då tillbaka. Samordnaren bad om M21
  (påverkat av lärdom: **ja**, 2026-11-07 "uppskjutet beslut utan ägare": stegen
  har ett namngivet paket, P15-fix)
- **Fem körningar och medianen. Accessibility ska vara 100 i alla fem.** Med tre
  körningar och spridningen 78–97 räckte en avvikande körning (påverkat av lärdom:
  **ja**, 2026-10-05 "ett larm är inte ett kvitto": ett mått som en enda körning
  kan välta är inget kvitto)
- **hCaptcha laddas med `lazy` och monteras via `IntersectionObserver` eller vid
  fokus.** `loadAsync` skjuter inte upp något, enligt paketets källkod (påverkat
  av lärdom: **ja**, 2026-10-02 "inget namnges okontrollerat": propen lästes i
  källan innan den valdes bort)
- **`.catch` till en tom komponent i `lazy`.** Utan felgräns hade en chunk som
  inte går att ladda rivit hela sidan. Utfallet blir detsamma som när `api.js`
  inte går att ladda i dag (påverkat av lärdom: nej)
- **Utan observer köas `wantCaptcha` med `queueMicrotask`, inget lat startvärde.**
  Ett startvärde ur `window` ger `false` på servern och `true` i en klient utan
  observer, alltså en skillnad vid hydreringen (påverkat av lärdom: **ja**,
  2026-11-07 M12b punkt 3: ingen avstängd lintregel, så formen ändras i stället)
- **Captchans plats reserveras med en uppmätt höjd.** "Kontakta mig" hoppar rakt
  dit, och widgeten hade knuffat knappen medan den syns (påverkat av lärdom:
  **ja**, 2026-11-07 "mät innan en siffra skrivs in": H mäts i P15-fix och inte
  av mig)
- **`sizes` får `calc(100vw - 3rem)`, och ingen ny bildbredd.** Rättelsen gäller
  den bredd som faktiskt mäts. 600 väljs vid 360 px men inte i Lighthouse-läget,
  och det står uttryckligen (påverkat av lärdom: **ja**, 2026-10-05 "mät
  artefakten, inte deklarationen")
- **`description` är heros ingress plus namn och roll, märkt som FÖRSLAG**
  (påverkat av lärdom: **ja**, 2026-10-02 "rubriken lyder Start": ingen text
  hittas på, och en härledd text flaggas). **BESVARAD 2026-11-18:** Jelal godkände
  texten ordagrant, och märkningen tas bort i P19c (M24 punkt 8)
- **RÄTTAT 2026-11-18:** ~~**`robots.txt` är det enda undantaget från "ingen orefererad fil i `dist/`".**~~
  **Se M24 punkt 6:** `robots.txt` är fortfarande undantaget,
  men referenskällorna är fyra, och robots.txt har en Sitemap-rad (M24 punkt 5).
  Regeln i LARDOMAR bör skrivas om av sin ägare (påverkat av lärdom: **ja**,
  2026-10-05 "en bindande regel får aldrig bli inaktuell i tysthet")
- **Förrendering med `renderToString` och Vites SSR-bygge, och `hydrateRoot`.**
  Orsaken till LCP är den tomma roten, och verktygen finns redan. En handskriven
  kopia av hero hade haft hashade klassnamn som går isär med koden (påverkat av
  lärdom: **ja**, 2026-10-02 "definierad på två oberoende ställen")
- **Förrenderingen görs alltid, inte bara om steg 1–2 inte räcker.** Den angriper
  orsaken (74–80 % render delay), och en median strax över 90 med spridningen
  78–97 går inte att upprepa (påverkat av lärdom: nej)
- **G3 jämför klassnamnen i den förrenderade markupen med bygget CSS.** SSR- och
  klientbygget kan hasha olika, och det märks inte förrän i webbläsaren (påverkat
  av lärdom: **ja**, 2026-10-05 "mät artefakten, inte deklarationen")
- **Utdata skrivs till `node_modules/.cache/prerender` och flyttas sist.**
  (påverkat av lärdom: **ja**, 2026-10-02 "skriptet kontrollerar efter att filerna
  redan är skrivna")
- **`split` och inte `String.replace`.** `$` i den renderade texten hade tolkats
  som mönster (påverkat av lärdom: nej)
- **`enableReveal` stannar i `main.jsx`.** Ett inline-skript i `<head>` hade dolt
  allt under hero för alltid om bundlen inte går att ladda. Risken för blink mäts
  i 5e i stället för att antas (påverkat av lärdom: **ja**, 2026-10-05 "en
  invariant som bara står i prosa")
- **`<noscript>`-texten skrivs om.** Det gamla löftet "sidan visas inte" blir falskt
  (påverkat av lärdom: **ja**, 2026-10-05 "ett löfte i en fil får aldrig vara osant")
- **Ingen inlinad CSS nu.** Den är nästa kandidat bara om mätningen kräver det
  (påverkat av lärdom: nej. Planen: bygg inte för framtiden)
- **Äldre stycken rättade i samma redigering:** M17, M-översikten, M4:s `sizes`
  och dess LCP-mening, M12 och M12b punkt 3 ("före `createRoot`"), komponenttabellen,
  mappstrukturen, Teknikval, "Leveransens storlek", M20 rad 14, `<noscript>` i "Tre
  noteringar", M10c:s preloadskäl i beslutsloggen, och sex rader i tabellen över
  förbjudna strängar (påverkat av lärdom: **ja**, 2026-10-02 "överspelade stycken
  står kvar", ÅTERKOMMANDE)

### Beslutslogg — M22, rättningar efter G2, 2026-11-08

- **5c samlar `Runtime.exceptionThrown` och matchar produktionsnumren, och 0
  okastade fel är ett eget villkor.** React 19 rapporterar avvikelsen med
  `reportError` i produktion, och den gamla grinden tystnade just där (påverkat av
  lärdom: **ja**, 2026-11-08 "M21 5c kan inte larma", ÅTERFALL)
- **5c:s negativa kontroll körs mot en kopia av `dist/` med ändrad `h1`, och
  utdata sparas med sökväg.** Det fanns inget underlag för den förra kontrollen
  (påverkat av lärdom: **ja**, 2026-11-08 samma post, och 2026-10-05 "varje
  kontroll ska bevisas kunna fallera")
- **Breddgrinden räknas ur ~~`naturalWidth / naturalHeight`~~ (RÄTTAT 2026-11-08:
  filens verkliga pixelmått, se nedan) för den laddade filen, vid DPR 1 och 2.** Ett fast tal passerade vid DPR 2 bara med likhet. En
  tolerans per DPR hade behövt skrivas om för varje ny fil (påverkat av lärdom:
  **ja**, 2026-11-08 "en rättad grind står orättad")
- **"63 px" ersätts med det uppmätta 48 på sin plats, och "uträknat" står kvar
  bara där inget är mätt (390 px).** (påverkat av lärdom: **ja**, 2026-11-08 samma
  post: ett uträknat tal ersätts med mätvärdet så snart paketet har överlämnats)
- **Honeypoten läses ur DOM och stoppar inskicket tyst med samma tack som ett
  lyckat inskick. `botcheck` tas bort ur kroppen.** Hur Web3Forms tolkar ett
  JSON-booleskt värde är inte prövat, och ett stopp i klienten drar inte av på
  månadstaket. Ett fält som alltid är falskt hade åter varit en konstant
  (påverkat av lärdom: **ja**, 2026-11-08 "honeypot-fältet läses aldrig")
- **Honeypotens prov har en negativ kontroll före ändringen (H0).** Utan H0 hade 0
  begäranden i H2 kunnat bero på att provet inte ser några alls (påverkat av
  lärdom: **ja**, 2026-10-05 "ett larm är inte ett kvitto")
- **`.gitattributes` gäller `robots.txt` och binärfilerna, inte hela repot.** En
  `* text=auto` hade krävt en omnormalisering av befintliga filer utan att något
  krav kräver det (påverkat av lärdom: **ja**, 2026-11-08 "`robots.txt` blir CRLF".
  Planen: bygg inte för framtiden)
- **Radslutet verifieras genom en ny utcheckning i en klon med
  `core.autocrlf=true`, med och utan filen.** Arbetsträdet visar LF bara för att
  filen aldrig checkats ut på nytt (påverkat av lärdom: **ja**, samma post)
- **Preloadens bredder grindas i `validate-data.mjs`, inte i `prerender.mjs`, och
  inte bara med en uppräkning i kommentaren.** Felet ska stoppa bygget innan något
  byggs, och en kommentar larmar inte (påverkat av lärdom: **ja**, 2026-11-08
  "`profile.js` lovar 'ändra bara här'", och 2026-10-02 "definierad på två
  oberoende ställen")
- **`imagesizes` och `width`/`height` ingår inte i grinden.** `imagesizes` står i
  JSX som ett Node-skript inte kan läsa, och `width`/`height` är källans format
  och inte en bredd ur listan. Kommentarerna i `index.html` och `Hero.jsx` säger
  att `imagesizes` inte kontrolleras (påverkat av
  lärdom: **ja**, 2026-10-05 "ett löfte i en fil får aldrig vara osant")
- **Brytpunktslistan anger avsikt och räknar inte upp moduler.** "Större
  hero-typografi" vid 600 var falskt sedan rubriken fick `clamp()`, och en ny
  uppräkning hade blivit fel på samma sätt (påverkat av lärdom: **ja**, 2026-11-08
  "sex kommentarer", ÅTERKOMMANDE: en uppräkning av något i andra filer skrivs om
  till invarianten)
- **Äldre stycken rättade i samma redigering:** "Brytpunkter", M-översikten, M10c:s kommentar i
  `profile.js`, M20-tabellens rad 3, M20 punkt 3:s uträkning, M20 grind 7, M21 punkt 4,
  M21 punkt 5:s riskmening, M21 5c, "Skräppostskydd: honeypot", formulärets
  "Verifiering" och mappstrukturen (påverkat av lärdom: **ja**, 2026-10-02
  "överspelade stycken står kvar", ÅTERKOMMANDE)
- **RÄTTAT 2026-11-08, efter byggarens mätning. 5c blockerar bara `*web3forms*`,
  och körningen är ogiltig om hCaptchas `api.js` inte laddades.** Blockeringen av
  hCaptcha skapade själv det `console.error` som fällde grinden, på korrekt kod.
  Ett undantag för just den posten hade varit att dokumentera ett falsklarm i
  stället för att bygga om grinden. Den negativa kontrollen ger fortfarande #418
  (påverkat av lärdom: **ja**, 2026-10-05 "en grind som fälls av fel skäl lär oss
  att ignorera den")
- **RÄTTAT 2026-11-08. Breddgrinden läser filens mått ur en `new Image()` utan
  `srcset`.** Påståendet att kvoten är densamma vid DPR 2 var falskt: Chrome
  avrundar `naturalWidth` till 159 (319/2), och felet blev exakt 0,5. En vidgad
  tolerans hade bara gömt avrundningen (påverkat av lärdom: **ja**, 2026-11-07 "mät
  förväntad siffra i sitt villkor innan den skrivs in")
- **RÄTTAT 2026-11-08. Grind 7:s grep gäller bara heros tre filer.** Träffen i
  `projects.js` är ett annat löfte, prövat sant. En grind som fäller ett sant
  löfte hade fällts av fel skäl (påverkat av lärdom: **ja**, 2026-10-05 samma post)

### Beslutslogg — M23, ljusa sektioner efter loggan, 2026-11-08

- **Attributet `data-surface="light"`, inte en klass.** En global klass hade blivit
  den fjärde, och M12 stängde dörren efter `.reveal`. Namnet `surface-light` står
  kvar som förbjudet, så ingen kan läsa det gamla avsnittet som gällande
  (påverkat av lärdom: **ja**, 2026-10-02 "överspelade stycken står kvar",
  ÅTERKOMMANDE)
- **`Section` sätter attributet via `surface`, och `Projects.jsx` och `About.jsx`
  skickar det.** Inte ur `sections.js`: ett fält i Jelals fil hade krävt nya
  grindar, och ytan är design, inte innehåll (påverkat av lärdom: **ja**,
  2026-10-02 "saknade eller dubbla fält i datafilen går igenom tyst". Planen: bygg
  inte för framtiden)
- **Blocket målar `background-color` och `color` själv.** Ett färdigt beräknat
  `color` på `body` ärvs som värde och följer inte ombindningen (påverkat av
  lärdom: **ja**, raden "klassen måste måla, inte bara binda om" i den gamla
  rättelsetabellen)
- **`validate-tokens.mjs` räknar bara `:root` som deklarerat och grindar
  ombindningen.** I dag hade ett felstavat ombundet namn räknats som deklarerat och
  gått igenom tyst. Prövas med rätt, fel och rättat block, och med ett namn som
  bara finns i blocket (påverkat av lärdom: **ja**, 2026-10-05 "en grind prövas med
  tre indata", och 2026-10-08 "två kommentarer räknar upp en ombindning",
  ÅTERKOMMANDE)
- **Accenten för text, länk och ring blir `#b84a00` i ljus sektion, och
  `--accent-fill` `#ff6b00` bär ytan under mörk text.** `#ff6b00` ger 2,599:1 mot
  botten, och mörk text på `#b84a00` ger 3,524:1. Ett token kan inte klara båda.
  Fokusringen följer utan att någon fil ändras (påverkat av lärdom: **ja**,
  2026-10-08 "ett tokennamn får aldrig vara motivering för ett kontrastvärde":
  varje kvot står vid sitt token)
- **Det valda segmentets ram är `--accent`, inte ytan.** Ytan `#ff6b00` mot den vita
  panelen är 2,855:1 och kan inte ensam visa läget (påverkat av lärdom: **nej**,
  ett nytt fall av samma kontrastregel)
- **`--line-strong`, `--ink-inverse` och `--error` binds inte om.** `#7a756f` ger
  4,154:1 på ljus botten, `--ink-inverse` är redan `#141414`, och `--error` har
  ingen konsument i en ljus sektion. Färre ombindningar ger färre ställen att mäta
  (påverkat av lärdom: **ja**, 2026-11-07 "tokens utan konsument")
- **Pillen blir `rgba(20, 20, 20, .9)`.** Med `.62` över vitt föll ringen och
  understrykningen på 1,804:1, och pillen var inte längre mörk, vilket beslut 9
  kräver. Hero-jämförelsen görs därför med headern dold, och skälet står i
  mätningen (påverkat av lärdom: **ja**, 2026-11-07 "mät förväntad siffra i sitt
  villkor": värdet är räknat mot vitt, det värsta fallet, och mäts i K6)
- **Linjen vid ytbyte blir genomskinlig, inte borttagen.** Bredden står kvar, så
  ingen sektion byter höjd och de mörka sektionerna kan jämföras pixel för pixel.
  Enda tillåtna skillnaden är rad 0 i Kompetenser och Kontakt, och den är utskriven
  (påverkat av lärdom: **ja**, 2026-11-07 "grinden mätte en egenskap som inte är
  invarianten": jämförelsen gäller pixlarna, inte deklarationerna)
- **P18a ska ge noll skilda pixlar i hela sidan.** Mekanismen finns då men används
  inte, och det visar att den inte läcker innan den tas i bruk (påverkat av lärdom:
  **ja**, 2026-10-02 "bygg inte vidare på något som inte är verifierat")
- **Fyra små steg och en mätning för sig.** Breda byggaruppdrag har hängt sig
  (samordnarens erfarenhet, inte en post i `LARDOMAR.md`)
- **Äldre stycken rättade i samma redigering:** inledningen, tabellen över
  förbjudna strängar (tre rader rättade, sex tillagda), M-översikten (M2 och M23),
  M2, M5:s `:root`-block och M5g, M6:s pill, M11:s segment, M13, komponenttabellen,
  mappstrukturen, "Ljus yta", "Sektionsavgränsare", gränssnittstabellen, M2-raden
  i beslutsloggen för P1 och den öppna punkten om den ljusa ytan (påverkat av
  lärdom: **ja**, 2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE, och
  2026-11-07 "sök på `.<klass> {` när ett beslut ändrar en deklaration")

### Beslutslogg — M24, full SEO, 2026-11-18

- **Domänen bor i `src/data/site.js`, och allt i `<head>` härleds ur den vid
  bygget.** Domänen stod ingenstans i koden (grep gav 0), så den första platsen
  avgör var alla andra läser. `site.js` och inte `profile.js`, eftersom domänen
  inte är en egenskap hos personen (påverkat av lärdom: **ja**, 2026-11-08
  "`profile.js` lovar 'ändra bara här'")
- **`robots.txt` och `sitemap.xml` är statiska och grindas byte för byte (V8), i
  stället för att genereras.** Det håller M21 och M22 punkt 4 giltiga och filerna
  läsbara i repot, och grinden skriver ut exakt vad som ska stå (påverkat av
  lärdom: **ja**, 2026-10-05 "en grind som fälls av fel skäl": den legitima
  ändringen fäller den, och den föreskrivna åtgärden får den att tiga)
- **V8 fäller CRLF med ett eget meddelande.** Radslutet skyddas då av bygget och
  inte bara av `.gitattributes` (påverkat av lärdom: **ja**, 2026-11-08
  "`robots.txt` blir CRLF i en färsk klon")
- **`<title>` grindas mot `name · role` (V9).** Kommentaren i `profile.js` bad
  redan om två ändringar i samma redigering, och nu blir titeln också `og:title`
  (påverkat av lärdom: **ja**, 2026-10-02 "definierad på två oberoende ställen")
- **Taggarna skrivs in av `prerender.mjs` före `</head>`, och P2 förbjuder dem i
  `index.html`.** Samma atomiska skrivning som roten, och ingen andra källa kan
  uppstå i tysthet (påverkat av lärdom: **ja**, 2026-10-02 "skriv till en
  temporärkatalog och flytta sist")
- **`jsonForScript` escapar `<` som JSON-escapet (omvänt snedstreck och `u003c`), och P5 bevisar det.** JSON-texten
  kan då aldrig avsluta skriptblocket, och `JSON.parse` ger samma värde. N9
  visar att grinden larmar utan escapningen (påverkat av lärdom: **ja**,
  2026-10-05 "ett larm är inte ett kvitto förrän man vet vad som larmade")
- **sameAs = kontaktlänkarna med adress, sedan `sameAsExtra`.** Jelals svar
  2026-11-18 (GitHub bara i sameAs, adressen `https://github.com/Jelalqaiumi`)
  blev en rad i `site.js`, och `contact.js` rörs inte. Ingen agent avgjorde det
  (påverkat av lärdom: **ja**, 2026-10-02 "ett beslut som saknas uppfinns i
  koden")
- **RÄTTAT 2026-11-18 efter P19d: P2 matchar attribut och värde med två
  skiftlägesokänsliga mönster, P5 skriver ut båda talen, och typsnittsgrinden
  hoppar över en sträng där datan ska ha en lista.** P2 sökte en skrivform och
  inte ett attribut, P5:s meddelande hade plats för ett av två tal, och ett
  typfel i datan gav en åtgärd i skriptet. Nya prov: N6b, N9b och N2b (påverkat
  av lärdom: **ja**, de tre posterna 2026-11-18 om P2, P5 och `sameAsExtra`)
- **RÄTTAT 2026-11-18 efter Jelals svar:** beskrivningen är godkänd ordagrant, och
  LinkedIn-adressen är bekräftad. P19c tar bort märkningarna om förslag och
  "härledd, inte verifierad" ur kommentarerna i `index.html` och `contact.js`
  (påverkat av lärdom: **ja**, 2026-11-07 "den beslutade markeringen står kvar
  efter att dess paket passerat")
- **Delningsbilden är porträttet, svartvitt, beskuret ovanifrån, JPEG, tak 150
  kB, i ett eget skript.** Loggan hade krävt utfyllnad, alltså ny design, och
  `optimize-images.mjs` bär redan elva verifierade filer (påverkat av lärdom:
  **ja**, 2026-10-02 "skriptet kontrollerar efter att filerna redan är skrivna",
  och samordnarens erfarenhet att breda uppdrag hänger sig)
- **`scripts/seo.mjs` är en importerad hjälpmodul, som `font-coverage.mjs`.**
  Formaten för robots, sitemap, titel och taggar står en gång och läses av tre
  skript (påverkat av lärdom: **ja**, 2026-10-02 "en kontroll som behövs två
  gånger lyfts till en funktion")
- **Ingen `lastmod`, ingen `@graph`, inga fler sidor.** Planen utesluter det, och
  ett handskrivet datum blir fel (påverkat av lärdom: nej. Planen: bygg inte för
  framtiden)
- **Varje verktyg och fil som namnges är kontrollerad i miljön:** `sharp` 0.35.5
  med `mozjpeg`, källbildens mått, mönstret i `optimize-project-images.mjs`,
  Lighthouse 12:s `canonical`-granskning (påverkat av lärdom: **ja**, 2026-10-02
  "ARKITEKTUR.md beskrev verktyg och filer som inte finns")
- **Äldre stycken rättade i samma redigering:** M21 punkt 4 (Sitemap-raden,
  undantagsmeningen och mätningen), M21 punkt 3 (tillägg om `og:description`),
  M21:s beslutslogg, M22 punkt 4:s mening om radslut, mappstrukturen (sju rader),
  "Leveransens storlek", M20 grind 14, M10c grind 16, "Utdatafiler för ikonen",
  meningen om `index.html` under `sections.js` (omformulerad utan ändrad mening,
  så att greppet i P19b:s "Klar när" bara träffar rättade stycken),
  M-översikten, tabellen över förbjudna strängar (fem rader), Teknikval och
  kontaktdatans avsnitt (påverkat av lärdom: **ja**, 2026-10-02 "överspelade
  stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M25 och M26 upphävda, chipsen tillbaka till grått, 2026-11-18

- **Jelal valde "Tillbaka till grå" efter att ha sett orange kant och text.**
  M25 och M26 är upphävda i sin helhet, och kompetens-chipsen behåller M15:s
  ursprungliga stil. Koden är återställd till 9cb309b av samordnaren. Varje stycke
  M25 och M26 ändrade är rättat tillbaka och kontrollerat mot `Chip.jsx`,
  `Chip.module.css`, `SkillChip.jsx` och `tokens.css` (påverkat av lärdom: **ja**,
  2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE)

### Beslutslogg — M26, kompetens-chipsen med orange kant och text, 2026-11-18 (~~ifyllda orange~~ RÄTTAT samma dag) — UPPHÄVD 2026-11-18, se loggen ovan

- **RÄTTAT 2026-11-18 efter Jelals "För starkt": kant och text i `--accent`, ingen
  fyllning, via propen `accent` och klassen `.chip.accent`.** Namnet `filled` hade
  blivit falskt, och `.filled` står dessutom som förbjuden klass sedan A2 (tabellen
  över förbjudna strängar), så bytet tar bort båda felen. Bakgrunden ärvs från
  `.chip`, så att den inte står på två ställen. Kvoten mot kortets `--surface`,
  6,219:1, är uträknad och mäts i K3 innan raden skrivs i `tokens.css` (påverkat
  av lärdom: **ja**, 2026-10-08 "ett tokennamn får aldrig vara motivering", och
  2026-11-07 "mät förväntad siffra i sitt villkor innan den skrivs in"). N2 bevisas
  med det vilande filterchipset, eftersom det valda redan har samma värden
  (påverkat av lärdom: **ja**, 2026-11-18, P20c:s fynd om N2)
- ~~**M25:s mekanism tas bort helt, och en klass, `.filled`, som bara `span`-grenen
  får, ersätter den.**~~ (klassen heter `.accent`, se ovan) Orange yta och mörk text finns redan som tokens i `:root`
  som aldrig binds om. Ett attribut som betyder "ljus sektion" på ett orange chip
  hade varit en falsk signal (påverkat av lärdom: **ja**, 2026-10-02 "överspelade
  stycken står kvar": M25 upphävs i sin helhet och varje stycke den ändrade
  rättas)
- ~~**`.chip.filled` med 0,2,0, och N2 med båda lägena.** Det valda filterchipset
  skiljer bara på bakgrunden~~ RÄTTAT 2026-11-18: `.chip.accent` med 0,2,0, och N2
  enligt punkten ovan (påverkat av lärdom: **ja**, 2026-11-18, P20c:s fynd om N2)
- ~~**Kvoten är den som redan står vid `--ink-inverse` mot `--accent-fill`.** Inget
  nytt token och ingen ny kvotrad~~ RÄTTAT 2026-11-18: kvoten är `--accent` mot
  `--surface`, och den raden läggs till (påverkat av lärdom: **ja**, 2026-10-08
  "ett tokennamn får aldrig vara motivering för ett kontrastvärde")
- **K1 mäts innan någon fil ändras** (påverkat av lärdom: **ja**, 2026-10-05 "mät
  aldrig `dist/` utan att binda det till källan")

### Beslutslogg — M25, ifyllda kompetens-chips, 2026-11-18 — UPPHÄVD 2026-11-18 (chipsen behåller sin ursprungliga stil)

- **Chipset bär den ljusa ytans attribut i stället för att få ett eget token.**
  Värdena står redan i det ljusa blocket, och ett nytt token hade antingen
  dubblerat `#f6f4f0` eller fällts av tokengrinden (påverkat av lärdom: **ja**,
  2026-11-08 "`profile.js` lovar 'ändra bara här'", och 2026-11-07 "tokens utan
  konsument")
- **`surface` läses bara i `span`-grenen.** Filterchipsen kan då inte få ytan av
  misstag, och N2 visar att K2 skulle se det (påverkat av lärdom: **ja**,
  2026-10-05 "ett larm är inte ett kvitto")
- **Regeln skrivs `.chip[data-surface='light']`, med specificiteten 0,2,0.**
  Ordningen mellan `tokens.css` och modulen är inget kontrakt (påverkat av lärdom:
  nej)
- **`--ink` och inte `--ink-inverse` som text, och kvoten är den som redan står
  vid `--ink` mot `--bg` i blocket.** En kvot under ett token som betyder något
  annat hade varit en motivering genom namn (påverkat av lärdom: **ja**,
  2026-10-08 "ett tokennamn får aldrig vara motivering för ett kontrastvärde")
- **Kanten blir genomskinlig men står kvar.** 1.4.11 gäller inte text som inte
  är en kontroll, och att ta bort kanten hade ändrat storleken (påverkat av
  lärdom: nej. Planen: "Ingår inte")
- **Äldre stycken rättade i samma redigering:** M-översikten (M15 och ny M25),
  M15:s inledning, signatur, `SkillChip` och CSS-rubrik, komponenttabellen efter
  moderniseringen, M23 punkt 1 och punkt 2:s blockkommentar, "Chipsens färg",
  A6-notisen och den öppna punkten om chipsens färg (påverkat av lärdom: **ja**,
  2026-10-02 "överspelade stycken står kvar", ÅTERKOMMANDE, och 2026-11-07 "sök på
  `.<klass> {`")

### Beslutslogg — Jelals svar på de öppna texterna, 2026-11-18

- **h1 i hero, footerns tagline, `h3` "Kontaktuppgifter" (M16) och `EMPTY_TEXT`
  (M19 punkt 8) är GODKÄNDA ordagrant.** Strängarna i koden ändras inte. Byggaren
  tar bort FÖRSLAG-märkningen i `Hero.jsx:12-14` och märkningen "TEXT SOM JELAL
  SKA GODKÄNNA" i `Contact.jsx:49-53` och `Projects.jsx:19-22`, och ingen annan kod
  (påverkat av lärdom: **ja**, 2026-11-07 "den beslutade markeringen står kvar
  efter att dess paket passerat")
- **Namnet i hero: nej. År i branschen: utelämnas. Mobilen vid 360 px: som nu
  (M10d).** Ingen ändring i koden (påverkat av lärdom: nej)

## Öppna punkter som INTE är arkitektens att besluta

**BESVARADE 2026-11-18 av Jelal, se M24 punkt 7 och 8.** Frågorna nedan är
historik och blockerar inte längre P19c:

- ~~**A. Sidbeskrivningen.** Godkänns förslaget i `index.html` ordagrant?~~
  **BESVARAD:** godkänd ordagrant (M24 punkt 8).
- ~~**B. GitHub i sameAs, och LinkedIn.** Ska GitHub tillbaka på sidan, bara stå i
  sameAs, eller inte finnas alls? Och vilken är adressen? Är LinkedIn-adressen
  rätt?~~ **BESVARAD:** GitHub bara i sameAs, `https://github.com/Jelalqaiumi`
  i `site.sameAsExtra`. LinkedIn-adressen är bekräftad (M24 punkt 7).

**BESVARAD 2026-11-07 av Jelal, se M10d:** bilden överst och texten under, och
knapparna får hamna under skärmkanten. Frågan nedan är historik.

**BESVARAD 2026-11-18 av Jelal: SOM NU.** Den gällande mobillayouten står kvar,
alltså M10d: bilden överst och texten under. Läget med ansiktet bakom rubriken
under en toning, som frågan nedan beskriver, är redan upphävt (M10c tabellrad 12,
se M10d). Ingen ändring. Frågan nedan är historik.

**Ny 2026-11-07, M10c. Fråga till Jelal, blockerar inte bygget:** vid 360 px ryms
inte både ett fritt ansikte och knapparna i första skärmen. Ansiktet ligger därför
bakom rubriken under en lätt toning, och resten av texten står på mörk botten.
Jelal får se skärmbilderna från P5 omgång 4. Vill han ha ansiktet fritt på mobil
kostar det antingen knapparna ovanför skärmkanten eller en mindre rubrik.

**Nya 2026-11-07, ur paket P1. Frågor till Jelal. Inget av dem blockerar bygget.**
**Alla BESVARADE 2026-11-18 av Jelal**, se svaret först i varje punkt. Frågetexten
efter svaret är historik.

1. **BESVARAD 2026-11-18: GODKÄND ordagrant.** h1 är
   "Jag bygger webbappar och mobilappar, från gränssnitt till API.", som i
   `Hero.jsx` i dag, och ingressen står kvar. Byggaren tar bort FÖRSLAG-märkningen
   i `src/components/Hero.jsx:12-14` (raderna från "⚠️ FÖRSLAG" till "denna rad
   tas bort") och ändrar ingen annan kod. Historik: **h1 i hero.** Byggt med uppdragets exempel "Jag bygger webb- och mobilappar,
   från gränssnitt till API." som markerat förslag (M10). Det upprepar början av
   din nuvarande ingress ("Jag bygger webb- och mobilappar i React, React Native
   och .NET …"). Vilken text ska h1 ha, och ska ingressen stå kvar som den är?
2. **BESVARAD 2026-11-18: NEJ, som nu.** Överraden "Portfolio" står kvar, och
   namnet syns bara i loggan, fliken och footern. Historik: **Ditt namn i hero.** I dag är h1 "Jelal Qaiumi". Med det nya h1 syns namnet
   inte längre som rubrik på sidan (bara i fliktiteln, i footern och för
   skärmläsare i loggan). Är det okej, eller ska namnet synas i hero?
3. **BESVARAD 2026-11-18: UTELÄMNAS.** Nyckeltalet läggs inte till, och M14:s två
   nyckeltal gäller. Historik: **År i branschen.** Nyckeltalet är utelämnat tills du anger ett tal och från
   vilket år det räknas (M14).
4. **BESVARAD 2026-11-18, se M24 punkt 7:** GitHub visas inte på sidan och står
   bara i sameAs. Historik: **GitHub.** Bekräfta att GitHub-länken ska vara borta tills vidare. Den visas
   inte någonstans så länge `contact.js` har `null` (M16).
5. **BESVARAD 2026-11-07 av den nya loggan, se M20:** dess ruta är `#ff6b00`, samma
   som `--accent`, så skillnaden finns inte längre. Historik: **Accentfärgen.**
   Uppdraget anger `#ff6b00`, och loggan är uppmätt till
   `#FC6F03`. Skillnaden är knappt synlig, men de står bredvid varandra i naven.
   Byggt som `#ff6b00` (M5).
6. **BESVARAD 2026-11-18: GODKÄND.** Taglinen är "Systemutvecklare · Fullstack",
   som byggd. Historik: **Footerns tagline.** Byggd med din rollrad "Systemutvecklare · Fullstack" så att
   ingen ny text hittas på (M16). Vill du ha en annan?

**Nya 2026-10-08, ur paket A:**

- **Att de 270 markerade kompetenserna försvinner.** Jelal markerade dem över många
  omgångar. Den nya listan har ingen sådan dimension, så `filled` tas bort (A2).
  Mekanismen är min, att arbetet kastas är hans att godkänna. Listan finns kvar i
  git-historiken.
- **Inga ikoner på korten** (A3), trots att uppdraget ber om en per kort. Premissen
  om ett befintligt ikonbibliotek var osann, och alternativet är nio gissade
  symboler eller ett nytt beroende. Vill han ha dem är det ett eget paket.
- **Rollraden `Systemutvecklare · Fullstack`** (A7) är en medveten omsvängning mot
  hans egen tidigare instruktion. Vi följer uppdraget, men det ska sägas högt.
- **Ingen LinkedIn-ikon i hero** (A10). Avstår om han inte ber om den.
- **Ingen bild i Om mig.** Uppdraget säger "behåll befintlig bild" — det finns
  ingen. Att införa en är ett nytt beslut och ett eget paket.
- **Projektet Hem och Ekonomi.** Innehållet är hans att ge; ingen agent hämtar det
  någon annanstans ifrån. Länken i Om mig tänds av sig själv den dag posten finns i
  `projects.js` med samma id (A4).
- **"Längre ner på sidan" stämmer inte med hans egen sektionsordning** — projektet
  ligger ovanför Om mig. Ordningen är hans beslut från 2026-10-07 och ändras inte
  av oss.
- ~~**Chipsen blir neutrala i stället för orange**~~ — **UPPHÄVT 2026-11-07:**
  chipsen får filterchipsens stil enligt uppdraget (M15). **RÄTTAT 2026-11-18:** det
  gäller, Jelal valde "Tillbaka till grå" (~~ifyllda i varmvitt, M25~~, ~~ifyllda
  orange, M26~~, ~~orange kant och text, M26~~ UPPHÄVDA).

**Äldre punkter:**

- **BESVARAD 2026-11-18 av Jelal, se M24 punkt 7:** `https://www.linkedin.com/in/jelalqaiumi`
  är bekräftad, och P19c tar bort "härledd, inte verifierad" ur kommentaren i
  `contact.js`. Historik: ~~**LinkedIn-adressen är härledd, inte verifierad.**
  LinkedIn svarar HTTP 999 på automatiska anrop, så den gick varken att bekräfta
  eller avfärda. Jelal klickar på den när sektionen är byggd. Leder den fel är det
  en rad i `contact.js`.~~
- **hCaptcha måste slås på i Web3Forms instrumentpanel.** Steget bor utanför
  arkivet. Byggaren bekräftar i överlämningen att det är gjort, och kravet på ett
  verkligt levererat meddelande är det som bevisar det.
- **Tredjepartsskript i runtime.** hCaptcha behandlar besökarens IP och laddas från
  en extern domän. Jelal tog bort integritetsraden i går och lägger till hCaptcha i
  dag — han bör få veta att det andra gör det första mer relevant, inte mindre.
  Hans beslut, men det ska vara ett beslut.
- **Feltexten har fått tillägget "eller mejla qaiumi@hotmail.com direkt"** och
  avviker därmed från Jelals formulering. Ska läggas fram.
- ~~**Om mig-sektionens innehåll**~~ — **BESVARAD 2026-10-07:** Jelal har skrivit
  texten ordagrant i sitt uppdrag. Skrivs in i paket F, tecken för tecken.
- ~~**Den ljusa ytans placering efter omordningen**~~ — ~~**UPPHÄVT 2026-11-07:**
  ingen ljus yta finns (M2).~~ **BESVARAD 2026-11-08 av Jelal (beslut 9), se M23:**
  Projekt och Om mig är ljusa.
- **BESVARAD 2026-11-18: GODKÄND ordagrant av Jelal, se M16.** Historik:
  ~~**Länkspaltens `h3` "Kontaktuppgifter"** är min text, inte Jelals. Ska godkännas.~~
- **BESVARAD 2026-11-18: GODKÄND ordagrant av Jelal, se M19 punkt 8.** Texten i
  det tomma läget, `EMPTY_TEXT` i `src/components/Projects.jsx:27`: "Här lägger
  jag upp projekt jag har byggt. Än är listan tom." Den stod som förslag bara i
  koden och var inte uppförd här.
- ~~**Länkarna hamnar under formuläret på mobil**~~ — **UPPHÄVT 2026-11-07:**
  kontaktuppgifterna står först (M16).
- ~~**Navlänkarnas träffyta på 19 px**~~ — **UPPHÄVT 2026-11-07:** rättas i P3 med
  `min-height: 40px` (M7).
- **Inget verkligt meddelande har skickats** genom formuläret, och hCaptcha i
  Web3Forms instrumentpanel är obekräftad. Formuläret är inte verifierat förrän
  ett meddelande landat i inkorgen.
- **Domänbegränsning hos Web3Forms** får slås på först när sidan ligger live, och
  då som ett eget beslut — den slår ut `localhost`.
- ~~**Sammanslagningen av `HTTP-metoder` + `GET` + `POST` + `PUT`**~~ —
  **FÖRFALLEN 2026-10-08:** `MERGED` finns inte längre, och ingen av posterna står
  på sidan. Se A1.
- ~~**Teckenförklaringens andra mening**~~ — **FÖRFALLEN 2026-10-08:** det finns
  ingen teckenförklaring. Se A2.
- ~~**Hero-texten** (intro på svenska)~~ — **BESVARAD 2026-10-07:** ingressen står
  ordagrant i uppdraget och ersätter byggarens utkast. Se A5.
