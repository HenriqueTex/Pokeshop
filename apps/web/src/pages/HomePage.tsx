import { Link } from 'react-router-dom'
import './home.css'

export function HomePage() {
  return (
    <main className="home">
      <header className="home__header">
        <Link className="home__logo" to="/home">Triade Arte <span>Pokémon Store</span></Link>
        <nav aria-label="Navegação principal"><a href="#destaques">Destaques</a><a href="#lancamentos">Lançamentos</a><a href="#colecoes">Coleções</a></nav>
        <button className="home__cart" type="button">Carrinho <span>0</span></button>
      </header>

      <section className="home__hero" aria-labelledby="home-title">
        <p className="home__eyebrow">Triade Arte · Pokémon Store</p>
        <h1 id="home-title">Sua próxima descoberta está aqui.</h1>
        <p>O catálogo, filtros e carrinho estão sendo preparados para a sua coleção.</p>
        <a className="home__cta" href="#destaques">Explorar destaques <span aria-hidden="true">→</span></a>
      </section>

      <section className="home__section" id="destaques" aria-labelledby="destaques-title">
        <p className="home__eyebrow">Em breve</p>
        <h2 id="destaques-title">Destaques da semana</h2>
        <div className="home__cards">
          <article><span>01</span><h3>Cartas raras</h3><p>Seleção curada para colecionadores.</p></article>
          <article><span>02</span><h3>Boosters</h3><p>Novas expansões e clássicos.</p></article>
          <article><span>03</span><h3>Acessórios</h3><p>Proteção à altura da coleção.</p></article>
        </div>
      </section>
    </main>
  )
}
