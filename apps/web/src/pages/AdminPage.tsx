import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import {
  deleteAdminBanner,
  deleteAdminCollection,
  deleteAdminProduct,
  fetchAdminBanners,
  fetchAdminCollections,
  fetchAdminProducts,
  fetchAdminSession,
  formatPrice,
  logoutAdmin,
  saveAdminBanner,
  saveAdminCollection,
  saveAdminProduct,
  uploadAdminImage,
  type AdminBannerInput,
  type AdminCollectionInput,
  type AdminProductInput,
  type Collection,
  type Product,
  type PromotionalBanner,
} from "../lib/api";
import "./admin.css";
import "./admin-upload.css";

type Section = "products" | "collections" | "banners";

const productDraft: AdminProductInput = {
  name: "",
  slug: "",
  description: "",
  priceCents: 0,
  stock: 0,
  availability: "in_stock",
  status: "draft",
  productType: "booster",
  coverImageUrl: "",
  isFeatured: false,
  collectionIds: [],
};
const collectionDraft: AdminCollectionInput = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  bannerUrl: "",
  sortOrder: 0,
  isPublished: false,
};
const bannerDraft: AdminBannerInput = {
  title: "",
  subtitle: "",
  ctaLabel: "Explorar catálogo",
  ctaUrl: "/catalogo",
  imageUrl: "/media/splash-final.jpeg",
  isActive: false,
  sortOrder: 0,
};

function toProductInput(product: Product): AdminProductInput {
  return {
    name: product.name,
    slug: product.slug,
    description: product.description ?? "",
    priceCents: product.priceCents,
    stock: product.stock,
    availability: product.availability,
    status: product.status ?? "draft",
    productType: product.productType,
    coverImageUrl: product.coverImageUrl ?? "",
    isFeatured: product.isFeatured,
    collectionIds: product.collections.map((collection) => collection.id),
  };
}
function toCollectionInput(collection: Collection): AdminCollectionInput {
  return {
    name: collection.name,
    slug: collection.slug,
    description: collection.description ?? "",
    imageUrl: collection.imageUrl ?? "",
    bannerUrl: collection.bannerUrl ?? "",
    sortOrder: collection.sortOrder ?? 0,
    isPublished: collection.isPublished ?? false,
  };
}
function toBannerInput(banner: PromotionalBanner): AdminBannerInput {
  return {
    title: banner.title,
    subtitle: banner.subtitle ?? "",
    ctaLabel: banner.ctaLabel,
    ctaUrl: banner.ctaUrl,
    imageUrl: banner.imageUrl,
    isActive: banner.isActive ?? false,
    sortOrder: banner.sortOrder ?? 0,
  };
}

function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const upload = useMutation({
    mutationFn: uploadAdminImage,
    onSuccess: (result) => onChange(result.data.url),
  });

  return (
    <div className="admin-image-upload">
      <label>
        {label} (URL ou caminho)
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <label className="admin-upload-control">
        Enviar arquivo local
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={upload.isPending}
          onChange={(event) => {
            const [file] = Array.from(event.target.files ?? []);
            if (file) upload.mutate(file);
            event.currentTarget.value = "";
          }}
        />
      </label>
      {upload.isPending && <small>Enviando imagem…</small>}
      {upload.isError && <p className="admin-error">{upload.error.message}</p>}
    </div>
  );
}

export function AdminPage() {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({
    queryKey: ["admin-session"],
    queryFn: fetchAdminSession,
    retry: false,
  });
  const productsQuery = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchAdminProducts,
    enabled: sessionQuery.isSuccess,
  });
  const collectionsQuery = useQuery({
    queryKey: ["admin-collections"],
    queryFn: fetchAdminCollections,
    enabled: sessionQuery.isSuccess,
  });
  const bannersQuery = useQuery({
    queryKey: ["admin-banners"],
    queryFn: fetchAdminBanners,
    enabled: sessionQuery.isSuccess,
  });
  const [section, setSection] = useState<Section>("products");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const invalidate = () =>
    queryClient
      .invalidateQueries({ queryKey: ["admin-products"] })
      .then(() =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["admin-collections"] }),
          queryClient.invalidateQueries({ queryKey: ["admin-banners"] }),
          queryClient.invalidateQueries({ queryKey: ["products"] }),
          queryClient.invalidateQueries({ queryKey: ["collections"] }),
          queryClient.invalidateQueries({ queryKey: ["home"] }),
        ]),
      );
  const logout = useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["admin-session"] }),
  });

  if (sessionQuery.isPending)
    return (
      <main className="admin-login">
        <p>Verificando acesso…</p>
      </main>
    );
  const admin = sessionQuery.data?.data;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">PokeShop</p>
          <h1>Painel administrativo</h1>
        </div>
        <div>
          <span>{admin.name}</span>
          <button type="button" onClick={() => logout.mutate()}>
            Sair
          </button>
        </div>
      </header>
      <nav className="admin-tabs" aria-label="Seções administrativas">
        <button
          className={section === "products" ? "is-active" : ""}
          onClick={() => setSection("products")}
        >
          Produtos
        </button>
        <button
          className={section === "collections" ? "is-active" : ""}
          onClick={() => setSection("collections")}
        >
          Coleções
        </button>
        <button
          className={section === "banners" ? "is-active" : ""}
          onClick={() => setSection("banners")}
        >
          Banners
        </button>
      </nav>
      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}
      {section === "products" && (
        <ProductsManager
          products={productsQuery.data?.data ?? []}
          collections={collectionsQuery.data?.data ?? []}
          search={search}
          setSearch={setSearch}
          onComplete={(message) => {
            setNotice(message);
            void invalidate();
          }}
        />
      )}
      {section === "collections" && (
        <CollectionsManager
          collections={collectionsQuery.data?.data ?? []}
          onComplete={(message) => {
            setNotice(message);
            void invalidate();
          }}
        />
      )}
      {section === "banners" && (
        <BannersManager
          banners={bannersQuery.data?.data ?? []}
          onComplete={(message) => {
            setNotice(message);
            void invalidate();
          }}
        />
      )}
    </main>
  );
}

function ProductsManager({
  products,
  collections,
  search,
  setSearch,
  onComplete,
}: {
  products: Product[];
  collections: Collection[];
  search: string;
  setSearch: (value: string) => void;
  onComplete: (message: string) => void;
}) {
  const [selected, setSelected] = useState<Product | undefined>();
  const [form, setForm] = useState<AdminProductInput>(productDraft);
  const save = useMutation({
    mutationFn: () => saveAdminProduct(form, selected?.id),
    onSuccess: () => {
      onComplete(selected ? "Produto atualizado." : "Produto criado.");
      setSelected(undefined);
      setForm(productDraft);
    },
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteAdminProduct(id),
    onSuccess: () => {
      onComplete("Produto removido.");
      setSelected(undefined);
      setForm(productDraft);
    },
  });
  const filtered = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [products, search],
  );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate();
  };
  return (
    <section className="admin-layout">
      <div className="admin-list">
        <div className="admin-list__toolbar">
          <input
            aria-label="Buscar produto"
            placeholder="Buscar produto"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            onClick={() => {
              setSelected(undefined);
              setForm(productDraft);
            }}
          >
            Novo produto
          </button>
        </div>
        {filtered.map((product) => (
          <article
            key={product.id}
            className={selected?.id === product.id ? "selected" : ""}
          >
            <button
              onClick={() => {
                setSelected(product);
                setForm(toProductInput(product));
              }}
            >
              <span>{product.status}</span>
              <strong>{product.name}</strong>
              <small>
                {formatPrice(product.priceCents)} · {product.stock} un.
              </small>
            </button>
          </article>
        ))}
      </div>
      <form className="admin-form" onSubmit={submit}>
        <p className="eyebrow">
          {selected ? "Editar produto" : "Novo produto"}
        </p>
        <label>
          Nome
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <label>
          Slug
          <input
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
        </label>
        <div className="admin-form__grid">
          <label>
            Preço (centavos)
            <input
              type="number"
              min="0"
              value={form.priceCents}
              onChange={(event) =>
                setForm({ ...form, priceCents: Number(event.target.value) })
              }
              required
            />
          </label>
          <label>
            Estoque
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) =>
                setForm({ ...form, stock: Number(event.target.value) })
              }
              required
            />
          </label>
          <label>
            Disponibilidade
            <select
              value={form.availability}
              onChange={(event) =>
                setForm({
                  ...form,
                  availability: event.target
                    .value as AdminProductInput["availability"],
                })
              }
            >
              <option value="in_stock">Em estoque</option>
              <option value="pre_sale">Pré-venda</option>
              <option value="sold_out">Esgotado</option>
            </select>
          </label>
          <label>
            Tipo
            <select
              value={form.productType}
              onChange={(event) =>
                setForm({ ...form, productType: event.target.value })
              }
            >
              <option value="booster">Booster</option>
              <option value="elite-trainer-box">Elite Trainer Box</option>
              <option value="acessorio">Acessório</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
                  status: event.target.value as AdminProductInput["status"],
                })
              }
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </label>
        </div>
        <ImageUpload
          label="Imagem de capa"
          value={form.coverImageUrl ?? ""}
          onChange={(coverImageUrl) => setForm({ ...form, coverImageUrl })}
        />
        <fieldset>
          <legend>Coleções</legend>
          {collections.map((collection) => (
            <label key={collection.id} className="admin-check">
              <input
                type="checkbox"
                checked={form.collectionIds.includes(collection.id)}
                onChange={(event) =>
                  setForm({
                    ...form,
                    collectionIds: event.target.checked
                      ? [...form.collectionIds, collection.id]
                      : form.collectionIds.filter((id) => id !== collection.id),
                  })
                }
              />
              {collection.name}
            </label>
          ))}
        </fieldset>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) =>
              setForm({ ...form, isFeatured: event.target.checked })
            }
          />
          Exibir em destaques
        </label>
        {save.isError && <p className="admin-error">{save.error.message}</p>}
        <div className="admin-actions">
          <button type="submit" disabled={save.isPending}>
            {save.isPending ? "Salvando…" : "Salvar produto"}
          </button>
          {selected && (
            <button
              type="button"
              className="danger"
              disabled={remove.isPending}
              onClick={() => {
                if (window.confirm(`Remover ${selected.name}?`))
                  remove.mutate(selected.id);
              }}
            >
              Remover
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function CollectionsManager({
  collections,
  onComplete,
}: {
  collections: Collection[];
  onComplete: (message: string) => void;
}) {
  const [selected, setSelected] = useState<Collection | undefined>();
  const [form, setForm] = useState<AdminCollectionInput>(collectionDraft);
  const save = useMutation({
    mutationFn: () => saveAdminCollection(form, selected?.id),
    onSuccess: () => {
      onComplete(selected ? "Coleção atualizada." : "Coleção criada.");
      setSelected(undefined);
      setForm(collectionDraft);
    },
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteAdminCollection(id),
    onSuccess: () => {
      onComplete("Coleção removida.");
      setSelected(undefined);
      setForm(collectionDraft);
    },
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate();
  };
  return (
    <section className="admin-layout">
      <div className="admin-list">
        <div className="admin-list__toolbar">
          <b>Coleções</b>
          <button
            onClick={() => {
              setSelected(undefined);
              setForm(collectionDraft);
            }}
          >
            Nova coleção
          </button>
        </div>
        {collections.map((collection) => (
          <article
            key={collection.id}
            className={selected?.id === collection.id ? "selected" : ""}
          >
            <button
              onClick={() => {
                setSelected(collection);
                setForm(toCollectionInput(collection));
              }}
            >
              <span>{collection.isPublished ? "publicada" : "oculta"}</span>
              <strong>{collection.name}</strong>
              <small>Ordem {collection.sortOrder ?? 0}</small>
            </button>
          </article>
        ))}
      </div>
      <form className="admin-form" onSubmit={submit}>
        <p className="eyebrow">
          {selected ? "Editar coleção" : "Nova coleção"}
        </p>
        <label>
          Nome
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <label>
          Slug
          <input
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
        </label>
        <ImageUpload
          label="Imagem da coleção"
          value={form.imageUrl ?? ""}
          onChange={(imageUrl) => setForm({ ...form, imageUrl })}
        />
        <ImageUpload
          label="Banner da coleção"
          value={form.bannerUrl ?? ""}
          onChange={(bannerUrl) => setForm({ ...form, bannerUrl })}
        />
        <label>
          Ordem
          <input
            type="number"
            min="0"
            value={form.sortOrder}
            onChange={(event) =>
              setForm({ ...form, sortOrder: Number(event.target.value) })
            }
          />
        </label>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) =>
              setForm({ ...form, isPublished: event.target.checked })
            }
          />
          Publicar coleção
        </label>
        {save.isError && <p className="admin-error">{save.error.message}</p>}
        <div className="admin-actions">
          <button type="submit">Salvar coleção</button>
          {selected && (
            <button
              type="button"
              className="danger"
              onClick={() => {
                if (window.confirm(`Remover ${selected.name}?`))
                  remove.mutate(selected.id);
              }}
            >
              Remover
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function BannersManager({
  banners,
  onComplete,
}: {
  banners: PromotionalBanner[];
  onComplete: (message: string) => void;
}) {
  const [selected, setSelected] = useState<PromotionalBanner | undefined>();
  const [form, setForm] = useState<AdminBannerInput>(bannerDraft);
  const save = useMutation({
    mutationFn: () => saveAdminBanner(form, selected?.id),
    onSuccess: () => {
      onComplete(selected ? "Banner atualizado." : "Banner criado.");
      setSelected(undefined);
      setForm(bannerDraft);
    },
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteAdminBanner(id),
    onSuccess: () => {
      onComplete("Banner removido.");
      setSelected(undefined);
      setForm(bannerDraft);
    },
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate();
  };
  return (
    <section className="admin-layout">
      <div className="admin-list">
        <div className="admin-list__toolbar">
          <b>Banners</b>
          <button
            onClick={() => {
              setSelected(undefined);
              setForm(bannerDraft);
            }}
          >
            Novo banner
          </button>
        </div>
        {banners.map((banner) => (
          <article
            key={banner.id}
            className={selected?.id === banner.id ? "selected" : ""}
          >
            <button
              onClick={() => {
                setSelected(banner);
                setForm(toBannerInput(banner));
              }}
            >
              <span>{banner.isActive ? "ativo" : "inativo"}</span>
              <strong>{banner.title}</strong>
              <small>Ordem {banner.sortOrder ?? 0}</small>
            </button>
          </article>
        ))}
      </div>
      <form className="admin-form" onSubmit={submit}>
        <p className="eyebrow">{selected ? "Editar banner" : "Novo banner"}</p>
        <label>
          Título
          <input
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            required
          />
        </label>
        <label>
          Subtítulo
          <textarea
            value={form.subtitle}
            onChange={(event) =>
              setForm({ ...form, subtitle: event.target.value })
            }
          />
        </label>
        <div className="admin-form__grid">
          <label>
            CTA
            <input
              value={form.ctaLabel}
              onChange={(event) =>
                setForm({ ...form, ctaLabel: event.target.value })
              }
              required
            />
          </label>
          <label>
            Destino
            <input
              value={form.ctaUrl}
              onChange={(event) =>
                setForm({ ...form, ctaUrl: event.target.value })
              }
              required
            />
          </label>
          <label>
            Ordem
            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(event) =>
                setForm({ ...form, sortOrder: Number(event.target.value) })
              }
            />
          </label>
        </div>
        <ImageUpload
          label="Imagem do banner"
          value={form.imageUrl}
          onChange={(imageUrl) => setForm({ ...form, imageUrl })}
        />
        <label className="admin-check">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) =>
              setForm({ ...form, isActive: event.target.checked })
            }
          />
          Ativar banner
        </label>
        {save.isError && <p className="admin-error">{save.error.message}</p>}
        <div className="admin-actions">
          <button type="submit">Salvar banner</button>
          {selected && (
            <button
              type="button"
              className="danger"
              onClick={() => {
                if (window.confirm(`Remover ${selected.title}?`))
                  remove.mutate(selected.id);
              }}
            >
              Remover
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
