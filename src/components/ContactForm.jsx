import { useId, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { contact } from '../data/contact.js';
import styles from './ContactForm.module.css';

/* 15 sekunder. Utan tak kan ett hängande anrop lämna formuläret i "Skickar ..."
 * för alltid, och det är det verkliga ovisshetsläget - värre än ett tydligt
 * fel. Beslutat i ARKITEKTUR.md, "Felen är två sorter". */
const TIMEOUT_MS = 15000;

const MESSAGE_MAX = 5000;

/* ===== FÄLTEN - EN ENDA KÄLLA ===========================================
 * Renderingen, valideringen, "flytta fokus till första felande fält" och
 * tömningen läser alla den här listan. Med fem fält i stället för tre är det
 * inte längre en bekvämlighet: varje separat uppräkning hade varit ett ställe
 * där ordningen kan glida isär från den visuella.
 *
 * company har required: false och VALIDERAS INTE ALLS. Ett valfritt fält som
 * ger felmeddelanden är i praktiken obligatoriskt.
 * ======================================================================== */
const FIELDS = [
  { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Skriv in ditt namn' },
  { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'Skriv in din e-postadress' },
  { name: 'company', label: 'Företag/Organisation', type: 'text', required: false, placeholder: 'Skriv in ditt företag/organisation' },
  { name: 'subject', label: 'Ämne för förfrågan', type: 'text', required: true, placeholder: 'Skriv in ditt ämne för förfrågan' },
  { name: 'message', label: 'Meddelande', type: 'textarea', required: true, placeholder: 'Skriv in ditt meddelande' },
];

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']));

/* ===== VALIDERING =======================================================
 * Svenska meddelanden, inte webbläsarens. <form noValidate> stänger av de
 * inbyggda bubblorna, som kommer på WEBBLÄSARENS språk.
 *
 * E-POSTREGELN ÄR MEDVETET TILLÅTANDE. Att avvisa en giltig adress är värre än
 * att släppa igenom en ogiltig - den ogiltiga studsar bara, den giltiga
 * besökaren ger upp. Därför ingen komplicerad regex.
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

  if (values.subject.trim() === '') {
    errors.subject = 'Skriv vad förfrågan gäller.';
  }

  if (values.message.trim() === '') {
    errors.message = 'Skriv ett meddelande.';
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Meddelandet är för långt. Högst ${MESSAGE_MAX} tecken.`;
  }

  /* company saknas med avsikt. Se kommentaren vid FIELDS. */
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  /* Fyra tillstånd: 'idle' | 'sending' | 'sent' | 'error'. Ett enda värde, så
   * att två av dem aldrig kan vara sanna samtidigt. */
  const [state, setState] = useState('idle');

  /* Captcha-token. Engångs och kortlivad - därför nollas den i BÅDA
   * slutlägena, inte bara vid fel. */
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);

  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;
  const errorId = (name) => `${uid}-error-${name}`;
  const hintId = `${uid}-required-hint`;

  /* En ref per fält, så att fokus kan flyttas till första felande. */
  const refs = useRef({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    /* Felet försvinner så fort besökaren rättar fältet. Att låta det ligga kvar
     * till nästa inskick gör att sidan verkar påstå något som inte längre
     * gäller. */
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  /* ÅTERSTÄLLNING AV CAPTCHAN. Egen funktion därför att den anropas från två
   * ställen - lyckat och misslyckat - och en glömd av dem är exakt det fel som
   * ger besökaren ett avvisat andra försök utan förklaring. */
  function resetCaptcha() {
    setCaptchaToken('');
    captchaRef.current?.resetCaptcha();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    /* Hanteraren vägrar medan ett inskick pågår. Det är detta som gör att
     * knappen inte behöver bli disabled. */
    if (state === 'sending') return;

    const found = validate(values);

    /* VALIDERINGEN KÖRS ÄVEN I DÄMPAT LÄGE. En knapp som inte går att trycka på
     * berättar aldrig varför; den här visar felen och flyttar fokus i samma
     * rörelse. Därför ligger valideringen FÖRE captcha-kontrollen. */
    if (Object.keys(found).length > 0) {
      setErrors(found);

      /* Första felande fält i FÄLTORDNINGEN, inte i den ordning felen råkar
       * ligga i objektet. Statusraden används INTE för valideringsfel - den är
       * för inskickets utfall, inte för ifyllnad. */
      const first = FIELDS.find((f) => found[f.name]);
      refs.current[first.name]?.focus();
      return;
    }

    /* Captchan är inte ett fält och får inget fältfel. Är den inte löst finns
     * inget vettigt ställe att peka på, så statusraden får bära beskedet - det
     * är ett hinder för inskicket, inte ett fel i ifyllnaden. */
    if (captchaToken === '') {
      setErrors({});
      setState('captcha');
      return;
    }

    setErrors({});
    setState('sending');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(contact.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.form.accessKey,
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),

          /* subject är besökarens eget fält. Den fasta strängen är BORTTAGEN -
           * Web3Forms använder subject som ämnesrad, så Jelal ser direkt i
           * inkorgen vad förfrågan gäller. Det finns inget dolt subject-fält
           * kvar: två fält med samma namn ger godtyckligt utfall. */
          subject: values.subject.trim(),
          message: values.message,

          /* Honeypot. Behålls UTÖVER captchan - de stoppar olika sorters
           * robotar: captchan den som interagerar, honeypoten den som bara
           * fyller i allt den hittar. */
          botcheck: '',

          'h-captcha-response': captchaToken,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setState('sent');
      setValues(EMPTY);
      resetCaptcha();
    } catch {
      /* ALLA tre felvägarna - timeout, nätverksfel och svar som inte är ok -
       * ger samma entydiga meddelande. Fälten behålls, så att man kan trycka
       * igen utan att skriva om allt. Captchan återställs ändå: token är
       * förbrukad. */
      setState('error');
      resetCaptcha();
    } finally {
      clearTimeout(timer);
    }
  }

  const sending = state === 'sending';

  /* Alla obligatoriska ifyllda OCH captchan löst. Styr bara UTSEENDET och
   * aria-disabled - aldrig disabled-attributet. */
  const ready = FIELDS.every((f) => !f.required || values[f.name].trim() !== '') && captchaToken !== '';
  const muted = !ready || sending;

  const status = {
    idle: '',
    captcha: 'Bekräfta att du är människa innan du skickar.',
    sending: 'Skickar …',
    sent: 'Tack! Jag återkommer så snart jag kan.',
    error: `Något gick fel – försök igen, eller mejla ${contact.email} direkt.`,
  }[state];

  return (
    <>
      <h3 className={styles.heading}>Fyll i dina uppgifter</h3>

      {/* Förklaringen av asterisken står EN gång, ovanför fälten. Den gör att
          färgen inte är ensam bärare av "obligatoriskt" (WCAG 1.4.1) - asterisken
          står dessutom alltid intill etikettens ord. */}
      <p className={styles.requiredHint} id={hintId}>
        <span className={styles.required} aria-hidden="true">*</span> obligatoriskt fält
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={sending}>
        {FIELDS.map((f) => {
          const invalid = Boolean(errors[f.name]);

          /* BÅDA id:na när båda finns. Att byta ut beskrivningen mot felet gör
             att hjälptexten försvinner just när den behövs mest. Obligatoriska
             fält pekar på asterisk-förklaringen; alla felande pekar också på
             sitt eget fel. */
          const describedBy = [f.required ? hintId : null, invalid ? errorId(f.name) : null]
            .filter(Boolean)
            .join(' ') || undefined;

          const shared = {
            className: styles.input,
            id: fieldId(f.name),
            name: f.name,
            ref: (el) => { refs.current[f.name] = el; },
            value: values[f.name],
            onChange: handleChange,
            placeholder: f.placeholder,
            required: f.required || undefined,
            'aria-invalid': invalid ? 'true' : undefined,
            'aria-describedby': describedBy,
          };

          return (
            <p className={styles.field} key={f.name}>
              {/* SYNLIG label ovanför fältet. Platshållaren är ett komplement,
                  aldrig etiketten: den försvinner när man börjar skriva. */}
              <label className={styles.label} htmlFor={fieldId(f.name)}>
                {f.label}
                {f.required && (
                  <span className={styles.required} aria-hidden="true"> *</span>
                )}
              </label>

              {f.type === 'textarea'
                ? <textarea {...shared} rows={6} maxLength={MESSAGE_MAX} />
                : <input {...shared} type={f.type} />}

              {invalid && (
                <span className={styles.error} id={errorId(f.name)}>
                  {errors[f.name]}
                </span>
              )}
            </p>
          );
        })}

        {/* HONEYPOT, kvar utöver captchan. tabindex="-1" och aria-hidden är
            inte valfria: ett dolt fält som går att tabba till eller som läses
            upp är en fälla för de besökare som har svårast att ta sig igenom
            formuläret. */}
        <input
          className={styles.honeypot}
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className={styles.captcha}>
          {/* reCaptchaCompat={false} så att paketet inte lägger ut globala
              grecaptcha-stubbar - sidan använder ingen reCAPTCHA.
              Token hamnar i h-captcha-response i kroppen ovan. */}
          <HCaptcha
            ref={captchaRef}
            sitekey={contact.form.hcaptchaSiteKey}
            reCaptchaCompat={false}
            onVerify={(token) => {
              setCaptchaToken(token);
              /* Har besökaren redan fått "bekräfta att du är människa" ska den
               * raden försvinna när hen gjort det. */
              setState((prev) => (prev === 'captcha' ? 'idle' : prev));
            }}
            onExpire={() => setCaptchaToken('')}
            onError={() => setCaptchaToken('')}
          />
        </div>

        {/* KNAPPEN BLIR ALDRIG disabled. disabled tar bort elementet ur
            tabbordningen, och en tangentbordsanvändare som tabbar nedåt hittar
            då ingen knapp alls och får ingen förklaring till varför.
            aria-disabled säger tillståndet till hjälpmedel, utseendet säger det
            till ögat, och hanteraren vägrar skicka - men ett klick kör ändå
            valideringen och visar felen. */}
        <button
          className={styles.button}
          type="submit"
          data-muted={muted ? 'true' : undefined}
          aria-disabled={muted ? 'true' : undefined}
        >
          {sending ? 'Skickar …' : 'Skicka förfrågan'}
        </button>

        {/* STATUSRADEN FINNS ALLTID I DOM, tom i vilande läge. Den får INTE
            renderas villkorat: en live-region som läggs till samtidigt som sitt
            innehåll annonseras ofta inte alls - skärmläsaren måste observera
            regionen INNAN texten dyker upp i den. */}
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </>
  );
}

export default ContactForm;
