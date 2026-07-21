/** Hero / section atmospheric background — Finance login patterns adapted for landing. */
export function Atmosphere({ variant = "hero" }: { variant?: "hero" | "subtle" }) {
  if (variant === "subtle") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="hero-mesh opacity-40" />
        <div className="dot-grid absolute inset-0 opacity-30" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-mesh" />
      <div className="hero-mesh hero-mesh--alt" />
      <div className="hero-aurora" />
      <div className="hero-grid-lines" />
      <div className="dot-grid absolute inset-0 opacity-30" />
      <div className="hero-grain" />
      <div className="hero-horizon hidden sm:block" />
    </div>
  );
}
