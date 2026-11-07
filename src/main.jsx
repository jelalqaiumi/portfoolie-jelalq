import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
 * innan elementen målas, annars blinkar de synliga och tonar sedan ut. */
enableReveal();

createRoot(document.getElementById(ROOT_ID)).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
