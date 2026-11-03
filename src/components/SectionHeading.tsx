type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  number?: string;
};

export function SectionHeading({ eyebrow, title, description, number }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span className="eyebrow">{eyebrow}</span>
        {number ? <span className="section-heading__number">{number}</span> : null}
      </div>
      <h2>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
