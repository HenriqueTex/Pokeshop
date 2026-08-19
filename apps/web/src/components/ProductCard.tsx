import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { formatPrice, mediaUrl, type Product } from "../lib/api";
import { useCartStore } from "../lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);
  const soldOut = product.availability === "sold_out" || product.stock === 0;
  const isPreSale = product.availability === "pre_sale";
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
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.25 }}
    >
      <div className="product-card__visual">
        <Link
          className="product-card__image"
          to={`/produtos/${product.slug}`}
          aria-label={`Ver ${product.name}`}
          style={imageStyle}
        />
        <motion.button
          className="product-card__add"
          type="button"
          disabled={soldOut}
          onClick={() => add(product)}
          whileTap={{ scale: 0.96 }}
        >
          {soldOut
            ? "Esgotado"
            : isPreSale
              ? "Reservar na pré-venda"
              : "Adicionar ao carrinho"}
        </motion.button>
      </div>
      <div className="product-card__content">
        <div className="product-card__bottom">
          <strong>{formatPrice(product.priceCents)}</strong>
        </div>
        <p className="product-card__collection">
          {product.collections[0]?.name ?? "Triade Arte"}
        </p>
        <h3>
          <Link to={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__availability">
          {soldOut
            ? "Esgotado"
            : isPreSale
              ? "Pré-venda"
              : `${product.stock} em estoque`}
        </p>
      </div>
    </motion.article>
  );
}
