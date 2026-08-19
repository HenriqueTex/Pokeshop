import { Link } from 'react-router-dom'
import { formatPrice, mediaUrl, type Product } from '../lib/api'
import { useCartStore } from '../lib/cart'

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add)
  const soldOut = product.stock === 0
  const imageUrl = product.coverImageUrl ? mediaUrl(product.coverImageUrl) : undefined

  return (
    <article className="product-card">
      <Link className="product-card__image" to={`/produtos/${product.slug}`} aria-label={`Ver ${product.name}`} style={imageUrl ? { backgroundImage: `linear-gradient(rgb(0 0 0 / 18%), rgb(0 0 0 / 45%)), url(${imageUrl})` } : undefined}><span>{product.productType.replaceAll('-', ' ')}</span></Link>
      <p className="product-card__collection">{product.collections[0]?.name ?? 'Triade Arte'}</p>
      <h3><Link to={`/produtos/${product.slug}`}>{product.name}</Link></h3>
      <div className="product-card__bottom">
        <strong>{formatPrice(product.priceCents)}</strong>
        <button type="button" disabled={soldOut} onClick={() => add(product)}>{soldOut ? 'Esgotado' : 'Adicionar'}</button>
      </div>
    </article>
  )
}
