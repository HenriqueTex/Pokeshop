import { Link, useLocation } from 'react-router-dom'
import { cartCount, useCartStore } from '../lib/cart'

const productCategories = [
  { label: 'Todos os produtos', description: 'Veja tudo que chegou à loja.', to: '/catalogo' },
  { label: 'Boosters avulsos', description: 'Pacotes para cada nova descoberta.', to: '/catalogo?type=booster' },
  { label: 'Caixas de boosters', description: 'Mais cartas para a sua coleção.', to: '/catalogo?type=booster-box' },
  { label: 'Caixa Treinador Avançado', description: 'Tudo para preparar sua jornada.', to: '/catalogo?type=elite-trainer-box' },
  { label: 'Decks prontos', description: 'Entre em batalha com um deck completo.', to: '/catalogo?type=deck' },
  { label: 'Box colecionável', description: 'Edições especiais para guardar.', to: '/catalogo?type=collection-box' },
  { label: 'Latas', description: 'Cartas e acessórios em embalagens especiais.', to: '/catalogo?type=tin' },
  { label: 'Kits', description: 'Itens reunidos para colecionar.', to: '/catalogo?type=kit' },
  { label: 'Blisters', description: 'Boosters com uma surpresa extra.', to: '/catalogo?type=blister' },
  { label: 'Pacote pré-lançamento', description: 'Prepare-se para uma nova coleção.', to: '/catalogo?type=pre-release' },
]

export function ShopHeader() {
  const items = useCartStore((state) => state.items)
  const location = useLocation()
  const isHome = location.pathname === '/home'

  return (
    <header className={`shop-header${isHome ? ' shop-header--home' : ''}`}>
      <Link className="shop-logo" to="/home">Triade Arte <span>Pokémon Store</span></Link>
      <nav aria-label="Navegação principal">
        <Link to="/home">Home</Link>
        <div className="products-menu">
          <Link className="products-menu__trigger" to="/catalogo">Produtos <span aria-hidden="true">⌄</span></Link>
          <section className="products-menu__panel" aria-label="Categorias de produtos">
            <p>Explore por categoria</p>
            <div className="products-menu__grid">
              {productCategories.map((category) => (
                <Link key={category.label} to={category.to}>
                  <strong>{category.label}</strong>
                  <small>{category.description}</small>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <Link to="/home#colecoes">Coleções</Link>
        <Link to="/catalogo?type=single">Singles</Link>
        <Link to="/carrinho">Carrinho <b>{cartCount(items)}</b></Link>
      </nav>
    </header>
  )
}
