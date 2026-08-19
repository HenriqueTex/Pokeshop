import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type StockAlertButtonProps = {
  className: string;
  productName: string;
};

type ContactDetails = {
  email: string;
  phone: string;
};

const contactCookieName = "pokeshop_stock_alert_contact";
const emptyContact: ContactDetails = { email: "", phone: "" };

function readContact(): ContactDetails {
  if (typeof document === "undefined") return emptyContact;

  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${contactCookieName}=`))
    ?.split("=")[1];

  if (!value) return emptyContact;

  try {
    const contact = JSON.parse(decodeURIComponent(value)) as Partial<ContactDetails>;
    return {
      email: typeof contact.email === "string" ? contact.email : "",
      phone: typeof contact.phone === "string" ? contact.phone : "",
    };
  } catch {
    return emptyContact;
  }
}

function saveContact(contact: ContactDetails) {
  document.cookie = `${contactCookieName}=${encodeURIComponent(
    JSON.stringify(contact),
  )}; Max-Age=31536000; Path=/; SameSite=Lax`;
}

export function StockAlertButton({
  className,
  productName,
}: StockAlertButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contact, setContact] = useState<ContactDetails>(readContact);
  const [error, setError] = useState("");
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const open = () => {
    setContact(readContact());
    setError("");
    setIsSubmitted(false);
    setIsOpen(true);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextContact = {
      email: contact.email.trim(),
      phone: contact.phone.trim(),
    };

    if (!nextContact.email && !nextContact.phone) {
      setError("Informe seu e-mail ou número de WhatsApp.");
      return;
    }

    if (
      nextContact.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextContact.email)
    ) {
      setError("Informe um e-mail válido.");
      return;
    }

    saveContact(nextContact);
    setContact(nextContact);
    setError("");
    setIsSubmitted(true);
  };

  return (
    <>
      <button className={className} type="button" onClick={open}>
        Avise-me quando chegar
      </button>
      {isOpen &&
        createPortal(
          <div
            className="stock-alert-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <section
              className="stock-alert-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
            >
              <button
                className="stock-alert-modal__close"
                type="button"
                aria-label="Fechar"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
              {isSubmitted ? (
                <div className="stock-alert-modal__success">
                  <p className="eyebrow">Contato salvo</p>
                  <h2 id={titleId}>Tudo certo!</h2>
                  <p id={descriptionId}>
                    Seus dados ficarão preenchidos neste navegador para os
                    próximos avisos.
                  </p>
                  <button type="button" onClick={() => setIsOpen(false)}>
                    Entendi
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="eyebrow">Produto esgotado</p>
                  <h2 id={titleId}>Avise-me quando chegar</h2>
                  <p id={descriptionId}>
                    Deixe seu e-mail ou WhatsApp para {productName}.
                  </p>
                  <label className="stock-alert-modal__field">
                    E-mail
                    <input
                      autoComplete="email"
                      type="email"
                      value={contact.email}
                      onChange={(event) =>
                        setContact((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="stock-alert-modal__field">
                    WhatsApp
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      type="tel"
                      value={contact.phone}
                      onChange={(event) =>
                        setContact((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <p className="stock-alert-modal__hint">
                    Preencha ao menos um dos campos.
                  </p>
                  {error && (
                    <p className="stock-alert-modal__error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="stock-alert-modal__submit" type="submit">
                    Salvar contato
                  </button>
                </form>
              )}
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
