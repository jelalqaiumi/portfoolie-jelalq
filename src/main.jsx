import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
/* Ordningen är beslutad i ARKITEKTUR.md, "Stilimport": fonts först, så att
 * @font-face är deklarerad innan något använder den. Inga @import inuti
 * CSS-filerna - ordningen ska vara synlig här. */
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';
import App from './App.jsx';
import { ROOT_ID } from './data/sections.js';

/* Scroll-reveal, beslutat i ARKITEKTUR.md: M12 och M12b. Attributet sätts bara
 * när innehållet faktiskt kan tonas in igen: finns ingen observer, eller vill
 * användaren ha reducerad rörelse, döljs ingenting. */
function enableReveal() {
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    document.documentElement.dataset.revealReady = 'true';
  }
}

/* Före första renderingen: attributet som döljer .reveal-element ska finnas
 * innan React ritar dem, annars blinkar de synliga och tonar sedan ut. I
 * bygget är sidan förrenderad och målas redan innan detta körs. Därför får
 * inget .reveal-element ligga i första skärmen, se ARKITEKTUR.md: M21 punkt 5. */
enableReveal();

/* I bygget är roten redan fylld av scripts/prerender.mjs, och då hydreras den
 * förrenderade markupen i stället för att ritas om. I dev är roten tom och
 * renderas som vanligt. Trädet är samma som i src/prerender.jsx, StrictMode
 * inräknat. Beslutat i ARKITEKTUR.md: M21 punkt 5. */
const container = document.getElementById(ROOT_ID);
if (container.firstElementChild !== null) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
