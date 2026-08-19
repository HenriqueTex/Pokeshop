import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CaptureCartButtonProps = {
  className: string;
  disabled?: boolean;
  label: string;
  onAdd: () => void;
  successMessage: string;
};

export function CaptureCartButton({
  className,
  disabled = false,
  label,
  onAdd,
  successMessage,
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
      window.setTimeout(() => setPhase("success"), 2_250),
      window.setTimeout(() => setPhase("idle"), 4_400),
    ];
  };

  return (
    <>
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
      {phase === "success" &&
        createPortal(
          <p className="cart-notification" role="status" aria-live="polite">
            {successMessage}
          </p>,
          document.body,
        )}
    </>
  );
}
