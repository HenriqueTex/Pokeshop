import { useEffect, useRef, useState } from "react";

type CaptureCartButtonProps = {
  className: string;
  disabled?: boolean;
  label: string;
  onAdd: () => void;
};

export function CaptureCartButton({
  className,
  disabled = false,
  label,
  onAdd,
}: CaptureCartButtonProps) {
  const [phase, setPhase] = useState<"idle" | "capturing" | "success">("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(
    () => () =>
      timersRef.current.forEach((timer) => window.clearTimeout(timer)),
    [],
  );

  const capture = () => {
    if (disabled || phase !== "idle") return;

    onAdd();
    setPhase("capturing");
    timersRef.current = [
      window.setTimeout(() => setPhase("success"), 1_550),
      window.setTimeout(() => setPhase("idle"), 2_500),
    ];
  };

  return (
    <button
      className={`${className} capture-cart-button capture-cart-button--${phase}`}
      type="button"
      disabled={disabled}
      aria-busy={phase !== "idle"}
      onClick={capture}
    >
      <span className="capture-cart-button__label">{label}</span>
      <span className="capture-cart-button__pokeball" aria-hidden="true">
        <span className="capture-cart-button__top" />
        <span className="capture-cart-button__base" />
        <span className="capture-cart-button__center" />
      </span>
    </button>
  );
}
