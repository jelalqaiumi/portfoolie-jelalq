/* Hjälpmodul för sidans SEO: canonical, delningskortet, JSON-LD, robots.txt
 * och sitemap.xml. Beslutat i ARKITEKTUR.md: M24.
 *
 * Utan sidoeffekter och utan filåtkomst. Importeras av byggets skript, så att
 * varje värde härleds på ett ställe, och körs aldrig direkt.
 *
 * Varje adress byggs med new URL(relativ, siteUrl), aldrig med
 * strängsammanfogning, så att ett snedstreck för mycket eller för lite inte
 * kan uppstå.
 */

/** Delningsbildens plats under public/ och dist/, och dess mått. */
export const SHARE_IMAGE = { path: 'assets/share/share-1200x630.jpg', width: 1200, height: 630 };

/** @param {string} siteUrl  @returns {string}  Exakt innehåll i robots.txt (punkt 5). */
export function robotsTxt(siteUrl) {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap.xml', siteUrl).href}`, ''].join('\n');
}

/** @param {string} siteUrl  @returns {string}  Exakt innehåll i sitemap.xml (punkt 5). */
export function sitemapXml(siteUrl) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${escapeXml(siteUrl)}</loc>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');
}

/** @param {{ name: string, role: string }} profile  @returns {string}  `${name} · ${role}`, rå text, inte escapad. */
export function pageTitle(profile) {
  return `${profile.name} · ${profile.role}`;
}

/** @param {{ name: string }} profile  @returns {string}  `Porträtt av ${name}`, rå text. */
export function shareImageAlt(profile) {
  return `Porträtt av ${profile.name}`;
}

/** @param {{ sameAsExtra: string[] }} site  @param {{ links: { url: string|null }[] }} contact  @returns {string[]}
 *  Varje links[].url som är en sträng, i listans ordning, därefter sameAsExtra. En adress som redan finns tas inte med igen. */
export function sameAsList(site, contact) {
  const list = [];
  const candidates = [...contact.links.map((link) => link.url), ...site.sameAsExtra];
  for (const url of candidates) {
    if (typeof url === 'string' && !list.includes(url)) list.push(url);
  }
  return list;
}

/** @param {string} text  @returns {string}  & < > " som &amp; &lt; &gt; &quot;, & först. För attributvärden och <title>. */
export function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** @param {string} text  @returns {string}  & < > som &amp; &lt; &gt;. För <loc> i sitemap.xml. */
export function escapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** @param {unknown} value  @returns {string}
 *  JSON.stringify(value), därefter varje < > & U+2028 U+2029 ersatt med sin JSON-escape: ett omvänt
 *  snedstreck följt av u003c, u003e, u0026, u2028 respektive u2029 (sex ASCII-tecken per tecken).
 *  Resultatet tolkas av JSON.parse till samma värde, och kan aldrig innehålla "</script". */
export function jsonForScript(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** @param {{ site: object, profile: object, contact: object, description: string }} input
 *  description är attributvärdet ur <meta name="description"> SOM DET STÅR i filen, redan HTML-escapat.
 *  Det skrivs in oförändrat och escapas INTE igen.
 *  @returns {string[]}  Taggarna i punkt 3, en per element, i den ordningen, utan indrag. */
export function headTags(input) {
  const { site, profile, contact, description } = input;
  const url = site.url;
  const image = new URL(SHARE_IMAGE.path, url).href;
  const U = escapeHtml(url);
  const I = escapeHtml(image);
  const T = escapeHtml(pageTitle(profile));
  const A = escapeHtml(shareImageAlt(profile));

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url,
    image,
    sameAs: sameAsList(site, contact),
  };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: profile.name, url, inLanguage: 'sv' };

  return [
    `<link rel="canonical" href="${U}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="sv_SE" />',
    `<meta property="og:url" content="${U}" />`,
    `<meta property="og:title" content="${T}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${I}" />`,
    `<meta property="og:image:width" content="${SHARE_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${SHARE_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${A}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${jsonForScript(person)}</script>`,
    `<script type="application/ld+json">${jsonForScript(website)}</script>`,
  ];
}
