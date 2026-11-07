/* Ikonen står alltid tillsammans med en dold text, och är därför dold för
 * hjälpmedel. Beslutat i ARKITEKTUR.md, "M9 - Ikonerna". */
function CloseIcon() {
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
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default CloseIcon;
