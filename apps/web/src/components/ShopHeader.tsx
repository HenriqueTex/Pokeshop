import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartCount, useCartStore } from "../lib/cart";

export function ShopHeader() {
  const items = useCartStore((state) => state.items);
  const itemCount = cartCount(items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="shop-header">
      <Link className="shop-logo" to="/home">
        PokeShop <span>Pokémon Store</span>
      </Link>
      <div className="shop-header__mobile-actions">
        <Link
          className="shop-cart-mobile"
          to="/carrinho"
          aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path d="M3 4h2l2.1 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H6" />
            <circle cx="10" cy="19" r="1.2" />
            <circle cx="17" cy="19" r="1.2" />
          </svg>
          <b>{itemCount}</b>
        </Link>
        <button
          className={`shop-menu-toggle${isMenuOpen ? " shop-menu-toggle--open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="shop-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav
        id="shop-navigation"
        className={isMenuOpen ? "shop-nav--open" : undefined}
        aria-label="Navegação principal"
        onClick={() => setIsMenuOpen(false)}
      >
        <Link to="/home">Home</Link>
        <Link to="/catalogo">Produtos</Link>
        <Link to="/colecoes">Coleções</Link>
        <Link className="shop-cart-desktop" to="/carrinho">
          Carrinho <b>{itemCount}</b>
        </Link>
      </nav>
    </header>
  );
}
