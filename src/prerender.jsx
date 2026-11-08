import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/* Ingången till förrenderingen vid bygget. Beslutat i ARKITEKTUR.md: M21
 * punkt 5. Bara scripts/prerender.mjs läser filen, via Vites SSR-bygge, och
 * ingenting i src/ importerar den.
 *
 * Trädet är samma som main.jsx hydrerar, StrictMode inräknat. Skiljer sig de
 * två åt stämmer den förrenderade markupen inte med klientens första
 * rendering, och React ritar då om hela sidan.
 *
 * Ingen CSS importeras här: stilmallarna länkas redan i dist/index.html av
 * klientbygget. Klassnamnen ur CSS Modules följer ändå med i markupen. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
