import { Link } from 'react-router-dom'
import { formatPrice } from '../lib/api'
import { cartCount, cartTotal, useCartStore } from '../lib/cart'
import './shop.css'

export function CartPage() {
  const items = useCartStore((state) => state.items)
  const decrement = useCartStore((state) => state.decrement)
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)

  return (
    <main className="shop-page"><header className="shop-header"><Link className="shop-logo" to="/home">Triade Arte <span>Pokémon Store</span></Link><nav><Link to="/home">Home</Link><Link to="/catalogo">Catálogo</Link><Link to="/carrinho">Carrinho <b>{cartCount(items)}</b></Link></nav></header><section className="cart"><p className="eyebrow">Seu carrinho</p><h1>Pronto para a próxima aventura.</h1>{items.length === 0 ? <div className="cart-empty"><p>Seu carrinho ainda está vazio.</p><Link to="/catalogo">Explorar catálogo →</Link></div> : <div className="cart-layout"><div>{items.map((item) => <article className="cart-item" key={item.id}><div><p>{item.productType}</p><h2>{item.name}</h2><strong>{formatPrice(item.priceCents)}</strong></div><div className="quantity"><button type="button" onClick={() => decrement(item.id)}>−</button><span>{item.quantity}</span><button type="button" disabled={item.quantity >= item.stock} onClick={() => add(item)}>+</button></div><button className="remove" type="button" onClick={() => remove(item.id)}>Remover</button></article>)}</div><aside className="cart-summary"><p>Resumo</p><strong>{formatPrice(cartTotal(items))}</strong><span>Subtotal</span><button type="button" disabled>Checkout em breve</button><small>O pagamento será implementado em uma próxima etapa.</small></aside></div>}</section></main>
  )
}
