import { Link } from "react-router-dom";
import { cartCount, useCartStore } from "../lib/cart";

export function ShopHeader() {
  const items = useCartStore((state) => state.items);

  return (
    <header className="shop-header">
      <Link className="shop-logo" to="/home">
        PokeShop <span>Pokémon Store</span>
      </Link>
      <nav aria-label="Navegação principal">
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
