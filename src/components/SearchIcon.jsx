/* Ikonen står alltid tillsammans med sökfältets etikett, och är därför dold
 * för hjälpmedel. Beslutat i ARKITEKTUR.md, "M9 - Ikonerna". */
function SearchIcon() {
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
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

export default SearchIcon;
