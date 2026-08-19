import { formatPrice, type Product } from '../lib/api'
import { useCartStore } from '../lib/cart'

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add)
  const soldOut = product.stock === 0

  return (
    <article className="product-card">
      <div className="product-card__image" aria-hidden="true"><span>{product.productType.replaceAll('-', ' ')}</span></div>
      <p className="product-card__collection">{product.collections[0]?.name ?? 'Triade Arte'}</p>
      <h3>{product.name}</h3>
      <div className="product-card__bottom">
        <strong>{formatPrice(product.priceCents)}</strong>
        <button type="button" disabled={soldOut} onClick={() => add(product)}>{soldOut ? 'Esgotado' : 'Adicionar'}</button>
      </div>
    </article>
  )
}
