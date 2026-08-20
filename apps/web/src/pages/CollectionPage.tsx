import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { CollectionListCard } from "../components/CollectionListCard";
import { ProductCard } from "../components/ProductCard";
import { fetchCollection, fetchCollections, mediaUrl } from "../lib/api";
import "./shop.css";

export function CollectionPage() {
  const { slug = "" } = useParams();
  const collectionQuery = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => fetchCollection(slug),
  });
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });
  const collection = collectionQuery.data?.data;
  const bannerUrl = collection?.bannerUrl
    ? mediaUrl(collection.bannerUrl)
    : undefined;

  return (
    <main className="shop-page">
      {collectionQuery.isPending && (
        <p className="page-message">Carregando coleção…</p>
      )}
      {collectionQuery.isError && (
        <section className="not-found">
          <p className="eyebrow">Coleção indisponível</p>
          <h1>Essa jornada não está disponível agora.</h1>
          <Link className="gold-link" to="/catalogo">
            Voltar ao catálogo →
          </Link>
        </section>
      )}
      {collection && (
        <>
          <section
            className={`collection-hero${bannerUrl ? " collection-hero--with-image" : ""}`}
            style={
              bannerUrl
                ? {
                    backgroundImage: `linear-gradient(90deg, rgb(7 7 6 / 92%) 0%, rgb(7 7 6 / 66%) 39%, rgb(7 7 6 / 12%) 79%), linear-gradient(0deg, #0a0a0a 0%, transparent 42%), url(${bannerUrl})`,
                  }
                : undefined
            }
          >
            <p className="eyebrow">Coleção selecionada</p>
            <h1>{collection.name}</h1>
            {collection.description && <p>{collection.description}</p>}
            <Link
              className="gold-link"
              to={`/catalogo?collection=${collection.slug}`}
            >
              Filtrar no catálogo →
            </Link>
          </section>
          <section className="shop-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Peças desta coleção</p>
                <h2>Para descobrir</h2>
              </div>
            </div>
            <div className="collections-layout">
              <aside className="collections-sidebar">
                <p className="eyebrow">Outras coleções</p>
                {collectionsQuery.data?.data.length ? (
                  <div className="collections-sidebar__list">
                    {collectionsQuery.data.data.map((item, index) => (
                      <CollectionListCard
                        key={item.id}
                        collection={item}
                        index={index}
                      />
                    ))}
                  </div>
                ) : null}
              </aside>
              <div className="collections-list">
                {collection.products.length ? (
                  <div className="product-grid">
                    {collection.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="catalog-message">
                    Ainda não há itens publicados nesta coleção.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
