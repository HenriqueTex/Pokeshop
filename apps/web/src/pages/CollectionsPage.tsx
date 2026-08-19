import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCollections, mediaUrl } from "../lib/api";
import "./shop.css";

export function CollectionsPage() {
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });
  const collections = collectionsQuery.data?.data ?? [];

  return (
    <main className="shop-page collections-page">
      <section className="collections-intro">
        <p className="eyebrow">Universos para explorar</p>
        <h1>Coleções</h1>
        <p>
          Descubra cada expansão, seus produtos especiais e as cartas que tornam
          cada lançamento memorável.
        </p>
      </section>
      <section className="collections-list" aria-label="Todas as coleções">
        {collectionsQuery.isPending ? (
          <p className="catalog-message">Carregando coleções…</p>
        ) : collectionsQuery.isError ? (
          <p className="catalog-message">
            Não foi possível carregar as coleções.
          </p>
        ) : collections.length ? (
          <div className="collection-grid">
            {collections.map((collection, index) => {
              const imageUrl = collection.imageUrl
                ? mediaUrl(collection.imageUrl)
                : undefined;

              return (
                <Link
                  key={collection.id}
                  className="collection-card"
                  to={`/colecoes/${collection.slug}`}
                  style={
                    imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                  <b>Explorar →</b>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="catalog-message">Nenhuma coleção foi publicada.</p>
        )}
      </section>
    </main>
  );
}
