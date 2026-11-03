export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark${small ? " brand-mark--small" : ""}`} aria-hidden="true">
      <span className="brand-mark__o">O</span>
      <span className="brand-mark__n">N</span>
    </span>
  );
}
