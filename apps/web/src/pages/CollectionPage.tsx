import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { fetchCollection } from '../lib/api'
import './shop.css'

export function CollectionPage() {
  const { slug = '' } = useParams()
  const collectionQuery = useQuery({ queryKey: ['collection', slug], queryFn: () => fetchCollection(slug) })
  const collection = collectionQuery.data?.data

  return (
    <main className="shop-page">
      {collectionQuery.isPending && <p className="page-message">Carregando coleção…</p>}
      {collectionQuery.isError && <section className="not-found"><p className="eyebrow">Coleção indisponível</p><h1>Essa jornada não está disponível agora.</h1><Link className="gold-link" to="/catalogo">Voltar ao catálogo →</Link></section>}
      {collection && <>
        <section className="collection-hero"><p className="eyebrow">Coleção selecionada</p><h1>{collection.name}</h1>{collection.description && <p>{collection.description}</p>}<Link className="gold-link" to={`/catalogo?collection=${collection.slug}`}>Filtrar no catálogo →</Link></section>
        <section className="shop-section"><div className="section-heading"><div><p className="eyebrow">Peças desta coleção</p><h2>Para descobrir</h2></div></div>{collection.products.length ? <div className="product-grid">{collection.products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="catalog-message">Ainda não há itens publicados nesta coleção.</p>}</section>
      </>}
    </main>
  )
}
