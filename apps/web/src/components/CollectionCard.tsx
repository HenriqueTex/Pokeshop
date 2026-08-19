import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { mediaUrl, type Collection } from "../lib/api";

type CollectionCardProps = {
  collection: Collection;
  index: number;
};

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const imageUrl = collection.imageUrl ? mediaUrl(collection.imageUrl) : undefined;
  const imageStyle: CSSProperties | undefined = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : undefined;

  return (
    <Link className="collection-card" to={`/colecoes/${collection.slug}`}>
      <div className="collection-card__visual" aria-hidden="true">
        <div className="collection-card__image" style={imageStyle} />
      </div>
      <div className="collection-card__content">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{collection.name}</h3>
        <p>{collection.description}</p>
        <b>Explorar →</b>
      </div>
    </Link>
  );
}
