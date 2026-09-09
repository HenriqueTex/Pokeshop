# PokeShop

Loja virtual de produtos Pokémon, com vitrine pública, catálogo, coleções, carrinho e área administrativa para gestão de produtos, coleções, banners e imagens.

O projeto é um monorepo npm com:

- **Frontend:** React, TypeScript e Vite.
- **Backend:** AdonisJS, TypeScript e PostgreSQL.
- **Administração:** autenticação por sessão, CRUD de catálogo e upload de imagens.

## Pré-requisitos

- Node.js `20.19` ou superior
- npm `10.8` ou superior
- PostgreSQL em execução

## Começo rápido

1. Instale as dependências na raiz do projeto:

   ```bash
   npm install
   ```

2. Crie os arquivos locais de ambiente:

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

3. Configure a conexão PostgreSQL e as credenciais administrativas em `apps/api/.env`.

4. Gere a chave da aplicação, execute as migrations e carregue o catálogo inicial:

   ```bash
   cd apps/api
   node ace generate:key
   node ace migration:run
   node ace db:seed
   cd ../..
   ```

5. Inicie frontend e API juntos:

   ```bash
   npm run dev
   ```

O frontend é servido pelo Vite (normalmente em `http://localhost:5173`) e a API usa a porta definida por `PORT` (o frontend pressupõe `http://localhost:3333` quando `VITE_API_URL` não é definido).

## Configuração

As variáveis de ambiente são documentadas nos arquivos de exemplo e não devem ser versionadas:

| Arquivo | Finalidade |
| --- | --- |
| `apps/api/.env` | Porta da API, chave da aplicação, PostgreSQL, origens permitidas e credenciais do administrador. |
| `apps/web/.env` | Endereço público da API, por meio de `VITE_API_URL`. |

Para desenvolvimento local, mantenha `WEB_ORIGIN` alinhado ao endereço do Vite. Quando houver mais de uma origem permitida, separe-as por vírgula.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia API e frontend em paralelo. |
| `npm run build` | Gera o build de produção das duas aplicações. |
| `npm run lint` | Executa os linters da API e do frontend. |
| `npm run typecheck` | Verifica os tipos da API e gera o build do frontend. |
| `npm run test --workspace=@triade/api` | Executa os testes da API. |

## Estrutura do projeto

```text
apps/
├── api/                 # API AdonisJS
│   ├── app/controllers/ # Endpoints públicos e administrativos
│   ├── database/        # Migrations e seed do catálogo
│   └── storage/uploads/ # Imagens enviadas no admin (ignorado pelo Git)
└── web/                 # Aplicação React/Vite
    ├── public/media/    # Assets estáticos da loja
    └── src/             # Páginas, componentes e integração com a API
```

## Rotas da aplicação

| Rota | Descrição |
| --- | --- |
| `/` | Tela de abertura. |
| `/home` | Página inicial da loja. |
| `/catalogo` | Catálogo com filtros e paginação. |
| `/colecoes` | Lista de coleções. |
| `/colecoes/:slug` | Produtos de uma coleção. |
| `/produtos/:slug` | Detalhe de um produto. |
| `/carrinho` | Carrinho de compras. |
| `/admin/login` | Login administrativo. |
| `/admin` | Gestão do catálogo. |

## API

A API possui health check em `GET /api/v1/health`. Os endpoints públicos ficam sob `/api/v1`, incluindo produtos, coleções e dados da página inicial. As operações administrativas ficam sob `/api/v1/admin` e exigem uma sessão autenticada.

Os uploads administrativos aceitam imagens JPG, JPEG, PNG e WebP de até 5 MB. Os arquivos são salvos localmente em `apps/api/storage/uploads/`, diretório que não é enviado ao GitHub.

## Segurança e versionamento

- Nunca envie arquivos `.env`; use os arquivos `.env.example` como referência.
- Não versione `node_modules`, builds, logs, banco local ou uploads. Essas regras já estão configuradas nos arquivos `.gitignore`.
- Antes de abrir um pull request, execute `npm run lint` e `npm run build`.
