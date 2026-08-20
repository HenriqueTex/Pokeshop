import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { mediaUrl, type Collection } from "../lib/api";

type CollectionListCardProps = {
  collection: Collection;
  index: number;
};

export function CollectionListCard({
  collection,
  index,
}: CollectionListCardProps) {
  const imageUrl = collection.imageUrl ? mediaUrl(collection.imageUrl) : undefined;
  const imageStyle: CSSProperties | undefined = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : undefined;

  return (
    <Link className="collection-list-card" to={`/colecoes/${collection.slug}`}>
      <span
        className="collection-list-card__image"
        style={imageStyle}
        aria-hidden="true"
      />
      <span className="collection-list-card__shade" aria-hidden="true" />
      <span className="collection-list-card__copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{collection.name}</strong>
        <small>Explorar coleção →</small>
      </span>
    </Link>
  );
}
