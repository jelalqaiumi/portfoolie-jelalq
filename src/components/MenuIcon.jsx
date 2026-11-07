/* Ikonen står alltid tillsammans med en dold text, och är därför dold för
 * hjälpmedel. Beslutat i ARKITEKTUR.md, "M9 - Ikonerna". */
function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default MenuIcon;
