interface BrandLogoProps {
  name?: string;
  compact?: boolean;
}

export function BrandLogo({
  name = "We10x",
  compact = false,
}: BrandLogoProps) {
  return (
    <div
      className={`brand-logo ${compact ? "brand-logo--compact" : ""}`}
      aria-label={name}
    >
      <svg
        className="brand-logo__mark"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 38L24 8L40 38H8Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>

      <span className="brand-logo__text">{name}</span>
    </div>
  );
}