import { Link } from "react-router-dom";
import "./shop-footer.css";

export function ShopFooter() {
  return (
    <footer className="shop-footer">
      <div className="shop-footer__content">
        <section className="shop-footer__brand" aria-label="Sobre a PokeShop">
          <Link className="shop-footer__logo" to="/home">
            PokeShop <span>Pokémon Store</span>
          </Link>
          <p>
            Produtos selecionados para colecionadores, jogadores e novas
            aventuras.
          </p>
          <div className="shop-footer__socials">
            <a
              href="https://wa.me/5511900000000"
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar com a PokeShop pelo WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4a8.4 8.4 0 1 1 15.6-4.4Z" />
                <path d="M8.3 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.8 1.8c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.5.9 1.3 1.7 2.2 2.2.3.2.5.2.7 0l.9-1c.2-.2.4-.3.7-.2l1.8.9c.3.2.5.3.5.5 0 .3-.1 1.3-.7 1.8-.5.5-1.3.8-2.1.7-1.2-.2-2.7-.7-4.5-2.3-2.1-1.9-3.3-4.2-3.4-5.4 0-.5.1-.9.3-1.2Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://instagram.com/pokeshop.demo"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar o Instagram da PokeShop"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".8" className="is-filled" />
              </svg>
              Instagram
            </a>
          </div>
        </section>

        <nav className="shop-footer__nav" aria-label="Navegação do rodapé">
          <h2>Explorar</h2>
          <Link to="/home">Home</Link>
          <Link to="/catalogo">Produtos</Link>
          <Link to="/colecoes">Coleções</Link>
          <Link to="/carrinho">Carrinho</Link>
        </nav>

        <section className="shop-footer__service">
          <h2>Atendimento</h2>
          <address>
            <span>Segunda a sexta</span>
            <strong>09h às 18h</strong>
            <span>Sábado</span>
            <strong>09h às 13h</strong>
          </address>
          <small>Contatos demonstrativos para apresentação do MVP.</small>
        </section>
      </div>

      <div className="shop-footer__bottom">
        <span>© {new Date().getFullYear()} PokeShop.</span>
        <span>
          Loja independente. Pokémon e suas marcas pertencem aos respectivos
          titulares.
        </span>
      </div>
    </footer>
  );
}
