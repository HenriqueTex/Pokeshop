import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CollectionCard } from "../components/CollectionCard";
import { ProductCard } from "../components/ProductCard";
import { fetchHome } from "../lib/api";
import "./shop.css";
import "./home-hero.css";

export function HomePage() {
  const homeQuery = useQuery({ queryKey: ["home"], queryFn: fetchHome });
  const home = homeQuery.data?.data;
  const banner = home?.banners[0];

  return (
    <main className="shop-page home-page">
      <section className="home-banner">
        <div>
          <p className="eyebrow">PokeShop · Pokémon Store</p>
          <h1>{banner?.title ?? "Sua próxima descoberta está aqui."}</h1>
          <p>
            {banner?.subtitle ??
              "Coleções especiais, itens raros e novas aventuras."}
          </p>
          <Link className="gold-link" to={banner?.ctaUrl ?? "/catalogo"}>
            {banner?.ctaLabel ?? "Explorar catálogo"} <span>→</span>
          </Link>
        </div>
      </section>
      <section className="shop-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curadoria da semana</p>
            <h2>Destaques</h2>
          </div>
          <Link to="/catalogo">Ver catálogo →</Link>
        </div>
        {homeQuery.isPending ? (
          <p className="catalog-message">Carregando destaques…</p>
        ) : (
          <div className="product-grid">
            {home?.featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <section id="colecoes" className="shop-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Para continuar explorando</p>
            <h2>Coleções</h2>
          </div>
        </div>
        <div className="collection-grid">
          {home?.collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
