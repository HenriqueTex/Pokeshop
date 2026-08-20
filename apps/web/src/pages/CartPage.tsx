import { Link } from "react-router-dom";
import { formatPrice, mediaUrl } from "../lib/api";
import { cartTotal, useCartStore } from "../lib/cart";
import "./shop.css";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const decrement = useCartStore((state) => state.decrement);
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="shop-page cart-page">
      <section className="cart">
        <header className="cart__header">
          <div>
            <h1>Seu Carrinho</h1>
            <p>Revise seus itens antes de finalizar a compra.</p>
          </div>
          <Link to="/catalogo">← Continuar comprando</Link>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Seu carrinho ainda está vazio.</p>
            <Link to="/catalogo">Explorar catálogo →</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => {
                const imageUrl = item.coverImageUrl
                  ? mediaUrl(item.coverImageUrl)
                  : undefined;

                return (
                  <article className="cart-item" key={item.id}>
                    <Link
                      className="cart-item__image"
                      to={`/produtos/${item.slug}`}
                      aria-label={`Ver ${item.name}`}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt="" />
                      ) : (
                        <span aria-hidden="true">PokeShop</span>
                      )}
                    </Link>
                    <div className="cart-item__details">
                      <p>{item.collectionName ?? "PokeShop"}</p>
                      <h2>
                        <Link to={`/produtos/${item.slug}`}>{item.name}</Link>
                      </h2>
                      <div
                        className="quantity"
                        aria-label={`Quantidade de ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() => decrement(item.id)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          disabled={item.quantity >= item.stock}
                          onClick={() => add(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item__price">
                      <button
                        className="remove"
                        type="button"
                        aria-label={`Remover ${item.name} do carrinho`}
                        onClick={() => remove(item.id)}
                      >
                        ×
                      </button>
                      <strong>
                        {formatPrice(item.priceCents * item.quantity)}
                      </strong>
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className="cart-summary">
              <h2>Resumo do Pedido</h2>
              <dl>
                <div>
                  <dt>
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
                  </dt>
                  <dd>{formatPrice(cartTotal(items))}</dd>
                </div>
                <div>
                  <dt>Frete</dt>
                  <dd>Calculado no checkout</dd>
                </div>
              </dl>
              <div className="cart-summary__total">
                <strong>Total</strong>
                <span>{formatPrice(cartTotal(items))}</span>
              </div>
              <button type="button" disabled>
                Finalizar compra <span aria-hidden="true">→</span>
              </button>
              <small>⌑ Pagamento 100% seguro</small>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
