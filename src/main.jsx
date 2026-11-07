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

createRoot(document.getElementById(ROOT_ID)).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
