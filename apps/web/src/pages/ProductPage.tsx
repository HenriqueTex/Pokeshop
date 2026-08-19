import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { fetchProduct, formatPrice, mediaUrl } from "../lib/api";
import { useCartStore } from "../lib/cart";
import "./shop.css";

export function ProductPage() {
  const { slug = "" } = useParams();
  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug),
  });
  const add = useCartStore((state) => state.add);
  const product = productQuery.data?.data;
  const imageUrl = product?.coverImageUrl
    ? mediaUrl(product.coverImageUrl)
    : undefined;
  const isProductPackshot = [
    "celebracao-30-anos-treinador-avancado",
    "celebracao-30-anos-box-colecao-com-fichario",
  ].includes(product?.slug ?? "");
  const imageStyle: CSSProperties | undefined = imageUrl
    ? {
        backgroundImage: isProductPackshot
          ? `url(${imageUrl})`
          : `linear-gradient(rgb(0 0 0 / 12%), rgb(0 0 0 / 38%)), url(${imageUrl})`,
        backgroundColor: isProductPackshot ? "#f7f5ef" : undefined,
        backgroundPosition: isProductPackshot ? "center" : undefined,
        backgroundRepeat: isProductPackshot ? "no-repeat" : undefined,
        backgroundSize: isProductPackshot ? "contain" : undefined,
      }
    : undefined;

  return (
    <main className="shop-page">
      {productQuery.isPending && (
        <p className="page-message">Carregando item…</p>
      )}
      {productQuery.isError && (
        <section className="not-found">
          <p className="eyebrow">Item indisponível</p>
          <h1>Esta raridade não está no catálogo.</h1>
          <Link className="gold-link" to="/catalogo">
            Voltar ao catálogo →
          </Link>
        </section>
      )}
      {product && (
        <section className="product-detail">
          <div
            className="product-gallery"
            aria-label={`Galeria de ${product.name}`}
          >
            <div className="product-gallery__main" style={imageStyle} />
            {product.images && product.images.length > 1 && (
              <div className="product-gallery__thumbs">
                {product.images.map((image, index) => (
                  <span key={image.id}>
                    {image.altText ?? `Imagem ${index + 1}`}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail__copy">
            <p className="eyebrow">
              {product.collections
                .map((collection) => collection.name)
                .join(" · ") || "Triade Arte"}
            </p>
            <h1>{product.name}</h1>
            <p className="product-detail__type">
              {product.productType.replaceAll("-", " ")}
            </p>
            <strong className="product-detail__price">
              {formatPrice(product.priceCents)}
            </strong>
            <p className="product-detail__stock">
              {product.stock > 0
                ? `${product.stock} unidades disponíveis`
                : "Esgotado"}
            </p>
            {product.description && (
              <p className="product-detail__description">
                {product.description}
              </p>
            )}
            <button
              className="product-detail__action"
              type="button"
              disabled={product.stock === 0}
              onClick={() => add(product)}
            >
              {product.stock === 0
                ? "Item esgotado"
                : "Adicionar ao carrinho →"}
            </button>
            <Link className="product-detail__back" to="/catalogo">
              ← Continuar explorando
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
