import { useId, useRef, useState } from 'react';
import { contact } from '../data/contact.js';
import styles from './ContactForm.module.css';

/* Ämnet sätts här och inte av besökaren, så att inkorgen visar något begripligt
 * utan att någon behöver formulera det. */
const SUBJECT = 'Nytt meddelande från portfoliosidan';

/* 15 sekunder. Utan tak kan ett hängande anrop lämna formuläret i "Skickar ..."
 * för alltid, och det är det verkliga ovisshetsläget - värre än ett tydligt
 * fel. Beslutat i ARKITEKTUR.md, "Felen är två sorter". */
const TIMEOUT_MS = 15000;

const MESSAGE_MAX = 5000;

/* ===== VALIDERING =======================================================
 * Svenska meddelanden, inte webbläsarens. <form noValidate> stänger av de
 * inbyggda bubblorna, som kommer på WEBBLÄSARENS språk - en tysk bubbla på en
 * svensk sida är ett sämre fel än att skriva tre meddelanden själv.
 *
 * required och type="email" står kvar på fälten: de bär semantiken till
 * hjälpmedel och är sista skyddsnätet.
 *
 * E-POSTREGELN ÄR MEDVETET TILLÅTANDE. Att avvisa en giltig adress är värre än
 * att släppa igenom en ogiltig - den ogiltiga studsar bara, den giltiga
 * besökaren ger upp. Därför ingen komplicerad regex: exakt ett @, icke-tomma
 * delar på båda sidor, minst en punkt efter @.
 * ======================================================================== */
function validate(values) {
  const errors = {};

  if (values.name.trim() === '') {
    errors.name = 'Skriv ditt namn.';
  }

  const email = values.email.trim();
  const parts = email.split('@');

  if (email === '') {
    errors.email = 'Skriv din e-postadress.';
  } else if (parts.length !== 2 || parts[0] === '' || parts[1] === '' || !parts[1].includes('.')) {
    errors.email = 'Kontrollera e-postadressen. Den ska se ut som namn@exempel.se.';
  }

  if (values.message.trim() === '') {
    errors.message = 'Skriv ett meddelande.';
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Meddelandet är för långt. Högst ${MESSAGE_MAX} tecken.`;
  }

  return errors;
}

const EMPTY = { name: '', email: '', message: '' };

/* Fältordningen står på ETT ställe. Både renderingen och "flytta fokus till
 * första felande fält" läser den, så de kan inte glida isär. */
const FIELD_ORDER = ['name', 'email', 'message'];

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  /* Fyra tillstånd: 'idle' | 'sending' | 'sent' | 'error'. Ett enda värde, så
   * att två av dem aldrig kan vara sanna samtidigt. */
  const [state, setState] = useState('idle');

  /* useId ger unika id även om formuläret någon gång renderas två gånger på
   * samma sida - handskrivna id hade krockat och brutit label-kopplingen. */
  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;
  const errorId = (name) => `${uid}-${name}-error`;

  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    /* Felet försvinner så fort besökaren rättar fältet. Att låta det ligga
     * kvar till nästa inskick gör att sidan verkar påstå något som inte längre
     * gäller. */
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    /* HANTERAREN IGNORERAR NYA INSKICK medan ett pågår. Det är detta som gör
     * att knappen inte behöver bli disabled - se knappen nedan. */
    if (state === 'sending') return;

    const found = validate(values);

    if (Object.keys(found).length > 0) {
      setErrors(found);

      /* Fokus till FÖRSTA felande fält i fältordningen, inte i den ordning
       * felen råkar ligga i objektet. Statusraden används INTE för
       * valideringsfel - den är för inskickets utfall, inte för ifyllnad. */
      const first = FIELD_ORDER.find((name) => found[name]);
      refs[first]?.current?.focus();
      return;
    }

    setErrors({});
    setState('sending');

    /* AbortController + timer. Städas i finally så att timern aldrig lever
     * vidare efter att anropet är klart. */
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(contact.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.form.accessKey,
          subject: SUBJECT,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message,
          /* Honeypot. Tom för en människa; en robot som fyller i allt kryssar
           * den och Web3Forms avvisar inlägget. */
          botcheck: '',
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setState('sent');
      setValues(EMPTY);
    } catch {
      /* ALLA tre felvägarna - timeout, nätverksfel och svar som inte är ok -
       * ger samma entydiga meddelande. Besökaren ska inte behöva tolka vilken
       * av dem det var, och formuleringen får inte innehålla något "kanske":
       * meddelandet kom inte fram. Fälten behålls, så att man kan trycka igen
       * utan att skriva om allt. */
      setState('error');
    } finally {
      clearTimeout(timer);
    }
  }

  const sending = state === 'sending';

  /* Statusradens text. Tom sträng i vilande läge - raden finns ändå i DOM. */
  const status = {
    idle: '',
    sending: 'Skickar …',
    sent: 'Tack! Meddelandet är skickat.',
    error: `Meddelandet kunde inte skickas. Försök igen, eller mejla ${contact.email} direkt.`,
  }[state];

  function field(name, label, type) {
    const invalid = Boolean(errors[name]);

    return (
      <p className={styles.field}>
        {/* SYNLIG label ovanför fältet, aldrig en platshållare som etikett -
            en platshållare försvinner när man börjar skriva, och då vet den
            som tappat tråden inte längre vad fältet var. */}
        <label className={styles.label} htmlFor={fieldId(name)}>
          {label}
        </label>

        {type === 'textarea' ? (
          <textarea
            className={styles.input}
            id={fieldId(name)}
            name={name}
            ref={refs[name]}
            value={values[name]}
            onChange={handleChange}
            rows={6}
            maxLength={MESSAGE_MAX}
            required
            aria-invalid={invalid ? 'true' : undefined}
            aria-describedby={invalid ? errorId(name) : undefined}
          />
        ) : (
          <input
            className={styles.input}
            id={fieldId(name)}
            name={name}
            ref={refs[name]}
            type={type}
            value={values[name]}
            onChange={handleChange}
            required
            aria-invalid={invalid ? 'true' : undefined}
            aria-describedby={invalid ? errorId(name) : undefined}
          />
        )}

        {/* Felet står UNDER fältet och är kopplat med aria-describedby, så att
            det läses upp som en del av fältet och inte som en lös rad. */}
        {invalid && (
          <span className={styles.error} id={errorId(name)}>
            {errors[name]}
          </span>
        )}
      </p>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* noValidate stänger av webbläsarens egna bubblor. required och
          type="email" står kvar på fälten ändå - de bär semantiken till
          hjälpmedel.

          aria-busy under sändning talar om att området arbetar. */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={sending}>
        {field('name', 'Namn', 'text')}
        {field('email', 'E-post', 'email')}
        {field('message', 'Meddelande', 'textarea')}

        {/* HONEYPOT. tabindex="-1" och aria-hidden är INTE valfria: ett dolt
            fält som går att tabba till eller som läses upp är en fälla för de
            besökare som har svårast att ta sig igenom formuläret, alltså
            precis tvärtemot avsikten. display:none räcker i praktiken, men de
            två attributen gör avsikten explicit och överlever att någon byter
            döljningsteknik. */}
        <input
          className={styles.honeypot}
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* KNAPPEN BLIR ALDRIG disabled. disabled tar bort elementet ur
            tabbordningen, och då kastas fokus till <body> mitt i en åtgärd -
            en tangentbordsanvändare tappar sin plats. aria-disabled säger
            tillståndet till hjälpmedel medan hanteraren ignorerar nya
            inskick. */}
        <button className={styles.button} type="submit" aria-disabled={sending ? 'true' : undefined}>
          {sending ? 'Skickar …' : 'Skicka'}
        </button>

        {/* STATUSRADEN FINNS ALLTID I DOM, tom i vilande läge. Den får INTE
            renderas villkorat: en live-region som läggs till samtidigt som
            sitt innehåll annonseras ofta inte alls - skärmläsaren måste
            observera regionen INNAN texten dyker upp i den. Det är den
            vanligaste orsaken till att ett formulär "fungerar men säger
            inget". */}
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      </form>

    </div>
  );
}

export default ContactForm;
