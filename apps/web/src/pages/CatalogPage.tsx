import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ShopHeader } from '../components/ShopHeader'
import { fetchCollections, fetchProducts, type ProductFilters } from '../lib/api'
import './shop.css'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters: ProductFilters = { collection: searchParams.get('collection') ?? undefined, type: searchParams.get('type') ?? undefined, availability: searchParams.get('availability') ?? undefined, sort: searchParams.get('sort') ?? undefined }
  const collectionsQuery = useQuery({ queryKey: ['collections'], queryFn: fetchCollections })
  const productsQuery = useQuery({ queryKey: ['products', filters], queryFn: () => fetchProducts(filters) })

  const updateFilter = (key: keyof ProductFilters, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <main className="shop-page">
      <ShopHeader />
      <section className="catalog-intro"><p className="eyebrow">Explore a coleção</p><h1>Encontre sua próxima raridade.</h1><p>Filtre por tipo de produto, coleção e disponibilidade.</p></section>
      <section className="catalog-layout" aria-label="Catálogo de produtos">
        <aside className="filters"><label>Coleção<select value={filters.collection ?? ''} onChange={(event) => updateFilter('collection', event.target.value)}><option value="">Todas as coleções</option>{collectionsQuery.data?.data.map((collection) => <option key={collection.id} value={collection.slug}>{collection.name}</option>)}</select></label><label>Produto<select value={filters.type ?? ''} onChange={(event) => updateFilter('type', event.target.value)}><option value="">Todos os produtos</option><option value="booster">Boosters avulsos</option><option value="booster-box">Caixas de boosters</option><option value="elite-trainer-box">Caixa Treinador Avançado</option><option value="deck">Decks prontos</option><option value="collection-box">Box colecionável</option><option value="tin">Latas</option><option value="kit">Kits</option><option value="blister">Blisters</option><option value="pre-release">Pacote pré-lançamento</option><option value="single">Singles</option><option value="acessorio">Acessórios</option></select></label><label>Disponibilidade<select value={filters.availability ?? ''} onChange={(event) => updateFilter('availability', event.target.value)}><option value="">Todos</option><option value="in-stock">Em estoque</option></select></label><label>Ordenar<select value={filters.sort ?? ''} onChange={(event) => updateFilter('sort', event.target.value)}><option value="">Relevância</option><option value="newest">Novidades</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></label></aside>
        <div className="catalog-results"><p className="result-count">{productsQuery.data?.meta.total ?? 0} itens encontrados</p>{productsQuery.isPending ? <p className="catalog-message">Carregando catálogo…</p> : productsQuery.isError ? <p className="catalog-message">Não foi possível carregar o catálogo.</p> : <div className="product-grid">{productsQuery.data?.data.map((product) => <ProductCard key={product.id} product={product} />)}</div>}{!productsQuery.isPending && !productsQuery.isError && productsQuery.data?.data.length === 0 && <p className="catalog-message">Nenhum item corresponde aos filtros selecionados.</p>}</div>
      </section>
    </main>
  )
}
