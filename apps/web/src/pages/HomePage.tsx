import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { fetchHome } from '../lib/api'
import { cartCount, useCartStore } from '../lib/cart'
import './shop.css'

export function HomePage() {
  const homeQuery = useQuery({ queryKey: ['home'], queryFn: fetchHome })
  const items = useCartStore((state) => state.items)
  const home = homeQuery.data?.data
  const banner = home?.banners[0]

  return (
    <main className="shop-page">
      <header className="shop-header"><Link className="shop-logo" to="/home">Triade Arte <span>Pokémon Store</span></Link><nav><Link to="/home">Home</Link><Link to="/catalogo">Catálogo</Link><Link to="/carrinho">Carrinho <b>{cartCount(items)}</b></Link></nav></header>
      <section className="home-banner"><div><p className="eyebrow">Triade Arte · Pokémon Store</p><h1>{banner?.title ?? 'Sua próxima descoberta está aqui.'}</h1><p>{banner?.subtitle ?? 'Coleções especiais, itens raros e novas aventuras.'}</p><Link className="gold-link" to={banner?.ctaUrl ?? '/catalogo'}>{banner?.ctaLabel ?? 'Explorar catálogo'} <span>→</span></Link></div></section>
      <section className="shop-section"><div className="section-heading"><div><p className="eyebrow">Curadoria da semana</p><h2>Destaques</h2></div><Link to="/catalogo">Ver catálogo →</Link></div>{homeQuery.isPending ? <p className="catalog-message">Carregando destaques…</p> : <div className="product-grid">{home?.featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section>
      <section className="shop-section"><div className="section-heading"><div><p className="eyebrow">Para continuar explorando</p><h2>Coleções</h2></div></div><div className="collection-grid">{home?.collections.map((collection, index) => <Link key={collection.id} to={`/catalogo?collection=${collection.slug}`} className="collection-card"><span>0{index + 1}</span><h3>{collection.name}</h3><p>{collection.description}</p><b>Explorar →</b></Link>)}</div></section>
    </main>
  )
}
