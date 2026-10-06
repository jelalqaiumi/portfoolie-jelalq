# Guide: så ändrar du innehållet på sidan

Den här guiden täcker de ändringar som faktiskt görs löpande. Allt innehåll bor
i fyra filer under `src/data/`, och ingen av ändringarna nedan kräver att du
öppnar en komponentfil eller en CSS-fil.

**Varför en egen fil och inte README:** README läses av besökare på GitHub och
ska svara på vad projektet är och hur det körs. Den här guiden är en
arbetsinstruktion för den som äger sidan. Hade de legat ihop skulle README bli
dubbelt så lång och det en besökare behöver hamna längst ner.

Varje datafil har dessutom instruktionen skriven i sin egen inledande kommentar.
**Den kommentaren är den exakta sanningen** — den här guiden är översikten och
felsökningen. Står de två någon gång i konflikt är det filen som gäller.

---

## Innan du börjar: tre saker som gäller alla ändringar

1. **Starta utvecklingsservern** med `npm run dev` och ha sidan öppen. Det du
   sparar syns direkt i webbläsaren.
2. **`npm run dev` validerar inte datafilerna.** Kör `npm run validate:data`
   när du är klar. Det tar någon sekund och säger antingen `Validering OK: ...`
   eller exakt vad som är fel. Samma validering körs automatiskt av
   `npm run build`.
3. **Bygget fäller trasig data.** Det är en funktion, inte ett hinder — du kan
   inte råka publicera en halv ändring. Meddelandena är på svenska och namnger
   filen och värdet. Hur de ser ut står under [Om något går
   fel](#om-något-går-fel) längst ner.

---

## 1. Markera en kompetens som ifylld

**Fil:** `src/data/skills.js`

Filen innehåller 18 grupper och 307 kompetenser. Varje kompetens står på **en
enda rad** — just för att det här ska gå snabbt med Ctrl+F.

1. Öppna `src/data/skills.js`.
2. Tryck **Ctrl+F** och sök på namnet, till exempel `Async/await`.
3. Ändra `filled: false` till `filled: true` på den raden.
4. Spara. Pillen blir orange på sidan direkt.

```js
{ name: 'Async/await', filled: false },   // före
{ name: 'Async/await', filled: true },    // efter
```

Orange fylld pill = behärskar. Dämpad pill med tunn ram = ännu inte markerad.
Det omvända fungerar lika bra: `true` → `false` tar bort markeringen.

**Dela aldrig upp en rad i flera.** Ligger `name` och `filled` på olika rader
hittar Ctrl+F inte längre hela posten, och hela poängen med formatet är borta.

**Skriv `true` och `false` utan citattecken.** `filled: 'false'` är en text och
inte ett sanningsvärde. Valideringen fäller det, så bygget stannar och berättar
vilken post det gäller.

### Att lägga till en kompetens som inte finns i listan

Detta kräver **två** ändringar, annars stannar bygget:

1. Skriv in namnet i `skills-full.txt` i projektroten, på en egen rad under en
   passande `##`-kategori.
2. Lägg in posten i `src/data/skills.js` i den grupp där den hör hemma.

Namnen måste vara **tecken för tecken identiska** i de två filerna.

Varför det är kopplat så: valideringen jämför `skills.js` mot dina egna listor
`skills.txt` och `skills-full.txt` i båda riktningarna. Ett namn som bara står
i listorna har tappats bort, och ett namn som bara står i `skills.js` är
uppfunnet eller felstavat. Kontrollen ersätter ett hårdkodat totalantal, som
hade behövt ändras varje gång du lade till en kompetens.

### Att byta ordning eller flytta en kompetens

Ordningen på sidan är ordningen i filen: grupperna i den ordning de står,
kompetenserna i den ordning de står inuti sin grupp. Vill du flytta en grupp
högre upp flyttar du hela blocket. Vill du flytta en kompetens till en annan
grupp flyttar du raden — men den får bara finnas på **ett** ställe, annars
fäller valideringen dubbletten.

---

## 2. Lägg till ett projekt

**Fil:** `src/data/projects.js`

Listan är tom just nu och sidan visar en kort rad i stället för en tom yta. Det
är avsiktligt.

1. Öppna `src/data/projects.js`.
2. Längst upp i filen ligger en **kommenterad mall** mellan två rader med
   streck, märkt `KOPIERA HÄR`. Kopiera hela blocket.
3. Klistra in det inuti hakparenteserna i `export const projects = []` längst
   ner i filen, alltså mellan `[` och `]`.
4. Byt ut texterna. Spara. Kortet syns på sidan direkt.

De sex fälten, inget mer:

| Fält | Krav |
|---|---|
| `id` | Obligatoriskt. Kort namn med små bokstäver och bindestreck. Måste vara unikt. |
| `title` | Obligatoriskt. Projektets namn som det visas. |
| `description` | Obligatoriskt. En till tre meningar. |
| `tech` | Obligatoriskt, men får vara tom: `tech: [],`. En lista inom hakparenteser. |
| `url` | Länk till projektet live. Finns ingen: `url: null,` |
| `repoUrl` | Länk till koden. Finns ingen: `repoUrl: null,` |

**`null` skrivs utan citattecken.** Då visas ingen knapp alls för den länken.
Skriv aldrig tom text (`''`) och aldrig `'#'` — båda ger en länk som inte går
någonstans, och valideringen fäller dem just därför.

Glöm inte kommatecknet efter `}` om du lägger in fler än ett projekt.

Fält som medvetet **inte** finns: bild, årtal, kategori och "featured"-flagga.
Behöver du ett av dem är det en riktig ändring i komponenten, inte något du
lägger till i datafilen.

### Så tar du bort ett projekt

Radera hela blocket från `{` till och med `},`. Är listan tom igen kommer den
korta raden tillbaka av sig själv.

---

## 3. Ändra kontaktuppgifter

**Fil:** `src/data/contact.js`

| Vad | Hur |
|---|---|
| E-postadressen | Byt texten i `email`. Den visas i klartext och blir en `mailto:`-länk. |
| En länk | Byt `url` på den raden. |
| Visa en länk som är borta | Byt `url: null` mot adressen inom citattecken. |
| Gömma en länk | Skriv `url: null,` i stället för adressen. |

**`url: null` betyder "den här länken finns inte"** — då renderas posten inte
alls. Ingen grå ikon, ingen text om att något kommer senare, ingen tom länk. Så
är GitHub-länken borttagen just nu. **Radera inte raden**: `null` är det som
säger att länken saknas, och tom text (`''`) är fel och fälls av valideringen.

LinkedIn-adressen i filen är **härledd ur användarnamnet, inte verifierad** —
LinkedIn svarar `HTTP 999` på automatiska anrop, alltså blockerat och inte
saknat, så den gick inte att kontrollera maskinellt. Klicka på länken på sidan
och byt raden om den leder fel.

### Formuläret

`form.endpoint` och `form.accessKey` styr kontaktformuläret, som skickar via
Web3Forms till adressen i `email`. Nyckeln **ska** ligga synlig i koden: den
säger "skicka hit", inte "läs härifrån", och går inte att använda för att läsa
inkorgen eller ändra inställningar. Behöver du en ny nyckel skapar du den hos
Web3Forms och byter raden.

Aktivera inte domänbegränsningen hos Web3Forms. Den är en betalfunktion, och
slås den på slutar formuläret fungera på `localhost` — alltså där du utvecklar.
Ska den någon gång på, gör det först efter att sidan ligger live.

Formuläret **ersätter inte** länkarna. Både länkarna och formuläret finns.

---

## 4. Byta rubriker i navigationen

**Fil:** `src/data/sections.js`

Ändra `label` på en post. Texten används både i navigationslänken och som
sektionens `<h2>`.

Rör **inte** `id`-konstanterna. Varje `id` står skrivet på exakt ett ställe i
hela projektet och importeras av komponenterna; ändrar du en konstant följer
både sektionen och navlänken med, men bokmärken och externa länkar till
`#skills` slutar fungera.

Kastar du om **ordningen** i listan byter bara navigationen ordning. Ordningen
på sidan styrs av skrivordningen i `src/App.jsx`. Vill du flytta en sektion
måste du ändra på båda ställena — och kontrollera efteråt att de tre linjerna
mellan sektionerna fortfarande syns.

---

## 5. Texter som inte ligger i `src/data/`

Tre texter är utkast som ligger som namngivna konstanter högst upp i sin
komponent, var och en med ett kommentarsblock som förklarar varför den är
formulerad som den är. Byt strängen; ingen annan fil behöver röras.

| Text | Fil | Konstant |
|---|---|---|
| Introtexten under namnet i hero | `src/components/Hero.jsx` | `introDraft` |
| Raden som förklarar vad orange betyder | `src/components/Skills.jsx` | `LEGEND` |
| Raden som visas när projektlistan är tom | `src/components/Projects.jsx` | `EMPTY_TEXT` |

Namnet (`<h1>`) och titeln i hero ligger i samma fil, som `name` och `role`.

---

## 6. Byta profilbild eller logga

Originalen ligger i `assets-source/` och skrivs aldrig över av något skript.

1. Lägg den nya filen i `assets-source/` med **samma filnamn** som den
   ersätter.
2. Kör `npm run optimize:images`.

Skriptet skriver ingenting till disk förrän samtliga kontroller passerat, så en
körning som avbryter lämnar `public/assets/` orörd. Det kontrollerar bland annat
att källans pixelmått är de förväntade — byter du till en bild med andra mått
stannar skriptet i stället för att beskära blint, och då är beskärningen i
`scripts/optimize-images.mjs` en riktig ändring som behöver göras medvetet.

Lägg aldrig en fil för hand i `public/assets/`. Allt där är genererat, och allt
i `public/` följer med rakt ut i leveransen.

---

## Om något går fel

Kör `npm run validate:data`. Alla fel skrivs ut tillsammans, inte ett i taget,
och sista raden sammanfattar:

```
Valideringen hittade 1 fel. Bygget avbryts.
```

Varje felrad har formen `<fil>: <vad som är fel>`. De du mest troligt får se:

| Meddelandet säger | Det betyder |
|---|---|
| `skills.js: filled måste vara true eller false ("Namnet", fick "false")` | Du har skrivit `filled: 'false'` med citattecken. Ta bort citattecknen. |
| `skills.js: skill-namnet förekommer mer än en gång ("Namnet")` | Samma namn står på två ställen i filen. Behåll ett. |
| `skills.js: namnet finns varken i skills.txt eller skills-full.txt ("Namnet")` | Du har lagt in en kompetens i `skills.js` utan att skriva den i `skills-full.txt`. Eller det är ett stavfel. |
| `skills.js: namn ur skills-full.txt saknas och är inte sammanslaget ("Namnet")` | Omvänt: namnet står i din lista men har tappats ur `skills.js`. |
| `projects.js: projekt saknar obligatoriskt fält (post 1, fält "id")` | Ett obligatoriskt fält är tomt eller saknas. Siffran är projektets plats i listan, räknad från 1. |
| `projects.js: url måste vara en URL eller null (id "...", fick "")` | Du har tömt fältet i stället för att skriva `null`. |
| `contact.js: url får inte vara "#" - skriv null när länken saknas (label "GitHub")` | Samma sak: `null`, inte `#`. |
| `projects.js: filen går inte att läsa, troligen ett skrivfel` | Ett kommatecken, en klammer eller ett citattecken saknas. Meddelandet pekar ut filen. |

Två saker som **inte** är fel:

- En tom projektlista. `projects: []` är ett fullt giltigt läge och valideringen
  säger ingenting om det.
- Att `Validering OK`-raden visar ett annat antal ifyllda kompetenser än förra
  gången. Talet är en upplysning och ändras varje gång du markerar något. Det
  är inte en gräns.

Kommer du inte vidare: ångra ändringen, kör `npm run validate:data` igen och
bekräfta att den går igenom. Gör den det låg felet i det du just skrev.

### Om pillen inte blir orange

Kontrollera i tur och ordning:

1. Sparade du filen? `npm run dev` laddar om av sig själv när filen sparas.
2. Står det `filled: true` utan citattecken? Pillen kräver exakt sanningsvärdet
   `true` — allt annat, inklusive texten `'true'`, ritas som dämpad. Det är det
   säkra felläget: en kompetens visas aldrig som behärskad på grund av ett
   skrivfel.
3. Hittade Ctrl+F rätt post? Flera namn börjar likadant.

---

## Sista kontrollen innan du är klar

```sh
npm run validate:data
npm run build
```

Går de igenom är ändringen komplett. `npm run preview` visar den byggda sidan
om du vill se den precis som en besökare får den.
