import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { formatPrice, mediaUrl, type Product } from "../lib/api";
import { useCartStore } from "../lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);
  const soldOut = product.stock === 0;
  const imageUrl = product.coverImageUrl
    ? mediaUrl(product.coverImageUrl)
    : undefined;
  const isLocalProductImage =
    product.coverImageUrl?.startsWith("/media/") ?? false;
  const imageStyle: CSSProperties | undefined = imageUrl
    ? {
        backgroundImage: isLocalProductImage
          ? `url(${imageUrl})`
          : `linear-gradient(rgb(0 0 0 / 18%), rgb(0 0 0 / 45%)), url(${imageUrl})`,
        backgroundColor: isLocalProductImage ? "#f7f5ef" : undefined,
        backgroundPosition: isLocalProductImage ? "center" : undefined,
        backgroundRepeat: isLocalProductImage ? "no-repeat" : undefined,
        backgroundSize: isLocalProductImage ? "contain" : undefined,
      }
    : undefined;

  return (
    <article className="product-card">
      <Link
        className="product-card__image"
        to={`/produtos/${product.slug}`}
        aria-label={`Ver ${product.name}`}
        style={imageStyle}
      />
      <div className="product-card__content">
        <p className="product-card__collection">
          {product.collections[0]?.name ?? "Triade Arte"}
        </p>
        <h3>
          <Link to={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-card__bottom">
          <strong>{formatPrice(product.priceCents)}</strong>
          <button type="button" disabled={soldOut} onClick={() => add(product)}>
            {soldOut ? "Esgotado" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
