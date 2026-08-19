# Plano: Loja Pokémon em React e AdonisJS

## Contexto e escopo confirmado

- Migrar a landing atual para uma aplicação React com backend em AdonisJS.
- Manter a splash como porta de entrada e levá-la à Home.
- Criar catálogo público com filtros por tipo de produto e coleção.
- Criar área administrativa para gerir catálogo e coleções.
- Não haverá conta de cliente nesta fase.
- O fluxo comercial termina no carrinho; pagamento, endereço e pedido ficam fora do escopo.
- A Home terá banner promocional, destaques e lançamentos.

## Decisões de arquitetura

| Decisão | Escolha | Motivo |
| --- | --- | --- |
| Repositório | Monorepo `npm workspaces` | Frontend e API evoluem juntos, com comandos e tipos compartilháveis; escolhido porque o `pnpm` local está configurado para outro projeto. |
| Frontend | React + TypeScript + Vite | Leve, rápido para uma interface de catálogo e sem acoplamento a SSR nesta fase. |
| Backend | AdonisJS 6 + TypeScript + Lucid | Convenções sólidas para API, validação, sessões administrativas e migrations. |
| Banco | PostgreSQL | Bom suporte para filtros, relações produto–coleção e evolução do catálogo. |
| Dados remotos | TanStack Query | Cache, estados de carregamento e invalidação previsíveis para catálogo e admin. |
| Carrinho | Zustand com persistência em `localStorage` | Não exige conta e preserva o carrinho ao recarregar. |
| Rotas | React Router | Separa splash, Home, catálogo, detalhes, carrinho e admin. |
| Estilos | CSS com tokens + componentes próprios | Mantém a personalidade da splash sem introduzir uma biblioteca visual genérica. |
| Admin | Autenticação somente para administradores, via sessão segura | Protege escrita no catálogo; clientes continuam anônimos. |
| Imagens | Armazenamento local em desenvolvimento e adaptador para storage S3 em produção | Permite começar simples sem bloquear publicação futura. |

## Estrutura prevista

```text
apps/
  web/                 # React: loja pública e painel administrativo
  api/                 # AdonisJS: API, autenticação admin, banco e uploads
packages/
  shared/              # Tipos, contratos e utilitários sem dependência de UI
docs/
  PLAN-loja-pokemon-react.md
```

## Modelo de dados inicial

| Entidade | Campos principais | Relações |
| --- | --- | --- |
| `admins` | nome, email, senha protegida, papel, ativo | autentica o painel |
| `products` | nome, slug, descrição, preço em centavos, estoque, status, tipo, imagem de capa, data de lançamento, destaque | N:N com coleções |
| `collections` | nome, slug, descrição, imagem/banner, ordem, publicada | N:N com produtos |
| `product_collections` | product_id, collection_id | relação catálogo–coleção |
| `product_images` | product_id, URL, texto alternativo, ordem | galeria de produto |
| `promotional_banners` | título, subtítulo, CTA, imagem, destino, período, ativo, ordem | Home |

Filtros iniciais: coleção, tipo de produto, disponibilidade, faixa de preço, busca por nome e ordenação por relevância, novidade, menor e maior preço.

## Design system: Triade Arte

- **Tom visual:** escuro, cinematográfico, artesanal e colecionável; dourado suave apenas como brilho e ação, nunca como fundo dominante.
- **Tokens:** superfícies quase pretas, texto branco/off-white, dourado quente para foco/CTA, escala de cinzas para informações auxiliares.
- **Tipografia:** Roboto como base, hierarquia ampla e espaçada inspirada na splash.
- **Componentes-base:** botão, link CTA, card de produto, selo, campo de filtro, select, modal/drawer, toast, skeleton, paginação e estados vazios.
- **Movimento:** transições curtas e discretas, rastro dourado restrito a momentos de marca; `prefers-reduced-motion` sempre respeitado.
- **Acessibilidade:** contraste AA, foco visível, navegação por teclado, imagens com texto alternativo e filtros com rótulos claros.

## Fases de execução

### Fase 1 — Fundação técnica

- [x] Criar o workspace `npm`, `apps/web` e `apps/api`. *(Agentes: app-builder, backend-specialist)*
- [x] Configurar React, TypeScript, Vite, React Router, TanStack Query e estrutura de rotas.
- [x] Configurar AdonisJS, PostgreSQL, Lucid, variáveis de ambiente e CORS local. Migrations começam na Fase 2.
- [ ] Definir contratos de API e tipos compartilhados para produto, coleção, banner e paginação.
- [x] Migrar a splash atual para uma rota React, mantendo vídeo, frame final, áudio opcional e comportamento mobile.

**Aceite:** projeto inicia com um comando documentado; splash leva para `/home`; frontend e API comunicam em ambiente local.

### Fase 2 — Catálogo e API pública

- [x] Criar migrations, modelos e seeders de produtos, coleções, imagens e banners. Admin fica para a Fase 5. *(Agentes: database-architect, backend-specialist)*
- [x] Implementar endpoints públicos paginados:
  - `GET /products` com filtros e ordenação;
  - `GET /products/:slug`;
  - `GET /collections` e `GET /collections/:slug`;
  - `GET /home` para banner, destaques e lançamentos.
- [x] Validar parâmetros, limitar paginação, normalizar erros e expor apenas itens publicados.
- [x] Criar dados de demonstração coerentes para testar filtros e seções da Home.

**Aceite:** cada filtro altera o resultado corretamente; slugs são únicos; itens não publicados nunca chegam à API pública.

### Fase 3 — Experiência pública

- [x] Implementar o design system e layout responsivo. *(Agente: frontend-specialist)*
- [x] Construir Home com banner promocional, destaques e atalhos para coleções.
- [x] Construir página de catálogo com filtros acessíveis, URL sincronizada (`?collection=&type=&sort=`), estados de carregamento/vazio/erro e ordenação.
- [x] Criar página de coleção e detalhe do produto, incluindo galeria, preço, disponibilidade e CTA de adicionar ao carrinho.
- [x] Criar header e navegação mobile; o footer acompanha a página de produto.

**Aceite:** navegação funciona em telas pequenas e grandes; filtros podem ser compartilhados por URL; Home e catálogo usam dados reais da API.

### Fase 4 — Carrinho de visitante

- [x] Criar store persistido com itens, quantidade e remoção do carrinho. *(Agentes: frontend-specialist, react-best-practices)*
- [x] Impedir quantidades acima do estoque informado.
- [x] Criar página `/carrinho` com subtotal e aviso explícito de que o checkout virá depois.
- [x] Não implementar pagamento, endereço, frete, cupom ou criação de pedido.

**Aceite:** o carrinho persiste após recarga, calcula subtotal corretamente e não possui rota de pagamento.

### Fase 5 — Área administrativa

- [x] Implementar login, logout, middleware de administrador e proteção de todas as rotas de escrita. *(Agentes: backend-specialist, security-auditor)*
- [x] Criar endpoints administrativos para CRUD de produtos, coleções, banners e upload local de imagens.
- [x] Criar painel React com listagem, busca, formulários validados, publicação/despublicação e feedback de operação.
- [x] Garantir que alterações invalidem o cache e apareçam imediatamente na loja.

**Aceite:** um administrador consegue criar, editar, publicar e remover um item; usuário não autenticado recebe 401/403 em qualquer escrita.

### Fase 6 — Qualidade e entrega

- [ ] Testar API: filtros, paginação, autorização administrativa, validações e publicação. *(Agentes: test-engineer, backend-specialist)*
- [ ] Testar fluxos críticos no navegador: splash → Home, filtro → produto, produto → carrinho e login → CRUD.
- [ ] Fazer revisão de acessibilidade, responsividade, performance de imagens e comportamento sem WebGL.
- [ ] Configurar CI para lint, tipos, testes e build; definir estratégia de deploy para web, API, PostgreSQL e storage. *(Agente: devops-engineer)*

## Dependências e ordem

```text
Fundação → Dados/API pública → Design system → Home/Catálogo/Produto → Carrinho
                    └────────→ Autenticação admin → CRUD admin ───────────┘
                                                    → Testes/CI/Deploy
```

## Fora do escopo desta etapa

- Cadastro, login ou perfil de cliente.
- Checkout, pagamento, frete, endereço, pedidos e integração com gateway.
- Gestão avançada de estoque, cupons, wishlist e avaliações.
- Marketplace, múltiplos vendedores ou programa de fidelidade.

## Checklist final de verificação

- [ ] Splash mantém a identidade visual e funciona em desktop e mobile.
- [ ] Home apresenta banner, destaques e lançamentos administráveis.
- [ ] Catálogo filtra por produto/tipo e coleção, com URL compartilhável.
- [ ] Carrinho anônimo persiste e encerra o fluxo sem checkout.
- [ ] Todas as ações administrativas exigem autenticação e validação no servidor.
- [ ] Interface atende desktop, tablet e mobile com navegação por teclado.
- [ ] Lint, tipos, testes e builds de frontend/backend passam na CI.
