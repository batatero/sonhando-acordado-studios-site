type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <a className="brand" href="#inicio" aria-label="Sonhando Acordado Studios — início">
      <span className="brand__mark" aria-hidden="true">
        <span className="brand__orbit" />
        <span className="brand__star">✦</span>
      </span>
      <span className="brand__wordmark">
        <strong>Sonhando Acordado</strong>
        {!compact && <small>Studios</small>}
      </span>
    </a>
  );
}

