import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { CaptureCartButton } from "../components/CaptureCartButton";
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
  const soldOut = product?.availability === "sold_out" || product?.stock === 0;
  const isPreSale = product?.availability === "pre_sale";
  const imageUrl = product?.coverImageUrl
    ? mediaUrl(product.coverImageUrl)
    : undefined;
  const isLocalProductImage =
    product?.coverImageUrl?.startsWith("/media/") ?? false;
  const imageStyle: CSSProperties | undefined = imageUrl
    ? {
        backgroundImage: isLocalProductImage
          ? `url(${imageUrl})`
          : `linear-gradient(rgb(0 0 0 / 12%), rgb(0 0 0 / 38%)), url(${imageUrl})`,
        backgroundColor: isLocalProductImage ? "#f7f5ef" : undefined,
        backgroundPosition: isLocalProductImage ? "center" : undefined,
        backgroundRepeat: isLocalProductImage ? "no-repeat" : undefined,
        backgroundSize: isLocalProductImage ? "contain" : undefined,
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
                .join(" · ") || "PokeShop"}
            </p>
            <h1>{product.name}</h1>
            <p className="product-detail__type">
              {product.productType.replaceAll("-", " ")}
            </p>
            <strong className="product-detail__price">
              {formatPrice(product.priceCents)}
            </strong>
            <p className="product-detail__stock">
              {soldOut
                ? "Esgotado"
                : isPreSale
                  ? "Pré-venda — reserve o seu agora"
                  : `${product.stock} unidades disponíveis`}
            </p>
            {product.description && (
              <p className="product-detail__description">
                {product.description}
              </p>
            )}
            <CaptureCartButton
              className="product-detail__action"
              disabled={soldOut}
              onAdd={() => add(product)}
              successMessage={`${product.name} foi adicionado ao carrinho.`}
              label={
                soldOut
                  ? "Item esgotado"
                  : isPreSale
                    ? "Reservar na pré-venda →"
                    : "Adicionar ao carrinho →"
              }
            />
            <Link className="product-detail__back" to="/catalogo">
              ← Continuar explorando
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
