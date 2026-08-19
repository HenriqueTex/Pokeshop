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
  const isProductPackshot = [
    "celebracao-30-anos-treinador-avancado",
    "celebracao-30-anos-box-colecao-com-fichario",
  ].includes(product.slug);
  const imageStyle: CSSProperties | undefined = imageUrl
    ? {
        backgroundImage: isProductPackshot
          ? `url(${imageUrl})`
          : `linear-gradient(rgb(0 0 0 / 18%), rgb(0 0 0 / 45%)), url(${imageUrl})`,
        backgroundColor: isProductPackshot ? "#f7f5ef" : undefined,
        backgroundPosition: isProductPackshot ? "center" : undefined,
        backgroundRepeat: isProductPackshot ? "no-repeat" : undefined,
        backgroundSize: isProductPackshot ? "contain" : undefined,
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
    </article>
  );
}
