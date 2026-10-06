import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/* Ordningen är beslutad i ARKITEKTUR.md, "Stilimport": fonts först, så att
 * @font-face är deklarerad innan något använder den. Inga @import inuti
 * CSS-filerna - ordningen ska vara synlig här. */
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
