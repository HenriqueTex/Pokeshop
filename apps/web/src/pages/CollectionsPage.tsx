import { useQuery } from "@tanstack/react-query";
import { CollectionCard } from "../components/CollectionCard";
import { fetchCollections } from "../lib/api";
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
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="catalog-message">Nenhuma coleção foi publicada.</p>
        )}
      </section>
    </main>
  );
}
