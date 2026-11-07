import { useEffect, useRef } from 'react';

/* Scroll-reveal. Beslutat i ARKITEKTUR.md, M12 "Animationerna".
 *
 * Elementet får den globala klassen .reveal och sitt stegnummer som inline
 * custom property. Själva döljandet och inttoningen står i global.css och
 * villkoras på ett attribut på roten, som main.jsx sätter före första
 * renderingen. Utan det
 * attributet syns allt innehåll, så en sida utan JavaScript, utan
 * IntersectionObserver eller med reducerad rörelse döljer aldrig något. */

/* Högsta stegnummer. Staggern räknas som index gånger stegtiden i CSS, så
 * taket här är det som håller den längsta fördröjningen fast, oavsett hur
 * många kort en lista har. Anroparen sätter index till Math.min(i, taket). */
export const REVEAL_INDEX_MAX = 5;

const OBSERVER_OPTIONS = { threshold: 0, rootMargin: '0px 0px -10% 0px' };

/* EN observer för hela sidan, skapad vid första behov. Ett element visas en
 * gång: vid första skärning sätts attributet och elementet lämnar observern. */
let sharedObserver = null;

function getObserver() {
  if (sharedObserver === null && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = 'true';
          sharedObserver.unobserve(entry.target);
        }
      }
    }, OBSERVER_OPTIONS);
  }
  return sharedObserver;
}

function Reveal({ as = 'div', index = 0, className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = getObserver();
    if (element === null || observer === null) {
      return undefined;
    }
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  const Tag = as;

  return (
    <Tag
      {...rest}
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ '--reveal-index': index }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
