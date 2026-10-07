/* Dina kontaktuppgifter.
 *
 * SÅ ÄNDRAR DU NÅGOT:
 *   E-post   - byt texten i "email" nedan. Den visas i klartext på sidan och
 *              blir en mailto-länk.
 *   En länk  - byt "url" på den raden. Ingen annan fil behöver röras.
 *   Ta bort
 *   en länk  - skriv  url: null,  i stället för adressen. Då försvinner
 *              länken helt från sidan. Radera inte raden - null är det som
 *              säger "den här finns inte", och tom text ('') är fel.
 *
 * FORMULÄRET ersätter inte länkarna. Både länkarna och formuläret finns.
 *
 * OM "form":
 *   endpoint   adressen dit formuläret skickar. Byt bara om du byter tjänst.
 *   accessKey  din nyckel hos Web3Forms. Den ÄR avsedd att ligga synlig i
 *              koden: den säger "skicka hit", inte "läs härifrån". Ingen kan
 *              använda den för att läsa din inkorg eller ändra inställningar.
 *              Behöver du en ny nyckel: skapa den hos Web3Forms och byt raden.
 *   hcaptchaSiteKey
 *              Web3Forms DELADE publika platsnyckel för captchan. Den är inte
 *              din och behöver ingen egen registrering - byt den bara om du
 *              skaffar ett eget hCaptcha-konto.
 *
 * ⚠️ EN FÖRUTSÄTTNING SOM INTE SYNS I KODEN: hCaptcha måste vara PÅSLAGEN i
 *    Web3Forms instrumentpanel. Är den inte det avvisas inskicken medan koden
 *    ser korrekt ut och bygget är grönt - meddelanden försvinner utan felmeddelande
 *    någonstans. Det enda som bevisar att den är på är att ett verkligt
 *    meddelande kommer fram.
 *
 * TRE REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - email måste finnas och innehålla text.
 *   - Varje länk måste ha en label.
 *   - form.endpoint och form.accessKey måste finnas och innehålla text.
 */

/**
 * @typedef {Object} ContactLink
 * @property {string}      label  Svensk etikett som visas
 * @property {string|null} url    Fullständig URL, eller null - då renderas den INTE
 *
 * @typedef {Object} ContactForm
 * @property {string} endpoint         Web3Forms POST-adress
 * @property {string} accessKey        Publik nyckel, avsedd att ligga i klientkoden
 * @property {string} hcaptchaSiteKey  Web3Forms delade publika platsnyckel
 *
 * @typedef {Object} Contact
 * @property {string}        email  OBLIGATORISK. mailto:-länk i klartext.
 * @property {ContactLink[]} links
 * @property {ContactForm}   form
 */

/** @type {Contact} */
export const contact = {
  email: 'qaiumi@hotmail.com',
  links: [
    /* GitHub-länken är borttagen på Jelals begäran 2026-10-06. url: null
     * betyder att posten INTE renderas - ingen tom länk uppstår. Fyll i
     * adressen igen för att få tillbaka den. */
    { label: 'GitHub', url: null },

    /* LinkedIn-adressen är HÄRLEDD, inte verifierad: LinkedIn svarar HTTP 999
     * på automatiska anrop, alltså blockerat och inte saknat. Slutdelen i en
     * LinkedIn-adress är inte alltid samma som visningsnamnet. Klicka på
     * länken och byt raden om den leder fel. */
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jelalqaiumi' },
  ],
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '79f08fa8-8cdf-4841-8392-066feea2a389',
    hcaptchaSiteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2', // Web3Forms delade, publika
  },
};
