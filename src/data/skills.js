/* Dina kompetenser, grupperade. Det här är enda stället de står på.
 *
 * Namnen är dina egna ord ur uppdraget 2026-10-07 (UPPDRAG-2026-10-07.md i
 * projektroten). Inget namn är omstavat, omdöpt eller omversaliserat, och
 * parenteser, snedstreck och plustecken hör till namnet.
 *
 * SÅ ÄNDRAR DU LISTAN:
 *   Lägga till en kompetens:  skriv en ny rad  { name: '...' },  i gruppen.
 *   Ta bort en kompetens:     radera hela raden.
 *   Byta namn på en grupp:    ändra title. Lämna id orört - det används som
 *                             rubrikens ankare.
 *   Lägga till en grupp:      kopiera ett helt block och ge det ett eget id
 *                             med bara små bokstäver, siffror och bindestreck.
 *
 * Ingen annan fil behöver röras - varken komponenter eller CSS. Alla
 * kompetenser visas likadant; det finns ingen markering för hur väl du
 * behärskar något.
 *
 * ORDNINGEN PÅ SIDAN är ordningen i den här filen: grupperna i den ordning de
 * står, och kompetenserna i den ordning de står inuti sin grupp. Vill du
 * flytta en grupp högre upp: flytta hela blocket.
 *
 * VAD BYGGET KONTROLLERAR (npm run build stannar annars): att strukturen
 * håller - att varje grupp har id, title och minst en kompetens, att varje
 * kompetens har ett namn, att inget namn och inget grupp-id förekommer två
 * gånger, och att ingen post har något annat fält än de som står i typedef:en
 * nedan. Antalet grupper och kompetenser kontrolleras INTE: det är din lista
 * att ändra, och ett antal som måste rättas i ett skript varje gång du lägger
 * till något vore en kontroll som fallerar av fel skäl.
 *
 * FORMATET: en kompetens per rad. Dela inte upp en rad i flera - då hittar
 * inte Ctrl+F rätt rad längre.
 */

/**
 * @typedef {Object} Skill
 * @property {string} name   OBLIGATORISK. Visas som text i chipset. Unikt i HELA filen (React-key).
 *
 * @typedef {Object} SkillGroup
 * @property {string}  id      OBLIGATORISK. Unikt, gemener, bara a-z0-9-. React-key och rubrik-id.
 * @property {string}  title   OBLIGATORISK. Svensk gruppubrik.
 * @property {Skill[]} skills  OBLIGATORISK. Minst en post.
 */
export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'C#' },
      { name: '.NET' },
      { name: 'ASP.NET Core Web API' },
      { name: 'REST' },
      { name: 'Entity Framework Core' },
      { name: 'LINQ' },
      { name: 'Middleware' },
      { name: 'Dependency Injection' },
      { name: 'Swagger/OpenAPI' },
      { name: 'Node.js' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React (Hooks, Context)' },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5' },
      { name: 'CSS (Grid, Flexbox, responsiv design)' },
      { name: 'Vite' },
      { name: 'Blazor' },
    ],
  },
  {
    id: 'mobil',
    title: 'Mobil',
    skills: [
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'React Navigation' },
      { name: 'EAS Build' },
    ],
  },
  {
    id: 'databaser',
    title: 'Databaser',
    skills: [
      { name: 'SQL Server' },
      { name: 'SQL' },
      { name: 'MongoDB' },
      { name: 'Datamodellering och normalisering' },
    ],
  },
  {
    id: 'sakerhet',
    title: 'Säkerhet',
    skills: [
      { name: 'JWT och refresh tokens' },
      { name: 'ASP.NET Identity' },
      { name: 'MFA (TOTP)' },
      { name: 'Rollbaserad auktorisering' },
      { name: 'OWASP Top 10' },
      { name: 'Hotmodellering (STRIDE)' },
      { name: 'Kryptering och hashning' },
      { name: 'CodeQL' },
      { name: 'OWASP ZAP' },
    ],
  },
  {
    id: 'testning-och-kvalitet',
    title: 'Testning och kvalitet',
    skills: [
      { name: 'xUnit' },
      { name: 'Moq' },
      { name: 'TDD' },
      { name: 'SOLID' },
      { name: 'Clean Code' },
      { name: 'Designmönster' },
      { name: 'Refaktorisering' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    skills: [
      { name: 'Git och GitHub' },
      { name: 'Azure DevOps' },
      { name: 'CI/CD-pipelines (YAML)' },
      { name: 'Azure Web App' },
      { name: 'DevSecOps' },
    ],
  },
  {
    id: 'arbetssatt',
    title: 'Arbetssätt',
    skills: [
      { name: 'Scrum' },
      { name: 'Kanban' },
      { name: 'Kodgranskning och pull requests' },
      { name: 'Parprogrammering' },
    ],
  },
  {
    id: 'ai-i-utveckling',
    title: 'AI i utveckling',
    skills: [
      { name: 'GitHub Copilot' },
      { name: 'Agentisk AI och AI-orkestrering' },
      { name: 'Prompt engineering' },
      { name: 'Ansvarsfull AI-användning' },
    ],
  },
];
