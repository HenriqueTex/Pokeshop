import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartCount, useCartStore } from "../lib/cart";

export function ShopHeader() {
  const items = useCartStore((state) => state.items);
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
      <nav
        id="shop-navigation"
        className={isMenuOpen ? "shop-nav--open" : undefined}
        aria-label="Navegação principal"
        onClick={() => setIsMenuOpen(false)}
      >
        <Link to="/home">Home</Link>
        <Link to="/catalogo">Produtos</Link>
        <Link to="/colecoes">Coleções</Link>
        <Link to="/carrinho">
          Carrinho <b>{cartCount(items)}</b>
        </Link>
      </nav>
    </header>
  );
}
